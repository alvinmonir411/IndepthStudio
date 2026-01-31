"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Edit3, Trash2, Heart, Award, Zap } from 'lucide-react';
import { addService, updateService } from '@/app/actions/services';

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    service?: any;
    onSuccess: () => void;
}

import { uploadImage } from '@/app/actions/cloudinary';
import { Upload } from 'lucide-react';

export default function ServiceModal({ isOpen, onClose, service, onSuccess }: ServiceModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        longDescription: '',
        icon: 'Zap',
        features: '', // Will be processed into array of objects {title, description}
        included: '', // Comma separated
        approach: '',
        timeline: '',
        suitableFor: '',
        materials: '',
        imageUrl: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (service) {
            setFormData({
                title: service.title || '',
                description: service.description || '',
                longDescription: service.longDescription || '',
                icon: service.icon || 'Zap',
                features: Array.isArray(service.features)
                    ? service.features.map((f: any) => typeof f === 'string' ? f : f.title).join(', ')
                    : '',
                included: service.details?.included?.join(', ') || '',
                approach: service.details?.approach || '',
                timeline: service.details?.timeline || '',
                suitableFor: service.details?.suitableFor || '',
                materials: service.details?.materials || '',
                imageUrl: service.imageUrl || '',
            });
        } else {
            setFormData({
                title: '',
                description: '',
                longDescription: '',
                icon: 'Zap',
                features: '',
                included: '',
                approach: '',
                timeline: '',
                suitableFor: '',
                materials: '',
                imageUrl: '',
            });
        }
    }, [service, isOpen]);

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
            features: formData.features.split(',').map(f => ({ title: f.trim(), description: '' })).filter(f => f.title !== ''),
            details: {
                included: formData.included.split(',').map(i => i.trim()).filter(i => i !== ''),
                approach: formData.approach,
                timeline: formData.timeline,
                suitableFor: formData.suitableFor,
                materials: formData.materials,
            }
        };

        try {
            let result;
            if (service?._id) {
                result = await updateService(service._id, processedData);
            } else {
                result = await addService(processedData);
            }

            if (result.success) {
                onSuccess();
                onClose();
            } else {
                setError(result.error || 'Failed to save service');
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
                className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-bold">{service ? 'Edit Service' : 'Add New Service'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Service Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="Interior Design"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Icon Type</label>
                            <select
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all appearance-none"
                            >
                                <option value="Zap">Zap (Dynamic)</option>
                                <option value="Heart">Heart (Personalized)</option>
                                <option value="Award">Award (Premium)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Brief Summary (For Cards)</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all min-h-[80px] resize-none"
                                placeholder="Briefly describe the service for the cards..."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Long Description (Detailed Intro)</label>
                            <textarea
                                value={formData.longDescription}
                                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all min-h-[120px] resize-none"
                                placeholder="A detailed description that appears at the top of the service page..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Key Features (Comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                    placeholder="Space Planning, Color Consultation"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Included Scope (Comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.included}
                                    onChange={(e) => setFormData({ ...formData, included: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                    placeholder="Initial Consultation, Floor Plans, 3D Renders"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Project Approach</label>
                                <input
                                    type="text"
                                    value={formData.approach}
                                    onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                    placeholder="Iterative design with weekly reviews..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Typical Timeline</label>
                                <input
                                    type="text"
                                    value={formData.timeline}
                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                    placeholder="4-8 weeks depending on scope"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Suitable For</label>
                                <input
                                    type="text"
                                    value={formData.suitableFor}
                                    onChange={(e) => setFormData({ ...formData, suitableFor: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                    placeholder="Modern homes, luxury offices..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Materials & Finishes</label>
                                <input
                                    type="text"
                                    value={formData.materials}
                                    onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                    placeholder="Premium marble, sustainable woods..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Service Image</label>
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
                        <span>{service ? 'Update' : 'Save'} Service</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
