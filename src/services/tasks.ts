import { supabase } from './supabase';
import { Task } from '../types';

export const tasksService = {
  async getTasks(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Task[];
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<Task> {
    // Map camelCase to snake_case for database
    const insertData = {
      title: task.title,
      description: task.description || null,
      completed: task.completed || false,
      user_id: userId,
      goal_id: task.goalId || null,
      due_date: task.dueDate || null,
      estimated_minutes: task.estimatedMinutes || null,
      priority: task.priority || null,
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert([insertData])
      .select()
      .single();

    if (error) throw error;
    return data as Task;
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        title: updates.title,
        description: updates.description,
        completed: updates.completed,
        goal_id: updates.goalId || null,
        due_date: updates.dueDate || null,
        estimated_minutes: updates.estimatedMinutes || null,
        priority: updates.priority || null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Task;
  },

  async deleteTask(id: string): Promise<void> {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) throw error;
  },

  async toggleTask(id: string, completed: boolean): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update({ completed })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Task;
  },
};
