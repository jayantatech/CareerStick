import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// types/resume.ts
export interface JobIndustryData {
  industry: string;
  targetJob: string;
  experience: string;
}

export interface PersonalInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  address: string;
  postalCode: string;
  photo: string | null | File;
}

export interface ProfessionalSummary {
  summaryText: string;
}

export interface ResumeState {
  jobIndustry: JobIndustryData;
  personalInfo: PersonalInformation;
  professionalSummary: ProfessionalSummary;
  isLoading: boolean;
  error: string | null;
}
