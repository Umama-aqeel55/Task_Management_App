import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as AppUser } from '@/lib/types';
import { useLocation } from 'wouter';
import { auth, googleProvider } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';

interface AuthContextType {
  user: AppUser | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Map Firebase user to our AppUser type
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          avatar: firebaseUser.photoURL || '',
          role: 'member'
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      console.log("Starting Google Login...");
      await signInWithPopup(auth, googleProvider);
      console.log("Login successful!");
      setLocation('/dashboard');
    } catch (error: any) {
      console.error("Firebase Auth Error:", error.code, error.message);
      // Alerting the user to common errors
      if (error.code === 'auth/operation-not-allowed') {
        alert("Google Auth is not enabled in your Firebase Console. Please go to Authentication > Sign-in method and enable Google.");
      } else if (error.code === 'auth/popup-blocked') {
        alert("Popup was blocked by your browser. Please allow popups for this site.");
      } else {
        alert(`Authentication Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };


  const logout = async () => {
    try {
      await signOut(auth);
      setLocation('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
