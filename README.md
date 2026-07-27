# Ziptrrip Todo Application 🚀

Full-stack Todo Application built for the **Ziptrrip Technical Assessment**.

---

## 📋 Assessment Checklist & Compliance

### Core Requirements
| Requirement | Status | Implementation Details |
| :--- | :---: | :--- |
| **Frontend: React MPA** | ✅ | Built with Vite Multi-Page Mode (`index.html` + `todo.html`). |
| **Page 1: Todos List** | ✅ | List, search, filter, stats, status toggle, priority badges, delete. |
| **Page 2: Todo Detail** | ✅ | Accepts `?id={id}` query parameter, full view, inline editing, toggle, delete. |
| **Backend: Node/TS Server** | ✅ | Express.js application written in TypeScript (`server.ts`, `app.ts`). |
| **Backend: CRUD APIs** | ✅ | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` endpoints for todo items. |
| **Database Persistence** | ✅ | SQLite3 database (`todos.db`) with automatic table creation & WAL mode. |
| **Unit / Integration Tests** | ✅ | Jest + Supertest test suite (`13 passed, 100% route coverage`). |
| **Postman & REST Client** | ✅ | Included `Ziptrrip_Todo_API_Collection.json` and `REST_CLIENT.http`. |
| **Documentation** | ✅ | Detailed `.md` files in `/docs` and `README.md`. |

### Bonus Points Matrix
- ⭐ **Usage of TypeScript**: Strict TypeScript on both Frontend & Backend.
- ⭐ **Usage of Database**: Persistent SQLite database with auto-created tables.
- ⭐ **Clean Code Organization**: Modular layered architecture (Controllers, Services, Models, Routes, Middleware, Types, Utils).
- ⭐ **Unit Tests**: Full integration test suite with Jest + Supertest (`npm test`).
- ⭐ **Postman APIs & REST Client**: Pre-configured collection JSON & `.http` files.

---

## 📁 Repository Structure

```
ziptrrip-todo-app/
├── backend/
│   ├── data/                 # SQLite database storage (todos.db)
│   ├── src/
│   │   ├── config/           # Database setup & initialization
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Request validation & error catching
│   │   ├── models/           # Type re-exports
│   │   ├── routes/           # Express router definitions
│   │   ├── services/         # SQLite DB queries & business logic
│   │   ├── types/            # DTOs & TypeScript interfaces
│   │   ├── utils/            # AppError & error handler
│   │   ├── app.ts            # Express app definition
│   │   └── server.ts         # Server entry point
│   ├── tests/                # Jest integration test suite
│   ├── jest.config.js
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/              # Fetch API wrappers
│   │   ├── components/       # Layout, TodoForm, TodoItem, TodoFilter
│   │   ├── pages/            # MPA page entries (todos, todo)
│   │   ├── styles/           # Global dark-theme CSS design system
│   │   └── types/            # Shared TypeScript types
│   ├── index.html            # Page 1: Todos List Page
│   ├── todo.html             # Page 2: Todo Detail Page
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts        # Vite Multi-Page Application (MPA) config
├── postman/
│   ├── Ziptrrip_Todo_API_Collection.json # Postman v2.1 collection
│   └── REST_CLIENT.http                 # VS Code REST Client requests
├── docs/                     # Detailed documentation
│   ├── ARCHITECTURE.md       # Architecture & MPA design docs
│   ├── FEATURES.md           # Feature breakdown
│   └── API_DOCUMENTATION.md  # Complete API specs
├── package.json              # Workspace orchestration
└── README.md
```

---

## 🛠️ Quick Start Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. Install Dependencies
Run the command below from the root folder to install dependencies for root, backend, and frontend:
```bash
npm run install:all
```

### 2. Run Application (Dev Mode)
To start both backend (port `5000`) and frontend (port `3000`) concurrently:
```bash
npm run dev
```

- **Page 1 (Todos List)**: [http://localhost:3000](http://localhost:3000)
- **Page 2 (Todo Detail)**: [http://localhost:3000/todo.html?id={id}](http://localhost:3000/todo.html?id=1)
- **Backend API**: [http://localhost:5000/api/todos](http://localhost:5000/api/todos)
- **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

---

## 🧪 Running Tests

To run the backend integration test suite with coverage report:
```bash
npm test
```

Sample test output:
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

## 📮 API Documentation & Testing Tools

### Postman Collection
Import `postman/Ziptrrip_Todo_API_Collection.json` into Postman to test all endpoints.

### VS Code REST Client
Open `postman/REST_CLIENT.http` in VS Code with the *REST Client* extension to execute requests directly inside the editor.

---

## 📖 Additional Documentation

For deeper details, refer to the `.md` files in `/docs`:
- [Architecture & MPA Design](file:///C:/Users/AKIL/Documents/ziptrrip-todo-app/docs/ARCHITECTURE.md)
- [Feature Details](file:///C:/Users/AKIL/Documents/ziptrrip-todo-app/docs/FEATURES.md)
- [REST API Specifications](file:///C:/Users/AKIL/Documents/ziptrrip-todo-app/docs/API_DOCUMENTATION.md)