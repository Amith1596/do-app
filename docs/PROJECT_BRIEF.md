# Project: Learn Claude Code by Building a Behavioral Science To-Do App

## My Goals
1. Master Claude Code as a power user
2. Build a unique to-do app based on behavioral science (BJ Fogg's Behavior Model, habit formation)
3. Prepare for PM interviews by learning best practices
4. Create portfolio-worthy project

## My Background
- Programming level: Intermediate (ex-Microsoft data engineer, 1 year coding break)
- Known languages/frameworks: SQL (expert), Python (basics), JavaScript/React (basics), TypeScript (learning)
- Time available: Flexible/sporadic (2-3 hours when available, MBA schedule)

## What I Need You To Do

**Phase 1: Setup (Use plan mode)**
1. Help me choose the best tech stack for learning + building this app
2. Create/update `claude.md` with project rules, git workflow, and architecture decisions
3. Set up project structure with testing framework
4. Give me a 3-week learning roadmap that teaches Claude Code features progressively

**Phase 2: Build Features Using TDD**
For each feature:
- Write tests first
- Implement the feature
- Update `claude.md` with decisions
- Teach me one Claude Code capability (custom commands, agents, MCPs, worktrees)

**Features to build:**
1. User authentication
2. Task creation with behavioral prompts (implementation intentions: "When X happens, I will Y")
3. Adaptive difficulty based on user success rate (Fogg's Ability factor)
4. Progress tracking with celebration triggers (Small Wins principle)
5. Weekly reset with reflection (Fresh Start Effect)

**Phase 3: Advanced**
- Create custom command for adding behavior features
- Set up specialized "UX Behavioral Reviewer" agent
- Integrate relevant MCP (suggest which one)
- Use git worktrees for parallel development
- Generate full documentation

## Your Operating Rules
- Always use TDD (tests before implementation)
- Update `claude.md` after major decisions
- Use Sonnet Plan Mode by default
- Use Opus 4.1 for complex architecture or documentation
- Ask before major refactors
- Generate changelogs for each feature

## Requirements & Constraints

### Must Have
- **Mobile app**: True mobile app for iPhone (not just web/PWA)
- **Installable**: Can be installed on iPhone without App Store (Expo Go or TestFlight)
- **Zero cost**: Free development and deployment
- **AI/ML integration**: Ability to use intelligent systems for behavioral insights
- **Usable by me**: Not just a demo, but actually functional for personal use

### Tech Stack (Decided)
- **Frontend**: React Native + Expo + TypeScript
- **Backend**: Supabase (free tier)
- **AI**: OpenAI/Anthropic APIs (free tier)
- **Testing**: Jest + React Native Testing Library
- **Deployment**: Expo Go (dev) → EAS Build (production)

### Behavioral Science Principles to Apply

#### BJ Fogg's Behavior Model (B=MAP)
- **Behavior** = Motivation × Ability × Prompt
- All three elements must converge at same moment

#### Implementation Intentions
- Format: "When [situation], I will [behavior]"
- 2-3x increase in success rate
- Built into task creation flow

#### Adaptive Difficulty (Fogg's Ability)
- Track user success rate
- Adjust task size/complexity based on performance
- Make tasks easier when struggling
- Increase challenge when succeeding

#### Small Wins Principle
- Celebrate micro-progress
- Immediate positive feedback
- Build momentum and motivation

#### Fresh Start Effect
- Weekly resets for new beginnings
- Reflection prompts
- Clear temporal landmarks
- Boost motivation through "new start"

## First Task
Review this brief, ask me clarifying questions, then create our initial setup plan.

## Status

### ✅ Completed
- Tech stack selection
- Project initialization with Expo
- Documentation structure (README, claude.md, this brief)
- Git repository initialized
- Basic Expo app running

### 🔄 In Progress
- Testing on iPhone via Expo Go
- Neural vault tracking setup

### ⏳ Next Steps
1. Test app on iPhone
2. Set up Supabase
3. Write first test (authentication)
4. Implement first feature (TDD)
5. Create first custom command

## Learning Roadmap (3 Weeks)

### Week 1: Foundations
**Goals**: TDD, Git, Custom Commands
**Features**: Auth, Basic CRUD
**Claude Code**: Custom commands, basic TDD workflow

### Week 2: Behavioral Features
**Goals**: Complex state, agents
**Features**: Implementation intentions, adaptive difficulty
**Claude Code**: Agents, worktrees, advanced testing

### Week 3: Advanced
**Goals**: AI integration, deployment
**Features**: Behavioral coaching, analytics
**Claude Code**: MCPs, deployment automation, documentation generation

## Questions Asked & Answered

**Q**: What tech stack?
**A**: React Native + Expo (mobile-first, zero cost, can install on iPhone)

**Q**: Programming level?
**A**: Intermediate (ex-data engineer, 1 year break)

**Q**: Time commitment?
**A**: Flexible/sporadic (MBA schedule)

**Q**: Web or mobile?
**A**: True mobile app, must work on iPhone

**Q**: Cost constraints?
**A**: Zero cost for dev and deployment

**Q**: AI requirements?
**A**: Need ML/intelligent systems for behavioral insights

---

**Created**: 2025-11-12
**Last Updated**: 2025-11-12
