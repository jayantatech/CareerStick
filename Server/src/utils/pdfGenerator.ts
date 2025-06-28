import puppeteer from "puppeteer";
// import { generateModernTemplate } from "../templates/modernTemplate";
import { availableFonts } from "./fonts";
import {
  generateModernTemplate,
  ResumeData,
} from "../templates/modernTemplate";
import { templateThree } from "../templates/templateThree";
generateModernTemplate;
export interface FontSettings {
  primary: string;
  secondary?: string;
  headerSize?: string;
  bodySize?: string;
  lineHeight?: string;
}
export interface PageSettings {
  format?: "A4" | "Letter" | "Legal";
  orientation?: "portrait" | "landscape";
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  scale?: number;
}
const defaultPageSettings: PageSettings = {
  format: "A4",
  orientation: "portrait",
  margin: {
    top: "20px",
    right: "20px",
    bottom: "20px",
    left: "20px",
  },
  scale: 1,
};

const defaultFontSettings: FontSettings = {
  primary: availableFonts["Arial"].family,
  secondary: availableFonts["Arial"].family,
  headerSize: "24px",
  bodySize: "14px",
  lineHeight: "1.6",
};

enum FontType {
  Inter = "Inter",
  Roboto = "Roboto",
  Merriweather = "Merriweather",
}

export const generateResumePDF = async (
  resumeData: string,
  template: string = "modern",
  pageSettings: Partial<PageSettings> = {},
  fontFamily: FontType = FontType.Inter
): Promise<Buffer> => {
  const mergedPageSettings = {
    ...defaultPageSettings,
    ...pageSettings,
    margin: { ...defaultPageSettings.margin, ...pageSettings.margin },
  };

  // const mergedFontSettings = {
  //   ...defaultFontSettings,
  //   ...fontSettings,
  // };

  const browser = await puppeteer.launch({
    headless: "shell",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    const resumeFont = {
      Inter: {
        font: "Inter",
        url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap",
      },
      Roboto: {
        font: "Roboto",
        url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
      },
      Merriweather: {
        font: "Merriweather",
        url: "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap",
      },
      Helvetica: {
        font: "Helvetica",
        url: "https://fonts.googleapis.com/css2?family=Helvetica:wght@400;700&display=swap",
      },
    };

    console.log("fontFamily fontFamily fontFamily", fontFamily);

    const html = templateThree(
      resumeData,
      resumeFont[fontFamily] || resumeFont[FontType.Inter]
    );

    // Set content
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    // Generate PDF with custom settings
    const pdf = await page.pdf({
      format: "A4",
      landscape: mergedPageSettings.orientation === "landscape",
      printBackground: true,
      scale: mergedPageSettings.scale,
      pageRanges: "1-2", // This will ensure only 2 pages are generated
    });
    // const pdf = await page.pdf({
    //   format: mergedPageSettings.format,
    //   landscape: mergedPageSettings.orientation === "landscape",
    //   printBackground: true,
    //   margin: mergedPageSettings.margin,
    //   scale: mergedPageSettings.scale,
    //   pageRanges: "1-2", // This will ensure only 2 pages are generated
    // });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
};
