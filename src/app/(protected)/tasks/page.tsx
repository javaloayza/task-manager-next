'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { TaskList } from '@/components/tasks/taskList/taskList';
import { TaskForm } from '@/components/forms/taskForm/taskForm';

export default function TasksPage() {
  const [isCreating, setIsCreating] = useState(false);
  const user = useAuthStore(state => state.user);

  if (!user) {
    return <div className="p-8">No hay usuario autenticado</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Tareas</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Nueva Tarea
        </button>
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Crear Nueva Tarea</h2>
            <TaskForm onClose={() => setIsCreating(false)} />
          </div>
        </div>
      )}

      <TaskList />
    </div>
  );
}