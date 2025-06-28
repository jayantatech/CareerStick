// // src/routes/profileRoutes.ts
// import express from "express";
// import { LinkedInScraper } from "../services/linkedinScraper";

// const router = express.Router();

// router.post("/scrape-profile", async (req, res) => {
//   const { url } = req.body;
//   console.log("url for profile to scrape", url);
//   if (!url || typeof url !== "string") {
//     return res.status(400).json({ error: "Invalid URL" });
//   }

//   const scraper = new LinkedInScraper();
//   try {
//     await scraper.initialize();
//     const profile = await scraper.scrapeProfile(url);
//     console.log("profile data", profile);
//     res.json(profile);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to scrape profile" });
//   } finally {
//     await scraper.close();
//   }
// });

// export default router;

// import express from "express";
// import { scrapeLinkedInProfile } from "../services/linkedinScraper";

// const router = express.Router();

// router.post("/scrape-profile", async (req, res) => {
//   try {
//     const { url } = req.body;

//     // Validate the URL
//     if (!url || typeof url !== "string") {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid URL provided",
//       });
//     }

//     console.log("Scraping LinkedIn profile:", url);
//     const profile = await scrapeLinkedInProfile(url);

//     return res.json({
//       success: true,
//       data: profile,
//     });
//   } catch (error) {
//     console.error("Profile scraping failed:", error);
//     return res.status(500).json({
//       success: false,
//       error: "Failed to scrape profile",
//     });
//   }
// });

// export default router;

// import express from "express";
// import axios from "axios";

// // Interface for the API response
// interface LinkedInProfile {
//   first_name?: string;
//   last_name?: string;
//   full_name?: string;
//   headline?: string;
//   summary?: string;
//   country?: string;
//   city?: string;
//   education?: Education[];
//   experiences?: Experience[];
//   // Add other fields as needed based on Proxycurl API response
// }

// interface Education {
//   school: string;
//   degree_name?: string;
//   field_of_study?: string;
//   starts_at?: Date;
//   ends_at?: Date;
// }

// interface Experience {
//   company: string;
//   title: string;
//   starts_at?: Date;
//   ends_at?: Date;
//   description?: string;
// }

// // Interface for the request body
// interface ProfileRequest {
//   linkedinUrl: string;
// }

// Express middleware for type checking
// const validateRequest = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   const { linkedinUrl } = req.body;

//   if (!linkedinUrl || typeof linkedinUrl !== "string") {
//     return res.status(400).json({
//       error: "Invalid request. LinkedIn URL is required.",
//     });
//   }

//   if (!linkedinUrl.includes("linkedin.com")) {
//     return res.status(400).json({
//       error: "Invalid LinkedIn URL format.",
//     });
//   }

//   next();
// };

// Main API endpoint function

// export const fetchLinkedInProfile = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { linkedinUrl } = req.body as ProfileRequest;

//     // Proxycurl API endpoint
//     const PROXYCURL_API_URL = "https://nubela.co/proxycurl/api/v2/linkedin";
//     const API_KEY = "LNQz9pcoOmqmRJG9Rn9XOA";

//     if (!API_KEY) {
//       throw new Error("Proxycurl API key not configured");
//     }

//     // Make request to Proxycurl API
//     const response = await axios.get(PROXYCURL_API_URL, {
//       params: {
//         url: linkedinUrl,
//       },
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//       },
//     });

//     const profileData: LinkedInProfile = response.data;

//     // Return the processed profile data
//     res.status(200).json({
//       success: true,
//       data: profileData,
//     });
//   } catch (error) {
//     console.error("Error fetching LinkedIn profile:", error);

//     // Handle specific error cases
//     if (axios.isAxiosError(error)) {
//       if (error.response?.status === 401) {
//         return res.status(401).json({
//           error: "Invalid API key or unauthorized access",
//         });
//       }
//       if (error.response?.status === 429) {
//         return res.status(429).json({
//           error: "Rate limit exceeded",
//         });
//       }
//     }

//     // Generic error response
//     res.status(500).json({
//       error: "Failed to fetch LinkedIn profile",
//     });
//   }
// };

// // Example of how to set up the route in your Express app

import express from "express";
import {
  fetchLinkedInProfileForResume,
  getLinkedInProfileById,
  getUserAllLinkedInProfilesBriefInfo,
  testLinkedInProfile,
} from "../controllers/linkedinFeatures.controller";
// import fetchLinkedInProfileForResume from "../controllers/linkedinFeatures.controller";

const router = express.Router();
router.post("/profile", fetchLinkedInProfileForResume);
router.post("/get-profiles", getUserAllLinkedInProfilesBriefInfo);
router.post("/profile-by-id", getLinkedInProfileById);
router.post("/test-profile", testLinkedInProfile);

export default router;
