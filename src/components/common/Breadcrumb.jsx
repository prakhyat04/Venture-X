import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Breadcrumb({ items = [] }) {
  const { navigateTo } = useApp();

  return (
    <nav className="breadcrumb-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
      <button
        onClick={() => navigateTo('home')}
        style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', cursor: 'pointer' }}
      >
        <Home size={14} />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight size={13} style={{ opacity: 0.5 }} />
            {isLast ? (
              <span style={{ color: 'var(--gold-bright)', fontWeight: 600 }}>{item.label}</span>
            ) : (
              <button
                onClick={() => item.page && navigateTo(item.page, item.params || {})}
                style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
