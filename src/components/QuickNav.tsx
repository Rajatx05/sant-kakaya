import { memo, useMemo } from 'react';
import { Heart, User, Mail, Shield } from 'lucide-react';

interface QuickNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  isAdmin?: boolean;
}

export default memo(function QuickNav({ currentPage, onNavigate, isLoggedIn, isAdmin = false }: QuickNavProps) {
  // Only show for logged-in users
  if (!isLoggedIn) return null;

  // Hide QuickNav on registration and payment pages (during onboarding flow)
  const hiddenPages = ['registration', 'payment', 'login'];
  if (hiddenPages.includes(currentPage)) return null;

  const navItems = useMemo(() => [
    {
      id: 'matches',
      icon: Heart,
      page: 'matches',
      label: 'Matches',
      color: 'text-rose-500 hover:text-rose-600'
    },
    {
      id: 'inbox',
      icon: Mail,
      page: 'inbox',
      label: 'Inbox',
      color: 'text-blue-500 hover:text-blue-600'
    },
    {
      id: 'profile',
      icon: User,
      page: 'myprofile',
      label: 'Profile',
      color: 'text-gray-500 hover:text-gray-700'
    },
    ...(isAdmin ? [{
      id: 'admin',
      icon: Shield,
      page: 'admin',
      label: 'Admin',
      color: 'text-gray-300 hover:text-white'
    }] : []),
  ], [isAdmin]);

  return (
    <>
      {/* Desktop Vertical Sidebar - Right Side Only */}
      <div className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 bg-gray-800 rounded-3xl shadow-2xl z-40 py-6 px-4">
        <div className="flex flex-col items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.page)}
                className={`group relative p-4 rounded-2xl transition-all duration-200 ${isActive ? 'scale-110 bg-gray-700' : 'hover:bg-gray-700 hover:scale-105'
                  }`}
                title={item.label}
              >
                <Icon
                  className={`w-7 h-7 transition-colors ${item.label === 'Matches'
                      ? 'text-rose-400 fill-rose-400'
                      : item.label === 'Inbox'
                        ? 'text-blue-400'
                        : isActive
                          ? 'text-gray-200'
                          : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                />

                {/* Tooltip */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg">
                  {item.label}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-gray-900"></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Navigation - Instagram Style */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-inset-bottom shadow-lg">
        <div className="flex items-center justify-around px-6 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.page)}
                className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-200 touch-manipulation ${isActive ? 'scale-110' : 'active:scale-95'
                  }`}
                aria-label={item.label}
              >
                <Icon
                  className={`w-7 h-7 transition-colors ${item.label === 'Matches'
                      ? 'text-rose-500 fill-rose-500'
                      : item.label === 'Inbox'
                        ? 'text-blue-500'
                        : isActive
                          ? 'text-gray-800'
                          : 'text-gray-500'
                    }`}
                />
                <span className={`text-xs transition-colors ${isActive ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
});