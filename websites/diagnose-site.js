/**
 * Playwright Site Diagnosis Script
 * Analyzes the deployed site to identify issues
 */

const puppeteer = require('puppeteer');

const SITE_URL = 'https://693dd3708db2690008867c87--arteamo-staging.netlify.app';

async function diagnoseSite() {
  console.log('\n🔍 SITE DIAGNOSIS\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Collect console logs
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({
      type: msg.type(),
      text: msg.text()
    });
  });

  // Collect network errors
  const networkErrors = [];
  page.on('requestfailed', request => {
    networkErrors.push({
      url: request.url(),
      error: request.failure().errorText
    });
  });

  // Collect loaded resources
  const loadedImages = [];
  const failedImages = [];

  page.on('response', async response => {
    const url = response.url();
    if (url.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
      if (response.ok()) {
        loadedImages.push(url);
      } else {
        failedImages.push({
          url,
          status: response.status()
        });
      }
    }
  });

  console.log(`📍 Loading: ${SITE_URL}\n`);

  try {
    await page.goto(SITE_URL, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    console.log('✅ Page loaded successfully\n');

    // Check if project-config.js is loaded
    const hasProjectConfig = await page.evaluate(() => {
      return typeof projectConfig !== 'undefined';
    });

    console.log(`📦 projectConfig loaded: ${hasProjectConfig ? '✅ YES' : '❌ NO'}\n`);

    if (hasProjectConfig) {
      const projectCount = await page.evaluate(() => {
        return Object.keys(projectConfig).length;
      });
      console.log(`📊 Projects in config: ${projectCount}\n`);

      // Get first project for analysis
      const firstProject = await page.evaluate(() => {
        const keys = Object.keys(projectConfig);
        if (keys.length === 0) return null;
        const firstKey = keys[0];
        return {
          key: firstKey,
          data: projectConfig[firstKey]
        };
      });

      if (firstProject) {
        console.log(`🔍 Sample project: ${firstProject.key}`);
        console.log(`   Cover image: ${firstProject.data.coverImage}`);
        console.log(`   Images count: ${firstProject.data.images.length}`);
        console.log(`   First image: ${firstProject.data.images[0]}\n`);
      }
    }

    // Check for image elements
    const imageInfo = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return {
        total: imgs.length,
        withSrc: imgs.filter(img => img.src).length,
        loaded: imgs.filter(img => img.complete && img.naturalHeight !== 0).length,
        broken: imgs.filter(img => img.complete && img.naturalHeight === 0).length,
        samples: imgs.slice(0, 5).map(img => ({
          src: img.src,
          alt: img.alt,
          loaded: img.complete && img.naturalHeight !== 0
        }))
      };
    });

    console.log(`🖼️  Image Elements:`);
    console.log(`   Total <img> tags: ${imageInfo.total}`);
    console.log(`   With src attribute: ${imageInfo.withSrc}`);
    console.log(`   Successfully loaded: ${imageInfo.loaded}`);
    console.log(`   Broken/failed: ${imageInfo.broken}\n`);

    if (imageInfo.samples.length > 0) {
      console.log(`📸 Sample images:`);
      imageInfo.samples.forEach((img, i) => {
        console.log(`   ${i + 1}. ${img.loaded ? '✅' : '❌'} ${img.src}`);
      });
      console.log('');
    }

    // Check for JavaScript errors
    const jsErrors = consoleLogs.filter(log => log.type === 'error');
    if (jsErrors.length > 0) {
      console.log(`⚠️  JavaScript Errors (${jsErrors.length}):`);
      jsErrors.forEach(err => {
        console.log(`   ${err.text}`);
      });
      console.log('');
    }

    // Check for failed network requests
    if (networkErrors.length > 0) {
      console.log(`❌ Failed Network Requests (${networkErrors.length}):`);
      networkErrors.slice(0, 10).forEach(err => {
        console.log(`   ${err.url}`);
        console.log(`   Error: ${err.error}\n`);
      });
    }

    // Check for failed images
    if (failedImages.length > 0) {
      console.log(`🖼️  Failed Images (${failedImages.length}):`);
      failedImages.slice(0, 10).forEach(img => {
        console.log(`   [${img.status}] ${img.url}`);
      });
      console.log('');
    }

    // Check CMS accessibility
    console.log(`🔐 Testing CMS access...\n`);
    const cmsUrl = SITE_URL + '/admin-cms/';

    try {
      await page.goto(cmsUrl, { waitUntil: 'networkidle2', timeout: 15000 });
      console.log(`✅ CMS page loads at: ${cmsUrl}\n`);

      const cmsTitle = await page.title();
      console.log(`   Title: ${cmsTitle}\n`);

      // Check if Identity widget loaded
      const hasNetlifyIdentity = await page.evaluate(() => {
        return typeof netlifyIdentity !== 'undefined';
      });

      console.log(`   Netlify Identity: ${hasNetlifyIdentity ? '✅ Loaded' : '❌ Not loaded'}\n`);

    } catch (cmsError) {
      console.log(`❌ CMS page failed to load: ${cmsError.message}\n`);
    }

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📋 DIAGNOSIS SUMMARY\n');
    console.log(`✅ Site Status: ${hasProjectConfig ? 'Working' : 'Configuration Missing'}`);
    console.log(`🖼️  Images: ${imageInfo.loaded}/${imageInfo.total} loaded`);
    console.log(`❌ Errors: ${jsErrors.length} JS errors, ${networkErrors.length} network errors\n`);

    if (imageInfo.broken > 0 || imageInfo.loaded === 0) {
      console.log('⚠️  ISSUE IDENTIFIED: Images not loading properly');
      console.log('   Likely cause: Image paths don\'t match deployed structure\n');
      console.log('   Solution: Update project-config.js with correct image paths\n');
    }

  } catch (error) {
    console.error(`\n❌ Diagnosis failed: ${error.message}\n`);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

// Run diagnosis
diagnoseSite().catch(console.error);
