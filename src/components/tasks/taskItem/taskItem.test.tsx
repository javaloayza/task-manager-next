import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskItem } from './taskItem';
import { useTaskStore } from '@/store/task.store';
import Swal from 'sweetalert2';

jest.mock('@/store/task.store', () => ({
  useTaskStore: jest.fn()
}));

describe('TaskItem', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: '1'
  };

  const mockUpdateTask = jest.fn();
  const mockDeleteTask = jest.fn();

  beforeEach(() => {
    (useTaskStore as unknown as jest.Mock).mockImplementation(() => ({
      updateTask: mockUpdateTask,
      deleteTask: mockDeleteTask
    }));
  });

  /* The test case `it('renders task details correctly', () => { ... }` is testing the rendering of a
  `TaskItem` component with the provided `mockTask` data. It checks if the component correctly
  displays the task title ('Test Task') and description ('Test Description') by asserting that these
  elements are present in the rendered output using the `screen.getByText` method from
  `@testing-library/react`. If both the title and description are found in the rendered component,
  the test case passes. */
  it('renders task details correctly', () => {
    render(<TaskItem task={mockTask} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  /* The test case `it('handles status change', () => { ... }` is testing the behavior of the
  `TaskItem` component when the status of a task is changed. */
  it('handles status change', () => {
    render(<TaskItem task={mockTask} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'completed' } });
    expect(mockUpdateTask).toHaveBeenCalledWith(mockTask.id, { status: 'completed' });
  });

  /* The test case `it('handles delete confirmation', () => { ... }` is testing the behavior of the
  `TaskItem` component when a delete action is triggered. */
  it('handles delete confirmation', async () => {
    jest.spyOn(Swal, 'fire').mockResolvedValueOnce({ isConfirmed: true } as any);

    render(<TaskItem task={mockTask} />);
    const deleteButton = screen.getByText('❌');
    fireEvent.click(deleteButton);

    expect(Swal.fire).toHaveBeenCalled();
    await screen.findByText('Eliminado'); 
    expect(mockDeleteTask).toHaveBeenCalledWith(mockTask.id);

    jest.restoreAllMocks();
  });
});