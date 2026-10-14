"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { apiClient } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
  hasRole: () => false,
  hasPermission: () => false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }
    const checkAuth = async () => {
      try {
        const res = await apiClient.get('/me');
        setUser(res.data);
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [pathname, router]);

  const logout = async () => {
    try {
      await apiClient.post('/logout');
      setUser(null);
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const hasRole = (role: string) => user?.roles?.includes(role) ?? false;
  const hasPermission = (permission: string) => user?.permissions?.includes(permission) ?? false;

  return (
    <AuthContext.Provider value={{ user, loading, logout, hasRole, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}
