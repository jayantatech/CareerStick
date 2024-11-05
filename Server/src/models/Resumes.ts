// import mongoose, { Schema, Document } from "mongoose";

// // Define interfaces for the schema
// interface ISocialLinks {
//   linkedIn?: {
//     url: string;
//     username: string;
//   };
//   github?: {
//     url: string;
//     username: string;
//   };
//   stackOverflow?: {
//     url: string;
//     username: string;
//   };
//   personalWebsite?: {
//     url: string;
//     username: string;
//   };
//   twitter?: {
//     url: string;
//     username: string;
//   };
//   medium?: {
//     url: string;
//     username: string;
//   };
//   devTo?: {
//     url: string;
//     username: string;
//   };
// }

// enum LanguageProficiency {
//   Native = "Native",
//   Fluent = "Fluent",
//   Conversational = "Conversational",
//   Beginner = "Beginner",
// }

// interface ILanguage {
//   language: string;
//   proficiency?: LanguageProficiency;
//   certifications?: string[];
// }

// interface IPersonalInfo {
//   name: string;
//   phoneNumber: string;
//   email: string;
//   location?: {
//     city: string;
//     state?: string;
//     country: string;
//   };
//   socialLinks: ISocialLinks;
//   languages: ILanguage[];
//   summary: string;
//   image?: string;
//   visaStatus: string;
// }

// interface IWorkExperienceProject {
//   name: string;
//   description: string;
//   role: string;
//   technologies: string[];
//   achievements: string[];
// }

// interface IWorkExperience {
//   jobTitle: string;
//   company: string;
//   jobType: string;
//   location: {
//     city: string;
//     state: string;
//     country: string;
//     workplaceType: string;
//   };
//   startDate: Date;
//   endDate?: Date | string;
//   responsibilities?: string[];
//   achievements?: string[];
//   technologies?: string[];
//   projects?: IWorkExperienceProject[];
// }

// interface IEducation {
//   degree: string;
//   institution: string;
//   location?: {
//     city: string;
//     state: string;
//     country: string;
//   };
//   startDate: Date;
//   endDate?: Date | string;
//   gpa?: number;
//   relevantCourses?: string[];
//   projects?: string[];
//   honors?: string[];
//   activities?: string[];
// }

// interface ICertification {
//   name: string;
//   issuingOrganization: string;
//   issueDate: Date;
//   expirationDate?: Date;
//   credentialId: string;
//   skills: string[];
// }

// interface IProject {
//   title: string;
//   description: string;
//   role?: string;
//   startDate?: Date;
//   endDate?: Date | string;
//   technologies?: string[];
//   achievements?: string[];
//   url?: string;
//   mediaLinks?: string[];
// }

// interface ISkill {
//   category: string;
//   skills: {
//     name: string;
//     proficiency: string;
//     yearsOfExperience: number;
//     lastUsed: Date;
//   }[];
// }

// interface IAchievement {
//   title: string;
//   description: string;
//   date: Date;
//   url?: string;
// }

// interface IPublication {
//   title: string;
//   publishedIn: string;
//   date: Date;
//   url: string;
//   description: string;
// }

// interface IVolunteerExperience {
//   organization: string;
//   role: string;
//   startDate: Date;
//   endDate?: Date | string;
//   description: string;
//   skills: string[];
// }

// interface IAward {
//   name: string;
//   issuingOrganization: string;
//   date: Date;
//   description: string;
// }

// interface IOpenSourceContribution {
//   projectName: string;
//   url: string;
//   description: string;
//   startDate: Date;
//   endDate?: Date | string;
// }

// interface ICustomSection {
//   title: string;
//   content: string[];
// }

