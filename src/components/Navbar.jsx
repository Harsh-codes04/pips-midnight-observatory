import React, { useState, useEffect } from 'react';
import { Sun, Moon, Volume2, VolumeX, Sparkles, Menu, X, Flashlight } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Navbar({
  theme,
  onToggleTheme,
  onTriggerConfetti,
  onSecretMoonEgg,
  isLanternOn,
  onToggleLantern,
}) {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moonClicks, setMoonClicks] = useState(0);

  useEffect(() => {
    return sound.subscribe((muted) => setIsMuted(muted));
  }, []);

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleSoundToggle = () => {
    sound.toggleMute();
  };

  const handleThemeClick = () => {
    sound.playClick();
    onToggleTheme();

    const nextCount = moonClicks + 1;
    setMoonClicks(nextCount);
    if (nextCount >= 3) {
      setMoonClicks(0);
      if (onSecretMoonEgg) onSecretMoonEgg();
    }
  };

  const closeMobileMenu = () => {
    sound.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar" role="banner">
      <div className="wrap nav-container">
        {/* Brand */}
        <a href="#hero" className="nav-brand" onClick={() => sound.playClick()} aria-label="Pip's Midnight Observatory home">
          <img
            src="/assets/pip_avatar_cloud.png"
            alt="Pip on a cloud"
            className="nav-avatar-mini"
            width="36"
            height="36"
          />
          <div className="nav-title">
            Pip <span className="nav-subtitle">· Dream Engineer</span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav aria-label="Primary Navigation" className="desktop-nav-wrap">
          <ul className="nav-links">
            <li>
              <a href="#hero" className="nav-link" onClick={() => sound.playClick()}>
                About Pip
              </a>
            </li>
            <li>
              <a href="#profile" className="nav-link" onClick={() => sound.playClick()}>
                Character Dossier
              </a>
            </li>
            <li>
              <a href="#projects" className="nav-link" onClick={() => sound.playClick()}>
                Showcase Projects
              </a>
            </li>
            <li>
              <a href="#dreamweaver" className="nav-link" onClick={() => sound.playClick()}>
                Dream Weaver
              </a>
            </li>
            <li>
              <a href="#story" className="nav-link" onClick={() => sound.playClick()}>
                Bedtime Story
              </a>
            </li>
            <li>
              <a href="#sidequests" className="nav-link" onClick={() => sound.playClick()}>
                Guestbook & Toys
              </a>
            </li>
          </ul>
        </nav>

        {/* Actions Bar */}
        <div className="nav-actions">
          {/* Confetti Star Dust */}
          <button
            type="button"
            className="icon-btn"
            title="Sprinkle Star Dust"
            aria-label="Sprinkle star dust confetti"
            onClick={() => {
              sound.playNote(880);
              onTriggerConfetti();
            }}
          >
            <Sparkles size={17} />
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            className="icon-btn"
            title={isMuted ? 'Unmute cozy audio' : 'Mute audio'}
            aria-label={isMuted ? 'Unmute cozy audio' : 'Mute audio'}
            onClick={handleSoundToggle}
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>

          {/* Lantern Beam Cursor Spotlight Toggle (Tier 2 Standout) */}
          <button
            type="button"
            className={`icon-btn ${isLanternOn ? 'active' : ''}`}
            title={isLanternOn ? 'Lantern Beam: Active (Click to dim)' : 'Lantern Beam: Off (Click for cursor lantern spotlight)'}
            aria-label={isLanternOn ? 'Turn off lantern spotlight cursor' : 'Turn on lantern spotlight cursor'}
            onClick={() => {
              sound.playClick();
              if (onToggleLantern) onToggleLantern();
            }}
          >
            <Flashlight size={17} color={isLanternOn ? '#f59e0b' : 'currentColor'} />
          </button>

          {/* Day / Dream Toggle (with 3-click secret easter egg) */}
          <button
            type="button"
            className="icon-btn"
            title={theme === 'dream' ? 'Switch to Daylight' : 'Switch to Midnight Dream (Click 3x for secret)'}
            aria-label="Toggle day and midnight dream mode"
            onClick={handleThemeClick}
          >
            {theme === 'dream' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="icon-btn mobile-menu-btn"
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="mobile-nav-drawer" role="navigation" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            <li>
              <a href="#hero" className="mobile-nav-link" onClick={closeMobileMenu}>
                ✦ About Pip
              </a>
            </li>
            <li>
              <a href="#profile" className="mobile-nav-link" onClick={closeMobileMenu}>
                ✦ Character Dossier
              </a>
            </li>
            <li>
              <a href="#projects" className="mobile-nav-link" onClick={closeMobileMenu}>
                ✦ Showcase Projects
              </a>
            </li>
            <li>
              <a href="#dreamweaver" className="mobile-nav-link" onClick={closeMobileMenu}>
                ✦ Dream Weaver Lab
              </a>
            </li>
            <li>
              <a href="#story" className="mobile-nav-link" onClick={closeMobileMenu}>
                ✦ Bedtime Story
              </a>
            </li>
            <li>
              <a href="#sidequests" className="mobile-nav-link" onClick={closeMobileMenu}>
                ✦ Guestbook & Toys
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
