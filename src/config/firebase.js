import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBbdkiA-h_IpQIuFgnNxp91j6IWpAvv4S0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kolhapurchadabewala.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kolhapurchadabewala",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kolhapurchadabewala.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "296255824197",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:296255824197:web:8fb1b81e2835774b29de2c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-V8E7YX63B7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore instances for use in the app
export const auth = getAuth(app);
export const db = getFirestore(app);