// interface IResumeVersion {
//   versionId: mongoose.Schema.Types.ObjectId;
//   submittedResumeInfo: mongoose.Schema.Types.ObjectId;
//   versionTitle: string;
//   isPrime: boolean;
//   personalInfo: IPersonalInfo;
//   workExperience?: IWorkExperience[];
//   education?: IEducation[];
//   certifications?: ICertification[];
//   projects?: IProject[];
//   skills?: {
//     technicalSkills: ISkill[];
//     softSkills: string[];
//   };
//   achievements?: IAchievement[];
//   publications?: IPublication[];
//   volunteerExperience: IVolunteerExperience[];
//   awards?: IAward[];
//   openSourceContributions?: IOpenSourceContribution[];
//   customSections?: ICustomSection[];
// }
// enum CreationMethodEnum {
//   AI_ASSISTED = "AI-assisted",
//   USER_CREATED = "User-created",
//   ATS_PARSED = "ATS-parsed",
//   MANUAL_ENTRY = "Manual-entry",
//   IMPORTED = "Imported",
//   TEMPLATE_BASED = "Template-based",
//   THIRD_PARTY_TOOL = "Third-party-tool",
// }
// interface IResume extends Document {
//   userId: mongoose.Schema.Types.ObjectId;
//   resumeTitle: string;
//   targetJobTitle: string;
//   resumeSettingsId: mongoose.Schema.Types.ObjectId;
//   creationMethod: CreationMethodEnum;
//   currentVersion: string;
//   versions: IResumeVersion[];
//   atsCompatibilityScore: number;
//   keywords: string[];
//   templateId: mongoose.Schema.Types.ObjectId;
//   isPremiumTemplate: boolean;
//   lastAtsAnalysisDate: Date;
//   visibility: string;
//   resumeFile: {
//     url: string;
//     format: string;
//     generatedDate: Date;
//   };
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Create the schema
// const ResumeSchema: Schema = new Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
//   resumeTitle: { type: String, required: true },
//   targetJobTitle: { type: String, required: true },
//   resumeSettingsId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "ResumeSettings",
//   },
//   creationMethod: {
//     type: String,
//     enum: Object.values(CreationMethodEnum),
//     required: true,
//   },
//   currentVersion: { type: String, required: true },
//   versions: [
//     {
//       versionId: { type: mongoose.Schema.Types.ObjectId, required: true },
//       submittedResumeInfo: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "UserSubmittedResume",
//         required: true,
//       },
//       versionTitle: { type: String, required: true },
//       isPrime: { type: Boolean, required: true },
//       personalInfo: {
//         name: { type: String, required: true },
//         phoneNumber: { type: String, required: true },
//         email: { type: String, required: true },
//         image: { type: String },
//         location: {
//           city: { type: String, required: true },
//           state: { type: String, required: false },
//           country: { type: String, required: true },
//         },
//         socialLinks: {
//           linkedIn: {
//             url: { type: String, required: true },
//             username: { type: String, required: true },
//           },
//           github: {
//             url: { type: String, required: true },
//             username: { type: String, required: true },
//           },
//           stackOverflow: {
//             url: { type: String, required: true },
//             username: { type: String, required: true },
//           },
//           personalWebsite: {
//             url: { type: String, required: true },
//             username: { type: String, required: true },
//           },
//           twitter: {
//             url: { type: String, required: true },
//             username: { type: String, required: true },
//           },
//           medium: {
//             url: { type: String, required: true },
//             username: { type: String, required: true },
//           },
//           devTo: {
//             url: { type: String, required: true },
//             username: { type: String, required: true },
//           },
//         },
//         languages: [
//           {
//             language: { type: String, required: true },
//             proficiency: { type: String, required: true },
//             certifications: [{ type: String }],
//           },
//         ],
//         summary: { type: String, required: true },
//         visaStatus: { type: String, required: true },
//       },
//       workExperience: [
//         {
//           jobTitle: { type: String, required: true },
//           company: { type: String, required: true },
//           jobType: { type: String, required: true },
//           location: {
//             city: { type: String, required: true },
//             state: { type: String, required: true },
//             country: { type: String, required: true },
//             workplaceType: { type: String, required: true },
//           },
//           startDate: { type: Date, required: true },
//           endDate: { type: Date || String },
//           responsibilities: [{ type: String }],
//           achievements: [{ type: String }],
//           technologies: [{ type: String }],
//           projects: [
//             {
//               name: { type: String },
//               description: { type: String },
//               role: { type: String },
//               technologies: [{ type: String }],
//               achievements: [{ type: String }],
//             },
//           ],
//         },
//       ],
//       education: [
//         {
//           degree: { type: String, required: true },
//           institution: { type: String, required: true },
//           location: {
//             city: { type: String, required: true },
//             state: { type: String, required: false },
//             country: { type: String, required: false },
//           },
//           startDate: { type: Date, required: true },
//           endDate: { type: Date || String, required: true },
//           gpa: { type: Number },
//           relevantCourses: [{ type: String }],
//           projects: [{ type: String }],
//           honors: [{ type: String }],
//           activities: [{ type: String }],
//         },
//       ],
//       certifications: [
//         {
//           name: { type: String, required: true },
//           issuingOrganization: { type: String, required: true },
//           issueDate: { type: Date, required: true },
//           expirationDate: { type: Date },
//           credentialId: { type: String, required: true },
//           skills: [{ type: String, required: true }],
//         },
//       ],
//       projects: [
//         {
//           title: { type: String, required: true },
//           description: { type: String, required: true },
//           role: { type: String, required: true },
//           startDate: { type: Date, required: true },
//           endDate: { type: Date },
//           technologies: [{ type: String, required: true }],
//           achievements: [{ type: String, required: true }],
//           url: { type: String },
//           mediaLinks: [{ type: String }],
//         },
//       ],
//       skills: {
//         technicalSkills: [
//           {
//             category: { type: String, required: true },
//             skills: [
//               {
//                 name: { type: String, required: true },
//                 proficiency: { type: String, required: false },
//                 yearsOfExperience: { type: Number, required: false },
//                 lastUsed: { type: Date, required: true },
//               },
//             ],
//           },
//         ],
//         softSkills: [{ type: String }],
//       },
//       achievements: [
//         {
//           title: { type: String, required: true },
//           description: { type: String, required: true },
//           date: { type: Date, required: true },
//           url: { type: String },
//         },
//       ],
//       publications: [
//         {
//           title: { type: String, required: true },
//           publishedIn: { type: String, required: true },
//           date: { type: Date, required: true },
//           url: { type: String, required: true },
//           description: { type: String, required: true },
//         },
//       ],
//       volunteerExperience: [
//         {
//           organization: { type: String, required: true },
//           role: { type: String, required: true },
//           startDate: { type: Date, required: true },
//           endDate: { type: Date },
//           description: { type: String, required: true },
//           skills: [{ type: String, required: true }],
//         },
//       ],
//       awards: [
//         {
//           name: { type: String, required: true },
//           issuingOrganization: { type: String, required: true },
//           date: { type: Date, required: true },
//           description: { type: String, required: true },
//         },
//       ],
//       openSourceContributions: [
//         {
//           projectName: { type: String, required: true },
//           url: { type: String, required: true },
//           description: { type: String, required: true },
//           startDate: { type: Date, required: true },
//           endDate: { type: Date },
//         },
//       ],
//       customSections: [
//         {
//           title: { type: String, required: true },
//           content: [{ type: String, required: true }],
//         },
//       ],
//     },
//   ],
//   atsCompatibilityScore: { type: Number, required: true },
//   keywords: [{ type: String, required: true }],
//   templateId: { type: mongoose.Schema.Types.ObjectId, required: true },
//   isPremiumTemplate: { type: Boolean, default: false, required: true },
//   lastAtsAnalysisDate: { type: Date, required: true },
//   visibility: { type: String, required: true },
//   resumeFile: {
//     url: { type: String, required: true },
//     format: { type: String, required: true },
//     generatedDate: { type: Date, required: true },
//   },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// // Create and export the model
// const Resume = mongoose.model<IResume>("Resume", ResumeSchema);
// export default Resume;

