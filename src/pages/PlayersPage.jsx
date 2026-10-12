import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import PlayerCard from '../components/cards/PlayerCard';
import { Award, Search, Trophy, Shield } from 'lucide-react';
import GoldButton from '../components/common/GoldButton';

export default function PlayersPage() {
  const { players, navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');

  const filteredPlayers = players.filter((p) => {
    const matchSearch =
      p.username.toLowerCase().includes(search.toLowerCase()) ||
      p.displayName.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase());
    const matchTier = tierFilter === 'all' || p.tier === tierFilter;
    return matchSearch && matchTier;
  });

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb items={[{ label: 'Pro Players & Leaderboard' }]} />

      {/* Page Header */}
      <div className="section-header">
        <div className="section-title-wrap">
          <div className="section-tag">GLOBAL LEADERBOARD</div>
          <h1 className="section-title">TOP RANKED PLAYERS</h1>
          <p className="section-desc">
            Explore elite competitive gladiators, seasonal win rates, K/D ratios, and verified championship badges.
          </p>
        </div>

        <GoldButton size="sm" onClick={() => navigateTo('register')} icon={<Shield size={16} />}>
          Register as Player
        </GoldButton>
      </div>

      {/* Search & Filter Bar */}
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
            placeholder="Search player username, handle, or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.25rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'GRANDMASTER', 'CONQUEROR', 'GLOBAL ELITE'].map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: tierFilter === t ? 'var(--gold-primary)' : 'var(--surface-elevated)',
                color: tierFilter === t ? '#07080B' : 'var(--text-secondary)',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer'
              }}
            >
              {t === 'all' ? 'All Tiers' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid-3">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
