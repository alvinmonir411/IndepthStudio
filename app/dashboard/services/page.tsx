"use client";

import { useState, useEffect } from 'react';
import { getServices, deleteService } from '@/app/actions/services';
import {
    Plus,
    Edit3,
    Trash2,
    ShieldCheck,
    ArrowLeft,
    Zap,
    Heart,
    Award,
    Paintbrush2,
    Gem
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDashboardRole } from '@/app/actions/dashboard';
import { toast } from 'react-toastify';

const ServiceIcon = ({ icon, className }: { icon: string, className?: string }) => {
    switch (icon) {
        case 'Zap': return <Zap className={className} />;
        case 'Heart': return <Heart className={className} />;
        case 'Award': return <Award className={className} />;
        case 'Paintbrush2': return <Paintbrush2 className={className} />;
        case 'Gem': return <Gem className={className} />;
        default: return <Zap className={className} />;
    }
};

export default function ServicesListPage() {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);
    const [services, setServices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchServices = async () => {
        setIsLoading(true);
        const data = await getServices();
        setServices(data);
        setIsLoading(false);
    };

    useEffect(() => {
        async function init() {
            const currentRole = await getDashboardRole();
            if (!currentRole) {
                router.push('/dashboard');
                return;
            }
            setRole(currentRole);
            fetchServices();
        }
        init();
    }, [router]);

    const handleDelete = async (id: string) => {
        if (role === 'agent') return;
        if (confirm('Are you sure you want to delete this service?')) {
            const result = await deleteService(id);
            if (result.success) {
                toast.success('Service deleted successfully');
                fetchServices();
            } else {
                toast.error(result.error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-amber-500/30 pb-20">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-6 lg:px-10 py-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 text-zinc-400 group-hover:text-amber-500 transition-colors" />
                            <span className="text-sm font-bold text-zinc-500 group-hover:text-white transition-colors">Dashboard</span>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Service Management</h1>
                            <p className="text-zinc-500 text-sm">Define and detail the high-end services of Indepth Studio.</p>
                        </div>
                    </div>
                    <Link
                        href="/dashboard/services/new"
                        className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-2xl transition-all shadow-xl shadow-amber-500/20 active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Service</span>
                    </Link>
                </div>
            </header>

            <main className="p-6 lg:p-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 h-64 animate-pulse" />
                        ))
                    ) : services.length === 0 ? (
                        <div className="col-span-full py-40 text-center bg-zinc-900/30 border-2 border-dashed border-zinc-800 rounded-[3rem] flex flex-col items-center">
                            <ShieldCheck className="w-20 h-20 text-zinc-800 mb-6" />
                            <h4 className="text-xl font-bold mb-2">No services defined</h4>
                            <p className="text-zinc-500 mb-8 max-w-sm">Define your areas of expertise to show potential clients what Indepth Studio can do.</p>
                            <Link href="/dashboard/services/new" className="text-amber-500 font-black hover:underline uppercase text-xs tracking-widest">
                                Create Your First Service
                            </Link>
                        </div>
                    ) : (
                        services.map((service) => (
                            <div key={service._id} className="relative bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 hover:border-zinc-700 transition-all group flex flex-col justify-between overflow-hidden">
                                {/* Decor */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors" />

                                <div>
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 group-hover:text-amber-500 group-hover:border-amber-500/20 transition-all shadow-xl shadow-black/50">
                                            <ServiceIcon icon={service.icon} className="w-8 h-8" />
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/dashboard/services/edit/${service._id}`}
                                                className="p-3 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-amber-500 hover:border-amber-500/30 rounded-xl transition-all active:scale-90"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </Link>
                                            {role !== 'agent' && (
                                                <button
                                                    onClick={() => handleDelete(service._id)}
                                                    className="p-3 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:border-red-500/30 rounded-xl transition-all active:scale-90"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-bold mb-3 group-hover:text-amber-500 transition-colors">{service.title}</h4>
                                    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-6">{service.description}</p>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-zinc-800/50">
                                    <div className="flex flex-wrap gap-2">
                                        {service.features?.slice(0, 3).map((f: any, idx: number) => (
                                            <span key={idx} className="text-[9px] px-2.5 py-1 bg-zinc-950 text-zinc-500 border border-zinc-800 rounded-md font-black uppercase tracking-[0.05em] group-hover:border-zinc-700 transition-colors">
                                                {typeof f === 'string' ? f : f.title}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">
                                        <span>Timeline: {service.details?.timeline || 'TDB'}</span>
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                                            Active
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
