# Netlify Configuration Guide for Arteamo CMS

**Date**: 2025-12-13
**Purpose**: Configure Netlify for CMS functionality
**Site**: arteamo-portfolio (staging first, then production)

---

## Overview

Netlify provides 3 essential services for the CMS:
1. **Git Gateway**: Connects CMS to GitHub without exposing credentials
2. **Netlify Identity**: User authentication for CMS access
3. **Functions**: Server-side logic for project sync

**Cost**: $0/month (all features included in free tier)

---

## Prerequisites

Before starting, ensure:
- [x] CMS files committed to staging branch
- [x] GitHub repository: https://github.com/vimergent/arteamo-portfolio
- [x] GitHub PAT configured (already done)
- [ ] Cloudinary credentials ready
- [ ] Netlify account access

**Netlify Token**: nfp_uHKEAgjJewDztMBe8EZpXVnuM6vJs7xjbcdf (from approval)

---

## Part 1: Deploy Staging Site

### Step 1.1: Create New Site from Git

**Option A: Via Netlify CLI (Automated)**
```bash
cd /root/Projects/Production/Interiori/websites
netlify login  # Uses token: nfp_uHKEAgjJewDztMBe8EZpXVnuM6vJs7xjbcdf
netlify init
```

When prompted:
- **Create & configure a new site**: Yes
- **Team**: (Select your team)
- **Site name**: arteamo-staging
- **Build command**: (leave empty or "echo 'No build needed'")
- **Publish directory**: . (current directory)
- **Branch to deploy**: staging

**Option B: Via Netlify Dashboard (Manual)**
1. Go to: https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Search for: vimergent/arteamo-portfolio
5. Configure:
   - **Branch to deploy**: staging
   - **Base directory**: websites
   - **Build command**: (leave empty)
   - **Publish directory**: . (or leave empty)
6. Click "Deploy site"

### Step 1.2: Update Site Settings

After site is created:

1. **Site name**: Change from random to `arteamo-staging`
   - Go to: Site settings → General → Site details
   - Click "Change site name"
   - Enter: `arteamo-staging`
   - Save

2. **Custom domain** (optional for staging):
   - Add: `test.arteamo.net` or `staging.arteamo.net`
   - (Skip for now, can add later)

---

## Part 2: Enable Netlify Identity

Identity provides authentication for CMS access.

### Step 2.1: Enable Identity
1. Go to: **Site settings → Identity**
2. Click **"Enable Identity"**
3. Wait for activation (~30 seconds)

### Step 2.2: Configure Registration
**Important**: Control who can access your CMS

**Settings → Identity → Registration**:
- **Registration preferences**: Invite only (IMPORTANT!)
- **External providers**: None (use email only)
- **Email confirmation**: Required

Why "Invite only"?
- Prevents random people from creating admin accounts
- You control exactly who can edit content
- More secure than open registration

### Step 2.3: Configure Git Gateway
This connects CMS to GitHub:

1. **Settings → Identity → Services**
2. **Git Gateway**: Click "Enable"
3. **Repository access**: All repositories
4. Click "Save"

### Step 2.4: Invite Admin User
Create your CMS admin account:

1. **Identity tab** (top navigation)
2. Click **"Invite users"**
3. **Email**: ago_sandmen_5q@icloud.com
4. Click **"Send"**

You'll receive an email:
- Subject: "You've been invited to join arteamo-staging"
- Click the link to set your password
- Choose a strong password (save in password manager)

---

## Part 3: Add Environment Variables

Environment variables configure Cloudinary and other services.

### Step 3.1: Add Cloudinary Variables
**Settings → Environment variables → Add a variable**

Add these 4 variables:

**Variable 1**:
```
Key: CLOUDINARY_CLOUD_NAME
Value: arteamo
Scopes: All (deploy previews, branch deploys, production)
```

**Variable 2**:
```
Key: CLOUDINARY_API_KEY
Value: [from Cloudinary dashboard]
Scopes: All
```

**Variable 3**:
```
Key: CLOUDINARY_API_SECRET
Value: [from Cloudinary dashboard - keep secret!]
Scopes: All
```

**Variable 4**:
```
Key: CLOUDINARY_UPLOAD_PRESET
Value: arteamo_cms_uploads
Scopes: All
```

### Step 3.2: Add Site Configuration Variables
Optional but recommended:

**Variable 5**:
```
Key: SITE_URL
Value: https://arteamo-staging.netlify.app (or custom domain)
Scopes: All
```

