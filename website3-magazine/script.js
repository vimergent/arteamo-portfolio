// Magazine Style Website Scripts

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const mainNav = document.querySelector('.main-nav');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Smooth scrolling
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

// Parallax effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-main img, .editorial-image img');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.editorial-item, .mosaic-item, .insight-card, .achievement').forEach(el => {
    observer.observe(el);
});

// Project hover effects
const projectItems = document.querySelectorAll('.mosaic-item');

projectItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Dynamic reading time
function calculateReadingTime() {
    const articles = document.querySelectorAll('.editorial-content');
    articles.forEach(article => {
        const text = article.textContent;
        const wordsPerMinute = 200;
        const numberOfWords = text.split(/\s/g).length;
        const readingTime = Math.ceil(numberOfWords / wordsPerMinute);
        
        // You can add reading time display here if needed
    });
}

calculateReadingTime();

// Add reveal animation styles
const style = document.createElement('style');
style.textContent = `
    .editorial-item,
    .mosaic-item,
    .insight-card,
    .achievement {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .editorial-item.revealed,
    .mosaic-item.revealed,
    .insight-card.revealed,
    .achievement.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .main-nav {
        display: none;
        position: fixed;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
        transition: transform 0.3s ease;
    }
    
    .main-nav.active {
        display: flex;
        transform: translateY(-100%);
    }
    
    @media (min-width: 768px) {
        .main-nav {
            display: flex !important;
            position: static;
            transform: none !important;
        }
    }
`;
document.head.appendChild(style);