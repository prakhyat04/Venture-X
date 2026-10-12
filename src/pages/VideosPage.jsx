import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import VideoCard from '../components/cards/VideoCard';
import { Video, Search, Play, Sparkles } from 'lucide-react';
import GoldButton from '../components/common/GoldButton';

export default function VideosPage() {
  const { videos, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

  const categories = [
    { id: 'all', label: 'All Videos' },
    { id: 'Highlights', label: 'Highlights' },
    { id: 'Match Recaps', label: 'Match Recaps' },
    { id: 'Tournament Moments', label: 'Tournament Moments' },
    { id: 'Player Clips', label: 'Player Clips' }
  ];

  const filteredVideos = videos.filter((v) => {
    const matchCat = selectedCategory === 'all' || v.category === selectedCategory;
    const matchSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.creator.toLowerCase().includes(search.toLowerCase()) ||
      v.game.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb items={[{ label: 'Video Vault' }]} />

      {/* Page Header */}
      <div className="section-header">
        <div className="section-title-wrap">
          <div className="section-tag">CLUTCHES & VOD ARCHIVE</div>
          <h1 className="section-title">eSPORTS VIDEO VAULT</h1>
          <p className="section-desc">
            Watch legendary clutches, tournament championship recaps, strategy breakdowns, and pro player highlight moments.
          </p>
        </div>

        <GoldButton size="sm" onClick={() => navigateTo('create-stream')} icon={<Play size={16} />}>
          Upload / Stream Clip
        </GoldButton>
      </div>

      {/* Filter and Search Bar */}
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
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search clip title, creator, or game..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.25rem' }}
          />
        </div>

        {/* Categories Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: selectedCategory === cat.id ? 'var(--gold-primary)' : 'var(--surface-elevated)',
                color: selectedCategory === cat.id ? '#07080B' : 'var(--text-secondary)',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid-4">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
