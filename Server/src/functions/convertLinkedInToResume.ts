// import {
//   CreationMethodEnum,
//   IResume,
//   LanguageProficiency,
//   TemplateNameEnum,
// } from "../types/resumeTypes";

// interface LinkedInProfile {
//   userId: string;
//   firstName: string;
//   lastName: string;
//   fullName: string;
//   headline: string;
//   summary: string;
//   location: {
//     country: string;
//     city: string;
//     state: string;
//   };
//   education: Array<{
//     startDate: Date;
//     endDate: Date;
//     degreeName: string;
//     school: string;
//     description: string | null;
//   }>;
//   experience: Array<{
//     startDate: Date;
//     endDate?: Date;
//     company: string;
//     title: string;
//     description: string;
//     location?: {
//       city?: string;
//       state?: string;
//       country?: string;
//     };
//   }>;
//   certifications: Array<{
//     startDate: Date;
//     name: string;
//     authority: string;
//     url: string | null;
//     licenseNumber: string | null;
//   }>;
//   languages: Array<{
//     name: string;
//     proficiency: string;
//   }>;
// }

// export const convertLinkedInToResume = (linkedinProfile: LinkedInProfile) => {
//   // Helper function to convert date to month/year format
//   const formatDate = (date: Date) => {
//     return {
//       month: date.toLocaleString("default", { month: "long" }),
//       year: date.getFullYear().toString(),
//     };
//   };

//   // Convert languages proficiency
//   const convertProficiency = (linkedinProficiency: string) => {
//     const proficiencyMap: { [key: string]: string } = {
//       NATIVE_OR_BILINGUAL: LanguageProficiency.native,
//       FULL_PROFESSIONAL: LanguageProficiency.advanced,
//       PROFESSIONAL_WORKING: LanguageProficiency.intermediate,
//     };
//     return proficiencyMap[linkedinProficiency] || LanguageProficiency.beginner;
//   };

//   // Extract technical skills from summary
//   const extractTechnicalSkills = (summary: string) => {
//     const skillsSection =
//       summary.split("Technical Skills:")[1]?.split("\n")[2] || "";
//     const skills = skillsSection.split(",").map((skill) => ({
//       name: skill.trim(),
//       proficiency: "Intermediate",
//       yearsOfExperience: 0,
//       lastUsed: new Date(),
//     }));
//     return skills.filter((skill) => skill.name !== "");
//   };

//   const resumeData = {
//     targetedJobAndIndustry: "",
//     socialLinks: [],
//     resumeTitle: `${linkedinProfile.fullName}'s Resume`,
//     targetJobTitle: linkedinProfile.headline.split("|")[0].trim(),
//     creationMethod: CreationMethodEnum.USER_CREATED,

//     personalInfo: {
//       name: linkedinProfile.fullName,
//       email: "",
//       phoneNumber: "",
//       visaStatus: "",
//       location: {
//         city: linkedinProfile.location.city,
//         state: linkedinProfile.location.state,
//         country: linkedinProfile.location.country,
//       },
//       summary: linkedinProfile.summary,
//     },

//     languages: linkedinProfile.languages.map((lang) => ({
//       language: lang.name,
//       proficiency: convertProficiency(lang.proficiency) as LanguageProficiency,
//       certifications: [],
//     })),

//     workExperience: linkedinProfile.experience.map((exp) => ({
//       jobTitle: exp.title,
//       company: exp.company,
//       jobType: "Full-time",
//       location: {
//         ...(exp.location || {}),
//         workplaceType: "Remote",
//         city: "",
//         state: "",
//         country: "",
//       },
//       startDate: formatDate(exp.startDate),
//       endDate: exp.endDate ? formatDate(exp.endDate) : undefined,
//       isCurrentJob: !exp.endDate,
//       responsibilities: exp.description.split("\n").filter((r) => r.trim()),
//       achievements: [],
//       technologies: [],
//       projects: [],
//     })),

//     education: linkedinProfile.education.map((edu) => ({
//       degree: edu.degreeName,
//       institution: edu.school,
//       location: {
//         city: linkedinProfile.location.city,
//         state: linkedinProfile.location.state,
//         country: linkedinProfile.location.country,
//       },
//       description: edu.description || "",
//       startDate: formatDate(edu.startDate),
//       endDate: formatDate(edu.endDate),
//       isCurrentlyStudying: new Date(edu.endDate) > new Date(),
//       relevantCourses: [],
//       projects: [],
//       honors: [],
//       activities: [],
//     })),

//     certifications: linkedinProfile.certifications.map((cert) => ({
//       name: cert.name,
//       issuingOrganization: cert.authority,
//       issueDate: formatDate(cert.startDate),
//       credentialId: cert.licenseNumber || "",
//       verificationUrl: cert.url || "",
//       description: "",
//       skills: [],
//       isNeverExpires: true,
//     })),

//     skills: {
//       technicalSkills: extractTechnicalSkills(linkedinProfile.summary),
//       softSkills: [],
//     },

