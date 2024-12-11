import mongoose, { Document, Schema, Model } from "mongoose";

// Interface for attached file
interface IAttachedFile {
  url: string;
  name: string;
}

// Interface for Feedback Document
interface IFeedback extends Document {
  // User identification fields
  userId: mongoose.Types.ObjectId;
  userEmail?: string;
  username?: string;

  // Feedback specific fields from the original data
  appRating: number;
  easeOfUse: string[];
  keyFeatures: string[];
  improvementFeature: string[];
  userGoals: string[];
  recommendationLikelihood: string[];
  additionalComments?: string;

  // Error reporting fields
  errorReported: boolean;
  errorDescription?: string;
  attachedFiles?: IAttachedFile[];

  // Additional metadata
  isResolved: boolean;
  resolvedBy?: mongoose.Types.ObjectId;
  resolvedAt?: Date;
  resolvedNotes?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const FeedbackSchema: Schema<IFeedback> = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    userEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    appRating: {
      type: Number,
      min: 1,
      max: 10,
    },
    easeOfUse: [
      {
        type: String,
      },
    ],
    keyFeatures: [
      {
        type: String,
      },
    ],
    improvementFeature: [
      {
        type: String,
      },
    ],
    userGoals: [
      {
        type: String,
      },
    ],
    recommendationLikelihood: [
      {
        type: String,
      },
    ],
    additionalComments: {
      type: String,
      trim: true,
    },
    errorReported: {
      type: Boolean,
      default: false,
    },
    errorDescription: {
      type: String,
      trim: true,
    },
    attachedFiles: [
      {
        url: {
          type: String,
        },
        name: {
          type: String,
        },
      },
    ],

    // Resolving fields
    isResolved: {
      type: Boolean,
      default: false,
    },
    resolvedAt: Date,
    resolvedNotes: String,

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create the model
// const Feedback: Model<IFeedback> = mongoose.model<IFeedback>(
//   "Feedback",
//   FeedbackSchema
// );

const Feedback =
  mongoose.models.Feedback ||
  mongoose.model<IFeedback>("Feedback", FeedbackSchema);

export { IFeedback, Feedback };
