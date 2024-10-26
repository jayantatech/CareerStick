// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./slices/resumeSlice";
import activeResumeSectionSlice from "./slices/activeResumeSectionClice";
export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    resumeActiveSection: activeResumeSectionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
