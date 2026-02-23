# Designing a Behavioral Science-Powered Todo App

**Project**: Behavioral Todo App
**Role**: Product Designer & Developer
**Timeline**: November 2025 - Present
**Status**: Phase 1 Design Complete (85% implementation)

---

## The Problem: Todo Apps Don't Help You Complete Tasks

I've tried every todo app: Todoist, Things, TickTick, Notion, Asana. They all do the same thing—**organize tasks**. They're glorified lists with bells and whistles.

But none of them actually help you **complete** those tasks.

The result? People create beautifully organized lists of things they never do. The app becomes a museum of abandoned intentions—a guilt-inducing reminder of everything they're not accomplishing.

**The core insight**: Task completion isn't a problem of organization. It's a problem of **motivation, ability, and prompting**—the three components of BJ Fogg's Behavior Model.

Traditional todo apps only address organization (a proxy for ability). They completely ignore motivation and prompting, the two factors that actually drive behavior change.

I set out to design a todo app that applies behavioral science to every interaction—from task creation to completion—to maximize the likelihood that tasks actually get done.

---

## Framework: BJ Fogg's Behavior Model

**B = MAP**

Behavior happens when three elements converge at the same moment:
1. **Motivation** (the desire to do something)
2. **Ability** (the capacity to do it)
3. **Prompt** (a trigger to do it now)

If any element is missing, the behavior won't occur. Most people blame lack of motivation, but Fogg's research shows that **ability is the most reliable lever**. It's easier to make a task tiny than to sustain high motivation.

### How I Applied B=MAP to Todo App Design

**Motivation Features**:
- Goal-aligned progress visualization (see impact in real-time)
- Micro-milestones and celebration triggers (dopamine hits for small wins)
- Social accountability witnesses (others see your progress without micromanaging)

**Ability Features**:
- Smart Calendar Tetris (AI finds optimal time slots based on your energy patterns)
- "I Have 15 Minutes" contextual recommendations (match tasks to available time/context)
- Adaptive difficulty (tasks automatically adjust based on your success rate)
- Dependency intelligence (surface "unblocking" tasks that enable the most downstream work)

**Prompt Features**:
- Psychological reframing (reminders optimized using loss aversion, identity framing, social pressure)
- Context-locked Implementation Intentions (sensor-based anchor detection: "When X happens, I will Y")
- Predictive failure warnings (ML predicts task failure before it happens)

---

## 15+ Unique Features Designed

I documented over 15 behavioral science-backed features in [FEATURE_CONCEPTS.md](./FEATURE_CONCEPTS.md). Here are the most differentiated:

### 1. Smart Calendar Tetris

**The Problem**: People don't fail because they're lazy. They fail because they schedule hard tasks when their energy is low.

**The Solution**: AI analyzes your calendar, productivity patterns, and energy levels to find the optimal time slot for each task.

