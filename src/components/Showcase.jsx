import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Navigation,
  Send,
  CheckCircle,
  Moon,
} from 'lucide-react';
import { sound } from '../utils/audio';

const PENTATONIC_KEYS = [
  { note: 'C5', freq: 523.25, name: 'Star' },
  { note: 'D5', freq: 587.33, name: 'Dew' },
  { note: 'E5', freq: 659.25, name: 'Cloud' },
  { note: 'G5', freq: 783.99, name: 'Moon' },
  { note: 'A5', freq: 880.00, name: 'Harp' },
  { note: 'C6', freq: 1046.50, name: 'Slumber' },
];

const LANTERN_THEMES = [
  { name: 'Moon Amber', color: '#f59e0b', shadow: 'rgba(245, 158, 11, 0.55)' },
  { name: 'Berry Rose', color: '#a34063', shadow: 'rgba(163, 64, 99, 0.55)' },
  { name: 'Lavender Mist', color: '#a855f7', shadow: 'rgba(168, 85, 247, 0.55)' },
  { name: 'Stardust Mint', color: '#10b981', shadow: 'rgba(16, 185, 129, 0.55)' },
];

const DEFAULT_LANTERN = LANTERN_THEMES[0];
const DEFAULT_GLOW = 70;

const ROUTE_STOPS = [
  {
    id: 'nursery',
    name: 'Midnight Nursery Hub',
    time: '22:00',
    cargo: 'Fresh Dream Bubbles',
    x: 25,
    y: 105,
    desc: 'The central rooftop launchpad where Pip gathers newly spun night-clouds and bedtime drafts.',
  },
  {
    id: 'moonberry',
    name: 'Moonberry Cottage',
    time: '23:30',
    cargo: 'Warm Hearth Lullabies',
    x: 100,
    y: 55,
    desc: 'A cozy thatched cottage where berry lullabies soothe drowsy field mice into sound sleep.',
  },
  {
    id: 'cloudcastle',
    name: 'Cloud Castle',
    time: '01:15',
    cargo: 'Star-woven Pillows',
    x: 195,
    y: 35,
    desc: 'Floating fluffy parapets high in the stratosphere where young dreamers dream of flight.',
  },
  {
    id: 'starvillage',
    name: 'Sleepy Star Village',
    time: '03:45',
    cargo: 'Final Sweet Slumbers',
    x: 275,
    y: 90,
    desc: 'A quiet cobblestone hamlet where starlight blankets tuck little creatures gently into bed.',
  },
];

