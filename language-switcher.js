// Language Switcher Component
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        // Add language switcher to page
        this.createSwitcher();
        // Apply translations on load
        this.applyTranslations();
    }

    createSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${this.currentLang === 'bg' ? 'active' : ''}" data-lang="bg">BG</button>
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            <button class="lang-btn ${this.currentLang === 'ru' ? 'active' : ''}" data-lang="ru">RU</button>
            <button class="lang-btn ${this.currentLang === 'es' ? 'active' : ''}" data-lang="es">ES</button>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .language-switcher {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                gap: 5px;
                background: rgba(255, 255, 255, 0.9);
                padding: 5px;
                border-radius: 25px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .lang-btn {
                padding: 8px 12px;
                border: none;
                background: transparent;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.3s ease;
                border-radius: 20px;
                font-family: inherit;
            }
            .lang-btn:hover {
                background: #f0f0f0;
            }
            .lang-btn.active {
                background: #333;
                color: white;
            }
            @media (max-width: 768px) {
                .language-switcher {
                    top: 10px;
                    right: 10px;
                }
                .lang-btn {
                    padding: 6px 10px;
                    font-size: 12px;
                }
            }
        `;
        document.head.appendChild(style);

        // Add to body
        document.body.appendChild(switcher);

        // Add event listeners
        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLanguage(e.target.dataset.lang);
            });
        });
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Apply translations
        this.applyTranslations();
    }

    applyTranslations() {
        const t = translations[this.currentLang];
        
        // Apply translations to elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const keys = element.dataset.translate.split('.');
            let translation = t;
            keys.forEach(key => {
                translation = translation[key];
            });
            if (translation) {
                element.textContent = translation;
            }
        });

        // Apply translations to elements with data-translate-placeholder
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const keys = element.dataset.translatePlaceholder.split('.');
            let translation = t;
            keys.forEach(key => {
                translation = translation[key];
            });
            if (translation) {
                element.placeholder = translation;
            }
        });

        // Update document title if it has translation
        const titleElement = document.querySelector('[data-translate-title]');
        if (titleElement) {
            document.title = titleElement.textContent + ' - Studio Arteamo';
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});