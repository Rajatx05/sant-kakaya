import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import {
  Check,
  CreditCard,
  Shield,
  Calendar,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import { FloatingHearts } from './FloatingHearts';
import { BigHeartAnimation } from './BigHeartAnimation';
import { SideHeartsOnce } from './SideHeartsOnce';

interface MeetingPaymentPageProps {
  onNavigate: (page: string) => void;
  onPaymentSuccess: () => void;
  meetingDetails?: {
    matchName: string;
    date: string;
    time: string;
    familyCount: number;
  };
}

export default function MeetingPaymentPage({
  onNavigate,
  onPaymentSuccess,
  meetingDetails = {
    matchName: 'Priya',
    date: 'Saturday, Nov 10, 2024',
    time: '6:00 PM - 8:00 PM',
    familyCount: 3
  }
}: MeetingPaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true); // Default to true for quick testing

  const meetingFee = {
    name: 'Meeting Arrangement Fee',
    basePrice: 499,
    perPersonCharge: 100,
    totalGuests: meetingDetails.familyCount,
    get totalPrice() {
      return this.basePrice + (this.perPersonCharge * this.totalGuests);
    },
    features: [
      'Premium venue arrangement',
      'Professional ambiance',
      'Privacy guaranteed',
      'Refreshments included',
      'Dedicated support staff'
    ]
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const totalAmount = meetingFee.totalPrice;

      if (isDemoMode) {
        toast.info('Simulating payment... ⏳');
        setTimeout(() => {
          toast.success('Demo Payment successful! 🎉');
          setShowConfirmation(true);
          onPaymentSuccess();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
        return;
      }

      // 1. Create order on backend
      const res = await fetch('http://localhost:5000/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`
        })
      });

      if (!res.ok) throw new Error('Failed to create payment order');
      const order = await res.json();

      // 2. Open Razorpay Checkout
      const options = {
        key: 'rzp_test_your_dummy_key_id',
        amount: order.amount,
        currency: order.currency,
        name: 'Matrimonial App',
        description: `Meeting with ${meetingDetails.matchName}`,
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify payment on backend
          const verifyRes = await fetch('http://localhost:5000/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success('Payment successful! 🎉');
            setShowConfirmation(true);
            onPaymentSuccess();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#f43f5e'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error: any) {
      console.error('Payment Error:', error);
      toast.error('Payment failed: ' + error.message);
    }
  };

  // Confirmation Screen
  if (showConfirmation) {
    return (
      <div className="min-h-screen py-12 pb-24 md:pb-12 relative">
        {/* Floating Hearts Animation - Behind Everything */}
        <FloatingHearts count={12} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
          <Card className="p-8 md:p-12 bg-white/95 backdrop-blur border-rose-100 shadow-xl text-center relative overflow-visible">
            {/* Animation Container - Centered above heading */}
            <div className="relative mb-6" style={{ height: '96px' }}>
              {/* SideHeartsOnce - Left & Right floating hearts (z-index: 0) - Play ONCE */}
              <SideHeartsOnce />

              {/* BigHeartAnimation - Large Instagram-style heart (z-index: 1) - Pop ONCE and stay */}
              <BigHeartAnimation />
            </div>

            {/* Success Message */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-6 relative" style={{ zIndex: 2 }}>
              Congratulations!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed relative" style={{ zIndex: 2 }}>
              Your meeting has been successfully scheduled. Our team will guide you throughout the entire journey — from engagement planning all the way to your wedding.
            </p>

            {/* Meeting Details Summary */}
            <Card className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100 mb-8 relative" style={{ zIndex: 2 }}>
              <h3 className="text-lg text-gray-800 mb-4">Meeting Details</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <span className="text-gray-700">Meeting with <span className="font-semibold">{meetingDetails.matchName}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <span className="text-gray-700">{meetingDetails.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <span className="text-gray-700">{meetingDetails.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <span className="text-gray-700">Venue details will be shared 24 hours before meeting</span>
                </div>
              </div>
            </Card>

            {/* CTA Button */}
            <Button
              onClick={() => onNavigate('inbox:scheduled')}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 sm:h-14 px-8 shadow-lg text-base sm:text-lg relative"
              style={{ zIndex: 2 }}
            >
              View Scheduled Meeting
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Payment Screen
  return (
    <div className="min-h-screen py-6 md:py-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl mb-4 md:mb-6 shadow-lg">
            <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-rose-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-2 md:mb-4 px-4">
            Confirm Your Meeting
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Complete the payment to finalize your meeting arrangement
          </p>
        </div>

        {/* Payment Form */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-8 bg-white/95 backdrop-blur border-rose-100 shadow-xl overflow-hidden relative">
              {/* Demo Mode Toggle */}
              <div className="absolute top-0 right-0 p-4">
                <div className="flex items-center gap-2 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100 shadow-sm">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Demo Mode</span>
                  <button
                    type="button"
                    onClick={() => setIsDemoMode(!isDemoMode)}
                    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isDemoMode ? 'bg-rose-500' : 'bg-gray-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isDemoMode ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl text-gray-800 mb-6">Payment Details</h2>

              {/* Payment Method Toggle */}
              <div className="flex gap-3 mb-8">
                <Button
                  type="button"
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('card')}
                  className={paymentMethod === 'card'
                    ? 'flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-11 sm:h-12'
                    : 'flex-1 border-rose-200 text-gray-700 hover:bg-rose-50 h-11 sm:h-12'
                  }
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Credit/Debit Card</span>
                  <span className="sm:hidden">Card</span>
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('upi')}
                  className={paymentMethod === 'upi'
                    ? 'flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-11 sm:h-12'
                    : 'flex-1 border-rose-200 text-gray-700 hover:bg-rose-50 h-11 sm:h-12'
                  }
                >
                  UPI
                </Button>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                {paymentMethod === 'card' ? (
                  <>
                    {/* Card Payment Form */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName" className="text-sm font-medium text-gray-700">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          required
                          className="mt-1.5 h-11 sm:h-12 border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                          className="mt-1.5 h-11 sm:h-12 border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry" className="text-sm font-medium text-gray-700">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                            className="mt-1.5 h-11 sm:h-12 border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-sm font-medium text-gray-700">CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            placeholder="123"
                            maxLength={4}
                            required
                            className="mt-1.5 h-11 sm:h-12 border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* UPI Payment Form */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="upiId" className="text-sm font-medium text-gray-700">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@upi"
                          required
                          className="mt-1.5 h-11 sm:h-12 border-gray-200 focus:border-rose-300 focus:ring-rose-200"
                        />
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
                        <p className="text-sm text-gray-700">
                          <strong>Note:</strong> After clicking "Pay Now", you will be redirected to your UPI app to complete the payment.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <Separator className="my-6" />

                {/* Security Badge */}
                <div className="flex items-center gap-3 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-lg p-4">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    Your payment information is secure and encrypted
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 sm:h-14 text-base sm:text-lg shadow-lg touch-manipulation"
                >
                  Pay ₹{meetingFee.totalPrice}
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/95 backdrop-blur border-rose-100 shadow-xl sticky top-24">
              <h3 className="text-lg sm:text-xl text-gray-800 mb-6">Meeting Summary</h3>

              {/* Meeting Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Meeting with</p>
                    <p className="text-gray-800 font-semibold">{meetingDetails.matchName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-gray-800">{meetingDetails.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="text-gray-800">{meetingDetails.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Total Guests</p>
                    <p className="text-gray-800">{meetingDetails.familyCount} {meetingDetails.familyCount === 1 ? 'Person' : 'People'}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span className="text-sm">Base Fee</span>
                  <span className="text-sm">₹{meetingFee.basePrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="text-sm">Guest Charges ({meetingFee.totalGuests} × ₹{meetingFee.perPersonCharge})</span>
                  <span className="text-sm">₹{meetingFee.perPersonCharge * meetingFee.totalGuests}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-800 font-semibold">Total Amount</span>
                  <span className="text-2xl text-rose-600 font-bold">₹{meetingFee.totalPrice}</span>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Features */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500 mb-3">What's Included:</p>
                {meetingFee.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}