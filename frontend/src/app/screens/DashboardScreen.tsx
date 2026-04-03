import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useAppContext } from '../context';
import { Bell, ChefHat, Clock, ShoppingCart, Star, TrendingUp, Sparkles } from 'lucide-react';
import { BASE_URL } from '../api';
import { toast } from 'sonner';

export default function DashboardScreen() {
  const navigate = useNavigate();
  const { user, cart, addToCart } = useAppContext();
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${BASE_URL}/menu`);
        const data = await res.json();
        const formattedData = data.map((item: any) => ({
          ...item,
          id: String(item.id),
          image: 'https://images.unsplash.com/photo-1742281257687-092746ad6021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaSUyMG1lYWx8ZW58MXx8fHwxNzc0OTY2OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          available: true,
          description: item.name
        }));
        setMenuItems(formattedData);
      } catch (err) {
        console.error('Failed to fetch menu', err);
      }
    };
    fetchMenu();
  }, []);

  const handleAddToCart = async (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.available) {
      toast.error('This item is currently out of stock');
      return;
    }
    try {
      const username = user?.email || 'guest';
      await fetch(`${BASE_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, itemId: Number(item.id), quantity: 1 })
      });
      addToCart(item);
      toast.success(`${item.name} added! 🎉`);
    } catch (err) {
      toast.error('Failed to add to cart via API');
    }
  };

  const popularItems = menuItems.filter((item) => item.available).slice(0, 4);
  const todaySpecials = menuItems.filter((item) => ['Breakfast', 'Main Course', 'Mains'].includes(item.category) && item.available).slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-[#FF9933] via-[#E67E22] to-[#FF9933] rounded-3xl p-8 text-white shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium opacity-90">Campus Canteen</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Namaste, {user?.name}! 🙏</h1>
          <p className="opacity-95 text-lg">What are you craving today?</p>
        </div>
      </div>

      {/* Notifications */}
      <Card className="border-[#8B6F47]/20 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-[#FF9933] to-[#E67E22] p-2 rounded-lg">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-[#2C1810]">Today's Updates</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-[#FF9933]/20">
            <div className="bg-gradient-to-r from-[#FF9933] to-[#E67E22] p-2 rounded-full shrink-0">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#2C1810]">Special Biryani Available! 🍚</p>
              <p className="text-xs text-[#6B5A4D] mt-1">Chef's special chicken biryani - limited quantity</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200/50">
            <div className="bg-red-600 p-2 rounded-full shrink-0">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#2C1810]">Vada Pav Out of Stock</p>
              <p className="text-xs text-[#6B5A4D] mt-1">Will be available in 30 minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card 
          className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-[#8B6F47]/20 hover:scale-105 bg-gradient-to-br from-white to-orange-50/30" 
          onClick={() => navigate('/menu')}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-[#2C1810]">Browse Menu</CardTitle>
                <CardDescription className="text-[#6B5A4D]">Explore delicious items</CardDescription>
              </div>
              <div className="bg-gradient-to-br from-[#FF9933] to-[#E67E22] p-4 rounded-2xl shadow-lg">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-[#8B6F47]/20 hover:scale-105 bg-gradient-to-br from-white to-green-50/30" 
          onClick={() => navigate('/cart')}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-[#2C1810]">My Cart</CardTitle>
                <CardDescription className="text-[#6B5A4D]">{cart.length} items added</CardDescription>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#138808] to-[#0F6806] p-4 rounded-2xl shadow-lg">
                  <ShoppingCart className="h-8 w-8 text-white" />
                </div>
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-7 w-7 flex items-center justify-center p-0 bg-[#FF9933] hover:bg-[#E67E22] text-white font-bold shadow-lg">
                    {cart.length}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Today's Specials */}
      <Card className="border-[#8B6F47]/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-2 rounded-lg">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-[#2C1810]">Today's Specials</CardTitle>
                <CardDescription className="text-[#6B5A4D]">Chef's recommended dishes</CardDescription>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-[#FF9933] to-[#E67E22] text-white">Limited</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {todaySpecials.map((item) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-2xl border border-[#8B6F47]/20 hover:shadow-xl transition-all duration-300 bg-white cursor-pointer"
                onClick={() => navigate('/menu')}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute top-3 right-3 bg-[#138808] hover:bg-[#0F6806] text-white">
                    Available
                  </Badge>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg text-[#2C1810] mb-1">{item.name}</h4>
                  <p className="text-sm text-[#6B5A4D] mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#FF9933]">₹{item.price}</span>
                    <Button 
                      size="sm" 
                      onClick={(e) => handleAddToCart(item, e)}
                      className="bg-gradient-to-r from-[#FF9933] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D86C1A] text-white"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Items */}
      <Card className="border-[#8B6F47]/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-[#138808] to-[#0F6806] p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-[#2C1810]">Popular Items</CardTitle>
              <CardDescription className="text-[#6B5A4D]">Most loved by students</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {popularItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group text-center cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => navigate('/menu')}
              >
                <div className="relative mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-28 rounded-2xl object-cover shadow-md group-hover:shadow-xl transition-shadow"
                  />
                  <Badge className="absolute -top-2 -right-2 bg-[#FF9933] hover:bg-[#E67E22] text-white font-bold shadow-lg">
                    #{index + 1}
                  </Badge>
                </div>
                <h4 className="font-semibold text-sm text-[#2C1810] mb-1">{item.name}</h4>
                <p className="text-sm font-bold text-[#FF9933]">₹{item.price}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
