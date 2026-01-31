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

export async function getProjects() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const projects = await db.collection('projects').find({}).sort({ createdAt: -1 }).toArray();
        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return [];
    }
}

export async function addProject(projectData: any) {
    try {
        await checkAuth();
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const result = await db.collection('projects').insertOne({
            ...projectData,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        revalidatePath('/dashboard');
        return { success: true, id: result.insertedId.toString() };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateProject(id: string, projectData: any) {
    try {
        await checkAuth();
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('projects').updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...projectData, updatedAt: new Date() } }
        );
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteProject(id: string) {
    try {
        const role = await checkAuth();
        if (role !== 'super-admin') throw new Error('Only Super Admins can delete projects');

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
export async function getProjectById(id: string) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const project = await db.collection('projects').findOne({
            $or: [
                { _id: ObjectId.isValid(id) ? new ObjectId(id) : null },
                { id: parseInt(id) } // fallback for seeded data if we keep original numeric ID
            ].filter(Boolean) as any
        });
        return project ? JSON.parse(JSON.stringify(project)) : null;
    } catch (error) {
        console.error('Failed to fetch project:', error);
        return null;
    }
}
