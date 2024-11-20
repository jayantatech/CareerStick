// import { Request, Response } from "express";
// import { IResumeGenerationRequest } from "../types/resumeGenerationType";
// import Resume from "../models/Resumes";
// import { generateResume } from "../utils/aiGenerateResume";
// import mongoose from "mongoose";
// import {
//   CreationMethodEnum,
//   LanguageProficiency,
//   TemplateNameEnum,
// } from "../types/resumeTypes";

// const formatDate = (dateObj: any) => {
//   if (!dateObj) return null;
//   return {
//     month: dateObj.month || "",
//     year: dateObj.year || "",
//   };
// };
// export const generateAiResume = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     console.log("frontend data received:", req.body);
//     const { resumeData, userId, resumeId } = req.body as {
//       resumeData: IResumeGenerationRequest;
//       userId: string;
//       resumeId: string;
//     };

//     // Validate request data
//     if (!resumeData) {
//       res.status(400).json({
//         success: false,
//         message: "Invalid resume data provided",
//       });
//       return;
//     }

//     if (!userId || userId.length !== 24) {
//       res.status(400).json({
//         success: false,
//         message: "User ID is required",
//       });
//       return;
//     }

//     if (!resumeId || resumeId.length !== 24) {
//       res.status(400).json({
//         success: false,
//         message: "Resume ID is required",
//       });
//       return;
//     }

//     // Get existing resume data
//     const existingResume = await Resume.findOne({
//       userId,
//       _id: resumeId,
//     });

//     if (!existingResume) {
//       res.status(404).json({
//         success: false,
//         message: "Resume not found",
//       });
//       return;
//     }

//     // Generate new resume content using OpenAI
//     const generatedResume = await generateResume(resumeData);
//     console.log("AI generated resume:", JSON.stringify(generatedResume));
//     const mappedData = {
//       resumeTitle: generatedResume.resumeTitle,
//       targetedJobAndIndustry: {
//         industry: generatedResume.jobIndustry.industry,
//         targetJob: generatedResume.jobIndustry.targetJob,
//         experience: generatedResume.jobIndustry.experience,
//       },
//       personalInfo: {
//         name: `${generatedResume.personalInfo.firstName} ${generatedResume.personalInfo.lastName}`,
//         phoneNumber: generatedResume.personalInfo.phone,
//         email: generatedResume.personalInfo.email,
//         location: {
//           city: generatedResume.personalInfo.city,
//           country: generatedResume.personalInfo.country,
//         },
//         summary: generatedResume.professionalSummary.summaryText,
//         image: generatedResume.personalInfo.photo
//           ? String(generatedResume.personalInfo.photo)
//           : undefined,
//         visaStatus: "", // Add this field if needed
//       },
//       workExperience: generatedResume.workExperience.map((job: any) => ({
//         jobTitle: job.jobTitle,
//         company: job.company,
//         jobType: "Full-time", // Add job type if available in Redux
//         location: {
//           city: job.location,
//           workplaceType: "On-site", // Add workplace type if available in Redux
//         },

//         startDate: formatDate(job?.startDate),
//         endDate: formatDate(job?.endDate),
//         isCurrentJob: job.isCurrentJob,
//         responsibilities: job.description,
//         technologies: [], // Add if available in Redux
//       })),
//       education: generatedResume.education.map((edu: any) => ({
//         degree: edu.degree,
//         institution: edu.school,
//         location: {
//           city: edu.location,
//         },

//         startDate: formatDate(edu?.startDate),
//         endDate: formatDate(edu?.endDate),
//         isCurrentlyStudying: edu.isCurrentlyStudying,
//         description: edu.description,
//         // relevantCourses: edu.description.split("\n"),
//       })),
//       certifications: generatedResume.certificate.map((cert: any) => ({
//         name: cert.name,
//         issuingOrganization: cert.issuingOrganization,

//         issueDate: formatDate(cert?.issueDate),
//         expirationDate: formatDate(cert?.expirationDate),
//         isNeverExpires: cert.isNeverExpires,
//         description: cert.description,
//         credentialId: cert.credentialId,
//         verificationUrl: cert.verificationUrl,
//         skills: [],
//       })),
//       socialLinks: generatedResume.socialLinks.map((link: any) => ({
//         platform: link.platform,
//         url: link.url,
//       })),
//       // languages: mapLanguages(resumeData.languages),
//       languages:
//         resumeData.languages?.map((lang: any) => ({
//           language: lang.name || "",
//           proficiency: (lang.proficiency as LanguageProficiency) || null,
//         })) || [],

