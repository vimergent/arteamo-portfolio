# Deployment Workflow for Studio Arteamo Portfolio

## Quick Deploy Process

### After Completing Each Website:

1. **Test Locally**
   ```bash
   # Server is already running on http://localhost:8090
   # Browse to test the new website
   ```

2. **Update Documentation**
   - Update `index.html` (main showcase page)
   - Update `TODO.md` with completion status
   - Update `SESSION_PROGRESS.md` for handoff

3. **Commit to Git**
   ```bash
   # Add specific website files
   git add website[NUMBER]-[NAME]/
   git add index.html
   git add translations.js
   git add TODO.md
   
   # Commit with descriptive message
   git commit -m "Complete Website [NUMBER] ([NAME]) - [Brief description]"
   ```

4. **Push to GitHub**
   ```bash
   git push origin master
   ```
   - Username: `vimergent`
   - Password: Your GitHub Personal Access Token

5. **Automatic Netlify Deploy**
   - Netlify watches the GitHub repo
   - Deploys automatically after push
   - Check deployment at your Netlify URL

## Current Setup

- **GitHub Repo**: `vimergent/arteamo-portfolio`
- **Branch**: `master`
- **Netlify**: Connected to GitHub (auto-deploys on push)

## For Bulk Updates

If you've completed multiple websites:

```bash
# Add all changes
git add .

# Review what will be committed
git status

# Commit with comprehensive message
git commit -m "Add multiple website completions

- Website X: Description
- Website Y: Description
- Updated documentation and translations"

# Push
git push origin master
```

## Important Files

- `netlify.toml` - Netlify configuration (already set up)
- `.gitignore` - Excludes unnecessary files
- `push-to-github.sh` - Alternative push script
- `deploy.sh` - Multiple deployment options

## After Deployment

1. Check Netlify dashboard for deployment status
2. Visit live site to verify changes
3. Test all new websites on production
4. Update any external links/references