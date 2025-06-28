// Bulgarian Traditional - Whimsical Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor and trail (desktop only)
    if (window.innerWidth > 768) {
        setupCursorTrail();
    }
    
    // Rotunda color change on scroll
    setupRotundaAnimation();
    
    // Easter egg keyboard shortcut
    setupEasterEgg();
    
    // Smooth scrolling
    setupSmoothScroll();
    
    // Form handling
    setupFormHandling();
    
    // Folk pattern animations
    setupPatternAnimations();
});

// Cursor Trail with Floral Glyphs
function setupCursorTrail() {
    const cursorTrail = document.getElementById('cursor-trail');
    const glyphs = ['🌸', '🌼', '🌻', '🌺', '🌷', '🌹', '❀', '✿', '❁', '✾'];
    let mouseX = 0, mouseY = 0;
    let cursorVisible = false;
    
    // Custom cursor
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid var(--terracotta);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor position
        cursor.style.left = mouseX - 15 + 'px';
        cursor.style.top = mouseY - 15 + 'px';
        
        // Create trail glyph
        if (Math.random() < 0.1) { // 10% chance to create a glyph
            createTrailGlyph(mouseX, mouseY);
        }
    });
    
    // Cursor hover effects
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches('a, button, .project-card')) {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--sunflower)';
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.matches('a, button, .project-card')) {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--terracotta)';
        }
    });
    
    function createTrailGlyph(x, y) {
        const glyph = document.createElement('div');
        glyph.className = 'trail-glyph';
        glyph.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        glyph.style.left = x + 'px';
        glyph.style.top = y + 'px';
        glyph.style.color = `hsl(${Math.random() * 60 + 15}, 70%, 60%)`; // Random warm colors
        
        cursorTrail.appendChild(glyph);
        
        // Remove after animation
        setTimeout(() => {
            glyph.remove();
        }, 1000);
    }
}

// Rotunda Icon Color Animation
function setupRotundaAnimation() {
    const header = document.querySelector('.header');
    const rotunda = document.querySelector('.rotunda-icon');
    const colors = ['#C26A50', '#F4B500', '#006D77', '#0D1B2A'];
    let colorIndex = 0;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            header.classList.add('scrolled');
            
            // Change color every 300px of scroll
            const newColorIndex = Math.floor(scrolled / 300) % colors.length;
            if (newColorIndex !== colorIndex) {
                colorIndex = newColorIndex;
                rotunda.style.color = colors[colorIndex];
            }
        } else {
            header.classList.remove('scrolled');
            rotunda.style.color = colors[0];
        }
    });
}

// Easter Egg - Hidden Gallery
function setupEasterEgg() {
    const keys = [];
    const secretCode = ['V', 'A', 'R'];
    
    document.addEventListener('keydown', (e) => {
        keys.push(e.key.toUpperCase());
        keys.splice(-secretCode.length - 1, keys.length - secretCode.length);
        
        if (keys.join('').includes(secretCode.join(''))) {
            showEasterEggGallery();
            keys.length = 0; // Reset
        }
    });
    
    // Close button
    document.querySelector('.close-egg').addEventListener('click', () => {
        document.getElementById('easter-egg-gallery').classList.add('hidden');
    });
    
    // Also allow clicking the secondary CTA
    document.querySelector('.cta-secondary').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Подсказка: Опитайте да напишете V-A-R на клавиатурата! 😊');
    });
}

function showEasterEggGallery() {
    const gallery = document.getElementById('easter-egg-gallery');
    gallery.classList.remove('hidden');
    
    // Add entrance animation
    gallery.style.opacity = '0';
    setTimeout(() => {
        gallery.style.transition = 'opacity 0.5s ease';
        gallery.style.opacity = '1';
    }, 10);
    
    // Confetti effect
    createConfetti();
}

function createConfetti() {
    const colors = ['#C26A50', '#F4B500', '#006D77'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: ${Math.random()};
            transform: rotate(${Math.random() * 360}deg);
            animation: confetti-fall 3s ease-out forwards;
            z-index: 2001;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Add confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth Scrolling
function setupSmoothScroll() {
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
}

// Form Handling
function setupFormHandling() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            // Success animation
            button.textContent = '✓ Изпратено!';
            button.style.background = 'var(--sunflower)';
            
            // Create floating hearts
            createFloatingHearts(button);
            
            setTimeout(() => {
                this.reset();
                button.textContent = originalText;
                button.style.background = '';
            }, 3000);
        });
    }
}

function createFloatingHearts(element) {
    const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top}px;
                font-size: 20px;
                animation: float-up 2s ease-out forwards;
                pointer-events: none;
                z-index: 1000;
            `;
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 100);
    }
}

// Add float-up animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float-up {
        to {
            transform: translateY(-100px) translateX(${Math.random() * 40 - 20}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatStyle);

// Pattern Animations
function setupPatternAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Add a unique pattern overlay based on index
            const pattern = card.querySelector('.project-pattern');
            if (pattern) {
                const patterns = [
                    'linear-gradient(45deg, transparent 30%, var(--terracotta) 30%, var(--terracotta) 70%, transparent 70%)',
                    'radial-gradient(circle, var(--sunflower) 20%, transparent 20%)',
                    'repeating-linear-gradient(90deg, var(--peacock) 0, var(--peacock) 10px, transparent 10px, transparent 20px)'
                ];
                pattern.style.background = patterns[index % patterns.length];
            }
        });
    });
}

// Initialize explore projects button
document.querySelector('.cta-primary').addEventListener('click', () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});