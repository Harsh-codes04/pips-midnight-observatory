// Web Audio API Synthesizer for Pip's Lullaby Lab & Interactive Sounds
// High-fidelity generative chime synthesis with zero external audio assets

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.listeners = new Set();
  }

  async init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (err) {
        // Handled silently
      }
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
      this.playNote(523.25); // Play pleasant feedback chime
    }
    return this.isMuted;
  }

  unmute() {
    if (this.isMuted) {
      this.isMuted = false;
      this.notify();
    }
  }

  async playNote(frequency = 523.25, duration = 1.2) {
    if (this.isMuted) return;
    await this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime || 0.001;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sine wave with warm celestial tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, now);

      // Safe linear attack + smooth exponential release
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Audio context safety fallback
    }
  }

  async playClick() {
    if (this.isMuted) return;
    await this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime || 0.001;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.05);

      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {
      // Safety fallback
    }
  }

  async playRattle() {
    if (this.isMuted) return;
    await this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime || 0.001;
      [0, 0.04, 0.08].forEach((offset, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1300 + idx * 350, now + offset);
        gain.gain.cancelScheduledValues(now + offset);
        gain.gain.setValueAtTime(0.07, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.035);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.04);
      });
    } catch (e) {}
  }

  // Generative lullaby sequence: "Twinkle Sleepy Stars"
  async playLullabyMelody(onNotePlayed, onFinished) {
    // Automatically unmute so the user actually hears the melody
    this.unmute();
    await this.init();

    // Pentatonic scale notes
    const melody = [
      { freq: 523.25, label: 'C5', delay: 0 },
      { freq: 587.33, label: 'D5', delay: 380 },
      { freq: 659.25, label: 'E5', delay: 760 },
      { freq: 783.99, label: 'G5', delay: 1140 },
      { freq: 880.00, label: 'A5', delay: 1520 },
      { freq: 1046.50, label: 'C6', delay: 1900 },
      { freq: 880.00, label: 'A5', delay: 2350 },
      { freq: 659.25, label: 'E5', delay: 2800 },
    ];

    melody.forEach((step) => {
      setTimeout(() => {
        if (!this.isMuted) {
          this.playNote(step.freq, 1.4);
          if (onNotePlayed) onNotePlayed(step.label);
        }
      }, step.delay);
    });

    if (onFinished) {
      setTimeout(() => {
        onFinished();
      }, 3400);
    }
  }
}

export const sound = new SoundEngine();
