import { create } from 'zustand';
import { Task } from '@/lib/types/task';
import { TaskService } from '@/services/task.service';

/* The `interface TaskState` is defining the structure of the state that will be managed by the
`useTaskStore` zustand store. It includes the following properties and methods: */
interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (title: string, description: string) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  /* The `fetchTasks` function in the `useTaskStore` zustand store is responsible for fetching tasks
  asynchronously. Here's a breakdown of what it does: */
  fetchTasks: async () => {
    try {
      set({ loading: true, error: null });
      const taskService = TaskService.getInstance();
      const userId = '1'; // Por ahora hardcodeado, luego lo tomaremos del auth store
      const tasks = await taskService.getTasks(userId);
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: 'Error al cargar las tareas', loading: false });
    }
  },

  /* The `addTask` function in the `useTaskStore` zustand store is responsible for adding a new task
  asynchronously. Here's a breakdown of what it does: */
  addTask: async (title: string, description: string) => {
    try {
      set({ loading: true, error: null });
      const taskService = TaskService.getInstance();
      const userId = '1';
      const newTask = await taskService.createTask(
        { title, description, status: 'pending' },
        userId
      );
      set(state => ({ 
        tasks: [newTask, ...state.tasks],
        loading: false 
      }));
    } catch (error) {
      set({ error: 'Error al crear la tarea', loading: false });
    }
  },

  /* The `updateTask` function in the `useTaskStore` zustand store is responsible for updating a task
  asynchronously. Here's a breakdown of what it does: */
  updateTask: async (id: string, updates: Partial<Task>) => {
    try {
      set({ loading: true, error: null });
      const taskService = TaskService.getInstance();
      const updatedTask = await taskService.updateTask({ id, ...updates });
      set(state => ({
        tasks: state.tasks.map(task => 
          task.id === id ? updatedTask : task
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Error al actualizar la tarea', loading: false });
    }
  },

  /* The `deleteTask` function in the `useTaskStore` zustand store is responsible for deleting a task
 asynchronously. Here's a breakdown of what it does: */
  deleteTask: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const taskService = TaskService.getInstance();
      await taskService.deleteTask(id);
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Error al eliminar la tarea', loading: false });
    }
  },
}));