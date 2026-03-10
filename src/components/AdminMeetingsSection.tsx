import React, { useState, useMemo, useEffect } from 'react';
import { AdminMeeting } from './adminData';
import { meetingService } from '../services/meetingService';
import { Calendar, Phone, Mail, MapPin, Clock, CheckCircle, XCircle, AlertCircle, Filter, Loader2 } from 'lucide-react';

export default function AdminMeetingsSection() {
    const [meetings, setMeetings] = useState<AdminMeeting[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');

    useEffect(() => {
        const fetchMeetings = async () => {
            setIsLoading(true);
            const data = await meetingService.getAllMeetings();
            setMeetings(data);
            setIsLoading(false);
        };
        fetchMeetings();
    }, []);

    const filteredMeetings = useMemo(() => {
        if (statusFilter === 'all') return meetings;
        return meetings.filter((m: AdminMeeting) => m.status === statusFilter);
    }, [statusFilter, meetings]);

    const statusConfig: Record<string, { label: string; bg: string; text: string; icon: React.ComponentType<{ className?: string }> }> = {
        pending: { label: 'Pending', bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock },
        confirmed: { label: 'Confirmed', bg: 'bg-blue-100', text: 'text-blue-700', icon: CheckCircle },
        completed: { label: 'Completed', bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
        cancelled: { label: 'Cancelled', bg: 'bg-red-100', text: 'text-red-600', icon: XCircle },
    };

    const counts = {
        all: meetings.length,
        pending: meetings.filter((m: AdminMeeting) => m.status === 'pending').length,
        confirmed: meetings.filter((m: AdminMeeting) => m.status === 'confirmed').length,
        completed: meetings.filter((m: AdminMeeting) => m.status === 'completed').length,
        cancelled: meetings.filter((m: AdminMeeting) => m.status === 'cancelled').length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-gray-800">Meeting Monitoring</h2>
                <p className="text-sm text-gray-500 mt-1">
                    View all scheduled meetings between users — read-only monitoring.
                </p>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex flex-wrap gap-2">
                {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((s) => {
                    const cfg = s === 'all' ? null : statusConfig[s];
                    return (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === s
                                ? 'bg-[#111827] text-white shadow-md'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            {s === 'all' ? <Filter className="w-3.5 h-3.5" /> : cfg && <cfg.icon className="w-3.5 h-3.5" />}
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${statusFilter === s ? 'bg-white/20' : 'bg-gray-100'}`}>
                                {counts[s]}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Meetings Cards */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <Loader2 className="w-10 h-10 text-rose-500 animate-spin mb-4" />
                        <p className="text-gray-500 font-medium">Fetching meeting schedules...</p>
                    </div>
                ) : filteredMeetings.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                        <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-400">No meetings with this status</p>
                    </div>
                ) : (
                    filteredMeetings.map((meeting) => {
                        const cfg = statusConfig[meeting.status];
                        const StatusIcon = cfg.icon;
                        return (
                            <div key={meeting.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                                {/* Meeting Header */}
                                <div className="bg-[#F9FAFB] px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-rose-500" />
                                        <span className="text-sm font-semibold text-gray-800">
                                            Meeting #{meeting.id} — {meeting.date}
                                        </span>
                                        <span className="text-xs text-gray-400 hidden sm:inline">· {meeting.time}</span>
                                    </div>
                                    <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${cfg.bg} ${cfg.text}`}>
                                        <StatusIcon className="w-3.5 h-3.5" />
                                        {cfg.label}
                                    </span>
                                </div>

                                {/* Users Side-by-side */}
                                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { name: meeting.user1Name, email: meeting.user1Email, phone: meeting.user1Phone, label: 'User 1' },
                                        { name: meeting.user2Name, email: meeting.user2Email, phone: meeting.user2Phone, label: 'User 2' },
                                    ].map((u: { name: string; email: string; phone: string; label: string }, i: number) => (
                                        <div key={i} className="bg-gray-50 rounded-xl p-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center">
                                                    <span className="text-sm font-bold text-white">{u.name[0]}</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-medium">{u.label}</p>
                                                    <p className="text-sm font-semibold text-gray-800">{u.name}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                                                    <a href={`mailto:${u.email}`} className="hover:text-rose-600 transition-colors">{u.email}</a>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                                                    <a href={`tel:${u.phone}`} className="hover:text-rose-600 transition-colors">{u.phone}</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Meeting Metadata Footer */}
                                <div className="px-5 pb-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" /> {meeting.time}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" /> {meeting.location}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <AlertCircle className="w-3.5 h-3.5" /> Scheduled on {new Date(meeting.scheduledOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
