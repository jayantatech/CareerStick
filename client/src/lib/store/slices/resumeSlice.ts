// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type {
//   ResumeState,
//   JobIndustryData,
//   PersonalInformation,
//   ProfessionalSummary,
// } from "../hooks";

// const initialState: ResumeState = {
//   jobIndustry: {
//     industry: "",
//     targetJob: "",
//     experience: "",
//   },
//   personalInfo: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     city: "",
//     country: "",
//     address: "",
//     postalCode: "",
//     photo: null,
//   },
//   professionalSummary: {
//     summaryText: "",
//   },
//   isLoading: false,
//   error: null,
// };

// const resumeSlice = createSlice({
//   name: "resume",
//   initialState,
//   reducers: {
//     updateJobIndustry: (
//       state,
//       action: PayloadAction<Partial<JobIndustryData>>
//     ) => {
//       console.log("payload for jobIndustry", action.payload);
//       state.jobIndustry = { ...state.jobIndustry, ...action.payload };
//     },
//     updatePersonalInfo: (
//       state,
//       action: PayloadAction<Partial<PersonalInformation>>
//     ) => {
//       // console.log("payload for personalInfo", action.payload);
//       state.personalInfo = { ...state.personalInfo, ...action.payload };
//     },
//     updateProfessionalSummary: (
//       state,
//       action: PayloadAction<Partial<ProfessionalSummary>>
//     ) => {
//       // console.log("payload for professionalSummary", action.payload);
//       state.professionalSummary = {
//         ...state.professionalSummary,
//         ...action.payload,
//       };
//     },
//     resetForm: (state) => {
//       return initialState;
//     },
//   },
// });

// export const {
//   updateJobIndustry,
//   updatePersonalInfo,
//   updateProfessionalSummary,
//   resetForm,
// } = resumeSlice.actions;

// export default resumeSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type {
//   ResumeState,
//   JobIndustryData,
//   PersonalInformation,
//   ProfessionalSummary,
//   JobExperience,
// } from "../hooks";

// const initialState: ResumeState = {
//   jobIndustry: {
//     industry: "",
//     targetJob: "",
//     experience: "",
//   },
//   personalInfo: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     city: "",
//     country: "",
//     address: "",
//     postalCode: "",
//     photo: null,
//   },
//   professionalSummary: {
//     summaryText: "",
//   },
//   workExperience: [
//     {
//       id: "default-job",
//       jobTitle: "",
//       company: "",
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isCurrentJob: false,
//       location: "",
//       description: "",
//     },
//   ],
//   isLoading: false,
//   error: null,
// };

// const resumeSlice = createSlice({
//   name: "resume",
//   initialState,
//   reducers: {
//     updateJobIndustry: (
//       state,
//       action: PayloadAction<Partial<JobIndustryData>>
//     ) => {
//       state.jobIndustry = { ...state.jobIndustry, ...action.payload };
//     },
//     updatePersonalInfo: (
//       state,
//       action: PayloadAction<Partial<PersonalInformation>>
//     ) => {
//       state.personalInfo = { ...state.personalInfo, ...action.payload };
//     },
//     updateProfessionalSummary: (
//       state,
//       action: PayloadAction<Partial<ProfessionalSummary>>
//     ) => {
//       state.professionalSummary = {
//         ...state.professionalSummary,
//         ...action.payload,
//       };
//     },
//     // New reducers for work experience
//     setWorkExperience: (state, action: PayloadAction<JobExperience[]>) => {
//       console.log("setting work experience", action.payload);
//       state.workExperience = action.payload;
//     },
//     updateWorkExperience: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         field: keyof JobExperience;
//         value: any;
//       }>
//     ) => {
//       console.log("updating work experience", action.payload);
//       const { id, field, value } = action.payload;
//       const experienceIndex = state.workExperience.findIndex(
//         (exp) => exp.id === id
//       );

//       if (experienceIndex !== -1) {
//         if (field === "isCurrentJob" && value === true) {
//           state.workExperience[experienceIndex] = {
//             ...state.workExperience[experienceIndex],
//             [field]: value,
//             endDate: { month: "", year: "" },
//           };
//         } else {
//           state.workExperience[experienceIndex] = {
//             ...state.workExperience[experienceIndex],
//             [field]: value,
//           };
//         }
//       }
//     },
//     addWorkExperience: (state, action: PayloadAction<JobExperience>) => {
//       state.workExperience.push(action.payload);
//     },
//     deleteWorkExperience: (state, action: PayloadAction<string>) => {
//       state.workExperience = state.workExperience.filter(
//         (exp) => exp.id !== action.payload
//       );
//     },
//     reorderWorkExperience: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.workExperience.splice(oldIndex, 1);
//       state.workExperience.splice(newIndex, 0, removed);
//     },
//     resetForm: (state) => {
//       return initialState;
//     },
//   },
// });

// export const {
//   updateJobIndustry,
//   updatePersonalInfo,
//   updateProfessionalSummary,
//   setWorkExperience,
//   updateWorkExperience,
//   addWorkExperience,
//   deleteWorkExperience,
//   reorderWorkExperience,
//   resetForm,
// } = resumeSlice.actions;

// export default resumeSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // Types and Interfaces
// interface DateInfo {
//   month: string;
//   year: string;
// }

// interface JobIndustryData {
//   industry: string;
//   targetJob: string;
//   experience: string;
// }

// interface PersonalInformation {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   city: string;
//   country: string;
//   address: string;
//   postalCode: string;
//   photo: File | null;
// }

// interface ProfessionalSummary {
//   summaryText: string;
// }

