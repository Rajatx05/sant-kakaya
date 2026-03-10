import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ContactPageProps {
  onGoBack: () => void;
}

export default function ContactPage({ onGoBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['support@perfectmatch.com', 'info@perfectmatch.com'],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 1800-123-4567', 'Mon-Sat: 9 AM - 8 PM'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Wedding Street', 'Mumbai, Maharashtra 400001'],
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Saturday', '9:00 AM - 8:00 PM'],
      color: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-gray-800 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all border-rose-100">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl mb-4 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg text-gray-800 mb-3">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">
                    {detail}
                  </p>
                ))}
              </Card>
            );
          })}
        </div>

        {/* Contact Form & Map */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8 md:p-10 bg-white/95 backdrop-blur border-rose-100 shadow-xl">
            <h2 className="text-2xl text-gray-800 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-gray-700">Your Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="h-12 border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-gray-700">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="h-12 border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 1234567890"
                  className="h-12 border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="subject" className="text-gray-700">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="h-12 border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="text-gray-700">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={5}
                  className="resize-none border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-14 shadow-lg"
              >
                Send Message
                <Send className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </Card>

          {/* Map & Additional Info */}
          <div className="space-y-8">
            {/* Map Placeholder */}
            <Card className="overflow-hidden border-rose-100 shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-rose-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">Mumbai, Maharashtra</p>
                </div>
              </div>
            </Card>

            {/* FAQ */}
            <Card className="p-8 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100 shadow-lg">
              <h3 className="text-xl text-gray-800 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-800 mb-1">How do I register?</p>
                  <p className="text-sm text-gray-600">Click on "Join Now" and fill out the registration form with your details.</p>
                </div>
                <div>
                  <p className="text-gray-800 mb-1">Is my data secure?</p>
                  <p className="text-sm text-gray-600">Yes, we use industry-standard encryption to protect all your personal information.</p>
                </div>
                <div>
                  <p className="text-gray-800 mb-1">How can I verify my profile?</p>
                  <p className="text-sm text-gray-600">Submit your ID proof through your profile settings for verification.</p>
                </div>
                <div>
                  <p className="text-gray-800 mb-1">What if I need help?</p>
                  <p className="text-sm text-gray-600">Our support team is available Mon-Sat, 9 AM - 8 PM to assist you.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Help */}
        <Card className="mt-8 p-8 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-center shadow-xl">
          <h3 className="text-2xl mb-4">Need Immediate Assistance?</h3>
          <p className="mb-6 text-rose-100">Our customer support team is ready to help you</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-rose-600 hover:bg-rose-50">
              <Phone className="w-5 h-5 mr-2" />
              Call Now: 1800-123-4567
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Mail className="w-5 h-5 mr-2" />
              Email Support
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
