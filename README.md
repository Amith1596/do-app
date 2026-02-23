# ~~TO~~ DO

**Don't organize tasks. Finish them.**

A behavioral task app that hides the list. Instead of showing you 30 tasks and letting you freeze, DO shows you **one task at a time**, matched to your current energy level. Every feature is designed around a specific behavioral science insight — not productivity theater.

Try it: [do-app.vercel.app](https://do-app.vercel.app) (tap "Try the Experience" — no account needed)

---

## The Problem

Every todo app solves organization. None solve completion.

You open Todoist. You see 30 tasks. You feel overwhelmed. You close Todoist. You open Instagram instead.

The list is the problem. Lists create decision fatigue, trigger overwhelm, and enable avoidance. The more organized your list, the more paralyzing it becomes.

---

## Design Decisions: Research → Feature

Every feature in DO maps to a specific behavioral problem and the research behind it. This isn't a todo app with a coat of paint — it's a deliberate set of design bets.

### 1. One task at a time (Focus Screen)

**Problem**: Choice overload causes decision paralysis. More options = more friction = less action.

**Research**: Hick's Law — reaction time increases logarithmically with the number of choices. Sheena Iyengar's jam study showed that 24 options led to 1/10th the purchases of 6 options. BJ Fogg's Ability axis in B=MAP — reducing decision friction directly increases the likelihood of behavior.

**What we built**: The Focus screen shows a single task card, not a list. A recommendation engine scores every task and surfaces the best one for right now. You see "Do it" or "Not this" — two choices, not thirty.

**Code**: `src/screens/FocusScreen.tsx`, `src/utils/recommendations.ts`

---

### 2. Energy matching (Low / Steady / Wired)

**Problem**: Todo apps treat you as a constant — same list at 9am and 9pm, whether you slept 8 hours or 4. But your capacity fluctuates throughout the day.

**Research**: BJ Fogg's B=MAP — **B**ehavior = **M**otivation × **A**bility × **P**rompt. When energy is low, Ability drops. Fogg's insight: instead of trying to boost motivation (hard), match the task to current ability (easy). Low energy + easy task = behavior happens. Low energy + hard task = avoidance.

**What we built**: App opens with "How's your energy?" (Low / Steady / Wired). The recommendation engine filters by energy state — at Low, only easy or short tasks (≤15 min) are eligible. At Wired, hard tasks get boosted. The same task list produces different recommendations at different times of day.

**Code**: `src/components/EnergySelector.tsx`, `filterByEnergy()` in `src/utils/recommendations.ts`

---

### 3. Momentum meter (never resets to zero)

**Problem**: Streaks are punitive. Miss one day on a 30-day streak and it resets to zero. This triggers the "what-the-hell effect" — one slip makes people abandon the entire system.

**Research**: The what-the-hell effect (Cochran & Tesser, 1996; also called "abstinence violation effect") — a single failure leads to complete goal abandonment. Counter-evidence: systems with gradual decay preserve motivation after setbacks. Alcoholics Anonymous's "one day at a time" is more effective than rigid streak tracking.

**What we built**: A 7-day rolling momentum meter. Complete tasks → momentum builds. Miss a day → it decays slightly, but never resets. Levels: *Getting started → Building nicely → On a roll → Unstoppable*. Coming back after a week off? You're at "Ready to start," not "You broke your streak."

**Code**: `src/utils/momentum.ts`, `src/components/MomentumMeter.tsx`

---

### 4. Time perception training

**Problem**: Time blindness — the inability to accurately estimate how long things take. You think "this will take 10 minutes," it takes 45, and you blow up your whole day.

**Research**: Dr. Russell Barkley identifies time blindness as a core executive function deficit in ADHD. It's not laziness — the internal clock is genuinely miscalibrated. Repeated estimation with immediate feedback is one of the few interventions shown to improve time perception over time.

**What we built**: Every task has a time estimate. When you tap "Do it," a timer starts. When you finish, the app compares your estimate to actual time — with shame-free language: "You guessed 5 min, took 12 min — that's common, your estimates will get better" or "Faster than you thought!" Over time, the gap between estimate and actual narrows.

**Code**: `src/components/TimerView.tsx`, `handleTimerDone()` in `src/screens/FocusScreen.tsx`

---

### 5. Shame-free language

**Problem**: Every todo app weaponizes guilt. Red "overdue" badges, broken streak warnings, aggressive reminders. This builds what ADHD coach Brendan Mahan calls the **"Wall of Awful"** — accumulated negative emotions around a task that make starting it harder the longer you avoid it. The guilt doesn't motivate — it compounds the avoidance.

**Research**: Brendan Mahan's Wall of Awful framework. Kristin Neff's self-compassion research shows that self-compassion consistently outperforms self-criticism for sustained behavior change. People who forgive themselves for procrastinating are *less* likely to procrastinate next time (Wohl, Pychyl, & Bennett, 2010).

**What we built**: Zero guilt language anywhere in the app. Old tasks are described as "Been waiting patiently" — not "overdue." The empty state after completing everything is "Nothing right now — enjoy the quiet. You've earned it." A guest returning after weeks sees "A clean slate" — not a wall of shame. Skipping a task costs -1 point (soft), not a lecture.

**Code**: Rationale strings in `src/utils/recommendations.ts`, empty states in `src/screens/FocusScreen.tsx`

---

### 6. Completion celebrations

**Problem**: Traditional todo apps give you a checkbox. That's it. No emotional reinforcement, no acknowledgment. Completing a task feels the same as not completing one.

**Research**: BJ Fogg's "Celebration" — the most underrated part of his model. Immediate positive emotion right after a behavior is what wires the habit loop. Not the reward at the end of the week. Not the streak count. The *feeling* in the moment of completion. Dopamine reinforcement happens in milliseconds, not minutes.

**What we built**: Every completion triggers a contextual celebration message + haptic feedback. High-priority task? "Big one knocked out! That took guts." Task linked to a goal? "Done! You're now 60% through 'Launch portfolio'." Goal fully completed? "GOAL COMPLETE: Launch portfolio! Every task done." The message matches the significance of what you just did.

**Code**: `src/utils/celebrations.ts`, haptics via `expo-haptics`

---

### 7. Context batching

**Problem**: Bouncing between unrelated tasks kills flow state. You finish a work task, then the app suggests grocery shopping, then back to a different work project. The cognitive switching cost is real.

**Research**: Gollwitzer's implementation intentions research (2006) — pre-committing to "when X, then Y" in a specific context doubles follow-through. Task inertia: you're significantly more likely to continue work in a domain you just completed something in.

**What we built**: After completing a task linked to a goal, the recommendation engine boosts other tasks under the same goal (+2 score). Finish one task toward "Learn Spanish"? The next recommendation is more likely to be another Spanish task. Momentum builds within a context, not across random domains.

**Code**: `lastCompletedGoalId` logic in `src/utils/recommendations.ts` (lines 99-103)

---

### 8. Onboarding through the product itself

**Problem**: Traditional onboarding (modals, tooltips, coach marks) teaches you about the app. But people learn by doing, not by reading instructions they'll immediately forget.

**Research**: BJ Fogg's Tiny Habits — start with the smallest possible version of the target behavior. The first experience should be a *real* use of the product, not a tutorial about the product.

**What we built**: When a guest taps "Try the Experience," 5 seed tasks are created — each one teaches a feature by making you use it. Task 1: "Welcome to DO — tap 'Do it' below" (teaches Focus screen + timer). Task 2: "Check the Goals tab to see your progress" (teaches goal-task linkage). No modals, no overlays. The product teaches itself through its own core loop.

**Code**: `src/services/seedData.ts`, triggered in `src/contexts/AuthContext.tsx`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React Native + Expo 54 + TypeScript |
| UI | React Native Paper (Material Design 3) |
| Backend | Supabase (PostgreSQL + Auth + RLS) |
| State | React Context |
| Navigation | React Navigation (bottom tabs + native stack) |
| Haptics | expo-haptics |
| Hosting | Vercel (web) |

---

## Getting Started

### Prerequisites
- Node.js v18+
- A Supabase project ([free tier](https://supabase.com))

### Setup

```bash
git clone https://github.com/Amith1596/do-app.git
cd do-app
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Supabase URL and anon key

# Run database migrations in Supabase SQL Editor:
# 1. supabase/migrations/001_initial_schema.sql
# 2. supabase/migrations/002_behavioral_fields.sql

npm start
```

Press `w` for web, or scan the QR code with Expo Go on your phone.

### Web Build & Deploy

```bash
npm run build:web    # outputs to dist/
npx vercel --prod    # deploy to Vercel
```

---

## Architecture

```
src/
  components/     EnergySelector, FocusCard, TimerView, MomentumMeter, TaskItem, ...
  contexts/       Auth, Tasks, Goals (React Context providers)
  hooks/          useGoalProgress
  navigation/     Bottom tabs: Focus > Tasks > Goals > Profile
  screens/        FocusScreen (primary), TasksScreen, GoalsScreen, ProfileScreen, Login, SignUp
  services/       Supabase API layer (auth, tasks, goals, seedData)
  theme/          Warm Confidence palette (sage, terracotta, cream)
  types/          Task, Goal, EnergyState, MomentumData, TimerSession
  utils/          Recommendation engine, momentum calculator, celebrations
```

---

## What's Next

**Phase 2: The Brain Dump** — AI-powered task capture. Stream-of-consciousness text input → structured tasks extracted by Claude API → smart re-planning → intelligent decomposition.

See `PRD.md` for the full spec.

---

## License

MIT
