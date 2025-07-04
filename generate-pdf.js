const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Read the HTML file
    const htmlPath = path.join(__dirname, 'customer-account-setup-bg.html');
    await page.goto(`file://${htmlPath}`, {
        waitUntil: 'networkidle0'
    });
    
    // Generate PDF
    await page.pdf({
        path: 'customer-account-setup-instructions-BG.pdf',
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20mm',
            right: '20mm',
            bottom: '20mm',
            left: '20mm'
        }
    });
    
    await browser.close();
    console.log('PDF created successfully: customer-account-setup-instructions-BG.pdf');
}

generatePDF().catch(console.error);