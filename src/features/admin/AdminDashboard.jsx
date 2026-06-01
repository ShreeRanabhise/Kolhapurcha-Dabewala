import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ShieldCheck, Activity, Users, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  
  // Mock data for admin dashboard
  const metrics = {
    totalRevenue: 2450000,
    activeVendors: 54,
    activeCustomers: 1240,
    platformGrowth: 15
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-maroon flex items-center gap-3">
        <ShieldCheck className="text-maroon" size={32} />
        Admin Control Panel
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
            <h3 className="text-2xl font-bold">₹{metrics.totalRevenue.toLocaleString()}</h3>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <DollarSign className="text-green-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-1">Active Vendors</p>
            <h3 className="text-2xl font-bold">{metrics.activeVendors}</h3>
          </div>
          <div className="bg-orange-light p-3 rounded-full">
            <Activity className="text-orange" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-1">Active Customers</p>
            <h3 className="text-2xl font-bold">{metrics.activeCustomers}</h3>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Users className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-1">Platform Growth</p>
            <h3 className="text-2xl font-bold">+{metrics.platformGrowth}%</h3>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Activity className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold">Pending Vendor Approvals</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-500 text-center py-8">No pending KYC approvals at the moment.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Support Tickets</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-500 text-center py-8">All support tickets have been resolved.</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AdminDashboard;
