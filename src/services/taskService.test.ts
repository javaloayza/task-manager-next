import '@testing-library/jest-dom';
import { TaskService } from './task.service';
import { Task } from '@/lib/types/task';

describe('TaskService', () => {
  let taskService: TaskService;
  
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: '1'
  };

  beforeEach(() => {
    taskService = TaskService.getInstance();
    (taskService as any).tasks = [mockTask];
  });

  /* This test case is checking the functionality of the `getTasks` method in the `TaskService` class. */
  it('should get tasks for a user', async () => {
    const tasks = await taskService.getTasks('1');
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toMatchObject({
      id: '1',
      userId: '1'
    });
  });

  /* This test case is testing the functionality of the `createTask` method in the `TaskService` class.
  It is simulating the creation of a new task with the specified title, description, and status for
  a user with the ID '1'. After creating the task, it then asserts that the title of the newly
  created task is 'New Task' and that the user ID associated with the task is '1'. This test case
  ensures that the `createTask` method behaves as expected and correctly creates a new task with the
  provided details. */
  it('should create a new task', async () => {
    const newTask = await taskService.createTask({
      title: 'New Task',
      description: 'New Description',
      status: 'pending'
    }, '1');

    expect(newTask.title).toBe('New Task');
    expect(newTask.userId).toBe('1');
  });

 /* This test case is testing the functionality of the `updateTask` method in the `TaskService` class. */
  it('should update a task', async () => {
    await taskService.updateTask({
      id: '1',
      title: 'Updated Task'
    });

    const updatedTask = await taskService.getTaskById('1');
    expect(updatedTask?.title).toBe('Updated Task');
  });

  /* The test case `it('should delete a task', async () => { ... }` is testing the functionality of the
  `deleteTask` method in the `TaskService` class. */
  it('should delete a task', async () => {
    await taskService.deleteTask('1');
    const tasks = await taskService.getTasks('1');
    expect(tasks).toHaveLength(0);
  });
});