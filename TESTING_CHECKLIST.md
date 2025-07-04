# Testing Checklist for Studio Arteamo Portfolio

This checklist should be followed when making changes to ensure nothing breaks across the project.

## Before Making Changes

- [ ] Identify all files that might be affected
- [ ] Check which website variations use the component
- [ ] Note current functionality that must be preserved
- [ ] Create a git commit of working state

## After Making Changes

### 1. Core Functionality Tests

- [ ] **Navigation**: Test menu on all 15 website variations
- [ ] **Language Switching**: Verify all 4 languages (BG, EN, RU, ES) work
- [ ] **Project Display**: Check all 11 projects appear correctly
- [ ] **Gallery Loading**: Verify images load without 404 errors
- [ ] **Responsive Design**: Test mobile, tablet, and desktop views

### 2. Feature-Specific Tests

#### Gallery System
- [ ] All projects load in gallery-premium.html
- [ ] Image counts are correct
- [ ] Lightbox functionality works
- [ ] Navigation between images works
- [ ] Back button returns to correct website

#### Random Gallery (website1-minimalist)
- [ ] 12 random images display
- [ ] Auto-refresh every 10 seconds works
- [ ] Click opens correct project gallery
- [ ] No duplicate images in single view

#### Translations
- [ ] All text switches properly between languages
- [ ] Special characters display correctly
- [ ] No hardcoded text remains in English
- [ ] About section shows "Studio Arteamo" in all languages

#### Awards
- [ ] Awards display in all languages
- [ ] Ideal Standard link works
- [ ] Links open in new tab
- [ ] Non-linked awards display as plain text

### 3. Cross-Browser Testing

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Edge

### 4. Performance Tests

- [ ] Page load time < 3 seconds
- [ ] No console errors
- [ ] Images lazy load properly
- [ ] No memory leaks from animations

### 5. Automated Tests

Run these test scripts:
```bash
# Comprehensive functionality test
node test-comprehensive.js

# Test all project galleries
node test-all-project-galleries.js

# Test specific features
node test-random-gallery.js
node test-about-title.js
```

## Git Workflow

1. **Before changes**: 
   ```bash
   git status
   git add -A
   git commit -m "checkpoint: Before [feature] changes"
   ```

2. **After successful tests**:
   ```bash
   git add -A
   git commit -m "feat/fix: [Description of change]"
   git push origin main
   ```

3. **If something breaks**:
   ```bash
   git log --oneline  # Find last working commit
   git checkout [commit-hash]  # Restore working version
   ```

## Red Flags - Stop if you see:

- 404 errors in console
- JavaScript errors
- Missing translations
- Broken responsive layout
- Projects not loading
- Language switcher not working
- More than 3 seconds load time

## Final Verification

- [ ] All tests pass
- [ ] No console errors
- [ ] Changes work across all website variations
- [ ] Git commit created with descriptive message
- [ ] Session summary updated with changes