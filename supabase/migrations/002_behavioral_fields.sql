-- RUN THIS IN SUPABASE SQL EDITOR BEFORE TESTING
-- Migration: Add behavioral fields to tasks and goals

-- Add behavioral fields to tasks
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard'));
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS parent_task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS energy_level TEXT CHECK (energy_level IN ('low', 'medium', 'high'));
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS started_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS skip_count INTEGER DEFAULT 0;

-- Index for sub-task queries
CREATE INDEX IF NOT EXISTS idx_tasks_parent ON public.tasks(parent_task_id);

-- Add completion tracking to goals
ALTER TABLE public.goals ADD COLUMN IF NOT EXISTS target_task_count INTEGER;
