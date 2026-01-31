"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, User, Shield, Mail, Lock, UserCog } from 'lucide-react';
import { getUsers, updateUser } from '@/app/actions/user';
import { getDashboardRole } from '@/app/actions/dashboard';
import Link from 'next/link';

export default function EditUserPage() {
    const router = useRouter();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isPageLoading, setIsPageLoading] = useState(true);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        async function init() {
            const currentRole = await getDashboardRole();
            if (!currentRole || currentRole !== 'super-admin') {
                router.push('/dashboard');
                return;
            }

            const allUsers = await getUsers();
            const user = allUsers.find((u: any) => u._id === id);

            if (user) {
                setFormData({
                    username: user.username || '',
                    password: '', // Keep password empty unless changing
                    email: user.email || '',
                    role: user.role || 'agent',
                });
            } else {
                setError('User not found');
            }
            setIsPageLoading(false);
        }
        init();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await updateUser(id as string, formData);
            if (result.success) {
                router.push('/dashboard/users');
            } else {
                setError(result.error || 'Failed to update user');
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
                            href="/dashboard/users"
                            className="flex items-center gap-3 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 text-zinc-400 group-hover:text-amber-500 transition-colors" />
                            <span className="text-sm font-bold text-zinc-500 group-hover:text-white transition-colors">Users List</span>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Edit User</h1>
                            <p className="text-zinc-500 text-sm">Modify user details or reset their password.</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="p-6 lg:p-10 max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <section className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 space-y-8 shadow-2xl">
                        <div className="space-y-6">
                            <div className="space-y-3 font-bold">
                                <label className="text-xs text-zinc-500 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                    <User className="w-3.5 h-3.5" /> Username
                                </label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700 font-bold"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>

                            <div className="space-y-3 font-bold">
                                <label className="text-xs text-zinc-500 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                    <Lock className="w-3.5 h-3.5" /> New Password (leave blank to keep current)
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700 font-bold"
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div className="space-y-3 font-bold">
                                <label className="text-xs text-zinc-500 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-6 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700 font-bold"
                                    placeholder="user@example.com"
                                />
                            </div>

                            <div className="space-y-3 font-bold">
                                <label className="text-xs text-zinc-500 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                    <Shield className="w-3.5 h-3.5" /> Access Role
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {['agent', 'admin', 'super-admin'].map((r) => (
                                        <button
                                            key={r}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, role: r })}
                                            className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase tracking-tight transition-all ${formData.role === r
                                                ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20'
                                                : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                                }`}
                                        >
                                            {r.replace('-', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-sm font-bold">
                            <ArrowLeft className="w-4 h-4 rotate-45" />
                            {error}
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-6 pt-6">
                        <Link href="/dashboard/users" className="text-zinc-500 font-bold hover:text-white transition-colors uppercase tracking-widest text-xs">
                            Cancel
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
