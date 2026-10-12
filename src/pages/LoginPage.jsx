import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import GoldButton from '../components/common/GoldButton';
import Button from '../components/common/Button';
import { Shield, Sparkles, User, Key, CheckCircle2 } from 'lucide-react';
import { INITIAL_USER, PLAYERS, CASTERS } from '../data/mockData';

export default function LoginPage() {
  const { setUser, navigateTo, triggerToast } = useApp();
  const [email, setEmail] = useState('prakhar.esports@venturex.gg');
  const [password, setPassword] = useState('password123');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setUser(INITIAL_USER);
    triggerToast('Welcome Back, Gladiator! ⚡', 'Logged into VentureX successfully.', 'gold');
    navigateTo('my-profile');
  };

  const handleQuickDemoSwitch = (demoType) => {
    if (demoType === 'player') {
      const p = PLAYERS[0];
      setUser({
        ...INITIAL_USER,
        username: p.username,
        displayName: p.displayName,
        role: 'PLAYER',
        avatar: p.avatar,
        tier: p.tier
      });
      triggerToast('Switched to Pro Player Account', `Now active as ${p.username}`, 'gold');
    } else if (demoType === 'caster') {
      const c = CASTERS[0];
      setUser({
        ...INITIAL_USER,
        username: c.handle.replace('@', ''),
        displayName: c.name,
        role: 'CASTER',
        avatar: c.avatar,
        tier: 'VERIFIED CASTER'
      });
      triggerToast('Switched to Caster Account', `Now active as ${c.name}`, 'gold');
    }
    navigateTo('my-profile');
  };

  return (
    <div className="container section animate-fade-in" style={{ maxWidth: '520px' }}>
      <Breadcrumb items={[{ label: 'Sign In' }]} />

      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="brand-icon-wrap" style={{ margin: '0 auto 1rem', width: '48px', height: '48px' }}>
            <Sparkles size={24} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>
            ACCESS <span className="text-gold-gradient">VENTUREX</span>
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Enter your credentials to manage your team, scrims, and tournament slots.
          </p>
        </div>

        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label className="form-label">Email or Username</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Password</span>
              <a href="#forgot" style={{ fontSize: '0.75rem', color: 'var(--gold-bright)' }}>Forgot Password?</a>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <GoldButton size="lg" type="submit" style={{ width: '100%' }}>
              Sign In to VentureX
            </GoldButton>
          </div>
        </form>

        {/* Demo Quick Switch for Viva/Presentation */}
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed rgba(255, 255, 255, 0.1)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold-bright)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', textAlign: 'center' }}>
            ⚡ 1-Click Viva / Demo Presets
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleQuickDemoSwitch('player')}
              icon={<Shield size={14} />}
            >
              Demo Pro Player
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleQuickDemoSwitch('caster')}
              icon={<Sparkles size={14} />}
            >
              Demo Caster Desk
            </Button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          New to VentureX?{' '}
          <button
            type="button"
            onClick={() => navigateTo('register')}
            style={{ color: 'var(--gold-bright)', fontWeight: 700, cursor: 'pointer' }}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
