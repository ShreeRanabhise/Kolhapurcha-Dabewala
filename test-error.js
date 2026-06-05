import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err));

  try {
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
    console.log('Page loaded successfully.');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    console.log('Screenshot saved.');
  } catch(e) {
    console.log('Exception while loading:', e);
  }
  
  await browser.close();
})();