**Variable 6**:
```
Key: CMS_ADMIN_EMAIL
Value: ago_sandmen_5q@icloud.com
Scopes: All
```

### Step 3.3: Trigger Redeploy
After adding variables:
1. Go to **Deploys**
2. Click **"Trigger deploy" → "Deploy site"**
3. Wait for deployment (~30 seconds)

---

## Part 4: Configure CMS Access

Update `admin-cms/config.yml` with actual Cloudinary credentials.

### Step 4.1: Update Backend Configuration
Currently:
```yaml
backend:
  name: git-gateway
  branch: staging
```

This is correct! Git Gateway automatically uses Netlify Identity.

### Step 4.2: Update Media Library Configuration
I'll update this once you provide Cloudinary credentials.

Currently (placeholder):
```yaml
media_library:
  name: cloudinary
  config:
    cloud_name: YOUR_CLOUDINARY_CLOUD_NAME
    api_key: YOUR_CLOUDINARY_API_KEY
```

Will become:
```yaml
media_library:
  name: cloudinary
  config:
    cloud_name: arteamo
    api_key: [your actual API key]
    default_transformations:
      - - fetch_format: auto
          quality: auto
          crop: limit
          width: 1920
```

---

## Part 5: Test CMS Access

After everything is configured:

### Step 5.1: Access CMS
1. Go to: https://arteamo-staging.netlify.app/admin-cms/
2. Click **"Login with Netlify Identity"**
3. Enter email: ago_sandmen_5q@icloud.com
4. Enter password (from invitation)
5. You should see CMS dashboard!

### Step 5.2: Verify Collections
Check that you see:
- **Projects** collection (should show test project)
- **Site Settings** collection
- **Media** library (Cloudinary upload button)

### Step 5.3: Test Image Upload
1. Click **"Media"** in top navigation
2. Click **"Upload"**
3. Drag a test image
4. Verify it uploads to Cloudinary
5. Check Cloudinary dashboard to confirm

### Step 5.4: Test Project Creation
1. Click **"Projects"**
2. Click **"New Project"**
3. Fill in:
   - Name (Bulgarian): Test Project
   - Name (English): Test Project
   - Category: residential
   - Year: 2024
   - Cover Image: (upload via media library)
4. Click **"Save"** (saves as draft)
5. Click **"Publish"** (publishes to Git)

### Step 5.5: Verify Git Commit
After publishing:
1. Check GitHub repository
2. You should see new commit from Netlify CMS
3. New file in: `content/projects/2024-test-project.md`

---

## Part 6: Configure Build Hooks (Optional)

Build hooks trigger rebuilds when content changes.

### Step 6.1: Create Build Hook
**Settings → Build & deploy → Build hooks**

1. Click **"Add build hook"**
2. **Name**: CMS Content Update
3. **Branch to build**: staging
4. Click **"Save"**
5. Copy the webhook URL

### Step 6.2: Add to CMS Config (Future Enhancement)
This can trigger automatic rebuilds, but not needed initially.

---

## Part 7: Production Deployment Plan

After staging is tested and approved:

### Step 7.1: Create Production Site
Same process as staging, but:
- **Branch**: master (instead of staging)
- **Site name**: arteamo-production or studio-arteamo
- **Custom domain**: arteamo.net (your current domain)

### Step 7.2: DNS Configuration
To use arteamo.net:
1. **Netlify**: Add custom domain arteamo.net
2. **DNS Provider**: Update A record to point to Netlify
3. **Netlify**: Enable HTTPS (automatic)

**Current A record**:
```
Host: @
Type: A
Value: [Netlify IP - shown in Netlify dashboard]
TTL: 3600
```

### Step 7.3: Migration Strategy
1. Deploy to production Netlify site
2. Test at temporary URL (e.g., arteamo-production.netlify.app)
3. If all works, update DNS to point to Netlify
4. Old site becomes automatic fallback during DNS propagation

---

## Troubleshooting

### Issue 1: Git Gateway Not Enabled
**Error**: "Git Gateway is not enabled"
**Solution**:
- Go to Settings → Identity → Services
- Enable Git Gateway
- Redeploy site

### Issue 2: Identity Not Working
**Error**: Can't login to CMS
**Solution**:
- Verify Identity is enabled
- Check invitation was accepted
- Try "Forgot password" flow
- Check browser console for errors

