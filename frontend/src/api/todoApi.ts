import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

const API_URL = '/api';

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!data.success) throw new Error(data.error || data.message || 'Request failed');
  return data.data as T;
}

export const todoApi = {
  async getAllTodos(filter?: string): Promise<Todo[]> {
    const url = filter ? `${API_URL}/todos?filter=${filter}` : `${API_URL}/todos?limit=100`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to load todos');
    return data.data as Todo[];
  },

  async getTodoById(id: string): Promise<Todo> {
    const res = await fetch(`${API_URL}/todos/${id}`);
    return handleResponse<Todo>(res);
  },

  async createTodo(todo: CreateTodoInput): Promise<Todo> {
    const res = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    return handleResponse<Todo>(res);
  },

  async updateTodo(id: string, updates: UpdateTodoInput): Promise<Todo> {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return handleResponse<Todo>(res);
  },

  async toggleTodo(id: string): Promise<Todo> {
    const res = await fetch(`${API_URL}/todos/${id}/toggle`, {
      method: 'PATCH',
    });
    return handleResponse<Todo>(res);
  },

  async deleteTodo(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to delete todo');
  },
};