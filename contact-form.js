// Contact Form Handler for Studio Arteamo
class ContactForm {
    constructor() {
        this.formId = 'contactForm';
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        
        const formContainer = document.getElementById('contactFormContainer');
        if (!formContainer) return;
        
        this.createForm(formContainer);
        this.attachEventListeners();
        this.initialized = true;
    }

    createForm(container) {
        const currentLang = localStorage.getItem('selectedLanguage') || 'en';
        const translations = window.translations && window.translations[currentLang] ? 
            window.translations[currentLang].contact : {};
        
        container.innerHTML = `
            <form id="${this.formId}" class="contact-form">
                <div class="form-group">
                    <label for="name">${translations.formName || 'Name'} *</label>
                    <input type="text" id="name" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">${translations.formEmail || 'Email'} *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="phone">${translations.formPhone || 'Phone'}</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                
                <div class="form-group">
                    <label for="subject">${translations.formSubject || 'Subject'} *</label>
                    <input type="text" id="subject" name="subject" required>
                </div>
                
                <div class="form-group">
                    <label for="message">${translations.formMessage || 'Message'} *</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                
                <div class="form-group">
                    <button type="submit" class="submit-btn">
                        ${translations.formSubmit || 'Send Message'}
                    </button>
                </div>
                
                <div id="formStatus" class="form-status"></div>
            </form>
        `;
        
        this.addStyles();
    }

    addStyles() {
        if (document.getElementById('contactFormStyles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'contactFormStyles';
        styles.innerHTML = `
            .contact-form {
                max-width: 600px;
                margin: 0 auto;
            }
            
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: var(--text-primary, #333);
            }
            
            .form-group input,
            .form-group textarea {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--border-color, #e0e0e0);
                border-radius: 4px;
                font-size: 1rem;
                font-family: inherit;
                transition: border-color 0.3s, box-shadow 0.3s;
            }
            
            .form-group input:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: var(--accent-color, #000);
                box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
            }
            
            .submit-btn {
                background: var(--primary-color, #000);
                color: white;
                border: none;
                padding: 0.875rem 2rem;
                font-size: 1rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .submit-btn:hover {
                background: var(--accent-color, #333);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }
            
            .submit-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
            }
            
            .form-status {
                margin-top: 1rem;
                padding: 1rem;
                border-radius: 4px;
                display: none;
                text-align: center;
            }
            
            .form-status.success {
                background: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
                display: block;
            }
            
            .form-status.error {
                background: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
                display: block;
            }
        `;
        
        document.head.appendChild(styles);
    }

    attachEventListeners() {
        const form = document.getElementById(this.formId);
        if (!form) return;
        
        form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Update form when language changes
        document.addEventListener('languageChanged', () => {
            const container = document.getElementById('contactFormContainer');
            if (container) {
                this.createForm(container);
                this.attachEventListeners();
            }
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.submit-btn');
        const statusDiv = document.getElementById('formStatus');
        const currentLang = localStorage.getItem('selectedLanguage') || 'en';
        const translations = window.translations[currentLang].contact;
        
        // Disable button during submission
        submitBtn.disabled = true;
        submitBtn.textContent = translations.formSending || 'Sending...';
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Since we can't directly send emails from frontend, we'll use a service
            // For now, we'll create a mailto link as a fallback
            const subject = encodeURIComponent(data.subject);
            const body = encodeURIComponent(
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `Phone: ${data.phone || 'Not provided'}\n\n` +
                `Message:\n${data.message}`
            );
            
            // Create mailto link for both emails
            const mailtoLink = `mailto:studio@arteamo.net,petyaem@abv.bg?subject=${subject}&body=${body}`;
            
            // For production, you would integrate with a backend service or email API
            // For now, we'll show success and provide the mailto link
            window.location.href = mailtoLink;
            
            // Show success message
            statusDiv.className = 'form-status success';
            statusDiv.textContent = translations.formSuccess || 'Message sent successfully!';
            form.reset();
            
        } catch (error) {
            // Show error message
            statusDiv.className = 'form-status error';
            statusDiv.textContent = translations.formError || 'Error sending message. Please try again.';
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = translations.formSubmit || 'Send Message';
        }
    }
}

// Initialize contact form when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = new ContactForm();
    
    // Wait for translations to load
    function tryInit() {
        if (window.translations) {
            contactForm.init();
        } else {
            setTimeout(tryInit, 100);
        }
    }
    
    tryInit();
});

// Re-initialize when language changes
document.addEventListener('languageChanged', () => {
    const contactForm = new ContactForm();
    contactForm.initialized = false;
    contactForm.init();
});