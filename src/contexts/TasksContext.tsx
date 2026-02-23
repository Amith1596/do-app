import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { Task } from '../types';
import { tasksService } from '../services/tasks';
import { useAuth } from './AuthContext';
import { getCelebrationMessage, triggerHaptic } from '../utils/celebrations';
import { useGoals } from './GoalsContext';

interface TasksContextType {
  tasks: Task[];
  loading: boolean;
  refreshTasks: () => Promise<void>;
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  celebrationMessage: string | null;
  clearCelebration: () => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);
  const { session } = useAuth();
  const { goals } = useGoals();

  const refreshTasks = async () => {
    if (!session?.user?.id) return;

    try {
      setLoading(true);
      const data = await tasksService.getTasks(session.user.id);
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, [session?.user?.id]);

  const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!session?.user?.id) return;

    const newTask = await tasksService.createTask(task, session.user.id);
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const updatedTask = await tasksService.updateTask(id, updates);
    setTasks((prev) => prev.map((task) => (task.id === id ? updatedTask : task)));
  };

  const deleteTask = async (id: string) => {
    await tasksService.deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const willComplete = !task.completed;
    const updatedTask = await tasksService.toggleTask(id, willComplete);
    setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));

    if (willComplete) {
      // Build goal progress info for celebration message
      let goalProgress: { name: string; completed: number; total: number } | undefined;
      if (task.goalId) {
        const goal = goals.find((g) => g.id === task.goalId);
        if (goal) {
          // Count tasks for this goal (including the one just completed)
          const goalTasks = tasks.filter((t) => t.goalId === task.goalId);
          const completedCount = goalTasks.filter((t) => t.completed || t.id === id).length;
          goalProgress = {
            name: goal.title,
            completed: completedCount,
            total: goalTasks.length,
          };
        }
      }

      const message = getCelebrationMessage(task, goalProgress);
      setCelebrationMessage(message);
      triggerHaptic();
    }
  };

  const clearCelebration = useCallback(() => {
    setCelebrationMessage(null);
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        refreshTasks,
        createTask,
        updateTask,
        deleteTask,
        toggleTask,
        celebrationMessage,
        clearCelebration,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within TasksProvider');
  }
  return context;
}
