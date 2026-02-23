# PRD: DO — The Anti-List Task App

**Author**: Amith Pallankize
**Date**: 2026-02-22 (v2 — redesigned thesis)
**Status**: Phase 1.5 redesign in progress

---

## 0. Why This Exists

Every todo app on the market — Todoist, Things, TickTick, Notion — solves the same problem: **organizing tasks into lists.** None of them solve the actual problem: **you create tasks and don't do them.**

The root cause isn't laziness. BJ Fogg's Behavior Model (B = MAP) identifies three failure points:

1. **Motivation decay** — desire evaporates between creation and execution
2. **Ability mismatch** — tasks are too big, timed wrong, or require decisions you can't make right now
3. **Prompting failure** — notifications aren't prompts; you dismiss them reflexively

**DO's thesis**: The list itself is the problem. Lists create decision fatigue, trigger overwhelm, and enable avoidance. The fix is radical: **hide the list. Show one task. Match it to your energy. Celebrate when you finish.**

---

## 1. What Makes DO Different (Competitive Differentiation)

| Feature | DO | Todoist | Things 3 | Goblin.tools | Habitica |
|---------|-----|---------|----------|-------------|---------|
| **One-task-at-a-time** (no list as default) | Yes | No | No | No | No |
| **Energy-first entry** | Yes | No | No | No | No |
| **Shame-free design** (no overdue badges) | Yes | No | No | Partial | No |
| **Momentum** (not streaks) | Yes | No | No | No | Streaks |
| **Time perception training** | Yes | No | No | No | No |
| **Context batching** | Yes | Smart lists | No | No | No |
| **ADHD-informed UX** | Core thesis | Afterthought | No | Yes | Gamification |

### Core Design Principles

1. **Anti-List**: The default view is ONE task card, not a scrollable list. The list exists but is behind a tab — infrastructure, not interface.
2. **Energy-First**: App opens with "How's your energy?" (low / steady / wired). The entire task surface adapts. Low energy = only easy/short tasks. Wired = surfaces deep work.
3. **Shame-Free**: No red overdue badges. No "you missed X tasks." Returning after days away gets: "Welcome back. Here's one thing." Overdue tasks quietly re-sort, no guilt.
4. **Momentum Over Streaks**: Streaks punish a single miss with a reset to zero. Momentum uses physics: completing tasks builds inertia. Missing a day slows you down but doesn't reset. Gentle nudge: "You're slowing down — one small task keeps you moving."
5. **Time Perception Training**: Before each task, estimate duration. After, see actual time. Over weeks, this trains the time estimation skill that ADHD users lack.

---

## 2. Target User

**The Overwhelmed Achiever**: Someone with 20-40 tasks across work, personal projects, and life admin. They're not lazy — they're overcommitted. They open their todo app, see a wall of tasks, feel paralyzed, and close it. They need someone to say: "Forget the list. Do this one thing. You have 15 minutes. Go."

