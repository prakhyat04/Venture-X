import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import StreamPlayer from '../components/stream/StreamPlayer';
import LiveStreamCard from '../components/cards/LiveStreamCard';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import GoldButton from '../components/common/GoldButton';
import { Radio, Filter, Gamepad2, PlusCircle, Sparkles } from 'lucide-react';

export default function LivePage() {
  const { liveStreams, pageParams, navigateTo } = useApp();
  const [selectedGameFilter, setSelectedGameFilter] = useState('all');

  // Select stream based on params or default to first
  const initialStream = pageParams.streamId
    ? liveStreams.find((s) => s.id === pageParams.streamId) || liveStreams[0]
    : liveStreams[0];

  const [activeStream, setActiveStream] = useState(initialStream);

  const filteredStreams = liveStreams.filter((s) => {
    if (selectedGameFilter === 'all') return true;
    return s.gameId === selectedGameFilter;
  });

  return (
    <div className="container-wide section animate-fade-in">
      <Breadcrumb items={[{ label: 'Live Broadcasts' }]} />

      {/* Page Header */}
      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <div className="section-title-wrap">
          <div className="section-tag" style={{ color: 'var(--live-red)' }}>
            <span className="live-dot" /> eSPORTS THEATER
          </div>
          <h1 className="section-title">LIVE BROADCASTS</h1>
          <p className="section-desc">
            Watch official tournament championships, caster commentary, and pro player points-of-view in 1080p60.
          </p>
        </div>

        <GoldButton size="sm" onClick={() => navigateTo('create-stream')} icon={<Radio size={14} />}>
          Go Live / Start Broadcast
        </GoldButton>
      </div>

      {/* Main Theater Stream Player */}
      <StreamPlayer key={activeStream.id} stream={activeStream} />

      {/* Filter Strip */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'all', label: 'All Channels' },
            { id: 'valorant', label: 'VALORANT' },
            { id: 'bgmi', label: 'BGMI' },
            { id: 'cs2', label: 'CS2' },
            { id: 'apex-legends', label: 'Apex Legends' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedGameFilter(tab.id)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: selectedGameFilter === tab.id ? 'var(--gold-primary)' : 'var(--surface-card)',
                color: selectedGameFilter === tab.id ? '#07080B' : 'var(--text-secondary)',
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

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredStreams.length}</strong> active live feeds
        </div>
      </div>

      {/* Other Live Streams Grid */}
      <div className="grid-3">
        {filteredStreams.map((stream) => (
          <div
            key={stream.id}
            onClick={() => {
              setActiveStream(stream);
              window.scrollTo({ top: 120, behavior: 'smooth' });
            }}
            style={{ cursor: 'pointer' }}
          >
            <LiveStreamCard stream={stream} />
          </div>
        ))}
      </div>
    </div>
  );
}
