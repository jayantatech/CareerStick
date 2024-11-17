// // types/resume.ts
// export export interface MonthYearDate {
//   month: string;
//   year: string;
// }

import { TemplateType } from "../store/slices/templateChangeSlice";

// export export interface JobExperience {
//   id: string;
//   jobTitle: string;
//   company: string;
//   startDate: MonthYearDate;
//   endDate: MonthYearDate;
//   isCurrentJob: boolean;
//   location: string;
//   description: string;
// }

// export export interface JobIndustryData {
//   industry: string;
//   targetJob: string;
//   experience: string;
// }

// export export interface PersonalInformation {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   city: string;
//   country: string;
//   address: string;
//   postalCode: string;
//   photo: string | null | File;
// }

// export export interface ProfessionalSummary {
//   summaryText: string;
// }

// export export interface ResumeState {
//   jobIndustry: JobIndustryData;
//   personalInfo: PersonalInformation;
//   professionalSummary: ProfessionalSummary;
//   workExperience: JobExperience[];
//   isLoading: boolean;
//   error: null | string;
// }

export interface DateInfo {
  month: string;
  year: string;
}

export type EducationValue = string | boolean | DateInfo;
export type AwardValue = string | { month: string; year: string };

export interface JobIndustryData {
  industry: string;
  targetJob: string;
  experience: string;
}

export interface PersonalInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  address: string;
  postalCode: string;
  photo: string | null;
}

export interface ProfessionalSummary {
  summaryText: string;
}

export interface Project {
  id: string;
  title: string;
  technologies: string[];
  role: string;
  contributions: string;
  links: { platform: string; url: string }[];
}

export interface JobExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: DateInfo;
  endDate: DateInfo;
  isCurrentJob: boolean;
  location: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  startDate: DateInfo;
  endDate: DateInfo;
  isCurrentlyStudying: boolean;
  location: string;
  description: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
  isCustom: boolean;
}
export interface Certificate {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: { month: string; year: string };
  expirationDate: { month: string; year: string };
  credentialId: string;
  verificationUrl: string;
  description: string;
  isNeverExpires: boolean;
}
export interface Award {
  id: string;
  name: string;
  issuer: string;
  date: { month: string; year: string };
  description: string;
}
export interface OpenSourceContribution {
  id: string;
  projectName: string;
  role: string;
  technologies: string[];
  description: string;
  contributions: string;
  links: { platform: string; url: string }[];
  startDate: DateInfo;
  endDate: DateInfo;
  isOngoing: boolean;
}
export interface CustomSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string };
  isPresent: boolean;
}

export interface ResumeState {
  _id?: string;
  resumeTitle?: string;
  jobIndustry: JobIndustryData;
  personalInfo: PersonalInformation;
  professionalSummary: ProfessionalSummary;
  workExperience: JobExperience[];
  education: Education[];
  socialLinks: SocialLink[];
  selectedSkills: Skill[];
  customSkills: Skill[];
  projects: Project[];
  languages: Language[];
  certificate: Certificate[];
  awards: Award[];
  openSourceContributions: OpenSourceContribution[];
  customSections: CustomSection[];
  templateName?: TemplateType;
  createdAt?: string;
  updatedAt?: string;
  isLoading: boolean;
  error: string | null;
}
