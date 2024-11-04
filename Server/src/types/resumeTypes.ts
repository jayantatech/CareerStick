import mongoose, { Document } from "mongoose";
interface ISocialLinks {
  platform: String;
  url: String;
  username: String;
}

export enum LanguageProficiency {
  Native = "Native",
  Fluent = "Fluent",
  Conversational = "Conversational",
  Beginner = "Beginner",
}

export interface ILanguage {
  language: string;
  proficiency?: LanguageProficiency;
  certifications?: string[];
}
export interface ITargetedJobAndIndustry {
  industry: string;
  targetJob: string;
  experience: string;
}

export interface IPersonalInfo {
  name: string;
  phoneNumber: string;
  email: string;
  location?: {
    city: string;
    state?: string;
    country: string;
  };
  summary: string;
  image?: string;
  visaStatus: string;
}

export interface IWorkExperienceProject {
  name: string;
  description: string;
  role: string;
  technologies: string[];
  achievements: string[];
}

export interface IWorkExperience {
  jobTitle: string;
  company: string;
  jobType: string;
  location: {
    city: string;
    state: string;
    country: string;
    workplaceType: string;
  };
  startDate: {
    month: string;
    year: string;
  };
  endDate?: {
    month: string;
    year: string;
  };
  isCurrentJob: boolean;
  responsibilities?: string[];
  achievements?: string[];
  technologies?: string[];
  projects?: IWorkExperienceProject[];
}

export interface IEducation {
  degree: string;
  institution: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  startDate: {
    month: string;
    year: string;
  };
  endDate?: {
    month: string;
    year: string;
  };
  isCurrentlyStudying: boolean;
  gpa?: number;
  relevantCourses?: string[];
  projects?: string[];
  honors?: string[];
  activities?: string[];
}

export interface ICertification {
  name: string;
  issuingOrganization: string;
  issueDate: {
    month: string;
    year: string;
  };
  expirationDate?: {
    month: string;
    year: string;
  };
  isNeverExpires: boolean;
  verificationUrl: string;
  description: string;
  credentialId: string;
  skills: string[];
}

export interface IProject {
  title: string;
  contributions: string;
  role?: string;
  startDate?: Date;
  endDate?: Date | string;
  technologies?: string[];
  achievements?: string[];
  links?: { platform: string; url: string }[];
  mediaLinks?: string[];
}

export interface ISkill {
  name: string;
  proficiency: string;
  yearsOfExperience: number;
  lastUsed: Date;
}
// interface ISkill {
//   category: string;
// skills: {
//   name: string;
//   proficiency: string;
//   yearsOfExperience: number;
//   lastUsed: Date;
// }[];
// }

export interface IAchievement {
  title: string;
  description: string;
  date: Date;
  url?: string;
}

export interface IPublication {
  title: string;
  publishedIn: string;
  date: Date;
  url: string;
  description: string;
}

export interface IVolunteerExperience {
  organization: string;
  role: string;
  startDate: Date;
  endDate?: Date | string;
  description: string;
  skills: string[];
}

export interface IAward {
  name: string;
  issuingOrganization: string;
  date: {
    month: string;
    year: string;
  };
  description: string;
}

// interface IOpenSourceContribution {
//   projectName: string;
//   url: string;
//   description: string;
//   startDate: Date;
//   endDate?: Date | string;
// }

export interface IOpenSourceContribution {
  projectName: string;
  role: string;
  technologies: string[];
  description: string;
  contributions: string;
  links: {
    platform: string;
    url: string;
  }[];
  startDate: {
    month: string;
    year: string;
  };
  endDate: {
    month: string;
    year: string;
  };
  isOngoing: boolean;
}

export interface ICustomSection {
  title: string;
  subtitle: string;
  description: string;
  startDate: {
    month: string;
    year: string;
  };
  endDate?: {
    month: string;
    year: string;
  };
  isPresent: boolean;
}

export enum CreationMethodEnum {
  AI_ASSISTED = "AI-assisted",
  USER_CREATED = "User-created",
  ATS_PARSED = "ATS-parsed",
  MANUAL_ENTRY = "Manual-entry",
  IMPORTED = "Imported",
  TEMPLATE_BASED = "Template-based",
  THIRD_PARTY_TOOL = "Third-party-tool",
}

export enum TemplateNameEnum {
  Default = "Default",
  ProfessionalLook = "Professional Look",
  CreativeStyle = "Creative Style",
  ExecutiveFlair = "Executive Flair",
  ModernClean = "Modern Clean",
  TechFocus = "Tech Focus",
  ClassicStyle = "Classic Style",
  BoldDesign = "Bold Design",
  FreshStart = "Fresh Start",
  PolishedProfile = "Polished Profile",
  GraduateBoost = "Graduate Boost",
}

interface IResume extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  resumeTitle: string;
  targetJobTitle: string;
  resumeSettingsId: mongoose.Schema.Types.ObjectId;
  creationMethod: CreationMethodEnum;
  targetedJobAndIndustry: ITargetedJobAndIndustry;
  personalInfo: IPersonalInfo;
  socialLinks: ISocialLinks[];
  languages: ILanguage[];
  workExperience?: IWorkExperience[];
  education?: IEducation[];
  certifications?: ICertification[];
  projects?: IProject[];
  skills?: {
    technicalSkills: ISkill[];
    softSkills: string[];
  };
  achievements?: IAchievement[];
  publications?: IPublication[];
  volunteerExperience?: IVolunteerExperience[];
  awards?: IAward[];
  openSourceContributions?: IOpenSourceContribution[];
  customSections?: ICustomSection[];
  atsCompatibilityScore: number;
  keywords: string[];
  templateName: TemplateNameEnum;
  isPremiumTemplate: boolean;
  lastAtsAnalysisDate: Date;
  visibility: string;
  resumeFile?: {
    url: string;
    format: string;
    generatedDate: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export { IResume };
