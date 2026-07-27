import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => (
  <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
    <header style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--accent), #9b8cf8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
          }}>✓</div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            {title ?? 'Ziptrrip Tasks'}
          </span>
        </div>
        <a href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none' }}>
          ← All Todos
        </a>
      </div>
    </header>
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
      {children}
    </main>
  </div>
);