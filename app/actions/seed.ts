"use server";

import clientPromise from '@/lib/mongodb';
import { blogPosts } from '@/app/blog/blogData';
import { projects } from '@/app/projects/projectsData';
import { servicesData } from '@/app/services/servicesData';
import { cookies } from 'next/headers';

async function checkAuth() {
    const cookieStore = await cookies();
    const role = cookieStore.get('dashboard_role')?.value;
    if (role !== 'super-admin') throw new Error('Unauthorized: Only Super Admins can seed data');
    return role;
}

export async function seedDataAction() {
    try {
        await checkAuth();
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        // 1. Seed Projects
        if (projects.length > 0) {
            // Transform projects for MongoDB (e.g., ensure id is consistent or use generated _id)
            const projectsToInsert = projects.map(p => ({
                title: p.title,
                caption: p.caption,
                imageUrl: p.image, // mapping 'image' to 'imageUrl' to match our current DB structure in projects.ts if applicable
                category: p.category,
                location: p.location,
                year: p.year,
                isFeatured: p.isFeatured,
                visionTitle: p.visionTitle,
                description: p.fullDescription.join('\n\n'), // flattening for simplicity if needed, or keep as array
                fullDescription: p.fullDescription,
                palette: p.palette,
                gallery: p.gallery,
                walkthroughUrl: p.walkthroughUrl,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));

            // Clear existing and insert or just insert if empty
            const count = await db.collection('projects').countDocuments();
            if (count === 0) {
                await db.collection('projects').insertMany(projectsToInsert);
                console.log('Projects seeded');
            }
        }

        // 2. Seed Services
        if (servicesData.length > 0) {
            const servicesToInsert = servicesData.map(s => ({
                title: s.title,
                description: s.longDescription,
                shortDescription: s.shortDescription,
                features: s.features.map(f => f.title), // mapping title only for simplicity in basic view, or keep complex
                fullFeatures: s.features,
                imageUrl: s.image,
                details: s.details,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));

            const count = await db.collection('services').countDocuments();
            if (count === 0) {
                await db.collection('services').insertMany(servicesToInsert);
                console.log('Services seeded');
            }
        }

        // 3. Seed Blog Posts
        if (blogPosts.length > 0) {
            const blogsToInsert = blogPosts.map(b => ({
                title: b.title,
                slug: b.slug,
                excerpt: b.excerpt,
                content: b.content,
                fullContent: b.fullContent,
                quote: b.quote,
                quoteAuthor: b.quoteAuthor,
                category: b.category,
                date: b.date,
                author: b.author,
                imageUrl: b.image,
                readTime: b.readTime,
                tags: b.tags,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));

            const count = await db.collection('blogs').countDocuments();
            if (count === 0) {
                await db.collection('blogs').insertMany(blogsToInsert);
                console.log('Blogs seeded');
            }
        }

        return { success: true, message: 'Seeding completed for missing data' };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
