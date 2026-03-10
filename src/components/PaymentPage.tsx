import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Check, 
  CreditCard, 
  Shield, 
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PaymentPageProps {
  onNavigate: (page: string) => void;
  onGoBack: () => void;
  onSubscribe: () => void;
  hasHistory?: boolean;
}

export default function PaymentPage({ onNavigate, onGoBack, onSubscribe, hasHistory }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');

  const premiumPlan = {
    name: 'Premium Membership',
    price: 999,
    period: 'per month',
    features: [
      'Unlimited AI-matched profiles',
      'View complete profiles',
      'Clear profile photos',
      'Access contact details',
      'Priority customer support',
      'Schedule meetings at our venues'
    ]
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    onSubscribe(); // Upgrade user to premium
    toast.success('Payment successful! Welcome to Premium! 🎉');
    setTimeout(() => onNavigate('matches'), 2000);
  };

  return (
    <div className="min-h-screen py-6 md:py-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl mb-4 md:mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-rose-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-2 md:mb-4 px-4">Complete Your Payment</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Unlock all premium features and find your perfect match faster
          </p>
        </div>

        {/* Payment Form */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white/95 backdrop-blur border-rose-100 shadow-xl">
              <h2 className="text-2xl text-gray-800 mb-6">Payment Details</h2>

              {/* Payment Method Toggle */}
              <div className="flex gap-3 mb-8">
                <Button
                  type="button"
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('card')}
                  className={paymentMethod === 'card' 
                    ? 'flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600' 
                    : 'flex-1 border-rose-200 text-gray-700 hover:bg-rose-50'
                  }
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Credit/Debit Card
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('upi')}
                  className={paymentMethod === 'upi' 
                    ? 'flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600' 
                    : 'flex-1 border-rose-200 text-gray-700 hover:bg-rose-50'
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
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          required
                          className="mt-1.5 border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                            className="mt-1.5 border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            placeholder="123"
                            maxLength={4}
                            required
                            className="mt-1.5 border-gray-200 focus:border-rose-400 focus:ring-rose-400"
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
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@upi"
                          required
                          className="mt-1.5 border-gray-200 focus:border-rose-400 focus:ring-rose-400"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 sm:h-14 text-base sm:text-lg shadow-lg touch-manipulation"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay ₹{Math.round(premiumPlan.price * 1.18).toLocaleString()}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  By completing this payment, you agree to our Terms of Service and Privacy Policy. 
                  You can cancel your subscription anytime from your account settings.
                </p>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 shadow-xl lg:sticky lg:top-24">
              <h2 className="text-xl text-gray-800 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-600" />
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-800 font-medium mb-2">{premiumPlan.name}</p>
                  <p className="text-sm text-gray-600">{premiumPlan.period}</p>
                </div>

                <div className="bg-white/80 rounded-xl p-4 space-y-2">
                  {premiumPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">₹{premiumPlan.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18% GST)</span>
                    <span className="text-gray-800">₹{Math.round(premiumPlan.price * 0.18).toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-800">Total</span>
                    <span className="text-2xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                      ₹{Math.round(premiumPlan.price * 1.18).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-700">
                    Your payment is secure and encrypted. Cancel anytime.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, text: 'Secure Payment' },
              { icon: Check, text: 'Money Back Guarantee' },
              { icon: Sparkles, text: 'Premium Features' },
              { icon: CreditCard, text: 'All Cards Accepted' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-rose-600" />
                  </div>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}