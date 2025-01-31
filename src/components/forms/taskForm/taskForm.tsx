'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTaskStore } from '@/store/task.store';
import { Task } from '@/lib/types/task';

const taskSchema = z.object({
  title: z.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(50, 'El título no debe exceder los 50 caracteres'),
  description: z.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(200, 'La descripción no debe exceder los 200 caracteres')
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

export const TaskForm = ({ task, onClose }: TaskFormProps) => {
  const { addTask, updateTask, loading } = useTaskStore();

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || ''
    }
  });

  const onSubmit = async (data: TaskFormData) => {
    try {
      if (task) {
        await updateTask(task.id, data);
      } else {
        await addTask(data.title, data.description);
      }
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          aria-label="Título"
          className={`mt-1 block w-full rounded-md px-3 py-2 border ${
            errors.title ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descripción <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          {...register('description')}
          aria-label="Descripción"
          rows={3}
          className={`mt-1 block w-full rounded-md px-3 py-2 border ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : task ? 'Guardar Cambios' : 'Crear Tarea'}
        </button>
      </div>
    </form>
  );
};