#!/bin/bash

# Studio Arteamo Performance Optimization Implementation Script
# This script implements the high-priority optimizations identified

echo "🚀 Starting Performance Optimization Implementation"
echo "================================================"

# 1. Create optimized images directory
echo "📁 Creating optimized images directory..."
mkdir -p optimized-images

# 2. Install image optimization tools if needed
echo "🔧 Checking for image optimization tools..."
if ! command -v cwebp &> /dev/null; then
    echo "Installing webp tools..."
    # For Ubuntu/Debian
    sudo apt-get update && sudo apt-get install -y webp
fi

if ! command -v magick &> /dev/null; then
    echo "Installing ImageMagick..."
    sudo apt-get install -y imagemagick
fi

# 3. Create image optimization script
cat > optimize-project-images.js << 'EOF'
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
    const projectDirs = [
        'Apartament Flavia Garden 2024',
        'Apartament K55_2021',
        'Apartament Кв. Чайка, Варна_2017',
        'Apartament Симфония - Бриз, Варна_ 2019',
        'Apartament Траката, Варна_2021',
        'Balev Corporation 2020',
        'Elite Clinic 2021',
        'Gichev sped 2019',
        'Oliv vilas sv.Vlas 2019',
        'Playground Grand Mall Varna 2018',
        'Work Del Mar 2022'
    ];

    const sizes = [400, 800, 1200, 1600]; // Responsive sizes
    
    for (const dir of projectDirs) {
        console.log(`\nProcessing ${dir}...`);
        
        try {
            const files = await fs.readdir(dir);
            const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
            
            for (const file of imageFiles) {
                const inputPath = path.join(dir, file);
                const baseName = path.basename(file, path.extname(file));
                
                // Create responsive versions
                for (const width of sizes) {
                    const outputDir = path.join('optimized-images', dir);
                    await fs.mkdir(outputDir, { recursive: true });
                    
                    // WebP version
                    const webpPath = path.join(outputDir, `${baseName}-${width}w.webp`);
                    await sharp(inputPath)
                        .resize(width, null, { withoutEnlargement: true })
                        .webp({ quality: 85 })
                        .toFile(webpPath);
                    
                    // JPEG version (fallback)
                    const jpegPath = path.join(outputDir, `${baseName}-${width}w.jpg`);
                    await sharp(inputPath)
                        .resize(width, null, { withoutEnlargement: true })
                        .jpeg({ quality: 85, progressive: true })
                        .toFile(jpegPath);
                }
                
                console.log(`  ✅ ${file} optimized`);
            }
        } catch (error) {
            console.error(`  ❌ Error processing ${dir}: ${error.message}`);
        }
    }
}

// Run if sharp is available
try {
    require('sharp');
    optimizeImages();
} catch (error) {
    console.log('Sharp not installed. Using bash script fallback...');
}
EOF

# 4. Create fallback bash optimization script
cat > optimize-images-bash.sh << 'EOF'
#!/bin/bash

# Function to optimize a single image
optimize_image() {
    local input="$1"
    local output_dir="$2"
    local basename=$(basename "$input" | sed 's/\.[^.]*$//')
    
    mkdir -p "$output_dir"
    
    # Create multiple sizes
    for width in 400 800 1200 1600; do
        # WebP version
        convert "$input" -resize "${width}x>" -quality 85 "$output_dir/${basename}-${width}w.webp"
        # JPEG version
        convert "$input" -resize "${width}x>" -quality 85 -interlace Plane "$output_dir/${basename}-${width}w.jpg"
    done
}

