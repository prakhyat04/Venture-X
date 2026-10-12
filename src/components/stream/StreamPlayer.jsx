import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Volume2,
  VolumeX,
  Maximize,
  Radio,
  Eye,
  Send,
  Sparkles,
  Flame,
  Trophy,
  Heart,
  Share2,
  CheckCircle2
} from 'lucide-react';
import Badge from '../common/Badge';
import GoldButton from '../common/GoldButton';
import Button from '../common/Button';
import { triggerGoldParticles } from '../../utils/particleEffect';

export default function StreamPlayer({ stream }) {
  const { user, triggerToast } = useApp();
  const [isMuted, setIsMuted] = useState(false);
  const [chatMessages, setChatMessages] = useState(stream.chatLog || []);
  const [chatInput, setChatInput] = useState('');
  const [reactions, setReactions] = useState([]);
  const chatEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Periodic random viewer comments simulation
  useEffect(() => {
    const randomUsers = ['AetherPro', 'CyberValk', 'Viper_Snip', 'RadiantGod', 'Phantom_GG', 'ApexGamer'];
    const randomComments = [
      'WHAT A PLAY!! 🔥🔥',
      'This series is going to game 5 for sure!',
      'Insane crosshair placement!',
      'GGWP! Outstanding teamwork',
      'The gold trophy belongs to them 🏆',
      'Caster hype is on point today!'
    ];

    const interval = setInterval(() => {
      const newUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const newComment = randomComments[Math.floor(Math.random() * randomComments.length)];
      const now = new Date();
      const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

      setChatMessages((prev) => [
        ...prev.slice(-40),
        { id: Date.now(), user: newUser, time: timeStr, text: newComment }
      ]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg = {
      id: Date.now(),
      user: user.username,
      time: timeStr,
      text: chatInput.trim(),
      isSelf: true
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');
  };

  const handleReaction = (emoji, e) => {
    triggerGoldParticles(e);
    const id = Date.now();
    setReactions((prev) => [...prev, { id, emoji }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2000);
  };

  return (
    <div className="stream-theater-layout">
      {/* Stream Video & Meta Player */}
      <div className="stream-player-wrap">
        <div className="stream-video-viewport">
          <img
            src={stream.thumbnail}
            alt={stream.title}
            className="stream-mock-screen"
            style={{ filter: 'brightness(0.9)' }}
          />

          {/* Floating Reaction Emojis */}
          <div style={{ position: 'absolute', bottom: '60px', right: '30px', pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {reactions.map((r) => (
              <div
                key={r.id}
                className="animate-fade-in"
                style={{ fontSize: '2rem', animation: 'floatSparks 1.5s forwards' }}
              >
                {r.emoji}
              </div>
            ))}
          </div>

          {/* Stream Player Controls Bar */}
          <div className="stream-overlay-controls">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Badge type="live">LIVE VentureX BROADCAST</Badge>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#FFF', fontWeight: 700 }}>
                <Eye size={14} style={{ color: 'var(--live-red)' }} />
                <span>{stream.viewers} Viewers</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button
                onClick={() => setIsMuted((prev) => !prev)}
                style={{ color: '#FFF', padding: '6px', background: 'rgba(0,0,0,0.6)', borderRadius: '4px', cursor: 'pointer' }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button
                onClick={(e) => {
                  triggerToast('Theater Mode', 'Expanded stream viewport.', 'info');
                }}
                style={{ color: '#FFF', padding: '6px', background: 'rgba(0,0,0,0.6)', borderRadius: '4px', cursor: 'pointer' }}
              >
                <Maximize size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Stream Metadata Strip */}
        <div className="stream-meta-bar">
          <div className="stream-streamer-info">
            <img src={stream.streamerAvatar} alt={stream.streamer} className="stream-streamer-avatar" />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                {stream.title}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                <span style={{ color: 'var(--gold-bright)', fontWeight: 700 }}>{stream.streamer}</span>
                <span>•</span>
                <span>{stream.game}</span>
                <span>•</span>
                <span>Casters: {stream.casters}</span>
              </div>
            </div>
          </div>

          {/* Stream Reactions & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '4px', background: 'var(--surface-elevated)', padding: '4px', borderRadius: 'var(--radius-sm)' }}>
              <button
                onClick={(e) => handleReaction('🔥', e)}
                style={{ padding: '4px 8px', fontSize: '1rem', cursor: 'pointer', borderRadius: '4px' }}
                title="Hype Fire"
              >
                🔥
              </button>
              <button
                onClick={(e) => handleReaction('🏆', e)}
                style={{ padding: '4px 8px', fontSize: '1rem', cursor: 'pointer', borderRadius: '4px' }}
                title="Championship Trophy"
              >
                🏆
              </button>
              <button
                onClick={(e) => handleReaction('⚡', e)}
                style={{ padding: '4px 8px', fontSize: '1rem', cursor: 'pointer', borderRadius: '4px' }}
                title="Energy Spark"
              >
                ⚡
              </button>
              <button
                onClick={(e) => handleReaction('👑', e)}
                style={{ padding: '4px 8px', fontSize: '1rem', cursor: 'pointer', borderRadius: '4px' }}
                title="Royal Crown"
              >
                👑
              </button>
            </div>

            <GoldButton
              size="sm"
              onClick={(e) => triggerToast('Followed Channel', `You are now following ${stream.streamer}!`, 'gold')}
            >
              Follow Broadcast
            </GoldButton>
          </div>
        </div>
      </div>

      {/* Simulated Live Chat Panel */}
      <div className="live-chat-panel">
        <div className="live-chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-bright)' }}>
            <Sparkles size={16} />
            <span>VentureX STREAM CHAT</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Slow Mode: Off</span>
        </div>

        <div className="live-chat-messages">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="chat-msg-row">
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '2px' }}>{msg.time}</span>
              <span className="chat-user-badge" style={{ color: msg.isSelf ? 'var(--gold-highlight)' : 'var(--gold-bright)' }}>
                {msg.user}:
              </span>
              <span className="chat-msg-text">{msg.text}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input Box */}
        <form onSubmit={handleSendMessage} className="live-chat-input-area">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Send a message in chat..."
            className="form-input"
            style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
          />
          <GoldButton size="sm" type="submit" style={{ padding: '0.5rem 0.85rem' }}>
            <Send size={14} />
          </GoldButton>
        </form>
      </div>
    </div>
  );
}
