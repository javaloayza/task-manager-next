export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  status: Task['status'];
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  id: string;
}