import React, { useState, useEffect, useMemo } from 'react';
import { AdminUser } from './adminData';
import { userService } from '../services/userService';
import { Search, Filter, UserCheck, UserX, Crown, User, Phone, Mail, MapPin, ChevronDown, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface AdminUsersSectionProps {
    onAuditLog: (action: string, target: string, details: string) => void;
}

export default function AdminUsersSection({ onAuditLog }: AdminUsersSectionProps) {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');
    const [expandedUser, setExpandedUser] = useState<string | number | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            const data = await userService.getAllUsers();
            setUsers(data);
            setIsLoading(false);
        };
        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter((u: AdminUser) => {
            const matchesSearch =
                searchQuery === '' ||
                u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (u.city && u.city.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesFilter =
                filter === 'all' || u.membership === filter;
            return matchesSearch && matchesFilter;
        });
    }, [users, searchQuery, filter]);

    const handleToggleStatus = (userId: string | number) => {
        const user = users.find((u: AdminUser) => u.id === userId)!;
        const newStatus = user.status === 'active' ? 'inactive' : 'active';

        // In a real app, this would be an API call
        setUsers((prev: AdminUser[]) =>
            prev.map((u: AdminUser) => (u.id === userId ? { ...u, status: newStatus } : u))
        );

        const actionLabel = newStatus === 'inactive' ? 'Deactivated' : 'Activated';
        toast.success(`${actionLabel} user: ${user.name}`);
        onAuditLog(
            `User ${actionLabel}`,
            user.name,
            `Changed status from ${user.status} to ${newStatus}`
        );
    };

    const statusCounts = {
        all: users.length,
        free: users.filter((u: AdminUser) => u.membership === 'free').length,
        premium: users.filter((u: AdminUser) => u.membership === 'premium').length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-gray-800">User Management</h2>
                <p className="text-sm text-gray-500 mt-1">
                    View and manage all registered users. Toggle active/inactive status as needed.
                </p>
            </div>

            {/* Search + Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, email or city..."
                        className="pl-10 h-11 border-gray-200 focus:border-rose-400"
                    />
                </div>
                <div className="flex gap-2">
                    {(['all', 'free', 'premium'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f
                                ? f === 'premium'
                                    ? 'bg-amber-500 text-white shadow-md'
                                    : f === 'free'
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'bg-[#111827] text-white shadow-md'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            {f === 'premium' && <Crown className="w-3.5 h-3.5" />}
                            {f === 'free' && <User className="w-3.5 h-3.5" />}
                            {f === 'all' && <Filter className="w-3.5 h-3.5" />}
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === f ? 'bg-white/20' : 'bg-gray-100'}`}>
                                {statusCounts[f]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            <p className="text-xs text-gray-400">
                Showing {filteredUsers.length} of {users.length} users
            </p>

            {/* Users List */}
            <div className="space-y-3 overflow-x-auto pb-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100">
                        <Loader2 className="w-10 h-10 text-rose-500 animate-spin mb-4" />
                        <p className="text-gray-500 font-medium">Loading database users...</p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                        <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-400">No users found matching your search</p>
                    </div>
                ) : (
                    filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className={`bg-white rounded-2xl border transition-all shadow-sm ${user.status === 'inactive' ? 'border-red-100 bg-red-50/30 opacity-75' : 'border-gray-100 hover:border-rose-100'
                                }`}
                        >
                            {/* Main row */}
                            <div className="p-4 flex items-center gap-4">
                                {/* Avatar */}
                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${user.membership === 'premium'
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                                    }`}>
                                    <span className="text-base font-bold text-white">{user.name[0]}</span>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-semibold text-gray-800 text-sm">{user.name}</span>
                                        {user.membership === 'premium' && (
                                            <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                                                <Crown className="w-3 h-3" /> Premium
                                            </span>
                                        )}
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${user.status === 'active'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-600'
                                            }`}>
                                            {user.status === 'active' ? '● Active' : '○ Inactive'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Mail className="w-3 h-3" /> {user.email}
                                        </span>
                                        <span className="text-xs text-gray-400 hidden sm:flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {user.city}, {user.state}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => handleToggleStatus(user.id)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${user.status === 'active'
                                            ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                                            : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
                                            }`}
                                    >
                                        {user.status === 'active' ? (
                                            <><UserX className="w-3.5 h-3.5" /> Deactivate</>
                                        ) : (
                                            <><UserCheck className="w-3.5 h-3.5" /> Activate</>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                                        className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedUser === user.id ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedUser === user.id && (
                                <div className="px-4 pb-4 pt-0 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-gray-100 mt-1">
                                    <div className="col-span-2 sm:col-span-1">
                                        <p className="text-xs text-gray-400 mb-1">Phone</p>
                                        <div className="flex items-center gap-1">
                                            <Phone className="w-3 h-3 text-gray-400" />
                                            <span className="text-xs text-gray-700">{user.phone}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Age / Gender</p>
                                        <span className="text-xs text-gray-700">{user.age} yrs, {user.gender}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Religion</p>
                                        <span className="text-xs text-gray-700">{user.religion}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Occupation</p>
                                        <span className="text-xs text-gray-700">{user.occupation}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Registered On</p>
                                        <span className="text-xs text-gray-700">
                                            {new Date(user.registeredOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                    {user.membership === 'premium' && user.premiumExpiry && (
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">Premium Expires</p>
                                            <span className="text-xs text-amber-600 font-medium">
                                                {new Date(user.premiumExpiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
