import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAppContext } from '../context';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  LayoutDashboard,
  Menu,
  ShoppingCart,
  Package,
  Star,
  LogOut,
  UtensilsCrossed,
  Shield,
} from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, cart } = useAppContext();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const studentNavItems = [
    { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { path: '/menu', label: 'Menu', icon: Menu },
    { path: '/cart', label: 'Cart', icon: ShoppingCart, badge: cart.length },
    { path: '/order-tracking', label: 'Orders', icon: Package },
    { path: '/feedback', label: 'Feedback', icon: Star },
  ];

  const adminNavItems = [
    { path: '/admin', label: 'Admin Panel', icon: Shield },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/menu', label: 'Menu', icon: Menu },
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : studentNavItems;

  return (
    <div className="bg-white border-b border-[#8B6F47]/20 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/dashboard')}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933] to-[#E67E22] rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-[#FF9933] to-[#E67E22] p-2 rounded-xl">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-[#FF9933] to-[#E67E22] bg-clip-text text-transparent">
                Campus Canteen
              </h1>
              {user && (
                <p className="text-xs text-[#6B5A4D]">
                  {user.role === 'admin' ? '🛡️ Admin' : `👋 ${user.name.split(' ')[0]}`}
                </p>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? 'default' : 'ghost'}
                    className={
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-[#FF9933] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D86C1A] text-white shadow-md'
                        : 'text-[#2C1810] hover:bg-[#F5E6D3]/50'
                    }
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                    {item.badge !== undefined && item.badge > 0 && (
                      <Badge className="ml-2 bg-[#138808] hover:bg-[#0F6806] text-white font-bold">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-[#2C1810] hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {user?.role !== 'admin' && cart.length > 0 && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/cart')} 
                className="relative hover:bg-[#F5E6D3]/50"
              >
                <ShoppingCart className="h-5 w-5 text-[#2C1810]" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#FF9933] hover:bg-[#E67E22] text-white font-bold">
                  {cart.length}
                </Badge>
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex overflow-x-auto gap-2 pb-3 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? 'default' : 'outline'}
                  size="sm"
                  className={
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-[#FF9933] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D86C1A] text-white shadow-md whitespace-nowrap'
                      : 'border-[#8B6F47]/30 text-[#2C1810] hover:bg-[#F5E6D3]/50 whitespace-nowrap'
                  }
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {item.label}
                  {item.badge !== undefined && item.badge > 0 && (
                    <Badge className="ml-1 bg-[#138808] hover:bg-[#0F6806] h-4 min-w-4 text-xs text-white font-bold">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
