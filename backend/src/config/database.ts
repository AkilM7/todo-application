import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

let db: Database | null = null;

export async function getDatabase(): Promise<Database> {
  if (db) return db;

  const dbPath = path.join(__dirname, '../../data/todos.db');

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec('PRAGMA journal_mode = WAL;');
  await db.exec('PRAGMA foreign_keys = ON;');

  return db;
}

export async function initializeDatabase(): Promise<void> {
  const database = await getDatabase();

  await database.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      description TEXT,
      completed   INTEGER NOT NULL DEFAULT 0,
      priority    TEXT NOT NULL DEFAULT 'medium' CHECK(priority IN ('low','medium','high')),
      due_date    TEXT,
      created_at  TEXT NOT NULL,
      updated_at  TEXT NOT NULL
    );
  `);

  console.log('✅ Database initialized successfully');
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}
