import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { createSubscription } from '../../services/firebaseService';

const Checkout = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Mock data for checkout, in a real app this comes from route state or context
  const vendorName = "Aai's Kitchen";
  const vendorId = "vendor_123";
  const planType = "Lunch + Dinner";
  const price = 3299;
  const platformFee = Math.round(price * 0.08); // 8%
  const total = price + platformFee;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!currentUser) {
      alert("Please login first");
      navigate('/login');
      return;
    }

    setLoading(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    // In a real app, you MUST call your backend to create an order and get the orderId
    // For this mockup, we are bypassing the backend order creation for demonstration
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_HERE", 
      amount: total * 100, // Amount in paise
      currency: "INR",
      name: "Kolhapurcha Dabewala",
      description: `${planType} Subscription for ${vendorName}`,
      image: "/logo.png",
      handler: async function (response) {
        // Payment successful
        try {
          // Record subscription in Firestore
          const subId = await createSubscription({
            customerId: currentUser.uid,
            vendorId: vendorId,
            vendorName: vendorName,
            planType: planType,
            status: 'active',
            startDate: new Date().toISOString(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
            paymentRef: response.razorpay_payment_id,
            amount: total
          });
          
          alert(`Payment Successful! Subscription created: ${subId}`);
          navigate('/dashboard');
        } catch (error) {
          console.error("Failed to create subscription:", error);
          alert("Payment received but subscription creation failed. Contact support.");
        }
      },
      prefill: {
        name: currentUser.displayName || "Customer",
        email: currentUser.email || "customer@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#7A1F1F"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-maroon text-center">Complete Your Subscription</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-bold mb-6 border-b pb-4">Order Summary</h2>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-semibold text-lg">{vendorName}</h3>
            <p className="text-gray-500">{planType} (30 Days)</p>
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
          className="btn btn-maroon w-full mt-8 py-3 text-lg"
        >
          {loading ? 'Processing...' : `Pay ₹${total} Securely`}
        </button>
        
        <p className="text-center text-sm text-gray-400 mt-4 flex items-center justify-center gap-2">
          <span>Secured by Razorpay</span>
        </p>
      </div>
    </div>
  );
};

export default Checkout;