// interface JobExperience {
//   id: string;
//   jobTitle: string;
//   company: string;
//   startDate: DateInfo;
//   endDate: DateInfo;
//   isCurrentJob: boolean;
//   location: string;
//   description: string;
// }

// interface Education {
//   id: string;
//   degree: string;
//   school: string;
//   startDate: DateInfo;
//   endDate: DateInfo;
//   isCurrentlyStudying: boolean;
//   location: string;
//   description: string;
// }

// interface ResumeState {
//   jobIndustry: JobIndustryData;
//   personalInfo: PersonalInformation;
//   professionalSummary: ProfessionalSummary;
//   workExperience: JobExperience[];
//   education: Education[];
//   isLoading: boolean;
//   error: string | null;
// }

// // Initial State
// const initialState: ResumeState = {
//   jobIndustry: {
//     industry: "",
//     targetJob: "",
//     experience: "",
//   },
//   personalInfo: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     city: "",
//     country: "",
//     address: "",
//     postalCode: "",
//     photo: null,
//   },
//   professionalSummary: {
//     summaryText: "",
//   },
//   workExperience: [
//     {
//       id: "default-job",
//       jobTitle: "",
//       company: "",
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isCurrentJob: false,
//       location: "",
//       description: "",
//     },
//   ],
//   education: [
//     {
//       id: "default-education",
//       degree: "",
//       school: "",
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isCurrentlyStudying: false,
//       location: "",
//       description: "",
//     },
//   ],
//   isLoading: false,
//   error: null,
// };

// // Slice Definition
// const resumeSlice = createSlice({
//   name: "resume",
//   initialState,
//   reducers: {
//     // Job Industry
//     updateJobIndustry: (
//       state,
//       action: PayloadAction<Partial<JobIndustryData>>
//     ) => {
//       state.jobIndustry = { ...state.jobIndustry, ...action.payload };
//     },

//     // Personal Information
//     updatePersonalInfo: (
//       state,
//       action: PayloadAction<Partial<PersonalInformation>>
//     ) => {
//       state.personalInfo = { ...state.personalInfo, ...action.payload };
//     },

//     // Professional Summary
//     updateProfessionalSummary: (
//       state,
//       action: PayloadAction<Partial<ProfessionalSummary>>
//     ) => {
//       state.professionalSummary = {
//         ...state.professionalSummary,
//         ...action.payload,
//       };
//     },

//     // Work Experience
//     setWorkExperience: (state, action: PayloadAction<JobExperience[]>) => {
//       state.workExperience = action.payload;
//     },

//     updateWorkExperience: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         field: keyof JobExperience;
//         value: any;
//       }>
//     ) => {
//       const { id, field, value } = action.payload;
//       const experienceIndex = state.workExperience.findIndex(
//         (exp) => exp.id === id
//       );

//       if (experienceIndex !== -1) {
//         if (field === "isCurrentJob" && value === true) {
//           state.workExperience[experienceIndex] = {
//             ...state.workExperience[experienceIndex],
//             [field]: value,
//             endDate: { month: "", year: "" },
//           };
//         } else {
//           state.workExperience[experienceIndex] = {
//             ...state.workExperience[experienceIndex],
//             [field]: value,
//           };
//         }
//       }
//     },

//     addWorkExperience: (state, action: PayloadAction<JobExperience>) => {
//       state.workExperience.push(action.payload);
//     },

//     deleteWorkExperience: (state, action: PayloadAction<string>) => {
//       state.workExperience = state.workExperience.filter(
//         (exp) => exp.id !== action.payload
//       );
//     },

//     reorderWorkExperience: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.workExperience.splice(oldIndex, 1);
//       state.workExperience.splice(newIndex, 0, removed);
//     },

//     // Education
//     updateEducation: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         field: keyof Education;
//         value: any;
//       }>
//     ) => {
//       const { id, field, value } = action.payload;
//       const educationIndex = state.education.findIndex((edu) => edu.id === id);

//       if (educationIndex !== -1) {
//         if (field === "isCurrentlyStudying" && value === true) {
//           state.education[educationIndex] = {
//             ...state.education[educationIndex],
//             [field]: value,
//             endDate: { month: "", year: "" },
//           };
//         } else {
//           state.education[educationIndex] = {
//             ...state.education[educationIndex],
//             [field]: value,
//           };
//         }
//       }
//     },

//     addEducation: (state, action: PayloadAction<Education>) => {
//       state.education.push(action.payload);
//     },

//     deleteEducation: (state, action: PayloadAction<string>) => {
//       state.education = state.education.filter(
//         (edu) => edu.id !== action.payload
//       );
//     },

//     reorderEducation: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.education.splice(oldIndex, 1);
//       state.education.splice(newIndex, 0, removed);
//     },

//     // Reset Form
//     resetForm: (state) => {
//       return initialState;
//     },
//   },
// });

// // Export actions
// export const {
//   updateJobIndustry,
//   updatePersonalInfo,
//   updateProfessionalSummary,
//   setWorkExperience,
//   updateWorkExperience,
//   addWorkExperience,
//   deleteWorkExperience,
//   reorderWorkExperience,
//   updateEducation,
//   addEducation,
//   deleteEducation,
//   reorderEducation,
//   resetForm,
// } = resumeSlice.actions;

// // Export reducer
// export default resumeSlice.reducer;

// after social link]

// before select skill
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // Types and Interfaces
// interface DateInfo {
//   month: string;
//   year: string;
// }

// interface JobIndustryData {
//   industry: string;
//   targetJob: string;
//   experience: string;
// }

// interface PersonalInformation {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   city: string;
//   country: string;
//   address: string;
//   postalCode: string;
//   photo: File | null;
// }

// interface ProfessionalSummary {
//   summaryText: string;
// }

