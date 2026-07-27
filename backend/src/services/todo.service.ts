import { getDatabase } from '../config/database';
import { Todo, CreateTodoDTO, UpdateTodoDTO } from '../types/todo.types';
import { v4 as uuidv4 } from 'uuid';
import { AppError } from '../utils/errorHandler';

interface TodoRow {
  id: string;
  title: string;
  description: string | null;
  completed: number;
  priority: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

function rowToTodo(row: TodoRow): Todo {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    completed: row.completed === 1,
    priority: row.priority as Todo['priority'],
    due_date: row.due_date ?? undefined,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function getAllTodos(
  page = 1,
  limit = 10,
  filter?: string
): Promise<{ todos: Todo[]; total: number }> {
  const db = await getDatabase();
  const offset = (page - 1) * limit;

  let whereClause = '';
  const params: (string | number)[] = [];

  if (filter === 'completed') {
    whereClause = 'WHERE completed = 1';
  } else if (filter === 'pending') {
    whereClause = 'WHERE completed = 0';
  }

  const totalRow = await db.get<{ count: number }>(
    `SELECT COUNT(*) as count FROM todos ${whereClause}`,
    params
  );
  const total = totalRow?.count ?? 0;

  const rows = await db.all<TodoRow[]>(
    `SELECT * FROM todos ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  return { todos: rows.map(rowToTodo), total };
}

export async function getTodoById(id: string): Promise<Todo> {
  const db = await getDatabase();
  const row = await db.get<TodoRow>('SELECT * FROM todos WHERE id = ?', [id]);

  if (!row) {
    throw new AppError(`Todo with id '${id}' not found`, 404);
  }

  return rowToTodo(row);
}

export async function createTodo(data: CreateTodoDTO): Promise<Todo> {
  const db = await getDatabase();
  const now = new Date().toISOString();
  const id = uuidv4();

  const todo: Todo = {
    id,
    title: data.title.trim(),
    description: data.description?.trim(),
    completed: false,
    priority: data.priority ?? 'medium',
    due_date: data.due_date,
    created_at: now,
    updated_at: now,
  };

  await db.run(
    `INSERT INTO todos (id, title, description, completed, priority, due_date, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      todo.id,
      todo.title,
      todo.description ?? null,
      todo.completed ? 1 : 0,
      todo.priority,
      todo.due_date ?? null,
      todo.created_at,
      todo.updated_at,
    ]
  );

  return todo;
}

export async function updateTodo(id: string, data: UpdateTodoDTO): Promise<Todo> {
  const db = await getDatabase();

  // Ensure the todo exists
  await getTodoById(id);

  const now = new Date().toISOString();
  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  if (data.title !== undefined) {
    fields.push('title = ?');
    values.push(data.title.trim());
  }
  if (data.description !== undefined) {
    fields.push('description = ?');
    values.push(data.description.trim() || null);
  }
  if (data.completed !== undefined) {
    fields.push('completed = ?');
    values.push(data.completed ? 1 : 0);
  }
  if (data.priority !== undefined) {
    fields.push('priority = ?');
    values.push(data.priority);
  }
  if (data.due_date !== undefined) {
    fields.push('due_date = ?');
    values.push(data.due_date || null);
  }

  if (fields.length === 0) {
    throw new AppError('No fields provided for update', 400);
  }

  fields.push('updated_at = ?');
  values.push(now);
  values.push(id);

  await db.run(
    `UPDATE todos SET ${fields.join(', ')} WHERE id = ?`,
    values
  );

  return getTodoById(id);
}

export async function deleteTodo(id: string): Promise<void> {
  const db = await getDatabase();

  // Ensure it exists first
  await getTodoById(id);

  await db.run('DELETE FROM todos WHERE id = ?', [id]);
}

export async function toggleTodoComplete(id: string): Promise<Todo> {
  const db = await getDatabase();
  const todo = await getTodoById(id);
  const now = new Date().toISOString();

  await db.run(
    'UPDATE todos SET completed = ?, updated_at = ? WHERE id = ?',
    [todo.completed ? 0 : 1, now, id]
  );

  return getTodoById(id);
}