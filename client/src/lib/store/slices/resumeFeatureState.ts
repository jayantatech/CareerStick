import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface resumeFeatureState {
  templateBoxState: boolean;
  designAndFontBoxState: boolean;
  ATSOptimizationBoxState: boolean;
  AISuggestionBoxState: boolean;
}

const initialState: resumeFeatureState = {
  templateBoxState: false,
  designAndFontBoxState: false,
  ATSOptimizationBoxState: false,
  AISuggestionBoxState: false,
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
  },
});

export const {
  setTemplateBoxState,
  setDesignAndFontBoxState,
  setATSOptimizationBoxState,
  setAISuggestionBoxState,
} = resumeFeatureSlice.actions;

export default resumeFeatureSlice.reducer;
