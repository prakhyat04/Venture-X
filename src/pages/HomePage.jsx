import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Trophy,
  Radio,
  Gamepad2,
  Users,
  Mic,
  Video,
  ArrowRight,
  Shield,
  Sparkles,
  Flame,
  Award,
  Calendar,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import GoldButton from '../components/common/GoldButton';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import TournamentCard from '../components/cards/TournamentCard';
import LiveStreamCard from '../components/cards/LiveStreamCard';
import GameCard from '../components/cards/GameCard';
import PlayerCard from '../components/cards/PlayerCard';
import CasterCard from '../components/cards/CasterCard';
import CommunityCard from '../components/cards/CommunityCard';
import VideoCard from '../components/cards/VideoCard';

export default function HomePage() {
  const { navigateTo, tournaments, liveStreams, games, communities, players, casters, videos } = useApp();

  return (
    <div className="homepage-root animate-fade-in">
      {/* ----------------------------------------------------
          1. CINEMATIC HERO SECTION
      ---------------------------------------------------- */}
      <section className="hero-section">
        <div className="hero-bg-overlay" />
        <div className="hero-VentureX-rings" />

        <div className="container hero-content">
          <div className="hero-badge-pill">
            <Sparkles size={14} />
            <span>SEASON 2026 VENTUREX ESPORTS IS LIVE</span>
          </div>

          <h1 className="hero-title">
            ENTER <span className="text-gold-gradient">VENTUREX</span>
          </h1>

          <div className="hero-tagline">
            COMPETE. WATCH. CONNECT.
          </div>

          <p className="hero-desc">
            The premier competitive eSports battleground for players, casters, and gaming communities.
            Compete in verified tournaments, watch high-stakes broadcasts, and claim your championship glory.
          </p>

          <div className="hero-cta-group">
            <GoldButton size="lg" onClick={() => navigateTo('tournaments')} icon={<Trophy size={18} />}>
              Explore Tournaments
            </GoldButton>

            <Button size="lg" variant="secondary" onClick={() => navigateTo('live')} icon={<Radio size={18} style={{ color: 'var(--live-red)' }} />}>
              Watch Live Streams
            </Button>
          </div>

          {/* Quick VentureX Stats Bar */}
          <div className="hero-stats-strip">
            <div className="hero-stat-item">
              <div className="hero-stat-value">$1,250,000+</div>
              <div className="hero-stat-label">Prize Pools Distributed</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-value">124,000+</div>
              <div className="hero-stat-label">Registered Players</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-value">540+</div>
              <div className="hero-stat-label">Official Tournaments</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-value">48</div>
              <div className="hero-stat-label">Verified Casters</div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          2. LIVE NOW SHOWCASE
      ---------------------------------------------------- */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-tag" style={{ color: 'var(--live-red)' }}>
                <span className="live-dot" /> LIVE BROADCASTS
              </div>
              <h2 className="section-title">LIVE NOW ON VENTUREX</h2>
              <p className="section-desc">
                Tune into high-stakes tournament finals and Tier-1 caster commentary happening right now.
              </p>
            </div>

            <Button variant="outline-gold" onClick={() => navigateTo('live')} icon={<Radio size={16} />}>
              View All Live Streams ({liveStreams.length})
            </Button>
          </div>

          <div className="grid-2">
            {liveStreams.slice(0, 2).map((stream) => (
              <LiveStreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          3. UPCOMING TOURNAMENTS
      ---------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-tag">CHAMPIONSHIP CUPS</div>
              <h2 className="section-title">UPCOMING TOURNAMENTS</h2>
              <p className="section-desc">
                Sign up with your squad, battle through double-elimination brackets, and win royal prestige.
              </p>
            </div>

            <Button variant="outline-gold" onClick={() => navigateTo('tournaments')} icon={<Trophy size={16} />}>
              All Tournaments
            </Button>
          </div>

          <div className="grid-3">
            {tournaments.slice(0, 3).map((tourney) => (
              <TournamentCard key={tourney.id} tournament={tourney} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          4. EXPLORE GAMES
      ---------------------------------------------------- */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-tag">COMPETITIVE TITLES</div>
              <h2 className="section-title">EXPLORE GAMES</h2>
              <p className="section-desc">
                Choose your competitive discipline and dominate in dedicated community hubs.
              </p>
            </div>

            <Button variant="secondary" onClick={() => navigateTo('games')} icon={<Gamepad2 size={16} />}>
              Browse All Games
            </Button>
          </div>

          <div className="grid-4">
            {games.slice(0, 4).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          5. FEATURED COMMUNITIES
      ---------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-tag">ORGANIZERS & FEDERATIONS</div>
              <h2 className="section-title">FEATURED COMMUNITIES</h2>
              <p className="section-desc">
                Game-specific communities organizing daily scrims, custom tournaments, and ranking ladders.
              </p>
            </div>

            <Button variant="secondary" onClick={() => navigateTo('communities')} icon={<Users size={16} />}>
              Explore Communities
            </Button>
          </div>

          <div className="grid-3">
            {communities.slice(0, 3).map((comm) => (
              <CommunityCard key={comm.id} community={comm} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          6. TOP PLAYERS LEADERBOARD SPOTLIGHT
      ---------------------------------------------------- */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-tag">VENTUREX CHAMPIONS</div>
              <h2 className="section-title">TOP RANKED PLAYERS</h2>
              <p className="section-desc">
                Elite gladiators leading the seasonal leaderboards with highest win rates and tournament titles.
              </p>
            </div>

            <Button variant="outline-gold" onClick={() => navigateTo('players')} icon={<Award size={16} />}>
              Full Leaderboard
            </Button>
          </div>

          <div className="grid-3">
            {players.slice(0, 3).map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          7. FEATURED CASTERS SPOTLIGHT
      ---------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-tag">VOICES OF VENTUREX</div>
              <h2 className="section-title">FEATURED CASTERS</h2>
              <p className="section-desc">
                Professional commentators bringing the thunderous hype and tactical mastery to every match.
              </p>
            </div>

            <Button variant="secondary" onClick={() => navigateTo('casters')} icon={<Mic size={16} />}>
              All Casters
            </Button>
          </div>

          <div className="grid-3">
            {casters.slice(0, 3).map((caster) => (
              <CasterCard key={caster.id} caster={caster} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          8. LATEST VIDEO HIGHLIGHTS
      ---------------------------------------------------- */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-tag">CLUTCHES & RECAPS</div>
              <h2 className="section-title">LATEST VIDEO HIGHLIGHTS</h2>
              <p className="section-desc">
                Legendary tournament moments, insane 1v4 clutches, and pro player analytical guides.
              </p>
            </div>

            <Button variant="secondary" onClick={() => navigateTo('videos')} icon={<Video size={16} />}>
              Video Vault
            </Button>
          </div>

          <div className="grid-4">
            {videos.slice(0, 4).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          9. UPCOMING EVENTS TIMELINE STRIP
      ---------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div
            style={{
              background: 'var(--surface-card)',
              border: '1px solid rgba(201, 162, 39, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--gold-bright)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  CALENDAR & SCHEDULE
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                  UPCOMING VENTUREX SHOWDOWNS
                </h3>
              </div>

              <Badge type="gold">OFFICIAL SCHEDULE</Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                { date: 'Tonight • 18:00 UTC', title: 'VCT Crown Series Grand Finals', game: 'VALORANT', prize: '$45,000' },
                { date: 'Tomorrow • 17:30 IST', title: 'BGMI Elite Masters Match 4', game: 'BGMI', prize: '₹25,00,000' },
                { date: 'Sept 22 • 16:00 UTC', title: 'CS2 VentureX Major Showdown', game: 'CS2', prize: '$30,000' }
              ].map((ev, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--surface-elevated)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-bright)' }}>{ev.date}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{ev.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 'auto' }}>
                    <span>{ev.game}</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{ev.prize}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          10. CALL TO ACTION BANNER
      ---------------------------------------------------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.2) 0%, rgba(13, 16, 21, 0.95) 100%)',
              border: '1px solid var(--gold-primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '3.5rem 2rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 0 50px rgba(201, 162, 39, 0.2)'
            }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              READY TO CLAIM YOUR <span className="text-gold-gradient">CROWN</span>?
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Join over 120,000 competitive players. Register your squad, track your rankings, and enter verified prize-pool tournaments.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <GoldButton size="lg" onClick={() => navigateTo('register')} icon={<Shield size={18} />}>
                Register as Player
              </GoldButton>
              <Button size="lg" variant="secondary" onClick={() => navigateTo('tournaments')}>
                Browse Tournaments
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