### Issue 3: Media Upload Fails
**Error**: "Upload failed" when uploading images
**Solution**:
- Verify Cloudinary credentials in env vars
- Check upload preset exists in Cloudinary
- Verify preset is "Unsigned"
- Check browser console for specific error

### Issue 4: CMS Shows "Config Error"
**Error**: "Error loading config.yml"
**Solution**:
- Check YAML syntax in admin-cms/config.yml
- Verify file is committed to Git
- Check browser console for specific parsing error
- Use YAML validator: https://www.yamllint.com/

### Issue 5: Changes Don't Appear on Site
**Error**: Published content doesn't show on website
**Solution**:
- Verify sync function is deployed (check Netlify Functions tab)
- Manually trigger function: `/.netlify/functions/sync-projects`
- Check that project-config.js is being updated
- May need to add build hook

---

## Security Checklist

Before going live, verify:

- [ ] Identity registration is "Invite only"
- [ ] API secrets are in environment variables (NOT in Git)
- [ ] Git Gateway is enabled
- [ ] Admin user has strong password
- [ ] Cloudinary upload preset allows only images
- [ ] File size limits configured in Cloudinary
- [ ] HTTPS is enabled (automatic with Netlify)
- [ ] No sensitive data in config.yml

---

## Cost Analysis

### Netlify Free Tier Includes:
- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited sites
- Netlify Identity: 1,000 active users
- Functions: 125,000 requests/month

### Expected Usage (Arteamo Portfolio):
- **Bandwidth**: ~5 GB/month (5% of limit)
- **Build minutes**: ~10 minutes/month (3% of limit)
- **Identity users**: 1-2 (0.2% of limit)
- **Function calls**: ~100/month (0.08% of limit)

**Total Cost**: $0/month (well within free tier)

---

## Monitoring

### What to Monitor:
1. **Build status**: Check Deploys tab regularly
2. **Function logs**: Check Functions tab for errors
3. **Identity activity**: Check Identity tab for login attempts
4. **Bandwidth usage**: Check Analytics (if enabled)

### Setup Notifications:
**Settings → Build & deploy → Deploy notifications**

Add notification for:
- Deploy failed
- Deploy succeeded (optional)

**Method**: Email to ago_sandmen_5q@icloud.com

---

## Timeline

**Netlify Setup**: ~30 minutes
- Deploy staging site: 5 min
- Enable Identity: 5 min
- Configure Git Gateway: 5 min
- Add environment variables: 5 min
- Invite admin user: 5 min
- Test CMS access: 5 min

**Total**: 30 minutes (manual steps)

---

## Next Steps

**For You (Manual)**:
1. ✅ Verify Netlify token access: nfp_uHKEAgjJewDztMBe8EZpXVnuM6vJs7xjbcdf
2. ✅ Choose: Deploy via CLI (faster) or Dashboard (visual)
3. ✅ Enable Netlify Identity
4. ✅ Enable Git Gateway
5. ✅ Invite yourself as admin user
6. ✅ Add Cloudinary environment variables (after setup)

**For Me (Automated)**:
1. Deploy via CLI (if you approve)
2. Verify deployment
3. Test CMS access
4. Create first migrated project
5. Verify Git commits work

---

## Questions?

**Q: Do we need two Netlify sites (staging + production)?**
A: Yes, recommended. Staging for testing, production for live site.

**Q: Can we use existing arteamo.net domain?**
A: Yes! After staging is tested, we point DNS to production Netlify site.

**Q: What if someone tries to hack into CMS?**
A: "Invite only" registration prevents unauthorized access. Plus HTTPS encryption.

**Q: Can we have multiple CMS users?**
A: Yes! Invite as many users as needed. Free tier supports 1,000 active users.

---

## Ready to Proceed?

**Option A: Automated Deployment (Recommended)**
Reply with:
```
NETLIFY DEPLOY

Method: CLI (automated)
Token: nfp_uHKEAgjJewDztMBe8EZpXVnuM6vJs7xjbcdf
Proceed: YES
```

**Option B: Manual Deployment**
Reply with:
```
NETLIFY DEPLOY

Method: Dashboard (manual)
I'll: Do it myself and report back
Proceed: I'LL HANDLE IT
```

Then I'll:
- Wait for staging site URL
- Help configure Identity + Git Gateway
- Test CMS access
- Proceed with project migration

---

**Status**: Ready to deploy staging site
**Blocker**: Need deployment method confirmation
**Next Task**: Deploy to Netlify and configure Identity

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
