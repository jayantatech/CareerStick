// "use client";
// import React, { memo, useState, useEffect } from "react";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import ResumePDF from "../sections/resumes/ResumePreview";

// import { MdOutlineCloudDownload } from "react-icons/md";
// import TempletTwo from "./templets/TempletTwo";
// // import TemplateThree from "./templets/TemplateThree";
// // Import other templates as needed
// import { useAppSelector } from "@/lib/store/hooks";
// // import { ResumeState } from "@/lib/types/resumeInput";
// import { ResumeState } from "@/lib/types/resumeInput";
// import TemplateThree from "./templets/TemplateThree";
// import TemplateFour from "./templets/TemplateFour";

// const LoadingButton = memo(() => (
//   <button disabled className="font-semibold">
//     Loading...
//   </button>
// ));
// LoadingButton.displayName = "LoadingButton";

// const DownloadButton = memo(() => (
//   <div className="flex items-center gap-1">
//     <MdOutlineCloudDownload className="text-[20px] -mt-0.5" />
//     <span className="font-heading font-semibold text-[16px]">Download</span>
//   </div>
// ));
// DownloadButton.displayName = "DownloadButton";

// // Define template components mapping
// const templateComponents = {
//   default: ResumePDF,
//   template2: TempletTwo,
//   template3: TemplateThree,
//   template4: TemplateFour,
// };

