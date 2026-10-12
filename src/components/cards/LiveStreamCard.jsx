import React from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import { Play, Eye, Radio } from 'lucide-react';

export default function LiveStreamCard({ stream }) {
  const { navigateTo } = useApp();

  return (
    <div
      className="VentureX-card"
      onClick={() => navigateTo('live', { streamId: stream.id })}
      style={{ cursor: 'pointer' }}
    >
      <div className="VentureX-card-media">
        <img src={stream.thumbnail} alt={stream.title} className="VentureX-card-img" />
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          <Badge type="live">LIVE</Badge>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              borderRadius: 'var(--radius-xs)',
              background: 'rgba(0, 0, 0, 0.75)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-primary)'
            }}
          >
            <Eye size={12} style={{ color: 'var(--live-red)' }} />
            {stream.viewers}
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '12px',
            background: 'rgba(7, 8, 11, 0.85)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--gold-bright)'
          }}
        >
          {stream.game}
        </div>
      </div>

      <div className="VentureX-card-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img
            src={stream.streamerAvatar}
            alt={stream.streamer}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '2px solid var(--gold-primary)',
              objectFit: 'cover'
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h4
              style={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.3,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {stream.title}
            </h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {stream.streamer} • {stream.casters}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
          {stream.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.7rem',
                padding: '2px 6px',
                background: 'var(--surface-elevated)',
                borderRadius: '3px',
                color: 'var(--text-secondary)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
