import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { useAppContext } from '../context';
import { Star, Heart, ThumbsUp, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function FeedbackScreen() {
  const navigate = useNavigate();
  const { currentOrder } = useAppContext();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error('Please select a rating', {
        description: 'We value your feedback',
      });
      return;
    }

    // Mock feedback submission
    toast.success('Thank you for your valuable feedback! 🙏', {
      description: 'Your review helps us serve better',
    });
    navigate('/dashboard');
  };

  const ratingLabels = [
    { stars: 1, label: 'Poor 😞', emoji: '😞' },
    { stars: 2, label: 'Fair 😐', emoji: '😐' },
    { stars: 3, label: 'Good 🙂', emoji: '🙂' },
    { stars: 4, label: 'Very Good 😊', emoji: '😊' },
    { stars: 5, label: 'Excellent 😍', emoji: '😍' },
  ];

  const currentLabel = ratingLabels.find(r => r.stars === (hoveredRating || rating));

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center bg-gradient-to-br from-[#FF9933] to-[#E67E22] p-4 rounded-3xl mb-4 shadow-xl">
          <Heart className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF9933] to-[#E67E22] bg-clip-text text-transparent mb-2">
          Rate Your Experience
        </h1>
        <p className="text-[#6B5A4D] text-lg">Help us serve you better! 🙏</p>
      </div>

      <Card className="border-[#8B6F47]/20 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-[#8B6F47]/10">
          <CardTitle className="text-2xl text-[#2C1810] flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#FF9933]" />
            How was your meal?
          </CardTitle>
          <CardDescription className="text-[#6B5A4D] text-base">
            Your feedback helps our canteen improve and serve better food
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Star Rating */}
            <div className="space-y-4">
              <label className="text-base font-semibold text-[#2C1810] block text-center">
                Rate your overall experience
              </label>
              <div className="flex justify-center gap-3 py-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-all hover:scale-125 focus:outline-none active:scale-110"
                  >
                    <Star
                      className={`h-14 w-14 transition-all ${
                        star <= (hoveredRating || rating)
                          ? 'fill-[#FF9933] text-[#FF9933] drop-shadow-lg'
                          : 'text-gray-300 hover:text-[#FF9933]/50'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {currentLabel && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-3 rounded-full border border-[#FF9933]/30">
                    <span className="text-3xl">{currentLabel.emoji}</span>
                    <span className="text-lg font-bold text-[#2C1810]">{currentLabel.label}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Order Details */}
            {currentOrder && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-2xl border border-[#138808]/20">
                <p className="text-sm font-semibold text-[#138808] mb-3 flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  Order Summary
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B5A4D]">Token Number:</span>
                    <span className="font-bold text-[#2C1810]">{currentOrder.tokenNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B5A4D]">Items:</span>
                    <span className="font-medium text-[#2C1810]">
                      {currentOrder.items.map((item) => item.menuItem.name).join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B5A4D]">Total Amount:</span>
                    <span className="font-bold text-[#FF9933]">₹{currentOrder.totalPrice}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Feedback Tags */}
            <div className="space-y-3">
              <label className="text-base font-semibold text-[#2C1810] block">
                Quick Feedback Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  '🔥 Amazing Taste',
                  '✨ Fresh Food',
                  '⚡ Quick Service',
                  '👍 Good Portion',
                  '🧼 Clean & Hygienic',
                  '😊 Friendly Staff',
                  '💰 Value for Money',
                  '🌶️ Perfect Spices',
                ].map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const cleanTag = tag.replace(/[^\w\s]/g, '').trim();
                      setComment((prev) => (prev ? `${prev}, ${cleanTag}` : cleanTag));
                    }}
                    className="border-[#8B6F47]/30 hover:bg-[#FF9933] hover:text-white hover:border-[#FF9933] transition-all"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-3">
              <label htmlFor="comment" className="text-base font-semibold text-[#2C1810] block">
                Share Your Experience (Optional)
              </label>
              <Textarea
                id="comment"
                placeholder="Tell us what you loved or what we can improve..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={6}
                className="resize-none border-[#8B6F47]/30 focus:border-[#FF9933] bg-white text-[#2C1810] placeholder:text-[#8B6F47]"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#FF9933] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D86C1A] text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Submit Feedback
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/dashboard')} 
                className="flex-1 border-[#8B6F47]/30 text-[#2C1810] hover:bg-[#F5E6D3]/50 py-6"
              >
                Skip for Now
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50 shadow-lg">
        <CardContent className="py-5">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm text-blue-900">
              <strong>Your privacy matters:</strong> All feedback is anonymous and helps us maintain quality standards
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center py-6 mt-4">
        <p className="text-sm font-semibold text-[#8B6F47]">
          Created by S.SAHITYA,24501A05M1,CSE-4
        </p>
      </div>
    </div>
  );
}
