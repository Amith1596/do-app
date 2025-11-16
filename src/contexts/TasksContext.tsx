import React, { createContext, useState, useEffect, useContext } from 'react';
import { Task } from '../types';
import { tasksService } from '../services/tasks';
import { useAuth } from './AuthContext';

interface TasksContextType {
  tasks: Task[];
  loading: boolean;
  refreshTasks: () => Promise<void>;
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

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

    const updatedTask = await tasksService.toggleTask(id, !task.completed);
    setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
  };

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