export default function Showcase() {
  // =========================================================================
  // Feature 1: Interactive Lullaby Music Box State
  // =========================================================================
  const [activeNote, setActiveNote] = useState(null);
  const [playbackState, setPlaybackState] = useState(sound.lullabyState); // 'stopped' | 'playing' | 'paused'
  const [musicBoxVolume, setMusicBoxVolume] = useState(sound.volume);
  const [isAudioMuted, setIsAudioMuted] = useState(sound.isMuted);

  useEffect(() => {
    return sound.subscribe((muted, vol) => {
      setIsAudioMuted(muted);
      setMusicBoxVolume(vol);
    });
  }, []);

  const handlePlayLullaby = async () => {
    await sound.playLullaby(
      (note) => {
        setActiveNote(note);
        setTimeout(() => setActiveNote(null), 250);
      },
      (state) => {
        setPlaybackState(state);
      }
    );
  };

  const handlePauseLullaby = () => {
    sound.playClick();
    sound.pauseLullaby();
    setPlaybackState('paused');
    setActiveNote(null);
  };

  const handleStopLullaby = () => {
    sound.playClick();
    sound.stopLullaby();
    setPlaybackState('stopped');
    setActiveNote(null);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setMusicBoxVolume(newVol);
    sound.setVolume(newVol);
  };

  const handlePlayKey = (key) => {
    sound.unmute();
    setActiveNote(key.note);
    sound.playNote(key.freq);
    setTimeout(() => setActiveNote(null), 300);
  };

  // =========================================================================
  // Feature 2: Dream Delivery Route State
  // =========================================================================
  const [activeStop, setActiveStop] = useState(ROUTE_STOPS[0]);
  const [isDelivering, setIsDelivering] = useState(false);
  const [parcelCoords, setParcelCoords] = useState({ x: 25, y: 105 });
  const [flightStatusMsg, setFlightStatusMsg] = useState('Standing by on the launchpad at Midnight Nursery');

  const handleLaunchDelivery = () => {
    if (isDelivering) return;
    setIsDelivering(true);
    sound.unmute();
    sound.playNote(523.25);
    setFlightStatusMsg('Departing Nursery Hub with star cargo...');
    setParcelCoords({ x: ROUTE_STOPS[0].x, y: ROUTE_STOPS[0].y });

    ROUTE_STOPS.forEach((stop, idx) => {
      setTimeout(() => {
        setActiveStop(stop);
        setParcelCoords({ x: stop.x, y: stop.y });
        setFlightStatusMsg(`Reached ${stop.name} · ${stop.cargo} delivered!`);
        sound.playNote(523.25 + idx * 130);

        if (idx === ROUTE_STOPS.length - 1) {
          setTimeout(() => {
            setIsDelivering(false);
            setFlightStatusMsg('All bedtime routes complete! Neighborhood safely asleep.');
          }, 1200);
        }
      }, (idx + 1) * 1200);
    });
  };

  const handleSelectStop = (stop) => {
    sound.playClick();
    setActiveStop(stop);
    setParcelCoords({ x: stop.x, y: stop.y });
    sound.playNote(stop.id === 'starvillage' ? 1046.5 : 783.99);
    setFlightStatusMsg(`Inspecting ${stop.name} · Scheduled at ${stop.time}`);
  };

  // =========================================================================
  // Feature 3: Interactive Nightlight Workshop State
  // =========================================================================
  const [selectedLantern, setSelectedLantern] = useState(DEFAULT_LANTERN);
  const [glowIntensity, setGlowIntensity] = useState(DEFAULT_GLOW);

  const handleResetNightlight = () => {
    sound.playClick();
    setSelectedLantern(DEFAULT_LANTERN);
    setGlowIntensity(DEFAULT_GLOW);
  };

  // =========================================================================
  // Feature 4: Playable Star Rattle Toy State
  // =========================================================================
  const [rattleCount, setRattleCount] = useState(0);
  const [isRattling, setIsRattling] = useState(false);

  const handleShakeRattle = () => {
    sound.unmute();
    sound.playRattle();
    setRattleCount((prev) => prev + 1);
    setIsRattling(true);
    setTimeout(() => setIsRattling(false), 350);
  };

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <div className="section-header">
          <div className="kicker">
            <Sparkles size={14} /> Junior Dream Engineer Crafts
          </div>
          <h2 className="section-title">Pip's Showcase Inventions</h2>
          <p className="section-desc">
            Everything Pip invents at Midnight Nursery is tuned for maximum calm, safety, and cozy sleep.
            Explore and play with the working prototypes below!
          </p>
        </div>

        <div className="projects-grid">
          {/* =================================================================
              Showcase Project 1: The Lullaby Lab (Feature 1)
             ================================================================= */}
          <div className="project-card">
            <div>
              <span className="project-tag">Invention 01 · Celestial Music Box</span>
              <h3 className="project-name">The Lullaby Lab</h3>
              <p className="project-summary">
                A handcrafted wind-up music box running on synthetic celestial waves. Built to replace sudden
                loud sounds with soothing Swiss chime harmonies.
              </p>
            </div>

            {/* Music Box Exhibit Stage with Rotating Disc */}
            <div className="project-img-frame">
              <img
                src="/assets/pip_lullaby_box.png"
                alt="Pip's Lullaby Music Box"
                className="project-preview-img"
              />

              {/* Rotating Musical Disc Visual (Tier 2 requirement) */}
              <div
                className={`music-disc-overlay ${playbackState === 'playing' ? 'spinning' : playbackState === 'paused' ? 'paused' : ''}`}
                aria-hidden="true"
                title="Rotating Celestial Music Disc"
              >
                <div className="disc-groove groove-1" />
                <div className="disc-groove groove-2" />
                <div className="disc-center">
                  <span className="disc-star">★</span>
                </div>
              </div>

              {/* Floating Music Notes Feedback */}
              {(playbackState === 'playing' || activeNote) && (
                <div className="floating-music-notes" aria-hidden="true">
                  <span className="music-note-float note-1">🎵</span>
                  <span className="music-note-float note-2">✨</span>
                  <span className="music-note-float note-3">🎶</span>
                </div>
              )}
            </div>

            {/* Interactive Music Box Controls */}
            <div className="project-interactive-box">
              {/* Playback Status Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  Status:{' '}
                  <strong style={{ color: playbackState === 'playing' ? '#10b981' : playbackState === 'paused' ? '#f59e0b' : 'var(--text-main)' }}>
                    {playbackState === 'playing' ? `Playing (${activeNote || 'Melody'})` : playbackState === 'paused' ? 'Paused' : 'Ready'}
                  </strong>
                </span>

                {/* Primary Music Box Controls: Play / Pause / Stop */}
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {playbackState !== 'playing' ? (
                    <button
                      type="button"
                      className="btn btn-primary btn-pill"
                      style={{ fontSize: '0.74rem', padding: '0.3rem 0.65rem' }}
                      onClick={handlePlayLullaby}
                      aria-label="Play lullaby melody"
                    >
                      <Play size={12} fill="currentColor" /> Play
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary btn-pill"
                      style={{ fontSize: '0.74rem', padding: '0.3rem 0.65rem' }}
                      onClick={handlePauseLullaby}
                      aria-label="Pause lullaby melody"
                    >
                      <Pause size={12} fill="currentColor" /> Pause
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-secondary btn-pill"
                    style={{ fontSize: '0.74rem', padding: '0.3rem 0.65rem' }}
                    onClick={handleStopLullaby}
                    disabled={playbackState === 'stopped'}
                    aria-label="Stop lullaby melody"
                  >
                    <Square size={12} fill="currentColor" /> Stop
                  </button>
                </div>
              </div>

              {/* Volume Slider & Mute Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.6rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border-light)', marginBottom: '0.75rem' }}>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}
                  onClick={() => sound.toggleMute()}
                  aria-label={isAudioMuted ? 'Unmute music box volume' : 'Mute music box volume'}
                  title={isAudioMuted ? 'Unmute' : 'Mute'}
                >
                  {isAudioMuted ? <VolumeX size={15} color="#ef4444" /> : <Volume2 size={15} color="var(--berry-primary)" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isAudioMuted ? 0 : musicBoxVolume}
                  onChange={handleVolumeChange}
                  style={{ flex: 1, accentColor: 'var(--berry-primary)', cursor: 'pointer', height: '4px' }}
                  aria-label="Music box master volume"
                />
                <span className="font-mono text-xs" style={{ color: 'var(--text-faint)', minWidth: '32px', textAlign: 'right' }}>
                  {isAudioMuted ? '0%' : `${Math.round(musicBoxVolume * 100)}%`}
                </span>
              </div>

              {/* 6 Clickable Chime Keys */}
              <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                Pentatonic Chime Keys:
              </span>
              <div className="synth-keys-grid">
                {PENTATONIC_KEYS.map((key) => (
                  <button
                    key={key.note}
                    type="button"
                    className={`synth-key ${activeNote === key.note ? 'active' : ''}`}
                    onClick={() => handlePlayKey(key)}
                    title={`Play ${key.name} (${key.note} - ${key.freq}Hz)`}
                    aria-label={`Play chime note ${key.note}`}
                  >
                    <span>✦</span>
                    <span>{key.note}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* =================================================================
              Showcase Project 2: Nightlight Workshop (Feature 3)
             ================================================================= */}
          <div className="project-card">
            <div>
              <span className="project-tag">Invention 02 · Bedside Moon Lantern</span>
              <h3 className="project-name">Nightlight Workshop</h3>
              <p className="project-summary">
                Handcrafted crescent moon lamps with gentle porcelain diffusion. Emits zero blue light to
                protect young dreamers' eyes.
              </p>
            </div>

            <div
              className="project-img-frame"
              style={{
                transition: 'box-shadow 0.3s ease',
                boxShadow: `inset 0 0 ${glowIntensity / 2}px ${selectedLantern.shadow}, 0 0 ${glowIntensity / 3}px ${selectedLantern.shadow}`,
              }}
            >
              <img
                src="/assets/pip_dream_lantern.png"
                alt="Pip's Dream Nightlight Lantern"
                className="project-preview-img"
                style={{
                  filter: `drop-shadow(0 0 ${glowIntensity / 4}px ${selectedLantern.color})`,
                  transition: 'filter 0.3s ease',
                }}
              />
            </div>

            <div className="project-interactive-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  Aura: <strong>{selectedLantern.name}</strong>
                </span>
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  Glow: {glowIntensity}%
                </span>
              </div>

              {/* Glow Intensity Slider */}
              <input
                type="range"
                min="20"
                max="100"
                value={glowIntensity}
                onChange={(e) => {
                  setGlowIntensity(Number(e.target.value));
                  sound.playClick();
                }}
                style={{ width: '100%', accentColor: selectedLantern.color, cursor: 'pointer', marginBottom: '0.8rem' }}
                aria-label="Nightlight glow brightness"
              />

              {/* 4 Color Palette Swatches + Reset Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="lantern-controls" style={{ margin: 0 }}>
                  {LANTERN_THEMES.map((theme) => (
                    <button
                      key={theme.name}
                      type="button"
                      className={`lantern-orb-btn ${selectedLantern.name === theme.name ? 'selected' : ''}`}
                      style={{ backgroundColor: theme.color }}
                      onClick={() => {
                        setSelectedLantern(theme);
                        sound.playNote(659.25);
                      }}
                      title={theme.name}
                      aria-label={`Select ${theme.name} aura`}
                    />
                  ))}
                </div>

                {/* Reset Button (Tier 2 requirement) */}
                <button
                  type="button"
                  className="btn btn-secondary btn-pill"
                  style={{ fontSize: '0.74rem', padding: '0.28rem 0.65rem' }}
                  onClick={handleResetNightlight}
                  title="Reset lantern glow to default Moon Amber 70%"
                  aria-label="Reset nightlight settings to default"
                >
                  <RotateCcw size={11} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* =================================================================
              Showcase Project 3: Dream Delivery Routes (Feature 2)
             ================================================================= */}
          <div className="project-card">
            <div>
              <span className="project-tag">Invention 03 · Rooftop Radar & Route</span>
              <h3 className="project-name">Dream Delivery Routes</h3>
              <p className="project-summary">
                Pip's live flight navigation grid. Follows gentle chimney downdrafts and cloud currents
                for silent doorstep slumber delivery across the village.
              </p>
            </div>

            {/* Interactive SVG Radar Map */}
            <div className="delivery-canvas" style={{ position: 'relative' }}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 300 140"
                style={{ position: 'absolute', inset: 0 }}
                aria-label="Interactive Midnight Nursery flight map"
              >
                {/* Background Stars in Map */}
                <circle cx="50" cy="20" r="1" fill="#fbbf24" opacity="0.6" />
                <circle cx="150" cy="85" r="1.5" fill="#ffffff" opacity="0.7" />
                <circle cx="230" cy="18" r="1.2" fill="#fbbf24" opacity="0.8" />
                <circle cx="85" cy="120" r="1" fill="#ffffff" opacity="0.5" />

                {/* Connecting Curved Flight Path */}
                <path
                  id="flight-route-path"
                  d="M 25 105 Q 60 40, 100 55 T 195 35 T 275 90"
                  fill="none"
                  stroke="rgba(251, 191, 36, 0.45)"
                  strokeWidth="2.5"
                  className="map-svg-path"
                />

                {/* Animated Flying Dream Parcel / Glowing Star */}
                <g
                  style={{
                    transform: `translate(${parcelCoords.x}px, ${parcelCoords.y}px)`,
                    transition: 'transform 0.9s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                  className="animated-parcel-group"
                >
                  <circle r="9" fill="rgba(251, 191, 36, 0.25)" className="parcel-aura-pulse" />
                  <circle r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                  <text y="-7" textAnchor="middle" fontSize="9" fill="#fef3c7">📦</text>
                </g>

                {/* Waypoint Clickable Destination Nodes */}
                {ROUTE_STOPS.map((st) => (
                  <g
                    key={st.id}
                    onClick={() => handleSelectStop(st)}
                    style={{ cursor: 'pointer' }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select destination ${st.name}`}
                  >
                    <circle
                      cx={st.x}
                      cy={st.y}
                      r={activeStop.id === st.id ? 8 : 5.5}
                      fill={activeStop.id === st.id ? '#fbbf24' : '#a34063'}
                      stroke="#ffffff"
                      strokeWidth={activeStop.id === st.id ? 2.5 : 1}
                      style={{ transition: 'all 0.25s ease' }}
                    />
                    <text
                      x={st.x}
                      y={st.y + (st.y > 70 ? -12 : 16)}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="7.5"
                      fontFamily="sans-serif"
                      fontWeight="600"
                    >
                      {st.name.split(' ')[0]}
                    </text>
                  </g>
                ))}
              </svg>

              <div style={{ position: 'absolute', bottom: '8px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', zIndex: 2 }}>
                <span className="font-mono text-xs" style={{ color: '#fbbf24' }}>
                  ★ {isDelivering ? 'Dispatching...' : 'Radar Online'}
                </span>
                <span className="font-mono text-xs" style={{ color: '#9ca3af' }}>
                  Speed: 12 Knots
                </span>
              </div>
            </div>

            {/* Waypoints Selector & Status */}
            <div className="project-interactive-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Navigation size={13} style={{ color: 'var(--berry-primary)' }} />
                  Destinations:
                </span>
                <button
                  type="button"
                  className="btn btn-secondary btn-pill"
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                  onClick={handleLaunchDelivery}
                  disabled={isDelivering}
                  aria-label="Launch test dream delivery flight"
                >
                  <Send size={11} /> {isDelivering ? 'Delivering...' : 'Dispatch Flight'}
                </button>
              </div>

              {/* Destination Pill Buttons */}
              <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
                {ROUTE_STOPS.map((stop) => (
                  <button
                    key={stop.id}
                    type="button"
                    className={`btn btn-pill ${activeStop.id === stop.id ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ whiteSpace: 'nowrap', fontSize: '0.74rem', padding: '0.3rem 0.6rem' }}
                    onClick={() => handleSelectStop(stop)}
                  >
                    {stop.time} · {stop.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Selected Destination Details Box */}
              <div style={{ marginTop: '0.6rem', padding: '0.6rem 0.8rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle size={13} color="#10b981" />
                  {activeStop.name} ({activeStop.time})
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: '1.4' }}>
                  {activeStop.desc}
                </div>
                <div className="font-mono text-xs" style={{ color: 'var(--berry-primary)', marginTop: '0.3rem' }}>
                  Cargo: {activeStop.cargo}
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              Showcase Project 4: Pip's Star Rattle Toy
             ================================================================= */}
          <div className="project-card">
            <div>
              <span className="project-tag">Invention 04 · Playable Nursery Toy</span>
              <h3 className="project-name">The Star Rattle</h3>
              <p className="project-summary">
                Pip's wind-carved wooden rattle filled with polished moonstone beads. Gives anxious little sleepers
                a gentle, rhythmic shake to lull them into dreams.
              </p>
            </div>

            <div
              className="project-img-frame"
              onClick={handleShakeRattle}
              style={{ cursor: 'pointer', flexDirection: 'column' }}
              title="Click or tap to shake Pip's rattle!"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleShakeRattle();
              }}
              aria-label="Shake Pip's star rattle toy"
            >
              <div
                className={`star-rattle-toy ${isRattling ? 'shaking' : ''}`}
                style={{ fontSize: '4.2rem', userSelect: 'none', transition: 'transform 0.15s ease' }}
              >
                🪄⭐
              </div>

              {isRattling && (
                <div className="rattle-sparkles" aria-hidden="true">
                  <span className="rattle-sparkle-1">✨</span>
                  <span className="rattle-sparkle-2">💫</span>
                  <span className="rattle-sparkle-3">⭐</span>
                </div>
              )}
            </div>

            <div className="project-interactive-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  Total Shakes: <strong>{rattleCount}</strong>
                </span>
                <button
                  type="button"
                  className="btn btn-primary btn-pill"
                  onClick={handleShakeRattle}
                  aria-label="Shake rattle"
                >
                  <span>Shake Rattle! 🔔</span>
                </button>
              </div>
              <p className="font-mono text-xs" style={{ textAlign: 'center', color: 'var(--text-faint)', marginTop: '0.6rem' }}>
                {rattleCount > 0 ? `Pip smiles softly · ${rattleCount} bedtime beats` : 'Click the toy or button to shake'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
