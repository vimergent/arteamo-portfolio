# CLAUDE.md — Studio Arteamo Portfolio

Instructions for AI agents working on the arteamo.net website. All paths are relative to the repository root.

## Quick Start

```bash
git clone git@github.com:vimergent/arteamo-portfolio.git
cd arteamo-portfolio

# Remove broken symlink (if present)
rm -f websites/projects

# Start local dev server
cd websites && python3 -m http.server 8090
# Site loads at http://localhost:8090
```

## Project Overview

Interior design portfolio for Studio Arteamo (Varna, Bulgaria). Static HTML/CSS/JS site — no build step, no framework. 11 projects, 6 languages, Cloudinary-hosted images.

- **Live site**: https://arteamo.net
- **Netlify site**: https://studio-arteamo.netlify.app
- **Netlify site ID**: `653fed52-9287-47f1-8e95-d5846b6c7982`
- **Owner**: Eng. Petya Petrova, Studio Arteamo
- **Contact**: studio@arteamo.net, petyaem@abv.bg

## Deployment

Push to `master` triggers Netlify auto-deploy (10-30 seconds, no build step).

```bash
git add <files>
git commit -m "feat/fix: description"
git push origin master
# Netlify deploys automatically — check arteamo.net after ~30s
```

### Branches
- `master` — production (arteamo.net)
- `staging` — staging preview (Netlify deploy preview)

### Pitfalls
- **Never commit `.netlify/` directory** — causes redirect loops. It's in `.gitignore`.
- **Cyrillic folder names** — some project folders use Cyrillic characters. Use proper URL encoding when referencing them in code.
- **Root `netlify.toml`** — the config at repo root is the active one. Any `netlify.toml` inside `websites/` is ignored by Netlify.

## Development

### Local Server

Use Python's built-in server (preferred over `serve.py`):

```bash
cd websites
python3 -m http.server 8090
```

Or use serve.py (works from any directory):

```bash
python3 websites/serve.py
```

### Update Text Content

All UI text lives in `websites/translations.js` (6 languages: BG, EN, RU, ES, HE, ZH).

```bash
# Edit translations
$EDITOR websites/translations.js

# Verify syntax
node -c websites/translations.js
```

### Add or Update a Project

1. Create folder with images under `websites/` (e.g., `websites/New Project Name 2025/`)
2. Add entry to `websites/project-config.js` with metadata
3. Verify syntax: `node -c websites/project-config.js`
4. Commit and push — Netlify deploys automatically

### Key Files

| File | Purpose |
|------|---------|
| `websites/translations.js` | All UI text in 6 languages |
| `websites/project-config.js` | Project metadata (11 projects) |
| `websites/dynamic-projects.js` | Runtime project rendering |
| `websites/language-switcher-v2.js` | Language switching + localStorage |
| `websites/performance-optimizer.js` | Lazy loading and optimization |
| `netlify.toml` | Netlify deploy config + headers |
| `websites/netlify/functions/send-email.js` | Contact form email handler |

### Development Focus

Only `website1-minimalist` is actively maintained. Other variations (2-15) are archived.

## Architecture

```
websites/
├── index.html                  # Entry point
├── translations.js             # 6-language content
├── project-config.js           # Project metadata
├── dynamic-projects.js         # Renders projects from config
├── language-switcher-v2.js     # Language UI
├── performance-optimizer.js    # Lazy loading
├── website1-minimalist/        # Active website variation
├── admin-cms/                  # CMS interface (see below)
├── netlify/functions/          # Serverless functions
└── [project folders]/          # Gallery images
```

## Testing

```bash
cd websites

# Core test suite (run before and after changes)
node test-comprehensive.js

# Specific tests
node test-single.js website1-minimalist
node test-images-comprehensive.js
node test-accessibility.js
node test-performance.js
node test-contact-form-live.js

# NPM shortcuts
npm test                     # test-comprehensive.js
npm run test:all             # test-all-sites.js
npm run test:accessibility   # accessibility tests
npm run test:performance     # performance tests
```

### Post-Deployment Verification

After pushing to master:
1. Wait ~30s for Netlify deploy
2. Check https://arteamo.net loads correctly
3. Verify gallery images render
4. Test contact form submission
5. Run: `node test-after-deploy.js`

## CMS

Netlify CMS available at `/admin-cms/` on the live site. Status: 95% configured — needs Netlify Identity setup to be fully operational.

Legacy admin panel at `websites/admin/` (password: `arteamo2024admin`) — manages project content via localStorage export.

## Multi-Language System

6 languages: Bulgarian (BG), English (EN), Russian (RU), Spanish (ES), Hebrew (HE), Chinese (ZH).

- All text from `translations.js` — never hardcode UI strings
- Language preference persisted in localStorage (`selectedLanguage` + `language` keys)
- Language switcher: `language-switcher-v2.js`

## Contact Form

- Submissions handled by `websites/netlify/functions/send-email.js`
- Sends to: studio@arteamo.net, petyaem@abv.bg
- Routed via `_redirects` file (`/api/*` proxied to functions)

## Code Standards

- Vanilla JavaScript (ES6+), no frameworks
- Mobile-first responsive CSS with custom properties
- URL-encode paths with Cyrillic/special characters
- Target < 3s load time
- Accessibility score > 90 (axe-core)

## Domain

arteamo.net managed via Netlify DNS. No manual DNS config needed — Netlify handles it.

## Version Tracking

Deployment version tracked in `websites/index.html` meta tags:
```html
<meta name="version" content="X.Y.Z">
<meta name="deployment-date" content="YYYY-MM-DD">
```

Update before deploying: `node websites/update-deployment-version.js`