// interface JobExperience {
//   id: string;
//   jobTitle: string;
//   company: string;
//   startDate: DateInfo;
//   endDate: DateInfo;
//   isCurrentJob: boolean;
//   location: string;
//   description: string;
// }

// interface Education {
//   id: string;
//   degree: string;
//   school: string;
//   startDate: DateInfo;
//   endDate: DateInfo;
//   isCurrentlyStudying: boolean;
//   location: string;
//   description: string;
// }

// interface SocialLink {
//   id: string;
//   platform: string;
//   url: string;
// }

// interface ResumeState {
//   jobIndustry: JobIndustryData;
//   personalInfo: PersonalInformation;
//   professionalSummary: ProfessionalSummary;
//   workExperience: JobExperience[];
//   education: Education[];
//   socialLinks: SocialLink[];
//   isLoading: boolean;
//   error: string | null;
// }

// // Initial State
// const initialState: ResumeState = {
//   jobIndustry: {
//     industry: "",
//     targetJob: "",
//     experience: "",
//   },
//   personalInfo: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     city: "",
//     country: "",
//     address: "",
//     postalCode: "",
//     photo: null,
//   },
//   professionalSummary: {
//     summaryText: "",
//   },
//   workExperience: [
//     {
//       id: "default-job",
//       jobTitle: "",
//       company: "",
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isCurrentJob: false,
//       location: "",
//       description: "",
//     },
//   ],
//   education: [
//     {
//       id: "default-education",
//       degree: "",
//       school: "",
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isCurrentlyStudying: false,
//       location: "",
//       description: "",
//     },
//   ],
//   socialLinks: [
//     {
//       id: "default-link",
//       platform: "",
//       url: "",
//     },
//   ],
//   isLoading: false,
//   error: null,
// };

// // Slice Definition
// const resumeSlice = createSlice({
//   name: "resume",
//   initialState,
//   reducers: {
//     // Job Industry
//     updateJobIndustry: (
//       state,
//       action: PayloadAction<Partial<JobIndustryData>>
//     ) => {
//       state.jobIndustry = { ...state.jobIndustry, ...action.payload };
//     },

//     // Personal Information
//     updatePersonalInfo: (
//       state,
//       action: PayloadAction<Partial<PersonalInformation>>
//     ) => {
//       state.personalInfo = { ...state.personalInfo, ...action.payload };
//     },

//     // Professional Summary
//     updateProfessionalSummary: (
//       state,
//       action: PayloadAction<Partial<ProfessionalSummary>>
//     ) => {
//       state.professionalSummary = {
//         ...state.professionalSummary,
//         ...action.payload,
//       };
//     },

//     // Work Experience
//     setWorkExperience: (state, action: PayloadAction<JobExperience[]>) => {
//       state.workExperience = action.payload;
//     },

//     updateWorkExperience: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         field: keyof JobExperience;
//         value: any;
//       }>
//     ) => {
//       const { id, field, value } = action.payload;
//       const experienceIndex = state.workExperience.findIndex(
//         (exp) => exp.id === id
//       );

//       if (experienceIndex !== -1) {
//         if (field === "isCurrentJob" && value === true) {
//           state.workExperience[experienceIndex] = {
//             ...state.workExperience[experienceIndex],
//             [field]: value,
//             endDate: { month: "", year: "" },
//           };
//         } else {
//           state.workExperience[experienceIndex] = {
//             ...state.workExperience[experienceIndex],
//             [field]: value,
//           };
//         }
//       }
//     },

//     addWorkExperience: (state, action: PayloadAction<JobExperience>) => {
//       state.workExperience.push(action.payload);
//     },

//     deleteWorkExperience: (state, action: PayloadAction<string>) => {
//       state.workExperience = state.workExperience.filter(
//         (exp) => exp.id !== action.payload
//       );
//     },

//     reorderWorkExperience: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.workExperience.splice(oldIndex, 1);
//       state.workExperience.splice(newIndex, 0, removed);
//     },

//     // Education
//     updateEducation: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         field: keyof Education;
//         value: any;
//       }>
//     ) => {
//       const { id, field, value } = action.payload;
//       const educationIndex = state.education.findIndex((edu) => edu.id === id);

//       if (educationIndex !== -1) {
//         if (field === "isCurrentlyStudying" && value === true) {
//           state.education[educationIndex] = {
//             ...state.education[educationIndex],
//             [field]: value,
//             endDate: { month: "", year: "" },
//           };
//         } else {
//           state.education[educationIndex] = {
//             ...state.education[educationIndex],
//             [field]: value,
//           };
//         }
//       }
//     },

//     addEducation: (state, action: PayloadAction<Education>) => {
//       state.education.push(action.payload);
//     },

//     deleteEducation: (state, action: PayloadAction<string>) => {
//       state.education = state.education.filter(
//         (edu) => edu.id !== action.payload
//       );
//     },

//     reorderEducation: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.education.splice(oldIndex, 1);
//       state.education.splice(newIndex, 0, removed);
//     },

//     // Social Links
//     updateSocialLink: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         field: keyof SocialLink;
//         value: string;
//       }>
//     ) => {
//       const { id, field, value } = action.payload;
//       const linkIndex = state.socialLinks.findIndex((link) => link.id === id);
//       if (linkIndex !== -1) {
//         state.socialLinks[linkIndex] = {
//           ...state.socialLinks[linkIndex],
//           [field]: value,
//         };
//       }
//     },

//     addSocialLink: (state, action: PayloadAction<SocialLink>) => {
//       state.socialLinks.push(action.payload);
//     },

