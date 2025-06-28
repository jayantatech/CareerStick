// import puppeteer from "puppeteer-extra";
// import StealthPlugin from "puppeteer-extra-plugin-stealth";
// import { Browser, Page } from "puppeteer";
// import dotenv from "dotenv";

// dotenv.config();

// puppeteer.use(StealthPlugin());

// export interface Profile {
//   name: string;
//   imageUrl: string;
//   introduction: string;
//   experience: Array<{
//     title: string;
//     company: string;
//     duration: string;
//     description: string;
//   }>;
//   education: Array<{
//     school: string;
//     degree: string;
//     date: string;
//   }>;
//   skills: string[];
// }

// export async function scrapeLinkedInProfile(
//   profileUrl: string
// ): Promise<Profile> {
//   const browser = await puppeteer.launch({
//     headless: false,
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     defaultViewport: { width: 1280, height: 720 },
//   });

//   try {
//     const page = await browser.newPage();

//     // Set user agent
//     await page.setUserAgent(
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
//     );

//     // Go to LinkedIn login page
//     await page.goto("https://www.linkedin.com/login", {
//       waitUntil: "networkidle2",
//       timeout: 60000,
//     });

//     // Login
//     await page.type("#username", "hijafo7040@matmayer.com" || "");
//     await page.type("#password", "aqswdedeswaq" || "");

//     // Click login and wait for navigation
//     await Promise.all([
//       page.click('button[type="submit"]'),
//       page.waitForNavigation({ waitUntil: "networkidle2", timeout: 60000 }),
//     ]);

//     // Check if login was successful by looking for a known element on the homepage
//     // const isLoggedIn = await page.evaluate(() => {
//     //   return !!document.querySelector(".global-nav__me-photo");
//     // });

//     // if (!isLoggedIn) {
//     //   throw new Error("Login failed");
//     // }

//     // Navigate to the profile URL
//     // console.log("Navigating to profile:", profileUrl);
//     // await page.goto(profileUrl, { waitUntil: "networkidle2", timeout: 60000 });

//     // Wait for main content to load
//     await page.waitForSelector(".scaffold-layout__main", { timeout: 60000 });

//     // Scroll to load all content
//     await autoScroll(page);

//     // Extract profile data
//     const profile = await extractProfileData(page);

//     await browser.close();
//     return profile;
//   } catch (error) {
//     console.error("Scraping failed:", error);
//     await browser.close();
//     throw error;
//   }
// }

// async function autoScroll(page: Page): Promise<void> {
//   await page.evaluate(async () => {
//     await new Promise<void>((resolve) => {
//       let totalHeight = 0;
//       const distance = 100;
//       const timer = setInterval(() => {
//         window.scrollBy(0, distance);
//         totalHeight += distance;

//         if (totalHeight >= document.body.scrollHeight) {
//           clearInterval(timer);
//           resolve();
//         }
//       }, 100);
//     });
//   });

//   await new Promise((r) => setTimeout(r, 2000));
// }

async function extractProfileData(page: Page): Promise<Profile> {
  return await page.evaluate(() => {
    function getTextContent(selector: string): string {
      return document.querySelector(selector)?.textContent?.trim() || "";
    }

    // Basic info
    const name = getTextContent("h1.text-heading-xlarge");
    const introduction = getTextContent("div.text-body-medium");
    const imageUrl =
      document.querySelector<HTMLImageElement>(
        "img.pv-top-card-profile-picture__image"
      )?.src || "";

    // Experience
    const experienceNodes = document.querySelectorAll("li.artdeco-list__item");
    const experience = Array.from(experienceNodes)
      .map((node) => ({
        title:
          node
            .querySelector(".experience-group-header__title")
            ?.textContent?.trim() || "",
        company:
          node
            .querySelector(".experience-group-header__company")
            ?.textContent?.trim() || "",
        duration:
          node.querySelector("span.date-range")?.textContent?.trim() || "",
        description:
          node
            .querySelector(".experience-item__description")
            ?.textContent?.trim() || "",
      }))
      .filter((exp) => exp.title || exp.company);

    // Education
    const educationNodes = document.querySelectorAll("li.education__list-item");
    const education = Array.from(educationNodes)
      .map((node) => ({
        school:
          node.querySelector(".education__school")?.textContent?.trim() || "",
        degree:
          node.querySelector(".education__degree")?.textContent?.trim() || "",
        date: node.querySelector(".education__date")?.textContent?.trim() || "",
      }))
      .filter((edu) => edu.school);

    // Skills
    const skillNodes = document.querySelectorAll(
      "span.skill-category-entity__name"
    );
    const skills = Array.from(skillNodes)
      .map((node) => node.textContent?.trim() || "")
      .filter((skill) => skill.length > 0);

    return {
      name,
      imageUrl,
      introduction,
      experience,
      education,
      skills,
    };
  });
}

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser, Page } from "puppeteer";
import dotenv from "dotenv";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";

