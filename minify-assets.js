#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple CSS minification
function minifyCSS(css) {
    return css
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove unnecessary whitespace
        .replace(/\s+/g, ' ')
        // Remove whitespace around selectors
        .replace(/\s*([{}:;,])\s*/g, '$1')
        // Remove trailing semicolons before closing braces
        .replace(/;}/g, '}')
        // Remove quotes from url()
        .replace(/url\(["']?([^"')]+)["']?\)/g, 'url($1)')
        // Trim
        .trim();
}

// Simple JS minification (basic - for production use a proper minifier)
function minifyJS(js) {
    // This is a very basic minification - in production, use terser or uglify-js
    return js
        // Remove single-line comments (careful with URLs)
        .replace(/\/\/(?![^\n]*:\/\/).*$/gm, '')
        // Remove multi-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove unnecessary whitespace
        .replace(/\s+/g, ' ')
        // Remove whitespace around operators
        .replace(/\s*([=+\-*/%<>!&|,;:?{}()\[\]])\s*/g, '$1')
        // Trim
        .trim();
}

// Process a single file
function processFile(filePath, outputPath) {
    const ext = path.extname(filePath).toLowerCase();
    const content = fs.readFileSync(filePath, 'utf8');
    let minified;

    if (ext === '.css') {
        minified = minifyCSS(content);
    } else if (ext === '.js') {
        minified = minifyJS(content);
    } else {
        console.log(`Skipping ${filePath} - not a CSS or JS file`);
        return;
    }

    fs.writeFileSync(outputPath, minified);
    const originalSize = Buffer.byteLength(content, 'utf8');
    const minifiedSize = Buffer.byteLength(minified, 'utf8');
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
    
    console.log(`Minified ${path.basename(filePath)}: ${originalSize} → ${minifiedSize} bytes (${reduction}% reduction)`);
}

// Find all website directories
const websitesDir = __dirname;
const websites = fs.readdirSync(websitesDir)
    .filter(dir => dir.match(/^website\d+-/))
    .map(dir => path.join(websitesDir, dir));

// Add the main directory files
const mainFiles = [
    'translations.js',
    'language-switcher-v2.js',
    'project-config.js',
    'performance-optimizer.js',
    'mobile-optimizations.css'
].map(file => path.join(websitesDir, file));

// Process each website
websites.forEach(websiteDir => {
    console.log(`\nProcessing ${path.basename(websiteDir)}...`);
    
    // Find CSS and JS files
    const files = fs.readdirSync(websiteDir)
        .filter(file => file.match(/\.(css|js)$/) && !file.includes('.min.'))
        .map(file => path.join(websiteDir, file));
    
    files.forEach(file => {
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const outputPath = path.join(path.dirname(file), `${baseName}.min${ext}`);
        processFile(file, outputPath);
    });
});

// Process main files
console.log('\nProcessing shared files...');
mainFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const outputPath = path.join(path.dirname(file), `${baseName}.min${ext}`);
        processFile(file, outputPath);
    }
});

console.log('\nMinification complete!');
console.log('\nTo use minified files, update your HTML files to reference .min.css and .min.js files.');
console.log('For production deployment, consider using a build tool like webpack or rollup for better optimization.');