//     deleteSocialLink: (state, action: PayloadAction<string>) => {
//       state.socialLinks = state.socialLinks.filter(
//         (link) => link.id !== action.payload
//       );
//     },

//     reorderSocialLinks: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.socialLinks.splice(oldIndex, 1);
//       state.socialLinks.splice(newIndex, 0, removed);
//     },

//     // Reset Form
//     resetForm: (state) => {
//       return initialState;
//     },
//   },
// });

// // Export actions
// export const {
//   updateJobIndustry,
//   updatePersonalInfo,
//   updateProfessionalSummary,
//   setWorkExperience,
//   updateWorkExperience,
//   addWorkExperience,
//   deleteWorkExperience,
//   reorderWorkExperience,
//   updateEducation,
//   addEducation,
//   deleteEducation,
//   reorderEducation,
//   updateSocialLink,
//   addSocialLink,
//   deleteSocialLink,
//   reorderSocialLinks,
//   resetForm,
// } = resumeSlice.actions;

// // Export reducer
// export default resumeSlice.reducer;
// // before select skillimport { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types and Interfaces

// skillimport { createSlice, PayloadAction } from "@reduxjs/toolkit

// before the project seciton
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface DateInfo {
//   month: string;
//   year: string;
// }

// interface JobIndustryData {
//   industry: string;
//   targetJob: string;
//   experience: string;
// }

// interface PersonalInformation {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   city: string;
//   country: string;
//   address: string;
//   postalCode: string;
//   photo: File | null;
// }

// interface ProfessionalSummary {
//   summaryText: string;
// }

// interface JobExperience {
//   id: string;
//   jobTitle: string;
//   company: string;
//   startDate: DateInfo;
//   endDate: DateInfo;
//   isCurrentJob: boolean;
//   location: string;
//   description: string;
// }

// interface Education {
//   id: string;
//   degree: string;
//   school: string;
//   startDate: DateInfo;
//   endDate: DateInfo;
//   isCurrentlyStudying: boolean;
//   location: string;
//   description: string;
// }

// interface SocialLink {
//   id: string;
//   platform: string;
//   url: string;
// }

// interface Skill {
//   id: string;
//   name: string;
// }

// interface ResumeState {
//   jobIndustry: JobIndustryData;
//   personalInfo: PersonalInformation;
//   professionalSummary: ProfessionalSummary;
//   workExperience: JobExperience[];
//   education: Education[];
//   socialLinks: SocialLink[];
//   selectedSkills: Skill[];
//   customSkills: Skill[];
//   isLoading: boolean;
//   error: string | null;
// }

// // Initial State
// const initialState: ResumeState = {
//   jobIndustry: {
//     industry: "",
//     targetJob: "",
//     experience: "",
//   },
//   personalInfo: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     city: "",
//     country: "",
//     address: "",
//     postalCode: "",
//     photo: null,
//   },
//   professionalSummary: {
//     summaryText: "",
//   },
//   workExperience: [
//     {
//       id: "default-job",
//       jobTitle: "",
//       company: "",
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isCurrentJob: false,
//       location: "",
//       description: "",
//     },
//   ],
//   education: [
//     {
//       id: "default-education",
//       degree: "",
//       school: "",
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isCurrentlyStudying: false,
//       location: "",
//       description: "",
//     },
//   ],
//   socialLinks: [
//     {
//       id: "default-link",
//       platform: "",
//       url: "",
//     },
//   ],
//   selectedSkills: [],
//   customSkills: [],
//   isLoading: false,
//   error: null,
// };

// // Slice Definition
// const resumeSlice = createSlice({
//   name: "resume",
//   initialState,
//   reducers: {
//     // Job Industry
//     updateJobIndustry: (
//       state,
//       action: PayloadAction<Partial<JobIndustryData>>
//     ) => {
//       state.jobIndustry = { ...state.jobIndustry, ...action.payload };
//     },

//     // Personal Information
//     updatePersonalInfo: (
//       state,
//       action: PayloadAction<Partial<PersonalInformation>>
//     ) => {
//       state.personalInfo = { ...state.personalInfo, ...action.payload };
//     },

//     // Professional Summary
//     updateProfessionalSummary: (
//       state,
//       action: PayloadAction<Partial<ProfessionalSummary>>
//     ) => {
//       state.professionalSummary = {
//         ...state.professionalSummary,
//         ...action.payload,
//       };
//     },

//     // Work Experience
//     setWorkExperience: (state, action: PayloadAction<JobExperience[]>) => {
//       state.workExperience = action.payload;
//     },

//     updateWorkExperience: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         field: keyof JobExperience;
//         value: any;
//       }>
//     ) => {
//       const { id, field, value } = action.payload;
//       const experienceIndex = state.workExperience.findIndex(
//         (exp) => exp.id === id
//       );

//       if (experienceIndex !== -1) {
//         if (field === "isCurrentJob" && value === true) {
//           state.workExperience[experienceIndex] = {
//             ...state.workExperience[experienceIndex],
//             [field]: value,
//             endDate: { month: "", year: "" },
//           };
//         } else {
//           state.workExperience[experienceIndex] = {
//             ...state.workExperience[experienceIndex],
//             [field]: value,
//           };
//         }
//       }
//     },

//     addWorkExperience: (state, action: PayloadAction<JobExperience>) => {
//       state.workExperience.push(action.payload);
//     },

//     deleteWorkExperience: (state, action: PayloadAction<string>) => {
//       state.workExperience = state.workExperience.filter(
//         (exp) => exp.id !== action.payload
//       );
//     },

//     reorderWorkExperience: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.workExperience.splice(oldIndex, 1);
//       state.workExperience.splice(newIndex, 0, removed);
//     },

//     // Education
//     updateEducation: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         field: keyof Education;
//         value: any;
//       }>
//     ) => {
//       const { id, field, value } = action.payload;
//       const educationIndex = state.education.findIndex((edu) => edu.id === id);

//       if (educationIndex !== -1) {
//         if (field === "isCurrentlyStudying" && value === true) {
//           state.education[educationIndex] = {
//             ...state.education[educationIndex],
//             [field]: value,
//             endDate: { month: "", year: "" },
//           };
//         } else {
//           state.education[educationIndex] = {
//             ...state.education[educationIndex],
//             [field]: value,
//           };
//         }
//       }
//     },

//     addEducation: (state, action: PayloadAction<Education>) => {
//       state.education.push(action.payload);
//     },

//     deleteEducation: (state, action: PayloadAction<string>) => {
//       state.education = state.education.filter(
//         (edu) => edu.id !== action.payload
//       );
//     },

//     reorderEducation: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.education.splice(oldIndex, 1);
//       state.education.splice(newIndex, 0, removed);
//     },

//     // Social Links
//     updateSocialLink: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         field: keyof SocialLink;
//         value: string;
//       }>
//     ) => {
//       const { id, field, value } = action.payload;
//       const linkIndex = state.socialLinks.findIndex((link) => link.id === id);
//       if (linkIndex !== -1) {
//         state.socialLinks[linkIndex] = {
//           ...state.socialLinks[linkIndex],
//           [field]: value,
//         };
//       }
//     },

//     addSocialLink: (state, action: PayloadAction<SocialLink>) => {
//       state.socialLinks.push(action.payload);
//     },

//     deleteSocialLink: (state, action: PayloadAction<string>) => {
//       state.socialLinks = state.socialLinks.filter(
//         (link) => link.id !== action.payload
//       );
//     },

//     reorderSocialLinks: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.socialLinks.splice(oldIndex, 1);
//       state.socialLinks.splice(newIndex, 0, removed);
//     },

//     // Skills
//     setSelectedSkills: (state, action: PayloadAction<Skill[]>) => {
//       state.selectedSkills = action.payload;
//     },

//     addSelectedSkill: (state, action: PayloadAction<Skill>) => {
//       if (
//         !state.selectedSkills.some((skill) => skill.id === action.payload.id)
//       ) {
//         state.selectedSkills.push(action.payload);
//       }
//     },

//     removeSelectedSkill: (state, action: PayloadAction<string>) => {
//       state.selectedSkills = state.selectedSkills.filter(
//         (skill) => skill.id !== action.payload
//       );
//     },

//     reorderSkills: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.selectedSkills.splice(oldIndex, 1);
//       state.selectedSkills.splice(newIndex, 0, removed);
//     },

//     addCustomSkill: (state, action: PayloadAction<Skill>) => {
//       state.selectedSkills.push(action.payload);
//       state.customSkills.push(action.payload);
//     },

//     resetSkills: (state) => {
//       return initialState;
//     },

//     // Reset Form
//     resetForm: (state) => {
//       return initialState;
//     },
//   },
// });

// // Export actions
// export const {
//   updateJobIndustry,
//   updatePersonalInfo,
//   updateProfessionalSummary,
//   setWorkExperience,
//   updateWorkExperience,
//   addWorkExperience,
//   deleteWorkExperience,
//   reorderWorkExperience,
//   updateEducation,
//   addEducation,
//   deleteEducation,
//   reorderEducation,
//   updateSocialLink,
//   addSocialLink,
//   deleteSocialLink,
//   reorderSocialLinks,
//   setSelectedSkills,
//   addSelectedSkill,
//   removeSelectedSkill,
//   reorderSkills,
//   addCustomSkill,
//   resetSkills,
//   resetForm,
// } = resumeSlice.actions;

// // Export the reducer
// export default resumeSlice.reducer;
// // working before language selection
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface DateInfo {
//   month: string;
//   year: string;
// }

// interface JobIndustryData {
//   industry: string;
//   targetJob: string;
//   experience: string;
// }

// interface PersonalInformation {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   city: string;
//   country: string;
//   address: string;
//   postalCode: string;
//   photo: File | null;
// }

// interface ProfessionalSummary {
//   summaryText: string;
// }

// interface Project {
//   id: string;
//   title: string;
//   technologies: string[];
//   role: string;
//   contributions: string;
//   links: { platform: string; url: string }[];
// }

// interface JobExperience {
//   id: string;
//   jobTitle: string;
//   company: string;
//   startDate: DateInfo;
//   endDate: DateInfo;
//   isCurrentJob: boolean;
//   location: string;
//   description: string;
// }

// interface Education {
//   id: string;
//   degree: string;
//   school: string;
//   startDate: DateInfo;
//   endDate: DateInfo;
//   isCurrentlyStudying: boolean;
//   location: string;
//   description: string;
// }

// interface SocialLink {
//   id: string;
//   platform: string;
//   url: string;
// }

// interface Skill {
//   id: string;
//   name: string;
// }

// interface ResumeState {
//   jobIndustry: JobIndustryData;
//   personalInfo: PersonalInformation;
//   professionalSummary: ProfessionalSummary;
//   workExperience: JobExperience[];
//   education: Education[];
//   socialLinks: SocialLink[];
//   selectedSkills: Skill[];
//   customSkills: Skill[];
//   projects: Project[];
//   isLoading: boolean;
//   error: string | null;
// }

// // Initial State
// const initialState: ResumeState = {
//   jobIndustry: {
//     industry: "",
//     targetJob: "",
//     experience: "",
//   },
//   personalInfo: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     city: "",
//     country: "",
//     address: "",
//     postalCode: "",
//     photo: null,
//   },
//   professionalSummary: {
//     summaryText: "",
//   },
//   workExperience: [
//     {
//       id: "default-job",
//       jobTitle: "",
//       company: "",
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isCurrentJob: false,
//       location: "",
//       description: "",
//     },
//   ],
//   education: [
//     {
//       id: "default-education",
//       degree: "",
//       school: "",
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isCurrentlyStudying: false,
//       location: "",
//       description: "",
//     },
//   ],
//   socialLinks: [
//     {
//       id: "default-link",
//       platform: "",
//       url: "",
//     },
//   ],
//   projects: [
//     {
//       id: "default-project",
//       title: "",
//       technologies: [],
//       role: "",
//       contributions: "",
//       links: [],
//     },
//   ],
//   selectedSkills: [],
//   customSkills: [],
//   isLoading: false,
//   error: null,
// };

// // Slice Definition
// const resumeSlice = createSlice({
//   name: "resume",
//   initialState,
//   reducers: {
//     // Job Industry
//     updateJobIndustry: (
//       state,
//       action: PayloadAction<Partial<JobIndustryData>>
//     ) => {
//       state.jobIndustry = { ...state.jobIndustry, ...action.payload };
//     },

//     // Personal Information
//     updatePersonalInfo: (
//       state,
//       action: PayloadAction<Partial<PersonalInformation>>
//     ) => {
//       state.personalInfo = { ...state.personalInfo, ...action.payload };
//     },

//     // Professional Summary
//     updateProfessionalSummary: (
//       state,
//       action: PayloadAction<Partial<ProfessionalSummary>>
//     ) => {
//       state.professionalSummary = {
//         ...state.professionalSummary,
//         ...action.payload,
//       };
//     },

//     // Projects
//     setProjects: (state, action: PayloadAction<Project[]>) => {
//       state.projects = action.payload;
//     },

//     updateProject: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         field: keyof Project;
//         value: any;
//       }>
//     ) => {
//       const { id, field, value } = action.payload;
//       const projectIndex = state.projects.findIndex((proj) => proj.id === id);
//       if (projectIndex !== -1) {
//         state.projects[projectIndex] = {
//           ...state.projects[projectIndex],
//           [field]: value,
//         };
//       }
//     },

//     addProject: (state, action: PayloadAction<Project>) => {
//       state.projects.push(action.payload);
//     },

//     deleteProject: (state, action: PayloadAction<string>) => {
//       state.projects = state.projects.filter(
//         (project) => project.id !== action.payload
//       );
//     },

//     reorderProjects: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.projects.splice(oldIndex, 1);
//       state.projects.splice(newIndex, 0, removed);
//     },

//     // Work Experience
//     setWorkExperience: (state, action: PayloadAction<JobExperience[]>) => {
//       state.workExperience = action.payload;
//     },

//     updateWorkExperience: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         field: keyof JobExperience;
//         value: any;
//       }>
//     ) => {
//       const { id, field, value } = action.payload;
//       const experienceIndex = state.workExperience.findIndex(
//         (exp) => exp.id === id
//       );

//       if (experienceIndex !== -1) {
//         if (field === "isCurrentJob" && value === true) {
//           state.workExperience[experienceIndex] = {
//             ...state.workExperience[experienceIndex],
//             [field]: value,
//             endDate: { month: "", year: "" },
//           };
//         } else {
//           state.workExperience[experienceIndex] = {
//             ...state.workExperience[experienceIndex],
//             [field]: value,
//           };
//         }
//       }
//     },

//     addWorkExperience: (state, action: PayloadAction<JobExperience>) => {
//       state.workExperience.push(action.payload);
//     },

//     deleteWorkExperience: (state, action: PayloadAction<string>) => {
//       state.workExperience = state.workExperience.filter(
//         (exp) => exp.id !== action.payload
//       );
//     },

//     reorderWorkExperience: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.workExperience.splice(oldIndex, 1);
//       state.workExperience.splice(newIndex, 0, removed);
//     },

//     // Education
//     updateEducation: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         field: keyof Education;
//         value: any;
//       }>
//     ) => {
//       const { id, field, value } = action.payload;
//       const educationIndex = state.education.findIndex((edu) => edu.id === id);

//       if (educationIndex !== -1) {
//         if (field === "isCurrentlyStudying" && value === true) {
//           state.education[educationIndex] = {
//             ...state.education[educationIndex],
//             [field]: value,
//             endDate: { month: "", year: "" },
//           };
//         } else {
//           state.education[educationIndex] = {
//             ...state.education[educationIndex],
//             [field]: value,
//           };
//         }
//       }
//     },

//     addEducation: (state, action: PayloadAction<Education>) => {
//       state.education.push(action.payload);
//     },

//     deleteEducation: (state, action: PayloadAction<string>) => {
//       state.education = state.education.filter(
//         (edu) => edu.id !== action.payload
//       );
//     },

//     reorderEducation: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.education.splice(oldIndex, 1);
//       state.education.splice(newIndex, 0, removed);
//     },

//     // Social Links
//     updateSocialLink: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         field: keyof SocialLink;
//         value: string;
//       }>
//     ) => {
//       const { id, field, value } = action.payload;
//       const linkIndex = state.socialLinks.findIndex((link) => link.id === id);
//       if (linkIndex !== -1) {
//         state.socialLinks[linkIndex] = {
//           ...state.socialLinks[linkIndex],
//           [field]: value,
//         };
//       }
//     },

//     addSocialLink: (state, action: PayloadAction<SocialLink>) => {
//       state.socialLinks.push(action.payload);
//     },

//     deleteSocialLink: (state, action: PayloadAction<string>) => {
//       state.socialLinks = state.socialLinks.filter(
//         (link) => link.id !== action.payload
//       );
//     },

//     reorderSocialLinks: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.socialLinks.splice(oldIndex, 1);
//       state.socialLinks.splice(newIndex, 0, removed);
//     },

//     // Skills
//     setSelectedSkills: (state, action: PayloadAction<Skill[]>) => {
//       state.selectedSkills = action.payload;
//     },

//     addSelectedSkill: (state, action: PayloadAction<Skill>) => {
//       if (
//         !state.selectedSkills.some((skill) => skill.id === action.payload.id)
//       ) {
//         state.selectedSkills.push(action.payload);
//       }
//     },

//     removeSelectedSkill: (state, action: PayloadAction<string>) => {
//       state.selectedSkills = state.selectedSkills.filter(
//         (skill) => skill.id !== action.payload
//       );
//     },

//     reorderSkills: (
//       state,
//       action: PayloadAction<{ oldIndex: number; newIndex: number }>
//     ) => {
//       const { oldIndex, newIndex } = action.payload;
//       const [removed] = state.selectedSkills.splice(oldIndex, 1);
//       state.selectedSkills.splice(newIndex, 0, removed);
//     },

//     addCustomSkill: (state, action: PayloadAction<Skill>) => {
//       state.selectedSkills.push(action.payload);
//       state.customSkills.push(action.payload);
//     },

//     resetSkills: (state) => {
//       return initialState;
//     },

//     // Reset Form
//     resetForm: (state) => {
//       return initialState;
//     },
//   },
// });

// // Export actions
// export const {
//   updateJobIndustry,
//   updatePersonalInfo,
//   updateProfessionalSummary,
//   setProjects,
//   updateProject,
//   addProject,
//   deleteProject,
//   reorderProjects,
//   setWorkExperience,
//   updateWorkExperience,
//   addWorkExperience,
//   deleteWorkExperience,
//   reorderWorkExperience,
//   updateEducation,
//   addEducation,
//   deleteEducation,
//   reorderEducation,
//   updateSocialLink,
//   addSocialLink,
//   deleteSocialLink,
//   reorderSocialLinks,
//   setSelectedSkills,
//   addSelectedSkill,
//   removeSelectedSkill,
//   reorderSkills,
//   addCustomSkill,
//   resetSkills,
//   resetForm,
// } = resumeSlice.actions;

// // Export the reducer
// export default resumeSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateInfo {
  month: string;
  year: string;
}

interface JobIndustryData {
  industry: string;
  targetJob: string;
  experience: string;
}

interface PersonalInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  address: string;
  postalCode: string;
  photo: File | null;
}

