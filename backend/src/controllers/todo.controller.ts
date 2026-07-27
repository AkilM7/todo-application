import { Request, Response, NextFunction } from 'express';
import * as TodoService from '../services/todo.service';
import { CreateTodoDTO, UpdateTodoDTO } from '../types/todo.types';

export async function getAllTodos(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query['page'] as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query['limit'] as string) || 10));
    const filter = req.query['filter'] as string | undefined;

    const { todos, total } = await TodoService.getAllTodos(page, limit, filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: todos,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (err) {
    next(err);
  }
}

export async function getTodoById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const todo = await TodoService.getTodoById(req.params['id']!);
    res.json({ success: true, data: todo });
  } catch (err) {
    next(err);
  }
}

export async function createTodo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dto = req.body as CreateTodoDTO;
    const todo = await TodoService.createTodo(dto);
    res.status(201).json({ success: true, data: todo, message: 'Todo created successfully' });
  } catch (err) {
    next(err);
  }
}

export async function updateTodo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dto = req.body as UpdateTodoDTO;
    const todo = await TodoService.updateTodo(req.params['id']!, dto);
    res.json({ success: true, data: todo, message: 'Todo updated successfully' });
  } catch (err) {
    next(err);
  }
}

export async function deleteTodo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await TodoService.deleteTodo(req.params['id']!);
    res.json({ success: true, message: 'Todo deleted successfully' });
  } catch (err) {
    next(err);
  }
}

export async function toggleTodoComplete(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const todo = await TodoService.toggleTodoComplete(req.params['id']!);
    res.json({ success: true, data: todo, message: 'Todo status toggled successfully' });
  } catch (err) {
    next(err);
  }
}