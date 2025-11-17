import { authService } from '../../src/services/auth';
import { supabase } from '../../src/services/supabase';

// Mock Supabase
jest.mock('../../src/services/supabase', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  },
}));

describe('Auth Service - Email Confirmation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null session when email confirmation is required', async () => {
    // Arrange: Supabase returns null session when email confirmation is required
    const mockSupabaseResponse = {
      data: {
        user: {
          id: 'user-123',
          email: 'test@example.com',
          email_confirmed_at: null, // Email not confirmed yet
        },
        session: null, // No session until email is confirmed
      },
      error: null,
    };

    (supabase.auth.signUp as jest.Mock).mockResolvedValue(mockSupabaseResponse);

    // Act
    const result = await authService.signUp({
      email: 'test@example.com',
      password: 'password123',
    });

    // Assert
    expect(result.session).toBeNull();
    expect(result.user).toBeDefined();
    expect(result.user?.email).toBe('test@example.com');
  });

  it('should return session immediately if email confirmation is disabled', async () => {
    // Arrange: Supabase returns session immediately (email confirmation disabled)
    const mockSession = {
      access_token: 'token',
      refresh_token: 'refresh',
      user: {
        id: 'user-123',
        email: 'test@example.com',
      },
    };

    const mockSupabaseResponse = {
      data: {
        user: mockSession.user,
        session: mockSession,
      },
      error: null,
    };

    (supabase.auth.signUp as jest.Mock).mockResolvedValue(mockSupabaseResponse);

    // Act
    const result = await authService.signUp({
      email: 'test@example.com',
      password: 'password123',
    });

    // Assert
    expect(result.session).toBeDefined();
    expect(result.session?.access_token).toBe('token');
  });
});
