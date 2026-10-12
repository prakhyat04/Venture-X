import React from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import { Users, Trophy, Radio, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';

export default function CommunityCard({ community }) {
  const { navigateTo, user, toggleFollowCommunity } = useApp();

  const isJoined = user.savedCommunities.includes(community.id);

  return (
    <div
      className="VentureX-card"
      onClick={() => navigateTo('community-details', { id: community.id })}
      style={{ cursor: 'pointer' }}
    >
      <div className="VentureX-card-media" style={{ height: '120px' }}>
        <img src={community.banner} alt={community.name} className="VentureX-card-img" />
        <div style={{ position: 'absolute', top: '10px', right: '12px' }}>
          <Badge type="gold">
            <ShieldCheck size={12} /> VERIFIED
          </Badge>
        </div>
      </div>

      <div className="VentureX-card-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '-30px', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--surface-card)',
              border: '2px solid var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)'
            }}
          >
            {community.avatar}
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {community.name}
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-bright)', fontWeight: 700 }}>
              {community.game}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '0.4rem 0' }}>
          {community.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem', background: 'var(--surface-elevated)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontSize: '0.75rem' }}>
          <div>
            <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{community.membersCount.split(' ')[0]}</div>
            <div style={{ color: 'var(--text-muted)' }}>Members</div>
          </div>
          <div>
            <div style={{ fontWeight: 800, color: 'var(--gold-bright)' }}>{community.activeTournamentsCount}</div>
            <div style={{ color: 'var(--text-muted)' }}>Tourneys</div>
          </div>
          <div>
            <div style={{ fontWeight: 800, color: 'var(--live-red)' }}>{community.liveEventsCount}</div>
            <div style={{ color: 'var(--text-muted)' }}>Live Events</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', marginTop: 'auto' }}>
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              navigateTo('community-details', { id: community.id });
            }}
          >
            <span>Open Community</span>
          </Button>

          <Button
            size="sm"
            variant={isJoined ? 'outline-gold' : 'secondary'}
            onClick={(e) => {
              e.stopPropagation();
              toggleFollowCommunity(community.id);
            }}
            withParticles={true}
          >
            {isJoined ? 'Joined ✓' : 'Join'}
          </Button>
        </div>
      </div>
    </div>
  );
}
