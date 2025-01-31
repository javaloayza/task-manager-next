// src/app/(protected)/tasks/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TaskForm } from '@/components/forms/taskForm/taskForm';
import { useTaskStore } from '@/store/task.store';
import { Task } from '@/lib/types/task';

interface TaskDetailPageProps {
  params: {
    id: string;
  };
}

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { tasks } = useTaskStore();

  useEffect(() => {
    const currentTask = tasks.find(t => t.id === params.id);
    if (!currentTask) {
      router.push('/tasks');
      return;
    }
    setTask(currentTask);
  }, [params.id, tasks, router]);

  if (!task) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-8">
      {isEditing ? (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Editar Tarea</h1>
          <TaskForm 
            task={task} 
            onClose={() => setIsEditing(false)} 
          />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{task.title}</h1>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Editar
            </button>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 mb-4">{task.description}</p>
            <div className="flex items-center">
              <span className={`px-2 py-1 text-sm rounded ${
                task.status === 'completed' ? 'bg-green-100 text-green-800' :
                task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {task.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}