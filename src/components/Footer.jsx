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

        <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-faint)' }}>
          Midnight Nursery · Crafted with <Heart size={12} fill="#a34063" color="#a34063" style={{ display: 'inline', margin: '0 2px' }} /> & peaceful dreams
        </div>
      </div>
    </footer>
  );
}
