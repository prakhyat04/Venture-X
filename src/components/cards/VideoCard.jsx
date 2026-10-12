import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Eye, Clock } from 'lucide-react';

export default function VideoCard({ video }) {
  const { navigateTo } = useApp();

  return (
    <div
      className="VentureX-card"
      onClick={() => navigateTo('video-details', { id: video.id })}
      style={{ cursor: 'pointer' }}
    >
      <div className="VentureX-card-media">
        <img src={video.thumbnail} alt={video.title} className="VentureX-card-img" />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(7, 8, 11, 0.85)',
            border: '2px solid var(--gold-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-bright)',
            boxShadow: '0 0 16px rgba(201, 162, 39, 0.4)',
            transition: 'all var(--transition-fast)'
          }}
        >
          <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '12px',
            background: 'rgba(0, 0, 0, 0.85)',
            padding: '2px 6px',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#FFFFFF'
          }}
        >
          {video.duration}
        </div>

        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '12px',
            background: 'rgba(201, 162, 39, 0.2)',
            border: '1px solid rgba(201, 162, 39, 0.4)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.7rem',
            fontWeight: 800,
            color: 'var(--gold-bright)',
            textTransform: 'uppercase'
          }}
        >
          {video.category}
        </div>
      </div>

      <div className="VentureX-card-body">
        <h4
          style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {video.title}
        </h4>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: 'auto' }}>
          <img
            src={video.creatorAvatar}
            alt={video.creator}
            style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{video.creator}</span> • {video.views} views • {video.date}
          </div>
        </div>
      </div>
    </div>
  );
}
