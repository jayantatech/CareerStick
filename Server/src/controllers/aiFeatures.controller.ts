// import { Request, Response } from "express";
// import { aiGenerateResume } from "../utils/aiGenerateResume"; // Import utility function
// import User from "../models/User";
// import Resume from "../models/Resumes";

// // Controller function to handle resume generation
// const generateResume = async (req: Request, res: Response) => {
//   console.log("they sent the data form client");
//   try {
//     const { prompt, instruction } = req.body; // Extract prompt and instruction from the request body
//     console.log("prompt data from client", prompt, instruction);
//     // Validate that both prompt and instruction are present
//     if (!prompt || !instruction) {
//       return res.status(400).json({
//         success: false,
//         message: "Both prompt and instruction are required",
//       });
//     }

//     // Call the resume generation function and capture the result
//     const generatedResume = await aiGenerateResume(prompt);
//     console.log("Generated Resume:", generatedResume);

//     // Send a success response with the generated resume

//     if (!generatedResume) {
//       return res.status(500).json({
//         success: false,
//         message: "Resume generation failed",
//       });
//     }

//     const user = await Resume.create({
//       userId: "66f1866916f906e2c767872a",
//       resumeTitle: req.body.jobIndustry.targetJob,
//       resumeSettingsId: null,
//       creationMethod: "AI-assisted",
//       currentVersion: "1.0.0",
//       versions: [
//         {
//           versionId: "1.0.0",
//           submittedResumeInfo: null,
//           versionTitle: "Resume version 1.0.0",
//           isPrime: false,
//         },
//       ],
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Resume generated successfully",
//       data: generatedResume,
//     });
//   } catch (error: any) {
//     // Handle any errors and return a 500 response
//     console.error("Error in generateResume controller:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// export { generateResume };

import { Request, Response } from "express";
import { aiGenerateResume } from "../utils/aiGenerateResume";
import Resume from "../models/Resumes";
import mongoose from "mongoose";
import connectDB from "../config/connectDB";

