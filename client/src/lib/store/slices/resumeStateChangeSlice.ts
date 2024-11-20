import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface ResumeStateValue {
  isGetResumeCalled: boolean;
}

const initialState: ResumeStateValue = {
  isGetResumeCalled: false,
};
export const resumeStateChangeSlice = createSlice({
  name: "resumeStateChange",
  initialState,
  reducers: {
    setResumeState: (state, action: PayloadAction<boolean>) => {
      state.isGetResumeCalled = action.payload;
    },
  },
});

export const { setResumeState } = resumeStateChangeSlice.actions;

export default resumeStateChangeSlice.reducer;
