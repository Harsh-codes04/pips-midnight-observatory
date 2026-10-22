# 🌙 Pip's Midnight Observatory
> **"Small baby. Enormous dreams."**  
> **Official Hackathon Submission for "Baby's First Website" (17–19 October 2026) by haX.baby**  
> **Track:** Track 1 — Pip, The Skull Baby ("Same Baby, 1,000 Websites")  
> **Live Demo:** `https://pips-midnight-observatory-chi.vercel.app/` (Local dev server)  
> **Tech Stack:** React 19, Vite 6, Pure Vanilla CSS, Web Audio API, Lucide Icons, Canvas-Confetti

---

### ✨ Live Demo
[🚀 Visit the live Website]
https://pips-midnight-observatory-chi.vercel.app/

---

[Presentation of project🎁✨]
https://pips-midnight-observatory-chi.vercel.app/slides.html

---

[📽️ Video Presentation of Project]
https://drive.google.com/drive/folders/1vuYZ5JJHtXbVMWpo-b9Kpj4QAM0jZ4gv?usp=sharing



---

## 🌟 1. About Pip & The Midnight Observatory
**Pip** is the gentlest Junior Dream Engineer at Midnight Nursery! A sleepy, gentle skull baby with a smooth round skull, giant cozy eye sockets with glowing warm amber pinpricks, a tiny crooked smile, and a bedtime nightcap with stars and a pink bow.

When twilight settles over the chimneys, Pip opens the observatory trapdoor to spin soft Swiss lullabies, tune warm porcelain bedside lanterns, and dispatch silent starlit rooftop deliveries so every little creature can fall asleep safely without bad dreams.

### Character Dossier (Track 1 Canon)
* **Species:** Skull Baby (Dreamweaver Sprite)
* **Appearance:** Smooth round skull, glowing warm amber pupils, midnight starry nightcap with star accents and pink ribbon. (100% cute, 0% spooky/creepy).
* **Personality:** Sleepy, gentle, quiet, nurturing, deeply attentive.
* **Profession:** Junior Dream Engineer @ Midnight Nursery (Shift: 22:00 – 05:00 IST).
* **Quirks & Fuel:** Sips warm chamomile milk drops, hoards brass star keys, guarantees zero scary monsters in any dream, talks in contagious sleepy yawns.

---

## 🏆 2. Hackathon Scoring Rubric & Feature Alignment

Our submission is engineered to maximize every point of the official **4-tier judging rubric**:

```
┌───────────────────────────────────────────────────────────┐
│ Functionality & Polish (35%) │ Early-Web Soul (30%)       │
│ Creativity & Surprises (20%) │ Clean Craft & A11y (15%)   │
└───────────────────────────────────────────────────────────┘
```

### I. Functionality & Polish (35%)
1. **Interactive Lullaby Music Box (Tier 2):**
   * Handcrafted synthesizer using native **Web Audio API** (dual-oscillator bell acoustics).
   * Complete transport controls: **Play**, **Pause**, and **Stop**.
   * **Master Volume Slider** (0% to 100%) and instant mute toggle.
   * **Rotating Music Disc Effect:** Animated vinyl disc with concentric grooves and star spindle that spins during playback, freezes on pause, and resets on stop.
   * **6 Clickable Chime Keys:** Interactive pentatonic keyboard (`C5`, `D5`, `E5`, `G5`, `A5`, `C6`).
   * Clean scheduled audio lifecycle (zero leaks or orphaned timeouts).
2. **Interactive Nightlight Workshop (Tier 2):**
   * Official studio artwork render (`pip_dream_lantern.png`) with porcelain diffusion glow.
   * Real-time glow brightness slider (20% to 100%).
   * 4 bedside color auras: *Moon Amber*, *Berry Rose*, *Lavender Mist*, and *Stardust Mint*.
   * **Dedicated Reset Control:** Restores default Moon Amber at 70% glow.
