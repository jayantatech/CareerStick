import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveResumeSectionState {
  jobIndustry: boolean;
  personalInfo: boolean;
  professionalSummary: boolean;
  workExperience: boolean;
  education: boolean;
  socialLinks: boolean;
  selectedSkills: boolean;
  customSkills: boolean;
  projects: boolean;
  languages: boolean;
  certificate: boolean;
  awards: boolean;
  openSourceContributions: boolean;
  customSections: boolean;
  isLoading: boolean;
  error: string | null;
  mobilePreview: boolean;
}

const initialState: ActiveResumeSectionState = {
  jobIndustry: false,
  personalInfo: false,
  professionalSummary: false,
  workExperience: false,
  education: false,
  socialLinks: false,
  selectedSkills: false,
  customSkills: false,
  projects: false,
  languages: false,
  certificate: false,
  awards: false,
  openSourceContributions: false,
  customSections: false,
  isLoading: false,
  error: null,
  mobilePreview: false,
};

const activeResumeSectionSlice = createSlice({
  name: "activeResumeSection",
  initialState,
  reducers: {
    setJobIndustry: (state, action: PayloadAction<boolean>) => {
      state.jobIndustry = action.payload;
    },
    setPersonalInfo: (state, action: PayloadAction<boolean>) => {
      state.personalInfo = action.payload;
    },
    setProfessionalSummary: (state, action: PayloadAction<boolean>) => {
      state.professionalSummary = action.payload;
    },
    setWorkExperience: (state, action: PayloadAction<boolean>) => {
      state.workExperience = action.payload;
    },
    setEducation: (state, action: PayloadAction<boolean>) => {
      state.education = action.payload;
    },
    setSocialLinks: (state, action: PayloadAction<boolean>) => {
      state.socialLinks = action.payload;
    },
    setSelectedSkills: (state, action: PayloadAction<boolean>) => {
      state.selectedSkills = action.payload;
    },
    setCustomSkills: (state, action: PayloadAction<boolean>) => {
      state.customSkills = action.payload;
    },
    setProjects: (state, action: PayloadAction<boolean>) => {
      state.projects = action.payload;
    },
    setLanguages: (state, action: PayloadAction<boolean>) => {
      state.languages = action.payload;
    },
    setCertificate: (state, action: PayloadAction<boolean>) => {
      state.certificate = action.payload;
    },
    setAwards: (state, action: PayloadAction<boolean>) => {
      state.awards = action.payload;
    },
    setOpenSourceContributions: (state, action: PayloadAction<boolean>) => {
      state.openSourceContributions = action.payload;
    },
    setCustomSections: (state, action: PayloadAction<boolean>) => {
      state.customSections = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setMobilePreview: (state, action: PayloadAction<boolean>) => {
      state.mobilePreview = action.payload;
    },
  },
});

export const {
  setJobIndustry,
  setPersonalInfo,
  setProfessionalSummary,
  setWorkExperience,
  setEducation,
  setSocialLinks,
  setSelectedSkills,
  setCustomSkills,
  setProjects,
  setLanguages,
  setCertificate,
  setAwards,
  setOpenSourceContributions,
  setCustomSections,
  setIsLoading,
  setError,
  setMobilePreview,
} = activeResumeSectionSlice.actions;

export default activeResumeSectionSlice.reducer;
