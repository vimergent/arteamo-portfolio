// Comprehensive fix for image redirect loops
// This intercepts ALL image requests and removes problematic query parameters

(function() {
    'use strict';
    
    // Function to clean image URLs
    function cleanImageUrl(url) {
        if (!url) return url;
        // Remove query parameters that cause redirect loops
        if (url.includes('?q=') || url.includes('&fm=')) {
            return url.split('?')[0];
        }
        return url;
    }
    
    // Override Image constructor
    const OriginalImage = window.Image;
    window.Image = function(width, height) {
        const img = new OriginalImage(width, height);
        
        // Override src property
        let _src = '';
        Object.defineProperty(img, 'src', {
            get: function() {
                return _src;
            },
            set: function(value) {
                _src = cleanImageUrl(value);
                img.setAttribute('src', _src);
            },
            configurable: true
        });
        
        // Override setAttribute
        const originalSetAttribute = img.setAttribute;
        img.setAttribute = function(name, value) {
            if (name === 'src') {
                value = cleanImageUrl(value);
                _src = value;
            }
            return originalSetAttribute.call(this, name, value);
        };
        
        return img;
    };
    
    // Copy static properties
    Object.setPrototypeOf(window.Image, OriginalImage);
    Object.setPrototypeOf(window.Image.prototype, OriginalImage.prototype);
    
    // Fix createElement for images
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const element = originalCreateElement.call(this, tagName);
        
        if (tagName.toLowerCase() === 'img') {
            let _src = '';
            
            // Override src property
            Object.defineProperty(element, 'src', {
                get: function() {
                    return _src;
                },
                set: function(value) {
                    _src = cleanImageUrl(value);
                    element.setAttribute('src', _src);
                },
                configurable: true
            });
            
            // Override setAttribute
            const originalSetAttribute = element.setAttribute;
            element.setAttribute = function(name, value) {
                if (name === 'src') {
                    value = cleanImageUrl(value);
                    _src = value;
                }
                return originalSetAttribute.call(this, name, value);
            };
        }
        
        return element;
    };
    
    // Fix existing images on page load
    function fixExistingImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && (src.includes('?q=') || src.includes('&fm='))) {
                img.src = cleanImageUrl(src);
            }
        });
    }
    
    // Fix images when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixExistingImages);
    } else {
        fixExistingImages();
    }
    
    // Monitor for dynamically added images
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeName === 'IMG') {
                    const src = node.getAttribute('src');
                    if (src && (src.includes('?q=') || src.includes('&fm='))) {
                        node.src = cleanImageUrl(src);
                    }
                } else if (node.querySelectorAll) {
                    const images = node.querySelectorAll('img');
                    images.forEach(img => {
                        const src = img.getAttribute('src');
                        if (src && (src.includes('?q=') || src.includes('&fm='))) {
                            img.src = cleanImageUrl(src);
                        }
                    });
                }
            });
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Intercept fetch requests for images
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        if (typeof url === 'string' && /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(url)) {
            url = cleanImageUrl(url);
        }
        return originalFetch.call(this, url, options);
    };
    
    // Log that fix is active
    console.log('Image redirect loop fix is active');
})();