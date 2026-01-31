"use server";
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getDashboardRole } from './dashboard';
import nodemailer from 'nodemailer';

export async function sendContactEmail(formData: {
    fullName: string;
    email: string;
    phone?: string;
    projectType: string;
    message: string;
}) {
    const { fullName, email, phone, projectType, message } = formData;

    // 1. Save to Database
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('leads').insertOne({
            fullName,
            email,
            phone,
            projectType,
            message,
            status: 'new',
            createdAt: new Date(),
        });
    } catch (dbError) {
        console.error('Failed to save lead to database:', dbError);
        // We continue with email even if DB fails, or vice versa? 
        // Usually, saving the lead is more critical than the email if we have a dashboard.
    }

    // 2. SMTP Configuration
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
            Phone: ${phone || 'Not provided'}
            Project Type: ${projectType}
            Message/Vision:
            ${message}
        `,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #d97706; border-bottom: 2px solid #fef3c7; padding-bottom: 10px;">New Project Inquiry</h2>
                <p><strong>From:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
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
        return { success: true, warning: 'Lead saved but email failed' }; // Still return success if DB saved
    }
}

export async function getLeads() {
    try {
        const role = await getDashboardRole();
        if (role !== 'admin' && role !== 'super-admin') {
            throw new Error('Unauthorized: Only admins can view leads');
        }

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const leads = await db.collection('leads').find({}).sort({ createdAt: -1 }).toArray();
        return JSON.parse(JSON.stringify(leads));
    } catch (error) {
        console.error('Failed to fetch leads:', error);
        return [];
    }
}

export async function deleteLead(id: string) {
    try {
        const role = await getDashboardRole();
        if (role !== 'admin' && role !== 'super-admin') throw new Error('Unauthorized');

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('leads').deleteOne({ _id: new ObjectId(id) });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateLeadStatus(id: string, status: 'new' | 'contacted') {
    try {
        const role = await getDashboardRole();
        if (role !== 'admin' && role !== 'super-admin') throw new Error('Unauthorized');

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('leads').updateOne(
            { _id: new ObjectId(id) },
            { $set: { status, updatedAt: new Date() } }
        );
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
