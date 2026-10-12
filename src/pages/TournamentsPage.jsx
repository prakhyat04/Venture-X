import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import TournamentCard from '../components/cards/TournamentCard';
import Button from '../components/common/Button';
import GoldButton from '../components/common/GoldButton';
import { Trophy, Search, Filter, Sparkles, Shield, CheckCircle2 } from 'lucide-react';

export default function TournamentsPage() {
  const { tournaments, navigateTo } = useApp();
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTournaments = useMemo(() => {
    return tournaments.filter((t) => {
      const matchGame = selectedGame === 'all' || t.gameId === selectedGame;
      const matchStatus = selectedStatus === 'all' || t.statusType === selectedStatus;
      const matchSearch =
        !searchQuery.trim() ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.organizer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGame && matchStatus && matchSearch;
    });
  }, [tournaments, selectedGame, selectedStatus, searchQuery]);

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb items={[{ label: 'Tournaments' }]} />

      {/* Page Header */}
      <div className="section-header">
        <div className="section-title-wrap">
          <div className="section-tag">COMPETITIVE BRACKETS</div>
          <h1 className="section-title">ESPORTS TOURNAMENTS</h1>
          <p className="section-desc">
            Discover running cups, open qualifiers, and championship brackets. Register your team to compete for cash prizes and verified prestige.
          </p>
        </div>

        <GoldButton size="sm" onClick={() => navigateTo('register')} icon={<Shield size={16} />}>
          Register Squad
        </GoldButton>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search tournament title or organizer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.25rem' }}
            />
          </div>

          {/* Game Dropdown */}
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="form-select"
            style={{ width: 'auto', minWidth: '160px' }}
          >
            <option value="all">All Games</option>
            <option value="valorant">VALORANT</option>
            <option value="bgmi">BGMI</option>
            <option value="cs2">Counter-Strike 2</option>
            <option value="apex-legends">Apex Legends</option>
            <option value="free-fire">Free Fire MAX</option>
            <option value="call-of-duty">Call of Duty</option>
          </select>
        </div>

        {/* Status Pill Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '0.5rem' }}>
            Status:
          </span>
          {[
            { id: 'all', label: 'All Statuses' },
            { id: 'open', label: 'Registration Open' },
            { id: 'soon', label: 'Starting Soon' },
            { id: 'live', label: 'Ongoing / Live' },
            { id: 'completed', label: 'Completed' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: selectedStatus === tab.id ? 'var(--gold-primary)' : 'var(--surface-elevated)',
                color: selectedStatus === tab.id ? '#07080B' : 'var(--text-secondary)',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tournaments Grid */}
      {filteredTournaments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--surface-card)', borderRadius: 'var(--radius-md)', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <Trophy size={40} style={{ color: 'var(--gold-soft)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.35rem' }}>No Tournaments Match Your Filters</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Try resetting your filters or selecting a different game discipline.
          </p>
          <Button variant="secondary" onClick={() => { setSelectedGame('all'); setSelectedStatus('all'); setSearchQuery(''); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid-3">
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      )}
    </div>
  );
}
