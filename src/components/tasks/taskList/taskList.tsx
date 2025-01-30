'use client';

import { useEffect } from 'react';
import { useTaskStore } from '@/store/task.store';
import { TaskItem } from '@/components/tasks/taskItem/taskItem';

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