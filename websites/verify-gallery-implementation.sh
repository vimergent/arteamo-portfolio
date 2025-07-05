#!/bin/bash

echo "🔍 Verifying Gallery Implementation in All Websites"
echo "=================================================="
echo

# Check each website for the gallery function
websites=(
    "website1-minimalist"
    "website2-dark-luxury"
    "website3-magazine"
    "website4-interactive-grid"
    "website5-fancy"
    "website6-coastal"
    "website7-noir"
    "website8-biophilic"
    "website9-makeover"
    "website10-magazine-v2"
    "website11-japandi"
    "website12-bulgarian"
    "website13-retro"
    "website14-zen"
    "website15-ascii"
)

success_count=0
total_count=${#websites[@]}

for website in "${websites[@]}"; do
    echo -n "Checking $website... "
    
    # Check if openProjectGallery function exists
    if grep -q "function openProjectGallery" "$website/index.html" 2>/dev/null || \
       grep -q "function openProjectGallery" "$website/script.js" 2>/dev/null; then
        
        # Count onclick handlers
        onclick_count=$(grep -o "onclick.*openProjectGallery" "$website/index.html" 2>/dev/null | wc -l)
        
        echo "✅ Gallery function found, $onclick_count onclick handlers"
        ((success_count++))
    else
        echo "❌ Gallery function NOT found"
    fi
done

echo
echo "=================================================="
echo "Summary: $success_count/$total_count websites have gallery implementation"
echo "Success rate: $(( success_count * 100 / total_count ))%"

# Check gallery template
echo
echo "Checking gallery template..."
if [ -f "gallery-template.html" ]; then
    echo "✅ gallery-template.html exists"
    
    # Check for project lists
    if grep -q "projectImageLists" "gallery-template.html"; then
        echo "✅ Project image lists configured"
    fi
else
    echo "❌ gallery-template.html NOT found"
fi