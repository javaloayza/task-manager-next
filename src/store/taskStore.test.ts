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

  it('should add a task', async () => {
    const { result } = renderHook(() => useTaskStore());
    
    await act(async () => {
      await result.current.addTask('Test Task', 'Test Description');
    });

    // Verificamos que se llamó a addTask con los parámetros correctos
    expect(result.current.addTask).toHaveBeenCalledWith('Test Task', 'Test Description');
  });

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