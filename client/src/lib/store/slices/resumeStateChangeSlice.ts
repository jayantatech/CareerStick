import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface ResumeStateValue {
  isGetResumeCalled: boolean;
  isAIFeatureRequested: boolean;
}

const initialState: ResumeStateValue = {
  isGetResumeCalled: false,
  isAIFeatureRequested: false,
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
  },
});

export const { setResumeState, setIsAIFeatureRequested } =
  resumeStateChangeSlice.actions;

export default resumeStateChangeSlice.reducer;