//     templateName: TemplateNameEnum.template3,
//     isPremiumTemplate: false,
//     visibility: "",
//     updatedAt: new Date(),
//   };

//   return resumeData;
// };

import mongoose from "mongoose";
import { IResume } from "../types/resumeTypes";
// import Resume from "./resumeSchema";

interface LinkedInProfile {
  publicIdentifier: string;
  firstName: string;
  lastName: string;
  fullName: string;
  headline: string;
  profilePicture: string;
  linkedInProfileUrl: string;
  summary: string;
  location: {
    country: string;
    city: string;
    state: string;
  };
  education: Array<{
    startDate: { month: string; year: string };
    endDate: { month: string; year: string };
    degreeName: string;
    school: string;
    description: string;
  }>;
  experience: Array<{
    startDate: { month: string; year: string };
    endDate: { month: string; year: string };
    company: string;
    title: string;
    description: string;
    location: string;
  }>;
  projects: Array<{
    title: string;
    contributions: string;
    role: string;
    startDate: { month: string; year: string };
    endDate: { month: string; year: string };
    technologies: string[];
    achievements: string[];
    links: Array<{ platform: string; url: string }>;
    mediaLinks: string[];
  }>;
  skills: string[];
  languages: Array<{ name: string; proficiency: string }>;
}

// export function convertLinkedInToResume(linkedInData: any) {
//   console.log("convertLinkedInToResume", JSON.stringify(linkedInData));
//   const resumeData: any = {
//     resumeTitle: `${linkedInData.fullName}'s Resume`,
//     targetJobTitle: linkedInData.headline,

//     // Including targetedJobAndIndustry as requested
//     targetedJobAndIndustry: {
//       industry: linkedInData.targetedJobAndIndustry.industry, // To be filled later
//       targetJob: linkedInData.targetedJobAndIndustry.targetJob,
//       experience: linkedInData.targetedJobAndIndustry.experience, // To be filled later
//     },

//     personalInfo: {
//       name: linkedInData.fullName,
//       email: "", // LinkedIn API doesn't provide email
//       phoneNumber: "", // LinkedIn API doesn't provide phone
//       image: linkedInData.profilePicture,
//       location: {
//         city: linkedInData.location.city,
//         state: linkedInData.location.state,
//         country: linkedInData.location.country,
//       },
//       summary: linkedInData.summary,
//     },

//     languages: linkedInData.languages.map((lang: any) => ({
//       language: lang.name,
//       proficiency: lang.proficiency,
//       certifications: [],
//     })),

//     certifications: linkedInData.certifications.map((cert: any) => ({
//       name: cert.name,
//       issuingOrganization: cert.authority,
//       issueDate: { month: cert.issueDate.month, year: cert.issueDate.year },
//       expirationDate: { month: "", year: "" },
//       isNeverExpires: cert.isNeverExpires,
//       credentialId: cert.licenseNumber,
//       skills: [],
//       verificationUrl: "",
//       description: "",
//     })),
//     // [
//     // {
//     //   name: { type: String, required: false },
//     //   issuingOrganization: { type: String, required: false },
//     //   issueDate: { month: { type: String }, year: { type: String } },
//     //   expirationDate: { month: { type: String }, year: { type: String } },
//     //   isNeverExpires: { type: Boolean, default: false },
//     //   credentialId: { type: String, required: false },
//     //   skills: [{ type: String, required: false }],
//     //   verificationUrl: { type: String, required: false },
//     //   description: { type: String, required: false },
//     // },

//     // ],

//     socialLinks: [
//       {
//         platform: "linkedin",
//         url: linkedInData.linkedInProfileUrl,
//         username: linkedInData.publicIdentifier,
//       },
//     ],

//     workExperience: linkedInData.experience.map((exp: any) => ({
//       jobTitle: exp.title,
//       company: exp.company,
//       location: {
//         city: exp.location.split(",")[0]?.trim() || "",
//         state: exp.location.split(",")[1]?.trim() || "",
//         country: exp.location.split(",")[2]?.trim() || "",
//         workplaceType: "",
//       },
//       startDate: {
//         month: exp.startDate.month || "",
//         year: exp.startDate.year || "",
//       },
//       endDate: { month: exp.endDate.month || "", year: exp.endDate.year || "" },
//       isCurrentJob: !exp.endDate.year,
//       responsibilities: [exp.description],
//       achievements: [],
//       technologies: [],
//       projects: [],
//     })),

//     education: linkedInData.education.map((edu: any) => ({
//       degree: edu.degreeName,
//       institution: edu.school,
//       location: {
//         city: "",
//         state: "",
//         country: "",
//       },
//       description: edu.description,
//       startDate: {
//         month: edu.startDate.month || "",
//         year: edu.startDate.year || "",
//       },
//       endDate: { month: edu.endDate.month || "", year: edu.endDate.year || "" },
//       isCurrentlyStudying: false,
//       relevantCourses: [],
//       projects: [],
//       honors: [],
//       activities: [],
//     })),

