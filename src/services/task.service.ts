import { Task, CreateTaskInput, UpdateTaskInput } from '@/lib/types/task';
import tasksData from '@/data/tasks.json';

export class TaskService {
  private static instance: TaskService;
  private tasks: Task[];

  private constructor() {
    this.tasks = tasksData.tasks.map(task => ({
      ...task,
      status: task.status as "in_progress" | "completed" | "pending"
    }));
  }

  public static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

  async getTasks(userId: string): Promise<Task[]> {
    return this.tasks.filter(task => task.userId === userId);
  }

  async getTaskById(id: string): Promise<Task | undefined> {
    return this.tasks.find(task => task.id === id);
  }

  async createTask(input: CreateTaskInput, userId: string): Promise<Task> {
    const newTask: Task = {
      id: Date.now().toString(),
      ...input,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.tasks.push(newTask);
    return newTask;
  }

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

  async deleteTask(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) throw new Error('Task not found');
    this.tasks.splice(taskIndex, 1);
  }
}