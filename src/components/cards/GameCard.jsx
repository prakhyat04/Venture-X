import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Radio, Users, ArrowUpRight } from 'lucide-react';
import Button from '../common/Button';

export default function GameCard({ game }) {
  const { navigateTo } = useApp();

  return (
    <div
      className="VentureX-card"
      onClick={() => navigateTo('game-details', { id: game.id })}
      style={{ cursor: 'pointer' }}
    >
      <div className="VentureX-card-media" style={{ aspectRatio: '16 / 10' }}>
        <img src={game.banner} alt={game.name} className="VentureX-card-img" />
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(7, 8, 11, 0.85)',
            border: '1px solid rgba(201, 162, 39, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem'
          }}
        >
          {game.icon}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            background: 'rgba(7, 8, 11, 0.85)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--gold-bright)',
            textTransform: 'uppercase'
          }}
        >
          {game.category}
        </div>
      </div>

      <div className="VentureX-card-body">
        <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          {game.name}
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '0.5rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Trophy size={14} style={{ color: 'var(--gold-primary)' }} />
            <span>{game.activeTournaments} Tournaments</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Radio size={14} style={{ color: 'var(--live-red)' }} />
            <span>{game.liveStreams} Live Streams</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Users size={14} style={{ color: 'var(--text-muted)' }} />
            <span>{game.communityCount}</span>
          </div>
          <div style={{ color: 'var(--gold-bright)', fontWeight: 700 }}>
            {game.prizeDistributed}
          </div>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            navigateTo('game-details', { id: game.id });
          }}
          style={{ width: '100%', marginTop: 'auto', display: 'flex', justifyContent: 'center' }}
        >
          <span>Explore Game VentureX</span>
          <ArrowUpRight size={14} />
        </Button>
      </div>
    </div>
  );
}