// // working code with multiple versions
// import mongoose, { Schema, Document } from "mongoose";

// // Define interfaces for the schema
// interface ISocialLinks {
//   linkedIn?: {
//     url: string;
//     username: string;
//   };
//   github?: {
//     url: string;
//     username: string;
//   };
//   stackOverflow?: {
//     url: string;
//     username: string;
//   };
//   personalWebsite?: {
//     url: string;
//     username: string;
//   };
//   twitter?: {
//     url: string;
//     username: string;
//   };
//   medium?: {
//     url: string;
//     username: string;
//   };
//   devTo?: {
//     url: string;
//     username: string;
//   };
// }

// enum LanguageProficiency {
//   Native = "Native",
//   Fluent = "Fluent",
//   Conversational = "Conversational",
//   Beginner = "Beginner",
// }

// interface ILanguage {
//   language: string;
//   proficiency?: LanguageProficiency;
//   certifications?: string[];
// }

// interface IPersonalInfo {
//   name: string;
//   phoneNumber: string;
//   email: string;
//   location?: {
//     city: string;
//     state?: string;
//     country: string;
//   };
//   socialLinks: ISocialLinks;
//   languages: ILanguage[];
//   summary: string;
//   image?: string;
//   visaStatus: string;
// }

// interface IWorkExperienceProject {
//   name: string;
//   description: string;
//   role: string;
//   technologies: string[];
//   achievements: string[];
// }

