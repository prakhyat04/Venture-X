import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import TournamentCard from '../components/cards/TournamentCard';
import LiveStreamCard from '../components/cards/LiveStreamCard';
import CommunityCard from '../components/cards/CommunityCard';
import PlayerCard from '../components/cards/PlayerCard';
import VideoCard from '../components/cards/VideoCard';
import GoldButton from '../components/common/GoldButton';
import Button from '../components/common/Button';
import { Trophy, Radio, Users, Award, Video, Gamepad2, Shield } from 'lucide-react';

export default function GameDetailsPage() {
  const { pageParams, games, tournaments, liveStreams, communities, players, videos, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('tournaments');

  const game = games.find((g) => g.id === pageParams.id) || games[0];

  const gameTournaments = tournaments.filter((t) => t.gameId === game.id);
  const gameStreams = liveStreams.filter((s) => s.gameId === game.id);
  const gameCommunities = communities.filter((c) => c.gameId === game.id);
  const gamePlayers = players.filter((p) => p.favoriteGames.some((g) => g.toLowerCase().includes(game.name.toLowerCase().split(' ')[0])));
  const gameVideos = videos.filter((v) => v.game.toLowerCase().includes(game.name.toLowerCase().split(' ')[0]));

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb
        items={[
          { label: 'Games', page: 'games' },
          { label: game.name }
        ]}
      />

      {/* Game Hub Hero Card */}
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
        <div style={{ position: 'relative', height: '260px' }}>
          <img src={game.banner} alt={game.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, var(--surface-card) 0%, rgba(7, 8, 11, 0.45) 100%)' }} />

          <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '8px' }}>
            <span style={{ background: 'rgba(0,0,0,0.85)', color: 'var(--gold-bright)', padding: '4px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gold-primary)', fontWeight: 800, fontSize: '0.8rem' }}>
              {game.platforms.join(' • ')}
            </span>
          </div>
        </div>

        <div style={{ padding: '0 2rem 2rem', marginTop: '-50px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-elevated)',
                  border: '3px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.2rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
                }}
              >
                {game.icon}
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold-bright)', fontWeight: 800, textTransform: 'uppercase' }}>
                  {game.category} • Developer: {game.developer}
                </div>
                <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {game.name} ESPORTS HUB
                </h1>
              </div>
            </div>

            <GoldButton size="md" onClick={() => navigateTo('register')} icon={<Shield size={16} />}>
              Join {game.name} Pro Ladder
            </GoldButton>
          </div>

          <p style={{ marginTop: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '800px', lineHeight: 1.6 }}>
            {game.description}
          </p>

          {/* Metrics bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', background: 'var(--surface-elevated)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', marginTop: '1.5rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Tournaments</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--gold-bright)' }}>{game.activeTournaments}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Live Broadcasts</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--live-red)' }}>{game.liveStreams}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Community Size</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>{game.communityCount}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Prize Distributed</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--gold-highlight)' }}>{game.prizeDistributed}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        {[
          { id: 'tournaments', label: `Tournaments (${gameTournaments.length})` },
          { id: 'streams', label: `Live Streams (${gameStreams.length})` },
          { id: 'communities', label: `Communities (${gameCommunities.length})` },
          { id: 'players', label: `Top Players (${gamePlayers.length})` },
          { id: 'videos', label: `Videos (${gameVideos.length})` }
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
            {gameTournaments.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No tournaments running right now for this title.</p>
            ) : (
              <div className="grid-3">
                {gameTournaments.map((t) => (
                  <TournamentCard key={t.id} tournament={t} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'streams' && (
          <div>
            {gameStreams.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No live streams active right now.</p>
            ) : (
              <div className="grid-2">
                {gameStreams.map((s) => (
                  <LiveStreamCard key={s.id} stream={s} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'communities' && (
          <div>
            {gameCommunities.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No official community listed yet.</p>
            ) : (
              <div className="grid-3">
                {gameCommunities.map((c) => (
                  <CommunityCard key={c.id} community={c} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'players' && (
          <div className="grid-3">
            {gamePlayers.map((p) => (
              <PlayerCard key={p.id} player={p} />
            ))}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="grid-4">
            {gameVideos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
