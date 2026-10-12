import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import Badge from '../components/common/Badge';
import GoldButton from '../components/common/GoldButton';
import Button from '../components/common/Button';
import {
  Mic,
  Star,
  Globe,
  Radio,
  Calendar,
  Sparkles,
  CheckCircle2,
  Share2,
  Tv,
  MessageSquare,
  Video
} from 'lucide-react';

export default function CasterProfilePage() {
  const { pageParams, casters, user, toggleFollowCaster, navigateTo, triggerToast } = useApp();

  const caster = casters.find((c) => c.id === pageParams.id) || casters[0];
  const isFollowed = user.followedCasters.includes(caster.id);

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb
        items={[
          { label: 'Casters', page: 'casters' },
          { label: caster.name }
        ]}
      />

      {/* Caster Header Card */}
      <div className="profile-header-card">
        <div className="profile-banner-wrap">
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.25) 0%, rgba(13, 16, 21, 0.95) 100%)' }} />
          <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
            {caster.isLive ? <Badge type="live">LIVE ON AIR</Badge> : <Badge type="gold">VERIFIED COMMENTATOR</Badge>}
          </div>
        </div>

        <div className="profile-info-row">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div className="profile-avatar-box" style={{ borderRadius: '50%' }}>
              <img src={caster.avatar} alt={caster.name} className="profile-avatar-img" />
            </div>

            <div className="profile-text-meta">
              <div className="profile-username">
                <span>{caster.name}</span>
                <CheckCircle2 size={20} style={{ color: 'var(--gold-bright)' }} />
              </div>
              <div className="profile-realname">
                {caster.handle} • {caster.role} • Community: <strong style={{ color: 'var(--gold-bright)' }}>{caster.community}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <GoldButton size="md" onClick={() => toggleFollowCaster(caster.id)} withParticles={true}>
              {isFollowed ? 'Following Caster ✓' : '+ Follow Broadcasts'}
            </GoldButton>
            <Button size="md" variant="secondary" onClick={() => triggerToast('Caster Desk Link Copied', 'Share this caster with tournament organizers.', 'info')}>
              <Share2 size={16} />
            </Button>
          </div>
        </div>

        {/* Bio & Details */}
        <div style={{ padding: '0 2rem 1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '780px', lineHeight: 1.6 }}>
            {caster.bio}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mic size={16} style={{ color: 'var(--gold-primary)' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                {caster.gamesCovered.join(' • ')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={16} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Languages: {caster.languages.join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="profile-stats-grid">
          <div className="profile-stat-box">
            <div className="profile-stat-num">{caster.stats.matchesCasted}</div>
            <div className="profile-stat-lbl">Matches Casted</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-num">{caster.stats.peakViewers}</div>
            <div className="profile-stat-lbl">Peak Concurrent Viewers</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-num" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Star size={18} fill="currentColor" /> {caster.stats.rating}
            </div>
            <div className="profile-stat-lbl">Community Rating</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-num">{caster.stats.tournamentsHost}</div>
            <div className="profile-stat-lbl">Major Tournaments Hosted</div>
          </div>
        </div>
      </div>

      {/* Two Column: Upcoming Schedule & Broadcaster Socials */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Upcoming Broadcasts Schedule */}
        <div style={{ background: 'var(--surface-card)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} style={{ color: 'var(--gold-bright)' }} />
            <span>UPCOMING SCHEDULED BROADCASTS</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {caster.upcomingBroadcasts.map((b, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem',
                  background: 'var(--surface-elevated)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {b.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gold-bright)', marginTop: '2px' }}>
                    {b.date}
                  </div>
                </div>

                <GoldButton size="sm" onClick={() => navigateTo('live')}>
                  Tune In
                </GoldButton>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links & Booking info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'var(--surface-card)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--gold-bright)' }}>
              Caster Socials & Desk
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                <MessageSquare size={16} style={{ color: 'var(--gold-bright)' }} /> <span>{caster.socials.twitter}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                <Radio size={16} style={{ color: 'var(--live-red)' }} /> <span>{caster.socials.twitch}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                <Video size={16} style={{ color: 'var(--gold-bright)' }} /> <span>{caster.socials.youtube}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
