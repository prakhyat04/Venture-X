import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import TournamentCard from '../components/cards/TournamentCard';
import GameCard from '../components/cards/GameCard';
import PlayerCard from '../components/cards/PlayerCard';
import CasterCard from '../components/cards/CasterCard';
import CommunityCard from '../components/cards/CommunityCard';
import VideoCard from '../components/cards/VideoCard';
import { Search, Trophy, Gamepad2, Users, Mic, Video, Award } from 'lucide-react';

export default function SearchPage() {
  const { tournaments, games, players, casters, communities, videos } = useApp();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { tournaments, games, players, casters, communities, videos };
    }
    return {
      tournaments: tournaments.filter((t) => t.title.toLowerCase().includes(q) || t.game.toLowerCase().includes(q)),
      games: games.filter((g) => g.name.toLowerCase().includes(q) || g.category.toLowerCase().includes(q)),
      players: players.filter((p) => p.username.toLowerCase().includes(q) || p.displayName.toLowerCase().includes(q)),
      casters: casters.filter((c) => c.name.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q)),
      communities: communities.filter((comm) => comm.name.toLowerCase().includes(q) || comm.game.toLowerCase().includes(q)),
      videos: videos.filter((v) => v.title.toLowerCase().includes(q) || v.creator.toLowerCase().includes(q))
    };
  }, [query, tournaments, games, players, casters, communities, videos]);

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb items={[{ label: 'Global Search' }]} />

      <div className="section-header">
        <div className="section-title-wrap">
          <div className="section-tag">GLOBAL DISCOVERY</div>
          <h1 className="section-title">SEARCH VENTUREX</h1>
          <p className="section-desc">
            Instant real-time search across tournaments, games, player leaderboards, verified casters, and community guilds.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '2rem'
        }}
      >
        <div style={{ position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: 'var(--gold-bright)' }} />
          <input
            type="text"
            placeholder="Type anything to search VentureX eSports (e.g. Valorant, BGMI, Kaizen, Finals)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '3rem', fontSize: '1.1rem', height: '52px' }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        {[
          { id: 'all', label: 'All Results' },
          { id: 'tournaments', label: `Tournaments (${results.tournaments.length})` },
          { id: 'games', label: `Games (${results.games.length})` },
          { id: 'players', label: `Players (${results.players.length})` },
          { id: 'casters', label: `Casters (${results.casters.length})` },
          { id: 'communities', label: `Communities (${results.communities.length})` },
          { id: 'videos', label: `Videos (${results.videos.length})` }
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

      {/* Results */}
      <div>
        {(activeTab === 'all' || activeTab === 'tournaments') && results.tournaments.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Trophy size={18} /> Tournaments ({results.tournaments.length})
            </h3>
            <div className="grid-3">
              {results.tournaments.map((t) => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'games') && results.games.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Gamepad2 size={18} /> Games ({results.games.length})
            </h3>
            <div className="grid-4">
              {results.games.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'players') && results.players.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} /> Pro Players ({results.players.length})
            </h3>
            <div className="grid-3">
              {results.players.map((p) => (
                <PlayerCard key={p.id} player={p} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'casters') && results.casters.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mic size={18} /> Casters ({results.casters.length})
            </h3>
            <div className="grid-3">
              {results.casters.map((c) => (
                <CasterCard key={c.id} caster={c} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'communities') && results.communities.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} /> Communities ({results.communities.length})
            </h3>
            <div className="grid-3">
              {results.communities.map((comm) => (
                <CommunityCard key={comm.id} community={comm} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'videos') && results.videos.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Video size={18} /> Video Highlights ({results.videos.length})
            </h3>
            <div className="grid-4">
              {results.videos.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
