#!/bin/bash

# Single project optimization script
# Usage: ./optimize-single-project.sh "Project Name"

if [ $# -eq 0 ]; then
    echo "Usage: $0 \"Project Folder Name\""
    echo "Example: $0 \"Apartament Flavia Garden 2024\""
    exit 1
fi

PROJECT="$1"

if [ ! -d "$PROJECT" ]; then
    echo "Error: Project folder '$PROJECT' not found"
    exit 1
fi

echo "🖼️  Optimizing images for: $PROJECT"

# Create output directories
mkdir -p "optimized/$PROJECT/images"
mkdir -p "optimized/$PROJECT/webp"

# Process each image
for img in "$PROJECT"/*.jpg "$PROJECT"/*.jpeg "$PROJECT"/*.png; do
    [ -f "$img" ] || continue
    
    filename=$(basename "$img")
    name="${filename%.*}"
    
    echo "📸 Processing $filename..."
    
    # Get dimensions
    dimensions=$(identify -format "%wx%h" "$img" 2>/dev/null)
    width=${dimensions%x*}
    
    # Optimize main image (max 2000px wide)
    if [ $width -gt 2000 ]; then
        convert "$img" \
            -resize "2000x>" \
            -quality 90 \
            -strip \
            -interlace Plane \
            -colorspace sRGB \
            "optimized/$PROJECT/images/${name}.jpg"
    else
        convert "$img" \
            -quality 90 \
            -strip \
            -interlace Plane \
            -colorspace sRGB \
            "optimized/$PROJECT/images/${name}.jpg"
    fi
    
    # Create WebP
    cwebp -q 88 -m 6 "optimized/$PROJECT/images/${name}.jpg" -o "optimized/$PROJECT/webp/${name}.webp" 2>/dev/null
    
    # Show results
    original_size=$(stat -c%s "$img" 2>/dev/null)
    optimized_size=$(stat -c%s "optimized/$PROJECT/images/${name}.jpg" 2>/dev/null)
    webp_size=$(stat -c%s "optimized/$PROJECT/webp/${name}.webp" 2>/dev/null)
    
    echo "  Original: $(numfmt --to=iec $original_size)"
    echo "  Optimized: $(numfmt --to=iec $optimized_size)"
    echo "  WebP: $(numfmt --to=iec $webp_size)"
    echo ""
done

echo "✅ Optimization complete for $PROJECT"
echo "   Images saved to: optimized/$PROJECT/"