//     projects: linkedInData.projects.le.map((proj: any) => ({
//       title: proj.title,
//       contributions: proj.contributions,
//       role: proj.role,
//       startDate: proj.startDate,
//       endDate: proj.endDate,
//       technologies: proj.technologies,
//       achievements: proj.achievements,
//       links: proj.links,
//       mediaLinks: proj.mediaLinks,
//     })),

//     skills: {
//       technicalSkills: linkedInData.skills.map((skill: any) => ({
//         name: skill,
//         proficiency: "",
//         yearsOfExperience: 0,
//         lastUsed: new Date(),
//       })),
//       softSkills: [],
//     },
//   };

//   // Create new resume document

//   return resumeData;
// }

export function convertLinkedInToResume(linkedInData: any) {
  // Validate input data
  if (!linkedInData) {
    throw new Error("LinkedIn data is required");
  }

  return {
    resumeTitle: `${linkedInData.fullName || "Untitled"}'s Resume`,
    targetJobTitle: linkedInData.headline || "",

    targetedJobAndIndustry: {
      industry: linkedInData?.targetedJobAndIndustry?.industry || "",
      targetJob: linkedInData?.targetedJobAndIndustry?.targetJob || "",
      experience: linkedInData?.targetedJobAndIndustry?.experience || "",
    },

    personalInfo: {
      name: linkedInData.fullName || "",
      email: "",
      phoneNumber: "",
      image: linkedInData.profilePicture || "",
      location: {
        city: linkedInData?.location?.city || "",
        state: linkedInData?.location?.state || "",
        country: linkedInData?.location?.country || "",
      },
      summary: linkedInData.summary || "",
    },

    languages: Array.isArray(linkedInData.languages)
      ? linkedInData.languages.map((lang: any) => ({
          language: lang?.name || "",
          proficiency: lang?.proficiency || "",
          certifications: [],
        }))
      : [],

    certifications: Array.isArray(linkedInData.certifications)
      ? linkedInData.certifications.map((cert: any) => ({
          name: cert?.name || "",
          issuingOrganization: cert?.authority || "",
          issueDate: {
            month: cert?.startDate?.month || "",
            year: cert?.startDate?.year || "",
          },
          expirationDate: {
            month: "",
            year: "",
          },
          isNeverExpires: cert?.isNeverExpires || true,
          credentialId: cert?.licenseNumber || "",
          skills: [],
          verificationUrl: "",
          description: "",
        }))
      : [],

    socialLinks: [
      {
        platform: "linkedin",
        url: linkedInData.linkedInProfileUrl || "",
        username: linkedInData.publicIdentifier || "",
      },
    ],

    workExperience: Array.isArray(linkedInData.experience)
      ? linkedInData.experience.map((exp: any) => {
          const location = exp?.location?.split(",") || [];
          return {
            jobTitle: exp?.title || "",
            company: exp?.company || "",
            location: {
              city: location[0]?.trim() || "",
              state: location[1]?.trim() || "",
              country: location[2]?.trim() || "",
              workplaceType: "",
            },
            startDate: {
              month: exp?.startDate?.month || "",
              year: exp?.startDate?.year || "",
            },
            endDate: {
              month: exp?.endDate?.month || "",
              year: exp?.endDate?.year || "",
            },
            isCurrentJob: !exp?.endDate?.year,
            responsibilities: [exp?.description || ""],
            achievements: [],
            technologies: [],
            projects: [],
          };
        })
      : [],

    education: Array.isArray(linkedInData.education)
      ? linkedInData.education.map((edu: any) => ({
          degree: edu?.degreeName || "",
          institution: edu?.school || "",
          location: {
            city: "",
            state: "",
            country: "",
          },
          description: edu?.description || "",
          startDate: {
            month: edu?.startDate?.month || "",
            year: edu?.startDate?.year || "",
          },
          endDate: {
            month: edu?.endDate?.month || "",
            year: edu?.endDate?.year || "",
          },
          isCurrentlyStudying: false,
          relevantCourses: [],
          projects: [],
          honors: [],
          activities: [],
        }))
      : [],

    projects: Array.isArray(linkedInData.projects)
      ? linkedInData.projects.map((proj: any) => ({
          title: proj?.title || "",
          contributions: proj?.contributions || [],
          role: proj?.role || "",
          startDate: proj?.startDate || "",
          endDate: proj?.endDate || "",
          technologies: proj?.technologies || [],
          achievements: proj?.achievements || [],
          links: proj?.links || [],
          mediaLinks: proj?.mediaLinks || [],
        }))
      : [],

    skills: {
      technicalSkills: Array.isArray(linkedInData.skills)
        ? linkedInData.skills.map((skill: any) => ({
            name: skill || "",
            proficiency: "",
            yearsOfExperience: 0,
            lastUsed: new Date(),
          }))
        : [],
      softSkills: [],
    },
  };
}
