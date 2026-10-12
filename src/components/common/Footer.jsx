import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, MessageSquare, Video, Radio, Globe, Shield, Heart } from 'lucide-react';

export default function Footer() {
  const { navigateTo } = useApp();

  return (
    <footer className="footer-main">
      <div className="container footer-grid">
        {/* Brand Column */}
        <div>
          <button
            onClick={() => navigateTo('home')}
            className="brand-logo-link"
            style={{ cursor: 'pointer', marginBottom: '0.75rem' }}
          >
            <div className="brand-icon-wrap">
              <Sparkles size={20} />
            </div>
            <div className="brand-name">
              <span style={{ color: 'var(--text-primary)' }}>Venture</span>
              <span className="text-gold-gradient">X</span>
            </div>
          </button>
          <p className="footer-brand-desc">
            The next-generation competitive eSports platform where players compete, viewers watch, communities organize, and casters shine.
          </p>
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Shield size={14} style={{ color: 'var(--gold-primary)' }} />
            <span>Official B.Tech eSports Capstone Project</span>
          </div>
        </div>

        {/* Competition Column */}
        <div>
          <h4 className="footer-col-title">Compete</h4>
          <ul className="footer-nav-list">
            <li>
              <button onClick={() => navigateTo('tournaments')} className="footer-link">
                All Tournaments
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('tournaments')} className="footer-link">
                Open Qualifiers
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('players')} className="footer-link">
                Leaderboards
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('register')} className="footer-link">
                Player Registration
              </button>
            </li>
          </ul>
        </div>

        {/* Ecosystem Column */}
        <div>
          <h4 className="footer-col-title">Ecosystem</h4>
          <ul className="footer-nav-list">
            <li>
              <button onClick={() => navigateTo('games')} className="footer-link">
                Supported Games
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('communities')} className="footer-link">
                Game Communities
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('casters')} className="footer-link">
                Official Casters
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('create-stream')} className="footer-link">
                Stream Setup Desk
              </button>
            </li>
          </ul>
        </div>

        {/* Media & Watch */}
        <div>
          <h4 className="footer-col-title">Media</h4>
          <ul className="footer-nav-list">
            <li>
              <button onClick={() => navigateTo('live')} className="footer-link">
                Live Broadcasts
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('videos')} className="footer-link">
                Video Highlights
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('videos')} className="footer-link">
                Match Recaps
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('videos')} className="footer-link">
                Top Shorts & Clips
              </button>
            </li>
          </ul>
        </div>

        {/* Platform & Settings */}
        <div>
          <h4 className="footer-col-title">Settings</h4>
          <ul className="footer-nav-list">
            <li>
              <button onClick={() => navigateTo('settings')} className="footer-link">
                Account Settings
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('settings')} className="footer-link">
                Language & Region
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('settings')} className="footer-link">
                Privacy & Rules
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('my-profile')} className="footer-link">
                My Profile
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container footer-bottom">
        <div>
          © 2026 VentureX eSports Platform. Built with Passion & Royal Gold.
        </div>

        <div className="footer-social-links">
          <a href="#chat" className="social-icon-btn" aria-label="Community Chat">
            <MessageSquare size={16} />
          </a>
          <a href="#broadcast" className="social-icon-btn" aria-label="Live Feeds">
            <Radio size={16} />
          </a>
          <a href="#vods" className="social-icon-btn" aria-label="Video Archives">
            <Video size={16} />
          </a>
          <a href="#global" className="social-icon-btn" aria-label="Global Network">
            <Globe size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
