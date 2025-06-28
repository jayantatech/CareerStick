// // Types
// interface IEducation {
//   startDate: Date;
//   endDate?: Date;
//   degreeName: string;
//   school: string;
//   description?: string;
// }

// interface IExperience {
//   startDate: Date;
//   endDate?: Date;
//   company: string;
//   title: string;
//   description?: string;
//   location?: string;
// }

// interface ICertification {
//   startDate: Date;
//   name: string;
//   authority: string;
//   url?: string;
//   licenseNumber?: string;
// }

// interface ILanguage {
//   name: string;
//   proficiency: string;
// }

// interface ILinkedInProfile {
//   userId: string;
//   publicIdentifier: string;
//   firstName: string;
//   lastName: string;
//   fullName: string;
//   headline: string;
//   summary: string;
//   location: {
//     country: string;
//     city?: string;
//     state?: string;
//   };
//   occupation: string;
//   followerCount: number;
//   education: IEducation[];
//   experience: IExperience[];
//   certifications: ICertification[];
//   languages: ILanguage[];
//   connections: number;
// }

// MongoDB Schema

import mongoose, { Schema, Document } from "mongoose";
import { LinkedInProfileType } from "../types/linkedInProfileType";

const EducationSchema = new Schema({
  startDate: { month: { type: String }, year: { type: String } },
  endDate: { month: { type: String }, year: { type: String } },
  degreeName: { type: String, required: true },
  school: { type: String, required: true },
  description: String,
});

const ExperienceSchema = new Schema({
  startDate: { month: { type: String }, year: { type: String } },
  endDate: { month: { type: String }, year: { type: String } },
  company: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  location: String,
});

const CertificationSchema = new Schema({
  startDate: { month: { type: String }, year: { type: String } },
  name: { type: String, required: true },
  authority: { type: String, required: true },
  url: String,
  licenseNumber: String,
});

const LanguageSchema = new Schema({
  name: { type: String, required: true },
  proficiency: { type: String, required: true },
});

const LinkedInProfileSchema = new Schema<LinkedInProfileType>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  publicIdentifier: { type: String, required: true },
  profilePicture: { type: String, required: true },
  linkedInProfileUrl: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: { type: String, required: true },
  headline: { type: String, required: true },
  isAIGenerated: { type: Boolean, required: true, default: false },
  summary: { type: String, required: true },
  targetedJobAndIndustry: {
    industry: { type: String, required: true },
    targetJob: { type: String, required: true },
    experience: { type: String, required: true },
  },
  location: {
    country: { type: String, required: true },
    city: String,
    state: String,
  },
  occupation: { type: String, required: true },
  followerCount: { type: Number, required: true },
  education: [EducationSchema],
  experience: [ExperienceSchema],
  certifications: [CertificationSchema],
  projects: [
    {
      title: { type: String, required: false },
      contributions: { type: String, required: false },
      role: { type: String },
      startDate: { month: { type: String }, year: { type: String } },
      endDate: { month: { type: String }, year: { type: String } },
      technologies: [{ type: String }],
      achievements: [{ type: String }],
      links: [{ platform: { type: String }, url: { type: String } }],
      mediaLinks: [{ type: String }],
    },
  ],
  skills: [{ type: String }],
  languages: [LanguageSchema],
  connections: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Best practice combining both approaches
export const LinkedInProfile =
  mongoose.models.LinkedInProfile ||
  mongoose.model<LinkedInProfileType>("LinkedInProfile", LinkedInProfileSchema);

export default LinkedInProfile;
