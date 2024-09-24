import mongoose, { Schema, Document } from "mongoose";

// Define interfaces for the schema
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
  startDate: Date;
  endDate?: Date | string;
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

interface IResumeVersion {
  versionId: mongoose.Schema.Types.ObjectId;
  submittedResumeInfo: mongoose.Schema.Types.ObjectId;
  versionTitle: string;
  isPrime: boolean;
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
  volunteerExperience: IVolunteerExperience[];
  awards?: IAward[];
  openSourceContributions?: IOpenSourceContribution[];
  customSections?: ICustomSection[];
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
interface IResume extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  resumeTitle: string;
  targetJobTitle: string;
  resumeSettingsId: mongoose.Schema.Types.ObjectId;
  creationMethod: CreationMethodEnum;
  currentVersion: string;
  versions: IResumeVersion[];
  atsCompatibilityScore: number;
  keywords: string[];
  templateId: mongoose.Schema.Types.ObjectId;
  isPremiumTemplate: boolean;
  lastAtsAnalysisDate: Date;
  visibility: string;
  resumeFile: {
    url: string;
    format: string;
    generatedDate: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema
const ResumeSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  resumeTitle: { type: String, required: true },
  targetJobTitle: { type: String, required: true },
  resumeSettingsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ResumeSettings",
  },
  creationMethod: {
    type: String,
    enum: Object.values(CreationMethodEnum),
    required: true,
  },
  currentVersion: { type: String, required: true },
  versions: [
    {
      versionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      submittedResumeInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSubmittedResume",
        required: true,
      },
      versionTitle: { type: String, required: true },
      isPrime: { type: Boolean, required: true },
      personalInfo: {
        name: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true },
        image: { type: String },
        location: {
          city: { type: String, required: true },
          state: { type: String, required: false },
          country: { type: String, required: true },
        },
        socialLinks: {
          linkedIn: {
            url: { type: String, required: true },
            username: { type: String, required: true },
          },
          github: {
            url: { type: String, required: true },
            username: { type: String, required: true },
          },
          stackOverflow: {
            url: { type: String, required: true },
            username: { type: String, required: true },
          },
          personalWebsite: {
            url: { type: String, required: true },
            username: { type: String, required: true },
          },
          twitter: {
            url: { type: String, required: true },
            username: { type: String, required: true },
          },
          medium: {
            url: { type: String, required: true },
            username: { type: String, required: true },
          },
          devTo: {
            url: { type: String, required: true },
            username: { type: String, required: true },
          },
        },
        languages: [
          {
            language: { type: String, required: true },
            proficiency: { type: String, required: true },
            certifications: [{ type: String }],
          },
        ],
        summary: { type: String, required: true },
        visaStatus: { type: String, required: true },
      },
      workExperience: [
        {
          jobTitle: { type: String, required: true },
          company: { type: String, required: true },
          jobType: { type: String, required: true },
          location: {
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            workplaceType: { type: String, required: true },
          },
          startDate: { type: Date, required: true },
          endDate: { type: Date || String },
          responsibilities: [{ type: String }],
          achievements: [{ type: String }],
          technologies: [{ type: String }],
          projects: [
            {
              name: { type: String },
              description: { type: String },
              role: { type: String },
              technologies: [{ type: String }],
              achievements: [{ type: String }],
            },
          ],
        },
      ],
      education: [
        {
          degree: { type: String, required: true },
          institution: { type: String, required: true },
          location: {
            city: { type: String, required: true },
            state: { type: String, required: false },
            country: { type: String, required: false },
          },
          startDate: { type: Date, required: true },
          endDate: { type: Date || String, required: true },
          gpa: { type: Number },
          relevantCourses: [{ type: String }],
          projects: [{ type: String }],
          honors: [{ type: String }],
          activities: [{ type: String }],
        },
      ],
      certifications: [
        {
          name: { type: String, required: true },
          issuingOrganization: { type: String, required: true },
          issueDate: { type: Date, required: true },
          expirationDate: { type: Date },
          credentialId: { type: String, required: true },
          skills: [{ type: String, required: true }],
        },
      ],
      projects: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          role: { type: String, required: true },
          startDate: { type: Date, required: true },
          endDate: { type: Date },
          technologies: [{ type: String, required: true }],
          achievements: [{ type: String, required: true }],
          url: { type: String },
          mediaLinks: [{ type: String }],
        },
      ],
      skills: {
        technicalSkills: [
          {
            category: { type: String, required: true },
            skills: [
              {
                name: { type: String, required: true },
                proficiency: { type: String, required: false },
                yearsOfExperience: { type: Number, required: false },
                lastUsed: { type: Date, required: true },
              },
            ],
          },
        ],
        softSkills: [{ type: String }],
      },
      achievements: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          date: { type: Date, required: true },
          url: { type: String },
        },
      ],
      publications: [
        {
          title: { type: String, required: true },
          publishedIn: { type: String, required: true },
          date: { type: Date, required: true },
          url: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
      volunteerExperience: [
        {
          organization: { type: String, required: true },
          role: { type: String, required: true },
          startDate: { type: Date, required: true },
          endDate: { type: Date },
          description: { type: String, required: true },
          skills: [{ type: String, required: true }],
        },
      ],
      awards: [
        {
          name: { type: String, required: true },
          issuingOrganization: { type: String, required: true },
          date: { type: Date, required: true },
          description: { type: String, required: true },
        },
      ],
      openSourceContributions: [
        {
          projectName: { type: String, required: true },
          url: { type: String, required: true },
          description: { type: String, required: true },
          startDate: { type: Date, required: true },
          endDate: { type: Date },
        },
      ],
      customSections: [
        {
          title: { type: String, required: true },
          content: [{ type: String, required: true }],
        },
      ],
    },
  ],
  atsCompatibilityScore: { type: Number, required: true },
  keywords: [{ type: String, required: true }],
  templateId: { type: mongoose.Schema.Types.ObjectId, required: true },
  isPremiumTemplate: { type: Boolean, default: false, required: true },
  lastAtsAnalysisDate: { type: Date, required: true },
  visibility: { type: String, required: true },
  resumeFile: {
    url: { type: String, required: true },
    format: { type: String, required: true },
    generatedDate: { type: Date, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create and export the model
const Resume = mongoose.model<IResume>("Resume", ResumeSchema);
export default Resume;
