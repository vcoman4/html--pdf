import { launch, } from 'puppeteer'
import * as fs from 'fs'

const HTML_FILE_NAME = "template.html";
const NEW_PDF_FILE_NAME = "template8.pdf";

// First parameter is the name of the html file to be read
const html = fs.readFileSync(HTML_FILE_NAME, "utf-8");

async function exportWebsiteAsPdf(html: string, outputPath: string) {
  // Create a browser instance
  const browser = await launch({
    headless: "new",
  });
  // Create a new page
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });

  // To reflect CSS used for screens instead of print
  // await page.emulateMediaType("screen");
  // Download the PDF
  const PDF = await page.pdf({
    path: outputPath,
    margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
    printBackground: true,
    format: "A4",
  });
  // Close the browser instance
  await browser.close();

  return PDF;
}

// The second parameter is the name of the PDF file to be created
await exportWebsiteAsPdf(html, NEW_PDF_FILE_NAME)
  .then(() => {
    console.log("PDF created successfully.");
  })
  .catch((error) => {
    console.error("Error creating PDF:", error);
  });





