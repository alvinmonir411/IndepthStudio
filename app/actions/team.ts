"use server";

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function checkAuth() {
    const cookieStore = await cookies();
    const role = cookieStore.get('dashboard_role')?.value;
    if (!role) throw new Error('Unauthorized');
    return role;
}

export async function getTeamMembers() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const team = await db.collection('team').find({}).sort({ createdAt: -1 }).toArray();
        return JSON.parse(JSON.stringify(team));
    } catch (error) {
        console.error('Failed to fetch team members:', error);
        return [];
    }
}

export async function addTeamMember(memberData: any) {
    try {
        const role = await checkAuth();
        if (role !== 'super-admin') throw new Error('Unauthorized: Only Super Admins can add team members');

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const result = await db.collection('team').insertOne({
            ...memberData,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        revalidatePath('/dashboard');
        return { success: true, id: result.insertedId.toString() };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateTeamMember(id: string, memberData: any) {
    try {
        const role = await checkAuth();
        if (role !== 'super-admin') throw new Error('Unauthorized: Only Super Admins can update team members');

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('team').updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...memberData, updatedAt: new Date() } }
        );
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteTeamMember(id: string) {
    try {
        const role = await checkAuth();
        if (role !== 'super-admin' && role !== 'admin') {
            throw new Error('Only Super Admins and Admins can delete team members');
        }

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('team').deleteOne({ _id: new ObjectId(id) });
        revalidatePath('/dashboard');
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getTeamMemberById(id: string) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const member = await db.collection('team').findOne({ _id: new ObjectId(id) });
        return member ? JSON.parse(JSON.stringify(member)) : null;
    } catch (error) {
        console.error('Failed to fetch team member:', error);
        return null;
    }
}
