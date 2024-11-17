"use client";
import React, { memo, useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../sections/resumes/ResumePreview";

import { MdOutlineCloudDownload } from "react-icons/md";
import TempletTwo from "./templets/TempletTwo";
// import TemplateThree from "./templets/TemplateThree";
// Import other templates as needed
import { useAppSelector } from "@/lib/store/hooks";
// import { ResumeState } from "@/lib/types/resumeInput";
import { ResumeState } from "@/lib/types/resumeInput";
import TemplateThree from "./templets/TemplateThree";
import TemplateFour from "./templets/TemplateFour";

const LoadingButton = memo(() => (
  <button disabled className="font-semibold">
    Loading...
  </button>
));
LoadingButton.displayName = "LoadingButton";

const DownloadButton = memo(() => (
  <div className="flex items-center gap-1">
    <MdOutlineCloudDownload className="text-[20px] -mt-0.5" />
    <span className="font-heading font-semibold text-[16px]">Download</span>
  </div>
));
DownloadButton.displayName = "DownloadButton";

// Define template components mapping
const templateComponents = {
  default: ResumePDF,
  template2: TempletTwo,
  template3: TemplateThree,
  template4: TemplateFour,

  // Add more templates as needed
  // template4: TemplateFour,
  // template5: TemplateFive,
  // ...
  // template20: TemplateTwenty,
};

const DownloadPDF = memo(({ data }: { data: ResumeState }) => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentTemplate = useAppSelector(
    (state) => state.templateSlice.currentTemplate
  );
  const styleConfig = useAppSelector((state) => state.resumeStyle);
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) {
    return <LoadingButton />;
  }

  const TemplateComponent = templateComponents[currentTemplate] || ResumePDF;

  return (
    <PDFDownloadLink
      document={<TemplateComponent data={data} styleConfig={styleConfig} />}
      fileName="resume.pdf"
      className="block"
    >
      {isLoading ? <LoadingButton /> : <DownloadButton />}
    </PDFDownloadLink>
  );
});

DownloadPDF.displayName = "DownloadPDF";

export default DownloadPDF;
