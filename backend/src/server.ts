import app from './app';
import { initializeDatabase } from './config/database';
import fs from 'fs';
import path from 'path';

const PORT = parseInt(process.env['PORT'] ?? '5000', 10);

async function start(): Promise<void> {
  // Ensure the data directory exists
  const dataDir = path.join(__dirname, '../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  await initializeDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 API base URL: http://localhost:${PORT}/api/todos`);
    console.log(`❤️  Health check: http://localhost:${PORT}/health`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});