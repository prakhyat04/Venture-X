import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import GoldButton from '../components/common/GoldButton';
import Button from '../components/common/Button';
import {
  Shield,
  Trophy,
  User,
  Sparkles,
  Gamepad2,
  Globe,
  CheckCircle2,
  Lock,
  Mail,
  Mic,
  Users
} from 'lucide-react';
import { triggerGoldParticles } from '../utils/particleEffect';
import confetti from 'canvas-confetti';

export default function RegisterPage() {
  const { setUser, navigateTo, triggerToast } = useApp();

  const [role, setRole] = useState('PLAYER');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteGame, setFavoriteGame] = useState('VALORANT');
  const [country, setCountry] = useState('United States');
  const [language, setLanguage] = useState('English');
  const [selectedAvatar, setSelectedAvatar] = useState(
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
  );

  const [isSuccess, setIsSuccess] = useState(false);

  const avatarsList = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email) {
      triggerToast('Required Fields Missing', 'Please fill in your username and email.', 'info');
      return;
    }

    // Trigger royal gold particle celebration
    triggerGoldParticles(e, { count: 40, spread: 120 });
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F2D77A', '#E6C65C', '#C9A227', '#FFF1B8']
      });
    } catch (err) { }

    // Update global user
    const newUser = {
      id: 'user-' + Date.now(),
      username: username.trim(),
      displayName: displayName.trim() || username.trim(),
      email: email.trim(),
      role: role,
      avatar: selectedAvatar,
      country: country,
      language: language,
      tier: 'PLATINUM I',
      favoriteGames: [favoriteGame],
      bio: `Competitive ${role.toLowerCase()} ready for tournament action in ${favoriteGame}.`,
      registeredTournaments: [],
      savedCommunities: [],
      followedCasters: [],
      stats: {
        matchesPlayed: 0,
        winRate: '0.0%',
        tournamentsJoined: 0,
        trophiesCount: 0
      }
    };

    setUser(newUser);
    setIsSuccess(true);
  };

  return (
    <div className="container section animate-fade-in" style={{ maxWidth: '780px' }}>
      <Breadcrumb items={[{ label: 'Player Onboarding' }]} />

      {isSuccess ? (
        /* Celebration Success Screen */
        <div
          className="celebration-card"
          style={{
            background: 'var(--surface-card)',
            border: '2px solid var(--gold-primary)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(201, 162, 39, 0.25)'
          }}
        >
          <div className="celebration-trophy-ring">
            <Trophy size={48} />
          </div>

          <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em', color: 'var(--gold-bright)', textTransform: 'uppercase' }}>
            REGISTRATION COMPLETE
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase' }}>
            WELCOME TO <span className="text-gold-gradient">VENTUREX</span>
          </h1>

          <p style={{ maxWidth: '480px', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Your player profile for <strong style={{ color: 'var(--gold-bright)' }}>{username}</strong> has been created.
            You are now ready to register for tournaments, join game communities, and climb the leaderboards.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <GoldButton size="lg" onClick={() => navigateTo('my-profile')} icon={<User size={18} />}>
              Go to My VentureX Profile
            </GoldButton>
            <Button size="lg" variant="secondary" onClick={() => navigateTo('tournaments')}>
              Explore Tournaments
            </Button>
          </div>
        </div>
      ) : (
        /* Registration Form */
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
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--gold-bright)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              VENTUREX ENLISTMENT
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '0.25rem' }}>
              REGISTER YOUR <span className="text-gold-gradient">GLADIATOR</span>
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
              Create your official competitive identity and enter the world's premier esports ecosystem.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Role Chooser */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ marginBottom: '0.6rem' }}>Select VentureX Role</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { id: 'PLAYER', label: 'Pro / Player', icon: <Shield size={18} /> },
                  { id: 'CASTER', label: 'Caster / Analyst', icon: <Mic size={18} /> },
                  { id: 'ORGANIZER', label: 'Guild Organizer', icon: <Users size={18} /> }
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: role === r.id ? 'rgba(201, 162, 39, 0.15)' : 'var(--surface-elevated)',
                      border: `1px solid ${role === r.id ? 'var(--gold-primary)' : 'rgba(255,255,255,0.06)'}`,
                      color: role === r.id ? 'var(--gold-bright)' : 'var(--text-secondary)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.4rem',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {r.icon}
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ marginBottom: '0.6rem' }}>Choose Profile Avatar</label>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                {avatarsList.map((av, idx) => (
                  <img
                    key={idx}
                    src={av}
                    alt={`Avatar ${idx}`}
                    onClick={() => setSelectedAvatar(av)}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: selectedAvatar === av ? '3px solid var(--gold-bright)' : '2px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      transform: selectedAvatar === av ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all var(--transition-fast)',
                      objectFit: 'cover'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Username (In-Game Handle)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kaizen_God"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Real / Display Name</label>
                <input
                  type="text"
                  placeholder="e.g. Kaelen Zhang"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="gladiator@venturex.gg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Primary Game</label>
                <select
                  value={favoriteGame}
                  onChange={(e) => setFavoriteGame(e.target.value)}
                  className="form-select"
                >
                  <option value="VALORANT">VALORANT</option>
                  <option value="BGMI / PUBG MOBILE">BGMI</option>
                  <option value="COUNTER-STRIKE 2">CS2</option>
                  <option value="APEX LEGENDS">Apex Legends</option>
                  <option value="FREE FIRE MAX">Free Fire MAX</option>
                  <option value="CALL OF DUTY: WARZONE">Call of Duty</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Country / Region</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="form-select"
                >
                  <option value="United States">United States</option>
                  <option value="India">India</option>
                  <option value="Canada">Canada</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Germany">Germany</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="form-select"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <GoldButton size="lg" type="submit" style={{ width: '100%' }} icon={<Sparkles size={18} />}>
                Complete Enlistment & Enter VentureX
              </GoldButton>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Already registered with VentureX?{' '}
              <button
                type="button"
                onClick={() => navigateTo('login')}
                style={{ color: 'var(--gold-bright)', fontWeight: 700, cursor: 'pointer' }}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
