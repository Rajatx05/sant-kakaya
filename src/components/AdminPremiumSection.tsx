import React, { useState, useEffect } from 'react';
import { Crown, AlertTriangle, CheckCircle, Clock, CreditCard, Mail, Phone, Loader2, MapPin } from 'lucide-react';
import { userService } from '../services/userService';
import { IUser } from '../types/user';

export default function AdminPremiumSection() {
    const [premiumUsers, setPremiumUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const today = new Date();

    useEffect(() => {
        const fetchPremiumUsers = async () => {
            setIsLoading(true);
            const allUsers = await userService.getAllUsers();
            if (allUsers) {
                setPremiumUsers(allUsers.filter((u) => u.membership === 'premium'));
            }
            setIsLoading(false);
        };
        fetchPremiumUsers();
    }, []);

    const getDaysUntilExpiry = (expiryDate: string) => {
        const expiry = new Date(expiryDate);
        const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    };

    const getExpiryStatus = (expiryDate: string) => {
        const days = getDaysUntilExpiry(expiryDate);
        if (days < 0) return { label: 'Expired', bg: 'bg-red-100', text: 'text-red-600', icon: AlertTriangle };
        if (days <= 7) return { label: `Expires in ${days}d`, bg: 'bg-amber-100', text: 'text-amber-600', icon: AlertTriangle };
        if (days <= 30) return { label: `${days} days left`, bg: 'bg-blue-100', text: 'text-blue-600', icon: Clock };
        return { label: `${days} days left`, bg: 'bg-green-100', text: 'text-green-600', icon: CheckCircle };
    };

    // Summary stats
    const totalPremium = premiumUsers.length;
    const expiringSoon = premiumUsers.filter(u => u.premiumExpiry && getDaysUntilExpiry(u.premiumExpiry) <= 7).length;
    const expired = premiumUsers.filter(u => u.premiumExpiry && getDaysUntilExpiry(u.premiumExpiry) < 0).length;
    const paidUp = premiumUsers.filter(u => (u as any).paymentStatus === 'paid').length;
    const pendingPayment = premiumUsers.filter(u => (u as any).paymentStatus === 'pending').length;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-amber-100 shadow-sm min-h-[400px]">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Monitoring premium subscriptions...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-gray-800">Premium Monitoring</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Track premium subscriptions, payment status, and expiry alerts.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: 'Total Premium', value: totalPremium, bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: Crown },
                    { label: 'Paid Up', value: paidUp, bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100', icon: CheckCircle },
                    { label: 'Expiring Soon', value: expiringSoon, bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-100', icon: AlertTriangle },
                    { label: 'Payment Pending', value: pendingPayment, bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100', icon: CreditCard },
                ].map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className={`${card.bg} border ${card.border} rounded-2xl p-4`}>
                            <Icon className={`w-5 h-5 ${card.text} mb-2`} />
                            <p className={`text-2xl font-bold ${card.text}`}>{card.value}</p>
                            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Premium Users List */}
            <div className="space-y-3">
                {premiumUsers.map((user) => {
                    const expiry = user.premiumExpiry ? getExpiryStatus(user.premiumExpiry) : null;
                    const ExpiryIcon = expiry?.icon;
                    return (
                        <div key={user.id} className="bg-white border border-amber-100 rounded-2xl shadow-sm overflow-hidden">
                            <div className="p-4 flex items-center gap-4">
                                {/* Avatar */}
                                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-base font-bold text-white">{user.name[0]}</span>
                                </div>

                                {/* Main Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-800 text-sm">{user.name}</span>
                                        <Crown className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 mt-1">
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Mail className="w-3 h-3" /> {user.email}
                                        </span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1 hidden sm:flex">
                                            <Phone className="w-3 h-3" /> {user.phone}
                                        </span>
                                    </div>
                                </div>

                                {/* Right Side: Expiry + Payment */}
                                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                    {/* Expiry Alert */}
                                    {expiry && ExpiryIcon && (
                                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${expiry.bg} ${expiry.text}`}>
                                            <ExpiryIcon className="w-3.5 h-3.5" />
                                            {expiry.label}
                                        </span>
                                    )}
                                    {/* Payment Status */}
                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${user.paymentStatus === 'paid'
                                        ? 'bg-green-100 text-green-700'
                                        : user.paymentStatus === 'pending'
                                            ? 'bg-amber-100 text-amber-700'
                                            : 'bg-red-100 text-red-600'
                                        }`}>
                                        <CreditCard className="w-3 h-3 inline mr-1" />
                                        {user.paymentStatus === 'paid' ? 'Paid' : user.paymentStatus === 'pending' ? 'Payment Pending' : 'Failed'}
                                    </span>
                                </div>
                            </div>

                            {/* Subscription Footer */}
                            <div className="px-4 py-2.5 bg-amber-50/50 border-t border-amber-100 flex flex-wrap gap-4 text-xs text-gray-500">
                                <span>📅 Member since: {new Date(user.registeredOn || (user as any).createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                {(user as any).premiumExpiry && (
                                    <span>⏳ Expires: {new Date((user as any).premiumExpiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                )}
                                <span><MapPin className="w-3 h-3 inline mr-1" /> {user.location || `${(user as any).city || ''}, ${(user as any).state || ''}`}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
