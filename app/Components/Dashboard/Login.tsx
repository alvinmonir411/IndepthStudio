"use client";

import { useState } from 'react';
import { loginAction } from '@/app/actions/dashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LayoutDashboard, ShieldCheck, UserCog, User } from 'lucide-react';

export default function DashboardLogin({ onLogin }: { onLogin: (role: string) => void }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await loginAction(password, username);
            if (result.success && result.role) {
                onLogin(result.role);
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl relative overflow-hidden"
            >
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 blur-[100px] pointer-events-none" />

                <div className="flex flex-col items-center mb-8 text-center relative z-10">
                    <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-4 border border-zinc-700 shadow-inner overflow-hidden">
                        <img src="/Logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Indepth Studio</h1>
                    <p className="text-zinc-400">Secure Dashboard Access</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div className="space-y-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-amber-500 text-zinc-500">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username (optional for legacy)..."
                                className="w-full pl-12 pr-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-amber-500 text-zinc-500">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter access password..."
                                className="w-full pl-12 pr-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                                required
                            />
                        </div>
                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-500 text-sm pl-2"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:grayscale transition-all text-black font-bold rounded-2xl text-lg shadow-lg shadow-amber-500/20 active:scale-[0.98]"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                <span>Authenticating...</span>
                            </div>
                        ) : (
                            "Enter Dashboard"
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-center gap-6 relative z-10">
                    <RoleBadge icon={<ShieldCheck className="w-3 h-3" />} label="Super Admin" />
                    <RoleBadge icon={<UserCog className="w-3 h-3" />} label="Admin" />
                    <RoleBadge icon={<User className="w-3 h-3" />} label="Agent" />
                </div>
            </motion.div>
        </div>
    );
}

function RoleBadge({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-zinc-500">
            {icon}
            <span>{label}</span>
        </div>
    );
}
