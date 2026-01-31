"use client";

import { useState, useEffect } from 'react';
import { getUsers, updateUserRole, deleteUser } from '@/app/actions/user';
import {
    Plus,
    UserCircle,
    Trash2,
    Users as UsersIcon,
    ArrowLeft,
    Shield,
    UserCog,
    User as UserIcon,
    Save,
    Edit3
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDashboardRole } from '@/app/actions/dashboard';
import { toast } from 'react-toastify';

export default function UsersListPage() {
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

    const fetchUsers = async () => {
        setIsLoading(true);
        const data = await getUsers();
        setUsers(data);
        setIsLoading(false);
    };

    useEffect(() => {
        async function init() {
            const role = await getDashboardRole();
            if (!role || role !== 'super-admin') {
                router.push('/dashboard');
                return;
            }
            setCurrentUserRole(role);
            fetchUsers();
        }
        init();
    }, [router]);

    const handleRoleChange = async (id: string, newRole: string) => {
        if (confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            const result = await updateUserRole(id, newRole);
            if (result.success) {
                toast.success('User role updated');
                fetchUsers();
            } else {
                toast.error(result.error);
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            const result = await deleteUser(id);
            if (result.success) {
                toast.success('User deleted successfully');
                fetchUsers();
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
                            <h1 className="text-2xl font-bold tracking-tight">Dashboard Users</h1>
                            <p className="text-zinc-500 text-sm">Manage administrative access levels.</p>
                        </div>
                    </div>
                    <Link
                        href="/dashboard/users/new"
                        className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-2xl transition-all shadow-xl shadow-amber-500/20 active:scale-95"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add User</span>
                    </Link>
                </div>
            </header>

            <main className="p-6 lg:p-10 max-w-7xl mx-auto">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-900 border-b border-zinc-800">
                                <tr>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">User</th>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Role</th>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Created</th>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-zinc-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {isLoading ? (
                                    Array.from({ length: 3 }).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan={4} className="px-8 py-6 h-20 bg-zinc-900/20"></td>
                                        </tr>
                                    ))
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <UsersIcon className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                                            <p className="text-zinc-500 font-medium">No database users found.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user._id} className="hover:bg-zinc-800/20 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 text-amber-500">
                                                        <UserCircle className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white uppercase tracking-tight">{user.username}</p>
                                                        <p className="text-zinc-500 text-[10px] font-black tracking-widest uppercase">{user.email || 'No email'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <select
                                                    defaultValue={user.role}
                                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                    className="bg-zinc-950 border border-zinc-800 text-zinc-400 rounded-lg px-3 py-1.5 focus:border-amber-500 outline-none transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
                                                >
                                                    <option value="super-admin">Super Admin</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="agent">Agent</option>
                                                </select>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-zinc-500 text-xs font-medium">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </p>
                                            </td>
                                            <td className="px-8 py-6 text-right space-x-3">
                                                <Link
                                                    href={`/dashboard/users/edit/${user._id}`}
                                                    className="inline-flex p-3 bg-zinc-900 text-zinc-500 hover:text-amber-500 hover:bg-amber-500/10 rounded-xl transition-all"
                                                    title="Edit User"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="p-3 bg-zinc-900 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                    title="Delete User"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
