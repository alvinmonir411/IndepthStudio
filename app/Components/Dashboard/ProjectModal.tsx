"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Save, Trash2, Edit3, ExternalLink, Plus } from 'lucide-react';
import { addProject, updateProject } from '@/app/actions/projects';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project?: any;
    onSuccess: () => void;
}

import { uploadImage } from '@/app/actions/cloudinary';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project?: any;
    onSuccess: () => void;
}

export default function ProjectModal({ isOpen, onClose, project, onSuccess }: ProjectModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        imageUrl: '',
        link: '',
        visionTitle: '',
        palette: '',
        gallery: [] as string[],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                category: project.category || '',
                description: Array.isArray(project.fullDescription) ? project.fullDescription.join('\n\n') : (project.description || ''),
                imageUrl: project.imageUrl || '',
                link: project.link || '',
                visionTitle: project.visionTitle || '',
                palette: Array.isArray(project.palette) ? project.palette.join(', ') : '',
                gallery: project.gallery || [],
            });
        } else {
            setFormData({
                title: '',
                category: '',
                description: '',
                imageUrl: '',
                link: '',
                visionTitle: '',
                palette: '',
                gallery: [],
            });
        }
    }, [project, isOpen]);

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
            let result;
            if (project?._id) {
                result = await updateProject(project._id, preparedData);
            } else {
                result = await addProject(preparedData);
            }

            if (result.success) {
                onSuccess();
                onClose();
            } else {
                setError(result.error || 'Failed to save project');
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
                className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"
            >
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-bold">{project ? 'Edit Project' : 'Add New Project'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Project Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="Modern Villa"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Category</label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="Residential"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">The Vision (Title)</label>
                        <input
                            type="text"
                            value={formData.visionTitle}
                            onChange={(e) => setFormData({ ...formData, visionTitle: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                            placeholder="Dynamic Spaces for Modern Innovation"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Description (Detailed - Use double enter for new paragraphs)</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all min-h-[150px] resize-none"
                            placeholder="Vortex Hub is more than just an office...

We integrated organic curves..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Color Palette (Comma separated)</label>
                        <input
                            type="text"
                            value={formData.palette}
                            onChange={(e) => setFormData({ ...formData, palette: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                            placeholder="Polished Concrete, Acoustic Felt Panels, Reclaimed Steel"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Project Image</label>
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

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Project Gallery (Multiple Photos)</label>
                        <div className="flex flex-col gap-4">
                            <label className="flex items-center justify-center gap-2 w-full p-8 bg-zinc-800/50 border-2 border-dashed border-zinc-700 hover:border-amber-500/50 hover:bg-zinc-800 rounded-2xl cursor-pointer transition-all group">
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    onChange={handleGalleryUpload}
                                    disabled={isUploading}
                                />
                                {isUploading ? (
                                    <div className="w-6 h-6 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Plus className="w-8 h-8 text-zinc-500 group-hover:text-amber-500" />
                                        <span className="text-sm font-bold text-zinc-400 group-hover:text-white">
                                            {isUploading ? 'Uploading...' : 'Add Gallery Photos'}
                                        </span>
                                    </div>
                                )}
                            </label>

                            {formData.gallery.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {formData.gallery.map((url, index) => (
                                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800 bg-zinc-800/50 group/item">
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

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">3D Tour / External Link (Optional)</label>
                        <input
                            type="text"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                            placeholder="https://indepthstudio.com/projects/..."
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20">{error}</p>
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
                        <span>{project ? 'Update' : 'Save'} Project</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
