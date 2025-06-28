// Noir Luxe Showcase - JavaScript

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('fade-out');
    }, 1500);
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
        navbar.style.padding = '1rem 4rem';
        navbar.style.background = 'rgba(17, 17, 17, 0.98)';
    } else {
        navbar.style.padding = '';
        navbar.style.background = '';
    }
    
    lastScroll = currentScroll;
});

// GSAP-like Text Animation
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply text scramble to hero titles on scroll
const heroTitles = document.querySelectorAll('.hero-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const scrambler = new TextScramble(entry.target);
            const originalText = entry.target.innerText;
            scrambler.setText(originalText);
            titleObserver.unobserve(entry.target);
        }
    });
});

heroTitles.forEach(title => {
    titleObserver.observe(title);
});

// Horizontal Scroll Carousel
const carousel = {
    track: document.querySelector('.carousel-track'),
    items: document.querySelectorAll('.carousel-item'),
    prevBtn: document.querySelector('.carousel-prev'),
    nextBtn: document.querySelector('.carousel-next'),
    progressBar: document.querySelector('.progress-bar'),
    currentIndex: 0,
    isDragging: false,
    startPos: 0,
    currentTranslate: 0,
    prevTranslate: 0,
    animationID: 0,
    
    init() {
        // Button controls
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Touch events
        this.track.addEventListener('touchstart', this.touchStart.bind(this));
        this.track.addEventListener('touchend', this.touchEnd.bind(this));
        this.track.addEventListener('touchmove', this.touchMove.bind(this));
        
        // Mouse events
        this.track.addEventListener('mousedown', this.touchStart.bind(this));
        this.track.addEventListener('mouseup', this.touchEnd.bind(this));
        this.track.addEventListener('mouseleave', this.touchEnd.bind(this));
        this.track.addEventListener('mousemove', this.touchMove.bind(this));
        
        // Prevent context menu
        this.track.addEventListener('contextmenu', e => e.preventDefault());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Mouse wheel
        this.track.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY > 0) this.next();
            else this.prev();
        });
    },
    
    getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    },
    
    touchStart(event) {
        this.isDragging = true;
        this.startPos = this.getPositionX(event);
        this.animationID = requestAnimationFrame(this.animation.bind(this));
    },
    
    touchEnd() {
        this.isDragging = false;
        cancelAnimationFrame(this.animationID);
        
        const movedBy = this.currentTranslate - this.prevTranslate;
        
        if (movedBy < -100 && this.currentIndex < this.items.length - 1) {
            this.currentIndex++;
        }
        
        if (movedBy > 100 && this.currentIndex > 0) {
            this.currentIndex--;
        }
        
        this.setPositionByIndex();
    },
    
    touchMove(event) {
        if (this.isDragging) {
            const currentPosition = this.getPositionX(event);
            this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
        }
    },
    
    animation() {
        this.setSliderPosition();
        if (this.isDragging) requestAnimationFrame(this.animation.bind(this));
    },
    
    setSliderPosition() {
        this.track.style.transform = `translateX(${this.currentTranslate}px)`;
    },
    
    setPositionByIndex() {
        const width = this.items[0].offsetWidth + 32; // item width + margin
        this.currentTranslate = this.currentIndex * -width;
        this.prevTranslate = this.currentTranslate;
        this.setSliderPosition();
        this.updateProgress();
    },
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.setPositionByIndex();
        }
    },
    
    next() {
        if (this.currentIndex < this.items.length - 1) {
            this.currentIndex++;
            this.setPositionByIndex();
        }
    },
    
    updateProgress() {
        const progress = ((this.currentIndex + 1) / this.items.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
};

carousel.init();

// Parallax Effect for Service Panels
const servicePanels = document.querySelectorAll('.service-panel');
const parallaxImages = document.querySelectorAll('.parallax-overlay');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxImages.forEach((img, index) => {
        const rate = scrolled * -0.2;
        img.style.transform = `translateY(${rate}px)`;
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Stagger animation for testimonials
            if (entry.target.classList.contains('testimonial')) {
                const testimonials = document.querySelectorAll('.testimonial');
                const index = Array.from(testimonials).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.2}s`;
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-panel, .fade-in').forEach(el => {
    observer.observe(el);
});

// Enquiry Modal
const enquiryModal = document.getElementById('enquiry');
const modalClose = document.querySelector('.modal-close');
const enquiryForm = document.querySelector('.enquiry-form');

// Close modal on close button click
modalClose.addEventListener('click', () => {
    window.location.hash = '';
});

// Close modal on background click
enquiryModal.addEventListener('click', (e) => {
    if (e.target === enquiryModal) {
        window.location.hash = '';
    }
});

// Handle form submission
enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(enquiryForm);
    const data = Object.fromEntries(formData);
    
    console.log('Enquiry submitted:', data);
    
    // Show success message
    const submitBtn = enquiryForm.querySelector('.submit-button');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Message Sent!</span><span class="diamond-icon">◆</span>';
    submitBtn.disabled = true;
    
    // Reset form and close modal after delay
    setTimeout(() => {
        enquiryForm.reset();
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        window.location.hash = '';
    }, 2000);
});

// Sticky CTA Animation
const stickyCTA = document.querySelector('.sticky-cta');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > 500) {
        stickyCTA.style.right = '-180px';
    } else {
        stickyCTA.style.right = '-200px';
    }
    
    lastScrollPosition = currentScrollPosition;
});

// Pulse animation every 15 seconds
setInterval(() => {
    const diamondPulse = document.querySelector('.diamond-pulse');
    diamondPulse.style.animation = 'none';
    setTimeout(() => {
        diamondPulse.style.animation = 'pulse 1.5s infinite';
    }, 100);
}, 15000);

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Set initial progress
    carousel.updateProgress();
    
    // Lazy load images
    const images = document.querySelectorAll('img');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 300px 0px'
    };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);
    
    images.forEach(img => imageObserver.observe(img));
});

// Performance optimization
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

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(() => {
    window.dispatchEvent(new Event('optimizedScroll'));
}, 50));