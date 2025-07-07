const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function analyzeImagesDetail() {
    console.log('🔍 Analyzing image optimization opportunities...\n');
    
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        
        // Enable request interception to track images
        await page.setRequestInterception(true);
        const imageRequests = [];
        
        page.on('request', request => {
            if (request.resourceType() === 'image') {
                imageRequests.push({
                    url: request.url(),
                    method: request.method()
                });
            }
            request.continue();
        });
        
        page.on('response', response => {
            if (response.request().resourceType() === 'image') {
                const img = imageRequests.find(r => r.url === response.url());
                if (img) {
                    img.status = response.status();
                    img.size = parseInt(response.headers()['content-length'] || 0);
                    img.contentType = response.headers()['content-type'];
                }
            }
        });
        
        console.log('📍 Loading https://arteamo.net');
        await page.goto('https://arteamo.net', { 
            waitUntil: 'networkidle2',
            timeout: 60000 
        });
        
        // Scroll through the page to trigger lazy loading
        await page.evaluate(async () => {
            const scrollHeight = document.body.scrollHeight;
            const step = 500;
            for (let i = 0; i < scrollHeight; i += step) {
                window.scrollTo(0, i);
                await new Promise(r => setTimeout(r, 100));
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Get displayed image dimensions
        const displayedImages = await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'));
            return images.map(img => {
                const rect = img.getBoundingClientRect();
                const computed = window.getComputedStyle(img);
                return {
                    src: img.src,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                    displayWidth: rect.width,
                    displayHeight: rect.height,
                    loading: img.loading,
                    isVisible: rect.top < window.innerHeight && rect.bottom > 0
                };
            });
        });
        
        // Analyze each image
        const analysis = [];
        let totalWaste = 0;
        let totalSize = 0;
        
        for (const img of displayedImages) {
            const request = imageRequests.find(r => r.url === img.src);
            if (!request || !request.size) continue;
            
            const sizeKB = Math.round(request.size / 1024);
            const sizeMB = (request.size / 1024 / 1024).toFixed(2);
            totalSize += request.size;
            
            // Calculate oversizing
            const oversizeRatio = (img.naturalWidth * img.naturalHeight) / 
                                 (img.displayWidth * img.displayHeight);
            
            // Estimate optimal size (rough calculation)
            const optimalSize = request.size / oversizeRatio;
            const waste = request.size - optimalSize;
            totalWaste += waste;
            
            if (oversizeRatio > 1.5 || sizeKB > 100) {
                analysis.push({
                    url: img.src.split('/').pop(),
                    currentSize: sizeMB + 'MB',
                    dimensions: `${img.naturalWidth}x${img.naturalHeight}`,
                    displayed: `${Math.round(img.displayWidth)}x${Math.round(img.displayHeight)}`,
                    oversizeRatio: oversizeRatio.toFixed(1) + 'x',
                    potentialSaving: (waste / 1024 / 1024).toFixed(2) + 'MB',
                    recommendation: oversizeRatio > 2 ? 'URGENT: Resize image' : 'Consider resizing'
                });
            }
        }
        
        // Sort by potential savings
        analysis.sort((a, b) => 
            parseFloat(b.potentialSaving) - parseFloat(a.potentialSaving)
        );
        
        console.log('📊 Image Analysis Results:\n');
        console.log(`Total images: ${displayedImages.length}`);
        console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
        console.log(`Potential savings: ${(totalWaste / 1024 / 1024).toFixed(2)}MB\n`);
        
        console.log('🚨 Images needing optimization:\n');
        analysis.slice(0, 10).forEach((img, idx) => {
            console.log(`${idx + 1}. ${img.url}`);
            console.log(`   Current: ${img.currentSize} (${img.dimensions})`);
            console.log(`   Displayed: ${img.displayed}`);
            console.log(`   Oversize: ${img.oversizeRatio}`);
            console.log(`   Save: ${img.potentialSaving}`);
            console.log(`   ${img.recommendation}\n`);
        });
        
        // Check for WebP support
        const hasWebP = imageRequests.some(r => r.contentType === 'image/webp');
        if (!hasWebP) {
            console.log('⚠️  No WebP images found! Converting to WebP could save 25-35%\n');
        }
        
        // Generate optimization script
        const script = `#!/bin/bash
# Generated image optimization script

echo "🖼️  Starting image optimization..."

# Install ImageMagick if not present
if ! command -v convert &> /dev/null; then
    echo "Installing ImageMagick..."
    apt-get update && apt-get install -y imagemagick webp
fi

# Create optimized directory
mkdir -p optimized

# Optimize images
${analysis.slice(0, 10).map(img => {
    const name = img.url.replace(/\.[^.]+$/, '');
    const displayWidth = parseInt(img.displayed.split('x')[0]) * 2; // 2x for retina
    return `
# ${img.url}
echo "Optimizing ${img.url}..."
convert "${decodeURIComponent(img.url)}" -resize ${displayWidth}x -quality 85 "optimized/${name}.jpg"
cwebp -q 85 "optimized/${name}.jpg" -o "optimized/${name}.webp"`;
}).join('\n')}

echo "✅ Optimization complete!"
`;
        
        fs.writeFileSync('optimize-images-priority.sh', script, { mode: 0o755 });
        console.log('📝 Generated optimize-images-priority.sh\n');
        
    } catch (error) {
        console.error('❌ Analysis failed:', error.message);
    } finally {
        await browser.close();
    }
}

analyzeImagesDetail();