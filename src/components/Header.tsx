import { memo } from 'react';
import { Heart, Shield } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  userEmail: string;
  onLogout: () => void;
  isAdmin?: boolean;
}

export default memo(function Header({ currentPage, onNavigate, isLoggedIn, userEmail, onLogout, isAdmin = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="bg-[#E91E63] p-2.5 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300">
              <Heart className="w-7 h-7 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#212121]">Sant Kakaya</h1>
              <p className="text-xs text-gray-600">Find Your Soulmate</p>
            </div>
          </button>

          {/* Right Side - Only show if logged in */}
          {isLoggedIn && (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <div className="hidden sm:flex items-center gap-1.5 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg">
                  <Shield className="w-3.5 h-3.5 text-rose-400" />
                  <span>Admin Mode</span>
                </div>
              )}
              <span className="text-sm text-gray-700 hidden md:inline">
                {userEmail}
              </span>
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-2 border-[#E91E63] text-[#E91E63] hover:bg-[#E91E63] hover:text-white font-semibold uppercase text-sm rounded-lg h-10 px-6"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});