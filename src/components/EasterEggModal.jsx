import React, { useEffect } from 'react';
import { X, Sparkles, Moon, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

export default function EasterEggModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="easter-egg-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="icon-btn"
          style={{ position: 'absolute', top: '16px', right: '16px' }}
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Fallback CSS Starburst Sparkles */}
        <div className="starburst-container" aria-hidden="true">
          <span className="burst-star star-1">✨</span>
          <span className="burst-star star-2">⭐</span>
          <span className="burst-star star-3">✦</span>
          <span className="burst-star star-4">🌟</span>
        </div>

        <div style={{ display: 'inline-flex', padding: '0.8rem', borderRadius: '50%', background: 'var(--berry-soft)', color: 'var(--berry-primary)', marginBottom: '1rem' }}>
          <Sparkles size={28} />
        </div>

        <h3 id="easter-egg-title" style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>
          🎉 You Found Pip's Secret Diary!
        </h3>
        <span className="kicker" style={{ marginBottom: '1.2rem' }}>
          Easter Egg Discovered
        </span>

        <div
          style={{
            background: 'var(--bg-card-subtle)',
            border: '1.5px dashed var(--border-light)',
            borderRadius: '18px',
            padding: '1.2rem',
            textAlign: 'left',
            margin: '1.2rem 0',
            fontSize: '0.92rem',
            lineHeight: '1.6',
            color: 'var(--text-main)',
          }}
        >
          <div style={{ fontWeight: 600, color: 'var(--berry-primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Moon size={14} /> Secret Entry #007 · 03:14 AM
          </div>
          <p style={{ fontStyle: 'italic', marginBottom: '0.8rem' }}>
            "Some grown-ups think skulls look spooky. But a skull is just the smile inside your cheeks keeping your head cozy!
            Never forget: the sweetest dreams are usually baked by the quietest babies."
          </p>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            ✦ <strong>Favorite Snack:</strong> Moonbeam marshmallows & chamomile drops.<br />
            ✦ <strong>Bedtime Wish:</strong> That everyone who visited this website sleeps peacefully tonight!
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          style={{ width: '100%' }}
          onClick={() => {
            sound.playNote(1046.5);
            onClose();
          }}
        >
          Tuck Pip In & Close Diary <Heart size={16} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}
