# Studio Arteamo Portfolio - Change Log

This file tracks all significant changes made to the codebase. Each entry should include date, files modified, and purpose.

## 2025-01-01

### Security Enhancements
- **Modified**: `/etc/ssh/sshd_config`
  - Disabled password authentication
  - Enabled public key authentication only
  - Set root login to key-only
- **Created**: `/root/setup-ssh-keys.sh` - Helper script for SSH key setup

### Documentation Updates  
- **Modified**: `/root/Interiori/CLAUDE.md`
  - Added documentation rule for session summaries
  - Updated with clearer development commands
  - Added project folder list

### Feature: Random Gallery for website1-minimalist
- **Modified**: `/root/Interiori/websites/website1-minimalist/index.html`
  - Lines 44-49: Added gallery container HTML
  - Lines 304-406: Added JavaScript for random gallery functionality
  - Line 314: Fixed Trakata Residence image paths
- **Modified**: `/root/Interiori/websites/website1-minimalist/styles-enhanced.css`
  - Lines 3-101: Added complete gallery styling
  - Responsive grid layout
  - Hover effects and animations

### CMS Planning
- **Created**: `/root/Interiori/CMS_IMPLEMENTATION_PLAN.md`
  - Complete strategic plan for CMS implementation
  - Database schema design
  - Cost estimates and timeline
- **Created**: `/root/Interiori/CMS_TECHNICAL_SPEC.md`
  - Technical specifications
  - Admin interface mockups
  - Code examples and migration scripts

### Testing
- **Created**: `/root/Interiori/websites/test-random-gallery.js`
- **Created**: `/root/Interiori/websites/test-gallery-images.js`

### Gallery Fixes
- **Fixed**: Missing "Apartament Кв. Чайка, Варна_2017" in gallery-premium.html
  - Added project definition at lines 895-902
- **Fixed**: Missing "Playground Grand Mall Varna 2018" in gallery-premium.html  
  - Added project definition at lines 919-926

### Centralized Project Configuration
- **Created**: `/root/Interiori/websites/project-config.js`
  - Central configuration for all 11 projects
  - Multi-language support for all metadata
  - Complete image lists
- **Modified**: `/root/Interiori/websites/gallery-premium.html`
  - Lines 832: Added script src for project-config.js
  - Lines 838-852: Dynamic projectData generation
  - Lines 853-941: Removed hardcoded data
- **Modified**: `/root/Interiori/websites/website1-minimalist/index.html`
  - Line 297: Added project-config.js script
  - Lines 305-311: Updated random gallery to use central config
- **Created**: `/root/Interiori/websites/test-all-project-galleries.js`
- **Created**: `/root/Interiori/PROJECT_CONFIG_DOCUMENTATION.md`

### Studio Name Correction
- **Modified**: `/root/Interiori/websites/translations.js`
  - Line 29: "About Studio" → "About Studio Arteamo"
  - Lines 464, 1780: "За студиото" → "За Студио Артеамо"
  - Line 899: "О студии" → "О Студио Артеамо"
  - Line 1334: "Sobre el estudio" → "Sobre Studio Arteamo"

### Awards Links Implementation
- **Modified**: `/root/Interiori/websites/translations.js`
  - Added award1_link, award2_link, award3_link fields
  - Set Ideal Standard link: https://www.idealstandard.com
- **Created**: `/root/Interiori/websites/awards-handler.js`
  - Dynamic awards display with link support
- **Modified**: `/root/Interiori/websites/website1-minimalist/index.html`
  - Line 238: Added data-awards="true" attribute
  - Line 300: Added awards-handler.js script
- **Modified**: `/root/Interiori/websites/language-switcher-v2.js`
  - Line 199: Added languageChanged event dispatch

### Development Rules & Documentation
- **Modified**: `/root/Interiori/CLAUDE.md`
  - Added Holistic Analysis Rule
  - Added Version Control Rule
- **Created**: `/root/Interiori/TESTING_CHECKLIST.md`
  - Comprehensive testing guide

### Session Documentation
- **Created**: `/root/Interiori/SESSION_SUMMARY_2025-01-01.md`
- **Created**: `/root/Interiori/CHANGELOG.md` (this file)

## Previous Changes (Before 2025-01-01)

### Website Implementations
- Completed 8 out of 15 planned website variations
- Implemented multi-language support (BG, EN, RU, ES)
- Added gallery functionality across all sites
- Created comprehensive test suite with Puppeteer

### Infrastructure
- Set up Netlify deployment
- Configured Python development server (port 8090)
- Created deployment scripts
- Implemented automated testing

---

Note: For detailed changes before 2025-01-01, refer to git history and previous session summaries.