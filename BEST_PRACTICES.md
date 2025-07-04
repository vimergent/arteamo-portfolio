# Studio Arteamo Development Best Practices

## Code Organization

### File Structure
- Keep all development in `/root/Interiori/websites/`
- Project images in `/root/Interiori/[Project Name]/`
- Documentation at root: `/root/Interiori/`
- Only develop website1-minimalist (others are archived)

### Naming Conventions
- Use URL-safe characters for new files
- Handle existing Cyrillic/special characters with proper encoding
- CSS classes: lowercase with hyphens (e.g., `gallery-item`)
- JavaScript: camelCase for variables, PascalCase for constructors

## Development Workflow

### Starting a Session
```bash
cd /root/Interiori/websites
node manage-sessions.js start
python3 serve.py  # Port 8090
cat TODO.md
node test-comprehensive.js
```

### Making Changes
1. **Read First**: Always use Read tool before editing
2. **Test First**: Run tests before making changes
3. **Small Commits**: Make atomic commits for each feature
4. **Document**: Update SESSION_SUMMARY immediately

### Ending a Session
1. Run all tests: `node test-comprehensive.js`
2. Minify assets: `node minify-assets.js`
3. Create SESSION_SUMMARY_YYYY-MM-DD.md
4. Commit and push changes

## Performance Optimization

### Image Handling
- Maximum width: 2000px for gallery images
- Use proper encoding: `encodeImagePath()` function
- Avoid `loading="lazy"` with special character paths
- Implement lazy loading via Intersection Observer

### Asset Optimization
- Always minify CSS/JS before deployment
- Inline critical CSS in `<head>`
- Use CSS custom properties for theming
- Minimize HTTP requests

### Code Quality
```javascript
// Good: Proper error handling
try {
    const data = JSON.parse(response);
} catch (error) {
    console.error('Failed to parse:', error);
}

// Good: Defensive programming
const lang = localStorage.getItem('selectedLanguage') || 'en';
const text = translations[lang]?.title || translations.en.title;
```

## Multi-Language Support

### Translation System
- All text in `translations.js`
- Support 6 languages: BG, EN, RU, ES, HE, ZH
- Always provide fallback to English
- Update both localStorage keys when switching

### Implementation
```javascript
// Correct language switching
localStorage.setItem('selectedLanguage', lang);
localStorage.setItem('language', lang);  // Legacy support
```

## Testing Strategy

### Core Tests
1. `test-comprehensive.js` - Run before and after changes
2. `test-accessibility.js` - Maintain >90 score
3. `test-performance.js` - Keep load time <3s
4. `test-404-errors.js` - Check for missing resources

### Test-Driven Development
```bash
# Baseline
node test-comprehensive.js > before.log

# Make changes...

# Compare
node test-comprehensive.js > after.log
diff before.log after.log
```

## Common Pitfalls to Avoid

### URL Encoding
```javascript
// WRONG: Doesn't encode parentheses
const url = encodeURIComponent(filename);

// CORRECT: Custom encoding
function encodeImagePath(str) {
    return encodeURIComponent(str)
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29');
}
```

### Gallery Implementation
- Always use centralized `project-config.js`
- Don't hardcode project data
- Maintain consistent image paths
- Test with all 11 projects

### Minification
- Use proper tools (`terser`, `clean-css`)
- Don't use regex replacements
- Test thoroughly after minification
- Keep source maps for debugging

## Deployment Checklist

### Pre-Deployment
- [ ] Run `test-comprehensive.js`
- [ ] Run `test-accessibility.js`
- [ ] Run `test-performance.js`
- [ ] Check for 404 errors
- [ ] Minify all assets
- [ ] Update documentation

### Deployment
- [ ] Commit with descriptive message
- [ ] Push to GitHub master branch
- [ ] Monitor Netlify build logs
- [ ] Test live site immediately

### Post-Deployment
- [ ] Verify all languages work
- [ ] Test contact form
- [ ] Check all project galleries
- [ ] Validate on mobile devices

## Security Considerations

### Admin Panel
- Password: arteamo2024admin
- Uses localStorage for data
- No backend validation
- Export backups regularly

### Content Security
- Sanitize user inputs
- Use proper CSP headers
- Avoid inline scripts
- Keep dependencies minimal

## Debugging Tips

### Console Errors
```javascript
// Add detailed logging
console.log('[Gallery] Loading project:', projectName);
console.log('[Gallery] Images found:', images.length);
```

### Network Issues
- Check DevTools Network tab
- Look for 404s or CORS errors
- Verify image paths are encoded
- Test with slow connection

### Performance Issues
- Use Chrome Lighthouse
- Check for render-blocking resources
- Optimize image sizes
- Minimize DOM manipulations

## Session Management

### Documentation
- Create SESSION_SUMMARY for every session
- Include file paths and line numbers
- Explain the "why" not just "what"
- List any pending issues

### Continuity
```bash
# Check previous work
ls -la SESSION_SUMMARY_*.md
node manage-sessions.js list
cat SESSION_SUMMARY_2025-07-04.md
```

## Emergency Procedures

### Site Down
1. Check Netlify status page
2. Review recent deployments
3. Rollback if needed
4. Test locally

### Major Bug
1. Revert to last working commit
2. Test thoroughly locally
3. Deploy fixes incrementally
4. Document in CHANGELOG.md

### Lost Context
1. Read CLAUDE.md
2. Check recent SESSION_SUMMARY files
3. Review TODO.md
4. Run comprehensive tests

---
Remember: Quality over speed. Test everything. Document always.