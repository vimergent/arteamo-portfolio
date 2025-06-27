// Interactive Grid Gallery Scripts

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX - 15 + 'px';
        cursorFollower.style.top = e.clientY - 15 + 'px';
    }, 100);
});

// Cursor hover effects
document.querySelectorAll('a, button, .grid-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
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

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '1rem 3rem';
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.padding = '2rem 3rem';
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
    
    lastScroll = currentScroll;
});

// Initialize Isotope for filtering
let iso;
const gridContainer = document.querySelector('.grid-container');

// Wait for images to load
window.addEventListener('load', () => {
    iso = new Isotope(gridContainer, {
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: '.grid-item',
            gutter: 20
        },
        transitionDuration: '0.6s'
    });
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-tag');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter items
        const filterValue = button.getAttribute('data-filter');
        if (iso) {
            if (filterValue === 'all') {
                iso.arrange({ filter: '*' });
            } else {
                iso.arrange({ filter: `[data-category="${filterValue}"]` });
            }
        }
    });
});

// View toggle
const viewButtons = document.querySelectorAll('.view-btn');
const container = document.querySelector('.grid-container');

viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        viewButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const view = button.getAttribute('data-view');
        if (view === 'list') {
            container.classList.add('list-view');
        } else {
            container.classList.remove('list-view');
        }
        
        // Re-layout
        if (iso) {
            iso.layout();
        }
    });
});

// Parallax effect on scroll
const heroSection = document.querySelector('.hero-section');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    heroSection.style.transform = `translateY(${parallax}px)`;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}ms`;
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Add staggered animation delays
document.querySelectorAll('.grid-item').forEach((item, index) => {
    item.dataset.delay = index * 100;
    observer.observe(item);
});

// Project modal functionality
const projectItems = document.querySelectorAll('.grid-item');
const body = document.body;

projectItems.forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('.item-title').textContent;
        const category = this.querySelector('.item-category').textContent;
        const location = this.querySelector('.item-location').textContent;
        const imageSrc = this.querySelector('img').src;
        const year = this.querySelector('.overlay-year').textContent;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close">×</button>
                <div class="modal-grid">
                    <div class="modal-image">
                        <img src="${imageSrc}" alt="${title}">
                    </div>
                    <div class="modal-info">
                        <span class="modal-category">${category}</span>
                        <h2 class="modal-title">${title}</h2>
                        <p class="modal-location">${location}</p>
                        <span class="modal-year">${year}</span>
                        <div class="modal-description">
                            <p>This project showcases our commitment to creating exceptional spaces that balance aesthetics with functionality. Every detail has been carefully considered to achieve a harmonious design.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        body.appendChild(modal);
        body.style.overflow = 'hidden';
        
        // Animate modal entrance
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Close modal
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');
        
        [closeBtn, backdrop].forEach(element => {
            element.addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                    body.style.overflow = '';
                }, 300);
            });
        });
    });
});

// Dynamic modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .project-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .project-modal.active {
        opacity: 1;
    }
    
    .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        cursor: pointer;
    }
    
    .modal-content {
        position: relative;
        width: 90%;
        max-width: 1200px;
        max-height: 90vh;
        background: var(--secondary);
        border-radius: 20px;
        overflow: hidden;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .project-modal.active .modal-content {
        transform: scale(1);
    }
    
    .modal-close {
        position: absolute;
        top: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: rotate(90deg);
    }
    
    .modal-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 100%;
    }
    
    .modal-image {
        height: 100%;
        overflow: hidden;
    }
    
    .modal-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .modal-info {
        padding: 4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .modal-category {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.875rem;
        font-weight: 500;
        margin-bottom: 1rem;
    }
    
    .modal-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .modal-location {
        color: var(--text-secondary);
        font-size: 1.125rem;
        margin-bottom: 1rem;
    }
    
    .modal-year {
        font-size: 5rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.05);
        position: absolute;
        top: 3rem;
        right: 3rem;
        font-family: 'Space Grotesk', sans-serif;
    }
    
    .modal-description {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid var(--border);
    }
    
    .modal-description p {
        color: var(--text-secondary);
        line-height: 1.8;
    }
    
    @media (max-width: 768px) {
        .modal-grid {
            grid-template-columns: 1fr;
        }
        
        .modal-info {
            padding: 2rem;
        }
        
        .modal-title {
            font-size: 2rem;
        }
        
        .modal-year {
            font-size: 3rem;
        }
    }
`;

document.head.appendChild(modalStyles);