**How It Works**:
- Tracks when you complete tasks (morning person? night owl?)
- Monitors meeting density (you have less energy after back-to-back meetings)
- Learns task-energy alignment (coding requires deep focus, emails don't)
- Automatically suggests: "Best time for this task: Tomorrow, 9-11am (your peak focus window)"

**Behavioral Science**: Energy-task matching increases completion rates by reducing cognitive load at the wrong times.

**Why This Matters**: No other todo app does this. They all assume you have infinite willpower. You don't.

---

### 2. "I Have 15 Minutes" Contextual Recommender

**The Problem**: You open your todo app with 15 minutes free and see 47 tasks. Analysis paralysis kicks in. You close the app and scroll Twitter instead.

**The Solution**: One button: "I have 15 minutes." The app instantly recommends the single best task for RIGHT NOW based on:
- Time available
- Current location (home, office, commute)
- Current energy level (fresh vs depleted)
- Task dependencies (what's blocking other work?)
- Upcoming deadlines

**Example**:
- 15 minutes, at coffee shop, medium energy → "Review Sarah's presentation (12 min estimated)"
- 15 minutes, on train, low energy → "Respond to 3 easy emails"
- 15 minutes, at home, high energy → "Outline blog post intro"

**Behavioral Science**: Reduces decision fatigue (major cause of procrastination) and leverages Implementation Intentions ("When I have 15 minutes, I will do the recommended task").

**Why This Matters**: Eliminates the "I don't know what to work on" excuse.

---

### 3. Psychological Reframing Engine

**The Problem**: Generic reminders are easy to ignore. "Go to gym" becomes background noise.

**The Solution**: AI rewrites task reminders using persuasion psychology—loss aversion, identity framing, social pressure, anticipated regret.

**Examples**:

| Original Task | Reframed Reminder (Loss Aversion) |
|--------------|-----------------------------------|
| "Go to gym" | "You're losing 1 of 7 chances this week to protect your health. 6 left." |
| "Call mom" | "Another day your mom won't hear from you. She won't be around forever." |
| "Review presentation" | "Every hour you delay, your confidence drops. Present unprepared or fix it now?" |

| Original Task | Reframed Reminder (Identity) |
|--------------|------------------------------|
| "Go to gym" | "Athletes train even when they don't feel like it. Are you an athlete?" |
| "Work on side project" | "Builders build. Dreamers plan. Which one are you today?" |

**Adaptive Intensity**: User sets tolerance from "Gentle nudges" → "Maximum pressure." AI learns which frameworks work best for each person.

**Escalation Protocol**: If you ignore a reminder repeatedly, it escalates:
1. Attempt 1: "30 minutes on your resume unlocks opportunities"
2. Attempt 3: "Every day without a polished resume is a day someone else gets your job"
3. Attempt 5: "Fine. Stay in your current job. Your future self will understand."

**Behavioral Science**: Losses feel 2x stronger than gains. Identity-consistent behavior is sticky. Social pressure works even when imaginary.

**Ethical Safeguards**: Users control intensity. Can pause aggressive reminders. AI doesn't target vulnerable mental states.

**Why This Matters**: This is borderline dark psychology applied to helping you, not manipulating you. No other productivity app does this.

---

### 4. Predictive Failure Warnings

**The Problem**: You realize you're going to miss a deadline when it's too late to fix it.

**The Solution**: ML model predicts task failure 3-5 days in advance based on:
- Your historical completion patterns
- Task complexity vs time remaining
- Current workload and energy trends
- Similar tasks you've failed before

**Example Alert**:
```
⚠️ High Failure Risk Detected
Task: "Finish project proposal"
Predicted outcome: 78% chance you won't finish by Friday

Why:
- You have 8 hours of work, but only 3 free hours scheduled
- You've failed similar writing tasks when you start <5 days before deadline
- Your calendar shows 6 meetings tomorrow (low focus time)

Suggested fix:
- Block 2 hours Thursday morning (your peak writing time)
- Break into 4 smaller sub-tasks (increases completion probability 40%)
- Defer two low-priority tasks to next week
```

**Behavioral Science**: Anticipated consequences change behavior. Early intervention prevents the "sunk cost fallacy" (continuing a doomed plan).

**Why This Matters**: Catches problems before they become crises. Acts like a personal productivity coach who knows your patterns.

---

### 5. Goal-Aligned Progress Visualization

**The Problem**: You complete 20 tasks but feel like you're not making progress on what matters.

**The Solution**: Every task is linked to a larger goal. As you complete tasks, you see real-time impact on goal progress.

**Visual Design**:
```
🎯 Goal: Get PM Internship (47% complete)

Recent Progress:
✅ Tailor resume for Google APM → +8% (portfolio strength)
✅ Coffee chat with Meta PM → +5% (network strength)
✅ Complete Rhythm Platform → +12% (portfolio strength)

Next High-Impact Tasks:
[ ] Write case study for Rhythm Platform → +10%
[ ] Reach out to 5 Wharton alumni at target companies → +8%
```

**Behavioral Science**: Visible progress = motivation boost. Seeing "why this task matters" increases completion rates 30-40%.

**Why This Matters**: Transforms todo list from chore collection to mission dashboard.

---

### 6. Work Styles Context Switching

**The Problem**: You're in "sprint mode" (tight deadline, high energy) but your todo list shows 100 tasks. Overwhelm.

**The Solution**: Same tasks, different views based on mental state. One button switches between:

**Deep Work Mode**: Shows only tasks requiring >30 min uninterrupted focus
**Sprint Mode**: Shows only urgent, high-impact tasks (filters out nice-to-haves)
**Habit Mode**: Shows only recurring habits/routines (exercise, reading, etc.)

**Example**:
- Monday morning, high energy → Switch to Deep Work Mode → See: "Write blog post," "Code feature X"
- Friday afternoon, low energy → Switch to Sprint Mode → See only critical deadline tasks
- Sunday evening → Switch to Habit Mode → See: "Plan week," "Review goals"

**Behavioral Science**: Context-dependent cues reduce cognitive load. Fewer visible options = less paralysis.

**Why This Matters**: Adapts to you instead of forcing you to adapt to the app.

---

### 7. Task Dependency Intelligence

**The Problem**: Some tasks are blockers. Completing them unlocks 5 other tasks. But they don't look special in a flat list.

**The Solution**: AI detects task dependencies (explicit or implicit) and surfaces "unblocking tasks" that enable the most downstream work.

**Visual Indicator**:
```
🔓 High Leverage Task
[ ] Get design feedback from Sarah

This task unlocks:
→ Finalize homepage mockup (blocked, waiting on feedback)
→ Start development (blocked, waiting on design)
→ Schedule user testing (blocked, waiting on prototype)

Impact: Completing this unblocks 3 other tasks worth 8 hours of work.
```

**Behavioral Science**: Highlighting leverage increases motivation ("this 30-min task unlocks 8 hours of progress").

**Why This Matters**: Helps you prioritize intelligently without manual dependency mapping.

---

### 8. Micro-Goal Momentum System

**The Problem**: Big goals feel overwhelming. "Write thesis" → close app, feel guilty.

**The Solution**: AI automatically breaks large goals into micro-milestones with celebration triggers at each step.

**Example**:
```
📚 Goal: Write Master's Thesis

Milestone 1: Outline (COMPLETED ✅)
→ Celebration: "You're 15% of the way there. Outline is the hardest part—it gets easier now."

Milestone 2: Write Chapter 1 Draft
→ Sub-milestones:
   [✅] Introduction paragraph (Completed!)
   [✅] Background section (Completed!)
   [ ] Methodology section (Next: 2 hours estimated)
→ Progress: 67% through Chapter 1

Milestone 3: Get advisor feedback
Milestone 4: Revisions
...
```

**Behavioral Science**: Small wins trigger dopamine. Frequent celebrations maintain motivation through long projects.

**Why This Matters**: Prevents the "abandoned big project" syndrome.

---

### 9. Social Goal Witnesses (Not Micromanagement)

**The Problem**: Accountability partners either micromanage ("Did you do it yet?") or are too hands-off.

**The Solution**: Designate "witnesses" for specific goals. They see progress updates without seeing your task list.

**Example**:
```
🎯 Goal: Launch side project
Witnesses: Alex, Jordan

They see:
- "Amith made progress: 35% → 42% this week"
- "Milestone completed: MVP design finished"

They DON'T see:
- Your individual tasks
- When you worked
- What you're behind on

Weekly digest to witnesses:
"Amith is 42% through 'Launch side project.' Completion projected: Feb 15."
```

**Behavioral Science**: Audience effect increases performance. Witnesses provide accountability without judgment.

**Why This Matters**: Social accountability that respects privacy and autonomy.

---

### 10. Implementation Intentions with Sensor Detection

**The Problem**: "I'll work out when I get home" is a vague intention. Fails 70% of the time.

**The Solution**: Context-locked Implementation Intentions using phone sensors.

**Format**: "When [detected context], I will [specific action]"

**Examples**:
- "When I arrive home (GPS), I will change into workout clothes"
- "When I open laptop between 9-10am (time + motion), I will write for 15 minutes"
- "When I finish a meeting (calendar API), I will write down one action item"

**Behavioral Science**: Implementation Intentions increase success rate 2-3x. Adding sensor detection makes them automatic.

**Why This Matters**: Turns good intentions into automatic behaviors.

---

## Additional Concepts (Not Detailed Here)

The [FEATURE_CONCEPTS.md](./FEATURE_CONCEPTS.md) document includes 10+ more concepts:
- **Fresh Start Effect triggers** (weekly, monthly, seasonal resets)
- **Commitment Contracts with stakes** (lose $20 if you don't complete goal)
- **Temporal Manipulation** (deadline compression, commitment ceremonies)
- **Energy-Task Matching** (cognitive load vs current capacity)
- **Rotating Accountability Pods** (3-4 people, weekly rotating "judge")
- **Loss Aversion Streaks** ("Don't break your 47-day streak")
- **A/B Testing Framework** (test which celebration types work best for you)

---

## What Makes This Different from Existing Todo Apps

| Feature | Todoist | Things | TickTick | This App |
|---------|---------|--------|----------|----------|
| Organize tasks | ✅ | ✅ | ✅ | ✅ |
| Set priorities | ✅ | ✅ | ✅ | ✅ |
| Track habits | ❌ | ❌ | ✅ | ✅ |
| **Smart scheduling (AI-powered)** | ❌ | ❌ | ❌ | ✅ |
| **"I have 15 min" contextual recs** | ❌ | ❌ | ❌ | ✅ |
| **Psychological reframing** | ❌ | ❌ | ❌ | ✅ |
| **Predictive failure warnings** | ❌ | ❌ | ❌ | ✅ |
| **Goal-aligned progress** | ❌ | ❌ | ❌ | ✅ |
| **Work styles modes** | ❌ | ❌ | ❌ | ✅ |
| **Dependency intelligence** | ❌ | ❌ | ❌ | ✅ |
| **Social witnesses** | ❌ | ❌ | ❌ | ✅ |

**The key difference**: Traditional apps are **task organizers**. This is a **behavior change system** that happens to organize tasks.

---

## Implementation Approach

### Tech Stack Decisions

**Frontend**: React Native + Expo + TypeScript
- **Why**: True native mobile (not just web wrapper)
- **Why Expo**: Simplified development, can test on iPhone immediately via Expo Go
- **Why TypeScript**: Helps with skill rust (haven't coded in 1 year), better autocomplete

**Backend**: Supabase (Free Tier)
- **Why**: Zero cost requirement for MVP
- **Why Supabase**: PostgreSQL (familiar from Microsoft data engineering background), built-in auth, real-time capabilities
- **Why not custom backend**: Focus on product, not infrastructure

**AI Integration**: Anthropic Claude API (with OpenAI fallback)
- **Why**: Needed for psychological reframing, contextual recommendations, predictive warnings
- **Why Claude**: Better at nuanced writing (reminders need to feel human)
- **Cost**: Free tier for development, ~$10-20/month at scale

**Development Approach**: Test-Driven Development (TDD)
- **Why**: Learning Claude Code mastery through structured practice
- **Why TDD**: Forces thinking through edge cases before coding
- **Benefit**: Portfolio piece demonstrates disciplined engineering

### Current Status

**Phase 1: Foundation (85% Complete)**
- ✅ Project initialized (React Native + Expo)
- ✅ 15+ feature concepts documented ([FEATURE_CONCEPTS.md](./FEATURE_CONCEPTS.md))
- ✅ Behavioral science principles researched and documented
- ✅ Tech stack selected and justified
- ✅ Database schema designed (goal-task linking, dependencies, productivity metrics)
- 🚧 Supabase integration (setup complete, testing in progress)
- 🚧 Basic task CRUD (create, read, update, delete)
- 🚧 User authentication flow

**Next Phases**:
- **Phase 2**: Core behavioral features (Implementation Intentions, adaptive difficulty, celebration triggers)
- **Phase 3**: AI features (psychological reframing, contextual recommendations, predictive warnings)
- **Phase 4**: Advanced features (Smart Calendar Tetris, social witnesses, dependency intelligence)

**Timeline**: Phase 1 complete by December 2025, MVP by February 2026

---

## Key Learnings & PM Insights

### 1. Behavioral Science Beats Features

Most productivity apps fail because they add more features. But **more options = more paralysis**.

The insight: **Remove decisions, add structure**. Don't give users 20 ways to organize tasks. Give them ONE smart recommendation based on behavioral science.

### 2. Motivation is Unreliable, Ability is the Lever

Product designers default to motivational features (streaks, badges, gamification). But motivation is fleeting.

**The better approach**: Make tasks so tiny that motivation doesn't matter. "Write thesis" → "Write 1 sentence of outline."

This is why "I Have 15 Minutes" is powerful—it matches task size to available ability RIGHT NOW.

### 3. AI Should Explain, Not Just Recommend

Early prototypes just recommended tasks: "Do this next." Users ignored them.

**The fix**: Show reasoning. "Best time for this task: Tomorrow 9-11am (your peak focus window based on 30 days of data)."

People trust AI more when it explains itself.

### 4. Dark Psychology Can Be Ethical

Psychological reframing uses persuasion tactics that marketers use to manipulate. Loss aversion, social pressure, identity framing—these work.

**The ethical line**: User controls intensity. They choose "Gentle nudges" vs "Maximum pressure." The psychology serves them, not an advertiser.

### 5. Mobile-First is Non-Negotiable for Habits

Tried building this as a web app first. Wrong platform. Habits require:
- Notifications (phone)
- Location awareness (phone)
- Portability (phone always with you)
- Quick interactions (phone faster than laptop)

Web apps can't compete for behavior change. Mobile is the only viable platform.

### 6. Over-Engineering is the Enemy

Initially designed 25+ features. Realized: **Shipping beats perfecting**.

**The PM lesson**: Start with 3-5 core differentiators. Get users. Learn what matters. Kill 80% of features in backlog.

---

## What's Next

### Short-Term (Phase 1 Completion)
- Finish Supabase integration
- Complete basic task CRUD with tests
- Ship MVP to TestFlight for personal use

### Mid-Term (Phase 2-3)
- Build 3-5 core behavioral features (Implementation Intentions, adaptive difficulty, goal-aligned progress)
- Integrate AI (psychological reframing, contextual recommendations)
- Dogfood: Use it daily for 30 days, document what works/doesn't work

### Long-Term (Phase 4+)
- Add advanced features (Smart Calendar Tetris, predictive warnings)
- Social features (witnesses, accountability pods)
- A/B test different celebration types (which triggers work best?)
- Public beta with Wharton MBA students (target users who struggle with overwhelm)

### If This Works
- Pivot to funded product (behavioral science + AI is under-explored in productivity)
- Partner with behavioral scientists for research validation
- Publish findings: "What actually works for task completion"

---

## Conclusion: A Todo App That Understands Humans

Every feature in this app starts with the question: **"Why do people fail to complete tasks they genuinely want to do?"**

The answer is never "they're lazy" or "they lack discipline." It's always:
- They set tasks too big (ability problem)
- They scheduled them at the wrong time (energy problem)
- They didn't feel the urgency (motivation problem)
- They forgot at the right moment (prompting problem)

Behavioral science has solutions to all of these. But no productivity app applies them systematically.

This app is designed to be the first todo app that doesn't just organize tasks—it **changes behavior**.

---

**Read the full feature concepts**: [FEATURE_CONCEPTS.md](./FEATURE_CONCEPTS.md)
**Project repository**: [GitHub](https://github.com/Amith1596/behavioral-todo-app) *(private)*
**Tech stack details**: [README.md](../README.md)

**Last Updated**: January 30, 2026
