import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toast } from "sonner";
import api from "@/lib/api";
import { setDownloadRequest } from "@/lib/store/slices/resumeDownloadSlice";
import { ResumeState } from "@/lib/types/resumeInput";

import { Download } from "lucide-react";

// Dynamically import templates
// const TemplateOne = dynamic(() => import("../resumeTemplates/TemplateOne"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });

// const TemplateThree = dynamic(
//   () => import("../resumeTemplates/TemplateThree"),
//   {
//     ssr: false,
//     loading: () => <div>Loading...</div>,
//   }
// );

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

const DownloadPDF = ({ resume }: { resume?: ResumeState }) => {
  // const DownloadPDF = ({ resume }: { resume?: ResumeState }) => {
  const [isLoading, setIsLoading] = useState(false);

  const templateCode = useAppSelector(
    (state) => state.resumeDownloadInfo.templateCode
  );
  console.log("code to generate for download", templateCode);
  const resumeStyle = useAppSelector((state) => state.resumeStyle);
  const dispatch = useAppDispatch();

  const handleDownload = async () => {
    console.log("resume", resume);
    dispatch(setDownloadRequest(true));
    try {
      setIsLoading(true);

      const response = await api.post(
        "/resumes/generate-pdf",
        {
          resumeData: templateCode,
          activeSections: resumeStyle.activeSections,
          fontFamily: resumeStyle.fontFamily,
        },
        {
          responseType: "blob",
          headers: {
            Accept: "application/pdf",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to generate PDF");
      }

      // Create blob from response data
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `resume.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      window.URL.revokeObjectURL(url);
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download resume");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="w-full font-semibold h-[24px] rounded bg-primary text-white flex items-center justify-center gap-2"
    >
      <Download className="w-4 h-4 " />
      {isLoading ? "Generating..." : "Download PDF"}
    </button>
  );
};

export default DownloadPDF;