//       // interface IProject {
//       //   title: string;
//       //   contributions: string;
//       //   role?: string;
//       //   startDate?: Date;
//       //   endDate?: Date | string;
//       //   technologies?: string[];
//       //   achievements?: string[];
//       //   links?: { platform: string; url: string }[];
//       //   mediaLinks?: string[];
//       // },
//       projects: generatedResume.projects.map((project: any) => ({
//         title: project.title,
//         contributions: project.contributions,
//         role: project.role,
//         technologies: project.technologies,
//         links: project.links.map((link: any) => ({
//           platform: link.platform,
//           url: link.url,
//         })),
//       })),
//       skills: {
//         technicalSkills: [
//           ...generatedResume.selectedSkills,
//           // {
//           //   skills: [
//           //     ...resumeData.selectedSkills,
//           //     ...resumeData.customSkills,
//           //   ].map((skill) => ({
//           //     name: skill.name,
//           //     proficiency: "Intermediate",
//           //     yearsOfExperience: 0,
//           //     lastUsed: new Date(),
//           //   })),
//           // },
//         ],
//         softSkills: [],
//       },
//       openSourceContributions: generatedResume.openSourceContributions.map(
//         (contrib: any) => ({
//           projectName: contrib.projectName,
//           role: contrib.role,
//           technologies: contrib.technologies,
//           links: contrib.links.map((link: any) => ({
//             platform: link.platform,
//             url: link.url,
//           })),
//           description: contrib.description,
//           contributions: contrib.contributions,
//           startDate: formatDate(contrib.startDate),
//           endDate: formatDate(contrib.endDate),
//           isOngoing: contrib.isOngoing,
//         })
//       ),
//       awards: generatedResume.awards.map((award: any) => ({
//         name: award.name,
//         issuingOrganization: award.issuer,
//         date: formatDate(award?.date),
//         description: award.description,
//       })),
//       customSections: generatedResume.customSections.map((section: any) => ({
//         title: section.title,
//         description: section.description,
//         subtitle: section.subtitle,
//         startDate: formatDate(section?.startDate),
//         endDate: formatDate(section?.endDate),
//         isPresent: section.isPresent,
//       })),
//     };

//     console.log("formated data from AI mappedData:", mappedData);
//     // Merge existing resume settings with AI-generated content
//     const mergedResume = {
//       ...existingResume.toObject(),
//       ...mappedData,
//       userId: existingResume.userId,
//       resumeSettingsId: existingResume.resumeSettingsId,
//       creationMethod: CreationMethodEnum.AI_ASSISTED,
//       templateName: existingResume.templateName || TemplateNameEnum.template3,
//       isPremiumTemplate: existingResume.isPremiumTemplate || false,
//       visibility: existingResume.visibility,
//       keywords: existingResume.keywords || [],
//       lastAtsAnalysisDate: new Date(),
//       updatedAt: new Date(),
//     };

//     const updatedResume = await Resume.findByIdAndUpdate(
//       resumeId,
//       mergedResume,
//       { new: true, runValidators: true }
//     );
//     // console.log("updatedResume is hear", updatedResume);
//     if (!updatedResume) {
//       res.status(500).json({
//         success: false,
//         message: "Failed to update resume",
//       });
//       return;
//     }

//     res.status(200).json({
//       success: true,
//       data: updatedResume,
//     });
//   } catch (error) {
//     console.error("Resume generation error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate resume",
//       error: error instanceof Error ? error.message : "Unknown error occurred",
//     });
//   }
// };
import { Request, Response } from "express";
import { IResumeGenerationRequest } from "../types/resumeGenerationType";
import Resume from "../models/Resumes";
import { generateResume } from "../utils/aiGenerateResume";
import mongoose from "mongoose";
import {
  CreationMethodEnum,
  LanguageProficiency,
  TemplateNameEnum,
} from "../types/resumeTypes";

