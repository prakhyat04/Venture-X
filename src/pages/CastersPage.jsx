import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import CasterCard from '../components/cards/CasterCard';
import { Mic, Search, Radio, Sparkles } from 'lucide-react';
import GoldButton from '../components/common/GoldButton';

export default function CastersPage() {
  const { casters, navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('all');

  const filteredCasters = casters.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.handle.toLowerCase().includes(search.toLowerCase()) ||
      c.gamesCovered.some((g) => g.toLowerCase().includes(search.toLowerCase()));
    const matchLang = langFilter === 'all' || c.languages.includes(langFilter);
    return matchSearch && matchLang;
  });

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb items={[{ label: 'Official Casters' }]} />

      {/* Page Header */}
      <div className="section-header">
        <div className="section-title-wrap">
          <div className="section-tag">VOICES OF VENTUREX</div>
          <h1 className="section-title">VERIFIED eSPORTS CASTERS</h1>
          <p className="section-desc">
            Discover official tournament shoutcasters, color commentators, and tactical analysts bringing match excitement to life.
          </p>
        </div>

        <GoldButton size="sm" onClick={() => navigateTo('register')} icon={<Mic size={16} />}>
          Apply as Caster
        </GoldButton>
      </div>

      {/* Search & Language Filter Bar */}
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
            placeholder="Search caster name, games, or handle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.25rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'English', 'Hindi', 'Spanish', 'German'].map((lang) => (
            <button
              key={lang}
              onClick={() => setLangFilter(lang)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: langFilter === lang ? 'var(--gold-primary)' : 'var(--surface-elevated)',
                color: langFilter === lang ? '#07080B' : 'var(--text-secondary)',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer'
              }}
            >
              {lang === 'all' ? 'All Languages' : lang}
            </button>
          ))}
        </div>
      </div>

      {/* Casters Grid */}
      <div className="grid-3">
        {filteredCasters.map((caster) => (
          <CasterCard key={caster.id} caster={caster} />
        ))}
      </div>
    </div>
  );
}
