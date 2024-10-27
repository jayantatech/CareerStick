import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface resumeFeatureState {
  templateBoxState: boolean;
}

const initialState: resumeFeatureState = {
  templateBoxState: false,
};

const resumeFeatureSlice = createSlice({
  name: "resumeFeature",
  initialState,
  reducers: {
    setTemplateBoxState: (state, action: PayloadAction<boolean>) => {
      state.templateBoxState = action.payload;
    },
  },
});

export const { setTemplateBoxState } = resumeFeatureSlice.actions;

export default resumeFeatureSlice.reducer;
