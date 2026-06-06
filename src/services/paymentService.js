import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Dynamically loads the Razorpay checkout script
 */
export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Simulates creating a Razorpay order and logs the pending payment to Firestore.
 * NOTE: In a real production app, order creation must happen on a secure backend (Firebase Functions)
 * using the Razorpay API Key and Secret. This frontend simulation is for UI testing.
 */
export const createSimulatedOrder = async (paymentData) => {
  const simulatedOrderId = "order_" + Math.random().toString(36).substring(2, 15);
  
  // Create the pending payment record
  const paymentRef = await addDoc(collection(db, 'payments'), {
    customerId: paymentData.customerId,
    vendorId: paymentData.vendorId,
    subscriptionId: paymentData.subscriptionId || "pending",
    amount: paymentData.amount,
    currency: "INR",
    status: "pending",
    razorpayOrderId: simulatedOrderId,
    createdAt: serverTimestamp()
  });

  return { 
    orderId: simulatedOrderId, 
    paymentDocId: paymentRef.id,
    amount: paymentData.amount 
  };
};

/**
 * Updates the Firestore document with the successful payment payload
 */
export const verifyPaymentAndComplete = async (paymentDocId, razorpayResponse) => {
  const paymentRef = doc(db, 'payments', paymentDocId);
  
  // Update status to paid. 
  // In production, signature verification MUST happen on the backend.
  await updateDoc(paymentRef, {
    status: 'paid',
    razorpayPaymentId: razorpayResponse.razorpay_payment_id,
    razorpaySignature: razorpayResponse.razorpay_signature || 'simulated_signature',
    updatedAt: serverTimestamp()
  });

  return true;
};
