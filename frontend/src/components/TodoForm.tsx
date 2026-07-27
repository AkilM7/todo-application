import React, { useState } from 'react';
import { CreateTodoInput } from '../types/todo';

interface TodoFormProps {
  onSubmit: (todo: CreateTodoInput) => void;
  initialData?: Partial<CreateTodoInput>;
  submitLabel?: string;
  onCancel?: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  initialData = {},
  submitLabel = 'Add Task',
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData.title ?? '');
  const [description, setDescription] = useState(initialData.description ?? '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialData.priority ?? 'medium');
  const [dueDate, setDueDate] = useState(initialData.due_date ?? '');
  const isEdit = !!initialData.title;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      due_date: dueDate || undefined,
    });
    if (!isEdit) {
      setTitle(''); setDescription(''); setPriority('medium'); setDueDate('');
    }
  };

  const priorityOptions = [
    { value: 'low', label: '🟢 Low', color: 'var(--low)' },
    { value: 'medium', label: '🟡 Medium', color: 'var(--medium)' },
    { value: 'high', label: '🔴 High', color: 'var(--high)' },
  ];

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Title */}
      <div>
        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Task Title *
        </label>
        <input
          className="input-field"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Description
        </label>
        <textarea
          className="input-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details or notes..."
          rows={2}
          style={{ resize: 'vertical', minHeight: '64px' }}
        />
      </div>

      {/* Priority + Due Date */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Priority
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            {priorityOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPriority(opt.value as 'low' | 'medium' | 'high')}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  borderRadius: '8px',
                  border: `1px solid ${priority === opt.value ? opt.color : 'var(--border)'}`,
                  background: priority === opt.value ? `color-mix(in srgb, ${opt.color} 15%, transparent)` : 'transparent',
                  color: priority === opt.value ? opt.color : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Due Date
          </label>
          <input
            className="input-field"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '4px' }}>
        {onCancel && (
          <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
        )}
        <button type="submit" className="btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};