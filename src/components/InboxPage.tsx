import { useState, useEffect, useCallback } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Clock, CheckCircle2, Eye, Mail, Lock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ProfileCardHorizontalDesktop } from './ProfileCard';
import { userService, UserData } from '../services/userService';

interface InboxPageProps {
  onNavigate: (page: string, profileId?: string) => void;
  onGoBack: () => void;
  receivedRequests?: string[];
  onConfirmMeeting?: (profileId: string) => void;
  onDeclineRequest?: (profileId: string) => void;
  scheduledMeetings?: string[];
  pendingRequests?: string[];
  initialTab?: 'requests' | 'pending' | 'scheduled';
  matchesData?: Array<UserData>;
  isPremium?: boolean;
}

export default function InboxPage({
  onNavigate,
  onGoBack,
  receivedRequests = [],
  onConfirmMeeting,
  onDeclineRequest,
  scheduledMeetings = [],
  pendingRequests = [],
  initialTab = 'requests',
  isPremium = false
}: InboxPageProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [requestUsers, setRequestUsers] = useState<UserData[]>([]);
  const [pendingUsers, setPendingUsers] = useState<UserData[]>([]);
  const [scheduledUsers, setScheduledUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = useCallback(async () => {
    setLoading(true);
    try {
      const fetchSet = async (ids: string[]) => {
        const users = await Promise.all(
          ids.map(async (id) => {
            const user = await userService.getUserById(id);
            return user;
          })
        );
        return users.filter((u): u is UserData => u !== null);
      };

      const [received, pending, scheduled] = await Promise.all([
        fetchSet(receivedRequests),
        fetchSet(pendingRequests),
        fetchSet(scheduledMeetings)
      ]);

      setRequestUsers(received);
      setPendingUsers(pending);
      setScheduledUsers(scheduled);
    } catch (error) {
      console.error('Error fetching inbox details:', error);
    } finally {
      setLoading(false);
    }
  }, [receivedRequests, pendingRequests, scheduledMeetings]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const handleAcceptRequest = (profileId: string) => {
    if (onConfirmMeeting) {
      onConfirmMeeting(profileId);
      toast.success('Meeting accepted! Added to your schedule 🎉');
      setTimeout(() => setActiveTab('scheduled'), 500);
    }
  };

  const handleDeclineRequestClick = (profileId: string) => {
    if (onDeclineRequest) {
      onDeclineRequest(profileId);
      toast.success('Meeting request declined');
    }
  };

  const handleViewProfile = (profileId: string) => {
    onNavigate('profile', profileId);
  };

  // Map to old structure for rendering
  const requests = requestUsers.map(u => ({
    id: u.id,
    fromId: u.id,
    from: u.name,
    age: u.age,
    image: u.image || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400',
    sentDate: 'Today'
  }));

  const pending = pendingUsers.map(u => ({
    id: u.id,
    toId: u.id,
    to: u.name,
    age: u.age,
    image: u.image || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400',
    sentDate: 'Waiting'
  }));

  const scheduled = scheduledUsers.map(u => ({
    id: u.id,
    withId: u.id,
    with: u.name,
    age: u.age,
    image: u.image || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400',
    confirmedDate: 'Confirmed',
    date: 'TBD',
    day: 'TBD',
    time: 'TBD'
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50/30">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-rose-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 animate-pulse">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 md:py-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl mb-4 md:mb-6 shadow-lg">
            <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-rose-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-2 md:mb-4 px-4">Meeting Inbox</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
            Manage your meeting requests and scheduled meetings
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 mb-6 md:mb-8 h-11 sm:h-12">
            <TabsTrigger value="requests" className="relative text-sm sm:text-base">
              Requests
              {requests.length > 0 && (
                <Badge className="ml-1 sm:ml-2 bg-rose-500 hover:bg-rose-600 h-5 min-w-5 px-1.5 text-xs">
                  {requests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-sm sm:text-base">
              Pending
              {pending.length > 0 && (
                <Badge className="ml-1 sm:ml-2 bg-blue-500 hover:bg-blue-600 h-5 min-w-5 px-1.5 text-xs">
                  {pending.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="text-sm sm:text-base">
              Scheduled
              {scheduled.length > 0 && (
                <Badge className="ml-1 sm:ml-2 bg-green-500 hover:bg-green-600 h-5 min-w-5 px-1.5 text-xs">
                  {scheduled.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Meeting Requests Tab */}
          <TabsContent value="requests" className="mt-0">
            {requests.length === 0 ? (
              <Card className="p-8 sm:p-12 text-center bg-white/95 backdrop-blur border-rose-100 shadow-lg">
                <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl text-gray-800 mb-2 sm:mb-3">No New Requests</h3>
                <p className="text-sm sm:text-base text-gray-600 px-4">
                  Meeting requests from your matches will appear here
                </p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {requests.map((request) => (
                  <Card key={request.id} className="overflow-hidden bg-white border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    {/* Mobile: Hero-style full image card */}
                    <div className="md:hidden relative h-[520px] sm:h-[540px]">
                      {/* Background Image with Gradient Overlay */}
                      <div className="absolute inset-0">
                        <img
                          src={request.image}
                          alt={request.from}
                          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${!isPremium ? 'blur-2xl' : ''}`}
                        />
                        {/* Dark Gradient Overlay for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-gray-900/30"></div>

                        {/* Premium Lock Overlay for Free Users */}
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

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-between p-5 sm:p-6">
                        {/* Top Section - View Profile Button */}
                        <div className="flex justify-end items-start">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProfile(request.fromId)}
                            className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-xs sm:text-sm touch-manipulation"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            View Profile
                          </Button>
                        </div>

                        {/* Bottom Section - Profile Info & Details */}
                        <div>
                          <div className="mb-4">
                            <h3 className={`text-white mb-2 ${!isPremium ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}>
                              {request.from}, {request.age}
                            </h3>
                            <p className={`text-sm text-white/80 mb-3 ${!isPremium ? 'blur-sm' : ''}`}>
                              Received {request.sentDate}
                            </p>

                            <div className={`space-y-2 ${!isPremium ? 'blur-sm' : ''}`}>
                              <div className="flex items-center gap-2 text-white/90 text-sm">
                                <Calendar className="w-4 h-4 text-rose-300 flex-shrink-0" />
                                <span className="font-medium">Wants to meet you</span>
                              </div>
                              <div className="flex items-center gap-2 text-white/90 text-sm">
                                <Clock className="w-4 h-4 text-rose-300 flex-shrink-0" />
                                <span className="font-medium">Awaiting your response</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <Button
                            onClick={() => isPremium ? onNavigate('meetingrequestresponse', request.fromId) : onNavigate('payment')}
                            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-11 sm:h-12 text-sm touch-manipulation"
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Review Request & Respond
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Matches card layout */}
                    <ProfileCardHorizontalDesktop
                      image={request.image}
                      name={request.from}
                      age={request.age}
                      metadata={`Received ${request.sentDate}`}
                      infoLines={[
                        {
                          icon: Calendar,
                          text: 'Wants to meet you',
                          iconColor: 'text-rose-500',
                        },
                        {
                          icon: Clock,
                          text: 'Awaiting your response',
                          iconColor: 'text-rose-500',
                        },
                      ]}
                      buttonText="Review Request & Respond"
                      buttonIcon={Calendar}
                      buttonGradient="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                      onImageClick={() => handleViewProfile(request.fromId)}
                      onNameClick={() => handleViewProfile(request.fromId)}
                      onButtonClick={() => isPremium ? onNavigate('meetingrequestresponse', request.fromId) : onNavigate('payment')}
                      isPremium={isPremium}
                    />
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Pending Requests Tab */}
          <TabsContent value="pending" className="mt-0">
            {pending.length === 0 ? (
              <Card className="p-8 sm:p-12 text-center bg-white/95 backdrop-blur border-rose-100 shadow-lg">
                <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl text-gray-800 mb-2 sm:mb-3">No Pending Requests</h3>
                <p className="text-sm sm:text-base text-gray-600 px-4">
                  Meeting requests you send will appear here while awaiting response
                </p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {pending.map((request) => (
                  <Card key={request.id} className="overflow-hidden bg-white border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    {/* Mobile: Hero-style full image card */}
                    <div className="md:hidden relative h-[520px] sm:h-[540px]">
                      {/* Background Image with Gradient Overlay */}
                      <div className="absolute inset-0">
                        <img
                          src={request.image}
                          alt={request.to}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Dark Gradient Overlay for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-gray-900/30"></div>
                      </div>

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-between p-5 sm:p-6">
                        {/* Top Section - View Profile Button */}
                        <div className="flex justify-end items-start">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProfile(request.toId)}
                            className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-xs sm:text-sm touch-manipulation"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            View Profile
                          </Button>
                        </div>

                        {/* Bottom Section - Profile Info & Details */}
                        <div>
                          <div className="mb-4">
                            <h3 className="text-2xl sm:text-3xl text-white mb-2">
                              {request.to}, {request.age}
                            </h3>
                            <p className={`text-sm text-white/80 mb-3 ${!isPremium ? 'blur-sm' : ''}`}>
                              Sent {request.sentDate}
                            </p>

                            <div className={`space-y-2 ${!isPremium ? 'blur-sm' : ''}`}>
                              <div className="flex items-center gap-2 text-white/90 text-sm">
                                <Clock className="w-4 h-4 text-amber-300 flex-shrink-0" />
                                <span className="font-medium">Awaiting their response</span>
                              </div>
                              <div className="flex items-center gap-2 text-white/90 text-sm">
                                <Calendar className="w-4 h-4 text-amber-300 flex-shrink-0" />
                                <span className="font-medium">Waiting for confirmation</span>
                              </div>
                              <div className="flex items-center gap-2 text-white/90 text-sm">
                                <Eye className="w-4 h-4 text-amber-300 flex-shrink-0" />
                                <span
                                  className="cursor-pointer hover:text-rose-600 transition-colors truncate"
                                  onClick={() => handleViewProfile(request.toId)}
                                >
                                  Click to view profile
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <Button
                            onClick={() => handleViewProfile(request.toId)}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-11 sm:h-12 text-sm touch-manipulation"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Matches card layout */}
                    <ProfileCardHorizontalDesktop
                      image={request.image}
                      name={request.to}
                      age={request.age}
                      metadata={`Sent ${request.sentDate}`}
                      infoLines={[
                        {
                          icon: Clock,
                          text: 'Awaiting their confirmation',
                          iconColor: 'text-amber-500',
                        },
                      ]}
                      buttonText="View Profile"
                      buttonIcon={Eye}
                      buttonGradient="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      onImageClick={() => handleViewProfile(request.toId)}
                      onNameClick={() => handleViewProfile(request.toId)}
                      onButtonClick={() => handleViewProfile(request.toId)}
                      isPremium={isPremium}
                    />
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Scheduled Meetings Tab */}
          <TabsContent value="scheduled" className="mt-0">
            {scheduled.length === 0 ? (
              <Card className="p-8 sm:p-12 text-center bg-white/95 backdrop-blur border-rose-100 shadow-lg">
                <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl text-gray-800 mb-2 sm:mb-3">No Scheduled Meetings</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">
                  Accepted meetings will appear here
                </p>
                <Button
                  onClick={() => onNavigate('matches')}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-11 sm:h-12 text-sm sm:text-base touch-manipulation"
                >
                  View Matches
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {scheduled.map((meeting) => (
                  <Card key={meeting.id} className="overflow-hidden bg-white border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    {/* Mobile: Hero-style full image card */}
                    <div className="md:hidden relative h-[520px] sm:h-[540px]">
                      {/* Background Image with Gradient Overlay */}
                      <div className="absolute inset-0">
                        <img
                          src={meeting.image}
                          alt={meeting.with}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Dark Gradient Overlay for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-gray-900/30"></div>
                      </div>

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-between p-5 sm:p-6">
                        {/* Top Section - View Profile Button */}
                        <div className="flex justify-end items-start">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProfile(meeting.withId)}
                            className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-xs sm:text-sm touch-manipulation"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            View Profile
                          </Button>
                        </div>

                        {/* Bottom Section - Meeting Details */}
                        <div>
                          <div className="mb-4">
                            <h3 className="text-2xl sm:text-3xl text-white mb-2">
                              Meeting with {meeting.with}, {meeting.age}
                            </h3>
                            <p className={`text-sm text-white/80 mb-3 ${!isPremium ? 'blur-sm' : ''}`}>
                              Confirmed {meeting.confirmedDate}
                            </p>

                            <div className={`space-y-2 ${!isPremium ? 'blur-sm' : ''}`}>
                              <div className="flex items-center gap-2 text-white/90 text-sm">
                                <Calendar className="w-4 h-4 text-green-300 flex-shrink-0" />
                                <span className="font-medium">{meeting.date} ({meeting.day})</span>
                              </div>
                              <div className="flex items-center gap-2 text-white/90 text-sm">
                                <Clock className="w-4 h-4 text-green-300 flex-shrink-0" />
                                <span className="font-medium">{meeting.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Original layout */}
                    <ProfileCardHorizontalDesktop
                      image={meeting.image}
                      name={meeting.with}
                      age={meeting.age}
                      metadata={`Confirmed ${meeting.confirmedDate}`}
                      infoLines={[
                        {
                          icon: CheckCircle2,
                          text: 'Meeting scheduled',
                          iconColor: 'text-green-600',
                        },
                        {
                          icon: Calendar,
                          text: `${meeting.date} (${meeting.day})`,
                          iconColor: 'text-green-600',
                        },
                        {
                          icon: Clock,
                          text: meeting.time,
                          iconColor: 'text-green-600',
                        },
                      ]}
                      buttonText="View Full Profile"
                      buttonIcon={Eye}
                      buttonGradient="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      onImageClick={() => handleViewProfile(meeting.withId)}
                      onNameClick={() => handleViewProfile(meeting.withId)}
                      onButtonClick={() => handleViewProfile(meeting.withId)}
                      isPremium={isPremium}
                    />
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}