export interface MenuItem {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'snacks' | 'drinks';
  price: number;
  image: string;
  available: boolean;
  description: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: 'preparing' | 'ready' | 'collected';
  tokenNumber: string;
  estimatedTime: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export interface Feedback {
  id: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
