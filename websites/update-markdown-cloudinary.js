/**
 * Updates markdown files with Cloudinary image URLs
 * Replaces local image paths with Cloudinary URLs from the mapping file
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Load the Cloudinary upload mapping
const mappingPath = path.join(__dirname, 'cloudinary-upload-mapping.json');
const cloudinaryMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Directory containing markdown files
const projectsDir = path.join(__dirname, 'content/projects');

/**
 * Extract Cloudinary URL from mapping
 * @param {string} localPath - Local path like "apartament-flavia-garden-2024/cam01.jpg"
 * @returns {string|null} - Cloudinary URL or null if not found
 */
function getCloudinaryUrl(localPath) {
  if (!localPath || localPath.startsWith('http')) {
    return localPath; // Already a URL or empty
  }

  // Split the path to get project slug and filename
  const parts = localPath.split('/');
  if (parts.length !== 2) {
    console.warn(`  ⚠️  Unexpected path format: ${localPath}`);
    return localPath;
  }

  const [projectSlug, filename] = parts;

  // Look up in mapping
  if (cloudinaryMapping[projectSlug] && cloudinaryMapping[projectSlug][filename]) {
    return cloudinaryMapping[projectSlug][filename];
  }

  console.warn(`  ⚠️  No Cloudinary URL found for: ${localPath}`);
  return localPath;
}

/**
 * Update a single markdown file
 * @param {string} filePath - Path to markdown file
 */
function updateMarkdownFile(filePath) {
  const filename = path.basename(filePath);
  console.log(`\n📝 Processing: ${filename}`);

  // Read and parse markdown
  const content = fs.readFileSync(filePath, 'utf8');
  const doc = matter(content);

  let updated = false;

  // Update cover_image
  if (doc.data.cover_image) {
    const originalCover = doc.data.cover_image;
    const newCover = getCloudinaryUrl(originalCover);

    if (newCover !== originalCover) {
      console.log(`   ✅ Updated cover_image`);
      doc.data.cover_image = newCover;
      updated = true;
    }
  }

  // Update images array
  if (doc.data.images && Array.isArray(doc.data.images)) {
    const originalCount = doc.data.images.length;
    let updatedCount = 0;

    doc.data.images = doc.data.images.map(imagePath => {
      const newPath = getCloudinaryUrl(imagePath);
      if (newPath !== imagePath) {
        updatedCount++;
      }
      return newPath;
    });

    if (updatedCount > 0) {
      console.log(`   ✅ Updated ${updatedCount}/${originalCount} images`);
      updated = true;
    }
  }

  if (updated) {
    // Write back to file
    const updatedContent = matter.stringify(doc.content, doc.data);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`   💾 File saved with Cloudinary URLs`);
    return true;
  } else {
    console.log(`   ℹ️  No changes needed`);
    return false;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('\n🌥️  UPDATING MARKDOWN FILES WITH CLOUDINARY URLS\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Get all markdown files
  const files = fs.readdirSync(projectsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(projectsDir, f));

  console.log(`📂 Found ${files.length} markdown files\n`);

  let totalUpdated = 0;
  let totalSkipped = 0;

  // Process each file
  files.forEach(file => {
    const wasUpdated = updateMarkdownFile(file);
    if (wasUpdated) {
      totalUpdated++;
    } else {
      totalSkipped++;
    }
  });

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📊 SUMMARY\n');
  console.log(`   ✅ Updated: ${totalUpdated} files`);
  console.log(`   ⏭️  Skipped: ${totalSkipped} files`);
  console.log(`   📁 Total: ${files.length} files\n`);

  if (totalUpdated > 0) {
    console.log('✅ All markdown files updated with Cloudinary URLs!\n');
    console.log('Next steps:');
    console.log('   1. Review the updated files');
    console.log('   2. Create sync script to generate project-config.js');
    console.log('   3. Deploy to Netlify\n');
  } else {
    console.log('ℹ️  No files needed updating\n');
  }
}

// Run the script
main();
