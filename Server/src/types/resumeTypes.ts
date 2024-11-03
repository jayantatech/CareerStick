import mongoose from "mongoose";

interface ISocialLinks {
  linkedIn?: {
    url: string;
    username: string;
  };
  github?: {
    url: string;
    username: string;
  };
  stackOverflow?: {
    url: string;
    username: string;
  };
  personalWebsite?: {
    url: string;
    username: string;
  };
  twitter?: {
    url: string;
    username: string;
  };
  medium?: {
    url: string;
    username: string;
  };
  devTo?: {
    url: string;
    username: string;
  };
}

enum LanguageProficiency {
  Native = "Native",
  Fluent = "Fluent",
  Conversational = "Conversational",
  Beginner = "Beginner",
}

interface ILanguage {
  language: string;
  proficiency?: LanguageProficiency;
  certifications?: string[];
}
interface ITargetedJobAndIndustry {
  industry: string;
  targetJob: string;
  experience: string;
}

interface IPersonalInfo {
  name: string;
  phoneNumber: string;
  email: string;
  location?: {
    city: string;
    state?: string;
    country: string;
  };
  socialLinks: ISocialLinks;
  languages: ILanguage[];
  summary: string;
  image?: string;
  visaStatus: string;
}

interface IWorkExperienceProject {
  name: string;
  description: string;
  role: string;
  technologies: string[];
  achievements: string[];
}

interface IWorkExperience {
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
  endDate: {
    month: string;
    year: string;
  };
  isCurrentJob?: boolean;
  responsibilities?: string[];
  achievements?: string[];
  technologies?: string[];
  projects?: IWorkExperienceProject[];
}

interface IEducation {
  degree: string;
  institution: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  startDate: Date;
  endDate?: Date | string;
  gpa?: number;
  relevantCourses?: string[];
  projects?: string[];
  honors?: string[];
  activities?: string[];
}

interface ICertification {
  name: string;
  issuingOrganization: string;
  issueDate: Date;
  expirationDate?: Date;
  credentialId: string;
  skills: string[];
}

interface IProject {
  title: string;
  description: string;
  role?: string;
  startDate?: Date;
  endDate?: Date | string;
  technologies?: string[];
  achievements?: string[];
  url?: string;
  mediaLinks?: string[];
}

interface ISkill {
  category: string;
  skills: {
    name: string;
    proficiency: string;
    yearsOfExperience: number;
    lastUsed: Date;
  }[];
}

interface IAchievement {
  title: string;
  description: string;
  date: Date;
  url?: string;
}

interface IPublication {
  title: string;
  publishedIn: string;
  date: Date;
  url: string;
  description: string;
}

interface IVolunteerExperience {
  organization: string;
  role: string;
  startDate: Date;
  endDate?: Date | string;
  description: string;
  skills: string[];
}

interface IAward {
  name: string;
  issuingOrganization: string;
  date: Date;
  description: string;
}

interface IOpenSourceContribution {
  projectName: string;
  url: string;
  description: string;
  startDate: Date;
  endDate?: Date | string;
}

interface ICustomSection {
  title: string;
  content: string[];
}

enum CreationMethodEnum {
  AI_ASSISTED = "AI-assisted",
  USER_CREATED = "User-created",
  ATS_PARSED = "ATS-parsed",
  MANUAL_ENTRY = "Manual-entry",
  IMPORTED = "Imported",
  TEMPLATE_BASED = "Template-based",
  THIRD_PARTY_TOOL = "Third-party-tool",
}

enum TemplateNameEnum {
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

interface IResume {
  userId: mongoose.Schema.Types.ObjectId;
  resumeTitle: string;
  targetJobTitle: string;
  resumeSettingsId: mongoose.Schema.Types.ObjectId;
  creationMethod: CreationMethodEnum;
  targetedJobAndIndustry: ITargetedJobAndIndustry;
  personalInfo: IPersonalInfo;
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
