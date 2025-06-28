// Ultra Fancy 3D Website JavaScript

// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 2000);
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    cursorDot.style.left = x + 'px';
    cursorDot.style.top = y + 'px';
    
    cursorOutline.style.left = x + 'px';
    cursorOutline.style.top = y + 'px';
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .card-3d, .service-card, .carousel-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.padding = '15px 50px';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.padding = '20px 50px';
    }
    
    lastScroll = currentScroll;
});

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
const track = document.querySelector('.carousel-track');

document.querySelector('.nav-next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

document.querySelector('.nav-prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-play carousel
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}, 5000);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('text-reveal')) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.text-reveal, .word-reveal, .floating').forEach(el => {
    observer.observe(el);
});

// Vanilla tilt for 3D cards
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

// Form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Animate submit button
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = '<span class="btn-text">Sending...</span><div class="btn-bg"></div>';
    
    // Simulate sending
    setTimeout(() => {
        submitBtn.innerHTML = '<span class="btn-text">Message Sent!</span><div class="btn-bg"></div>';
        contactForm.reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = '<span class="btn-text" data-translate="contact.send">Send Message</span><div class="btn-bg"></div>';
        }, 2000);
    }, 1500);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Parallax effect for background sphere
window.addEventListener('mousemove', (e) => {
    const sphere = document.querySelector('.gradient-sphere');
    const x = (e.clientX / window.innerWidth - 0.5) * 100;
    const y = (e.clientY / window.innerHeight - 0.5) * 100;
    
    sphere.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`;
});

// Dynamic particles
const particlesContainer = document.querySelector('.particles');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: ${Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 10 + 10}s infinite linear;
        opacity: ${Math.random() * 0.5 + 0.3};
    `;
    particlesContainer.appendChild(particle);
}

// Add particle float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        from {
            transform: translateY(100vh) rotate(0deg);
        }
        to {
            transform: translateY(-100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Magnetic button effect
document.querySelectorAll('.magnetic').forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    elem.addEventListener('mouseleave', () => {
        elem.style.transform = 'translate(0, 0)';
    });
});

// Text scramble effect for glitch text
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

// Apply text scramble to hero title on load
const heroTitle = document.querySelector('.title-main');
const scrambler = new TextScramble(heroTitle);
setTimeout(() => {
    scrambler.setText('ARTEAMO');
}, 2500);

// Project modal functionality
const projectPreviews = document.querySelectorAll('.carousel-item');
projectPreviews.forEach(preview => {
    preview.addEventListener('click', function() {
        const projectId = this.dataset.project;
        // Here you would open a modal with full project details
        console.log(`Opening project ${projectId}`);
    });
});

// Initialize language switcher functionality
document.addEventListener('DOMContentLoaded', () => {
    // The language switcher will be initialized by language-switcher-v2.js
});

// Performance optimization - lazy load images
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