import React, { useState, useEffect } from 'react';
import { Bell, Send, Users, User, MessageSquare, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { notificationService, AdminNotification } from '../services/notificationService';
import { userService } from '../services/userService';
import { IUser } from '../types/user';

interface AdminNotificationsSectionProps {
    onAuditLog: (action: string, target: string, details: string) => void;
}

export default function AdminNotificationsSection({ onAuditLog }: AdminNotificationsSectionProps) {
    const [broadcastMessage, setBroadcastMessage] = useState('');
    const [targetedUserId, setTargetedUserId] = useState<string | ''>('');
    const [targetedMessage, setTargetedMessage] = useState('');
    const [notificationHistory, setNotificationHistory] = useState<AdminNotification[]>([]);
    const [activeTab, setActiveTab] = useState<'broadcast' | 'targeted'>('broadcast');
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const loadHistory = async () => {
            setIsLoading(true);
            const [history, allUsers] = await Promise.all([
                notificationService.getHistory(),
                userService.getAllUsers()
            ]);
            setNotificationHistory(history);
            setUsers(allUsers || []);
            setIsLoading(false);
        };
        loadHistory();
    }, []);

    const handleSendBroadcast = async () => {
        if (!broadcastMessage.trim()) {
            toast.error('Please enter a message to broadcast');
            return;
        }
        const newNotif = await notificationService.sendNotification({
            type: 'broadcast',
            recipient: 'All Users',
            message: broadcastMessage,
        });

        if (newNotif) {
            setNotificationHistory((prev) => [newNotif, ...prev]);
            onAuditLog('Broadcast Notification Sent', 'All Users', broadcastMessage.slice(0, 60));
            toast.success(`✅ Broadcast sent to all ${users.length} users!`);
            setBroadcastMessage('');
        }
    };

    const handleSendTargeted = async () => {
        if (!targetedUserId || !targetedMessage.trim()) {
            toast.error('Please select a user and enter a message');
            return;
        }
        const user = users.find((u) => u.id === targetedUserId || u._id === targetedUserId);
        if (!user) return;

        const newNotif = await notificationService.sendNotification({
            type: 'targeted',
            recipient: user.name,
            message: targetedMessage,
        });

        if (newNotif) {
            setNotificationHistory((prev) => [newNotif, ...prev]);
            onAuditLog('Targeted Notification Sent', user.name, targetedMessage.slice(0, 60));
            toast.success(`✅ Notification sent to ${user.name}!`);
            setTargetedMessage('');
            setTargetedUserId('');
        }
    };

    const formatTime = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-gray-800">Notifications Control</h2>
                <p className="text-sm text-gray-500 mt-1">Send announcements to all users or target specific individuals.</p>
            </div>

            {/* Compose Tabs */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="flex border-b border-gray-100">
                    {([
                        { key: 'broadcast', label: 'Broadcast', icon: Users },
                        { key: 'targeted', label: 'Targeted', icon: User },
                    ] as const).map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-all ${activeTab === key
                                ? 'bg-rose-50 text-rose-600 border-b-2 border-rose-500'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </button>
                    ))}
                </div>

                <div className="p-5">
                    {activeTab === 'broadcast' ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center">
                                    <Bell className="w-4 h-4 text-rose-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">Broadcast Notification</p>
                                    <p className="text-xs text-gray-400">This message will be sent to all {users.length} registered users</p>
                                </div>
                            </div>
                            <div className="bg-rose-50 border border-rose-100 rounded-xl p-3">
                                <p className="text-xs text-rose-700">📢 Recipients: <strong>All Users ({users.length} members)</strong></p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    value={broadcastMessage}
                                    onChange={(e) => setBroadcastMessage(e.target.value)}
                                    placeholder="Type your broadcast message here..."
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 resize-none"
                                />
                                <p className="text-xs text-gray-400 mt-1 text-right">{broadcastMessage.length} characters</p>
                            </div>
                            <Button
                                onClick={handleSendBroadcast}
                                className="w-full bg-[#E91E63] hover:bg-[#D81B60] text-white h-11 shadow-md transition-colors"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Send Broadcast to All Users
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                                    <MessageSquare className="w-4 h-4 text-indigo-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">Targeted Notification</p>
                                    <p className="text-xs text-gray-400">Send a message to a specific user</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select User</label>
                                <select
                                    value={targetedUserId}
                                    onChange={(e) => setTargetedUserId(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 bg-white"
                                >
                                    <option value="">— Select a user —</option>
                                    {users.filter(u => u.status === 'active').map((u) => (
                                        <option key={u.id || u._id} value={u.id || u._id}>
                                            {u.name} ({u.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    value={targetedMessage}
                                    onChange={(e) => setTargetedMessage(e.target.value)}
                                    placeholder="Type your message to this user..."
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 resize-none"
                                />
                            </div>
                            <Button
                                onClick={handleSendTargeted}
                                className="w-full bg-[#3F51B5] hover:bg-[#303F9F] text-white h-11 shadow-md transition-colors"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Send to Selected User
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Notification History */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                <h3 className="text-base font-semibold text-gray-800 mb-4">Notification History</h3>
                <div className="space-y-3">
                    {notificationHistory.map((n) => (
                        <div key={n._id || (n as any).id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${n.type === 'broadcast' ? 'bg-rose-100' : 'bg-indigo-100'
                                }`}>
                                {n.type === 'broadcast' ? (
                                    <Users className="w-4 h-4 text-rose-500" />
                                ) : (
                                    <User className="w-4 h-4 text-indigo-500" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${n.type === 'broadcast' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'
                                        }`}>
                                        {n.type === 'broadcast' ? 'Broadcast' : 'Targeted'}
                                    </span>
                                    <span className="text-xs text-gray-400">→ {n.recipient}</span>
                                </div>
                                <p className="text-xs text-gray-700">{n.message}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    <span className="text-xs text-gray-400">{formatTime(n.sentAt)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
