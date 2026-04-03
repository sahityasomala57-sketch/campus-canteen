import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BASE_URL } from '../api';
import { 
  TrendingUp, 
  Package, 
  Users, 
  IndianRupee, 
  Clock,
  CheckCircle,
  AlertCircle,
  ChefHat
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPanel() {
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

  // Mock data for analytics
  const stats = {
    totalOrders: 156,
    activeOrders: 12,
    revenue: 18340,
    customers: 103,
  };

  const recentOrders = [
    { id: 'CC-245', items: 3, status: 'preparing', time: '2 min ago', total: 285 },
    { id: 'CC-244', items: 2, status: 'ready', time: '5 min ago', total: 180 },
    { id: 'CC-243', items: 1, status: 'collected', time: '12 min ago', total: 120 },
    { id: 'CC-242', items: 4, status: 'preparing', time: '15 min ago', total: 395 },
  ];

  const toggleAvailability = (itemId: string) => {
    setMenuItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, available: !item.available } : item
      )
    );
    toast.success('Menu item updated successfully! ✓');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933]/10 to-[#138808]/10 rounded-3xl blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-[#FF9933] to-[#E67E22] p-3 rounded-2xl">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF9933] to-[#E67E22] bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-[#6B5A4D] text-lg">Manage canteen operations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-[#8B6F47]/20 bg-gradient-to-br from-white to-orange-50/30 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B5A4D] mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-[#2C1810]">{stats.totalOrders}</p>
                <p className="text-xs text-[#138808] mt-2 font-medium flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% today
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#FF9933] to-[#E67E22] p-4 rounded-2xl shadow-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#8B6F47]/20 bg-gradient-to-br from-white to-purple-50/30 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B5A4D] mb-1">Active Orders</p>
                <p className="text-3xl font-bold text-[#2C1810]">{stats.activeOrders}</p>
                <p className="text-xs text-[#6B5A4D] mt-2">Processing now</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-2xl shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#8B6F47]/20 bg-gradient-to-br from-white to-green-50/30 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B5A4D] mb-1">Revenue Today</p>
                <p className="text-3xl font-bold text-[#2C1810]">₹{stats.revenue}</p>
                <p className="text-xs text-[#138808] mt-2 font-medium flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% today
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#138808] to-[#0F6806] p-4 rounded-2xl shadow-lg">
                <IndianRupee className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#8B6F47]/20 bg-gradient-to-br from-white to-blue-50/30 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B5A4D] mb-1">Customers</p>
                <p className="text-3xl font-bold text-[#2C1810]">{stats.customers}</p>
                <p className="text-xs text-[#6B5A4D] mt-2">Served today</p>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList className="bg-white border border-[#8B6F47]/20 shadow-md">
          <TabsTrigger 
            value="orders"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF9933] data-[state=active]:to-[#E67E22] data-[state=active]:text-white"
          >
            Orders
          </TabsTrigger>
          <TabsTrigger 
            value="menu"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF9933] data-[state=active]:to-[#E67E22] data-[state=active]:text-white"
          >
            Menu Management
          </TabsTrigger>
          <TabsTrigger 
            value="analytics"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF9933] data-[state=active]:to-[#E67E22] data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <Card className="border-[#8B6F47]/20 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-[#8B6F47]/10">
              <CardTitle className="text-2xl text-[#2C1810]">Recent Orders</CardTitle>
              <CardDescription className="text-[#6B5A4D]">Manage and track current orders</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-5 border border-[#8B6F47]/20 rounded-2xl hover:shadow-lg transition-all bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-[#FF9933] to-[#E67E22] text-white font-bold px-5 py-3 rounded-xl shadow-md">
                        {order.id}
                      </div>
                      <div>
                        <p className="font-semibold text-[#2C1810]">{order.items} items</p>
                        <p className="text-sm text-[#6B5A4D]">{order.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-xl text-[#FF9933]">₹{order.total}</span>
                      <Badge
                        className={
                          order.status === 'preparing'
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                            : order.status === 'ready'
                            ? 'bg-[#138808] hover:bg-[#0F6806] text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }
                      >
                        {order.status}
                      </Badge>
                      {order.status === 'preparing' && (
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-[#138808] to-[#0F6806] hover:from-[#0F6806] hover:to-[#0D5705] text-white"
                        >
                          Mark Ready
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Menu Management Tab */}
        <TabsContent value="menu" className="space-y-4">
          <Card className="border-[#8B6F47]/20 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-[#8B6F47]/10">
              <CardTitle className="text-2xl text-[#2C1810]">Menu Items</CardTitle>
              <CardDescription className="text-[#6B5A4D]">Manage item availability and details</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-5 border border-[#8B6F47]/20 rounded-2xl hover:shadow-lg transition-all bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover shadow-md"
                      />
                      <div>
                        <p className="font-semibold text-lg text-[#2C1810]">{item.name}</p>
                        <p className="text-sm text-[#6B5A4D] capitalize">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-bold text-xl text-[#FF9933]">₹{item.price}</span>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={item.available}
                          onCheckedChange={() => toggleAvailability(item.id)}
                          className="data-[state=checked]:bg-[#138808]"
                        />
                        <span className="text-sm font-medium min-w-[100px]">
                          {item.available ? (
                            <span className="text-[#138808] flex items-center gap-1">
                              <CheckCircle className="h-4 w-4" />
                              Available
                            </span>
                          ) : (
                            <span className="text-red-600 flex items-center gap-1">
                              <AlertCircle className="h-4 w-4" />
                              Out of Stock
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-[#8B6F47]/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-[#8B6F47]/10">
                <CardTitle className="text-xl text-[#2C1810] flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#FF9933]" />
                  Popular Items
                </CardTitle>
                <CardDescription className="text-[#6B5A4D]">Top selling items this week</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {menuItems.slice(0, 5).map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-white to-orange-50/30 rounded-xl border border-[#8B6F47]/10">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-[#FF9933] to-[#E67E22] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-[#2C1810]">{item.name}</p>
                          <p className="text-sm text-[#6B5A4D]">₹{item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-[#138808]" />
                        <span className="text-sm font-bold text-[#2C1810]">{Math.floor(Math.random() * 50) + 20} sold</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#8B6F47]/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-[#8B6F47]/10">
                <CardTitle className="text-xl text-[#2C1810]">Performance Metrics</CardTitle>
                <CardDescription className="text-[#6B5A4D]">Today's statistics</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-[#138808]/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#138808] p-2 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-[#2C1810]">Completed Orders</span>
                  </div>
                  <span className="text-2xl font-bold text-[#138808]">144</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-500/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-[#2C1810]">Avg. Prep Time</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">12 min</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-[#2C1810]">Customer Rating</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">4.6/5</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-500/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-600 p-2 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-[#2C1810]">Cancelled Orders</span>
                  </div>
                  <span className="text-2xl font-bold text-red-600">3</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
