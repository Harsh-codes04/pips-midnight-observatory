import React, { useEffect, useState } from 'react';

const SPARKLE_CHARS = ['✦', '★', '⋆', '•', '✧'];

export default function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // 1. Respect user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (mediaQuery.matches || isTouchDevice) {
      setDisabled(true);
      return;
    }

    const handleMotionChange = (e) => {
      setDisabled(e.matches || isTouchDevice);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      }
    };
  }, []);

  useEffect(() => {
    if (disabled) return;

    let counter = 0;
    let lastTime = 0;

    const handlePointerMove = (e) => {
      const now = performance.now();
      // Throttle: emit at most one sparkle every 45ms to protect frame rate
      if (now - lastTime < 45) return;
      lastTime = now;

      // 40% chance per throttled step for gentle, restrained density
      if (Math.random() > 0.4) return;

      const newSparkle = {
        id: counter++,
        x: e.clientX,
        y: e.clientY,
        char: SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)],
      };

      // Cap at 10 active particles max
      setSparkles((prev) => [...prev.slice(-9), newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 650);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [disabled]);

  if (disabled) return null;

  return (
    <div aria-hidden="true" style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 9999 }}>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle-particle"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}
