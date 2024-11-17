import mongoose, { Schema, Document } from "mongoose";
import {
  CreationMethodEnum,
  IResume,
  LanguageProficiency,
  TemplateNameEnum,
} from "../types/resumeTypes";

const ResumeSchema: Schema = new Schema<IResume>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  resumeTitle: { type: String, required: false },
  targetJobTitle: { type: String, required: false },
  resumeSettingsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ResumeSettings",
  },
  creationMethod: {
    type: String,
    default: CreationMethodEnum.USER_CREATED,
    enum: Object.values(CreationMethodEnum),
    required: true,
  },
  targetedJobAndIndustry: {
    industry: { type: String, required: false },
    targetJob: { type: String, required: false },
    experience: { type: String, required: false },
  },
  personalInfo: {
    name: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    email: { type: String, required: false },
    image: { type: String },
    location: {
      city: { type: String, required: false },
      state: { type: String, required: false },
      country: { type: String, required: false },
    },
    // socialLinks: {
    //   linkedIn: {
    //     url: { type: String, required: false },
    //     username: { type: String, required: false },
    //   },
    //   github: {
    //     url: { type: String, required: false },
    //     username: { type: String, required: false },
    //   },
    //   stackOverflow: {
    //     url: { type: String, required: false },
    //     username: { type: String, required: false },
    //   },
    //   personalWebsite: {
    //     url: { type: String, required: false },
    //     username: { type: String, required: false },
    //   },
    //   twitter: {
    //     url: { type: String, required: false },
    //     username: { type: String, required: false },
    //   },
    //   medium: {
    //     url: { type: String, required: false },
    //     username: { type: String, required: false },
    //   },
    //   devTo: {
    //     url: { type: String, required: false },
    //     username: { type: String, required: false },
    //   },
    // },

    summary: { type: String, required: false },
    visaStatus: { type: String, required: false },
  },
  languages: [
    {
      language: { type: String, required: false },
      proficiency: {
        type: String,
        enum: Object.values(LanguageProficiency),
      },
      certifications: [{ type: String }],
    },
  ],
  socialLinks: [
    {
      platform: { type: String, required: false },
      url: { type: String, required: false },
      username: { type: String, required: false, default: "" },
    },
  ],
  workExperience: [
    {
      jobTitle: { type: String },
      company: { type: String },
      jobType: { type: String },
      location: {
        city: { type: String, required: false },
        state: { type: String, required: false },
        country: { type: String, required: false },
        workplaceType: { type: String, required: false },
      },
      startDate: { month: { type: String }, year: { type: String } },
      endDate: { month: { type: String }, year: { type: String } },
      isCurrentJob: { type: Boolean, default: false },
      responsibilities: [{ type: String }],
      achievements: [{ type: String }],
      technologies: [{ type: String }],
      projects: [
        {
          name: { type: String },
          description: { type: String },
          role: { type: String },
          technologies: [{ type: String }],
          achievements: [{ type: String }],
        },
      ],
    },
  ],
  education: [
    {
      degree: { type: String, required: false },
      institution: { type: String, required: false },
      location: {
        city: { type: String, required: false },
        state: { type: String, required: false },
        country: { type: String, required: false },
      },
      description: { type: String, required: false },
      startDate: { month: { type: String }, year: { type: String } },
      endDate: { month: { type: String }, year: { type: String } },
      isCurrentlyStudying: { type: Boolean, default: false },
      gpa: { type: Number },
      relevantCourses: [{ type: String }],
      projects: [{ type: String }],
      honors: [{ type: String }],
      activities: [{ type: String }],
    },
  ],
  certifications: [
    {
      name: { type: String, required: false },
      issuingOrganization: { type: String, required: false },
      issueDate: { month: { type: String }, year: { type: String } },
      expirationDate: { month: { type: String }, year: { type: String } },
      isNeverExpires: { type: Boolean, default: false },
      credentialId: { type: String, required: false },
      skills: [{ type: String, required: false }],
      verificationUrl: { type: String, required: false },
      description: { type: String, required: false },
    },
  ],
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
  skills: {
    technicalSkills: [
      {
        name: { type: String, required: false },
        proficiency: { type: String, required: false },
        yearsOfExperience: { type: Number, required: false },
        lastUsed: { type: Date, required: false },
      },
    ],
    softSkills: [{ type: String }],
  },
  achievements: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      date: { type: Date, required: false },
      url: { type: String },
    },
  ],
  publications: [
    {
      title: { type: String, required: false },
      publishedIn: { type: String, required: false },
      date: { type: Date, required: false },
      url: { type: String, required: false },
      description: { type: String, required: false },
    },
  ],
  volunteerExperience: [
    {
      organization: { type: String, required: false },
      role: { type: String, required: false },
      startDate: { type: Date, required: false },
      endDate: { type: Schema.Types.Mixed },
      description: { type: String, required: false },
      skills: [{ type: String }],
    },
  ],
  awards: [
    {
      name: { type: String, required: false },
      issuingOrganization: { type: String, required: false },
      date: { month: { type: String }, year: { type: String } },
      description: { type: String, required: false },
    },
  ],
  // openSourceContributions: [
  //   {
  //     projectName: { type: String, required: false },
  //     url: { type: String, required: false },
  //     description: { type: String, required: false },
  //     startDate: { type: Date, required: false },
  //     endDate: { type: Schema.Types.Mixed },
  //   },
  // ],
  openSourceContributions: [
    {
      projectName: { type: String, required: false },
      role: { type: String, default: "" },
      technologies: [{ type: String }],
      description: { type: String, default: "" },
      contributions: { type: String, default: "" },
      links: [
        {
          platform: { type: String, required: false },
          url: { type: String, required: false },
        },
      ],
      startDate: { month: { type: String }, year: { type: String } },
      endDate: { month: { type: String }, year: { type: String } },
      isOngoing: { type: Boolean, default: false },
    },
  ],
  //   [
  //     {
  //         "id": "default-section",
  //         "title": "jay bisws",
  //         "subtitle": "this is ok jay",
  //         "description": "This is the way to get better and it is the way to ",
  //         "startDate": {
  //             "month": "March",
  //             "year": "2017"
  //         },
  //         "endDate": {
  //             "month": "March",
  //             "year": "2023"
  //         },
  //         "isPresent": false
  //     }
  // ]
  customSections: [
    {
      title: { type: String, required: false },
      subtitle: { type: String, required: false },
      description: { type: String, required: false },
      startDate: { month: { type: String }, year: { type: String } },
      endDate: { month: { type: String }, year: { type: String } },
      isPresent: { type: Boolean, default: false },
    },
  ],
  atsCompatibilityScore: { type: Number, required: false },
  keywords: [{ type: String, required: false }],
  templateName: {
    type: String,
    enum: Object.values(TemplateNameEnum),
    default: TemplateNameEnum.template3,
    required: false,
  },
  isPremiumTemplate: { type: Boolean, default: false, required: false },
  lastAtsAnalysisDate: { type: Date, required: false },
  visibility: { type: String, required: false },
  resumeFile: {
    url: { type: String, required: false },
    format: { type: String, required: false },
    generatedDate: { type: Date, required: false },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create and export the model
const Resume = mongoose.model<IResume>("Resume", ResumeSchema);
export default Resume;
