import React from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../common/Badge';
import { Mic, Globe, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';

export default function CasterCard({ caster }) {
  const { navigateTo, user, toggleFollowCaster } = useApp();

  const isFollowed = user.followedCasters.includes(caster.id);

  return (
    <div
      className="arena-card"
      onClick={() => navigateTo('caster-profile', { id: caster.id })}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', height: '80px', background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.18) 0%, rgba(13, 16, 21, 0.8) 100%)' }}>
        <div style={{ position: 'absolute', top: '10px', right: '12px' }}>
          {caster.isLive ? <Badge type="live">LIVE CASTING</Badge> : <Badge type="gold">VERIFIED CASTER</Badge>}
        </div>
      </div>

      <div className="arena-card-body" style={{ marginTop: '-40px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <img
            src={caster.avatar}
            alt={caster.name}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '3px solid var(--gold-primary)',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)'
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--gold-bright)', fontSize: '0.8rem', fontWeight: 700 }}>
            <Star size={14} fill="currentColor" />
            <span>{caster.stats.rating}</span>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>{caster.name}</span>
            {caster.verified && <CheckCircle2 size={15} style={{ color: 'var(--gold-bright)' }} />}
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {caster.handle} • {caster.role}
          </p>
        </div>

        {/* Games & Languages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Mic size={14} style={{ color: 'var(--gold-primary)' }} />
            <span>{caster.gamesCovered.join(' • ')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Globe size={14} style={{ color: 'var(--text-muted)' }} />
            <span>{caster.languages.join(', ')}</span>
          </div>
        </div>

        {/* Stats Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--surface-elevated)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Casted: </span>
            <strong style={{ color: 'var(--text-primary)' }}>{caster.stats.matchesCasted}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Peak: </span>
            <strong style={{ color: 'var(--gold-bright)' }}>{caster.stats.peakViewers}</strong>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', marginTop: 'auto' }}>
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              navigateTo('caster-profile', { id: caster.id });
            }}
          >
            <span>View Caster Desk</span>
          </Button>

          <Button
            size="sm"
            variant={isFollowed ? 'outline-gold' : 'secondary'}
            onClick={(e) => {
              e.stopPropagation();
              toggleFollowCaster(caster.id);
            }}
            withParticles={true}
          >
            {isFollowed ? 'Followed' : 'Follow'}
          </Button>
        </div>
      </div>
    </div>
  );
}
