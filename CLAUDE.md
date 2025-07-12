# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRITICAL: Must-Do Actions at Session Start

### 1. Check TODOs and Current State
```bash
# ALWAYS run these commands first
cat /root/Interiori/TODO_CURRENT_STATE_2025-07-07.md
cat /root/Interiori/websites/TODO.md
node /root/Interiori/manage-sessions.js current
```

### 2. Known Critical Issues (as of 2025-07-07)
- **Font Consistency**: Conflicting CSS declarations (inline vs external)
- **Contact Form Layout**: Fields showing horizontally instead of vertically
- **Staging Environment**: Needs setup at test.arteamo.net

## Repository Overview

Studio Arteamo's interior design portfolio - a static website showcasing 11 projects (2017-2024).

### Production Website
- **SINGLE PRODUCTION SITE**: Only website1-minimalist is deployed
- **URL**: https://arteamo.net (hosted on Netlify)
- **Other 14 variations**: Archived/demo only, NOT in production

### Key Characteristics
- **No build process**: Pure HTML/CSS/JavaScript
- **Multi-language**: 6 languages via translations.js
- **Performance-focused**: < 3 second load time requirement

## Architecture

### Data Flow
```
index.html
├── translations.js         # All UI text in 6 languages
├── project-config.js       # Project metadata with translations
├── dynamic-projects.js     # Renders projects from config
├── language-switcher-v2.js # Language management
└── performance-optimizer.js # Lazy loading
```

### Directory Structure
```
/root/Interiori/
├── websites/               # Main development directory
│   ├── website1-minimalist/# THE ONLY PRODUCTION WEBSITE (arteamo.net)
│   ├── website2-15/        # ARCHIVED - not deployed anywhere
│   ├── admin/              # CMS (password: arteamo2024admin)
│   ├── netlify/            # Serverless functions
│   └── test files          # Puppeteer test suite
└── [Project Folders]/      # High-res interior images
```

## Essential Commands

### Development
```bash
cd /root/Interiori/websites

# Start local server
python3 serve.py  # Serves on port 8090

# Run tests before changes
node test-comprehensive.js

# Check specific functionality
node test-contact-form-live.js
node test-images-comprehensive.js
node test-after-deploy.js

# Image optimization
cd /root/Interiori/websites
./optimize-single-project.sh "Project Folder Name"
```

### Deployment Workflow
```bash
# 1. Update version FIRST
node update-deployment-version.js

# 2. Minify assets
node minify-assets.js

# 3. Run tests
node test-comprehensive.js

# 4. Commit and push
git add -A
git commit -m "fix/feat: description"
git push origin master

# 5. Wait 2 minutes, then verify
node test-after-deploy.js
```

### Session Management
```bash
# Start new session
node manage-sessions.js start

# At session end, create summary
echo "Create SESSION_SUMMARY_$(date +%Y-%m-%d).md documenting all changes"
```

## Critical Configuration

### Netlify Settings
- **Auth Token**: Already configured in environment
- **Site ID**: 653fed52-9287-47f1-8e95-d5846b6c7982
- **Domain**: arteamo.net (via Netlify DNS)
- **NEVER commit .netlify/ directory** - causes redirect loops!

### Testing Requirements
- Always disable cache: `await page.setCacheEnabled(false)`
- Test viewports: Desktop (1920x1080), Mobile (375x667)
- Use `window.getComputedStyle()` for style verification
- Performance target: < 3 seconds, Lighthouse > 90

## Key Files and Their Purposes

### Core System Files
- `translations.js` - All text content in 6 languages
- `project-config.js` - Centralized project metadata
- `dynamic-projects.js` - Runtime project rendering
- `performance-optimizer.js` - Lazy loading logic
- `language-switcher-v2.js` - Language persistence

### Configuration Files
- `netlify.toml` - Deployment config (plugins, headers, redirects)
- `_redirects` - URL routing rules
- `package.json` - Dependencies and npm scripts

### Testing Files
- `test-comprehensive.js` - Full test suite
- `test-after-deploy.js` - Post-deployment verification
- `update-deployment-version.js` - Version metadata updater

## Common Patterns

### Image Path Encoding
```javascript
function encodeImagePath(str) {
    return encodeURIComponent(str)
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29');
}
```

### Language Storage (Dual Keys)
```javascript
localStorage.setItem('selectedLanguage', lang);
localStorage.setItem('language', lang);  // Legacy support
```

## Emergency Procedures

### Redirect Loop Fix
```bash
# Check for problematic directory
ls -la /root/Interiori/websites/.netlify/

# If exists, remove it
rm -rf /root/Interiori/websites/.netlify/

# See ACTION_PLAN_FOR_FUTURE_INSTANCE.md for details
```

### Deployment Recovery
```bash
# If deployment fails
git log --oneline -10  # Check recent commits
git checkout <file>    # Revert specific files
python3 serve.py       # Test locally first
```

## Project-Specific Notes

- **11 Interior Projects**: Each in its own folder with Cyrillic/special characters
- **Admin Panel**: /admin/ with password `arteamo2024admin`
- **Email Recipients**: studio@arteamo.net, petyaem@abv.bg
- **Founded**: 2008 by Eng. Petya Petrova
- **Awards**: "Bathroom of the Year" and others

## Current Development Focus

1. Fix font consistency (inline CSS conflicts)
2. Fix contact form layout (vertical stacking)
3. Set up staging environment at test.arteamo.net
4. Video enhancements (loading indicators, fullscreen, keyboard controls)

Remember: This is a production website. Always test thoroughly before deploying.