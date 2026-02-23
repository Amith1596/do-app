import { Task, MomentumData } from '../types';

/**
 * Calculate momentum from task completion history.
 * Uses a 7-day rolling window. Never resets to zero.
 */
export function calculateMomentum(tasks: Task[]): MomentumData {
  const now = new Date();
  const today = startOfDay(now);
  const dailyCounts: number[] = [0, 0, 0, 0, 0, 0, 0];

  for (const task of tasks) {
    if (!task.completed || !task.completedAt) continue;

    const completedDate = new Date(task.completedAt);
    const dayIndex = daysBetween(startOfDay(completedDate), today);

    if (dayIndex >= 0 && dayIndex < 7) {
      dailyCounts[dayIndex]++;
    }
  }

  const completedLast7Days = dailyCounts.reduce((a, b) => a + b, 0);

  let level: MomentumData['level'];
  let label: string;

  if (completedLast7Days === 0) {
    level = 'starting';
    label = 'Ready to start';
  } else if (completedLast7Days <= 2) {
    level = 'starting';
    label = 'Getting started';
  } else if (completedLast7Days <= 5) {
    level = 'building';
    label = 'Building nicely';
  } else if (completedLast7Days <= 9) {
    level = 'rolling';
    label = 'On a roll';
  } else {
    level = 'unstoppable';
    label = 'Unstoppable';
  }

  return { completedLast7Days, dailyCounts, level, label };
}

/**
 * Momentum as a percentage (0-100) for the progress bar.
 * Caps at 100% (10+ tasks in 7 days).
 */
export function momentumPercentage(data: MomentumData): number {
  return Math.min(100, Math.round((data.completedLast7Days / 10) * 100));
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysBetween(earlier: Date, later: Date): number {
  const diff = later.getTime() - earlier.getTime();
  return Math.floor(diff / (24 * 60 * 60 * 1000));
}
