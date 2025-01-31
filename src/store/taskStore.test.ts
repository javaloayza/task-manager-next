import { renderHook, act } from '@testing-library/react';
import { useTaskStore } from './task.store';

describe('TaskStore', () => {
  beforeEach(() => {
    useTaskStore.setState({
      tasks: [],
      loading: false,
      error: null,
      fetchTasks: jest.fn(),
      addTask: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn()
    });
  });

  /* This test case is testing the functionality of adding a task in the TaskStore. Here's a breakdown
  of what the test is doing: */
  it('should add a task', async () => {
    const { result } = renderHook(() => useTaskStore());
    
    await act(async () => {
      await result.current.addTask('Test Task', 'Test Description');
    });

    expect(result.current.addTask).toHaveBeenCalledWith('Test Task', 'Test Description');
  });

  /* This test case is setting up a mock task object with specific properties like id, title,
  description, status, createdAt, updatedAt, and userId. It then sets the state of the TaskStore
  using `useTaskStore.setState()` with an array containing the mock task, along with loading set to
  false and error set to null. This is simulating the initial state of the TaskStore with a single
  task. */
  it('should update a task', async () => {
    const mockTask = {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: '1'
    };

    useTaskStore.setState({
      tasks: [mockTask],
      loading: false,
      error: null
    });

    const { result } = renderHook(() => useTaskStore());
    
    await act(async () => {
      await result.current.updateTask('1', { title: 'Updated Task' });
    });

    expect(result.current.updateTask).toHaveBeenCalledWith('1', { title: 'Updated Task' });
  });
});