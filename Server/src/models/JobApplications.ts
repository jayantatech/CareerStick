import mongoose, { Schema, Document, Types } from "mongoose";

// Define the interface for the job application

interface IStatusHistory {
  status: string;
  dateMoved: Date;
  interviewDetails?: {
    interviewDate: Date;
    interviewLocation: string;
  };
  offerDetails?: {
    salary: string;
    benefits: string;
    responseDeadline: Date;
  };
  rejectionReason?: string;
}

interface IJobApplication extends Document {
  userId: Types.ObjectId;
  jobTitle: string;
  companyName: string;
  location: string;
  applicationDate: Date;
  jobType: string;
  salaryRange: string;
  submittedResume: Types.ObjectId | string;
  applicationMethod: string;
  jobPostingUrl: string;
  contactDetails: {
    recruiterName: string;
    email: string;
    phone: string;
  };
  interviewNotes?: string;
  statusHistory?: IStatusHistory[];
  currentStatus: string;
  additionalDocuments?: {
    documentType: string;
    documentUrl: string;
  }[];
  reminders?: {
    reminderType: string;
    reminderDate: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for job application
const JobApplicationSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    applicationDate: { type: Date, required: true },
    jobType: { type: String, required: true },
    salaryRange: { type: String, required: true },
    submittedResume: {
      type: mongoose.Schema.Types.ObjectId || String,
      required: true,
    },
    applicationMethod: { type: String, required: true },
    jobPostingUrl: { type: String, required: true },
    contactDetails: {
      recruiterName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    interviewNotes: { type: String },
    statusHistory: [
      {
        status: { type: String, required: true },
        dateMoved: { type: Date, required: true },
        interviewDetails: {
          interviewDate: { type: Date },
          interviewLocation: { type: String },
        },
        offerDetails: {
          salary: { type: String },
          benefits: { type: String },
          responseDeadline: { type: Date },
        },
        rejectionReason: { type: String },
      },
    ],
    currentStatus: { type: String, required: true },
    additionalDocuments: [
      {
        documentType: { type: String, required: true },
        documentUrl: { type: String, required: true },
      },
    ],
    reminders: [
      {
        reminderType: { type: String, required: true },
        reminderDate: { type: Date, required: true },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Export the model
const JobApplication = mongoose.model<IJobApplication>(
  "JobApplication",
  JobApplicationSchema
);
export default JobApplication;
