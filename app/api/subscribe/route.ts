import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/nodemailer';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // 1. Send Confirmation Email to the Subscriber
        await transporter.sendMail({
            ...mailOptions,
            to: email,
            subject: 'Welcome to Trinity Driving College Newsletter',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1>Thank you for subscribing!</h1>
                    <p>You have successfully subscribed to the Trinity Driving College newsletter.</p>
                    <p>We'll keep you updated with the latest news, driving tips, and course offers.</p>
                    <br/>
                    <p style="font-size: 12px; color: #666;">
                        You are receiving this email because you subscribed to Trinity Driving College. 
                    </p>
                </div>
            `,
        });

        // 2. Send Notification Email to Admin
        await transporter.sendMail({
            ...mailOptions,
            to: 'ocheing999@gmail.com', // Admin email
            subject: 'New Newsletter Subscriber',
            html: `
                <p><strong>New Subscriber Alert</strong></p>
                <p>A new user has subscribed to the newsletter:</p>
                <p>Email: <strong>${email}</strong></p>
            `,
        });

        return NextResponse.json({ success: true, message: 'Subscribed successfully' });
    } catch (error: any) {
        console.error('Subscription Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
