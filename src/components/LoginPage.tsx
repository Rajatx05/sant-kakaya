import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { toast } from 'sonner';

import { userService } from '../services/userService';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onGoBack: () => void;
  onLogin: (email: string, name: string, isPremium: boolean) => void;
}

export default function LoginPage({ onNavigate, onGoBack, onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Demo credentials: email: abc123@gmail.com, password: 12345
  const DEMO_EMAIL = 'abc123@gmail.com';
  const DEMO_PASSWORD = '12345';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Check registered users first
    const registeredUser = await userService.loginUser(email, password);
    if (registeredUser) {
      toast.success(`Login successful! Welcome back ${registeredUser.name || 'User'} 🎉`);
      onLogin(email, registeredUser.name || 'User', registeredUser.membership === 'premium');
      setTimeout(() => onNavigate('matches'), 1500);
      return;
    }

    // Validate demo credentials
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      toast.success('Login successful! Welcome back 🎉');
      onLogin(email, 'Demo User', false); // Demo user is FREE (not premium)
      setTimeout(() => onNavigate('matches'), 1500);
    } else {
      toast.error('Invalid email or password. Try: abc123@gmail.com / 12345 or register a new account.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="p-8 md:p-10 shadow-2xl bg-white/95 backdrop-blur border-rose-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl mb-5 shadow-md">
              <Heart className="w-10 h-10 text-rose-600" fill="currentColor" />
            </div>
            <h2 className="text-2xl text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to find your perfect match</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-gray-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-14 pl-12 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-14 pl-12 pr-12 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-rose-500 focus:ring-rose-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-rose-600 hover:text-rose-700">
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-14 text-base shadow-lg"
            >
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('registration')}
                className="text-rose-600 hover:text-rose-700 font-medium"
              >
                Register Now
              </button>
            </p>

            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => onNavigate('adminlogin')}
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-600 transition-colors group"
              >
                <Shield className="w-4 h-4 text-gray-400 group-hover:text-rose-500" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>
        </Card>

        <p className="text-center mt-6 text-sm text-gray-500">
          🔒 Secure and encrypted
        </p>
      </div>
    </div>
  );
}