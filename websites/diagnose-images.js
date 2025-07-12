// Diagnostic script to check image quality issues
console.log('🔍 Diagnosing image quality on Studio Arteamo...\n');

// Wait for page to load
window.addEventListener('load', () => {
    // Find all project images
    const projectImages = document.querySelectorAll('.project-image img');
    console.log(`Found ${projectImages.length} project images\n`);
    
    projectImages.forEach((img, index) => {
        console.log(`Image ${index + 1}:`);
        console.log(`  Source: ${img.src}`);
        console.log(`  Natural size: ${img.naturalWidth}x${img.naturalHeight}`);
        console.log(`  Display size: ${img.clientWidth}x${img.clientHeight}`);
        console.log(`  Loading: ${img.loading}`);
        
        // Check computed styles
        const styles = window.getComputedStyle(img);
        console.log(`  Computed styles:`);
        console.log(`    - filter: ${styles.filter}`);
        console.log(`    - opacity: ${styles.opacity}`);
        console.log(`    - transform: ${styles.transform}`);
        console.log(`    - image-rendering: ${styles.imageRendering}`);
        console.log(`    - object-fit: ${styles.objectFit}`);
        
        // Check parent container
        const container = img.closest('.project-image');
        if (container) {
            const containerStyles = window.getComputedStyle(container);
            console.log(`  Container size: ${container.clientWidth}x${container.clientHeight}`);
            console.log(`  Container aspect-ratio: ${containerStyles.aspectRatio}`);
        }
        
        // Check if image is upscaled
        if (img.naturalWidth > 0 && img.clientWidth > img.naturalWidth) {
            console.log(`  ⚠️ UPSCALED: Image displayed ${Math.round(img.clientWidth / img.naturalWidth * 100)}% of natural size`);
        }
        
        // Check file size and format
        if (img.src.includes('.jpg') || img.src.includes('.jpeg')) {
            console.log(`  Format: JPEG`);
        } else if (img.src.includes('.webp')) {
            console.log(`  Format: WebP`);
        }
        
        console.log('');
    });
    
    // Check for any global CSS affecting images
    const allStyles = Array.from(document.styleSheets);
    const imageRules = [];
    
    allStyles.forEach(sheet => {
        try {
            const rules = Array.from(sheet.cssRules || []);
            rules.forEach(rule => {
                if (rule.selectorText && 
                    (rule.selectorText.includes('.project-image') || 
                     rule.selectorText.includes('img'))) {
                    if (rule.style.filter || rule.style.imageRendering || rule.style.transform) {
                        imageRules.push({
                            selector: rule.selectorText,
                            filter: rule.style.filter,
                            imageRendering: rule.style.imageRendering,
                            transform: rule.style.transform
                        });
                    }
                }
            });
        } catch (e) {
            // Cross-origin stylesheets
        }
    });
    
    if (imageRules.length > 0) {
        console.log('📋 CSS Rules affecting images:');
        imageRules.forEach(rule => {
            console.log(`  ${rule.selector}:`);
            if (rule.filter) console.log(`    - filter: ${rule.filter}`);
            if (rule.imageRendering) console.log(`    - image-rendering: ${rule.imageRendering}`);
            if (rule.transform) console.log(`    - transform: ${rule.transform}`);
        });
    }
});