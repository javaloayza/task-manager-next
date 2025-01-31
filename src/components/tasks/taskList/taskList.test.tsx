import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskList } from './taskList';
import { useTaskStore } from '@/store/task.store';

/* The `jest.mock('@/store/task.store', () => ({ useTaskStore: jest.fn() }));` statement is mocking the
`useTaskStore` function from the `task.store` module. This means that when the `useTaskStore`
function is imported in the test file, it will be replaced with a Jest mock function created using
`jest.fn()`. This allows you to control the behavior of the `useTaskStore` function during testing
and provide custom implementations or return values as needed. */
jest.mock('@/store/task.store', () => ({
  useTaskStore: jest.fn()
}));

describe('TaskList', () => {
  const mockTasks = [
    {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: '1'
    }
  ];

  beforeEach(() => {
    
    (useTaskStore as unknown as jest.Mock).mockImplementation(() => ({
      tasks: mockTasks,
      loading: false,
      error: null,
      fetchTasks: jest.fn()
    }));
  });

  /* The test case `it('renders task list correctly', () => { ... })` is testing the rendering behavior
  of the `TaskList` component. */
  it('renders task list correctly', () => {
    render(<TaskList />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  /* In the test case `it('shows loading state', () => { ... })`, the code is setting up a scenario
  where the `useTaskStore` function is mocked to return an object with specific properties. This mock
  implementation is used to simulate a loading state for the `TaskList` component being tested. */
  it('shows loading state', () => {
    (useTaskStore as unknown as jest.Mock).mockImplementation(() => ({
      tasks: [],
      loading: true,
      error: null,
      fetchTasks: jest.fn()
    }));

    render(<TaskList />);
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });
});