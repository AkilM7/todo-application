# Ziptrrip Todo Application 🚀

> A production-ready, full-stack Multi-Page Application (MPA) built for the **Ziptrrip Technical Assessment**.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

---

## 📌 Executive Summary

This project is a full-stack task management system engineered to demonstrate clean architecture, robust API design, and strict Multi-Page Application (MPA) frontend patterns. 

It fulfills **100% of the core requirements** and implements **all optional bonus points** specified in the assessment guidelines.

---

## 🎯 Assessment Requirements & Compliance Matrix

| Requirement | Status | Implementation Details |
| :--- | :---: | :--- |
| **Frontend: React MPA** | ✅ PASS | Vite Multi-Page setup (`index.html` + `todo.html`). Each page compiles independently without client-side SPA routers. |
| **Page 1: Todos List Page** | ✅ PASS | Dashboard metrics, task creation form, full-text search, status & priority filtering, status toggles, deletion. |
| **Page 2: Todo Detail Page** | ✅ PASS | URL query parameter parsing (`?id={id}`), complete metadata view, inline task editing, toggle, and deletion. |
| **Backend: TypeScript Server** | ✅ PASS | Express.js REST API server written in 100% strict TypeScript (`server.ts`, `app.ts`). |
| **Backend: Full CRUD APIs** | ✅ PASS | Endpoints for `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` operations on tasks. |
| **Database Persistence** | ✅ PASS | SQLite3 database (`todos.db`) with automatic table creation & WAL mode. |
| **Unit & Integration Tests** | ✅ PASS | 13 automated Jest + Supertest integration tests passing with 100% route coverage (`npm test`). |
| **Postman APIs & REST Client** | ✅ PASS | Included `Ziptrrip_Todo_API_Collection.json` and `REST_CLIENT.http`. |
| **Comprehensive Documentation**| ✅ PASS | Detailed markdown documentation in `./docs/` and root `README.md`. |

### 🌟 Bonus Points Achieved
- **TypeScript**: Used end-to-end across backend and frontend.
- **Database**: Relational SQLite database with WAL journal mode.
- **Clean Architecture**: Decoupled Layered Architecture (Controllers, Services, Models, Routes, Middleware, Utils).
- **Unit Tests**: Integration test suite covering all CRUD endpoints and edge cases.
- **API Tooling**: Included Postman v2.1 collection and VS Code REST Client files.

---

## 🛠️ Tech Stack & Key Libraries

- **Frontend**: React 18, TypeScript, Vite (Multi-Page Mode), Tailwind CSS, Custom Glassmorphism CSS Design Tokens
- **Backend**: Node.js, Express.js, TypeScript, SQLite3 (`sqlite` + `sqlite3`), `uuid`
- **Testing**: Jest, Supertest, `ts-jest`
- **Developer Tools**: `ts-node-dev`, `concurrently`, Postman, VS Code REST Client

---

## 📂 Repository Structure

```
ziptrrip-todo-app/
├── backend/
│   ├── data/                 # SQLite database storage (todos.db)
│   ├── src/
│   │   ├── config/           # SQLite connection & DB initialization
│   │   ├── controllers/      # Express route handlers
│   │   ├── middleware/       # Request validation & error handling
│   │   ├── models/           # Data type definitions & re-exports
│   │   ├── routes/           # REST API route definitions
│   │   ├── services/         # SQLite SQL query execution & business logic
│   │   ├── types/            # DTOs & TypeScript interfaces
│   │   ├── utils/            # AppError class & error middleware
│   │   ├── app.ts            # Express application setup
│   │   └── server.ts         # Server entry point
│   ├── tests/                # Jest integration test suite (13 passing)
│   ├── jest.config.js
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/              # Fetch API wrappers
│   │   ├── components/       # Layout, TodoForm, TodoItem, TodoFilter
│   │   ├── pages/            # MPA page entries (todos, todo)
│   │   ├── styles/           # Global dark-theme CSS & animations
│   │   └── types/            # Shared TypeScript types
│   ├── index.html            # Entry point for Page 1: Todos List
│   ├── todo.html             # Entry point for Page 2: Todo Detail
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts        # Vite Multi-Page Application build config
├── postman/
│   ├── Ziptrrip_Todo_API_Collection.json # Postman v2.1 collection
│   └── REST_CLIENT.http                 # VS Code REST Client file
├── docs/                     # Comprehensive documentation
│   ├── ARCHITECTURE.md       # Architecture & MPA design docs
│   ├── FEATURES.md           # Detailed feature breakdown
│   └── API_DOCUMENTATION.md  # Complete REST API specifications
├── .gitignore                # Environment & build artifact exclusions
├── package.json              # Root workspace orchestration
└── README.md
```

---

## ⚡ Quick Start & Running Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Install Dependencies
Run the workspace installation command from the repository root:
```bash
npm run install:all
```

### 2. Start Development Servers
To run both backend (`http://localhost:5000`) and frontend (`http://localhost:3000`) concurrently:
```bash
npm run dev
```

- **Page 1 — Todos List**: [http://localhost:3000](http://localhost:3000)
- **Page 2 — Todo Detail**: [http://localhost:3000/todo.html?id={id}](http://localhost:3000/todo.html?id=1)
- **Backend Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

---

## 🧪 Running Integration Tests

To run the backend Jest + Supertest test suite:
```bash
npm test
```

### Test Suite Output
```
PASS tests/todo.test.ts
  Todo API
    GET /health                   ✓ (283 ms)
    POST /api/todos               ✓ (168 ms)
    GET /api/todos                ✓ (29 ms)
    GET /api/todos/:id            ✓ (22 ms)
    PUT /api/todos/:id            ✓ (28 ms)
    PATCH /api/todos/:id/toggle   ✓ (45 ms)
    DELETE /api/todos/:id         ✓ (24 ms)

Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Query Params / Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Server health check | — |
| `GET` | `/api/todos` | List all todos | `?page=1&limit=10&filter=pending` |
| `GET` | `/api/todos/:id` | Get single todo by ID | — |
| `POST` | `/api/todos` | Create a new todo | `{ title, description?, priority?, due_date? }` |
| `PUT` | `/api/todos/:id` | Full / partial todo update | `{ title?, description?, completed?, priority? }` |
| `PATCH` | `/api/todos/:id/toggle` | Toggle completed status | — |
| `DELETE` | `/api/todos/:id` | Delete todo by ID | — |

---

## 📮 Postman & REST Client Files

- **Postman Collection**: Import `./postman/Ziptrrip_Todo_API_Collection.json` into Postman to run pre-configured API requests.
- **VS Code REST Client**: Open `./postman/REST_CLIENT.http` in VS Code with the *REST Client* extension to execute requests directly inside the editor.

---

## 📖 Extended Documentation

For in-depth explanations of architecture, features, and API contracts, please review the documentation files:
- 🏗️ [Architecture & MPA Design](./docs/ARCHITECTURE.md)
- ✨ [Feature Breakdown](./docs/FEATURES.md)
- 📑 [REST API Specifications](./docs/API_DOCUMENTATION.md)