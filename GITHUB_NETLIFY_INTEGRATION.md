# GitHub-Netlify Integration Documentation

## Overview
This document contains all critical information about the GitHub-Netlify integration for Studio Arteamo's portfolio website.

## GitHub Configuration

### Repository Details
- **URL**: https://github.com/vimergent/arteamo-portfolio
- **Branch**: master
- **Owner**: vimergent
- **Type**: Public repository

### Authentication Status
- **Current State**: GitHub is properly connected to Netlify
- **Auto-Deploy**: Enabled - pushes to master branch trigger automatic Netlify deployments
- **Important**: The local repository may show as unconnected due to server environment

### Git Configuration
```bash
# If needed to reconnect:
git remote add origin https://github.com/vimergent/arteamo-portfolio.git
git branch -M master
```

## Netlify Configuration

### Site Details
- **Site Name**: studioarteamo
- **Site ID**: 653fed52-9287-47f1-8e95-d5846b6c7982
- **Custom Domain**: arteamo.net
- **Netlify URL**: https://studioarteamo.netlify.app
- **Admin URL**: https://app.netlify.com/projects/studioarteamo

### DNS Configuration
Domain should point to Netlify's name servers:
- dns1.p03.nsone.net
- dns2.p03.nsone.net
- dns3.p03.nsone.net
- dns4.p03.nsone.net

### Build Configuration
- **Build Command**: `echo 'No build needed'` (static site)
- **Publish Directory**: `.` (root)
- **Node Version**: 18

### Netlify CLI Access
```bash
# Set auth token
export NETLIFY_AUTH_TOKEN="nfp_uHKEAgjJewDztMBe8EZpXVnuM6vJs7xjbcdf"

# Check status
netlify status

# Manual deploy
netlify deploy --prod

# Link to site (if needed)
netlify link --id 653fed52-9287-47f1-8e95-d5846b6c7982
```

## Deployment Workflow

### Automatic Deployment (Preferred)
1. Make changes locally
2. Commit with descriptive message
3. Push to GitHub: `git push origin master`
4. Netlify automatically builds and deploys

### Manual Deployment via CLI
```bash
# Direct deploy without GitHub
NETLIFY_AUTH_TOKEN="nfp_uHKEAgjJewDztMBe8EZpXVnuM6vJs7xjbcdf" netlify deploy --prod --dir .
```

## Important Files

### netlify.toml
- Main Netlify configuration
- Contains redirects, headers, plugins
- Located at: `/root/Interiori/websites/netlify.toml`

### _redirects
- Simple redirect rules
- Takes precedence over netlify.toml redirects
- Located at: `/root/Interiori/websites/_redirects`

### Key Redirects
```
/ → /website1-minimalist/index.html (200)
/admin → /website1-minimalist/admin/index.html (200)
/*.css → /website1-minimalist/:splat (200)
```

## Common Issues and Solutions

### Build Failures
- **Issue**: "Build script returned non-zero exit code: 2"
- **Cause**: Usually plugin errors (e.g., netlify-plugin-checklinks)
- **Solution**: Check netlify.toml for problematic plugins

### Redirect Loops
- **Issue**: Site redirects infinitely
- **Solution**: Check for conflicting redirects in netlify.toml
- **Fixed**: Commented out /website1-minimalist/* → /:splat redirects

### Domain Not Resolving
- **Issue**: arteamo.net not accessible
- **Solution**: Verify DNS points to Netlify servers
- **Check**: `dig arteamo.net` or `nslookup arteamo.net`

## Monitoring Deployments

### Via Netlify Dashboard
1. Go to: https://app.netlify.com/projects/studioarteamo/deploys
2. Check deployment status
3. View build logs for errors

### Via CLI
```bash
# Check latest deployments
NETLIFY_AUTH_TOKEN="nfp_uHKEAgjJewDztMBe8EZpXVnuM6vJs7xjbcdf" \
netlify api listSiteDeploys --data '{"site_id": "653fed52-9287-47f1-8e95-d5846b6c7982"}'
```

## Best Practices

1. **Always Test Locally**: Run `node test-comprehensive.js` before pushing
2. **Minify Assets**: Run `node minify-assets.js` before deployment
3. **Check Redirects**: Test all redirect rules locally
4. **Monitor Builds**: Check Netlify dashboard after pushing
5. **Document Changes**: Update SESSION_SUMMARY files

## Emergency Procedures

### If Deployment Fails
1. Check build logs in Netlify dashboard
2. Review recent changes in git log
3. Test locally with `netlify dev`
4. Rollback if needed via Netlify dashboard

### If Site is Down
1. Check DNS: `dig arteamo.net`
2. Check Netlify status: https://www.netlifystatus.com/
3. Deploy previous version from Netlify dashboard
4. Contact support if needed

## Contact Information
- **Netlify Account**: Vince Issaev (heavens_ewe_4n@icloud.com)
- **Team**: Varna
- **GitHub Repo Owner**: vimergent

---
Last Updated: 2025-07-04
Next Review: When authentication changes or major updates occur