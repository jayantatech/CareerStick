"use client";

import React, { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import useAuth from "@/lib/hooks/useAuth";
import { TemplateType } from "@/lib/store/slices/templateChangeSlice";
import { ResumeState } from "@/lib/types/resumeInput";
import { IResumeStyleState } from "@/lib/store/slices/resumeStyle";
import dynamic from "next/dynamic";

// Dynamically import templates
const TemplateOne = dynamic(() => import("../resumeTemplates/TemplateOne"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const TemplateThree = dynamic(
  () => import("../resumeTemplates/TemplateThree"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const TemplateFour = dynamic(() => import("../resumeTemplates/TemplateFour"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const TemplateFive = dynamic(() => import("../resumeTemplates/TemplateFive"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

type TemplateComponentProps = {
  data: ResumeState;
  styleConfig: IResumeStyleState;
  isMultiPage: boolean;
};

const ResumeViewer = ({
  resume,
  resumeId,
}: {
  resume: ResumeState;
  resumeId: string;
}) => {
  const [activeTemplate, setActiveTemplate] =
    useState<TemplateType>("template3");
  const [styleConfig, setStyleConfig] = useState<IResumeStyleState>();
  const { isLoading, user } = useAuth();

  // Define template components with proper typing
  const templateComponents: Record<
    string,
    React.ComponentType<TemplateComponentProps>
  > = {
    template1: TemplateOne as React.ComponentType<TemplateComponentProps>,
    template2: TemplateOne as React.ComponentType<TemplateComponentProps>,
    template3: TemplateThree as React.ComponentType<TemplateComponentProps>,
    template4: TemplateFour as React.ComponentType<TemplateComponentProps>,
    template5: TemplateFive as React.ComponentType<TemplateComponentProps>,
  };

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
  // const TemplateComponent = templateComponents["template3"]; // i changed it to template3
  const TemplateComponent =
    templateComponents[activeTemplate] || templateComponents.template3;
  // console.log("activeTemplate, resume", activeTemplate);
  return (
    <div className="w-[400px] h-[560px] max-md:w-[334px] max-md:h-[480px] bg-blue-100/50 border border-gray-200 relative overflow-hidden">
      <div className="scale-[.49] -ml-32 -mt-[282px]">
        {TemplateComponent && (
          <TemplateComponent
            styleConfig={styleConfig as IResumeStyleState}
            data={resume}
            isMultiPage={false}
          />
        )}
      </div>
    </div>
  );
};

export default ResumeViewer;
