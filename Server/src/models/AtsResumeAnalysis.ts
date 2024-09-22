import mongoose, { Schema, Document, Types } from "mongoose";

// Define the interface for the ATS resume analysis
interface IATSResumeAnalysis extends Document {
  userId: Types.ObjectId;
  resumeId: Types.ObjectId;
  uploadDate: Date;
  atsScore: {
    overallScore: number;
    sections: {
      relevance: number;
      formatting: number;
      keywords: number;
      readability: number;
      experience: number;
      education: number;
      skills: number;
      achievements: number;
    };
  };
  keywordAnalysis: {
    matchedKeywords: {
      keyword: string;
      count: number;
      context: string;
    }[];
    missingKeywords: string[];
    keywordDensity: number;
  };
  formatAnalysis?: {
    fontConsistency: boolean;
    bulletPointUsage: string;
    sectionOrganization: string;
    whiteSpaceUsage: string;
    fileFormat: string;
    atsCompatibility: string;
  };
  contentAnalysis?: {
    jobTitleMatch: number;
    skillsMatch: number;
    experienceRelevance: number;
    educationMatch: number;
    accomplishmentsFocus: number;
    quantifiableResults: number;
  };
  improvementSuggestions?: {
    category: string;
    suggestion: string;
    priority: string;
    impact: number;
  }[];
  userFeedback: {
    feedbackProvided: boolean;
    satisfactionScore: number;
    comments: string;
    areasForImprovement: string[];
  };
  analysisDate: Date;
  lastUpdated: Date;
}

// Define the schema for ATS resume analysis
const ATSResumeAnalysisSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Resume",
    },
    uploadDate: { type: Date, required: true },
    atsScore: {
      overallScore: { type: Number, required: true },
      sections: {
        relevance: { type: Number, required: true },
        formatting: { type: Number, required: true },
        keywords: { type: Number, required: true },
        readability: { type: Number, required: true },
        experience: { type: Number, required: true },
        education: { type: Number, required: true },
        skills: { type: Number, required: true },
        achievements: { type: Number, required: true },
      },
    },
    keywordAnalysis: {
      matchedKeywords: [
        {
          keyword: { type: String, required: true },
          count: { type: Number, required: true },
          context: { type: String, required: true },
        },
      ],
      missingKeywords: { type: [String], required: true },
      keywordDensity: { type: Number, required: true },
    },
    formatAnalysis: {
      fontConsistency: { type: Boolean, required: true },
      bulletPointUsage: { type: String, required: true },
      sectionOrganization: { type: String, required: true },
      whiteSpaceUsage: { type: String, required: true },
      fileFormat: { type: String, required: true },
      atsCompatibility: { type: String, required: true },
    },
    contentAnalysis: {
      jobTitleMatch: { type: Number, required: true },
      skillsMatch: { type: Number, required: true },
      experienceRelevance: { type: Number, required: true },
      educationMatch: { type: Number, required: true },
      accomplishmentsFocus: { type: Number, required: true },
      quantifiableResults: { type: Number, required: true },
    },
    improvementSuggestions: [
      {
        category: { type: String, required: true },
        suggestion: { type: String, required: true },
        priority: { type: String, required: true },
        impact: { type: Number, required: true },
      },
    ],
    userFeedback: {
      feedbackProvided: { type: Boolean, default: false, required: true },
      satisfactionScore: { type: Number, required: true },
      comments: { type: String, required: true },
      areasForImprovement: { type: [String], required: true },
    },
    analysisDate: { type: Date, required: true },
    lastUpdated: { type: Date, required: true },
  },
  { timestamps: true }
);

// Export the model
const ATSResumeAnalysis = mongoose.model<IATSResumeAnalysis>(
  "ATSResumeAnalysis",
  ATSResumeAnalysisSchema
);
export default ATSResumeAnalysis;
