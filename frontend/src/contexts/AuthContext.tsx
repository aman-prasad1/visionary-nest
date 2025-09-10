import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '../lib/api';

interface User {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  avatar?: {
    public_url: string;
  };
  userType: string;
  bio?: string;
  isProfileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar?: File;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await apiClient.getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        } catch (error) {
          console.error('Error checking auth status:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Auto-logout on token expiration
  useEffect(() => {
    const handleTokenExpiry = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
    };

    const setupExpiryWatcher = () => {
      const token = localStorage.getItem('accessToken');
      if (!token || !user) return;

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = payload.exp * 1000;
        const currentTime = Date.now();

        if (expiryTime <= currentTime) {
          // Token is expired
          handleTokenExpiry();
          return;
        }

        // Set timeout to logout when token expires
        const timeout = expiryTime - currentTime;
        const timer = setTimeout(() => {
          handleTokenExpiry();
        }, timeout);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error parsing token:', error);
        handleTokenExpiry();
      }
    };

    const cleanup = setupExpiryWatcher();
    return () => {
      if (cleanup && typeof cleanup === 'function') cleanup();
    };
  }, [user]); // Depend on user to avoid running when not authenticated

  const login = async (emailOrUsername: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.login({ emailOrUsername, password });

      if (response.success && response.data) {
        // Store tokens
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        // Set user data
        setUser(response.data.user);
        return { success: true };
      } else {
        return { success: false, message: response.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar?: File;
  }) => {
    try {
      setIsLoading(true);
      const response = await apiClient.register(userData);

      if (response.success) {
        return { success: true, message: 'Registration successful! Please log in.' };
      } else {
        return { success: false, message: response.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'An error occurred during registration' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and state regardless of API call success
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      const response = await apiClient.updateUser(userData);

      if (response.success && response.data) {
        setUser(response.data);
        return { success: true };
      } else {
        return { success: false, message: response.error || 'Update failed' };
      }
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, message: 'An error occurred during update' };
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};