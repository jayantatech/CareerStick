import mongoose, { Document } from "mongoose";

export interface IResumeSettings extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId; // Reference to the user's _id (foreign key)
  fontFamily: string; // Font selected by the user
  fontSize: string; // Font size (e.g., small, medium, large)
  colorScheme: {
    primaryColor: string; // Primary color (hex code or color name)
    secondaryColor: string; // Secondary color (optional)
    textColor: string; // Text color for the resume
  };
  activeSection: {
    jobIndustry: boolean;
    personalInfo: boolean;
    professionalSummary: boolean;
    workExperience: boolean;
    education: boolean;
    socialLinks: boolean;
    projects: boolean;
    languages: boolean;
    selectedSkills: boolean;
    certificate: boolean;
    awards: boolean;
    openSourceContributions: boolean;
    customSections: boolean;
  };
  layout: string; // Layout style (e.g., modern, classic, minimalist)
  margin: string; // Margin size (e.g., narrow, wide)
  lineHeight: string; // Line height for text (e.g., normal, large)
  sectionSpacing: string; // Spacing between sections (e.g., compact, relaxed)
  createdAt: Date; // Date settings were created
  updatedAt: Date; // Date settings were last updated
}
