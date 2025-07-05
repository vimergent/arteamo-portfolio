#!/bin/bash

# Final deployment script for Studio Arteamo
# This script prepares the site for Netlify deployment

echo "🚀 Preparing Studio Arteamo for Netlify deployment..."
echo ""

# 1. Minify all assets
echo "1. Minifying assets..."
node minify-assets.js

# 2. Run production tests
echo ""
echo "2. Running production readiness tests..."
node test-production-ready.js

if [ $? -ne 0 ]; then
    echo "❌ Production tests failed. Please fix issues before deploying."
    exit 1
fi

# 3. Clean up test files
echo ""
echo "3. Cleaning up test files..."
rm -f test-*.png
rm -f production-test-*.png

# 4. Create deployment summary
echo ""
echo "4. Creating deployment summary..."
cat > DEPLOYMENT_SUMMARY.md << EOF
# Deployment Summary - $(date)

## Configuration Files
- ✅ netlify.toml - Comprehensive configuration with all optimizations
- ✅ _redirects - URL structure and language redirects
- ✅ _headers - Security and performance headers
- ✅ robots.txt - SEO configuration

## Features Implemented
- ✅ Netlify Forms for contact form
- ✅ Geo-based language detection
- ✅ Edge Functions for optimization
- ✅ Automatic sitemap generation
- ✅ Performance monitoring with Lighthouse
- ✅ Broken link detection

## Performance Optimizations
- ✅ Critical CSS inlined
- ✅ Assets minified
- ✅ Lazy loading for images
- ✅ Stale-while-revalidate caching
- ✅ 1-year cache for static assets

## Next Steps
1. Push to GitHub: git push origin master
2. Connect repository to Netlify
3. Deploy and verify all features work
4. Monitor Lighthouse scores
5. Test form submissions

## Important URLs
- Main site: https://studio-arteamo.netlify.app/
- Admin panel: https://studio-arteamo.netlify.app/admin
- Projects: https://studio-arteamo.netlify.app/projects
- Contact: https://studio-arteamo.netlify.app/contact
EOF

# 5. Git status check
echo ""
echo "5. Checking git status..."
git status --short

# 6. Final checklist
echo ""
echo "✅ DEPLOYMENT CHECKLIST:"
echo "   [ ] All tests passing"
echo "   [ ] Assets minified"
echo "   [ ] Meta tags added for SEO"
echo "   [ ] Netlify Forms configured"
echo "   [ ] Redirects configured"
echo "   [ ] Mobile responsive"
echo "   [ ] Images optimized"
echo ""
echo "🎉 Site is ready for deployment!"
echo ""
echo "To deploy:"
echo "1. git add ."
echo "2. git commit -m 'Ready for production deployment'"
echo "3. git push origin master"
echo "4. Deploy on Netlify dashboard"
echo ""