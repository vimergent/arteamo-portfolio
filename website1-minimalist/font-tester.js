// Font Testing Menu for Website1-Minimalist
class FontTester {
    constructor() {
        this.cursorEffects = {
            'none': {
                name: 'No Cursor Effects',
                description: 'Standard browser cursor only'
            },
            'minimal': {
                name: 'Minimal Magnetic',
                description: 'Subtle attraction to interactive elements'
            },
            'professional': {
                name: 'Professional Morphing',
                description: 'Shape changes based on content type'
            },
            'luxury': {
                name: 'Luxury Complete',
                description: 'Full suite with premium effects'
            },
            'creative': {
                name: 'Creative Showcase',
                description: 'Dynamic color adaptation with particle trail'
            },
            'boutique': {
                name: 'Boutique Experience',
                description: 'Material reveal with texture previews'
            }
        };

        this.fontCombinations = {
            'current': {
                name: 'Current (Inter + Playfair + Space Grotesk)',
                body: 'Inter',
                headings: 'Space Grotesk',
                serif: 'Playfair Display',
                googleFonts: 'Inter:wght@300;400;500;600;700|Playfair+Display:wght@300;400;500;600;700|Space+Grotesk:wght@300;400;500;600;700'
            },
            'classic': {
                name: 'Classic (Helvetica + Times + Futura)',
                body: 'Helvetica Neue, Arial, sans-serif',
                headings: 'Futura, "Trebuchet MS", sans-serif',
                serif: 'Times New Roman, serif',
                googleFonts: ''
            },
            'modern': {
                name: 'Modern (Roboto + Montserrat + Lora)',
                body: 'Roboto',
                headings: 'Montserrat',
                serif: 'Lora',
                googleFonts: 'Roboto:wght@300;400;500;700|Montserrat:wght@300;400;500;600;700|Lora:wght@300;400;500;600;700'
            },
            'elegant': {
                name: 'Elegant (Source Sans + Crimson + Poppins)',
                body: 'Source Sans Pro',
                headings: 'Poppins',
                serif: 'Crimson Text',
                googleFonts: 'Source+Sans+Pro:wght@300;400;600;700|Poppins:wght@300;400;500;600;700|Crimson+Text:wght@400;600;700'
            },
            'luxury': {
                name: 'Luxury (Avenir + Didot + Caslon)',
                body: 'Avenir, "Century Gothic", sans-serif',
                headings: 'Didot, "Bodoni MT", serif',
                serif: 'Adobe Caslon Pro, "Times New Roman", serif',
                googleFonts: ''
            },
            'minimal': {
                name: 'Minimal (System + SF Pro + New York)',
                body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                headings: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                serif: 'New York, "Times New Roman", serif',
                googleFonts: ''
            },
            'geometric': {
                name: 'Geometric (Nunito + Comfortaa + Merriweather)',
                body: 'Nunito',
                headings: 'Comfortaa',
                serif: 'Merriweather',
                googleFonts: 'Nunito:wght@300;400;500;600;700|Comfortaa:wght@300;400;500;600;700|Merriweather:wght@300;400;700'
            },
            'editorial': {
                name: 'Editorial (Open Sans + Oswald + Libre Baskerville)',
                body: 'Open Sans',
                headings: 'Oswald',
                serif: 'Libre Baskerville',
                googleFonts: 'Open+Sans:wght@300;400;500;600;700|Oswald:wght@300;400;500;600;700|Libre+Baskerville:wght@400;700'
            },
            'designer': {
                name: 'Designer (Work Sans + DM Serif + IBM Plex)',
                body: 'Work Sans',
                headings: 'IBM Plex Sans',
                serif: 'DM Serif Display',
                googleFonts: 'Work+Sans:wght@300;400;500;600;700|IBM+Plex+Sans:wght@300;400;500;600;700|DM+Serif+Display:wght@400'
            },
            'boutique': {
                name: 'Boutique (Jost + Cormorant + Manrope)',
                body: 'Jost',
                headings: 'Manrope',
                serif: 'Cormorant Garamond',
                googleFonts: 'Jost:wght@300;400;500;600;700|Manrope:wght@300;400;500;600;700|Cormorant+Garamond:wght@300;400;500;600;700'
            }
        };
        
        this.init();
    }
    
