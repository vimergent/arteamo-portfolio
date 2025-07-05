#!/bin/bash

echo "🚀 Pushing Studio Arteamo Portfolio to GitHub..."
echo ""
echo "Setting up GitHub repository..."

# Add GitHub remote
git remote add origin https://github.com/vimergent/arteamo-portfolio.git

echo ""
echo "Pushing to GitHub..."
echo "When prompted:"
echo "Username: vimergent"
echo "Password: Use your Personal Access Token (not your GitHub password)"
echo ""

# Push to GitHub
git push -u origin master

echo ""
echo "✅ Done! Your portfolio is now on GitHub."
echo ""
echo "Next steps:"
echo "1. Go to Netlify: https://app.netlify.com"
echo "2. Click 'New site from Git'"
echo "3. Connect to your GitHub repository: arteamo-portfolio"
echo "4. Deploy!"