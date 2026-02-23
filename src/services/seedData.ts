import { supabase } from './supabase';

const ONBOARDING_GOAL_TITLE = 'Learn how DO works';

interface OnboardingTask {
  title: string;
  description: string;
  estimatedMinutes: number;
  offsetMinutes: number; // subtracted from now for created_at staggering
}

const ONBOARDING_TASKS: OnboardingTask[] = [
  {
    title: "Welcome to DO — tap 'Do it' below",
    description:
      "This is your Focus screen. Instead of a list, DO shows you one task at a time — the best match for your energy right now. Tap 'Do it' to start a timer that tracks actual vs estimated time, training your time perception. Tap 'Done' when you're ready.\n\nWhy it works: Hick's Law — fewer choices means faster action. One task beats a list of twenty.",
    estimatedMinutes: 1,
    offsetMinutes: 5,
  },
  {
    title: 'Check the Goals tab (target icon) to see your progress',
    description:
      "Look for the target icon in the bottom navigation bar. Every task can be linked to a goal. As you complete tasks, the goal's progress bar fills up. This task is part of your \"Learn how DO works\" goal — completing it moves the bar forward. Head to the Goals tab to see it, then come back here.\n\nWhy it works: Goal Gradient Effect — visible progress toward a finish line increases motivation.",
    estimatedMinutes: 2,
    offsetMinutes: 4,
  },
  {
    title: 'Tap + to add your own task',
    description:
      "Now add something real! Tap the orange + button. Set a title, pick a difficulty, estimate the time. You can link it to a goal too — the more detail you add, the smarter DO gets at picking your next task.\n\nWhy it works: Implementation Intentions — specifying difficulty and time makes you 2-3x more likely to start.",
    estimatedMinutes: 2,
    offsetMinutes: 3,
  },
  {
    title: 'Switch to the Tasks tab (checklist icon) and back',
    description:
      "Look for the checklist icon in the bottom navigation bar. The Tasks tab shows everything as a traditional list — grouped by goal so you can see the big picture. But Focus is where the magic happens — one thing at a time. Try switching tabs.\n\nWhy it works: The list exists for reference, but single-task focus reduces cognitive load (Cognitive Load Theory).",
    estimatedMinutes: 1,
    offsetMinutes: 2,
  },
  {
    title: 'Change your energy level',
    description:
      "Tap 'Change' next to your energy level above. When you're Low, DO only suggests easy tasks. When Wired, it brings on the hard stuff. Your energy changes throughout the day — DO adapts with you.\n\nWhy it works: Fogg's Behavior Model — matching task difficulty to your current energy makes starting effortless.",
    estimatedMinutes: 1,
    offsetMinutes: 1,
  },
];

/**
 * Seeds onboarding data for a new guest user.
 * Idempotent — checks if the onboarding goal already exists before inserting.
 */
export async function seedOnboardingData(userId: string): Promise<void> {
  // Check if already seeded
  const { data: existingGoals } = await supabase
    .from('goals')
    .select('id')
    .eq('user_id', userId)
    .eq('title', ONBOARDING_GOAL_TITLE)
    .limit(1);

  if (existingGoals && existingGoals.length > 0) {
    return; // Already seeded
  }

  // Create onboarding goal
  const { data: goal, error: goalError } = await supabase
    .from('goals')
    .insert({
      user_id: userId,
      title: ONBOARDING_GOAL_TITLE,
      description: 'Complete these tasks to learn the basics of DO',
      target_task_count: ONBOARDING_TASKS.length,
    })
    .select('id')
    .single();

  if (goalError || !goal) {
    console.error('Failed to create onboarding goal:', goalError);
    return;
  }

  // Create tasks with staggered created_at for deterministic ordering
  const now = Date.now();
  const tasks = ONBOARDING_TASKS.map((t) => ({
    user_id: userId,
    title: t.title,
    description: t.description,
    completed: false,
    goal_id: goal.id,
    estimated_minutes: t.estimatedMinutes,
    priority: 'high' as const,
    difficulty: 'easy' as const,
    energy_level: 'low' as const,
    skip_count: 0,
    created_at: new Date(now - t.offsetMinutes * 60 * 1000).toISOString(),
  }));

  const { error: tasksError } = await supabase.from('tasks').insert(tasks);

  if (tasksError) {
    console.error('Failed to create onboarding tasks:', tasksError);
  }
}