    init() {
        this.createTestMenu();
        this.loadSavedFont();
        this.applyCurrentFont();
        
        // Apply cursor effects after a short delay to ensure DOM is ready
        setTimeout(() => {
            const savedCursor = localStorage.getItem('selectedCursor');
            if (savedCursor && savedCursor !== 'none') {
                this.applyCursorEffect(savedCursor);
            }
        }, 100);
    }
    
    createTestMenu() {
        const testMenu = document.createElement('div');
        testMenu.id = 'font-test-menu';
        testMenu.innerHTML = `
            <div class="font-test-container">
                <div class="font-test-header">
                    <h3>🎨 Font Tester</h3>
                    <button class="font-test-toggle">Show/Hide</button>
                </div>
                <div class="font-test-content">
                    <div class="font-test-controls">
                        <div class="control-group">
                            <label for="font-selector">Choose Font Combination:</label>
                            <select id="font-selector">
                                ${Object.entries(this.fontCombinations).map(([key, combo]) => 
                                    `<option value="${key}">${combo.name}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="control-group">
                            <label for="cursor-selector">Choose Cursor Effects:</label>
                            <select id="cursor-selector">
                                ${Object.entries(this.cursorEffects).map(([key, effect]) => 
                                    `<option value="${key}">${effect.name}</option>`
                                ).join('')}
                            </select>
                            <small class="cursor-description"></small>
                        </div>
                        <div class="control-buttons">
                            <button id="apply-settings-btn">Apply & Reload</button>
                            <button id="reset-settings-btn">Reset to Default</button>
                        </div>
                    </div>
                    <div class="font-preview">
                        <div class="preview-text">
                            <h1 class="preview-heading">Studio Arteamo</h1>
                            <h2 class="preview-serif">Creating Spaces That Inspire</h2>
                            <p class="preview-body">We believe that every space is a place for expressing ideas and emotions. Our mission is to create interiors that inspire and change the way we see the world.</p>
                            <div class="preview-nav">Projects | About | Services | Contact</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.prepend(testMenu);
        this.addTestMenuStyles();
        this.addEventListeners();
    }
    
    addTestMenuStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            #font-test-menu {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                color: white;
                z-index: 10000;
                border-bottom: 3px solid #d4af37;
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }
            
            .font-test-container {
                max-width: 1400px;
                margin: 0 auto;
                padding: 0;
            }
            
            .font-test-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 20px;
                background: rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
            }
            
            .font-test-header h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                color: #d4af37;
            }
            
            .font-test-toggle {
                background: transparent;
                border: 1px solid #d4af37;
                color: #d4af37;
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.3s ease;
            }
            
            .font-test-toggle:hover {
                background: #d4af37;
                color: #1a1a1a;
            }
            
            .font-test-content {
                padding: 20px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
            }
            
            .font-test-content.hidden {
                display: none;
            }
            
            .font-test-controls {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            .control-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            .control-buttons {
                display: flex;
                gap: 10px;
                margin-top: 10px;
            }
            
            .font-test-controls label {
                font-weight: 500;
                color: #d4af37;
                font-size: 14px;
            }
            
            #font-selector, #cursor-selector {
                padding: 10px 15px;
                border: 1px solid #444;
                border-radius: 6px;
                background: #333;
                color: white;
                font-size: 14px;
                cursor: pointer;
                width: 100%;
            }
            
            #font-selector:focus, #cursor-selector:focus {
                outline: none;
                border-color: #d4af37;
                box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
            }
            
            .cursor-description {
                font-size: 12px;
                color: #999;
                font-style: italic;
                margin-top: 4px;
            }
            
            #apply-settings-btn, #reset-settings-btn {
                padding: 12px 20px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
                font-size: 14px;
                flex: 1;
            }
            
            #apply-settings-btn {
                background: linear-gradient(135deg, #d4af37, #f4d03f);
                color: #1a1a1a;
            }
            
            #apply-settings-btn:hover {
                background: linear-gradient(135deg, #f4d03f, #d4af37);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
            }
            
            #reset-settings-btn {
                background: transparent;
                color: #ccc;
                border: 1px solid #666;
            }
            
            #reset-settings-btn:hover {
                background: #666;
                color: white;
            }
            
            .font-preview {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 8px;
                padding: 25px;
                color: #333;
            }
            
            .preview-text {
                line-height: 1.6;
            }
            
            .preview-heading {
                font-size: 24px;
                font-weight: 700;
                margin: 0 0 10px 0;
                color: #1a1a1a;
            }
            
            .preview-serif {
                font-size: 20px;
                font-weight: 300;
                margin: 0 0 15px 0;
                color: #2d2d2d;
                font-style: italic;
            }
            
            .preview-body {
                font-size: 14px;
                margin: 0 0 15px 0;
                color: #666;
                line-height: 1.7;
            }
            
            .preview-nav {
                font-size: 12px;
                color: #999;
                border-top: 1px solid #eee;
                padding-top: 15px;
                font-weight: 500;
            }
            
            /* Adjust main content to account for test menu */
            body {
                padding-top: 0;
            }
            
            .navbar {
                top: 0;
            }
            
            .hero {
                margin-top: 140px;
            }
            
            /* Mobile responsiveness */
            @media (max-width: 768px) {
                .font-test-content {
                    grid-template-columns: 1fr;
                    gap: 20px;
                    padding: 15px;
                }
                
                .font-test-header {
                    padding: 10px 15px;
                }
                
                .font-test-header h3 {
                    font-size: 14px;
                }
                
                .hero {
                    margin-top: 120px;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    addEventListeners() {
        const fontSelector = document.getElementById('font-selector');
        const cursorSelector = document.getElementById('cursor-selector');
        const applyBtn = document.getElementById('apply-settings-btn');
        const resetBtn = document.getElementById('reset-settings-btn');
        const toggleBtn = document.querySelector('.font-test-toggle');
        const content = document.querySelector('.font-test-content');
        const cursorDesc = document.querySelector('.cursor-description');
        
        // Font selection change
        fontSelector.addEventListener('change', () => {
            this.updatePreview(fontSelector.value);
        });
        
        // Cursor selection change
        cursorSelector.addEventListener('change', () => {
            this.updateCursorDescription(cursorSelector.value);
        });
        
        // Apply settings
        applyBtn.addEventListener('click', () => {
            this.applySettings(fontSelector.value, cursorSelector.value);
        });
        
        // Reset to default
        resetBtn.addEventListener('click', () => {
            this.resetSettings();
        });
        
        // Toggle menu visibility
        toggleBtn.addEventListener('click', () => {
            content.classList.toggle('hidden');
            localStorage.setItem('fontTestMenuHidden', content.classList.contains('hidden'));
        });
        
        // Load menu state
        if (localStorage.getItem('fontTestMenuHidden') === 'true') {
            content.classList.add('hidden');
        }
    }
    
    updatePreview(fontKey) {
        const combo = this.fontCombinations[fontKey];
        if (!combo) return;
        
        const preview = document.querySelector('.preview-text');
        preview.style.fontFamily = combo.body;
        
        const heading = preview.querySelector('.preview-heading');
        heading.style.fontFamily = combo.headings;
        
        const serif = preview.querySelector('.preview-serif');
        serif.style.fontFamily = combo.serif;
        
        const nav = preview.querySelector('.preview-nav');
        nav.style.fontFamily = combo.headings;
    }
    
    updateCursorDescription(cursorKey) {
        const effect = this.cursorEffects[cursorKey];
        const desc = document.querySelector('.cursor-description');
        if (effect && desc) {
            desc.textContent = effect.description;
        }
    }
    
    applySettings(fontKey, cursorKey) {
        const combo = this.fontCombinations[fontKey];
        if (!combo) return;
        
        // Save selections
        localStorage.setItem('selectedFont', fontKey);
        localStorage.setItem('selectedCursor', cursorKey);
        
        // Show loading state
        const applyBtn = document.getElementById('apply-settings-btn');
        applyBtn.textContent = 'Applying...';
        applyBtn.disabled = true;
        
        // Apply settings and reload
        setTimeout(() => {
            // If we have Google Fonts to load, load them first
            if (combo.googleFonts) {
                this.loadGoogleFonts(combo.googleFonts, () => {
                    this.updateSiteStyles(combo);
                    window.location.reload();
                });
            } else {
                // No Google Fonts needed, just apply styles and reload
                this.updateSiteStyles(combo);
                window.location.reload();
            }
        }, 300);
    }
    
    resetSettings() {
        localStorage.removeItem('selectedFont');
        localStorage.removeItem('selectedCursor');
        document.getElementById('font-selector').value = 'current';
        document.getElementById('cursor-selector').value = 'none';
        this.updatePreview('current');
        this.updateCursorDescription('none');
        
        const resetBtn = document.getElementById('reset-settings-btn');
        resetBtn.textContent = 'Resetting...';
        resetBtn.disabled = true;
        
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
    
    loadSavedFont() {
        const savedFont = localStorage.getItem('selectedFont');
        const savedCursor = localStorage.getItem('selectedCursor');
        
        if (savedFont && this.fontCombinations[savedFont]) {
            document.getElementById('font-selector').value = savedFont;
            this.updatePreview(savedFont);
        }
        
        if (savedCursor && this.cursorEffects[savedCursor]) {
            document.getElementById('cursor-selector').value = savedCursor;
            this.updateCursorDescription(savedCursor);
        } else {
            document.getElementById('cursor-selector').value = 'none';
            this.updateCursorDescription('none');
        }
    }
    
    applyCurrentFont() {
        const savedFont = localStorage.getItem('selectedFont');
        const savedCursor = localStorage.getItem('selectedCursor');
        
        if (savedFont && this.fontCombinations[savedFont]) {
            const combo = this.fontCombinations[savedFont];
            this.loadGoogleFonts(combo.googleFonts, () => {
                this.updateSiteStyles(combo);
            });
        }
        
        if (savedCursor && this.cursorEffects[savedCursor]) {
            this.applyCursorEffect(savedCursor);
        }
    }
    
    applyCursorEffect(cursorKey) {
        // Remove any existing cursor effects
        document.body.classList.remove('custom-cursor-enabled');
        const existingCursor = document.querySelector('.cursor');
        if (existingCursor) {
            existingCursor.remove();
        }
        
        // Remove existing cursor style
        const existingCursorStyle = document.getElementById('cursor-effect-styles');
        if (existingCursorStyle) {
            existingCursorStyle.remove();
        }
        
        if (cursorKey === 'none') {
            return; // No cursor effects
        }
        
        // Apply the selected cursor effect
        document.body.classList.add('custom-cursor-enabled');
        this.initializeCursorEffect(cursorKey);
    }
    
    initializeCursorEffect(cursorKey) {
        // Create cursor element
        const cursor = document.createElement('div');
        cursor.className = `cursor cursor-${cursorKey}`;
        document.body.appendChild(cursor);
        
        // Add cursor styles
        this.addCursorStyles(cursorKey);
        
        // Initialize cursor behavior based on type
        switch (cursorKey) {
            case 'minimal':
                this.initMinimalMagnetic(cursor);
                break;
            case 'professional':
                this.initProfessionalMorphing(cursor);
                break;
            case 'luxury':
                this.initLuxuryComplete(cursor);
                break;
            case 'creative':
                this.initCreativeShowcase(cursor);
                break;
            case 'boutique':
                this.initBoutiqueExperience(cursor);
                break;
        }
    }
    
    loadGoogleFonts(fontString, callback) {
        if (!fontString) {
            callback();
            return;
        }
        
        // Remove existing Google Fonts
        const existingLink = document.querySelector('link[href*="fonts.googleapis.com"]');
        if (existingLink) {
            existingLink.remove();
        }
        
        // Add new Google Fonts
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontString}&display=swap`;
        link.rel = 'stylesheet';
        link.onload = callback;
        document.head.appendChild(link);
    }
    
    updateSiteStyles(combo) {
        // Create dynamic style override
        let styleElement = document.getElementById('dynamic-font-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'dynamic-font-styles';
            document.head.appendChild(styleElement);
        }
        
        styleElement.textContent = `
            /* Dynamic Font Override */
            body {
                font-family: ${combo.body}, -apple-system, BlinkMacSystemFont, sans-serif !important;
            }
            
            h1, h2, h3, h4, h5, h6,
            .logo h1,
            .nav-link,
            .filter-btn,
            .project-info h3 {
                font-family: ${combo.headings}, sans-serif !important;
            }
            
            .serif,
            .hero-title.serif,
            h2.serif {
                font-family: ${combo.serif}, serif !important;
            }
            
            /* Ensure font weights work */
            .logo h1 {
                font-weight: 700 !important;
            }
            
            .hero-title {
                font-weight: 300 !important;
            }
            
            .nav-link {
                font-weight: 500 !important;
            }
        `;
    }
    
    addCursorStyles(cursorKey) {
        const styleElement = document.createElement('style');
        styleElement.id = 'cursor-effect-styles';
        
        const baseStyles = `
            .cursor {
                position: fixed;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
        `;
        
        const cursorStyles = {
            minimal: `
                .cursor-minimal {
                    width: 20px;
                    height: 20px;
                    background: #d4af37;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                }
                .cursor-minimal.hover {
                    transform: translate(-50%, -50%) scale(1.5);
                    background: #f4d03f;
                }
            `,
            professional: `
                .cursor-professional {
                    width: 24px;
                    height: 24px;
                    border: 2px solid #d4af37;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    background: transparent;
                }
                .cursor-professional.hover {
                    border-radius: 4px;
                    transform: translate(-50%, -50%) scale(1.2);
                }
                .cursor-professional.text {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: rgba(212, 175, 55, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    color: #d4af37;
                    font-weight: 600;
                }
            `,
            luxury: `
                .cursor-luxury {
                    width: 30px;
                    height: 30px;
                    background: linear-gradient(45deg, #d4af37, #f4d03f);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
                }
                .cursor-luxury.hover {
                    transform: translate(-50%, -50%) scale(1.3);
                    box-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
                }
                .cursor-luxury::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 10px;
                    height: 10px;
                    background: white;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                }
            `,
            creative: `
                .cursor-creative {
                    width: 25px;
                    height: 25px;
                    background: #d4af37;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    position: relative;
                }
                .cursor-creative.hover {
                    background: #e74c3c;
                    transform: translate(-50%, -50%) scale(1.4);
                }
                .cursor-creative::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 40px;
                    height: 40px;
                    border: 1px solid currentColor;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0.3;
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
                }
            `,
            boutique: `
                .cursor-boutique {
                    width: 28px;
                    height: 28px;
                    background: rgba(212, 175, 55, 0.1);
                    border: 2px solid #d4af37;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    backdrop-filter: blur(10px);
                }
                .cursor-boutique.hover {
                    transform: translate(-50%, -50%) scale(1.2);
                    background: rgba(212, 175, 55, 0.2);
                }
                .cursor-boutique.texture {
                    background-image: radial-gradient(circle, #d4af37 1px, transparent 1px);
                    background-size: 8px 8px;
                }
            `
        };
        
        styleElement.textContent = baseStyles + (cursorStyles[cursorKey] || '');
        document.head.appendChild(styleElement);
    }
    
    initMinimalMagnetic(cursor) {
        let mouse = { x: 0, y: 0 };
        let pos = { x: 0, y: 0 };
        
        const updateCursor = () => {
            pos.x += (mouse.x - pos.x) * 0.1;
            pos.y += (mouse.y - pos.y) * 0.1;
            cursor.style.left = pos.x + 'px';
            cursor.style.top = pos.y + 'px';
            requestAnimationFrame(updateCursor);
        };
        
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        
        // Magnetic effect on hover
        document.querySelectorAll('a, button, .project-card, .filter-btn').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
        
        updateCursor();
    }
    
    initProfessionalMorphing(cursor) {
        let mouse = { x: 0, y: 0 };
        
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            cursor.style.left = mouse.x + 'px';
            cursor.style.top = mouse.y + 'px';
        });
        
        document.querySelectorAll('.project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('text');
                cursor.textContent = 'VIEW';
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('text');
                cursor.textContent = '';
            });
        });
        
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
    
    initLuxuryComplete(cursor) {
        let mouse = { x: 0, y: 0 };
        let pos = { x: 0, y: 0 };
        
        const updateCursor = () => {
            pos.x += (mouse.x - pos.x) * 0.15;
            pos.y += (mouse.y - pos.y) * 0.15;
            cursor.style.left = pos.x + 'px';
            cursor.style.top = pos.y + 'px';
            requestAnimationFrame(updateCursor);
        };
        
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        
        document.querySelectorAll('a, button, .project-card, .filter-btn').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
        
        updateCursor();
    }
    
    initCreativeShowcase(cursor) {
        let mouse = { x: 0, y: 0 };
        const colors = ['#d4af37', '#e74c3c', '#3498db', '#2ecc71', '#f39c12'];
        let colorIndex = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            cursor.style.left = mouse.x + 'px';
            cursor.style.top = mouse.y + 'px';
        });
        
        document.querySelectorAll('.project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursor.style.background = colors[colorIndex % colors.length];
                colorIndex++;
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursor.style.background = '#d4af37';
            });
        });
    }
    
    initBoutiqueExperience(cursor) {
        let mouse = { x: 0, y: 0 };
        
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            cursor.style.left = mouse.x + 'px';
            cursor.style.top = mouse.y + 'px';
        });
        
        document.querySelectorAll('.project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover', 'texture');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover', 'texture');
            });
        });
        
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
}

// Initialize font tester when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new FontTester());
} else {
    new FontTester();
}