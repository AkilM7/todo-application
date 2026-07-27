import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';
import { errorHandler, notFound } from './utils/errorHandler';

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: process.env['CORS_ORIGIN'] ?? 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Routes ──────────────────────────────────────────────────
app.use('/api/todos', todoRoutes);

// ── Error handlers ──────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;