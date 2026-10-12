import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import Badge from '../components/common/Badge';
import GoldButton from '../components/common/GoldButton';
import Button from '../components/common/Button';
import TournamentCard from '../components/cards/TournamentCard';
import CasterCard from '../components/cards/CasterCard';
import PlayerCard from '../components/cards/PlayerCard';
import {
  Users,
  Trophy,
  Mic,
  ShieldCheck,
  Megaphone,
  Calendar,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function CommunityDetailsPage() {
  const { pageParams, communities, tournaments, casters, players, user, toggleFollowCommunity, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('tournaments');

  const community = communities.find((c) => c.id === pageParams.id) || communities[0];
  const isJoined = user.savedCommunities.includes(community.id);

  const communityTournaments = tournaments.filter((t) => t.gameId === community.gameId);
  const communityCasters = casters.filter((c) => c.gamesCovered.some((g) => g.toLowerCase().includes(community.game.toLowerCase().split(' ')[0])));
  const communityPlayers = players.filter((p) => p.favoriteGames.some((g) => g.toLowerCase().includes(community.game.toLowerCase().split(' ')[0])));

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb
        items={[
          { label: 'Communities', page: 'communities' },
          { label: community.name }
        ]}
      />

      {/* Community Header Banner Card */}
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '2.5rem',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div style={{ position: 'relative', height: '220px' }}>
          <img src={community.banner} alt={community.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, var(--surface-card) 0%, rgba(7, 8, 11, 0.5) 100%)' }} />

          <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
            <Badge type="gold">
              <ShieldCheck size={14} /> OFFICIAL VERIFIED GUILD
            </Badge>
          </div>
        </div>

        <div style={{ padding: '0 2rem 2rem', marginTop: '-40px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-elevated)',
                  border: '3px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
                }}
              >
                {community.avatar}
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold-bright)', fontWeight: 800, textTransform: 'uppercase' }}>
                  {community.game} FEDERATION
                </div>
                <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {community.name}
                </h1>
              </div>
            </div>

            <GoldButton
              size="md"
              onClick={() => toggleFollowCommunity(community.id)}
              icon={<Users size={16} />}
            >
              {isJoined ? 'Joined Member ✓' : 'Join Community'}
            </GoldButton>
          </div>

          <div
            style={{
              marginTop: '1.25rem',
              padding: '1rem 1.25rem',
              background: 'rgba(201, 162, 39, 0.08)',
              border: '1px solid rgba(201, 162, 39, 0.25)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--gold-bright)',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            🛡️ <strong>Official Statement:</strong> This community organizes and manages competitive activities, daily scrims, and verified tournaments for {community.game}.
          </div>

          {/* Metrics bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', background: 'var(--surface-elevated)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', marginTop: '1.5rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registered Members</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>{community.membersCount}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Tournaments</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--gold-bright)' }}>{community.activeTournamentsCount}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Official Casters</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>{community.castersCount} Verified</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lead Admin</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold-highlight)' }}>{community.leadAdmin}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Board */}
      <div style={{ background: 'var(--surface-card)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-bright)' }}>
          <Megaphone size={18} />
          <span>COMMUNITY ANNOUNCEMENTS</span>
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {community.announcements.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--surface-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Posted by {item.author}
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-bright)', whiteSpace: 'nowrap' }}>{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        {[
          { id: 'tournaments', label: `Active Tournaments (${communityTournaments.length})` },
          { id: 'casters', label: `Community Casters (${communityCasters.length})` },
          { id: 'players', label: `Top Roster Players (${communityPlayers.length})` }
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
          <div className="grid-3">
            {communityTournaments.map((t) => (
              <TournamentCard key={t.id} tournament={t} />
            ))}
          </div>
        )}

        {activeTab === 'casters' && (
          <div className="grid-3">
            {communityCasters.map((c) => (
              <CasterCard key={c.id} caster={c} />
            ))}
          </div>
        )}

        {activeTab === 'players' && (
          <div className="grid-3">
            {communityPlayers.map((p) => (
              <PlayerCard key={p.id} player={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
