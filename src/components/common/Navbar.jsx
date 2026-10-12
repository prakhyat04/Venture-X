import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Radio,
  Trophy,
  Gamepad2,
  Video,
  Users,
  Bell,
  User,
  Settings,
  PlusCircle,
  Menu,
  X,
  Sparkles,
  LogOut,
  Shield,
  CheckCircle
} from 'lucide-react';
import GoldButton from './GoldButton';

export default function Navbar() {
  const {
    currentPage,
    navigateTo,
    user,
    setIsSearchOpen,
    notifications,
    markAllNotificationsRead
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'live', label: 'Live', isLive: true },
    { id: 'tournaments', label: 'Tournaments' },
    { id: 'games', label: 'Games' },
    { id: 'videos', label: 'Videos' },
    { id: 'communities', label: 'Communities' },
    { id: 'players', label: 'Players' },
    { id: 'casters', label: 'Casters' }
  ];

  return (
    <header className="navbar-header">
      <div className="container-wide navbar-inner">
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigateTo('home')}
            className="brand-logo-link"
            style={{ cursor: 'pointer' }}
          >
            <div className="brand-icon-wrap">
              <Sparkles size={20} />
            </div>
            <div className="brand-name">
              <span style={{ color: 'var(--text-primary)' }}>Venture</span>
              <span className="text-gold-gradient">X</span>
              <span className="brand-tag">eSPORTS</span>
            </div>
          </button>
        </div>

        {/* Center Desktop Nav */}
        <nav className="nav-links-center" style={{ display: 'flex' }}>
          {navLinks.map((link) => {
            const isActive = currentPage === link.id || (link.id === 'tournaments' && currentPage === 'tournament-details');
            return (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                {link.isLive && <span className="live-dot" />}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="nav-actions-right">
          {/* Global Search Button */}
          <button
            className="nav-icon-btn"
            onClick={() => setIsSearchOpen(true)}
            title="Search (Ctrl + K)"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Go Live / Stream CTA */}
          <GoldButton
            size="sm"
            onClick={() => navigateTo('create-stream')}
            icon={<Radio size={14} />}
            className="desktop-only-btn"
          >
            Go Live
          </GoldButton>

          {/* Notifications Bell */}
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button
              className="nav-icon-btn"
              onClick={() => setIsNotifOpen((prev) => !prev)}
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && <span className="nav-notif-badge" />}
            </button>

            {/* Notifications Dropdown */}
            {isNotifOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '340px',
                  background: 'var(--surface-card)',
                  border: '1px solid rgba(201, 162, 39, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.8)',
                  zIndex: 200,
                  overflow: 'hidden',
                  animation: 'fadeIn 200ms ease-out'
                }}
              >
                <div
                  style={{
                    padding: '0.85rem 1rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--surface-elevated)'
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.05em', color: 'var(--gold-bright)' }}>
                    VentureX NOTIFICATIONS
                  </span>
                  <button
                    onClick={markAllNotificationsRead}
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    Mark read
                  </button>
                </div>

                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      style={{
                        padding: '0.85rem 1rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        background: notif.read ? 'transparent' : 'rgba(201, 162, 39, 0.06)',
                        cursor: 'pointer',
                        transition: 'background var(--transition-fast)'
                      }}
                      onClick={() => {
                        setIsNotifOpen(false);
                        if (notif.type === 'live') navigateTo('live');
                        else if (notif.type === 'tournament') navigateTo('tournaments');
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{notif.title}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{notif.time}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div style={{ position: 'relative' }} ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.35rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--surface-elevated)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer'
              }}
            >
              <img
                src={user.avatar}
                alt={user.username}
                style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--gold-primary)', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }} className="desktop-only-username">
                {user.username}
              </span>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '240px',
                  background: 'var(--surface-card)',
                  border: '1px solid rgba(201, 162, 39, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.8)',
                  zIndex: 200,
                  overflow: 'hidden',
                  animation: 'fadeIn 200ms ease-out'
                }}
              >
                <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: 'var(--surface-elevated)' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>{user.displayName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold-bright)', marginTop: '2px' }}>{user.tier} • {user.role}</div>
                </div>

                <div style={{ padding: '0.5rem 0' }}>
                  <button
                    onClick={() => { setIsProfileOpen(false); navigateTo('my-profile'); }}
                    style={{ width: '100%', padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--gold-bright)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <User size={16} /> My VentureX Profile
                  </button>

                  <button
                    onClick={() => { setIsProfileOpen(false); navigateTo('settings'); }}
                    style={{ width: '100%', padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--gold-bright)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <Settings size={16} /> Account & Settings
                  </button>

                  <button
                    onClick={() => { setIsProfileOpen(false); navigateTo('create-stream'); }}
                    style={{ width: '100%', padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--gold-bright)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <Radio size={16} /> Stream Setup Desk
                  </button>

                  <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)', margin: '0.35rem 0' }} />

                  <button
                    onClick={() => { setIsProfileOpen(false); navigateTo('register'); }}
                    style={{ width: '100%', padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--gold-bright)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <Shield size={16} /> Register New Player
                  </button>

                  <button
                    onClick={() => { setIsProfileOpen(false); navigateTo('login'); }}
                    style={{ width: '100%', padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#F87171', fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <LogOut size={16} /> Switch Account / Login
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="nav-icon-btn mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            background: 'var(--surface-elevated)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo(link.id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                color: currentPage === link.id ? 'var(--gold-bright)' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.95rem',
                background: currentPage === link.id ? 'rgba(201, 162, 39, 0.1)' : 'transparent',
                textAlign: 'left'
              }}
            >
              {link.isLive && <span className="live-dot" />}
              <span>{link.label}</span>
            </button>
          ))}
          <GoldButton
            size="sm"
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('create-stream');
            }}
            icon={<Radio size={14} />}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Go Live / Stream
          </GoldButton>
        </div>
      )}
    </header>
  );
}
