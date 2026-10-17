import React, { useEffect, useState } from 'react';

const SPARKLE_CHARS = ['✦', '★', '⋆', '•', '✧'];

export default function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let counter = 0;

    const handlePointerMove = (e) => {
      // Throttle density
      if (Math.random() > 0.45) return;

      const newSparkle = {
        id: counter++,
        x: e.clientX,
        y: e.clientY,
        char: SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)],
      };

      setSparkles((prev) => [...prev.slice(-12), newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 700);
    };

    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div aria-hidden="true" style={{ pointerEvents: 'none' }}>
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
