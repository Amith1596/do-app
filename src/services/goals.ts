import { supabase } from './supabase';
import { Goal } from '../types';

export const goalsService = {
  async getGoals(userId: string): Promise<Goal[]> {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Goal[];
  },

  async createGoal(goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<Goal> {
    const { data, error } = await supabase
      .from('goals')
      .insert([
        {
          ...goal,
          user_id: userId,
          target_date: goal.targetDate || null,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data as Goal;
  },

  async updateGoal(id: string, updates: Partial<Goal>): Promise<Goal> {
    const { data, error } = await supabase
      .from('goals')
      .update({
        title: updates.title,
        description: updates.description,
        target_date: updates.targetDate || null,
        color: updates.color || null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Goal;
  },

  async deleteGoal(id: string): Promise<void> {
    const { error } = await supabase.from('goals').delete().eq('id', id);
    if (error) throw error;
  },

  async getTasksForGoal(goalId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('goal_id', goalId);

    if (error) throw error;
    return data;
  },
};
