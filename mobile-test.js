const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['iPhone 13'],
    viewport: { width: 375, height: 812 }
  });
  
  const page = await context.newPage();
  
  // Navigate to your local server
  await page.goto('http://localhost:8000');
  
  // Wait for page to load
  await page.waitForTimeout(2000);
  
  // Take screenshot of mobile view
  await page.screenshot({
    path: 'mobile-view.png',
    fullPage: true
  });
  
  console.log('Mobile screenshot saved as mobile-view.png');
  
  await browser.close();
})();