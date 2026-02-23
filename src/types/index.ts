export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  goalId?: string;
  parentTaskId?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  estimatedMinutes?: number;
  priority?: 'low' | 'medium' | 'high';
  difficulty?: 'easy' | 'medium' | 'hard';
  energyLevel?: 'low' | 'medium' | 'high';
  startedAt?: Date;
  completedAt?: Date;
  skipCount?: number;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  targetDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  color?: string;
  targetTaskCount?: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface TaskRecommendation {
  task: Task;
  rationale: string;
  score: number;
}

// --- Energy & Focus types ---

export type EnergyState = 'low' | 'steady' | 'wired';

export interface MomentumData {
  completedLast7Days: number;
  dailyCounts: number[]; // [today, yesterday, ..., 6 days ago]
  level: 'starting' | 'building' | 'rolling' | 'unstoppable';
  label: string;
}

export interface TimerSession {
  taskId: string;
  taskTitle: string;
  estimatedMinutes: number;
  startedAt: Date;
}
