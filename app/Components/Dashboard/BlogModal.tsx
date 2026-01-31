"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Edit3, Trash2, FileText, Send, User, Tag } from 'lucide-react';
import { addBlog, updateBlog } from '@/app/actions/blog';

interface BlogModalProps {
    isOpen: boolean;
    onClose: () => void;
    blog?: any;
    onSuccess: () => void;
}

import { uploadImage } from '@/app/actions/cloudinary';
import { Upload } from 'lucide-react';

export default function BlogModal({ isOpen, onClose, blog, onSuccess }: BlogModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        fullContent: '', // Textarea to split by double newlines
        quote: '',
        quoteAuthor: '',
        category: '',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        author: 'Alvin Monir',
        imageUrl: '',
        readTime: '5 min read',
        tags: '', // Comma separated
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title || '',
                slug: blog.slug || '',
                excerpt: blog.excerpt || '',
                content: blog.content || '',
                fullContent: blog.fullContent?.join('\n\n') || '',
                quote: blog.quote || '',
                quoteAuthor: blog.quoteAuthor || '',
                category: blog.category || '',
                date: blog.date || '',
                author: blog.author || 'Alvin Monir',
                imageUrl: blog.imageUrl || '',
                readTime: blog.readTime || '5 min read',
                tags: blog.tags?.join(', ') || '',
            });
        }
    }, [blog, isOpen]);

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
            fullContent: formData.fullContent.split('\n\n').map(p => p.trim()).filter(p => p !== ''),
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== ''),
        };

        try {
            let result;
            if (blog?._id) {
                result = await updateBlog(blog._id, processedData);
            } else {
                result = await addBlog(processedData);
            }

            if (result.success) {
                onSuccess();
                onClose();
            } else {
                setError(result.error || 'Failed to save blog post');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"
            >
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-bold">{blog ? 'Edit Blog Post' : 'Create New Post'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Post Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="The Future of Interior Design"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Slug</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="the-future-of-design"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                    placeholder="Design Theory"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Read Time</label>
                                <input
                                    type="text"
                                    value={formData.readTime}
                                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                    placeholder="5 min read"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Short Excerpt</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all min-h-[80px] resize-none"
                                placeholder="A brief summary for the preview card..."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Post Image</label>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                    <label className="flex items-center gap-2 px-6 py-3 bg-zinc-800 border border-zinc-700 hover:border-amber-500/50 hover:bg-zinc-700 rounded-xl cursor-pointer transition-all group">
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={isUploading}
                                        />
                                        {isUploading ? (
                                            <div className="w-4 h-4 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                                        ) : (
                                            <Upload className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
                                        )}
                                        <span className="text-sm font-bold text-zinc-400 group-hover:text-white truncate">
                                            {isUploading ? 'Uploading...' : 'Upload'}
                                        </span>
                                    </label>
                                </div>
                                {formData.imageUrl && (
                                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-800/50">
                                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                            className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Detailed Content (Markdown Supported)</label>
                            <textarea
                                value={formData.fullContent}
                                onChange={(e) => setFormData({ ...formData, fullContent: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all min-h-[200px] font-mono text-sm"
                                placeholder="Write your full article here... Separate paragraphs with double newlines."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Editorial Quote (Optional)</label>
                            <textarea
                                value={formData.quote}
                                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all min-h-[60px] resize-none"
                                placeholder="A powerful pull quote..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Quote Author</label>
                                <input
                                    type="text"
                                    value={formData.quoteAuthor}
                                    onChange={(e) => setFormData({ ...formData, quoteAuthor: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                    placeholder="Alvin Monir"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Tags (Comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                    placeholder="Minimalism, Lighting, Modern"
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="col-span-full">
                            <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20">{error}</p>
                        </div>
                    )}
                </form>

                <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-zinc-400 font-medium hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-8 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl disabled:opacity-50 transition-all shadow-lg shadow-amber-500/10"
                    >
                        {isLoading ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                        <span>{blog ? 'Update' : 'Publish'} Post</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
