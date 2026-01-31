"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, Trash2, FileText, Calendar, Tag, User } from 'lucide-react';
import { updateBlog, getBlogById } from '@/app/actions/blog';
import { uploadImage } from '@/app/actions/cloudinary';
import { getDashboardRole } from '@/app/actions/dashboard';
import Link from 'next/link';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [isPageLoading, setIsPageLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        author: {
            name: 'Arif Rahman',
            role: 'Founder & CEO',
            avatar: '/team/founder.jpg'
        },
        imageUrl: '',
        tags: '',
        readTime: '5 min read',
    });

    useEffect(() => {
        async function init() {
            const currentRole = await getDashboardRole();
            if (!currentRole) {
                router.push('/dashboard');
                return;
            }
            setRole(currentRole);

            const blog = await getBlogById(id);
            if (blog) {
                setFormData({
                    title: blog.title || '',
                    excerpt: blog.excerpt || '',
                    content: blog.content || '',
                    category: blog.category || '',
                    author: blog.author || {
                        name: 'Arif Rahman',
                        role: 'Founder & CEO',
                        avatar: '/team/founder.jpg'
                    },
                    imageUrl: blog.imageUrl || '',
                    tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags || ''),
                    readTime: blog.readTime || '5 min read',
                });
            } else {
                setError('Blog post not found');
            }
            setIsPageLoading(false);
        }
        init();
    }, [id, router]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setError('');

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        try {
            const result: any = await uploadImage(uploadFormData);
            if (result.success) {
                setFormData({ ...formData, imageUrl: result.url });
            } else {
                setError(result.error || 'Upload failed');
            }
        } catch (err) {
            setError('Image upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const processedData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
            updatedAt: new Date(),
            slug: formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        };

        try {
            const result = await updateBlog(id, processedData);
            if (result.success) {
                router.push('/dashboard/blogs');
            } else {
                setError(result.error || 'Failed to update blog post');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    if (isPageLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-amber-500/30 pb-20">
            <header className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-6 lg:px-10 py-6">
                <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 text-zinc-400 group-hover:text-amber-500 transition-colors" />
                            <span className="text-sm font-bold text-zinc-500 group-hover:text-white transition-colors">Back to Dashboard</span>
                        </Link>
                        <div className="w-px h-8 bg-zinc-800 mx-2" />
                        <div>
                            <h1 className="text-2xl font-bold">Edit Blog Post</h1>
                            <p className="text-zinc-500 text-sm">Refine your article for "{formData.title}".</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="p-6 lg:p-10 max-w-5xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-10">
                    <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-8">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center text-sm font-black">01</span>
                            Article Basics
                        </h2>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Post Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-xl font-bold placeholder:text-zinc-800"
                                    placeholder="e.g. The Future of Sustainable Interior Design"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Category</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                        placeholder="e.g. Trends"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Estimated Read Time</label>
                                    <input
                                        type="text"
                                        value={formData.readTime}
                                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                        className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                        placeholder="e.g. 5 min read"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Short Excerpt</label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all min-h-[100px] resize-none placeholder:text-zinc-700"
                                    placeholder="A one-sentence hook for the blog card..."
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-8">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center text-sm font-black">02</span>
                            Rich Content
                        </h2>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Cover Image</label>
                                <div className="flex flex-col gap-6">
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                            className="flex-1 px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                            placeholder="URL or upload →"
                                        />
                                        <label className="flex items-center gap-3 px-8 py-4 bg-zinc-800 border border-zinc-700 hover:border-amber-500/50 hover:bg-zinc-700 rounded-2xl cursor-pointer transition-all group">
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                            {isUploading ? (
                                                <div className="w-5 h-5 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                                            ) : (
                                                <Upload className="w-5 h-5 text-zinc-400 group-hover:text-amber-500" />
                                            )}
                                            <span className="font-bold text-zinc-400 group-hover:text-white">Upload</span>
                                        </label>
                                    </div>
                                    {formData.imageUrl && (
                                        <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-800/50">
                                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                                className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-xl text-white hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Main Article Content (Markdown Supported)</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all min-h-[400px] resize-none font-mono text-sm leading-relaxed"
                                    placeholder="# Introduction
                                    
Write your story here..."
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Tags (Comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="e.g. Minimalism, Sustainability, Modern"
                                />
                            </div>
                        </div>
                    </section>

                    {error && (
                        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500">
                            <Trash2 className="w-5 h-5" />
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-6 pt-10 border-t border-zinc-800">
                        <Link href="/dashboard/blogs" className="text-zinc-500 font-bold hover:text-white transition-colors">
                            Discard Changes
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-3 px-10 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-2xl disabled:opacity-50 transition-all shadow-xl shadow-amber-500/20 active:scale-95"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                                <Save className="w-5 h-5" />
                            )}
                            <span>Save Changes</span>
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
