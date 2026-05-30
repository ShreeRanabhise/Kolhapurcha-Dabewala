import React, { createContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch role from Firestore
  const fetchUserRole = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUserRole(userData.role);
        return userData.role;
      } else {
        // If user document doesn't exist, they are likely a new Google Signup
        return null;
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
  };

  // Email/Password Signup
  async function signup(email, password, role = 'customer', name = '', phone = '') {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      role: role,
      name: name,
      phone: phone,
      createdAt: new Date().toISOString()
    });

    setUserRole(role);
    return userCredential;
  }

  // Email/Password Login
  async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await fetchUserRole(userCredential.user.uid);
    return userCredential;
  }

  // Google Login
  async function loginWithGoogle(role = 'customer') {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    const existingRole = await fetchUserRole(user.uid);
    if (!existingRole) {
      // First time Google login
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        role: role,
        name: user.displayName || '',
        createdAt: new Date().toISOString()
      });
      setUserRole(role);
    }
    
    return userCredential;
  }

  // Logout
  function logout() {
    setUserRole(null);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserRole(user.uid);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
