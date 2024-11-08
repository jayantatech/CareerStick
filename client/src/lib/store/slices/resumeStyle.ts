import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "lodash";

// Define the types for our style options
interface activeSections {
  jobIndustry: boolean;
  personalInfo: boolean;
  professionalSummary: boolean;
  workExperience: boolean;
  education: boolean;
  socialLinks: boolean;
  projects: boolean;
  languages: boolean;
  selectedSkills: boolean;
  certificate: boolean;
  awards: boolean;
  openSourceContributions: boolean;
  customSections: boolean;
}
export interface ResumeStyleState {
  fontSize: {
    body: "small" | "normal" | "large" | "extraLarge";
    heading: "small" | "normal" | "large" | "extraLarge";
  };
  margins: {
    page: "compact" | "normal" | "spacious";
    section: "compact" | "normal" | "spacious";
  };
  fontFamily: "Helvetica" | "Times-Roman" | "Courier";
  colorScheme: {
    primary: string;
    secondary: string;
    text: string;
  };
  lineHeight: "compact" | "normal" | "spacious";
  sectionSpacing: "compact" | "normal" | "spacious";
  activeSections: activeSections;
}

// Define the initial state
export interface IResumeStyleState {
  fontSize: {
    body: "small" | "normal" | "large" | "extraLarge";
    heading: "small" | "normal" | "large" | "extraLarge";
  };
  margins: {
    page: "compact" | "normal" | "spacious";
    section: "compact" | "normal" | "spacious";
  };
  fontFamily: "Helvetica" | "Times-Roman" | "Courier";
  colorScheme: {
    primary: string;
    secondary: string;
    text: string;
  };
  lineHeight: "compact" | "normal" | "spacious";
  sectionSpacing: "compact" | "normal" | "spacious";
  activeSections: activeSections;
}

// Define the initial state
const initialState: IResumeStyleState = {
  fontSize: {
    body: "normal",
    heading: "normal",
  },
  margins: {
    page: "normal",
    section: "normal",
  },
  fontFamily: "Helvetica",
  colorScheme: {
    primary: "#111827",
    secondary: "#3B82F6",
    text: "#4B5563",
  },
  activeSections: {
    jobIndustry: true,
    personalInfo: true,
    professionalSummary: true,
    education: true,
    languages: true,
    selectedSkills: true,
    awards: false,
    certificate: false,
    projects: false,
    workExperience: true,
    openSourceContributions: false,
    socialLinks: true,
    customSections: false,
  },
  lineHeight: "normal",
  sectionSpacing: "normal",
};

// Create the slice
const resumeStyleSlice = createSlice({
  name: "resumeStyle",
  initialState,
  reducers: {
    setBodyFontSize: (
      state,
      action: PayloadAction<ResumeStyleState["fontSize"]["body"]>
    ) => {
      state.fontSize.body = action.payload;
    },
    setHeadingFontSize: (
      state,
      action: PayloadAction<ResumeStyleState["fontSize"]["heading"]>
    ) => {
      state.fontSize.heading = action.payload;
    },
    setPageMargins: (
      state,
      action: PayloadAction<ResumeStyleState["margins"]["page"]>
    ) => {
      state.margins.page = action.payload;
    },
    setSectionMargins: (
      state,
      action: PayloadAction<ResumeStyleState["margins"]["section"]>
    ) => {
      state.margins.section = action.payload;
    },
    setFontFamily: (
      state,
      action: PayloadAction<ResumeStyleState["fontFamily"]>
    ) => {
      state.fontFamily = action.payload;
    },
    setColorScheme: (
      state,
      action: PayloadAction<ResumeStyleState["colorScheme"]>
    ) => {
      state.colorScheme = action.payload;
    },
    setLineHeight: (
      state,
      action: PayloadAction<ResumeStyleState["lineHeight"]>
    ) => {
      state.lineHeight = action.payload;
    },
    setSectionSpacing: (
      state,
      action: PayloadAction<ResumeStyleState["sectionSpacing"]>
    ) => {
      state.sectionSpacing = action.payload;
    },
    setActiveSections: (state, action: PayloadAction<activeSections>) => {
      state.activeSections = action.payload;
    },
  },
});

export const {
  setBodyFontSize,
  setHeadingFontSize,
  setPageMargins,
  setSectionMargins,
  setFontFamily,
  setColorScheme,
  setLineHeight,
  setSectionSpacing,
  setActiveSections,
} = resumeStyleSlice.actions;

export default resumeStyleSlice.reducer;
