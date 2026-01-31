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

export async function getBlogs() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const blogs = await db.collection('blogs').find({}).sort({ createdAt: -1 }).toArray();
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        console.error('Failed to fetch blogs:', error);
        return [];
    }
}

export async function getBlogBySlug(slug: string) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const blog = await db.collection('blogs').findOne({ slug });
        return JSON.parse(JSON.stringify(blog));
    } catch (error) {
        console.error('Failed to fetch blog post:', error);
        return null;
    }
}

export async function getBlogById(id: string) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const blog = await db.collection('blogs').findOne({ _id: new ObjectId(id) });
        return JSON.parse(JSON.stringify(blog));
    } catch (error) {
        console.error('Failed to fetch blog post by ID:', error);
        return null;
    }
}

export async function addBlog(blogData: any) {
    try {
        await checkAuth();
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const result = await db.collection('blogs').insertOne({
            ...blogData,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        revalidatePath('/dashboard');
        revalidatePath('/blog');
        return { success: true, id: result.insertedId.toString() };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateBlog(id: string, blogData: any) {
    try {
        await checkAuth();
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('blogs').updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...blogData, updatedAt: new Date() } }
        );
        revalidatePath('/dashboard');
        revalidatePath('/blog');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteBlog(id: string) {
    try {
        const role = await checkAuth();
        if (role !== 'super-admin') throw new Error('Only Super Admins can delete blogs');

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        await db.collection('blogs').deleteOne({ _id: new ObjectId(id) });
        revalidatePath('/dashboard');
        revalidatePath('/blog');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
