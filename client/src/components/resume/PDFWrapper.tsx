// import { PDFViewer } from "@react-pdf/renderer";
// import ResumePDF from "../sections/resumes/ResumePreview";
// import TempletTwo from "./templets/TempletTwo";
// import { useAppSelector } from "@/lib/store/hooks";
// import { ResumeState } from "@/lib/types/resumeInput";
// import TemplateThree from "./templets/TemplateThree";
// import TemplateFour from "./templets/TemplateFour";
// import { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   setCurrentTemplate,
//   TemplateType,
// } from "@/lib/store/slices/templateChangeSlice";
// import useAuth from "@/lib/hooks/useAuth";
// import { useParams } from "next/navigation";
// import api from "@/lib/api";
// import { useDispatch } from "react-redux";

// interface PDFWrapperProps {
//   data: ResumeState;
// }

// const PDFWrapper = ({ data }: PDFWrapperProps) => {
//   const [activeTemplate, setActiveTemplate] =
//     useState<TemplateType>("template3");
//   const { isLoading, user } = useAuth();
//   const currentTemplate = useAppSelector(
//     (state) => state.templateSlice.currentTemplate
//   );
//   const styleConfig = useAppSelector((state) => state.resumeStyle);
//   const params = useParams();
//   const dispatch = useDispatch();

//   // Memoized template components mapping
//   const templateComponents = useMemo(
//     () => ({
//       default: ResumePDF,
//       template2: TempletTwo,
//       template3: TemplateThree,
//       template4: TemplateFour,
//       // Add more templates as needed up to template20
//     }),
//     []
//   );

//   // Memoized validation function
//   const validateResumeId = useCallback(
//     (id: string | string[] | undefined): id is string => {
//       return typeof id === "string" && id.length === 24;
//     },
//     []
//   );

//   // Fetching resume template name
//   useEffect(() => {
//     const fetchTemplateIfPossible = async () => {
//       if (!validateResumeId(params?.id) || !user?._id || isLoading) return;

//       try {
//         const response = await api.post(
//           `/resume/get-resume-template/${params?.id}`,
//           {
//             userId: user._id,
//           }
//         );

//         if (response.data.success && response.data.templateName) {
//           const fetchedTemplateName = response.data.templateName;
//           setActiveTemplate(fetchedTemplateName);
//           dispatch(setCurrentTemplate(fetchedTemplateName));
//         }
//       } catch (error) {
//         console.error("Error fetching resume template name:", error);
//       }
//     };

//     fetchTemplateIfPossible();
//   }, [params?.id, user?._id, isLoading, dispatch, validateResumeId]);

//   // Update active template when current template changes
//   useEffect(() => {
//     setActiveTemplate(currentTemplate);
//   }, [currentTemplate]);

//   // Select the appropriate template component
//   const TemplateComponent = useMemo(
//     () => templateComponents[activeTemplate] || templateComponents["template3"],
//     [activeTemplate, templateComponents]
//   );

//   return (
//     <PDFViewer
//       className="w-full h-full border-none aspect-[1/1.41] bg-white"
//       showToolbar={false}
//       style={{ backgroundColor: "white" }}
//     >
//       <TemplateComponent styleConfig={styleConfig} data={data} />
//     </PDFViewer>
//   );
// };

// export default PDFWrapper;

"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { ResumeState } from "@/lib/types/resumeInput";
import {
  setCurrentTemplate,
  TemplateType,
} from "@/lib/store/slices/templateChangeSlice";
import useAuth from "@/lib/hooks/useAuth";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { useDispatch } from "react-redux";
import TempletTwo from "./templets/TempletTwo";
// import TemplateThree from "./templets/TemplateThree";
// TemplateThree
// import TemplateFour from "./templets/TemplateFour";
import TemplateThree from "../resumeTemplates/TemplateThree";
import TemplateOne from "../resumeTemplates/TemplateOne";
import TemplateFour from "../resumeTemplates/TemplateFour";
import TemplateFive from "../resumeTemplates/TemplateFive";

interface PDFWrapperProps {
  data: ResumeState;
}

const PDFWrapper = ({ data }: PDFWrapperProps) => {
  const [activeTemplate, setActiveTemplate] =
    useState<TemplateType>("template3");
  // const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const currentTemplate = useAppSelector(
    (state) => state.templateSlice.currentTemplate
  );
  const styleConfig = useAppSelector((state) => state.resumeStyle);
  const params = useParams();
  const dispatch = useDispatch();

  // Memoized template components mapping
  const templateComponents = useMemo(
    () => ({
      // default: ResumePDF,
      default: TemplateOne,
      template1: TemplateOne,
      template2: TempletTwo,
      template3: TemplateThree,
      template4: TemplateFour, //working
      template5: TemplateFive, //working
      // template6: TemplateSix,
    }),
    []
  );

  // Memoized validation function
  const validateResumeId = useCallback(
    (id: string | string[] | undefined): id is string => {
      return typeof id === "string" && id.length === 24;
    },
    []
  );

  // Generate PDF function
  // const generatePDF = useCallback(async () => {
  //   if (!validateResumeId(params?.id) || !user?._id) return;

  //   // setIsLoading(true);
  //   try {
  //     const response = await api.post("/api/generate-pdf", {
  //       userId: user._id,
  //       resumeId: params.id,
  //       templateName: activeTemplate,
  //       data,
  //       styleConfig,
  //     });

  //     if (response.data.success && response.data.pdfUrl) {
  //       setPdfUrl(response.data.pdfUrl);
  //     }
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // }, [params?.id, user?._id, activeTemplate, data, styleConfig]);

  // Fetch template name on component mount
  useEffect(() => {
    const fetchTemplateIfPossible = async () => {
      if (!validateResumeId(params?.id) || !user?._id) return;

      try {
        const response = await api.post(
          `/resume/get-resume-template/${params?.id}`,
          {
            userId: user._id,
          }
        );

        if (response.data.success && response.data.templateName) {
          const fetchedTemplateName = response.data.templateName;
          setActiveTemplate(fetchedTemplateName);
          dispatch(setCurrentTemplate(fetchedTemplateName));
        }
      } catch (error) {
        console.error("Error fetching resume template name:", error);
      }
    };

    fetchTemplateIfPossible();
  }, [params?.id, user?._id, dispatch, validateResumeId]);

  // Update active template when current template changes
  useEffect(() => {
    setActiveTemplate(currentTemplate);
  }, [currentTemplate]);

  // Generate PDF when template or data changes
  // useEffect(() => {
  //   generatePDF();
  // }, [generatePDF]);

  const TemplateComponent =
    templateComponents[activeTemplate] || templateComponents["template3"];

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-full flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  //     </div>
  //   );
  // }

  return (
    // <div className="w-full h-full ">
    //   {/* {pdfUrl ? (
    //     <iframe
    //       src={pdfUrl}
    //       className="w-full h-full border-none aspect-[1/1.41]"
    //       title="Resume PDF Preview"
    //     />
    //   ) : (
    //   )} */}
    // </div>
    <TemplateComponent
      styleConfig={styleConfig}
      data={data}
      isMultiPage={true}
    />
  );
};

export default PDFWrapper;
