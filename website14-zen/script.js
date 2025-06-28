// ZEN MEDITATION PORTFOLIO - MINDFUL INTERACTIONS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    initBreathingIntro();
    initMindfulScrolling();
    initInkWashEffects();
    initHaikuTyping();
    initZenGarden();
    initAmbientMode();
    initSoundDesign();
    initFormInteractions();
    initNavScrollEffect();
});

// Breathing Intro
function initBreathingIntro() {
    const breathingIntro = document.getElementById('breathing-intro');
    let breathCount = 0;
    
    // Track breathing cycles
    const breathInterval = setInterval(() => {
        breathCount++;
        if (breathCount >= 3) { // After 3 breath cycles (12 seconds)
            clearInterval(breathInterval);
            breathingIntro.classList.add('hidden');
            
            // Start hero animations
            setTimeout(() => {
                startHeroAnimations();
            }, 500);
        }
    }, 4000);
}

// Start hero animations after breathing
function startHeroAnimations() {
    const haikuLines = document.querySelectorAll('.hero-haiku .haiku-line');
    haikuLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            typeHaiku(line, getCurrentTranslation(`haiku_line${index + 1}`));
        }, index * 1000);
    });
}

// Mindful Scrolling - Slow down scroll speed
function initMindfulScrolling() {
    let isScrolling = false;
    let scrollTimeout;
    
    window.addEventListener('wheel', function(e) {
        if (!isScrolling) {
            e.preventDefault();
            
            const delta = e.deltaY;
            const scrollSpeed = 0.3; // Slow down to 30% of normal speed
            
            window.scrollBy({
                top: delta * scrollSpeed,
                behavior: 'smooth'
            });
            
            isScrolling = true;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 50);
        }
    }, { passive: false });
}

// Ink Wash Effects for Images
function initInkWashEffects() {
    const images = document.querySelectorAll('.project-image');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('ink-wash-loading');
                
                // Simulate ink wash reveal
                setTimeout(() => {
                    img.classList.remove('ink-wash-loading');
                    img.classList.add('ink-wash-loaded');
                }, 100);
                
                imageObserver.unobserve(img);
            }
        });
    }, observerOptions);
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Haiku Typing Effect
function initHaikuTyping() {
    const projectHaikus = document.querySelectorAll('.project-haiku .haiku-text');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const haikuObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const haiku = entry.target;
                const text = haiku.getAttribute('data-text');
                typeHaiku(haiku, text);
                haikuObserver.unobserve(haiku);
            }
        });
    }, observerOptions);
    
    projectHaikus.forEach(haiku => {
        haikuObserver.observe(haiku);
    });
}

// Type haiku character by character
function typeHaiku(element, text) {
    element.innerHTML = '<span class="haiku-cursor">|</span>';
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
            const cursor = element.querySelector('.haiku-cursor');
            const char = text[charIndex];
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            element.insertBefore(charSpan, cursor);
            charIndex++;
            
            // Play soft typing sound
            if (window.soundEnabled) {
                playTypingSound();
            }
        } else {
            clearInterval(typeInterval);
            // Keep cursor blinking
        }
    }, 100);
}

