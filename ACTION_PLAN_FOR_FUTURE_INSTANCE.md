# Action Plan for Future Instance
**Created**: January 5, 2025  
**Purpose**: Step-by-step guide to fix redirect loop issues on arteamo.net

## Quick Status Check
Before starting, run these commands to understand current state:
```bash
# Check if hidden config exists
ls -la /root/Interiori/websites/.netlify/

# Check current git status
cd /root/Interiori/websites && git status

# Test if site is still having issues
curl -I https://arteamo.net/test.jpg 2>&1 | grep -E "HTTP|Location"
```

## If Redirect Loops Still Occurring

### Step 1: Remove Hidden Configuration (CRITICAL)
```bash
cd /root/Interiori/websites

# Check if .netlify directory exists
if [ -d ".netlify" ]; then
    echo "Found .netlify directory - this is causing the issue!"
    # Backup just in case
    mv .netlify .netlify.backup.$(date +%s)
    echo "Directory backed up and removed"
else
    echo "No .netlify directory found"
fi
```

### Step 2: Ensure It Doesn't Return
```bash
# Add to .gitignore if not already there
if ! grep -q "^\.netlify" .gitignore 2>/dev/null; then
    echo ".netlify/" >> .gitignore
    echo "Added .netlify/ to .gitignore"
fi
```

### Step 3: Commit and Deploy
```bash
git add -A
git commit -m "fix: remove Netlify CLI artifacts causing redirect loops

- Deleted .netlify/ directory containing override configuration
- Added .netlify/ to .gitignore to prevent recurrence
- This should resolve ERR_TOO_MANY_REDIRECTS on arteamo.net

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin master
```

### Step 4: Verify in Netlify Dashboard
1. Go to Netlify dashboard
2. Navigate to Functions tab
3. Ensure NO Edge Functions are listed
4. If any exist, delete them manually

### Step 5: Test the Fix
Wait 2-3 minutes for deployment, then:
```bash
# Test image loading
curl -I https://arteamo.net/Apartament%20Flavia%20Garden%202024/cam01.jpg

# Should return 200 OK without redirects
# Should NOT have ?q=85&fm=webp parameters
```

### Step 6: Remove Client-Side Workarounds
If images load correctly, remove the JavaScript fixes:
```bash
# Remove the comprehensive fix from HTML files
git rm comprehensive-image-fix.js image-fix.js

# Update index.html to remove script reference
# Update gallery-premium.html to remove script reference

git commit -m "cleanup: remove client-side image fix workarounds

- Redirect loops resolved at server level
- Client-side interceptors no longer needed"

git push origin master
```

## If Problem Persists

### Nuclear Option 1: Clear Everything
```bash
# In Netlify Dashboard:
# 1. Go to Site Settings → Build & Deploy
# 2. Click "Clear cache and retry deploy"
# 3. Trigger new deployment
```

### Nuclear Option 2: New Netlify Site
1. Create new Netlify site
2. Connect same GitHub repo
3. Update domain settings
4. Delete old site

### Nuclear Option 3: Check for More Hidden Files
```bash
# Search for any netlify config files
find . -name "*netlify*" -type f | grep -v node_modules

# Look for any Edge Function definitions
grep -r "edge_functions" . | grep -v node_modules
```

## Prevention Checklist
- [ ] Never use `netlify dev` in production code
- [ ] Never use `netlify init` unless creating new site
- [ ] Always check for .netlify/ before committing
- [ ] Keep configuration in main netlify.toml only
- [ ] Test on Netlify subdomain first before custom domain

## Contact Form Fix Status
The contact form CSS has been added to styles-enhanced.css. If it still looks wrong:
1. Check browser cache (hard refresh with Ctrl+F5)
2. Verify CSS is loading (check Network tab)
3. Look for CSS conflicts in browser DevTools

## Success Indicators
- ✅ No .netlify/ directory exists
- ✅ No Edge Functions in Netlify dashboard
- ✅ Images load without query parameters
- ✅ No ERR_TOO_MANY_REDIRECTS in console
- ✅ Both domains work identically
- ✅ Contact form properly styled

## Emergency Contacts
If all else fails:
- Check Netlify Status: https://www.netlifystatus.com/
- Netlify Forums: https://answers.netlify.com/
- GitHub Issues: https://github.com/netlify/cli/issues

---
**Remember**: The root cause is almost certainly the .netlify/ directory. Remove it first!