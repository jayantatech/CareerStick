// import mongoose, { Schema } from "mongoose";
// import { IResumeSettings } from "../types/resumeSettingsTypes";

// const ResumeSettingsSchema = new Schema<IResumeSettings>({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   fontFamily: { type: String, required: true },
//   fontSize: { type: String, required: true },
//   colorScheme: {
//     primaryColor: { type: String, required: true },
//     secondaryColor: { type: String, required: false },
//     textColor: { type: String, required: true },
//   },
//   layout: { type: String, required: true },
//   activeSection: {
//     jobIndustry: { type: Boolean, required: true },
//     personalInfo: { type: Boolean, required: true },
//     professionalSummary: { type: Boolean, required: true },
//     workExperience: { type: Boolean, required: true },
//     education: { type: Boolean, required: true },
//     socialLinks: { type: Boolean, required: true },
//     projects: { type: Boolean, required: true },
//     languages: { type: Boolean, required: true },
//     selectedSkills: { type: Boolean, required: true },
//     certificate: { type: Boolean, required: true },
//     awards: { type: Boolean, required: true },
//     openSourceContributions: { type: Boolean, required: true },
//     customSections: { type: Boolean, required: true },
//   },
//   margin: { type: String, required: true },
//   lineHeight: { type: String, required: true },
//   sectionSpacing: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// const ResumeSettings = mongoose.model<IResumeSettings>(
//   "ResumeSettings",
//   ResumeSettingsSchema
// );

// export default ResumeSettings;

import mongoose, { Schema } from "mongoose";
import { IResumeSettings } from "../types/resumeSettingsTypes";

const ResumeSettingsSchema = new Schema<IResumeSettings>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fontSize: {
    body: {
      type: String,
      enum: ["small", "normal", "large", "extraLarge"],
      default: "large",
    },
    heading: {
      type: String,
      enum: ["small", "normal", "large", "extraLarge"],
      default: "normal",
    },
  },
  margins: {
    page: {
      type: String,
      enum: ["compact", "normal", "spacious"],
      default: "normal",
    },
    section: {
      type: String,
      enum: ["compact", "normal", "spacious"],
      default: "normal",
    },
  },
  fontFamily: {
    type: String,
    enum: ["Helvetica", "Times-Roman", "Courier"],
    default: "Helvetica",
  },
  colorScheme: {
    primary: { type: String, default: "#111827" },
    secondary: { type: String, default: "#3B82F6" },
    text: { type: String, default: "#4B5563" },
  },
  lineHeight: {
    type: String,
    enum: ["compact", "normal", "spacious"],
    default: "normal",
  },
  sectionSpacing: {
    type: String,
    enum: ["compact", "normal", "spacious"],
    default: "normal",
  },
  activeSections: {
    jobIndustry: { type: Boolean, default: true },
    personalInfo: { type: Boolean, required: true, default: true },
    professionalSummary: { type: Boolean, default: true },
    workExperience: { type: Boolean, default: true },
    education: { type: Boolean, default: true },
    socialLinks: { type: Boolean, default: true },
    projects: { type: Boolean, default: false },
    languages: { type: Boolean, default: true },
    selectedSkills: { type: Boolean, default: true },
    certificate: { type: Boolean, default: false },
    awards: { type: Boolean, default: false },
    openSourceContributions: { type: Boolean, default: false },
    customSections: { type: Boolean, default: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ResumeSettings = mongoose.model<IResumeSettings>(
  "ResumeSettings",
  ResumeSettingsSchema
);

export default ResumeSettings;
