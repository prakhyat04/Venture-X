import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function Toast() {
  const { toasts } = useApp();

  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '380px'
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide-in"
          style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--gold-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(201, 162, 39, 0.2)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.85rem'
          }}
        >
          <div style={{ color: 'var(--gold-bright)', marginTop: '2px' }}>
            <Sparkles size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              {toast.title}
            </h5>
            {toast.message && (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {toast.message}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
