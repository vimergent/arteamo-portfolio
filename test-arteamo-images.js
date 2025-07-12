const puppeteer = require('puppeteer');

async function testArteamoImages() {
    console.log('Testing arteamo.net images and galleries...\n');
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        await page.setCacheEnabled(false);
        
        // Set viewport
        await page.setViewport({ width: 1920, height: 1080 });
        
        // Go to the site
        console.log('Loading https://arteamo.net...');
        await page.goto('https://arteamo.net', { 
            waitUntil: 'networkidle2',
            timeout: 30000 
        });
        
        // Check for project images
        console.log('\nChecking for project images...');
        const projectImages = await page.evaluate(() => {
            const images = document.querySelectorAll('.project-item img, .project-thumbnail img, img[src*="Apartament"], img[src*="Elite"], img[src*="Balev"]');
            return Array.from(images).map(img => ({
                src: img.src,
                alt: img.alt,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                displayed: img.offsetWidth > 0 && img.offsetHeight > 0
            }));
        });
        
        console.log(`Found ${projectImages.length} project images`);
        
        // Check which images are loaded
        const loadedImages = projectImages.filter(img => img.naturalWidth > 0);
        const displayedImages = projectImages.filter(img => img.displayed);
        
        console.log(`- ${loadedImages.length} images loaded successfully`);
        console.log(`- ${displayedImages.length} images are visible`);
        
        // Show first few image URLs
        console.log('\nFirst 5 image URLs:');
        projectImages.slice(0, 5).forEach(img => {
            console.log(`- ${img.src}`);
            console.log(`  Status: ${img.naturalWidth > 0 ? 'Loaded' : 'Failed'}, Displayed: ${img.displayed}`);
        });
        
        // Check for specific project folders
        console.log('\nChecking specific project images...');
        const testProjects = [
            'Apartament Flavia Garden 2024',
            'Elite Clinic 2021',
            'Balev Corporation 2020'
        ];
        
        for (const project of testProjects) {
            const response = await page.evaluate(async (proj) => {
                const testUrl = `${window.location.origin}/${encodeURIComponent(proj)}/cam01.jpg`;
                try {
                    const resp = await fetch(testUrl, { method: 'HEAD' });
                    return { project: proj, url: testUrl, status: resp.status };
                } catch (e) {
                    return { project: proj, url: testUrl, error: e.message };
                }
            }, project);
            
            console.log(`- ${response.project}: ${response.status || response.error}`);
        }
        
        // Check gallery functionality
        console.log('\nChecking gallery functionality...');
        const firstProject = await page.$('.project-item');
        if (firstProject) {
            console.log('Clicking on first project...');
            await firstProject.click();
            await page.waitForTimeout(2000);
            
            // Check if gallery opened
            const galleryVisible = await page.evaluate(() => {
                const gallery = document.querySelector('.gallery-modal, .gallery-container, [class*="gallery"]');
                return gallery && (gallery.offsetWidth > 0 || gallery.style.display !== 'none');
            });
            
            console.log(`Gallery visible: ${galleryVisible}`);
        }
        
        // Check console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });
        
        await page.reload();
        await page.waitForTimeout(3000);
        
        if (consoleErrors.length > 0) {
            console.log('\nConsole errors found:');
            consoleErrors.forEach(err => console.log(`- ${err}`));
        }
        
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await browser.close();
    }
}

testArteamoImages().catch(console.error);