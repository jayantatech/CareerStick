import { Request, Response } from "express";
// import connectDB from "../config/connectDB";

import Resume from "../models/Resumes";
import mongoose from "mongoose";
import ResumeSettings from "../models/ResumeSettings";
import { TemplateNameEnum } from "../types/resumeTypes";
import { connectDB } from "../config/connectDB";

const createResume = async (req: Request, res: Response) => {
  console.log("req.body is here", req.body);

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    // await connectDB();();

    // Create resume settings
    const resumeSettings = new ResumeSettings({
      userId,
    });
    await resumeSettings.save();

    // Create resume with reference to settings
    const resume = new Resume({
      userId,
      resumeSettingsId: resumeSettings._id,
      resumeTitle: "Untitled Resume",
    });
    await resume.save();

    return res.status(200).json({
      success: true,
      message: "Resume created successfully",
      resumeId: resume._id,
      resume,
      settings: resumeSettings,
    });
  } catch (error: any) {
    console.error("Error creating resume:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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

    // await connectDB();();
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

        startDate: formatDate(edu?.startDate),
        endDate: formatDate(edu?.endDate),
        isCurrentlyStudying: edu.isCurrentlyStudying,
        description: edu.description,
        // relevantCourses: edu.description.split("\n"),
      })),
      certifications: resumeData.certificate.map((cert: any) => ({
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

const getResume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID format",
      });
    }

    // await connectDB();();
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
          degree: edu.degree || "",
          school: edu.institution || "",
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
          isCurrentlyStudying: edu.isCurrentlyStudying || false,
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
          name: lang.language || "",
          proficiency: lang.proficiency || "",
          isCustom: false,
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
      templateName: typedResume.templateName || "Default",
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

const updateResumeTemplate = async (req: Request, res: Response) => {
  const { resumeId } = req.params;
  const { template } = req.body;

  console.log("I am here", resumeId, template);
  try {
    if (!resumeId || resumeId.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Valid Resume ID is required",
      });
    }
    if (!template) {
      return res.status(400).json({
        success: false,
        message: "Select a template",
      });
    }

    // await connectDB();();

    const updatedTemplate = await Resume.findOneAndUpdate(
      { _id: resumeId },
      { $set: { templateName: template } },
      { new: true }
    );
    if (!updatedTemplate) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Template updated successfully",
      template: updatedTemplate,
    });
  } catch (error) {
    console.error("Error updating template:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating template",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

const getResumeTemplate = async (req: Request, res: Response) => {
  const { resumeId } = req.params;
  console.log("resumeId for template", resumeId);
  try {
    if (!resumeId || resumeId.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Valid Resume ID is required",
      });
    }

    // await connectDB();();

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Template retrieved successfully",
      templateName: resume.templateName,
    });
  } catch (error) {
    console.error("Error fetching template:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching template",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export {
  createResume,
  saveResume,
  getResume,
  updateResumeTemplate,
  getResumeTemplate,
};
