"use client";

import { useState, useEffect } from 'react';
import { getLeads, deleteLead, updateLeadStatus } from '@/app/actions/contact';
import {
    Mail,
    Trash2,
    ArrowLeft,
    Clock,
    User,
    MessageSquare,
    Briefcase,
    AlertCircle,
    Phone,
    CheckCircle2,
    Clock as ClockIcon,
    Filter as FilterIcon
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDashboardRole } from '@/app/actions/dashboard';
import { toast } from 'react-toastify';

export default function LeadsListPage() {
    const router = useRouter();
    const [leads, setLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'contacted'>('all');

    const fetchLeads = async () => {
        setIsLoading(true);
        const data = await getLeads();
        setLeads(data);
        setIsLoading(false);
    };

    useEffect(() => {
        async function init() {
            const role = await getDashboardRole();
            if (!role || (role !== 'admin' && role !== 'super-admin')) {
                router.push('/dashboard');
                return;
            }
            setUserRole(role);
            fetchLeads();
        }
        init();
    }, [router]);

    const handleStatusUpdate = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'new' ? 'contacted' : 'new';
        const result = await updateLeadStatus(id, newStatus);
        if (result.success) {
            toast.success(`Leads marked as ${newStatus}`);
            fetchLeads();
        } else {
            toast.error(result.error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!userRole || (userRole !== 'admin' && userRole !== 'super-admin')) return;
        if (confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) {
            const result = await deleteLead(id);
            if (result.success) {
                toast.success('Inquiry deleted successfully');
                fetchLeads();
            } else {
                toast.error(result.error);
            }
        }
    };

    const filteredLeads = leads.filter(lead => {
        if (filterStatus === 'all') return true;
        return lead.status === filterStatus;
    });

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-amber-500/30 pb-20">
            <header className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-6 lg:px-10 py-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between max-w-7xl mx-auto w-full gap-6">
                    <div className="flex items-center gap-3 lg:gap-4 overflow-hidden">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-3 lg:px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all group shrink-0"
                            title="Back"
                        >
                            <ArrowLeft className="w-5 h-5 text-zinc-400 group-hover:text-amber-500 transition-colors" />
                            <span className="text-sm font-bold text-zinc-500 group-hover:text-white transition-colors hidden sm:inline">Back</span>
                        </Link>
                        <div className="overflow-hidden">
                            <h1 className="text-xl lg:text-2xl font-bold tracking-tight truncate">Inquiries</h1>
                            <p className="text-zinc-500 text-xs truncate hidden sm:block">Manage project leads.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 lg:gap-2 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 overflow-x-auto no-scrollbar max-w-full">
                        <FilterTab active={filterStatus === 'all'} label="All" onClick={() => setFilterStatus('all')} />
                        <FilterTab active={filterStatus === 'new'} label="New" count={leads.filter(l => l.status === 'new').length} onClick={() => setFilterStatus('new')} />
                        <FilterTab active={filterStatus === 'contacted'} label="Contacted" onClick={() => setFilterStatus('contacted')} />
                    </div>
                </div>
            </header>

            <main className="p-6 lg:p-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-48 bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] animate-pulse" />
                        ))
                    ) : filteredLeads.length === 0 ? (
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-[3.5rem] p-20 text-center">
                            <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8">
                                <FilterIcon className="w-10 h-10 text-zinc-600" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">No {filterStatus !== 'all' ? filterStatus : ''} inquiries found</h2>
                            <p className="text-zinc-500 max-w-xs mx-auto mb-10">Adjust your filters or check back later for new leads.</p>
                        </div>
                    ) : (
                        filteredLeads.map((lead) => (
                            <div key={lead._id} className="group bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 rounded-[2.5rem] p-8 lg:p-10 transition-all relative overflow-hidden shadow-2xl">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 relative z-10">
                                    <div className="flex items-start gap-6">
                                        <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                                            <User className="w-8 h-8 text-amber-500" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-2xl font-black tracking-tight uppercase">{lead.fullName}</h3>
                                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${lead.status === 'contacted' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse'}`}>
                                                    {lead.status || 'new'}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-500" /> {lead.email}</span>
                                                <span className="w-1 h-1 bg-zinc-800 rounded-full hidden md:block" />
                                                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-amber-500" /> {lead.phone || 'N/A'}</span>
                                                <span className="w-1 h-1 bg-zinc-800 rounded-full hidden md:block" />
                                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-500" /> {new Date(lead.createdAt).toLocaleDateString()} at {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 self-start lg:self-center">
                                        <button
                                            onClick={() => handleStatusUpdate(lead._id, lead.status || 'new')}
                                            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-wider transition-all shadow-xl active:scale-95 ${lead.status === 'contacted' ? 'bg-zinc-800 text-zinc-400 hover:text-white' : 'bg-amber-500 text-black hover:bg-amber-400'}`}
                                        >
                                            {lead.status === 'contacted' ? <ClockIcon className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                            {lead.status === 'contacted' ? 'Re-open' : 'Mark Task Done'}
                                        </button>

                                        {(userRole === 'admin' || userRole === 'super-admin') && (
                                            <button
                                                onClick={() => handleDelete(lead._id)}
                                                className="p-4 bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:border-red-500/30 rounded-2xl transition-all active:scale-95 shadow-xl"
                                                title="Delete Inquiry"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                                    <div className="lg:col-span-1 p-5 lg:p-6 bg-zinc-950 border border-zinc-800 rounded-[2rem]">
                                        <div className="flex items-center gap-3 text-amber-500 mb-4">
                                            <Briefcase className="w-4 h-4" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Project Type</span>
                                        </div>
                                        <p className="text-lg font-bold text-zinc-300">{lead.projectType || 'Not specified'}</p>
                                    </div>
                                    <div className="lg:col-span-2 p-5 lg:p-6 bg-zinc-950/50 border border-zinc-800 rounded-[2rem] group-hover:border-amber-500/20 transition-all">
                                        <div className="flex items-center gap-3 text-amber-500 mb-4">
                                            <MessageSquare className="w-4 h-4" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">The Vision</span>
                                        </div>
                                        <p className="text-zinc-400 font-medium leading-relaxed italic">
                                            &quot;{lead.message}&quot;
                                        </p>
                                    </div>
                                </div>

                                {/* Background Decorative Elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-amber-500/10 transition-all" />
                                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-zinc-800/20 rounded-full blur-[80px] pointer-events-none" />
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

function FilterTab({ label, active, onClick, count }: { label: string, active: boolean, onClick: () => void, count?: number }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 lg:px-6 py-2 rounded-xl text-[9px] lg:text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${active ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
            <span className="flex items-center gap-2">
                {label}
                {count !== undefined && count > 0 && (
                    <span className={`w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full flex items-center justify-center text-[7px] lg:text-[8px] ${active ? 'bg-black text-amber-500' : 'bg-amber-500 text-black'}`}>
                        {count}
                    </span>
                )}
            </span>
        </button>
    );
}