// interface IWorkExperience {
//   jobTitle: string;
//   company: string;
//   jobType: string;
//   location: {
//     city: string;
//     state: string;
//     country: string;
//     workplaceType: string;
//   };
//   startDate: Date;
//   endDate?: Date | string;
//   responsibilities?: string[];
//   achievements?: string[];
//   technologies?: string[];
//   projects?: IWorkExperienceProject[];
// }

// interface IEducation {
//   degree: string;
//   institution: string;
//   location?: {
//     city: string;
//     state: string;
//     country: string;
//   };
//   startDate: Date;
//   endDate?: Date | string;
//   gpa?: number;
//   relevantCourses?: string[];
//   projects?: string[];
//   honors?: string[];
//   activities?: string[];
// }

// interface ICertification {
//   name: string;
//   issuingOrganization: string;
//   issueDate: Date;
//   expirationDate?: Date;
//   credentialId: string;
//   skills: string[];
// }

// interface IProject {
//   title: string;
//   description: string;
//   role?: string;
//   startDate?: Date;
//   endDate?: Date | string;
//   technologies?: string[];
//   achievements?: string[];
//   url?: string;
//   mediaLinks?: string[];
// }

// interface ISkill {
//   category: string;
//   skills: {
//     name: string;
//     proficiency: string;
//     yearsOfExperience: number;
//     lastUsed: Date;
//   }[];
// }

// interface IAchievement {
//   title: string;
//   description: string;
//   date: Date;
//   url?: string;
// }

// interface IPublication {
//   title: string;
//   publishedIn: string;
//   date: Date;
//   url: string;
//   description: string;
// }

// interface IVolunteerExperience {
//   organization: string;
//   role: string;
//   startDate: Date;
//   endDate?: Date | string;
//   description: string;
//   skills: string[];
// }

// interface IAward {
//   name: string;
//   issuingOrganization: string;
//   date: Date;
//   description: string;
// }

// interface IOpenSourceContribution {
//   projectName: string;
//   url: string;
//   description: string;
//   startDate: Date;
//   endDate?: Date | string;
// }

// interface ICustomSection {
//   title: string;
//   content: string[];
// }

