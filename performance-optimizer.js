// Performance optimization utilities for Studio Arteamo websites
(function() {
    'use strict';

    // Lazy loading for images
    function setupLazyLoading() {
        // Check if browser supports lazy loading natively
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            const images = document.querySelectorAll('img:not([loading])');
            images.forEach(img => {
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                    img.setAttribute('decoding', 'async');
                }
            });
        } else {
            // Fallback for older browsers using Intersection Observer
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observe all images with data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Preload critical resources
    function preloadCriticalResources() {
        // Preconnect to Google Fonts
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = 'https://fonts.googleapis.com';
        preconnect.crossOrigin = 'anonymous';
        document.head.appendChild(preconnect);

        const preconnectGstatic = document.createElement('link');
        preconnectGstatic.rel = 'preconnect';
        preconnectGstatic.href = 'https://fonts.gstatic.com';
        preconnectGstatic.crossOrigin = 'anonymous';
        document.head.appendChild(preconnectGstatic);
    }

    // Optimize font loading
    function optimizeFontLoading() {
        // Add font-display: swap to Google Fonts
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => {
            if (!link.href.includes('display=swap')) {
                link.href += '&display=swap';
            }
        });
    }

    // Touch-friendly optimizations
    function setupTouchOptimizations() {
        // Add touch-action CSS for better scrolling performance
        document.documentElement.style.touchAction = 'manipulation';

        // Ensure clickable elements are touch-friendly (min 44x44px)
        const minTouchSize = 44;
        const clickables = document.querySelectorAll('a, button, [role="button"], .clickable');
        
        clickables.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.width < minTouchSize || rect.height < minTouchSize) {
                element.style.minWidth = minTouchSize + 'px';
                element.style.minHeight = minTouchSize + 'px';
                element.style.display = 'inline-flex';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
            }
        });
    }

    // Progressive image loading with blur-up effect
    function setupProgressiveImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            // Add blur effect initially
            img.style.filter = 'blur(5px)';
            img.style.transition = 'filter 0.3s';
            
            // When image loads, remove blur
            img.addEventListener('load', function() {
                this.style.filter = 'none';
            });
        });
    }

    // Reduce motion for users who prefer it
    function respectReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize all optimizations
    function init() {
        // Run optimizations when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runOptimizations);
        } else {
            runOptimizations();
        }
    }

    function runOptimizations() {
        preloadCriticalResources();
        optimizeFontLoading();
        setupLazyLoading();
        setupTouchOptimizations();
        setupProgressiveImages();
        respectReducedMotion();
    }

    // Export for use in other scripts
    window.PerformanceOptimizer = {
        init: init,
        setupLazyLoading: setupLazyLoading,
        preloadCriticalResources: preloadCriticalResources
    };

    // Auto-initialize
    init();
})();