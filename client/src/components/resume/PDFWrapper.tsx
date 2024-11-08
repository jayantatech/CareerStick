import { PDFViewer } from "@react-pdf/renderer";
// import { ResumeState } from "@/lib/store/slices/resumeSlice";

import ResumePDF from "../sections/resumes/ResumePreview";
import TempletTwo from "./templets/TempletTwo";
// import TemplateThree from "./templets/TemplateThree";
// Import other templates...
import { useAppSelector } from "@/lib/store/hooks";
import { ResumeState } from "@/lib/types/resumeInput";
import TemplateThree from "./templets/TemplateThree";

interface PDFWrapperProps {
  data: ResumeState;
}

const PDFWrapper = ({ data }: PDFWrapperProps) => {
  const currentTemplate = useAppSelector(
    (state) => state.templateSlice.currentTemplate
  );
  const styleConfig = useAppSelector((state) => state.resumeStyle);

  // console.log("currentTemplate data", data);
  // Method 1: Using an object to map templates to components
  const templateComponents = {
    default: ResumePDF,
    template2: TempletTwo,
    template3: TemplateThree,
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
      <TemplateComponent styleConfig={styleConfig} data={data} />
    </PDFViewer>
  );
};

export default PDFWrapper;
