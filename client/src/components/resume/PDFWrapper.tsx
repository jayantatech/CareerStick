// import { PDFViewer } from "@react-pdf/renderer";
// import ResumePDF from "../sections/resumes/ResumePreview";
// import TempletTwo from "./templets/TempletTwo";
// import { useAppSelector } from "@/lib/store/hooks";
// import { ResumeState } from "@/lib/types/resumeInput";
// import TemplateThree from "./templets/TemplateThree";
// import TemplateFour from "./templets/TemplateFour";
// import { useEffect, useState } from "react";
// import {
//   setCurrentTemplate,
//   TemplateType,
// } from "@/lib/store/slices/templateChangeSlice";
// import useAuth from "@/lib/hooks/useAuth";
// import { useParams } from "next/navigation";
// import api from "@/lib/api";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";

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
//   const router = useRouter();

//   // console.log("currentTemplate data", data);
//   // Method 1: Using an object to map templates to components
//   const templateComponents = {
//     default: ResumePDF,
//     template2: TempletTwo,
//     template3: TemplateThree,
//     template4: TemplateFour,
//     // Add more templates as needed up to template20
//   };

//   useEffect(() => {
//     setActiveTemplate(currentTemplate);
//   }, [currentTemplate, params?.id]);

//   // useEffect(() => {
//   //   const timer = setTimeout(() => {
//   //     setActiveTemplate(currentTemplate);
//   //     console.log("the current code is", currentTemplate);
//   //   }, 1000);
//   //   return () => clearTimeout(timer);
//   // }, [currentTemplate, params?.id]);
//   const validateResumeId = (
//     id: string | string[] | undefined
//   ): id is string => {
//     return typeof id === "string" && id.length === 24;
//   };

//   useEffect(() => {
//     if (!validateResumeId(params?.id)) return;
//     if (!user?._id) return;
//     // console.log("Fetching resume template name....");

//     const fetchResumeTemplateName = async () => {
//       try {
//         const response = await api.post(
//           `/resume/get-resume-template/${params?.id}`,
//           {
//             userId: user._id,
//           }
//         );
//         // console.log("response.data for resume template name", response.data);
//         if (response.data.success && response.data.templateName) {
//           setActiveTemplate(response.data.templateName);
//           dispatch(setCurrentTemplate(response.data.templateName));
//         }
//       } catch (error) {
//         console.log("Error fetching resume template name:", error);
//       }
//     };
//     if (!isLoading) {
//       fetchResumeTemplateName();
//     }
//   }, [params?.id, !isLoading, router, user?._id]);

//   const TemplateComponent =
//     templateComponents[activeTemplate] || templateComponents["template3"];

//   return (
//     <PDFViewer
//       className="w-full h-full border-none aspect-[1/1.41] bg-white"
//       showToolbar={false}
//       // height={"100%"}
//       // width={"900px"}
//       style={{ backgroundColor: "white" }}
//     >
//       <TemplateComponent styleConfig={styleConfig} data={data} />
//     </PDFViewer>
//   );
// };

// export default PDFWrapper;

import { PDFViewer } from "@react-pdf/renderer";
import ResumePDF from "../sections/resumes/ResumePreview";
import TempletTwo from "./templets/TempletTwo";
import { useAppSelector } from "@/lib/store/hooks";
import { ResumeState } from "@/lib/types/resumeInput";
import TemplateThree from "./templets/TemplateThree";
import TemplateFour from "./templets/TemplateFour";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  setCurrentTemplate,
  TemplateType,
} from "@/lib/store/slices/templateChangeSlice";
import useAuth from "@/lib/hooks/useAuth";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { useDispatch } from "react-redux";

interface PDFWrapperProps {
  data: ResumeState;
}

const PDFWrapper = ({ data }: PDFWrapperProps) => {
  const [activeTemplate, setActiveTemplate] =
    useState<TemplateType>("template3");
  const { isLoading, user } = useAuth();
  const currentTemplate = useAppSelector(
    (state) => state.templateSlice.currentTemplate
  );
  const styleConfig = useAppSelector((state) => state.resumeStyle);
  const params = useParams();
  const dispatch = useDispatch();

  // Memoized template components mapping
  const templateComponents = useMemo(
    () => ({
      default: ResumePDF,
      template2: TempletTwo,
      template3: TemplateThree,
      template4: TemplateFour,
      // Add more templates as needed up to template20
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

  // Fetching resume template name
  useEffect(() => {
    const fetchTemplateIfPossible = async () => {
      if (!validateResumeId(params?.id) || !user?._id || isLoading) return;

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
  }, [params?.id, user?._id, isLoading, dispatch, validateResumeId]);

  // Update active template when current template changes
  useEffect(() => {
    setActiveTemplate(currentTemplate);
  }, [currentTemplate]);

  // Select the appropriate template component
  const TemplateComponent = useMemo(
    () => templateComponents[activeTemplate] || templateComponents["template3"],
    [activeTemplate, templateComponents]
  );

  return (
    <PDFViewer
      className="w-full h-full border-none aspect-[1/1.41] bg-white"
      showToolbar={false}
      style={{ backgroundColor: "white" }}
    >
      <TemplateComponent styleConfig={styleConfig} data={data} />
    </PDFViewer>
  );
};

export default PDFWrapper;
