import { useState, useEffect } from 'react';
import { userService, UserData } from '../services/userService';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Heart,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  Coffee,
  Calendar as CalendarIcon,
  CheckCircle2,
  Ruler,
  Calendar
} from 'lucide-react';

interface ProfilePageProps {
  profileId: string | null;
  onGoBack: () => void;
  isPremium: boolean;
  onNavigate: (page: string) => void;
}

export default function ProfilePage({ profileId, onGoBack, isPremium, onNavigate }: ProfilePageProps) {
  const [profile, setProfile] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) {
        setLoading(false);
        return;
      }

      console.log('[ProfilePage] Fetching profile for ID:', profileId);
      setLoading(true);
      setServerError(false);
      try {
        const data = await userService.getUserById(profileId.toString());
        console.log('[ProfilePage] Got data:', data);
        if (data) {
          setProfile(data);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error('[ProfilePage] Error fetching profile:', error);
        setServerError(true);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);


  // Redirect free users to payment page
  if (!isPremium) {
    onNavigate('payment');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl text-gray-800 mb-4">Profile Not Found</h2>
        <Button onClick={onGoBack}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden bg-white/95 backdrop-blur border-rose-100 shadow-xl">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <div className="relative aspect-square max-w-xs mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>

            {/* Profile Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-2 break-words">{profile.name}</h1>
                <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-rose-500 flex-shrink-0" />
                    <span>{profile.age} years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-rose-500 flex-shrink-0" />
                    <span>{profile.height}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
                    <span className="truncate">{profile.city}, {profile.state}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-lg sm:text-xl text-gray-800 mb-3">About Me</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{profile.bio}</p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-start gap-3 p-3 sm:p-4 bg-rose-50 rounded-xl">
                  <GraduationCap className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-500">Education</p>
                    <p className="text-sm sm:text-base text-gray-800 break-words">{profile.education}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 sm:p-4 bg-rose-50 rounded-xl">
                  <Briefcase className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-500">Occupation</p>
                    <p className="text-sm sm:text-base text-gray-800 break-words">{profile.occupation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 sm:p-4 bg-rose-50 rounded-xl">
                  <Coffee className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-500">Diet</p>
                    <p className="text-sm sm:text-base text-gray-800 break-words">{profile.diet}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 sm:p-4 bg-rose-50 rounded-xl">
                  <Users className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-500">Marital Status</p>
                    <p className="text-sm sm:text-base text-gray-800 break-words">{profile.maritalStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Information */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Personal Details */}
          <Card className="p-4 sm:p-6 lg:p-8 bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <h2 className="text-xl sm:text-2xl text-gray-800 mb-4 sm:mb-6">Personal Details</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Age</span>
                <span className="text-sm sm:text-base text-gray-800">{profile.age} years</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Height</span>
                <span className="text-sm sm:text-base text-gray-800">{profile.height}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Weight</span>
                <span className="text-sm sm:text-base text-gray-800">{profile.weight}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Body Type</span>
                <span className="text-sm sm:text-base text-gray-800">{profile.bodyType}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Religion</span>
                <span className="text-sm sm:text-base text-gray-800">{profile.religion}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Caste</span>
                <span className="text-sm sm:text-base text-gray-800">{profile.caste}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3">
                <span className="text-sm sm:text-base text-gray-600">Location</span>
                <span className="text-sm sm:text-base text-gray-800 text-right">{profile.city}, {profile.state}</span>
              </div>
            </div>
          </Card>

          {/* Education & Career */}
          <Card className="p-4 sm:p-6 lg:p-8 bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <h2 className="text-xl sm:text-2xl text-gray-800 mb-4 sm:mb-6">Education & Career</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Education</span>
                <span className="text-sm sm:text-base text-gray-800 text-right">{profile.education}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Occupation</span>
                <span className="text-sm sm:text-base text-gray-800 text-right">{profile.occupation}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Organization</span>
                <span className="text-sm sm:text-base text-gray-800 text-right">{profile.organization}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3">
                <span className="text-sm sm:text-base text-gray-600">Annual Income</span>
                <span className="text-sm sm:text-base text-gray-800 text-right">{profile.income}</span>
              </div>
            </div>
          </Card>

          {/* Family Details */}
          <Card className="p-4 sm:p-6 lg:p-8 bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <h2 className="text-xl sm:text-2xl text-gray-800 mb-4 sm:mb-6">Family Details</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Father</span>
                <span className="text-sm sm:text-base text-gray-800 text-right">{profile.fatherName}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Father's Occupation</span>
                <span className="text-sm sm:text-base text-gray-800 text-right">{profile.fatherOccupation}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Mother</span>
                <span className="text-sm sm:text-base text-gray-800 text-right">{profile.motherName}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Mother's Occupation</span>
                <span className="text-sm sm:text-base text-gray-800 text-right">{profile.motherOccupation}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Siblings</span>
                <span className="text-sm sm:text-base text-gray-800 text-right">{profile.siblings}</span>
              </div>
              <div className="flex justify-between py-2 sm:py-3">
                <span className="text-sm sm:text-base text-gray-600">Family Income</span>
                <span className="text-sm sm:text-base text-gray-800 text-right">{profile.familyIncome}</span>
              </div>
            </div>
          </Card>

          {/* Lifestyle */}
          <Card className="p-4 sm:p-6 lg:p-8 bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <h2 className="text-xl sm:text-2xl text-gray-800 mb-4 sm:mb-6">Lifestyle & Interests</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Dietary Habits</span>
                <span className="text-sm sm:text-base text-gray-800 text-right">{profile.diet}</span>
              </div>
              <div className="py-2 sm:py-3 border-b border-gray-100">
                <span className="text-sm sm:text-base text-gray-600">Languages Known</span>
                <p className="text-sm sm:text-base text-gray-800 mt-1">{profile.languages}</p>
              </div>
              <div className="py-2 sm:py-3">
                <span className="text-sm sm:text-base text-gray-600">Hobbies & Interests</span>
                <p className="text-sm sm:text-base text-gray-800 mt-1">{profile.hobbies}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Partner Preferences */}
        <Card className="mt-6 lg:mt-8 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100 shadow-lg">
          <h2 className="text-xl sm:text-2xl text-gray-800 mb-4 sm:mb-6">Partner Preferences</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Age Range</p>
              <p className="text-sm sm:text-base text-gray-800">{profile.partnerPreferences?.ageRange || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Height</p>
              <p className="text-sm sm:text-base text-gray-800">{profile.partnerPreferences?.height || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Education</p>
              <p className="text-sm sm:text-base text-gray-800">{profile.partnerPreferences?.education || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Occupation</p>
              <p className="text-sm sm:text-base text-gray-800">{profile.partnerPreferences?.occupation || 'Not specified'}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Preferred Location</p>
              <p className="text-sm sm:text-base text-gray-800">{profile.partnerPreferences?.location || 'Not specified'}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}