import mongoose, { Schema, Document } from "mongoose";

interface IVersions extends Document {
  versionId: mongoose.Schema.Types.ObjectId;
  versionNumber: number;
  resumeContentId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  lastModified: Date;
  isFinalVersion: boolean;

  atsAnalysis: {
    overallScore: number;
    keywordMatchScore: number;
    missingKeywords: string[];
    improvementSuggestions: {
      section: string;
      suggestion: string;
    }[];

    feedback: {
      interviewInvitation: boolean;
      offerReceived: boolean;
      userNotes: string;
    };
  };
}

interface IPersonalizedResumes extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  jobInfo: {
    jobTitle: string;
    company: string;
    jobDescription: string;
    jobPostingUrl: string;
    applicationDeadline: Date;
  };

  versions: IVersions[];
  statistics?: {
    totalApplications: number;
    interviews: number;
    offers: number;
  };
  createdAt: Date;
  lastUpdated: Date;
}

const PersonalizedResumesSchema = new Schema<IPersonalizedResumes>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  jobInfo: {
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobPostingUrl: { type: String, required: true },
    applicationDeadline: { type: Date, required: true },
  },
  versions: [
    {
      versionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      versionNumber: { type: Number, required: true },
      resumeContentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
        required: true,
      },
      isFinalVersion: { type: Boolean, default: false },
      atsAnalysis: {
        overallScore: { type: Number, required: true }, // 0 - 100
        keywordMatchScore: { type: Number, required: true }, // 0 - 100
        missingKeywords: { type: [String], required: true },
        improvementSuggestions: {
          section: { type: String, required: true },
          suggestion: { type: String, required: true },
        },
        feedback: {
          interviewInvitation: { type: Boolean, required: true },
          offerReceived: { type: Boolean, required: true },
          userNotes: { type: String, required: true },
        },
      },
      createdAt: { type: Date, default: Date.now },
      lastModified: { type: Date, default: Date.now },
    },
  ],
  statistics: {
    totalApplications: { type: Number, default: 0 },
    interviews: { type: Number, default: 0 },
    offers: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});
