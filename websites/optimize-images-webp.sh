#!/bin/bash

# Image optimization script with WebP conversion
# This script optimizes images and creates WebP versions

echo "🖼️  Starting comprehensive image optimization..."

# Install required tools
if ! command -v convert &> /dev/null || ! command -v cwebp &> /dev/null; then
    echo "Installing ImageMagick and WebP tools..."
    apt-get update && apt-get install -y imagemagick webp
fi

# Create optimized directories
mkdir -p optimized/images
mkdir -p optimized/webp

# Function to optimize a single image
optimize_image() {
    local input="$1"
    local filename=$(basename "$input")
    local name="${filename%.*}"
    local ext="${filename##*.}"
    
    # Skip if already optimized
    if [[ "$input" == *"optimized"* ]]; then
        return
    fi
    
    # Get image dimensions
    local dimensions=$(identify -format "%wx%h" "$input" 2>/dev/null)
    if [ -z "$dimensions" ]; then
        echo "⚠️  Skipping $filename (cannot read dimensions)"
        return
    fi
    
    local width=${dimensions%x*}
    local height=${dimensions#*x}
    
    # Calculate target width (max 2000px for large images, proportional scaling)
    local target_width=$width
    if [ $width -gt 2000 ]; then
        target_width=2000
    fi
    
    echo "📸 Processing $filename ($dimensions)..."
    
    # Create optimized JPEG
    convert "$input" \
        -resize "${target_width}x>" \
        -quality 85 \
        -strip \
        -interlace Plane \
        -gaussian-blur 0.05 \
        -colorspace sRGB \
        "optimized/images/${name}.jpg"
    
    # Create WebP version
    cwebp -q 85 -m 6 "optimized/images/${name}.jpg" -o "optimized/webp/${name}.webp" 2>/dev/null
    
    # Compare sizes
    local original_size=$(stat -f%z "$input" 2>/dev/null || stat -c%s "$input")
    local optimized_size=$(stat -f%z "optimized/images/${name}.jpg" 2>/dev/null || stat -c%s "optimized/images/${name}.jpg")
    local webp_size=$(stat -f%z "optimized/webp/${name}.webp" 2>/dev/null || stat -c%s "optimized/webp/${name}.webp")
    
    local saved=$((original_size - optimized_size))
    local saved_webp=$((original_size - webp_size))
    local percent=$((saved * 100 / original_size))
    local percent_webp=$((saved_webp * 100 / original_size))
    
    echo "  ✅ Original: $(numfmt --to=iec $original_size)"
    echo "  ✅ Optimized: $(numfmt --to=iec $optimized_size) (saved ${percent}%)"
    echo "  ✅ WebP: $(numfmt --to=iec $webp_size) (saved ${percent_webp}%)"
    echo ""
}

# Find all images in project directories
echo "🔍 Finding all images..."

# Process images in main directory
for img in *.jpg *.jpeg *.png *.JPG *.JPEG *.PNG 2>/dev/null; do
    [ -f "$img" ] && optimize_image "$img"
done

# Process images in project folders
for dir in */; do
    if [ -d "$dir" ]; then
        echo "📁 Processing folder: $dir"
        for img in "$dir"*.jpg "$dir"*.jpeg "$dir"*.png "$dir"*.JPG "$dir"*.JPEG "$dir"*.PNG 2>/dev/null; do
            [ -f "$img" ] && optimize_image "$img"
        done
    fi
done

# Create picture elements HTML helper
cat > optimized/picture-elements.html << 'EOF'
<!-- Example of how to use WebP with fallback -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img src="image.jpg" alt="Description" loading="lazy">
</picture>

<!-- For background images in CSS -->
<style>
.webp .hero {
    background-image: url('hero.webp');
}
.no-webp .hero {
    background-image: url('hero.jpg');
}
</style>

<script>
// WebP detection
function checkWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

checkWebP(function(support) {
    if (support) {
        document.documentElement.classList.add('webp');
    } else {
        document.documentElement.classList.add('no-webp');
    }
});
</script>
EOF

# Summary
echo "🎉 Optimization complete!"
echo ""
echo "📊 Summary:"
echo "- Optimized images saved to: optimized/images/"
echo "- WebP versions saved to: optimized/webp/"
echo "- Example HTML code saved to: optimized/picture-elements.html"
echo ""
echo "🚀 Next steps:"
echo "1. Review optimized images for quality"
echo "2. Replace original images with optimized versions"
echo "3. Implement WebP with fallback using <picture> elements"
echo "4. Update lazy loading implementation"