# GitHub Push Instructions for Studio Arteamo Portfolio

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `arteamo-portfolio`
3. Description: "Studio Arteamo Interior Design Portfolio - Multi-language showcase"
4. Set to **Public** (or Private if you prefer)
5. **DON'T** initialize with README (we already have one)
6. Click "Create repository"

## Step 2: Get Your Repository URL

After creating, GitHub will show you the repository URL. It should look like:
- HTTPS: `https://github.com/heavens_ewe_4n/arteamo-portfolio.git`
- SSH: `git@github.com:heavens_ewe_4n/arteamo-portfolio.git`

## Step 3: Push to GitHub

Copy and run these commands (replace YOUR_GITHUB_USERNAME with your actual username):

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/arteamo-portfolio.git

# Push to GitHub
git push -u origin master
```

When prompted for credentials:
- Username: heavens_ewe_4n@icloud.com
- Password: Use a Personal Access Token (not your password)

## Step 4: Get Personal Access Token (if needed)

If you don't have a token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "arteamo-portfolio"
4. Select scopes: `repo` (full control)
5. Generate token and copy it
6. Use this token as your password when pushing

## Step 5: Connect to Netlify

1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Choose GitHub
4. Select your `arteamo-portfolio` repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: `.`
6. Click "Deploy site"

## Alternative: Quick Deploy

If you want to see it live immediately without GitHub:
1. Download the websites folder as ZIP
2. Go to https://app.netlify.com/drop
3. Drag and drop the ZIP file
4. Instant deployment!

---

**Need the exact commands?** Share your GitHub repository URL after creating it, and I'll provide the exact push commands.