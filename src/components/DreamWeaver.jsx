import React, { useState } from 'react';
import { Sparkles, Moon, Wand2, Copy, Check, RefreshCw, Heart, BookMarked } from 'lucide-react';
import { sound } from '../utils/audio';

const ESSENCES = [
  { id: 'chamomile', name: 'Chamomile Mist', icon: '🌼', note: 'Calming floral aroma that eases restless thoughts', freq: 523.25 },
  { id: 'starlight', name: 'Spun Starlight', icon: '⭐', note: 'Soft celestial glimmer that banishes all shadows', freq: 659.25 },
  { id: 'cinnamon', name: 'Cinnamon Honey', icon: '🍯', note: 'Warm hearth comfort that warms chilly paws', freq: 783.99 },
  { id: 'lavender', name: 'Lavender Fluff', icon: '🪻', note: 'Gentle herbal lullaby that slows racing heartbeats', freq: 880.00 },
];

const COMPANIONS = [
  { id: 'lamb', name: 'Sleepy Cloud Lamb', icon: '🐑', trait: 'Counts peaceful backward hops from ten' },
  { id: 'owl', name: 'Gentle Star-Owl', icon: '🦉', trait: 'Perches on the windowsill singing quiet coos' },
  { id: 'dormouse', name: 'Velvet Dormouse', icon: '🐭', trait: 'Curled inside an acorn cap dreaming of dew' },
  { id: 'glowworm', name: 'Golden Glowworm', icon: '✨', trait: 'Beacons a warm golden trail toward dreamland' },
];

const SANCTUARIES = [
  { id: 'attic', name: 'Rooftop Attic Spire', icon: '🏛️', env: 'Under cedar rafters where gentle rain taps softly' },
  { id: 'hammock', name: 'Cloud Hammock', icon: '☁️', env: 'Suspended between two silver moons in the calm sky' },
  { id: 'hollow', name: 'Moonberry Hollow', icon: '🍓', env: 'Tucked beneath sweet moss and glowing wild mushrooms' },
  { id: 'lighthouse', name: 'Porcelain Lighthouse', icon: '🏮', env: 'Casting a quiet amber glow over slumbering waves' },
];

