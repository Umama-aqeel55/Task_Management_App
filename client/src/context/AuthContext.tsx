import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, MOCK_USERS } from '@/lib/types';
import { useLocation } from 'wouter';

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Default to logged in for mockup purposes to show the UI immediately
  const [user, setUser] = useState<User | null>(MOCK_USERS['u1']); 
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const login = async (email: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser(MOCK_USERS['u1']);
      setLoading(false);
      setLocation('/');
    }, 800);
  };

  const logout = () => {
    setUser(null);
    setLocation('/login');
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
