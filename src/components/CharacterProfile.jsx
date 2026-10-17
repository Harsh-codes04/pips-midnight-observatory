import React, { useState } from 'react';
import { User, Sparkles, Heart, Shield, Award, Eye, FileText, Check } from 'lucide-react';
import { sound } from '../utils/audio';

export default function CharacterProfile() {
  const [showSketchModal, setShowSketchModal] = useState(false);
  const [activeQuirk, setActiveQuirk] = useState(0);

  const quirks = [
    { label: 'Bedtime Fuel', desc: 'Sips warm chamomile milk drops and nibbles moonbeam sugar crackers before every shift.' },
    { label: 'Secret Hoard', desc: 'Collects discarded wind-up keys and shiny brass star pins found under nursery floorboards.' },
    { label: 'Dream Signature', desc: 'Every dream Pip crafts has a gentle lavender scent and zero scary monsters guaranteed.' },
    { label: 'Voice & Language', desc: 'Speaks in soft sleepy whispers, gentle coos, and contagious warm yawns.' }
  ];

  return (
    <section id="profile" className="section" style={{ paddingTop: '2rem' }}>
      <div className="wrap">
        <div className="section-header">
          <div className="kicker">
            <User size={14} /> Midnight Nursery Staff Registry
          </div>
          <h2 className="section-title">Pip's Character Profile</h2>
          <p className="section-desc">
            Get to know Midnight Nursery's gentlest engineer — friendly, sleepy, and always ready to tuck you into bed.
          </p>
        </div>

        <div className="profile-grid">
          {/* Identity ID Card */}
          <div className="profile-card">
            <div className="profile-badge-row">
              <span className="profile-id-tag">Midnight Nursery Staff Card</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                ⭐ Night Shift
              </span>
            </div>

            <div className="profile-main-info">
              <div className="profile-avatar-box">
                <img
                  src="/assets/pip_portrait.png"
                  alt="Pip the Skull Baby studio portrait"
                  className="profile-portrait-thumb"
                />
              </div>

              <div className="profile-specs">
                <div className="spec-row">
                  <span className="spec-label">Name</span>
                  <span className="spec-val">Pip</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Species</span>
                  <span className="spec-val">Skull Baby (Dreamweaver Sprite)</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Profession</span>
                  <span className="spec-val">Junior Dream Engineer @ Midnight Nursery</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Shift Hours</span>
                  <span className="spec-val font-mono">22:00 – 05:00 IST</span>
                </div>
              </div>
            </div>

            {/* Trait Tags */}
            <div className="traits-row">
              <span className="trait-chip"><Heart size={13} color="#a34063" /> Sleepy & Gentle</span>
              <span className="trait-chip"><Eye size={13} color="#e88c1f" /> Glowing Amber Pupils</span>
              <span className="trait-chip"><Sparkles size={13} color="#fbbf24" /> Starry Nightcap</span>
              <span className="trait-chip"><Shield size={13} color="#10b981" /> 0% Spooky / 100% Cute</span>
            </div>

            {/* Official Sketch Trigger */}
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button
                type="button"
                className="btn btn-secondary btn-pill"
                onClick={() => {
                  sound.playClick();
                  setShowSketchModal(true);
                }}
                style={{ width: '100%' }}
              >
                <FileText size={15} /> View Original Studio Sketch
              </button>
            </div>
          </div>

          {/* Personality & Quirks Breakdown */}
          <div className="profile-card profile-card-details">
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} color="var(--berry-primary)" />
              Personality & Engineer Quirks
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '1.4rem', lineHeight: '1.6' }}>
              Pip possesses a calm, deeply attentive nature. While other little creatures can be restless at bedtime,
              Pip listens closely to the creaks of old houses, turning bedtime frights into soothing nursery rhymes.
            </p>

            <div className="quirks-nav">
              {quirks.map((q, idx) => (
                <button
                  key={q.label}
                  type="button"
                  className={`quirk-tab-btn ${activeQuirk === idx ? 'active' : ''}`}
                  onClick={() => {
                    sound.playClick();
                    setActiveQuirk(idx);
                  }}
                >
                  {q.label}
                </button>
              ))}
            </div>

            <div className="quirk-content-box">
              <div style={{ fontWeight: 600, color: 'var(--berry-primary)', marginBottom: '0.3rem' }}>
                ✦ {quirks[activeQuirk].label}
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                {quirks[activeQuirk].desc}
              </p>
            </div>

            {/* In-Universe Bedtime Promise */}
            <div className="canon-guarantee">
              <span className="font-mono text-xs" style={{ color: 'var(--berry-primary)', fontWeight: 600 }}>
                ★ Pip's Gentle Dream Promise
              </span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Every dream Pip crafts is warm, comforting, and safe. A skull baby represents sweet smiles, cozy rest, and quiet peaceful slumbers!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Reference Sketch Modal */}
      {showSketchModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowSketchModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sketch-title"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <h3 id="sketch-title" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              Pip's Original Studio Sketch
            </h3>
            <p className="font-mono text-xs" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Midnight Nursery Studio Archive
            </p>

            <div style={{ background: '#fff', padding: '0.5rem', borderRadius: '16px', border: '1.5px solid var(--border-light)' }}>
              <img
                src="/assets/pip.jpg"
                alt="Official reference sketch of Pip the Skull Baby"
                style={{ width: '100%', borderRadius: '12px', display: 'block' }}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1.2rem' }}
              onClick={() => {
                sound.playClick();
                setShowSketchModal(false);
              }}
            >
              Close Archive Sketch
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