interface ProfessionalSummary {
  summaryText: string;
}

interface Project {
  id: string;
  title: string;
  technologies: string[];
  role: string;
  contributions: string;
  links: { platform: string; url: string }[];
}

interface JobExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: DateInfo;
  endDate: DateInfo;
  isCurrentJob: boolean;
  location: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  startDate: DateInfo;
  endDate: DateInfo;
  isCurrentlyStudying: boolean;
  location: string;
  description: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface Skill {
  id: string;
  name: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: string;
  isCustom: boolean;
}

interface ResumeState {
  jobIndustry: JobIndustryData;
  personalInfo: PersonalInformation;
  professionalSummary: ProfessionalSummary;
  workExperience: JobExperience[];
  education: Education[];
  socialLinks: SocialLink[];
  selectedSkills: Skill[];
  customSkills: Skill[];
  projects: Project[];
  languages: Language[];
  isLoading: boolean;
  error: string | null;
}

// Initial State
const initialState: ResumeState = {
  jobIndustry: {
    industry: "",
    targetJob: "",
    experience: "",
  },
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    address: "",
    postalCode: "",
    photo: null,
  },
  professionalSummary: {
    summaryText: "",
  },
  workExperience: [
    {
      id: "default-job",
      jobTitle: "",
      company: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      isCurrentJob: false,
      location: "",
      description: "",
    },
  ],
  education: [
    {
      id: "default-education",
      degree: "",
      school: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      isCurrentlyStudying: false,
      location: "",
      description: "",
    },
  ],
  socialLinks: [
    {
      id: "default-link",
      platform: "",
      url: "",
    },
  ],
  projects: [
    {
      id: "default-project",
      title: "",
      technologies: [],
      role: "",
      contributions: "",
      links: [],
    },
  ],
  languages: [
    {
      id: "default-language",
      name: "",
      proficiency: "",
      isCustom: false,
    },
  ],
  selectedSkills: [],
  customSkills: [],
  isLoading: false,
  error: null,
};

