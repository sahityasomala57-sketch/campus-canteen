import React from 'react';
import { Outlet } from 'react-router';
import Navigation from './Navigation';
import { Toaster } from '../components/ui/sonner';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
