"use client";

import { useState, useEffect } from 'react';
import { getBlogs, deleteBlog } from '@/app/actions/blog';
import {
    Plus,
    Edit3,
    Trash2,
    FileText,
    ArrowLeft,
    Calendar,
    Tag,
    User,
    Search,
    ChevronRight,
    MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDashboardRole } from '@/app/actions/dashboard';
import { toast } from 'react-toastify';

export default function BlogsListPage() {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchBlogs = async () => {
        setIsLoading(true);
        const data = await getBlogs();
        setBlogs(data);
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
            fetchBlogs();
        }
        init();
    }, [router]);

    const handleDelete = async (id: string) => {
        if (role === 'agent') return;
        if (confirm('Are you sure you want to delete this article? This will remove it from the public blog.')) {
            const result = await deleteBlog(id);
            if (result.success) {
                toast.success('Article deleted successfully');
                fetchBlogs();
            } else {
                toast.error(result.error);
            }
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <h1 className="text-2xl font-bold tracking-tight">Blog Management</h1>
                            <p className="text-zinc-500 text-sm">Compose articles and share your design philosophy.</p>
                        </div>
                    </div>
                    <Link
                        href="/dashboard/blogs/new"
                        className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-2xl transition-all shadow-xl shadow-amber-500/20 active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Compose Post</span>
                    </Link>
                </div>
            </header>

            <main className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-zinc-900/50 border border-zinc-800 rounded-3xl focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-zinc-700 font-medium"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] p-8 h-48 animate-pulse" />
                        ))
                    ) : filteredBlogs.length === 0 ? (
                        <div className="py-40 text-center bg-zinc-900/30 border border-zinc-800 rounded-[3rem] border-dashed flex flex-col items-center">
                            <FileText className="w-20 h-20 text-zinc-800 mb-6" />
                            <h4 className="text-xl font-bold mb-2">The editor is empty</h4>
                            <p className="text-zinc-500 mb-8 max-w-sm">Share your story with the world. Start by composing your first blog post.</p>
                            <Link href="/dashboard/blogs/new" className="text-amber-500 font-black hover:underline uppercase text-xs tracking-[0.2em] border border-amber-500/20 px-8 py-3 rounded-2xl hover:bg-amber-500/5 transition-all">
                                Write First Post
                            </Link>
                        </div>
                    ) : (
                        filteredBlogs.map((blog) => (
                            <div key={blog._id} className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-6 lg:p-8 hover:border-zinc-700 transition-all group flex flex-col lg:flex-row gap-8 items-center">
                                <Link
                                    href={`/blog/${blog.slug}`}
                                    className="w-full lg:w-64 aspect-[4/3] bg-zinc-950 rounded-[2rem] overflow-hidden border border-zinc-800 flex-shrink-0 relative group/img shadow-2xl"
                                >
                                    {blog.imageUrl ? (
                                        <img src={blog.imageUrl} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700" alt={blog.title} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <FileText className="w-10 h-10 text-zinc-800" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                        <ChevronRight className="w-10 h-10 text-white" />
                                    </div>
                                </Link>

                                <div className="flex-1 min-w-0 space-y-4">
                                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                        <span className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-lg text-amber-500">{blog.category}</span>
                                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{blog.date}</span>
                                        <span className="flex items-center gap-1.5"><User className="w-3 h-3" />{blog.author}</span>
                                    </div>
                                    <Link href={`/blog/${blog.slug}`} className="block group/title">
                                        <h3 className="text-2xl font-bold leading-tight group-hover/title:text-amber-500 transition-colors mb-2">{blog.title}</h3>
                                        <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">{blog.excerpt}</p>
                                    </Link>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {blog.tags?.map((tag: string, idx: number) => (
                                            <span key={idx} className="flex items-center gap-1 text-[9px] text-zinc-600 font-bold uppercase tracking-tighter">
                                                <Tag className="w-2.5 h-2.5" /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex lg:flex-col gap-3 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-zinc-800 lg:pl-8">
                                    <Link
                                        href={`/dashboard/blogs/edit/${blog._id}`}
                                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-2xl transition-all font-bold text-sm shadow-xl"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        Edit
                                    </Link>
                                    {role !== 'agent' && (
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all font-bold text-sm shadow-xl"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
