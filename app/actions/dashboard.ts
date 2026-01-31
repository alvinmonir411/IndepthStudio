"use server";

import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';

export async function loginAction(password: string, username?: string) {
    let role = '';

    // Only allow database-driven login
    if (username && password) {
        try {
            const client = await clientPromise;
            const db = client.db(process.env.DB_NAME);
            const user = await db.collection('user').findOne({ username, password });
            if (user) {
                role = user.role;
            }
        } catch (error) {
            console.error('Database login error:', error);
        }
    }

    if (role) {
        (await cookies()).set('dashboard_role', role, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        return { success: true, role };
    }

    return { success: false, error: 'Invalid credentials' };
}

export async function logoutAction() {
    (await cookies()).set('dashboard_role', '', { maxAge: 0 });
    return { success: true };
}

export async function getDashboardRole() {
    const cookieStore = await cookies();
    return cookieStore.get('dashboard_role')?.value || null;
}

async function checkAuth() {
    const role = await getDashboardRole();
    if (!role) throw new Error('Unauthorized');
    return role;
}

export async function getDashboardStats() {
    try {
        // Enforce authentication
        await checkAuth();

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const projectCount = await db.collection('projects').countDocuments();
        const serviceCount = await db.collection('services').countDocuments();
        const blogCount = await db.collection('blogs').countDocuments();
        const teamCount = await db.collection('team').countDocuments();
        const leadCount = await db.collection('leads').countDocuments();
        const newLeadCount = await db.collection('leads').countDocuments({ status: 'new' });

        // Get some recent activity (e.g., last 5 updated items)
        const recentProjects = await db.collection('projects').find().sort({ updatedAt: -1 }).limit(2).toArray();
        const recentBlogs = await db.collection('blogs').find().sort({ updatedAt: -1 }).limit(2).toArray();
        const recentLeads = await db.collection('leads').find().sort({ createdAt: -1 }).limit(2).toArray();

        return {
            success: true,
            stats: {
                projects: projectCount,
                services: serviceCount,
                blogs: blogCount,
                team: teamCount,
                leads: leadCount,
                newLeads: newLeadCount,
            },
            recentActivity: [
                ...recentProjects.map(p => ({ time: 'Recently', text: `Project '${p.title}' updated`, status: 'success' })),
                ...recentBlogs.map(b => ({ time: 'Recently', text: `Blog '${b.title}' updated`, status: 'update' })),
                ...recentLeads.map(l => ({ time: 'New', text: `Lead from ${l.fullName}`, status: 'success' })),
            ]
        };
    } catch (error: any) {
        console.error('Failed to fetch dashboard stats:', error);
        return { success: false, error: error.message || 'Failed to fetch stats' };
    }
}

export async function getAdminNote() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const settings = await db.collection('settings').findOne({ key: 'admin_note' });
        return settings?.value || '';
    } catch (error) {
        console.error('Failed to get admin note:', error);
        return '';
    }
}

export async function updateTeamNote(content: string) {
    try {
        const role = await checkAuth();
        // Allow any authenticated user to update the note

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('settings').updateOne(
            { key: 'admin_note' },
            {
                $set: {
                    value: content,
                    updatedBy: role, // Log the role of the person who updated it
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
