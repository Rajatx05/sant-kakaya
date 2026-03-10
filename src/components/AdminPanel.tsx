import { useState } from 'react';
import {
    LayoutDashboard, Users, Calendar, Crown,
    Shield, LogOut, Menu, X, ChevronRight
} from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminUsersSection from './AdminUsersSection';
import AdminMeetingsSection from './AdminMeetingsSection';
import AdminPremiumSection from './AdminPremiumSection';
import { ADMIN_CREDENTIALS } from './adminData';

type AdminSection =
    | 'dashboard'
    | 'users'
    | 'meetings'
    | 'premium';

interface AdminPanelProps {
    adminEmail: string;
    onAdminLogout: () => void;
}

const NAV_ITEMS = [
    { id: 'dashboard' as AdminSection, label: 'Dashboard', icon: LayoutDashboard, description: 'Overview & Analytics' },
    { id: 'users' as AdminSection, label: 'User Management', icon: Users, description: 'View & manage users' },
    { id: 'meetings' as AdminSection, label: 'Meetings', icon: Calendar, description: 'Monitor meetings' },
    { id: 'premium' as AdminSection, label: 'Premium', icon: Crown, description: 'Subscription tracking' },
];

export default function AdminPanel({ adminEmail, onAdminLogout }: AdminPanelProps) {
    const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleNavigate = (section: AdminSection) => {
        setActiveSection(section);
        setSidebarOpen(false);
    };

    const activeNav = NAV_ITEMS.find((n) => n.id === activeSection)!;

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard': return <AdminDashboard />;
            case 'users': return <AdminUsersSection onAuditLog={async () => { }} />;
            case 'meetings': return <AdminMeetingsSection />;
            case 'premium': return <AdminPremiumSection />;
            default: return <AdminDashboard />;
        }
    };

    // Sidebar contents reused in both mobile and desktop
    const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
        <div className="w-64 flex flex-col h-full bg-[#111827]">
            {/* Header */}
            <div className="px-5 py-5 border-b border-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#E91E63] rounded-xl flex items-center justify-center shadow-lg">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-white">Sant Kakaya</h1>
                            <p className="text-xs text-gray-400">Admin Portal</p>
                        </div>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-800 text-gray-400">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
                <div className="mt-4 bg-gray-800 rounded-xl p-3">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-rose-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{ADMIN_CREDENTIALS.name[0]}</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{ADMIN_CREDENTIALS.name}</p>
                            <p className="text-xs text-gray-400 truncate">{adminEmail}</p>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-green-400">Online — Admin Session</span>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleNavigate(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all group ${isActive
                                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`} />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{item.label}</p>
                                <p className={`text-xs truncate ${isActive ? 'text-rose-200' : 'text-gray-500 group-hover:text-gray-400'}`}>
                                    {item.description}
                                </p>
                            </div>
                            {isActive && <ChevronRight className="w-4 h-4 text-rose-200 flex-shrink-0" />}
                        </button>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-gray-800">
                <button
                    onClick={onAdminLogout}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:bg-red-900/30 hover:text-red-400 transition-all group"
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">Logout from Admin</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">

            {/* ── MOBILE: fixed overlay drawer ──────────────────── */}
            {sidebarOpen && (
                <div className="md:hidden fixed inset-0 z-40 flex">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                    {/* Drawer */}
                    <div className="relative z-50 flex-shrink-0 shadow-2xl">
                        <SidebarContent onClose={() => setSidebarOpen(false)} />
                    </div>
                </div>
            )}

            {/* ── DESKTOP: static in-flow sidebar (no overlap ever) ─ */}
            <div className={`hidden md:flex flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${sidebarOpen ? 'w-64' : 'w-0'}`}>
                <SidebarContent />
            </div>

            {/* ======== MAIN CONTENT ======== */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                    <div className="flex items-center justify-between px-4 sm:px-6 h-16">
                        <div className="flex items-center gap-3">
                            {/* Hamburger — always visible */}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
                                title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 hidden sm:inline">Admin</span>
                                <ChevronRight className="w-4 h-4 text-gray-300 hidden sm:inline" />
                                <div className="flex items-center gap-2">
                                    {activeNav && <activeNav.icon className="w-4 h-4 text-rose-500" />}
                                    <span className="text-sm font-semibold text-gray-800">{activeNav?.label}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 bg-[#111827] rounded-xl px-3 py-2">
                                <Shield className="w-4 h-4 text-rose-400" />
                                <span className="text-xs font-medium text-white">Admin Mode</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                        {renderSection()}
                    </div>
                </main>
            </div>
        </div>
    );
}


