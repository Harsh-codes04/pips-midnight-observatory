# Pip's Midnight Observatory 🌙✨
> **Official Hackathon Submission for "Baby's First Website" (17–19 October 2026) by haX.baby**  
> **Track:** Track 1 — Pip, The Skull Baby ("Same Baby, 1,000 Websites")  
> **Vibe:** Midnight Observatory & Celestial Dispatch  

---

## 🌟 About Pip & The Midnight Observatory
Meet **Pip**, Junior Dream Engineer at Midnight Nursery! Pip is a gentle, sleepy baby with a smooth round skull face, glowing warm amber pinpricks in his eye sockets, and a starry bedtime nightcap tied with a pink bow. (Always cozy, 100% cute, 0% creepy).

When twilight arrives, Pip hops onto his cloud to brew soothing lullabies, polish bedside crescent moon lanterns, and plot silent rooftop delivery routes to tuck the neighborhood into sweet slumber.

---

## 🚀 Features & Rubric Highlights

### 1. What They Are (Hero Identity)
* **Smooth Eye-Tracking:** Glowing amber pupil pinpricks follow your cursor across the sky.
* **Official High-Res Assets:** Pip waving from his celestial cloud (`/assets/pip_avatar_cloud.png`).
* **Tactile Palette:** haX.baby warm cream (`#fff8f1`), berry accents (`#a34063`), and midnight velvet.

### 2. What They Do (3 Interactive Showcase Projects)
1. **The Lullaby Lab:** Interactive music box with 6 playable pentatonic chime keys (`C5` to `C6`) synthesized live using the **Web Audio API** + automated sleepy melody player.
2. **Nightlight Collection:** Porcelain bedside lanterns with dynamic glow intensity sliders and 4 mood aura swatches (Amber Moonlight, Berry Rose, Lavender Mist, Stardust Mint).
3. **Dream Delivery Routes:** Live SVG flight radar tracing rooftop delivery waypoints (*Chimney Lane East, Clocktower, Moonbeam Pier*).

### 3. What Their Story Is (Interactive Bedtime Scenes)
* 3 flipbook scenes recounting Pip's origin from discovering the secret observatory beneath the crib to his first rooftop flight. Under 150 words per scene.

### 4. Early-Web Side Quests (+13 Pts)
* **Vintage Hit Counter Odometer (+1 pt):** Real-time visitor ticker tracking dreams delivered.
* **Live Guestbook Wall (+2 pts):** Visitors can sign Pip's corkboard; saves persistently to `localStorage`.
* **Sparkle Cursor Trail (+2 pts):** Retro stardust glitter following pointer motions.
* **Click Sounds + Accessible Mute Switch (+3 pts):** Web Audio chimes with floating mute toggle.
* **Responsive Chaos Mode (+5 pts):** Playful retro earthquake toggle.
* **Secret Easter Egg:** Clicking Pip's avatar 4 times triggers starlight confetti (`canvas-confetti`) and reveals Pip's secret diary modal.

---

## 🛠️ Getting Started Locally

```bash
# 1. Navigate to the project directory
cd C:\Users\Hp\.gemini\antigravity\scratch\babys-first-website

# 2. Start the local development server
npm run dev

# 3. Open in your browser
# http://localhost:3000
```

To build for production:
```bash
npm run build
npm run preview
```

---

## 📜 Attributions & Credits
* **Art & Canon:** Official Pip assets courtesy of **haX.baby** (`pip_avatar_cloud.png`, `pip_lullaby_box.png`, `pip_dream_lantern.png`, `pip_portrait.png`).
* **Typography:** Fraunces, Fredoka, and JetBrains Mono (Google Fonts).
* **Icons:** Lucide Icons.
* **Sound Engine:** Custom Web Audio API Synthesizer (zero external audio file dependencies).
