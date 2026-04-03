import { createBrowserRouter, Navigate } from 'react-router';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import MenuScreen from './screens/MenuScreen';
import CartScreen from './screens/CartScreen';
import OrderTrackingScreen from './screens/OrderTrackingScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import AdminPanel from './screens/AdminPanel';
import Layout from './components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginScreen />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardScreen />,
      },
      {
        path: 'menu',
        element: <MenuScreen />,
      },
      {
        path: 'cart',
        element: <CartScreen />,
      },
      {
        path: 'order-tracking',
        element: <OrderTrackingScreen />,
      },
      {
        path: 'feedback',
        element: <FeedbackScreen />,
      },
      {
        path: 'admin',
        element: <AdminPanel />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
