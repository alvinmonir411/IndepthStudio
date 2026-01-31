"use client";

import { useState, useEffect } from 'react';
import { getProjects, deleteProject, toggleProjectFeatured } from '@/app/actions/projects';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Edit3,
    Trash2,
    Briefcase,
    ArrowLeft,
    Search,
    Filter,
    LayoutGrid,
    List as ListIcon,
    Star
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDashboardRole } from '@/app/actions/dashboard';
import { toast } from 'react-toastify';

export default function ProjectsListPage() {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

    const fetchProjects = async () => {
        setIsLoading(true);
        const data = await getProjects();
        setProjects(data);
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
            fetchProjects();
        }
        init();
    }, [router]);

    const handleDelete = async (id: string) => {
        if (!role || role === 'agent') return;
        if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            const result = await deleteProject(id);
            if (result.success) {
                toast.success('Project deleted successfully');
                fetchProjects();
            } else {
                toast.error(result.error);
            }
        }
    };

    const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
        if (role === 'agent') return;
        const result = await toggleProjectFeatured(id, !currentStatus);
        if (result.success) {
            toast.success('Project visibility updated');
            fetchProjects();
        } else {
            toast.error(result.error);
        }
    };

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <h1 className="text-2xl font-bold tracking-tight">Project Management</h1>
                            <p className="text-zinc-500 text-sm">Organize and showcase your architectural masterpieces.</p>
                        </div>
                    </div>
                    <Link
                        href="/dashboard/projects/new"
                        className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-2xl transition-all shadow-xl shadow-amber-500/20 active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        <span>New Project</span>
                    </Link>
                </div>
            </header>

            <main className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-900/50 border border-zinc-800 p-4 rounded-3xl">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700"
                        />
                    </div>
                    <div className="flex items-center gap-3 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'table' ? 'bg-zinc-800 text-amber-500 shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                        >
                            <ListIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-zinc-800 text-amber-500 shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] overflow-hidden">
                    {isLoading ? (
                        <div className="p-32 flex flex-col items-center justify-center gap-4 text-center">
                            <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Fetching projects...</p>
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="p-32 text-center flex flex-col items-center">
                            <div className="w-20 h-20 bg-zinc-950 rounded-3xl flex items-center justify-center mb-6 border border-zinc-800 shadow-2xl">
                                <Briefcase className="w-10 h-10 text-zinc-700" />
                            </div>
                            <h4 className="text-xl font-bold mb-2">No projects found</h4>
                            <p className="text-zinc-500 max-w-sm mb-8">Start by adding your first project to your professional portfolio.</p>
                            <Link
                                href="/dashboard/projects/new"
                                className="text-amber-500 font-black hover:bg-amber-500/10 px-6 py-2 rounded-xl border border-amber-500/20 transition-all uppercase text-xs tracking-wider"
                            >
                                Create Project
                            </Link>
                        </div>
                    ) : viewMode === 'table' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-zinc-950/50 border-b border-zinc-800">
                                    <tr>
                                        <th className="px-8 py-5 font-black text-zinc-500 text-[10px] uppercase tracking-[0.2em] w-1/2">Project Detail</th>
                                        <th className="px-8 py-5 font-black text-zinc-500 text-[10px] uppercase tracking-[0.2em]">Category</th>
                                        <th className="px-8 py-5 font-black text-zinc-500 text-[10px] uppercase tracking-[0.2em]">Status</th>
                                        <th className="px-8 py-5 font-black text-zinc-500 text-[10px] uppercase tracking-[0.2em] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    {filteredProjects.map((project) => (
                                        <tr key={project._id} className="hover:bg-zinc-800/20 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                                                        {project.imageUrl ? (
                                                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center">
                                                                <Briefcase className="w-6 h-6 text-amber-500/40" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-lg group-hover:text-amber-500 transition-colors truncate">{project.title}</p>
                                                        <p className="text-xs text-zinc-500 truncate mt-1">
                                                            {project.location ? `${project.location} • ` : ''}{project.year || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1 bg-zinc-950 text-zinc-400 text-[10px] font-black uppercase tracking-wider rounded-lg border border-zinc-800">
                                                    {project.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleToggleFeatured(project._id, project.isFeatured)}
                                                        className={`p-1.5 rounded-lg transition-all ${project.isFeatured ? 'text-amber-500 bg-amber-500/10 border border-amber-500/20' : 'text-zinc-600 hover:text-zinc-400'}`}
                                                        title={project.isFeatured ? 'Unfeature Project' : 'Feature Project'}
                                                        disabled={role === 'agent'}
                                                    >
                                                        <Star className={`w-4 h-4 ${project.isFeatured ? 'fill-amber-500' : ''}`} />
                                                    </button>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${project.isFeatured ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                                                        <span className="text-xs font-bold text-zinc-300">
                                                            {project.isFeatured ? 'Featured' : 'Published'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right space-x-3">
                                                <Link
                                                    href={`/dashboard/projects/edit/${project._id}`}
                                                    className="inline-flex p-3 text-zinc-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-xl border border-transparent hover:border-amber-500/20 transition-all active:scale-90"
                                                >
                                                    <Edit3 className="w-5 h-5" />
                                                </Link>
                                                {role !== 'agent' && (
                                                    <button
                                                        onClick={() => handleDelete(project._id)}
                                                        className="p-3 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl border border-transparent hover:border-red-500/20 transition-all active:scale-90"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                            {filteredProjects.map((project) => (
                                <div key={project._id} className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden group hover:border-zinc-700 transition-all flex flex-col">
                                    <div className="aspect-[4/3] relative overflow-hidden bg-zinc-900">
                                        {project.imageUrl ? (
                                            <img src={project.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={project.title} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Briefcase className="w-12 h-12 text-zinc-800" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                            <button
                                                onClick={() => handleToggleFeatured(project._id, project.isFeatured)}
                                                className={`p-3 bg-black/60 backdrop-blur-md rounded-2xl border transition-all ${project.isFeatured ? 'text-amber-500 border-amber-500/30' : 'text-white border-white/10 hover:text-amber-500'}`}
                                                disabled={role === 'agent'}
                                            >
                                                <Star className={`w-5 h-5 ${project.isFeatured ? 'fill-amber-500' : ''}`} />
                                            </button>
                                            <Link href={`/dashboard/projects/edit/${project._id}`} className="p-3 bg-black/60 backdrop-blur-md text-white hover:text-amber-500 rounded-2xl border border-white/10 transition-all">
                                                <Edit3 className="w-5 h-5" />
                                            </Link>
                                            {role !== 'agent' && (
                                                <button onClick={() => handleDelete(project._id)} className="p-3 bg-black/60 backdrop-blur-md text-white hover:text-red-500 rounded-2xl border border-white/10 transition-all">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                        {project.isFeatured && (
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-black text-[10px] font-black uppercase rounded-lg shadow-xl flex items-center gap-1.5">
                                                <Star className="w-3 h-3 fill-black" />
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-bold text-lg mb-1 group-hover:text-amber-500 transition-colors truncate">{project.title}</h4>
                                            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{project.category}</p>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                                            <p className="text-[10px] text-zinc-600 font-bold uppercase">{project.location || 'Global'}</p>
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 rounded-md border border-zinc-800">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                                <span className="text-[9px] font-black text-emerald-500 uppercase">Live</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
