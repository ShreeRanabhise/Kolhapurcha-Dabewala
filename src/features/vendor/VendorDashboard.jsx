import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Users, TrendingUp, DollarSign, Star } from 'lucide-react';

const VendorDashboard = () => {
  const { currentUser } = useAuth();
  
  // Mock data for vendor dashboard
  const metrics = {
    revenue: 45000,
    activeSubscribers: 24,
    rating: 4.8,
    growth: 12
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-maroon">Vendor Portal</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-1">Monthly Revenue</p>
            <h3 className="text-2xl font-bold">₹{metrics.revenue}</h3>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <DollarSign className="text-green-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-1">Active Subscribers</p>
            <h3 className="text-2xl font-bold">{metrics.activeSubscribers}</h3>
          </div>
          <div className="bg-orange-light p-3 rounded-full">
            <Users className="text-orange" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-1">Growth</p>
            <h3 className="text-2xl font-bold">+{metrics.growth}%</h3>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <TrendingUp className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-1">Rating</p>
            <h3 className="text-2xl font-bold">{metrics.rating}</h3>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <Star className="text-yellow-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold">Today's Deliveries</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-center py-8">Manage your subscribers and view daily delivery schedules here.</p>
        </div>
      </div>
      
    </div>
  );
};

export default VendorDashboard;
