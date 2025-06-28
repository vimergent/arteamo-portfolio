// ARCHITECTURAL DIGEST STYLE MAGAZINE - JAVASCRIPT
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSearch();
    initInfiniteScroll();
    initNewsletterForm();
    initSmoothScroll();
    initArticleAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            
            // Animate hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
        
        // Close mobile menu when clicking links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
                menuToggle.querySelectorAll('span').forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
    }
}

// Search Functionality
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');
    const searchForm = document.querySelector('.search-form');
    
    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            setTimeout(() => {
                searchInput.focus();
            }, 300);
        });
        
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
                searchInput.value = '';
            }
        });
        
        // Handle search form submission
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                console.log('Searching for:', query);
                // Implement search functionality here
                // For now, just close the overlay
                searchOverlay.classList.remove('active');
                searchInput.value = '';
            }
        });
    }
}

// Infinite Scroll
function initInfiniteScroll() {
    const container = document.getElementById('infinite-scroll-container');
    const loadingIndicator = document.querySelector('.loading-indicator');
    let currentPage = 1;
    let isLoading = false;
    
    // Sample articles data
    const sampleArticles = [
        {
            title: 'The Rise of Maximalist Interiors',
            excerpt: 'After years of minimalism, bold patterns and rich textures are making a comeback.',
            image: '../Apartament Траката, Варна_2021/06.jpg',
            category: 'Trends',
            readTime: '6 min read'
        },
        {
            title: 'Sustainable Luxury: The New Standard',
            excerpt: 'How eco-conscious materials are reshaping high-end interior design.',
            image: '../Apartament Симфония - Бриз, Варна_ 2019/1.jpg',
            category: 'Sustainability',
            readTime: '8 min read'
        },
        {
            title: 'Color Psychology in Modern Spaces',
            excerpt: 'Understanding how color choices impact mood and productivity.',
            image: '../Playground Grand Mall Varna 2018/2.bmp',
            category: 'Design Theory',
            readTime: '5 min read'
        }
    ];
    
    function loadMoreArticles() {
        if (isLoading) return;
        
        isLoading = true;
        loadingIndicator.classList.add('active');
        
        // Simulate API call
        setTimeout(() => {
            const fragment = document.createDocumentFragment();
            
            // Create 3 articles per load
            for (let i = 0; i < 3; i++) {
                const article = sampleArticles[i % sampleArticles.length];
                const articleElement = createArticleElement(article);
                fragment.appendChild(articleElement);
            }
            
            container.appendChild(fragment);
            currentPage++;
            isLoading = false;
            loadingIndicator.classList.remove('active');
            
            // Add entrance animation
            const newArticles = container.querySelectorAll('.article-card:not(.visible)');
            newArticles.forEach((article, index) => {
                setTimeout(() => {
                    article.classList.add('visible');
                }, index * 100);
            });
        }, 1000);
    }
    
    function createArticleElement(article) {
        const div = document.createElement('div');
        div.className = 'article-card';
        div.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
                <span class="article-tag">${article.category}</span>
            </div>
            <div class="article-content">
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <div class="article-footer">
                    <span class="read-time">${article.readTime}</span>
                    <a href="#" class="article-link" aria-label="Read article">→</a>
                </div>
            </div>
        `;
        return div;
    }
    
    // Intersection Observer for infinite scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isLoading) {
                loadMoreArticles();
            }
        });
    }, {
        rootMargin: '100px'
    });
    
    if (loadingIndicator) {
        observer.observe(loadingIndicator);
    }
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('.newsletter-input');
            const submitBtn = newsletterForm.querySelector('.newsletter-btn');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate submission
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Subscribed!';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        submitBtn.textContent = 'Subscribe';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1000);
            }
        });
    }
}

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Article Animations
function initArticleAnimations() {
    // Parallax effect for hero image
    const heroImage = document.querySelector('.featured-image img');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            heroImage.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Fade in animations for articles
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all article cards
    const articles = document.querySelectorAll('.article-card');
    articles.forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
        article.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(article);
    });
    
    // Sticky sidebar effect
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        const sidebarTop = sidebar.offsetTop;
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        
        window.addEventListener('scroll', () => {
            if (window.innerWidth > 992) {
                const scrolled = window.pageYOffset;
                
                if (scrolled > sidebarTop - headerHeight - 20) {
                    sidebar.style.position = 'sticky';
                    sidebar.style.top = `${headerHeight + 20}px`;
                } else {
                    sidebar.style.position = 'static';
                }
            } else {
                sidebar.style.position = 'static';
            }
        });
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .article-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .article-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);