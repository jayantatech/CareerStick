// import express from "express";
// import axios from "axios";

import { Request, Response } from "express";
import fetchLinkedInProfile from "../utils/fetchLinkedInProfile";
import saveLinkedInProfile from "../functions/saveLinkedInProfile";
import User from "../models/User";
import LinkedInProfile from "../models/LinkedInProfileSchema";
import {
  LinkedInApiResponseProfileType,
  LinkedInRapidApiResponseProfileType,
} from "../types/linkedInProfileType";
import { generateResumeWithLinkedIn } from "../utils/aiResumeGenerateWithLinkedIn";
import Resume from "../models/Resumes";
import { mappedDataHelper } from "./aiFeatures.controller";
import { CreationMethodEnum, TemplateNameEnum } from "../types/resumeTypes";
// import { convertLinkedInToResume } from "../functions/convertLinkedInToResume";
import { transformLinkedInData } from "../functions/transformLinkedInData";
import { convertLinkedInToResume } from "../functions/convertLinkedInToResume";

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

// export const fetchLinkedInProfile = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { linkedinUrl } = req.body as ProfileRequest;
//     console.log("linkedinURL to fetch", linkedinUrl);
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
//     console.log("profileData to return", profileData);
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

// export default fetchLinkedInProfile;

const fetchLinkedInProfileForResume = async (req: Request, res: Response) => {
  try {
    const { linkedinUrl, userId, useAI, AIPromptInstructions, resumeId } =
      req.body as {
        linkedinUrl: string;
        userId: string;
        useAI: boolean;
        AIPromptInstructions: string;
        resumeId: string;
      };
    // console.log("linkedinUrl to fetch profile", linkedinUrl);
    // console.log("userId to fetch profile", userId);

    if (!linkedinUrl || !userId || !resumeId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    const userExists = await User.findById({ _id: userId });
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isFreeUser = userExists.subscribedPlan === "free";

    if (isFreeUser) {
      const profileCount = await LinkedInProfile.countDocuments({
        userId: userId,
      });
      console.log("profileCouunt before fetching profile", profileCount);

      if (profileCount >= 3) {
        return res.status(400).json({
          success: false,
          message: "Please upgrade to premium to fetch more LinkedIn profiles",
        });
      }
    }

    const profileData = await fetchLinkedInProfile(linkedinUrl);
    console.log("profileData after fetching profile", profileData);
    if (!profileData.success) {
      return res.status(400).json({
        success: false,
        message: profileData.message,
      });
    }

    // const savedProfile = await saveLinkedInProfile(
    //   profileData.data as unknown as LinkedInApiResponseProfileType,
    //   userId
    // );

    const savedProfile = transformLinkedInData(
      profileData.data as unknown as LinkedInRapidApiResponseProfileType
    );
    console.log("savedProfile after saving profile", savedProfile);

    const existingResume = await Resume.findById({
      _id: resumeId,
      userId: userId,
    });
    if (!existingResume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }
    if (useAI) {
      // Generate resume using AI
      const aiProfileData = await generateResumeWithLinkedIn(
        savedProfile,
        AIPromptInstructions
      );

      console.log(
        "aiProfileData for ai linkedin",
        JSON.stringify(aiProfileData)
      ); // Done and coming in the right format

      if (!aiProfileData) {
        return res.status(400).json({
          success: false,
          message: "Failed to generate resume with LinkedIn profile",
        });
      }
      const savedAIOptimizedProfile = await new LinkedInProfile({
        ...aiProfileData,
        userId: userId,
        isAIGenerated: true,
      }).save();

      console.log("savedAIOptimizedProfile", savedAIOptimizedProfile);

      console.log(
        "aiProfileData after generating resume with linkedin",
        JSON.stringify(aiProfileData)
      );

      // Map the AI response data
      const mappedData = convertLinkedInToResume(aiProfileData);
      // const mappedData = mappedDataHelper(aiProfileData);
      console.log("mappedData after mapping data for linkedin", mappedData);
      // Merge with existing resume settings
      const mergedResume = {
        ...existingResume.toObject(),
        ...mappedData,
        userId: existingResume.userId,
        resumeSettingsId: existingResume.resumeSettingsId,
        creationMethod: CreationMethodEnum.AI_ASSISTED,
        templateName: existingResume.templateName || TemplateNameEnum.template3,
        isPremiumTemplate: existingResume.isPremiumTemplate || false,
        visibility: existingResume.visibility,
        keywords: existingResume.keywords || [],
        lastAtsAnalysisDate: new Date(),
        updatedAt: new Date(),
      };

      // Save updated resume
      const updatedResume = await Resume.findByIdAndUpdate(
        { _id: resumeId, userId: userId },
        mergedResume,
        { new: true, runValidators: true }
      );
      console.log("updatedResume after updating resume", updatedResume);
      // Return both profile and resume data
      return res.status(200).json({
        message: "Resume updated successfully",
        success: true,
        data: {
          profile: savedProfile,
          resume: updatedResume,
        },
      });
    }

    if (!useAI) {
      console.log("false data is called");
      const savedAIOptimizedProfile = await new LinkedInProfile({
        ...savedProfile,
        userId: userId,
        isAIGenerated: false,
      }).save();

      console.log("savedAIOptimizedProfile", savedAIOptimizedProfile);

      console.log(
        "aiProfileData after generating resume with linkedin",
        JSON.stringify(savedAIOptimizedProfile)
      );

      // Map the AI response data
      const mappedData = convertLinkedInToResume(savedAIOptimizedProfile);
      // const mappedData = mappedDataHelper(aiProfileData);
      console.log("mappedData after mapping data for linkedin", mappedData);
      // Merge with existing resume settings
      const mergedResume = {
        ...existingResume.toObject(),
        ...mappedData,
        userId: existingResume.userId,
        resumeSettingsId: existingResume.resumeSettingsId,
        creationMethod: CreationMethodEnum.AI_ASSISTED,
        templateName: existingResume.templateName || TemplateNameEnum.template3,
        isPremiumTemplate: existingResume.isPremiumTemplate || false,
        visibility: existingResume.visibility,
        keywords: existingResume.keywords || [],
        lastAtsAnalysisDate: new Date(),
        updatedAt: new Date(),
      };

      // Save updated resume
      const updatedResume = await Resume.findByIdAndUpdate(
        { _id: resumeId, userId: userId },
        mergedResume,
        { new: true, runValidators: true }
      );
      console.log("updatedResume after updating resume", updatedResume);
      // Return both profile and resume data
      return res.status(200).json({
        message: "Resume updated successfully",
        success: true,
        data: {
          profile: savedProfile,
          resume: updatedResume,
        },
      });
    }

    // Return just the profile data if AI is not used
    res.status(200).json({
      message: "Profile fetched successfully",
      success: true,
      data: savedProfile,
    });
  } catch (error) {
    console.error("Error fetching LinkedIn profile:", error);
    res.status(500).json({
      error: "Failed to fetch LinkedIn profile",
    });
  }
};

const getUserAllLinkedInProfilesBriefInfo = async (
  req: Request,
  res: Response
) => {
  try {
    // Get user ID from authenticated session
    const { userId } = req.body as { userId: string };

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Fetch all LinkedIn profiles for this user
    const profiles = await LinkedInProfile.find(
      { userId: userId },
      { fullName: 1, headline: 1, createdAt: 1, isAIGenerated: 1 }
    );

    if (!profiles || profiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No LinkedIn profiles found for this user",
      });
    }

    console.log("profiles to return", profiles);

    return res.status(200).json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    console.error("Error fetching user's LinkedIn profiles:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch LinkedIn profiles",
    });
  }
};

