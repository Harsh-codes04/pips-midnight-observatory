import React, { useEffect, useState } from 'react';

export default function LanternBeam({ isActive }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
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
    if (!isActive || reducedMotion) return;

    const handlePointerMove = (e) => {
      document.documentElement.style.setProperty('--beam-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--beam-y', `${e.clientY}px`);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [isActive, reducedMotion]);

  if (!isActive || reducedMotion) return null;

  return <div className="lantern-beam-spotlight" aria-hidden="true" />;
}
