import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Breadcrumb from '../components/common/Breadcrumb';
import VideoCard from '../components/cards/VideoCard';
import GoldButton from '../components/common/GoldButton';
import Button from '../components/common/Button';
import { Play, ThumbsUp, Share2, Bookmark, Send, Sparkles, Eye, Clock } from 'lucide-react';
import { triggerGoldParticles } from '../utils/particleEffect';

export default function VideoDetailsPage() {
  const { pageParams, videos, user, triggerToast, navigateTo } = useApp();
  const [likes, setLikes] = useState(1420);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, user: 'AetherPro', time: '1 hour ago', text: 'That flick shot on round 12 was out of this world!' },
    { id: 2, user: 'Valkyrie_Queen', time: '3 hours ago', text: 'Best tactical utility usage I have seen this entire tournament season.' }
  ]);
  const [commentInput, setCommentInput] = useState('');

  const video = videos.find((v) => v.id === pageParams.id) || videos[0];
  const relatedVideos = videos.filter((v) => v.id !== video.id);

  const handleLike = (e) => {
    triggerGoldParticles(e);
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      triggerToast('Liked Highlight! 🔥', 'Added to your liked videos.', 'gold');
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    setComments((prev) => [
      { id: Date.now(), user: user.username, time: 'Just now', text: commentInput.trim() },
      ...prev
    ]);
    setCommentInput('');
    triggerToast('Comment Posted', 'Your comment is now live on this video clip.', 'info');
  };

  return (
    <div className="container-wide section animate-fade-in">
      <Breadcrumb
        items={[
          { label: 'Videos', page: 'videos' },
          { label: video.title }
        ]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem' }}>
        {/* Main Video Viewport & Comments */}
        <div>
          {/* Video Player */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              background: '#000000',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)',
              marginBottom: '1.5rem'
            }}
          >
            <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(7, 8, 11, 0.85)',
                border: '2px solid var(--gold-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-bright)',
                boxShadow: '0 0 24px rgba(201, 162, 39, 0.4)',
                cursor: 'pointer'
              }}
              onClick={(e) => triggerGoldParticles(e)}
            >
              <Play size={26} fill="currentColor" style={{ marginLeft: '4px' }} />
            </div>
          </div>

          {/* Video Header & Meta */}
          <div style={{ background: 'var(--surface-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--gold-bright)', fontWeight: 800, textTransform: 'uppercase' }}>
              {video.game} • {video.category}
            </span>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.4rem 0 1rem', lineHeight: 1.3 }}>
              {video.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={video.creatorAvatar} alt={video.creator} style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid var(--gold-primary)' }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{video.creator}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{video.views} views • {video.date}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Button
                  size="sm"
                  variant={hasLiked ? 'outline-gold' : 'secondary'}
                  onClick={handleLike}
                  icon={<ThumbsUp size={14} />}
                >
                  {likes} Likes
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => triggerToast('Link Copied', 'Share this clip with friends.', 'info')}
                  icon={<Share2 size={14} />}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div style={{ background: 'var(--surface-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              Community Comments ({comments.length})
            </h3>

            {/* Post Comment Input */}
            <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Join the discussion on this play..."
                className="form-input"
              />
              <GoldButton size="sm" type="submit" icon={<Send size={14} />}>
                Post
              </GoldButton>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {comments.map((c) => (
                <div key={c.id} style={{ padding: '0.85rem', background: 'var(--surface-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--gold-bright)' }}>{c.user}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.time}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Up Next Videos */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--gold-bright)' }}>
            Up Next on VentureX
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {relatedVideos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