// Zen Garden
function initZenGarden() {
    const zenGarden = document.getElementById('zen-garden');
    const canvas = document.getElementById('sand-canvas');
    const ctx = canvas.getContext('2d');
    const tools = document.querySelectorAll('.tool-btn');
    
    let currentTool = 'rake';
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawSandPattern();
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Draw initial sand pattern
    function drawSandPattern() {
        ctx.fillStyle = '#D4C5B9';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add subtle texture
        for (let i = 0; i < 10000; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const opacity = Math.random() * 0.1;
            ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
    
    // Tool selection
    tools.forEach(tool => {
        tool.addEventListener('click', () => {
            tools.forEach(t => t.classList.remove('active'));
            tool.classList.add('active');
            currentTool = tool.getAttribute('data-tool');
            
            if (currentTool === 'clear') {
                drawSandPattern();
            }
        });
    });
    
    // Drawing functions
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    function startDrawing(e) {
        if (currentTool === 'clear') return;
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        if (currentTool === 'rake') {
            // Draw rake patterns
            ctx.strokeStyle = 'rgba(44, 44, 44, 0.1)';
            ctx.lineWidth = 3;
            
            // Multiple parallel lines for rake effect
            for (let i = -10; i <= 10; i += 5) {
                ctx.beginPath();
                ctx.moveTo(lastX + i, lastY);
                ctx.lineTo(e.offsetX + i, e.offsetY);
                ctx.stroke();
            }
        } else if (currentTool === 'stone') {
            // Place stones
            ctx.fillStyle = 'rgba(44, 44, 44, 0.8)';
            ctx.beginPath();
            ctx.arc(e.offsetX, e.offsetY, 20, 0, Math.PI * 2);
            ctx.fill();
            
            // Add stone shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.beginPath();
            ctx.arc(e.offsetX + 3, e.offsetY + 3, 20, 0, Math.PI * 2);
            ctx.fill();
        }
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    // Activate zen garden with secret gesture
    let secretKeys = [];
    document.addEventListener('keydown', (e) => {
        secretKeys.push(e.key.toLowerCase());
        secretKeys = secretKeys.slice(-3);
        
        if (secretKeys.join('') === 'zen') {
            zenGarden.classList.toggle('active');
            if (zenGarden.classList.contains('active')) {
                playBowlSound();
            }
        }
    });
}

// Ambient Mode
function initAmbientMode() {
    const ambientMode = document.getElementById('ambient-mode');
    const floatingImages = document.querySelector('.floating-images');
    let inactivityTimer;
    let ambientActive = false;
    
    const projectImages = [
        '../Apartament Flavia Garden 2024/cam010.jpg',
        '../Elite Clinic 2021/Cam07.jpg',
        '../Apartament K55_2021/Vladi (7).jpg',
        '../Apartament Симфония - Бриз, Варна_ 2019/2.jpg',
        '../Balev Corporation 2020/04.jpg'
    ];
    
    function startAmbientMode() {
        if (ambientActive) return;
        ambientActive = true;
        ambientMode.classList.add('active');
        
        // Create floating images
        projectImages.forEach((src, index) => {
            setTimeout(() => {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'floating-image';
                imgContainer.style.left = Math.random() * 80 + '%';
                imgContainer.style.animationDelay = `${index * 4}s`;
                
                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Floating project';
                
                imgContainer.appendChild(img);
                floatingImages.appendChild(imgContainer);
            }, index * 1000);
        });
        
        // Start ambient sounds
        if (window.soundEnabled) {
            playRainSound();
        }
    }
    
    function stopAmbientMode() {
        ambientActive = false;
        ambientMode.classList.remove('active');
        floatingImages.innerHTML = '';
        stopRainSound();
    }
    
    // Reset inactivity timer
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        if (!ambientActive) {
            inactivityTimer = setTimeout(startAmbientMode, 30000); // 30 seconds
        }
    }
    
    // Monitor user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetInactivityTimer, true);
    });
    
    // Click to exit ambient mode
    ambientMode.addEventListener('click', () => {
        stopAmbientMode();
        resetInactivityTimer();
    });
    
    resetInactivityTimer();
}

// Sound Design
let audioContext;
let rainGain;
let isPlayingRain = false;

function initSoundDesign() {
    const soundToggle = document.getElementById('sound-toggle');
    window.soundEnabled = false;
    
    soundToggle.addEventListener('click', () => {
        window.soundEnabled = !window.soundEnabled;
        soundToggle.classList.toggle('muted');
        
        if (!window.soundEnabled) {
            stopRainSound();
        }
        
        // Update icon
        soundToggle.querySelector('.sound-icon').textContent = window.soundEnabled ? '🔔' : '🔕';
    });
}

// Tibetan Singing Bowl Sound
function playBowlSound() {
    if (!window.soundEnabled) return;
    
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Fundamental frequency of singing bowl (around F#3)
    oscillator.frequency.value = 185;
    oscillator.type = 'sine';
    
    // Create harmonics
    const harmonics = [2, 3, 4.2, 5.4];
    harmonics.forEach(ratio => {
        const harmonic = audioContext.createOscillator();
        const harmonicGain = audioContext.createGain();
        
        harmonic.frequency.value = 185 * ratio;
        harmonic.type = 'sine';
        harmonicGain.gain.value = 0.1 / ratio;
        
        harmonic.connect(harmonicGain);
        harmonicGain.connect(audioContext.destination);
        
        harmonic.start();
        harmonic.stop(audioContext.currentTime + 3);
    });
    
    // Envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 3);
}

// Typing Sound
function playTypingSound() {
    if (!window.soundEnabled) return;
    
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800 + Math.random() * 400;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.05);
}

// Rain Sound
function playRainSound() {
    if (!window.soundEnabled || isPlayingRain) return;
    
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    isPlayingRain = true;
    
    // Create white noise for rain
    const bufferSize = 2 * audioContext.sampleRate;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    
    const whiteNoise = audioContext.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    
    // Filter to make it sound like rain
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    
    rainGain = audioContext.createGain();
    rainGain.gain.value = 0.05;
    
    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(audioContext.destination);
    
    whiteNoise.start();
}

function stopRainSound() {
    if (rainGain) {
        rainGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        isPlayingRain = false;
    }
}

// Form Interactions
function initFormInteractions() {
    const form = document.querySelector('.contact-form-zen');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Play bowl sound on submit
            playBowlSound();
            
            // Show success message mindfully
            const submitBtn = form.querySelector('.submit-zen');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = getCurrentTranslation('form_sent') || '✓';
            
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
            }, 3000);
        });
    }
}

// Navigation scroll effect
function initNavScrollEffect() {
    const nav = document.querySelector('.zen-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Get current translation
function getCurrentTranslation(key) {
    const currentLang = document.documentElement.lang || 'bg';
    if (window.translations && window.translations[currentLang] && window.translations[currentLang].zen) {
        return window.translations[currentLang].zen[key] || key;
    }
    return key;
}