import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Moon, ArrowDown, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

const PIP_WHISPERS = [
  "Yawn... the stars are all on duty tonight! 💤",
  "Did you wind your bedside nightlight? 🏮",
  "Sending a warm cloud dream to your rooftop! ☁️",
  "Sleep tight, little neighbor. No nightmares allowed! ⭐",
  "Pip smiles softly: sweet dreams! 🌸",
];

export default function Hero({ onPipClick }) {
  const containerRef = useRef(null);
  const [pupils, setPupils] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeWhisper, setActiveWhisper] = useState(null);
  const [whisperIdx, setWhisperIdx] = useState(0);
  const [isHopping, setIsHopping] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handleChange = (e) => setReducedMotion(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', handleChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const updateInteractions = (clientX, clientY) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.45;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      // 1. Subtle 3D card tilt (bounded between -6 and +6 degrees)
      const tiltX = Math.max(-6, Math.min(6, (deltaX / rect.width) * 12));
      const tiltY = Math.max(-6, Math.min(6, -(deltaY / rect.height) * 12));
      setTilt({ x: tiltX, y: tiltY });

      // 2. Bounded amber pupil tracking (max 4.5px radius)
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(4.5, Math.hypot(deltaX, deltaY) / 38);
      setPupils({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    const handlePointerMove = (e) => {
      updateInteractions(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updateInteractions(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [reducedMotion]);

  const handleCharacterInteraction = () => {
    sound.unmute();
    sound.playNote(783.99);

    // Trigger hop animation
    setIsHopping(true);
    setTimeout(() => setIsHopping(false), 450);

    // Show friendly speech bubble whisper
    const msg = PIP_WHISPERS[whisperIdx % PIP_WHISPERS.length];
    setWhisperIdx((prev) => prev + 1);
    setActiveWhisper(msg);
    setTimeout(() => setActiveWhisper(null), 3000);

    if (onPipClick) onPipClick();
  };

  return (
    <section id="hero" className="hero-section" aria-label="Introduction to Pip">
      <div className="wrap">
        <div className="hero-grid">
          {/* Left Column: Identity & Bio */}
          <div>
            <div className="kicker">
              <Moon size={14} /> Junior Dream Engineer · Midnight Nursery
            </div>

            <h1 className="hero-title">
              Hello, I'm <span className="accent">Pip</span>.<br />
              I build gentle dreams for little creatures.
            </h1>

            <p className="hero-bio">
              A sleepy, gentle skull baby working the midnight shift. When the sun dips beneath the chimneys,
              I craft the glowing nightlights, soothing music-box lullabies, and starlit rooftop routes that tuck the
              neighborhood softly into bed.
            </p>

            {/* Official Concept Tagline */}
            <div className="hero-tagline-quote">
              ✨ <em>"Small baby. Enormous dreams."</em>
            </div>

            <div className="hero-actions">
              <a
                href="#projects"
                className="btn btn-primary"
                onClick={() => sound.playClick()}
              >
                Explore My Inventions <ArrowDown size={17} />
              </a>
              <a
                href="#story"
                className="btn btn-secondary"
                onClick={() => sound.playClick()}
              >
                Read Bedtime Story
              </a>
            </div>
          </div>

          {/* Right Column: Character Stage with Parallax & Reaction (Tier 3) */}
          <div className="character-stage" ref={containerRef}>
            {/* Atmospheric Background Glow Layer */}
            <div
              className="avatar-halo"
              style={{
                transform: reducedMotion ? 'none' : `translate(${tilt.x * 2.5}px, ${tilt.y * 2.5}px)`,
                transition: 'transform 0.2s ease-out',
              }}
            />

            {/* Floating Info Badges */}
            <div
              className="floating-badge badge-top-left"
              style={{
                transform: reducedMotion ? 'none' : `translate(${-tilt.x * 2}px, ${-tilt.y * 2}px)`,
              }}
            >
              <Sparkles size={14} color="#e88c1f" />
              <span>100% Cozy · 0% Creepy</span>
            </div>

            <div
              className="floating-badge badge-bottom-right"
              style={{
                transform: reducedMotion ? 'none' : `translate(${tilt.x * 1.5}px, ${tilt.y * 1.5}px)`,
              }}
            >
              <Heart size={14} color="#a34063" />
              <span>Tap Pip for sleepy whispers</span>
            </div>

            {/* Interactive Speech Bubble Reaction */}
            {activeWhisper && (
              <div className="pip-speech-bubble" role="status" aria-live="polite">
                <span>{activeWhisper}</span>
              </div>
            )}

            {/* Official Pip Avatar Cloud with 3D Tilt & Eye Tracking */}
            <div
              className={`avatar-image-wrap ${isHopping ? 'pip-hopping' : ''}`}
              onClick={handleCharacterInteraction}
              title="Click or tap Pip for a sleepy whisper and cheerful chime!"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCharacterInteraction();
                }
              }}
              style={{
                transform: reducedMotion
                  ? 'none'
                  : `perspective(700px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transition: isHopping ? 'transform 0.15s ease' : 'transform 0.2s ease-out',
              }}
            >
              <img
                src="/assets/pip_avatar_cloud.png"
                alt="Pip the Skull Baby waving gently from a cloud"
                className="avatar-main-img"
              />

              {/* Glowing Amber Pinprick Pupils Layer */}
              <div className="eye-tracker-box" aria-hidden="true">
                <div className="pupil-socket">
                  <div
                    className="amber-pinprick"
                    style={{
                      transform: `translate(${pupils.x}px, ${pupils.y}px)`,
                    }}
                  />
                </div>
                <div className="pupil-socket">
                  <div
                    className="amber-pinprick"
                    style={{
                      transform: `translate(${pupils.x}px, ${pupils.y}px)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
