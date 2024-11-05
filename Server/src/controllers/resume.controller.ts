import { Request, Response } from "express";
import connectDB from "../config/connectDB";
import Resume from "../models/Resumes";
import mongoose from "mongoose";
import { IResume } from "../types/resumeTypes";

// interface ISocialLink {
//   platform: string;
//   url: string;
// }

// interface IPersonalInfo {
//   name: string;
//   phoneNumber: string;
//   email: string;
//   location: string;
//   socialLinks: ISocialLink[];
//   languages: string[];
//   summary: string;
//   image?: string;
//   visaStatus?: string;
// }

// interface IWorkExperience {
//   _id: mongoose.Types.ObjectId;
//   jobTitle: string;
//   company: string;
//   jobType: string;
//   location: string;
//   startDate: Date;
//   endDate?: Date;
//   responsibilities: string[];
//   technologies: string[];
// }

// interface IEducation {
//   _id: mongoose.Types.ObjectId;
//   degree: string;
//   institution: string;
//   location: string;
//   startDate: Date;
//   endDate?: Date;
//   relevantCourses: string[];
// }

// interface ICertification {
//   _id: mongoose.Types.ObjectId;
//   name: string;
//   issuingOrganization: string;
//   issueDate: Date;
//   expirationDate?: Date;
//   credentialId?: string;
//   skills: string[];
// }

// interface IProject {
//   _id: mongoose.Types.ObjectId;
//   title: string;
//   description: string;
//   role: string;
//   technologies: string[];
//   url?: string;
// }

// interface ISkill {
//   name: string;
//   proficiency: number;
//   yearsOfExperience: number;
//   lastUsed: Date;
// }

// interface ISkillCategory {
//   category: string;
//   skills: ISkill[];
// }

// interface ISkills {
//   technicalSkills: ISkillCategory[];
//   softSkills: string[];
// }

// interface IOpenSourceContribution {
//   _id: mongoose.Types.ObjectId;
//   projectName: string;
//   url: string;
//   description: string;
//   startDate: Date;
//   endDate?: Date;
// }

// interface IAward {
//   _id: mongoose.Types.ObjectId;
//   name: string;
//   issuingOrganization: string;
//   date: Date;
//   description: string;
// }

// interface ICustomSection {
//   _id: mongoose.Types.ObjectId;
//   title: string;
//   content: string[];
// }

// interface IResume {
//   _id: mongoose.Types.ObjectId;
//   targetJobTitle: string;
//   targetedJobAndIndustry: string;
//   personalInfo: IPersonalInfo;
//   workExperience: IWorkExperience[];
//   education: IEducation[];
//   certifications: ICertification[];
//   projects: IProject[];
//   skills: ISkills;
//   openSourceContributions: IOpenSourceContribution[];
//   awards: IAward[];
//   customSections: ICustomSection[];
// }

