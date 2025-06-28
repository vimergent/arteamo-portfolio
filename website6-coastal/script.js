// Coastal Modern Varna - JavaScript

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

// Check for saved dark mode preference
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', null);
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '';
        navbar.style.boxShadow = '';
    }
    
    // Update active nav link
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
            const currentLink = document.querySelector('.nav-link.active');
            if (currentLink) currentLink.classList.remove('active');
            
            const newLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (newLink) newLink.classList.add('active');
        }
    });
    
    lastScroll = currentScroll;
});

// Mobile Menu
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.chip');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        document.querySelector('.chip.active').classList.remove('active');
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('loaded');
                }, 10);
            } else {
                item.classList.remove('loaded');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Portfolio Modal
const modal = document.getElementById('portfolio-modal');
const modalClose = document.querySelector('.modal-close');
const modalImage = modal.querySelector('.modal-image');
const modalTitle = modal.querySelector('.modal-title');
const modalDescription = modal.querySelector('.modal-description');

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const image = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        
        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        modal.classList.add('active');
        body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    body.style.overflow = '';
}

// Before/After Slider
const slider = document.querySelector('.comparison-slider');
const sliderHandle = document.querySelector('.slider-handle');
const afterImage = document.querySelector('.after-image');

if (slider) {
    let isDragging = false;
    
    const updateSliderPosition = (x) => {
        const rect = slider.getBoundingClientRect();
        const position = Math.max(0, Math.min(x - rect.left, rect.width));
        const percentage = (position / rect.width) * 100;
        
        sliderHandle.style.left = `${percentage}%`;
        afterImage.style.width = `${percentage}%`;
    };
    
    sliderHandle.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mouseup', () => isDragging = false);
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateSliderPosition(e.clientX);
        }
    });
    
    // Touch support
    sliderHandle.addEventListener('touchstart', () => isDragging = true);
    document.addEventListener('touchend', () => isDragging = false);
    
    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            updateSliderPosition(e.touches[0].clientX);
        }
    });
}

// Form Handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would send the data to your server
    console.log('Form submitted:', data);
    
    // Show success message
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Message Sent!';
    submitBtn.disabled = true;
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 3000);
});

// Lazy Loading for Instagram Grid
const instagramObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            instagramObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

document.querySelectorAll('.insta-item img').forEach(img => {
    img.classList.add('loading');
    instagramObserver.observe(img);
});

// Service Cards Tilt Effect
const serviceCards = document.querySelectorAll('[data-tilt]');
serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Intersection Observer for Animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            
            // Stagger animations for grid items
            if (entry.target.classList.contains('portfolio-item')) {
                const delay = Array.from(portfolioItems).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Observe elements
document.querySelectorAll('.portfolio-item, .service-card, .blog-card, .timeline-item').forEach(el => {
    el.classList.add('loading');
    animationObserver.observe(el);
});

// Hero Text Animation
const heroTitle = document.querySelector('.hero-title');
const titleLines = heroTitle.querySelectorAll('.title-line');

titleLines.forEach((line, index) => {
    line.style.animationDelay = `${index * 0.2}s`;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to visible portfolio items
    portfolioItems.forEach(item => {
        if (item.offsetTop < window.innerHeight) {
            item.classList.add('loaded');
        }
    });
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
    window.dispatchEvent(new Event('optimizedScroll'));
}, 100);

window.addEventListener('scroll', debouncedScroll);