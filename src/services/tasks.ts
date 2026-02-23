import { supabase } from './supabase';
import { Task } from '../types';

function mapDbToTask(row: Record<string, unknown>): Task {
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string | undefined,
    completed: row.completed as boolean,
    goalId: row.goal_id as string | undefined,
    parentTaskId: row.parent_task_id as string | undefined,
    createdAt: new Date(row.created_at as string),
    updatedAt: new Date(row.updated_at as string),
    dueDate: row.due_date ? new Date(row.due_date as string) : undefined,
    estimatedMinutes: row.estimated_minutes as number | undefined,
    priority: row.priority as Task['priority'],
    difficulty: row.difficulty as Task['difficulty'],
    energyLevel: row.energy_level as Task['energyLevel'],
    startedAt: row.started_at ? new Date(row.started_at as string) : undefined,
    completedAt: row.completed_at ? new Date(row.completed_at as string) : undefined,
    skipCount: row.skip_count as number | undefined,
  };
}

export const tasksService = {
  async getTasks(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(mapDbToTask);
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<Task> {
    const insertData: Record<string, unknown> = {
      title: task.title,
      description: task.description || null,
      completed: task.completed || false,
      user_id: userId,
      goal_id: task.goalId || null,
      parent_task_id: task.parentTaskId || null,
      due_date: task.dueDate || null,
      estimated_minutes: task.estimatedMinutes || null,
      priority: task.priority || null,
      difficulty: task.difficulty || null,
      energy_level: task.energyLevel || null,
      started_at: task.startedAt || null,
      completed_at: task.completedAt || null,
      skip_count: task.skipCount || 0,
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert([insertData])
      .select()
      .single();

    if (error) throw error;
    return mapDbToTask(data as Record<string, unknown>);
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const updateData: Record<string, unknown> = {};

    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.completed !== undefined) {
      updateData.completed = updates.completed;
      if (updates.completed) {
        updateData.completed_at = new Date().toISOString();
      } else {
        updateData.completed_at = null;
      }
    }
    if (updates.goalId !== undefined) updateData.goal_id = updates.goalId || null;
    if (updates.parentTaskId !== undefined) updateData.parent_task_id = updates.parentTaskId || null;
    if (updates.dueDate !== undefined) updateData.due_date = updates.dueDate || null;
    if (updates.estimatedMinutes !== undefined) updateData.estimated_minutes = updates.estimatedMinutes || null;
    if (updates.priority !== undefined) updateData.priority = updates.priority || null;
    if (updates.difficulty !== undefined) updateData.difficulty = updates.difficulty || null;
    if (updates.energyLevel !== undefined) updateData.energy_level = updates.energyLevel || null;
    if (updates.startedAt !== undefined) updateData.started_at = updates.startedAt ? updates.startedAt.toISOString() : null;
    if (updates.completedAt !== undefined) updateData.completed_at = updates.completedAt ? updates.completedAt.toISOString() : null;
    if (updates.skipCount !== undefined) updateData.skip_count = updates.skipCount;

    const { data, error } = await supabase
      .from('tasks')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return mapDbToTask(data as Record<string, unknown>);
  },

  async deleteTask(id: string): Promise<void> {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) throw error;
  },

  async toggleTask(id: string, completed: boolean): Promise<Task> {
    const updateData: Record<string, unknown> = { completed };
    if (completed) {
      updateData.completed_at = new Date().toISOString();
    } else {
      updateData.completed_at = null;
    }

    const { data, error } = await supabase
      .from('tasks')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return mapDbToTask(data as Record<string, unknown>);
  },

  async getSubTasks(parentTaskId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('parent_task_id', parentTaskId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return (data || []).map(mapDbToTask);
  },
};
