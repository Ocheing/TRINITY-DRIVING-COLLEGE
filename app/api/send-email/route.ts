
import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/nodemailer';

export async function POST(request: Request) {
    try {
        const { fullName, email, phone, courseId } = await request.json();

        // 1. Send Email Notification to Admin (ocheing999@gmail.com)
        await transporter.sendMail({
            ...mailOptions,
            to: 'ocheing999@gmail.com', // Admin email
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

        return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (error: any) {
        console.error('Email API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
