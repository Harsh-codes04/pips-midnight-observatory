import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronLeft, ChevronRight, RotateCcw, Volume2, VolumeX, Mic } from 'lucide-react';
import { sound } from '../utils/audio';

const STORY_SCENES = [
  {
    chapter: 'Scene 01',
    pageNumber: 1,
    title: 'The Secret Hatch Beneath the Crib',
    text: `Before Pip wore the starry nightcap, he was just the quietest baby in Midnight Nursery. While the others tossed and turned, Pip discovered a tiny brass trapdoor under the nursery floorboards. Inside was an ancient observatory filled with dormant music boxes, dusty copper telescopes, and jars waiting for starlight. That night, Pip realized he was meant to engineer sweet dreams for everyone else.`,
    quote: `"Good things start small, even under dusty floorboards."`,
  },
  {
    chapter: 'Scene 02',
    pageNumber: 2,
    title: 'Bottling the Warm Amber Glow',
    text: `Pip's round skull face never frightened the children because behind his wide eye sockets glowed two gentle amber pinpricks—warm as hearth embers. He learned that combining pentatonic bell tones with soft porcelain lanterns dissolved bad dreams before they could even whisper. He spent twilight shifts mixing lavender mist with sleepy lullaby chords, bottling them into glowing bedside orbs.`,
    quote: `"A kind light can chase away the longest shadow."`,
  },
  {
    chapter: 'Scene 03',
    pageNumber: 3,
    title: 'The First Rooftop Flight',
    text: `When Pip graduated to Junior Dream Engineer, the nursery elders gifted him his signature starry nightcap tied with a pink bow. With a gentle puff of night cloud beneath him, Pip took to the midnight sky. Silently hopping from chimney to chimney, he slips gentle dreams through attic windows. By dawn, his cloud drifts back home, ready for a warm cup of chamomile milk.`,
    quote: `"Sleep tight, little neighbor. The stars are on duty."`,
  },
];

export default function StoryScroll() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);

  const scene = STORY_SCENES[currentScene];

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setHasSpeechSupport(true);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopNarration = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsNarrating(false);
  };

  const handleToggleNarrate = () => {
    if (!hasSpeechSupport) return;
    sound.playClick();

    if (isNarrating) {
      stopNarration();
    } else {
      stopNarration();
      const utterance = new SpeechSynthesisUtterance(scene.text);
      utterance.rate = 0.82; // Gentle, sleepy pace
      utterance.pitch = 1.12; // Warm, youthful bedtime tone

      // Pick an English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Samantha'))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferred) utterance.voice = preferred;

      utterance.onend = () => setIsNarrating(false);
      utterance.onerror = () => setIsNarrating(false);

      window.speechSynthesis.speak(utterance);
      setIsNarrating(true);
    }
  };

  const changeScene = (nextIndex) => {
    sound.playClick();
    stopNarration();
    setIsFlipping(true);
    setCurrentScene(nextIndex);
    setTimeout(() => setIsFlipping(false), 300);
  };

  const handlePrev = () => {
    const nextIdx = currentScene > 0 ? currentScene - 1 : STORY_SCENES.length - 1;
    changeScene(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = currentScene < STORY_SCENES.length - 1 ? currentScene + 1 : 0;
    changeScene(nextIdx);
  };

  const handleRestart = () => {
    sound.playNote(523.25);
    changeScene(0);
  };

  // Keyboard navigation for accessible story reading (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene]);

  return (
    <section id="story" className="section" aria-label="Pip's Bedtime Storybook">
      <div className="wrap">
        <div className="section-header">
          <div className="kicker">
            <BookOpen size={14} /> Origin Chronicles · Tier 3 Voice Enabled
          </div>
          <h2 className="section-title">Pip's Bedtime Story</h2>
          <p className="section-desc">
            How a sleepy skull baby became the chief dreamer of Midnight Nursery.
            Flip through the illustrated pages or listen with the built-in voice narrator!
          </p>
        </div>

        <div className="story-book-frame">
          {/* Portrait Column */}
          <div className="story-portrait-wrap">
            <img
              src="/assets/pip_portrait.png"
              alt="Official studio portrait of Pip the Skull Baby holding a dream lantern"
              className="story-portrait-img"
            />
            <div style={{ marginTop: '0.8rem', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Pip holding the prototype crescent moon nightlight
            </div>
          </div>

          {/* Story Text Column */}
          <div className={`story-page-content ${isFlipping ? 'page-turning' : ''}`}>
            {/* Story Navigation Dots */}
            <div className="story-nav-dots" role="tablist" aria-label="Story chapters">
              {STORY_SCENES.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  className={`story-dot ${currentScene === index ? 'active' : ''}`}
                  onClick={() => changeScene(index)}
                  aria-selected={currentScene === index}
                  aria-label={`Jump to page ${index + 1}`}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="project-tag">{scene.chapter}</span>
                <span className="font-mono text-xs" style={{ color: 'var(--berry-primary)', fontWeight: 600 }}>
                  Page {scene.pageNumber} of {STORY_SCENES.length}
                </span>
              </div>

              {/* Web Speech API Voice Narrator (Tier 3 Feature) */}
              {hasSpeechSupport && (
                <button
                  type="button"
                  className={`btn btn-pill ${isNarrating ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.75rem', padding: '0.28rem 0.65rem' }}
                  onClick={handleToggleNarrate}
                  aria-label={isNarrating ? 'Pause voice narration' : 'Listen to story read aloud'}
                  title="Native browser voice narration"
                >
                  {isNarrating ? <VolumeX size={13} /> : <Volume2 size={13} color="var(--berry-primary)" />}
                  <span>{isNarrating ? 'Stop Reading' : 'Listen Aloud 🎙️'}</span>
                </button>
              )}
            </div>

            <h3 style={{ fontSize: '1.8rem', margin: '0.4rem 0 1rem' }}>{scene.title}</h3>

            <p className={`story-text-content ${isNarrating ? 'story-text-narrating' : ''}`}>
              {scene.text}
            </p>

            <blockquote
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--berry-primary)',
                borderLeft: '3px solid var(--berry-primary)',
                paddingLeft: '1rem',
                margin: '1.2rem 0 1.8rem',
              }}
            >
              {scene.quote}
            </blockquote>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-pill"
                  onClick={handlePrev}
                  aria-label="Previous story page"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-pill"
                  onClick={handleNext}
                  aria-label="Next story page"
                >
                  Next Page <ChevronRight size={16} />
                </button>
              </div>

              {/* Restart Button on Final Page */}
              {currentScene === STORY_SCENES.length - 1 ? (
                <button
                  type="button"
                  className="btn btn-secondary btn-pill"
                  onClick={handleRestart}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  aria-label="Restart bedtime story from beginning"
                >
                  <RotateCcw size={13} /> Restart Story
                </button>
              ) : (
                <span className="font-mono text-xs" style={{ color: 'var(--text-faint)' }}>
                  Use ← → keys to flip
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
