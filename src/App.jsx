import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from './utils/audio';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CharacterProfile from './components/CharacterProfile';
import Showcase from './components/Showcase';
import DreamWeaver from './components/DreamWeaver';
import StoryScroll from './components/StoryScroll';
import SideQuests from './components/SideQuests';
import Footer from './components/Footer';
import EasterEggModal from './components/EasterEggModal';
import SparkleTrail from './components/SparkleTrail';
import LanternBeam from './components/LanternBeam';

export default function App() {
  const [theme, setTheme] = useState('day');
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [pipClickCount, setPipClickCount] = useState(0);
  const [isChaosMode, setIsChaosMode] = useState(false);
  const [isLanternOn, setIsLanternOn] = useState(true);

  // Sync mute state
  useEffect(() => {
    return sound.subscribe((muted) => setIsMuted(muted));
  }, []);

  // Theme effect
  const toggleTheme = () => {
    const nextTheme = theme === 'day' ? 'dream' : 'day';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    sound.playNote(nextTheme === 'dream' ? 440 : 880);
  };

  // Safe Confetti trigger with try/catch
  const triggerConfetti = () => {
    try {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 55,
          spread: 70,
          origin: { y: 0.15 },
          colors: ['#a34063', '#fbbf24', '#f4dce3', '#fff8f1', '#10b981'],
        });
      }
    } catch {
      // Fallback handled by CSS starbursts in EasterEggModal
    }
  };

  // Easter egg clicking Pip
  const handlePipClick = () => {
    sound.playNote(1046.5);
    const nextCount = pipClickCount + 1;
    setPipClickCount(nextCount);

    if (nextCount >= 4) {
      setPipClickCount(0);
      setIsEasterEggOpen(true);
      triggerConfetti();
    }
  };

  const handleSecretMoonEgg = () => {
    sound.playNote(1046.5);
    setIsEasterEggOpen(true);
    triggerConfetti();
  };

  const toggleChaosMode = () => {
    setIsChaosMode((prev) => !prev);
  };

  return (
    <div
      className={`app-container ${isChaosMode ? 'chaos-active' : ''}`}
    >
      {/* Background starlight / atmosphere */}
      <div className="sky-backdrop" />

      {/* Sparkle cursor trail (respects reduced motion) */}
      <SparkleTrail />

      {/* Tier 2 Standout: Interactive Lantern Beam Spotlight */}
      <LanternBeam isActive={isLanternOn} />

      {/* Navigation bar with mobile menu and theme controls */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onTriggerConfetti={triggerConfetti}
        onSecretMoonEgg={handleSecretMoonEgg}
        isLanternOn={isLanternOn}
        onToggleLantern={() => setIsLanternOn((prev) => !prev)}
      />

      <main id="main-content">
        {/* 1. Hero Section */}
        <Hero onPipClick={handlePipClick} />

        {/* 2. Character Profile & Registry ID */}
        <CharacterProfile />

        {/* 3. Three Showcase Projects: Lullaby Lab, Nightlight, Radar Routes */}
        <Showcase />

        {/* 4. Tier 3 Feature: Pip's Dream Weaver Lab */}
        <DreamWeaver />

        {/* 5. Three Story Scenes with Web Speech Narration */}
        <StoryScroll />

        {/* 5. Early-Web Side Quests: Odometer, Guestbook Wall, Chaos Mode */}
        <SideQuests
          onChaosModeToggle={toggleChaosMode}
          isChaosMode={isChaosMode}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Accessible Floating Sound Control (Required by haX guidelines) */}
      <button
        type="button"
        className="sound-fixed-btn"
        onClick={() => sound.toggleMute()}
        aria-label={isMuted ? 'Unmute lullaby music and audio' : 'Mute sound effects'}
      >
        {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} color="var(--berry-primary)" />}
        <span>{isMuted ? 'Sound Muted' : 'Lullaby Sound ON'}</span>
      </button>

      {/* Secret Easter Egg Modal */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />
    </div>
  );
}
