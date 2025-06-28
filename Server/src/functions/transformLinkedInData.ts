import mongoose from "mongoose";
import {
  LinkedInProfileType,
  LinkedInRapidApiResponseProfileType,
} from "../types/linkedInProfileType";
import LinkedInProfile from "../models/LinkedInProfileSchema";
import { LanguageProficiency } from "../types/resumeTypes";
// import { LanguageProficiencyEnum } from "../types/resumeTypes";

interface LinkedInAPIResponse {
  success: boolean;
  data: {
    success: boolean;
    data: {
      id: number;
      urn: string;
      username: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
      summary: string;
      headline: string;
      geo: {
        country: string;
        city: string;
        full: string;
        countryCode: string;
      };
      languages: Array<{
        name: string;
        proficiency: string;
      }>;
      educations: Array<{
        start: { year: number; month: number; day: number };
        end: { year: number; month: number; day: number };
        fieldOfStudy: string;
        degree: string;
        schoolName: string;
        description: string;
      }>;
      position: Array<{
        companyName: string;
        title: string;
        location: string;
        description: string;
        start: { year: number; month: number; day: number };
        end: { year: number; month: number; day: number };
      }>;
      certifications: Array<{
        name: string;
        start: { year: number; month: number; day: number };
        end: { year: number; month: number; day: number };
        authority: string;
      }>;
      projects: {
        total: number;
        items: Array<{
          title: string;
          description: string;
        }>;
      };
      skills: Array<{
        name: string;
        passedSkillAssessment: boolean;
      }>;
    };
  };
}

// Helper function to convert date to text format
const convertToTextDate = (dateObj: { year: number; month: number }) => {
  if (!dateObj || !dateObj.year) return { month: "", year: "" };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return {
    month: months[dateObj.month - 1] || "",
    year: dateObj.year.toString(),
  };
};

// Helper function to convert LinkedIn proficiency to enum
const convertProficiencyToEnum = (proficiency: string): LanguageProficiency => {
  const proficiencyMap: { [key: string]: LanguageProficiency } = {
    NATIVE_OR_BILINGUAL: LanguageProficiency.native,
    FULL_PROFESSIONAL: LanguageProficiency.advanced,
    PROFESSIONAL_WORKING: LanguageProficiency.intermediate,
    ELEMENTARY: LanguageProficiency.beginner,
  };

  return proficiencyMap[proficiency] || LanguageProficiency.intermediate;
};

export const transformLinkedInData = (apiResponse: any): any => {
  console.log("apiResponse from transformLinkedInData", apiResponse);

  // Helper function for safe mapping with limit
  const safeMap = <T, U>(
    array: T[] | undefined,
    mapFn: (item: T) => U,
    limit?: number
  ): U[] => {
    if (!array || !Array.isArray(array)) return [];
    const itemsToMap = limit ? array.slice(0, limit) : array;
    return itemsToMap.map(mapFn);
  };

  const transformedData = {
    publicIdentifier: apiResponse.username,
    profilePicture: apiResponse.profilePicture,
    linkedInProfileUrl: `https://www.linkedin.com/in/${apiResponse.username}`,
    firstName: apiResponse.firstName,
    lastName: apiResponse.lastName,
    fullName: `${apiResponse.firstName} ${apiResponse.lastName}`,
    headline: apiResponse.headline,
    summary: apiResponse.summary,
    isAIGenerated: false,
    location: {
      country: apiResponse.geo?.country,
      city: apiResponse.geo?.city,
      state: apiResponse.geo?.full?.split(", ")[1] || "",
    },
    targetedJobAndIndustry: {
      industry: "tech",
      targetJob: "Software Developer",
      experience: "1-3",
    },
    occupation: apiResponse.headline?.split("|")[0]?.trim(),
    followerCount: 0,
    education: safeMap(apiResponse.educations, (edu: any) => ({
      startDate: convertToTextDate(edu.start),
      endDate: edu.end ? convertToTextDate(edu.end) : undefined,
      degreeName: edu.degree,
      school: edu.schoolName,
      description: edu.description,
    })),
    experience: safeMap(
      apiResponse.position,
      (exp: any) => ({
        startDate: convertToTextDate(exp.start),
        endDate: exp.end ? convertToTextDate(exp.end) : undefined,
        company: exp.companyName,
        title: exp.title,
        description: exp.description,
        location: exp.location,
      }),
      4 // Limit to first 4 experiences
    ),
    certifications: safeMap(apiResponse.certifications, (cert: any) => ({
      startDate: convertToTextDate(cert.start),
      name: cert.name,
      authority: cert.authority,
      url: "",
      licenseNumber: "",
    })),
    projects: safeMap(
      apiResponse?.projects?.items,
      (project: any) => ({
        title: project.title,
        contributions: project.description,
        role: "",
        startDate: { month: "", year: "" },
        endDate: { month: "", year: "" },
        technologies: [],
        achievements: [],
        links: [],
        mediaLinks: [],
      }),
      3 // Limit to first 3 projects
    ),
    skills: safeMap(apiResponse.skills, (skill: any) => skill.name, 15),
    languages: safeMap(apiResponse.languages, (lang: any) => ({
      name: lang.name,
      proficiency: convertProficiencyToEnum(lang.proficiency),
    })),
    connections: 0,
    updatedAt: new Date(),
  };

  return transformedData;
};
