import mongoose, { Schema } from "mongoose";
import { IResumeSettings } from "../types/resumeSettingsTypes";

const ResumeSettingsSchema = new Schema<IResumeSettings>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fontFamily: { type: String, required: true },
  fontSize: { type: String, required: true },
  colorScheme: {
    primaryColor: { type: String, required: true },
    secondaryColor: { type: String, required: false },
    textColor: { type: String, required: true },
  },
  layout: { type: String, required: true },
  activeSection: {
    jobIndustry: { type: Boolean, required: true },
    personalInfo: { type: Boolean, required: true },
    professionalSummary: { type: Boolean, required: true },
    workExperience: { type: Boolean, required: true },
    education: { type: Boolean, required: true },
    socialLinks: { type: Boolean, required: true },
    projects: { type: Boolean, required: true },
    languages: { type: Boolean, required: true },
    selectedSkills: { type: Boolean, required: true },
    certificate: { type: Boolean, required: true },
    awards: { type: Boolean, required: true },
    openSourceContributions: { type: Boolean, required: true },
    customSections: { type: Boolean, required: true },
  },
  margin: { type: String, required: true },
  lineHeight: { type: String, required: true },
  sectionSpacing: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ResumeSettings = mongoose.model<IResumeSettings>(
  "ResumeSettings",
  ResumeSettingsSchema
);

export default ResumeSettings;
