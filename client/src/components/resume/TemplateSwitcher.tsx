// // import { ResumeState } from "@/lib/store/slices/resumeSlice";
// // import ResumePDF from "./ResumePDF";
// // import TempletTwo from "./TempletTwo";
// import { useTemplate } from "@/context/TemplateContext";
// import ResumePDF from "../sections/resumes/ResumePreview";
// import TempletTwo from "./templets/TempletTwo";
// import { useEffect } from "react";
// import { ResumeState } from "@/lib/types/resumeInput";

// interface TemplateSwitcherProps {
//   data: ResumeState;
// }

// export const TemplateSwitcher = ({ data }: TemplateSwitcherProps) => {
//   const { currentTemplate } = useTemplate();

//   const templates = {
//     default: ResumePDF,
//     template2: TempletTwo,
//   };

//   console.log(
//     "Current Template from context on data change outside:",
//     currentTemplate
//   );
//   useEffect(() => {
//     console.log(
//       "Current Template from context on data change:",
//       currentTemplate
//     );
//   }, [currentTemplate]);

//   const SelectedTemplate = templates[currentTemplate];
//   return <SelectedTemplate data={data} />;
// };
