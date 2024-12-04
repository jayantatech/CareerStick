// "use client";
// import React, { memo, useState, useEffect } from "react";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import ResumePDF from "../sections/resumes/ResumePreview";
// import { MdOutlineCloudDownload } from "react-icons/md";
// import TempletTwo from "./templets/TempletTwo";
// import TemplateThree from "./templets/TemplateThree";
// import TemplateFour from "./templets/TemplateFour";
// import api from "@/lib/api";
// import useAuth from "@/lib/hooks/useAuth";
// import { ResumeState } from "@/lib/types/resumeInput";

// // Memoized loading button component
// const LoadingButton = memo(() => (
//   <button disabled className="font-semibold">
//     Loading...
//   </button>
// ));
// LoadingButton.displayName = "LoadingButton";

// // Memoized download button component
// const DownloadButton = memo(() => (
//   <div className="flex items-center gap-1">
//     <MdOutlineCloudDownload className="text-[20px] -mt-0.5" />
//     <span className="font-heading font-semibold text-[16px]">Download</span>
//   </div>
// ));
// DownloadButton.displayName = "DownloadButton";

// // Template components mapping - matches the view component
// const templateComponents: Record<string, React.FC<any>> = {
//   default: ResumePDF,
//   template2: TempletTwo,
//   template3: TemplateThree,
//   template4: TemplateFour,
// };

// interface DownloadViewResumeProps {
//   resume: ResumeState;
//   resumeId: string;
// }

// const DownloadViewResume = memo(
//   ({ resume, resumeId }: DownloadViewResumeProps) => {
//     const [styleConfig, setStyleConfig] = useState<any>({});
//     const [isLoading, setIsLoading] = useState(true);
//     const { isLoading: isUserLoading, user } = useAuth();
//     const [isClient, setIsClient] = useState(false);

//     // Set isClient to true on component mount
//     // useEffect(() => {
//     //   setIsClient(true);
//     // }, []);
//     useEffect(() => {
//       setIsClient(true);
//       const timer = setTimeout(() => {
//         setIsLoading(false);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }, []);

//     // Fetch resume style configuration
//     useEffect(() => {
//       const fetchResumeStyle = async () => {
//         if (!user?._id || isUserLoading) return;
//         try {
//           const response = await api.post("/resume/settings", {
//             userId: user?._id,
//             resumeId: resumeId,
//           });

//           if (response.data.success) {
//             setStyleConfig(response.data.settings);
//           }
//         } catch (error) {
//           console.error("Error fetching resume style:", error);
//         }
//       };

//       if (user?._id && resumeId) {
//         fetchResumeStyle();
//       }
//     }, [resumeId, user?._id, isUserLoading]);

//     // Get the appropriate template component
//     const TemplateComponent =
//       templateComponents[resume.templateName || "default"];

//     // Only render on client side
//     if (!isClient) {
//       return null;
//     }

//     return (
//       <PDFDownloadLink
//         document={<TemplateComponent data={resume} styleConfig={styleConfig} />}
//         fileName={`${resume.personalInfo?.firstName || "resume"}-${
//           new Date().toISOString().split("T")[0]
//         }.pdf`}
//         className="block"
//       >
//         {isLoading ? <LoadingButton /> : <DownloadButton />}
//       </PDFDownloadLink>
//     );
//   }
// );

// DownloadViewResume.displayName = "DownloadViewResume";

// export default DownloadViewResume;

"use client";
import React, { memo, useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MdOutlineCloudDownload } from "react-icons/md";

import ResumePDF from "../sections/resumes/ResumePreview";
import TempletTwo from "./templets/TempletTwo";
import TemplateThree from "./templets/TemplateThree";
import TemplateFour from "./templets/TemplateFour";
import api from "@/lib/api";
import useAuth from "@/lib/hooks/useAuth";
import { ResumeState } from "@/lib/types/resumeInput";
import { IResumeStyleState } from "@/lib/store/slices/resumeStyle";
// import { StyleConfig } from "@/lib/types/styleConfig"; // Assuming you have this type defined

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

// Define a more specific type for template components
type TemplateComponentProps = {
  data: ResumeState;
  styleConfig: IResumeStyleState;
};

// Template components mapping
const templateComponents: Record<string, React.FC<TemplateComponentProps>> = {
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
    const [styleConfig, setStyleConfig] = useState<IResumeStyleState>(
      {} as IResumeStyleState
    );
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth(); // Removed unused isLoading
    const [isClient, setIsClient] = useState(false);

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
        if (!user?._id) return;
        try {
          const response = await api.post("/resume/settings", {
            userId: user._id,
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
