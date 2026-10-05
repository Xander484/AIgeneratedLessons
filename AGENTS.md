# Lesson Generation Preferences & Guidelines

This document defines the default preferences, structure, design principles, and official curriculum roadmap for generating lessons in this repository.

---

## 🎯 Target Audience & Language
- **Audience**: 10-year-old children (beginner-friendly, encouraging, fun, no dry academic jargon).
- **Language**: **Uzbek (O'zbek tili)** for all explanations, UI labels, mascot speech, and quiz questions.
- **Tone**: Playful, motivational, and easy to understand using vivid real-world analogies (e.g., Lego blocks, magic boxes, superpowers, skeletons/clothes/brains).

---

## 📅 Official Fast-Track Course Roadmap (6 Lessons)
All future lessons MUST strictly follow this official 6-lesson curriculum roadmap:

| Dars | Holati | Mavzu | Qamrab olinadigan tushunchalar va amaliyot |
| :--- | :--- | :--- | :--- |
| **Lesson 1** | ✅ *Tayyor* | **HTML Asosiy Teglar** | `<h1>-<h6>`, `<p>`, `<button>`, `<img>`, `<a>`, `<ul>`, `<li>`, `<strong>`, `<em>` (Vebsaytning asosiy elementlari) |
| **Lesson 2** | ✅ *Tayyor* | **HTML Yakuni: Qutilar & Formalar** | `<div>`, `<span>`, `<input>` (matn kiritish, parol, checkbox, color), `<audio>`, `<video>`, `<form>`. **HTML to'liq yakunlandi!** |
| **Lesson 3** | ⏳ *Navbatda* | **CSS Bo'yoqlari & Box Model** | Ranglar, gradientlar, chiroyli shriftlar, chegaralar va bo'shliqlar (`margin`, `padding`, `border`, `border-radius`) |
| **Lesson 4** | 📋 *Rejada* | **Flexbox Sehrgarligi** | Elementlarni yonma-yon va chiroyli tizish (kartochkalar, navbarlar, moslashuvchan tartib) |
| **Lesson 5** | 📋 *Rejada* | **Harakat & Animatsiyalar** | Sichqoncha borgandagi harakatlar (`:hover`, `transform`, `transition`), CSS keyframe animatsiyalar (sakrash, miltillash, aylanish) |
| **Lesson 6** | 📋 *Rejada* | **Haqiqiy Real Vebsayt (Final)** | Bolalarning shaxsiy portfeli yoki sevimli loyihasi (barcha bilimlarni birlashtirish va internetga chiqarish) |

---

## 🏗️ Lesson Structure & Components
Each lesson must be placed in its own folder (e.g., `lesson1/`, `lesson2/`, etc.) with clean standalone web files:
- `index.html`: Semantic structure, kid-friendly layout.
- `style.css`: Pure Vanilla CSS, modern playful aesthetics (Outfit/Fredoka fonts, glassmorphism, vibrant palettes, micro-animations).
- `script.js`: Interactive logic, state management, and Web Audio API synthesized sounds (no external audio files required).

### Standard Lesson Modules (10-15 Minute Game Loop):
1. **Game HUD & Mascot ("Kodi" Robot)**:
   - Sticky HUD with Level, XP bar (`0-100 XP`), Kodi Coins (🪙), sound toggle, and mission step tracker (4 steps).
2. **Stage 1: Mission Briefing (1-2 min)**:
   - Visual metaphor battle cards (e.g. Plain HTML vs Styled CSS defense).
3. **Stage 2: Rapid Lab & Mini-Quests (3 min)**:
   - 3 rapid micro-tasks with instant "+15 XP" floating notifications and coin sounds.
4. **Stage 3: Character Customizer / Creator Challenge (4 min)**:
   - "Kodi'ni Kiyintir" or creative challenge with dynamic preview and reactions.
5. **Stage 4: Boss Battle Quiz (3 min)**:
   - Turn-based battle with Bug Monster (3 HP ❤️❤️❤️). Correct answers shoot laser beams!
6. **Stage 5: Victory Celebration (1-2 min)**:
   - Unlocked badge, Stars (⭐⭐⭐), XP saved to `localStorage`, and return to Passport Map.

---

## 🎨 Aesthetics & Technical Rules
- **Sound Effects**: Use native browser **Web Audio API** synthesizers (chimes, pops, fanfares, boings) so lessons work completely offline without broken media links.
- **Visuals**: Modern, playful colors (gradients, neo-brutalism borders, rounded corners, soft shadows).
- **Animations**: CSS keyframes for floating mascots, bouncy buttons, pulse effects, and seismic/flex text animations.
- **Confetti**: Lightweight vanilla JS particle confetti on success actions.

---

## ⚡ Workflow & Communication
- **Rapid Prototyping**: Show/confirm structure as quickly as possible so user time and tokens are saved.
- **Browser Automation**: Do not run unnecessary video recordings.
