'use client';

import { TaskForm } from '@/components/forms/taskForm/taskForm';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function CreateTaskPage() {
  const router = useRouter();

  const handleTaskCreated = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Tarea creada con éxito!',
      text: 'La tarea se ha creado correctamente.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#2563E8'
    }).then(() => {
      router.push('/tasks');
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Crear Nueva Tarea</h1>
        <TaskForm 
          onClose={() => router.push('/tasks')} 
          onUpdate={handleTaskCreated} 
        />
      </div>
    </div>
  );
}