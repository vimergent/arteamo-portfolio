// Temporary fix to remove query parameters from image URLs
// This prevents the redirect loop issue

(function() {
    // Store original Image constructor
    const OriginalImage = window.Image;
    
    // Override Image constructor
    window.Image = function() {
        const img = new OriginalImage();
        
        // Store original src setter
        const originalSrcSetter = img.__lookupSetter__('src');
        
        // Override src setter
        Object.defineProperty(img, 'src', {
            set: function(value) {
                // Remove query parameters that cause redirect loops
                if (value && value.includes('?q=') && value.includes('&fm=')) {
                    value = value.split('?')[0];
                }
                originalSrcSetter.call(this, value);
            },
            get: function() {
                return this.getAttribute('src');
            }
        });
        
        return img;
    };
    
    // Also fix existing img elements
    document.addEventListener('DOMContentLoaded', function() {
        fixExistingImages();
    });
    
    // Fix images added dynamically
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                fixExistingImages();
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    function fixExistingImages() {
        const images = document.querySelectorAll('img[src*="?q="][src*="&fm="]');
        images.forEach(img => {
            const cleanSrc = img.src.split('?')[0];
            if (img.src !== cleanSrc) {
                img.src = cleanSrc;
            }
        });
    }
})();