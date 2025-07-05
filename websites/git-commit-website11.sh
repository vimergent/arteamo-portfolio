#!/bin/bash

# Git commit script for Website 11 (Japandi) completion
# Created: June 28, 2025

echo "🎨 Committing Website 11 (Japandi) completion..."

# Add the specific files for this update
git add website11-japandi/
git add index.html
git add translations.js
git add TODO.md
git add SESSION_PROGRESS.md

# Create a detailed commit message
git commit -m "Complete Website 11 (Japandi) - Ultra-minimal design

- ✅ Implemented Japanese-Scandinavian aesthetic website
- ✅ Ultra-minimal JavaScript (< 1KB, well under 10KB limit)
- ✅ Ken Burns hero effect with CSS animations
- ✅ Integrated with existing translation system
- ✅ Updated main index.html (9/15 websites now complete)
- ✅ Added Japandi-specific translations
- ✅ Updated documentation (TODO.md, SESSION_PROGRESS.md)

Technical details:
- Pure CSS animations respecting prefers-reduced-motion
- Minimal form validation with visual feedback
- Optimized for performance with lazy loading
- Color scheme: Snow #FAFAFA, Ink #222, Sage #9AA49A

Next: Continue with Website 15 (ASCII terminal)"

echo "✅ Commit created successfully!"
echo ""
echo "To push to GitHub, run:"
echo "git push origin master"
echo ""
echo "You'll need:"
echo "- Username: vimergent"
echo "- Password: Your GitHub Personal Access Token"
echo ""
echo "After pushing, Netlify should automatically deploy the changes."