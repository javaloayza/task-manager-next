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
  onUpdate?: () => void;
}

export const TaskForm = ({ task, onClose, onUpdate }: TaskFormProps) => {
  const { addTask, updateTask, loading } = useTaskStore();

  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || ''
    }
  });

  // Watch the current values
  const watchedTitle = watch('title');
  const watchedDescription = watch('description');

  // Check if there are changes from the original task
  const hasChanges = task 
    ? (watchedTitle !== task.title || watchedDescription !== task.description)
    : true; // Always allow changes for new task

  const onSubmit = async (data: TaskFormData) => {
    try {
      if (task) {
        await updateTask(task.id, data);
        if (onUpdate) {
          onUpdate();
        }
      } else {
        await addTask(data.title, data.description);
        if (onUpdate) {
          onUpdate();
        } else {
          onClose();
        }
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 text-base ${
            errors.title ? 'border-red-500' : ''
          }`}
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="description"
          {...register('description')}
          className={`mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 text-base ${
            errors.description ? 'border-red-500' : ''
          }`}
          rows={4}
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || !hasChanges}
          className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            !hasChanges 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};