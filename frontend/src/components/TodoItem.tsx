import React from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const PRIORITY_ICON: Record<string, string> = { low: '🟢', medium: '🟡', high: '🔴' };
const PRIORITY_CLASS: Record<string, string> = { low: 'badge-low', medium: 'badge-medium', high: 'badge-high' };

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((d.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return 'Due today';
  if (diff === 1) return 'Due tomorrow';
  if (diff < 0) return `Overdue (${Math.abs(diff)}d ago)`;
  return `Due in ${diff} days`;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const isOverdue = todo.due_date && !todo.completed && new Date(todo.due_date) < new Date();

  return (
    <div
      className={`glass-card animate-fade-in ${todo.completed ? 'todo-completed' : ''}`}
      style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        marginBottom: '8px',
        cursor: 'default',
        borderLeft: `3px solid ${
          todo.priority === 'high' ? 'var(--high)' :
          todo.priority === 'medium' ? 'var(--medium)' :
          'var(--low)'
        }`,
      }}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`custom-check ${todo.completed ? 'checked' : ''}`}
        title={todo.completed ? 'Mark pending' : 'Mark complete'}
        style={{ marginTop: '2px' }}
      >
        {todo.completed && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4.5L4 7.5L10 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
          <span
            className="todo-title"
            style={{
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--text-primary)',
              wordBreak: 'break-word',
            }}
          >
            {todo.title}
          </span>
          <span className={`priority-badge ${PRIORITY_CLASS[todo.priority]}`}>
            {PRIORITY_ICON[todo.priority]} {todo.priority}
          </span>
          {todo.completed && (
            <span style={{ fontSize: '0.72rem', color: 'var(--success)', background: 'var(--success-bg)', padding: '2px 8px', borderRadius: '999px', fontWeight: 600, border: '1px solid rgba(34,197,94,0.2)' }}>
              ✓ Done
            </span>
          )}
        </div>

        {todo.description && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px', lineHeight: 1.5 }}>
            {todo.description}
          </p>
        )}

        {todo.due_date && (
          <span style={{
            fontSize: '0.75rem',
            color: isOverdue ? 'var(--danger)' : 'var(--text-muted)',
            display: 'inline-flex', alignItems: 'center', gap: '4px',
          }}>
            {isOverdue ? '⚠️' : '📅'} {formatDate(todo.due_date)}
          </span>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <a
          href={`/todo.html?id=${todo.id}`}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            fontSize: '0.8rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-card-hover)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          View
        </a>
        <button
          onClick={() => onDelete(todo.id)}
          style={{
            width: '30px', height: '30px', borderRadius: '8px',
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          title="Delete"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--danger-bg)';
            e.currentTarget.style.color = 'var(--danger)';
            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};