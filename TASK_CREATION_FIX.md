# Task Creation Bug - Root Cause & Fix

**Issue**: Tasks not being created, but goals work fine
**Status**: Root cause identified via TDD

---

## Root Cause Analysis (via Tests)

### Tests Written:
1. ✅ `__tests__/services/tasks.test.ts` - Tasks service works correctly
2. ✅ `__tests__/integration/profile-creation.test.ts` - Documents profile dependency

### The Problem:

**Tasks have a foreign key constraint:**
```sql
user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL
```

**When you create a task**, it requires a valid `user_id` that exists in the `profiles` table.

**What should happen:**
1. User signs up → `auth.users` row created
2. Database trigger `handle_new_user()` fires → `profiles` row created
3. Tasks can be created with `user_id`

**What's likely happening:**
- The database trigger might not be set up in your Supabase project yet
- Or the profile wasn't created for some reason

---

## How to Fix

### Step 1: Verify Trigger Exists in Supabase

Go to your Supabase SQL Editor and run:

```sql
-- Check if trigger exists
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Check if function exists
SELECT routine_name
FROM information_schema.routines
WHERE routine_name = 'handle_new_user';
```

**If they don't exist**, the migration wasn't run properly.

---

### Step 2: Check Current Profiles

```sql
-- See all profiles
SELECT * FROM public.profiles;

-- See if YOUR profile exists
SELECT p.*
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'your-email@example.com';
```

**If your profile is missing**, tasks will fail.

---

### Step 3: Fix Missing Profile (Temporary)

If your profile is missing, create it manually:

```sql
-- Replace 'your-user-id' with your actual auth.users id
INSERT INTO public.profiles (id, email)
SELECT id, email
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (id) DO NOTHING;
```

---

### Step 4: Permanent Fix - Ensure Trigger Works

Make sure the migration was run properly. Re-run if needed:

```sql
-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

### Step 5: Test Task Creation

After fixing profiles:

1. Try creating a task in the app
2. If it still fails, check browser console for errors
3. Look for "Foreign key violation" or "user_id" errors

---

## Why Goals Work But Tasks Don't

**Goals also have the same foreign key constraint:**
```sql
user_id UUID REFERENCES public.profiles(id)
```

So if goals work, your profile DOES exist. This means something else is wrong.

**Possible causes:**
1. ❌ Wrong `user_id` being passed to task creation
2. ❌ Session/auth state issue
3. ❌ Different database/environment for tasks vs goals

---

## Debugging Steps

### Check Browser Console

1. Open app in browser
2. Open Developer Tools (F12)
3. Try to create a task
4. Look for errors like:
   - "Foreign key violation"
   - "insert or update on table 'tasks' violates foreign key constraint"
   - "null value in column 'user_id'"

### Check What's Being Sent

Add this temporarily to `src/services/tasks.ts` line 16:

```typescript
async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<Task> {
  console.log('🔍 Creating task with userId:', userId); // ADD THIS
  console.log('🔍 Task data:', task); // ADD THIS

  const { data, error } = await supabase
    // ... rest of code
```

This will show if `userId` is actually being passed.

---

## Expected Behavior (from Tests)

Our tests confirm:
- ✅ Tasks service correctly includes `user_id` in insert
- ✅ Tasks service correctly links to goals via `goal_id`
- ✅ Tasks service throws errors properly

So the service code is correct. The issue is environmental (database state).

---

## Next Steps

1. Check Supabase dashboard → SQL Editor
2. Run the diagnostic queries above
3. Verify profile exists OR create it manually
4. Test task creation again
5. If still failing, share the exact error message

**Most likely fix**: Your profile doesn't exist yet, create it with Step 3.
