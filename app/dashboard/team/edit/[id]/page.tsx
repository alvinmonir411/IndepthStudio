"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, Trash2, User, Linkedin, Mail } from 'lucide-react';
import { getTeamMemberById, updateTeamMember } from '@/app/actions/team';
import { uploadImage } from '@/app/actions/cloudinary';
import { getDashboardRole } from '@/app/actions/dashboard';
import Link from 'next/link';

export default function EditTeamMemberPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [role, setRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [isPageLoading, setIsPageLoading] = useState(true);

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

    useEffect(() => {
        async function init() {
            const currentRole = await getDashboardRole();
            if (!currentRole) {
                router.push('/dashboard');
                return;
            }
            setRole(currentRole);

            const member = await getTeamMemberById(id);
            if (member) {
                setFormData({
                    name: member.name || '',
                    role: member.role || '',
                    email: member.social?.email || member.email || '',
                    imageUrl: member.imageUrl || '',
                    bio: member.bio || '',
                    isFounder: member.isFounder || false,
                    linkedin: member.social?.linkedin || member.linkedin || '',
                    projects: member.stats?.projects || '',
                    awards: member.stats?.awards || '',
                    years: member.stats?.years || '',
                });
            } else {
                setError('Member not found');
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
            const result = await updateTeamMember(id, processedData);
            if (result.success) {
                router.push('/dashboard');
            } else {
                setError(result.error || 'Failed to update team member');
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
                            <h1 className="text-2xl font-bold">Edit Team Member</h1>
                            <p className="text-zinc-500 text-sm">Update "{formData.name}" profile details.</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="p-6 lg:p-10 max-w-5xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-10">
                    <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-8">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center text-sm font-black">01</span>
                            Personal Profile
                        </h2>

                        <div className="flex flex-col md:flex-row gap-10">
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative w-40 h-40 bg-zinc-950 rounded-3xl overflow-hidden border border-zinc-800 group">
                                    {formData.imageUrl ? (
                                        <img src={formData.imageUrl} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <User className="w-12 h-12 text-zinc-800" />
                                        </div>
                                    )}
                                    <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all">
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                        <Upload className="w-6 h-6 text-white mb-2" />
                                        <span className="text-[10px] font-black uppercase text-white">Change Photo</span>
                                    </label>
                                </div>
                                <label className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl cursor-pointer hover:bg-amber-500/20 transition-all">
                                    <input
                                        type="checkbox"
                                        checked={formData.isFounder}
                                        onChange={(e) => setFormData({ ...formData, isFounder: e.target.checked })}
                                        className="w-5 h-5 accent-amber-500"
                                    />
                                    <span className="text-xs font-black text-amber-500 uppercase tracking-tighter">Mark as Founder</span>
                                </label>
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                            placeholder="e.g. Arif Rahman"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Professional Role</label>
                                        <input
                                            type="text"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                            placeholder="e.g. Principal Architect"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Professional Bio</label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all min-h-[120px] resize-none placeholder:text-zinc-700"
                                        placeholder="A brief introduction of their work and expertise..."
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-8">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center text-sm font-black">02</span>
                            Contact & Social
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="arif@indepth.com"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                                    <Linkedin className="w-4 h-4" /> LinkedIn Profile
                                </label>
                                <input
                                    type="text"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="linkedin.com/in/arifrahman"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 space-y-8">
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center text-sm font-black">03</span>
                            Professional Stats
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Projects Completed</label>
                                <input
                                    type="text"
                                    value={formData.projects}
                                    onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="e.g. 150+"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Awards & Recognition</label>
                                <input
                                    type="text"
                                    value={formData.awards}
                                    onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="e.g. 23"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Years of Experience</label>
                                <input
                                    type="text"
                                    value={formData.years}
                                    onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="e.g. 15+"
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
                        <Link href="/dashboard" className="text-zinc-500 font-bold hover:text-white transition-colors">
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
