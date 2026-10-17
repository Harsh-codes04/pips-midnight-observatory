import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Moon, ArrowDown, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Hero({ onPipClick }) {
  const containerRef = useRef(null);
  const [pupils, setPupils] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePupils = (clientX, clientY) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.45;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(5, Math.hypot(deltaX, deltaY) / 35);

      setPupils({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    const handlePointerMove = (e) => {
      updatePupils(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updatePupils(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <section id="hero" className="hero-section">
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

            <div className="status-badge">
              <span className="status-dot"></span>
              <span>Currently on shift: Midnight Nursery Rooftop Desk</span>
            </div>
          </div>

          {/* Right Column: Character Stage with Official Artwork */}
          <div className="character-stage" ref={containerRef}>
            <div className="avatar-halo" />

            {/* Floating Info Badges */}
            <div className="floating-badge badge-top-left">
              <Sparkles size={14} color="#e88c1f" />
              <span>100% Cozy · 0% Creepy</span>
            </div>

            <div className="floating-badge badge-bottom-right">
              <Heart size={14} color="#a34063" />
              <span>Tap nightcap for surprises</span>
            </div>

            {/* Official Pip Avatar Cloud with Eye Tracking */}
            <div
              className="avatar-image-wrap"
              onClick={onPipClick}
              title="Click Pip for a friendly yawn and star sparkle!"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onPipClick();
                }
              }}
            >
              <img
                src="/assets/pip_avatar_cloud.png"
                alt="Pip the Skull Baby waving gently from a cloud"
                className="avatar-main-img"
              />

              {/* Glowing Amber Pinprick Pupils Layer */}
              <div className="eye-tracker-box">
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
