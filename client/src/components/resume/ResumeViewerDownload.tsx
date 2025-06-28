"use client";
import React, { memo, useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import api from "@/lib/api";
import useAuth from "@/lib/hooks/useAuth";
import { ResumeState } from "@/lib/types/resumeInput";
import { IResumeStyleState } from "@/lib/store/slices/resumeStyle";
import dynamic from "next/dynamic";
import DownloadPDF from "./DownloadPDF";

// Dynamic imports for templates
// const TemplateOne = dynamic(() => import("../resumeTemplates/TemplateOne"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });

const TemplateThree = dynamic(
  () => import("../resumeTemplates/TemplateThree"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

// const TemplateFour = dynamic(() => import("../resumeTemplates/TemplateFour"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });

// const TemplateFive = dynamic(() => import("../resumeTemplates/TemplateFive"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });

// type TemplateComponentProps = {
//   data: ResumeState;
//   styleConfig: IResumeStyleState;
//   isMultiPage: boolean;
// };

// Template components mapping
// const templateComponents: Record<string, React.FC<TemplateComponentProps>> = {
//   // default: ResumePDF as React.FC<TemplateComponentProps>,
//   // template1: TemplateOne as React.FC<TemplateComponentProps>,
//   // template2: TemplateOne as React.FC<TemplateComponentProps>,
//   // template3: TemplateThree as React.FC<TemplateComponentProps>,
//   // template4: TemplateFour as React.FC<TemplateComponentProps>,
//   // template5: TemplateFive as React.FC<TemplateComponentProps>,
//   template1: TemplateThree as React.FC<TemplateComponentProps>,
//   template2: TemplateThree as React.FC<TemplateComponentProps>,
//   template3: TemplateThree as React.FC<TemplateComponentProps>,
//   template4: TemplateThree as React.FC<TemplateComponentProps>,
//   template5: TemplateThree as React.FC<TemplateComponentProps>,
// };

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
    const { user } = useAuth();
    const [isClient, setIsClient] = useState(false);
    const dispatch = useAppDispatch();

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

    // Effect to update template code in Redux store
    useEffect(() => {
      if (resume && styleConfig && !isLoading) {
        // const TemplateComponent =
        //   templateComponents[resume.templateName || "default"];
        // Generate the template code and dispatch to Redux
        // const templateCode = (
        // <TemplateComponent
        //   isMultiPage={true}
        //   data={resume}
        //   styleConfig={styleConfig}
        //   isDownloadRequested={true}
        // />;
        <TemplateThree
          data={resume}
          styleConfig={styleConfig}
          isDownloadRequested={true}
        />;
        // );
        // dispatch(setCodeToGenerate(templateCode));
      }
    }, [resume, styleConfig, isLoading, dispatch]);

    <TemplateThree
      data={resume}
      styleConfig={styleConfig}
      isDownloadRequested={true}
    />;

    if (!isClient) {
      return null;
    }

    return <DownloadPDF resume={resume} />;
  }
);

DownloadViewResume.displayName = "DownloadViewResume";

export default DownloadViewResume;

// "use client";

// import { useState } from "react";
// import { memo } from "react";

// import { useAppDispatch } from "@/lib/store/hooks";
// import { setCodeToGenerate } from "@/lib/store/slices/resumeDownloadSlice";
// import { ResumeState } from "@/lib/types/resumeInput";
// import { IResumeStyleState } from "@/lib/store/slices/resumeStyle";
// import TemplateThree from "../resumeTemplates/TemplateThree";
// import DownloadPDF from "./DownloadPDF";

// interface DownloadViewResumeProps {
//   resume: ResumeState;
//   resumeId: string;
// }

// const DownloadViewResume = memo(
//   ({ resume, resumeId }: DownloadViewResumeProps) => {
//     const [styleConfig, setStyleConfig] = useState<IResumeStyleState>(
//       {} as IResumeStyleState
//     );
//     const [templateContent, setTemplateContent] = useState<string>("");
//     const dispatch = useAppDispatch();

//     // Handle template content updates
//     const handleContentChange = (content: string) => {
//       console.log("content changed to generate", content);
//       setTemplateContent(content);
//       dispatch(setCodeToGenerate(content));
//     };

//     return (
//       <>
//         <div className="w-full h-full absolute left-0 top-0 opacity-80 z-30">
//           <TemplateThree
//             data={resume}
//             styleConfig={styleConfig}
//             isDownloadRequested={true}
//             onContentChange={handleContentChange}
//           />
//         </div>
//         {templateContent && <DownloadPDF resume={resume} />}
//       </>
//     );
//   }
// );

// DownloadViewResume.displayName = "DownloadViewResume";

// export default DownloadViewResume;
