# Architecture & Design Specifications

## Architecture Overview

This project implements a **Multi-Page Application (MPA)** using React, Vite, TypeScript, Express, and SQLite.

```
+-----------------------------------------------------------------------+
|                             CLIENT (BROWSER)                           |
|                                                                       |
|  Page 1: Todos List Page (/)         Page 2: Todo Detail Page         |
|  [index.html -> main.tsx]            [todo.html?id=... -> main.tsx]  |
|            |                                    |                     |
|            +-----------------+------------------+                     |
|                              |                                        |
|                   HTTP Fetch API Calls (/api/*)                        |
+------------------------------|----------------------------------------+
                               |
                               v (Vite Proxy: :3000 -> :5000)
+-----------------------------------------------------------------------+
|                          SERVER (EXPRESS.JS)                          |
|                                                                       |
|                       Routes (/api/todos)                             |
|                               |                                       |
|                    Validation Middleware                              |
|                               |                                       |
|                    Controller Layer                                   |
|                               |                                       |
|                    Service Layer (CRUD)                               |
|                               |                                       |
|                    SQLite Database (todos.db)                         |
+-----------------------------------------------------------------------+
```

## Multi-Page Application (MPA) Routing Strategy

Unlike Single Page Applications (SPAs) that use client-side routers (`react-router-dom`), this application uses **Vite's Multi-Page Mode**:

- **Page 1 (List Page)**: Served via `index.html` at `http://localhost:3000/`. Bundled independently with `/src/pages/todos/main.tsx`.
- **Page 2 (Detail Page)**: Served via `todo.html` at `http://localhost:3000/todo.html?id={todo_id}`. Bundled independently with `/src/pages/todo/main.tsx`.
- **HTML Query Parameter Parsing**: The Detail page extracts the `id` parameter directly from `window.location.search` (`new URLSearchParams(window.location.search).get('id')`).

## Database Schema (SQLite)

The SQLite database is initialized automatically on server boot:

```sql
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
```

## Directory Structure

```
ziptrrip-todo-app/
├── backend/
│   ├── data/                 # SQLite DB storage directory
│   ├── src/
│   │   ├── config/           # Database setup & connection pool
│   │   ├── controllers/      # Request handling & HTTP response formatting
│   │   ├── middleware/       # Data validation middleware
│   │   ├── models/           # Type re-exports
│   │   ├── routes/           # Express router setup
│   │   ├── services/         # SQLite SQL query execution
│   │   ├── types/            # DTOs & TypeScript interfaces
│   │   ├── utils/            # AppError & global error handler
│   │   ├── app.ts            # Express application setup
│   │   └── server.ts         # Server entry point
│   ├── tests/                # Jest & Supertest integration suite
│   ├── jest.config.js
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/              # Fetch API wrappers
│   │   ├── components/       # Layout, TodoForm, TodoItem, TodoFilter
│   │   ├── pages/            # MPA page entries (todos, todo)
│   │   ├── styles/           # Design system tokens & animations
│   │   └── types/            # Shared TypeScript interfaces
│   ├── index.html            # Entry for Todos List page
│   ├── todo.html             # Entry for Todo Detail page
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts        # Vite MPA multi-input build config
├── postman/
│   ├── Ziptrrip_Todo_API_Collection.json
│   └── REST_CLIENT.http
├── docs/                     # Markdown documentation
│   ├── ARCHITECTURE.md
│   ├── FEATURES.md
│   └── API_DOCUMENTATION.md
├── package.json              # Workspace root orchestration
└── README.md
```
