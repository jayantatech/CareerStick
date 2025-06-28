import mongoose from "mongoose";

// Types
interface IEducation {
  startDate: Date;
  endDate?: Date;
  degreeName: string;
  school: string;
  description?: string;
}

interface IExperience {
  startDate: Date;
  endDate?: Date;
  company: string;
  title: string;
  description?: string;
  location?: string;
}

interface ICertification {
  startDate: Date;
  name: string;
  authority: string;
  url?: string;
  licenseNumber?: string;
}

interface IProject {
  title: string;
  contributions: string;
  role: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string };
  technologies: string[];
  achievements: string[];
  links: { platform: string; url: string }[];
  mediaLinks: string[];
}

interface ILanguage {
  name: string;
  proficiency: string;
}

interface ILinkedInProfile {
  userId?: mongoose.Schema.Types.ObjectId;
  publicIdentifier: string;
  profilePicture: string;
  targetedJobAndIndustry: {
    industry: string;
    targetJob: string;
    experience: string;
  };
  linkedInProfileUrl: string;
  firstName: string;
  lastName: string;
  fullName: string;
  headline: string;
  summary: string;
  isAIGenerated: boolean;
  location: {
    country: string;
    city?: string;
    state?: string;
  };
  occupation: string;
  followerCount: number;
  education: IEducation[];
  experience: IExperience[];
  projects: IProject[];
  certifications: ICertification[];
  languages: {
    name: string;
    proficiency: string;
  }[];
  skills: string[];
  connections: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type LinkedInProfileType = ILinkedInProfile;

interface ILinkedInApiResponseProfileType {
  data: any;
  public_identifier: string;
  profile_pic_url: string;
  background_cover_image_url: string;
  first_name: string;
  last_name: string;
  full_name: string;
  follower_count: number;
  occupation: string;
  headline: string;
  summary: string;
  country: string;
  country_full_name: string;
  connections: number;
  city: string;
  state: string;
  experiences: {
    starts_at: {
      day: number;
      month: number;
      year: number;
    };
    ends_at: {
      day: number;
      month: number;
      year: number;
    } | null;
    company: string;
    company_linkedin_profile_url: string | null;
    company_facebook_profile_url: string | null;
    title: string;
    description: string;
    location: string | null;
    logo_url: string | null;
  }[];
  education: {
    starts_at: {
      day: number;
      month: number;
      year: number;
    };
    ends_at: {
      day: number;
      month: number;
      year: number;
    } | null;
    field_of_study: string | null;
    degree_name: string;
    school: string;
    school_linkedin_profile_url: string | null;
    school_facebook_profile_url: string | null;
    description: string | null;
    logo_url: string | null;
    grade: string | null;
    activities_and_societies: string | null;
  }[];
  languages: string[];
  languages_and_proficiencies: {
    name: string;
    proficiency: string;
  }[];
  accomplishment_organisations: string[];
  accomplishment_publications: string[];
  accomplishment_honors_awards: string[];
  accomplishment_patents: string[];
  accomplishment_courses: string[];
  accomplishment_projects: string[];
  accomplishment_test_scores: string[];
  volunteer_work: string[];
  certifications: {
    name: string;
    authority: string;
    license_number: string | null;
    url: string | null;
    starts_at: {
      day: number;
      month: number;
      year: number;
    };
    ends_at: {
      day: number;
      month: number;
      year: number;
    } | null;
  }[];
}

export type LinkedInApiResponseProfileType = ILinkedInApiResponseProfileType;

// Rapid API Response
export interface LinkedInRapidApiResponse {
  data: {
    success: boolean;
    data: LinkedInRapidApiProfile;
  };
}

export interface LinkedInRapidApiProfile {
  id: number;
  urn: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  backgroundImage: BackgroundImage[];
  summary: string;
  headline: string;
  geo: GeoLocation;
  languages: Language[];
  educations: Education[];
  position: Position[];
  fullPositions: Position[];
  skills: Skill[];
  certifications: Certification[];
  projects: Projects;
  supportedLocales: SupportedLocale[];
  multiLocaleFirstName: MultiLocale;
  multiLocaleLastName: MultiLocale;
  multiLocaleHeadline: MultiLocale;
}

interface BackgroundImage {
  width: number;
  height: number;
  url: string;
}

interface GeoLocation {
  country: string;
  city: string;
  full: string;
  countryCode: string;
}

interface Language {
  name: string;
  proficiency: string;
}

interface Education {
  start: DateInfo;
  end: DateInfo;
  fieldOfStudy: string;
  degree: string;
  grade: string;
  schoolName: string;
  description: string;
  activities: string;
  url: string;
  schoolId: string;
}

interface Position {
  companyId: number;
  companyName: string;
  companyUsername: string;
  companyURL: string;
  companyLogo: string;
  companyIndustry: string;
  companyStaffCountRange: string;
  title: string;
  multiLocaleTitle: MultiLocale;
  multiLocaleCompanyName: MultiLocale;
  location: string;
  description: string;
  employmentType: string;
  start: DateInfo;
  end: DateInfo;
}

interface Skill {
  name: string;
  passedSkillAssessment: boolean;
}

interface Certification {
  name: string;
  start: DateInfo;
  end: DateInfo;
  authority: string;
  company: Company;
  timePeriod: TimePeriod;
}

interface Company {
  name: string;
  universalName: string;
  logo: string;
  staffCountRange: Record<string, never>;
  headquarter: Record<string, never>;
}

interface Projects {
  total: number;
  items: ProjectItem[];
}

interface ProjectItem {
  title: string;
  description: string;
  start: DateInfo;
  end: DateInfo;
  contributors?: Contributor[];
}

interface Contributor {
  urn: string;
  username: string;
  fullName: string;
  firstName: string;
  lastName: string;
  profilePicture: BackgroundImage[];
  headline: string;
  url: string;
}

interface DateInfo {
  year: number;
  month: number;
  day: number;
}

interface TimePeriod {
  start: DateInfo;
  end: DateInfo;
}

interface SupportedLocale {
  country: string;
  language: string;
}

interface MultiLocale {
  [key: string]: string;
}

export type LinkedInRapidApiResponseProfileType =
  ILinkedInApiResponseProfileType;
export type LinkedInRapidApiProfileType = LinkedInRapidApiProfile;