// Controller function to handle resume generation
const generateResume = async (req: Request, res: Response) => {
  try {
    const { prompt, instruction, jobIndustry } = req.body;

    console.log(" prompt data from client", prompt, instruction, jobIndustry);

    // Validate required fields
    if (!prompt || !instruction || !jobIndustry?.targetJob) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: prompt, instruction, or target job",
      });
    }

    // Generate resume using AI
    const generatedResumeString = await aiGenerateResume(prompt);
    if (!generatedResumeString) {
      return res.status(500).json({
        success: false,
        message: "Resume generation failed",
      });
    }

    // Parse the generated resume JSON
    const cleanJsonString = generatedResumeString
      .replace(/```json\n?|\n?```/g, "")
      .trim();

    const generatedResume = JSON.parse(cleanJsonString);

    // Create a new version ID
    const versionId = new mongoose.Types.ObjectId();

    // Create the resume document structure
    const resumeData = {
      userId: new mongoose.Types.ObjectId("66f1866916f906e2c767872a"), // Your user ID
      resumeTitle: jobIndustry.targetJob,
      targetJobTitle: jobIndustry.targetJob,
      resumeSettingsId: null,
      creationMethod: "AI-assisted",
      currentVersion: "1.0.0",
      atsCompatibilityScore: generatedResume.atsCompatibilityScore || 0,
      keywords: generatedResume.keywords || [],
      templateId: new mongoose.Types.ObjectId(), // Replace with actual template ID
      isPremiumTemplate: false,
      lastAtsAnalysisDate: new Date(),
      visibility: "private",
      resumeFile: null,
      // resumeFile: {
      //   url: "", // To be updated after file generation
      //   format: "pdf",
      //   generatedDate: new Date(),
      // },
      versions: [
        {
          versionId: versionId,
          submittedResumeInfo: new mongoose.Types.ObjectId(), // Replace with actual submitted resume ID
          versionTitle: "Version 1.0.0",
          isPrime: true,
          personalInfo: {
            name: generatedResume.personalInfo.name,
            phoneNumber: generatedResume.personalInfo.phoneNumber,
            email: generatedResume.personalInfo.email,
            location: {
              city: generatedResume.personalInfo.location.city,
              state: generatedResume.personalInfo.location.state,
              country: generatedResume.personalInfo.location.country,
            },
            socialLinks: {
              linkedIn: {
                url: generatedResume.personalInfo.socialLinks.linkedIn,
                username:
                  generatedResume.personalInfo.socialLinks.linkedIn
                    .split("/")
                    .pop() || "",
              },
              github: {
                url: generatedResume.personalInfo.socialLinks.github,
                username:
                  generatedResume.personalInfo.socialLinks.github
                    .split("/")
                    .pop() || "",
              },
              // Add other social links similarly
            },
            languages: generatedResume.personalInfo.languages.map(
              (lang: any) => ({
                language: lang.language,
                proficiency: lang.proficiency,
                certifications: lang.certifications || [],
              })
            ),
            summary: generatedResume.personalInfo.summary,
            visaStatus:
              generatedResume.personalInfo.visaStatus || "Not Specified",
          },
          workExperience: generatedResume.workExperience.map((exp: any) => ({
            jobTitle: exp.jobTitle,
            company: exp.company,
            jobType: exp.jobType,
            location: {
              city: exp.location.city,
              state: exp.location.state,
              country: exp.location.country,
              workplaceType: exp.location.workplaceType,
            },
            startDate: new Date(exp.startDate),
            endDate:
              exp.endDate === "Present" ? "Present" : new Date(exp.endDate),
            responsibilities: exp.responsibilities || [],
            achievements: exp.achievements || [],
            technologies: exp.technologies || [],
            projects: exp.projects || [],
          })),
          education: generatedResume.education.map((edu: any) => ({
            degree: edu.degree,
            institution: edu.institution,
            location: {
              city: edu.location.city,
              state: edu.location.state,
              country: edu.location.country,
            },
            startDate: new Date(edu.startDate),
            endDate: new Date(edu.endDate),
            gpa: edu.gpa,
            relevantCourses: edu.relevantCourses || [],
            projects: edu.projects || [],
            honors: edu.honors || [],
            activities: edu.activities || [],
          })),
          certifications:
            generatedResume.certifications?.map((cert: any) => ({
              name: cert.name,
              issuingOrganization: cert.issuingOrganization,
              issueDate: new Date(cert.issueDate),
              expirationDate: cert.expirationDate
                ? new Date(cert.expirationDate)
                : undefined,
              credentialId: cert.credentialId,
              skills: cert.skills,
            })) || [],
          projects:
            generatedResume.projects?.map((proj: any) => ({
              title: proj.title,
              description: proj.description,
              role: proj.role,
              startDate: new Date(proj.startDate),
              endDate:
                proj.endDate === "Ongoing" ? undefined : new Date(proj.endDate),
              technologies: proj.technologies,
              achievements: proj.achievements,
              url: proj.url,
              mediaLinks: proj.mediaLinks || [],
            })) || [],
          skills: {
            technicalSkills: generatedResume.skills.technicalSkills.map(
              (category: any) => ({
                category: category.category,
                skills: category.skills.map((skill: any) => ({
                  name: skill.name,
                  proficiency: skill.proficiency,
                  yearsOfExperience: skill.yearsOfExperience,
                  lastUsed: new Date(skill.lastUsed),
                })),
              })
            ),
            softSkills: generatedResume.skills.softSkills || [],
          },
          achievements:
            generatedResume.achievements?.map((achievement: any) => ({
              title: achievement.title,
              description: achievement.description,
              date: new Date(achievement.date),
              url: achievement.url,
            })) || [],
          publications:
            generatedResume.publications?.map((pub: any) => ({
              title: pub.title,
              publishedIn: pub.publishedIn,
              date: new Date(pub.date),
              url: pub.url,
              description: pub.description,
            })) || [],
          volunteerExperience:
            generatedResume.volunteerExperience?.map((vol: any) => ({
              organization: vol.organization,
              role: vol.role,
              startDate: new Date(vol.startDate),
              endDate:
                vol.endDate === "Present" ? undefined : new Date(vol.endDate),
              description: vol.description,
              skills: vol.skills,
            })) || [],
          awards:
            generatedResume.awards?.map((award: any) => ({
              name: award.name,
              issuingOrganization: award.issuingOrganization,
              date: new Date(award.date),
              description: award.description,
            })) || [],
          openSourceContributions:
            generatedResume.openSourceContributions?.map((contrib: any) => ({
              projectName: contrib.projectName,
              url: contrib.url,
              description: contrib.description,
              startDate: new Date(contrib.startDate),
              endDate:
                contrib.endDate === "Ongoing"
                  ? undefined
                  : new Date(contrib.endDate),
            })) || [],
        },
      ],
    };

    connectDB();
    // Save to MongoDB
    const savedResume = await Resume.create(resumeData);

    // Return success response with saved data
    return res.status(200).json({
      success: true,
      message: "Resume generated and saved successfully",
      data: {
        resumeId: savedResume._id,
        generatedResume: generatedResume,
      },
    });
  } catch (error: any) {
    console.error("Error in generateResume controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { generateResume };
