#!/bin/bash

# Deployment script for Studio Arteamo Portfolio
echo "🚀 Deploying Studio Arteamo Portfolio..."

# Option 1: Deploy with Surge (requires login)
echo "To deploy with Surge:"
echo "1. Run: surge /root/Interiori/websites"
echo "2. Enter any email/password to create account"
echo "3. Accept the suggested domain or type: arteamo-portfolio.surge.sh"
echo ""

# Option 2: Start local server
echo "To view locally:"
echo "Run: python3 -m http.server 8080"
echo "Then open: http://localhost:8080"
echo ""

# Option 3: Create deployment package
echo "Creating deployment package..."
cd /root/Interiori/websites
tar -czf arteamo-portfolio.tar.gz --exclude='*.tar.gz' --exclude='deploy.sh' .
echo "✅ Package created: arteamo-portfolio.tar.gz"
echo "You can upload this file to any web hosting service"