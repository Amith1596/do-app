# Behavioral Todo App

**Status**: Phase 1 Foundation - 85% Complete ✅
**Last Updated**: 2025-11-16

A mobile todo app based on behavioral science principles (BJ Fogg's Behavior Model) designed to improve productivity through habit formation, adaptive difficulty, and psychological triggers.

> 📋 **See [HANDOFF.md](./HANDOFF.md) for detailed development status and next steps**

## About This Project

**Purpose**: Learn Claude Code mastery while building a portfolio-worthy mobile app that applies behavioral science to task management.

**Learning Goals**:
- Master Claude Code as a power user
- Build using TDD (Test-Driven Development)
- Apply behavioral science principles to product design
- Create compelling portfolio piece for PM interviews

**What Makes This Different From Other Todo Apps**:
1. **Smart Calendar Tetris**: AI finds optimal time slots based on your energy patterns
2. **"I Have 15 Minutes"**: Get instant task recommendations based on available time and context
3. **Goal-Aligned Progress**: See how each task impacts your bigger goals in real-time
4. **Psychological Reframing**: Task reminders optimized using behavioral science
5. **Work Styles Modes**: Switch between Deep Work, Sprint, Habit modes for focused task views
6. **Predictive Intelligence**: Get warned about likely failures before they happen
7. **Dependency Intelligence**: Surface high-impact "unblocking" tasks automatically

**Behavioral Science Principles Applied**:
- Implementation Intentions ("When X happens, I will Y")
- Adaptive Difficulty (Fogg's Ability factor)
- Small Wins and celebration triggers
- Fresh Start Effect (weekly + daily temporal anchors)
- Loss Aversion & Identity Framing (psychological optimization)
- Energy-Task Matching (cognitive load management)
- Social Accountability (witnesses, pods)

---

## Tech Stack

**Frontend**: React Native + Expo + TypeScript
- Cross-platform mobile (iOS/Android)
- Expo for simplified development
- TypeScript for type safety

**Backend**: Supabase (Free Tier)
- PostgreSQL database
- Built-in authentication
- Real-time capabilities
- Generous free tier (500MB, 50K users/month)

**AI Integration**: OpenAI/Anthropic APIs
- Behavioral prompts and coaching
- Free tier available for development

**Development Tools**:
- Jest for testing (TDD approach)
- ESLint + Prettier for code quality
- Git for version control

---

## Getting Started

### Prerequisites

1. **Node.js** (v18 or higher)
   ```bash
   node --version
   ```

2. **Expo Go app** on your iPhone
   - Download from App Store: [Expo Go](https://apps.apple.com/app/expo-go/id982107779)

3. **Git** (for version control)

### Installation

1. **Clone and navigate to project**
   ```bash
   cd /Users/amithp/Documents/ai-pm-portfolio/behavioral-todo-app
   ```

2. **Install dependencies** (already done during setup)
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   This will open Expo Dev Tools in your browser and show a QR code.

4. **Open on your iPhone**
   - Open Expo Go app
   - Scan the QR code from terminal or browser
   - App will load on your phone!

---

## Running the App

### Development Mode

**Start server**:
```bash
npm start
```

**Scan QR code** with Expo Go app on iPhone.

**Hot reload** is enabled - changes appear instantly!

### Alternative Commands

```bash
npm run ios        # Open iOS simulator (requires Xcode)
npm run android    # Open Android emulator
npm run web        # Run in web browser (for quick testing)
```

---

## Installing on iPhone (No App Store Needed)

### Option 1: Expo Go (Development - Free)
- Use Expo Go app to scan QR code
- Best for development and testing
- **Current approach** while building

### Option 2: Development Build (TestFlight or Direct)
When you want to test without Expo Go:

1. **Create development build**:
   ```bash
   npm install -g eas-cli
   eas login
   eas build --profile development --platform ios
   ```

2. **Install via TestFlight** or direct download link

3. **Use without Expo Go app**

See: [Expo Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)

---

## Project Structure

```
behavioral-todo-app/
├── App.tsx                 # Main app entry
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
│
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/           # App screens
│   ├── services/          # API, Supabase, AI services
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript types
│   └── constants/         # App constants
│
├── __tests__/             # Test files
│   ├── components/
│   ├── screens/
│   └── services/
│
├── assets/                # Images, fonts, etc.
│
├── docs/                  # Additional documentation
│   └── PROJECT_BRIEF.md   # Original project brief
│
├── README.md             # This file
└── claude.md             # Claude Code context
```

---

## Development Workflow

This project follows **Test-Driven Development (TDD)**:

1. **Write test first** (red)
2. **Implement feature** (green)
3. **Refactor** (clean)
4. **Document decision** in claude.md

### Running Tests

```bash
npm test                # Run all tests
npm test -- --watch     # Run in watch mode
npm test -- --coverage  # Generate coverage report
```

---

## Features (Roadmap)

### Phase 1: Foundation & Core Intelligence ✅ In Progress
- [x] Project initialization
- [x] Basic app structure
- [x] Feature concept brainstorming (15+ unique concepts)
- [ ] Supabase setup and authentication
- [ ] Basic task CRUD with goal linking
- [ ] "I Have X Minutes" recommendation engine
- [ ] Simple dependency detection

### Phase 2: Behavioral Intelligence
- [ ] Implementation Intentions (task prompts)
- [ ] Adaptive difficulty algorithm
- [ ] Progress tracking with celebrations
- [ ] Weekly reset with reflection
- [ ] Smart Calendar Tetris (AI scheduling)
- [ ] Work Styles context switching
- [ ] Micro-goal momentum milestones
- [ ] Energy-Task Matching

### Phase 3: Advanced AI & Social
- [ ] AI-powered behavioral coaching (Psychological Reframing)
- [ ] Predictive Failure Warnings
- [ ] Habit streak tracking
- [ ] Social accountability features (Goal Witnesses, Accountability Pods)
- [ ] Data visualization with velocity tracking
- [ ] Temporal manipulation features

**Detailed feature specifications**: See `docs/FEATURE_CONCEPTS.md`

---

## Supabase Setup (Next Step)

1. **Create Supabase account**: [https://supabase.com](https://supabase.com)
2. **Create new project** (free tier)
3. **Get API keys** from project settings
4. **Add to environment**: Create `.env` file (not committed)
5. **Install client**:
   ```bash
   npm install @supabase/supabase-js
   ```

Full setup instructions in: `docs/SUPABASE_SETUP.md` (to be created)

---

## Learning Path

This project teaches Claude Code features progressively:

1. **Week 1**: Basic TDD, git workflow, custom commands
2. **Week 2**: Agents, more complex features, state management
3. **Week 3**: MCPs, worktrees, advanced features, deployment

See `docs/LEARNING_ROADMAP.md` for detailed plan (to be created)

---

## Troubleshooting

### Expo Go won't connect
- Ensure phone and computer on same WiFi
- Try tunnel mode: `npm start -- --tunnel`
- Check firewall settings

### Dependencies issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
npm run typescript:check
```

---

## Resources

**Expo Documentation**: https://docs.expo.dev/
**React Native**: https://reactnative.dev/
**Supabase**: https://supabase.com/docs
**BJ Fogg's Behavior Model**: https://behaviormodel.org/

---

## Development Notes

**Start Date**: 2025-11-12
**Developer**: Amith (Ex-Microsoft SWE → Wharton MBA → PM)
**Status**: In Development

**Learning insights and decisions are tracked in**:
- `claude.md` (project-specific)
- `../neural-vault/04_CONTEXT/project_tracking/behavioral-todo-app.md` (cross-project learnings)

---

## License

Private project for portfolio purposes.

---

## Next Steps

1. ✅ Project initialized
2. 🔄 Run `npm start` and test on iPhone
3. ⏳ Set up Supabase
4. ⏳ Implement first feature (TDD)
5. ⏳ Create custom Claude Code commands

**Current Status**: Ready for development! 🚀
