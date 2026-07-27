export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TodoPriority;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  priority?: TodoPriority;
  due_date?: string;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: TodoPriority;
  due_date?: string;
}

export interface FilterState {
  status: 'all' | 'completed' | 'pending';
  priority: 'all' | TodoPriority;
  search: string;
}