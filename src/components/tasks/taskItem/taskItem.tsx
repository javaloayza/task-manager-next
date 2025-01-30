'use client';

import { Task } from '@/lib/types/task';
import { useTaskStore } from '@/store/task.store';

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const { updateTask, deleteTask } = useTaskStore();

  const handleStatusChange = async (newStatus: Task['status']) => {
    await updateTask(task.id, { status: newStatus });
  };

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      await deleteTask(task.id);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow group">
      <div className="flex justify-between">
        <h3 className="font-semibold">{task.title}</h3>
        <button
          onClick={handleDelete}
          className="text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Eliminar
        </button>
      </div>
      <p className="text-gray-600">{task.description}</p>
      <div className="mt-2 flex items-center justify-between">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
          className="text-sm border rounded-md px-2 py-1"
        >
          <option value="pending">Pendiente</option>
          <option value="in_progress">En Progreso</option>
          <option value="completed">Completado</option>
        </select>
        <span className={`px-2 py-1 text-sm rounded ${
          task.status === 'completed' ? 'bg-green-100 text-green-800' :
          task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {task.status}
        </span>
      </div>
    </div>
  );
};