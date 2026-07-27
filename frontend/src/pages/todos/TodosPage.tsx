import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { TodoForm } from '../../components/TodoForm';
import { TodoItem } from '../../components/TodoItem';
import { TodoFilter } from '../../components/TodoFilter';
import { todoApi } from '../../api/todoApi';
import { Todo, CreateTodoInput, FilterState } from '../../types/todo';

export const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<FilterState>({ status: 'all', priority: 'all', search: '' });

  useEffect(() => { loadTodos(); }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getAllTodos();
      setTodos(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (input: CreateTodoInput) => {
    try {
      await todoApi.createTodo(input);
      setShowForm(false);
      await loadTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await todoApi.toggleTodo(id);
      await loadTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await todoApi.deleteTodo(id);
      await loadTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  const filtered = todos.filter((t) => {
    if (filter.status === 'completed' && !t.completed) return false;
    if (filter.status === 'pending' && t.completed) return false;
    if (filter.priority !== 'all' && t.priority !== filter.priority) return false;
    if (filter.search && !t.title.toLowerCase().includes(filter.search.toLowerCase()) &&
        !(t.description ?? '').toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: todos.length,
    pending: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
    high: todos.filter(t => t.priority === 'high' && !t.completed).length,
  };

  return (
    <Layout title="Ziptrrip Tasks">
      {/* Hero */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          marginBottom: '6px',
        }}>
          My Tasks
          <span style={{
            display: 'inline-block',
            marginLeft: '10px',
            fontSize: '1rem',
            fontWeight: 500,
            color: 'var(--accent)',
            background: 'var(--accent-glow)',
            padding: '2px 10px',
            borderRadius: '999px',
            verticalAlign: 'middle',
          }}>{stats.total}</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {stats.pending} pending · {stats.completed} completed{stats.high > 0 ? ` · ${stats.high} high priority` : ''}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '28px' }}>
        {[
          { label: 'Total', value: stats.total, color: 'var(--text-primary)' },
          { label: 'Pending', value: stats.pending, color: 'var(--warning)' },
          { label: 'Done', value: stats.completed, color: 'var(--success)' },
          { label: '🔴 Urgent', value: stats.high, color: 'var(--danger)' },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Add Task button / form */}
      <div style={{
        background: 'var(--bg-card)',
        border: showForm ? '1px solid var(--accent)' : '1px solid var(--border)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
        transition: 'border-color 0.2s',
      }}>
        {showForm ? (
          <>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1rem', marginBottom: '16px' }}>
              ✨ New Task
            </h3>
            <TodoForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
          </>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              border: '2px dashed var(--border)',
              borderRadius: '10px',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent)';
              e.currentTarget.style.background = 'var(--accent-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <span style={{ fontSize: '18px' }}>+</span> Add new task
          </button>
        )}
      </div>

      {/* Filter */}
      <TodoFilter filter={filter} onFilterChange={setFilter} totalCount={todos.length} filteredCount={filtered.length} />

      {/* Error */}
      {error && (
        <div style={{
          background: 'var(--danger-bg)',
          border: '1px solid rgba(239,68,68,0.25)',
          color: 'var(--danger)',
          padding: '12px 16px',
          borderRadius: '10px',
          marginBottom: '16px',
          fontSize: '0.875rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span>⚠️ {error}</span>
          <button onClick={() => setError('')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '16px' }}>✕</button>
        </div>
      )}

      {/* Todo list */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[1,2,3].map(i => (
            <div key={i} className="skeleton" style={{ height: '70px' }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'var(--text-muted)',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>
            {todos.length === 0 ? '🎯' : '🔍'}
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            {todos.length === 0 ? 'No tasks yet' : 'No matches found'}
          </p>
          <p style={{ fontSize: '0.85rem' }}>
            {todos.length === 0 ? 'Click "+ Add new task" to get started' : 'Try adjusting your filters'}
          </p>
        </div>
      ) : (
        <div>
          {filtered.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </Layout>
  );
};