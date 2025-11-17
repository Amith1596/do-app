import { tasksService } from '../../src/services/tasks';
import { supabase } from '../../src/services/supabase';

// Mock Supabase
jest.mock('../../src/services/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe('Tasks Service - Create Task', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a task with user_id', async () => {
    // Arrange: Mock Supabase response
    const mockTask = {
      id: 'task-123',
      user_id: 'user-456',
      title: 'Buy groceries',
      description: 'Milk, eggs, bread',
      completed: false,
      goal_id: null,
      due_date: null,
      estimated_minutes: null,
      priority: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const mockSupabaseChain = {
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockTask, error: null }),
    };

    (supabase.from as jest.Mock).mockReturnValue(mockSupabaseChain);

    // Act: Create task
    const result = await tasksService.createTask(
      {
        title: 'Buy groceries',
        description: 'Milk, eggs, bread',
        completed: false,
      },
      'user-456'
    );

    // Assert: Should call Supabase with correct user_id
    expect(supabase.from).toHaveBeenCalledWith('tasks');
    expect(mockSupabaseChain.insert).toHaveBeenCalledWith([
      {
        title: 'Buy groceries',
        description: 'Milk, eggs, bread',
        completed: false,
        user_id: 'user-456',
        goal_id: null,
        due_date: null,
        estimated_minutes: null,
        priority: null,
      },
    ]);
    expect(result).toEqual(mockTask);
  });

  it('should link task to goal when goalId provided', async () => {
    // Arrange
    const mockTask = {
      id: 'task-123',
      user_id: 'user-456',
      goal_id: 'goal-789',
      title: 'Complete assignment',
      completed: false,
    };

    const mockSupabaseChain = {
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockTask, error: null }),
    };

    (supabase.from as jest.Mock).mockReturnValue(mockSupabaseChain);

    // Act
    const result = await tasksService.createTask(
      {
        title: 'Complete assignment',
        completed: false,
        goalId: 'goal-789',
      },
      'user-456'
    );

    // Assert: Should include goal_id in insert
    expect(mockSupabaseChain.insert).toHaveBeenCalledWith([
      expect.objectContaining({
        goal_id: 'goal-789',
        user_id: 'user-456',
      }),
    ]);
  });

  it('should throw error when Supabase returns error', async () => {
    // This test verifies proper error handling
    const mockError = { message: 'Foreign key violation on user_id', code: '23503' };

    const mockSupabaseChain = {
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: null,
        error: mockError,
      }),
    };

    (supabase.from as jest.Mock).mockReturnValue(mockSupabaseChain);

    // Act & Assert: Should throw the error
    await expect(
      tasksService.createTask(
        {
          title: 'Test task',
          completed: false,
        },
        'user-456'
      )
    ).rejects.toEqual(mockError);
  });
});
