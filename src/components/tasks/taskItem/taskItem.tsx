'use client';

import { Task } from '@/lib/types/task';
import { useTaskStore } from '@/store/task.store';
import Link from 'next/link';
import Swal from 'sweetalert2';

interface TaskItemProps {
  task: Task;
}

/* The code `export const TaskItem = ({ task }: TaskItemProps) => {` is defining a functional component
named `TaskItem` that takes a single prop `task` of type `TaskItemProps`. The `TaskItem` component
is exported so it can be used in other parts of the application. Inside the component, it will
render the content based on the `task` object passed as a prop. */
export const TaskItem = ({ task }: TaskItemProps) => {
  const { updateTask, deleteTask } = useTaskStore();

 /**
  * The function `handleStatusChange` updates a task's status using the `updateTask` function and
  * handles any errors that occur.
  * @param newStatus - The `newStatus` parameter is of type `Task['status']`, which means it should be
  * a valid status value for a task. This could be something like 'pending', 'in progress',
  * 'completed', or any other status that is defined for tasks in your application.
  */
  const handleStatusChange = async (newStatus: Task['status']) => {
    try {
      await updateTask(task.id, { status: newStatus });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  /**
   * The function `handleDelete` is an asynchronous function that displays a confirmation dialog using
   * SweetAlert, and if the user confirms, it deletes a task and shows a success message, or shows an
   * error message if deletion fails.
   * @param e - The parameter `e` in the `handleDelete` function is a React.MouseEvent object, which
   * represents a mouse event that occurs on a DOM element when it is clicked. In this case, it is used
   * to handle the click event on a specific element, such as a button or a link, to
   */
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir la navegación del Link

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#2563E8',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteTask(task.id);
        Swal.fire({
          title: 'Eliminado',
          text: 'La tarea ha sido eliminada',
          icon: 'success',
          confirmButtonColor: '#2563E8', // Puedes cambiar este color al que prefieras
        });      } catch (error) {
        console.error('Error deleting task:', error);
        Swal.fire('Error', 'Hubo un error al eliminar la tarea', 'error');
      }
    }
  };

  return (
    <Link href={`/tasks/${task.id}`}>
      <div className="p-4 bg-white rounded-lg shadow group hover:shadow-md transition-shadow mt-4">
        <div className="flex justify-between px-1">
          <h3 className="font-semibold">{task.title}</h3>
          <div className="space-x-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-sm">
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800"
            >
              ❌
            </button>
          </div>
        </div>
        <p className="text-gray-600 pt-2">{task.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
            onClick={(e) => e.preventDefault()} // Prevenir la navegación del Link
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
    </Link>
  );
};