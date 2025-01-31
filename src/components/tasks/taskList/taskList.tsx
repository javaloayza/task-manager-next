'use client';

import { useEffect } from 'react';
import { useTaskStore } from '@/store/task.store';
import { TaskItem } from '@/components/tasks/taskItem/taskItem';

/**
 * The TaskList component renders a list of tasks fetched from a store, displaying loading or error
 * messages as needed.
 * @returns The `TaskList` component is returning a list of tasks displayed using the `TaskItem`
 * component. If the tasks are still loading, it shows a loading message. If there is an error, it
 * displays an error message with the specific error details.
 */
export const TaskList = () => {
  const { tasks, loading, error, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return <div className="p-8">Cargando tareas...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};