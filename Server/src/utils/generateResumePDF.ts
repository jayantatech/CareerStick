// // pdfGenerator.ts
// import puppeteer from "puppeteer";
// import path from "path";
// import { IResume } from "../types/resumeTypes";
// // import { ResumeState } from "@/lib/types/resumeInput";
// // import { ResumeStyleState } from "@/lib/store/slices/resumeStyle";

// interface GeneratePDFOptions {
//   data: IResume;
//   styleConfig: any;
//   outputPath?: string;
// }

// export async function generateResumePDF({
//   data,
//   styleConfig,
//   outputPath = "resume.pdf",
// }: GeneratePDFOptions): Promise<Buffer> {
//   const browser = await puppeteer.launch({
//     headless: "new",
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });

//   try {
//     const page = await browser.newPage();

//     // Set viewport to A4 size
//     await page.setViewport({
//       width: 794,
//       height: 1123,
//       deviceScaleFactor: 2,
//     });

//     // Inject required styles
//     await page.addStyleTag({
//       content: `
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { font-family: 'Inter', sans-serif; }
//       `,
//     });

//     // Create HTML content with the React component
//     const html = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
//           <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
//           <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
//         </head>
//         <body>
//           <div id="resume-root"></div>
//           <script>
//             // Hydration data
//             window.__RESUME_DATA__ = ${JSON.stringify(data)};
//             window.__STYLE_CONFIG__ = ${JSON.stringify(styleConfig)};
//           </script>
//         </body>
//       </html>
//     `;

//     await page.setContent(html, {
//       waitUntil: ["networkidle0", "load"],
//     });

//     // Inject and render the React component
//     await page.evaluate(`
//       const data = window.__RESUME_DATA__;
//       const styleConfig = window.__STYLE_CONFIG__;

//       // Create a function to render your template
//       function renderTemplate() {
//         const root = document.getElementById('resume-root');
//         const template = React.createElement(TemplateThree, {
//           data: data,
//           styleConfig: styleConfig
//         });
//         ReactDOM.render(template, root);
//       }

//       renderTemplate();
//     `);

//     // Wait for content to be fully rendered
//     await page.waitForSelector(".font-inter");

//     // Get the number of pages
//     const pageCount = await page.evaluate(() => {
//       const pages = document.querySelectorAll(".shadow.bg-white");
//       return pages.length;
//     });

//     // Generate PDF
//     const pdf = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       margin: { top: 0, right: 0, bottom: 0, left: 0 },
//       preferCSSPageSize: true,
//       scale: 1,
//       height: 1123 * pageCount, // Adjust height based on number of pages
//     });

//     // Save to file if outputPath is provided
//     if (outputPath) {
//       const fs = require("fs");
//       fs.writeFileSync(outputPath, pdf);
//     }

//     return pdf;
//   } finally {
//     await browser.close();
//   }
// }

import puppeteer, { Browser, Page } from "puppeteer";
import fs from "fs/promises";
import path from "path";
// import { StyleConfig } from "../types/resume.types";
import { IResume } from "../types/resumeTypes";

const getTemplate = async (): Promise<string> => {
  const templatePath = path.join(__dirname, "../templates/resume.html");
  return await fs.readFile(templatePath, "utf-8");
};

const injectData = (
  template: string,
  data: IResume,
  styleConfig: any
): string => {
  return template
    .replace("__RESUME_DATA__", JSON.stringify(data))
    .replace("__STYLE_CONFIG__", JSON.stringify(styleConfig));
};

const setupPage = async (browser: Browser): Promise<Page> => {
  const page = await browser.newPage();
  await page.setViewport({
    width: 794,
    height: 1123,
    deviceScaleFactor: 2,
  });
  return page;
};

const getPageCount = async (page: Page): Promise<number> => {
  return await page.evaluate(() => {
    const pages = document.querySelectorAll(".shadow.bg-white");
    return pages.length;
  });
};

export const generatePDF = async (
  data: IResume,
  styleConfig: any
): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await setupPage(browser);
    const template = await getTemplate();
    const htmlContent = injectData(template, data, styleConfig);

    await page.setContent(htmlContent, {
      waitUntil: ["networkidle0", "load"],
    });

    await page.waitForSelector(".font-inter");
    const pageCount = await getPageCount(page);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
      height: 1110 * pageCount, //1123 is the height of an A4 page in pixels
    });
    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
};
