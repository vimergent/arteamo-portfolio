/**
 * Project Migration Script: project-config.js → Netlify CMS Markdown
 *
 * This script converts the existing project-config.js structure
 * into individual markdown files for Netlify CMS.
 *
 * Usage: node migrate-projects-to-cms.js
 */

const fs = require('fs');
const path = require('path');

// Load existing project configuration
const projectConfig = require('./project-config.js');

// Output directory for markdown files
const outputDir = path.join(__dirname, 'content', 'projects');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Create a URL-safe slug from project name
 */
function createSlug(projectName) {
  return projectName
    .toLowerCase()
    .replace(/[_,()]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Convert project object to markdown frontmatter
 */
function createMarkdownFile(projectName, project) {
  const slug = createSlug(projectName);
  const year = project.year || 2024;
  const filename = `${year}-${slug}.md`;
  const filepath = path.join(outputDir, filename);

  // Build frontmatter
  const frontmatter = `---
# Project Metadata
name_bg: "${project.name.bg || ''}"
name_en: "${project.name.en || ''}"
name_ru: "${project.name.ru || ''}"
name_es: "${project.name.es || ''}"
name_he: "${project.name.he || ''}"
name_zh: "${project.name.zh || ''}"

# Subtitles
subtitle_bg: "${project.subtitle?.bg || ''}"
subtitle_en: "${project.subtitle?.en || ''}"
subtitle_ru: "${project.subtitle?.ru || ''}"
subtitle_es: "${project.subtitle?.es || ''}"
subtitle_he: "${project.subtitle?.he || ''}"
subtitle_zh: "${project.subtitle?.zh || ''}"

# Descriptions
description_bg: "${project.description?.bg || ''}"
description_en: "${project.description?.en || ''}"
description_ru: "${project.description?.ru || ''}"
description_es: "${project.description?.es || ''}"
description_he: "${project.description?.he || ''}"
description_zh: "${project.description?.zh || ''}"

# Project Details
category: "${project.category || 'residential'}"
year: ${year}
area: ${project.area || 0}
location: "${project.location || 'Варна, България'}"

# Images (local paths - will be migrated to Cloudinary)
cover_image: "${slug}/${project.coverImage}"
images:${project.images.map(img => `\n  - "${slug}/${img}"`).join('')}

# Publishing Settings
published: true
featured: ${project.featured === true}
order: ${project.order || 999}

# Original project key (for reference)
original_key: "${projectName}"
---

# ${project.name.en || projectName}

This project was automatically migrated from the original project-config.js.

## Original Data
- **Original Key**: ${projectName}
- **Year**: ${year}
- **Category**: ${project.category || 'residential'}
- **Area**: ${project.area || 'N/A'} m²
- **Images**: ${project.images.length} photos

## Next Steps
1. Upload images to Cloudinary
2. Update image URLs in this file
3. Add additional content if needed
4. Verify all translations are accurate
`;

  // Write file
  fs.writeFileSync(filepath, frontmatter, 'utf8');
  console.log(`✅ Created: ${filename}`);

  return filename;
}

/**
 * Main migration function
 */
function migrateProjects() {
  console.log('🚀 Starting project migration...\n');
  console.log(`📂 Output directory: ${outputDir}\n`);

  const created = [];

  // Process each project
  for (const [projectName, project] of Object.entries(projectConfig)) {
    const filename = createMarkdownFile(projectName, project);
    created.push(filename);
  }

  console.log(`\n✨ Migration complete!\n`);
  console.log(`📊 Statistics:`);
  console.log(`   - Total projects: ${created.length}`);
  console.log(`   - Output directory: ${outputDir}`);
  console.log(`   - Files created: ${created.join(', ')}\n`);

  console.log(`📋 Next Steps:`);
  console.log(`   1. Review generated markdown files`);
  console.log(`   2. Update image paths after Cloudinary migration`);
  console.log(`   3. Commit files to staging branch`);
  console.log(`   4. Test in Netlify CMS\n`);

  return created;
}

// Run migration if executed directly
if (require.main === module) {
  try {
    migrateProjects();
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

module.exports = { migrateProjects, createSlug };
