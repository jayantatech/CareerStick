import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { ResumeSettings } from "../../types/resumeSettings";
import api from "@/lib/api";
import { IResumeSettings } from "@/lib/types/resumeSettings";

interface ResumeSettingsState {
  settings: IResumeSettings | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResumeSettingsState = {
  settings: null,
  loading: false,
  error: null,
};

export const fetchResumeSettings = createAsyncThunk(
  "resumeSettings/fetch",
  async (resumeId: string) => {
    const response = await api.get(`/get-settings/${resumeId}`);
    return response.data.settings;
  }
);

export const updateResumeSettings = createAsyncThunk(
  "resumeSettings/update",
  async ({
    resumeId,
    updateData,
  }: {
    resumeId: string;
    updateData: Partial<IResumeSettings>;
  }) => {
    const response = await api.post("/resume/settings/update", {
      resumeId,
      updateData,
    });
    return response.data.settings;
  }
);

export const resetResumeSettings = createAsyncThunk(
  "resumeSettings/reset",
  async (resumeId: string) => {
    const response = await api.post(`/resume/settings/reset/${resumeId}`);
    return response.data.settings;
  }
);

const resumeSettingsSlice = createSlice({
  name: "resumeSettings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch settings
      .addCase(fetchResumeSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumeSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchResumeSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch settings";
      })
      // Update settings
      .addCase(updateResumeSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateResumeSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(updateResumeSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update settings";
      })
      // Reset settings
      .addCase(resetResumeSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetResumeSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(resetResumeSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to reset settings";
      });
  },
});

export default resumeSettingsSlice.reducer;