3. **Dream Delivery Routes (Tier 2):**
   * Responsive SVG flight map across 4 canonical stops:
     1. *Midnight Nursery Hub* (Launchpad)
     2. *Moonberry Cottage* (Thatched roof & berry lullabies)
     3. *Cloud Castle* (Parapets in the stratosphere)
     4. *Sleepy Star Village* (Quiet cobblestone hamlet)
   * **Animated Dream Parcel:** A glowing starlit delivery package with pulsing aura traveling along the route.
   * Interactive destination selection with live cargo and schedule inspector.
   * **Dispatch Flight Button:** Animates a test flight expedition with real-time waypoint reporting.
4. **Bedtime Storybook (Tier 2):**
   * Three canonical origin scenes each under 85 words (well below the 150-word cap).
   * Visible page indicator (`Page 1 of 3`, `Page 2 of 3`, `Page 3 of 3`).
   * Page flip transition animations.
   * **Restart Storybook Control** on the final scene.
   * **Keyboard Accessibility:** Arrow left (`←`) and arrow right (`→`) page navigation.

### II. Early-Web Soul (30%)
1. **Authentic 88×31 Pixel Badges:** Retro community buttons in footer (`PIP-APPROVED`, `NO NIGHTMARES`, `LULLABY 1.0`, `800x600 COZY`).
2. **Playful Chaos Mode:** 90s retro shake earthquake mode with clear toggle back to peaceful nursery.
3. **Vintage Hit Counter Odometer:** Rolling mechanical visitor ticker with explicit disclaimer: *Simulated browser demo odometer*.
4. **Bedtime Stamp Passport:** Early-web sticker album where visitors collect 4 cozy stamps (*Sleepy Pip, Dream Lantern, Rooftop Star, Moon Rattle*) to earn the golden *Certified Master Dreamer* seal.

### III. Creativity & Surprises (20%)
1. **Tier 3 Character Reactions:**
   * Gentle 3D perspective card tilt as pointer explores Pip's hero stage.
   * Bounded glowing amber pupil tracking (max ±4.5px).
   * **Pip Cozy Comfort Meter:** Interactive petting/tuck-in meter advancing from 20% to 100% (😴 Deep Slumber with delta waves).
   * **Returning Visitor Memory:** Custom welcome-back greeting recognition badge (*"Welcome back, friend! Visit #X"*) stored locally.
   * **Interactive Sleepy Whispers:** Clicking or tapping Pip triggers a joyful hop animation and floating speech bubble cycling through cozy bedtime whispers.
2. **Pip's Dream Weaver Lab (Tier 3 Standout):**
   * Hands-on bedside recipe generator: choose dream essences, companions, and sanctuaries.
   * Synthesizes 4-step harmonic chords, formats official Bedtime Prescriptions tuned to 432 Hz Solfeggio, supports one-click clipboard copying, and saves recent dreams locally.
3. **Built-in Bedtime Voice Narrator (Tier 3 Standout):**
   * Native offline Web Speech API read-aloud narrator with gentle sleepy pacing and synchronized text illumination.
4. **Tier 2 Standout Lantern Beam:** Cursor-following amber spotlight mode toggled via the flashlight button in the navbar.
5. **Double Easter Eggs:**
   * Clicking Pip 4 times triggers star confetti + Pip's secret bedtime diary modal.
   * Clicking the theme toggle moon 3 times also reveals the secret easter egg.
6. **Playable Star Rattle Toy:** Wind-carved wooden rattle with moonstone beads, click/keyboard shake, wobble animation, and synthesized shaker chimes.

### IV. Clean Craft & Accessibility (15%)
* **Zero Console Errors:** Clean runtime with robust Web Audio resume checks.
* **Full Keyboard Nav:** Visible `:focus-visible` outlines on all interactive elements and arrow-key page turning.
* **Reduced Motion Support:** All animations immediately deactivate when `prefers-reduced-motion: reduce` is detected.
* **Touch Device Optimization:** Sparkle trail automatically simplifies on touchscreens to ensure smooth scrolling.
* **Palette Fidelity:** Warm cream (`#fff8f1`), rich berry (`#a34063`), and warm brown (`#5c4033`).
* **Zero External Audio Assets:** 100% native Web Audio synthesis—no broken MP3 requests.

---

## 🕊️ 3. Sandbox Etiquette Compliance Checklist

