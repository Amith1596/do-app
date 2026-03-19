# Development Log

Historical record of development decisions, blockers, and resolutions during the build of DO (formerly "bloom" / "behavioral-todo-app").

---

## Timeline

### Session 1: Foundation Build (2025-11-16)

**Built in one autonomous session (~92k tokens):**
- React Native + Expo 54 project structure
- Supabase integration (client, schema, RLS policies)
- Authentication system (login, signup, session persistence, guest mode)
- Task CRUD (create, read, update, delete, toggle, edit)
- Goal CRUD with task linking
- Bottom tab navigation (Tasks, Goals, Profile)
- React Native Paper (Material Design 3) UI
- Context-based state management (AuthContext, TasksContext, GoalsContext)

**Phase 1 completion: ~90%** (missing "I Have X Minutes" recommender and task dependencies)

### Session 2: Jest Resolution (2025-11-16)

**Blocker**: Jest tests failed with Expo 54 "winter runtime" error.
```
ReferenceError: You are trying to `import` a file outside of the scope of the test code.
at Runtime._execModule (node_modules/jest-runtime/build/index.js:1216:13)
at require (node_modules/expo/src/winter/runtime.native.ts:20:43)
```

**Root cause**: Project had Jest 30.x, but Expo SDK 54 requires Jest 29.x.

**Fix**:
```bash
npm install --save-dev jest@29.7.0 jest-expo@~54.0.12
npm test -- --clearCache
```

**Lesson**: Always match Jest version to Expo's recommendations. The Expo upgrade guide explicitly states Jest ~29.7.x for SDK 54.

### Session 3: TDD Bug Fixes (2025-11-17)

Used TDD to identify and fix task creation bug:
- **Root cause**: Foreign key constraint on `tasks.user_id` referencing `profiles.id`. The `handle_new_user()` database trigger needed to exist for profile auto-creation on signup.
- **Fix**: Verified trigger exists, created manual profile insert as fallback.

### Session 4: MVP Behavioral Features (2026-02-22)

Built 5 behavioral features on top of the existing CRUD foundation:
1. "I Have X Minutes" contextual recommender
2. Enhanced task creation with behavioral scaffolding (time chips, difficulty, "make it tiny")
3. Goal progress visualization
4. Task completion celebrations with haptic feedback
5. Quick Add FAB

**New files**: `src/utils/recommendations.ts`, `src/utils/celebrations.ts`, `src/hooks/useGoalProgress.ts`, `src/components/TimePickerModal.tsx`, `src/components/GoalProgressBar.tsx`

**Database migration**: `supabase/migrations/002_behavioral_fields.sql` added `difficulty`, `parent_task_id`, `energy_level`, `started_at`, `completed_at`, `skip_count` to tasks table.

### Session 5: Thesis Redesign (2026-02-22)

Rewrote the product thesis and rebuilt the Focus screen from scratch. Shifted from "I Have X Minutes" (list-based recommender) to a true anti-list paradigm: one task at a time, energy-first.

**Key changes:**
- New `FocusScreen` — shows a single `FocusCard` instead of a filtered list
- `EnergySelector` component — "How's your energy?" (Low / Steady / Wired) gates the Focus screen
- `TimerView` — elapsed vs. estimated time comparison with shame-free messaging
- `MomentumMeter` — 7-day rolling momentum bar with sparkline, never resets to zero
- Energy-aware scoring in `recommendations.ts` — Low energy only surfaces easy/short tasks, Wired boosts hard tasks
- Context batching — completing a goal-linked task boosts other tasks under the same goal
- Seed data onboarding — 5 tasks that teach features by making you use them
- Shame-free language throughout (no "overdue", "failed", or "missed")

**Replaced**: `RecommendationCard.tsx` with `FocusCard.tsx` (card-based single-task UX instead of list item).

### Session 6: Visual Polish (2026-03-04)

Timer fixes, visual polish pass across all screens.

### Session 7: Demo Quick Wins (2026-03-10 to 2026-03-15)

Prepared the app for portfolio demos and live walkthroughs.

**Changes:**
- Updated app icon and favicon to match DO brand identity
- Integrated app logo into login, signup, and header screens
- Added in-app feedback button (links to external form)
- Added help modal explaining how the app works
- Improved FocusCard sizing and text readability
- Fixed circular skip loop — skipping all tasks no longer causes an infinite cycle; the engine resets and re-recommends the best task

### Session 8: Portfolio Close (2026-03-18)

Merged all feature branches into main. Verified web build and TypeScript. Cleaned up 3 stale branches (local + remote). Updated documentation.

---

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| UI framework | React Native Paper | Material Design 3, comprehensive components, good TS support |
| State management | React Context | Simple scoped contexts (Auth, Tasks, Goals), no Redux needed yet |
| Backend | Supabase free tier | PostgreSQL, built-in auth, RLS, generous free tier |
| Testing | Jest 29 + RTL | Standard for RN; was blocked by version mismatch, now resolved |
| Task recommendation | Local scoring algorithm | No AI API needed; scores by due date proximity, goal linkage, priority, time fit |

---

## Known Limitations

- **Tests**: Jest config exists but tests were not maintained after the behavioral features build. Expo 54's runtime changes made the test setup fragile. Not worth fixing until Phase 2.
- **No push notifications**: Requires Expo push setup + Apple certificates. Not needed for web-first deployment.
- **No offline support**: All data flows through Supabase. No local cache or sync.
- **No dark mode**: Theme config exists in `src/theme/` but only the light palette is polished.
- **Web-only deployment**: Built with React Native for cross-platform, but only the web export is deployed (Vercel). Native builds (iOS/Android) are untested beyond Expo Go.
- **No CI/CD**: Builds and deploys are manual (`npx expo export`, `npx vercel --prod`). No automated type checking or linting in pipeline.
