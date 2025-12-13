# Cloudinary Setup Guide for Arteamo CMS

**Date**: 2025-12-13
**Purpose**: Enable image hosting and optimization for Netlify CMS
**Account Email**: ago_sandmen_5q@icloud.com

---

## Why Cloudinary?

Cloudinary provides:
- ✅ **Free Tier**: 25 GB storage, 25 GB bandwidth/month
- ✅ **Automatic Optimization**: WebP conversion, responsive sizing
- ✅ **CDN Delivery**: Fast image loading worldwide
- ✅ **Image Transformations**: Resize, crop, format on-the-fly
- ✅ **Netlify CMS Integration**: Drag-and-drop uploads in CMS

**Cost**: $0/month (Free tier sufficient for portfolio site)

---

## Step 1: Create Cloudinary Account

### 1.1 Sign Up
1. Go to: https://cloudinary.com/users/register_free
2. **Email**: ago_sandmen_5q@icloud.com
3. **Company**: Studio Arteamo
4. **Use case**: Content Management & DAM
5. Click "Create Account"
6. Verify email

### 1.2 Choose Plan
- Select **Free Plan** (25 GB storage)
- No credit card required

### 1.3 Cloud Name Setup
**Important**: Your cloud name will be permanent and used in all image URLs.

**Recommended cloud name**: `arteamo` or `studio-arteamo`

This will create URLs like:
```
https://res.cloudinary.com/arteamo/image/upload/v1234567890/projects/flavia-garden/cam01.jpg
```

---

## Step 2: Get API Credentials

After signup, you'll see your **Dashboard**.

### 2.1 Find Credentials
Go to: **Dashboard → Account Settings → Security**

You need these 3 values:

```
Cloud Name: arteamo
API Key: [20-digit number]
API Secret: [alphanumeric string]
```

**IMPORTANT**: Save these securely. You'll need them for Netlify configuration.

### 2.2 Example Credentials (DO NOT SHARE)
```env
CLOUDINARY_CLOUD_NAME=arteamo
CLOUDINARY_API_KEY=123456789012345678901
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

---

## Step 3: Configure Upload Presets

Upload presets control how images are processed when uploaded via CMS.

### 3.1 Create Upload Preset
1. Go to: **Settings → Upload**
2. Click **Add upload preset**
3. **Preset name**: `arteamo_cms_uploads`
4. **Signing Mode**: Unsigned (allows CMS to upload without backend)

### 3.2 Configure Transformations
Under **Edit** for your preset:

**Folder**:
- Upload folder: `projects/` (organizes all uploads)

**Transformations**:
- Format: Auto (WebP for supported browsers)
- Quality: Auto (balances size and quality)
- Max width: 1920px (prevents huge uploads)
- Max height: 1920px

**Access Control**:
- Resource type: Image
- Access mode: Public

**Click "Save"**

---

## Step 4: Test Upload (Optional)

Before integrating with CMS, test if uploads work:

### 4.1 Manual Test
1. Go to **Media Library**
2. Click **Upload**
3. Drag any test image
4. Verify it appears in library

### 4.2 Get Sample URL
After upload, click the image and copy the URL. It should look like:
```
https://res.cloudinary.com/arteamo/image/upload/v1734105600/sample.jpg
```

---

## Step 5: Update Netlify CMS Configuration

Once you have credentials, I'll update `admin-cms/config.yml`:

### 5.1 Current Placeholder Config
```yaml
media_library:
  name: cloudinary
  config:
    cloud_name: YOUR_CLOUDINARY_CLOUD_NAME
    api_key: YOUR_CLOUDINARY_API_KEY
```

### 5.2 Updated Config (After You Provide Credentials)
```yaml
media_library:
  name: cloudinary
  config:
    cloud_name: arteamo
    api_key: 123456789012345678901
    default_transformations:
      - - fetch_format: auto
          quality: auto
          crop: limit
          width: 1920
```

**Note**: API Secret goes in Netlify environment variables, NOT in config.yml (security).

---

## Step 6: Add Environment Variables to Netlify

After deploying to Netlify, add these environment variables:

### 6.1 Go to Netlify Dashboard
1. Select site: **arteamo-portfolio** (or staging site)
2. Go to: **Site settings → Environment variables**
3. Click **Add a variable**

### 6.2 Add Variables

**Variable 1**:
```
Key: CLOUDINARY_CLOUD_NAME
Value: arteamo
```

**Variable 2**:
```
Key: CLOUDINARY_API_KEY
Value: [your 20-digit API key]
```

**Variable 3**:
```
Key: CLOUDINARY_API_SECRET
Value: [your API secret]
```

**Variable 4** (for upload preset):
```
Key: CLOUDINARY_UPLOAD_PRESET
Value: arteamo_cms_uploads
```

---

## Step 7: Image Migration Plan

Once Cloudinary is configured, we'll migrate all 168 images.

### 7.1 Current Image Structure
```
websites/website1-minimalist/
├── Apartament Flavia Garden 2024/
│   ├── cam01.jpg
│   ├── cam02.jpg
│   └── ... (10 images)
├── Apartament Geo Milev 2023/
│   └── ... (21 images)
└── ... (11 projects total)
```

### 7.2 Cloudinary Structure (After Migration)
```
Cloudinary:
└── projects/
    ├── flavia-garden-2024/
    │   ├── cam01.jpg
    │   ├── cam02.jpg
    │   └── ...
    ├── geo-milev-2023/
    │   └── ...
    └── ...
