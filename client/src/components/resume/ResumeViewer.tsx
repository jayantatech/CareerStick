"use client";

import React, { useEffect, useState } from "react";
import TempletTwo from "./templets/TempletTwo";
import TemplateThree from "./templets/TemplateThree";
import TemplateFour from "./templets/TemplateFour";
import api from "@/lib/api";
import useAuth from "@/lib/hooks/useAuth";
import { TemplateType } from "@/lib/store/slices/templateChangeSlice";
import ResumePDF from "../sections/resumes/ResumePreview";
import { PDFViewer } from "@react-pdf/renderer";

const ResumeViewer = ({ resume, resumeId }: any) => {
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>("default");
  const [styleConfig, setStyleConfig] = useState<any>({});
  const { isLoading, user } = useAuth();

  const templateComponents: Record<string, React.FC<any>> = {
    default: ResumePDF,
    template2: TempletTwo,
    template3: TemplateThree,
    template4: TemplateFour,
  };

  useEffect(() => {
    // console.log("trying to call fetchResumeStyle");
    const fetchResumeStyle = async () => {
      try {
        console.log("fetchResumeStyle caled");

        const response = await api.post("/resume/settings", {
          userId: user?._id,
          resumeId: resumeId,
        });
        // console.log("response.data for fetchResumeStyle", response.data);
        if (response.data.success) {
          setStyleConfig(response.data.settings);
        }
      } catch (error) {
        console.error("Error fetching resume style:", error);
      }
    };
    if (user?._id || resume._id) {
      // console.log("funcation is ok", user?._id, resumeId);
      fetchResumeStyle();
    }
  }, [resume, !isLoading, resumeId, user?._id]);
  console.log("resume.templateName to set activeTemplate", resume);
  useEffect(() => {
    setActiveTemplate(resume.templateName);
  }, [resume]);
  const TemplateComponent = templateComponents[activeTemplate];
  // console.log("activeTemplate, resume", activeTemplate);
  return (
    <PDFViewer
      className="w-full h-full border-none aspect-[1/1.41]  custom-scrollbar bg-red-800"
      showToolbar={false}
      style={{ backgroundColor: "white", color: "white" }}
    >
      <TemplateComponent styleConfig={styleConfig} data={resume} />
    </PDFViewer>
  );
};

export default ResumeViewer;
