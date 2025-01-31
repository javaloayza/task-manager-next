'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { TaskList } from '@/components/tasks/taskList/taskList';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 


/* The `export default function TasksPage() {` statement is defining a default export for a React
functional component named `TasksPage`. This component represents a page in a TypeScript React
application and is responsible for rendering the content related to tasks management. The component
includes logic to handle user authentication, display task-related elements, and provide
functionality for logging out. This component can be imported and used in other parts of the
application. */
export default function TasksPage() {
  const user = useAuthStore(state => state.user);
  const clearAuth = useAuthStore(state => state.clearAuth); 
  const router = useRouter(); 

  const logout = () => {
    clearAuth();
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/login');
  };

  if (!user) {
    return <div className="p-8">No hay usuario autenticado</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Tareas</h1>
        <div className='flex items-center gap-2'>
          <Link
            href="/tasks/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors "
          >
            Nueva Tarea
          </Link>
          <button 
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Salir
          </button>
        </div>
      </div>

      <TaskList />
    </div>
  );
}