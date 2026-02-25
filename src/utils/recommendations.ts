import { Task, Goal, TaskRecommendation, EnergyState } from '../types';

/**
 * Energy-aware task recommendation engine.
 *
 * Key differences from a standard recommender:
 * - Energy state filters what tasks are even eligible
 * - No penalty language — skips are soft, not punished
 * - Context batching: if the last completed task has a goal, boost same-goal tasks
 * - Shame-free: old tasks get slightly boosted (not punished with "overdue" labels)
 */
export function getRecommendation(
  tasks: Task[],
  goals: Goal[],
  energy: EnergyState,
  skippedIds: string[],
  lastCompletedGoalId?: string
): TaskRecommendation | null {
  // 1. Filter to incomplete tasks
  const incomplete = tasks.filter((t) => !t.completed);
  if (incomplete.length === 0) return null;

  // 2. Energy-based filtering
  const candidates = filterByEnergy(incomplete, energy);
  if (candidates.length === 0) {
    // No tasks match this energy level — return null so UI can suggest alternatives
    return null;
  }

  // 3. Remove skipped tasks from candidates
  const unskipped = candidates.filter((t) => !skippedIds.includes(t.id));

  if (unskipped.length === 0) {
    // All candidates skipped — loop back to best task (circular)
    return scoreTasks(candidates, goals, [], lastCompletedGoalId);
  }

  // 4. Score and return best unskipped task
  return scoreTasks(unskipped, goals, skippedIds, lastCompletedGoalId);
}

export function filterByEnergy(tasks: Task[], energy: EnergyState): Task[] {
  switch (energy) {
    case 'low':
      // Only easy or short tasks (≤15 min). If no difficulty/time set, include it.
      return tasks.filter((t) => {
        const isEasy = t.difficulty === 'easy';
        const isShort = t.estimatedMinutes !== undefined && t.estimatedMinutes <= 15;
        const hasNoMetadata = !t.difficulty && !t.estimatedMinutes;
        return isEasy || isShort || hasNoMetadata;
      });

    case 'steady':
      // Moderate tasks: exclude hard tasks. Include easy, medium, and untagged.
      return tasks.filter((t) => t.difficulty !== 'hard');

    case 'wired':
      // Prioritize hard/long tasks, but don't exclude easy ones
      // (We'll boost hard tasks in scoring instead of filtering)
      return tasks;

    default:
      return tasks;
  }
}

function scoreTasks(
  candidates: Task[],
  goals: Goal[],
  skippedIds: string[],
  lastCompletedGoalId?: string
): TaskRecommendation | null {
  if (candidates.length === 0) return null;

  const now = new Date();
  const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const goalMap = new Map<string, Goal>();
  for (const g of goals) {
    goalMap.set(g.id, g);
  }

  const scored = candidates.map((task) => {
    let score = 0;
    const reasons: string[] = [];

    // Due date urgency (gentle — no "overdue" language)
    if (task.dueDate) {
      const due = new Date(task.dueDate);
      if (due <= in48Hours) {
        score += 3;
        reasons.push('Time-sensitive');
      } else if (due <= in7Days) {
        score += 2;
        reasons.push('Coming up this week');
      }
    }

    // Goal linkage
    if (task.goalId) {
      score += 2;
      const goal = goalMap.get(task.goalId);
      if (goal) {
        reasons.push(`Moves "${goal.title}" forward`);
      }
    }

    // Context batching: boost same-goal tasks as last completed
    if (lastCompletedGoalId && task.goalId === lastCompletedGoalId) {
      score += 2;
      reasons.push('Keeps your momentum in this area');
    }

    // Priority
    if (task.priority === 'high') {
      score += 1;
      reasons.push('High priority');
    }

    // Time fit: prefer tasks with estimates (they're more "ready")
    if (task.estimatedMinutes) {
      score += 1;
    }

    // Soft skip penalty (less harsh than before)
    if (skippedIds.includes(task.id)) {
      score -= 1;
    }

    // Slight recency boost for older tasks (shame-free approach:
    // old tasks aren't "overdue", they're "patient")
    const ageInDays = (now.getTime() - new Date(task.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    if (ageInDays > 7) {
      score += 1;
      reasons.push('Been waiting patiently');
    }

    return { task, score, reasons };
  });

  // Sort by score descending, tiebreak by oldest first
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(a.task.createdAt).getTime() - new Date(b.task.createdAt).getTime();
  });

  const best = scored[0];
  if (!best) return null;

  const rationale = best.reasons.length > 0
    ? best.reasons.join(' · ')
    : 'Ready when you are';

  return { task: best.task, rationale, score: best.score };
}

/**
 * Returns the number of available (incomplete) tasks per energy level.
 * Used by FocusScreen to suggest alternative energy levels when no tasks match.
 */
export function getEnergyAvailability(
  tasks: Task[]
): Record<EnergyState, number> {
  const incomplete = tasks.filter((t) => !t.completed);
  return {
    low: filterByEnergy(incomplete, 'low').length,
    steady: filterByEnergy(incomplete, 'steady').length,
    wired: filterByEnergy(incomplete, 'wired').length,
  };
}

/**
 * Get the "wired" boost: re-score with preference for hard/long tasks.
 * Called internally when energy = 'wired'.
 */
export function getWiredRecommendation(
  tasks: Task[],
  goals: Goal[],
  skippedIds: string[],
  lastCompletedGoalId?: string
): TaskRecommendation | null {
  const incomplete = tasks.filter((t) => !t.completed);

  // Boost hard/long tasks by temporarily increasing their scores
  const boosted = incomplete.map((t) => {
    const boost = (t.difficulty === 'hard' ? 3 : 0) +
      (t.estimatedMinutes && t.estimatedMinutes >= 30 ? 2 : 0);
    return { ...t, skipCount: (t.skipCount || 0) - boost }; // Hack: reduce skip count to boost score
  });

  return scoreTasks(boosted, goals, skippedIds, lastCompletedGoalId);
}
