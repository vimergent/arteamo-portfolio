// Page Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.page-loader').classList.add('fade-out');
    }, 1500);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
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

// Active Navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    rootMargin: '-50% 0px -50% 0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectItems.forEach((item, index) => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Parallax Effect
const parallaxElements = document.querySelectorAll('.hero-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Reveal Animations
const revealElements = document.querySelectorAll('.project-item, .award-item, .service-item, .stat-item');

const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const revealCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(element);
});

// Project Modal
const projectModal = document.createElement('div');
projectModal.className = 'project-modal';
document.body.appendChild(projectModal);

projectItems.forEach(item => {
    item.addEventListener('click', function() {
        const projectImage = this.querySelector('img').src;
        const projectTitle = this.querySelector('h3').textContent;
        const projectYear = this.querySelector('.project-year').textContent;
        const projectLocation = this.querySelector('.project-location').textContent;
        const projectArea = this.querySelector('.project-area').textContent;
        
        projectModal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-grid">
                    <div class="modal-image">
                        <img src="${projectImage}" alt="${projectTitle}">
                    </div>
                    <div class="modal-info">
                        <span class="modal-number">Project Details</span>
                        <h2>${projectTitle}</h2>
                        <div class="modal-details">
                            <div class="detail-item">
                                <span class="detail-label">Year</span>
                                <span class="detail-value">${projectYear}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Location</span>
                                <span class="detail-value">${projectLocation}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Area</span>
                                <span class="detail-value">${projectArea}</span>
                            </div>
                        </div>
                        <p class="modal-description">
                            This project represents our commitment to creating extraordinary spaces that blend luxury with functionality. 
                            Every detail has been carefully considered to achieve a harmonious balance between aesthetics and practical living.
                        </p>
                        <a href="#contact" class="modal-cta">
                            <span>Inquire About This Project</span>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <path d="M5 10h10m0 0l-3-3m3 3l-3 3" stroke="currentColor" stroke-width="2" fill="none"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Close modal
        const closeBtn = projectModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeModal();
            }
        });
    });
});

function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Form Handling
const contactForm = document.querySelector('.contact-form form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.textContent = 'Thank you for your message. We will get back to you soon.';
    
    contactForm.appendChild(successMessage);
    contactForm.reset();
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
});

// Dynamic Modal Styles
const modalStyles = `
    .project-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 10, 10, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s ease;
    }
    
    .project-modal.active {
        opacity: 1;
        pointer-events: auto;
    }
    
    .modal-content {
        width: 90%;
        max-width: 1200px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        animation: modalSlideIn 0.4s ease;
    }
    
    @keyframes modalSlideIn {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .modal-close {
        position: absolute;
        top: 2rem;
        right: 2rem;
        font-size: 2rem;
        color: var(--gold);
        cursor: pointer;
        z-index: 10;
        transition: transform 0.3s ease;
    }
    
    .modal-close:hover {
        transform: rotate(90deg);
    }
    
    .modal-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        background: var(--dark-gray);
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
    
    .modal-number {
        color: var(--gold);
        font-size: 0.875rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        display: block;
        margin-bottom: 1rem;
    }
    
    .modal-info h2 {
        font-size: 2.5rem;
        margin-bottom: 2rem;
    }
    
    .modal-details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--medium-gray);
    }
    
    .detail-item {
        display: flex;
        justify-content: space-between;
    }
    
    .detail-label {
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.75rem;
    }
    
    .detail-value {
        color: var(--gold);
    }
    
    .modal-description {
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: 2rem;
    }
    
    .modal-cta {
        display: inline-flex;
        align-items: center;
        gap: 1rem;
        color: var(--gold);
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.875rem;
        padding: 1rem 2rem;
        border: 1px solid var(--gold);
        transition: var(--transition);
        align-self: flex-start;
    }
    
    .modal-cta:hover {
        background-color: var(--gold);
        color: var(--black);
    }
    
    .form-success {
        color: var(--gold);
        text-align: center;
        padding: 1rem;
        background: rgba(212, 175, 55, 0.1);
        border: 1px solid var(--gold);
        margin-top: 2rem;
        animation: fadeInUp 0.4s ease;
    }
    
    @media (max-width: 768px) {
        .modal-grid {
            grid-template-columns: 1fr;
        }
        
        .modal-info {
            padding: 2rem;
        }
        
        .modal-close {
            background: var(--dark-gray);
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            top: 1rem;
            right: 1rem;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);