// interface IResumeVersion {
//   versionId: mongoose.Schema.Types.ObjectId;
//   submittedResumeInfo: mongoose.Schema.Types.ObjectId;
//   versionTitle: string;
//   isPrime: boolean;
//   personalInfo: IPersonalInfo;
//   workExperience?: IWorkExperience[];
//   education?: IEducation[];
//   certifications?: ICertification[];
//   projects?: IProject[];
//   skills?: {
//     technicalSkills: ISkill[];
//     softSkills: string[];
//   };
//   achievements?: IAchievement[];
//   publications?: IPublication[];
//   volunteerExperience: IVolunteerExperience[];
//   awards?: IAward[];
//   openSourceContributions?: IOpenSourceContribution[];
//   customSections?: ICustomSection[];
// }
// enum CreationMethodEnum {
//   AI_ASSISTED = "AI-assisted",
//   USER_CREATED = "User-created",
//   ATS_PARSED = "ATS-parsed",
//   MANUAL_ENTRY = "Manual-entry",
//   IMPORTED = "Imported",
//   TEMPLATE_BASED = "Template-based",
//   THIRD_PARTY_TOOL = "Third-party-tool",
// }
// interface IResume extends Document {
//   userId: mongoose.Schema.Types.ObjectId;
//   resumeTitle: string;
//   targetJobTitle: string;
//   resumeSettingsId: mongoose.Schema.Types.ObjectId;
//   creationMethod: CreationMethodEnum;
//   currentVersion: string;
//   versions: IResumeVersion[];
//   atsCompatibilityScore: number;
//   keywords: string[];
//   templateId: mongoose.Schema.Types.ObjectId;
//   isPremiumTemplate: boolean;
//   lastAtsAnalysisDate: Date;
//   visibility: string;
//   resumeFile: {
//     url: string;
//     format: string;
//     generatedDate: Date;
//   };
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Enums and interfaces remain the same until the schema definition

// const ResumeSchema: Schema = new Schema({
//   // Top level fields remain the same
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
//   resumeTitle: { type: String, required: true },
//   targetJobTitle: { type: String, required: true },
//   resumeSettingsId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "ResumeSettings",
//   },
//   creationMethod: {
//     type: String,
//     enum: Object.values(CreationMethodEnum),
//     required: true,
//   },
//   currentVersion: { type: String, required: true },
//   versions: [
//     {
//       versionId: { type: mongoose.Schema.Types.ObjectId, required: true },
//       submittedResumeInfo: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "UserSubmittedResume",
//         required: true,
//       },
//       versionTitle: { type: String, required: true },
//       isPrime: { type: Boolean, required: true },
//       personalInfo: {
//         name: { type: String, required: true },
//         phoneNumber: { type: String, required: false }, // Made optional
//         email: { type: String, required: true },
//         image: { type: String },
//         location: {
//           city: { type: String, required: true },
//           state: { type: String, required: false }, // Already optional
//           country: { type: String, required: true },
//         },
//         socialLinks: {
//           linkedIn: {
//             url: { type: String, required: false }, // Made optional
//             username: { type: String, required: false }, // Made optional
//           },
//           github: {
//             url: { type: String, required: false }, // Made optional
//             username: { type: String, required: false }, // Made optional
//           },
//           stackOverflow: {
//             url: { type: String, required: false }, // Made optional
//             username: { type: String, required: false }, // Made optional
//           },
//           personalWebsite: {
//             url: { type: String, required: false }, // Made optional
//             username: { type: String, required: false }, // Made optional
//           },
//           twitter: {
//             url: { type: String, required: false }, // Made optional
//             username: { type: String, required: false }, // Made optional
//           },
//           medium: {
//             url: { type: String, required: false }, // Made optional
//             username: { type: String, required: false }, // Made optional
//           },
//           devTo: {
//             url: { type: String, required: false }, // Made optional
//             username: { type: String, required: false }, // Made optional
//           },
//         },
//         languages: [
//           {
//             language: { type: String, required: true },
//             proficiency: { type: String, required: true },
//             certifications: [{ type: String }],
//           },
//         ],
//         summary: { type: String, required: true },
//         visaStatus: { type: String, required: true },
//       },
//       workExperience: [
//         {
//           jobTitle: { type: String, required: true },
//           company: { type: String, required: true },
//           jobType: { type: String, required: true },
//           location: {
//             city: { type: String, required: true },
//             state: { type: String, required: false }, // Made optional
//             country: { type: String, required: true },
//             workplaceType: { type: String, required: true },
//           },
//           startDate: { type: Date, required: true },
//           endDate: { type: Schema.Types.Mixed }, // Allow Date or String
//           responsibilities: [{ type: String }],
//           achievements: [{ type: String }],
//           technologies: [{ type: String }],
//           projects: [
//             {
//               name: { type: String },
//               description: { type: String },
//               role: { type: String },
//               technologies: [{ type: String }],
//               achievements: [{ type: String }],
//             },
//           ],
//         },
//       ],
//     },
//   ],
//   atsCompatibilityScore: { type: Number, required: true },
//   keywords: [{ type: String, required: true }],
//   templateId: { type: mongoose.Schema.Types.ObjectId, required: true },
//   isPremiumTemplate: { type: Boolean, default: false, required: true },
//   lastAtsAnalysisDate: { type: Date, required: true },
//   visibility: { type: String, required: true },
//   resumeFile: {
//     url: { type: String, required: false }, // Made optional
//     format: { type: String, required: false }, // Made optional
//     generatedDate: { type: Date, required: false }, // Made optional
//   },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// // Create and export the model
// const Resume = mongoose.model<IResume>("Resume", ResumeSchema);
// export default Resume;