// Slice Definition
const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    // Job Industry
    updateJobIndustry: (
      state,
      action: PayloadAction<Partial<JobIndustryData>>
    ) => {
      state.jobIndustry = { ...state.jobIndustry, ...action.payload };
    },

    // Personal Information
    updatePersonalInfo: (
      state,
      action: PayloadAction<Partial<PersonalInformation>>
    ) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },

    // Professional Summary
    updateProfessionalSummary: (
      state,
      action: PayloadAction<Partial<ProfessionalSummary>>
    ) => {
      state.professionalSummary = {
        ...state.professionalSummary,
        ...action.payload,
      };
    },

    // Projects
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },

    updateProject: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof Project;
        value: any;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const projectIndex = state.projects.findIndex((proj) => proj.id === id);
      if (projectIndex !== -1) {
        state.projects[projectIndex] = {
          ...state.projects[projectIndex],
          [field]: value,
        };
      }
    },

    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },

    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },

    reorderProjects: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.projects.splice(oldIndex, 1);
      state.projects.splice(newIndex, 0, removed);
    },

    // Work Experience
    setWorkExperience: (state, action: PayloadAction<JobExperience[]>) => {
      state.workExperience = action.payload;
    },

    updateWorkExperience: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof JobExperience;
        value: any;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const experienceIndex = state.workExperience.findIndex(
        (exp) => exp.id === id
      );

      if (experienceIndex !== -1) {
        if (field === "isCurrentJob" && value === true) {
          state.workExperience[experienceIndex] = {
            ...state.workExperience[experienceIndex],
            [field]: value,
            endDate: { month: "", year: "" },
          };
        } else {
          state.workExperience[experienceIndex] = {
            ...state.workExperience[experienceIndex],
            [field]: value,
          };
        }
      }
    },

    addWorkExperience: (state, action: PayloadAction<JobExperience>) => {
      state.workExperience.push(action.payload);
    },

    deleteWorkExperience: (state, action: PayloadAction<string>) => {
      state.workExperience = state.workExperience.filter(
        (exp) => exp.id !== action.payload
      );
    },

    reorderWorkExperience: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.workExperience.splice(oldIndex, 1);
      state.workExperience.splice(newIndex, 0, removed);
    },

    // Education
    updateEducation: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof Education;
        value: any;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const educationIndex = state.education.findIndex((edu) => edu.id === id);

      if (educationIndex !== -1) {
        if (field === "isCurrentlyStudying" && value === true) {
          state.education[educationIndex] = {
            ...state.education[educationIndex],
            [field]: value,
            endDate: { month: "", year: "" },
          };
        } else {
          state.education[educationIndex] = {
            ...state.education[educationIndex],
            [field]: value,
          };
        }
      }
    },

    addEducation: (state, action: PayloadAction<Education>) => {
      state.education.push(action.payload);
    },

    deleteEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter(
        (edu) => edu.id !== action.payload
      );
    },

    reorderEducation: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.education.splice(oldIndex, 1);
      state.education.splice(newIndex, 0, removed);
    },

    // Social Links
    updateSocialLink: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof SocialLink;
        value: string;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const linkIndex = state.socialLinks.findIndex((link) => link.id === id);
      if (linkIndex !== -1) {
        state.socialLinks[linkIndex] = {
          ...state.socialLinks[linkIndex],
          [field]: value,
        };
      }
    },

    addSocialLink: (state, action: PayloadAction<SocialLink>) => {
      state.socialLinks.push(action.payload);
    },

    deleteSocialLink: (state, action: PayloadAction<string>) => {
      state.socialLinks = state.socialLinks.filter(
        (link) => link.id !== action.payload
      );
    },

    reorderSocialLinks: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.socialLinks.splice(oldIndex, 1);
      state.socialLinks.splice(newIndex, 0, removed);
    },

    // Skills
    setSelectedSkills: (state, action: PayloadAction<Skill[]>) => {
      state.selectedSkills = action.payload;
    },

    addSelectedSkill: (state, action: PayloadAction<Skill>) => {
      if (
        !state.selectedSkills.some((skill) => skill.id === action.payload.id)
      ) {
        state.selectedSkills.push(action.payload);
      }
    },

    removeSelectedSkill: (state, action: PayloadAction<string>) => {
      state.selectedSkills = state.selectedSkills.filter(
        (skill) => skill.id !== action.payload
      );
    },

    reorderSkills: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.selectedSkills.splice(oldIndex, 1);
      state.selectedSkills.splice(newIndex, 0, removed);
    },

    addCustomSkill: (state, action: PayloadAction<Skill>) => {
      state.selectedSkills.push(action.payload);
      state.customSkills.push(action.payload);
    },

    // Languages
    setLanguages: (state, action: PayloadAction<Language[]>) => {
      state.languages = action.payload;
    },

    addLanguage: (state, action: PayloadAction<Language>) => {
      state.languages.push(action.payload);
    },

    updateLanguage: (
      state,
      action: PayloadAction<{
        id: string;
        field: keyof Language;
        value: string;
      }>
    ) => {
      const { id, field, value } = action.payload;
      const languageIndex = state.languages.findIndex((lang) => lang.id === id);
      if (languageIndex !== -1) {
        state.languages[languageIndex] = {
          ...state.languages[languageIndex],
          [field]: value,
        };
      }
    },

    deleteLanguage: (state, action: PayloadAction<string>) => {
      state.languages = state.languages.filter(
        (lang) => lang.id !== action.payload
      );
    },

    reorderLanguages: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removed] = state.languages.splice(oldIndex, 1);
      state.languages.splice(newIndex, 0, removed);
    },

    resetSkills: (state) => {
      return initialState;
    },

    // Reset Form
    resetForm: (state) => {
      return initialState;
    },
  },
});

// Export actions
export const {
  updateJobIndustry,
  updatePersonalInfo,
  updateProfessionalSummary,
  setProjects,
  updateProject,
  addProject,
  deleteProject,
  reorderProjects,
  setWorkExperience,
  updateWorkExperience,
  addWorkExperience,
  deleteWorkExperience,
  reorderWorkExperience,
  updateEducation,
  addEducation,
  deleteEducation,
  reorderEducation,
  updateSocialLink,
  addSocialLink,
  deleteSocialLink,
  reorderSocialLinks,
  setSelectedSkills,
  addSelectedSkill,
  removeSelectedSkill,
  reorderSkills,
  addCustomSkill,
  setLanguages,
  addLanguage,
  updateLanguage,
  deleteLanguage,
  reorderLanguages,
  resetSkills,
  resetForm,
} = resumeSlice.actions;

// Export the reducer
export default resumeSlice.reducer;
