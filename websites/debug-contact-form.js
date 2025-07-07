// Debug script to check contact form structure
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const container = document.getElementById('contactFormContainer');
        const form = document.querySelector('.contact-form');
        const formGroups = document.querySelectorAll('.form-group');
        
        console.log('=== Contact Form Debug ===');
        console.log('Container exists:', !!container);
        console.log('Form exists:', !!form);
        console.log('Form groups count:', formGroups.length);
        
        if (form) {
            console.log('Form HTML:', form.innerHTML);
        }
        
        formGroups.forEach((group, index) => {
            const computed = window.getComputedStyle(group);
            console.log(`Form group ${index}:`, {
                display: computed.display,
                width: computed.width,
                marginBottom: computed.marginBottom
            });
        });
        
        // Check if contact-form-netlify styles are loaded
        const styles = document.getElementById('contactFormStyles');
        console.log('Contact form styles loaded:', !!styles);
        if (styles) {
            console.log('Styles content:', styles.innerHTML.substring(0, 200) + '...');
        }
    }, 2000); // Wait for form to be initialized
});