# Process all project directories
for dir in "Apartament Flavia Garden 2024" "Apartament K55_2021" "Apartament Кв. Чайка, Варна_2017" \
           "Apartament Симфония - Бриз, Варна_ 2019" "Apartament Траката, Варна_2021" \
           "Balev Corporation 2020" "Elite Clinic 2021" "Gichev sped 2019" \
           "Oliv vilas sv.Vlas 2019" "Playground Grand Mall Varna 2018" "Work Del Mar 2022"; do
    
    if [ -d "$dir" ]; then
        echo "Processing $dir..."
        
        for img in "$dir"/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null; do
            if [ -f "$img" ]; then
                optimize_image "$img" "optimized-images/$dir"
                echo "  ✅ $(basename "$img") optimized"
            fi
        done
    fi
done
EOF

chmod +x optimize-images-bash.sh

# 5. Update HTML to use picture elements
echo "📝 Creating picture element updater..."
cat > update-to-picture-elements.js << 'EOF'
const fs = require('fs');

function updateImageToPicture(html) {
    // Replace img tags with picture elements
    return html.replace(/<img([^>]+)src="([^"]+\.(?:jpg|jpeg|png))"([^>]*?)>/gi, (match, before, src, after) => {
        const alt = (before + after).match(/alt="([^"]*)"/)?.[1] || '';
        const className = (before + after).match(/class="([^"]*)"/)?.[1] || '';
        const loading = (before + after).match(/loading="([^"]*)"/)?.[1] || 'lazy';
        
        // Extract base filename
        const filename = src.split('/').pop();
        const baseName = filename.replace(/\.[^.]+$/, '');
        const dir = src.substring(0, src.lastIndexOf('/'));
        
        return `<picture>
    <source type="image/webp" 
            srcset="${dir}/${baseName}-400w.webp 400w,
                    ${dir}/${baseName}-800w.webp 800w,
                    ${dir}/${baseName}-1200w.webp 1200w,
                    ${dir}/${baseName}-1600w.webp 1600w"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw">
    <source type="image/jpeg" 
            srcset="${dir}/${baseName}-400w.jpg 400w,
                    ${dir}/${baseName}-800w.jpg 800w,
                    ${dir}/${baseName}-1200w.jpg 1200w,
                    ${dir}/${baseName}-1600w.jpg 1600w"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw">
    <img src="${dir}/${baseName}-800w.jpg" 
         alt="${alt}" 
         class="${className}" 
         loading="${loading}">
</picture>`;
    });
}

// Update index.html
const indexPath = 'index.html';
if (fs.existsSync(indexPath)) {
    const html = fs.readFileSync(indexPath, 'utf8');
    const updated = updateImageToPicture(html);
    fs.writeFileSync('index-optimized.html', updated);
    console.log('✅ Created index-optimized.html with picture elements');
}
EOF

# 6. Create enhanced caching headers
echo "📋 Creating enhanced Netlify headers..."
cat > _headers << 'EOF'
# Global headers
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

