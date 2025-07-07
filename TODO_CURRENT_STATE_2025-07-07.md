# TODO Current State - 2025-07-07

## Critical Issues to Fix Immediately

### 1. Font Consistency Issues
**Problem**: Fonts don't look as good as previous versions
**Root Cause**: Conflicting font declarations
- Inline CSS in index.html (line 26) defines: `font-family: 'Inter'` and headings as `'Space Grotesk'`
- External stylesheets use: `'Playfair Display'` for headings (serif font)
- No @font-face declarations found - relying on Google Fonts

**Solution**:
1. Remove font-family declarations from inline critical CSS
2. OR ensure inline CSS matches intended design fonts
3. Verify Google Fonts are loading properly
4. Run `node minify-assets.js` after changes

### 2. Contact Form Layout Issue
**Problem**: Contact form fields appearing in one line instead of stacked
**Analysis**: 
- `.form-group` in styles-enhanced.css has correct `flex-direction: column`
- contact-form-netlify.js injects proper styles with `display: block` for labels
- Likely a CSS specificity or parent container issue

**Solution**:
1. Check if contact form is being properly initialized
2. Verify no parent container is forcing horizontal layout
3. Add more specific CSS selectors if needed
4. Test form rendering in different browsers

## Staging Environment Setup Plan

### Recommended Approach: Separate Netlify Site
1. **Create staging branch**: `git checkout -b staging`
2. **New Netlify site**: studio-arteamo-staging
3. **Custom domain**: test.arteamo.net
4. **Staging indicators**: Banner, disabled analytics, noindex

### Implementation Steps:
1. Create and push staging branch
2. Set up new Netlify site connected to staging branch
3. Configure DNS for test.arteamo.net
4. Add staging-specific configuration
5. Document deployment workflow

## Remaining TODOs from Previous Sessions

### High Priority:
1. Fix font and contact form issues (TODAY)
2. Set up staging environment
3. Video enhancements from TODO_2025-07-03.md:
   - Loading indicators/spinners
   - Fullscreen button
   - Keyboard controls (spacebar play/pause, arrows for seek)
   - Mobile video experience improvements

### Medium Priority:
1. Create custom poster frame from ArteamoAd.mp4
2. Optimize video loading performance
3. Implement video lazy loading with intersection observer
4. Update deployment documentation for staging setup

### Low Priority:
1. Video fallback for non-MP4 browsers
2. Closed captions support
3. CMS integration for video management
4. Video analytics and SEO (structured data)

## Quick Commands Reference

```bash
# Fix issues locally
cd /root/Interiori/websites
python3 serve.py  # Test at localhost:8090

# After fixes
node minify-assets.js
node test-comprehensive.js

# Deploy fixes
git add -A
git commit -m "fix: resolve font consistency and contact form layout issues"
git push origin master

# Create staging
git checkout -b staging
git push -u origin staging
```

## Notes for Next Instance
- User reported fonts looked better in a previous version
- Contact form should have fields stacked vertically, not horizontally
- User wants staging at test.arteamo.net and production at arteamo.net
- All 15 website variations are complete - only website1-minimalist is actively developed