const formatDate = (dateObj: any) => {
  if (!dateObj) return null;
  return {
    month: dateObj.month || "",
    year: dateObj.year || "",
  };
};
export const generateAiResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("frontend data received:", req.body);
    const { resumeData, userId, resumeId } = req.body as {
      resumeData: IResumeGenerationRequest;
      userId: string;
      resumeId: string;
    };

    // Validate request data
    if (!resumeData) {
      res.status(400).json({
        success: false,
        message: "Invalid resume data provided",
      });
      return;
    }

    if (!userId || userId.length !== 24) {
      res.status(400).json({
        success: false,
        message: "User ID is required",
      });
      return;
    }

    if (!resumeId || resumeId.length !== 24) {
      res.status(400).json({
        success: false,
        message: "Resume ID is required",
      });
      return;
    }

    // Get existing resume data
    const existingResume = await Resume.findOne({
      userId,
      _id: resumeId,
    });

    if (!existingResume) {
      res.status(404).json({
        success: false,
        message: "Resume not found",
      });
      return;
    }

    console.log("existingResume is : ", resumeData);

    // Generate new resume content using OpenAI
    const generatedResume = await generateResume(resumeData);
    console.log("AI generated resume:", generatedResume);
    const mappedData = {
      resumeTitle: generatedResume.resumeTitle,
      targetedJobAndIndustry: {
        industry: generatedResume.jobIndustry.industry,
        targetJob: generatedResume.jobIndustry.targetJob,
        experience: generatedResume.jobIndustry.experience,
      },
      personalInfo: {
        name: `${generatedResume.personalInfo.firstName} ${generatedResume.personalInfo.lastName}`,
        phoneNumber: generatedResume.personalInfo.phone,
        email: generatedResume.personalInfo.email,
        location: {
          city: generatedResume.personalInfo.city,
          country: generatedResume.personalInfo.country,
        },
        summary: generatedResume.professionalSummary.summaryText,
        image: generatedResume.personalInfo.photo
          ? String(generatedResume.personalInfo.photo)
          : undefined,
        visaStatus: "", // Add this field if needed
      },
      workExperience: generatedResume.workExperience.map((job: any) => ({
        jobTitle: job.jobTitle,
        company: job.company,
        jobType: "Full-time", // Add job type if available in Redux
        location: {
          city: job.location,
          workplaceType: "On-site", // Add workplace type if available in Redux
        },

        startDate: formatDate(job?.startDate),
        endDate: formatDate(job?.endDate),
        isCurrentJob: job.isCurrentJob,
        responsibilities: job.description,
        technologies: [], // Add if available in Redux
      })),
      education: generatedResume.education.map((edu: any) => ({
        degree: edu.degree,
        institution: edu.school,
        location: {
          city: edu.location,
        },

        startDate: formatDate(edu?.startDate),
        endDate: formatDate(edu?.endDate),
        isCurrentlyStudying: edu.isCurrentlyStudying,
        description: edu.description,
        // relevantCourses: edu.description.split("\n"),
      })),
      certifications: generatedResume.certificate.map((cert: any) => ({
        name: cert.name,
        issuingOrganization: cert.issuingOrganization,

        issueDate: formatDate(cert?.issueDate),
        expirationDate: formatDate(cert?.expirationDate),
        isNeverExpires: cert.isNeverExpires,
        description: cert.description,
        credentialId: cert.credentialId,
        verificationUrl: cert.verificationUrl,
        skills: [],
      })),
      socialLinks: generatedResume.socialLinks.map((link: any) => ({
        platform: link.platform,
        url: link.url,
      })),
      // languages: mapLanguages(resumeData.languages),
      languages:
        resumeData.languages?.map((lang: any) => ({
          language: lang.name || "",
          proficiency: (lang.proficiency as LanguageProficiency) || null,
        })) || [],

      // interface IProject {
      //   title: string;
      //   contributions: string;
      //   role?: string;
      //   startDate?: Date;
      //   endDate?: Date | string;
      //   technologies?: string[];
      //   achievements?: string[];
      //   links?: { platform: string; url: string }[];
      //   mediaLinks?: string[];
      // },
      projects: generatedResume.projects.map((project: any) => ({
        title: project.title,
        contributions: project.contributions,
        role: project.role,
        technologies: project.technologies,
        links: project.links.map((link: any) => ({
          platform: link.platform,
          url: link.url,
        })),
      })),
      skills: {
        technicalSkills: [
          ...generatedResume.selectedSkills,
          // {
          //   skills: [
          //     ...resumeData.selectedSkills,
          //     ...resumeData.customSkills,
          //   ].map((skill) => ({
          //     name: skill.name,
          //     proficiency: "Intermediate",
          //     yearsOfExperience: 0,
          //     lastUsed: new Date(),
          //   })),
          // },
        ],
        softSkills: [],
      },
      openSourceContributions: generatedResume.openSourceContributions.map(
        (contrib: any) => ({
          projectName: contrib.projectName,
          role: contrib.role,
          technologies: contrib.technologies,
          links: contrib.links.map((link: any) => ({
            platform: link.platform,
            url: link.url,
          })),
          description: contrib.description,
          contributions: contrib.contributions,
          startDate: formatDate(contrib.startDate),
          endDate: formatDate(contrib.endDate),
          isOngoing: contrib.isOngoing,
        })
      ),
      awards: generatedResume.awards.map((award: any) => ({
        name: award.name,
        issuingOrganization: award.issuer,
        date: formatDate(award?.date),
        description: award.description,
      })),
      customSections: generatedResume.customSections.map((section: any) => ({
        title: section.title,
        description: section.description,
        subtitle: section.subtitle,
        startDate: formatDate(section?.startDate),
        endDate: formatDate(section?.endDate),
        isPresent: section.isPresent,
      })),
    };

    console.log("formated data from AI mappedData:", mappedData);
    // Merge existing resume settings with AI-generated content
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

    const updatedResume = await Resume.findByIdAndUpdate(
      resumeId,
      mergedResume,
      { new: true, runValidators: true }
    );
    // resume save here

    // console.log("updatedResume is hear", updatedResume);
    if (!updatedResume) {
      res.status(500).json({
        success: false,
        message: "Failed to update resume",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Resume AI Optimized successfully",
    });
  } catch (error) {
    console.error("Resume generation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate resume",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
