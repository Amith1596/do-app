# TDD Workflow Guide

**Project**: Behavioral Todo App
**Status**: ✅ Jest working with Expo SDK 54
**Last Updated**: 2025-11-16

---

## Quick Start

```bash
# Run all tests
npm test

# Run tests in watch mode (auto-rerun on changes)
npm test -- --watch

# Run specific test file
npm test -- SignUpScreen

# Run with coverage
npm test -- --coverage
```

---

## TDD Cycle (Red → Green → Refactor)

### 1. 🔴 RED - Write Failing Test First

**Before writing ANY code:**
1. Identify the feature or bug to fix
2. Write a test that describes the desired behavior
3. Run the test - it should FAIL (red)
4. If it passes, the test isn't testing the right thing!

### 2. 🟢 GREEN - Make It Pass

**Write minimal code to pass the test:**
1. Implement just enough code to make the test pass
2. Don't worry about perfection yet
3. Run the test - it should PASS (green)

### 3. 🔵 REFACTOR - Clean Up

**Improve the code without changing behavior:**
1. Clean up duplication
2. Improve naming
3. Optimize structure
4. Run tests again - they should still pass

### 4. ✅ COMMIT

**Commit your working code:**
```bash
git add .
git commit -m "test(auth): add email confirmation UX"
```

**Repeat for next feature/bug.**

---

## Test Organization

```
__tests__/
├── components/       # Component tests
│   ├── TaskItem.test.tsx
│   └── AddTaskModal.test.tsx
├── screens/         # Screen tests
│   ├── SignUpScreen.test.tsx
│   └── TasksScreen.test.tsx
├── services/        # Service/API tests
│   ├── auth.test.ts
│   └── tasks.test.ts
└── integration/     # Integration tests
    └── task-creation-flow.test.tsx
```

---

## Test Patterns

### Component Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';

describe('TaskItem', () => {
  it('should toggle task when pressed', () => {
    const mockToggle = jest.fn();
    render(<TaskItem task={mockTask} onToggle={mockToggle} />);

    fireEvent.press(screen.getByText('My Task'));

    expect(mockToggle).toHaveBeenCalledWith('task-123');
  });
});
```

### Service Tests

```typescript
describe('authService', () => {
  it('should sign up user and return session', async () => {
    // Mock Supabase
    jest.mock('../services/supabase', () => ({
      supabase: {
        auth: {
          signUp: jest.fn().mockResolvedValue({
            data: { session: mockSession },
            error: null
          })
        }
      }
    }));

    const result = await authService.signUp({
      email: 'test@test.com',
      password: 'password123'
    });

    expect(result.session).toBeDefined();
  });
});
```

### Integration Tests

```typescript
describe('Task Creation Flow', () => {
  it('should create task and link to goal', async () => {
    // Render entire flow
    render(<AppWithProviders />);

    // Navigate to tasks
    fireEvent.press(screen.getByText('Tasks'));

    // Open modal
    fireEvent.press(screen.getByTestId('add-task-button'));

    // Fill form
    fireEvent.changeText(screen.getByLabelText('Task Title'), 'New Task');

    // Submit
    fireEvent.press(screen.getByText('Create'));

    // Verify task appears
    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeTruthy();
    });
  });
});
```

---

## Current Bugs to Fix (TDD)

### 1. Email Confirmation UX Bug

**Issue**: After signup, user doesn't know to check email
**Test Location**: `__tests__/screens/SignUpScreen.test.tsx`

**Test Plan**:
1. Test that signup shows "Check your email" message
2. Test that message includes email address used
3. Test that user can't proceed without confirming

### 2. Task Creation Failing

**Issue**: Tasks not being created (foreign key constraint?)
**Test Location**: `__tests__/integration/task-creation.test.tsx`

**Test Plan**:
1. Test that user profile exists after signup
2. Test that tasks can be created with user_id
3. Test error handling when profile missing

---

## Mocking Supabase

```typescript
// Mock at top of test file
jest.mock('../../services/supabase', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } }
      }))
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn()
    }))
  }
}));
```

---

## Best Practices

✅ **DO**:
- Write test first, before implementation
- Test behavior, not implementation details
- Use descriptive test names (it should...)
- Mock external dependencies (Supabase, APIs)
- Test edge cases and error states
- Keep tests simple and focused

❌ **DON'T**:
- Test implementation details (like state variables)
- Write tests after code is done
- Skip tests for "simple" code
- Test React Native internals
- Write tests that depend on each other
- Use real API calls in tests

---

## Coverage Goals

- **Services**: 90%+ coverage
- **Components**: 80%+ coverage
- **Screens**: 70%+ coverage
- **Integration**: Key user flows covered

---

## Resources

- [React Native Testing Library Docs](https://callstack.github.io/react-native-testing-library/)
- [Jest Docs](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Ready to start TDD! 🚀**
