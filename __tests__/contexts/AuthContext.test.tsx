import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../../src/contexts/AuthContext';
import { authService } from '../../src/services/auth';

// Mock auth service
jest.mock('../../src/services/auth', () => ({
  authService: {
    signUp: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
    getSession: jest.fn(),
    onAuthStateChange: jest.fn(() => ({
      data: { subscription: { unsubscribe: jest.fn() } },
    })),
  },
}));

describe('AuthContext - Email Confirmation Behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (authService.getSession as jest.Mock).mockResolvedValue(null);
  });

  it('should handle signup with email confirmation required (null session)', async () => {
    // Arrange: Mock Supabase returning null session (email confirmation required)
    const mockResponse = {
      user: {
        id: 'user-123',
        email: 'test@example.com',
      },
      session: null, // No session - email confirmation required
    };

    (authService.signUp as jest.Mock).mockResolvedValue(mockResponse);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Act: Sign up
    await act(async () => {
      await result.current.signUp('test@example.com', 'password123');
    });

    // Assert: Session should be null (user needs to confirm email)
    await waitFor(() => {
      expect(result.current.session).toBeNull();
    });

    // Verify signUp was called
    expect(authService.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      name: undefined,
    });
  });

  it('should handle signup with immediate session (no email confirmation)', async () => {
    // Arrange: Mock Supabase returning session immediately
    const mockSession = {
      access_token: 'token-123',
      user: {
        id: 'user-123',
        email: 'test@example.com',
      },
    };

    const mockResponse = {
      user: mockSession.user,
      session: mockSession,
    };

    (authService.signUp as jest.Mock).mockResolvedValue(mockResponse);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Act: Sign up
    await act(async () => {
      await result.current.signUp('test@example.com', 'password123');
    });

    // Assert: Session should be set
    await waitFor(() => {
      expect(result.current.session).toBeDefined();
      expect(result.current.session?.access_token).toBe('token-123');
    });
  });
});
