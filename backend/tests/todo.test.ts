import request from 'supertest';
import app from '../src/app';
import { initializeDatabase, closeDatabase } from '../src/config/database';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(__dirname, '../data');

beforeAll(async () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  await initializeDatabase();
});

afterAll(async () => {
  await closeDatabase();
  // Safe cleanup for Windows file locks
  try {
    const dbPath = path.join(dataDir, 'todos.db');
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
  } catch {
    // Ignore file lock errors during teardown
  }
});

describe('Todo API', () => {
  let createdId: string;

  // ── Health Check ────────────────────────────────────────────
  describe('GET /health', () => {
    it('should return 200 with status ok', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  // ── Create Todo ─────────────────────────────────────────────
  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: 'Test Todo', priority: 'high' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Todo');
      expect(res.body.data.priority).toBe('high');
      expect(res.body.data.completed).toBe(false);
      createdId = res.body.data.id;
    });

    it('should return 400 when title is missing', async () => {
      const res = await request(app).post('/api/todos').send({ priority: 'low' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should return 400 for invalid priority', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: 'Bad Priority', priority: 'urgent' });
      expect(res.status).toBe(400);
    });
  });

  // ── Get All Todos ───────────────────────────────────────────
  describe('GET /api/todos', () => {
    it('should return paginated todos', async () => {
      const res = await request(app).get('/api/todos');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(typeof res.body.total).toBe('number');
    });

    it('should filter completed todos', async () => {
      const res = await request(app).get('/api/todos?filter=completed');
      expect(res.status).toBe(200);
      expect(res.body.data.every((t: { completed: boolean }) => t.completed)).toBe(true);
    });
  });

  // ── Get Todo By ID ──────────────────────────────────────────
  describe('GET /api/todos/:id', () => {
    it('should return a single todo', async () => {
      const res = await request(app).get(`/api/todos/${createdId}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(createdId);
    });

    it('should return 404 for non-existent id', async () => {
      const res = await request(app).get('/api/todos/nonexistent-id');
      expect(res.status).toBe(404);
    });
  });

  // ── Update Todo ─────────────────────────────────────────────
  describe('PUT /api/todos/:id', () => {
    it('should update a todo', async () => {
      const res = await request(app)
        .put(`/api/todos/${createdId}`)
        .send({ title: 'Updated Title', completed: true });

      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('Updated Title');
      expect(res.body.data.completed).toBe(true);
    });
  });

  // ── Toggle Complete ──────────────────────────────────────────
  describe('PATCH /api/todos/:id/toggle', () => {
    it('should toggle completed status', async () => {
      const before = await request(app).get(`/api/todos/${createdId}`);
      const wasCompleted: boolean = before.body.data.completed;

      const res = await request(app).patch(`/api/todos/${createdId}/toggle`);
      expect(res.status).toBe(200);
      expect(res.body.data.completed).toBe(!wasCompleted);
    });
  });

  // ── Delete Todo ──────────────────────────────────────────────
  describe('DELETE /api/todos/:id', () => {
    it('should delete a todo', async () => {
      const res = await request(app).delete(`/api/todos/${createdId}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should return 404 after deletion', async () => {
      const res = await request(app).get(`/api/todos/${createdId}`);
      expect(res.status).toBe(404);
    });
  });

  // ── 404 Handler ──────────────────────────────────────────────
  describe('Unknown route', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app).get('/api/unknown');
      expect(res.status).toBe(404);
    });
  });
});