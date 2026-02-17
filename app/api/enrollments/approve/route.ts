
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API Key
if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        // 1. Verify Authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.error('Auth Error:', authError);
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log('User ID:', user.id);

        // 2. Verify Admin Role
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        console.log('Profile Fetch Result:', { profile, profileError });

        if (!profile || profile.role !== 'admin') {
            console.error('Forbidden Access:', {
                hasProfile: !!profile,
                role: profile?.role,
                userId: user.id
            });
            return NextResponse.json({
                error: 'Forbidden: Admin access required', details: {
                    message: 'Profile missing or insufficient role',
                    role: profile?.role
                }
            }, { status: 403 });
        }

        // 3. Parse Request Body
        const { enrollmentId } = await request.json();

        if (!enrollmentId) {
            return NextResponse.json({ error: 'Enrollment ID is required' }, { status: 400 });
        }

        // 4. Fetch Enrollment Data
        const { data: enrollment, error: fetchError } = await supabase
            .from('enrollments')
            .select('*') // We need full_name, email, course_name, status
            .eq('id', enrollmentId)
            .single();

        if (fetchError || !enrollment) {
            return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
        }

        // 5. Prevent Duplicate Approval
        if (enrollment.status === 'approved') {
            return NextResponse.json({ message: 'Enrollment is already approved.' }, { status: 200 });
        }

        // 6. Update Status in Database
        const { error: updateError } = await supabase
            .from('enrollments')
            .update({ status: 'approved' })
            .eq('id', enrollmentId);

        if (updateError) {
            console.error('Database Update Error:', updateError);
            return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
        }

        // 7. Send Approval Email (using Resend)
        // Ensure you have a verified domain on Resend or use 'onboarding@resend.dev' for testing
        const emailSubject = 'Enrollment Approved – Trinity Driving College';
        const emailBody = `
            <p>Hello ${enrollment.full_name},</p>
            <p>Congratulations! Your enrollment for <strong>${enrollment.course_name}</strong> has been approved.</p>
            <p>Our team will contact you shortly with the next steps.</p>
            <p>Thank you for choosing <strong>Trinity Driving College</strong>.</p>
        `;

        try {
            const { data: emailData, error: emailError } = await resend.emails.send({
                from: 'Trinity Driving College <onboarding@resend.dev>', // Update this to your verified domain in production, e.g., 'admin@trinitydriving.com'
                to: [enrollment.email],
                subject: emailSubject,
                html: emailBody,
            });

            if (emailError) {
                console.error('Email Sending Error:', emailError);
                // Note: We updated the status but failed to send email. 
                // In production, you might want to log this to a separate system to retry sending.
                return NextResponse.json({
                    message: 'Enrollment approved, but failed to send email.',
                    emailError: emailError
                }, { status: 200 }); // Still return 200 as the primary action (approval) succeeded
            }
        } catch (sendError) {
            console.error('Unexpected Email Error:', sendError);
            return NextResponse.json({
                message: 'Enrollment approved, but email sending failed unexpectedly.',
            }, { status: 200 });
        }

        return NextResponse.json({ message: 'Enrollment approved and email sent successfully.' }, { status: 200 });

    } catch (error: any) {
        console.error('Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
