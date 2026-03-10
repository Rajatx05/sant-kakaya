import { Card } from './ui/card';
import { Heart, Shield, Users, Award, Target, Sparkles, Brain, CheckCircle } from 'lucide-react';

interface AboutPageProps {
  onGoBack: () => void;
}

export default function AboutPage({ onGoBack }: AboutPageProps) {
  const values = [
    {
      icon: Heart,
      title: 'Trust & Authenticity',
      description: 'Every profile is verified to ensure genuine connections and authentic relationships.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your data is protected with industry-leading encryption and security measures.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We prioritize creating a safe, respectful community for all our members.'
    },
    {
      icon: Award,
      title: 'Success Stories',
      description: 'Over 50,000 couples have found their life partners through our platform.'
    }
  ];

  const matchingSteps = [
    {
      icon: Users,
      title: 'Complete Your Profile',
      description: 'Share your details, preferences, and what you\'re looking for in a life partner.'
    },
    {
      icon: Brain,
      title: 'AI Works 24/7',
      description: 'Our algorithm continuously scans all profiles to find matches based on mutual compatibility.'
    },
    {
      icon: Sparkles,
      title: 'Automatic Matching',
      description: 'When both profiles match each other\'s criteria, a match is automatically created.'
    },
    {
      icon: Heart,
      title: 'Connect & Communicate',
      description: 'View your matches and start meaningful conversations with compatible profiles.'
    }
  ];

  const milestones = [
    { year: '2015', event: 'Perfect Match Founded' },
    { year: '2017', event: '10,000 Success Stories' },
    { year: '2020', event: '1 Lakh+ Verified Profiles' },
    { year: '2023', event: '50,000+ Happy Couples' },
    { year: '2025', event: '2 Lakh+ Active Members' }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-rose-600" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl text-gray-800 mb-6">About Perfect Match</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            India's most trusted matrimonial platform, connecting hearts and creating lifelong relationships since 2015.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="p-8 md:p-12 mb-16 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100 shadow-xl">
          <div className="flex items-start gap-4 mb-4">
            <Target className="w-8 h-8 text-rose-600 flex-shrink-0" />
            <div>
              <h2 className="text-2xl text-gray-800 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To help individuals find their perfect life partner by providing a secure, authentic, and user-friendly platform that respects traditional values while embracing modern technology. We believe in creating meaningful connections that lead to lifelong happiness.
              </p>
            </div>
          </div>
        </Card>

        {/* How Matching Works */}
        <div className="mb-16">
          <h2 className="text-3xl text-gray-800 text-center mb-4">How Our Automatic Matching Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            No manual browsing or searching! Our AI automatically finds and creates matches when both profiles meet each other's criteria
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchingSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-xl transition-all border-rose-100 group relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    {index + 1}
                  </div>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-4 mt-2 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                </Card>
              );
            })}
          </div>
          
          {/* Key Benefits */}
          <Card className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <h3 className="text-xl text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              Why Automatic Matching Works Better
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p><strong>No manual browsing</strong> - Save time, let AI work for you</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p><strong>100% mutual compatibility</strong> - Both must match each other</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p><strong>Privacy protected</strong> - Only visible to mutual matches</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p><strong>Higher success rate</strong> - Quality over quantity</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl text-gray-800 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-xl transition-all border-rose-100 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Our Journey */}
        <Card className="p-8 md:p-12 mb-16 bg-white/95 backdrop-blur border-rose-100 shadow-xl">
          <h2 className="text-3xl text-gray-800 text-center mb-12">Our Journey</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-rose-200 to-pink-200 hidden md:block"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-center gap-8">
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:order-2'}`}>
                    <div className="bg-rose-50 p-6 rounded-2xl inline-block">
                      <p className="text-2xl text-rose-600 mb-2">{milestone.year}</p>
                      <p className="text-gray-800">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-4 h-4 bg-rose-500 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10 ring-4 ring-white"></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Why Choose Us */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 text-center bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl text-gray-800 mb-3">100% Secure</h3>
            <p className="text-gray-600">Your privacy and security are our top priority with end-to-end encryption.</p>
          </Card>
          <Card className="p-8 text-center bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl text-gray-800 mb-3">Verified Profiles</h3>
            <p className="text-gray-600">All profiles undergo strict verification to ensure authenticity.</p>
          </Card>
          <Card className="p-8 text-center bg-white/95 backdrop-blur border-rose-100 shadow-lg">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl text-gray-800 mb-3">24/7 Support</h3>
            <p className="text-gray-600">Our dedicated support team is always here to help you.</p>
          </Card>
        </div>

        {/* Team Section */}
        <Card className="p-8 md:p-12 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-center shadow-xl">
          <Sparkles className="w-12 h-12 mx-auto mb-6" />
          <h2 className="text-3xl mb-4">Join Our Success Story</h2>
          <p className="text-xl mb-6 text-rose-100 max-w-2xl mx-auto">
            Be part of a community that has helped thousands find their perfect life partner. Your love story starts here.
          </p>
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              2 Lakh+ Members
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              50,000+ Success Stories
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              95% Success Rate
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}