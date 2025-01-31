import { Task, CreateTaskInput, UpdateTaskInput } from '@/lib/types/task';
import tasksData from '@/data/tasks.json';

export class TaskService {
  private static instance: TaskService;
  private tasks: Task[];

/**
 * The private constructor function initializes tasks with status values as "in_progress", "completed",
 * or "pending".
 */
  private constructor() {
    this.tasks = tasksData.tasks.map(task => ({
      ...task,
      status: task.status as "in_progress" | "completed" | "pending"
    }));
  }

/**
 * The getInstance method returns a single instance of TaskService using the Singleton design pattern.
 * @returns The `TaskService` instance is being returned.
 */
  public static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

  /**
   * The function `getTasks` retrieves tasks associated with a specific user ID asynchronously.
   * @param {string} userId - The `userId` parameter is a string that represents the unique identifier
   * of a user. It is used to filter tasks based on the user to retrieve tasks associated with that
   * specific user.
   * @returns An array of tasks that belong to the specified user ID.
   */
  async getTasks(userId: string): Promise<Task[]> {
    return this.tasks.filter(task => task.userId === userId);
  }

  /**
   * This TypeScript function asynchronously retrieves a task by its ID from a collection of tasks.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
   * task.
   * @returns The `getTaskById` function is returning a Promise that resolves to a `Task` object or
   * `undefined`.
   */
  async getTaskById(id: string): Promise<Task | undefined> {
    return this.tasks.find(task => task.id === id);
  }

  /**
   * The function `createTask` creates a new task with the provided input and user ID, assigns
   * timestamps for creation and update, and adds it to the tasks array.
   * @param {CreateTaskInput} input - The `input` parameter in the `createTask` function 
   * represents the data needed to create a new task. This could include properties such as the task
   * title, description, due date, priority, etc. The exact structure of the `CreateTaskInput` type
   * would depend on the requirements of your
   * @param {string} userId - The `userId` parameter in the `createTask` function represents the unique
   * identifier of the user for whom the task is being created. This identifier is used to associate
   * the task with the specific user in the system.
   * @returns The `createTask` function returns a Promise that resolves to a `Task` object representing
   * the newly created task.
   */
  async createTask(input: CreateTaskInput, userId: string): Promise<Task> {
    const newTask: Task = {
      id: Date.now().toString(),
      ...input,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.tasks.unshift(newTask);
    return newTask;
  }

  /**
  * The function `updateTask` updates a task in an array based on the input provided and returns the
  * updated task.
  * @param {UpdateTaskInput} input - UpdateTaskInput: {
  * @returns The `updateTask` function is returning the updated task object from the `this.tasks` array
  * after updating its properties with the input values and setting the `updatedAt` field to the
  * current date and time.
  */
  async updateTask(input: UpdateTaskInput): Promise<Task> {
    const taskIndex = this.tasks.findIndex(task => task.id === input.id);
    if (taskIndex === -1) throw new Error('Task not found');

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...input,
      updatedAt: new Date().toISOString()
    };

    return this.tasks[taskIndex];
  }

  /**
  * The function `deleteTask` asynchronously removes a task from an array of tasks based on its ID.
  * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
  * task that needs to be deleted.
  */
  async deleteTask(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) throw new Error('Task not found');
    this.tasks.splice(taskIndex, 1);
  }
}