```

### 7.3 Migration Script
I'll create an automated script to:
1. Upload all 168 images to Cloudinary
2. Organize by project folders
3. Update markdown files with new Cloudinary URLs
4. Generate transformation URLs for responsive images

**Example URL transformation**:
```
Before: website1-minimalist/Apartament Flavia Garden 2024/cam01.jpg
After:  https://res.cloudinary.com/arteamo/image/upload/f_auto,q_auto,w_1920/projects/flavia-garden-2024/cam01.jpg
```

---

## Step 8: Benefits After Setup

### 8.1 Performance Improvements
- **Automatic WebP**: Smaller file sizes (30-50% reduction)
- **CDN Delivery**: Images served from nearest server
- **Lazy Loading**: Compatible with lazy-load libraries
- **Responsive Images**: Auto-resize based on device

### 8.2 CMS Workflow
**Before** (current):
1. Manually upload images to Git
2. Commit and push
3. Update project-config.js
4. Deploy

**After** (with CMS + Cloudinary):
1. Drag image into CMS
2. Image auto-uploads to Cloudinary
3. Click "Publish"
4. Done! (Auto-deploys via Netlify)

---

## Troubleshooting

### Issue 1: Upload Preset Not Found
**Error**: "Upload preset not found"
**Solution**:
- Verify preset name in Cloudinary settings
- Ensure preset is set to "Unsigned"
- Check spelling matches exactly

### Issue 2: API Key Invalid
**Error**: "Invalid API credentials"
**Solution**:
- Copy credentials again from Cloudinary dashboard
- Remove any extra spaces
- Verify environment variables in Netlify

### Issue 3: Images Not Showing
**Error**: Images upload but don't display
**Solution**:
- Check image URL format
- Verify public access is enabled
- Check browser console for CORS errors

---

## Security Best Practices

### ✅ DO:
- Use unsigned upload presets for CMS
- Store API Secret in Netlify environment variables
- Enable folder restrictions in Cloudinary
- Use transformations to limit image sizes

### ❌ DON'T:
- Commit API credentials to Git
- Share API Secret publicly
- Allow uploads without size limits
- Use signed uploads in frontend (requires backend)

---

## Cost Monitoring

### Free Tier Limits:
- **Storage**: 25 GB (168 images ≈ 100 MB, plenty of room)
- **Bandwidth**: 25 GB/month (typical portfolio uses <5 GB)
- **Transformations**: 25,000/month (way more than needed)

### How to Monitor:
1. Go to **Dashboard** in Cloudinary
2. Check **Usage** widget
3. Set alerts at 80% of free tier

**Expected Usage**: ~5% of free tier (very safe)

---

## Next Steps

**For You (Manual)**:
1. ✅ Create Cloudinary account (ago_sandmen_5q@icloud.com)
2. ✅ Save credentials (cloud_name, api_key, api_secret)
3. ✅ Create upload preset `arteamo_cms_uploads`
4. ✅ Reply with credentials

**For Me (Automated)**:
1. Update admin-cms/config.yml with real credentials
2. Add environment variables to Netlify (when site deployed)
3. Create image migration script
4. Upload all 168 images to Cloudinary
5. Update all markdown files with Cloudinary URLs
6. Test image loading on staging
7. Verify transformations work

---

## Timeline

**Cloudinary Setup**: ~15 minutes (you)
**CMS Configuration**: ~5 minutes (me)
**Image Migration**: ~30 minutes (automated script)
**Testing**: ~15 minutes
**Total**: ~1 hour

---

## Questions?

**Q: Can we use another service instead of Cloudinary?**
A: Yes, but Cloudinary has best Netlify CMS integration and generous free tier.

**Q: What happens if we exceed free tier?**
A: You get email warning. Can upgrade to $89/month plan or optimize usage.

**Q: Can we migrate away from Cloudinary later?**
A: Yes, all images are downloadable. Migration script can be reversed.

**Q: Do we keep originals locally?**
A: Recommend keeping originals as backup until fully tested (1-2 weeks).

---

## Ready to Proceed?

**Reply with**:
```
CLOUDINARY READY

Cloud Name: arteamo
API Key: [your key]
API Secret: [your secret]
Upload Preset: arteamo_cms_uploads

Proceed: YES
```

Then I'll immediately update config.yml and continue with Day 2-3 tasks.

---

**Status**: Waiting for Cloudinary credentials
**Blocker**: Manual account creation required
**Next Task**: Update CMS config and deploy to staging

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
