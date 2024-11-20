import { Document } from "mongoose";

// export interface IResumeGenerationRequest {
//   resumeTitle: string;
//   jobIndustry: {
//     industry: string;
//     targetJob: string;
//     experience: string;
//   };
//   personalInfo: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     city: string;
//     country: string;
//     address?: string;
//     postalCode?: string;
//     photo?: string | null;
//   };
//   professionalSummary: {
//     summaryText: string;
//   };
//   workExperience: Array<{
//     id: string;
//     jobTitle: string;
//     company: string;
//     startDate: { month: string; year: string };
//     endDate: { month: string; year: string };
//     isCurrentJob: boolean;
//     location: string;
//     description: string;
//   }>;
//   education: Array<{
//     id: string;
//     degree: string;
//     school: string;
//     startDate: { month: string; year: string };
//     endDate: { month: string; year: string };
//     isCurrentlyStudying: boolean;
//     location: string;
//     description: string;
//   }>;
//   socialLinks: Array<{
//     id: string;
//     platform: string;
//     url: string;
//   }>;
//   projects: Array<{
//     id: string;
//     title: string;
//     technologies: string[];
//     role: string;
//     contributions: string;
//     links: string[];
//   }>;
//   languages: Array<{
//     id: string;
//     name: string;
//     proficiency: string;
//     isCustom: boolean;
//   }>;
//   selectedSkills: string[];
//   customSkills: string[];
//   certificate: Array<{
//     id: string;
//     name: string;
//     issuingOrganization: string;
//     issueDate: { month: string; year: string };
//     expirationDate: { month: string; year: string };
//     credentialId: string;
//     verificationUrl: string;
//     description: string;
//     isNeverExpires: boolean;
//   }>;
//   awards: Array<{
//     id: string;
//     name: string;
//     issuer: string;
//     date: { month: string; year: string };
//     description: string;
//   }>;
//   openSourceContributions: Array<{
//     id: string;
//     projectName: string;
//     role: string;
//     technologies: string[];
//     description: string;
//     contributions: string;
//     links: string[];
//     startDate: { month: string; year: string };
//     endDate: { month: string; year: string };
//     isOngoing: boolean;
//   }>;
//   customSections: Array<{
//     id: string;
//     title: string;
//     subtitle: string;
//     description: string;
//     startDate: { month: string; year: string };
//     endDate: { month: string; year: string };
//     isPresent: boolean;
//   }>;
// }

export interface IResumeGenerationRequest {
  resumeTitle?: string;
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
    photo?: string | null;
  };
  professionalSummary?: {
    summaryText?: string;
  };
  workExperience?: Array<{
    id?: string;
    jobTitle?: string;
    company?: string;
    startDate?: { month?: string; year?: string };
    endDate?: { month?: string; year?: string };
    isCurrentJob?: boolean;
    location?: string;
    description?: string;
  }>;
  education?: Array<{
    id?: string;
    degree?: string;
    school?: string;
    startDate?: { month?: string; year?: string };
    endDate?: { month?: string; year?: string };
    isCurrentlyStudying?: boolean;
    location?: string;
    description?: string;
  }>;
  socialLinks?: Array<{
    id?: string;
    platform?: string;
    url?: string;
  }>;
  projects?: Array<{
    id?: string;
    title?: string;
    technologies?: string[];
    role?: string;
    contributions?: string;
    links?: string[];
  }>;
  languages?: Array<{
    id?: string;
    name?: string;
    proficiency?: string;
    isCustom?: boolean;
  }>;
  selectedSkills?: string[];
  customSkills?: string[];
  certificate?: Array<{
    id?: string;
    name?: string;
    issuingOrganization?: string;
    issueDate?: { month?: string; year?: string };
    expirationDate?: { month?: string; year?: string };
    credentialId?: string;
    verificationUrl?: string;
    description?: string;
    isNeverExpires?: boolean;
  }>;
  awards?: Array<{
    id?: string;
    name?: string;
    issuer?: string;
    date?: { month?: string; year?: string };
    description?: string;
  }>;
  openSourceContributions?: Array<{
    id?: string;
    projectName?: string;
    role?: string;
    technologies?: string[];
    description?: string;
    contributions?: string;
    links?: string[];
    startDate?: { month?: string; year?: string };
    endDate?: { month?: string; year?: string };
    isOngoing?: boolean;
  }>;
  customSections?: Array<{
    id?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    startDate?: { month?: string; year?: string };
    endDate?: { month?: string; year?: string };
    isPresent?: boolean;
  }>;
}

export interface IResumeGenerationResponse extends Document {
  userId: string;
  resumeTitle: string;
  targetJobTitle: string;
  personalInfo: IResumeGenerationRequest["personalInfo"];
  workExperience: IResumeGenerationRequest["workExperience"];
  education: IResumeGenerationRequest["education"];
  skills: {
    technicalSkills: Array<{
      name: string;
      proficiency: string;
      yearsOfExperience?: number;
      lastUsed?: Date;
    }>;
    softSkills: string[];
  };
  languages: IResumeGenerationRequest["languages"];
  projects: IResumeGenerationRequest["projects"];
  certifications: IResumeGenerationRequest["certificate"];
  awards: IResumeGenerationRequest["awards"];
  openSourceContributions: IResumeGenerationRequest["openSourceContributions"];
  customSections: IResumeGenerationRequest["customSections"];
  createdAt: Date;
  updatedAt: Date;
}
