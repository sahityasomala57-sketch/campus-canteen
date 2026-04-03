import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useAppContext } from '../context';
import { BASE_URL } from '../api';
import { Search, ShoppingCart, CheckCircle, XCircle, Coffee, UtensilsCrossed } from 'lucide-react';
import { toast } from 'sonner';

export default function MenuScreen() {
  const { addToCart, user } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
        toast.error('Failed to fetch menu');
      }
    };
    fetchMenu();
  }, []);

  const categories = [
    { value: 'all', label: 'All Items', icon: UtensilsCrossed },
    { value: 'breakfast', label: 'Breakfast', icon: Coffee },
    { value: 'lunch', label: 'Lunch', icon: UtensilsCrossed },
    { value: 'snacks', label: 'Snacks', icon: Coffee },
    { value: 'drinks', label: 'Beverages', icon: Coffee },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory || item.category?.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = async (item: any) => {
    if (!item.available) {
      toast.error('This item is currently out of stock', {
        description: 'Please check back later',
      });
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
      toast.success(`${item.name} added! 🎉`, {
        description: `₹${item.price} added to your cart`,
      });
    } catch (err) {
      toast.error('Failed to add to cart via API');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933]/10 to-[#138808]/10 rounded-3xl blur-3xl"></div>
        <div className="relative">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF9933] to-[#E67E22] bg-clip-text text-transparent mb-2">
            Our Menu
          </h1>
          <p className="text-[#6B5A4D] text-lg">Discover authentic Indian flavors</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8B6F47]" />
        <Input
          type="text"
          placeholder="Search for dosa, biryani, samosa..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 py-6 text-lg border-[#8B6F47]/30 focus:border-[#FF9933] bg-white shadow-lg rounded-2xl"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.value)}
              className={
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-[#FF9933] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D86C1A] text-white shadow-lg whitespace-nowrap'
                  : 'border-[#8B6F47]/30 text-[#2C1810] hover:bg-[#F5E6D3]/50 whitespace-nowrap'
              }
            >
              <Icon className="h-4 w-4 mr-2" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-[#8B6F47]/20 bg-white">
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Badge
                className={`absolute top-3 right-3 shadow-lg ${
                  item.available
                    ? 'bg-[#138808] hover:bg-[#0F6806] text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {item.available ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Available
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3 mr-1" />
                    Out of Stock
                  </>
                )}
              </Badge>
              {!item.available && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="text-white font-bold text-lg bg-red-600 px-4 py-2 rounded-full">
                    Unavailable
                  </span>
                </div>
              )}
            </div>
            <CardContent className="p-5">
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-xl text-[#2C1810] mb-1">{item.name}</h3>
                  <p className="text-sm text-[#6B5A4D] line-clamp-2 leading-relaxed">{item.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#FF9933]">₹{item.price}</span>
                    <span className="text-xs text-[#6B5A4D]">only</span>
                  </div>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.available}
                    size="lg"
                    className="bg-gradient-to-r from-[#FF9933] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D86C1A] disabled:from-gray-400 disabled:to-gray-500 text-white shadow-lg hover:shadow-xl transition-all disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-12 border border-[#8B6F47]/20">
            <UtensilsCrossed className="h-16 w-16 text-[#8B6F47] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#2C1810] mb-2">No items found</h3>
            <p className="text-[#6B5A4D]">Try searching for something else or browse all items</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-6 bg-gradient-to-r from-[#FF9933] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D86C1A] text-white"
            >
              View All Items
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
