import confetti from 'canvas-confetti';

export const triggerConfetti = (intensity = 'normal') => {
  const configs = {
    normal: {
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#7dd3fc', '#14b8a6', '#10b981', '#f59e0b'],
    },
    high: {
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#2563eb', '#7dd3fc', '#14b8a6', '#22d3ee', '#f59e0b', '#fbbf24'],
      startVelocity: 45,
      gravity: 0.8,
    },
    legendary: () => {
      const end = Date.now() + 3000;
      const colors = ['#2563eb', '#7dd3fc', '#14b8a6', '#10b981'];
      const frame = () => {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
      return;
    },
  };

  if (intensity === 'legendary') {
    configs.legendary();
  } else {
    confetti(configs[intensity] || configs.normal);
  }
};

export const calcXPEarned = (wpm, accuracy) => {
  const base = Math.floor(wpm * 2);
  const accBonus = accuracy >= 100 ? 100 : accuracy >= 95 ? 50 : accuracy >= 90 ? 25 : 0;
  const speedBonus = wpm >= 100 ? 100 : wpm >= 60 ? 50 : wpm >= 40 ? 20 : 0;
  return base + accBonus + speedBonus;
};

export const formatTime = (seconds) => {
  if (seconds >= 60) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  return `${seconds}s`;
};

export const getWPMLabel = (wpm) => {
  if (wpm >= 100) return { label: 'Elite', color: '#fbbf24' };
  if (wpm >= 80) return { label: 'Advanced', color: '#7dd3fc' };
  if (wpm >= 60) return { label: 'Expert', color: '#14b8a6' };
  if (wpm >= 40) return { label: 'Skilled', color: '#10b981' };
  if (wpm >= 25) return { label: 'Learning', color: '#f59e0b' };
  return { label: 'Beginner', color: '#6b7280' };
};

// Simple sound synthesis using Web Audio API
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playKey(correct = true) {
    if (!this.enabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(correct ? 800 : 300, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      return;
    }
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.init();
      const notes = [523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        const t = this.ctx.currentTime + i * 0.1;
        gain.gain.setValueAtTime(0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.start(t);
        osc.stop(t + 0.3);
      });
    } catch {
      return;
    }
  }
}

export const soundEngine = new SoundEngine();
