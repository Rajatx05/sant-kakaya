import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Clock, MapPin, Send, Info, Users, CheckCircle2, XCircle, Search, Loader2, ArrowLeft, Home, Briefcase, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { userService, UserData } from '../services/userService';

interface MeetingRequestResponsePageProps {
  onNavigate: (page: string) => void;
  onGoBack: () => void;
  matchName?: string;
  matchId?: string | null;
  receivedRequest: {
    dates: Date[];
    timeSlots: string[];
    area: string;
    familyCount: number;
  };
  onConfirmMeeting?: (profileId: string, selection?: any) => void;
  onSendCounterProposal?: (profileId: string) => void;
}

const timeSlots = [
  { id: '1', time: '10:00 AM - 12:00 PM', label: 'Morning', icon: '🌅' },
  { id: '2', time: '12:00 PM - 2:00 PM', label: 'Afternoon', icon: '☀️' },
  { id: '3', time: '3:00 PM - 5:00 PM', label: 'Afternoon', icon: '🌤️' },
  { id: '4', time: '5:00 PM - 7:00 PM', label: 'Evening', icon: '🌆' },
  { id: '5', time: '7:00 PM - 9:00 PM', label: 'Evening', icon: '🌇' },
  { id: '6', time: '9:00 PM - 11:00 PM', label: 'Night', icon: '🌙' },
];

const areas = [
  'South Mumbai (Colaba, Churchgate, Marine Drive)',
  'Central Mumbai (Dadar, Parel, Mahalaxmi)',
  'Western Suburbs (Bandra, Andheri, Juhu)',
  'Eastern Suburbs (Chembur, Ghatkopar, Vikhroli)',
  'Navi Mumbai (Vashi, Nerul, Kharghar)',
  'Thane & Beyond (Thane, Mulund, Dombivli)',
];

