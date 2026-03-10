import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
// Removed unused Select imports
import {
  Heart,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  Coffee,
  Phone,
  Mail,
  CheckCircle2,
  Ruler,
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  User
} from 'lucide-react';
import { toast } from 'sonner';
import { userService } from '../services/userService';

interface MyProfilePageProps {
  onGoBack: () => void;
  userName: string;
  userEmail: string;
}

export default function MyProfilePage({ onGoBack, userName, userEmail }: MyProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState({
    name: userName || 'Rahul Verma',
    age: 29,
    gender: 'Male',
    maritalStatus: 'Unmarried',
    height: '5\'10"',
    weight: '75 kg',
    bodyType: 'Athletic',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    email: userEmail || 'rahul.verma@email.com',
    mobile: '+91 98765 43210',
    religion: 'Hindu',
    caste: 'Rajput',
    education: 'B.Tech in Computer Science',
    occupation: 'Software Engineer',
    organization: 'Tech Solutions Inc.',
    income: '15-20 Lakh',
    fatherName: 'Suresh Verma',
    fatherOccupation: 'Retired Government Officer',
    motherName: 'Meena Verma',
    motherOccupation: 'Homemaker',
    siblings: '1 Sister (Younger, Unmarried)',
    familyIncome: '30-50 Lakh',
    diet: 'Non-Vegetarian',
    languages: 'Hindi, English, Punjabi',
    hobbies: 'Cricket, Photography, Traveling, Coding',
    bio: 'Software engineer with a passion for technology and innovation. Love to travel and explore new places. Looking for a life partner who shares similar values and interests.',
    aboutMe: 'I am a goal-oriented professional who believes in maintaining a balance between career and personal life. Family is very important to me, and I value honesty and transparency in relationships.'
  });

  const [editData, setEditData] = useState({ ...profileData });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userEmail) return;

      try {
        const userData = await userService.getUserByEmail(userEmail);
        if (userData) {
          const mappedData = {
            ...profileData, // Keep defaults for missing fields
            ...userData,
            name: userData.name || profileData.name,
            email: userData.email || profileData.email,
            mobile: userData.phone || profileData.mobile,
            image: userData.image || profileData.image,
            bio: userData.bio || '',
            height: userData.height || '',
          };
          setProfileData(mappedData as any);
          setEditData(mappedData as any);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile data');
      }
    };

    fetchUserData();
  }, [userEmail]);

  const handleEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    try {
      const { success, message } = await userService.updateProfile(userEmail, editData as any);
      if (success) {
        setProfileData({ ...editData });
        setIsEditing(false);
        toast.success('Profile updated successfully! 🎉');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error(message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('An error occurred while saving');
    }
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
    toast.info('Changes discarded');
  };

  const handleChange = (field: string, value: string | number) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setEditData({ ...editData, image: base64String });
        toast.success('Photo updated preview!');
      };
      reader.readAsDataURL(file);
    }
  };

  const currentData = isEditing ? editData : profileData;

  return (
    <div className="min-h-screen py-6 md:py-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Edit Mode Header */}
        {isEditing && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Edit2 className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-base sm:text-lg text-gray-800">Edit Mode Active</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Make changes to any field below</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 flex-1 sm:flex-initial text-sm sm:text-base touch-manipulation"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-300 flex-1 sm:flex-initial text-sm sm:text-base touch-manipulation"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Header */}
        <Card className="mb-6 md:mb-8 overflow-hidden bg-white/95 backdrop-blur border-rose-100 shadow-xl">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <div
                className="relative aspect-square max-w-xs mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-lg group"
                onClick={handleImageClick}
              >
                <img
                  src={currentData.image}
                  alt={currentData.name}
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="text-center text-white">
                      <Camera className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm">Change Photo</p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <Badge className="mt-4 w-full justify-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-2 text-xs sm:text-sm">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Verified Profile
              </Badge>
            </div>

            {/* Profile Summary */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label className="text-xs sm:text-sm">Full Name</Label>
                      <Input
                        value={editData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="h-10 sm:h-12 text-base sm:text-lg"
                        placeholder="Enter your full name"
                      />
                    </div>
                  ) : (
                    <h1 className="text-2xl sm:text-3xl text-gray-800 mb-2">{currentData.name}</h1>
                  )}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600 mt-2">
                    <span>{currentData.age} years</span>
                    <span>•</span>
                    <span>{currentData.height}</span>
                    <span>•</span>
                    <span className="truncate">{currentData.maritalStatus}</span>
                  </div>
                </div>

                {!isEditing && (
                  <Button
                    onClick={handleEdit}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 w-full sm:w-auto text-sm sm:text-base touch-manipulation"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>

              {/* Quick Info Cards */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <InfoCard
                  icon={MapPin}
                  label="Location"
                  value={`${currentData.city}, ${currentData.state}`}
                  isEditing={isEditing}
                  editValue={editData.city}
                  onEdit={(val) => handleChange('city', val)}
                />
                <InfoCard
                  icon={GraduationCap}
                  label="Education"
                  value={currentData.education}
                  isEditing={isEditing}
                  editValue={editData.education}
                  onEdit={(val) => handleChange('education', val)}
                />
                <InfoCard
                  icon={Briefcase}
                  label="Occupation"
                  value={currentData.occupation}
                  isEditing={isEditing}
                  editValue={editData.occupation}
                  onEdit={(val) => handleChange('occupation', val)}
                />
                <InfoCard
                  icon={Phone}
                  label="Mobile"
                  value={currentData.mobile}
                  isEditing={isEditing}
                  editValue={editData.mobile}
                  onEdit={(val) => handleChange('mobile', val)}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Sections */}
        <div className="space-y-6 md:space-y-8">
          {/* About Me */}
          <Card className="p-4 sm:p-6 bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <h2 className="text-lg sm:text-xl text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600" />
              About Me
            </h2>
            {isEditing ? (
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm">Bio</Label>
                <Textarea
                  value={editData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  className="min-h-[120px] border-gray-200 text-sm sm:text-base"
                  placeholder="Tell others about yourself..."
                />
              </div>
            ) : (
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{currentData.bio}</p>
            )}
          </Card>

          {/* Personal Details */}
          <Card className="p-4 sm:p-6 bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <h2 className="text-lg sm:text-xl text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-rose-600" />
              Personal Details
            </h2>
            {isEditing ? (
              <div className="grid sm:grid-cols-2 gap-4">
                <EditField label="Age" value={editData.age} onChange={(val) => handleChange('age', val)} type="number" />
                <EditField label="Gender" value={editData.gender} onChange={(val) => handleChange('gender', val)} />
                <EditField label="Height" value={editData.height} onChange={(val) => handleChange('height', val)} placeholder="e.g., 5'10&quot;" />
                <EditField label="Weight" value={editData.weight} onChange={(val) => handleChange('weight', val)} placeholder="e.g., 75 kg" />
                <EditField label="Body Type" value={editData.bodyType} onChange={(val) => handleChange('bodyType', val)} />
                <EditField label="Marital Status" value={editData.maritalStatus} onChange={(val) => handleChange('maritalStatus', val)} />
                <EditField label="Religion" value={editData.religion} onChange={(val) => handleChange('religion', val)} />
                <EditField label="Caste" value={editData.caste} onChange={(val) => handleChange('caste', val)} />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <DetailRow label="Age" value={`${currentData.age} years`} icon={Calendar} />
                <DetailRow label="Gender" value={currentData.gender} icon={User} />
                <DetailRow label="Height" value={currentData.height} icon={Ruler} />
                <DetailRow label="Weight" value={currentData.weight} icon={Ruler} />
                <DetailRow label="Body Type" value={currentData.bodyType} icon={Ruler} />
                <DetailRow label="Marital Status" value={currentData.maritalStatus} icon={Heart} />
                <DetailRow label="Religion" value={currentData.religion} icon={Heart} />
                <DetailRow label="Caste" value={currentData.caste} icon={Heart} />
              </div>
            )}
          </Card>

          {/* Location Details */}
          <Card className="p-4 sm:p-6 bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <h2 className="text-lg sm:text-xl text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-600" />
              Location
            </h2>
            {isEditing ? (
              <div className="grid sm:grid-cols-3 gap-4">
                <EditField label="City" value={editData.city} onChange={(val) => handleChange('city', val)} />
                <EditField label="State" value={editData.state} onChange={(val) => handleChange('state', val)} />
                <EditField label="Country" value={editData.country} onChange={(val) => handleChange('country', val)} />
              </div>
            ) : (
              <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                <DetailRow label="City" value={currentData.city} icon={MapPin} />
                <DetailRow label="State" value={currentData.state} icon={MapPin} />
                <DetailRow label="Country" value={currentData.country} icon={MapPin} />
              </div>
            )}
          </Card>

          {/* Professional Details */}
          <Card className="p-4 sm:p-6 bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <h2 className="text-lg sm:text-xl text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-rose-600" />
              Professional Details
            </h2>
            {isEditing ? (
              <div className="grid sm:grid-cols-2 gap-4">
                <EditField label="Education" value={editData.education} onChange={(val) => handleChange('education', val)} />
                <EditField label="Occupation" value={editData.occupation} onChange={(val) => handleChange('occupation', val)} />
                <EditField label="Organization" value={editData.organization} onChange={(val) => handleChange('organization', val)} />
                <EditField label="Annual Income" value={editData.income} onChange={(val) => handleChange('income', val)} placeholder="e.g., 15-20 Lakh" />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <DetailRow label="Education" value={currentData.education} icon={GraduationCap} />
                <DetailRow label="Occupation" value={currentData.occupation} icon={Briefcase} />
                <DetailRow label="Organization" value={currentData.organization} icon={Briefcase} />
                <DetailRow label="Annual Income" value={`₹${currentData.income}`} icon={Briefcase} />
              </div>
            )}
          </Card>

          {/* Family Details */}
          <Card className="p-4 sm:p-6 bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <h2 className="text-lg sm:text-xl text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-rose-600" />
              Family Details
            </h2>
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <EditField label="Father's Name" value={editData.fatherName} onChange={(val) => handleChange('fatherName', val)} />
                  <EditField label="Father's Occupation" value={editData.fatherOccupation} onChange={(val) => handleChange('fatherOccupation', val)} />
                  <EditField label="Mother's Name" value={editData.motherName} onChange={(val) => handleChange('motherName', val)} />
                  <EditField label="Mother's Occupation" value={editData.motherOccupation} onChange={(val) => handleChange('motherOccupation', val)} />
                </div>
                <EditField label="Siblings" value={editData.siblings} onChange={(val) => handleChange('siblings', val)} placeholder="e.g., 1 Sister (Younger, Unmarried)" fullWidth />
                <EditField label="Family Income" value={editData.familyIncome} onChange={(val) => handleChange('familyIncome', val)} placeholder="e.g., 30-50 Lakh" fullWidth />
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <DetailRow label="Father" value={`${currentData.fatherName} - ${currentData.fatherOccupation}`} icon={Users} />
                <DetailRow label="Mother" value={`${currentData.motherName} - ${currentData.motherOccupation}`} icon={Users} />
                <DetailRow label="Siblings" value={currentData.siblings} icon={Users} />
                <DetailRow label="Family Income" value={`₹${currentData.familyIncome}`} icon={Users} />
              </div>
            )}
          </Card>

          {/* Lifestyle & Interests */}
          <Card className="p-4 sm:p-6 bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <h2 className="text-lg sm:text-xl text-gray-800 mb-4 flex items-center gap-2">
              <Coffee className="w-5 h-5 text-rose-600" />
              Lifestyle & Interests
            </h2>
            {isEditing ? (
              <div className="space-y-4">
                <EditField label="Dietary Habits" value={editData.diet} onChange={(val) => handleChange('diet', val)} />
                <EditField label="Languages Known" value={editData.languages} onChange={(val) => handleChange('languages', val)} placeholder="e.g., Hindi, English, Punjabi" fullWidth />
                <EditField label="Hobbies & Interests" value={editData.hobbies} onChange={(val) => handleChange('hobbies', val)} placeholder="e.g., Cricket, Photography, Traveling" fullWidth />
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">Dietary Habits</p>
                  <Badge variant="outline" className="border-rose-200 text-rose-600 text-xs sm:text-sm">
                    {currentData.diet}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">Languages</p>
                  <p className="text-sm sm:text-base text-gray-700">{currentData.languages}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">Hobbies</p>
                  <p className="text-sm sm:text-base text-gray-700">{currentData.hobbies}</p>
                </div>
              </div>
            )}
          </Card>

          {/* Contact Information */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100 shadow-lg">
            <h2 className="text-lg sm:text-xl text-gray-800 mb-4">Contact Information</h2>
            {isEditing ? (
              <div className="grid md:grid-cols-2 gap-4">
                <EditField label="Email Address" value={editData.email} onChange={(val) => handleChange('email', val)} type="email" />
                <EditField label="Mobile Number" value={editData.mobile} onChange={(val) => handleChange('mobile', val)} type="tel" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm sm:text-base text-gray-800 break-all">{currentData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Mobile</p>
                    <p className="text-sm sm:text-base text-gray-800">{currentData.mobile}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Bottom Save/Cancel Buttons for Mobile */}
        {isEditing && (
          <div className="mt-6 md:mt-8 flex gap-3 sticky bottom-20 md:bottom-4 bg-white/95 backdrop-blur p-4 rounded-2xl border border-gray-200 shadow-xl">
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 flex-1 h-11 sm:h-12 text-sm sm:text-base touch-manipulation"
            >
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="border-gray-300 px-4 sm:px-6 h-11 sm:h-12 text-sm sm:text-base touch-manipulation"
            >
              <X className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Cancel</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Components
function InfoCard({
  icon: Icon,
  label,
  value,
  isEditing,
  editValue,
  onEdit
}: {
  icon: any;
  label: string;
  value: string;
  isEditing: boolean;
  editValue: string;
  onEdit: (val: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 p-3 sm:p-4 bg-rose-50 rounded-xl">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        {isEditing ? (
          <Input
            value={editValue}
            onChange={(e) => onEdit(e.target.value)}
            className="h-7 sm:h-8 mt-1 text-xs sm:text-sm"
          />
        ) : (
          <p className="text-xs sm:text-sm text-gray-800 truncate">{value}</p>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
      <Icon className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm text-gray-800 break-words">{value}</p>
      </div>
    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  fullWidth = false
}: {
  label: string;
  value: string | number;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? 'col-span-full' : ''}>
      <Label className="text-xs sm:text-sm mb-2 block">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 sm:h-10 text-sm sm:text-base"
      />
    </div>
  );
}