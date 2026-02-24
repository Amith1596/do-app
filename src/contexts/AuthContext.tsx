import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { authService } from '../services/auth';
import { seedOnboardingData } from '../services/seedData';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  isGuest: boolean;
  showWelcome: boolean;
  dismissWelcome: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  convertGuest: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check for existing session
    authService.getSession().then((session) => {
      setSession(session);
      setIsGuest(session?.user?.is_anonymous ?? false);
      setLoading(false);
    });

    // Listen for auth changes (token refresh, server-side logout, etc.)
    // Skip SIGNED_IN — we handle it explicitly in signIn/signUp/signInAsGuest
    // to avoid a race condition where onAuthStateChange fires before seed data
    // is written, triggering a premature task fetch against an empty database.
    const { data: { subscription } } = authService.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') return;
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
    const { session: newSession } = await authService.signUp({ email, password, name });
    if (newSession?.user?.id) {
      await seedOnboardingData(newSession.user.id);
    }
    setSession(newSession);
    setIsGuest(false);
    setShowWelcome(true);
  };

  const signInAsGuest = async () => {
    const { session: newSession } = await authService.signInAnonymously();
    if (newSession?.user?.id) {
      await seedOnboardingData(newSession.user.id);
    }
    setSession(newSession);
    setIsGuest(true);
    setShowWelcome(true);
  };

  const convertGuest = async (email: string, password: string, name?: string) => {
    await authService.linkEmailToGuest(email, password, name);
    setIsGuest(false);
  };

  const dismissWelcome = () => setShowWelcome(false);

  const signOut = async () => {
    await authService.signOut();
    setSession(null);
    setIsGuest(false);
  };

  return (
    <AuthContext.Provider value={{ session, loading, isGuest, showWelcome, dismissWelcome, signIn, signUp, signInAsGuest, convertGuest, signOut }}>
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
