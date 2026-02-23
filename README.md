# ~~TO~~ DO

**Don't organize tasks. Finish them.**

A behavioral task app that hides the list. Instead of showing you 30 tasks and letting you freeze, DO shows you **one task at a time**, matched to your current energy level. Built on BJ Fogg's Behavior Model (B=MAP) and ADHD research on decision paralysis, time blindness, and the "wall of awful."

Try it: [do-app.vercel.app](https://do-app.vercel.app) (tap "Try the Experience" — no account needed)

---

## The Problem

Every todo app solves organization. None solve completion.

You open Todoist. You see 30 tasks. You feel overwhelmed. You close Todoist. You open Instagram instead.

The list is the problem. Lists create decision fatigue, trigger overwhelm, and enable avoidance. The more organized your list, the more paralyzing it becomes.

## What DO Does Differently

| Principle | What It Means | How DO Implements It |
|-----------|--------------|---------------------|
| **Anti-List** | The default view is one task, not a scrollable list | Focus screen shows a single card — the best task for right now |
| **Energy-First** | Your capacity changes throughout the day | App opens with "How's your energy?" and matches tasks to your state |
| **Shame-Free** | No red overdue badges, no broken streaks | Returning after days away: "Welcome back. Here's one thing." |
| **Momentum** | Streaks punish one miss with a reset to zero | Momentum decays gradually — missing a day slows you down, never resets |
| **Time Training** | ADHD users can't estimate time | Before each task, guess the time. After, see how you did. Accuracy improves. |

---

## Features

### Focus Mode (Primary Surface)
- Energy check on app open (Low / Steady / Wired)
- One-task-at-a-time card with rationale for why this task, right now
- "Do it" starts a timer, "Not this" slides to the next recommendation
- Completion celebrations with haptic feedback and contextual messages
- Time perception training: your estimate vs actual time

### Goals & Progress
- Link tasks to goals and track progress with visual progress bars
- Progress bar fills as you complete linked tasks (color shifts from gray → amber → orange → green)
- Goal-grouped task view shows the big picture when you need it
- Completing a task toward a goal? The next recommendation boosts same-goal tasks to keep your momentum

### Momentum Meter
- 7-day rolling momentum bar (never resets to zero)
- Weekly sparkline showing daily completions
- Levels: Getting started → Building nicely → On a roll → Unstoppable

### Behavioral Task Creation
- Time estimate chips (5/15/30/60 min)
- Difficulty selector (Easy/Medium/Hard) — used for energy matching
- Goal linking with progress visualization

### Guided Onboarding
- New users get a hands-on tutorial through the Focus screen itself
- 5 seed tasks that teach by doing — each task is a lesson about a feature
- No modal walkthroughs, no coach marks — the product teaches itself

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

## Behavioral Science References

- **BJ Fogg's B=MAP**: Behavior = Motivation x Ability x Prompt
- **Dr. Russell Barkley**: Time blindness as core ADHD deficit
- **Brendan Mahan**: "Wall of Awful" — emotional barrier to task initiation
- **Dr. Ned Hallowell**: Structured external systems for ADHD management
- **Gollwitzer & Sheeran (2006)**: Implementation intentions double follow-through

---

## What's Next

**Phase 2: The Brain Dump** — AI-powered task capture. Stream-of-consciousness text input → structured tasks extracted by Claude API → smart re-planning → intelligent decomposition.

See `PRD.md` for the full spec.

---

## License

MIT
