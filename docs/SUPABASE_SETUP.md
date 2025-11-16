# Supabase Setup Guide

## Overview
This app uses Supabase for backend services (database, authentication, real-time features).

## Prerequisites
- Supabase account (free tier: https://supabase.com)
- Project created in Supabase dashboard

## Setup Steps

### 1. Create Supabase Project
1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in:
   - **Name**: behavioral-todo-app (or your preference)
   - **Database Password**: Generate strong password (save this!)
   - **Region**: Choose closest to you
4. Wait for project to provision (~2 minutes)

### 2. Get API Credentials
1. In Supabase dashboard, go to **Settings** > **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### 3. Configure Environment Variables
1. Create `.env` file in project root:
```bash
EXPO_PUBLIC_SUPABASE_URL=your_project_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

2. Add to `.gitignore` (already done):
```
.env
```

### 4. Run Database Migrations
1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and click **Run**
5. Verify tables created in **Table Editor**

Expected tables:
- `profiles` - User profiles
- `goals` - User goals
- `tasks` - User tasks
- `task_dependencies` - Task dependency graph

### 5. Install Supabase Client
Already installed via:
```bash
npm install @supabase/supabase-js
```

### 6. Test Connection
After setting up `.env`, the app will automatically connect.

Check connection in app:
1. Run `npm start`
2. Open app on phone/simulator
3. Try signing up with email/password
4. Check Supabase dashboard > Authentication > Users

## Database Schema

### Tables

#### profiles
- `id` (UUID, PK) - References auth.users
- `email` (TEXT, UNIQUE)
- `name` (TEXT, nullable)
- `created_at`, `updated_at` (TIMESTAMP)

#### goals
- `id` (UUID, PK)
- `user_id` (UUID, FK to profiles)
- `title` (TEXT)
- `description` (TEXT, nullable)
- `target_date` (TIMESTAMP, nullable)
- `color` (TEXT, nullable)
- `created_at`, `updated_at` (TIMESTAMP)

#### tasks
- `id` (UUID, PK)
- `user_id` (UUID, FK to profiles)
- `goal_id` (UUID, FK to goals, nullable)
- `title` (TEXT)
- `description` (TEXT, nullable)
- `completed` (BOOLEAN, default false)
- `due_date` (TIMESTAMP, nullable)
- `estimated_minutes` (INTEGER, nullable)
- `priority` ('low' | 'medium' | 'high', nullable)
- `created_at`, `updated_at` (TIMESTAMP)

#### task_dependencies
- `id` (UUID, PK)
- `task_id` (UUID, FK to tasks)
- `depends_on_task_id` (UUID, FK to tasks)
- `created_at` (TIMESTAMP)
- UNIQUE constraint on (task_id, depends_on_task_id)
- CHECK constraint prevents self-dependencies

### Row Level Security (RLS)
All tables have RLS enabled. Users can only access their own data.

### Triggers
- Auto-update `updated_at` on all tables
- Auto-create profile when user signs up

## Free Tier Limits
- **Database**: 500 MB
- **Storage**: 1 GB
- **Bandwidth**: 5 GB
- **Monthly Active Users**: 50,000
- **API Requests**: Unlimited

More than enough for development and MVP!

## Troubleshooting

### Can't connect to Supabase
- Check `.env` file exists and has correct values
- Restart Expo server after adding `.env`
- Verify URL starts with `https://`
- Verify anon key is the PUBLIC key (not service_role)

### RLS errors (can't read/write data)
- Check user is authenticated
- Verify RLS policies are created (run migration again)
- Check user_id matches auth.uid() in queries

### Migration failed
- Check for syntax errors in SQL
- Try running sections separately
- Check Supabase dashboard logs

## Next Steps
After setup complete:
1. Test authentication flow
2. Create sample tasks/goals in app
3. Verify data appears in Supabase dashboard
4. Set up real-time subscriptions (future feature)

## Resources
- [Supabase Docs](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
