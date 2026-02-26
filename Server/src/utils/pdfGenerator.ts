import puppeteer from "puppeteer";
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

export enum FontType {
  Inter = "Inter",
  Roboto = "Roboto",
  Merriweather = "Merriweather",
  Helvetica = "Helvetica",
}

// ─────────────────────────────────────────────
// Helper: create browser
// ─────────────────────────────────────────────
const createBrowser = async () => {
  const isProduction = process.env.NODE_ENV === "production";

  const options: Parameters<typeof puppeteer.launch>[0] = {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
      "--disable-web-security",
      "--disable-features=VizDisplayCompositor",
      "--disable-extensions",
      // ❌ REMOVED: --disable-javascript  (breaks Tailwind / rendering)
      // ❌ REMOVED: --disable-images      (can cause frame issues)
      // ❌ REMOVED: --disable-plugins     (not needed, can cause instability)
      // ❌ REMOVED: --virtual-time-budget (interferes with setContent)
    ],
  };

  if (isProduction) {
    const possiblePaths = [
      "/opt/render/.cache/puppeteer/chrome-headless-shell/linux-131.0.6778.204/chrome-headless-shell/chrome-headless-shell",
      "/app/.cache/puppeteer/chrome/linux-131.0.6778.204/chrome-linux64/chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/chromium-browser",
      process.env.PUPPETEER_EXECUTABLE_PATH,
      process.env.CHROME_EXECUTABLE_PATH,
    ].filter(Boolean) as string[];

    for (const chromePath of possiblePaths) {
      try {
        const testBrowser = await puppeteer.launch({
          ...options,
          executablePath: chromePath,
        });
        await testBrowser.close();
        options.executablePath = chromePath;
        console.log(`Using Chrome at: ${chromePath}`);
        break;
      } catch {
        console.log(`Chrome not found at: ${chromePath}`);
      }
    }
  }

  try {
    return await puppeteer.launch(options);
  } catch (error) {
    console.error("Failed to launch browser:", error);
    throw new Error(`Failed to launch browser: ${error}`);
  }
};

// ─────────────────────────────────────────────
// Main: generateResumePDF
// ─────────────────────────────────────────────
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

  const resumeFont: Record<string, { font: string; url: string }> = {
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

  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | undefined;

  try {
    console.log("Attempting to create browser...");
    browser = await createBrowser();
    console.log("Browser created successfully");

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 1600 });

    // ─────────────────────────────────────────
    // KEY FIX 1: Intercept & block Google Fonts
    // This is the ROOT CAUSE of "frame was detached"
    // networkidle0 waits forever for font requests
    // that either hang or fail → frame detaches
    // ─────────────────────────────────────────
    await page.setRequestInterception(true);

    page.on("request", (request) => {
      const url = request.url();
      const resourceType = request.resourceType();

      if (
        url.includes("fonts.googleapis.com") ||
        url.includes("fonts.gstatic.com") ||
        resourceType === "font"
      ) {
        // Abort external font requests — fonts will fall back to system fonts
        request.abort();
      } else {
        request.continue();
      }
    });

    console.log("fontFamily:", fontFamily);

    const html = templateThree(
      resumeData,
      resumeFont[fontFamily] ?? resumeFont[FontType.Inter]
    );

    // ─────────────────────────────────────────
    // KEY FIX 2: Use domcontentloaded NOT networkidle0
    // networkidle0 blocks until ALL network requests
    // finish — impossible when fonts are aborted/slow
    // ─────────────────────────────────────────
    await page.setContent(html, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // ─────────────────────────────────────────
    // KEY FIX 3: Small wait for layout to settle
    // after DOM is ready before taking PDF snapshot
    // ─────────────────────────────────────────
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Content set, generating PDF...");

    const pdf = await page.pdf({
      format: "A4",
      landscape: mergedPageSettings.orientation === "landscape",
      printBackground: true,
      scale: mergedPageSettings.scale,
      pageRanges: "1-2",
      timeout: 30000,
    });

    console.log("PDF generated successfully");
    return Buffer.from(pdf);

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in generateResumePDF:", error);
      throw new Error(`Failed to generate PDF: ${error.message}`);
    } else {
      console.error("Unknown error:", error);
      throw error;
    }
  } finally {
    if (browser) {
      try {
        await browser.close();
        console.log("Browser closed successfully");
      } catch (closeError) {
        console.error("Error closing browser:", closeError);
      }
    }
  }
};