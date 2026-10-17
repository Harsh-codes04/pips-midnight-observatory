import React, { useState, useEffect } from 'react';
import { Send, Heart, Sparkles, Flame, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

const INITIAL_NOTES = [
  { id: 1, author: 'Luna the Stargazer', text: 'Thank you for the warm amber nightlight, Pip! Slept like a sleepy kitten.' },
  { id: 2, author: 'Barnaby the Owl', text: 'Chimney delivery was silent and on time. 10/10 dream engineering.' },
  { id: 3, author: 'A Cozy Dreamer', text: 'The Lullaby Lab melody cured my insomnia. Best baby on the web.' },
];

const BEDTIME_STAMPS = [
  { id: 'pip', emoji: '💤', name: 'Sleepy Pip', hint: 'The master dreamer', freq: 523.25 },
  { id: 'lantern', emoji: '🏮', name: 'Dream Lantern', hint: 'Warm amber glow', freq: 659.25 },
  { id: 'star', emoji: '⭐', name: 'Rooftop Star', hint: 'Guiding night light', freq: 783.99 },
  { id: 'rattle', emoji: '🔔', name: 'Moon Rattle', hint: 'Gentle rhythm', freq: 1046.50 },
];

export default function SideQuests({ onChaosModeToggle, isChaosMode }) {
  // Odometer State
  const [visitorCount, setVisitorCount] = useState(1482);

  // Bedtime Stamps State
  const [collectedStamps, setCollectedStamps] = useState(() => {
    try {
      const saved = localStorage.getItem('pip_collected_stamps');
      return saved ? JSON.parse(saved) : ['pip'];
    } catch {
      return ['pip'];
    }
  });

  // Guestbook State
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('pip_guestbook_notes');
      return saved ? JSON.parse(saved) : INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });
  const [authorInput, setAuthorInput] = useState('');
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pip_odometer_count');
      const nextCount = stored ? parseInt(stored, 10) + 1 : 1483;
      localStorage.setItem('pip_odometer_count', nextCount.toString());
      setVisitorCount(nextCount);
    } catch {
      // Fallback
    }
  }, []);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    sound.playNote(783.99);
    const newNote = {
      id: Date.now(),
      author: authorInput.trim() || 'A Sleepy Traveler',
      text: textInput.trim(),
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    try {
      localStorage.setItem('pip_guestbook_notes', JSON.stringify(updated));
    } catch {
      // LocalStorage full or private browsing
    }

    setTextInput('');
    setAuthorInput('');
  };

  const handleResetNotes = () => {
    sound.playClick();
    setNotes(INITIAL_NOTES);
    try {
      localStorage.setItem('pip_guestbook_notes', JSON.stringify(INITIAL_NOTES));
    } catch {
      // Ignore
    }
  };

  const handleToggleStamp = (stamp) => {
    sound.playNote(stamp.freq);
    const isCollected = collectedStamps.includes(stamp.id);
    const updated = isCollected
      ? collectedStamps.filter((id) => id !== stamp.id)
      : [...collectedStamps, stamp.id];

    setCollectedStamps(updated);
    try {
      localStorage.setItem('pip_collected_stamps', JSON.stringify(updated));
    } catch {
      // Ignore
    }

    if (!isCollected && updated.length === BEDTIME_STAMPS.length) {
      sound.playNote(1046.5);
    }
  };

  const digits = visitorCount.toString().padStart(6, '0').split('');

  return (
    <section id="sidequests" className="section">
      <div className="wrap">
        <div className="section-header">
          <div className="kicker">
            <Sparkles size={14} /> Interactive Toybox & Community
          </div>
          <h2 className="section-title">Pip's Little Toybox & Guestbook</h2>
          <p className="section-desc">
            Early-web whimsy with a gentle heart. Leave a note on Pip's dream board, check the vintage odometer,
            or collect bedtime stamps!
          </p>
        </div>

        <div className="side-quests-grid">
          {/* Left Column: Vintage Hit Counter & Chaos Mode */}
          <div className="quest-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="project-tag">Vintage Counter</span>
              <span className="font-mono text-xs" style={{ color: '#10b981' }}>Live Odometer</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', margin: '0.6rem 0 0.4rem' }}>Dreams Delivered</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              A classic retro-web visitor odometer tracking gentle dreams delivered in your browser.
            </p>

            <div className="odometer-box">
              <span className="font-mono text-xs" style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Observed Dream Deliveries
              </span>
              <div className="odometer-digits">
                {digits.map((digit, idx) => (
                  <span key={idx} className="odometer-digit">
                    {digit}
                  </span>
                ))}
              </div>
            </div>

            {/* Responsive Chaos Mode Button */}
            <div style={{ marginTop: '1.8rem', paddingTop: '1.4rem', borderTop: '1px dashed var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="font-mono text-xs" style={{ color: 'var(--berry-primary)', fontWeight: 600 }}>
                  <Flame size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  Playful Chaos Mode
                </span>
                <span className="font-mono text-xs" style={{ color: 'var(--text-faint)' }}>Retro 90s Shake</span>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
                {isChaosMode
                  ? 'Chaos unleashed! A gentle retro rumble reshapes the nursery view.'
                  : 'Press to shake up the nursery with a playful retro earthquake vibration.'}
              </p>
              <button
                type="button"
                className={`btn ${isChaosMode ? 'btn-primary' : 'btn-secondary'} btn-pill`}
                onClick={() => {
                  sound.playNote(isChaosMode ? 440 : 880);
                  onChaosModeToggle();
                }}
                aria-pressed={isChaosMode}
              >
                {isChaosMode ? '💤 Return to Peaceful Nursery' : '⚡ Unleash Chaos Mode'}
              </button>
            </div>
          </div>

          {/* Right Column: Live Guestbook Wall */}
          <div className="quest-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="project-tag">Community Wall</span>
              <span className="font-mono text-xs" style={{ color: '#10b981' }}>Visitor Board</span>
            </div>

            <h3 style={{ fontSize: '1.4rem', margin: '0.6rem 0 0.4rem' }}>Pip's Dream Board</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
              Leave a bedtime wish or gentle hello for Pip. Notes are stored locally in your browser.
            </p>

            <form onSubmit={handleAddNote} className="guestbook-form">
              <input
                type="text"
                placeholder="Your name / alias"
                value={authorInput}
                onChange={(e) => setAuthorInput(e.target.value)}
                className="guestbook-input"
                style={{ flex: '0.4' }}
                maxLength={25}
                aria-label="Your nickname or alias"
              />
              <input
                type="text"
                placeholder="Leave a sweet bedtime dream wish..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="guestbook-input"
                maxLength={100}
                required
                aria-label="Bedtime dream wish message"
              />
              <button type="submit" className="btn btn-primary btn-pill" title="Post note" aria-label="Post bedtime note">
                <Send size={15} />
              </button>
            </form>

            <div className="notes-scroll-wall">
              {notes.map((note) => (
                <div key={note.id} className="note-bubble">
                  <div className="note-author">✦ {note.author}</div>
                  <div>{note.text}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '0.8rem', textAlign: 'right' }}>
              <button
                type="button"
                className="btn btn-secondary btn-pill"
                onClick={handleResetNotes}
                style={{ fontSize: '0.74rem', padding: '0.25rem 0.6rem' }}
                title="Reset dream board to default notes"
              >
                <RotateCcw size={11} /> Reset Board
              </button>
            </div>
          </div>
        </div>

        {/* Bedtime Stamp Passport (Early-Web Sticker Album Souvenir) */}
        <div className="stamp-passport-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span className="project-tag">Nursery Souvenir</span>
              <h3 style={{ fontSize: '1.3rem', margin: '0.35rem 0 0.2rem' }}>Pip's Bedtime Stamp Passport</h3>
            </div>
            <span className="font-mono text-xs" style={{ color: 'var(--berry-primary)', fontWeight: 600 }}>
              {collectedStamps.length} of {BEDTIME_STAMPS.length} Stamps Collected
            </span>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '0.4rem 0 1.2rem' }}>
            Tap each bedtime seal to stamp your traveler passport before turning off the nightlight.
          </p>

          <div className="stamps-grid">
            {BEDTIME_STAMPS.map((stamp) => {
              const isCollected = collectedStamps.includes(stamp.id);
              return (
                <button
                  key={stamp.id}
                  type="button"
                  className={`bedtime-stamp ${isCollected ? 'collected' : ''}`}
                  onClick={() => handleToggleStamp(stamp)}
                  aria-pressed={isCollected}
                  title={`${stamp.name} - ${stamp.hint} (${isCollected ? 'Stamped · Tap to unstamp' : 'Tap to stamp'})`}
                >
                  <span className="stamp-emoji">{stamp.emoji}</span>
                  <span className="stamp-label">{stamp.name}</span>
                  <span className="stamp-badge">{isCollected ? 'STAMPED' : 'TAP ME'}</span>
                </button>
              );
            })}
          </div>

          {collectedStamps.length === BEDTIME_STAMPS.length && (
            <div className="passport-complete-banner">
              ⭐ <strong>Certified Master Dreamer!</strong> Pip awards you the Midnight Nursery golden seal. Sleep tight, little stargazer.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
