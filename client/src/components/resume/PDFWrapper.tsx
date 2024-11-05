// // "use client";
// // export interface PersonalInfo {
// //   name: string;
// //   title: string;
// //   email: string;
// //   phone: string;
// //   location: string;
// //   summary: string;
// // }

// // export interface Experience {
// //   title: string;
// //   company: string;
// //   period: string;
// //   achievements: string[];
// // }

// // export interface Education {
// //   degree: string;
// //   school: string;
// //   period: string;
// //   gpa: string;
// // }

// // export interface Skill {
// //   category: string;
// //   items: string[];
// // }

// // export interface ResumeData {
// //   personalInfo: PersonalInfo;
// //   experience: Experience[];
// //   education: Education[];
// //   skills: Skill[];
// // }
// // import React from "react";
// // import { PDFViewer } from "@react-pdf/renderer";
// // import ResumePDF from "../sections/resumes/ResumePreview";
// // import { ResumeState } from "@/lib/store/slices/resumeSlice";
// // import TempletTwo from "./templets/TempletTwo";

// // const PDFWrapper = ({ data }: { data: ResumeState }) => {
// //   return (
// //     <PDFViewer
// //       className="w-full h-full border-none bg-white"
// //       showToolbar={false}
// //       height={"100%"}
// //       width={"900px"}
// //       style={{ backgroundColor: "white" }}
// //     >
// //       {/* <ResumePDF data={data} /> */}
// //       <TempletTwo data={data} />
// //     </PDFViewer>
// //   );
// // };

// // export default PDFWrapper;

// import { PDFViewer } from "@react-pdf/renderer";
// import { ResumeState } from "@/lib/store/slices/resumeSlice";
// import { TemplateSwitcher } from "./TemplateSwitcher";
// import { useTemplate } from "@/context/TemplateContext";

// interface PDFWrapperProps {
//   data: ResumeState;
// }

// const PDFWrapper = ({ data }: PDFWrapperProps) => {
//   const { currentTemplate } = useTemplate();
//   console.log("Current Template from context menu", currentTemplate);
//   return (
//     <PDFViewer
//       className="w-full h-full border-none bg-white"
//       showToolbar={false}
//       height={"100%"}
//       width={"900px"}
//       style={{ backgroundColor: "white" }}
//     >
//       <TemplateSwitcher data={data} />
//     </PDFViewer>
//   );
// };

// export default PDFWrapper;
// "use client";
// export interface PersonalInfo {
//   name: string;
//   title: string;
//   email: string;
//   phone: string;
//   location: string;
//   summary: string;
// }

// export interface Experience {
//   title: string;
//   company: string;
//   period: string;
//   achievements: string[];
// }

// export interface Education {
//   degree: string;
//   school: string;
//   period: string;
//   gpa: string;
// }

// export interface Skill {
//   category: string;
//   items: string[];
// }

// export interface ResumeData {
//   personalInfo: PersonalInfo;
//   experience: Experience[];
//   education: Education[];
//   skills: Skill[];
// }
// import React from "react";
// import { PDFViewer } from "@react-pdf/renderer";
// import ResumePDF from "../sections/resumes/ResumePreview";
// import { ResumeState } from "@/lib/store/slices/resumeSlice";
// import TempletTwo from "./templets/TempletTwo";

// const PDFWrapper = ({ data }: { data: ResumeState }) => {
//   return (
//     <PDFViewer
//       className="w-full h-full border-none bg-white"
//       showToolbar={false}
//       height={"100%"}
//       width={"900px"}
//       style={{ backgroundColor: "white" }}
//     >
//       {/* <ResumePDF data={data} /> */}
//       <TempletTwo data={data} />
//     </PDFViewer>
//   );
// };

// export default PDFWrapper;

// fully working code
// import { PDFViewer } from "@react-pdf/renderer";
// import { ResumeState } from "@/lib/store/slices/resumeSlice";
// import { TemplateSwitcher } from "./TemplateSwitcher";
// import { useTemplate } from "@/context/TemplateContext";
// import ResumePDF from "../sections/resumes/ResumePreview";
// import TempletTwo from "./templets/TempletTwo";
// import { useAppSelector } from "@/lib/store/hooks";

// interface PDFWrapperProps {
//   data: ResumeState;
// }
// export type TemplateType = "default" | "template2";

// const PDFWrapper = ({ data }: PDFWrapperProps) => {
//   const currentTemplate = useAppSelector(
//     (state) => state.templateSlice.currentTemplate
//   );
//   return (
//     <PDFViewer
//       className="w-full h-full border-none bg-white"
//       showToolbar={false}
//       height={"100%"}
//       width={"900px"}
//       style={{ backgroundColor: "white" }}
//     >
//       {currentTemplate === "default" ? (
//         <ResumePDF data={data} />
//       ) : (
//         <TempletTwo data={data} />
//       )}
//     </PDFViewer>
//   );
// };

// export default PDFWrapper;

import { PDFViewer } from "@react-pdf/renderer";
// import { ResumeState } from "@/lib/store/slices/resumeSlice";

import ResumePDF from "../sections/resumes/ResumePreview";
import TempletTwo from "./templets/TempletTwo";
// import TemplateThree from "./templets/TemplateThree";
// Import other templates...
import { useAppSelector } from "@/lib/store/hooks";
import { ResumeState } from "@/lib/types/resumeInput";

interface PDFWrapperProps {
  data: ResumeState;
}

const PDFWrapper = ({ data }: PDFWrapperProps) => {
  const currentTemplate = useAppSelector(
    (state) => state.templateSlice.currentTemplate
  );

  // Method 1: Using an object to map templates to components
  const templateComponents = {
    default: ResumePDF,
    template2: TempletTwo,
    // template3: TemplateThree,
    // Add more templates as needed up to template20
  };

  // Get the component for the current template, fallback to default if not found
  const TemplateComponent = templateComponents[currentTemplate] || ResumePDF;

  return (
    <PDFViewer
      className="w-full h-full border-none aspect-[1/1.41] bg-white"
      showToolbar={false}
      // height={"100%"}
      // width={"900px"}
      style={{ backgroundColor: "white" }}
    >
      <TemplateComponent data={data} />
    </PDFViewer>
  );
};

export default PDFWrapper;
