// RETRO MEMPHIS - TOTALLY RAD JAVASCRIPT
document.addEventListener('DOMContentLoaded', function() {
    // Boot sequence
    runBootSequence();
    
    // Initialize all retro effects
    setTimeout(() => {
        initializeRetroEffects();
        initializeSynthMusic();
        initializeMouseTracking();
        initializeVHSEffects();
        initializeFormHandling();
        updateTimestamp();
    }, 3000);
});

// Commodore 64 Boot Sequence
function runBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    const bootText = bootScreen.querySelector('.boot-text');
    const originalText = bootText.textContent;
    
    // Type out boot sequence
    bootText.textContent = '';
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
        if (charIndex < originalText.length) {
            bootText.textContent += originalText[charIndex];
            charIndex++;
            
            // Add typing sound effect
            playKeySound();
        } else {
            clearInterval(typeInterval);
            setTimeout(() => {
                bootScreen.classList.add('hidden');
            }, 1000);
        }
    }, 30);
}

// Keyboard sound effect
function playKeySound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800 + Math.random() * 400;
    oscillator.type = 'square';
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.05);
}

// Initialize all retro effects
function initializeRetroEffects() {
    // Add glitch effect on hover
    document.querySelectorAll('.glitch-hover').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch 200ms infinite';
        });
        element.addEventListener('mouseleave', () => {
            element.style.animation = '';
        });
    });
    
    // Smooth scrolling with retro feel
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Add VHS static effect during scroll
                addVHSStatic();
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                setTimeout(removeVHSStatic, 500);
            }
        });
    });
}

// VHS static effect
function addVHSStatic() {
    const static = document.createElement('div');
    static.className = 'vhs-static';
    static.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence baseFrequency="0.9"/></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.4"/></svg>');
        z-index: 9998;
        pointer-events: none;
        mix-blend-mode: screen;
        opacity: 0.8;
    `;
    document.body.appendChild(static);
}

function removeVHSStatic() {
    const static = document.querySelector('.vhs-static');
    if (static) {
        static.style.opacity = '0';
        setTimeout(() => static.remove(), 300);
    }
}

// Synth Music System
function initializeSynthMusic() {
    const soundToggle = document.getElementById('sound-toggle');
    let audioContext;
    let isPlaying = false;
    let oscillators = [];
    let gainNodes = [];
    
    soundToggle.addEventListener('click', () => {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        if (isPlaying) {
            stopSynth();
            soundToggle.textContent = '🔇';
            soundToggle.classList.add('muted');
        } else {
            playSynth();
            soundToggle.textContent = '🔊';
            soundToggle.classList.remove('muted');
        }
        
        isPlaying = !isPlaying;
    });
    
    function playSynth() {
        // Create multiple oscillators for that sweet 80s sound
        const frequencies = [110, 220, 330, 440]; // A2, A3, E4, A4
        const waveTypes = ['sawtooth', 'square', 'triangle', 'sine'];
        
        frequencies.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            const filter = audioContext.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = waveTypes[index % waveTypes.length];
            
            filter.type = 'lowpass';
            filter.frequency.value = 1000;
            filter.Q.value = 10;
            
            gainNode.gain.value = 0.05;
            
            // Add some LFO modulation
            const lfo = audioContext.createOscillator();
            const lfoGain = audioContext.createGain();
            lfo.connect(lfoGain);
            lfoGain.connect(oscillator.frequency);
            lfo.frequency.value = 0.5 + index * 0.1;
            lfoGain.gain.value = 5;
            
            oscillator.start();
            lfo.start();
            
            oscillators.push(oscillator, lfo);
            gainNodes.push(gainNode);
        });
        
        // Create drum beat
        createDrumBeat();
    }
    
    function stopSynth() {
        oscillators.forEach(osc => {
            osc.stop();
        });
        oscillators = [];
        gainNodes = [];
    }
    
    function createDrumBeat() {
        const kickFreq = 60;
        const snareFreq = 200;
        const hihatFreq = 800;
        
        function playDrum(freq, time, duration) {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.3, time);
            gain.gain.exponentialRampToValueAtTime(0.01, time + duration);
            
            osc.start(time);
            osc.stop(time + duration);
        }
        
        // Simple 4/4 beat
        const bpm = 120;
        const beatLength = 60 / bpm;
        
        function scheduleBeat() {
            if (!isPlaying) return;
            
            const currentTime = audioContext.currentTime;
            
            // Kick on 1 and 3
            playDrum(kickFreq, currentTime, 0.1);
            playDrum(kickFreq, currentTime + beatLength * 2, 0.1);
            
            // Snare on 2 and 4
            playDrum(snareFreq, currentTime + beatLength, 0.05);
            playDrum(snareFreq, currentTime + beatLength * 3, 0.05);
            
            // Hi-hat 16ths
            for (let i = 0; i < 16; i++) {
                playDrum(hihatFreq, currentTime + (beatLength / 4) * i, 0.01);
            }
            
            setTimeout(scheduleBeat, beatLength * 4 * 1000);
        }
        
        scheduleBeat();
    }
}

// Mouse tracking for geometric shapes
function initializeMouseTracking() {
    const shapes = document.querySelectorAll('.shape');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * 100 * speed;
            const y = (mouseY - 0.5) * 100 * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
        });
    });
}

// VHS glitch effects on project cards
function initializeVHSEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Change synth section based on project
            changeSynthSection(index + 1);
            
            // Add tracking lines
            const lines = document.createElement('div');
            lines.className = 'tracking-lines';
            lines.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(255, 255, 255, 0.03) 2px,
                    rgba(255, 255, 255, 0.03) 4px
                );
                pointer-events: none;
                animation: tracking 0.5s linear infinite;
            `;
            card.appendChild(lines);
        });
        
        card.addEventListener('mouseleave', () => {
            const lines = card.querySelector('.tracking-lines');
            if (lines) lines.remove();
        });
    });
}

