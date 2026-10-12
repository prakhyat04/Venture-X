import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import Badge from '../components/common/Badge';
import GoldButton from '../components/common/GoldButton';
import Button from '../components/common/Button';
import {
  Trophy,
  Award,
  Target,
  Shield,
  Gamepad2,
  Calendar,
  Sparkles,
  Users,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function PlayerProfilePage() {
  const { pageParams, players, user, triggerToast } = useApp();
  const [isFollowing, setIsFollowing] = useState(false);

  const player = players.find((p) => p.id === pageParams.id) || players[0];

  const handleFollow = () => {
    setIsFollowing((prev) => !prev);
    triggerToast(
      isFollowing ? 'Unfollowed Player' : 'Followed Player! ⭐',
      isFollowing ? `You unfollowed ${player.username}.` : `You are now following ${player.username}'s tournament journey!`,
      'gold'
    );
  };

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb
        items={[
          { label: 'Players', page: 'players' },
          { label: player.username }
        ]}
      />

      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div className="profile-banner-wrap">
          <img src={player.coverImage} alt={player.username} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
          <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
            <Badge type="gold">{player.tier}</Badge>
          </div>
        </div>

        <div className="profile-info-row">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div className="profile-avatar-box">
              <img src={player.avatar} alt={player.username} className="profile-avatar-img" />
            </div>

            <div className="profile-text-meta">
              <div className="profile-username">
                <span>{player.username}</span>
                <CheckCircle2 size={20} style={{ color: 'var(--gold-bright)' }} />
              </div>
              <div className="profile-realname">
                {player.displayName} • {player.country} • Team: <strong style={{ color: 'var(--gold-bright)' }}>{player.currentTeam}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <GoldButton size="md" onClick={handleFollow} withParticles={true}>
              {isFollowing ? 'Following ✓' : '+ Follow Player'}
            </GoldButton>
            <Button size="md" variant="secondary" onClick={() => triggerToast('Profile Link Copied', 'Share this profile with teammates.', 'info')}>
              <Share2 size={16} />
            </Button>
          </div>
        </div>

        {/* Bio Strip */}
        <div style={{ padding: '0 2rem 1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '750px', lineHeight: 1.6 }}>
            {player.bio}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Favorite Games:
            </span>
            {player.favoriteGames.map((g, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  background: 'var(--surface-elevated)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--gold-bright)'
                }}
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="profile-stats-grid">
          <div className="profile-stat-box">
            <div className="profile-stat-num">{player.stats.winRate}</div>
            <div className="profile-stat-lbl">Win Rate</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-num">{player.stats.kdRatio}</div>
            <div className="profile-stat-lbl">Career K/D</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-num">{player.stats.tournamentsWon}</div>
            <div className="profile-stat-lbl">Tournaments Won</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-num" style={{ color: 'var(--gold-highlight)' }}>
              {player.stats.totalEarnings}
            </div>
            <div className="profile-stat-lbl">Total Career Prize</div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Achievements & Recent Match History */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Achievements Showcase */}
        <div style={{ background: 'var(--surface-card)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy size={18} style={{ color: 'var(--gold-bright)' }} />
            <span>HONORS & CHAMPIONSHIPS</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {player.achievements.map((ach, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: 'var(--surface-elevated)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(201, 162, 39, 0.2)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ fontSize: '1.5rem' }}>{ach.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--gold-bright)' }}>
                      {ach.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {ach.event}
                    </div>
                  </div>
                </div>

                <Badge type="gold">{ach.date}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Matches */}
        <div style={{ background: 'var(--surface-card)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={18} style={{ color: 'var(--gold-bright)' }} />
            <span>RECENT COMPETITIVE MATCHES</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {player.recentMatches.map((match, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: 'var(--surface-elevated)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    Map: {match.map} ({match.score})
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Kills: {match.kills} • Deaths: {match.deaths} • Match Rating: <strong>{match.rating}</strong>
                  </div>
                </div>

                <Badge type={match.result === 'VICTORY' ? 'open' : 'soon'}>
                  {match.result}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
