import React, { useState } from 'react';
import { Music, Lightbulb, MapPin, Play, Sparkles, Navigation, RotateCw, Send, CheckCircle } from 'lucide-react';
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

const ROUTE_STOPS = [
  { id: 'nursery', name: 'Midnight Nursery Hub', time: '22:00', cargo: 'Fresh Dream Bubbles', x: 20, y: 110 },
  { id: 'chimneys', name: 'Chimney Lane East', time: '23:30', cargo: 'Warm Hearth Lullabies', x: 120, y: 70 },
  { id: 'clocktower', name: 'Old Village Clocktower', time: '01:15', cargo: 'Silenced Pendulum Oil', x: 210, y: 50 },
  { id: 'moon', name: 'Moonbeam Pier', time: '03:45', cargo: 'Final Sweet Slumbers', x: 280, y: 90 },
];

export default function Showcase() {
  // Lullaby Lab State
  const [activeNote, setActiveNote] = useState(null);
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);
  const [windingDegrees, setWindingDegrees] = useState(0);

  // Nightlight State
  const [selectedLantern, setSelectedLantern] = useState(LANTERN_THEMES[0]);
  const [glowIntensity, setGlowIntensity] = useState(75);
  const [lanternMode, setLanternMode] = useState('porcelain'); // 'porcelain' | 'starlight'

  // Route Map State
  const [activeStop, setActiveStop] = useState(ROUTE_STOPS[0]);
  const [isDelivering, setIsDelivering] = useState(false);
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [flightStatusMsg, setFlightStatusMsg] = useState('Waiting on launchpad at Midnight Nursery');

  const handlePlayKey = (key) => {
    setActiveNote(key.note);
    setWindingDegrees((prev) => prev + 45);
    sound.playNote(key.freq);
    setTimeout(() => setActiveNote(null), 300);
  };

  const handlePlayLullaby = () => {
    if (isPlayingMelody) return;
    setIsPlayingMelody(true);
    setWindingDegrees((prev) => prev + 360);
    sound.playLullabyMelody((note) => {
      setActiveNote(note);
      setTimeout(() => setActiveNote(null), 250);
    });
    setTimeout(() => setIsPlayingMelody(false), 3000);
  };

  // Dispatch interactive delivery flight
  const handleLaunchDelivery = () => {
    if (isDelivering) return;
    setIsDelivering(true);
    setDeliveryProgress(0);
    sound.playNote(523.25);
    setFlightStatusMsg('Departing Nursery Hub with dream cargo...');

    const steps = [
      { prog: 25, stop: ROUTE_STOPS[1], msg: 'Drifting over Chimney Lane East · Lullabies deployed!' },
      { prog: 65, stop: ROUTE_STOPS[2], msg: 'Clocktower reached · Pendulum calmed with hush oil' },
      { prog: 100, stop: ROUTE_STOPS[3], msg: 'Moonbeam Pier arrival · All neighborhood dreams delivered!' },
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setDeliveryProgress(step.prog);
        setActiveStop(step.stop);
        setFlightStatusMsg(step.msg);
        sound.playNote(659.25 + idx * 130);
      }, (idx + 1) * 1100);
    });

    setTimeout(() => {
      setIsDelivering(false);
    }, 4200);
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
            Test the playable prototypes below!
          </p>
        </div>

        <div className="projects-grid">
          {/* =================================================================
              Showcase Project 1: The Lullaby Lab
             ================================================================= */}
          <div className="project-card">
            <div>
              <span className="project-tag">Project 01 · Generative Audio</span>
              <h3 className="project-name">The Lullaby Lab</h3>
              <p className="project-summary">
                A wind-up music box running on synthetic celestial waves. Built to replace sudden loud sounds
                with hypnotic pentatonic harmonies.
              </p>
            </div>

            <div className="project-img-frame">
              <img
                src="/assets/pip_lullaby_box.png"
                alt="Pip's Lullaby Music Box with winding key"
                className="project-preview-img"
              />

              {/* Animated Brass Winding Key Visual */}
              <div
                className="winding-key-badge"
                style={{
                  transform: `rotate(${windingDegrees}deg)`,
                  transition: isPlayingMelody ? 'transform 3s linear' : 'transform 0.3s ease',
                }}
                title="Brass Winding Key"
              >
                <RotateCw size={18} color="#d97706" />
              </div>
            </div>

            <div className="project-interactive-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  Interactive Chime Keys:
                </span>
                <button
                  type="button"
                  className="btn btn-secondary btn-pill"
                  onClick={handlePlayLullaby}
                  disabled={isPlayingMelody}
                  aria-label="Play sleepy lullaby melody"
                >
                  <Play size={13} fill="currentColor" />
                  <span>{isPlayingMelody ? 'Playing...' : 'Play Sleepy Lullaby'}</span>
                </button>
              </div>

              {/* 6 Clickable Chime Keys */}
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
              <p className="font-mono text-xs" style={{ textAlign: 'center', color: 'var(--text-faint)' }}>
                {activeNote ? `Playing note: ${activeNote}` : 'Tap any key or play melody'}
              </p>
            </div>
          </div>

          {/* =================================================================
              Showcase Project 2: Nightlight Collection
             ================================================================= */}
          <div className="project-card">
            <div>
              <span className="project-tag">Project 02 · Bedside Lighting</span>
              <h3 className="project-name">Nightlight Collection</h3>
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
                style={{ width: '100%', accentColor: selectedLantern.color, cursor: 'pointer' }}
                aria-label="Nightlight glow brightness"
              />

              {/* 4 Color Palette Swatches */}
              <div className="lantern-controls">
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
            </div>
          </div>

          {/* =================================================================
              Showcase Project 3: Dream Delivery Routes
             ================================================================= */}
          <div className="project-card">
            <div>
              <span className="project-tag">Project 03 · Logistics & Radar</span>
              <h3 className="project-name">Dream Delivery Routes</h3>
              <p className="project-summary">
                Pip's live flight navigation grid. Pinpoints gentle chimney downdrafts and cloud currents
                for silent doorstep slumber delivery.
              </p>
            </div>

            <div className="delivery-canvas">
              {/* Animated Flight Path SVG */}
              <svg width="100%" height="100%" viewBox="0 0 300 140" style={{ position: 'absolute', inset: 0 }}>
                <path
                  d="M 20 110 Q 70 30, 120 70 T 210 50 T 280 90"
                  fill="none"
                  stroke="rgba(251, 191, 36, 0.4)"
                  strokeWidth="2"
                  className="map-svg-path"
                />
                {/* Waypoint Markers */}
                {ROUTE_STOPS.map((st) => (
                  <circle
                    key={st.id}
                    cx={st.x}
                    cy={st.y}
                    r={activeStop.id === st.id ? 7 : 5}
                    fill={activeStop.id === st.id ? '#fbbf24' : '#a34063'}
                    stroke="#ffffff"
                    strokeWidth={activeStop.id === st.id ? 2 : 1}
                  />
                ))}
              </svg>

              <div style={{ position: 'absolute', bottom: '8px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span className="font-mono text-xs" style={{ color: '#fbbf24' }}>
                  ★ {isDelivering ? 'Dispatching...' : 'Radar Online'}
                </span>
                <span className="font-mono text-xs" style={{ color: '#9ca3af' }}>
                  Speed: 12 Knots
                </span>
              </div>
            </div>

            <div className="project-interactive-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Navigation size={13} style={{ color: 'var(--berry-primary)' }} />
                  Waypoints:
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

              <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
                {ROUTE_STOPS.map((stop) => (
                  <button
                    key={stop.id}
                    type="button"
                    className={`btn btn-pill ${activeStop.id === stop.id ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ whiteSpace: 'nowrap', fontSize: '0.74rem', padding: '0.3rem 0.6rem' }}
                    onClick={() => {
                      setActiveStop(stop);
                      sound.playNote(stop.id === 'moon' ? 1046.5 : 783.99);
                    }}
                  >
                    {stop.time} · {stop.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '0.6rem', padding: '0.6rem 0.8rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle size={13} color="#10b981" />
                  {activeStop.name}
                </div>
                <div className="font-mono text-xs" style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Status: {flightStatusMsg}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
