import { useState } from 'react';
import { EXPLORER_PROFILES } from './adminData';
import { Eye, Lock, Search, User, Heart, MapPin, Briefcase, ChevronDown } from 'lucide-react';
import { Input } from './ui/input';

export default function AdminExplorerSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedProfile, setExpandedProfile] = useState<number | null>(null);

    const filtered = EXPLORER_PROFILES.filter((p) =>
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.occupation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-gray-800">Application Explorer</h2>
                <p className="text-sm text-gray-500 mt-1">Browse user profiles and AI matches in read-only Safe View Mode.</p>
            </div>

            {/* Safe View Banner */}
            <div className="bg-[#1E3A8A] rounded-2xl p-4 flex items-center gap-4 shadow-lg">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-white">🔒 Safe View Mode — Read Only</p>
                    <p className="text-xs text-blue-200 mt-0.5">
                        You are browsing in Safe View Mode. No actions here will affect production data or trigger real events.
                    </p>
                </div>
                <div className="ml-auto flex-shrink-0">
                    <div className="flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1.5">
                        <Eye className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-xs text-green-300 font-medium">View Only</span>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, city, or occupation..."
                    className="pl-10 h-11 border-gray-200 focus:border-rose-400"
                />
            </div>

            {/* Profile Cards */}
            <div className="space-y-3">
                {filtered.map((profile) => (
                    <div key={profile.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                        {/* Profile Row */}
                        <div className="p-4 flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
                                <span className="text-xl font-bold text-white">{profile.name[0]}</span>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-gray-800">{profile.name}</span>
                                    <span className="text-xs text-gray-400">{profile.age} yrs · {profile.gender}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${profile.membership === 'premium' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {profile.membership === 'premium' ? '✦ Premium' : 'Free'}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-3 mt-1.5">
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {profile.city}
                                    </span>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <Briefcase className="w-3 h-3" /> {profile.occupation}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">{profile.bio}</p>
                            </div>

                            <button
                                onClick={() => setExpandedProfile(expandedProfile === profile.id ? null : profile.id)}
                                className="p-2 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
                            >
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedProfile === profile.id ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* Expanded Details */}
                        {expandedProfile === profile.id && (
                            <div className="border-t border-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/50">
                                {/* Bio */}
                                <div className="sm:col-span-2">
                                    <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                        <User className="w-3.5 h-3.5" /> Full Bio
                                    </p>
                                    <p className="text-xs text-gray-600 bg-white rounded-xl p-3 border border-gray-100">{profile.bio}</p>
                                </div>

                                {/* Preferences */}
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 mb-2">Partner Preferences</p>
                                    <div className="bg-white rounded-xl p-3 border border-gray-100 space-y-1.5">
                                        {Object.entries(profile.preferences).map(([k, v]) => (
                                            <div key={k} className="flex justify-between">
                                                <span className="text-xs text-gray-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                                                <span className="text-xs text-gray-700 font-medium">{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* AI Matches */}
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                                        <Heart className="w-3.5 h-3.5 text-rose-400" /> AI Generated Matches
                                    </p>
                                    <div className="space-y-2">
                                        {profile.aiMatches.map((match, i) => (
                                            <div key={i} className="bg-white rounded-xl p-3 border border-rose-100 flex items-center justify-between">
                                                <span className="text-xs text-gray-700">Match {i + 1}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-rose-500 rounded-full"
                                                            style={{ width: `${match.compatibility}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-semibold text-rose-600">{match.compatibility}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
