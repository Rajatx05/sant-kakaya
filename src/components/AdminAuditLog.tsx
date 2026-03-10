import { Clock, Activity, User, Bell, UserX, UserCheck, Search } from 'lucide-react';

export interface AuditEntry {
    id: number;
    timestamp: string;
    action: string;
    target: string;
    details: string;
    adminEmail: string;
}

interface AdminAuditLogProps {
    logs: AuditEntry[];
}

const ACTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    'User Deactivated': UserX,
    'User Activated': UserCheck,
    'Broadcast Notification Sent': Bell,
    'Targeted Notification Sent': Bell,
    'Admin Login': User,
};

const ACTION_COLORS: Record<string, string> = {
    'User Deactivated': 'bg-red-100 text-red-600',
    'User Activated': 'bg-green-100 text-green-600',
    'Broadcast Notification Sent': 'bg-rose-100 text-rose-600',
    'Targeted Notification Sent': 'bg-indigo-100 text-indigo-600',
    'Admin Login': 'bg-gray-100 text-gray-600',
};

export default function AdminAuditLog({ logs }: AdminAuditLogProps) {
    const formatTime = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-gray-800">Audit Log</h2>
                <p className="text-sm text-gray-500 mt-1">
                    A record of all admin actions performed during this session.
                </p>
            </div>

            {/* Summary */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-800">Session Audit Log</p>
                    <p className="text-xs text-gray-400">{logs.length} action{logs.length !== 1 ? 's' : ''} recorded this session</p>
                </div>
                <div className="ml-auto">
                    <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-full font-medium">
                        {logs.length} entries
                    </span>
                </div>
            </div>

            {/* Log Table */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                {logs.length === 0 ? (
                    <div className="text-center py-16">
                        <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                        <p className="text-gray-400 text-sm">No admin actions recorded yet this session</p>
                        <p className="text-gray-300 text-xs mt-1">Actions you perform (deactivate users, send notifications) will appear here</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left text-xs font-semibold text-gray-400 px-4 py-3">#</th>
                                    <th className="text-left text-xs font-semibold text-gray-400 px-4 py-3">Timestamp</th>
                                    <th className="text-left text-xs font-semibold text-gray-400 px-4 py-3">Action</th>
                                    <th className="text-left text-xs font-semibold text-gray-400 px-4 py-3 hidden sm:table-cell">Target</th>
                                    <th className="text-left text-xs font-semibold text-gray-400 px-4 py-3 hidden md:table-cell">Details</th>
                                    <th className="text-left text-xs font-semibold text-gray-400 px-4 py-3 hidden lg:table-cell">Admin</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {logs.map((log, index) => {
                                    const Icon = ACTION_ICONS[log.action] || Activity;
                                    const colorClass = ACTION_COLORS[log.action] || 'bg-gray-100 text-gray-600';
                                    return (
                                        <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-gray-300 font-mono">{String(index + 1).padStart(3, '0')}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <Clock className="w-3 h-3 text-gray-300" />
                                                    {formatTime(log.timestamp)}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${colorClass}`}>
                                                    <Icon className="w-3 h-3" />
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 hidden sm:table-cell">
                                                <span className="text-xs text-gray-700">{log.target}</span>
                                            </td>
                                            <td className="px-4 py-3 hidden md:table-cell">
                                                <span className="text-xs text-gray-400">{log.details}</span>
                                            </td>
                                            <td className="px-4 py-3 hidden lg:table-cell">
                                                <span className="text-xs text-gray-400 font-mono">{log.adminEmail}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
