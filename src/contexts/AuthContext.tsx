import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { authService } from '../services/auth';
import { seedOnboardingData } from '../services/seedData';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  isGuest: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check for existing session
    authService.getSession().then((session) => {
      setSession(session);
      setIsGuest(session?.user?.is_anonymous ?? false);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setIsGuest(session?.user?.is_anonymous ?? false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { session } = await authService.signIn({ email, password });
    setSession(session);
    setIsGuest(false);
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const { session } = await authService.signUp({ email, password, name });
    setSession(session);
    setIsGuest(false);
  };

  const signInAsGuest = async () => {
    const { session: newSession } = await authService.signInAnonymously();
    if (newSession?.user?.id) {
      await seedOnboardingData(newSession.user.id);
    }
    setSession(newSession);
    setIsGuest(true);
  };

  const signOut = async () => {
    await authService.signOut();
    setSession(null);
    setIsGuest(false);
  };

  return (
    <AuthContext.Provider value={{ session, loading, isGuest, signIn, signUp, signInAsGuest, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