| Sandbox Principle | Official Requirement | Project Implementation |
| :--- | :--- | :--- |
| **Friendly Sandbox** | Welcoming to all skill levels, zero gatekeeping. | Clean React 19 + pure Vanilla CSS architecture; beginner-friendly, readable components. |
| **Solo or Squad** | Up to 3 builders in team workspace. | Fully portable git repository with zero proprietary environment locks. |
| **Fresh Sprint Commits** | Built during sprint with public commit history (Oct 17–19). | Granular, milestone-based git commit log across all tiers. |
| **Fits in Tiny Hands** | Whimsical early-web style that renders smoothly on phones & tablets. | Touch-friendly targets (min 44px), mobile drawer menu, and verified fluid breakpoints (900px, 640px). |
| **Paced Building** | Focus on one delightfully creative idea rather than boiling the ocean. | Cohesive vision: "Pip's Midnight Observatory — Junior Dream Engineer at Midnight Nursery". |
| **Gentle on the Ears** | Nostalgic audio (+3 bonus points!) with accessible, easy-to-spot mute control. | Web Audio synthesizer with fixed floating sound button, navbar mute toggle, and volume slider. |

---

## 🛠️ 4. Installation & Local Development

### Prerequisites
* Node.js (v18 or higher recommended)
* npm (v9 or higher)

### Setup & Run
```bash
# 1. Navigate to the project root
babys-first-website

# 2. Install dependencies
npm install

# 3. Start local development server (runs on port 3000)
npm run dev

# 4. Open in browser
http://localhost:3000
```

### Production Build & Verification
```bash
# Verify clean build (compiles to dist/)
npm run build

# Run automated hackathon verification suite
node test-app.js
```

---

## 📁 5. Project Structure
```
babys-first-website/
├── public/
│   └── assets/                     # Official watermark-free studio renders
│       ├── pip_avatar_cloud.png    # Hero character artwork
│       ├── pip_lullaby_box.png     # Music box 3D render
│       ├── pip_dream_lantern.png   # Bedside lantern render
│       ├── pip_portrait.png        # Character studio portrait
│       └── pip.jpg                 # Original haX reference sketch
├── src/
│   ├── components/
│   │   ├── CharacterProfile.jsx    # Canonical dossier & staff card
│   │   ├── DreamWeaver.jsx         # Tier 3 dream prescription generator
│   │   ├── EasterEggModal.jsx      # Secret Pip diary & starburst
│   │   ├── Footer.jsx              # Early-web 88x31 badges & copyright
│   │   ├── Hero.jsx                # 3D tilt, pupil tracking, cozy meter, visitor memory
│   │   ├── LanternBeam.jsx         # Tier 2 flashlight cursor spotlight
│   │   ├── Navbar.jsx              # Navigation drawer, theme & audio controls
│   │   ├── Showcase.jsx            # 4 interactive inventions (Music Box, Lantern, Radar, Rattle)
│   │   ├── SideQuests.jsx          # Odometer, Chaos mode, Wish Wall, Stamp Passport
│   │   ├── SparkleTrail.jsx        # Lightweight stardust cursor particles
│   │   └── StoryScroll.jsx         # 3-scene illustrated storybook + Web Speech narrator
│   ├── styles/
│   │   └── index.css               # Comprehensive responsive design & animations
│   ├── utils/
│   │   └── audio.js                # Web Audio API engine (chimes, lullaby, rattle, volume)
│   ├── App.jsx                     # Root application container & state orchestration
│   └── main.jsx                    # React 19 entry point
├── index.html                      # Semantic HTML5 entry with preconnected Google Fonts
├── test-app.js                     # Automated verification test script
├── package.json                    # Project dependencies and scripts
└── vite.config.js                  # Vite bundler configuration
```

---

## 📜 6. Asset Attributions & Canon Credits
* **Character & Artwork:** Official Pip assets courtesy of **haX.baby** (`pip_avatar_cloud.png`, `pip_lullaby_box.png`, `pip_dream_lantern.png`, `pip_portrait.png`, `pip.jpg`).
* **Visual Direction:** Warm cream (`#fff8f1`), rich berry (`#a34063`), and midnight plum (`#1e1329`).
* **Typography:** Fraunces (editorial serif), Fredoka (cozy bubble accent), JetBrains Mono (monospace data).
* **Audio & Speech:** 100% native Web Audio API and Web Speech API synthesis.
