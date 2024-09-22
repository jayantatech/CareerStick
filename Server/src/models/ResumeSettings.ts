import mongoose, { Schema, Document } from "mongoose";

interface IResumeSettings extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId; // Reference to the user's _id (foreign key)
  fontFamily: string; // Font selected by the user
  fontSize: string; // Font size (e.g., small, medium, large)
  colorScheme: {
    primaryColor: string; // Primary color (hex code or color name)
    secondaryColor: string; // Secondary color (optional)
    textColor: string; // Text color for the resume
  };
  layout: string; // Layout style (e.g., modern, classic, minimalist)
  margin: string; // Margin size (e.g., narrow, wide)
  lineHeight: string; // Line height for text (e.g., normal, large)
  sectionSpacing: string; // Spacing between sections (e.g., compact, relaxed)
  createdAt: Date; // Date settings were created
  updatedAt: Date; // Date settings were last updated
}

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
