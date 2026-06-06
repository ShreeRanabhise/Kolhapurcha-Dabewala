import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { initializeRazorpay, createSimulatedOrder, verifyPaymentAndComplete } from '../../services/paymentService';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';

const Checkout = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Data from previous screen, fallback to defaults
  const { 
    vendorName = "Aai's Kitchen", 
    vendorId = "vendor_123", 
    planName = "Monthly Combo", 
    planType = "monthly", 
    price = 3299 
  } = location.state || {};

  const platformFee = Math.round(price * 0.08); // 8%
  const total = price + platformFee;

  const handlePayment = async () => {
    if (!currentUser) {
      alert("Please login first");
      navigate('/login');
      return;
    }

    setLoading(true);
    const isReady = await initializeRazorpay();

    if (!isReady) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      // 1. Create Simulated Order & Pending Payment Log
      const paymentData = {
        customerId: currentUser.uid,
        vendorId: vendorId,
        amount: total
      };
      
      const { paymentDocId } = await createSimulatedOrder(paymentData);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_HERE", 
        amount: total * 100, // Amount in paise
        currency: "INR",
        name: "Kolhapurcha Dabewala",
        description: `${planName} Subscription for ${vendorName}`,
        image: "/logo.png",
        handler: async function (response) {
          try {
            // 2. Verify Payment
            await verifyPaymentAndComplete(paymentDocId, response);

            // 3. Create Active Subscription
            const subRef = await addDoc(collection(db, 'subscriptions'), {
              customerId: currentUser.uid,
              vendorId: vendorId,
              vendorName: vendorName,
              planName: planName,
              planType: planType,
              amount: total,
              status: 'active',
              startDate: new Date().toISOString(),
              endDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
              mealsRemaining: planType.includes('monthly') ? 60 : 14,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
            
            alert(`Payment Successful!`);
            navigate('/dashboard');
          } catch (error) {
            console.error("Failed to complete subscription:", error);
            alert("Payment received but subscription creation failed. Contact support.");
          }
        },
        prefill: {
          name: currentUser.displayName || "Customer",
          email: currentUser.email || "customer@example.com",
          contact: currentUser.phoneNumber || "9999999999"
        },
        theme: {
          color: "#7A1F1F"
        }
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on('payment.failed', function (response){
        alert("Payment Failed. Reason: " + response.error.description);
      });

      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Error initializing payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-maroon text-center">Complete Your Subscription</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-bold mb-6 border-b pb-4">Order Summary</h2>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-semibold text-lg">{vendorName}</h3>
            <p className="text-gray-500">{planName}</p>
          </div>
          <p className="font-bold">₹{price}</p>
        </div>
        
        <div className="flex justify-between items-center mb-4 text-gray-500">
          <p>Platform Fee (8%)</p>
          <p>₹{platformFee}</p>
        </div>
        
        <div className="border-t border-gray-200 my-4 pt-4 flex justify-between items-center text-lg font-bold text-maroon">
          <p>Total Amount</p>
          <p>₹{total}</p>
        </div>
        
        <button 
          onClick={handlePayment} 
          disabled={loading}
          className="btn btn-maroon w-full mt-8 py-3 text-lg rounded-xl shadow-md"
        >
          {loading ? 'Processing...' : `Pay ₹${total} Securely`}
        </button>
        
        <p className="text-center text-sm text-gray-400 mt-4 flex items-center justify-center gap-2">
          <span>🔒 Secured by Razorpay</span>
        </p>
      </div>
    </div>
  );
};

export default Checkout;
