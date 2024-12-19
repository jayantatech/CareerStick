import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface ResumeStateValue {
  isGetResumeCalled: boolean;
  isAIFeatureRequested: boolean;
  isTargetJobAndIndustrySelected: boolean;
  updateTargetJobAndIndustrySelected: boolean;
}

const initialState: ResumeStateValue = {
  isGetResumeCalled: false,
  isAIFeatureRequested: false,
  isTargetJobAndIndustrySelected: true,
  updateTargetJobAndIndustrySelected: false,
};
export const resumeStateChangeSlice = createSlice({
  name: "resumeStateChange",
  initialState,
  reducers: {
    setResumeState: (state, action: PayloadAction<boolean>) => {
      state.isGetResumeCalled = action.payload;
    },
    setIsAIFeatureRequested: (state, action: PayloadAction<boolean>) => {
      state.isAIFeatureRequested = action.payload;
    },
    setTargetJobAndIndustrySelected: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isTargetJobAndIndustrySelected = action.payload;
    },
    setUpdateTargetJobAndIndustrySelected: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.updateTargetJobAndIndustrySelected = action.payload;
    },
  },
});

export const {
  setResumeState,
  setIsAIFeatureRequested,
  setTargetJobAndIndustrySelected,
  setUpdateTargetJobAndIndustrySelected,
} = resumeStateChangeSlice.actions;

export default resumeStateChangeSlice.reducer;