dotenv.config();

// Add both stealth and recaptcha plugins
puppeteer.use(StealthPlugin());
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: process.env.CAPTCHA_TOKEN, // Add your 2captcha API key in .env file
    },
  })
);

export interface Profile {
  name: string;
  imageUrl: string;
  introduction: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    date: string;
  }>;
  skills: string[];
}

async function waitForNavigation(page: Page) {
  try {
    await page.waitForNavigation({
      waitUntil: "networkidle2",
      timeout: 60000,
    });
  } catch (error) {
    console.log("Navigation timeout - continuing...");
  }
}

async function handleVerification(page: Page) {
  try {
    // Check for various verification challenges
    const verificationSelectors = [
      'iframe[title*="recaptcha"]',
      ".challenge-dialog",
      "#captcha-internal",
      ".verification-card",
    ];

    for (const selector of verificationSelectors) {
      const element = await page.$(selector);
      if (element) {
        console.log("Verification challenge detected");

        // Handle reCAPTCHA if present
        if (selector.includes("recaptcha")) {
          await page.solveRecaptchas();
          await waitForNavigation(page);
          return;
        }

        // Handle LinkedIn's internal verification
        // Wait for manual intervention if automatic solving fails
        await new Promise((resolve) => setTimeout(resolve, 10000)); // Use modern timeout approach
        const verificationStillPresent = await page.$(selector);
        if (verificationStillPresent) {
          throw new Error(
            "Verification challenge could not be automatically solved"
          );
        }
      }
    }
  } catch (error) {
    console.error("Error handling verification:", error);
    throw error;
  }
}

export async function scrapeLinkedInProfile(
  profileUrl: string
): Promise<Profile> {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
    ],
    defaultViewport: { width: 1920, height: 1080 },
  });

  try {
    const page = await browser.newPage();

    // Enhanced browser configuration
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    });

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    );

    // Add random delays between actions
    await page.setDefaultTimeout(30000);
    await page.setDefaultNavigationTimeout(60000);

    // Navigate to login page with retry logic
    let retries = 3;
    while (retries > 0) {
      try {
        await page.goto("https://www.linkedin.com/login", {
          waitUntil: "networkidle2",
          timeout: 60000,
        });
        break;
      } catch (error) {
        console.log(`Login page navigation failed, retries left: ${retries}`);
        retries--;
        if (retries === 0) throw error;
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Use modern timeout approach
      }
    }

    // Login with random delays
    await page.type("#username", "hijafo7040@matmayer.com", {
      delay: 50,
    });
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 500)
    );
    await page.type("#password", "aqswdedeswaq", {
      delay: 50,
    });
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 500)
    );

    // Click login and handle verification
    await Promise.all([
      page.click('button[type="submit"]'),
      waitForNavigation(page),
    ]);

    await handleVerification(page);

    // Verify login success
    const isLoggedIn = await page.evaluate(() => {
      return !!document.querySelector(".global-nav__me-photo");
    });

    if (!isLoggedIn) {
      throw new Error("Login failed - please check credentials");
    }

    // Navigate to profile with retry logic
    console.log("Navigating to profile:", profileUrl);
    retries = 3;
    while (retries > 0) {
      try {
        await page.goto(profileUrl, {
          waitUntil: "networkidle2",
          timeout: 60000,
        });
        break;
      } catch (error) {
        console.log(`Profile navigation failed, retries left: ${retries}`);
        retries--;
        if (retries === 0) throw error;
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Use modern timeout approach
      }
    }

    await handleVerification(page);

    // Wait for content with increased timeout
    await page.waitForSelector(".scaffold-layout__main", { timeout: 90000 });

    // Add random delay before scrolling
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 2000 + 1000)
    );

    await autoScroll(page);

    const profile = await extractProfileData(page);
    if (!profile) {
      throw new Error("Failed to extract profile data");
    }

    await browser.close();
    return profile;
  } catch (error) {
    console.error("Scraping failed:", error);
    await browser.close();
    throw error;
  }
}

async function autoScroll(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = Math.floor(Math.random() * 50) + 75; // Random scroll distance
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, Math.random() * 100 + 100); // Random scroll interval
    });
  });

  // Random delay after scrolling
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 2000 + 1000)
  );
}

// Your existing extractProfileData function remains the same
