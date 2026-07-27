import React from 'react';
import { FilterState } from '../types/todo';

interface TodoFilterProps {
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFilterChange, totalCount, filteredCount }) => (
  <div style={{
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    padding: '16px 20px',
    marginBottom: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'center',
  }}>
    {/* Search */}
    <div style={{ flex: '1', minWidth: '180px' }}>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '14px' }}>🔍</span>
        <input
          className="input-field"
          type="text"
          placeholder="Search tasks..."
          value={filter.search}
          onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
          style={{ paddingLeft: '36px' }}
        />
      </div>
    </div>

    {/* Status */}
    <select
      className="input-field"
      value={filter.status}
      onChange={(e) => onFilterChange({ ...filter, status: e.target.value as FilterState['status'] })}
      style={{ width: 'auto', minWidth: '130px' }}
    >
      <option value="all">All Status</option>
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
    </select>

    {/* Priority */}
    <select
      className="input-field"
      value={filter.priority}
      onChange={(e) => onFilterChange({ ...filter, priority: e.target.value as FilterState['priority'] })}
      style={{ width: 'auto', minWidth: '140px' }}
    >
      <option value="all">All Priorities</option>
      <option value="low">🟢 Low</option>
      <option value="medium">🟡 Medium</option>
      <option value="high">🔴 High</option>
    </select>

    {/* Count */}
    <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', whiteSpace: 'nowrap', marginLeft: 'auto' }}>
      {filteredCount === totalCount ? `${totalCount} tasks` : `${filteredCount} of ${totalCount}`}
    </span>
  </div>
);