"use client";

import { useState, useEffect } from 'react';
import { getTeamMembers, deleteTeamMember } from '@/app/actions/team';
import {
    Plus,
    Edit3,
    Trash2,
    Users,
    ArrowLeft,
    User,
    Mail,
    Linkedin,
    Award,
    Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDashboardRole } from '@/app/actions/dashboard';
import { toast } from 'react-toastify';

export default function TeamListPage() {
    const router = useRouter();
    const [team, setTeam] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);

    const fetchTeam = async () => {
        setIsLoading(true);
        const data = await getTeamMembers();
        setTeam(data);
        setIsLoading(false);
    };

    useEffect(() => {
        async function init() {
            const role = await getDashboardRole();
            if (!role) {
                router.push('/dashboard');
                return;
            }
            setUserRole(role);
            fetchTeam();
        }
        init();
    }, [router]);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to remove this team member?')) {
            const result = await deleteTeamMember(id);
            if (result.success) {
                toast.success('Team member removed');
                fetchTeam();
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
                            <span className="text-sm font-bold text-zinc-500 group-hover:text-white transition-colors">Back to Dashboard</span>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Team Roster</h1>
                            <p className="text-zinc-500 text-sm">Manage the creative minds behind Indepth Studio.</p>
                        </div>
                    </div>
                    {userRole === 'super-admin' && (
                        <Link
                            href="/dashboard/team/new"
                            className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-2xl transition-all shadow-xl shadow-amber-500/20 active:scale-95"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Member</span>
                        </Link>
                    )}
                </div>
            </header>

            <main className="p-6 lg:p-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] aspect-[3/4] animate-pulse" />
                        ))
                    ) : team.length === 0 ? (
                        <div className="col-span-full py-40 text-center bg-zinc-900/10 border-2 border-dashed border-zinc-800 rounded-[3rem] flex flex-col items-center">
                            <Users className="w-20 h-20 text-zinc-900 mb-6" />
                            <h4 className="text-xl font-bold mb-2">The roster is empty</h4>
                            <p className="text-zinc-500 mb-8 max-w-sm">Welcome new designers, architects, and visionaries to your team.</p>
                            {userRole === 'super-admin' && (
                                <Link href="/dashboard/team/new" className="text-amber-500 font-black hover:bg-amber-500/5 px-8 py-3 rounded-2xl border border-amber-500/20 transition-all uppercase text-xs tracking-widest">
                                    Add First Member
                                </Link>
                            )}
                        </div>
                    ) : (
                        team.map((member) => (
                            <div key={member._id} className="group bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] overflow-hidden hover:border-zinc-700 transition-all flex flex-col shadow-2xl shadow-black/50">
                                <div className="aspect-[4/5] relative overflow-hidden bg-zinc-950">
                                    {member.imageUrl ? (
                                        <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <User className="w-16 h-16 text-zinc-900" />
                                        </div>
                                    )}

                                    {/* Founder Badge */}
                                    {member.isFounder && (
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-black text-[10px] font-black uppercase rounded-lg shadow-xl z-10">
                                            Founder
                                        </div>
                                    )}

                                    {/* Action Hover */}
                                    {userRole && (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 flex items-center justify-center gap-4 backdrop-blur-sm">
                                            {userRole !== 'agent' && (
                                                <Link
                                                    href={`/dashboard/team/edit/${member._id}`}
                                                    className="p-4 bg-white text-black hover:bg-amber-500 hover:text-white rounded-2xl shadow-2xl transition-all active:scale-90"
                                                    title="Edit Profile"
                                                >
                                                    <Edit3 className="w-6 h-6" />
                                                </Link>
                                            )}
                                            {(userRole === 'super-admin' || userRole === 'admin') && (
                                                <button
                                                    onClick={() => handleDelete(member._id)}
                                                    className="p-4 bg-white text-black hover:bg-red-500 hover:text-white rounded-2xl shadow-2xl transition-all active:scale-90"
                                                    title="Remove Member"
                                                >
                                                    <Trash2 className="w-6 h-6" />
                                                </button>
                                            )}
                                            {userRole === 'agent' && (
                                                <div className="text-white font-bold text-xs uppercase tracking-widest bg-black/60 px-4 py-2 rounded-xl backdrop-blur-md">
                                                    View Only
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="mb-6">
                                        <h4 className="font-bold text-xl mb-1 group-hover:text-amber-500 transition-colors uppercase tracking-tight">{member.name}</h4>
                                        <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]">{member.role}</p>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-zinc-950/50 border border-zinc-800 p-3 rounded-2xl">
                                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                                <Briefcase className="w-2.5 h-2.5" /> Projects
                                            </p>
                                            <p className="font-bold text-sm tracking-tighter">{member.stats?.projects || '0+'}</p>
                                        </div>
                                        <div className="bg-zinc-950/50 border border-zinc-800 p-3 rounded-2xl">
                                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                                <Award className="w-2.5 h-2.5" /> Experience
                                            </p>
                                            <p className="font-bold text-sm tracking-tighter">{member.stats?.years || '0y'}</p>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center gap-4 pt-6 border-t border-zinc-800/50">
                                        {member.social?.email && (
                                            <a href={`mailto:${member.social.email}`} className="text-zinc-500 hover:text-amber-500 transition-colors">
                                                <Mail className="w-5 h-5" />
                                            </a>
                                        )}
                                        {member.social?.linkedin && (
                                            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-amber-500 transition-colors">
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                        <span className="ml-auto text-[9px] font-black text-zinc-700 uppercase tracking-widest">Team {member.stats?.years || 'ID01'}</span>
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
