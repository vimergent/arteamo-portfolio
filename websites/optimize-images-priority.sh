#!/bin/bash
# Generated image optimization script

echo "🖼️  Starting image optimization..."

# Install ImageMagick if not present
if ! command -v convert &> /dev/null; then
    echo "Installing ImageMagick..."
    apt-get update && apt-get install -y imagemagick webp
fi

# Create optimized directory
mkdir -p optimized

# Optimize images

# Vladi%20%284%29.jpg
echo "Optimizing Vladi%20%284%29.jpg..."
convert "Vladi (4).jpg" -resize 870x -quality 85 "optimized/Vladi%20%284%29.jpg"
cwebp -q 85 "optimized/Vladi%20%284%29.jpg" -o "optimized/Vladi%20%284%29.webp"

# Vladi%20%282%29.jpg
echo "Optimizing Vladi%20%282%29.jpg..."
convert "Vladi (2).jpg" -resize 568x -quality 85 "optimized/Vladi%20%282%29.jpg"
cwebp -q 85 "optimized/Vladi%20%282%29.jpg" -o "optimized/Vladi%20%282%29.webp"

# 1-1-2000x1200.jpg
echo "Optimizing 1-1-2000x1200.jpg..."
convert "1-1-2000x1200.jpg" -resize 568x -quality 85 "optimized/1-1-2000x1200.jpg"
cwebp -q 85 "optimized/1-1-2000x1200.jpg" -o "optimized/1-1-2000x1200.webp"

# 1-1-2000x1200.jpg
echo "Optimizing 1-1-2000x1200.jpg..."
convert "1-1-2000x1200.jpg" -resize 870x -quality 85 "optimized/1-1-2000x1200.jpg"
cwebp -q 85 "optimized/1-1-2000x1200.jpg" -o "optimized/1-1-2000x1200.webp"

# 1%20%281%29.jpg
echo "Optimizing 1%20%281%29.jpg..."
convert "1 (1).jpg" -resize 568x -quality 85 "optimized/1%20%281%29.jpg"
cwebp -q 85 "optimized/1%20%281%29.jpg" -o "optimized/1%20%281%29.webp"

# 1%20%281%29.jpg
echo "Optimizing 1%20%281%29.jpg..."
convert "1 (1).jpg" -resize 870x -quality 85 "optimized/1%20%281%29.jpg"
cwebp -q 85 "optimized/1%20%281%29.jpg" -o "optimized/1%20%281%29.webp"

# Alex%20%281%29.jpg
echo "Optimizing Alex%20%281%29.jpg..."
convert "Alex (1).jpg" -resize 568x -quality 85 "optimized/Alex%20%281%29.jpg"
cwebp -q 85 "optimized/Alex%20%281%29.jpg" -o "optimized/Alex%20%281%29.webp"

# cam01.jpg
echo "Optimizing cam01.jpg..."
convert "cam01.jpg" -resize 870x -quality 85 "optimized/cam01.jpg"
cwebp -q 85 "optimized/cam01.jpg" -o "optimized/cam01.webp"

# Cam02.jpg
echo "Optimizing Cam02.jpg..."
convert "Cam02.jpg" -resize 568x -quality 85 "optimized/Cam02.jpg"
cwebp -q 85 "optimized/Cam02.jpg" -o "optimized/Cam02.webp"

# Balev%20%281%29.jpg
echo "Optimizing Balev%20%281%29.jpg..."
convert "Balev (1).jpg" -resize 870x -quality 85 "optimized/Balev%20%281%29.jpg"
cwebp -q 85 "optimized/Balev%20%281%29.jpg" -o "optimized/Balev%20%281%29.webp"

echo "✅ Optimization complete!"
