# Website Specifications - Studio Arteamo Portfolio

## Overview
This document contains detailed specifications for all 15 planned websites.
Created to persist requirements across sessions and prevent specification loss.

## Completed Websites (1-8)
1. ✅ **website1-minimalist** - Modern Minimalist with clean typography
2. ✅ **website2-dark-luxury** - Dark theme with gold accents and video backgrounds
3. ✅ **website3-magazine** - Editorial magazine-style layout
4. ✅ **website4-interactive-grid** - Dynamic masonry grid with filters
5. ✅ **website5-fancy** - Ultra fancy with 3D WebGL effects
6. ✅ **website6-coastal** - Black Sea coastal theme with teal accents
7. ✅ **website7-noir** - Dark elegance with GSAP animations
8. ✅ **website8-biophilic** - Eco-conscious with CO₂ meter

## Incomplete Websites (9-15)
Specifications to be gathered from user:

### Website 9 - Makeover
**Status**: ❌ Not Started
**Description**: React SPA focused on before-and-after transformation journeys
**Key Features**: 
- Landing with scrolling narrative using framer-motion (strip-out → final look with opacity tweens)
- Each project has timeline slider with phase thumbnails, budget, materials list
- Sticky CTA "Start your makeover" on right edge, pulsating every 15s
- Social-proof bar with running count of m² designed in 2024-25
**Color Scheme**: Neutral greys with salmon accent (#FF8C78)
**Tech Stack**: React, React Router, LazyImage, dynamic imports for heavy assets
**Special Requirements**: Focus on transformation narrative, before/after storytelling

### Website 10 - Magazine (Variant 2)
**Status**: ❌ Not Started
**Description**: Headless WordPress (REST API) + Next.js front-end, Architectural Digest style
**Key Features**: 
- Grid layout: 4-column desktop, 1-column mobile
- Top navigation: Home / Projects / Trends / Shop-Our-Look / BG-EN Language switch
- Article template with hero image, drop-cap, pull-quote, sticky in-page TOC
- Infinite scroll archive with prepared ad slots (Google AdSense sizes)
- Shop page with affiliate products, WooCommerce integration (cart hidden until EN locale)
**Tech Stack**: WordPress REST API, Next.js, WooCommerce
**Schema**: Article + Breadcrumb + Product structured data
**Special Requirements**: Professional magazine layout, monetization ready, e-commerce integration

### Website 11 - Japandi
**Status**: ❌ Not Started
**Description**: Ultra-minimal Astro site with < 10 KB JS, Japanese-Scandinavian aesthetic
**Key Features**: 
- Generous 16-24px gutters, text max-width 60ch
- Hero with single hi-res still + subtle Ken-Burns zoom (CSS @keyframes, respects prefers-reduced-motion)
- Portfolio: only 3 'stories', each with own page featuring long scroll photos + short captions
- Contact page: centered form, no labels, floating placeholders, CSS-only validation
**Color Scheme**: Snow #FAFAFA, ink #222, muted-sage accent #9AA49A
**Tech Stack**: Astro (minimal JS)
**Typography**: Noto Serif JP (headings), Noto Sans (body)
**Special Requirements**: Performance-focused, < 10 KB JavaScript budget

### Website 12 - Bulgarian Traditional
**Status**: ❌ Not Started
**Description**: Vibrant Nuxt 3 site with Bulgarian folk motifs and whimsical UI inspired by Beata Heuman
**Key Features**: 
- Header: SVG line-art of Varna's Sea Garden rotunda that changes color on scroll
- Animated cursor-trail with small floral glyphs (desktop only)
- Portfolio grid with patterned borders using CSS clip-path
- Hidden Easter egg: keyboard shortcut 'V'+'A'+'R' loads retro gallery of pre-communist Bulgarian interiors
- Multilingual: bg-BG default, en-GB alternative using nuxt-i18n
**Color Scheme**: Terracotta #C26A50, sunflower #F4B500, peacock #006D77, midnight #0D1B2A
**Tech Stack**: Nuxt 3, nuxt-i18n
**Special Requirements**: Bulgarian cultural elements, whimsical interactions, Easter egg feature

### Website 13 - Retro
**Status**: ❌ Not Started
**Description**: 80s Memphis Design meets Miami Vice - bold, playful, unapologetically maximalist
**Key Features**: 
- Animated geometric patterns that follow mouse movement (squiggles, triangles, dots)
- VHS-style glitch transitions between projects
- Neon glow effects on hover, with authentic CRT monitor scan lines overlay
- Retro loading screen with fake "Commodore 64" boot sequence
- Background synth music (mutable) that changes per project section
- "Rewind" navigation - scroll backwards through time from 2024 to 2017
**Color Scheme**: Hot pink #FF1493, electric blue #00FFFF, lime #00FF00, purple #FF00FF on black
**Tech Stack**: Three.js for 3D retro graphics, Web Audio API for synth sounds
**Special Requirements**: Full nostalgic experience, intentionally "too much"

### Website 14 - Zen
**Status**: ❌ Not Started
**Description**: Living, breathing website that responds to user's calmness - biometric-inspired interactions
**Key Features**: 
- Opening meditation: 3-second breathing circle animation before content loads
- Projects reveal through "ink wash" effect - images materialize like watercolor on rice paper
- Ambient mode: after 30s of inactivity, site enters screensaver with floating project images
- Sound design: Tibetan singing bowl on page transitions, rain sounds on hover
- "Mindful scrolling" - artificially slowed scroll speed to enforce calm browsing
- Each project has a "design philosophy" haiku that types out character by character
- Hidden zen garden: click and drag to create sand patterns between sections
**Color Scheme**: Warm white #FAF7F0, charcoal #2C2C2C, sage #87A96B, sand #D4C5B9
**Tech Stack**: GSAP for smooth animations, Howler.js for spatial audio
**Special Requirements**: Anti-stress design, enforced slow consumption of content

### Website 15 - ASCII Art
**Status**: ❌ Not Started
**Description**: Provocative anti-portfolio - "What if we couldn't show you any images?" Terminal-based brutalism
**Key Features**: 
- EVERYTHING is ASCII art - logo, navigation, even "photos" converted to text characters
- Terminal interface: users type commands to navigate (HELP, VIEW PROJECT, NEXT, etc.)
- ASCII animations: furniture pieces "build" themselves character by character
- Project budgets shown as ASCII bar charts that grow in real-time
- "Corruption" effect: random characters glitch and fall like Matrix rain
- Secret: type "SHOW ME REAL PHOTOS" to reveal hidden image gallery
- ASCII floor plans that users can "walk through" with arrow keys
- Typewriter sound effects for every character displayed
**Color Scheme**: Pure monochrome - black #000000, green #00FF00 (terminal style), amber #FFBF00 option
**Tech Stack**: Vanilla JS, custom ASCII conversion engine, p5.js for animations
**Special Requirements**: Deliberately challenging UX, questions the need for visual perfection in design

---
Last Updated: 2025-06-27
Note: This file ensures specifications persist across Claude sessions