import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from '../firebase';

const AuthContext = createContext();

// Single Authorized Administrator for the Restaurant
export const AUTHORIZED_ADMIN_EMAIL = 'sofyaneyad77@gmail.com';
export const AUTHORIZED_ADMIN_PASSWORD = 'sofyan2005';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Purge any legacy auto-login session so fresh visits are forced to login
    localStorage.removeItem('restaurant_admin_session');
    localStorage.removeItem('restaurant_demo_user');

    // 1. Check if an authorized admin session is active in current browser tab (sessionStorage)
    const savedSession = sessionStorage.getItem('restaurant_admin_session');
    const savedAdminName = localStorage.getItem('restaurant_admin_name') || 'sofyan Eyad';

    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        parsed.email = AUTHORIZED_ADMIN_EMAIL;
        parsed.displayName = savedAdminName;
        setCurrentUser(parsed);
      } catch (e) {
        sessionStorage.removeItem('restaurant_admin_session');
        setCurrentUser(null);
      }
    } else {
      // Must log in via email & password - no auto-bypass
      setCurrentUser(null);
    }
    setLoading(false);

    // 2. Firebase Auth listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        const adminData = {
          uid: user.uid,
          email: AUTHORIZED_ADMIN_EMAIL,
          displayName: savedAdminName,
          photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=sofyan`,
          role: 'مدير المطعم والشيف التنفيذي',
          isAnonymous: false,
          provider: 'password'
        };
        setCurrentUser(adminData);
        sessionStorage.setItem('restaurant_admin_session', JSON.stringify(adminData));
      }
    });

    return unsubscribe;
  }, []);

  // Email and Password Login - Strictly for Authorized Single Admin
  const loginWithEmail = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Strict Validation: Only sofyaneyad77@gmail.com and password sofyan2005 are authorized!
    if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase() || password !== AUTHORIZED_ADMIN_PASSWORD) {
      throw new Error('بيانات الدخول غير صحيحة. يرجى استخدام بيانات المدير المعتمدة للمنشأة.');
    }

    // Connect to Firebase Auth for real authentication
    try {
      await signInWithEmailAndPassword(auth, cleanEmail, password);
    } catch (fbErr) {
      // If user doesn't exist in Firebase project yet, create it on first successful login
      if (fbErr.code === 'auth/user-not-found' || fbErr.code === 'auth/invalid-credential') {
        try {
          await createUserWithEmailAndPassword(auth, cleanEmail, password);
        } catch (createErr) {
          console.log('Firebase user provisioning status:', createErr);
        }
      }
    }

    const savedAdminName = localStorage.getItem('restaurant_admin_name') || 'sofyan Eyad';
    const adminUser = {
      uid: auth.currentUser?.uid || 'admin-sofyan-id',
      email: AUTHORIZED_ADMIN_EMAIL,
      displayName: savedAdminName,
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=sofyan`,
      role: 'مدير المطعم والشيف التنفيذي',
      provider: 'password'
    };

    setCurrentUser(adminUser);
    sessionStorage.setItem('restaurant_admin_session', JSON.stringify(adminUser));
    return adminUser;
  };

  // Update Admin Name permanently in localStorage & Firebase
  const updateAdminName = async (newName) => {
    const trimmedName = newName.trim();
    if (!trimmedName) return;

    // 1. Permanently save to localStorage so page refresh never reverts
    localStorage.setItem('restaurant_admin_name', trimmedName);

    // 2. Update reactive current user state
    setCurrentUser((prev) => {
      const updated = {
        ...(prev || {}),
        displayName: trimmedName
      };
      sessionStorage.setItem('restaurant_admin_session', JSON.stringify(updated));
      return updated;
    });

    // 3. Update in Firebase if active session
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: trimmedName
        });
      } catch (e) {
        console.error('Firebase updateProfile error', e);
      }
    }
  };

  // Logout
  const logout = async () => {
    sessionStorage.removeItem('restaurant_admin_session');
    localStorage.removeItem('restaurant_admin_session');
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    loginWithEmail,
    updateAdminName,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
