#!/bin/bash

# Deployment script for website1-minimalist

echo "📦 Preparing website1-minimalist for deployment..."

# Create deployment directory
DEPLOY_DIR="website1-minimalist-deploy"
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# Copy website files
echo "📄 Copying website files..."
cp -r website1-minimalist/* $DEPLOY_DIR/

# Copy shared dependencies
echo "📚 Copying shared dependencies..."
cp translations.js $DEPLOY_DIR/
cp language-switcher-v2.js $DEPLOY_DIR/
cp project-config.js $DEPLOY_DIR/
cp awards-handler.js $DEPLOY_DIR/
cp contact-form.js $DEPLOY_DIR/
cp mobile-optimizations.css $DEPLOY_DIR/
cp performance-optimizer.js $DEPLOY_DIR/

# Copy project images
echo "🖼️ Copying project images..."
cp -r "Apartament Flavia Garden 2024" $DEPLOY_DIR/
cp -r "Apartament K55_2021" $DEPLOY_DIR/
cp -r "Apartament Кв. Чайка, Варна_2017" $DEPLOY_DIR/
cp -r "Apartament Симфония - Бриз, Варна_ 2019" $DEPLOY_DIR/
cp -r "Apartament Траката, Варна_2021" $DEPLOY_DIR/
cp -r "Balev Corporation 2020" $DEPLOY_DIR/
cp -r "Elite Clinic 2021" $DEPLOY_DIR/
cp -r "Gichev sped 2019" $DEPLOY_DIR/
cp -r "Oliv vilas sv.Vlas 2019" $DEPLOY_DIR/
cp -r "Playground Grand Mall Varna 2018" $DEPLOY_DIR/
cp -r "Work Del Mar 2022" $DEPLOY_DIR/

# Copy gallery page
echo "📸 Copying gallery page..."
cp gallery-premium.html $DEPLOY_DIR/

# Clean up test files
echo "🧹 Cleaning up test files..."
rm -f $DEPLOY_DIR/test-*.html
rm -f $DEPLOY_DIR/test-*.js
rm -f $DEPLOY_DIR/debug-*.html
rm -f $DEPLOY_DIR/check-*.html
rm -f $DEPLOY_DIR/font-tester*.js

# Update paths in index.html to be relative
echo "🔧 Updating paths..."
sed -i 's|href="../mobile-optimizations.css"|href="mobile-optimizations.css"|g' $DEPLOY_DIR/website1-minimalist/index.html
sed -i 's|src="../performance-optimizer.js"|src="performance-optimizer.js"|g' $DEPLOY_DIR/website1-minimalist/index.html
sed -i 's|src="../translations.js"|src="translations.js"|g' $DEPLOY_DIR/website1-minimalist/index.html
sed -i 's|src="../language-switcher-v2.js"|src="language-switcher-v2.js"|g' $DEPLOY_DIR/website1-minimalist/index.html
sed -i 's|src="../project-config.js"|src="project-config.js"|g' $DEPLOY_DIR/website1-minimalist/index.html
sed -i 's|src="../awards-handler.js"|src="awards-handler.js"|g' $DEPLOY_DIR/website1-minimalist/index.html
sed -i 's|src="../contact-form.js"|src="contact-form.js"|g' $DEPLOY_DIR/website1-minimalist/index.html

# Move website files to root of deploy directory
mv $DEPLOY_DIR/website1-minimalist/* $DEPLOY_DIR/
rmdir $DEPLOY_DIR/website1-minimalist

# Update gallery path
sed -i 's|href="../gallery-premium.html|href="gallery-premium.html|g' $DEPLOY_DIR/index.html

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf website1-minimalist-$(date +%Y-%m-%d).tar.gz $DEPLOY_DIR

echo "✅ Deployment package ready: website1-minimalist-$(date +%Y-%m-%d).tar.gz"
echo ""
echo "📋 Deployment checklist:"
echo "   1. Upload to web server"
echo "   2. Extract: tar -xzf website1-minimalist-*.tar.gz"
echo "   3. Move contents to web root"
echo "   4. Ensure proper permissions (755 for directories, 644 for files)"
echo "   5. Test all functionality"

# Optional: Display package size
echo ""
echo "📊 Package size: $(du -h website1-minimalist-*.tar.gz | cut -f1)"