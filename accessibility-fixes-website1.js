// Accessibility Fixes for website1-minimalist
// This file contains immediate fixes for the critical accessibility issues found

document.addEventListener('DOMContentLoaded', function() {
    console.log('Applying accessibility fixes...');
    
    // 1. Fix missing aria-labels for select elements
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.setAttribute('aria-label', 'Choose language');
    }
    
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.setAttribute('aria-label', 'Sort projects by');
    }
    
    // 2. Add skip navigation link
    const skipLink = document.createElement('a');
    skipLink.href = '#projects';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.setAttribute('aria-label', 'Skip navigation and go to main content');
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // 3. Add main landmark
    const heroSection = document.querySelector('.hero');
    if (heroSection && !document.querySelector('main')) {
        const main = document.createElement('main');
        main.setAttribute('role', 'main');
        main.id = 'main-content';
        
        // Move all sections into main
        const sections = document.querySelectorAll('section');
        const navbar = document.querySelector('.navbar');
        const footer = document.querySelector('.footer');
        
        sections.forEach(section => {
            if (section !== navbar && section !== footer) {
                main.appendChild(section.cloneNode(true));
                section.remove();
            }
        });
        
        // Insert main after navbar
        navbar.parentNode.insertBefore(main, navbar.nextSibling);
    }
    
    // 4. Enhance form accessibility
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        // Add aria-required for required fields
        if (input.hasAttribute('required')) {
            input.setAttribute('aria-required', 'true');
        }
        
        // Ensure all inputs have either label or aria-label
        if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (!label && input.placeholder) {
                input.setAttribute('aria-label', input.placeholder);
            }
        }
    });
    
    // 5. Fix touch target sizes on mobile
    if (window.innerWidth <= 768) {
        const touchTargets = document.querySelectorAll('a, button, .filter-btn, .nav-link');
        touchTargets.forEach(target => {
            const rect = target.getBoundingClientRect();
            if (rect.height < 44 || rect.width < 44) {
                target.style.minHeight = '44px';
                target.style.minWidth = '44px';
                target.style.display = 'inline-flex';
                target.style.alignItems = 'center';
                target.style.justifyContent = 'center';
            }
        });
    }
    
    // 6. Add live region for dynamic content updates
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
    
    // 7. Enhance project cards with better ARIA
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const title = card.querySelector('h3');
        if (title) {
            card.setAttribute('aria-label', `View project: ${title.textContent}`);
        }
        
        // Add aria-describedby for project metadata
        const meta = card.querySelector('.project-meta');
        const desc = card.querySelector('.project-desc');
        if (meta || desc) {
            const descId = `project-desc-${index}`;
            if (meta) meta.id = descId;
            card.setAttribute('aria-describedby', descId);
        }
    });
    
    // 8. Add focus trap for mobile menu
    const mobileMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && mobileToggle) {
        const focusableElements = mobileMenu.querySelectorAll(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        mobileToggle.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                // Set focus to first element when menu opens
                setTimeout(() => {
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                }, 100);
            }
        });
        
        // Trap focus within mobile menu
        if (focusableElements.length > 0) {
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            mobileMenu.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) { // Shift + Tab
                        if (document.activeElement === firstFocusable) {
                            e.preventDefault();
                            lastFocusable.focus();
                        }
                    } else { // Tab
                        if (document.activeElement === lastFocusable) {
                            e.preventDefault();
                            firstFocusable.focus();
                        }
                    }
                }
                
                if (e.key === 'Escape') {
                    mobileMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    mobileToggle.focus();
                }
            });
        }
    }
    
    // 9. Announce filter/sort changes to screen readers
    const originalFilterClick = window.filterButtons;
    if (originalFilterClick) {
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', function() {
                const liveRegion = document.getElementById('live-region');
                if (liveRegion) {
                    const filter = this.getAttribute('data-filter');
                    liveRegion.textContent = `Showing ${filter === 'all' ? 'all' : filter} projects`;
                }
            });
        });
    }
    
    // 10. Add styles for skip link
    const skipLinkStyles = `
        .skip-link {
            position: absolute;
            left: -9999px;
            top: 10px;
            z-index: 9999;
            padding: 8px 16px;
            background: #000;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
        }
        
        .skip-link:focus {
            left: 50%;
            transform: translateX(-50%);
            outline: 3px solid #d4af37;
            outline-offset: 2px;
        }
        
        /* Screen reader only class */
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        
        /* Enhanced focus indicators */
        *:focus {
            outline: 3px solid #d4af37 !important;
            outline-offset: 2px !important;
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            *:focus {
                outline: 3px solid currentColor !important;
            }
        }
        
        /* Fix color contrast for tagline */
        .tagline {
            color: #666666 !important; /* Meets WCAG AA contrast ratio */
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = skipLinkStyles;
    document.head.appendChild(styleElement);
    
    console.log('Accessibility fixes applied successfully!');
});

// Additional utility functions for accessibility

// Announce message to screen readers
function announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        liveRegion.textContent = message;
        // Clear after announcement
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

// Check if element is visible
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Manage focus for modal/overlay scenarios
function trapFocus(container) {
    const focusableElements = container.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    container.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    // Focus first element
    firstFocusableElement.focus();
}

// Export functions for use in other scripts
window.accessibilityUtils = {
    announceToScreenReader,
    isElementVisible,
    trapFocus
};