import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AdminLoginPageProps {
    onAdminLogin: (email: string) => void;
    onNavigate: (page: string) => void;
}

import { ADMIN_CREDENTIALS } from './adminData';

export default function AdminLoginPage({ onAdminLogin, onNavigate }: AdminLoginPageProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            // Strictly check hardcoded admin credentials
            if (
                email.trim().toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
                password === ADMIN_CREDENTIALS.password
            ) {
                toast.success('Admin login successful! Welcome, ' + ADMIN_CREDENTIALS.name);
                onAdminLogin(email.trim().toLowerCase());
                return;
            }

            // Fallback: Access denied for any other attempt
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            if (newAttempts >= 3) {
                toast.error(`Multiple failed attempts detected. Access is restricted to authorized admin only.`);
            } else {
                toast.error('Invalid admin credentials. Please try again.');
            }
            setIsLoading(false);
        } catch (error) {
            toast.error('An error occurred during authentication. Please check if the server is running.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50">
            <div className="w-full max-w-md">
                <Card className="p-8 md:p-10 shadow-2xl bg-white/95 backdrop-blur border-rose-100">
                    {/* Header */}
                    <div className="flex justify-center -mt-12 mb-8">
                        <div className="w-24 h-24 bg-[#111827] rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white">
                            <Shield className="w-12 h-12 text-[#E91E63]" strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl text-gray-800 mb-1">Admin Portal</h2>
                        <p className="text-gray-500 text-sm">Sant Kakaya — Restricted Access</p>
                        <div className="mt-3 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                            <span className="text-xs text-amber-700">Authorized personnel only</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="admin-email" className="text-gray-700">Admin Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="admin-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@santkakaya.com"
                                    className="h-14 pl-12 text-base border-gray-200 focus:border-gray-500 focus:ring-gray-500"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="admin-password" className="text-gray-700">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="admin-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    className="h-14 pl-12 pr-12 text-base border-gray-200 focus:border-gray-500 focus:ring-gray-500"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            disabled={isLoading}
                            className="w-full bg-[#E91E63] hover:bg-[#D81B60] text-white h-14 text-base shadow-lg transition-colors flex items-center justify-center font-bold"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Authenticating...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    Admin Login
                                </div>
                            )}
                        </Button>
                    </form>


                    {/* Back to user login */}
                    <div className="text-center mt-6">
                        <button
                            onClick={() => onNavigate('login')}
                            className="text-sm text-rose-600 hover:text-rose-700 transition-colors"
                        >
                            ← Return to User Login
                        </button>
                    </div>
                </Card>

                <p className="text-center mt-6 text-sm text-gray-500">
                    🔒 This area is restricted to administrators only
                </p>
            </div>
        </div>
    );
}
