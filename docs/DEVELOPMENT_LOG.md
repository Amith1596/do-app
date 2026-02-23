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

**New files**: `src/utils/recommendations.ts`, `src/utils/celebrations.ts`, `src/hooks/useGoalProgress.ts`, `src/components/TimePickerModal.tsx`, `src/components/RecommendationCard.tsx`, `src/components/GoalProgressBar.tsx`

**Database migration**: `supabase/migrations/002_behavioral_fields.sql` added `difficulty`, `parent_task_id`, `energy_level`, `started_at`, `completed_at`, `skip_count` to tasks table.

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

- Jest tests exist but were not maintained after behavioral features build (PRD said "do not attempt to fix")
- No push notifications (requires Expo push setup + certificates)
- No offline support (Supabase requires network)
- No dark mode (theme config exists but not polished)
- No onboarding flow
