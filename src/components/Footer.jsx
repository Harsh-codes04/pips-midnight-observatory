import React from 'react';
import { Heart, Moon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
          <Moon size={16} color="var(--berry-primary)" />
          <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-main)' }}>
            Pip's Midnight Observatory
          </strong>
        </div>

        <p style={{ maxWidth: '580px', margin: '0 auto', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Junior Dream Engineer at Midnight Nursery. Designing gentle lullabies, warm nightlights, and starry rooftop
          delivery routes. Sleep tight, little neighbor.
        </p>

        {/* Early-Web Nostalgic Badges */}
        <div className="early-web-badges" aria-label="Early web nostalgic badges">
          <span className="retro-88x31-badge badge-cream">
            <span className="badge-mini-icon">💤</span> PIP-APPROVED
          </span>
          <span className="retro-88x31-badge badge-berry">
            <span className="badge-mini-icon">⭐</span> NO NIGHTMARES
          </span>
          <span className="retro-88x31-badge badge-gold">
            <span className="badge-mini-icon">🎵</span> LULLABY 1.0
          </span>
          <span className="retro-88x31-badge badge-mint">
            <span className="badge-mini-icon">🌙</span> 800x600 COZY
          </span>
        </div>

        <div style={{ marginTop: '1.2rem', fontSize: '0.8rem', color: 'var(--text-faint)' }}>
          Midnight Nursery · Crafted with <Heart size={12} fill="#a34063" color="#a34063" style={{ display: 'inline', margin: '0 2px' }} /> & peaceful dreams
        </div>
      </div>
    </footer>
  );
}
