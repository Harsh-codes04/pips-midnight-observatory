// Web Audio API Synthesizer for Pip's Lullaby Lab & Interactive Sounds
// High-fidelity generative chime synthesis with zero external audio assets

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.listeners = new Set();
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn(this.isMuted));
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.notify();
    if (!this.isMuted) {
      this.playNote(523.25); // Play chime feedback
    }
    return this.isMuted;
  }

  playNote(frequency = 523.25, duration = 1.2) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sine wave with soft harmonic overtone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      // Warm music box envelope
      gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.25, this.ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context might need user gesture
    }
  }

  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Ignore
    }
  }

  // Generative lullaby sequence: "Twinkle / Sleepy Stars"
  playLullabyMelody(onNotePlayed) {
    if (this.isMuted) return;
    this.init();

    // Pentatonic scale notes
    const melody = [
      { freq: 523.25, label: 'C5', delay: 0 },
      { freq: 587.33, label: 'D5', delay: 350 },
      { freq: 659.25, label: 'E5', delay: 700 },
      { freq: 783.99, label: 'G5', delay: 1050 },
      { freq: 880.00, label: 'A5', delay: 1400 },
      { freq: 1046.50, label: 'C6', delay: 1750 },
      { freq: 880.00, label: 'A5', delay: 2200 },
      { freq: 659.25, label: 'E5', delay: 2600 }
    ];

    melody.forEach((step) => {
      setTimeout(() => {
        if (!this.isMuted) {
          this.playNote(step.freq, 1.4);
          if (onNotePlayed) onNotePlayed(step.label);
        }
      }, step.delay);
    });
  }
}

export const sound = new SoundEngine();
