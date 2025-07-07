# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT: Permanent Rules

### 0. TODO List Rule - CHECK TODOS IMMEDIATELY
**ALWAYS check the TODO list at the start of EVERY session**:
- Use TodoRead tool immediately after reading CLAUDE.md
- Current high-priority tasks include:
  - Fix font consistency issues (inline CSS conflicts)
  - Fix contact form layout (fields showing horizontally)
  - Set up staging environment at test.arteamo.net
  - Video enhancement features (loading indicators, fullscreen, keyboard controls)
- Check `/root/Interiori/websites/TODO.md` for file-based todos
- Check `/root/Interiori/TODO_2025-07-03.md` for video enhancement tasks
- Check `/root/Interiori/TODO_CURRENT_STATE_2025-07-07.md` for latest critical issues
- Use TodoWrite to track progress throughout session

### 1. Deployment Capabilities Rule - CLAUDE CODE CAN DEPLOY
**ALWAYS remember Claude Code has full deployment capabilities**:
- Can commit and push to GitHub (auto-triggers Netlify deploy)
- Has Netlify CLI with authentication token (stored in environment)
- Has headless Chrome and Puppeteer for testing
- Should deploy proactively after making changes
- See `/root/Interiori/DEPLOYMENT_CAPABILITIES.md` for details
- **CRITICAL**: Never commit .netlify/ directory - it causes redirect loops!
- **CRITICAL**: Check `/root/Interiori/ACTION_PLAN_FOR_FUTURE_INSTANCE.md` if redirect loops occur
- Always run `ls -la /root/Interiori/websites/.netlify/` and remove if found
- Can use Netlify CLI: `netlify status`, `netlify deploy --prod`, `netlify logs:function`
- **IMPORTANT**: The Netlify auth token is already configured - no need to re-authenticate

### 2. Documentation Rule - CRITICAL FOR CONTINUITY
**ALWAYS create a session summary file** at the end of each work session:
- Filename format: `SESSION_SUMMARY_YYYY-MM-DD.md`
- Document ALL changes made during the session
- Include file paths and line numbers for modifications
- Explain the purpose and impact of each change
- List any new files created
- Note any pending tasks or issues
- This ensures future instances can understand and continue the work even if context is lost

**ALWAYS check for existing session summaries** at the start of each session:
- Read the most recent SESSION_SUMMARY file first
- Review previous sessions to understand project history
- Use `ls -la /root/Interiori/SESSION_SUMMARY_*.md` to list all sessions
- Continue work based on documented state, not assumptions

**USE the session management system** to maintain chronological order:
- Check sequence: `cat /root/Interiori/SESSION_SEQUENCE.json`
- List sessions in order: `node /root/Interiori/manage-sessions.js list`
- View current session: `node /root/Interiori/manage-sessions.js current`
- Start new session: `node /root/Interiori/manage-sessions.js start`
- This ensures correct order even if server date/time is incorrect

### 3. Holistic Analysis Rule
**ALWAYS analyze changes in the context of the whole project**:
- Before making any change, search for all files that might be affected
- Check for dependencies and interconnected components
- Test changes across all website variations, not just one
- Consider multi-language implications for any text changes
- Verify that new features don't break existing functionality
- Run comprehensive tests after significant modifications

### 4. Version Control Rule
**ALWAYS use GitHub for version control**:
- Commit changes frequently with descriptive messages
- Use the format: `git commit -m "feat/fix/docs: description of change"`
- Create commits for each logical unit of work
- Before major changes, ensure current version is committed
- If something breaks, you can easily restore: `git checkout <commit-hash>`
- Push to GitHub regularly to maintain remote backup
- Document commit strategy in git messages

