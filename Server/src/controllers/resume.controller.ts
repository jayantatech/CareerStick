import { Request, Response } from "express";

import Resume from "../models/Resumes";
import mongoose from "mongoose";
import ResumeSettings from "../models/ResumeSettings";
import { LanguageProficiency } from "../types/resumeTypes";
import User from "../models/User";

const createResume = async (req: Request, res: Response) => {
  // console.log("req.body is here", req.body);

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    // Create resume settings
    const resumeSettings = new ResumeSettings({
      userId,
    });
    await resumeSettings.save();

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

const saveResume = async (req: Request, res: Response) => {
  try {
    const { resumeId, resumeData, userId } = req.body;

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
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
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

    console.log("resumeData fro saveResume", resumeData);
    // Map Redux state to MongoDB schema
    const mappedData = {
      resumeTitle: resumeData.resumeTitle,
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
      // languages: mapLanguages(resumeData.languages),
      languages:
        resumeData.languages?.map((lang: any) => ({
          language: lang.name || "",
          proficiency: (lang.proficiency as LanguageProficiency) || null,
        })) || [],
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
        technicalSkills: [...resumeData.selectedSkills],
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
    if (resume.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this resume",
      });
    }

    await resume.updateOne(
      { $set: mappedData, updatedAt: Date.now() },
      { new: true }
    );

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
    const { userId } = req.body;
    // console.log("user i id i got it", userId);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID format",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // await connectDB();();
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Find resume and check ownership
    const resume = await Resume.findOne({ _id: id });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
        redirect: "/app/resumes",
      });
    }

    // Check if the requesting user owns this resume
    if (resume.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this resume",
      });
    }

    const typedResume = resume.toObject();
    // console.log("typedResume", typedResume);
    // Transform the resume data to match the Redux state structure
    const transformedResume = {
      resumeTitle: typedResume.resumeTitle,
      jobIndustry: {
        targetJob: typedResume.targetedJobAndIndustry?.targetJob || "",
        industry: typedResume.targetedJobAndIndustry?.industry || "",
        experience: typedResume.targetedJobAndIndustry?.experience || "",
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
  const { template, userId } = req.body;

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

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }
    if (resume.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this resume",
      });
    }
    resume.templateName = template;
    resume.updatedAt = new Date();
    await resume.save();

    return res.status(200).json({
      success: true,
      message: "Template updated successfully",
      template: resume,
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
  const { userId } = req.body;
  // console.log("resumeId for template", resumeId);
  try {
    if (!resumeId || resumeId.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Valid Resume ID is required",
      });
    }

    // await connectDB();();
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
        redirect: "/app/resumes",
      });
    }

    if (resume.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to this resume",
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

const getAllResumes = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    if (!userId || userId.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resumes = await Resume.find({ userId: user._id });
    if (!resumes.length) {
      return res.status(404).json({
        success: false,
        message: "No resumes found",
      });
    }

    const transformedResumes = resumes.map((resume) => {
      const typedResume = resume.toObject();

      return {
        _id: resume._id,
        resumeTitle: typedResume?.resumeTitle || "",
        jobIndustry: {
          targetJob: typedResume.targetedJobAndIndustry?.targetJob || "",
          industry: typedResume.targetedJobAndIndustry?.industry || "",
          experience: typedResume.targetedJobAndIndustry?.experience || "",
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
        createdAt: typedResume.createdAt,
        updatedAt: typedResume.updatedAt,
      };
    });

    return res.status(200).json({
      success: true,
      resumes: transformedResumes,
    });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching resumes",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

const deleteResume = async (req: Request, res: Response) => {
  const { resumeId, userId } = req.body;
  // console.log("Attempting to delete resume:", resumeId);

  try {
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Validate resumeId
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID format",
      });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the resume and verify ownership
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or you don't have permission to delete it",
      });
    }

    // Delete the resume
    await Resume.findByIdAndDelete(resumeId);

    // Delete associated settings if they exist
    if (resume.resumeSettingsId) {
      await ResumeSettings.findByIdAndDelete(resume.resumeSettingsId);
    }

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting resume:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting resume",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

const duplicateResume = async (req: Request, res: Response) => {
  const { resumeId, userId } = req.body;
  // console.log("Duplicating resume:", resumeId);

  try {
    // Validate if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Validate if resumeId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID format",
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the original resume and verify ownership
    const originalResume = await Resume.findOne({
      _id: resumeId,
      userId: user._id, // This ensures the resume belongs to the user
    });

    if (!originalResume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or you don't have permission to access it",
      });
    }

    // Validate resume settings existence
    if (!originalResume.resumeSettingsId) {
      return res.status(404).json({
        success: false,
        message: "Resume settings not found",
      });
    }

    // Find the original settings
    const originalSettings = await ResumeSettings.findById(
      originalResume.resumeSettingsId
    );

    if (!originalSettings) {
      return res.status(404).json({
        success: false,
        message: "Resume settings not found",
      });
    }

    // Create new settings document
    const newSettings = new ResumeSettings({
      ...originalSettings.toObject(),
      _id: new mongoose.Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save the new settings
    const savedSettings = await newSettings.save();

    // Create new resume document
    const newResume = new Resume({
      ...originalResume.toObject(),
      _id: new mongoose.Types.ObjectId(),
      userId: user._id, // Ensure the new resume is associated with the user
      resumeSettingsId: savedSettings._id,
      resumeTitle: `Copy of ${originalResume.resumeTitle}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save the new resume
    const savedResume = await newResume.save();

    return res.status(200).json({
      success: true,
      message: "Resume duplicated successfully",
      resumeId: savedResume._id, // Return the new resume ID
    });
  } catch (error) {
    console.error("Error duplicating resume:", error);
    return res.status(500).json({
      success: false,
      message: "Error duplicating resume",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

const updateResumeTitle = async (req: Request, res: Response) => {
  const { resumeId, resumeTitle, userId } = req.body;
  // console.log("Attempting to update resume title:", { resumeId, resumeTitle });

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Validate resumeId
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID format",
      });
    }

    // Validate resumeTitle
    if (!resumeTitle || resumeTitle.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Resume title cannot be empty",
      });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the resume and verify ownership
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or you don't have permission to update it",
      });
    }

    // Update the resume title
    resume.resumeTitle = resumeTitle.trim();
    resume.updatedAt = new Date();
    await resume.save();

    return res.status(200).json({
      success: true,
      message: "Resume title updated successfully",
      updatedTitle: resume.resumeTitle,
    });
  } catch (error) {
    console.error("Error updating resume title:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating resume title",
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
  getAllResumes,
  deleteResume,
  duplicateResume,
  updateResumeTitle,
};
