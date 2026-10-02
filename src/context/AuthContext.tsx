import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { User } from '@/types';
import * as storage from '@/lib/storage';

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string, remember: boolean) => { success: boolean; error?: string };
  register: (user: User) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = storage.getSession();
    if (session) {
      const found = storage.findUser(session.email);
      if (found) setUser(found);
    }
  }, []);

  const login = useCallback((email: string, password: string, remember: boolean) => {
    const found = storage.validateLogin(email, password);
    if (!found) {
      return { success: false, error: 'Invalid email or password.' };
    }
    storage.setSession(found.email, remember);
    setUser(found);
    return { success: true };
  }, []);

  const register = useCallback((newUser: User) => {
    if (storage.findUser(newUser.email)) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    storage.saveUser(newUser);
    storage.setSession(newUser.email, true);
    setUser(newUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    storage.clearSession();
    setUser(null);
  }, []);

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
