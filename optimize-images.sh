#!/bin/bash

# Image optimization script for Studio Arteamo portfolio
# This script provides recommendations for image optimization

echo "========================================="
echo "Image Optimization Recommendations"
echo "========================================="
echo ""

# Find large images
echo "1. LARGE IMAGES THAT NEED OPTIMIZATION:"
echo "----------------------------------------"
find . -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.bmp" \) -size +500k -exec ls -lh {} \; | awk '{print $5 "\t" $9}' | sort -hr | head -20

echo ""
echo "2. OPTIMIZATION RECOMMENDATIONS:"
echo "----------------------------------------"
echo "• Convert BMP files to JPG/PNG format"
echo "• Resize images larger than 2000px wide"
echo "• Compress JPG files to 85% quality"
echo "• Use WebP format for modern browsers"
echo ""

echo "3. SUGGESTED COMMANDS:"
echo "----------------------------------------"
echo "# Install ImageMagick if not installed:"
echo "sudo apt-get install imagemagick"
echo ""
echo "# Convert BMP to JPG:"
echo "convert image.bmp -quality 85 image.jpg"
echo ""
echo "# Resize large images:"
echo "convert large-image.jpg -resize 1920x1920\\> -quality 85 optimized-image.jpg"
echo ""
echo "# Create WebP versions:"
echo "for img in *.jpg; do cwebp -q 85 \"\$img\" -o \"\${img%.jpg}.webp\"; done"
echo ""

echo "4. IMPLEMENT RESPONSIVE IMAGES:"
echo "----------------------------------------"
echo "Update HTML to use srcset for responsive images:"
echo '<img src="image.jpg" 
     srcset="image-320w.jpg 320w,
             image-640w.jpg 640w,
             image-1280w.jpg 1280w"
     sizes="(max-width: 320px) 280px,
            (max-width: 640px) 600px,
            1200px"
     loading="lazy"
     decoding="async"
     alt="Description">'
echo ""

# Count total images
total_images=$(find . -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.bmp" \) | wc -l)
large_images=$(find . -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.bmp" \) -size +500k | wc -l)

echo "5. SUMMARY:"
echo "----------------------------------------"
echo "Total images: $total_images"
echo "Images over 500KB: $large_images"
echo "Potential size reduction: ~60-70% with optimization"
echo ""
echo "Note: Always keep original images as backups before optimization!"