const createResume = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    // if (!data) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Data is required",
    //   });
    // }
    await connectDB();
    const resume = await Resume.create({ userId });
    console.log("resume data from controller", resume);
    return res.status(200).json({
      success: true,
      message: "Resume created successfully",
      resumeId: resume._id,
      resume: resume,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// I created this one
// const saveResume = async (req: Request, res: Response) => {
//   try {
//     const { resumeId, resumeData } = req.body;
//     if (!resumeId) {
//       return res.status(400).json({
//         success: false,
//         message: "Resume ID is required",
//       });
//     }

//     if (!resumeData) {
//       return res.status(400).json({
//         success: false,
//         message: "Resume data is required",
//       });
//     }

//     await connectDB();

//     const resume = await Resume.findById(resumeId);
//     if (!resume) {
//       return res.status(400).json({
//         success: false,
//         redirect: "/app/resumes",
//         message: "Resume not found",
//       });
//     }

//     resume.updateOne({ $set: resumeData }, { new: true });

//     return res.status(200).json({
//       success: true,
//       message: "Resume saved successfully",
//       resumeId: resume._id,
//       resume: resume,
//     });
//   } catch (error) {}
// };
// import { ResumeState } from "../types/resume"; // Import your Redux state type

// Helper function to convert Redux date format to MongoDB Date
const convertToDate = (dateInfo: { month: string; year: string }) => {
  if (!dateInfo.month || !dateInfo.year) return undefined;
  return new Date(`${dateInfo.month} 1, ${dateInfo.year}`);
};

// Helper to map social links from Redux format to MongoDB format
const mapSocialLinks = (links: Array<{ platform: string; url: string }>) => {
  const socialLinks: any = {};

  links.forEach((link) => {
    const platform = link.platform.toLowerCase();
    const username = link.url.split("/").pop() || "";

    if (platform === "linkedin") {
      socialLinks.linkedIn = { url: link.url, username };
    } else if (platform === "github") {
      socialLinks.github = { url: link.url, username };
    } else if (platform === "stackoverflow") {
      socialLinks.stackOverflow = { url: link.url, username };
    } else if (platform === "portfolio") {
      socialLinks.personalWebsite = { url: link.url, username };
    } else if (platform === "twitter") {
      socialLinks.twitter = { url: link.url, username };
    }
  });

  return socialLinks;
};

// Helper to map languages from Redux format to MongoDB format
const mapLanguages = (
  languages: Array<{ name: string; proficiency: string; isCustom: boolean }>
) => {
  return languages.map((lang) => ({
    language: lang.name,
    proficiency: lang.proficiency as any,
    certifications: [],
  }));
};

const saveResume = async (req: Request, res: Response) => {
  console.log("req.body is heare", req.body);
  try {
    const { resumeId, resumeData } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required",
      });
    }

    if (!resumeData) {
      return res.status(400).json({
        success: false,
        message: "Resume data is required",
      });
    }

    await connectDB();
    const formatDate = (dateObj: any) => {
      if (!dateObj) return null;
      return {
        month: dateObj.month || "",
        year: dateObj.year || "",
      };
    };
    // Map Redux state to MongoDB schema
    const mappedData = {
      targetJobTitle: resumeData.jobIndustry.targetJob,
      targetedJobAndIndustry: {
        industry: resumeData.jobIndustry.industry,
        targetJob: resumeData.jobIndustry.targetJob,
        experience: resumeData.jobIndustry.experience,
      },
      personalInfo: {
        name: `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}`,
        phoneNumber: resumeData.personalInfo.phone,
        email: resumeData.personalInfo.email,
        location: {
          city: resumeData.personalInfo.city,
          country: resumeData.personalInfo.country,
        },
        summary: resumeData.professionalSummary.summaryText,
        image: resumeData.personalInfo.photo
          ? String(resumeData.personalInfo.photo)
          : undefined,
        visaStatus: "", // Add this field if needed
      },
      workExperience: resumeData.workExperience.map((job: any) => ({
        jobTitle: job.jobTitle,
        company: job.company,
        jobType: "Full-time", // Add job type if available in Redux
        location: {
          city: job.location,
          workplaceType: "On-site", // Add workplace type if available in Redux
        },
        // startDate: {
        //   month: job.startDate.month,
        //   year: job.startDate.year,
        // },
        // endDate: {
        //   month: job.endDate.month,
        //   year: job.endDate.year,
        // },
        startDate: formatDate(job?.startDate),
        endDate: formatDate(job?.endDate),
        isCurrentJob: job.isCurrentJob,
        responsibilities: job.description.split("\n"),
        technologies: [], // Add if available in Redux
      })),
      education: resumeData.education.map((edu: any) => ({
        degree: edu.degree,
        institution: edu.school,
        location: {
          city: edu.location,
        },
        // startDate: {
        //   month: edu.startDate.month,
        //   year: edu.startDate.year,
        // },
        // endDate: {
        //   month: edu.endDate.month,
        //   year: edu.endDate.year,
        // },
        startDate: formatDate(edu?.startDate),
        endDate: formatDate(edu?.endDate),
        isCurrentlyStudying: edu.isCurrentlyStudying,
        description: edu.description,
        // relevantCourses: edu.description.split("\n"),
      })),
      certifications: resumeData.certificate.map((cert: any) => ({
        name: cert.name,
        issuingOrganization: cert.issuingOrganization,
        // issueDate: {
        //   month: cert.startDate.month,
        //   year: cert.startDate.year,
        // },
        // expirationDate: {
        //   month: cert.startDate.month,
        //   year: cert.startDate.year,
        // },
        issueDate: formatDate(cert?.issueDate),
        expirationDate: formatDate(cert?.expirationDate),
        isNeverExpires: cert.isNeverExpires,
        description: cert.description,
        credentialId: cert.credentialId,
        verificationUrl: cert.verificationUrl,
        skills: [],
      })),
      socialLinks: resumeData.socialLinks.map((link: any) => ({
        platform: link.platform,
        url: link.url,
      })),
      languages: mapLanguages(resumeData.languages),

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
      projects: resumeData.projects.map((project: any) => ({
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
          ...resumeData.selectedSkills,
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
      openSourceContributions: resumeData.openSourceContributions.map(
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
      awards: resumeData.awards.map((award: any) => ({
        name: award.name,
        issuingOrganization: award.issuer,
        date: formatDate(award?.date),
        description: award.description,
      })),
      customSections: resumeData.customSections.map((section: any) => ({
        title: section.title,
        description: section.description,
        subtitle: section.subtitle,
        startDate: formatDate(section?.startDate),
        endDate: formatDate(section?.endDate),
        isPresent: section.isPresent,
      })),
    };

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        redirect: "/app/resumes",

        message: "Resume not found",
      });
    }

    await resume.updateOne({ $set: mappedData }, { new: true });

    return res.status(200).json({
      success: true,
      message: "Resume saved successfully",

      resumeData: resumeData,
    });
  } catch (error) {
    console.error("Error saving resume:", error);
    return res.status(500).json({
      success: false,
      message: "Error saving resume",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

// const getResume = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid resume ID format",
//       });
//     }
//     await connectDB();
//     const resume = await Resume.findById(id);
//     if (!resume) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume not found",
//         redirect: "/app/resumes",
//       });
//     }
//     // Type assertion since we know the document exists and matches our interface
//     const typedResume = resume.toObject() as IResume;
//     console.log("typedResume on server", typedResume);
//     // Transform the resume data to match the exact structure we want to return
//     const transformedResume = {
//       _id: resume._id,
//       resumeTitle: typedResume.resumeTitle,
//       targetJobTitle: typedResume.targetJobTitle,
//       targetedJobAndIndustry: typedResume.targetedJobAndIndustry,
//       personalInfo: {
//         name: typedResume.personalInfo.name,
//         phoneNumber: typedResume.personalInfo.phoneNumber,
//         email: typedResume.personalInfo.email,
//         location: typedResume.personalInfo.location,
//         // socialLinks: typedResume.personalInfo.socialLinks,
//         // languages: typedResume.personalInfo.languages,
//         summary: typedResume.personalInfo.summary,
//         image: typedResume.personalInfo.image,
//         visaStatus: typedResume.personalInfo.visaStatus,
//       },
//       workExperience:
//         typedResume.workExperience?.map((exp) => ({
//           jobTitle: exp.jobTitle,
//           company: exp.company,
//           jobType: exp.jobType,
//           location: exp.location,
//           startDate: {
//             month: exp.startDate.month,
//             year: exp.startDate.year,
//           },
//           endDate: {
//             month: exp.endDate.month,
//             year: exp.endDate.year,
//           },
//           isCurrentJob: exp.isCurrentJob,
//           responsibilities: exp.responsibilities,
//           achievements: exp.achievements,
//           technologies: exp.technologies,
//           projects: exp.projects?.map((project) => ({
//             name: project.name,
//             description: project.description,
//             role: project.role,
//             technologies: project.technologies,
//             achievements: project.achievements,
//           })),
//         })) ?? [],
//       education:
//         typedResume.education?.map((edu) => ({
//           degree: edu.degree,
//           institution: edu.institution,
//           location: edu.location,
//           startDate: edu.startDate,
//           endDate: edu.endDate,
//           gpa: edu.gpa,
//           relevantCourses: edu.relevantCourses,
//           projects: edu.projects,
//           honors: edu.honors,
//           activities: edu.activities,
//         })) ?? [],
//       certifications:
//         typedResume.certifications?.map((cert) => ({
//           name: cert.name,
//           issuingOrganization: cert.issuingOrganization,
//           issueDate: cert.issueDate,
//           expirationDate: cert.expirationDate,
//           credentialId: cert.credentialId,
//           skills: cert.skills,
//         })) ?? [],
//       projects:
//         typedResume.projects?.map((proj) => ({
//           title: proj.title,
//           description: proj.description,
//           role: proj.role,
//           startDate: proj.startDate,
//           endDate: proj.endDate,
//           technologies: proj.technologies,
//           achievements: proj.achievements,
//           url: proj.url,
//           mediaLinks: proj.mediaLinks,
//         })) ?? [],
//       skills: typedResume.skills ?? {
//         technicalSkills: [],
//         softSkills: [],
//       },
//       achievements:
//         typedResume.achievements?.map((achievement) => ({
//           title: achievement.title,
//           description: achievement.description,
//           date: achievement.date,
//           url: achievement.url,
//         })) ?? [],
//       publications:
//         typedResume.publications?.map((pub) => ({
//           title: pub.title,
//           publishedIn: pub.publishedIn,
//           date: pub.date,
//           url: pub.url,
//           description: pub.description,
//         })) ?? [],
//       volunteerExperience:
//         typedResume.volunteerExperience?.map((exp) => ({
//           organization: exp.organization,
//           role: exp.role,
//           startDate: exp.startDate,
//           endDate: exp.endDate,
//           description: exp.description,
//           skills: exp.skills,
//         })) ?? [],
//       awards:
//         typedResume.awards?.map((award) => ({
//           name: award.name,
//           issuingOrganization: award.issuingOrganization,
//           date: award.date,
//           description: award.description,
//         })) ?? [],
//       openSourceContributions:
//         typedResume.openSourceContributions?.map((contrib) => ({
//           projectName: contrib.projectName,
//           url: contrib.url,
//           description: contrib.description,
//           startDate: contrib.startDate,
//           endDate: contrib.endDate,
//         })) ?? [],
//       // customSections:
//       //   typedResume.customSections?.map((section) => ({
//       //     title: section.title,
//       //     content: section.content,
//       //   })) ?? [],
//       atsCompatibilityScore: typedResume.atsCompatibilityScore,
//       keywords: typedResume.keywords,
//       templateName: typedResume.templateName,
//       isPremiumTemplate: typedResume.isPremiumTemplate,
//       lastAtsAnalysisDate: typedResume.lastAtsAnalysisDate,
//       visibility: typedResume.visibility,
//       resumeFile: typedResume.resumeFile,
//       createdAt: typedResume.createdAt,
//       updatedAt: typedResume.updatedAt,
//     };
//     return res.status(200).json({
//       success: true,
//       message: "Resume fetched successfully",
//       resume: transformedResume,
//     });
//   } catch (error) {
//     console.error("Error fetching resume:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error fetching resume",
//       error: error instanceof Error ? error.message : "Unknown error occurred",
//     });
//   }
// };

const getResume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID format",
      });
    }

    await connectDB();
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
        redirect: "/app/resumes",
      });
    }

    const typedResume = resume.toObject();

    // Transform the resume data to match the Redux state structure
    const transformedResume = {
      jobIndustry: {
        targetJob: typedResume.targetJobTitle,
        industry: typedResume.targetedJobAndIndustry?.industry,
        experience: typedResume.targetedJobAndIndustry?.experience,
      },
      personalInfo: {
        firstName: typedResume.personalInfo?.name?.split(" ")[0] || "",
        lastName:
          typedResume.personalInfo?.name?.split(" ").slice(1).join(" ") || "",
        phone: typedResume.personalInfo?.phoneNumber,
        email: typedResume.personalInfo?.email,
        city: typedResume.personalInfo?.location?.city,
        country: typedResume.personalInfo?.location?.country,
        photo: typedResume.personalInfo?.image,
      },
      professionalSummary: {
        summaryText: typedResume.personalInfo?.summary || "",
      },
      workExperience:
        typedResume.workExperience?.map((job) => ({
          jobTitle: job.jobTitle,
          company: job.company,
          location: [
            job.location?.city,
            job.location?.state,
            job.location?.country,
          ]
            .filter(Boolean)
            .join(", "),
          startDate: job.startDate
            ? {
                month: job.startDate.month,
                year: job.startDate.year,
              }
            : undefined,
          endDate: job.endDate
            ? {
                month: job.endDate.month,
                year: job.endDate.year,
              }
            : undefined,
          isCurrentJob: job.isCurrentJob,
          description: job.responsibilities?.join("\n") || "",
        })) || [],
      education:
        typedResume.education?.map((edu) => ({
          degree: edu.degree,
          school: edu.institution,
          location: [
            edu.location?.city,
            edu.location?.state,
            edu.location?.country,
          ]
            .filter(Boolean)
            .join(", "),
          startDate: edu.startDate
            ? {
                month: edu.startDate.month,
                year: edu.startDate.year,
              }
            : undefined,
          endDate: edu.endDate
            ? {
                month: edu.endDate.month,
                year: edu.endDate.year,
              }
            : undefined,
          isCurrentlyStudying: edu.isCurrentlyStudying,
          description: edu.description || "",
        })) || [],
      certificate:
        typedResume.certifications?.map((cert) => ({
          name: cert.name || "",
          issuingOrganization: cert.issuingOrganization || "",
          issueDate: cert.issueDate
            ? {
                month: cert.issueDate.month,
                year: cert.issueDate.year,
              }
            : undefined,
          expirationDate: cert.expirationDate
            ? {
                month: cert.expirationDate.month,
                year: cert.expirationDate.year,
              }
            : undefined,
          isNeverExpires: cert.isNeverExpires || false,

          description: cert.description || "",
          credentialId: cert.credentialId || "",
          verificationUrl: cert.verificationUrl || "",
        })) || [],
      socialLinks:
        typedResume.socialLinks?.map((link) => ({
          platform: link.platform,
          url: link.url,
        })) || [],
      languages:
        typedResume.languages?.map((lang) => ({
          name: lang.language,
          proficiency: lang.proficiency,
        })) || [],
      projects:
        typedResume.projects?.map((project) => ({
          title: project.title,
          contributions: project.contributions,
          role: project.role,
          technologies: project.technologies || [],
          links:
            project.links?.map((link) => ({
              platform: link.platform,
              url: link.url,
            })) || [],
        })) || [],
      selectedSkills:
        typedResume.skills?.technicalSkills?.map((skill) => ({
          name: skill.name,
        })) || [],
      customSkills: [], // If you need to separate custom skills
      openSourceContributions:
        typedResume.openSourceContributions?.map((contrib) => ({
          projectName: contrib.projectName || "",
          role: contrib.role || "",
          technologies: contrib.technologies || [],
          links:
            contrib.links?.map((link) => ({
              platform: link.platform,
              url: link.url,
            })) || [],
          description: contrib.description,
          contributions: contrib.contributions,
          startDate: contrib.startDate
            ? {
                month: contrib.startDate.month,
                year: contrib.startDate.year,
              }
            : undefined,
          endDate: contrib.endDate
            ? {
                month: contrib.endDate.month,
                year: contrib.endDate.year,
              }
            : undefined,
          isOngoing: contrib.isOngoing,
        })) || [],
      awards:
        typedResume.awards?.map((award) => ({
          name: award.name || "",
          issuer: award.issuingOrganization || "",
          date: award.date
            ? {
                month: award.date.month,
                year: award.date.year,
              }
            : undefined,
          description: award.description || "",
        })) || [],
      customSections:
        typedResume.customSections?.map((section) => ({
          title: section.title || "",
          description: section.description || "",
          subtitle: section.subtitle || "",
          startDate: section.startDate
            ? {
                month: section.startDate.month,
                year: section.startDate.year,
              }
            : undefined,
          endDate: section.endDate
            ? {
                month: section.endDate.month,
                year: section.endDate.year,
              }
            : undefined,
          isPresent: section.isPresent || false,
        })) || [],
    };

    return res.status(200).json({
      success: true,
      message: "Resume fetched successfully",
      resume: transformedResume,
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching resume",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
export { createResume, saveResume, getResume };
