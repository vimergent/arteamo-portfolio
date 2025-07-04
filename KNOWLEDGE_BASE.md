# Studio Arteamo Knowledge Base

## Project Overview

### Business Context
- **Company**: Studio Arteamo
- **Founded**: 2008 by Eng. Petya Petrova
- **Location**: Varna, Bulgaria
- **Awards**: "Bathroom of the Year" and others
- **Focus**: Contemporary Bulgarian interior design

### Portfolio Projects (11 Total)
1. Apartament Flavia Garden 2024 - Contemporary Minimalism (120m²)
2. Apartament K55_2021 - Urban Living (95m²)
3. Apartament Кв. Чайка, Варна_2017 - Classic Elegance (125m²)
4. Apartament Симфония - Бриз, Варна_ 2019 - Coastal Elegance (110m²)
5. Apartament Траката, Варна_2021 - Modern Living (105m²)
6. Balev Corporation 2020 - Executive Workspace (450m²)
7. Elite Clinic 2021 - Healthcare Design (250m²)
8. Gichev sped 2019 - Industrial Design (380m²)
9. Oliv vilas sv.Vlas 2019 - Luxury Hospitality (180m²)
10. Playground Grand Mall Varna 2018 - Commercial Space (320m²)
11. Work Del Mar 2022 - Office Design (165m²)

### Technical Stack
- **Frontend**: Pure HTML/CSS/JavaScript (no frameworks)
- **Hosting**: Netlify
- **Domain**: arteamo.net
- **Version Control**: GitHub (vimergent/arteamo-portfolio)
- **CMS**: Custom localStorage-based admin panel
- **Languages**: Bulgarian, English, Russian, Spanish, Hebrew, Chinese

## Architecture Decisions

### Why No Framework?
- Simplicity and maintainability
- Fast load times (<3 seconds)
- No build process required
- Easy deployment
- Full control over optimization

### Configuration-Driven Design
```javascript
// Central configuration files
project-config.js      // All project metadata
translations.js        // All UI text in 6 languages
dynamic-projects.js    // Renders projects from config
```

### Performance Strategy
1. Critical CSS inlined
2. Lazy loading for images
3. Minified assets
4. Optimized caching headers
5. CDN distribution via Netlify

## Key Technical Solutions

### Multi-Language Implementation
```javascript
// Dual localStorage keys for compatibility
localStorage.setItem('selectedLanguage', lang);
localStorage.setItem('language', lang);

// Fallback pattern
const text = translations[lang]?.key || translations.en.key;
```

### Image Path Encoding
```javascript
// Custom encoding for special characters
function encodeImagePath(str) {
    return encodeURIComponent(str)
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29');
}
```

### Gallery System
- Dynamic loading from project-config.js
- Lightbox with keyboard navigation
- Touch gesture support
- Lazy loading via Intersection Observer

## File Structure Reference

```
/root/Interiori/
├── websites/                    # All website code
│   ├── website1-minimalist/     # Main website
│   │   ├── index.html          # Entry point
│   │   ├── styles-enhanced.css # Main styles
│   │   ├── script.js           # Core functionality
│   │   └── admin/              # CMS interface
│   ├── project-config.js       # Project metadata
│   ├── translations.js         # Multi-language content
│   ├── netlify.toml           # Deployment config
│   └── _redirects             # URL routing
├── [Project Folders]/          # Interior design images
├── SESSION_SUMMARY_*.md        # Development history
├── CLAUDE.md                   # Development guidelines
├── TODO.md                     # Current tasks
└── Documentation files         # Various guides
```

## Critical URLs

### Production
- Main site: https://arteamo.net
- Netlify URL: https://studioarteamo.netlify.app
- Admin panel: https://arteamo.net/admin (password: arteamo2024admin)

### Development
- Local server: http://localhost:8090
- GitHub: https://github.com/vimergent/arteamo-portfolio
- Netlify admin: https://app.netlify.com/projects/studioarteamo

## Known Issues & Solutions

### Issue: White squares in gallery
**Cause**: CSS animation keeping opacity at 0
**Solution**: Remove conflicting animations, ensure opacity:1 after load

### Issue: Images not loading
**Cause**: Missing URL encoding for special characters
**Solution**: Use custom encodeImagePath() function

### Issue: Language switcher not working
**Cause**: Only updating one localStorage key
**Solution**: Update both 'selectedLanguage' and 'language'

### Issue: Build failures on Netlify
**Cause**: Plugin errors (e.g., checklinks)
**Solution**: Disable problematic plugins in netlify.toml

### Issue: Redirect loops
**Cause**: Conflicting redirect rules
**Solution**: Comment out circular redirects, use _redirects file

## Testing Requirements

### Performance Targets
- Load time: <3 seconds
- Lighthouse Performance: >90
- Lighthouse Accessibility: >90
- Lighthouse SEO: >90
- No 404 errors
- All images load successfully

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Device Testing
- Desktop: 1920x1080, 1366x768
- Tablet: 768x1024
- Mobile: 375x667, 414x896

## Deployment Process

### Automatic (via GitHub)
1. Push to master branch
2. Netlify auto-deploys
3. Available at arteamo.net in ~2 minutes

### Manual (via CLI)
```bash
export NETLIFY_AUTH_TOKEN="nfp_uHKEAgjJewDztMBe8EZpXVnuM6vJs7xjbcdf"
netlify deploy --prod
```

## Important Contacts

### Client
- Studio Arteamo
- Eng. Petya Petrova
- Email: studio@arteamo.net
- Phone: +359 897 983 127

### Technical
- Netlify Account: Vince Issaev (heavens_ewe_4n@icloud.com)
- GitHub: vimergent
- Domain Registrar: (DNS points to Netlify)

## Future Considerations

### Potential Enhancements
- Progressive Web App features
- Advanced image optimization (WebP, AVIF)
- Enhanced CMS with cloud storage
- Analytics integration
- SEO improvements

### Maintenance Tasks
- Regular dependency updates
- Performance monitoring
- Security audits
- Content updates
- Backup procedures

---
This knowledge base contains all critical information needed to understand and maintain the Studio Arteamo portfolio website.