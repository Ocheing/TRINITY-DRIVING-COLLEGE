
import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function POST(request: Request) {
    try {
        const { fullName, email, phone, courseId } = await request.json();

        // 1. Send Email Notification to Admin (ocheing999@gmail.com)
        const { data, error } = await resend.emails.send({
            from: 'Trinity Driving School <onboarding@resend.dev>', // Use default domain for testing
            to: ['ocheing999@gmail.com'],
            subject: `New Enrollment: ${fullName}`,
            html: `
                <h1>New Enrollment Received</h1>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Course ID:</strong> ${courseId || 'Not specified'}</p>
                <br/>
                <p>Please check the admin dashboard for more details.</p>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Email API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
