export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  goalId?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  estimatedMinutes?: number;
  priority?: 'low' | 'medium' | 'high';
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  targetDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  color?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}