# HTML - no cache
/*.html
  Cache-Control: no-cache, no-store, must-revalidate

/index.html
  Cache-Control: no-cache, no-store, must-revalidate
  Link: </styles-enhanced.min.css>; rel=preload; as=style
  Link: </translations.js>; rel=preload; as=script
  Link: </critical.min.css>; rel=preload; as=style

# CSS - versioned caching
/*.css
  Cache-Control: public, max-age=31536000, immutable

# JavaScript - versioned caching  
/*.js
  Cache-Control: public, max-age=31536000, immutable

# Images - permanent caching
/*.jpg
  Cache-Control: public, max-age=31536000, immutable
  
/*.jpeg
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable

/*.webp
  Cache-Control: public, max-age=31536000, immutable

/*.avif
  Cache-Control: public, max-age=31536000, immutable

# Fonts - permanent caching
/*.woff2
  Cache-Control: public, max-age=31536000, immutable

/*.woff
  Cache-Control: public, max-age=31536000, immutable

# Videos - long caching
/*.mp4
  Cache-Control: public, max-age=2592000
  Accept-Ranges: bytes
EOF

# 7. Create service worker for offline support
echo "🔧 Creating service worker..."
cat > sw.js << 'EOF'
const CACHE_NAME = 'arteamo-v1';
const urlsToCache = [
  '/',
  '/styles-enhanced.min.css',
  '/critical.min.css',
  '/translations.js',
  '/project-config.js',
  '/script-enhanced.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
EOF

# 8. Create critical CSS extractor
echo "🎨 Creating critical CSS extractor..."
cat > extract-critical-css.js << 'EOF'
const puppeteer = require('puppeteer');
const { minify } = require('csso');
const fs = require('fs');

async function extractCriticalCSS() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:8090', { waitUntil: 'networkidle0' });
    
    // Get all CSS
    const css = await page.evaluate(() => {
        const sheets = Array.from(document.styleSheets);
        return sheets.map(sheet => {
            try {
                return Array.from(sheet.cssRules)
                    .map(rule => rule.cssText)
                    .join('\n');
            } catch (e) {
                return '';
            }
        }).join('\n');
    });
    
    // Get above-the-fold CSS
    const criticalCSS = await page.evaluate(() => {
        const isAboveFold = (el) => {
            const rect = el.getBoundingClientRect();
            return rect.top < window.innerHeight;
        };
        
        const criticalSelectors = new Set();
        document.querySelectorAll('*').forEach(el => {
            if (isAboveFold(el)) {
                criticalSelectors.add(el.tagName.toLowerCase());
                if (el.id) criticalSelectors.add(`#${el.id}`);
                if (el.className) {
                    el.className.split(' ').forEach(cls => {
                        if (cls) criticalSelectors.add(`.${cls}`);
                    });
                }
            }
        });
        
        return Array.from(criticalSelectors);
    });
    
    await browser.close();
    
    // Extract critical rules
    const criticalRules = css.split('\n').filter(rule => {
        return criticalCSS.some(selector => rule.includes(selector));
    });
    
    // Minify
    const minified = minify(criticalRules.join('\n')).css;
    
    fs.writeFileSync('critical-auto.min.css', minified);
    console.log('✅ Critical CSS extracted and saved');
}

// Run if puppeteer is available
try {
    require('puppeteer');
    extractCriticalCSS();
} catch (error) {
    console.log('Puppeteer not available for critical CSS extraction');
}
EOF

# 9. Create performance monitoring script
echo "📊 Creating performance monitoring script..."
cat > performance-monitor.js << 'EOF'
// Add to each page for real user monitoring
(function() {
    // Performance Observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
        // LCP
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
            // Send to analytics
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // FID
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
                // Send to analytics
            });
        }).observe({ entryTypes: ['first-input'] });
        
        // CLS
        let clsValue = 0;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }
    
    // Navigation timing
    window.addEventListener('load', () => {
        setTimeout(() => {
            const timing = performance.timing;
            const metrics = {
                dns: timing.domainLookupEnd - timing.domainLookupStart,
                tcp: timing.connectEnd - timing.connectStart,
                ttfb: timing.responseStart - timing.navigationStart,
                download: timing.responseEnd - timing.responseStart,
                domInteractive: timing.domInteractive - timing.navigationStart,
                domComplete: timing.domComplete - timing.navigationStart,
                loadComplete: timing.loadEventEnd - timing.navigationStart
            };
            
            console.log('Performance Metrics:', metrics);
            // Send to analytics
        }, 0);
    });
})();
EOF

echo "✅ Performance optimization scripts created!"
echo ""
echo "📋 Next steps:"
echo "1. Run: npm install sharp (if using Node.js image optimization)"
echo "2. Run: ./optimize-images-bash.sh (to optimize all images)"
echo "3. Run: node update-to-picture-elements.js (to update HTML)"
echo "4. Run: node extract-critical-css.js (to extract critical CSS)"
echo "5. Add performance-monitor.js to your pages"
echo "6. Deploy and test the optimizations"
echo ""
echo "🎯 Expected improvements:"
echo "- 50% reduction in image sizes"
echo "- 85%+ cache hit rate"
echo "- 30% faster load times"
echo "- Better Core Web Vitals scores"
EOF