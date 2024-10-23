// types/resume.ts
export interface MonthYearDate {
  month: string;
  year: string;
}

export interface JobExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: MonthYearDate;
  endDate: MonthYearDate;
  isCurrentJob: boolean;
  location: string;
  description: string;
}

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
  workExperience: JobExperience[];
  isLoading: boolean;
  error: null | string;
}
