import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface resumeFeatureState {
  templateBoxState: boolean;
  designAndFontBoxState: boolean;
  ATSOptimizationBoxState: boolean;
  AISuggestionBoxState: boolean;
  addSectionBoxState: boolean;
  mobileTemplateBoxState: boolean;
  mobileDesignAndFontBoxState: boolean;
  mobileATSOptimizationBoxState: boolean;
  mobileAISuggestionBoxState: boolean;
  linkedInImportBoxState: boolean;
}

const initialState: resumeFeatureState = {
  templateBoxState: false,
  designAndFontBoxState: false,
  ATSOptimizationBoxState: false,
  AISuggestionBoxState: false,
  addSectionBoxState: false,
  mobileTemplateBoxState: false,
  mobileDesignAndFontBoxState: false,
  mobileATSOptimizationBoxState: false,
  mobileAISuggestionBoxState: false,
  linkedInImportBoxState: false,
};

const resumeFeatureSlice = createSlice({
  name: "resumeFeature",
  initialState,
  reducers: {
    setTemplateBoxState: (state, action: PayloadAction<boolean>) => {
      state.templateBoxState = action.payload;
    },
    setDesignAndFontBoxState: (state, action: PayloadAction<boolean>) => {
      state.designAndFontBoxState = action.payload;
    },
    setATSOptimizationBoxState: (state, action: PayloadAction<boolean>) => {
      state.ATSOptimizationBoxState = action.payload;
    },
    setAISuggestionBoxState: (state, action: PayloadAction<boolean>) => {
      state.AISuggestionBoxState = action.payload;
    },
    setAddSectionBoxState: (state, action: PayloadAction<boolean>) => {
      state.addSectionBoxState = action.payload;
    },
    setMobileTemplateBoxState: (state, action: PayloadAction<boolean>) => {
      state.mobileTemplateBoxState = action.payload;
    },
    setMobileDesignAndFontBoxState: (state, action: PayloadAction<boolean>) => {
      state.mobileDesignAndFontBoxState = action.payload;
    },
    setMobileATSOptimizationBoxState: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.mobileATSOptimizationBoxState = action.payload;
    },
    setMobileAISuggestionBoxState: (state, action: PayloadAction<boolean>) => {
      state.mobileAISuggestionBoxState = action.payload;
    },
    setLinkedInImportBoxState: (state, action: PayloadAction<boolean>) => {
      state.linkedInImportBoxState = action.payload;
    },
  },
});

export const {
  setTemplateBoxState,
  setDesignAndFontBoxState,
  setATSOptimizationBoxState,
  setAISuggestionBoxState,
  setAddSectionBoxState,
  setMobileTemplateBoxState,
  setMobileDesignAndFontBoxState,
  setMobileATSOptimizationBoxState,
  setMobileAISuggestionBoxState,
  setLinkedInImportBoxState,
} = resumeFeatureSlice.actions;

export default resumeFeatureSlice.reducer;
