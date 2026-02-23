import { Task } from '../types';

interface GoalProgressInfo {
  name: string;
  completed: number;
  total: number;
}

export function getCelebrationMessage(
  task: Task,
  goalProgress?: GoalProgressInfo
): string {
  // Goal complete (100%)
  if (goalProgress && goalProgress.total > 0 && goalProgress.completed >= goalProgress.total) {
    return `GOAL COMPLETE: ${goalProgress.name}! Every task done.`;
  }

  // High priority task
  if (task.priority === 'high') {
    return 'Big one knocked out! That took guts.';
  }

  // Task with goal progress
  if (goalProgress && goalProgress.total > 0) {
    const pct = Math.round((goalProgress.completed / goalProgress.total) * 100);
    return `Done! You're now ${pct}% through "${goalProgress.name}".`;
  }

  // Basic task
  return 'Done! One less thing to worry about.';
}

export async function triggerHaptic(): Promise<void> {
  try {
    const Haptics = await import('expo-haptics');
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {
    // Haptics not available (e.g., on web) — silently ignore
  }
}
