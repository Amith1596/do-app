# DO — Claude Code Context

**Project**: DO (anti-list task app)
**Type**: React Native + Expo mobile/web app
**Status**: Phase 1.5 complete, deployed. Phase 2 (Brain Dump) planned.
**Deployed**: [do-app.vercel.app](https://do-app.vercel.app)
**Started**: 2025-11-12
**Last Updated**: 2026-03-18

---

## Product Thesis

Every todo app shows you a list. Lists cause decision fatigue and overwhelm. DO hides the list and shows you **one task at a time**, matched to your current energy level. Built on BJ Fogg's Behavior Model and ADHD research.

**Core principles**: Anti-list, energy-first, shame-free, momentum over streaks, time perception training.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React Native + Expo 54 + TypeScript |
| UI | React Native Paper (Material Design 3) |
| Backend | Supabase (PostgreSQL + Auth + RLS) |
| State | React Context (AuthContext, TasksContext, GoalsContext) |
| Navigation | React Navigation (bottom tabs: Focus > Tasks > Goals > Profile) |
| Haptics | expo-haptics |
| Hosting | Vercel (web), manual deploy via `npx vercel --prod` |

---

## Current State

### What's Built and Working

**Foundation** (Phase 1):
- Authentication (email/password, guest mode, session persistence)
- Task CRUD with behavioral fields (difficulty, energy, time estimate, sub-tasks)
- Goal CRUD with task linking and progress bars
- Supabase integration with RLS policies

**Behavioral Features** (Phase 1.5 redesign):
1. **Focus Screen** — one-task-at-a-time, energy check, timer view, shame-free empty states
2. **Energy Matching** — Low/Steady/Wired states filter and score tasks differently
3. **Momentum Meter** — 7-day rolling bar with sparkline, never resets to zero
4. **Timer + Time Training** — elapsed vs estimated comparison after completion
5. **Completion Celebrations** — contextual snackbar + haptic, goal progress awareness
6. **All Tasks** — traditional list view as secondary tab (not default)

### Key Files

| File | Purpose |
|------|---------|
| `src/screens/FocusScreen.tsx` | **Primary surface** — energy check, one-task card, timer |
| `src/screens/TasksScreen.tsx` | Secondary list view with goal grouping |
| `src/components/EnergySelector.tsx` | "How's your energy?" UI |
| `src/components/FocusCard.tsx` | Single task recommendation card |
| `src/components/TimerView.tsx` | Active task timer with time training |
| `src/components/MomentumMeter.tsx` | Momentum bar + sparkline |
| `src/utils/recommendations.ts` | Energy-aware scoring algorithm |
| `src/utils/momentum.ts` | Momentum calculation from task history |
| `src/utils/celebrations.ts` | Celebration messages + haptics |
| `src/types/index.ts` | Task, Goal, EnergyState, MomentumData, TimerSession |
| `src/services/seedData.ts` | Guest mode onboarding seed tasks |
| `src/navigation/AppNavigator.tsx` | Focus (home) > Tasks > Goals > Profile |

### Database Schema

**Deployed migrations:**
- `001_initial_schema.sql` — profiles, goals, tasks, task_dependencies, RLS
- `002_behavioral_fields.sql` — difficulty, parent_task_id, energy_level, started_at, completed_at, skip_count

---

## Phase 2: The Brain Dump (Planned)

AI-powered task capture: free-text brain dump → AI extracts structured tasks → smart re-planning → intelligent decomposition → context memory across sessions.

**Tech addition**: Anthropic Claude API. Full spec in `PRD.md`.

---

## Development Principles

1. **Shame-free language everywhere** — no "overdue", "failed", "missed" anywhere in user-facing text
2. **Energy-first UX** — every task surface considers current energy state
3. **Anti-list by default** — Focus screen is home; Tasks list is secondary
4. **TypeScript strict** — zero type errors (`tsc --noEmit` must pass clean)
5. **Manual deploy** — web build via `npx expo export --platform web`, deploy via `npx vercel --prod`. No CI/CD.

---

## Development History

See `docs/DEVELOPMENT_LOG.md` for session-by-session history.

---

## Change Log

| Date | Change | Reason |
|------|--------|--------|
| 2025-11-12 | Initial setup | Project creation with Expo + Supabase |
| 2025-11-16 | Foundation build | Auth, CRUD, navigation, UI framework |
| 2026-02-22 | MVP behavioral features | "I Have X Minutes", celebrations, progress bars |
| 2026-02-22 | Rebrand to "DO" | GitHub-ready packaging |
| 2026-02-22 | **Thesis redesign** | Anti-list, energy-first, shame-free, momentum. New Focus screen, timer, energy selector. Competitive differentiation from Todoist/Things/Goblin.tools. |
| 2026-03-18 | Demo polish + portfolio close | App icon, favicon, logo in auth screens, feedback button, help modal, FocusCard sizing/readability, skip loop fix. All branches merged to main. |
