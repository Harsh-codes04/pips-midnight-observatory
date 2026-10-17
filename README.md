# 🌙 Pip's Midnight Observatory
> **Official Hackathon Submission for "Baby's First Website" (17–19 October 2026) by haX.baby**  
> **Track:** Track 1 — Pip, The Skull Baby ("Same Baby, 1,000 Websites")  
> **Vibe:** Midnight Observatory & Celestial Dispatch  
> **Tech Stack:** React 19, Vite, Vanilla CSS, Web Audio API, Lucide Icons, Canvas-Confetti

---

## 🌟 1. About Pip & The Midnight Observatory
**Pip** is the Junior Dream Engineer at Midnight Nursery! A gentle, sleepy skull baby with a smooth round skull, giant cozy eye sockets with glowing warm amber pinpricks, a tiny crooked smile, and a starry nightcap with a pink ribbon bow.

### Character Dossier (Track 1 Canon)
* **Species:** Skull Baby (Dreamweaver Sprite)
* **Appearance:** Smooth round skull, glowing warm amber pupils, midnight nightcap with star accents and pink ribbon. (100% cute, 0% spooky/creepy).
* **Personality:** Sleepy, gentle, quiet, nurturing, deeply attentive.
* **Profession:** Junior Dream Engineer @ Midnight Nursery (Shift: 22:00 – 05:00 IST).
* **Quirks & Fuel:** Sips warm chamomile milk drops, hoards brass star keys, guarantees zero scary monsters in any dream, talks in contagious sleepy yawns.

---

## 🚀 2. Features & Rubric Highlights

### Core Website Sections
1. **Hero Section:** Official transparent high-res cloud render (`pip_avatar_cloud.png`), eye-tracking glowing amber pupils that follow pointer motions (with touch fallback for phones/tablets), and quick call-to-actions.
2. **Character Profile Dossier:** Interactive identity card with ID badge (`PIP-001-DREAM`), species breakdown, engineer quirks tab switcher, and link to view the official haX canon reference sketch (`pip.jpg`).
3. **Three Showcase Inventions:**
   * **Project 01: The Lullaby Lab:** Generative music box running on synthetic celestial waves via the **Web Audio API** with 6 playable pentatonic chime keys (`C5` to `C6`), rotating brass winding key, and automated melody sequencer.
   * **Project 02: Nightlight Collection:** Bedside porcelain crescent moon lantern (`pip_dream_lantern.png`) with real-time glow brightness slider (20% to 100%) and 4 aura swatches (*Moon Amber, Berry Rose, Lavender Mist, Stardust Mint*).
   * **Project 03: Dream Delivery Routes:** Interactive radar canvas with animated SVG flight path, waypoint inspector (*Nursery Hub, Chimney Lane East, Old Village Clocktower, Moonbeam Pier*), and an interactive **Dispatch Flight** button with real-time delivery status updates.
4. **Bedtime Story Scroll:** Three coherent bedtime chapters (*The Secret Hatch Beneath the Crib, Bottling the Warm Amber Glow, The First Rooftop Flight*) each tightly edited to **under 80 words** (far below the 150-word cap) with Pip's studio character portrait (`pip_portrait.png`).
5. **Mobile Responsive Navigation:** Accessible hamburger menu drawer on mobile screens with smooth transitions and keyboard `Esc` closing.

### Bonus Side Quests (+13 Bonus Points)
* **Hit Counter Odometer (+1 pt):** Vintage visitor ticker logging local dream deliveries for this browser session.
* **Live Community Dream Board (+2 pts):** Visitors can sign Pip's dream corkboard with instant local storage persistence and reset option.
* **Sparkle Cursor Trail (+2 pts):** Vintage stardust glitter particles following pointer movements (automatically disabled when `prefers-reduced-motion` is active).
* **Click Sounds + Accessible Mute Switch (+3 pts):** Web Audio chimes with persistent floating mute button and accessible aria labels.
* **Responsive Chaos Mode (+5 pts):** Nostalgic 90s retro shake mode reshuffling the nursery perspective.
* **Secret Easter Eggs:**
  * Clicking Pip's avatar 4 times triggers star confetti + opens Pip's secret diary modal.
  * Clicking the moon theme switcher 3 times also reveals the secret diary!

### Accessibility & Clean Craft
* Full keyboard navigation with visible `:focus-visible` outlines.
* Skip link to main content (`#main-content`).
* Responsive layouts tested for desktop, tablet, and mobile.
* Fully supports `prefers-reduced-motion` media queries.
* Zero build errors, zero runtime console warnings, and zero external audio asset dependencies.

---

## 🛠️ 3. Getting Started Locally

```bash
# 1. Clone your repository (or open workspace)
cd C:\Users\Hp\.gemini\antigravity\scratch\babys-first-website

# 2. Install dependencies (if needed)
npm install

# 3. Start local development server (port 3000)
npm run dev

# 4. Open browser
http://localhost:3000
```

### Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🌐 4. 1-Click Deployment to Vercel or GitHub Pages

### Deploying to Vercel:
1. Push this repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/<your-username>/pips-midnight-observatory.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), select your repo, and click **Deploy**! (Vercel automatically detects Vite and deploys in seconds).

---

## 📜 Attributions & Credits
* **Canon & Artwork:** Official Pip assets courtesy of **haX.baby** (`pip_avatar_cloud.png`, `pip_lullaby_box.png`, `pip_dream_lantern.png`, `pip_portrait.png`, `pip.jpg`).
* **Design Palette:** Official haX warm cream (`#fff8f1`), rich berry (`#a34063`), and warm charcoal (`#382229`).
* **Typography:** Fraunces, Fredoka, and JetBrains Mono (Google Fonts).
* **Icons:** Lucide Icons.
* **Audio Synthesis:** Pure native Web Audio API (zero audio file overhead).
