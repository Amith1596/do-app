import { useMemo, useCallback } from 'react';
import { useTasks } from '../contexts/TasksContext';

interface GoalProgress {
  completed: number;
  total: number;
  percentage: number;
}

export function useGoalProgress() {
  const { tasks } = useTasks();

  const tasksByGoal = useMemo(() => {
    const map = new Map<string, { completed: number; total: number }>();
    for (const task of tasks) {
      if (!task.goalId) continue;
      const current = map.get(task.goalId) || { completed: 0, total: 0 };
      current.total++;
      if (task.completed) current.completed++;
      map.set(task.goalId, current);
    }
    return map;
  }, [tasks]);

  const getProgress = useCallback(
    (goalId: string): GoalProgress => {
      const data = tasksByGoal.get(goalId);
      if (!data || data.total === 0) {
        return { completed: 0, total: 0, percentage: 0 };
      }
      return {
        completed: data.completed,
        total: data.total,
        percentage: Math.round((data.completed / data.total) * 100),
      };
    },
    [tasksByGoal]
  );

  return { getProgress };
}
