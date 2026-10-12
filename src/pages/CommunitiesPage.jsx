import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import CommunityCard from '../components/cards/CommunityCard';
import { Users, Search, ShieldCheck } from 'lucide-react';
import GoldButton from '../components/common/GoldButton';

export default function CommunitiesPage() {
  const { communities, navigateTo } = useApp();
  const [search, setSearch] = useState('');

  const filteredCommunities = communities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.game.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb items={[{ label: 'Communities' }]} />

      {/* Page Header */}
      <div className="section-header">
        <div className="section-title-wrap">
          <div className="section-tag">VERIFIED eSPORTS GUILDS</div>
          <h1 className="section-title">GAMING COMMUNITIES</h1>
          <p className="section-desc">
            Explore dedicated competitive communities organizing verified tournaments, scrims, and caster desks for each game.
          </p>
        </div>

        <GoldButton size="sm" onClick={() => navigateTo('register')} icon={<Users size={16} />}>
          Create / Register Guild
        </GoldButton>
      </div>

      {/* Search Bar */}
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '2.5rem'
        }}
      >
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search communities by name or game discipline..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.25rem' }}
          />
        </div>
      </div>

      {/* Community Cards Grid */}
      <div className="grid-3">
        {filteredCommunities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>
    </div>
  );
}
