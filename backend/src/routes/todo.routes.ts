import { Router } from 'express';
import * as TodoController from '../controllers/todo.controller';
import { validateCreateTodo, validateUpdateTodo } from '../middleware/validate';

const router = Router();

// GET /api/todos          — list all (with pagination & filter)
router.get('/', TodoController.getAllTodos);

// GET /api/todos/:id      — get single todo
router.get('/:id', TodoController.getTodoById);

// POST /api/todos         — create todo
router.post('/', validateCreateTodo, TodoController.createTodo);

// PUT /api/todos/:id      — full/partial update
router.put('/:id', validateUpdateTodo, TodoController.updateTodo);

// PATCH /api/todos/:id    — partial update (same handler)
router.patch('/:id', validateUpdateTodo, TodoController.updateTodo);

// PATCH /api/todos/:id/toggle — toggle completed flag
router.patch('/:id/toggle', TodoController.toggleTodoComplete);

// DELETE /api/todos/:id   — delete todo
router.delete('/:id', TodoController.deleteTodo);

export default router;