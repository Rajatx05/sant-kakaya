import { memo } from 'react';
import { Heart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default memo(function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-rose-900 via-pink-900 to-rose-800 text-white pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/10 p-2 rounded-lg">
                <Heart className="w-6 h-6" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-white">Sant Kakaya</h3>
                <p className="text-sm text-rose-200">Find Your Soulmate</p>
              </div>
            </div>
            <p className="text-rose-200 text-sm leading-relaxed">
              India's most trusted matrimonial platform helping thousands find their perfect life partner.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase())}
                    className="text-rose-200 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><button className="text-rose-200 hover:text-white transition-colors text-sm">Privacy Policy</button></li>
              <li><button className="text-rose-200 hover:text-white transition-colors text-sm">Terms & Conditions</button></li>
              <li><button className="text-rose-200 hover:text-white transition-colors text-sm">Refund Policy</button></li>
              <li><button className="text-rose-200 hover:text-white transition-colors text-sm">Safety Tips</button></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-rose-200 text-sm">
            © 2025 Sant Kakaya. All rights reserved.
            <button
              onClick={() => onNavigate('adminlogin')}
              className="ml-2 text-[10px] text-rose-300/30 hover:text-rose-200 transition-colors uppercase tracking-wider font-medium"
            >
              Admin
            </button>
          </p>
          <div className="flex gap-4">
            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
              <Instagram className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});