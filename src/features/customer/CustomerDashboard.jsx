import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserSubscriptions, getWalletBalance } from '../../services/firebaseService';
import { CreditCard, Package, Wallet, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const { currentUser } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          const subs = await getUserSubscriptions(currentUser.uid);
          setSubscriptions(subs);
          const bal = await getWalletBalance(currentUser.uid);
          setWallet(bal);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [currentUser]);

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-maroon">My Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-1">Active Subscriptions</p>
            <h3 className="text-2xl font-bold">{subscriptions.length}</h3>
          </div>
          <div className="bg-orange-light p-3 rounded-full">
            <Package className="text-orange" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-1">Wallet Balance</p>
            <h3 className="text-2xl font-bold">₹{wallet}</h3>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <Wallet className="text-green-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-1">Upcoming Deliveries</p>
            <h3 className="text-2xl font-bold">Lunch (Today)</h3>
          </div>
          <div className="bg-maroon-light p-3 rounded-full">
            <Clock className="text-maroon" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold">My Active Plans</h2>
          <Link to="/find-mess" className="btn btn-outline text-sm py-1 px-3">Find New Mess</Link>
        </div>
        
        <div className="p-6">
          {subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No active subscriptions</h3>
              <p className="text-gray-500 mb-6">You haven't subscribed to any mess service yet.</p>
              <Link to="/find-mess" className="btn btn-maroon">Browse Mess Providers</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {subscriptions.map(sub => (
                <div key={sub.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h4 className="font-bold text-lg">{sub.vendorName || "Mess Provider"}</h4>
                    <p className="text-gray-500 text-sm">{sub.planType} • Expires: {new Date(sub.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex gap-2">
                    <button className="btn btn-outline-white border-gray-300 text-gray-700 hover:bg-gray-50 text-sm py-1 px-3">Pause</button>
                    <button className="btn btn-outline text-sm py-1 px-3">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
