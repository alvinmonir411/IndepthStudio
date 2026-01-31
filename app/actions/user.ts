"use server";

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function checkSuperAdmin() {
    const cookieStore = await cookies();
    const role = cookieStore.get('dashboard_role')?.value;
    if (role !== 'super-admin') throw new Error('Unauthorized: Only Super Admins can manage users');
    return role;
}

export async function getUsers() {
    try {
        await checkSuperAdmin();
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const users = await db.collection('user').find({}).sort({ createdAt: -1 }).toArray();
        return JSON.parse(JSON.stringify(users.map(({ password, ...rest }) => rest))); // Don't return passwords
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return [];
    }
}

export async function addUser(userData: any) {
    try {
        await checkSuperAdmin();
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        // Check if user already exists
        const existingUser = await db.collection('user').findOne({ username: userData.username });
        if (existingUser) throw new Error('User already exists');

        const result = await db.collection('user').insertOne({
            ...userData,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        revalidatePath('/dashboard/users');
        return { success: true, id: result.insertedId.toString() };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateUser(id: string, userData: any) {
    try {
        await checkSuperAdmin();
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const updateData: any = {
            updatedAt: new Date()
        };

        if (userData.username) updateData.username = userData.username;
        if (userData.email) updateData.email = userData.email;
        if (userData.role) updateData.role = userData.role;
        if (userData.password) updateData.password = userData.password;

        await db.collection('user').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        revalidatePath('/dashboard/users');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateUserRole(id: string, role: string) {
    try {
        await checkSuperAdmin();
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('user').updateOne(
            { _id: new ObjectId(id) },
            { $set: { role, updatedAt: new Date() } }
        );
        revalidatePath('/dashboard/users');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteUser(id: string) {
    try {
        await checkSuperAdmin();
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('user').deleteOne({ _id: new ObjectId(id) });
        revalidatePath('/dashboard/users');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
