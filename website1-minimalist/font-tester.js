// Font Testing Menu for Website1-Minimalist
class FontTester {
    constructor() {
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
                        <label for="font-selector">Choose Font Combination:</label>
                        <select id="font-selector">
                            ${Object.entries(this.fontCombinations).map(([key, combo]) => 
                                `<option value="${key}">${combo.name}</option>`
                            ).join('')}
                        </select>
                        <button id="apply-font-btn">Apply & Reload</button>
                        <button id="reset-font-btn">Reset to Default</button>
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
                gap: 15px;
            }
            
            .font-test-controls label {
                font-weight: 500;
                color: #d4af37;
                font-size: 14px;
            }
            
            #font-selector {
                padding: 10px 15px;
                border: 1px solid #444;
                border-radius: 6px;
                background: #333;
                color: white;
                font-size: 14px;
                cursor: pointer;
            }
            
            #font-selector:focus {
                outline: none;
                border-color: #d4af37;
                box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
            }
            
            #apply-font-btn, #reset-font-btn {
                padding: 12px 20px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
                font-size: 14px;
            }
            
            #apply-font-btn {
                background: linear-gradient(135deg, #d4af37, #f4d03f);
                color: #1a1a1a;
            }
            
            #apply-font-btn:hover {
                background: linear-gradient(135deg, #f4d03f, #d4af37);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
            }
            
            #reset-font-btn {
                background: transparent;
                color: #ccc;
                border: 1px solid #666;
            }
            
            #reset-font-btn:hover {
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
        const selector = document.getElementById('font-selector');
        const applyBtn = document.getElementById('apply-font-btn');
        const resetBtn = document.getElementById('reset-font-btn');
        const toggleBtn = document.querySelector('.font-test-toggle');
        const content = document.querySelector('.font-test-content');
        
        // Font selection change
        selector.addEventListener('change', () => {
            this.updatePreview(selector.value);
        });
        
        // Apply font
        applyBtn.addEventListener('click', () => {
            this.applyFont(selector.value);
        });
        
        // Reset to default
        resetBtn.addEventListener('click', () => {
            this.resetFont();
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
    
    applyFont(fontKey) {
        const combo = this.fontCombinations[fontKey];
        if (!combo) return;
        
        // Save selection
        localStorage.setItem('selectedFont', fontKey);
        
        // Show loading state
        const applyBtn = document.getElementById('apply-font-btn');
        applyBtn.textContent = 'Applying...';
        applyBtn.disabled = true;
        
        // Apply font and reload
        setTimeout(() => {
            this.loadGoogleFonts(combo.googleFonts, () => {
                this.updateSiteStyles(combo);
                window.location.reload();
            });
        }, 500);
    }
    
    resetFont() {
        localStorage.removeItem('selectedFont');
        document.getElementById('font-selector').value = 'current';
        this.updatePreview('current');
        
        const resetBtn = document.getElementById('reset-font-btn');
        resetBtn.textContent = 'Resetting...';
        resetBtn.disabled = true;
        
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
    
    loadSavedFont() {
        const saved = localStorage.getItem('selectedFont');
        if (saved && this.fontCombinations[saved]) {
            document.getElementById('font-selector').value = saved;
            this.updatePreview(saved);
        }
    }
    
    applyCurrentFont() {
        const saved = localStorage.getItem('selectedFont');
        if (saved && this.fontCombinations[saved]) {
            const combo = this.fontCombinations[saved];
            this.loadGoogleFonts(combo.googleFonts, () => {
                this.updateSiteStyles(combo);
            });
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
}

// Initialize font tester when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new FontTester());
} else {
    new FontTester();
}