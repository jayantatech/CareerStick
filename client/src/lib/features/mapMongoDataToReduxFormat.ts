// import {
//   Award,
//   AwardValue,
//   Certificate,
//   CustomSection,
//   DateInfo,
//   Education,
//   EducationValue,
//   JobExperience,
//   JobIndustryData,
//   Language,
//   OpenSourceContribution,
//   PersonalInformation,
//   ProfessionalSummary,
//   Project,
//   ResumeState,
//   Skill,
//   SocialLink,
// } from "@/lib/types/resumeInput";
// const mapMongoDataToReduxFormat = (mongoData: any) => {
//   // Helper function to format date info
//   const formatDate = (date: string | DateInfo) => {
//     if (!date) return { month: "", year: "" };
//     if (date === "Present") return { month: "", year: "" };

//     try {
//       if (typeof date === "string") {
//         const dateObj = new Date(date);
//         return {
//           month: dateObj.toLocaleString("default", { month: "long" }),
//           year: dateObj.getFullYear().toString(),
//         };
//       }
//       // If date is already in month/year format
//       return {
//         month: date.month || "",
//         year: date.year || "",
//       };
//     } catch {
//       return { month: "", year: "" };
//     }
//   };

//   // Helper function to format location

//   // Helper function to generate random ID
//   const generateId = (prefix: string) =>
//     `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

//   return {
//     // Job Industry
//     jobIndustry: {
//       industry: mongoData.jobIndustry?.industry || "",
//       targetJob: mongoData.jobIndustry?.targetJob || "",
//       experience: mongoData.jobIndustry?.experience || "",
//     },

//     // Personal Info
//     personalInfo: {
//       firstName: mongoData.personalInfo?.firstName || "",
//       lastName: mongoData.personalInfo?.lastName || "",
//       email: mongoData.personalInfo?.email || "",
//       phone: mongoData.personalInfo?.phone || "",
//       city: mongoData.personalInfo?.city || "",
//       country: mongoData.personalInfo?.country || "",
//       address: mongoData.personalInfo?.address || "",
//       postalCode: mongoData.personalInfo?.postalCode || "",
//       photo: mongoData.personalInfo?.photo || null,
//     },

//     // Professional Summary
//     professionalSummary: {
//       summaryText: mongoData.professionalSummary?.summaryText || "",
//     },

//     // Work Experience
//     workExperience: (mongoData.workExperience || []).map((job: any) => ({
//       id: job._id || generateId("job"),
//       jobTitle: job.jobTitle || "",
//       company: job.company || "",
//       startDate: formatDate(job.startDate),
//       endDate: job.isCurrentJob
//         ? { month: "", year: "" }
//         : formatDate(job.endDate),
//       isCurrentJob: job.isCurrentJob || false,
//       location: job.location || "",
//       description: Array.isArray(job.responsibilities)
//         ? job.responsibilities.join("\n")
//         : job.description || "",
//     })),

//     // Education
//     education: (mongoData.education || []).map((edu: any) => ({
//       id: edu._id || generateId("edu"),
//       degree: edu.degree || "",
//       school: edu.institution || edu.school || "",
//       startDate: formatDate(edu.startDate),
//       endDate: edu.isCurrentlyStudying
//         ? { month: "", year: "" }
//         : formatDate(edu.endDate),
//       isCurrentlyStudying: edu.isCurrentlyStudying || false,
//       location: edu.location,
//       description: Array.isArray(edu.relevantCourses)
//         ? edu.relevantCourses.join("\n")
//         : edu.description || "",
//     })),

//     // Social Links
//     socialLinks: (mongoData.socialLinks || []).map((link: any) => ({
//       id: link._id || generateId("social"),
//       platform: link.platform || "",
//       url: link.url || "",
//     })),

