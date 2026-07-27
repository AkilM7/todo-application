# Application Features & Functionalities

## Overview of Features

This section documents all implemented features across the frontend Multi-Page Application and backend REST service.

---

## 1. Frontend Features (MPA Architecture)

### Page 1: Todos List Page (`/index.html`)

- **Interactive Task Dashboard**:
  - Live count metrics: Total Tasks, Pending Tasks, Completed Tasks, and Urgent (High Priority) Tasks.
- **Task Creation Form**:
  - Task Title (Required, max 200 chars)
  - Optional Description
  - Visual Priority Buttons (`🟢 Low`, `🟡 Medium`, `🔴 High`)
  - Optional Due Date picker
- **Advanced Filtering & Search**:
  - Full-text search across task title and description.
  - Status filter: `All Status`, `Pending`, `Completed`.
  - Priority filter: `All Priorities`, `Low`, `Medium`, `High`.
- **Item Level Actions**:
  - Checkbox toggle to quickly mark tasks completed / pending.
  - Priority badge & overdue warning indicator (`⚠️ Overdue`).
  - "View" button navigating directly to Page 2 (`/todo.html?id=...`).
  - Delete action with browser confirmation modal.

### Page 2: Todo Detail Page (`/todo.html?id={id}`)

- **Query Parameter Driven**: Reads `?id=` from `window.location.search`.
- **Comprehensive Metadata Display**:
  - Large task title & priority indicator.
  - Full description body text.
  - Due Date with relative calculations ("Due today", "Due in 3 days").
  - Formatted timestamps for `Created` and `Last Updated`.
- **Inline Editing**:
  - Toggle inline edit mode to update Title, Description, Priority, or Due Date with pre-filled inputs.
- **Status Control & Actions**:
  - Quick toggle button between `Reopen` and `Complete`.
  - Delete button with automatic redirect back to list page (`/`).
  - "← All Tasks" navigation link back to main page.

---

## 2. Backend Features & REST APIs

- **Database Persistence**: Automatic schema migration and WAL mode SQLite storage.
- **Data Validation Middleware**: Strict validation for required fields, character limits, and priority values.
- **Error Handling**: Custom `AppError` class with standardized JSON error responses.
- **Pagination & Query Filtering**: Built-in support for page offset, limit, and status filtering (`filter=completed` / `filter=pending`).