import mongoose, { Schema, Document } from "mongoose";
import {
  CreationMethodEnum,
  IResume,
  LanguageProficiency,
  TemplateNameEnum,
} from "../types/resumeTypes";

// Define interfaces for the schema
// interface ISocialLinks {
//   linkedIn?: {
//     url: string;
//     username: string;
//   };
//   github?: {
//     url: string;
//     username: string;
//   };
//   stackOverflow?: {
//     url: string;
//     username: string;
//   };
//   personalWebsite?: {
//     url: string;
//     username: string;
//   };
//   twitter?: {
//     url: string;
//     username: string;
//   };
//   medium?: {
//     url: string;
//     username: string;
//   };
//   devTo?: {
//     url: string;
//     username: string;
//   };
// }

// interface ISocialLinks {
//   platform: String;
//   url: String;
//   username: String;
// }

// enum LanguageProficiency {
//   Native = "Native",
//   Fluent = "Fluent",
//   Conversational = "Conversational",
//   Beginner = "Beginner",
// }

// interface ILanguage {
//   language: string;
//   proficiency?: LanguageProficiency;
//   certifications?: string[];
// }
// interface ITargetedJobAndIndustry {
//   industry: string;
//   targetJob: string;
//   experience: string;
// }

// interface IPersonalInfo {
//   name: string;
//   phoneNumber: string;
//   email: string;
//   location?: {
//     city: string;
//     state?: string;
//     country: string;
//   };
//   summary: string;
//   image?: string;
//   visaStatus: string;
// }

// interface IWorkExperienceProject {
//   name: string;
//   description: string;
//   role: string;
//   technologies: string[];
//   achievements: string[];
// }

// interface IWorkExperience {
//   jobTitle: string;
//   company: string;
//   jobType: string;
//   location: {
//     city: string;
//     state: string;
//     country: string;
//     workplaceType: string;
//   };
//   startDate: {
//     month: string;
//     year: string;
//   };
//   endDate?: {
//     month: string;
//     year: string;
//   };
//   isCurrentJob: boolean;
//   responsibilities?: string[];
//   achievements?: string[];
//   technologies?: string[];
//   projects?: IWorkExperienceProject[];
// }

// interface IEducation {
//   degree: string;
//   institution: string;
//   location?: {
//     city: string;
//     state: string;
//     country: string;
//   };
//   startDate: {
//     month: string;
//     year: string;
//   };
//   endDate?: {
//     month: string;
//     year: string;
//   };
//   isCurrentlyStudying: boolean;
//   gpa?: number;
//   relevantCourses?: string[];
//   projects?: string[];
//   honors?: string[];
//   activities?: string[];
// }

// interface ICertification {
//   name: string;
//   issuingOrganization: string;
//   issueDate: {
//     month: string;
//     year: string;
//   };
//   expirationDate?: {
//     month: string;
//     year: string;
//   };
//   isNeverExpires: boolean;
//   verificationUrl: string;
//   description: string;
//   credentialId: string;
//   skills: string[];
// }

// interface IProject {
//   title: string;
//   contributions: string;
//   role?: string;
//   startDate?: Date;
//   endDate?: Date | string;
//   technologies?: string[];
//   achievements?: string[];
//   links?: { platform: string; url: string }[];
//   mediaLinks?: string[];
// }

