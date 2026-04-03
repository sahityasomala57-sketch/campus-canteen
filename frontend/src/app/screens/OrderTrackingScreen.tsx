import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { useAppContext } from '../context';
import { CheckCircle, Clock, Package, Receipt, MapPin, Phone } from 'lucide-react';

export default function OrderTrackingScreen() {
  const navigate = useNavigate();
  const { currentOrder, setCurrentOrder } = useAppContext();
  const [progress, setProgress] = useState(33);

  useEffect(() => {
    if (!currentOrder) {
      return;
    }

    // Simulate order status progression
    const timer1 = setTimeout(() => {
      if (currentOrder.status === 'preparing') {
        setProgress(66);
        setCurrentOrder({ ...currentOrder, status: 'ready' });
      }
    }, 8000);

    const timer2 = setTimeout(() => {
      if (currentOrder.status === 'ready') {
        setProgress(100);
      }
    }, 16000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [currentOrder, setCurrentOrder]);

  useEffect(() => {
    if (currentOrder?.status === 'preparing') {
      setProgress(33);
    } else if (currentOrder?.status === 'ready') {
      setProgress(66);
    } else if (currentOrder?.status === 'collected') {
      setProgress(100);
    }
  }, [currentOrder?.status]);

  if (!currentOrder) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF9933] to-[#E67E22] bg-clip-text text-transparent mb-2">
            Order Tracking
          </h1>
          <p className="text-[#6B5A4D] text-lg">Track your order in real-time</p>
        </div>
        <Card className="border-[#8B6F47]/20 shadow-xl">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-full mb-6">
              <Package className="h-20 w-20 text-[#FF9933]" />
            </div>
            <h3 className="text-2xl font-bold text-[#2C1810] mb-3">No active orders</h3>
            <p className="text-[#6B5A4D] mb-8 text-center">Place an order to track it here</p>
            <Button
              onClick={() => navigate('/menu')}
              className="bg-gradient-to-r from-[#FF9933] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D86C1A] text-white text-lg px-8 py-6"
            >
              Browse Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'preparing':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-1">Preparing</Badge>;
      case 'ready':
        return <Badge className="bg-[#138808] hover:bg-[#0F6806] text-white text-sm px-4 py-1 animate-pulse">Ready for Pickup</Badge>;
      case 'collected':
        return <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1">Collected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF9933] to-[#E67E22] bg-clip-text text-transparent mb-2">
          Order Status
        </h1>
        <p className="text-[#6B5A4D]">Campus Canteen</p>
      </div>

      {/* Token Number Card */}
      <Card className="border-none shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#FF9933] via-[#E67E22] to-[#FF9933] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
          <div className="relative z-10 text-white text-center">
            <p className="text-sm opacity-90 mb-3 uppercase tracking-wider">Your Token Number</p>
            <h2 className="text-6xl font-bold mb-6 tracking-wider">{currentOrder.tokenNumber}</h2>
            <div className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 inline-flex">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Est. Time: {currentOrder.estimatedTime} mins</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Order Status */}
      <Card className="border-[#8B6F47]/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-[#2C1810]">Order Journey</CardTitle>
            {getStatusBadge(currentOrder.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Progress Bar */}
          <div className="space-y-3">
            <Progress value={progress} className="h-3 bg-[#F5E6D3]" />
          </div>

          {/* Status Steps */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div
                className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                  progress >= 33
                    ? 'bg-gradient-to-br from-[#FF9933] to-[#E67E22] text-white shadow-xl scale-110'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Receipt className="h-8 w-8" />
              </div>
              <p className="text-sm font-bold text-[#2C1810]">Order Placed</p>
              <p className="text-xs text-[#6B5A4D] mt-1">Confirmed ✓</p>
            </div>

            <div className="text-center">
              <div
                className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                  progress >= 66
                    ? 'bg-gradient-to-br from-[#FF9933] to-[#E67E22] text-white shadow-xl scale-110'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Clock className="h-8 w-8" />
              </div>
              <p className="text-sm font-bold text-[#2C1810]">Preparing</p>
              <p className="text-xs text-[#6B5A4D] mt-1">
                {progress >= 66 ? 'Complete ✓' : 'In Progress...'}
              </p>
            </div>

            <div className="text-center">
              <div
                className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                  progress >= 100
                    ? 'bg-gradient-to-br from-[#138808] to-[#0F6806] text-white shadow-xl scale-110'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <CheckCircle className="h-8 w-8" />
              </div>
              <p className="text-sm font-bold text-[#2C1810]">Ready</p>
              <p className="text-xs text-[#6B5A4D] mt-1">
                {progress >= 100 ? 'Pick up now! ✓' : 'Waiting...'}
              </p>
            </div>
          </div>

          {/* Status Message */}
          <div className={`p-6 rounded-2xl text-center ${
            currentOrder.status === 'ready' 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-[#138808]/30' 
              : 'bg-gradient-to-r from-orange-50 to-amber-50 border border-[#FF9933]/30'
          }`}>
            {currentOrder.status === 'preparing' && (
              <>
                <p className="text-lg font-bold text-[#2C1810] mb-2">
                  Your order is being prepared! 👨‍����
                </p>
                <p className="text-sm text-[#6B5A4D]">
                  Our chefs are preparing your delicious meal
                </p>
              </>
            )}
            {currentOrder.status === 'ready' && (
              <>
                <p className="text-xl font-bold text-[#138808] mb-2 animate-bounce">
                  Your order is ready! 🎉
                </p>
                <p className="text-sm text-[#2C1810] font-medium">
                  Please collect from the counter
                </p>
              </>
            )}
            {currentOrder.status === 'collected' && (
              <>
                <p className="text-lg font-bold text-[#2C1810] mb-2">
                  Order collected! 🙏
                </p>
                <p className="text-sm text-[#6B5A4D]">
                  Enjoy your meal!
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Canteen Info */}
      <Card className="border-[#8B6F47]/20 shadow-lg bg-gradient-to-br from-white to-amber-50/30">
        <CardHeader>
          <CardTitle className="text-xl text-[#2C1810]">Main Canteen Kitchen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 text-[#2C1810]">
            <div className="bg-[#FF9933] p-2 rounded-lg">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">Ground Floor, Main Building</p>
              <p className="text-xs text-[#6B5A4D]">Near Library Entrance</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[#2C1810]">
            <div className="bg-[#138808] p-2 rounded-lg">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">+91 98765 43210</p>
              <p className="text-xs text-[#6B5A4D]">Contact for queries</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card className="border-[#8B6F47]/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-[#2C1810]">Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentOrder.items.map((item) => (
            <div key={item.menuItem.id} className="flex justify-between items-center py-3 border-b border-[#8B6F47]/10 last:border-0">
              <div className="flex items-center gap-4">
                <img
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  className="w-16 h-16 rounded-xl object-cover shadow-md"
                />
                <div>
                  <p className="font-semibold text-[#2C1810]">{item.menuItem.name}</p>
                  <p className="text-sm text-[#6B5A4D]">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-bold text-[#FF9933]">₹{item.menuItem.price * item.quantity}</span>
            </div>
          ))}
          <div className="pt-4 flex justify-between items-center border-t-2 border-dashed border-[#8B6F47]/30">
            <span className="font-bold text-xl text-[#2C1810]">Total Paid</span>
            <span className="text-2xl font-bold text-[#FF9933]">₹{currentOrder.totalPrice}</span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        {currentOrder.status === 'ready' && (
          <Button
            onClick={() => navigate('/feedback')}
            className="flex-1 bg-gradient-to-r from-[#138808] to-[#0F6806] hover:from-[#0F6806] hover:to-[#0D5705] text-white py-6 text-lg"
          >
            Rate Your Experience
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')} 
          className="flex-1 border-[#8B6F47]/30 text-[#2C1810] hover:bg-[#F5E6D3]/50 py-6"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
