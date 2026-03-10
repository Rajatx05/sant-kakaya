import { Heart, Shield, Users, ArrowRight, Target, Award, AlertCircle, BookOpen, FileText, MapPin, Brain, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface HomePageProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
}

export default function HomePage({ onNavigate, isLoggedIn }: HomePageProps) {
  return (
    <div className="bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Hero Image with Gradient Overlay */}
        <div className="relative h-[500px] md:h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600"
            alt="Happy couple celebrating their wedding"
            className="w-full h-full object-cover"
          />
          {/* Pink Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#E91E63]/80 via-[#E91E63]/60 to-transparent"></div>
          
          {/* Floating Hearts Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Heart className="absolute top-20 left-10 w-8 h-8 text-white/30 animate-pulse" fill="currentColor" />
            <Heart className="absolute top-40 right-20 w-6 h-6 text-white/20 animate-pulse delay-100" fill="currentColor" />
            <Heart className="absolute bottom-32 left-1/4 w-10 h-10 text-white/25 animate-pulse delay-200" fill="currentColor" />
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Find Your Perfect Match, For Life
                </h1>
                <p className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed">
                  Connecting hearts through trust and compatibility.
                </p>
                
                {!isLoggedIn && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      onClick={() => onNavigate('registration')}
                      className="bg-white text-[#E91E63] hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-14 px-8 text-base font-semibold uppercase rounded-xl"
                    >
                      Register Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => onNavigate('login')}
                      className="bg-[#E91E63] text-white hover:bg-[#C2185B] shadow-xl hover:shadow-2xl transition-all duration-300 h-14 px-8 text-base font-semibold uppercase rounded-xl"
                    >
                      Login
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Perfect Match Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
              About Perfect Match
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              India's trusted matrimonial platform since 2015
            </p>
          </div>

          <Card className="p-8 md:p-12 mb-12 bg-gradient-to-br from-[#F8BBD0]/20 to-white border-0 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-start gap-4 mb-4">
              <Target className="w-8 h-8 text-[#E91E63] flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-[#212121] mb-4">Our Mission</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We help you find your life partner through a secure platform that respects tradition and embraces technology.
                </p>
              </div>
            </div>
          </Card>

          {/* Why Automatic Matching Works Better */}
          <div className="mt-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#212121] text-center mb-4">
              Why Automatic Matching Works Better
            </h3>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              No browsing needed! Our AI creates matches when both profiles match each other's preferences
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Zap, title: 'No Manual Browsing', desc: 'Save time, let AI work for you' },
                { icon: CheckCircle2, title: '100% Mutual Compatibility', desc: 'Both must match each other' },
                { icon: Shield, title: 'Privacy Protected', desc: 'Only visible to mutual matches' },
                { icon: Award, title: 'Higher Success Rate', desc: 'Quality over quantity' }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card 
                    key={index} 
                    className="p-6 text-center hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl bg-white hover:scale-105"
                    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#7986CB] to-[#5C6BC0] rounded-2xl mb-4 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-[#212121] mb-3">{benefit.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Perfect Match Section */}
      <section className="py-16 md:py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
              Why Choose Perfect Match
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What makes us different
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { icon: Heart, title: 'Trust & Authenticity', desc: 'Every profile is verified for genuine connections', color: '#E91E63' },
              { icon: Shield, title: 'Privacy & Security', desc: 'Your data is protected with industry-leading encryption', color: '#7986CB' },
              { icon: Users, title: 'Safe Community', desc: 'We create a safe, respectful space for everyone', color: '#E91E63' },
              { icon: Award, title: 'Success Stories', desc: 'Over 50,000 couples found their partners through us', color: '#7986CB' }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index} 
                  className="p-8 text-center hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl bg-white hover:scale-105"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    style={{ backgroundColor: value.color }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#212121] mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </Card>
              );
            })}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-white border-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-[#212121] mb-3">100% Secure</h3>
              <p className="text-gray-600 leading-relaxed">Your data is safe with end-to-end encryption</p>
            </Card>
            <Card className="p-8 text-center bg-white border-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-[#212121] mb-3">Verified Profiles</h3>
              <p className="text-gray-600 leading-relaxed">All profiles are strictly verified for authenticity</p>
            </Card>
            <Card className="p-8 text-center bg-white border-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-[#212121] mb-3">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">Our support team is always here to help</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Rules Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AlertCircle className="w-16 h-16 text-[#E91E63] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#212121] mb-4">
              Important Rules & Guidelines
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read these before registering
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-white border-l-4 border-[#E91E63] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#E91E63] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#212121] mb-3">No Profile Browsing</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    No manual browsing allowed. Our AI shows you compatible matches automatically. This ensures quality over quantity.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white border-l-4 border-[#7986CB] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#7986CB] rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#212121] mb-3">Mandatory Verification</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Upload Aadhaar and PAN to verify your identity. This is required to build a trustworthy community.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white border-l-4 border-[#E91E63] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#E91E63] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#212121] mb-3">Freemium Model</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Free users see blurred photos and basic info only. Upgrade to Premium to view full profiles and connect.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white border-l-4 border-[#7986CB] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#7986CB] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#212121] mb-3">Fixed Meeting Venues</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Meet your matches at our safe, designated venues only. This ensures a comfortable first meeting.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white border-l-4 border-[#E91E63] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#E91E63] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#212121] mb-3">Mutual Matching Only</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Matches appear only when both profiles fit each other's criteria. This ensures 100% mutual compatibility.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white border-l-4 border-[#7986CB] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#7986CB] rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#212121] mb-3">9-Step Registration</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Complete our 9-step form to help our AI find better matches. More details mean better results.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}