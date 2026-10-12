import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import GameCard from '../components/cards/GameCard';
import { Gamepad2, Search, Sparkles } from 'lucide-react';

export default function GamesPage() {
  const { games } = useApp();
  const [search, setSearch] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const filteredGames = games.filter((g) => {
    const matchSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase());
    const matchPlatform =
      selectedPlatform === 'all' || g.platforms.includes(selectedPlatform);
    return matchSearch && matchPlatform;
  });

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb items={[{ label: 'Supported Games' }]} />

      {/* Page Header */}
      <div className="section-header">
        <div className="section-title-wrap">
          <div className="section-tag">COMPETITIVE DISCIPLINES</div>
          <h1 className="section-title">SUPPORTED eSPORTS GAMES</h1>
          <p className="section-desc">
            Explore dedicated competitive hubs, active tournament brackets, and verified player communities for the world's biggest esports titles.
          </p>
        </div>
      </div>

      {/* Search & Platform Filter Bar */}
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '2.5rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search game title or genre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.25rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'PC', 'Mobile', 'PlayStation'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPlatform(p)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: selectedPlatform === p ? 'var(--gold-primary)' : 'var(--surface-elevated)',
                color: selectedPlatform === p ? '#07080B' : 'var(--text-secondary)',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer'
              }}
            >
              {p === 'all' ? 'All Platforms' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid-4">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
