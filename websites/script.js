// Studio Arteamo - Main JavaScript
(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        animationDuration: 300,
        lazyLoadOffset: 50,
        debounceDelay: 150,
        defaultLanguage: 'bg'
    };

    // State Management
    const state = {
        currentFilter: 'all',
        currentLanguage: localStorage.getItem('selectedLanguage') || CONFIG.defaultLanguage,
        isMenuOpen: false,
        projects: []
    };

    // DOM Elements
    const elements = {
        languageSelector: null,
        portfolioGrid: null,
        filterButtons: null,
        mobileMenuToggle: null,
        navMenu: null,
        contactForm: null
    };

    // Initialize
    function init() {
        cacheDOMElements();
        loadProjects();
        initLanguageSystem();
        initEventListeners();
        initLazyLoading();
        initContactForm();
        initScrollEffects();
        updateContent();
    }

    // Cache DOM Elements
    function cacheDOMElements() {
        elements.languageSelector = document.getElementById('language-selector');
        elements.portfolioGrid = document.getElementById('portfolio-grid');
        elements.filterButtons = document.querySelectorAll('.filter-btn');
        elements.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        elements.navMenu = document.querySelector('.nav-menu');
        elements.contactForm = document.getElementById('contact-form');
    }

    // Load Projects from Configuration
    function loadProjects() {
        if (window.projectConfig && window.projectConfig.projects) {
            state.projects = window.projectConfig.projects;
            renderProjects();
        } else {
            // Fallback projects data
            state.projects = [
                {
                    id: 'flavia-garden-2024',
                    name: {
                        bg: 'Апартамент Flavia Garden 2024',
                        en: 'Apartment Flavia Garden 2024'
                    },
                    category: 'residential',
                    year: 2024,
                    location: 'Варна',
                    coverImage: 'Apartament Flavia Garden 2024/IMG_2813.jpg',
                    description: {
                        bg: 'Луксозен апартамент с модерен дизайн',
                        en: 'Luxury apartment with modern design'
                    }
                },
                {
                    id: 'k55-2021',
                    name: {
                        bg: 'Апартамент K55',
                        en: 'Apartment K55'
                    },
                    category: 'residential',
                    year: 2021,
                    location: 'Варна',
                    coverImage: 'Apartament K55_2021/IMG_9755.jpg',
                    description: {
                        bg: 'Елегантен интериор с минималистичен подход',
                        en: 'Elegant interior with minimalist approach'
                    }
                },
                {
                    id: 'balev-corporation-2020',
                    name: {
                        bg: 'Balev Corporation',
                        en: 'Balev Corporation'
                    },
                    category: 'office',
                    year: 2020,
                    location: 'Варна',
                    coverImage: 'Balev Corporation 2020/IMG_6678.jpg',
                    description: {
                        bg: 'Корпоративен офис с модерен дизайн',
                        en: 'Corporate office with modern design'
                    }
                },
                {
                    id: 'elite-clinic-2021',
                    name: {
                        bg: 'Elite Clinic',
                        en: 'Elite Clinic'
                    },
                    category: 'commercial',
                    year: 2021,
                    location: 'Варна',
                    coverImage: 'Elite Clinic 2021/IMG_0455.jpg',
                    description: {
                        bg: 'Медицинска клиника с луксозен интериор',
                        en: 'Medical clinic with luxury interior'
                    }
                }
            ];
            renderProjects();
        }
    }

    // Render Projects
    function renderProjects(filter = 'all') {
        if (!elements.portfolioGrid) return;

        const filteredProjects = filter === 'all' 
            ? state.projects 
            : state.projects.filter(p => p.category === filter);

        elements.portfolioGrid.innerHTML = filteredProjects.map(project => createProjectCard(project)).join('');
        
        // Re-initialize lazy loading for new images
        initLazyLoading();
    }

    // Create Project Card
    function createProjectCard(project) {
        const lang = state.currentLanguage;
        const name = project.name[lang] || project.name.en || project.name.bg;
        const description = project.description[lang] || project.description.en || project.description.bg;
        const imagePath = encodeImagePath(project.coverImage);

        return `
            <article class="project-card fade-in" data-project="${project.id}">
                <div class="project-image">
                    <img data-src="${imagePath}" 
                         alt="${name}" 
                         class="lazy"
                         loading="lazy">
                </div>
                <div class="project-info">
                    <h3 class="project-title">${name}</h3>
                    <p class="project-category">${getCategoryName(project.category)}</p>
                    <p class="project-description">${description}</p>
                </div>
            </article>
        `;
    }

    // Get Category Name
    function getCategoryName(category) {
        const categories = {
            bg: {
                residential: 'Жилищен',
                commercial: 'Търговски',
                office: 'Офис'
            },
            en: {
                residential: 'Residential',
                commercial: 'Commercial',
                office: 'Office'
            }
        };

        const lang = state.currentLanguage;
        return categories[lang]?.[category] || categories.en[category] || category;
    }

    // Encode Image Path
    function encodeImagePath(path) {
        return path.split('/').map(part => encodeURIComponent(part).replace(/\(/g, '%28').replace(/\)/g, '%29')).join('/');
    }

    // Initialize Language System
    function initLanguageSystem() {
        if (elements.languageSelector) {
            elements.languageSelector.value = state.currentLanguage;
            elements.languageSelector.addEventListener('change', handleLanguageChange);
        }
    }

    // Handle Language Change
    function handleLanguageChange(e) {
        state.currentLanguage = e.target.value;
        localStorage.setItem('selectedLanguage', state.currentLanguage);
        localStorage.setItem('language', state.currentLanguage); // Legacy support
        updateContent();
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: state.currentLanguage }));
    }

    // Update Content Based on Language
    function updateContent() {
        // Update HTML lang attribute
        document.documentElement.lang = state.currentLanguage;

        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Re-render projects with new language
        renderProjects(state.currentFilter);
    }

    // Get Translation
    function getTranslation(key) {
        if (!window.translations || !window.translations[state.currentLanguage]) return null;
        
        const keys = key.split('.');
        let value = window.translations[state.currentLanguage];
        
        for (const k of keys) {
            value = value[k];
            if (!value) return null;
        }
        
        return value;
    }

    // Initialize Event Listeners
    function initEventListeners() {
        // Filter buttons
        elements.filterButtons.forEach(btn => {
            btn.addEventListener('click', handleFilterClick);
        });

        // Mobile menu toggle
        if (elements.mobileMenuToggle && elements.navMenu) {
            elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (state.isMenuOpen) {
                    toggleMobileMenu();
                }
            });
        });

        // Project card clicks
        elements.portfolioGrid?.addEventListener('click', handleProjectClick);

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleSmoothScroll);
        });

        // Window resize handler
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768 && state.isMenuOpen) {
                    toggleMobileMenu();
                }
            }, CONFIG.debounceDelay);
        });
    }

    // Handle Filter Click
    function handleFilterClick(e) {
        const filter = e.target.getAttribute('data-filter');
        state.currentFilter = filter;

        // Update active state
        elements.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Render filtered projects
        renderProjects(filter);
    }

    // Toggle Mobile Menu
    function toggleMobileMenu() {
        state.isMenuOpen = !state.isMenuOpen;
        elements.navMenu.classList.toggle('active');
        elements.mobileMenuToggle.classList.toggle('active');
        document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
    }

    // Handle Project Click
    function handleProjectClick(e) {
        const card = e.target.closest('.project-card');
        if (card) {
            const projectId = card.getAttribute('data-project');
            const project = state.projects.find(p => p.id === projectId);
            if (project) {
                openProjectGallery(project);
            }
        }
    }

    // Open Project Gallery
    function openProjectGallery(project) {
        // This would typically open a modal or navigate to a project page
        console.log('Opening project:', project);
        // For now, we'll just scroll to the project section
        const projectSection = document.getElementById('portfolio');
        if (projectSection) {
            projectSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Handle Smooth Scroll
    function handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Initialize Lazy Loading
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img.lazy');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('fade-in');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: `${CONFIG.lazyLoadOffset}px`
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    // Initialize Contact Form
    function initContactForm() {
        if (elements.contactForm) {
            elements.contactForm.addEventListener('submit', handleFormSubmit);
        }
    }

    // Handle Form Submit
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const submitButton = e.target.querySelector('button[type="submit"]');
        
        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Изпращане...';

        try {
            // For Netlify Forms
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                // Success
                showFormMessage('Благодарим ви! Вашето съобщение беше изпратено успешно.', 'success');
                e.target.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error
            showFormMessage('Възникна грешка. Моля, опитайте отново.', 'error');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Изпрати запитване';
        }
    }

    // Show Form Message
    function showFormMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        elements.contactForm.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Initialize Scroll Effects
    function initScrollEffects() {
        let lastScrollTop = 0;
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
            
            // Add scroll class to header
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 100));
    }

    // Throttle Function
    function throttle(func, wait) {
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

    // Load External Scripts
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    // Wait for DOM and Dependencies
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose API for external use
    window.StudioArteamo = {
        updateLanguage: (lang) => {
            state.currentLanguage = lang;
            updateContent();
        },
        filterProjects: (filter) => {
            state.currentFilter = filter;
            renderProjects(filter);
        },
        getState: () => state
    };

})();