// const DownloadPDF = memo(({ data }: { data: ResumeState }) => {
//   const [isClient, setIsClient] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const currentTemplate = useAppSelector(
//     (state) => state.templateSlice.currentTemplate
//   );
//   const styleConfig = useAppSelector((state) => state.resumeStyle);
//   useEffect(() => {
//     setIsClient(true);
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (!isClient) {
//     return <LoadingButton />;
//   }

//   const TemplateComponent = templateComponents[currentTemplate] || ResumePDF;

//   return (
//     <PDFDownloadLink
//       document={<TemplateComponent data={data} styleConfig={styleConfig} />}
//       fileName="resume.pdf"
//       className="block"
//     >
//       {isLoading ? <LoadingButton /> : <DownloadButton />}
//     </PDFDownloadLink>
//   );
// });

// DownloadPDF.displayName = "DownloadPDF";

// // export default DownloadPDF;
// "use client";
// import React, { memo, useState, useEffect } from "react";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import ResumePDF from "../sections/resumes/ResumePreview";

// import { MdOutlineCloudDownload } from "react-icons/md";
// import TempletTwo from "./templets/TempletTwo";
// // import TemplateThree from "./templets/TemplateThree";
// // Import other templates as needed
// import { useAppSelector } from "@/lib/store/hooks";
// // import { ResumeState } from "@/lib/types/resumeInput";
// import { ResumeState } from "@/lib/types/resumeInput";
// import TemplateThree from "./templets/TemplateThree";
// import TemplateFour from "./templets/TemplateFour";
// import api from "@/lib/api";
// import { TemplateType } from "@/lib/store/slices/templateChangeSlice";
// import useAuth from "@/lib/hooks/useAuth";

// const LoadingButton = memo(() => (
//   <button disabled className="font-semibold">
//     Loading...
//   </button>
// ));
// LoadingButton.displayName = "LoadingButton";

// const DownloadButton = memo(() => (
//   <div className="flex items-center gap-1">
//     <MdOutlineCloudDownload className="text-[20px] -mt-0.5" />
//     <span className="font-heading font-semibold text-[16px]">Download</span>
//   </div>
// ));
// DownloadButton.displayName = "DownloadButton";

// // Define template components mapping
// const templateComponents = {
//   default: ResumePDF,
//   template2: TempletTwo,
//   template3: TemplateThree,
//   template4: TemplateFour,
// };

// const DownloadViewResume = memo(({ data, resumeId }: { data: ResumeState }) => {
//   const [isClient, setIsClient] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeTemplate, setActiveTemplate] = useState<TemplateType>("default");
//   const [styleConfig, setStyleConfig] = useState<any>({});
//   const { isLoading: isUserLoading, user } = useAuth();
//   useEffect(() => {
//     console.log("trying to call fetchResumeStyle");
//     const fetchResumeStyle = async () => {
//       try {
//         console.log("fetchResumeStyle caled");

//         const response = await api.post("/resume/settings", {
//           userId: user?._id,
//           resumeId: resumeId,
//         });
//         console.log("response.data for fetchResumeStyle", response.data);
//         if (response.data.success) {
//           setStyleConfig(response.data.settings);
//         }
//       } catch (error) {
//         console.error("Error fetching resume style:", error);
//       }
//     };
//     if (user?._id || resume._id) {
//       console.log("funcation is ok", user?._id, resumeId);
//       fetchResumeStyle();
//     }
//   }, [resume, !isLoading, resumeId, user?._id]);
//   const TemplateComponent = templateComponents[currentTemplate] || ResumePDF;

//   return (
//     <PDFDownloadLink
//       document={<TemplateComponent data={data} styleConfig={styleConfig} />}
//       fileName="resume.pdf"
//       className="block"
//     >
//       {isLoading ? <LoadingButton /> : <DownloadButton />}
//     </PDFDownloadLink>
//   );
// });

// DownloadPDF.displayName = "DownloadPDF";

// export default DownloadViewResume;

"use client";
import React, { memo, useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../sections/resumes/ResumePreview";
import { MdOutlineCloudDownload } from "react-icons/md";
import TempletTwo from "./templets/TempletTwo";
import TemplateThree from "./templets/TemplateThree";
import TemplateFour from "./templets/TemplateFour";
import api from "@/lib/api";
import useAuth from "@/lib/hooks/useAuth";
import { TemplateType } from "@/lib/store/slices/templateChangeSlice";
import { ResumeState } from "@/lib/types/resumeInput";

// Memoized loading button component
const LoadingButton = memo(() => (
  <button disabled className="font-semibold">
    Loading...
  </button>
));
LoadingButton.displayName = "LoadingButton";

// Memoized download button component
const DownloadButton = memo(() => (
  <div className="flex items-center gap-1">
    <MdOutlineCloudDownload className="text-[20px] -mt-0.5" />
    <span className="font-heading font-semibold text-[16px]">Download</span>
  </div>
));
DownloadButton.displayName = "DownloadButton";

// Template components mapping - matches the view component
const templateComponents: Record<string, React.FC<any>> = {
  default: ResumePDF,
  template2: TempletTwo,
  template3: TemplateThree,
  template4: TemplateFour,
};

interface DownloadViewResumeProps {
  resume: ResumeState;
  resumeId: string;
}

const DownloadViewResume = memo(
  ({ resume, resumeId }: DownloadViewResumeProps) => {
    const [styleConfig, setStyleConfig] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    const { isLoading: isUserLoading, user } = useAuth();
    const [isClient, setIsClient] = useState(false);

    // Set isClient to true on component mount
    // useEffect(() => {
    //   setIsClient(true);
    // }, []);
    useEffect(() => {
      setIsClient(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    // Fetch resume style configuration
    useEffect(() => {
      const fetchResumeStyle = async () => {
        try {
          const response = await api.post("/resume/settings", {
            userId: user?._id,
            resumeId: resumeId,
          });

          if (response.data.success) {
            setStyleConfig(response.data.settings);
          }
        } catch (error) {
          console.error("Error fetching resume style:", error);
        }
      };

      if (user?._id && resumeId) {
        fetchResumeStyle();
      }
    }, [resumeId, user?._id]);

    // Get the appropriate template component
    const TemplateComponent =
      templateComponents[resume.templateName || "default"];

    // Only render on client side
    if (!isClient) {
      return null;
    }

    return (
      <PDFDownloadLink
        document={<TemplateComponent data={resume} styleConfig={styleConfig} />}
        fileName={`${resume.personalInfo?.firstName || "resume"}-${
          new Date().toISOString().split("T")[0]
        }.pdf`}
        className="block"
      >
        {isLoading ? <LoadingButton /> : <DownloadButton />}
      </PDFDownloadLink>
    );
  }
);

DownloadViewResume.displayName = "DownloadViewResume";

export default DownloadViewResume;
