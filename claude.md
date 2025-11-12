# Behavioral Todo App - Claude Code Context

**Project**: behavioral-todo-app
**Type**: React Native + Expo mobile app
**Status**: In Development (Phase 1)
**Started**: 2025-11-12

---

## Project Overview

A mobile todo app that applies behavioral science principles (BJ Fogg's Behavior Model) to improve productivity and habit formation. Built as both a learning project and portfolio piece.

**Dual Purpose**:
1. **Learning Goal**: Master Claude Code by building with TDD and advanced features
2. **Portfolio Goal**: Create compelling PM interview case study showing product thinking + technical execution

---

## Tech Stack & Rationale

### Frontend: React Native + Expo + TypeScript
**Why**:
- User needs true mobile app for iPhone (not just web)
- React Native = one codebase for iOS/Android
- Expo simplifies development (no Xcode needed for basic dev)
- TypeScript = better for rusty coding skills (haven't coded in 1 year)
- User understands React basics from portfolio work

### Backend: Supabase (Free Tier)
**Why**:
- Zero cost requirement
- PostgreSQL (user has SQL background as data engineer)
- Built-in auth
- Real-time capabilities for future features
- Generous free tier (500MB, 50K users)

### AI Integration: OpenAI/Anthropic APIs
**Why**:
- Free tiers available for development
- Needed for behavioral coaching features
- Can add local models later if needed

### Testing: Jest + React Native Testing Library
**Why**:
- TDD requirement from project brief
- Standard for React Native
- Good learning path for PM interviews

---

## Development Principles

### 1. Test-Driven Development (TDD)
**Always follow**:
1. Write test first (red)
2. Implement feature (green)
3. Refactor (clean)
4. Document decision in this file

**Never**:
- Write implementation before tests
- Skip tests "just this once"
- Commit untested code

### 2. Documentation
**Update after major decisions**:
- This file (claude.md) for project decisions
- `../neural-vault/04_CONTEXT/project_tracking/behavioral-todo-app.md` for learnings
- README.md for user-facing changes
- CHANGELOG.md when completing features

### 3. Git Workflow
**Commit strategy**:
- Small, focused commits
- Descriptive messages following: `type(scope): description`
- Types: feat, fix, docs, refactor, test, chore
- Always include test files in commits

**Branching**:
- `main` = stable, tested code
- `feature/[name]` = new features
- `fix/[name]` = bug fixes

### 4. Code Quality
- TypeScript strict mode enabled
- ESLint + Prettier for consistency
- No `any` types unless absolutely necessary
- Clear component and function naming

---

## Architecture Decisions

### Decision Log

#### 2025-11-12: Initial Tech Stack
**Context**: Need mobile app with AI, zero cost, rusty coding skills (1 year break)

**Options Considered**:
1. Next.js PWA - web app, mobile-like
2. React Native + Expo - true mobile
3. Flutter - new framework to learn

**Decision**: React Native + Expo + Supabase

**Rationale**:
- User specifically wants "true mobile app" to use on iPhone
- React basics already understood
- Expo allows testing via Expo Go (no complex setup)
- Supabase free tier covers all backend needs
- TypeScript helps with skill rust
- Can actually ship to TestFlight without App Store

**Trade-offs**:
- ✅ True native performance
- ✅ One codebase, two platforms
- ✅ Can install on iPhone immediately
- ❌ More complex than web (but Expo helps)
- ❌ React Native ecosystem can be tricky

---

## Feature Implementation Plan

### Phase 1: Foundation (Weeks 1-2)
**Status**: In Progress

**Goals**:
- [x] Project setup with Expo
- [x] Documentation created
- [ ] Supabase integration
- [ ] User authentication
- [ ] Basic task CRUD (Create, Read, Update, Delete)
- [ ] First TDD cycle complete
- [ ] Custom Claude Code command created

**Claude Code Learning**: Basic TDD, git workflow, custom commands

---

### Phase 2: Behavioral Features (Weeks 3-4)

**Goals**:
- [ ] Implementation Intentions (task creation flow)
- [ ] Adaptive difficulty algorithm (based on user success rate)
- [ ] Progress tracking with celebration triggers
- [ ] Weekly reset with reflection prompts
- [ ] Habit streak system

**Claude Code Learning**: Agents, complex state, worktrees

**Behavioral Science Applied**:
- **Fogg's B=MAP**: Behavior = Motivation × Ability × Prompt
- **Implementation Intentions**: Specific "when-then" task structure
- **Small Wins**: Celebrate micro-progress
- **Fresh Start Effect**: Weekly resets boost motivation

---

### Phase 3: Advanced (Week 5+)

**Goals**:
- [ ] AI behavioral coaching (GPT-4/Claude integration)
- [ ] Data visualization (progress charts)
- [ ] Social features (accountability partner)
- [ ] Custom behavioral experiments
- [ ] Export/analytics

**Claude Code Learning**: MCPs, complex integrations, deployment

---

## Current Status & Next Steps

### Completed
- ✅ Project initialized with Expo
- ✅ README.md with comprehensive docs
- ✅ claude.md with project context
- ✅ Git initialized
- ✅ Basic project structure

### In Progress
- 🔄 Setting up Supabase account and project
- 🔄 Testing Expo Go on iPhone

### Next Actions
1. Test app loads on iPhone via Expo Go
2. Set up Supabase project (free tier)
3. Install Supabase client library
4. Write first test for authentication
5. Implement authentication feature
6. Create first custom Claude Code command

---

## Development Environment

### User's Setup
- **Device**: MacBook Air M1
- **Phone**: iPhone 16
- **Skills**: Ex-Microsoft data engineer (SQL expert, Python basics, React basics)
- **Time**: Flexible/sporadic (MBA schedule)
- **Last Coded**: 1 year ago

### Considerations
- Keep setup simple (rusty skills)
- TypeScript helps with autocomplete
- Good documentation critical
- Quick feedback loops important
- Must work asynchronously

---

## Behavioral Science Reference

### BJ Fogg's Behavior Model
**B = MAP**
- **Behavior** = Motivation × Ability × Prompt
- All three must be present simultaneously

**How we apply**:
- **Motivation**: Celebration triggers, streaks, small wins
- **Ability**: Adaptive difficulty, break down tasks
- **Prompt**: Implementation intentions, timely notifications

### Implementation Intentions
**Format**: "When [situation X occurs], I will [perform behavior Y]"

**Research**: Increases success rate by 2-3x

**In app**: Task creation prompts for specific when/where/how

### Tiny Habits Method
**Formula**: Anchor + Tiny Behavior + Celebration

**In app**:
- Anchor: existing routines
- Tiny: adaptively small tasks
- Celebration: immediate positive feedback

---

## Known Issues & Blockers

None currently.

---

## Testing Strategy

### Unit Tests
- Individual functions
- React hooks
- Utility functions
- Behavioral algorithms

### Component Tests
- UI components in isolation
- User interactions
- State management

### Integration Tests
- Supabase connection
- Authentication flow
- API integrations

### E2E Tests
- Critical user flows
- Weekly reset functionality
- Data persistence

**Coverage Goal**: 80%+ for core features

---

## Performance Considerations

### Mobile-First
- Optimize bundle size
- Lazy load screens
- Efficient re-renders
- Minimize API calls

### Offline Support (Future)
- Local-first approach
- Sync when online
- Conflict resolution

---

## Portfolio Documentation

As features complete, document for portfolio:
- **Problem**: What behavioral science problem does this solve?
- **Solution**: How did you implement it?
- **Impact**: What's the expected behavior change?
- **Learning**: What did you learn?

Save in: `../neural-vault/04_CONTEXT/project_tracking/behavioral-todo-app.md`

---

## Questions & Decisions Needed

### Open Questions
1. Which AI API to use? (OpenAI vs Anthropic vs local)
2. Notification strategy? (Push vs in-app only)
3. Data visualization library?
4. Should we add social features in Phase 2 or 3?

### To Decide
- Color scheme and design system
- Onboarding flow design
- Privacy policy (since using AI APIs)

---

## Resources & References

**Expo Docs**: https://docs.expo.dev/
**React Native**: https://reactnative.dev/
**Supabase**: https://supabase.com/docs
**BJ Fogg**: https://behaviormodel.org/
**Implementation Intentions**: Gollwitzer & Sheeran (2006)
**Tiny Habits**: https://tinyhabits.com/

---

## Communication Preferences

From `../neural-vault/claude.md`:
- Consultative, present trade-offs
- Technically sharp (strong background)
- Ask clarifying questions
- Avoid over-explaining repeated tasks
- Flag when over-engineering

**For this project**:
- Explain first time doing something new
- Keep explanations concise after that
- Always validate before major refactors
- Surface decisions with pros/cons

---

**Last Updated**: 2025-11-12
**Next Review**: After Phase 1 completion

---

## Change Log

| Date | Change | Reason |
|------|--------|--------|
| 2025-11-12 | Initial setup | Project creation |
| 2025-11-12 | Tech stack selected | React Native + Expo + Supabase |
