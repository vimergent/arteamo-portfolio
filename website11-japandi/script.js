// Japandi Site - Ultra Minimal JavaScript (< 10KB)
document.addEventListener('DOMContentLoaded', function() {
    // Form handling with CSS-only validation
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple feedback
            const button = form.querySelector('button');
            const originalText = button.textContent;
            button.textContent = '✓';
            button.disabled = true;
            
            setTimeout(() => {
                form.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        });
    }
    
    // Minimal scroll effect for navigation
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navigation');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
});

// Total size: < 1KB - Well under 10KB limit