//     // Projects
//     projects: (mongoData.projects || []).map((project: any) => ({
//       id: project._id || generateId("proj"),
//       title: project.title || "",
//       technologies: project.technologies || [],
//       role: project.role || "",
//       contributions: project.description || project.contributions || "",
//       links: project.url
//         ? [{ platform: "GitHub", url: project.url }]
//         : (project.links || []).map((link: any) => ({
//             platform: link.platform || "Other",
//             url: link.url || "",
//           })),
//     })),

//     // Languages
//     languages: (mongoData.languages || []).map((lang: any) => ({
//       id: lang._id || generateId("lang"),
//       name: lang.name || "",
//       proficiency: lang.proficiency || "",
//     })),

//     // Skills
//     selectedSkills: (mongoData.selectedSkills || []).map((skill: any) => ({
//       id: generateId("skill"),
//       name: typeof skill === "string" ? skill : skill.name || "",
//     })),

//     customSkills: [],

//     // Certificates
//     certificate: (mongoData.certificate || []).map((cert: any) => ({
//       id: cert._id || generateId("cert"),
//       name: cert.name || "",
//       issuingOrganization: cert.issuingOrganization || "",
//       issueDate: formatDate(cert.issueDate),
//       expirationDate: cert.isNeverExpires
//         ? { month: "", year: "" }
//         : formatDate(cert.expirationDate),
//       credentialId: cert.credentialId || "",
//       verificationUrl: cert.verificationUrl || "",
//       description: cert.description || "",
//       isNeverExpires: cert.isNeverExpires || false,
//     })),

//     // Awards
//     awards: (mongoData.awards || []).map((award: any) => ({
//       id: award._id || generateId("award"),
//       name: award.name || "",
//       issuer: award.issuer || "",
//       date: formatDate(award.date),
//       description: award.description || "",
//     })),

//     // Open Source Contributions
//     openSourceContributions: (mongoData.openSourceContributions || []).map(
//       (contrib: any) => ({
//         id: contrib._id || generateId("open-source"),
//         projectName: contrib.projectName || "",
//         role: contrib.role || "",
//         technologies: contrib.technologies || [],
//         description: contrib.description || "",
//         contributions: contrib.contributions || "",
//         links: contrib.url
//           ? [{ platform: "GitHub", url: contrib.url }]
//           : (contrib.links || []).map((link: any) => ({
//               platform: link.platform || "Other",
//               url: link.url || "",
//             })),
//         startDate: formatDate(contrib.startDate),
//         endDate: contrib.isOngoing
//           ? { month: "", year: "" }
//           : formatDate(contrib.endDate),
//         isOngoing: contrib.isOngoing || false,
//       })
//     ),

//     // Custom Sections
//     customSections: (mongoData.customSections || []).map((section: any) => ({
//       id: section._id || generateId("custom"),
//       title: section.title || "",
//       subtitle: section.subtitle || "",
//       description: Array.isArray(section.content)
//         ? section.content.join("\n")
//         : section.description || "",
//       startDate: formatDate(section.startDate),
//       endDate: section.isPresent
//         ? { month: "", year: "" }
//         : formatDate(section.endDate),
//       isPresent: section.isPresent || false,
//     })),
//   };
// };

// export default mapMongoDataToReduxFormat;

import { DateInfo, ResumeState } from "@/lib/types/resumeInput";

interface MongoDateInfo {
  month?: string;
  year?: string;
}