// Hear i remove the convertLinkedInToResume function
const getLinkedInProfileById = async (req: Request, res: Response) => {
  try {
    const { profileId, userId, resumeId } = req.body as {
      profileId: string;
      userId: string;
      resumeId: string;
    };
    if (!profileId || !userId || !resumeId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }
    const profile = await LinkedInProfile.findOne({
      _id: profileId,
      userId: userId,
    });
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "LinkedIn profile not found",
      });
    }
    console.log("profile to convert to resume", profile);
    const resume = convertLinkedInToResume(profile);
    console.log("resume to save in mongodb", resume);
    if (!resumeId) {
      return res.status(200).json({
        success: false,
        message: "some error occured",
      });
    }
    const updatedResume = await Resume.findByIdAndUpdate(
      { _id: resumeId, userId: userId },
      resume,
      { new: true, runValidators: true, upsert: false }
    );
    if (!updatedResume) {
      return res.status(400).json({
        success: false,
        message: "Resume not found",
      });
    }
    // console.log("resume to save in mongodb", resume);
    return res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      // data: resume,
    });
  } catch (error) {
    console.error("Error fetching LinkedIn profile:", error);
    res.status(500).json({
      error: "Failed to fetch LinkedIn profile",
    });
  }
};

const testLinkedInProfile = async (req: Request, res: Response) => {
  const { linkedinUrl } = req.body as { linkedinUrl: string };
  const profileData = await fetchLinkedInProfile(linkedinUrl);
  console.log("profileData", profileData);
  const savedProfile = transformLinkedInData(
    profileData.data as unknown as LinkedInRapidApiResponseProfileType
  );
  console.log("savedProfile after saving profile", savedProfile);
  console.log("transformedData", savedProfile);
  return res.status(200).json({
    success: true,
    data: savedProfile,
  });
};

export {
  fetchLinkedInProfileForResume,
  getUserAllLinkedInProfilesBriefInfo,
  getLinkedInProfileById,
  testLinkedInProfile,
};
