import express from "express";
import axios from "axios";

// Interface for the API response
export interface LinkedInProfile {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  headline?: string;
  summary?: string;
  country?: string;
  city?: string;
  education?: Education[];
  experiences?: Experience[];
  occupation?: string;
  languages?: string[];
  certifications?: Certification[];
  skills?: string[];
  interests?: string[];
}

interface Education {
  school: string;
  degree_name?: string;
  field_of_study?: string;
  starts_at?: Date;
  ends_at?: Date;
}

interface Experience {
  company: string;
  title: string;
  starts_at?: Date;
  ends_at?: Date;
  description?: string;
}

interface Certification {
  authority: string;
  display_source: string | null;
  ends_at: string | null;
  license_number: string | null;
  name: string;
  starts_at: string | null;
  url: string | null;
}

// Interface for the request body
interface ProfileRequest {
  linkedinUrl: string;
}

export const fetchLinkedInProfile = async (linkedinUrl: string) => {
  try {
    if (!linkedinUrl) {
      return {
        success: false,
        message: "LinkedIn URL is required",
      };
    }
    console.log("linkedinURL to fetch", linkedinUrl);
    // Proxycurl API endpoint
    // const PROXYCURL_API_URL = "https://nubela.co/proxycurl/api/v2/linkedin";
    const PROXYCURL_API_URL =
      "https://linkedin-api8.p.rapidapi.com/get-profile-data-by-url";
    // const API_KEY = "LNQz9pcoOmqmRJG9Rn9XOA";
    const API_KEY = "07f1bd4af2msh52896f65231541fp1c655cjsndf6dc5e2bdd3";

    if (!API_KEY) {
      return {
        success: false,
        message: "API key is required",
      };
    }

    // Make request to Proxycurl API
    const response = await axios.get(PROXYCURL_API_URL, {
      params: {
        url: linkedinUrl,
      },
      headers: {
        "X-RapidAPI-Key": `${API_KEY}`,
        "X-RapidAPI-Host": "linkedin-api8.p.rapidapi.com",
      },
    });

    const profileData: LinkedInProfile = response.data;
    // Return the processed profile data
    return {
      success: true,
      data: profileData,
    };
  } catch (error) {
    console.error("Error fetching LinkedIn profile:", error);

    // Handle specific error cases
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          success: false,
          message: "Invalid API key or unauthorized access",
        };
      }
      if (error.response?.status === 429) {
        return {
          success: false,
          message: "Rate limit exceeded",
        };
      }
    }

    // Generic error response
    return {
      success: false,
      message: "Failed to fetch LinkedIn profile",
    };
  }
};

// Example of how to set up the route in your Express app

export default fetchLinkedInProfile;
