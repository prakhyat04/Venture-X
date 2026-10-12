import React from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import { Trophy, Target, Award, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function PlayerCard({ player }) {
  const { navigateTo } = useApp();

  return (
    <div
      className="VentureX-card"
      onClick={() => navigateTo('player-profile', { id: player.id })}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', height: '90px', background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.2) 0%, rgba(13, 16, 21, 0.9) 100%)', overflow: 'hidden' }}>
        <img src={player.coverImage} alt={player.username} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
        <div style={{ position: 'absolute', top: '10px', right: '12px' }}>
          <Badge type="gold">{player.tier}</Badge>
        </div>
      </div>

      <div className="VentureX-card-body" style={{ marginTop: '-45px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <img
            src={player.avatar}
            alt={player.username}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-sm)',
              border: '3px solid var(--gold-primary)',
              background: 'var(--surface-elevated)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)'
            }}
          />
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            {player.country}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {player.username}
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {player.displayName} • {player.currentTeam}
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: 'var(--surface-elevated)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--gold-bright)' }}>{player.stats.winRate}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Win Rate</div>
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--gold-bright)' }}>{player.stats.kdRatio}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>K/D</div>
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--gold-bright)' }}>{player.stats.tournamentsWon}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Trophies</div>
          </div>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            navigateTo('player-profile', { id: player.id });
          }}
          style={{ width: '100%', marginTop: 'auto' }}
        >
          <span>View Profile & Stats</span>
          <ArrowRight size={14} />
        </Button>
      </div>
    </div>
  );
}