export default function MeetingRequestResponsePage({
  onNavigate,
  onGoBack,
  matchName: initialMatchName,
  matchId,
  receivedRequest,
  onConfirmMeeting,
  onSendCounterProposal
}: MeetingRequestResponsePageProps) {
  const [profile, setProfile] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'review' | 'decline' | 'waiting'>('review');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [myFamilyCount, setMyFamilyCount] = useState(1);

  // Counter-proposal states
  const [newDates, setNewDates] = useState<Date[]>([]);
  const [newTimeSlots, setNewTimeSlots] = useState<string[]>([]);
  const [meetingLocation, setMeetingLocation] = useState<'home' | 'outside'>('outside');
  const [meetingAddress, setMeetingAddress] = useState('');
  const [newArea, setNewArea] = useState('');
  const [areaSearchQuery, setAreaSearchQuery] = useState('');
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [myFamilyCountCounterProposal, setMyFamilyCountCounterProposal] = useState(1);
  const [additionalNotes, setAdditionalNotes] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!matchId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await userService.getUserById(matchId);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching match profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [matchId]);

  const displayMatchName = profile?.name || initialMatchName || 'Your Match';

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const handleAccept = () => {
    if (!selectedDate || !selectedTimeSlot) {
      toast.error('Please select both a date and time slot');
      return;
    }

    // Pass the selection details to the parent
    if (onConfirmMeeting && matchId) {
      onConfirmMeeting(matchId, {
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        familyCount: myFamilyCount
      });
    }

    // Navigate to meeting payment page
    onNavigate('meetingpayment');
  };

  const handleDecline = () => {
    setViewMode('decline');
  };

  const handleNewTimeSlotToggle = (slotId: string) => {
    if (newTimeSlots.includes(slotId)) {
      setNewTimeSlots(newTimeSlots.filter((id: string) => id !== slotId));
    } else {
      if (newTimeSlots.length < 2) {
        setNewTimeSlots([...newTimeSlots, slotId]);
      } else {
        toast.error('You can select up to 2 time slots');
      }
    }
  };

  const handleCounterProposal = (e: React.FormEvent) => {
    e.preventDefault();

    if (newDates.length === 0) {
      toast.error('Please select at least 1 preferred date');
      return;
    }
    if (newTimeSlots.length === 0) {
      toast.error('Please select at least 1 preferred time slot');
      return;
    }
    if (newArea === '') {
      toast.error('Please select a preferred area');
      return;
    }
    if (meetingAddress.trim() === '') {
      toast.error(meetingLocation === 'home' ? 'Please enter your home address' : 'Please enter the restaurant address');
      return;
    }

    // Move profile to pending section
    if (matchId && onSendCounterProposal) {
      onSendCounterProposal(matchId);
    }

    toast.success('Counter-proposal sent! Moved to Pending section.');

    // Navigate to inbox pending tab
    onNavigate('inbox-pending');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!receivedRequest || !receivedRequest.dates) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="w-10 h-10 text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Not Found</h2>
          <p className="text-gray-600 mb-8">We couldn't find the details for this meeting request. It may have already been processed.</p>
          <Button
            onClick={() => onNavigate('inbox')}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-6 rounded-xl shadow-lg shadow-rose-200"
          >
            Go to Inbox
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 md:py-12 pb-24 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-start mb-4">
          <Button
            variant="ghost"
            onClick={onGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
        </div>
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl mb-4 md:mb-6 shadow-lg">
            <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-rose-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4 px-4">
            {viewMode === 'review' ? 'Meeting Request Received' : viewMode === 'decline' ? 'Suggest New Time' : 'Waiting for Response'}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
            {viewMode === 'review' ? (
              <>Meeting request from <span className="text-rose-600 font-semibold">{displayMatchName}</span></>
            ) : viewMode === 'decline' ? (
              <>Propose new times to <span className="text-rose-600 font-semibold">{displayMatchName}</span></>
            ) : (
              <>Your counter-proposal has been sent to <span className="text-rose-600 font-semibold">{displayMatchName}</span></>
            )}
          </p>
        </div>

        {/* Profile Summary Card */}
        {profile && (
          <Card className="mb-8 overflow-hidden border-rose-100 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-48 h-48 md:h-auto relative">
                <img
                  src={profile.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
                <div className="absolute bottom-4 left-4 text-white md:hidden">
                  <p className="font-bold text-lg">{profile.name}, {profile.age}</p>
                </div>
              </div>
              <div className="p-6 flex-1">
                <div className="hidden md:flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{profile.name}, {profile.age}</h2>
                  <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm font-medium">Match</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-4 h-4 text-rose-400" />
                    <span className="text-sm">{profile.occupation || 'Professional'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <GraduationCap className="w-4 h-4 text-rose-400" />
                    <span className="text-sm">{profile.education || 'Graduate'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span className="text-sm">{profile.city || 'Mumbai'}, {profile.state || 'Maharashtra'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Info className="w-4 h-4 text-rose-400" />
                    <span className="text-sm">{profile.caste || 'Caste'}, {profile.religion || 'Religion'}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Review Mode - Show Received Request */}
        {viewMode === 'review' && (
          <>
            {/* Meeting Details Card */}
            <Card className="p-4 sm:p-6 md:p-8 bg-white/95 backdrop-blur border-rose-100 shadow-xl">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">Select Date & Time</h2>

              {/* Dates Selection with Radio Buttons */}
              <div className="space-y-4 mb-8">
                <Label className="text-base md:text-lg text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-rose-500" />
                  Choose One Preferred Date *
                </Label>
                <RadioGroup value={selectedDate} onValueChange={setSelectedDate}>
                  <div className="grid gap-3">
                    {receivedRequest.dates.sort((a, b) => a.getTime() - b.getTime()).map((date, index) => {
                      const dateStr = date.toISOString();
                      const isSelected = selectedDate === dateStr;
                      return (
                        <div key={index} className={`relative`}>
                          <div
                            className={`flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer touch-manipulation ${isSelected
                              ? 'border-rose-500 bg-rose-50 shadow-md'
                              : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50'
                              }`}
                            onClick={() => setSelectedDate(dateStr)}
                          >
                            <RadioGroupItem value={dateStr} id={`date-${index}`} className="mr-4" />
                            <Label
                              htmlFor={`date-${index}`}
                              className="flex-1 cursor-pointer flex items-center gap-3"
                            >
                              <Calendar className={`w-5 h-5 ${isSelected ? 'text-rose-600' : 'text-gray-400'}`} />
                              <div>
                                <p className="text-sm sm:text-base text-gray-900">{formatDate(date)}</p>
                              </div>
                            </Label>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-rose-500" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>

              {/* Time Slots Selection with Radio Buttons */}
              <div className="space-y-4 mb-8">
                <Label className="text-base md:text-lg text-gray-800 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-rose-500" />
                  Choose One Time Slot *
                </Label>
                <RadioGroup value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                  <div className="grid gap-3">
                    {receivedRequest.timeSlots.map((slotId) => {
                      const slot = timeSlots.find(s => s.id === slotId);
                      if (!slot) return null;
                      const isSelected = selectedTimeSlot === slotId;
                      return (
                        <div key={slotId}>
                          <div
                            className={`flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer touch-manipulation ${isSelected
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                              }`}
                            onClick={() => setSelectedTimeSlot(slotId)}
                          >
                            <RadioGroupItem value={slotId} id={`slot-${slotId}`} className="mr-4" />
                            <Label
                              htmlFor={`slot-${slotId}`}
                              className="flex-1 cursor-pointer flex items-center gap-3"
                            >
                              <span className="text-2xl">{slot.icon}</span>
                              <div>
                                <p className="text-sm sm:text-base text-gray-900">{slot.time}</p>
                                <p className="text-xs text-gray-500">{slot.label}</p>
                              </div>
                            </Label>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>

              {/* Other Details */}
              <div className="space-y-4 mb-8">
                <h3 className="text-lg text-gray-800 mb-3">Meeting Details</h3>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3 p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                    <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Preferred Area</p>
                      <p className="text-sm sm:text-base text-gray-900">{receivedRequest.area}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                    <Users className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Family Members</p>
                      <p className="text-sm sm:text-base text-gray-900">
                        {receivedRequest.familyCount} {receivedRequest.familyCount === 1 ? 'person' : 'people'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Family Members From My Side */}
              <div className="space-y-3 mb-8">
                <Label className="text-base md:text-lg text-gray-800 flex items-center gap-2">
                  <Users className="w-5 h-5 text-rose-500" />
                  Family Members From My Side *
                </Label>
                <p className="text-sm text-gray-600">
                  How many family members will accompany you? (Including yourself)
                </p>
                <Select value={myFamilyCount.toString()} onValueChange={(value) => setMyFamilyCount(parseInt(value))}>
                  <SelectTrigger className="w-full h-14 text-sm sm:text-base border-2 border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      <SelectValue placeholder="Select number of people" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((count) => (
                      <SelectItem key={count} value={count.toString()}>
                        {count} {count === 1 ? 'Person' : 'People'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
                {/* Decline Button - Mobile uses secondary theme, desktop uses orange */}
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  className="w-full sm:flex-1 h-12 sm:h-14 shadow-md hover:shadow-lg transition-all touch-manipulation rounded-lg
                    bg-white border-2 
                    border-rose-400 text-rose-600 hover:bg-rose-50 hover:border-rose-500 hover:text-rose-700
                    sm:border-orange-400 sm:text-orange-600 sm:hover:bg-orange-50 sm:hover:border-orange-500 sm:hover:text-orange-700"
                >
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Decline & Suggest
                </Button>

                {/* Accept Button - Mobile uses rose theme, desktop uses green */}
                <Button
                  onClick={handleAccept}
                  className="w-full sm:flex-1 h-12 sm:h-14 shadow-lg hover:shadow-xl transition-all touch-manipulation rounded-lg
                    bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Confirm & Pay
                </Button>
              </div>
            </Card>

            {/* Request Info Banner - Moved Below Form */}

          </>
        )}

        {/* Decline Mode - Show Counter Proposal Form */}
        {viewMode === 'decline' && (
          <>
            {/* Info Banner */}


            {/* Counter Proposal Form */}
            <Card className="p-4 sm:p-6 md:p-8 bg-white/95 backdrop-blur border-rose-100 shadow-xl">
              <form onSubmit={handleCounterProposal} className="space-y-6 md:space-y-8">

                {/* Date Selection */}
                <div className="space-y-3">
                  <Label className="text-base md:text-lg text-gray-800 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-rose-500" />
                    Select 4 Preferred Meeting Dates *
                    <span className="text-sm text-gray-500 ml-auto">({newDates.length}/4 selected)</span>
                  </Label>
                  <div className="flex justify-center bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 border border-rose-100">
                    <CalendarComponent
                      mode="multiple"
                      selected={newDates}
                      onSelect={(dates) => {
                        if (Array.isArray(dates)) {
                          if (dates.length <= 4) {
                            setNewDates(dates);
                          } else {
                            toast.error('You can select up to 4 dates');
                          }
                        }
                      }}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      className="rounded-xl border-0"
                    />
                  </div>
                  {newDates.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newDates.sort((a, b) => a.getTime() - b.getTime()).map((date, index) => (
                        <div key={index} className="bg-rose-100 text-rose-700 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(date)}
                          <button
                            type="button"
                            onClick={() => setNewDates(newDates.filter(d => d !== date))}
                            className="ml-1 hover:text-rose-900"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Time Slot Selection */}
                <div className="space-y-3">
                  <Label className="text-base md:text-lg text-gray-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-rose-500" />
                    Select 2 Preferred Time Slots *
                    <span className="text-sm text-gray-500 ml-auto">({newTimeSlots.length}/2 selected)</span>
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => {
                      const isSelected = newTimeSlots.includes(slot.id);
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => handleNewTimeSlotToggle(slot.id)}
                          className={`p-4 rounded-xl border-2 transition-all touch-manipulation ${isSelected
                            ? 'border-rose-500 bg-rose-50 shadow-md'
                            : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50'
                            }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{slot.icon}</span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-rose-500" />}
                          </div>
                          <p className="text-sm text-gray-900">{slot.time}</p>
                          <p className="text-xs text-gray-500 mt-1">{slot.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Meeting Location Preference */}
                <div className="space-y-4">
                  {/* Radio Group: Where would you like to meet? */}
                  <div className="space-y-3">
                    <Label className="text-base md:text-lg text-gray-800 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-rose-500" />
                      Where would you like to meet? *
                    </Label>
                    <RadioGroup value={meetingLocation} onValueChange={(value) => setMeetingLocation(value as 'home' | 'outside')}>
                      <div className="grid gap-3">
                        {/* Home Option */}
                        <div className="relative">
                          <label
                            htmlFor="location-home"
                            className={`flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer touch-manipulation ${meetingLocation === 'home'
                              ? 'border-rose-500 bg-rose-50 shadow-md'
                              : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50'
                              }`}
                          >
                            <RadioGroupItem value="home" id="location-home" className="mr-4" />
                            <div className="flex-1 flex items-center gap-3">
                              <Home className="w-5 h-5 text-rose-500" />
                              <div>
                                <p className="text-sm sm:text-base text-gray-900">🏠 Home</p>
                              </div>
                            </div>
                          </label>
                        </div>

                        {/* Outside (Restaurant) Option */}
                        <div className="relative">
                          <label
                            htmlFor="location-outside"
                            className={`flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer touch-manipulation ${meetingLocation === 'outside'
                              ? 'border-rose-500 bg-rose-50 shadow-md'
                              : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50'
                              }`}
                          >
                            <RadioGroupItem value="outside" id="location-outside" className="mr-4" />
                            <div className="flex-1 flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-rose-500" />
                              <div>
                                <p className="text-sm sm:text-base text-gray-900">🍽️ Outside (Restaurant)</p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Area Selection (Always Visible) */}
                  <div className="space-y-3">
                    <Label className="text-base md:text-lg text-gray-800 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-rose-500" />
                      Select Preferred Area *
                    </Label>
                    <div className="relative">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="text"
                          value={areaSearchQuery}
                          onChange={(e) => {
                            setAreaSearchQuery(e.target.value);
                            setShowAreaDropdown(true);
                          }}
                          onFocus={() => setShowAreaDropdown(true)}
                          placeholder="Search for an area..."
                          className="w-full pl-12 pr-4 py-3 h-14 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400 text-sm sm:text-base"
                        />
                      </div>
                      {showAreaDropdown && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowAreaDropdown(false)}
                          />
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-purple-200 rounded-xl shadow-2xl max-h-64 overflow-y-auto z-20">
                            {areas
                              .filter(area => area.toLowerCase().includes(areaSearchQuery.toLowerCase()))
                              .map((area) => {
                                const isSelected = newArea === area;
                                return (
                                  <button
                                    key={area}
                                    type="button"
                                    onClick={() => {
                                      setNewArea(area);
                                      setAreaSearchQuery(area);
                                      setShowAreaDropdown(false);
                                    }}
                                    className={`w-full p-4 transition-all text-left touch-manipulation border-b border-gray-100 last:border-b-0 ${isSelected
                                      ? 'bg-purple-50'
                                      : 'hover:bg-purple-50/50'
                                      }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <MapPin className={`w-5 h-5 ${isSelected ? 'text-purple-600' : 'text-gray-400'}`} />
                                        <span className={`text-sm ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                          {area}
                                        </span>
                                      </div>
                                      {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-500" />}
                                    </div>
                                  </button>
                                );
                              })}
                            {areas.filter(area => area.toLowerCase().includes(areaSearchQuery.toLowerCase())).length === 0 && (
                              <div className="p-4 text-sm text-gray-500 text-center">
                                No areas found matching "{areaSearchQuery}"
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    {newArea && (
                      <div className="bg-purple-100 border-2 border-purple-300 text-purple-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{newArea}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setNewArea('');
                            setAreaSearchQuery('');
                          }}
                          className="hover:text-purple-900 text-lg"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Full Address Field (Always Visible, Label Changes) */}
                  <div className="space-y-3">
                    <Label className="text-base md:text-lg text-gray-800 flex items-center gap-2">
                      {meetingLocation === 'home' ? (
                        <>
                          <Home className="w-5 h-5 text-rose-500" />
                          Enter Full Home Address *
                        </>
                      ) : (
                        <>
                          <MapPin className="w-5 h-5 text-rose-500" />
                          Enter Restaurant Address *
                        </>
                      )}
                    </Label>
                    <Input
                      type="text"
                      value={meetingAddress}
                      onChange={(e) => setMeetingAddress(e.target.value)}
                      placeholder={meetingLocation === 'home' ? 'Enter your complete home address...' : 'Enter the complete restaurant address...'}
                      className="w-full px-4 py-3 h-14 rounded-xl border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-400 text-sm sm:text-base"
                    />

                  </div>
                </div>

                {/* Family Members From My Side */}
                <div className="space-y-3">
                  <Label className="text-base md:text-lg text-gray-800 flex items-center gap-2">
                    <Users className="w-5 h-5 text-rose-500" />
                    Family Members From My Side *
                  </Label>
                  <p className="text-sm text-gray-600">
                    How many family members will accompany you? (Including yourself)
                  </p>
                  <Select value={myFamilyCountCounterProposal.toString()} onValueChange={(value) => setMyFamilyCountCounterProposal(parseInt(value))}>
                    <SelectTrigger className="w-full h-14 text-sm sm:text-base border-2 border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-green-600" />
                        <SelectValue placeholder="Select number of people" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((count) => (
                        <SelectItem key={count} value={count.toString()}>
                          {count} {count === 1 ? 'Person' : 'People'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Notes */}
                <div className="space-y-3">
                  <Label htmlFor="additionalNotes" className="text-base md:text-lg text-gray-800 flex items-center gap-2">
                    <Info className="w-5 h-5 text-rose-500" />
                    Additional Preferences (Optional)
                  </Label>
                  <Textarea
                    id="additionalNotes"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Any dietary preferences (vegetarian, vegan, etc.), accessibility needs, or other requirements..."
                    className="min-h-[100px] text-sm sm:text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400 resize-y"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setViewMode('review')}
                    className="w-full sm:flex-1 border-2 border-gray-300 hover:bg-gray-50 h-12 sm:h-14 text-sm sm:text-base touch-manipulation flex items-center justify-center"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Back to Review
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 sm:h-14 shadow-lg text-sm sm:text-base touch-manipulation flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Send Counter-Proposal
                  </Button>
                </div>
              </form>
            </Card>
          </>
        )}

        {/* Waiting Mode - Show Waiting State */}
        {viewMode === 'waiting' && (
          <Card className="p-8 md:p-12 bg-white/95 backdrop-blur border-rose-100 shadow-xl text-center">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-2xl sm:text-3xl text-gray-800">Waiting for Response</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-md">
                Your counter-proposal has been sent to <span className="text-rose-600 font-medium">{displayMatchName}</span>.
                You'll be notified once they review your suggestions.
              </p>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 max-w-md">
                <h3 className="text-lg text-green-900 mb-3 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Your Suggested Details
                </h3>
                <div className="space-y-2 text-sm text-gray-700 text-left">
                  <div>
                    <strong className="text-green-800">Preferred Dates:</strong>
                    <div className="ml-4 mt-1 space-y-1">
                      {newDates.sort((a: Date, b: Date) => a.getTime() - b.getTime()).map((date: Date, index: number) => (
                        <div key={index}>• {formatDate(date)}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong className="text-green-800">Preferred Time Slots:</strong>
                    <div className="ml-4 mt-1 space-y-1">
                      {newTimeSlots.map((slotId) => {
                        const slot = timeSlots.find(s => s.id === slotId);
                        return <div key={slotId}>• {slot?.time}</div>;
                      })}
                    </div>
                  </div>
                  <div>
                    <strong className="text-green-800">Preferred Area:</strong>
                    <div className="ml-4 mt-1">• {newArea}</div>
                  </div>
                  <div>
                    <strong className="text-green-800">Family Members From My Side:</strong> {myFamilyCountCounterProposal} {myFamilyCountCounterProposal === 1 ? 'person' : 'people'}
                  </div>
                </div>
              </div>
              <Button
                onClick={() => onNavigate('inbox')}
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:bg-gray-50 h-12 sm:h-14 px-8 text-sm sm:text-base touch-manipulation"
              >
                Go to Inbox
              </Button>
            </div>
          </Card>
        )}


      </div>
    </div >
  );
}