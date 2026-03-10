import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Clock, MapPin, Send, Info, Users, CheckCircle2, Search, Home, Briefcase, GraduationCap, Ruler } from 'lucide-react';
import { toast } from 'sonner';
import { userService, UserData } from '../services/userService';

interface MeetingPageProps {
  onNavigate: (page: string) => void;
  onGoBack: () => void;
  matchName?: string;
  matchId?: string | null;
  receivedRequest?: {
    dates: Date[];
    timeSlots: string[];
    area: string;
    familyCount: number;
  };
  onSendRequest?: (profileId: string) => void;
  currentUserEmail?: string;
  currentUserName?: string;
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

export default function MeetingPage({
  onNavigate,
  onGoBack,
  matchName: initialMatchName,
  matchId,
  receivedRequest,
  onSendRequest,
  currentUserEmail,
  currentUserName
}: MeetingPageProps) {
  const [profile, setProfile] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState<Date[]>(receivedRequest?.dates || []);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>(receivedRequest?.timeSlots || []);
  const [meetingLocation, setMeetingLocation] = useState<'home' | 'outside'>('outside');
  const [homeAddress, setHomeAddress] = useState('');
  const [selectedArea, setSelectedArea] = useState(receivedRequest?.area || '');
  const [areaSearchQuery, setAreaSearchQuery] = useState('');
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [familyCount, setFamilyCount] = useState(receivedRequest?.familyCount || 1);
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

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const dateStr = date.toDateString();
    const existingIndex = selectedDates.findIndex(d => d.toDateString() === dateStr);

    if (existingIndex >= 0) {
      // Remove date if already selected
      setSelectedDates(selectedDates.filter((_, i) => i !== existingIndex));
    } else {
      // Add date if less than 4 selected
      if (selectedDates.length < 4) {
        setSelectedDates([...selectedDates, date]);
      } else {
        toast.error('You can select up to 4 dates');
      }
    }
  };