**ADHD-relevant behaviors addressed**:
- Working memory limitations (can't hold multiple tasks in mind)
- Time blindness (can't estimate or feel time passing)
- Decision paralysis (too many choices = no action)
- Emotional dysregulation (task avoidance is emotional, not logical)
- Now vs Not Now brain (only two time categories)
- Novelty seeking (same interface gets boring)

---

## 3. Feature Spec — The Redesign

### The Focus Screen (Primary Surface)

**What it replaces**: The old TasksScreen with its scrollable list is now a secondary "All Tasks" tab.

**Flow**:
```
App opens → Focus Screen
  │
  ├── First visit today (or energy expired):
  │     "How's your energy right now?"
  │     [Low]  [Steady]  [Wired]
  │
  ├── After energy selection:
  │     ┌─────────────────────────────┐
  │     │                             │
  │     │   Momentum meter (top)      │
  │     │   ━━━━━━━━━━━━━░░░░░        │
  │     │   "Building nicely"         │
  │     │                             │
  │     │   ┌─────────────────────┐   │
  │     │   │                     │   │
  │     │   │   TASK CARD         │   │
  │     │   │   "Call the dentist" │   │
  │     │   │   ~5 min · Easy     │   │
  │     │   │   → Health goal     │   │
  │     │   │                     │   │
  │     │   │  [Not this]  [Do it]│   │
  │     │   └─────────────────────┘   │
  │     │                             │
  │     │   "3 tasks done today"      │
  │     └─────────────────────────────┘
  │
  └── No tasks / all done:
        "Nothing right now. Enjoy the quiet."
```

**Energy → Task Matching**:
- **Low**: Only tasks where `difficulty = 'easy'` OR `estimatedMinutes <= 15`. Sorted by shortest first.
- **Steady**: All tasks. Standard scoring algorithm.
- **Wired**: Prioritize `difficulty = 'hard'` or `estimatedMinutes >= 30`. Deep work mode.

**Task Card**:
- Shows ONE task at a time
- Title (large), time estimate, difficulty badge, goal link
- Two actions: "Not this" (skip, no penalty language) and "Do it" (start)
- "Do it" starts an optional timer view
- "Not this" slides to next recommendation — no penalty, no guilt text
- After 3 skips, gently suggest: "Having trouble picking? Try changing your energy level."

**Momentum Meter**:
- Horizontal bar at top of Focus screen
- Fills based on tasks completed in the last 7 days (rolling window)
- States: "Getting started" (0-2), "Building nicely" (3-5), "On a roll" (6-9), "Unstoppable" (10+)
- Never resets to zero. Decays gradually. Missing a day = slight decrease, not punishment.
- Tapping the meter shows weekly summary: tasks per day sparkline

### Timer View (When "Do it" is tapped)

```
┌─────────────────────────────┐
│                             │
│   "Call the dentist"        │
│                             │
│        04:32                │
│     (your guess: 5 min)     │
│                             │
│       [Done!]               │
│                             │
│   [Pause]    [Abandon]      │
└─────────────────────────────┘
```

- Shows elapsed time vs estimated time
- "Done!" completes the task → celebration → back to Focus with next card
- "Abandon" → no shame text. "No worries. It'll be here when you're ready." Returns to Focus.
- After completion, brief time comparison: "You guessed 5 min, it took 4:32. Nice read!" (or "You guessed 5 min, took 12 min — that's common, your estimates will get better over time.")

### All Tasks Screen (Secondary — behind tab)

The traditional list view still exists for users who need to manage, add, edit, delete tasks. But it's NOT the home screen.

- Keep existing task list functionality
- Add energy-level badge to each task
- Keep goal grouping toggle
- Keep add/edit/delete

### Shame-Free Design Language

Replace ALL negative language:
- "Overdue" → never shown. Tasks just get higher recommendation priority silently.
- "0 tasks completed" → "A fresh start"
- "Failed" / "Missed" → never used
- Empty state: "Nothing right now. Enjoy the quiet."
- Returning after absence: "Welcome back. Here's one thing you can do."
- Skip a task: "Not this" (not "Skip" — subtly different)

### Quick Capture (Keep from Phase 1)

FAB button on Focus screen. Tap → minimal modal: title + time estimate only. Creates task and immediately offers it if it matches current energy.

---

## 4. Technical Changes

### New Types

```typescript
type EnergyState = 'low' | 'steady' | 'wired';

interface MomentumData {
  completedLast7Days: number;
  dailyCounts: number[]; // [today, yesterday, ..., 6 days ago]
  level: 'starting' | 'building' | 'rolling' | 'unstoppable';
  label: string;
}

interface TimerSession {
  taskId: string;
  startedAt: Date;
  estimatedMinutes: number;
}
```

### New/Modified Files

| File | Action | Purpose |
|------|--------|---------|
| `src/types/index.ts` | Modify | Add EnergyState, MomentumData, TimerSession |
| `src/contexts/TasksContext.tsx` | Modify | Add energy state, momentum computation |
| `src/screens/FocusScreen.tsx` | **Create** | New primary screen with energy check + one-task card |
| `src/screens/TasksScreen.tsx` | Modify | Becomes secondary "All Tasks" tab |
| `src/components/EnergySelector.tsx` | **Create** | Energy level selection UI |
| `src/components/FocusCard.tsx` | **Create** | Single task card for focus view |
| `src/components/MomentumMeter.tsx` | **Create** | Momentum visualization |
| `src/components/TimerView.tsx` | **Create** | Active task timer |
| `src/utils/recommendations.ts` | Modify | Energy-aware scoring, context batching |
| `src/utils/momentum.ts` | **Create** | Momentum calculation from task history |
| `src/navigation/AppNavigator.tsx` | Modify | Focus as home tab, Tasks as secondary |
| `src/screens/LoginScreen.tsx` | Modify | Updated tagline |

### Navigation Structure

```
Bottom Tabs:
  1. Focus (home) — FocusScreen [new primary surface]
  2. Tasks — TasksScreen [existing list, secondary]
  3. Goals — GoalsScreen [existing]
  4. Profile — ProfileScreen [existing]
```

---

## 5. Phase 2: The Brain Dump (Planned, Not in This Build)

AI-powered task capture. User streams consciousness, AI extracts structured tasks.

**Features**:
1. **Brain Dump Input** — free-text → AI extracts structured tasks
2. **Smart Re-Planning** — AI re-prioritizes full list when new tasks arrive
3. **AI Task Decomposition** — intelligent breakdown (replaces >30 min heuristic)
4. **Context Memory** — AI connects dots across sessions

**Tech**: Anthropic Claude API + `brain_dump_sessions` Supabase table.

Full spec deferred until Phase 1.5 redesign is shipped.

---

## 6. Success Criteria

1. **Focus screen works end-to-end**: energy check → one task card → do it / not this → timer → celebration
2. **Energy matching is correct**: low energy only shows easy/short tasks, wired shows hard/long
3. **Momentum meter reflects last 7 days** and never resets to zero
4. **Zero shame language** anywhere in the app
5. **Timer shows time comparison** after completion
6. **All Tasks tab preserves existing CRUD** functionality
7. **TypeScript compiles**: `npx tsc --noEmit` with zero errors
8. **App loads on web**: `npx expo start --web`

---

## Appendix: Behavioral Science References

**BJ Fogg's B = MAP**: Behavior = Motivation x Ability x Prompt. DO targets all three: celebrations for motivation, energy matching for ability, the Focus card as the prompt.

**ADHD Research**: Dr. Russell Barkley's "time blindness" concept. Dr. Ned Hallowell's "structured routine" approach. The "wall of awful" (Brendan Mahan) — emotional barrier to task initiation that lists make worse.

**Tiny Habits**: BJ Fogg's Anchor + Tiny Behavior + Celebration. The momentum system is the anchor. The one-task card is the tiny behavior. The celebration is celebration.

**Loss Aversion (inverted)**: Traditional apps use loss aversion negatively (overdue badges, broken streaks). DO inverts it — you can't lose your momentum, only slow it down. This prevents shame spirals.