// Change synth music based on section
function changeSynthSection(section) {
    // This would change the synth pattern based on the project section
    console.log(`Switching to synth pattern ${section}`);
}

// Update VHS timestamp
function updateTimestamp() {
    const timestamp = document.getElementById('timestamp');
    
    setInterval(() => {
        const now = new Date();
        const year = 1987;
        const time = `${year}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        timestamp.textContent = time;
    }, 1000);
}

// Form handling with retro effects
function initializeFormHandling() {
    const form = document.querySelector('.contact-form-retro');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add glitch effect to button
            const button = form.querySelector('.submit-btn-retro');
            button.style.animation = 'glitch 200ms 5';
            
            // Show retro success message
            const originalText = button.textContent;
            button.textContent = 'TRANSMISSION SUCCESSFUL!';
            button.style.background = 'linear-gradient(45deg, var(--lime), var(--electric-blue))';
            
            // Play success sound
            playSuccessSound();
            
            // Create pixel explosion
            createPixelExplosion(button);
            
            setTimeout(() => {
                form.reset();
                button.textContent = originalText;
                button.style.background = '';
                button.style.animation = '';
            }, 3000);
        });
    }
}

// Success sound effect
function playSuccessSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a series of ascending tones
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    frequencies.forEach((freq, index) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
        }, index * 100);
    });
}

// Pixel explosion effect
function createPixelExplosion(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#FF1493', '#00FFFF', '#00FF00', '#FF00FF', '#FFFF00'];
    
    for (let i = 0; i < 20; i++) {
        const pixel = document.createElement('div');
        pixel.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(pixel);
        
        // Animate pixel
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 200 + Math.random() * 200;
        const duration = 1000;
        
        let start;
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            if (progress < 1) {
                const x = Math.cos(angle) * velocity * progress;
                const y = Math.sin(angle) * velocity * progress - (progress * progress * 200);
                pixel.style.transform = `translate(${x}px, ${y}px) rotate(${progress * 720}deg)`;
                pixel.style.opacity = 1 - progress;
                requestAnimationFrame(animate);
            } else {
                pixel.remove();
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// Add tracking animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes tracking {
        0% { transform: translateY(0); }
        100% { transform: translateY(4px); }
    }
`;
document.head.appendChild(style);