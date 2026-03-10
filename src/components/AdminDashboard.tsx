import React, { useState, useEffect } from 'react';
import { AdminUser, AdminMeeting } from './adminData';
import { UserData, userService } from '../services/userService';
import { meetingService } from '../services/meetingService';
import { statsService, DashboardStats, RegistrationTrend } from '../services/statsService';
import { Users, Crown, Heart, Calendar, CheckCircle, Clock, UserCheck, TrendingUp, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [trend, setTrend] = useState<RegistrationTrend[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<UserData[]>([]);
    const [meetings, setMeetings] = useState<AdminMeeting[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            const [statsData, trendData, userData, meetingData] = await Promise.all([
                statsService.getStats(),
                statsService.getTrend(),
                userService.getAllUsers(),
                meetingService.getAllMeetings()
            ]);
            setStats(statsData);
            setTrend(trendData);
            setUsers(userData);
            setMeetings(meetingData);
            setIsLoading(false);
        };
        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
                <Loader2 className="w-10 h-10 text-rose-500 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading platform analytics...</p>
            </div>
        );
    }

    if (!stats) return null;

    const statCards = [
        // ... unchanged ...
    ];

    const BAR_COLORS = ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffe4e6', '#fff1f2'];

    // Recent activity
    const recentUsers = [...users]
        .sort((a, b) => new Date(b.registeredOn).getTime() - new Date(a.registeredOn).getTime())
        .slice(0, 5);

    const recentMeetings = [...meetings]
        .sort((a, b) => new Date(b.scheduledOn).getTime() - new Date(a.scheduledOn).getTime())
        .slice(0, 4);

    const statusColors: Record<string, string> = {
        pending: 'bg-amber-100 text-amber-700',
        confirmed: 'bg-blue-100 text-blue-700',
        completed: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700',
    };

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="bg-[#111827] rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Admin Dashboard Overview</h2>
                        <p className="text-gray-300 text-sm mt-0.5">Sant Kakaya Matrimonial — Platform Analytics</p>
                    </div>
                    <div className="ml-auto text-right hidden sm:block">
                        <p className="text-gray-400 text-xs">Last updated</p>
                        <p className="text-white text-sm font-medium">
                            {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.label}
                            className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                            <div className={`inline-flex items-center justify-center w-11 h-11 ${card.lightBg} rounded-xl mb-3`}>
                                <Icon className={`w-6 h-6 ${card.textColor}`} />
                            </div>
                            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                            <p className="text-xs text-gray-500 mt-1 leading-snug">{card.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts + Recent Activity Row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Registration Trend Chart */}
                <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <h3 className="text-base font-semibold text-gray-800 mb-1">User Registrations</h3>
                    <p className="text-xs text-gray-400 mb-5">Registration analytics</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={trend} barSize={36}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
                                cursor={{ fill: '#f8fafc' }}
                            />
                            <Bar dataKey="users" radius={[6, 6, 0, 0]}>
                                {trend.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Meetings */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <h3 className="text-base font-semibold text-gray-800 mb-4">Recent Meetings</h3>
                    <div className="space-y-3">
                        {recentMeetings.map((m) => (
                            <div key={m.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-4 h-4 text-rose-500" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-gray-800 truncate">
                                        {m.user1Name.split(' ')[0]} & {m.user2Name.split(' ')[0]}
                                    </p>
                                    <p className="text-xs text-gray-400">{m.date}</p>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto flex-shrink-0 ${statusColors[m.status]}`}>
                                    {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Registrations Table */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="text-base font-semibold text-gray-800 mb-4">Recent Registrations</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4">Name</th>
                                <th className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4 hidden sm:table-cell">Email</th>
                                <th className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4">City</th>
                                <th className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4">Membership</th>
                                <th className="text-left text-xs font-semibold text-gray-400 pb-3">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentUsers.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-bold text-rose-600">{u.name[0]}</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-800">{u.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 pr-4 hidden sm:table-cell">
                                        <span className="text-xs text-gray-500">{u.email}</span>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span className="text-xs text-gray-600">{u.city}</span>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.membership === 'premium' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {u.membership === 'premium' ? '✦ Premium' : 'Free'}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <span className="text-xs text-gray-400">
                                            {new Date(u.registeredOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
