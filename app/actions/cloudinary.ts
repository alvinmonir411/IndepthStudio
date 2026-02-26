"use server";

import cloudinary from '@/lib/cloudinary';

import { cookies } from 'next/headers';

async function checkAuth() {
    const cookieStore = await cookies();
    const role = cookieStore.get('dashboard_role')?.value;
    if (!role) throw new Error('Unauthorized');
    return role;
}

export async function uploadImage(formData: FormData) {
    try {
        await checkAuth();
        const file = formData.get('file') as File;
        if (!file) {
            return { success: false, error: 'No file provided' };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return new Promise((resolve) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'indepth-studio',
                    resource_type: 'auto',
                },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        resolve({ success: false, error: error.message || 'Cloudinary upload failed' });
                    } else {
                        resolve({ success: true, url: result?.secure_url });
                    }
                }
            );

            uploadStream.end(buffer);
        });
    } catch (error: any) {
        console.error('Upload action error:', error);
        return { success: false, error: error.message || 'An unexpected upload error occurred' };
    }
}
