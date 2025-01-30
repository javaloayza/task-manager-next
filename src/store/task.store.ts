import { create } from 'zustand';
import { Task } from '@/lib/types/task';
import { TaskService } from '@/services/task.service';

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
        tasks: [...state.tasks, newTask],
        loading: false 
      }));
    } catch (error) {
      set({ error: 'Error al crear la tarea', loading: false });
    }
  },

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