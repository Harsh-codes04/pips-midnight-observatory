// Web Audio API Synthesizer for Pip's Lullaby Lab & Interactive Sounds
// High-fidelity generative chime synthesis with zero external audio assets

const LULLABY_SEQUENCE = [
  { freq: 523.25, label: 'C5', name: 'Star', delay: 420 },
  { freq: 523.25, label: 'C5', name: 'Star', delay: 420 },
  { freq: 783.99, label: 'G5', name: 'Moon', delay: 420 },
  { freq: 783.99, label: 'G5', name: 'Moon', delay: 420 },
  { freq: 880.00, label: 'A5', name: 'Harp', delay: 420 },
  { freq: 880.00, label: 'A5', name: 'Harp', delay: 420 },
  { freq: 783.99, label: 'G5', name: 'Moon', delay: 780 },
  { freq: 659.25, label: 'E5', name: 'Cloud', delay: 420 },
  { freq: 659.25, label: 'E5', name: 'Cloud', delay: 420 },
  { freq: 587.33, label: 'D5', name: 'Dew', delay: 420 },
  { freq: 587.33, label: 'D5', name: 'Dew', delay: 420 },
  { freq: 523.25, label: 'C5', name: 'Slumber', delay: 900 },
];

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.volume = 0.75; // 0.0 to 1.0
    this.isMuted = false;
    this.listeners = new Set();

    // Lullaby Melody State Machine
    this.lullabyState = 'stopped'; // 'stopped' | 'playing' | 'paused'
    this.currentStep = 0;
    this.activeTimeouts = [];
    this.onNoteCallback = null;
    this.onStateCallback = null;
  }

  async init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime || 0);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch {
        // Handled silently
      }
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn(this.isMuted, this.volume));
  }

  setVolume(vol) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volume = clamped;
    if (this.ctx && this.masterGain && !this.isMuted) {
      const now = this.ctx.currentTime || 0.001;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(clamped, now + 0.05);
    }
    this.notify();
    return this.volume;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime || 0.001;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : this.volume, now + 0.05);
    }
    this.notify();
    if (!this.isMuted) {
      this.playNote(523.25); // Gentle unmuted chime
    }
    return this.isMuted;
  }

  unmute() {
    if (this.isMuted) {
      this.isMuted = false;
      if (this.ctx && this.masterGain) {
        const now = this.ctx.currentTime || 0.001;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 0.05);
      }
      this.notify();
    }
  }

  // Dual-harmonic chime synthesis: Swiss Music Box Bell acoustics
  async playNote(frequency = 523.25, duration = 1.3) {
    if (this.isMuted) return;
    await this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime || 0.001;

      // Primary crystal sine
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(frequency, now);

      gain1.gain.cancelScheduledValues(now);
      gain1.gain.setValueAtTime(0.0001, now);
      gain1.gain.linearRampToValueAtTime(0.28, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(gain1);
      gain1.connect(this.masterGain);
      osc1.start(now);
      osc1.stop(now + duration);

      // Subtle chime overtone (2x octave shimmer at lower gain)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(frequency * 2, now);

      gain2.gain.cancelScheduledValues(now);
      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.linearRampToValueAtTime(0.07, now + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.45));

      osc2.connect(gain2);
      gain2.connect(this.masterGain);
      osc2.start(now);
      osc2.stop(now + duration * 0.5);
    } catch {
      // Audio fallback
    }
  }

  async playClick() {
    if (this.isMuted) return;
    await this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime || 0.001;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.04);

      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Safety fallback
    }
  }

  async playRattle() {
    if (this.isMuted) return;
    await this.init();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime || 0.001;
      [0, 0.035, 0.07].forEach((offset, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1250 + idx * 300, now + offset);
        gain.gain.cancelScheduledValues(now + offset);
        gain.gain.setValueAtTime(0.06, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.03);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now + offset);
        osc.stop(now + offset + 0.035);
      });
    } catch {
      // Ignore
    }
  }

  // =========================================================================
  // Interactive Lullaby Music Box Controller (Play / Pause / Stop)
  // =========================================================================
  clearMelodyTimeouts() {
    this.activeTimeouts.forEach((id) => clearTimeout(id));
    this.activeTimeouts = [];
  }

  async playLullaby(onNote, onStateChange) {
    this.unmute();
    await this.init();

    this.onNoteCallback = onNote;
    this.onStateCallback = onStateChange;

    this.lullabyState = 'playing';
    if (this.onStateCallback) this.onStateCallback('playing');

    this.clearMelodyTimeouts();
    this.scheduleNextNote(this.currentStep);
  }

  scheduleNextNote(stepIdx) {
    if (this.lullabyState !== 'playing') return;

    if (stepIdx >= LULLABY_SEQUENCE.length) {
      // Loop or finish
      this.lullabyState = 'stopped';
      this.currentStep = 0;
      if (this.onNoteCallback) this.onNoteCallback(null);
      if (this.onStateCallback) this.onStateCallback('stopped');
      return;
    }

    const note = LULLABY_SEQUENCE[stepIdx];
    this.currentStep = stepIdx;

    if (!this.isMuted) {
      this.playNote(note.freq, 1.4);
      if (this.onNoteCallback) this.onNoteCallback(note.label);
    }

    const tid = setTimeout(() => {
      if (this.lullabyState === 'playing') {
        this.scheduleNextNote(stepIdx + 1);
      }
    }, note.delay);

    this.activeTimeouts.push(tid);
  }

  pauseLullaby() {
    this.lullabyState = 'paused';
    this.clearMelodyTimeouts();
    if (this.onNoteCallback) this.onNoteCallback(null);
    if (this.onStateCallback) this.onStateCallback('paused');
  }

  stopLullaby() {
    this.lullabyState = 'stopped';
    this.currentStep = 0;
    this.clearMelodyTimeouts();
    if (this.onNoteCallback) this.onNoteCallback(null);
    if (this.onStateCallback) this.onStateCallback('stopped');
  }

  // Backward compatibility alias
  async playLullabyMelody(onNotePlayed, onFinished) {
    await this.playLullaby(onNotePlayed, (state) => {
      if (state === 'stopped' && onFinished) onFinished();
    });
  }
}

export const sound = new SoundEngine();