export default function DreamWeaver() {
  const [selectedEssence, setSelectedEssence] = useState(ESSENCES[0]);
  const [selectedCompanion, setSelectedCompanion] = useState(COMPANIONS[0]);
  const [selectedSanctuary, setSelectedSanctuary] = useState(SANCTUARIES[0]);

  const [isWeaving, setIsWeaving] = useState(false);
  const [wovenDream, setWovenDream] = useState(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [savedDreams, setSavedDreams] = useState(() => {
    try {
      const saved = localStorage.getItem('pip_woven_dreams');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleWeaveDream = () => {
    sound.unmute();
    setIsWeaving(true);
    setHasCopied(false);

    // Play magical 4-step harmonic chime chord
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      setTimeout(() => {
        sound.playNote(freq, 1.2);
      }, idx * 180);
    });

    setTimeout(() => {
      const dreamTitle = `The ${selectedEssence.name.split(' ')[0]} Slumber of the ${selectedCompanion.name}`;
      const story = `Tonight, in the shelter of the ${selectedSanctuary.name}, the ${selectedCompanion.name} curls up as a breeze of ${selectedEssence.name} drifts through. ${selectedSanctuary.env}. ${selectedCompanion.trait}. Rest tight, little dreamer—all the neighborhood stars are watching over your sleep.`;

      const newDream = {
        id: Date.now(),
        title: dreamTitle,
        essence: selectedEssence,
        companion: selectedCompanion,
        sanctuary: selectedSanctuary,
        story,
        frequency: '432 Hz Solfeggio · Delta Rhythm',
      };

      setWovenDream(newDream);
      setIsWeaving(false);

      // Save to local dreams journal
      const updated = [newDream, ...savedDreams.slice(0, 3)];
      setSavedDreams(updated);
      try {
        localStorage.setItem('pip_woven_dreams', JSON.stringify(updated));
      } catch {
        // LocalStorage fallback
      }
    }, 750);
  };

  const handleCopyRecipe = () => {
    if (!wovenDream) return;
    sound.playClick();
    const textToCopy = `✨ Pip's Bedtime Dream Prescription ✨\nTitle: ${wovenDream.title}\nEssence: ${wovenDream.essence.name}\nCompanion: ${wovenDream.companion.name}\nSanctuary: ${wovenDream.sanctuary.name}\nTale: "${wovenDream.story}"\nEngineered at Pip's Midnight Observatory.`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2200);
      });
    }
  };

  return (
    <section id="dreamweaver" className="section" aria-label="Pip's Dream Weaver Lab">
      <div className="wrap">
        <div className="section-header">
          <div className="kicker">
            <Wand2 size={14} /> Tier 3 · Midnight Engineering Lab
          </div>
          <h2 className="section-title">Pip's Dream Weaver Lab</h2>
          <p className="section-desc">
            What does a Junior Dream Engineer do on shift? Select an essence, a gentle companion, and a midnight sanctuary.
            Pip will weave a bespoke bedtime dream prescription for your night.
          </p>
        </div>

        <div className="dreamweaver-grid">
          {/* Controls Column: Select Ingredients */}
          <div className="dreamweaver-controls-card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={17} color="var(--berry-primary)" />
              1. Choose Dream Ingredients
            </h3>

            {/* Step 1: Essence */}
            <div className="ingredient-group">
              <label className="ingredient-label">
                <span>✦ Dream Essence</span>
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{selectedEssence.name}</span>
              </label>
              <div className="ingredient-options">
                {ESSENCES.map((ess) => (
                  <button
                    key={ess.id}
                    type="button"
                    className={`ingredient-chip ${selectedEssence.id === ess.id ? 'active' : ''}`}
                    onClick={() => {
                      sound.playNote(ess.freq);
                      setSelectedEssence(ess);
                    }}
                    title={ess.note}
                    aria-label={`Select essence ${ess.name}`}
                  >
                    <span>{ess.icon}</span>
                    <span>{ess.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Companion */}
            <div className="ingredient-group">
              <label className="ingredient-label">
                <span>✦ Sleepy Companion</span>
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{selectedCompanion.name}</span>
              </label>
              <div className="ingredient-options">
                {COMPANIONS.map((comp) => (
                  <button
                    key={comp.id}
                    type="button"
                    className={`ingredient-chip ${selectedCompanion.id === comp.id ? 'active' : ''}`}
                    onClick={() => {
                      sound.playClick();
                      setSelectedCompanion(comp);
                    }}
                    title={comp.trait}
                    aria-label={`Select companion ${comp.name}`}
                  >
                    <span>{comp.icon}</span>
                    <span>{comp.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Sanctuary */}
            <div className="ingredient-group">
              <label className="ingredient-label">
                <span>✦ Midnight Sanctuary</span>
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{selectedSanctuary.name}</span>
              </label>
              <div className="ingredient-options">
                {SANCTUARIES.map((sanc) => (
                  <button
                    key={sanc.id}
                    type="button"
                    className={`ingredient-chip ${selectedSanctuary.id === sanc.id ? 'active' : ''}`}
                    onClick={() => {
                      sound.playClick();
                      setSelectedSanctuary(sanc);
                    }}
                    title={sanc.env}
                    aria-label={`Select sanctuary ${sanc.name}`}
                  >
                    <span>{sanc.icon}</span>
                    <span>{sanc.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weave Action Button */}
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1.2rem', padding: '0.85rem' }}
              onClick={handleWeaveDream}
              disabled={isWeaving}
              aria-label="Weave personalized bedtime dream"
            >
              <Wand2 size={16} />
              <span>{isWeaving ? 'Pip is spinning celestial stardust...' : 'Weave Bedtime Dream ✨'}</span>
            </button>
          </div>

          {/* Results Column: The Woven Dream Certificate */}
          <div className="dreamweaver-result-card">
            {wovenDream ? (
              <div className="dream-certificate">
                <div className="dream-cert-badge">
                  <Moon size={14} color="#d97706" />
                  <span>Pip's Bedtime Prescription #{wovenDream.id.toString().slice(-4)}</span>
                </div>

                <h3 className="dream-cert-title">{wovenDream.title}</h3>

                <div className="dream-cert-icons">
                  <span title={wovenDream.essence.name}>{wovenDream.essence.icon}</span>
                  <span className="cert-separator">✦</span>
                  <span title={wovenDream.companion.name}>{wovenDream.companion.icon}</span>
                  <span className="cert-separator">✦</span>
                  <span title={wovenDream.sanctuary.name}>{wovenDream.sanctuary.icon}</span>
                </div>

                <p className="dream-cert-story">{wovenDream.story}</p>

                <div className="dream-cert-footer">
                  <div className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                    Tuned: <strong style={{ color: '#10b981' }}>{wovenDream.frequency}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-pill"
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                      onClick={handleCopyRecipe}
                      aria-label="Copy dream prescription"
                    >
                      {hasCopied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                      <span>{hasCopied ? 'Copied to Clipboard!' : 'Copy Recipe'}</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-pill"
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                      onClick={handleWeaveDream}
                      title="Re-roll dream tale"
                      aria-label="Re-weave dream"
                    >
                      <RefreshCw size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="dream-empty-state">
                <div style={{ fontSize: '3rem', marginBottom: '0.8rem', animation: 'float-slow 3s ease-in-out infinite alternate' }}>
                  🔮✨
                </div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>The Loom is Waiting</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '340px', margin: '0 auto 1.4rem' }}>
                  Pick your favorite bedtime essence, companion, and sanctuary on the left, then tap <strong>Weave Bedtime Dream</strong>.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-pill"
                  onClick={handleWeaveDream}
                  aria-label="Weave first dream with default ingredients"
                >
                  <Sparkles size={14} color="var(--berry-primary)" /> Weave Default Recipe
                </button>
              </div>
            )}

            {/* Recent Woven Dreams History */}
            {savedDreams.length > 0 && (
              <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="font-mono text-xs" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <BookMarked size={12} color="var(--berry-primary)" />
                    Recent Bedtime Prescriptions:
                  </span>
                  <span className="font-mono text-xs" style={{ color: 'var(--text-faint)' }}>Stored locally</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {savedDreams.map((sd) => (
                    <div
                      key={sd.id}
                      onClick={() => setWovenDream(sd)}
                      className="recent-dream-row"
                      role="button"
                      tabIndex={0}
                      title="Click to view this dream prescription"
                    >
                      <span style={{ fontSize: '0.9rem' }}>{sd.companion.icon} {sd.essence.icon}</span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {sd.title}
                      </span>
                      <span className="font-mono text-xs" style={{ color: 'var(--berry-primary)' }}>View ➔</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