  const handleTimeSlotToggle = (slotId: string) => {
    if (selectedTimeSlots.includes(slotId)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(id => id !== slotId));
    } else {
      if (selectedTimeSlots.length < 2) {
        setSelectedTimeSlots([...selectedTimeSlots, slotId]);
      } else {
        toast.error('You can select up to 2 time slots');
      }
    }
  };

  const handleAreaToggle = (area: string) => {
    if (selectedArea === area) {
      setSelectedArea('');
    } else {
      setSelectedArea(area);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedDates.length === 0) {
      toast.error('Please select at least 1 preferred date');
      return;
    }
    if (selectedTimeSlots.length === 0) {
      toast.error('Please select at least 1 preferred time slot');
      return;
    }
    if (selectedArea === '' && meetingLocation === 'outside') {
      toast.error('Please select a preferred area');
      return;
    }
    if (homeAddress.trim() === '') {
      toast.error(meetingLocation === 'home' ? 'Please enter your home address' : 'Please enter the restaurant address');
      return;
    }

    if (!currentUserEmail || !matchId || !profile) {
      toast.error('Session error. Please log in again.');
      return;
    }

    try {
      const currentUser = await userService.getUserByEmail(currentUserEmail);
      if (!currentUser) throw new Error('Could not find sender profile');

      const meetingPayload = {
        user1Id: currentUser.id,
        user1Name: currentUserName || currentUser.name,
        user1Email: currentUserEmail,
        user1Phone: currentUser.phone,
        user2Id: matchId,
        user2Name: profile.name,
        user2Email: profile.email,
        user2Phone: profile.phone,
        dates: selectedDates.map(d => d.toISOString()),
        timeSlots: selectedTimeSlots,
        locationType: meetingLocation,
        address: homeAddress,
        area: selectedArea,
        familyCount: familyCount,
        additionalNotes: additionalNotes,
        status: 'pending'
      };

      await userService.scheduleMeeting(meetingPayload);

      // Add to sent requests for local UI optimization
      if (onSendRequest) {
        onSendRequest(matchId);
      }

      toast.success('Meeting request sent successfully! 🎉');
      setTimeout(() => onNavigate('inbox-pending'), 1500);
    } catch (error: any) {
      console.error('Error sending meeting request:', error);
      toast.error('Failed to send meeting request: ' + (error.message || 'Unknown error'));
    }
  };

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 md:py-12 pb-24 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl mb-4 md:mb-6 shadow-lg">
            <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-rose-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-2 md:mb-4 px-4">Schedule Meeting</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
            Request a meeting with <span className="text-rose-600 font-semibold">{displayMatchName}</span>
          </p>
        </div>

        {profile && (
          <Card className="mb-8 overflow-hidden bg-white/95 backdrop-blur border-rose-100 shadow-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                <img
                  src={profile.image || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400'}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{profile.name}, {profile.age}</h2>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm text-gray-600">
                  <div className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    {profile.city}, {profile.state}
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Briefcase className="w-4 h-4 text-rose-500" />
                    {profile.occupation || 'Professional'}
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <GraduationCap className="w-4 h-4 text-rose-500" />
                    {profile.education || 'Graduate'}
                  </div>
                </div>
                <p className="mt-3 text-gray-600 line-clamp-2 max-w-2xl text-sm italic">"{profile.bio || 'I am looking for a life partner...'}"</p>
              </div>
            </div>
          </Card>
        )}

        {/* Meeting Form */}
        <Card className="p-4 sm:p-6 md:p-8 bg-white/95 backdrop-blur border-rose-100 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">

            {/* Date Selection */}
            <div className="space-y-3">
              <Label className="text-base md:text-lg text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-rose-500" />
                Select 4 Preferred Meeting Dates *
                <span className="text-sm text-gray-500 ml-auto">({selectedDates.length}/4 selected)</span>
              </Label>
              <div className="flex justify-center bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 border border-rose-100">
                <CalendarComponent
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={(dates) => {
                    if (Array.isArray(dates)) {
                      if (dates.length <= 4) {
                        setSelectedDates(dates);
                      } else {
                        toast.error('You can select up to 4 dates');
                      }
                    }
                  }}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  className="rounded-xl border-0"
                />
              </div>
              {selectedDates.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedDates.sort((a, b) => a.getTime() - b.getTime()).map((date, index) => (
                    <div key={index} className="bg-rose-100 text-rose-700 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(date)}
                      <button
                        type="button"
                        onClick={() => setSelectedDates(selectedDates.filter(d => d !== date))}
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
                <span className="text-sm text-gray-500 ml-auto">({selectedTimeSlots.length}/2 selected)</span>
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTimeSlots.includes(slot.id);
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => handleTimeSlotToggle(slot.id)}
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
              {selectedTimeSlots.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTimeSlots.map((slotId) => {
                    const slot = timeSlots.find(s => s.id === slotId);
                    return (
                      <div key={slotId} className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {slot?.time}
                      </div>
                    );
                  })}
                </div>
              )}
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
                            const isSelected = selectedArea === area;
                            return (
                              <button
                                key={area}
                                type="button"
                                onClick={() => {
                                  setSelectedArea(area);
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
                {selectedArea && (
                  <div className="bg-purple-100 border-2 border-purple-300 text-purple-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedArea}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedArea('');
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
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  placeholder={meetingLocation === 'home' ? 'Enter your complete home address...' : 'Enter the complete restaurant address...'}
                  className="w-full px-4 py-3 h-14 rounded-xl border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-400 text-sm sm:text-base"
                />

              </div>
            </div>

            {/* Family Members Count */}
            <div className="space-y-3">
              <Label className="text-base md:text-lg text-gray-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-rose-500" />
                Number of Family Members Attending *
              </Label>
              <Select value={familyCount.toString()} onValueChange={(value) => setFamilyCount(parseInt(value))}>
                <SelectTrigger className="w-full h-14 text-sm sm:text-base border-2 border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <SelectValue placeholder="Select number of people" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                    <SelectItem key={count} value={count.toString()}>
                      {count} {count === 1 ? 'Person' : 'People'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Restaurant Selection Info */}


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

            {/* Confirmation Summary */}
            {(selectedDates.length > 0 || selectedTimeSlots.length > 0 || selectedArea || homeAddress) && (
              <Card className="p-4 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <h3 className="text-base sm:text-lg text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Meeting Request Summary
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {selectedDates.length > 0 && (
                    <div>
                      <strong className="text-green-800">Preferred Dates:</strong>
                      <div className="ml-4 mt-1 space-y-1">
                        {selectedDates.sort((a, b) => a.getTime() - b.getTime()).map((date, index) => (
                          <div key={index}>• {formatDate(date)}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedTimeSlots.length > 0 && (
                    <div>
                      <strong className="text-green-800">Preferred Time Slots:</strong>
                      <div className="ml-4 mt-1 space-y-1">
                        {selectedTimeSlots.map((slotId) => {
                          const slot = timeSlots.find(s => s.id === slotId);
                          return <div key={slotId}>• {slot?.time}</div>;
                        })}
                      </div>
                    </div>
                  )}
                  {meetingLocation === 'home' && homeAddress && (
                    <div>
                      <strong className="text-green-800">Meeting Location:</strong>
                      <div className="ml-4 mt-1 space-y-1">
                        <div>• Home: {homeAddress}</div>
                      </div>
                    </div>
                  )}
                  {meetingLocation === 'outside' && selectedArea && (
                    <div>
                      <strong className="text-green-800">Meeting Location:</strong>
                      <div className="ml-4 mt-1 space-y-1">
                        <div>• Restaurant Area: {selectedArea}</div>
                      </div>
                    </div>
                  )}
                  <div>
                    <strong className="text-green-800">Family Members:</strong> {familyCount} {familyCount === 1 ? 'person' : 'people'}
                  </div>
                </div>
              </Card>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 sm:h-14 shadow-lg text-sm sm:text-base touch-manipulation"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Send Meeting Request
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}