# Testing and Version Control Guide

## Overview
This document outlines the MANDATORY testing and version control procedures for Studio Arteamo website deployments.

## Version Control System

### Version Format
- Format: `major.minor.patch` (e.g., 1.3.1)
- Location: `<meta name="version" content="1.3.1">` in index.html
- Auto-increment: Use `node update-deployment-version.js`

### Version Metadata
```html
<meta name="version" content="1.3.1">
<meta name="deployment-date" content="2025-07-07">
<meta name="deployment-time" content="13:44 UTC">
```

### Updating Version
```bash
# Automatic version update (increments patch version)
node update-deployment-version.js

# Manual update if needed
# Edit index.html directly, then commit
```

## Testing Algorithm with Puppeteer

### Core Test Setup
```javascript
const puppeteer = require('puppeteer');

async function testSite() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // CRITICAL: Always disable cache
    await page.setCacheEnabled(false);
    
    // Set viewport for desktop
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate with network idle
    await page.goto('https://arteamo.net', { 
        waitUntil: 'networkidle2',
        timeout: 30000 
    });
    
    // Your tests here...
    
    await browser.close();
}
```

### Test Components

#### 1. Version Verification
```javascript
const version = await page.evaluate(() => {
    const metaVersion = document.querySelector('meta[name="version"]');
    const metaDate = document.querySelector('meta[name="deployment-date"]');
    const metaTime = document.querySelector('meta[name="deployment-time"]');
    return {
        version: metaVersion?.content || 'none',
        date: metaDate?.content || 'none',
        time: metaTime?.content || 'none'
    };
});
```

#### 2. Font Testing
```javascript
const fonts = await page.evaluate(() => {
    const body = window.getComputedStyle(document.body);
    const serif = document.querySelector('h2.serif');
    const serifStyle = serif ? window.getComputedStyle(serif) : null;
    return {
        bodyFont: body.fontFamily,
        serifFont: serifStyle?.fontFamily || 'not found'
    };
});
// Expected: Body = Inter, Serif = Playfair Display
```

#### 3. Contact Form Testing
```javascript
// Critical: Test for vertical layout
const formCheck = await page.evaluate(() => {
    const form = document.querySelector('.contact-form');
    if (!form) return { error: 'Form not found' };
    
    const style = window.getComputedStyle(form);
    const formGroups = document.querySelectorAll('.form-group');
    
    return {
        display: style.display,
        flexDirection: style.flexDirection,
        isVertical: style.display === 'block' || style.flexDirection === 'column',
        formGroupCount: formGroups.length,
        formWidth: form.offsetWidth
    };
});
```

#### 4. Mobile Testing
```javascript
// Switch to mobile viewport
await page.setViewport({ width: 375, height: 667 });
await new Promise(resolve => setTimeout(resolve, 1000));

// Re-test form and layout
const mobileCheck = await page.evaluate(() => {
    // Same tests as desktop but for mobile viewport
});
```

#### 5. Performance Testing
```javascript
const performance = await page.evaluate(() => {
    const timing = window.performance.timing;
    return {
        loadTime: timing.loadEventEnd - timing.navigationStart,
        domReady: timing.domContentLoadedEventEnd - timing.navigationStart
    };
});
// Target: < 3000ms load time
```

## Testing Workflow

### Pre-Deployment
1. Make changes to code
2. Run `node update-deployment-version.js`
3. Run `node test-comprehensive.js`
4. Fix any issues found
5. Commit with descriptive message
6. Push to GitHub

### Post-Deployment (MANDATORY)
1. Wait 1-2 minutes for Netlify deployment
2. Run `node test-after-deploy.js`
3. Verify all tests pass
4. If failures, investigate and fix immediately

### Test Scripts
- **test-after-deploy.js** - Primary post-deployment test
- **test-comprehensive.js** - Full local test suite
- **test-contact-form-live.js** - Contact form specific
- **test-performance.js** - Performance metrics
- **test-images-comprehensive.js** - Image loading

## Common Issues and Solutions

### Contact Form Horizontal Layout
- Check for `display: flex` in CSS
- Ensure inline styles have `display: block !important`
- Verify form-group elements are block-level

### Font Loading Issues
- Check Google Fonts are loading
- Verify no inline CSS overrides
- Ensure font-family declarations match

### Version Not Updating
- Run `node update-deployment-version.js` before commit
- Check meta tags in index.html
- Clear browser cache when testing

## Best Practices

1. **Always test after deployment** - Never assume deployment worked
2. **Use computed styles** - Don't rely on CSS classes alone
3. **Disable cache** - Ensure fresh content loads
4. **Test multiple viewports** - Desktop and mobile minimum
5. **Take screenshots** - Visual confirmation of issues
6. **Check console errors** - May reveal JavaScript issues

## Emergency Procedures

If deployment breaks the site:
1. Run `node test-after-deploy.js` to identify issues
2. Fix locally and test with `node test-comprehensive.js`
3. Update version and redeploy
4. If critical, revert: `git revert HEAD && git push`

## Summary

The testing and version control system ensures:
- Every deployment is tracked with version numbers
- Automated tests catch issues immediately
- Consistent quality across deployments
- Quick identification and resolution of problems

Remember: **ALWAYS run `node test-after-deploy.js` after pushing changes!**