import { collection, getDocs, doc, getDoc, addDoc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

// Vendor (Messes) Services
export const getActiveMesses = async () => {
  try {
    const q = query(collection(db, 'vendors'), where('isApproved', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching messes:', error);
    throw error;
  }
};

export const getMessById = async (id) => {
  try {
    const docRef = doc(db, 'vendors', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching mess:', error);
    throw error;
  }
};

// Subscriptions
export const getUserSubscriptions = async (userId) => {
  try {
    const q = query(collection(db, 'subscriptions'), where('customerId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    throw error;
  }
};

export const createSubscription = async (subscriptionData) => {
  try {
    const docRef = await addDoc(collection(db, 'subscriptions'), subscriptionData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

// Wallet
export const getWalletBalance = async (userId) => {
  try {
    const docRef = doc(db, 'wallets', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().balance;
    }
    return 0; // Default to 0 if wallet doesn't exist
  } catch (error) {
    console.error('Error fetching wallet:', error);
    throw error;
  }
};
