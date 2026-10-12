import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import GoldButton from '../components/common/GoldButton';
import Button from '../components/common/Button';
import {
  Radio,
  Gamepad2,
  FileText,
  Users,
  Image,
  Key,
  Sparkles,
  CheckCircle,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { triggerGoldParticles } from '../utils/particleEffect';

export default function StreamSetupPage() {
  const { games, communities, user, navigateTo, triggerToast } = useApp();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State across the 7 steps
  const [selectedGame, setSelectedGame] = useState('VALORANT');
  const [streamTitle, setStreamTitle] = useState('VCT Community Watch Party & Radiant Ranked Grind');
  const [selectedCommunity, setSelectedCommunity] = useState('val-community');
  const [streamCategory, setStreamCategory] = useState('Tournament Cast');
  const [selectedThumbnail, setSelectedThumbnail] = useState(
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
  );
  const [streamKey, setStreamKey] = useState('live_venturex_pk_99482710492_x81');
  const [copiedKey, setCopiedKey] = useState(false);
  const [isLiveActive, setIsLiveActive] = useState(false);

  const stepsList = [
    { num: 1, title: 'Game', desc: 'Select Title' },
    { num: 2, title: 'Title', desc: 'Stream Name' },
    { num: 3, title: 'Guild', desc: 'Target Community' },
    { num: 4, title: 'Category', desc: 'Broadcast Type' },
    { num: 5, title: 'Visuals', desc: 'Thumbnail' },
    { num: 6, title: 'Config', desc: 'Server & Key' },
    { num: 7, title: 'Launch', desc: 'Go Live' }
  ];

  const handleCopyKey = () => {
    navigator.clipboard?.writeText(streamKey);
    setCopiedKey(true);
    triggerToast('Stream Key Copied', 'Paste into OBS or Streamlabs OBS settings.', 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleGoLive = (e) => {
    triggerGoldParticles(e, { count: 35, spread: 100 });
    setIsLiveActive(true);
    triggerToast('YOU ARE NOW LIVE! 🔴', 'Broadcast has started on VentureX theater.', 'gold');
  };

  return (
    <div className="container section animate-fade-in" style={{ maxWidth: '880px' }}>
      <Breadcrumb items={[{ label: 'Stream Setup Desk' }]} />

      {/* Page Header */}
      <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
        <div className="section-title-wrap" style={{ alignItems: 'center' }}>
          <div className="section-tag" style={{ color: 'var(--live-red)' }}>
            <span className="live-dot" /> STREAMER WORKFLOW
          </div>
          <h1 className="section-title">CREATE VENTUREX BROADCAST</h1>
          <p className="section-desc" style={{ textAlign: 'center' }}>
            Follow the 7-step wizard to configure your game, title, community guild, RTMP stream key, and go live.
          </p>
        </div>
      </div>

      {/* Wizard Step Progress Bar */}
      <div className="wizard-steps-bar">
        {stepsList.map((step) => {
          const isActive = currentStep === step.num;
          const isCompleted = currentStep > step.num;
          return (
            <div
              key={step.num}
              className={`wizard-step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => setCurrentStep(step.num)}
              style={{ cursor: 'pointer' }}
            >
              <div className="wizard-step-circle">
                {isCompleted ? <Check size={16} /> : step.num}
              </div>
              <span className="wizard-step-label">{step.title}</span>
            </div>
          );
        })}
      </div>

      {/* Main Step Container */}
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
          position: 'relative'
        }}
      >
        {/* STEP 1: SELECT GAME */}
        {currentStep === 1 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--gold-bright)' }}>
              Step 1: Select Broadcast Game
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Choose the competitive title you will be streaming today.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {games.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedGame(g.name)}
                  style={{
                    padding: '1.25rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: selectedGame === g.name ? 'rgba(201, 162, 39, 0.15)' : 'var(--surface-elevated)',
                    border: `1px solid ${selectedGame === g.name ? 'var(--gold-primary)' : 'rgba(255,255,255,0.06)'}`,
                    color: selectedGame === g.name ? 'var(--gold-bright)' : 'var(--text-primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{g.icon}</span>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{g.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: STREAM TITLE */}
        {currentStep === 2 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--gold-bright)' }}>
              Step 2: Enter Stream Title
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Write a catchy, informative title for viewers on the VentureX live feed.
            </p>

            <div className="form-group">
              <label className="form-label">Broadcast Headline</label>
              <input
                type="text"
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                className="form-input"
                placeholder="e.g. GRAND FINALS: Map 3 Decider with Live Comms"
              />
            </div>
          </div>
        )}

        {/* STEP 3: SELECT COMMUNITY */}
        {currentStep === 3 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--gold-bright)' }}>
              Step 3: Select Host Community Guild
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Broadcasting to a community sends push pings to its registered members.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {communities.map((comm) => (
                <div
                  key={comm.id}
                  onClick={() => setSelectedCommunity(comm.id)}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    background: selectedCommunity === comm.id ? 'rgba(201, 162, 39, 0.15)' : 'var(--surface-elevated)',
                    border: `1px solid ${selectedCommunity === comm.id ? 'var(--gold-primary)' : 'rgba(255,255,255,0.06)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ fontSize: '1.5rem' }}>{comm.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{comm.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{comm.game} • {comm.membersCount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: SELECT CATEGORY */}
        {currentStep === 4 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--gold-bright)' }}>
              Step 4: Select Broadcast Category
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Tag the nature of your stream for proper VentureX filtering.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
              {['Tournament Cast', 'Ranked Grind', 'Scrim Practice', 'Tactical Analysis', 'Community Cup'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setStreamCategory(cat)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: streamCategory === cat ? 'rgba(201, 162, 39, 0.15)' : 'var(--surface-elevated)',
                    border: `1px solid ${streamCategory === cat ? 'var(--gold-primary)' : 'rgba(255,255,255,0.06)'}`,
                    color: streamCategory === cat ? 'var(--gold-bright)' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: ADD THUMBNAIL */}
        {currentStep === 5 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--gold-bright)' }}>
              Step 5: Select Stream Thumbnail
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Choose or upload the visual preview shown on the live stream theater grid.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[
                'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'
              ].map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedThumbnail(img)}
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: selectedThumbnail === img ? '3px solid var(--gold-bright)' : '2px solid rgba(255,255,255,0.1)',
                    aspectRatio: '16 / 9',
                    cursor: 'pointer',
                    transform: selectedThumbnail === img ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <img src={img} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: CONFIGURE STREAM */}
        {currentStep === 6 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--gold-bright)' }}>
              Step 6: Ingest Server & Stream Key
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Copy the RTMP server URL and secret stream key into OBS Studio or Streamlabs.
            </p>

            <div className="form-group">
              <label className="form-label">RTMP Ingest Server URL</label>
              <input type="text" disabled value="rtmp://live.venturex.gg/ingest/v1" className="form-input" style={{ opacity: 0.8 }} />
            </div>

            <div className="form-group">
              <label className="form-label">Private Stream Key</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="password" value={streamKey} disabled className="form-input" style={{ flex: 1, fontFamily: 'var(--font-mono)' }} />
                <Button variant="secondary" onClick={handleCopyKey} icon={copiedKey ? <Check size={14} /> : <Copy size={14} />}>
                  {copiedKey ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: GO LIVE PREVIEW & LAUNCH */}
        {currentStep === 7 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--gold-bright)' }}>
              Step 7: Launch Broadcast
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Review your broadcast parameters and hit Go Live.
            </p>

            {/* Broadcast Summary Card */}
            <div style={{ background: 'var(--surface-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(201, 162, 39, 0.25)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <img src={selectedThumbnail} alt="Preview" style={{ width: '140px', aspectRatio: '16 / 9', borderRadius: '4px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gold-bright)', fontWeight: 800 }}>{selectedGame} • {streamCategory}</div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.25rem 0' }}>{streamTitle}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Broadcaster: {user.username}</div>
                </div>
              </div>
            </div>

            {isLiveActive ? (
              <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--live-red)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--live-red)', fontWeight: 800, fontSize: '1.1rem' }}>
                  <span className="live-dot" /> BROADCAST IS CURRENTLY LIVE ON AIR
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.5rem 0 1rem' }}>
                  Your live signal is streaming to 0 concurrent viewers.
                </p>
                <GoldButton onClick={() => navigateTo('live')}>
                  Open Live Theater View
                </GoldButton>
              </div>
            ) : (
              <GoldButton size="lg" onClick={handleGoLive} style={{ width: '100%' }} icon={<Radio size={18} />}>
                Go Live on VentureX
              </GoldButton>
            )}
          </div>
        )}

        {/* Wizard Navigation Footer Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Button
            size="md"
            variant="secondary"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            icon={<ChevronLeft size={16} />}
          >
            Back
          </Button>

          {currentStep < 7 ? (
            <GoldButton
              size="md"
              onClick={() => setCurrentStep((prev) => Math.min(7, prev + 1))}
            >
              <span>Continue Step {currentStep + 1}</span>
              <ChevronRight size={16} />
            </GoldButton>
          ) : (
            <Button size="md" variant="secondary" onClick={() => navigateTo('live')}>
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
