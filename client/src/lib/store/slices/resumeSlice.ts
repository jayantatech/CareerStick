import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  ResumeState,
  JobIndustryData,
  PersonalInformation,
  ProfessionalSummary,
} from "../hooks";

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
  isLoading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    updateJobIndustry: (
      state,
      action: PayloadAction<Partial<JobIndustryData>>
    ) => {
      console.log("payload for jobIndustry", action.payload);
      state.jobIndustry = { ...state.jobIndustry, ...action.payload };
    },
    updatePersonalInfo: (
      state,
      action: PayloadAction<Partial<PersonalInformation>>
    ) => {
      // console.log("payload for personalInfo", action.payload);
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateProfessionalSummary: (
      state,
      action: PayloadAction<Partial<ProfessionalSummary>>
    ) => {
      // console.log("payload for professionalSummary", action.payload);
      state.professionalSummary = {
        ...state.professionalSummary,
        ...action.payload,
      };
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const {
  updateJobIndustry,
  updatePersonalInfo,
  updateProfessionalSummary,
  resetForm,
} = resumeSlice.actions;

export default resumeSlice.reducer;
