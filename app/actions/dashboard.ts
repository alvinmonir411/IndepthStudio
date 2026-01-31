"use server";

import { cookies } from 'next/headers';

export async function loginAction(password: string) {
    const adminPass = process.env.ADMIN_PASSWORD;
    const superAdminPass = process.env.SUPER_ADMIN_PASSWORD;
    const agentPass = process.env.AGENT_PASSWORD;

    let role = '';
    if (password === adminPass) role = 'admin';
    else if (password === superAdminPass) role = 'super-admin';
    else if (password === agentPass) role = 'agent';

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

    return { success: false, error: 'Invalid password' };
}

export async function logoutAction() {
    (await cookies()).set('dashboard_role', '', { maxAge: 0 });
    return { success: true };
}

export async function getDashboardRole() {
    const cookieStore = await cookies();
    return cookieStore.get('dashboard_role')?.value || null;
}

import clientPromise from '@/lib/mongodb';

export async function getDashboardStats() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const projectCount = await db.collection('projects').countDocuments();
        const serviceCount = await db.collection('services').countDocuments();
        const blogCount = await db.collection('blogs').countDocuments();
        const teamCount = await db.collection('team').countDocuments();

        // Get some recent activity (e.g., last 5 updated items)
        const recentProjects = await db.collection('projects').find().sort({ updatedAt: -1 }).limit(2).toArray();
        const recentBlogs = await db.collection('blogs').find().sort({ updatedAt: -1 }).limit(2).toArray();

        return {
            success: true,
            stats: {
                projects: projectCount,
                services: serviceCount,
                blogs: blogCount,
                team: teamCount,
            },
            recentActivity: [
                ...recentProjects.map(p => ({ time: 'Recently', text: `Project '${p.title}' updated`, status: 'success' })),
                ...recentBlogs.map(b => ({ time: 'Recently', text: `Blog '${b.title}' updated`, status: 'update' })),
            ]
        };
    } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        return { success: false, error: 'Failed to fetch stats' };
    }
}
