// Sustainable Biophilic Studio - JavaScript

// Eco Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.eco-loader').classList.add('hidden');
    }, 1500);
});

// CO2 Page Weight Meter
function calculatePageWeight() {
    // Simulate real-time CO2 calculation based on page resources
    const performance = window.performance;
    const navigation = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    
    let totalSize = navigation.transferSize || 0;
    resources.forEach(resource => {
        totalSize += resource.transferSize || 0;
    });
    
    // Convert to MB and calculate approximate CO2 (0.5g per MB)
    const sizeInMB = totalSize / (1024 * 1024);
    const co2 = (sizeInMB * 0.5).toFixed(1);
    
    // Update CO2 meter
    const co2Value = document.querySelector('.co2-value');
    if (co2Value) {
        co2Value.textContent = `${co2}g CO₂`;
    }
}

// Run CO2 calculation when page loads
window.addEventListener('load', calculatePageWeight);

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
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '1rem 0';
    } else {
        navbar.style.boxShadow = '';
        navbar.style.padding = '';
    }
    
    lastScroll = currentScroll;
});

// Before/After Slider Functionality
const sliders = document.querySelectorAll('.before-after-slider');

sliders.forEach(slider => {
    const sliderControl = slider.querySelector('.slider-control');
    const afterImage = slider.querySelector('.after-image');
    
    if (sliderControl && afterImage) {
        sliderControl.addEventListener('input', (e) => {
            const value = e.target.value;
            afterImage.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        });
        
        // Set initial position
        sliderControl.value = 50;
        afterImage.style.clipPath = 'inset(0 50% 0 0)';
    }
});

// Animated Leaves with Motion Safety
const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

if (motionOK) {
    // Create additional floating leaves
    const heroLeaves = document.querySelector('.hero-leaves');
    const leafColors = ['#556B2F', '#87A96B', '#B98362'];
    
    for (let i = 0; i < 5; i++) {
        const leaf = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        leaf.setAttribute('class', 'floating-leaf generated-leaf');
        leaf.setAttribute('viewBox', '0 0 100 100');
        leaf.setAttribute('width', Math.random() * 60 + 40);
        leaf.setAttribute('height', Math.random() * 60 + 40);
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M50 10 Q30 30 30 50 Q30 70 50 90 Q70 70 70 50 Q70 30 50 10');
        path.setAttribute('fill', leafColors[Math.floor(Math.random() * leafColors.length)]);
        path.setAttribute('opacity', '0.2');
        
        leaf.appendChild(path);
        
        leaf.style.position = 'absolute';
        leaf.style.top = `${Math.random() * 100}%`;
        leaf.style.left = `${Math.random() * 100}%`;
        leaf.style.animationDuration = `${Math.random() * 20 + 15}s`;
        leaf.style.animationDelay = `${Math.random() * 10}s`;
        
        heroLeaves.appendChild(leaf);
    }
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate lifecycle charts
            if (entry.target.classList.contains('lifecycle-chart')) {
                const bars = entry.target.querySelectorAll('.chart-bar');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.opacity = '1';
                        bar.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.project-card, .material-card, .blog-post').forEach(el => {
    observer.observe(el);
});

// Materials Filter (if implemented)
const materialCards = document.querySelectorAll('.material-card');
const filterMaterials = (tag) => {
    materialCards.forEach(card => {
        const hasTag = card.querySelector(`.material-tag.${tag}`);
        if (tag === 'all' || hasTag) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Form Handling with CO2 Savings Calculation
const contactForm = document.getElementById('sustainable-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Calculate potential CO2 savings based on project type
    const co2Savings = {
        residential: '2.5 tons/year',
        commercial: '5.8 tons/year',
        hospitality: '4.2 tons/year'
    };
    
    const projectType = data['project-type'];
    const savings = co2Savings[projectType] || '3.0 tons/year';
    
    // Show success message with CO2 savings
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = `
        <span>Submitted! Potential CO₂ savings: ${savings}</span>
        <svg class="leaf-icon" viewBox="0 0 24 24" width="20" height="20">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
        </svg>
    `;
    submitButton.disabled = true;
    
    // Reset form after delay
    setTimeout(() => {
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 5000);
    
    console.log('Form submitted:', data);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Animate menu toggle spans
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }
});

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// Carbon Savings Counter Animation
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
};

// Animate stat numbers when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat').forEach(stat => {
    statObserver.observe(stat);
});

// Real-time page performance monitoring
let performanceData = {
    loadTime: 0,
    resourceCount: 0,
    totalSize: 0
};

window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    
    performanceData.loadTime = Math.round(perfData.loadEventEnd - perfData.loadEventStart);
    performanceData.resourceCount = resources.length;
    performanceData.totalSize = resources.reduce((total, resource) => {
        return total + (resource.transferSize || 0);
    }, 0);
    
    console.log('Page Performance:', performanceData);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to visible elements
    const visibleElements = document.querySelectorAll('.project-card, .material-card');
    visibleElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
});