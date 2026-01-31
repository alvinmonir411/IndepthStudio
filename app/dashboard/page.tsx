"use client";

import { useEffect, useState } from 'react';
import { getDashboardRole, logoutAction, getDashboardStats } from '@/app/actions/dashboard';
import DashboardLogin from '@/app/Components/Dashboard/Login';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    LogOut,
    Users,
    Briefcase,
    ShieldCheck,
    User,
    Bell,
    ChevronRight,
    Search,
    Database,
    FileText,
    TrendingUp,
    Users as UsersIcon,
    Layers,
    LucideIcon
} from 'lucide-react';
import { seedDataAction } from '@/app/actions/seed';
import Link from 'next/link';

export default function DashboardPage() {
    const [role, setRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        async function init() {
            const currentRole = await getDashboardRole();
            setRole(currentRole);

            if (currentRole) {
                const data = await getDashboardStats();
                if (data.success) {
                    setStats(data.stats);
                    setActivities(data.recentActivity ?? []);
                }
            }
            setIsLoading(false);
        }
        init();
    }, []);

    const handleLogin = (newRole: string) => {
        setRole(newRole);
    };

    const handleLogout = async () => {
        await logoutAction();
        setRole(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
                <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!role) {
        return <DashboardLogin onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-amber-500/30">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col hidden lg:flex">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <LayoutDashboard className="w-6 h-6 text-black" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg leading-tight">Indepth</h2>
                        <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Dashboard</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-1">
                    <NavItem
                        icon={<LayoutDashboard className="w-5 h-5" />}
                        label="Overview"
                        active={true}
                        href="/dashboard"
                    />
                    <NavItem
                        icon={<Briefcase className="w-5 h-5" />}
                        label="Projects"
                        href="/dashboard/projects"
                    />
                    <NavItem
                        icon={<ShieldCheck className="w-5 h-5" />}
                        label="Services"
                        href="/dashboard/services"
                    />
                    <NavItem
                        icon={<FileText className="w-5 h-5" />}
                        label="Blogs"
                        href="/dashboard/blogs"
                    />
                    {(role === 'admin' || role === 'super-admin') && (
                        <NavItem
                            icon={<Users className="w-5 h-5" />}
                            label="Team Members"
                            href="/dashboard/team"
                        />
                    )}
                </nav>

                <div className="mt-auto pt-6 border-t border-zinc-800">
                    <div className="flex items-center gap-3 px-2 mb-6">
                        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
                            <User className="w-5 h-5 text-amber-500" />
                        </div>
                        <div className="min-w-0">
                            <p className="font-bold text-sm truncate">{role?.replace('-', ' ')}</p>
                            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Connected</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all active:scale-95"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="lg:pl-64 min-h-screen">
                <header className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-6 lg:px-10 py-6">
                    <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Welcome, {role?.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')}
                            </h1>
                            <p className="text-zinc-500 text-sm mt-1">Here's what's happening today at Indepth Studio.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {role === 'super-admin' && <SeedButton />}
                            <button className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl relative hover:bg-zinc-800 transition-colors">
                                <Bell className="w-5 h-5 text-zinc-400" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-zinc-950" />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-12">
                    {/* Hero Section */}
                    <section className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-zinc-950 to-zinc-950 border border-zinc-800 rounded-[3rem] p-10 lg:p-16">
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">Your Digital Studio <br /><span className="text-amber-500">Command Center</span></h2>
                            <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-medium">Manage your professional portfolio, services, and team from one unified interface designed for efficiency and visual impact.</p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/dashboard/projects/new" className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-2xl transition-all shadow-xl shadow-amber-500/20 active:scale-95 flex items-center gap-2">
                                    Create New Project
                                </Link>
                                <Link href="/dashboard/blogs/new" className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-black rounded-2xl transition-all active:scale-95">
                                    Write Article
                                </Link>
                            </div>
                        </div>
                        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
                    </section>

                    {/* Quick Access Menu */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <QuickAccessCard
                            icon={Briefcase}
                            label="Projects"
                            count={stats ? `${stats.projects} Total` : 'Loading...'}
                            href="/dashboard/projects"
                            color="text-amber-500"
                        />
                        <QuickAccessCard
                            icon={ShieldCheck}
                            label="Services"
                            count={stats ? `${stats.services} Offerings` : 'Loading...'}
                            href="/dashboard/services"
                            color="text-emerald-500"
                        />
                        <QuickAccessCard
                            icon={FileText}
                            label="Blogs"
                            count={stats ? `${stats.blogs} Articles` : 'Loading...'}
                            href="/dashboard/blogs"
                            color="text-blue-500"
                        />
                        <QuickAccessCard
                            icon={Users}
                            label="Team"
                            count={stats ? `${stats.team} Members` : 'Loading...'}
                            href="/dashboard/team"
                            color="text-purple-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Stats Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <TrendingUp className="w-5 h-5 text-amber-500" />
                                    Performance Analytics
                                </h3>
                                <button className="text-zinc-500 text-xs font-black uppercase tracking-widest hover:text-white transition-colors">Refresh Data</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <StatCard label="Portfolio Projects" value={stats?.projects || '0'} subValue="Total Published" />
                                <StatCard label="Total Services" value={stats?.services || '0'} subValue="Active Offerings" />
                            </div>
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 h-64 flex items-center justify-center text-zinc-700 font-black uppercase tracking-[0.3em] text-[10px]">
                                Chart Placeholder
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold px-2">Activity Stream</h3>
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 space-y-8 max-h-[500px] overflow-y-auto">
                                {activities.length > 0 ? activities.map((activity, i) => (
                                    <ActivityItem key={i} time={activity.time} text={activity.text} status={activity.status} />
                                )) : (
                                    <p className="text-zinc-600 text-sm italic">No recent activity found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false, href }: { icon: React.ReactNode, label: string, active?: boolean, href: string }) {
    return (
        <Link
            href={href}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${active ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}
        >
            <span className={active ? '' : 'group-hover:text-amber-500 transition-colors'}>{icon}</span>
            <span>{label}</span>
        </Link>
    );
}

function SeedButton() {
    const [isSeeding, setIsSeeding] = useState(false);

    const handleSeed = async () => {
        if (!confirm('This will seed initial data from static files into MongoDB (only if collections are empty). Proceed?')) return;
        setIsSeeding(true);
        const result = await seedDataAction();
        setIsSeeding(false);
        if (result.success) {
            alert(result.message);
            window.location.reload();
        } else {
            alert(result.error);
        }
    };

    return (
        <button
            onClick={handleSeed}
            disabled={isSeeding}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-800 rounded-xl transition-all disabled:opacity-50 group"
        >
            <Database className={`w-4 h-4 ${isSeeding ? 'animate-pulse text-amber-500' : 'text-zinc-500 group-hover:text-amber-500'}`} />
            <span className="text-sm font-bold text-zinc-400 group-hover:text-white">{isSeeding ? 'Seeding...' : 'Seed Data'}</span>
        </button>
    );
}

function QuickAccessCard({ icon: Icon, label, count, href, color }: { icon: LucideIcon, label: string, count: string, href: string, color: string }) {
    return (
        <Link href={href} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl hover:border-zinc-700 transition-all group relative overflow-hidden">
            <div className={`p-3 bg-zinc-950 rounded-2xl border border-zinc-800 mb-4 inline-block group-hover:scale-110 transition-transform ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-500 mb-1 group-hover:text-white transition-colors">{label}</h4>
            <p className="font-bold text-lg">{count}</p>
            <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                <ChevronRight className={`w-5 h-5 ${color}`} />
            </div>
        </Link>
    );
}

function StatCard({ label, value, subValue }: { label: string, value: string, subValue: string }) {
    return (
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem]">
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-2">{label}</p>
            <div className="flex items-baseline gap-3">
                <h4 className="text-4xl font-black tracking-tight">{value}</h4>
                <p className="text-emerald-500 text-[10px] font-black uppercase tracking-tighter">{subValue}</p>
            </div>
        </div>
    );
}

function ActivityItem({ time, text, status }: { time: string, text: string, status: string }) {
    const statusColor = status === 'success' ? 'bg-emerald-500' : status === 'update' ? 'bg-amber-500' : 'bg-zinc-700';
    return (
        <div className="flex gap-4 relative">
            <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full mt-1 ${statusColor} shadow-lg shadow-black/50`} />
                <div className="flex-1 w-px bg-zinc-800 mt-2" />
            </div>
            <div className="pb-8">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">{time}</p>
                <p className="text-sm font-bold text-zinc-300 leading-snug">{text}</p>
            </div>
        </div>
    );
}
