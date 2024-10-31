import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface resumeFeatureState {
  templateBoxState: boolean;
  designAndFontBoxState: boolean;
  ATSOptimizationBoxState: boolean;
  AISuggestionBoxState: boolean;
  mobileTemplateBoxState: boolean;
  mobileDesignAndFontBoxState: boolean;
  mobileATSOptimizationBoxState: boolean;
  mobileAISuggestionBoxState: boolean;
}

const initialState: resumeFeatureState = {
  templateBoxState: false,
  designAndFontBoxState: false,
  ATSOptimizationBoxState: false,
  AISuggestionBoxState: false,
  mobileTemplateBoxState: false,
  mobileDesignAndFontBoxState: false,
  mobileATSOptimizationBoxState: false,
  mobileAISuggestionBoxState: false,
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
  },
});

export const {
  setTemplateBoxState,
  setDesignAndFontBoxState,
  setATSOptimizationBoxState,
  setAISuggestionBoxState,
  setMobileTemplateBoxState,
  setMobileDesignAndFontBoxState,
  setMobileATSOptimizationBoxState,
  setMobileAISuggestionBoxState,
} = resumeFeatureSlice.actions;

export default resumeFeatureSlice.reducer;
