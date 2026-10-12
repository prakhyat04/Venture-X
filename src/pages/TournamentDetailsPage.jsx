import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import Badge from '../components/common/Badge';
import GoldButton from '../components/common/GoldButton';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import BracketViewer from '../components/tournament/BracketViewer';
import StreamPlayer from '../components/stream/StreamPlayer';
import {
  Trophy,
  Calendar,
  Users,
  Shield,
  Clock,
  Radio,
  FileText,
  Sparkles,
  Award,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function TournamentDetailsPage() {
  const { pageParams, tournaments, liveStreams, user, registerForTournament, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'matches' | 'bracket' | 'participants' | 'rules' | 'live' | 'community'
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [teamName, setTeamName] = useState('Sentinel X');
  const [inGameTag, setInGameTag] = useState(user.username + '#PRO');

  const tournament = tournaments.find((t) => t.id === pageParams.id) || tournaments[0];
  const isRegistered = user.registeredTournaments.includes(tournament.id);
  const slotsPercentage = Math.round((tournament.registeredSlots / tournament.totalSlots) * 100);

  const matchingStream = liveStreams.find((s) => s.gameId === tournament.gameId) || liveStreams[0];

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    registerForTournament(tournament.id);
    setIsRegisterModalOpen(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'matches', label: 'Matches & Schedule' },
    { id: 'bracket', label: 'Interactive Bracket' },
    { id: 'participants', label: `Participants (${tournament.registeredSlots})` },
    { id: 'rules', label: 'Rules & Format' },
    { id: 'live', label: 'Live Stream' },
    { id: 'community', label: 'Host Community' }
  ];

  return (
    <div className="container section animate-fade-in">
      <Breadcrumb
        items={[
          { label: 'Tournaments', page: 'tournaments' },
          { label: tournament.title }
        ]}
      />

      {/* Tournament Header Banner Card */}
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '2.5rem',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div style={{ position: 'relative', height: '240px' }}>
          <img src={tournament.banner} alt={tournament.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, var(--surface-card) 0%, rgba(7, 8, 11, 0.4) 100%)' }} />

          <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
            <Badge type={tournament.statusType}>{tournament.status}</Badge>
            <span style={{ background: 'rgba(0,0,0,0.8)', color: 'var(--gold-bright)', padding: '2px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
              {tournament.game}
            </span>
          </div>
        </div>

        <div style={{ padding: '0 2rem 2rem', marginTop: '-40px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--gold-bright)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Organized by {tournament.organizer}
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.25rem', lineHeight: 1.2 }}>
                {tournament.title}
              </h1>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                {tournament.region} • {tournament.format}
              </p>
            </div>

            {/* Quick Action */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {tournament.statusType === 'open' ? (
                <GoldButton
                  size="lg"
                  onClick={() => setIsRegisterModalOpen(true)}
                  disabled={isRegistered}
                  icon={<Shield size={18} />}
                >
                  {isRegistered ? 'Registered with Squad ✓' : 'Register Now (Free Entry)'}
                </GoldButton>
              ) : (
                <GoldButton size="lg" onClick={() => setActiveTab('live')} icon={<Radio size={18} />}>
                  Watch Match Broadcast
                </GoldButton>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: 'var(--surface-elevated)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', marginTop: '1.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Prize Pool</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--gold-bright)' }}>{tournament.prizePool}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Slots Filled</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                {tournament.registeredSlots} / {tournament.totalSlots}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tournament Start</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{tournament.startDate} • {tournament.startTime}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Official Casters</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold-highlight)' }}>{tournament.caster}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Header Navigation */}
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Panel */}
      <div className="tab-content">
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: 'var(--surface-card)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>About the Championship</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {tournament.overview}
                </p>
              </div>

              <div style={{ background: 'var(--surface-card)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={20} style={{ color: 'var(--gold-bright)' }} />
                  <span>Prize Pool Breakdown</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {tournament.prizeDistribution.map((p, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--surface-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201, 162, 39, 0.15)' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.place}</span>
                      <strong style={{ color: 'var(--gold-bright)' }}>{p.prize}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: 'var(--surface-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--gold-bright)' }}>Assigned Casters</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {tournament.castersList.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', background: 'var(--surface-elevated)', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gold-gradient)', color: '#07080B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                        {c.name.slice(0, 1)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{c.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--surface-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem' }}>Slot Capacity ({slotsPercentage}%)</h4>
                <div style={{ width: '100%', height: '8px', background: 'var(--surface-elevated)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                  <div style={{ width: `${slotsPercentage}%`, height: '100%', background: 'var(--gold-gradient)' }} />
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {tournament.totalSlots - tournament.registeredSlots} spots remaining before bracket lock.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MATCHES TAB */}
        {activeTab === 'matches' && (
          <div style={{ background: 'var(--surface-card)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Scheduled Bracket Matches</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { match: 'Grand Finals (Bo5)', team1: 'Sentinel X', team2: 'Fnatic Vanguard', time: 'Tonight 18:00 UTC', status: 'LIVE' },
                { match: 'Semifinal #1 (Bo3)', team1: 'Sentinel X (2)', team2: 'Nordic Vanguard (1)', time: 'Completed', status: 'COMPLETED' },
                { match: 'Semifinal #2 (Bo3)', team1: 'Fnatic Vanguard (2)', team2: 'Draco Legion (0)', time: 'Completed', status: 'COMPLETED' }
              ].map((m, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--surface-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-bright)' }}>{m.match}</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                      {m.team1} vs {m.team2}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{m.time}</span>
                    <Badge type={m.status === 'LIVE' ? 'live' : 'gold'}>{m.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. INTERACTIVE BRACKET TAB */}
        {activeTab === 'bracket' && <BracketViewer />}

        {/* 4. PARTICIPANTS TAB */}
        {activeTab === 'participants' && (
          <div style={{ background: 'var(--surface-card)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Registered Squads & Seeds</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              {[
                { name: 'Sentinel X', seed: '#1', captain: 'Kaizen_God' },
                { name: 'Fnatic Vanguard', seed: '#2', captain: 'BoasterX' },
                { name: 'Draco Legion', seed: '#3', captain: 'DracoVentureX' },
                { name: 'Nordic Vanguard', seed: '#4', captain: 'AetherStrike' },
                { name: 'Omega Cyber', seed: '#5', captain: 'CyberWolf' },
                { name: 'Phantom Force', seed: '#6', captain: 'Phantom_Snip' }
              ].map((team, idx) => (
                <div key={idx} style={{ padding: '1rem', background: 'var(--surface-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold-bright)', fontWeight: 800 }}>Seed {team.seed}</div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '0.2rem 0' }}>{team.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Captain: {team.captain}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. RULES TAB */}
        {activeTab === 'rules' && (
          <div style={{ background: 'var(--surface-card)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Tournament Rulebook & Guidelines</h3>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {tournament.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 6. LIVE STREAM TAB */}
        {activeTab === 'live' && (
          <div>
            <StreamPlayer stream={matchingStream} />
          </div>
        )}

        {/* 7. COMMUNITY TAB */}
        {activeTab === 'community' && (
          <div style={{ background: 'var(--surface-card)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{tournament.organizer}</h3>
            <p style={{ maxWidth: '560px', margin: '0 auto 1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              This community is the official organizing body for {tournament.game} tournaments, daily scrims, and player verification.
            </p>
            <GoldButton onClick={() => navigateTo('communities')}>
              Explore Community Hub
            </GoldButton>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title={`Register for ${tournament.title}`}
      >
        <form onSubmit={handleRegisterSubmit}>
          <div style={{ marginBottom: '1.25rem', padding: '1rem', background: 'var(--surface-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201, 162, 39, 0.2)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--gold-bright)', fontWeight: 700 }}>TOURNAMENT DETAILS</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>{tournament.game} • {tournament.prizePool}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Format: {tournament.format}</div>
          </div>

          <div className="form-group">
            <label className="form-label">Squad / Team Name</label>
            <input
              type="text"
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="form-input"
              placeholder="e.g. Sentinel X"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Captain In-Game Riot / Player ID</label>
            <input
              type="text"
              required
              value={inGameTag}
              onChange={(e) => setInGameTag(e.target.value)}
              className="form-input"
              placeholder="e.g. Player#1234"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contact Discord / Email</label>
            <input
              type="text"
              defaultValue={user.email}
              className="form-input"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <Button variant="secondary" onClick={() => setIsRegisterModalOpen(false)}>
              Cancel
            </Button>
            <GoldButton type="submit" icon={<Sparkles size={16} />}>
              Confirm Registration
            </GoldButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
