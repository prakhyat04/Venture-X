import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import GoldButton from '../components/common/GoldButton';
import Button from '../components/common/Button';
import {
  Settings,
  User,
  Globe,
  Palette,
  Bell,
  Lock,
  Radio,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Save
} from 'lucide-react';

export default function SettingsPage() {
  const { user, setUser, activeLanguage, setActiveLanguage, activeTheme, setActiveTheme, triggerToast } = useApp();
  const [activeSection, setActiveSection] = useState('account');

  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.email);
  const [notifTourney, setNotifTourney] = useState(true);
  const [notifLive, setNotifLive] = useState(true);
  const [notifCommunity, setNotifCommunity] = useState(true);
  const [particleEffects, setParticleEffects] = useState(true);
  const [streamQuality, setStreamQuality] = useState('1080p60 (Source)');
  const [defaultStreamGame, setDefaultStreamGame] = useState('VALORANT');

  const handleSaveAll = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      displayName: displayName.trim(),
      bio: bio.trim(),
      email: email.trim(),
      language: activeLanguage
    }));
    triggerToast('Settings Saved! ⚡', 'Your VentureX eSports preferences have been updated.', 'gold');
  };

  const sections = [
    { id: 'account', label: 'Account Credentials', icon: <User size={16} /> },
    { id: 'profile', label: 'Gladiator Profile', icon: <Sparkles size={16} /> },
    { id: 'language', label: 'Language & Region', icon: <Globe size={16} /> },
    { id: 'appearance', label: 'Appearance & VFX', icon: <Palette size={16} /> },
    { id: 'notifications', label: 'Match Notifications', icon: <Bell size={16} /> },
    { id: 'privacy', label: 'Privacy & Visibility', icon: <Lock size={16} /> },
    { id: 'streaming', label: 'Streaming Defaults', icon: <Radio size={16} /> },
    { id: 'security', label: 'Security & 2FA', icon: <ShieldCheck size={16} /> }
  ];

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb items={[{ label: 'User Settings' }]} />

      <div className="section-header">
        <div className="section-title-wrap">
          <div className="section-tag">PREFERENCES & SECURITY</div>
          <h1 className="section-title">VENTUREX SETTINGS</h1>
          <p className="section-desc">
            Customize your gladiator profile, language, notification pings, stream setup, and visual gold particle density.
          </p>
        </div>

        <GoldButton size="sm" onClick={handleSaveAll} icon={<Save size={16} />}>
          Save Preferences
        </GoldButton>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }}>
        {/* Left Vertical Section Nav */}
        <div
          style={{
            background: 'var(--surface-card)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            height: 'fit-content'
          }}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
                fontWeight: 600,
                textAlign: 'left',
                background: activeSection === s.id ? 'rgba(201, 162, 39, 0.12)' : 'transparent',
                color: activeSection === s.id ? 'var(--gold-bright)' : 'var(--text-secondary)',
                border: activeSection === s.id ? '1px solid rgba(201, 162, 39, 0.3)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <span style={{ color: activeSection === s.id ? 'var(--gold-bright)' : 'var(--text-muted)' }}>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Right Settings Form Body */}
        <div
          style={{
            background: 'var(--surface-card)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)'
          }}
        >
          {/* 1. ACCOUNT */}
          {activeSection === 'account' && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--gold-bright)' }}>
                Account Credentials
              </h3>
              <div className="form-group">
                <label className="form-label">Username (Permanent Handle)</label>
                <input type="text" disabled value={user.username} className="form-input" style={{ opacity: 0.7 }} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Current Role</label>
                <input type="text" disabled value={user.role} className="form-input" style={{ opacity: 0.7 }} />
              </div>
            </div>
          )}

          {/* 2. PROFILE */}
          {activeSection === 'profile' && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--gold-bright)' }}>
                Gladiator Profile & Bio
              </h3>
              <div className="form-group">
                <label className="form-label">Display Name</label>
                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Player Biography</label>
                <textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} className="form-textarea" />
              </div>
              <div className="form-group">
                <label className="form-label">Competitive Tier</label>
                <input type="text" disabled value={user.tier} className="form-input" style={{ opacity: 0.7 }} />
              </div>
            </div>
          )}

          {/* 3. LANGUAGE */}
          {activeSection === 'language' && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--gold-bright)' }}>
                Language & Regional Server
              </h3>
              <div className="form-group">
                <label className="form-label">Interface Language</label>
                <select value={activeLanguage} onChange={(e) => setActiveLanguage(e.target.value)} className="form-select">
                  <option value="English">English (Global)</option>
                  <option value="Hindi">Hindi (South Asia)</option>
                  <option value="Spanish">Spanish (ES / LATAM)</option>
                  <option value="German">German (EMEA)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Default Matchmaking Region</label>
                <select defaultValue="NA-East" className="form-select">
                  <option value="NA-East">North America East (Virginia)</option>
                  <option value="EU-Central">Europe Central (Frankfurt)</option>
                  <option value="AP-South">Asia Pacific (Mumbai)</option>
                  <option value="AP-East">Asia Pacific (Tokyo)</option>
                </select>
              </div>
            </div>
          )}

          {/* 4. APPEARANCE */}
          {activeSection === 'appearance' && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--gold-bright)' }}>
                Appearance & Visuals
              </h3>
              <div className="form-group">
                <label className="form-label">Color Theme</label>
                <select value={activeTheme} onChange={(e) => setActiveTheme(e.target.value)} className="form-select">
                  <option value="Dark Competitive">Dark Competitive VentureX + Royal Gold (Default)</option>
                  <option value="Midnight Onyx">Midnight Onyx + Platinum</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--surface-elevated)', borderRadius: 'var(--radius-sm)', marginTop: '1rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Interactive Gold Energy Particles</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Trigger dynamic gold bursts when clicking action buttons</div>
                </div>
                <input type="checkbox" checked={particleEffects} onChange={(e) => setParticleEffects(e.target.checked)} style={{ transform: 'scale(1.3)', accentColor: 'var(--gold-primary)' }} />
              </div>
            </div>
          )}

          {/* 5. NOTIFICATIONS */}
          {activeSection === 'notifications' && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--gold-bright)' }}>
                Match & Tournament Alerts
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Tournament Match Start Pings', state: notifTourney, setter: setNotifTourney },
                  { label: 'Followed Casters Going Live', state: notifLive, setter: setNotifLive },
                  { label: 'Community Announcements & Scrims', state: notifCommunity, setter: setNotifCommunity }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--surface-elevated)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</span>
                    <input type="checkbox" checked={item.state} onChange={(e) => item.setter(e.target.checked)} style={{ transform: 'scale(1.3)', accentColor: 'var(--gold-primary)' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. PRIVACY */}
          {activeSection === 'privacy' && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--gold-bright)' }}>
                Privacy & Match Visibility
              </h3>
              <div className="form-group">
                <label className="form-label">Profile Visibility</label>
                <select defaultValue="public" className="form-select">
                  <option value="public">Public (Visible on Global Leaderboard)</option>
                  <option value="squad-only">Squad & Guild Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Match History Analytics</label>
                <select defaultValue="enabled" className="form-select">
                  <option value="enabled">Allow public scouting of my K/D and agent picks</option>
                  <option value="hidden">Hide match breakdown from rivals</option>
                </select>
              </div>
            </div>
          )}

          {/* 7. STREAMING */}
          {activeSection === 'streaming' && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--gold-bright)' }}>
                Streaming Defaults & Key Management
              </h3>
              <div className="form-group">
                <label className="form-label">Default Broadcast Category</label>
                <select value={defaultStreamGame} onChange={(e) => setDefaultStreamGame(e.target.value)} className="form-select">
                  <option value="VALORANT">VALORANT</option>
                  <option value="BGMI / PUBG MOBILE">BGMI</option>
                  <option value="COUNTER-STRIKE 2">CS2</option>
                  <option value="APEX LEGENDS">Apex Legends</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Max Ingest Bitrate Quality</label>
                <select value={streamQuality} onChange={(e) => setStreamQuality(e.target.value)} className="form-select">
                  <option value="1080p60 (Source)">1080p60 • 6000 kbps (Source)</option>
                  <option value="720p60 (High)">720p60 • 4500 kbps</option>
                </select>
              </div>
            </div>
          )}

          {/* 8. SECURITY */}
          {activeSection === 'security' && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--gold-bright)' }}>
                Security & Two-Factor Authentication
              </h3>
              <div className="form-group">
                <label className="form-label">Change Password</label>
                <input type="password" placeholder="New account password..." className="form-input" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--surface-elevated)', borderRadius: 'var(--radius-sm)', marginTop: '1rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Authenticator 2FA Protection</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Require time-based OTP code when logging in</div>
                </div>
                <Button size="sm" variant="outline-gold" onClick={() => triggerToast('2FA Configured', 'Authenticator 2FA enabled.', 'gold')}>
                  Enable 2FA
                </Button>
              </div>
            </div>
          )}

          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <GoldButton size="md" onClick={handleSaveAll} icon={<Save size={16} />}>
              Save Changes
            </GoldButton>
          </div>
        </div>
      </div>
    </div>
  );
}
