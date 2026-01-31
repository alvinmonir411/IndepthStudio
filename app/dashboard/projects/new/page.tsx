"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, Plus, Trash2, LayoutDashboard } from 'lucide-react';
import { addProject } from '@/app/actions/projects';
import { uploadImage } from '@/app/actions/cloudinary';
import { getDashboardRole } from '@/app/actions/dashboard';
import Link from 'next/link';

export default function NewProjectPage() {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [isPageLoading, setIsPageLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: '',
        caption: '',
        category: '',
        location: '',
        year: '',
        isFeatured: false,
        description: '',
        imageUrl: '',
        walkthroughUrl: '',
        visionTitle: '',
        palette: '',
        gallery: [] as string[],
    });

    useEffect(() => {
        async function checkAuth() {
            const currentRole = await getDashboardRole();
            if (!currentRole) {
                router.push('/dashboard');
            } else {
                setRole(currentRole);
            }
            setIsPageLoading(false);
        }
        checkAuth();
    }, [router]);

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

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setError('');

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const uploadFormData = new FormData();
                uploadFormData.append('file', file);
                const result: any = await uploadImage(uploadFormData);
                return result.success ? result.url : null;
            });

            const urls = await Promise.all(uploadPromises);
            const validUrls = urls.filter(url => url !== null) as string[];
            setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...validUrls] }));
        } catch (err) {
            setError('Gallery upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const removeGalleryImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const preparedData = {
            ...formData,
            fullDescription: formData.description.split('\n\n').filter(p => p.trim() !== ''),
            palette: formData.palette.split(',').map(s => s.trim()).filter(s => s !== ''),
        };

        try {
            const result = await addProject(preparedData);

            if (result.success) {
                router.push('/dashboard');
            } else {
                setError(result.error || 'Failed to save project');
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
            {/* Header */}
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
                            <h1 className="text-2xl font-bold">Add New Project</h1>
                            <p className="text-zinc-500 text-sm">Create a new showcase for your portfolio.</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="p-6 lg:p-10 max-w-5xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-10">
                    <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-8">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center text-sm font-black">01</span>
                            Basic Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Project Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="e.g. Minimalist Urban Loft"
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Project Caption</label>
                                <input
                                    type="text"
                                    value={formData.caption}
                                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="A brief catchy summary..."
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="e.g. Residential"
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="e.g. Kyoto, Japan"
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Completion Year</label>
                                <input
                                    type="text"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="e.g. 2024"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl cursor-pointer hover:bg-amber-500/20 transition-all w-fit">
                            <input
                                type="checkbox"
                                checked={formData.isFeatured}
                                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                className="w-5 h-5 accent-amber-500"
                                id="isFeatured"
                            />
                            <label htmlFor="isFeatured" className="text-xs font-black text-amber-500 uppercase tracking-tighter cursor-pointer">
                                Mark as Featured Project
                            </label>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">The Vision (Headline)</label>
                            <input
                                type="text"
                                value={formData.visionTitle}
                                onChange={(e) => setFormData({ ...formData, visionTitle: e.target.value })}
                                className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                placeholder="e.g. Elevating Daily Life Through Balanced Aesthetics"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Project Narrative</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all min-h-[200px] resize-none placeholder:text-zinc-700"
                                placeholder="Describe the project journey... Use double enter for new paragraphs."
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Color Palette / Materials</label>
                            <input
                                type="text"
                                value={formData.palette}
                                onChange={(e) => setFormData({ ...formData, palette: e.target.value })}
                                className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                placeholder="Comma separated: Oak Wood, Brushed Brass, Matte Charcoal"
                            />
                        </div>
                    </section>

                    <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-8">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center text-sm font-black">02</span>
                            Visual Media
                        </h2>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Main Cover Image</label>
                                <div className="flex flex-col gap-6">
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                            className="flex-1 px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                            placeholder="Paste image URL or upload →"
                                        />
                                        <label className="flex items-center gap-3 px-8 py-4 bg-zinc-800 border border-zinc-700 hover:border-amber-500/50 hover:bg-zinc-700 rounded-2xl cursor-pointer transition-all group">
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={isUploading}
                                            />
                                            {isUploading ? (
                                                <div className="w-5 h-5 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                                            ) : (
                                                <Upload className="w-5 h-5 text-zinc-400 group-hover:text-amber-500" />
                                            )}
                                            <span className="font-bold text-zinc-400 group-hover:text-white">
                                                Upload
                                            </span>
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
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Project Gallery</label>
                                <div className="flex flex-col gap-6">
                                    <label className="flex flex-col items-center justify-center gap-4 w-full p-12 bg-zinc-950 border-2 border-dashed border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900 rounded-3xl cursor-pointer transition-all group">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            multiple
                                            onChange={handleGalleryUpload}
                                            disabled={isUploading}
                                        />
                                        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 group-hover:border-amber-500/50 group-hover:scale-110 transition-all">
                                            <Plus className="w-8 h-8 text-zinc-500 group-hover:text-amber-500" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-lg group-hover:text-white transition-colors">Click to upload gallery photos</p>
                                            <p className="text-zinc-500 text-sm mt-1">You can select multiple images at once.</p>
                                        </div>
                                    </label>

                                    {formData.gallery.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {formData.gallery.map((url, index) => (
                                                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-800/50 group/item">
                                                    <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeGalleryImage(index)}
                                                        className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white opacity-0 group-hover/item:opacity-100 hover:text-red-500 transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-8">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center text-sm font-black">03</span>
                            External Links
                        </h2>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">3D Walkthough / Tour Link</label>
                            <input
                                type="text"
                                value={formData.walkthroughUrl}
                                onChange={(e) => setFormData({ ...formData, walkthroughUrl: e.target.value })}
                                className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                placeholder="Paste the Matterport or walkthrough URL..."
                            />
                        </div>
                    </section>

                    {error && (
                        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500">
                            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Trash2 className="w-5 h-5" />
                            </div>
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-6 pt-10 border-t border-zinc-800">
                        <Link
                            href="/dashboard"
                            className="text-zinc-500 font-bold hover:text-white transition-colors"
                        >
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
                            <span>Publish Project</span>
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
