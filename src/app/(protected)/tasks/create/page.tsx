// src/app/(protected)/tasks/create/page.tsx
'use client';

import { TaskForm } from '@/components/forms/taskForm/taskForm';
import { useRouter } from 'next/navigation';

export default function CreateTaskPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/tasks');
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Crear Nueva Tarea</h1>
        <TaskForm onClose={handleClose} />
      </div>
    </div>
  );
}