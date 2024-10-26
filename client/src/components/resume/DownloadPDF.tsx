"use client";

import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import { ResumePDF } from "./ResumePDF";

// import type { ResumeData } from "./types";
// import { ResumePDF } from "../sections/resumes/ResumePreview";
// ResumePDF
// import { ResumeState } from "@/lib/store/hooks";
import ResumePDF from "../sections/resumes/ResumePreview";
import { ResumeState } from "@/lib/store/slices/resumeSlice";

// interface DownloadPDFProps {
//   data: any;
// }
// React.FC<DownloadPDFProps>;

const DownloadPDF = ({ data }: { data: ResumeState }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <PDFDownloadLink
          document={<ResumePDF data={data} />}
          fileName="resume.pdf"
        >
          <button className="w-auto px-3 py-1 rounded-sm font-heading text-[16px] h-full bg-primary text-white hover:bg-primary/90 transition-colors">
            Download Resume
          </button>{" "}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default DownloadPDF;
