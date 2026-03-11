import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';
import {
  User, Contact, Ruler, Briefcase, Users, Coffee,
  HeartHandshake, Lock, FileText, CheckCircle2, ArrowRight,
  Upload, Camera, Eye, EyeOff, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import { userService } from '../services/userService';

interface FormData {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  age: number;
  gender: string;
  maritalStatus: string;
  religion: string;
  caste: string;
  email: string;
  mobile: string;
  alternateMobile: string;
  currentCity: string;
  state: string;
  country: string;
  aadhaarNumber: string;
  panNumber: string;
  heightFt: string;
  heightIn: string;
  weight: string;
  bodyType: string;
  skinTone: string;
  qualification: string;
  educationalCertificates: string;
  occupation: string;
  organization: string;
  annualIncome: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  brothers: string;
  sisters: string;
  familyLocation: string;
  familyState: string;
  familyCountry: string;
  familyIncome: string;
  dietaryHabits: string;
  hobbies: any;
  otherHobbies?: string;
  languages: any;
  otherLanguages?: string;
  preferredAgeMin: string;
  preferredAgeMax: string;
  preferredHeightMin: string;
  preferredHeightMax: string;
  preferredBodyType: string;
  preferredEducation: string;
  preferredOccupation: string;
  preferredLocation: string;
  preferredSkinTone: string;
  preferredIncome: string;
  preferredReligion: string;
  preferredCaste: string;
  username: string;
  password: string;
  confirmPassword: string;
  profilePhoto: FileList;
  bio: string;
  otherInfo: string;
  termsAccepted: boolean;
}

const steps = [
  { id: 1, title: 'Basic Details', icon: User, fields: ['fullName', 'dateOfBirth', 'timeOfBirth', 'placeOfBirth', 'age', 'gender', 'maritalStatus', 'religion', 'caste'] },
  { id: 2, title: 'Contact & Verification', icon: Contact, fields: ['email', 'mobile', 'alternateMobile', 'currentCity', 'state', 'country', 'aadhaarNumber', 'panNumber', 'username', 'password', 'confirmPassword'] },
  { id: 3, title: 'Physical', icon: Ruler, fields: ['heightFt', 'heightIn', 'weight', 'bodyType', 'skinTone'] },
  { id: 4, title: 'Education', icon: Briefcase, fields: ['qualification', 'educationalCertificates', 'occupation', 'organization', 'annualIncome'] },
  { id: 5, title: 'Family', icon: Users, fields: ['fatherName', 'fatherOccupation', 'motherName', 'motherOccupation', 'brothers', 'sisters', 'familyLocation', 'familyState', 'familyCountry', 'familyIncome'] },
  { id: 6, title: 'Lifestyle', icon: Coffee, fields: ['dietaryHabits', 'hobbies', 'languages'] },
  { id: 7, title: 'Partner', icon: HeartHandshake, fields: ['preferredAgeMin', 'preferredAgeMax', 'preferredHeightMin', 'preferredHeightMax', 'preferredBodyType', 'preferredEducation', 'preferredOccupation', 'preferredLocation', 'preferredSkinTone', 'preferredIncome', 'preferredReligion', 'preferredCaste'] },
  { id: 8, title: 'Profile & Terms', icon: FileText, fields: ['profilePhoto', 'bio', 'otherInfo', 'termsAccepted'] },
  { id: 9, title: 'Membership', icon: Lock, fields: [] },
];

interface RegistrationPageProps {
  onNavigate: (page: string) => void;
  onGoBack: () => void;
  onSetPremium: (isPremium: boolean) => void;
  onLogin: (email: string, name: string, isPremium: boolean) => void;
}

export default function RegistrationPage({ onNavigate, onGoBack, onSetPremium, onLogin }: RegistrationPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);

  // Aadhaar card upload state
  const [aadhaarCardPhoto, setAadhaarCardPhoto] = useState<string>('');
  const [aadhaarCardFileName, setAadhaarCardFileName] = useState<string>('');

  const { register, handleSubmit, watch, setValue, control, formState: { errors }, trigger } = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      dateOfBirth: '',
      timeOfBirth: '',
      gender: '',
      maritalStatus: '',
      religion: '',
    }
  });

  const dateOfBirth = watch('dateOfBirth');
  const fullName = watch('fullName');

  useEffect(() => {
    if (dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      // No age restriction - just calculate and display
      if (age >= 0 && age <= 150) {
        setValue('age', age);
      }
    }
  }, [dateOfBirth, setValue]);

  // Auto-generate username from fullName
  useEffect(() => {
    if (fullName) {
      // Convert name to lowercase, remove spaces and special characters, and create username
      const username = fullName
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/g, '');
      setValue('username', username);
    }
  }, [fullName, setValue]);

  const handleAadhaarCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAadhaarCardFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAadhaarCardPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success('Aadhaar card uploaded successfully!');
    }
  };

  const progress = (currentStep / steps.length) * 100;
  const currentStepData = steps[currentStep - 1];
  const Icon = currentStepData.icon;

  const validateCurrentStep = async () => {
    // Validation disabled for easy navigation
    return true;
  };

  const handleNext = async () => {
    // Check if on Step 8 (Profile & Terms) and terms not accepted
    if (currentStep === 8 && !termsAccepted) {
      toast.error('Please read and accept the Terms and Conditions to continue');
      return;
    }

    // Allow navigation without validation
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: FormData, isPremium: boolean) => {
    // Format languages and hobbies from objects to comma-separated strings
    let formattedLanguages = '';
    if (data.languages && typeof data.languages === 'object') {
      formattedLanguages = Object.entries(data.languages)
        .filter(([_, value]) => value)
        .map(([key, _]) => key.charAt(0).toUpperCase() + key.slice(1))
        .join(', ');
    } else if (typeof data.languages === 'string') {
      formattedLanguages = data.languages;
    }
    
    if (data.otherLanguages) {
      formattedLanguages = formattedLanguages 
        ? `${formattedLanguages}, ${data.otherLanguages}`
        : data.otherLanguages;
    }

    let formattedHobbies = '';
    if (data.hobbies && typeof data.hobbies === 'object') {
      formattedHobbies = Object.entries(data.hobbies)
        .filter(([_, value]) => value)
        .map(([key, _]) => key.charAt(0).toUpperCase() + key.slice(1))
        .join(', ');
    } else if (typeof data.hobbies === 'string') {
      formattedHobbies = data.hobbies;
    }
    
    if (data.otherHobbies) {
      formattedHobbies = formattedHobbies
        ? `${formattedHobbies}, ${data.otherHobbies}`
        : data.otherHobbies;
    }

    // Persist user data
    const result = await userService.registerUser({
      ...data,
      languages: formattedLanguages,
      hobbies: formattedHobbies
    });

    if (!result.success) {
      toast.error('Registration failed', {
        description: result.message || 'Email might already be registered.',
      });
      return;
    }

    const userEmail = data.email || 'user@perfectmatch.com';
    const userName = data.fullName || 'User';

    // Always login as free user first - premium status will be set after payment
    onLogin(userEmail, userName, false);

    // Show confirmation message
    toast.success('✅ Registration Successful!', {
      description: `Welcome ${userName}! Your profile has been created.`,
      duration: 3000,
    });

    // Simulate email confirmation
    setTimeout(() => {
      toast.success('📧 Confirmation Email Sent!', {
        description: `A confirmation email has been sent to ${userEmail}`,
        duration: 3000,
      });
    }, 1000);

    // Navigate based on premium choice
    if (isPremium) {
      setTimeout(() => {
        toast.info('Redirecting to payment...');
        onNavigate('payment');
      }, 2500);
    } else {
      setTimeout(() => {
        toast.info('Redirecting to your matches...');
        onNavigate('matches');
      }, 2500);
    }
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    // Prevent form submission on Enter key
    if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  const handleCompleteRegistration = (isPremium: boolean) => {
    // Explicitly trigger form submission
    handleSubmit((data) => onSubmit(data, isPremium))();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Progress Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg border border-rose-100">
          <h2 className="text-xl sm:text-2xl text-gray-800 mb-4">Create Your Profile</h2>
          <div className="relative">
            <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleFormKeyDown}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 md:p-12 shadow-xl bg-white/95 backdrop-blur border-rose-100">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl mb-5 shadow-md">
                    <Icon className="w-10 h-10 text-rose-600" />
                  </div>
                  <h3 className="text-2xl text-gray-800 mb-2">{currentStepData.title}</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"></div>
                </div>

                {/* Step 1: Basic Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
                        <Input id="fullName" {...register('fullName')} placeholder="Enter your full name" className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400" />
                      </div>

                      <div>
                        <Controller
                          name="dateOfBirth"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              label="Date of Birth"
                              required={false}
                              minAge={0}
                              value={field.value}
                              onChange={field.onChange}
                              error=""
                            />
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <Controller
                          name="timeOfBirth"
                          control={control}
                          render={({ field }) => (
                            <TimePicker
                              label="Time of Birth"
                              required={false}
                              value={field.value}
                              onChange={field.onChange}
                              error=""
                            />
                          )}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Click "Don't Know" if unsure
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="placeOfBirth" className="text-gray-700">Place of Birth (City, Country)</Label>
                        <Input
                          id="placeOfBirth"
                          type="text"
                          {...register('placeOfBirth')}
                          placeholder="e.g., Mumbai, India"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="age" className="text-gray-700">Age (Auto-calculated)</Label>
                        <div className="relative">
                          <Input
                            id="age"
                            type="number"
                            {...register('age')}
                            readOnly
                            className="h-14 text-base bg-gray-50 border-gray-200"
                          />
                          {watch('age') && watch('age') >= 21 && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 text-sm">
                              ✓ Eligible
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label className="text-gray-700">Gender</Label>
                        <Controller
                          name="gender"
                          control={control}
                          render={({ field }) => (
                            <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 gap-3">
                              <div className="relative">
                                <RadioGroupItem value="male" id="male" className="peer sr-only" />
                                <Label htmlFor="male" className="flex items-center justify-center h-14 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer transition-all peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 hover:border-rose-300">Male</Label>
                              </div>
                              <div className="relative">
                                <RadioGroupItem value="female" id="female" className="peer sr-only" />
                                <Label htmlFor="female" className="flex items-center justify-center h-14 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer transition-all peer-data-[state=checked]:border-rose-500 peer-data-[state=checked]:bg-rose-50 hover:border-rose-300">Female</Label>
                              </div>
                            </RadioGroup>
                          )}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="maritalStatus" className="text-gray-700">Marital Status</Label>
                        <Controller
                          name="maritalStatus"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="unmarried">Unmarried</SelectItem>
                                <SelectItem value="divorced">Divorced</SelectItem>
                                <SelectItem value="widower">Widower</SelectItem>
                                <SelectItem value="widow">Widow</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="religion" className="text-gray-700">Religion</Label>
                        <Controller
                          name="religion"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select religion" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hindu">Hindu</SelectItem>
                                <SelectItem value="muslim">Muslim</SelectItem>
                                <SelectItem value="christian">Christian</SelectItem>
                                <SelectItem value="sikh">Sikh</SelectItem>
                                <SelectItem value="jain">Jain</SelectItem>
                                <SelectItem value="buddhist">Buddhist</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="caste" className="text-gray-700">Caste / Community</Label>
                        <Input
                          id="caste"
                          type="text"
                          {...register('caste')}
                          placeholder="Enter caste/community"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="your.email@example.com"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="mobile" className="text-gray-700">Mobile Number</Label>
                        <Input
                          id="mobile"
                          type="tel"
                          {...register('mobile')}
                          placeholder="+91 98765 43210"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="alternateMobile" className="text-gray-700">Alternate Contact Number</Label>
                        <Input
                          id="alternateMobile"
                          type="tel"
                          {...register('alternateMobile')}
                          placeholder="+91 98765 43210 (Optional)"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="currentCity" className="text-gray-700">Current City / Town</Label>
                        <Input
                          id="currentCity"
                          type="text"
                          {...register('currentCity')}
                          placeholder="e.g., Mumbai"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="state" className="text-gray-700">State</Label>
                        <Input
                          id="state"
                          type="text"
                          {...register('state')}
                          placeholder="e.g., Maharashtra"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="country" className="text-gray-700">Country</Label>
                        <Controller
                          name="country"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="india">India</SelectItem>
                                <SelectItem value="usa">United States</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="canada">Canada</SelectItem>
                                <SelectItem value="australia">Australia</SelectItem>
                                <SelectItem value="uae">United Arab Emirates</SelectItem>
                                <SelectItem value="singapore">Singapore</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      {/* Aadhaar Card Upload Section */}
                      <div className="space-y-4 sm:col-span-2 mt-6">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-800">
                            <strong>🪪 Aadhaar Card Upload Required</strong>
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Please upload a clear photo of your Aadhaar card for identity verification.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-gray-700">Upload Aadhaar Card Photo *</Label>
                          <label
                            htmlFor="aadhaarCardUpload"
                            className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl cursor-pointer transition-all ${aadhaarCardPhoto
                              ? 'border-green-400 bg-green-50'
                              : 'border-gray-300 bg-gray-50 hover:border-rose-400 hover:bg-rose-50'
                              }`}
                            style={{ minHeight: '120px' }}
                          >
                            {aadhaarCardPhoto ? (
                              <div className="flex flex-col items-center gap-2 p-4">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                                <p className="text-sm text-green-700 font-medium">Aadhaar Card Uploaded!</p>
                                <p className="text-xs text-gray-500 truncate max-w-xs">{aadhaarCardFileName}</p>
                                <p className="text-xs text-rose-500 mt-1">Click to replace</p>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2 p-6">
                                <Upload className="w-8 h-8 text-gray-400" />
                                <p className="text-sm text-gray-600 font-medium">Click to upload Aadhaar card</p>
                                <p className="text-xs text-gray-400">JPG, PNG or PDF · Max 5MB</p>
                              </div>
                            )}
                            <input
                              id="aadhaarCardUpload"
                              type="file"
                              accept="image/*,application/pdf"
                              className="hidden"
                              onChange={handleAadhaarCardUpload}
                            />
                          </label>
                          {aadhaarCardPhoto && aadhaarCardPhoto.startsWith('data:image') && (
                            <div className="mt-2 rounded-lg overflow-hidden border border-green-200">
                              <img
                                src={aadhaarCardPhoto}
                                alt="Aadhaar Card Preview"
                                className="w-full object-contain max-h-48"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Account Section */}
                      <div className="space-y-4 sm:col-span-2 mt-6">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                          <p className="text-sm text-purple-800">
                            <strong>🔑 Account Setup</strong>
                          </p>
                          <p className="text-xs text-gray-600 mt-1">

                          </p>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="username" className="text-gray-700">Username (Auto-generated from your name)</Label>
                          <Input
                            id="username"
                            type="text"
                            {...register('username')}
                            placeholder="Username"
                            className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400 bg-gray-50"
                            readOnly
                          />
                          <p className="text-xs text-gray-500"></p>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="password" className="text-gray-700">Password *</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              {...register('password')}
                              placeholder="Create a strong password"
                              className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400 pr-12"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password *</Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              {...register('confirmPassword')}
                              placeholder="Re-enter your password"
                              className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400 pr-12"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Step 3: Physical Attributes */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Height in Feet & Inches */}
                      <div className="space-y-3 sm:col-span-2">
                        <Label className="text-gray-700">Height (Feet & Inches)</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Label htmlFor="heightFt" className="text-gray-600 text-sm">Feet</Label>
                            <Controller
                              name="heightFt"
                              control={control}
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                    <SelectValue placeholder="Feet" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="4">4 ft</SelectItem>
                                    <SelectItem value="5">5 ft</SelectItem>
                                    <SelectItem value="6">6 ft</SelectItem>
                                    <SelectItem value="7">7 ft</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="heightIn" className="text-gray-600 text-sm">Inches</Label>
                            <Controller
                              name="heightIn"
                              control={control}
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                    <SelectValue placeholder="Inches" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 12 }, (_, i) => (
                                      <SelectItem key={i} value={i.toString()}>
                                        {i} in
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="weight" className="text-gray-700">Weight (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          {...register('weight')}
                          placeholder="e.g., 65"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="bodyType" className="text-gray-700">Body Type</Label>
                        <Controller
                          name="bodyType"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select body type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="slim">Slim</SelectItem>
                                <SelectItem value="average">Average</SelectItem>
                                <SelectItem value="athletic">Athletic</SelectItem>
                                <SelectItem value="heavy">Heavy</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="skinTone" className="text-gray-700">Skin Tone</Label>
                        <Controller
                          name="skinTone"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select skin tone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="very-fair">Very Fair</SelectItem>
                                <SelectItem value="fair">Fair</SelectItem>
                                <SelectItem value="wheatish">Wheatish</SelectItem>
                                <SelectItem value="tan">Tan</SelectItem>
                                <SelectItem value="dusky">Dusky</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* Step 4: Education & Profession */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="qualification" className="text-gray-700">Highest Qualification</Label>
                        <Controller
                          name="qualification"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select highest qualification" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high-school">High School</SelectItem>
                                <SelectItem value="graduate">Graduate</SelectItem>
                                <SelectItem value="postgraduate">Postgraduate</SelectItem>
                                <SelectItem value="doctorate">Doctorate</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="occupation" className="text-gray-700">Occupation</Label>
                        <Input
                          id="occupation"
                          type="text"
                          {...register('occupation')}
                          placeholder="e.g., Software Engineer, Doctor, Teacher"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="organization" className="text-gray-700">Organization / Company Name</Label>
                        <Input
                          id="organization"
                          type="text"
                          {...register('organization')}
                          placeholder="e.g., ABC Corporation, XYZ Hospital"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="annualIncome" className="text-gray-700">Annual Income</Label>
                        <Controller
                          name="annualIncome"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select annual income range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-3">₹0 - ₹3 Lakhs</SelectItem>
                                <SelectItem value="3-5">₹3 - ₹5 Lakhs</SelectItem>
                                <SelectItem value="5-7">₹5 - ₹7 Lakhs</SelectItem>
                                <SelectItem value="7-10">₹7 - ₹10 Lakhs</SelectItem>
                                <SelectItem value="10-15">₹10 - ₹15 Lakhs</SelectItem>
                                <SelectItem value="15-20">₹15 - ₹20 Lakhs</SelectItem>
                                <SelectItem value="20-30">₹20 - ₹30 Lakhs</SelectItem>
                                <SelectItem value="30-50">₹30 - ₹50 Lakhs</SelectItem>
                                <SelectItem value="50+">₹50+ Lakhs</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* Step 5: Family Details */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="fatherName" className="text-gray-700">Father's Name</Label>
                        <Input
                          id="fatherName"
                          type="text"
                          {...register('fatherName')}
                          placeholder="Father's full name"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="fatherOccupation" className="text-gray-700">Father's Occupation</Label>
                        <Input
                          id="fatherOccupation"
                          type="text"
                          {...register('fatherOccupation')}
                          placeholder="e.g., Business, Retired"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="motherName" className="text-gray-700">Mother's Name</Label>
                        <Input
                          id="motherName"
                          type="text"
                          {...register('motherName')}
                          placeholder="Mother's full name"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="motherOccupation" className="text-gray-700">Mother's Occupation</Label>
                        <Input
                          id="motherOccupation"
                          type="text"
                          {...register('motherOccupation')}
                          placeholder="e.g., Homemaker, Teacher"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="numberOfBrothers" className="text-gray-700">Number of Brothers</Label>
                        <Controller
                          name="numberOfBrothers"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">0</SelectItem>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5+">5+</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="numberOfSisters" className="text-gray-700">Number of Sisters</Label>
                        <Controller
                          name="numberOfSisters"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">0</SelectItem>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5+">5+</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="familyCity" className="text-gray-700">Family Location - City</Label>
                        <Input
                          id="familyCity"
                          type="text"
                          {...register('familyCity')}
                          placeholder="e.g., Delhi"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="familyState" className="text-gray-700">Family Location - State</Label>
                        <Input
                          id="familyState"
                          type="text"
                          {...register('familyState')}
                          placeholder="e.g., Delhi"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="familyCountry" className="text-gray-700">Family Location - Country</Label>
                        <Controller
                          name="familyCountry"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="india">India</SelectItem>
                                <SelectItem value="usa">United States</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="canada">Canada</SelectItem>
                                <SelectItem value="australia">Australia</SelectItem>
                                <SelectItem value="uae">United Arab Emirates</SelectItem>
                                <SelectItem value="singapore">Singapore</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="familyAnnualIncome" className="text-gray-700">Family Annual Income</Label>
                        <Controller
                          name="familyAnnualIncome"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select family annual income range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-5">₹0 - ₹5 Lakhs</SelectItem>
                                <SelectItem value="5-10">₹5 - ₹10 Lakhs</SelectItem>
                                <SelectItem value="10-20">₹10 - ₹20 Lakhs</SelectItem>
                                <SelectItem value="20-30">₹20 - ₹30 Lakhs</SelectItem>
                                <SelectItem value="30-50">₹30 - ₹50 Lakhs</SelectItem>
                                <SelectItem value="50-75">₹50 - ₹75 Lakhs</SelectItem>
                                <SelectItem value="75-100">₹75 Lakhs - ₹1 Crore</SelectItem>
                                <SelectItem value="100+">₹1 Crore+</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* Step 6: Lifestyle & Preferences */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="dietaryHabits" className="text-gray-700">Dietary Habits</Label>
                        <Controller
                          name="dietaryHabits"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select dietary preference" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                                <SelectItem value="vegan">Vegan</SelectItem>
                                <SelectItem value="eggetarian">Eggetarian</SelectItem>
                                <SelectItem value="jain">Jain</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <Label className="text-gray-700">Hobbies & Interests</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                          {[
                            'Reading', 'Traveling', 'Music', 'Dancing',
                            'Cooking', 'Sports', 'Photography', 'Painting',
                            'Yoga', 'Gardening', 'Movies', 'Writing'
                          ].map((hobby) => (
                            <div key={hobby} className="flex items-center space-x-3">
                              <Checkbox
                                id={`hobby-${hobby.toLowerCase()}`}
                                {...register(`hobbies.${hobby.toLowerCase()}`)}
                                className="border-gray-300 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
                              />
                              <Label
                                htmlFor={`hobby-${hobby.toLowerCase()}`}
                                className="text-sm text-gray-700 cursor-pointer"
                              >
                                {hobby}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="otherHobbies" className="text-gray-600 text-sm">Other Hobbies (Optional)</Label>
                          <Input
                            id="otherHobbies"
                            type="text"
                            {...register('otherHobbies')}
                            placeholder="Enter any other hobbies..."
                            className="h-12 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-gray-700">Language(s) Known</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                          {[
                            'English', 'Hindi', 'Tamil', 'Telugu',
                            'Kannada', 'Malayalam', 'Bengali', 'Marathi',
                            'Gujarati', 'Punjabi', 'Urdu', 'Odia'
                          ].map((language) => (
                            <div key={language} className="flex items-center space-x-3">
                              <Checkbox
                                id={`language-${language.toLowerCase()}`}
                                {...register(`languages.${language.toLowerCase()}`)}
                                className="border-gray-300 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
                              />
                              <Label
                                htmlFor={`language-${language.toLowerCase()}`}
                                className="text-sm text-gray-700 cursor-pointer"
                              >
                                {language}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="otherLanguages" className="text-gray-600 text-sm">Other Languages (Optional)</Label>
                          <Input
                            id="otherLanguages"
                            type="text"
                            {...register('otherLanguages')}
                            placeholder="Enter any other languages..."
                            className="h-12 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Step 7: Partner Preferences */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="preferredAgeMin" className="text-gray-700">Preferred Age Range - Minimum</Label>
                        <Input
                          id="preferredAgeMin"
                          type="number"
                          {...register('preferredAgeMin')}
                          placeholder="e.g., 25"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="preferredAgeMax" className="text-gray-700">Preferred Age Range - Maximum</Label>
                        <Input
                          id="preferredAgeMax"
                          type="number"
                          {...register('preferredAgeMax')}
                          placeholder="e.g., 35"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="preferredHeightMin" className="text-gray-700">Preferred Height - Minimum (ft-in)</Label>
                        <Input
                          id="preferredHeightMin"
                          type="text"
                          {...register('preferredHeightMin')}
                          placeholder="e.g., 5 ft 0 in"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="preferredHeightMax" className="text-gray-700">Preferred Height - Maximum (ft-in)</Label>
                        <Input
                          id="preferredHeightMax"
                          type="text"
                          {...register('preferredHeightMax')}
                          placeholder="e.g., 6 ft 0 in"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="preferredBodyType" className="text-gray-700">Preferred Body Type</Label>
                        <Controller
                          name="preferredBodyType"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select preferred body type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="slim">Slim</SelectItem>
                                <SelectItem value="average">Average</SelectItem>
                                <SelectItem value="athletic">Athletic</SelectItem>
                                <SelectItem value="heavy">Heavy</SelectItem>
                                <SelectItem value="any">Any</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="preferredEducation" className="text-gray-700">Preferred Education</Label>
                        <Input
                          id="preferredEducation"
                          type="text"
                          {...register('preferredEducation')}
                          placeholder="e.g., Graduate, Post Graduate"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="preferredOccupation" className="text-gray-700">Preferred Occupation</Label>
                        <Input
                          id="preferredOccupation"
                          type="text"
                          {...register('preferredOccupation')}
                          placeholder="e.g., Software Engineer, Doctor"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3 sm:col-span-2">
                        <Label htmlFor="preferredLocation" className="text-gray-700">Preferred Location</Label>
                        <Input
                          id="preferredLocation"
                          type="text"
                          {...register('preferredLocation')}
                          placeholder="e.g., Mumbai, Bangalore, or Any location in India"
                          className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="preferredSkinTone" className="text-gray-700">Preferred Skin Tone</Label>
                        <Controller
                          name="preferredSkinTone"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select preferred skin tone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="very-fair">Very Fair</SelectItem>
                                <SelectItem value="fair">Fair</SelectItem>
                                <SelectItem value="wheatish">Wheatish</SelectItem>
                                <SelectItem value="tan">Tan</SelectItem>
                                <SelectItem value="dusky">Dusky</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="any">Any</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="preferredAnnualIncome" className="text-gray-700">Preferred Annual Income</Label>
                        <Controller
                          name="preferredAnnualIncome"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select preferred annual income" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-5">₹0 - ₹5 Lakhs</SelectItem>
                                <SelectItem value="5-10">₹5 - ₹10 Lakhs</SelectItem>
                                <SelectItem value="10-20">₹10 - ₹20 Lakhs</SelectItem>
                                <SelectItem value="20-50">₹20 - ₹50 Lakhs</SelectItem>
                                <SelectItem value="50+">₹50 Lakhs+</SelectItem>
                                <SelectItem value="any">Any</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="preferredReligion" className="text-gray-700">Preferred Religion</Label>
                        <Controller
                          name="preferredReligion"
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setValue('preferredCaste', '');
                              }}
                              value={field.value}
                            >
                              <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                <SelectValue placeholder="Select preferred religion" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hindu">Hindu</SelectItem>
                                <SelectItem value="muslim">Muslim</SelectItem>
                                <SelectItem value="christian">Christian</SelectItem>
                                <SelectItem value="sikh">Sikh</SelectItem>
                                <SelectItem value="jain">Jain</SelectItem>
                                <SelectItem value="buddhist">Buddhist</SelectItem>
                                <SelectItem value="parsi">Parsi</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="any">Any</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="preferredCaste" className="text-gray-700">Preferred Caste</Label>
                        {watch('preferredReligion') === 'hindu' ? (
                          <Controller
                            name="preferredCaste"
                            control={control}
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400">
                                  <SelectValue placeholder="Select preferred caste" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="brahmin">Brahmin</SelectItem>
                                  <SelectItem value="kshatriya">Kshatriya</SelectItem>
                                  <SelectItem value="vaishya">Vaishya</SelectItem>
                                  <SelectItem value="shudra">Shudra</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                  <SelectItem value="any">Any</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        ) : (
                          <Input
                            id="preferredCaste"
                            type="text"
                            {...register('preferredCaste')}
                            placeholder="Enter preferred caste or 'Any'"
                            className="h-14 text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* Step 8: Profile & Terms */}
                {currentStep === 8 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {/* Profile Photo Upload */}
                      <div className="space-y-3">
                        <Label className="text-gray-700">Profile Photo Upload</Label>
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                          {/* Photo Preview */}
                          <div className="w-40 h-40 rounded-xl border-2 border-dashed border-rose-300 bg-rose-50 flex items-center justify-center overflow-hidden relative">
                            {profilePhotoPreview ? (
                              <img src={profilePhotoPreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-center p-4">
                                <Camera className="w-12 h-12 text-rose-300 mx-auto mb-2" />
                                <p className="text-xs text-gray-500">No photo</p>
                              </div>
                            )}
                          </div>

                          {/* Upload Button */}
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-col sm:flex-row gap-3">
                              <label htmlFor="profilePhoto" className="cursor-pointer">
                                <div className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors">
                                  <Upload size={20} />
                                  <span>Choose Photo</span>
                                </div>
                                <input
                                  id="profilePhoto"
                                  type="file"
                                  accept="image/*"
                                  {...register('profilePhoto')}
                                  onChange={handlePhotoUpload}
                                  className="hidden"
                                />
                              </label>
                              {profilePhotoPreview && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => {
                                    setProfilePhotoPreview('');
                                    setValue('profilePhoto', null as any);
                                  }}
                                  className="border-rose-200 text-rose-600 hover:bg-rose-50"
                                >
                                  Remove Photo
                                </Button>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">

                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Short Bio / About Me */}
                      <div className="space-y-3">
                        <Label htmlFor="bio" className="text-gray-700">Short Bio / About Me</Label>
                        <Textarea
                          id="bio"
                          {...register('bio')}
                          placeholder="Tell us about yourself, your personality, interests, and what makes you unique..."
                          className="min-h-[150px] text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400 resize-y"
                        />
                        <p className="text-xs text-gray-500"></p>
                      </div>

                      {/* Any Other Info */}
                      <div className="space-y-3">
                        <Label htmlFor="otherInfo" className="text-gray-700">Any Other Info (Optional)</Label>
                        <Textarea
                          id="otherInfo"
                          {...register('otherInfo')}
                          placeholder="Any additional information you'd like to share about your family, expectations, or preferences..."
                          className="min-h-[120px] text-base border-gray-200 focus:border-rose-400 focus:ring-rose-400 resize-y"
                        />
                        <p className="text-xs text-gray-500"></p>
                      </div>

                      {/* Terms and Conditions Section */}
                      <div className="space-y-4 mt-8">
                        <div className="border-t-2 border-rose-200 pt-6">
                          {/* Terms Dialog */}
                          <Dialog open={termsDialogOpen} onOpenChange={setTermsDialogOpen}>

                            <DialogContent className="max-[430px]:w-[90%] sm:max-w-[calc(100%-2rem)] md:max-w-4xl max-h-[85vh] flex flex-col p-0">
                              <div className="px-6 pt-6 pb-4 border-b border-gray-200">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-rose-600" />
                                    Terms and Conditions
                                  </DialogTitle>
                                  <DialogDescription>
                                    Please read these terms carefully before using ForeverMatch
                                  </DialogDescription>
                                </DialogHeader>
                              </div>

                              <div className="flex-1 px-6 py-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                <div className="space-y-4 text-sm text-gray-700">
                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h5>
                                    <p className="mb-2">
                                      By creating an account and using ForeverMatch (formerly Perfect Match), you agree to be bound by these Terms and Conditions.
                                      If you do not agree to these terms, please do not register or use our services.
                                    </p>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">2. Eligibility</h5>
                                    <p className="mb-2">
                                      You must be at least 18 years of age to use this service. By registering, you represent and warrant that:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>You are legally eligible to marry under applicable law</li>
                                      <li>You are not currently married (unless seeking remarriage after legal divorce/widowhood)</li>
                                      <li>All information provided is accurate, current, and complete</li>
                                      <li>You have the legal capacity to enter into this agreement</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">3. Account Registration and Security</h5>
                                    <p className="mb-2">
                                      You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>Provide accurate and truthful information during registration</li>
                                      <li>Keep your password secure and not share it with others</li>
                                      <li>Notify us immediately of any unauthorized use of your account</li>
                                      <li>Update your information to keep it current and accurate</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">4. Profile Information and Verification</h5>
                                    <p className="mb-2">
                                      You agree that:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>All profile information, photos, and documents submitted are genuine and belong to you</li>
                                      <li>You will not impersonate any person or entity</li>
                                      <li>You consent to identity verification through Aadhaar/PAN as required</li>
                                      <li>We may verify your information and remove profiles with false or misleading content</li>
                                      <li>You will not use photos of other individuals</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">5. Privacy and Data Protection</h5>
                                    <p className="mb-2">
                                      Your privacy is important to us. By using our service, you acknowledge that:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>We collect and process personal data as described in our Privacy Policy</li>
                                      <li>Your profile may be shown to algorithmically matched users</li>
                                      <li>We implement security measures but cannot guarantee absolute security</li>
                                      <li>You should not share sensitive financial or personal information with other users</li>
                                      <li>We are not meant for collecting Personally Identifiable Information (PII) or securing highly sensitive data</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">6. Matching System and Algorithm</h5>
                                    <p className="mb-2">
                                      Our AI-powered matching system:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>Uses algorithms to suggest compatible matches based on your preferences and profile</li>
                                      <li>Does not guarantee that you will find a suitable match</li>
                                      <li>May be updated or modified without prior notice</li>
                                      <li>Is designed to show mutual matches only - no manual browsing</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">7. Membership and Payment Terms</h5>
                                    <p className="mb-2">
                                      Regarding memberships:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>Free users can see matches with blurred photos and limited information</li>
                                      <li>Premium membership provides full access to profiles, photos, and contact details</li>
                                      <li>Premium membership fees are non-refundable except as required by law</li>
                                      <li>You can upgrade from free to premium at any time</li>
                                      <li>Membership benefits may change with prior notice</li>
                                      <li>Payment information will be processed securely</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">8. Meeting Arrangements</h5>
                                    <p className="mb-2">
                                      For in-person meetings:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>Meetings are scheduled at venues managed by ForeverMatch</li>
                                      <li>Both parties must confirm the meeting request</li>
                                      <li>You are responsible for your own safety during meetings</li>
                                      <li>We recommend meeting in public venues and informing family/friends</li>
                                      <li>We are not responsible for any incidents during or after meetings</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">9. Prohibited Conduct</h5>
                                    <p className="mb-2">
                                      You agree NOT to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>Harass, abuse, or harm other users</li>
                                      <li>Use the service for commercial purposes or solicitation</li>
                                      <li>Create multiple accounts</li>
                                      <li>Share contact information of other users without consent</li>
                                      <li>Post offensive, illegal, or inappropriate content</li>
                                      <li>Use automated systems or bots to access the service</li>
                                      <li>Attempt to bypass security measures</li>
                                      <li>Engage in fraudulent activities</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">10. Content Ownership and License</h5>
                                    <p className="mb-2">
                                      You retain ownership of content you submit but grant us a license to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>Display your profile to matched users</li>
                                      <li>Store and process your information</li>
                                      <li>Use anonymized data for service improvement</li>
                                      <li>Remove content that violates our policies</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">11. Disclaimer of Warranties</h5>
                                    <p className="mb-2">
                                      ForeverMatch is provided "as is" without warranties of any kind. We do not:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>Guarantee that you will find a suitable match</li>
                                      <li>Conduct background checks on all users (beyond ID verification)</li>
                                      <li>Verify the accuracy of all user-provided information</li>
                                      <li>Guarantee uninterrupted or error-free service</li>
                                      <li>Warrant that the service is free from viruses or harmful components</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">12. Limitation of Liability</h5>
                                    <p className="mb-2">
                                      To the maximum extent permitted by law:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>We are not liable for any indirect, incidental, or consequential damages</li>
                                      <li>We are not responsible for user conduct or interactions</li>
                                      <li>You use the service at your own risk</li>
                                      <li>Our total liability is limited to the amount you paid for membership</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">13. Account Termination</h5>
                                    <p className="mb-2">
                                      We reserve the right to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>Suspend or terminate accounts that violate these terms</li>
                                      <li>Remove profiles with false or inappropriate content</li>
                                      <li>Refuse service to anyone at our discretion</li>
                                      <li>Delete inactive accounts after extended periods</li>
                                    </ul>
                                    <p className="mt-2">
                                      You may delete your account at any time through your profile settings.
                                    </p>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">14. Modifications to Terms</h5>
                                    <p className="mb-2">
                                      We may modify these Terms and Conditions at any time. Continued use of the service after changes constitutes acceptance of the new terms.
                                      We will notify users of significant changes via email or platform notification.
                                    </p>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">15. Governing Law and Dispute Resolution</h5>
                                    <p className="mb-2">
                                      These terms are governed by the laws of India. Any disputes shall be resolved through:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                      <li>Good faith negotiation first</li>
                                      <li>Mediation or arbitration if negotiation fails</li>
                                      <li>Courts in [Your Jurisdiction] as the exclusive venue for legal proceedings</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h5 className="font-semibold text-gray-800 mb-2">16. Contact Information</h5>
                                    <p className="mb-2">
                                      For questions about these Terms and Conditions, please contact us at:
                                    </p>
                                    <ul className="list-none space-y-1 ml-4">
                                      <li>Email: support@forevermatch.com</li>
                                      <li>Phone: +91 XXXX XXXXXX</li>
                                      <li>Address: [Your Business Address]</li>
                                    </ul>
                                  </div>

                                  <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-lg">
                                    <p className="text-sm text-gray-800">
                                      <strong>Important:</strong> By checking the acceptance box and proceeding with registration, you acknowledge that you have read,
                                      understood, and agree to be bound by these Terms and Conditions in their entirety.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {/* Terms Acceptance Checkbox */}
                          <div className={`p-4 border-2 rounded-lg transition-colors ${termsAccepted
                            ? 'bg-rose-50 border-rose-300'
                            : 'bg-white border-rose-200'
                            }`}>
                            <div className="flex items-start gap-3">
                              <Checkbox
                                id="termsAccepted"
                                checked={termsAccepted}
                                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                                className="mt-0.5 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
                              />
                              <div className="text-sm text-gray-800">
                                I have read and agree to all the{' '}
                                <button
                                  type="button"
                                  onClick={() => setTermsDialogOpen(true)}
                                  className="underline text-[#E91E63] hover:text-[#C2185B] font-medium"
                                >
                                  Terms and Conditions
                                </button>
                                . I understand that by checking this box, I am entering into a legally binding agreement with ForeverMatch.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 9: Membership Selection */}
                {currentStep === 9 && (
                  <div className="space-y-6">


                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Continue Free Option */}
                      <Card className="p-6 sm:p-8 border-2 border-rose-200 rounded-2xl bg-white shadow-lg">
                        <div className="text-center">
                          <div className="text-5xl mb-4">🎁</div>
                          <h4 className="text-xl sm:text-2xl text-rose-600 mb-3">Continue Free</h4>
                          <p className="text-sm sm:text-base text-gray-600 mb-6">
                            Start seeing matches with blurred profiles. View first names and ages only.
                          </p>
                          <ul className="text-left space-y-2 sm:space-y-3 mb-6">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">See your AI-matched profiles</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">View first name and age</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">Blurred profile photos</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Eye className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-500 line-through">Full profile access</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Eye className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-500 line-through">Contact details</span>
                            </li>
                          </ul>
                          <div className="text-3xl text-rose-600 mb-4">FREE</div>
                        </div>
                      </Card>

                      {/* Premium Membership Option */}
                      <Card className="p-6 sm:p-8 border-2 border-purple-200 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg relative">
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-bl-lg">
                          RECOMMENDED
                        </div>
                        <div className="text-center">
                          <div className="text-5xl mb-4">💎</div>
                          <h4 className="text-xl sm:text-2xl text-purple-600 mb-3">Premium Membership</h4>
                          <p className="text-sm sm:text-base text-gray-600 mb-6">
                            Full access to all profiles, photos, and contact details.
                          </p>
                          <ul className="text-left space-y-2 sm:space-y-3 mb-6">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">Unlimited AI-matched profiles</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">View complete profiles</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">Clear profile photos</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">Access contact details</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">Priority customer support</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">Schedule meetings at our venues</span>
                            </li>
                          </ul>
                          <div className="text-3xl text-purple-600 mb-4">₹999/month</div>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-rose-200 shadow-lg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex justify-between gap-2 sm:gap-4">
                <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1} size="lg" className="gap-2 h-12 sm:h-14 px-3 sm:px-8 disabled:opacity-50 border-rose-200 flex-shrink-0">
                  <span className="text-sm sm:text-base">Previous</span>
                </Button>

                {currentStep === 9 ? (
                  <div className="flex gap-2 sm:gap-4 flex-1 justify-end">
                    <Button
                      type="button"
                      onClick={() => handleCompleteRegistration(false)}
                      variant="outline"
                      size="lg"
                      className="gap-1.5 sm:gap-2 h-12 sm:h-14 px-3 sm:px-6 border-2 border-rose-300 text-rose-600 hover:bg-rose-50 shadow-md flex-shrink-0"
                    >
                      <span className="text-sm sm:text-base whitespace-nowrap">Continue Free</span>
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleCompleteRegistration(true)}
                      size="lg"
                      className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 gap-1.5 sm:gap-2 h-12 sm:h-14 px-3 sm:px-8 shadow-lg flex-shrink-0 max-w-[130px] sm:max-w-none"
                    >
                      <span className="text-sm sm:text-base whitespace-nowrap">Get Premium</span>
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    </Button>
                  </div>
                ) : (
                  <Button type="button" onClick={handleNext} size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 gap-2 h-12 sm:h-14 px-4 sm:px-8 shadow-lg">
                    <span>Next</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
