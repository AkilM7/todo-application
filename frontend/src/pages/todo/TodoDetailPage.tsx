import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { TodoForm } from '../../components/TodoForm';
import { todoApi } from '../../api/todoApi';
import { Todo, CreateTodoInput } from '../../types/todo';

const PRIORITY_CLASS: Record<string, string> = { low: 'badge-low', medium: 'badge-medium', high: 'badge-high' };
const PRIORITY_ICON: Record<string, string> = { low: '🟢', medium: '🟡', high: '🔴' };

export const TodoDetailPage: React.FC = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const todoId = new URLSearchParams(window.location.search).get('id');

  useEffect(() => {
    if (todoId) loadTodo(todoId);
    else { setError('No todo ID provided'); setLoading(false); }
  }, [todoId]);

  const loadTodo = async (id: string) => {
    try {
      setLoading(true);
      const data = await todoApi.getTodoById(id);
      setTodo(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Todo not found');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (input: CreateTodoInput) => {
    if (!todoId) return;
    try {
      await todoApi.updateTodo(todoId, input);
      setIsEditing(false);
      await loadTodo(todoId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update');
    }
  };

  const handleToggle = async () => {
    if (!todoId) return;
    try {
      await todoApi.toggleTodo(todoId);
      await loadTodo(todoId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle');
    }
  };

  const handleDelete = async () => {
    if (!todoId || !window.confirm('Delete this task permanently?')) return;
    try {
      setDeleting(true);
      await todoApi.deleteTodo(todoId);
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
      setDeleting(false);
    }
  };

  if (loading) return (
    <Layout title="Task Detail">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '20px' }}>
        {[80, 200, 120].map((h, i) => (
          <div key={i} className="skeleton" style={{ height: `${h}px`, borderRadius: '14px' }} />
        ))}
      </div>
    </Layout>
  );

  if (error || !todo) return (
    <Layout title="Task Detail">
      <div style={{ background: 'var(--danger-bg)', border: '1px solid rgba(239,68,68,0.25)', color: 'var(--danger)', padding: '16px 20px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem' }}>
        ⚠️ {error || 'Todo not found'}
      </div>
      <a href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>← Back to all tasks</a>
    </Layout>
  );

  const createdDate = new Date(todo.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  const updatedDate = new Date(todo.updated_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  const dueDateStr = todo.due_date
    ? new Date(todo.due_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <Layout title={todo.title}>
      {/* Back link */}
      <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px', transition: 'color 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        ← All Tasks
      </a>

      {/* Main card */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid var(--border)',
          borderLeft: `4px solid ${todo.priority === 'high' ? 'var(--high)' : todo.priority === 'medium' ? 'var(--medium)' : 'var(--low)'}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <h1 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: todo.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  letterSpacing: '-0.02em',
                }}>
                  {todo.title}
                </h1>
                <span className={`priority-badge ${PRIORITY_CLASS[todo.priority]}`}>
                  {PRIORITY_ICON[todo.priority]} {todo.priority}
                </span>
                {todo.completed && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--success)', background: 'var(--success-bg)', padding: '3px 10px', borderRadius: '999px', fontWeight: 600, border: '1px solid rgba(34,197,94,0.2)' }}>
                    ✓ Completed
                  </span>
                )}
              </div>
              {todo.description && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{todo.description}</p>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={handleToggle}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: `1px solid ${todo.completed ? 'var(--border)' : 'rgba(34,197,94,0.3)'}`,
                  background: todo.completed ? 'transparent' : 'var(--success-bg)',
                  color: todo.completed ? 'var(--text-muted)' : 'var(--success)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {todo.completed ? '↺ Reopen' : '✓ Complete'}
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--accent)',
                  background: isEditing ? 'var(--accent-glow)' : 'transparent',
                  color: 'var(--accent)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {isEditing ? '✕ Cancel' : '✏️ Edit'}
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(239,68,68,0.3)',
                  background: 'var(--danger-bg)',
                  color: 'var(--danger)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: deleting ? 'not-allowed' : 'pointer',
                  opacity: deleting ? 0.6 : 1,
                  transition: 'all 0.2s',
                }}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        </div>

        {/* Edit form */}
        {isEditing && (
          <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }} className="animate-fade-in">
            <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '16px' }}>✏️ Edit Task</h3>
            <TodoForm
              onSubmit={handleUpdate}
              initialData={{ title: todo.title, description: todo.description, priority: todo.priority, due_date: todo.due_date }}
              submitLabel="Save Changes"
              onCancel={() => setIsEditing(false)}
            />
          </div>
        )}

        {/* Metadata */}
        <div style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {[
            { label: 'Status', value: todo.completed ? '✓ Completed' : '○ Pending', color: todo.completed ? 'var(--success)' : 'var(--text-secondary)' },
            { label: 'Due Date', value: dueDateStr ?? 'No due date', color: 'var(--text-primary)' },
            { label: 'Created', value: createdDate, color: 'var(--text-secondary)' },
            { label: 'Last Updated', value: updatedDate, color: 'var(--text-secondary)' },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                {item.label}
              </div>
              <div style={{ color: item.color, fontSize: '0.9rem', fontWeight: 500 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div style={{ background: 'var(--danger-bg)', border: '1px solid rgba(239,68,68,0.25)', color: 'var(--danger)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.875rem' }}>
          ⚠️ {error}
        </div>
      )}
    </Layout>
  );
};