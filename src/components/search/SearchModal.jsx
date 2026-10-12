import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Trophy, Gamepad2, Users, Mic, Video, User, ChevronRight } from 'lucide-react';
import Badge from '../common/Badge';

export default function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    navigateTo,
    tournaments,
    games,
    players,
    casters,
    communities,
    videos
  } = useApp();

  const [activeTab, setActiveTab] = useState('all');

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return {
        tournaments: tournaments.slice(0, 3),
        games: games.slice(0, 4),
        players: players.slice(0, 3),
        casters: casters.slice(0, 2),
        communities: communities.slice(0, 2),
        videos: videos.slice(0, 2)
      };
    }

    return {
      tournaments: tournaments.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.game.toLowerCase().includes(query) ||
          t.organizer.toLowerCase().includes(query)
      ),
      games: games.filter(
        (g) =>
          g.name.toLowerCase().includes(query) ||
          g.category.toLowerCase().includes(query) ||
          g.developer.toLowerCase().includes(query)
      ),
      players: players.filter(
        (p) =>
          p.username.toLowerCase().includes(query) ||
          p.displayName.toLowerCase().includes(query) ||
          p.favoriteGames.some((g) => g.toLowerCase().includes(query))
      ),
      casters: casters.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.handle.toLowerCase().includes(query) ||
          c.gamesCovered.some((g) => g.toLowerCase().includes(query))
      ),
      communities: communities.filter(
        (comm) =>
          comm.name.toLowerCase().includes(query) ||
          comm.game.toLowerCase().includes(query)
      ),
      videos: videos.filter(
        (v) =>
          v.title.toLowerCase().includes(query) ||
          v.creator.toLowerCase().includes(query) ||
          v.game.toLowerCase().includes(query)
      )
    };
  }, [searchQuery, tournaments, games, players, casters, communities, videos]);

  if (!isSearchOpen) return null;

  const totalResultsCount =
    filteredResults.tournaments.length +
    filteredResults.games.length +
    filteredResults.players.length +
    filteredResults.casters.length +
    filteredResults.communities.length +
    filteredResults.videos.length;

  const handleSelect = (page, params = {}) => {
    setIsSearchOpen(false);
    navigateTo(page, params);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsSearchOpen(false)}>
      <div
        className="modal-dialog"
        style={{ maxWidth: '720px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={22} style={{ color: 'var(--gold-bright)' }} />
          <input
            type="text"
            placeholder="Search tournaments, games, pro players, casters, communities, videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '1.1rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            style={{
              padding: '0.3rem 0.6rem',
              background: 'var(--surface-elevated)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '4px',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}
          >
            ESC
          </button>
        </div>

        {/* Categories Tab */}
        <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto' }}>
          {[
            { id: 'all', label: 'All Results' },
            { id: 'tournaments', label: `Tournaments (${filteredResults.tournaments.length})` },
            { id: 'games', label: `Games (${filteredResults.games.length})` },
            { id: 'players', label: `Players (${filteredResults.players.length})` },
            { id: 'casters', label: `Casters (${filteredResults.casters.length})` },
            { id: 'communities', label: `Communities (${filteredResults.communities.length})` },
            { id: 'videos', label: `Videos (${filteredResults.videos.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: activeTab === tab.id ? 'var(--gold-primary)' : 'var(--surface-elevated)',
                color: activeTab === tab.id ? '#07080B' : 'var(--text-secondary)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div style={{ padding: '1.25rem 1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {totalResultsCount === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No results found for "{searchQuery}"</p>
              <p style={{ fontSize: '0.85rem' }}>Try searching for "Valorant", "CS2", "Apex", "Kaizen", or "Grand Finals".</p>
            </div>
          ) : (
            <>
              {/* Tournaments Section */}
              {(activeTab === 'all' || activeTab === 'tournaments') && filteredResults.tournaments.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-bright)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Trophy size={14} /> Tournaments
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {filteredResults.tournaments.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => handleSelect('tournament-details', { id: t.id })}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 1rem',
                          background: 'var(--surface-elevated)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold-primary)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{t.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {t.game} • {t.prizePool} • {t.registeredSlots}/{t.totalSlots} Slots
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <Badge type={t.statusType}>{t.status}</Badge>
                          <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Games Section */}
              {(activeTab === 'all' || activeTab === 'games') && filteredResults.games.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-bright)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Gamepad2 size={14} /> Games
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                    {filteredResults.games.map((g) => (
                      <div
                        key={g.id}
                        onClick={() => handleSelect('game-details', { id: g.id })}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem',
                          background: 'var(--surface-elevated)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold-primary)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                      >
                        <div style={{ fontSize: '1.4rem' }}>{g.icon}</div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{g.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{g.activeTournaments} Tournaments</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Players Section */}
              {(activeTab === 'all' || activeTab === 'players') && filteredResults.players.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-bright)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={14} /> Pro Players
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {filteredResults.players.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelect('player-profile', { id: p.id })}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.65rem 1rem',
                          background: 'var(--surface-elevated)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold-primary)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={p.avatar} alt={p.username} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--gold-primary)' }} />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{p.username}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.displayName} • {p.rank}</div>
                          </div>
                        </div>
                        <Badge type="gold">{p.tier}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Casters Section */}
              {(activeTab === 'all' || activeTab === 'casters') && filteredResults.casters.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-bright)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mic size={14} /> Casters & Commentators
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {filteredResults.casters.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleSelect('caster-profile', { id: c.id })}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.65rem 1rem',
                          background: 'var(--surface-elevated)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold-primary)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={c.avatar} alt={c.name} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--gold-primary)' }} />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{c.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.handle} • {c.role}</div>
                          </div>
                        </div>
                        {c.isLive && <Badge type="live">LIVE CASTING</Badge>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
