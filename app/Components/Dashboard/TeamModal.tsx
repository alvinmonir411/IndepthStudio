"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Trash2, Edit3, User, Mail, Briefcase, Camera } from 'lucide-react';
import { addTeamMember, updateTeamMember } from '@/app/actions/team';

interface TeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    member?: any;
    onSuccess: () => void;
}

import { uploadImage } from '@/app/actions/cloudinary';

export default function TeamModal({ isOpen, onClose, member, onSuccess }: TeamModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        email: '',
        imageUrl: '',
        bio: '',
        isFounder: false,
        linkedin: '',
        projects: '',
        awards: '',
        years: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (member) {
            setFormData({
                name: member.name || '',
                role: member.role || '',
                email: member.email || '',
                imageUrl: member.imageUrl || '',
                bio: member.bio || '',
                isFounder: member.isFounder || false,
                linkedin: member.social?.linkedin || '',
                projects: member.stats?.projects || '',
                awards: member.stats?.awards || '',
                years: member.stats?.years || '',
            });
        } else {
            setFormData({
                name: '',
                role: '',
                email: '',
                imageUrl: '',
                bio: '',
                isFounder: false,
                linkedin: '',
                projects: '',
                awards: '',
                years: '',
            });
        }
    }, [member, isOpen]);

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
            social: {
                email: formData.email,
                linkedin: formData.linkedin,
            },
            stats: {
                projects: formData.projects,
                awards: formData.awards,
                years: formData.years,
            }
        };

        try {
            let result;
            if (member?._id) {
                result = await updateTeamMember(member._id, processedData);
            } else {
                result = await addTeamMember(processedData);
            }

            if (result.success) {
                onSuccess();
                onClose();
            } else {
                setError(result.error || 'Failed to save team member');
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
                className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-bold">{member ? 'Edit Team Member' : 'Add New Member'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <label className="w-32 h-32 bg-zinc-800 rounded-2xl border border-zinc-700 overflow-hidden flex items-center justify-center group relative cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                />
                                {isUploading ? (
                                    <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                                ) : formData.imageUrl ? (
                                    <div className="w-full h-full relative">
                                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Camera className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Camera className="w-8 h-8 text-zinc-600 group-hover:text-amber-500 transition-colors" />
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase">Upload</span>
                                    </div>
                                )}
                            </label>
                            <p className="text-[10px] text-zinc-500 text-center">Square image recommended</p>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center gap-3 p-3 bg-zinc-800/50 border border-zinc-700 rounded-xl cursor-pointer hover:bg-zinc-800 transition-all">
                                <input
                                    type="checkbox"
                                    checked={formData.isFounder}
                                    onChange={(e) => setFormData({ ...formData, isFounder: e.target.checked })}
                                    className="w-5 h-5 accent-amber-500"
                                />
                                <span className="text-sm font-bold text-zinc-300">Mark as Founder</span>
                            </label>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">LinkedIn Profile (URL or handle)</label>
                                <input
                                    type="text"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                    placeholder="linkedin.com/in/..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Projects Done</label>
                            <input
                                type="text"
                                value={formData.projects}
                                onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="150+"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Awards Won</label>
                            <input
                                type="text"
                                value={formData.awards}
                                onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="25"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Years Experience</label>
                            <input
                                type="text"
                                value={formData.years}
                                onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="10+"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="john@indepthstudio.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Profile Image URL</label>
                            <input
                                type="text"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Bio / About (Optional)</label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all min-h-[80px] resize-none"
                            placeholder="A brief introduction..."
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
                        <span>{member ? 'Update' : 'Save'} Member</span>
                    </button>
                </div>
            </motion.div>
        </div >
    );
}
