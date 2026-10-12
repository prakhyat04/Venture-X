import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import Badge from '../components/common/Badge';
import GoldButton from '../components/common/GoldButton';
import Button from '../components/common/Button';
import TournamentCard from '../components/cards/TournamentCard';
import CommunityCard from '../components/cards/CommunityCard';
import CasterCard from '../components/cards/CasterCard';
import {
  User,
  Trophy,
  Award,
  Gamepad2,
  Settings,
  Shield,
  Radio,
  Sparkles,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export default function UserProfilePage() {
  const { user, tournaments, communities, casters, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('tournaments');

  const registeredTournaments = tournaments.filter((t) =>
    user.registeredTournaments.includes(t.id)
  );

  const savedCommunities = communities.filter((c) =>
    user.savedCommunities.includes(c.id)
  );

  const followedCasters = casters.filter((c) =>
    user.followedCasters.includes(c.id)
  );

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb items={[{ label: 'My VentureX Profile' }]} />

      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div className="profile-banner-wrap">
          <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
            <Badge type="gold">{user.tier}</Badge>
            <Badge type="open">{user.role}</Badge>
          </div>
        </div>

        <div className="profile-info-row">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div className="profile-avatar-box">
              <img src={user.avatar} alt={user.username} className="profile-avatar-img" />
            </div>

            <div className="profile-text-meta">
              <div className="profile-username">
                <span>{user.username}</span>
                <CheckCircle2 size={20} style={{ color: 'var(--gold-bright)' }} />
              </div>
              <div className="profile-realname">
                {user.displayName} • {user.email} • {user.country}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button size="md" variant="secondary" onClick={() => navigateTo('settings')} icon={<Settings size={16} />}>
              Edit Settings
            </Button>
            <GoldButton size="md" onClick={() => navigateTo('create-stream')} icon={<Radio size={16} />}>
              Stream Desk
            </GoldButton>
          </div>
        </div>

        {/* Bio & Details */}
        <div style={{ padding: '0 2rem 1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '750px', lineHeight: 1.6 }}>
            {user.bio}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Main Titles:
            </span>
            {user.favoriteGames.map((g, idx) => (
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
            <div className="profile-stat-num">{user.stats.matchesPlayed}</div>
            <div className="profile-stat-lbl">Matches Played</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-num">{user.stats.winRate}</div>
            <div className="profile-stat-lbl">Win Ratio</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-num">{user.stats.tournamentsJoined}</div>
            <div className="profile-stat-lbl">Tournaments Joined</div>
          </div>
          <div className="profile-stat-box">
            <div className="profile-stat-num" style={{ color: 'var(--gold-highlight)' }}>
              {user.stats.trophiesCount} 🏆
            </div>
            <div className="profile-stat-lbl">Trophies & Badges</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        {[
          { id: 'tournaments', label: `My Registered Tournaments (${registeredTournaments.length})` },
          { id: 'communities', label: `Saved Communities (${savedCommunities.length})` },
          { id: 'casters', label: `Followed Casters (${followedCasters.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'tournaments' && (
          <div>
            {registeredTournaments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--surface-card)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>You have not registered for any tournaments yet.</p>
                <GoldButton onClick={() => navigateTo('tournaments')}>Browse Open Cups</GoldButton>
              </div>
            ) : (
              <div className="grid-3">
                {registeredTournaments.map((t) => (
                  <TournamentCard key={t.id} tournament={t} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'communities' && (
          <div>
            {savedCommunities.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--surface-card)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>You have not joined any game communities yet.</p>
                <GoldButton onClick={() => navigateTo('communities')}>Explore Communities</GoldButton>
              </div>
            ) : (
              <div className="grid-3">
                {savedCommunities.map((c) => (
                  <CommunityCard key={c.id} community={c} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'casters' && (
          <div>
            {followedCasters.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--surface-card)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>You are not following any casters yet.</p>
                <GoldButton onClick={() => navigateTo('casters')}>Discover Casters</GoldButton>
              </div>
            ) : (
              <div className="grid-3">
                {followedCasters.map((c) => (
                  <CasterCard key={c.id} caster={c} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
