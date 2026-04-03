import React from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAppContext } from '../context';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { BASE_URL } from '../api';

export default function CartScreen() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, placeOrder, user } = useAppContext();

  const totalPrice = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + tax;

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty', {
        description: 'Add some items to place an order',
      });
      return;
    }

    try {
      const username = user?.email || 'guest';
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      
      if (!res.ok) throw new Error('Failed to place order');
      const orderResp = await res.json();

      const order = {
        id: String(orderResp.order?.id || `ORD${Date.now()}`),
        items: cart,
        totalPrice: grandTotal,
        status: 'preparing' as const,
        tokenNumber: `CC-${Math.floor(Math.random() * 900) + 100}`,
        estimatedTime: 15 + Math.floor(Math.random() * 10),
        createdAt: new Date(),
      };

      placeOrder(order);
      toast.success('Order placed successfully! 🎉', {
        description: `Your token number is ${order.tokenNumber}`,
      });
      navigate('/order-tracking');
    } catch (err) {
      toast.error('Failed to post order to server');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF9933] to-[#E67E22] bg-clip-text text-transparent mb-2">
          Your Basket
        </h1>
        <p className="text-[#6B5A4D] text-lg">
          {cart.length} {cart.length === 1 ? 'item' : 'items'} ready to order
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <Card className="border-[#8B6F47]/20 shadow-xl">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-full mb-6">
                  <ShoppingBag className="h-20 w-20 text-[#FF9933]" />
                </div>
                <h3 className="text-2xl font-bold text-[#2C1810] mb-3">Your cart is empty</h3>
                <p className="text-[#6B5A4D] mb-8 text-center">
                  Explore our delicious menu and add your favorite items!
                </p>
                <Button
                  onClick={() => navigate('/menu')}
                  className="bg-gradient-to-r from-[#FF9933] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D86C1A] text-white shadow-lg text-lg px-8 py-6"
                >
                  Browse Menu
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            cart.map((item) => (
              <Card key={item.menuItem.id} className="border-[#8B6F47]/20 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-28 h-28 rounded-2xl object-cover shadow-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-[#2C1810] mb-1">{item.menuItem.name}</h3>
                          <p className="text-sm text-[#6B5A4D] line-clamp-2">{item.menuItem.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.menuItem.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3 bg-[#F5E6D3]/50 rounded-full p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full hover:bg-[#FF9933] hover:text-white"
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-lg font-bold text-[#2C1810] w-10 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full hover:bg-[#FF9933] hover:text-white"
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="text-xl font-bold text-[#FF9933]">
                          ₹{item.menuItem.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4 border-[#8B6F47]/20 shadow-2xl bg-gradient-to-br from-white to-orange-50/30">
            <CardHeader className="bg-gradient-to-r from-[#FF9933] to-[#E67E22] text-white rounded-t-xl">
              <CardTitle className="text-2xl">Bill Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-3">
                <div className="flex justify-between text-[#2C1810]">
                  <span className="text-[#6B5A4D]">Item Total</span>
                  <span className="font-semibold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-[#2C1810]">
                  <span className="text-[#6B5A4D]">GST (5%)</span>
                  <span className="font-semibold">₹{tax}</span>
                </div>
                <div className="border-t-2 border-dashed border-[#8B6F47]/30 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-[#2C1810]">Grand Total</span>
                    <span className="text-3xl font-bold text-[#FF9933]">
                      ₹{grandTotal}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-[#138808]/20">
                <p className="text-sm text-[#138808] font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Safe & Hygienic Food
                </p>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={cart.length === 0}
                className="w-full bg-gradient-to-r from-[#138808] to-[#0F6806] hover:from-[#0F6806] hover:to-[#0D5705] disabled:from-gray-400 disabled:to-gray-500 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all"
              >
                Place Order
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate('/menu')}
                className="w-full border-[#8B6F47]/30 text-[#2C1810] hover:bg-[#F5E6D3]/50 py-6"
              >
                Add More Items
              </Button>

              <p className="text-xs text-center text-[#6B5A4D] pt-2">
                Delivering to: <strong>Campus Canteen</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
