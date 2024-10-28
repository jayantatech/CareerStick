// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./slices/resumeSlice";
import activeResumeSectionSlice from "./slices/activeResumeSectionClice";
import resumeFeatureSlice from "./slices/resumeFeatureState";
import templateSlice from "./slices/templateChangeSlice";
export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    resumeActiveSection: activeResumeSectionSlice,
    resumeFeatureState: resumeFeatureSlice,
    templateSlice: templateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
