"use server";

import cloudinary from '@/lib/cloudinary';

export async function uploadImage(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        if (!file) throw new Error('No file provided');

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'indepth-studio',
                    resource_type: 'auto',
                },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        reject({ success: false, error: error.message });
                    } else {
                        resolve({ success: true, url: result?.secure_url });
                    }
                }
            );

            uploadStream.end(buffer);
        });
    } catch (error: any) {
        console.error('Upload action error:', error);
        return { success: false, error: error.message };
    }
}
