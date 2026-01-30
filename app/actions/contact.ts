"use server";

import nodemailer from 'nodemailer';

export async function sendContactEmail(formData: {
    fullName: string;
    email: string;
    projectType: string;
    message: string;
}) {
    const { fullName, email, projectType, message } = formData;

    // SMTP Configuration
    // IMPORTANT: You need to set these environment variables in your .env file
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.CEO_EMAIL || 'ceo@indepthstudio.com',
        subject: `New Project Inquiry: ${projectType} from ${fullName}`,
        text: `
            New Contact Form Submission:
            Full Name: ${fullName}
            Email: ${email}
            Project Type: ${projectType}
            Message/Vision:
            ${message}
        `,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #d97706; border-bottom: 2px solid #fef3c7; padding-bottom: 10px;">New Project Inquiry</h2>
                <p><strong>From:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Project Type:</strong> ${projectType}</p>
                <div style="background: #fdf8f3; padding: 20px; border-radius: 10px; margin-top: 20px;">
                    <h3 style="margin-top: 0; font-size: 14px; color: #78716c; text-transform: uppercase; letter-spacing: 0.1em;">The Vision</h3>
                    <p style="color: #444; line-height: 1.6;">${message}</p>
                </div>
                <p style="font-size: 12px; color: #a8a29e; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                    This message was sent via the Indepth Studio contact form.
                </p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error: 'Failed to send email' };
    }
}