### 5. Claude Settings and Permissions Rule
**Claude Code has full permissions configured**:
- Settings file: `/.claude/settings.local.json` contains all allowed operations
- All authentication tokens (GitHub, Netlify) are pre-configured in environment
- No manual authentication needed - just use the tools
- Full access to: file operations, git commands, Netlify CLI, testing tools
- Can create, edit, delete files; commit and push to GitHub; deploy to Netlify
- Can use Netlify CLI with authentication token
- Can run all test scripts and deployment commands
- WebFetch allowed for specific domains (studio-arteamo.netlify.app, arteamo.net)
- Full npm and node script execution permissions
- See full permissions list in `/.claude/settings.local.json`

## Repository Overview

Studio Arteamo's interior design portfolio - a static multi-site showcase featuring 11 interior design projects (2017-2024) with 15 different website design variations.

## High-Level Architecture

### Core Design Principles
- **Static-First**: Pure HTML/CSS/JavaScript without build tools or frameworks
- **Configuration-Driven**: Content separated from presentation via JavaScript objects
- **Performance-Focused**: < 3 second load time with lazy loading and minification
- **Multi-Language Native**: 6 languages (BG, EN, RU, ES, HE, ZH) built into the core

### Data Flow Architecture
```
index.html (entry point)
    ├── translations.js (global language content)
    ├── project-config.js (project metadata)
    ├── dynamic-projects.js (renders projects from config)
    ├── language-switcher-v2.js (manages UI language)
    └── performance-optimizer.js (lazy loading & optimization)
```

### Key Systems Integration
1. **Content Management**: Browser-based CMS exports to static JS files
2. **Language System**: All UI text referenced from central translations object
3. **Project System**: Dynamic rendering from configuration, no HTML duplication
4. **Performance**: Critical CSS inlined, assets minified, images lazy-loaded

## Architecture

