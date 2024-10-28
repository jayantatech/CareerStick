// "use client";

// import React from "react";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// // import { ResumePDF } from "./ResumePDF";

// // import type { ResumeData } from "./types";
// // import { ResumePDF } from "../sections/resumes/ResumePreview";
// // ResumePDF
// // import { ResumeState } from "@/lib/store/hooks";
// import ResumePDF from "../sections/resumes/ResumePreview";
// import { ResumeState } from "@/lib/store/slices/resumeSlice";

// // interface DownloadPDFProps {
// //   data: any;
// // }
// // React.FC<DownloadPDFProps>;

// const DownloadPDF = ({ data }: { data: ResumeState }) => {
// const [isLoading, setIsLoading] = React.useState(true);

// React.useEffect(() => {
//   const timer = setTimeout(() => {
//     setIsLoading(false);
//   }, 2000);
//   return () => clearTimeout(timer);
// }, []);
//   return (
//     <div>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <PDFDownloadLink
//           document={<ResumePDF data={data} />}
//           fileName="resume.pdf"
//         >
//           <button className="w-auto px-3 py-1 rounded-sm font-heading text-[16px] h-full bg-primary text-white hover:bg-primary/90 transition-colors">
//             Download Resume
//           </button>{" "}
//         </PDFDownloadLink>
//       )}
//     </div>
//   );
// };

// // export default DownloadPDF;
// "use client";

// import React, { memo, useState, useEffect } from "react";
// import { PDFDownloadLink, PDFDownloadLinkProps } from "@react-pdf/renderer";
// import ResumePDF from "../sections/resumes/ResumePreview";
// import { ResumeState } from "@/lib/store/slices/resumeSlice";

// const LoadingButton = memo(() => (
//   <button
//     disabled
//     className="w-auto px-3 py-1 rounded-sm font-heading text-[16px] h-full bg-primary/50 text-white"
//   >
//     Loading...
//   </button>
// ));

// LoadingButton.displayName = "LoadingButton";

// const DownloadButton = memo(() => (
//   <button className="w-auto px-3 py-1 rounded-sm font-heading text-[16px] h-full bg-primary text-white hover:bg-primary/90 transition-colors">
//     Download Resume
//   </button>
// ));

// DownloadButton.displayName = "DownloadButton";

// interface RenderProps {
//   blob: Blob | null;
//   url: string | null;
//   loading: boolean;
//   error: Error | null;
// }

// const DownloadPDF = memo(({ data }: { data: ResumeState }) => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return <LoadingButton />;
//   }

//   return (
//     <PDFDownloadLink
//       document={<ResumePDF data={data} />}
//       fileName="resume.pdf"
//       className="block"
//     >
//       {(props: RenderProps) => {
//         return props.loading ? <LoadingButton /> : <DownloadButton />;
//       }}
//     </PDFDownloadLink>
//   );
// });

// DownloadPDF.displayName = "DownloadPDF";
// export default DownloadPDF;

// "use client";
// import React, { memo, useState, useEffect } from "react";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import ResumePDF from "../sections/resumes/ResumePreview";
// import { ResumeState } from "@/lib/store/slices/resumeSlice";
// import { MdOutlineCloudDownload } from "react-icons/md";

// const LoadingButton = memo(() => (
//   <button disabled className=" font-semibold">
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

// // interface RenderProps {
// //   blob: Blob | null;
// //   url: string | null;
// //   loading: boolean;
// //   error: Error | null;
// // }

// const DownloadPDF = memo(({ data }: { data: ResumeState }) => {
//   const [isClient, setIsClient] = useState(false);
//   const [isLoading, setIsLoading] = React.useState(true);

//   useEffect(() => {
//     setIsClient(true);
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   // useEffect(() => {}, []);

//   if (!isClient) {
//     return <LoadingButton />;
//   }

//   return (
//     <PDFDownloadLink
//       document={<ResumePDF data={data} />}
//       fileName="resume.pdf"
//       className="block"
//     >
//       {isLoading ? <LoadingButton /> : <DownloadButton />}
//     </PDFDownloadLink>
//   );
// });
// DownloadPDF.displayName = "DownloadPDF";

// export default DownloadPDF;

// // full working code
// "use client";
// import React, { memo, useState, useEffect } from "react";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import ResumePDF from "../sections/resumes/ResumePreview";
// import { ResumeState } from "@/lib/store/slices/resumeSlice";
// import { MdOutlineCloudDownload } from "react-icons/md";
// import { TemplateSwitcher } from "./TemplateSwitcher";
// import { TemplateProvider, useTemplate } from "@/context/TemplateContext";
// import { Provider } from "react-redux";
// import { store } from "@/lib/store/store";
// import TempletTwo from "./templets/TempletTwo";
// import { useAppSelector } from "@/lib/store/hooks";

// const LoadingButton = memo(() => (
//   <button disabled className=" font-semibold">
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

// const DownloadPDF = memo(({ data }: { data: ResumeState }) => {
//   const [isClient, setIsClient] = useState(false);
//   const [isLoading, setIsLoading] = React.useState(true);
//   // const { currentTemplate } = useTemplate();
//   const currentTemplate = useAppSelector(
//     (state) => state.templateSlice.currentTemplate
//   );

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

//   return (
//     <PDFDownloadLink
//       document={
//         currentTemplate === "default" ? (
//           <ResumePDF data={data} />
//         ) : (
//           <TempletTwo data={data} />
//         )
//       }
//       fileName="resume.pdf"
//       className="block"
//     >
//       {isLoading ? <LoadingButton /> : <DownloadButton />}
//     </PDFDownloadLink>
//   );
// });
// DownloadPDF.displayName = "DownloadPDF";

// export default DownloadPDF;

"use client";
import React, { memo, useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../sections/resumes/ResumePreview";
import { ResumeState } from "@/lib/store/slices/resumeSlice";
import { MdOutlineCloudDownload } from "react-icons/md";
import TempletTwo from "./templets/TempletTwo";
// import TemplateThree from "./templets/TemplateThree";
// Import other templates as needed
import { useAppSelector } from "@/lib/store/hooks";

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
  // template3: TemplateThree,
  // Add more templates as needed
  // template4: TemplateFour,
  // template5: TemplateFive,
  // ...
  // template20: TemplateTwenty,
};

const DownloadPDF = memo(({ data }: { data: ResumeState }) => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const currentTemplate = useAppSelector(
    (state) => state.templateSlice.currentTemplate
  );

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

  // Get the component for the current template, fallback to default if not found
  const TemplateComponent = templateComponents[currentTemplate] || ResumePDF;

  return (
    <PDFDownloadLink
      document={<TemplateComponent data={data} />}
      fileName="resume.pdf"
      className="block"
    >
      {isLoading ? <LoadingButton /> : <DownloadButton />}
    </PDFDownloadLink>
  );
});
DownloadPDF.displayName = "DownloadPDF";

export default DownloadPDF;