// interface ISkill {
//   name: string;
//   proficiency: string;
//   yearsOfExperience: number;
//   lastUsed: Date;
// }
// // interface ISkill {
// //   category: string;
// // skills: {
// //   name: string;
// //   proficiency: string;
// //   yearsOfExperience: number;
// //   lastUsed: Date;
// // }[];
// // }

// interface IAchievement {
//   title: string;
//   description: string;
//   date: Date;
//   url?: string;
// }

// interface IPublication {
//   title: string;
//   publishedIn: string;
//   date: Date;
//   url: string;
//   description: string;
// }

// interface IVolunteerExperience {
//   organization: string;
//   role: string;
//   startDate: Date;
//   endDate?: Date | string;
//   description: string;
//   skills: string[];
// }

// interface IAward {
//   name: string;
//   issuingOrganization: string;
//   date: {
//     month: string;
//     year: string;
//   };
//   description: string;
// }

// // interface IOpenSourceContribution {
// //   projectName: string;
// //   url: string;
// //   description: string;
// //   startDate: Date;
// //   endDate?: Date | string;
// // }

// interface IOpenSourceContribution {
//   projectName: string;
//   role: string;
//   technologies: string[];
//   description: string;
//   contributions: string;
//   links: {
//     platform: string;
//     url: string;
//   }[];
//   startDate: {
//     month: string;
//     year: string;
//   };
//   endDate: {
//     month: string;
//     year: string;
//   };
//   isOngoing: boolean;
// }

// interface ICustomSection {
//   title: string;
//   subtitle: string;
//   description: string;
//   startDate: {
//     month: string;
//     year: string;
//   };
//   endDate?: {
//     month: string;
//     year: string;
//   };
//   isPresent: boolean;
// }

// enum CreationMethodEnum {
//   AI_ASSISTED = "AI-assisted",
//   USER_CREATED = "User-created",
//   ATS_PARSED = "ATS-parsed",
//   MANUAL_ENTRY = "Manual-entry",
//   IMPORTED = "Imported",
//   TEMPLATE_BASED = "Template-based",
//   THIRD_PARTY_TOOL = "Third-party-tool",
// }

// enum TemplateNameEnum {
//   Default = "Default",
//   ProfessionalLook = "Professional Look",
//   CreativeStyle = "Creative Style",
//   ExecutiveFlair = "Executive Flair",
//   ModernClean = "Modern Clean",
//   TechFocus = "Tech Focus",
//   ClassicStyle = "Classic Style",
//   BoldDesign = "Bold Design",
//   FreshStart = "Fresh Start",
//   PolishedProfile = "Polished Profile",
//   GraduateBoost = "Graduate Boost",
// }

// interface IResume extends Document {
//   userId: mongoose.Schema.Types.ObjectId;
//   resumeTitle: string;
//   targetJobTitle: string;
//   resumeSettingsId: mongoose.Schema.Types.ObjectId;
//   creationMethod: CreationMethodEnum;
//   targetedJobAndIndustry: ITargetedJobAndIndustry;
//   personalInfo: IPersonalInfo;
//   socialLinks: ISocialLinks[];
//   languages: ILanguage[];
//   workExperience?: IWorkExperience[];
//   education?: IEducation[];
//   certifications?: ICertification[];
//   projects?: IProject[];
//   skills?: {
//     technicalSkills: ISkill[];
//     softSkills: string[];
//   };
//   achievements?: IAchievement[];
//   publications?: IPublication[];
//   volunteerExperience?: IVolunteerExperience[];
//   awards?: IAward[];
//   openSourceContributions?: IOpenSourceContribution[];
//   customSections?: ICustomSection[];
//   atsCompatibilityScore: number;
//   keywords: string[];
//   templateName: TemplateNameEnum;
//   isPremiumTemplate: boolean;
//   lastAtsAnalysisDate: Date;
//   visibility: string;
//   resumeFile?: {
//     url: string;
//     format: string;
//     generatedDate: Date;
//   };
//   createdAt: Date;
//   updatedAt: Date;
// }

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
        required: false,
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
    default: TemplateNameEnum.Default,
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