- **Main Directory**: `/root/Interiori/` - Project images and archive
- **Development Directory**: `/root/Interiori/websites/` - All website implementations
- **Technology**: Pure HTML/CSS/JavaScript (no build process)
- **Testing**: Puppeteer-based comprehensive test suite with axe-core accessibility
- **Deployment**: Netlify static hosting (https://studio-arteamo.netlify.app)
- **No Framework Dependencies**: Direct HTML/CSS/JS - no React, Vue, or build tools

## Development Commands

```bash
# Install dependencies (only Puppeteer and minification tools)
cd /root/Interiori/websites
npm install

# Run local development server
python3 serve.py  # Port 8090

# Core testing commands
node test-comprehensive.js     # Full test suite (run this first)
node test-single.js website1-minimalist  # Test specific website
node test-all-sites.js        # Test all 15 variations
node test-images-comprehensive.js  # Image loading tests

# Specialized tests
node test-accessibility.js     # Axe-core accessibility compliance
node test-performance.js       # Performance metrics validation
node test-mobile-performance.js # Mobile-specific optimizations
node test-404-errors.js        # Detect missing resources
node test-console-errors.js    # JavaScript error detection
node test-production-ready.js  # Production readiness check

# Gallery and project tests
node test-all-galleries.js     # Test gallery functionality
node test-11-projects.js       # Test all 11 projects
node test-gallery-images.js    # Test gallery image loading
node test-language-switcher.js # Language switching tests
node test-translations.js      # Translation system tests

# Build and optimization
node minify-assets.js          # Update minified CSS/JS files
./optimize-images.sh           # Image optimization script

# Validation tools
node validate-translations.js  # Validate translation files
node fix-image-paths.js       # Fix image path issues
node fix-translations.js      # Fix translation issues

# Deploy
./deploy.sh                   # Package for deployment
./deploy-website1.sh          # Deploy only website1-minimalist
./deploy-final.sh             # Final deployment script
./push-to-github.sh          # Push to GitHub
./git-commit-website11.sh     # Commit for website11

# Session management
node manage-sessions.js list    # List all sessions
node manage-sessions.js current # View current session
node manage-sessions.js start   # Start new session

# TODO management (File-based persistent system)
node todo-manager.js view      # View current TODOs
node todo-manager.js add "Task" high|medium|low  # Add TODO
node todo-manager.js complete <number>  # Complete TODO
node todo-manager.js archive   # Archive completed TODOs
# Note: Always check /root/Interiori/websites/TODO.md for current tasks
# Also check /root/Interiori/TODO_2025-07-03.md for video enhancement priorities
# Also check /root/Interiori/websites/TODO_2025-07-03.md for video enhancement tasks

# Email testing
node test-contact-form.js     # Test contact form email functionality

# NPM script shortcuts
npm test                      # Runs test-comprehensive.js
npm run test:all             # Runs test-all-sites.js
npm run test:accessibility   # Runs test-accessibility.js
npm run test:performance     # Runs test-performance.js
npm run minify               # Runs minify-assets.js
npm run serve                # Runs python3 serve.py

# Utility scripts
node generate-pdf.js          # Generate PDF documentation
node performance-audit.js     # Performance analysis tool
./verify-gallery-implementation.sh  # Verify gallery setup
```

## Website Structure

Each website variation follows this pattern:
```
website[number]-[theme]/
├── index.html           # Main page
├── style.css           # Styling
├── script.js           # Interactions
└── [project folders]/  # Gallery images
```

### Development Focus
**IMPORTANT: Only website1-minimalist will continue to be developed and maintained. All other website variations (2-15) are archived and will not receive updates.**

### Key Components

**Multi-language System:**
- `translations.js` - Centralized content in 6 languages: BG (Bulgarian), EN (English), RU (Russian), ES (Spanish), HE (Hebrew), ZH (Chinese)
- `language-switcher-v2.js` - Language switching functionality
- All text content pulled from translations object
- Language preference stored in localStorage

**Project Configuration:**
- `project-config.js` - Centralized project metadata for all 11 projects
- `dynamic-projects.js` - Runtime project loading from configuration
- Gallery templates with lazy loading via Intersection Observer
- Responsive navigation patterns

**CMS System (website1-minimalist only):**
- Admin interface at `/admin/` (password: arteamo2024admin)
- Manages project content across all languages
- Generates static JavaScript configuration
- Export/import functionality for backups
- Core files: `admin/admin.js`, `cms-core.js`, `dynamic-projects.js`
- Changes are saved to localStorage and exported as JavaScript files

**Performance Optimizations:**
- `performance-optimizer.js` - Lazy loading and optimization logic
- `critical.min.css` - Inlined critical CSS for faster rendering
- Minified assets via `minify-assets.js`
- Image optimization guidelines (max 2000px width)

## Testing Approach

The codebase includes extensive Puppeteer tests. When adding features:
1. Run `node test-comprehensive.js` to verify existing functionality
2. Test specific websites with `node test-single.js website[number]-[theme]`
3. Check image loading with `node test-images-comprehensive.js`
4. Verify language switching with navigation tests
5. Run accessibility tests included in the test suite

### Running Single Tests
To test a specific feature or page section:
```bash
# Test a single project gallery
node -e "require('./test-gallery-images.js')('Apartament Flavia Garden 2024')"

# Test specific language
node -e "require('./test-language-switcher.js')('bg')"

# Test single page performance
node -e "require('./test-performance.js')('website1-minimalist')"
```

### Test-Driven Development Workflow
```bash
# Before making changes
node test-comprehensive.js > test-baseline.log

# After making changes
node test-comprehensive.js > test-after.log
diff test-baseline.log test-after.log  # Check for regressions
```

## Project Folders

11 interior design projects with high-resolution images:
- Apartament Flavia Garden 2024
- Apartament K55_2021
- Apartament Кв. Чайка, Варна_2017
- Apartament Симфония - Бриз, Варна_ 2019
- Apartament Траката, Варна_2021
- Balev Corporation 2020
- Elite Clinic 2021
- Gichev sped 2019
- Oliv vilas sv.Vlas 2019
- Playground Grand Mall Varna 2018
- Work Del Mar 2022

## Important Notes

- Studio founded in 2008 by Eng. Petya Petrova
- Awards include "Bathroom of the Year" and others
- Focus on contemporary Bulgarian interior design
- All development should maintain multi-language support
- Performance optimization is critical (minified assets, lazy loading)
- Accessibility compliance is required (tested with axe-core)
- Recent focus: Video integration with ArteamoAd.mp4 promotional content
- All 15 website variations are complete (as of 2025-06-28)
- Only website1-minimalist continues active development

## Deployment

### Netlify Configuration
- Live site: https://studio-arteamo.netlify.app
- Primary domain: arteamo.net (DNS configured via Netlify nameservers)
- Configuration: `netlify.toml` with optimized caching headers
- Email functionality: `netlify/functions/send-email.js`
- URL redirects: `_redirects` file for clean URLs
- See `/root/Interiori/DOMAIN_CONFIGURATION.md` for domain details

### Performance Guidelines
- Always run `node minify-assets.js` before deployment
- Critical CSS inlined in `website1-minimalist/critical.min.css`
- Target < 3 second load time
- Optimize images to max 2000px width before adding
- Use proper URL encoding for special characters in filenames

## Quick Reference

### Common Development Tasks
```bash
# Start fresh development session
cd /root/Interiori/websites
node manage-sessions.js start
python3 serve.py

# Before making changes
node test-comprehensive.js
cat TODO.md

# After making changes
node minify-assets.js
node test-comprehensive.js
node test-accessibility.js

# Check for issues
node test-404-errors.js
node test-images-comprehensive.js

# End of session
# Create SESSION_SUMMARY_YYYY-MM-DD.md with all changes
./push-to-github.sh

# Utility scripts
node generate-pdf.js          # Generate PDF documentation
./verify-gallery-implementation.sh  # Verify gallery setup
```

### Key Documentation
- `/root/Interiori/TESTING_CHECKLIST.md` - Comprehensive testing procedures
- `/root/Interiori/SESSION_MANAGEMENT_BEST_PRACTICES.md` - Session continuity guide
- `/root/Interiori/websites/TODO.md` - Current task list
- `/root/Interiori/websites/TODO_2025-07-03.md` - Video enhancement priorities
- `/root/Interiori/CMS_TECHNICAL_SPEC.md` - CMS implementation details
- `/root/Interiori/WEBSITE_SPECIFICATIONS.md` - Specifications for all 15 website variations
- `/root/Interiori/ACTION_PLAN_FOR_FUTURE_INSTANCE.md` - Critical redirect loop troubleshooting
- `/root/Interiori/DEPLOYMENT_CAPABILITIES.md` - Full deployment abilities reference

## Code Quality Standards

### File Naming Conventions
- Use URL-safe characters in filenames (no spaces or special characters)
- Project folders may contain Cyrillic characters and spaces (historical)
- Use proper URL encoding when referencing files with special characters

### JavaScript Patterns
- Prefer vanilla JavaScript over libraries
- Use ES6+ features (const/let, arrow functions, template literals)
- Implement proper error handling with try-catch blocks
- Use addEventListener instead of inline event handlers

### CSS Guidelines
- Mobile-first responsive design
- Use CSS custom properties for theming
- Avoid !important unless absolutely necessary
- Keep specificity low for maintainability

### Testing Requirements
- All new features must pass `test-comprehensive.js`
- Accessibility score must remain above 90
- Performance metrics: < 3s load time, > 90 performance score
- Test on both desktop and mobile viewports

## Common Patterns and Solutions

### Image Path Encoding
```javascript
// Always use this function for image paths with special characters
function encodeImagePath(str) {
    return encodeURIComponent(str)
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29');
}
```

### Language Switching (Dual Key Support)
```javascript
// Maintain backward compatibility
localStorage.setItem('selectedLanguage', lang);
localStorage.setItem('language', lang);  // Legacy support
```

### Error Handling Pattern
```javascript
try {
    // Operation
} catch (error) {
    console.error(`Error in [Component]: ${error.message}`);
    // Graceful fallback
}
```

## Critical Files and Their Purpose

### Configuration Files
- `.claude/settings.local.json` - Claude permissions and allowed operations
- `netlify.toml` - Netlify deployment configuration with edge functions
- `_redirects` - URL routing and geo-based language detection
- `_headers` - HTTP headers for security and caching

### Core System Files
- `translations.js` - All UI text in 6 languages (BG, EN, RU, ES, HE, ZH)
- `project-config.js` - Centralized metadata for all 11 projects
- `dynamic-projects.js` - Runtime project rendering engine
- `performance-optimizer.js` - Lazy loading and optimization logic
- `language-switcher-v2.js` - Language switching with localStorage persistence

### Testing Infrastructure
- `test-comprehensive.js` - Primary test suite to run before/after changes
- `test-production-ready.js` - Final checks before deployment
- `performance-audit.js` - Detailed performance analysis

## GitHub and Deployment

### Repository Information
- GitHub repo: `vimergent/arteamo-portfolio`
- Primary branch: `master`
- Netlify site: https://studio-arteamo.netlify.app
- Primary domain: arteamo.net (configured via Netlify DNS)
- Netlify site ID: `653fed52-9287-47f1-8e95-d5846b6c7982`

### Deployment Process
1. Run all tests: `node test-comprehensive.js`
2. Minify assets: `node minify-assets.js`
3. Commit changes: `git commit -m "feat/fix: description"`
4. Push to GitHub: `git push origin master`
5. Netlify auto-deploys from master branch

## Hidden Features and Admin Access

### CMS Admin Panel
- URL: `/admin/` on website1-minimalist
- Password: `arteamo2024admin`
- Manages all project content across languages
- Exports to static JavaScript files
- Data stored in localStorage

### Netlify Functions
- Contact form handling via `netlify/functions/send-email.js`
- Sends emails to: studio@arteamo.net, petyaem@abv.bg
- Form submissions proxied through `/api/*` redirects
- Note: Edge functions temporarily disabled due to redirect loop issues

## Emergency Procedures

### If Tests Fail
1. Check recent changes: `git diff`
2. Review error messages carefully
3. Run specific test: `node test-single.js website1-minimalist`
4. Revert if needed: `git checkout <file>`

### If Site is Down
1. Check Netlify dashboard for build errors
2. Review recent commits: `git log --oneline -10`
3. Deploy previous version if needed
4. Test locally first: `python3 serve.py`

### Lost Context Recovery
1. Read this CLAUDE.md file
2. Check recent sessions: `ls -la SESSION_SUMMARY_*.md`
3. Review TODO list: `cat /root/Interiori/websites/TODO.md`
4. Run tests to understand current state

### Critical Files to Never Commit
- `.netlify/` directory (causes redirect loops and deployment failures)
- `node_modules/` and `package-lock.json` (auto-generated)
- Test output files matching `test-*.html` pattern

## Critical Emergency: Redirect Loop Fix

**If experiencing redirect loops on deployment:**
1. Immediately check: `ls -la /root/Interiori/websites/.netlify/`
2. If `.netlify/` directory exists: `rm -rf /root/Interiori/websites/.netlify/`
3. Verify removal: `ls -la /root/Interiori/websites/.netlify/` (should show error)
4. Ensure it's in .gitignore: `grep "\.netlify" /root/Interiori/websites/.gitignore`
5. Commit the removal: `git add -A && git commit -m "fix: remove .netlify directory"`
6. Push to fix deployment: `git push origin master`
7. See `/root/Interiori/ACTION_PLAN_FOR_FUTURE_INSTANCE.md` for detailed troubleshooting