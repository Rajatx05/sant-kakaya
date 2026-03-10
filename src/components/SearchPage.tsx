import { Card } from './ui/card';
import { Button } from './ui/button';
import { Sparkles, Heart, Brain, Users, CheckCircle, Info } from 'lucide-react';

interface SearchPageProps {
  onNavigate: (page: string, profileId?: number) => void;
  onGoBack: () => void;
}

export default function SearchPage({ onNavigate, onGoBack }: SearchPageProps) {
  return (
    <div className="min-h-screen py-12 pb-24 md:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-rose-600" />
          </div>
          <h1 className="text-3xl md:text-4xl text-gray-800 mb-4">Automatic Matching System</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We find your perfect match automatically - no browsing needed!
          </p>
        </div>

        {/* How It Works */}
        <Card className="mb-8 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-lg">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl text-gray-800 mb-2">How Our Matching Works</h3>
              <p className="text-gray-600">
                Unlike traditional matrimonial sites, we don't let you browse random profiles. Instead, our intelligent algorithm works 24/7 to find perfect matches for you.
              </p>
            </div>
          </div>
        </Card>

        {/* Steps */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-rose-100 hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl text-gray-800 mb-2">1. You Register</h3>
                <p className="text-gray-600 text-sm">
                  Complete your profile with your details and preferences for your ideal life partner.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-rose-100 hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl text-gray-800 mb-2">2. AI Analyzes</h3>
                <p className="text-gray-600 text-sm">
                  Our algorithm compares your preferences with every profile in our database automatically.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-rose-100 hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl text-gray-800 mb-2">3. Mutual Match</h3>
                <p className="text-gray-600 text-sm">
                  When BOTH profiles match each other's criteria, a match is automatically created!
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-rose-100 hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl text-gray-800 mb-2">4. You Connect</h3>
                <p className="text-gray-600 text-sm">
                  View your matches and start connecting with people who truly meet your requirements.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Key Benefits */}
        <Card className="mb-8 p-8 bg-white border-rose-100 shadow-lg">
          <h3 className="text-2xl text-gray-800 mb-6 text-center">Why This is Better</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-gray-800 mb-1">No Time Wasted</h4>
                <p className="text-sm text-gray-600">You only see profiles that match YOUR specific criteria - no endless browsing of incompatible profiles.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-gray-800 mb-1">Guaranteed Compatibility</h4>
                <p className="text-sm text-gray-600">Every match means you meet their requirements AND they meet yours. It's a two-way perfect fit!</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-gray-800 mb-1">Privacy Protected</h4>
                <p className="text-sm text-gray-600">Your profile is only visible to people who match your preferences. No unwanted attention or contacts.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-gray-800 mb-1">Higher Success Rate</h4>
                <p className="text-sm text-gray-600">Focus on quality over quantity. Every match has a high likelihood of success.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xl text-center">
          <h3 className="text-2xl md:text-3xl mb-4">Ready to Find Your Perfect Match?</h3>
          <p className="mb-6 text-rose-100 text-lg">
            Complete your profile and let our AI do the work!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate('myprofile')}
              className="bg-white text-rose-600 hover:bg-rose-50 h-12 px-8 text-lg"
            >
              Complete Your Profile
            </Button>
            <Button
              onClick={() => onNavigate('matches')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 h-12 px-8 text-lg"
            >
              View Your Matches
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}