import type { Task } from '../types';
import { apiClient } from './client';

export type CreateTaskPayload = {
  title: string;
};

// 1. Display a list of tasks
export async function fetchTasks(): Promise<Task[]> {
  const response = await apiClient.get<Task[]>('/tasks');
  return response.data;
}

// 2. Add a new task
export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const response = await apiClient.post<Task>('/tasks', payload);
  return response.data;
}

// Update task description and due date
export type UpdateTaskPayload = {
  description?: string | null;
  dueDate?: string | null;
};

export async function updateTask(id: number, payload: UpdateTaskPayload): Promise<Task> {
  const response = await apiClient.put<Task>(`/tasks/${id}`, payload);
  return response.data;
}

// 3. Mark a task as complete
export async function completeTask(id: number): Promise<Task> {
  const response = await apiClient.put<Task>(`/tasks/${id}/complete`);
  return response.data;
}

