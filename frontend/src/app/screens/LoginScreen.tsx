import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAppContext } from '../context';
import { UtensilsCrossed, Mail, Phone } from 'lucide-react';
import { BASE_URL } from '../api';
import { toast } from 'sonner';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginEmail, password: loginPassword })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      
      setUser({
        id: loginEmail,
        name: data.username,
        email: loginEmail,
        role: loginEmail === 'admin@campus.edu' ? 'admin' : 'student',
      });
      navigate(loginEmail === 'admin@campus.edu' ? '/admin' : '/dashboard');
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: signupEmail, password: signupPassword })
      });
      if (!res.ok) throw new Error('Signup Failed');
      const data = await res.json();
      
      setUser({
        id: signupEmail,
        name: signupName,
        email: signupEmail,
        role: 'student',
      });
      navigate('/dashboard');
      toast.success('Account created successfully');
    } catch (err) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#FF9933]/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#138808]/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo and Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933] to-[#E67E22] rounded-2xl blur-lg opacity-50"></div>
            <div className="relative bg-gradient-to-br from-[#FF9933] to-[#E67E22] p-4 rounded-2xl shadow-xl">
              <UtensilsCrossed className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF9933] to-[#E67E22] bg-clip-text text-transparent">
            Campus Canteen
          </h1>
          <p className="text-[#6B5A4D] text-center mt-2 font-medium">
            Authentic Indian flavors, just a tap away! 🍛
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur">
            <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF9933] data-[state=active]:to-[#E67E22] data-[state=active]:text-white">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF9933] data-[state=active]:to-[#E67E22] data-[state=active]:text-white">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="shadow-2xl border-[#8B6F47]/20">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-[#2C1810]">Welcome Back</CardTitle>
                <CardDescription className="text-[#6B5A4D]">
                  Log in to track your orders and cravings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-[#2C1810]">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B6F47]" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="student@campus.edu"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        className="pl-10 border-[#8B6F47]/20 focus:border-[#FF9933] bg-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-[#2C1810]">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="border-[#8B6F47]/20 focus:border-[#FF9933] bg-white"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#FF9933] to-[#E67E22] hover:from-[#E67E22] hover:to-[#D86C1A] text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Login
                  </Button>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-[#8B6F47]/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-[#6B5A4D]">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button type="button" variant="outline" className="border-[#8B6F47]/20 hover:bg-[#F5E6D3]/30">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </Button>
                    <Button type="button" variant="outline" className="border-[#8B6F47]/20 hover:bg-[#F5E6D3]/30">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>

                  <p className="text-xs text-[#6B5A4D] text-center mt-4 bg-[#F5E6D3]/50 p-3 rounded-lg">
                    <strong>Demo:</strong> Use admin@campus.edu / admin for admin access
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="shadow-2xl border-[#8B6F47]/20">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-[#2C1810]">Create Account</CardTitle>
                <CardDescription className="text-[#6B5A4D]">
                  Join us and enjoy delicious meals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-[#2C1810]">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Rahul Kumar"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      className="border-[#8B6F47]/20 focus:border-[#FF9933] bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-[#2C1810]">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B6F47]" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="student@campus.edu"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                        className="pl-10 border-[#8B6F47]/20 focus:border-[#FF9933] bg-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-[#2C1810]">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      className="border-[#8B6F47]/20 focus:border-[#FF9933] bg-white"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#138808] to-[#0F6806] hover:from-[#0F6806] hover:to-[#0D5705] text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Create Account
                  </Button>
                  
                  <p className="text-xs text-[#6B5A4D] text-center mt-4">
                    By signing up, you agree to our Terms of Service & Privacy Policy
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="text-center text-[#6B5A4D] text-sm mt-6">
          Made with ❤️ for Campus Students
        </p>
      </div>
    </div>
  );
}
