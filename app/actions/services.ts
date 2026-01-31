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

export async function getServices() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const services = await db.collection('services').find({}).sort({ createdAt: -1 }).toArray();
        return JSON.parse(JSON.stringify(services));
    } catch (error) {
        console.error('Failed to fetch services:', error);
        return [];
    }
}

export async function getServiceById(id: string) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const service = await db.collection('services').findOne({ _id: new ObjectId(id) });
        return JSON.parse(JSON.stringify(service));
    } catch (error) {
        console.error('Failed to fetch service:', error);
        return null;
    }
}

export async function addService(serviceData: any) {
    try {
        await checkAuth();
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const result = await db.collection('services').insertOne({
            ...serviceData,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        revalidatePath('/dashboard');
        return { success: true, id: result.insertedId.toString() };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateService(id: string, serviceData: any) {
    try {
        await checkAuth();
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('services').updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...serviceData, updatedAt: new Date() } }
        );
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteService(id: string) {
    try {
        const role = await checkAuth();
        if (role !== 'super-admin' && role !== 'admin') {
            throw new Error('Only Super Admins and Admins can delete services');
        }

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('services').deleteOne({ _id: new ObjectId(id) });
        revalidatePath('/dashboard');
        revalidatePath('/services');
        revalidatePath('/');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
