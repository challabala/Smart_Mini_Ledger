import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/auth';

interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: { token: string; user: User }) => void;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (userData: { token: string; user: User }) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    setUser(userData.user);
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } catch (e) {
      console.error('Logout error', e);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setIsLoading(false);
    }
  };

  const refetchUser = async () => {
    try {
      const response = await authApi.getMe();
      if (response.success && response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = localStorage.getItem('token');
      const cachedUser = localStorage.getItem('user');

      if (token) {
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
          setIsLoading(false);
          // Refetch in background to make sure user details are valid and in sync
          refetchUser();
        } else {
          await refetchUser();
        }
      } else {
        setIsLoading(false);
      }
    };

    bootstrapAuth();

    // Listen for axios 401 interceptor trigger
    const handleUnauthorized = () => {
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    // Listen for manual logins to sync state in tabs/routes
    window.addEventListener('auth:login', bootstrapAuth);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
      window.removeEventListener('auth:login', bootstrapAuth);
    };
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refetchUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
