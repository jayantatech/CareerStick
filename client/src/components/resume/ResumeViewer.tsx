"use client";

import React, { useEffect, useMemo, useState } from "react";
import TempletTwo from "./templets/TempletTwo";
import TemplateThree from "./templets/TemplateThree";
import TemplateFour from "./templets/TemplateFour";
import api from "@/lib/api";
import useAuth from "@/lib/hooks/useAuth";
import { TemplateType } from "@/lib/store/slices/templateChangeSlice";
import ResumePDF from "../sections/resumes/ResumePreview";
import { PDFViewer } from "@react-pdf/renderer";
import { ResumeState } from "@/lib/types/resumeInput";
import { IResumeStyleState } from "@/lib/store/slices/resumeStyle";
type TemplateComponentProps = {
  data: ResumeState;
  styleConfig: IResumeStyleState;
};
const ResumeViewer = ({
  resume,
  resumeId,
}: {
  resume: ResumeState;
  resumeId: string;
}) => {
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>("default");
  const [styleConfig, setStyleConfig] = useState<IResumeStyleState>();
  const { isLoading, user } = useAuth();

  const templateComponents: Record<string, React.FC<TemplateComponentProps>> = {
    default: ResumePDF,
    template2: TempletTwo,
    template3: TemplateThree,
    template4: TemplateFour,
  };

  // useEffect(() => {
  //   // console.log("trying to call fetchResumeStyle");
  //   const fetchResumeStyle = async () => {
  //     try {
  //       console.log("fetchResumeStyle caled");

  //       const response = await api.post("/resume/settings", {
  //         userId: user?._id,
  //         resumeId: resumeId,
  //       });
  //       // console.log("response.data for fetchResumeStyle", response.data);
  //       if (response.data.success) {
  //         setStyleConfig(response.data.settings);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching resume style:", error);
  //     }
  //   };
  //   if (user?._id || resume._id) {
  //     // console.log("funcation is ok", user?._id, resumeId);
  //     fetchResumeStyle();
  //   }
  // }, [resume, !isLoading, resumeId, user?._id]);

  const shouldFetchResumeStyle = useMemo(() => {
    return !!user?._id || !!resume._id;
  }, [user?._id, resume._id]);
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

    if (shouldFetchResumeStyle && !isLoading) {
      fetchResumeStyle();
    }
  }, [shouldFetchResumeStyle, isLoading, resumeId, user?._id]);

  useEffect(() => {
    setActiveTemplate(resume.templateName as TemplateType);
  }, [resume.templateName, resumeId]); // i changed it to resumeId and from resume to resumeTemplateName
  const TemplateComponent = templateComponents[activeTemplate];
  // console.log("activeTemplate, resume", activeTemplate);
  return (
    <PDFViewer
      className="w-full h-full border-none  aspect-[1/1.41]  custom-scrollbar bg-red-800"
      showToolbar={false}
      style={{
        backgroundColor: "white",
        color: "white",
      }}
    >
      <TemplateComponent
        styleConfig={styleConfig as IResumeStyleState}
        data={resume}
      />
    </PDFViewer>
  );
};

export default ResumeViewer;