interface MongoData {
  jobIndustry?: {
    industry?: string;
    targetJob?: string;
    experience?: string;
  };
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    city?: string;
    country?: string;
    address?: string;
    postalCode?: string;
    photo?: File | null;
  };
  professionalSummary?: {
    summaryText?: string;
  };
  workExperience?: Array<{
    _id?: string;
    jobTitle?: string;
    company?: string;
    startDate?: string | MongoDateInfo;
    endDate?: string | MongoDateInfo;
    isCurrentJob?: boolean;
    location?: string;
    responsibilities?: string[];
    description?: string;
  }>;
  education?: Array<{
    _id?: string;
    degree?: string;
    institution?: string;
    school?: string;
    startDate?: string | MongoDateInfo;
    endDate?: string | MongoDateInfo;
    isCurrentlyStudying?: boolean;
    location?: string;
    relevantCourses?: string[];
    description?: string;
  }>;
  socialLinks?: Array<{
    _id?: string;
    platform?: string;
    url?: string;
  }>;
  projects?: Array<{
    _id?: string;
    title?: string;
    technologies?: string[];
    role?: string;
    description?: string;
    contributions?: string;
    url?: string;
    links?: Array<{ platform: string; url: string }>;
  }>;
  languages?: Array<{
    _id?: string;
    name?: string;
    proficiency?: string;
    isCustom?: boolean;
  }>;
  selectedSkills?: Array<string | { name: string }>;
  certificate?: Array<{
    _id?: string;
    name?: string;
    issuingOrganization?: string;
    issueDate?: string | MongoDateInfo;
    expirationDate?: string | MongoDateInfo;
    credentialId?: string;
    verificationUrl?: string;
    description?: string;
    isNeverExpires?: boolean;
  }>;
  awards?: Array<{
    _id?: string;
    name?: string;
    issuer?: string;
    date?: string | MongoDateInfo;
    description?: string;
  }>;
  openSourceContributions?: Array<{
    _id?: string;
    projectName?: string;
    role?: string;
    technologies?: string[];
    description?: string;
    contributions?: string;
    url?: string;
    links?: Array<{ platform: string; url: string }>;
    startDate?: string | MongoDateInfo;
    endDate?: string | MongoDateInfo;
    isOngoing?: boolean;
  }>;
  customSections?: Array<{
    _id?: string;
    title?: string;
    subtitle?: string;
    content?: string[];
    description?: string;
    startDate?: string | MongoDateInfo;
    endDate?: string | MongoDateInfo;
    isPresent?: boolean;
  }>;
}

