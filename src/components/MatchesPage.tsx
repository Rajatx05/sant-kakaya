import React, { memo, useState, useMemo, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, MapPin, Briefcase, GraduationCap, Calendar, Sparkles, Lock, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { ProfileCardHorizontalDesktop } from './ProfileCard';

interface MatchesPageProps {
  onNavigate: (page: string, profileId?: string) => void;
  onGoBack: () => void;
  isPremium: boolean;
  hasHistory?: boolean;
  sentRequests?: string[];
  receivedRequests?: string[];
}

import { userService, UserData } from '../services/userService';

interface MatchesPageProps {
  onNavigate: (page: string, profileId?: string) => void;
  onGoBack: () => void;
  isPremium: boolean;
  currentUserEmail?: string;
  hasHistory?: boolean;
  sentRequests?: string[];
  receivedRequests?: string[];
}

export default memo(function MatchesPage({
  onNavigate,
  onGoBack,
  isPremium,
  currentUserEmail,
  hasHistory,
  sentRequests = [],
  receivedRequests = []
}: MatchesPageProps) {
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const users = await userService.getAllUsers();
        setAllUsers(users);
      } catch (error) {
        toast.error('Failed to load matches');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const availableMatches = useMemo(() => {
    return (allUsers as UserData[]).filter((user: UserData) =>
      user.email !== currentUserEmail &&
      !sentRequests.includes(user.id!) &&
      !receivedRequests.includes(user.id!) &&
      user.status === 'active' &&
      (user.compatibility || 0) > 74
    );
  }, [allUsers, currentUserEmail, sentRequests, receivedRequests]);

  const handleAgreeToMeet = (matchId: string, name: string) => {
    if (!isPremium) {
      toast.error('Upgrade to Premium to schedule meetings! 💎');
      onNavigate('payment');
      return;
    }
    onNavigate('meeting', matchId);
  };

  const handleProfileClick = (profileId: string) => {
    if (!isPremium) {
      toast.error('Upgrade to Premium to view full profiles! 💎');
      onNavigate('payment');
      return;
    }
    onNavigate('profile', profileId);
  };

  return (
    <div className="min-h-screen py-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20">
            <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-600">Finding your perfect matches...</p>
          </div>
        ) : availableMatches.length === 0 ? (
          /* No Matches State */
          <Card className="p-12 text-center bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl text-gray-800 mb-3">No Matches Yet</h3>
              <p className="text-gray-600 mb-6">
                Our AI is continuously searching for profiles that match your criteria. Matches will appear here automatically when found. Make sure your profile is complete for better matching!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => onNavigate('myprofile')}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 px-8"
                >
                  Complete My Profile
                </Button>
                <Button
                  onClick={() => onNavigate('search')}
                  variant="outline"
                  className="border-rose-200 text-rose-600 hover:bg-rose-50 h-12 px-8"
                >
                  How Matching Works
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          /* Matches Grid */
          <div className="grid md:grid-cols-2 gap-6">
            {availableMatches.map((match) => {
              // Extract first name with safety check
              const fullName = match.name || 'User';
              const firstName = fullName.split(' ')[0];
              const displayImage = match.image || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400';
              const displayAge = match.age ?? '??';
              const displayCompatibility = match.compatibility ?? 0;
              const displayMatchDate = match.matchDate || 'Joined recently';

              return (
                <Card
                  key={match.id}
                  className="overflow-hidden bg-white border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Mobile: Hero-style full image card */}
                  <div className="md:hidden relative h-[580px] sm:h-[600px]">
                    {/* Background Image with Full Bleed - Optimized for face visibility */}
                    <div className="absolute inset-0">
                      <img
                        src={displayImage}
                        alt={firstName}
                        className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ${!isPremium ? 'blur-2xl' : ''}`}
                        style={{ objectPosition: 'center 20%' }}
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Sophisticated Multi-layer Gradient for Premium Feel */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>

                      {/* Blur Overlay for Free Users with Premium Lock */}
                      {!isPremium && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40">
                              <Lock className="w-10 h-10 text-white drop-shadow-lg" />
                            </div>
                            <p className="text-white text-sm drop-shadow-lg">Premium Content</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content Overlay - Better organized for readability */}
                    <div className="relative h-full flex flex-col p-5 sm:p-6">
                      {/* Top Section - Status Badge & View Profile with backdrop blur */}
                      <div className="flex justify-between items-start mb-auto">
                        {isPremium ? (
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-xs sm:text-sm shadow-lg backdrop-blur-sm border border-white/20">
                            <Sparkles className="w-3 h-3 mr-1" />
                            {displayCompatibility}% Match
                          </Badge>
                        ) : (
                          <Badge className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 text-xs sm:text-sm shadow-lg">
                            <Lock className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleProfileClick(match.id)}
                          className="border-white/40 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 hover:border-white/60 text-xs sm:text-sm touch-manipulation shadow-lg transition-all"
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          View Profile
                        </Button>
                      </div>

                      {/* Bottom Section - Profile Info with enhanced readability */}
                      <div className="mt-auto">
                        {/* Name and Age - Large and prominent */}
                        <div className="mb-5">
                          <h3 className={`text-white mb-1 drop-shadow-lg ${!isPremium ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl'}`}>
                            {firstName}, {displayAge}
                          </h3>
                          <p className={`text-sm sm:text-base text-white/90 drop-shadow-md ${!isPremium ? 'blur-sm' : ''}`}>
                            {isPremium ? `Matched ${displayMatchDate}` : 'Premium member'}
                          </p>
                        </div>

                        {/* Info Details - Simple clean layout */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-white/90 text-sm">
                            <MapPin className="w-4 h-4 text-rose-300 flex-shrink-0" />
                            <span className={`font-medium ${!isPremium ? 'blur-sm' : ''}`}>
                              {isPremium ? `${match.city || 'Secret City'}, ${match.state || 'India'}` : '●●●●●●●, ●●●●●●●'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-white/90 text-sm">
                            <GraduationCap className="w-4 h-4 text-rose-300 flex-shrink-0" />
                            <span className={`font-medium ${!isPremium ? 'blur-sm' : ''}`}>
                              {isPremium ? (match.education || 'Graduate') : '●●●●●●●●●'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-white/90 text-sm">
                            <Briefcase className="w-4 h-4 text-rose-300 flex-shrink-0" />
                            <span className={`font-medium ${!isPremium ? 'blur-sm' : ''}`}>
                              {isPremium ? (match.occupation || 'Professional') : '●●●●●●●●●●●'}
                            </span>
                          </div>
                        </div>

                        {/* Action Button - Prominent with better shadow */}
                        {isPremium ? (
                          <Button
                            onClick={() => handleAgreeToMeet(match.id, match.name)}
                            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 sm:h-14 text-sm sm:text-base touch-manipulation shadow-xl border border-white/20 transition-all hover:scale-[1.02]"
                          >
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            Agree to Meet
                          </Button>
                        ) : (
                          <Button
                            onClick={() => onNavigate('payment')}
                            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 h-12 sm:h-14 text-sm sm:text-base touch-manipulation shadow-xl border border-white/20 transition-all hover:scale-[1.02]"
                          >
                            <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            Unlock Profile
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Horizontal split layout with badge & view profile */}
                  <ProfileCardHorizontalDesktop
                    image={displayImage}
                    name={firstName}
                    age={displayAge as number}
                    metadata={isPremium ? `Matched ${displayMatchDate}` : 'Premium member'}
                    compatibility={displayCompatibility}
                    infoLines={[
                      {
                        icon: MapPin,
                        text: isPremium ? `${match.city || 'Secret City'}, ${match.state || 'India'}` : '●●●●●●●, ●●●●●●●',
                        iconColor: 'text-rose-500',
                      },
                      {
                        icon: GraduationCap,
                        text: isPremium ? (match.education || 'Graduate') : '●●●●●●●●●',
                        iconColor: 'text-rose-500',
                      },
                      {
                        icon: Briefcase,
                        text: isPremium ? (match.occupation || 'Professional') : '●●●●●●●●●●●',
                        iconColor: 'text-rose-500',
                      },
                    ]}
                    buttonText={isPremium ? 'Agree to Meet' : 'Unlock Profile'}
                    buttonIcon={isPremium ? Calendar : Lock}
                    buttonGradient={isPremium ? 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600' : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'}
                    onImageClick={() => handleProfileClick(match.id!)}
                    onNameClick={() => handleProfileClick(match.id!)}
                    onViewProfile={() => handleProfileClick(match.id!)}
                    onButtonClick={() => isPremium ? handleAgreeToMeet(match.id!, fullName) : onNavigate('payment')}
                    isPremium={isPremium}
                  />
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});