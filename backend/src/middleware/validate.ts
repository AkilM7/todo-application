import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorHandler';

export function validateCreateTodo(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { title, priority } = req.body as { title?: unknown; priority?: unknown };

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return next(new AppError('Title is required and must be a non-empty string', 400));
  }

  if (title.trim().length > 200) {
    return next(new AppError('Title must not exceed 200 characters', 400));
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (priority !== undefined && !validPriorities.includes(priority as string)) {
    return next(new AppError('Priority must be one of: low, medium, high', 400));
  }

  next();
}

export function validateUpdateTodo(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { title, completed, priority } = req.body as {
    title?: unknown;
    completed?: unknown;
    priority?: unknown;
  };

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length === 0) {
      return next(new AppError('Title must be a non-empty string', 400));
    }
    if (title.trim().length > 200) {
      return next(new AppError('Title must not exceed 200 characters', 400));
    }
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return next(new AppError('Completed must be a boolean', 400));
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (priority !== undefined && !validPriorities.includes(priority as string)) {
    return next(new AppError('Priority must be one of: low, medium, high', 400));
  }

  next();
}
