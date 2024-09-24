import mongoose, { Document, Schema } from "mongoose";

// TypeScript interface
interface IUserSubmittedResume extends Document {
  userId: mongoose.Types.ObjectId;
  submittedAt: Date;
  resumeTitle: string;
  targetJob?: {
    title: string;
    description: string;
    company: string;
    industry: string;
    requiredSkills: string[];
  };
  instruction: string;
  resumeData: {
    personalInfo: {
      name: string;
      email: string;
      phoneNumber: string;
      location: {
        city: string;
        state: string;
        country: string;
      };
      socialLinks: {
        linkedIn?: { url: string; username: string };
        github?: { url: string; username: string };
        twitter?: { url: string; username: string };
        facebook?: { url: string; username: string };
        instagram?: { url: string; username: string };
        personalWebsite?: string;
        blog?: { url: string; username: string };
        medium?: { url: string; username: string };
        stackoverflow?: { url: string; username: string };
        dribbble?: { url: string; username: string };
        behance?: { url: string; username: string };
      };
    };
    professionalSummary?: string;
    workExperience: Array<{
      jobTitle: string;
      company: string;
      department: string;
      startDate: Date;
      endDate: Date | string;
      location: {
        city?: string;
        state?: string;
        country?: string;
        remote: boolean;
      };
      responsibilities: string[];
      achievements: string[];
      technologies: string[];
      projectsCompleted: string[];
    }>;
    education: Array<{
      degree: string;
      institution: string;
      location?: {
        city: string;
        state: string;
        country: string;
      };
      startDate?: Date;
      endDate: Date;
      gpa?: number;
      honors?: string[];
      relevantCoursework?: string[];
    }>;
    skills?: Array<{
      name: string;
      proficiency: string;
      yearsOfExperience: number;
      lastUsed: Date;
    }>;
    certifications?: Array<{
      name: string;
      issuingOrganization: string;
      issueDate: Date;
      expirationDate: Date;
      credentialId: string;
      url: string;
    }>;
    projects?: Array<{
      title: string;
      description: string;
      role?: string;
      technologies?: string[];
      url?: string;
      startDate?: Date;
      endDate?: Date | string;
      outcomes?: string[];
      teamSize?: number;
    }>;
    achievements?: Array<{
      title: string;
      description: string;
      date: Date;
      context: string;
      impact: string;
    }>;
    volunteerExperience?: Array<{
      organization: string;
      role: string;
      startDate: Date;
      endDate: Date | string;
      description: string;
      impact: string;
      skills: string[];
    }>;
    languages?: Array<{
      language: string;
      proficiency: string;
      certifications: string[];
      lastUsed: Date;
    }>;
    publications?: Array<{
      title: string;
      authors: string[];
      publicationDate: Date;
      publisher: string;
      url: string;
      description: string;
    }>;
    awards?: Array<{
      name: string;
      issuer: string;
      date: Date;
      description: string;
    }>;
    customSections?: Array<{
      title: string;
      content: string[];
    }>;
  };
  status: string;
  resumeFile?: {
    url: string;
    format: string;
    generatedDate: Date;
  };
}

// Mongoose schema
const UserSubmittedResumeSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  submittedAt: { type: Date, default: Date.now },
  resumeTitle: { type: String, required: true },
  targetJob: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: false },
    industry: { type: String, required: false },
    requiredSkills: [String],
  },
  instruction: { type: String, required: false },
  resumeData: {
    personalInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      location: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
      },
      socialLinks: {
        linkedIn: { url: String, username: String },
        github: { url: String, username: String },
        twitter: { url: String, username: String },
        facebook: { url: String, username: String },
        instagram: { url: String, username: String },
        personalWebsite: { url: String, username: String },
        blog: { url: String, username: String },
        medium: { url: String, username: String },
        stackoverflow: { url: String, userId: String },
        dribbble: { url: String, username: String },
        behance: { url: String, username: String },
      },
    },
    professionalSummary: { type: String },
    workExperience: [
      {
        jobTitle: { type: String, required: true },
        company: { type: String, required: true },
        department: String,
        startDate: { type: Date, required: true },
        endDate: { type: Schema.Types.Mixed, required: true }, // Date or 'Present'
        location: {
          city: String,
          state: String,
          country: String,
          remote: Boolean,
        },
        responsibilities: [String],
        achievements: [String],
        technologies: [String],
        projectsCompleted: [String],
      },
    ],
    education: [
      {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        location: {
          city: String,
          state: String,
          country: String,
        },
        startDate: Date,
        endDate: Date,
        gpa: Number,
        honors: [String],
        relevantCoursework: [String],
      },
    ],
    skills: [
      {
        name: { type: String, required: true },
        proficiency: String,
        yearsOfExperience: Number,
        lastUsed: Date,
      },
    ],
    certifications: [
      {
        name: { type: String, required: true },
        issuingOrganization: String,
        issueDate: Date,
        expirationDate: Date,
        credentialId: String,
        url: String,
      },
    ],
    projects: [
      {
        title: { type: String, required: true },
        description: String,
        role: String,
        technologies: [String],
        url: String,
        startDate: Date,
        endDate: Schema.Types.Mixed, // Date or 'Present'
        outcomes: [String],
        teamSize: Number,
      },
    ],
    achievements: [
      {
        title: { type: String, required: true },
        description: String,
        date: Date,
        context: String,
        impact: String,
      },
    ],
    volunteerExperience: [
      {
        organization: { type: String, required: true },
        role: { type: String },
        startDate: Date,
        endDate: Schema.Types.Mixed, // Date or 'Present'
        description: String,
        impact: String,
        skills: [String],
      },
    ],
    languages: [
      {
        language: { type: String, required: true },
        proficiency: String,
        certifications: [String],
        lastUsed: Date,
      },
    ],
    publications: [
      {
        title: { type: String, required: true },
        authors: [String],
        publicationDate: Date,
        publisher: String,
        url: String,
        description: String,
      },
    ],
    awards: [
      {
        name: { type: String, required: true },
        issuer: String,
        date: Date,
        description: String,
      },
    ],
    customSections: [
      {
        title: { type: String, required: true },
        content: [String],
      },
    ],
  },
  status: { type: String, required: true },
  resumeFile: {
    url: String,
    format: String,
    generatedDate: Date,
  },
});

// Create and export the Mongoose model
const UserSubmittedResume = mongoose.model<IUserSubmittedResume>(
  "UserSubmittedResume",
  UserSubmittedResumeSchema
);

export { UserSubmittedResume, IUserSubmittedResume };
