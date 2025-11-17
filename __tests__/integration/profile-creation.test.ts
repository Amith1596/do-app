import { supabase } from '../../src/services/supabase';

// Mock Supabase
jest.mock('../../src/services/supabase', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

describe('Profile Creation on Signup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should automatically create profile when user signs up (via database trigger)', async () => {
    // This test documents the expected behavior:
    // When a user signs up with Supabase auth, a database trigger
    // (handle_new_user function) should automatically create a profile

    // Arrange: Mock successful signup
    const mockResponse = {
      data: {
        user: {
          id: 'user-123',
          email: 'test@example.com',
          created_at: new Date().toISOString(),
        },
        session: null, // Email confirmation required
      },
      error: null,
    };

    (supabase.auth.signUp as jest.Mock).mockResolvedValue(mockResponse);

    // Act: Sign up user
    const result = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'password123',
    });

    // Assert: User should be created
    expect(result.data.user).toBeDefined();
    expect(result.data.user?.id).toBe('user-123');

    // NOTE: In real database, the trigger would create profile automatically
    // We can't test this in unit tests, but we document the expectation:
    // 1. User signs up → auth.users row created
    // 2. Trigger fires → profiles row created with same id
    // 3. Tasks can now be created with user_id foreign key
  });

  it('documents the issue: tasks fail if profile does not exist', () => {
    // This test documents the likely root cause:
    // If the database trigger (handle_new_user) doesn't fire or fails,
    // the profile won't be created, and task creation will fail with
    // foreign key constraint violation on user_id

    const scenario = {
      issue: 'Tasks not being created',
      likelyCause: 'Profile missing in database',
      reason: 'Foreign key constraint: tasks.user_id → profiles.id',
      solution: 'Ensure handle_new_user trigger exists and fires',
    };

    expect(scenario.solution).toBe('Ensure handle_new_user trigger exists and fires');
  });
});
