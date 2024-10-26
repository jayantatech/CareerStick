"use client";
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  gpa: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}
import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
// import { ResumePDF } from "./ResumePDF";

// import type { ResumeData } from "./types";
// import { ResumePDF } from "../sections/resumes/ResumePreview";

// import { ResumeState } from "@/lib/store/hooks";
import ResumePDF from "../sections/resumes/ResumePreview";
import { ResumeState } from "@/lib/store/slices/resumeSlice";

// interface PDFWrapperProps {
//   data: any;
// }

const PDFWrapper = ({ data }: { data: ResumeState }) => {
  return (
    <PDFViewer
      className="w-full h-full border-none bg-white"
      showToolbar={false}
      height={"100%"}
      width={"812px"}
      style={{ backgroundColor: "white" }}
    >
      <ResumePDF data={data} />
    </PDFViewer>
  );
};

export default PDFWrapper;