const mapMongoDataToReduxFormat = (mongoData: MongoData): ResumeState => {
  // Helper function to format date info
  const formatDate = (date: string | MongoDateInfo | undefined): DateInfo => {
    if (!date) return { month: "", year: "" };
    if (date === "Present") return { month: "", year: "" };

    try {
      if (typeof date === "string") {
        const dateObj = new Date(date);
        return {
          month: dateObj.toLocaleString("default", { month: "long" }),
          year: dateObj.getFullYear().toString(),
        };
      }
      // If date is already in month/year format
      return {
        month: date.month || "",
        year: date.year || "",
      };
    } catch {
      return { month: "", year: "" };
    }
  };

  // Helper function to generate random ID
  const generateId = (prefix: string): string =>
    `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

  return {
    // Job Industry
    jobIndustry: {
      industry: mongoData.jobIndustry?.industry || "",
      targetJob: mongoData.jobIndustry?.targetJob || "",
      experience: mongoData.jobIndustry?.experience || "",
    },

    // Personal Info
    personalInfo: {
      firstName: mongoData.personalInfo?.firstName || "",
      lastName: mongoData.personalInfo?.lastName || "",
      email: mongoData.personalInfo?.email || "",
      phone: mongoData.personalInfo?.phone || "",
      city: mongoData.personalInfo?.city || "",
      country: mongoData.personalInfo?.country || "",
      address: mongoData.personalInfo?.address || "",
      postalCode: mongoData.personalInfo?.postalCode || "",
      photo: mongoData.personalInfo?.photo || null,
    },

    // Professional Summary
    professionalSummary: {
      summaryText: mongoData.professionalSummary?.summaryText || "",
    },

    // Work Experience
    workExperience: (mongoData.workExperience || []).map((job) => ({
      id: job._id || generateId("job"),
      jobTitle: job.jobTitle || "",
      company: job.company || "",
      startDate: formatDate(job.startDate),
      endDate: job.isCurrentJob
        ? { month: "", year: "" }
        : formatDate(job.endDate),
      isCurrentJob: job.isCurrentJob || false,
      location: job.location || "",
      description: Array.isArray(job.responsibilities)
        ? job.responsibilities.join("\n")
        : job.description || "",
    })),

    // Education
    education: (mongoData.education || []).map((edu) => ({
      id: edu._id || generateId("edu"),
      degree: edu.degree || "",
      school: edu.institution || edu.school || "",
      startDate: formatDate(edu.startDate),
      endDate: edu.isCurrentlyStudying
        ? { month: "", year: "" }
        : formatDate(edu.endDate),
      isCurrentlyStudying: edu.isCurrentlyStudying || false,
      location: edu.location || "",
      description: Array.isArray(edu.relevantCourses)
        ? edu.relevantCourses.join("\n")
        : edu.description || "",
    })),

    // Social Links
    socialLinks: (mongoData.socialLinks || []).map((link) => ({
      id: link._id || generateId("social"),
      platform: link.platform || "",
      url: link.url || "",
    })),

    // Projects
    projects: (mongoData.projects || []).map((project) => ({
      id: project._id || generateId("proj"),
      title: project.title || "",
      technologies: project.technologies || [],
      role: project.role || "",
      contributions: project.description || project.contributions || "",
      links: project.url
        ? [{ platform: "GitHub", url: project.url }]
        : project.links || [],
    })),

    // Languages
    languages: (mongoData.languages || []).map((lang) => ({
      id: lang._id || generateId("lang"),
      name: lang.name || "",
      proficiency: lang.proficiency || "",
      isCustom: lang.isCustom || false,
    })),

    // Skills
    selectedSkills: (mongoData.selectedSkills || []).map((skill) => ({
      id: generateId("skill"),
      name: typeof skill === "string" ? skill : skill.name || "",
    })),

    customSkills: [],

    // Certificates
    certificate: (mongoData.certificate || []).map((cert) => ({
      id: cert._id || generateId("cert"),
      name: cert.name || "",
      issuingOrganization: cert.issuingOrganization || "",
      issueDate: formatDate(cert.issueDate),
      expirationDate: cert.isNeverExpires
        ? { month: "", year: "" }
        : formatDate(cert.expirationDate),
      credentialId: cert.credentialId || "",
      verificationUrl: cert.verificationUrl || "",
      description: cert.description || "",
      isNeverExpires: cert.isNeverExpires || false,
    })),

    // Awards
    awards: (mongoData.awards || []).map((award) => ({
      id: award._id || generateId("award"),
      name: award.name || "",
      issuer: award.issuer || "",
      date: formatDate(award.date),
      description: award.description || "",
    })),

    // Open Source Contributions
    openSourceContributions: (mongoData.openSourceContributions || []).map(
      (contrib) => ({
        id: contrib._id || generateId("open-source"),
        projectName: contrib.projectName || "",
        role: contrib.role || "",
        technologies: contrib.technologies || [],
        description: contrib.description || "",
        contributions: contrib.contributions || "",
        links: contrib.url
          ? [{ platform: "GitHub", url: contrib.url }]
          : contrib.links || [],
        startDate: formatDate(contrib.startDate),
        endDate: contrib.isOngoing
          ? { month: "", year: "" }
          : formatDate(contrib.endDate),
        isOngoing: contrib.isOngoing || false,
      })
    ),

    // Custom Sections
    customSections: (mongoData.customSections || []).map((section) => ({
      id: section._id || generateId("custom"),
      title: section.title || "",
      subtitle: section.subtitle || "",
      description: Array.isArray(section.content)
        ? section.content.join("\n")
        : section.description || "",
      startDate: formatDate(section.startDate),
      endDate: section.isPresent
        ? { month: "", year: "" }
        : formatDate(section.endDate),
      isPresent: section.isPresent || false,
    })),

    // Additional ResumeState properties
    isLoading: false,
    error: null,
  };
};

export default mapMongoDataToReduxFormat;
