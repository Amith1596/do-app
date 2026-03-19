# DO: A Behavioral Science Todo App

**Project**: DO (anti-list task app)
**Role**: Product Designer & Developer
**Timeline**: November 2025 - Present
**Status**: Phase 1.5 complete, deployed at [do-app.vercel.app](https://do-app.vercel.app)
**Repo**: [github.com/Amith1596/do-app](https://github.com/Amith1596/do-app)

---

## The Problem: Todo Apps Don't Help You Complete Tasks

Every todo app solves organization. None solve completion.

You open Todoist. You see 30 tasks. You feel overwhelmed. You close Todoist. You open Instagram instead.

The list is the problem. Lists create decision fatigue, trigger overwhelm, and enable avoidance. The more organized your list, the more paralyzing it becomes.

**The core insight**: Task completion isn't a problem of organization. It's a problem of **motivation, ability, and prompting**, the three components of BJ Fogg's Behavior Model (B=MAP).

Traditional todo apps only address organization (a proxy for ability). They ignore motivation and prompting, the two factors that actually drive behavior change.

---

## What's Built and Shipping

DO is a working React Native + Expo app deployed on the web. These features are live and usable today.

### 1. One Task at a Time (Focus Screen)

**Problem**: Choice overload causes decision paralysis. More options = more friction = less action.

**Research**: Hick's Law shows reaction time increases logarithmically with the number of choices. Sheena Iyengar's jam study showed 24 options led to 1/10th the purchases of 6 options. BJ Fogg's Ability axis in B=MAP says reducing decision friction directly increases the likelihood of behavior.

**What we built**: The Focus screen shows a single task card, not a list. A recommendation engine scores every task and surfaces the best one for right now. You see "Do it" or "Not this", two choices instead of thirty.

### 2. Energy Matching (Low / Steady / Wired)

**Problem**: Todo apps treat you as a constant. Same list at 9am and 9pm, whether you slept 8 hours or 4.

**Research**: BJ Fogg's B=MAP says when energy is low, Ability drops. Instead of trying to boost motivation (hard), match the task to current ability (easy). Low energy + easy task = behavior happens.

**What we built**: App opens with "How's your energy?" (Low / Steady / Wired). The recommendation engine filters by energy state. At Low, only easy or short tasks (15 min or less) are eligible. At Wired, hard tasks get boosted. The same task list produces different recommendations at different times of day.

### 3. Momentum Meter (Never Resets to Zero)

**Problem**: Streaks are punitive. Miss one day on a 30-day streak and it resets to zero. This triggers the "what-the-hell effect" where one slip makes people abandon the entire system.

**Research**: The what-the-hell effect (Cochran & Tesser, 1996). Counter-evidence: systems with gradual decay preserve motivation after setbacks.

**What we built**: A 7-day rolling momentum meter. Complete tasks and momentum builds. Miss a day and it decays slightly, but never resets. Levels go from "Getting started" through "Building nicely" to "Unstoppable." Coming back after a week off, you're at "Ready to start," not "You broke your streak."

### 4. Time Perception Training

**Problem**: Time blindness, the inability to accurately estimate how long things take.

**Research**: Dr. Russell Barkley identifies time blindness as a core executive function deficit in ADHD. Repeated estimation with immediate feedback is one of the few interventions shown to improve time perception.

**What we built**: Every task has a time estimate. When you tap "Do it," a timer starts. When you finish, the app compares your estimate to actual time with shame-free language: "You guessed 5 min, took 12 min. That's common, your estimates will get better" or "Faster than you thought!"

### 5. Shame-Free Language

**Problem**: Todo apps weaponize guilt. Red "overdue" badges, broken streak warnings, aggressive reminders. This builds what ADHD coach Brendan Mahan calls the "Wall of Awful," accumulated negative emotions that make starting harder the longer you avoid it.

**Research**: Kristin Neff's self-compassion research shows that self-compassion consistently outperforms self-criticism for sustained behavior change. People who forgive themselves for procrastinating are less likely to procrastinate next time (Wohl, Pychyl, & Bennett, 2010).

**What we built**: Zero guilt language anywhere. Old tasks are "Been waiting patiently," not "overdue." The empty state says "Nothing right now. Enjoy the quiet. You've earned it." A guest returning after weeks sees "A clean slate," not a wall of shame.

### 6. Completion Celebrations

**Problem**: Traditional todo apps give you a checkbox. No emotional reinforcement.

**Research**: BJ Fogg's "Celebration" is the most underrated part of his model. Immediate positive emotion right after a behavior is what wires the habit loop. Dopamine reinforcement happens in milliseconds.

**What we built**: Every completion triggers a contextual celebration message + haptic feedback. High-priority task? "Big one knocked out! That took guts." Task linked to a goal? "Done! You're now 60% through 'Launch portfolio'." The message matches the significance of what you just did.

### 7. Context Batching

**Problem**: Bouncing between unrelated tasks kills flow state.

**Research**: Gollwitzer's implementation intentions research (2006) found pre-committing to context-specific actions doubles follow-through. Task inertia: you're more likely to continue in a domain you just completed something in.

**What we built**: After completing a task linked to a goal, the recommendation engine boosts other tasks under the same goal. Finish one task toward "Learn Spanish"? The next recommendation is more likely to be another Spanish task.

### 8. Onboarding Through the Product

**Problem**: Traditional onboarding (modals, tooltips) teaches you about the app. People learn by doing, not by reading.

**Research**: BJ Fogg's Tiny Habits: start with the smallest possible version of the target behavior.

**What we built**: When a guest taps "Try the Experience," 5 seed tasks are created. Each one teaches a feature by making you use it. Task 1: "Welcome to DO. Tap 'Do it' below." No modals, no overlays. The product teaches itself through its own core loop.

---

## What's Designed but Not Built

These features were designed with full behavioral science rationale and documented in [FEATURE_CONCEPTS.md](./FEATURE_CONCEPTS.md). They represent the Phase 2-4 roadmap.

- **Brain Dump** (Phase 2): AI-powered task capture. Stream-of-consciousness text input, structured tasks extracted by Claude API, smart re-planning, intelligent decomposition. Full spec in [PRD.md](../PRD.md).
- **Smart Calendar Tetris**: AI analyzes calendar, productivity patterns, and energy levels to find optimal time slots.
- **Psychological Reframing Engine**: AI rewrites reminders using loss aversion, identity framing, and social pressure. User-controlled intensity.
- **Predictive Failure Warnings**: ML model predicts task failure 3-5 days in advance based on historical patterns.
- **Social Goal Witnesses**: Designate people who see goal progress updates without seeing your task list.
- **Implementation Intentions with Sensor Detection**: Context-locked habits using phone sensors ("When I arrive home, I will change into workout clothes").
- **Task Dependency Intelligence**: Surface "unblocking" tasks that enable the most downstream work.

These are genuine design bets, not features. The gap between designed and built is intentional. Ship 3-5 core differentiators, get users, learn what matters, kill 80% of the backlog.

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

## What's Different from Existing Apps

| Capability | Todoist | Things | TickTick | DO |
|------------|---------|--------|----------|-----|
| Organize tasks | Yes | Yes | Yes | Yes |
| Shows you a list | Yes | Yes | Yes | **No** |
| Energy-aware recommendations | No | No | No | **Yes** |
| Shame-free language | No | No | No | **Yes** |
| Momentum (never resets) | No | No | No | **Yes** |
| Time perception training | No | No | No | **Yes** |
| Contextual celebrations | No | No | Partial | **Yes** |

---

## Key Learnings

**1. Remove decisions, don't add features.** Most productivity apps fail because they add more options. More options = more paralysis. DO shows one task. That's the whole product bet.

**2. Ability is the reliable lever.** Product designers default to motivational features (streaks, badges, gamification). Motivation is fleeting. Making tasks match your current capacity is more effective.

**3. Shame compounds avoidance.** Every "overdue" badge, every broken streak, every red notification adds a brick to the Wall of Awful. Removing guilt from the system is a feature, not just nice language.

**4. Ship the thesis, not the feature list.** The 15+ designed features are interesting. But the thesis, hiding the list and matching one task to your energy, is what makes DO different. Everything else is optimization on top of that bet.

---

## Current Status

Phase 1.5 is complete and deployed. The app is usable as a daily driver for task management. Phase 2 (Brain Dump, AI-powered task capture) is designed and spec'd but not started.

**Last Updated**: March 2026
