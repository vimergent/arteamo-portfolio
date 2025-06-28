// Makeover Stories - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('fade-out');
    }, 1500);
    
    // Navigation scroll effect
    const nav = document.querySelector('.navigation');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Hero scrolling narrative
    const heroSection = document.querySelector('.hero');
    const heroPanels = document.querySelectorAll('.hero-panel');
    
    function updateHeroScroll() {
        const scrolled = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollProgress = scrolled / (heroHeight - viewportHeight);
        
        // Reset all panels
        heroPanels.forEach(panel => panel.classList.remove('active'));
        
        // Activate panels based on scroll
        if (scrollProgress < 0.33) {
            heroPanels[0].classList.add('active'); // Before
        } else if (scrollProgress < 0.66) {
            heroPanels[1].classList.add('active'); // Transformation
        } else {
            heroPanels[2].classList.add('active'); // After
        }
    }
    
    window.addEventListener('scroll', updateHeroScroll);
    updateHeroScroll(); // Initial call
    
    // Social proof counter animation
    const counterElement = document.getElementById('square-meters');
    let hasAnimated = false;
    
    function animateCounter() {
        if (hasAnimated) return;
        
        const target = 12450;
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                hasAnimated = true;
            }
            counterElement.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    // Observe social proof bar
    const socialProofBar = document.querySelector('.social-proof-bar');
    const socialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
            }
        });
    });
    
    socialObserver.observe(socialProofBar);
    
    // Before/After slider functionality
    const sliders = document.querySelectorAll('.story-before-after');
    
    sliders.forEach(slider => {
        let isSliding = false;
        const afterContainer = slider.querySelector('.after-container');
        
        function updateSliderPosition(x) {
            const rect = slider.getBoundingClientRect();
            const position = ((x - rect.left) / rect.width) * 100;
            const clampedPosition = Math.max(0, Math.min(100, position));
            afterContainer.style.clipPath = `inset(0 0 0 ${clampedPosition}%)`;
        }
        
        // Mouse events
        slider.addEventListener('mousedown', (e) => {
            isSliding = true;
            updateSliderPosition(e.clientX);
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isSliding) return;
            updateSliderPosition(e.clientX);
        });
        
        document.addEventListener('mouseup', () => {
            isSliding = false;
        });
        
        // Touch events
        slider.addEventListener('touchstart', (e) => {
            isSliding = true;
            updateSliderPosition(e.touches[0].clientX);
        });
        
        slider.addEventListener('touchmove', (e) => {
            if (!isSliding) return;
            e.preventDefault();
            updateSliderPosition(e.touches[0].clientX);
        });
        
        slider.addEventListener('touchend', () => {
            isSliding = false;
        });
    });
    
    // Timeline phase interaction
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        const phases = card.querySelectorAll('.timeline-phase');
        
        phases.forEach((phase, index) => {
            phase.addEventListener('click', () => {
                // Remove active from all phases in this card
                phases.forEach(p => p.classList.remove('active'));
                // Add active to clicked phase
                phase.classList.add('active');
                
                // Here you could load different content based on phase
                console.log(`Phase ${index + 1} selected`);
            });
        });
    });
    
    // Sticky CTA visibility
    const stickyCTA = document.querySelector('.sticky-cta');
    let ctaTimeout;
    
    function showStickyCTA() {
        stickyCTA.classList.add('visible');
    }
    
    // Show CTA after scrolling
    window.addEventListener('scroll', () => {
        clearTimeout(ctaTimeout);
        stickyCTA.classList.remove('visible');
        
        ctaTimeout = setTimeout(() => {
            if (window.pageYOffset > 500) {
                showStickyCTA();
            }
        }, 15000); // 15 seconds
    });
    
    // Initial CTA show
    setTimeout(showStickyCTA, 5000);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '✓ Изпратено!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
    
    // Story CTA clicks
    const storyCTAs = document.querySelectorAll('.story-cta');
    storyCTAs.forEach((cta, index) => {
        cta.addEventListener('click', () => {
            // Here you would navigate to full story
            console.log(`View story ${index + 1}`);
            // Could open a modal or navigate to a new page
        });
    });
    
    // Lazy loading images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.addEventListener('load', () => {
                    img.style.transition = 'opacity 0.5s ease';
                    img.style.opacity = '1';
                });
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    images.forEach(img => imageObserver.observe(img));
});