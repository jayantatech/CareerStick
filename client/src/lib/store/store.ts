// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./slices/resumeSlice";
import activeResumeSectionSlice from "./slices/activeResumeSectionClice";
import resumeFeatureSlice from "./slices/resumeFeatureState";
import templateSlice from "./slices/templateChangeSlice";
import resumeSettingsSlice from "./slices/resumeSettingsSlice";
import resumeStyleSlice from "./slices/resumeStyle";
import resumeStateChangeSlice from "./slices/resumeStateChangeSlice";
export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    resumeActiveSection: activeResumeSectionSlice,
    resumeFeatureState: resumeFeatureSlice,
    templateSlice: templateSlice,
    resumeSettings: resumeSettingsSlice,
    resumeStyle: resumeStyleSlice,
    resumeSateChange: resumeStateChangeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
