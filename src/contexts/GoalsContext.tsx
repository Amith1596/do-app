import React, { createContext, useState, useEffect, useContext } from 'react';
import { Goal } from '../types';
import { goalsService } from '../services/goals';
import { useAuth } from './AuthContext';

interface GoalsContextType {
  goals: Goal[];
  loading: boolean;
  refreshGoals: () => Promise<void>;
  createGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export function GoalsProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  const refreshGoals = async () => {
    if (!session?.user?.id) return;

    try {
      setLoading(true);
      const data = await goalsService.getGoals(session.user.id);
      setGoals(data);
    } catch (error) {
      console.error('Error loading goals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshGoals();
  }, [session?.user?.id]);

  const createGoal = async (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!session?.user?.id) return;

    const newGoal = await goalsService.createGoal(goal, session.user.id);
    setGoals((prev) => [newGoal, ...prev]);
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    const updatedGoal = await goalsService.updateGoal(id, updates);
    setGoals((prev) => prev.map((goal) => (goal.id === id ? updatedGoal : goal)));
  };

  const deleteGoal = async (id: string) => {
    await goalsService.deleteGoal(id);
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  return (
    <GoalsContext.Provider
      value={{
        goals,
        loading,
        refreshGoals,
        createGoal,
        updateGoal,
        deleteGoal,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within GoalsProvider');
  }
  return context;
}
