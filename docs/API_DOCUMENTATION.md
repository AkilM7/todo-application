# REST API Specifications

Base URL: `http://localhost:5000/api`

---

## Endpoints

### 1. Health Check
`GET /health`

**Response (`200 OK`)**:
```json
{
  "status": "ok",
  "timestamp": "2026-07-27T21:00:00.000Z"
}
```

---

### 2. List All Todos
`GET /api/todos?page=1&limit=10&filter=pending`

**Query Parameters**:
- `page` (optional): Page number (default `1`)
- `limit` (optional): Items per page (default `10`)
- `filter` (optional): `completed` | `pending`

**Response (`200 OK`)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "c1f7b80a-9d21-4f81-a7b3-890123456789",
      "title": "Complete Ziptrrip Assessment",
      "description": "Build full-stack todo application",
      "completed": false,
      "priority": "high",
      "due_date": "2026-07-28",
      "created_at": "2026-07-27T20:00:00.000Z",
      "updated_at": "2026-07-27T20:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

---

### 3. Get Todo by ID
`GET /api/todos/:id`

**Response (`200 OK`)**:
```json
{
  "success": true,
  "data": {
    "id": "c1f7b80a-9d21-4f81-a7b3-890123456789",
    "title": "Complete Ziptrrip Assessment",
    "description": "Build full-stack todo application",
    "completed": false,
    "priority": "high",
    "due_date": "2026-07-28",
    "created_at": "2026-07-27T20:00:00.000Z",
    "updated_at": "2026-07-27T20:00:00.000Z"
  }
}
```

**Error Response (`404 Not Found`)**:
```json
{
  "success": false,
  "error": "Todo with id 'invalid-id' not found"
}
```

---

### 4. Create Todo
`POST /api/todos`

**Request Body**:
```json
{
  "title": "Complete Ziptrrip Assessment",
  "description": "Build full-stack todo application",
  "priority": "high",
  "due_date": "2026-07-28"
}
```

**Response (`201 Created`)**:
```json
{
  "success": true,
  "data": {
    "id": "c1f7b80a-9d21-4f81-a7b3-890123456789",
    "title": "Complete Ziptrrip Assessment",
    "description": "Build full-stack todo application",
    "completed": false,
    "priority": "high",
    "due_date": "2026-07-28",
    "created_at": "2026-07-27T20:00:00.000Z",
    "updated_at": "2026-07-27T20:00:00.000Z"
  },
  "message": "Todo created successfully"
}
```

---

### 5. Update Todo
`PUT /api/todos/:id` or `PATCH /api/todos/:id`

**Request Body**:
```json
{
  "title": "Updated Title",
  "completed": true
}
```

---

### 6. Toggle Todo Status
`PATCH /api/todos/:id/toggle`

---

### 7. Delete Todo
`DELETE /api/todos/:id`
