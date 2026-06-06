import React, { useState, useEffect } from 'react';
import { 
  Calendar, CreditCard, Clock, User, 
  MapPin, CheckCircle, AlertTriangle, ShieldCheck, 
  ChevronRight, FileText, Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import './UserDashboard.css';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'history', 'profile'
  
  // Data states
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!currentUser) {
      navigate('/');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // 1. Fetch active subscription
        const subQuery = query(
          collection(db, 'subscriptions'), 
          where('customerId', '==', currentUser.uid),
          where('status', '==', 'active')
        );
        const subSnapshot = await getDocs(subQuery);
        if (!subSnapshot.empty) {
          // Assume 1 active sub for now
          setActiveSubscription({ id: subSnapshot.docs[0].id, ...subSnapshot.docs[0].data() });
        }

        // 2. Fetch payments history
        const payQuery = query(
          collection(db, 'payments'),
          where('customerId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        const paySnapshot = await getDocs(payQuery);
        setPayments(paySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF8F0]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-page bg-[#FFF8F0] min-h-screen pt-24 pb-12">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-100 p-3 rounded-full text-orange-500">
                <User size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{currentUser?.displayName || 'Subscriber'}</h4>
                <p className="text-sm text-gray-500">{currentUser?.phoneNumber || currentUser?.email}</p>
              </div>
            </div>
            
            <nav className="flex flex-col gap-2">
              <button 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-maroon/10 text-maroon font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('overview')}
              >
                <Package size={18} /> Overview
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'history' ? 'bg-maroon/10 text-maroon font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('history')}
              >
                <FileText size={18} /> Billing History
              </button>
              <button 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'profile' ? 'bg-maroon/10 text-maroon font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18} /> Profile Settings
              </button>
            </nav>
          </div>
        </div>

        {/* MAIN PANEL CONTENT */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
                
                {activeSubscription ? (
                  <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10"></div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                          Active Plan
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900">{activeSubscription.planName}</h3>
                        <p className="text-gray-500 mt-1">Provider: <span className="font-semibold text-gray-800">{activeSubscription.vendorName || "Verified Mess"}</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Meals Remaining</p>
                        <p className="text-4xl font-black text-maroon">{activeSubscription.mealsRemaining}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Started On</p>
                        <p className="font-semibold">{new Date(activeSubscription.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Expires On</p>
                        <p className="font-semibold">{new Date(activeSubscription.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <button className="flex-1 bg-maroon text-white py-3 rounded-xl font-semibold shadow-md shadow-maroon/20 hover:shadow-lg transition-shadow">
                        Track Today's Delivery
                      </button>
                      <button className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                        Pause Meal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package size={32} className="text-orange-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Active Subscription</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">You don't have an active meal plan right now. Browse our verified mess partners to subscribe.</p>
                    <button 
                      onClick={() => navigate('/find-mess')}
                      className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-orange-600 transition-colors"
                    >
                      Browse Messes
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: BILLING HISTORY */}
            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing History</h2>
                
                {payments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No payment history found.</p>
                ) : (
                  <div className="space-y-4">
                    {payments.map(payment => (
                      <div key={payment.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full ${payment.status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                            <CreditCard size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">Subscription Payment</h4>
                            <p className="text-sm text-gray-500">
                              {payment.createdAt?.toDate ? payment.createdAt.toDate().toLocaleDateString() : 'Recent'} 
                              • {payment.razorpayOrderId || 'Simulated Order'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">₹{payment.amount}</p>
                          <span className={`text-xs font-bold uppercase tracking-wider ${payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 3: PROFILE */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
                <div className="space-y-6 max-w-lg">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon/20" value={currentUser?.displayName || ''} readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Phone / Email</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon/20" value={currentUser?.email || currentUser?.phoneNumber || ''} readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Delivery Address</label>
                    <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon/20" rows="3" placeholder="Enter your full delivery address"></textarea>
                  </div>
                  <button className="bg-maroon text-white px-6 py-3 rounded-xl font-semibold shadow-md">
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
