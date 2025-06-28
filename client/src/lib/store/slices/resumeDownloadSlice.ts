import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for our style options

// Define the initial state
export interface ResumeDownloadState {
  isDownloadRequested: boolean;
  templateCode: string | null;
}

const initialState: ResumeDownloadState = {
  isDownloadRequested: false,
  templateCode: null,
};

const resumeDownloadSlice = createSlice({
  name: "generalSettings",
  initialState,
  reducers: {
    setDownloadRequest: (state, action: PayloadAction<boolean>) => {
      state.isDownloadRequested = action.payload;
    },
    setCodeToGenerate: (state, action: PayloadAction<string | null>) => {
      state.templateCode = action.payload;
    },
  },
});

export const { setDownloadRequest, setCodeToGenerate } =
  resumeDownloadSlice.actions;

export default resumeDownloadSlice.reducer;
