import { launch, } from 'puppeteer'
import * as fs from 'fs'

const html = fs.readFileSync('template.html', 'utf-8');

async function exportWebsiteAsPdf(html: string, outputPath: string) {
  // Create a browser instance
  const browser = await launch({
    headless: 'new'
  });
  // Create a new page
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');
  // Download the PDF
  const PDF = await page.pdf({
    path: outputPath,
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });
  // Close the browser instance
  await browser.close();

  return PDF;
}

await exportWebsiteAsPdf(html, 'template_test_1.pdf').then(() => {
  console.log('PDF created successfully.');
}).catch((error) => {
  console.error('Error creating PDF:', error);
});





