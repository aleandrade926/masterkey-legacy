const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Listen to console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('BROWSER ERROR:', msg.text());
      } else if (msg.type() === 'warning') {
        console.warn('BROWSER WARN:', msg.text());
      }
    });

    page.on('pageerror', err => {
      console.error('PAGE UNCAUGHT ERROR:', err.toString());
    });

    console.log('Navigating to local dev server...');
    await page.goto('http://localhost:5173/market/tamarcado', { waitUntil: 'networkidle2' });
    
    console.log('Page loaded. Checking title...');
    const title = await page.title();
    console.log('Title:', title);
    
    // Wait a bit to let React render
    await new Promise(r => setTimeout(r, 2000));
    
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log('Body Text Snippet:', bodyText.substring(0, 200).replace(/\n/g, ' '));
    
    if (bodyText.length < 50) {
      console.log('Possible white screen detected! Body is too short.');
    }

    await browser.close();
  } catch (error) {
    console.error('Test script error:', error);
  }
})();
