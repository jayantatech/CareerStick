// import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { PDFViewer } from "@react-pdf/renderer";
// import { ResumePDF } from "../sections/resumes/ResumePreview";
// import { IoMdCall } from "react-icons/io";

// const ResumeSlider = () => {
//   return (
//     <Carousel className=" aspect-[1/1.41] mt-8 bg-red-300 rounded">
//       <div className="w-[340px] h-[34px] bg-grsdeen-600 absolute right-0 -top-10   z-10 flex items-center justify-end">
//         <button
//           className="w-auto px-3 py-1 rounded-sm font-heading text-[16px]
//         h-full bg-primary text-white "
//         >
//           Download Resume
//         </button>
//       </div>
//       <CarouselContent>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index}>
//             <div className=" aspect-[1/1.41] bg-white rounded p-5">
//               <div className="">
//                 <h2 className="text-3xl font-bold text-gray-800">Jay Biswas</h2>
//                 <span className="text-gray-600 font-semibold">
//                   Web Developer
//                 </span>
//                 <div className=" flex items-center justify-start gap-1">
//                   <span className="flex items-center justify-center gap-1">
//                     <IoMdCall className="mt-1" />
//                     +91 9999999999
//                   </span>
//                   <span className="flex items-center justify-center gap-1">
//                     <IoMdCall className="mt-1" />
//                     +91 9999999999
//                   </span>
//                   <span className="flex items-center justify-center gap-1">
//                     <IoMdCall className="mt-1" />
//                     +91 9999999999
//                   </span>
//                 </div>
//               </div>
//             </div>{" "}
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious className="absolute left-0 -top-5 rounded-sm h-[24px]" />
//       <p className="absolute left-11 -top-[32px] font-heading px-1 py-0.5 rounded text-[14px] bg-slate-200 ">
//         Page 1
//       </p>
//       <CarouselNext className="absolute left-28 -top-5 rounded-sm h-[24px]" />
//     </Carousel>
//   );
// };

// // export default ResumeSlider;import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { PDFViewer } from "@react-pdf/renderer";
// import { ResumePDF } from "../sections/resumes/ResumePreview";
// import { IoMdCall } from "react-icons/io";
// import React from "react";
// const resumeData = {
//   personalInfo: {
//     name: "Judy Foster",
//     title: "Senior IT Project Manager",
//     email: "help@enhancv.com",
//     phone: "+123-456-7890",
//     location: "San Francisco, CA",
//     summary:
//       "Senior IT Project Manager with Agile and Project Management certification from the PMI. Strong background in software development for enterprises and government-based organizations with Java. Capable of managing teams of up to 50, experienced with mentoring and coaching.",
//   },
//   experience: [
//     {
//       title: "Senior IT Project Manager",
//       company: "Bank of America",
//       period: "2019 - Present",
//       achievements: [
//         "Simultaneously managed several project teams (10-20 people), kept teams on schedule with Waterfall & Agile methodologies.",
//         "Reduced project management costs by 50% & improved projects & department performance through streamlined operations and tracking/reporting automation.",
//         "Developed and implemented solution to replace existing Windows server backup/recovery infrastructure with new solution which increased capacity (100%), performance (130%) and reliability (200%).",
//       ],
//     },
//     {
//       title: "IT Project Manager Associate",
//       company: "Western Union",
//       period: "2016 - 2019",
//       achievements: [
//         "Simultaneously Managed 30 subordinates including Developers and UX/UI designers.",
//         "Managed small projects with budgets of up to $65K.",
//         "Implemented the new front-sales software for 2000+ devices and salespeople.",
//       ],
//     },
//   ],
//   education: [
//     {
//       degree: "Master of Business Administration",
//       school: "UC Berkeley",
//       period: "2011 - 2012",
//       gpa: "3.8",
//     },
//     {
//       degree: "B.S. Computer Science",
//       school: "UC Berkeley",
//       period: "2003 - 2007",
//       gpa: "3.9",
//     },
//   ],
//   skills: [
//     {
//       category: "Project Management",
//       items: ["Merlin Projects", "Waterfall", "Agile", "Visio", "Clarity"],
//     },
//     {
//       category: "IT",
//       items: ["Java", "JS", "VueJS", "NodeJS", "MongoDB"],
//     },
//   ],
// };
// const ResumeSlider = () => {
//   const [currentPage, setCurrentPage] = React.useState<number>(1);

//   const handleDownload = () => {
//     // Add download logic here
//   };

//   return (
//     <Carousel
//       className="relative aspect-[1/1.41] mt-8 rounded"
//       onSelect={(index) => setCurrentPage(+index + 1)}
//     >
//       <div className="w-[340px] h-[34px] absolute right-0 -top-10 z-10 flex items-center justify-end">
//         <button
//           onClick={handleDownload}
//           className="w-auto px-3 py-1 rounded-sm font-heading text-[16px] h-full bg-primary text-white hover:bg-primary/90 transition-colors"
//         >
//           Download Resume
//         </button>
//       </div>

//       <CarouselContent>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index}>
//             <div className="aspect-[1/1.41] bg-white rounded shadow-sm">
//               <PDFViewer
//                 className="w-full h-full border-none bg-white"
//                 showToolbar={false}
//                 height={"100%"}
//                 width={"812px"}
//                 style={{ backgroundColor: "white" }}
//               >
//                 <ResumePDF data={resumeData} />
//               </PDFViewer>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>

//       <div className="absolute left-0 -top-10 flex items-center gap-2">
//         <CarouselPrevious className="relative left-0 top-0 rounded-sm h-[24px]" />
//         <p className="font-heading px-2 py-0.5 rounded text-[14px] bg-slate-200">
//           Page {currentPage}
//         </p>
//         <CarouselNext className="relative left-0 top-0 rounded-sm h-[24px]" />
//       </div>
//     </Carousel>
//   );
// };

// export default ResumeSlider;

// "use client";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import dynamic from "next/dynamic";
// import React from "react";
// import { resumeData } from "../sections/resumes/ResumePreview";
// import { useAppSelector } from "@/lib/store/hooks";
// // import { resumeData } from "./ResumeGenerator";

// // Dynamically import PDF components with no SSR

// const PDFWrapper = dynamic(() => import("./PDFWrapper"), { ssr: false });

// const ResumeSlider = () => {
//   const [currentPage, setCurrentPage] = React.useState<number>(1);

//   // const handleDownload = async () => {
//   //   try {
//   //     // We'll implement download logic in a separate component
//   //     const downloadComponent = dynamic(() => import("./DownloadPDF"), {
//   //       ssr: false,
//   //     });

//   //     const DownloadPDF = await downloadComponent;
//   //     return <DownloadPDF data={resumeData} />;
//   //   } catch (error) {
//   //     console.error("Error downloading PDF:", error);
//   //   }
//   // };

//   const data = useAppSelector((state) => state.resume);

//   const DownloadPDFComponent = dynamic(() => import("./DownloadPDF"), {
//     ssr: false,
//     loading: () => (
//       <button
//         disabled
//         className="w-auto px-3 py-1 rounded-sm font-heading text-[16px] h-full bg-primary/50 text-white"
//       >
//         Loading...
//       </button>
//     ),
//   });
//   return (
//     <Carousel
//       className="relative aspect-[1/1.41] mt-8 rounded"
//       onSelect={(index) => setCurrentPage(+index + 1)}
//     >
//       {/* <div className="w-[340px] h-[34px] absolute right-0 -top-10 z-10 flex items-center justify-end">
//         <button
//           onClick={handleDownload}
//           className="w-auto px-3 py-1 rounded-sm font-heading text-[16px] h-full bg-primary text-white hover:bg-primary/90 transition-colors"
//         >
//           Download Resume
//         </button>
//       </div> */}

//       <CarouselContent>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index}>
//             <div className="aspect-[1/1.41] bg-white rounded shadow-sm">
//               <PDFWrapper data={data} />
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>

//       <div className="absolute left-0 -top-10 flex items-center gap-2">
//         <CarouselPrevious className="relative left-0 top-0 rounded-sm h-[24px]" />
//         <p className="font-heading px-2 py-0.5 rounded text-[14px] bg-slate-200">
//           Page {currentPage}
//         </p>
//         <CarouselNext className="relative left-0 top-0 rounded-sm h-[24px]" />
//       </div>
//     </Carousel>
//   );
// };

// export default ResumeSlider;

// "use client";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import dynamic from "next/dynamic";
// import React from "react";
// import { useAppSelector } from "@/lib/store/hooks";

// const PDFWrapper = dynamic(() => import("./PDFWrapper"), { ssr: false });

// const ResumeSlider = () => {
//   const [currentPage, setCurrentPage] = React.useState<number>(1);
//   const resumeData = useAppSelector((state) => state.resume);
//   // const resumeData = demoResumeData;

//   const DownloadPDFComponent = dynamic(() => import("./DownloadPDF"), {
//     ssr: false,
//     loading: () => (
//       <button
//         disabled
//         className="w-auto px-3 py-1 rounded-sm font-heading text-[16px] h-full bg-primary/50 text-white"
//       >
//         Loading...
//       </button>
//     ),
//   });

//   return (
//     <Carousel
//       className="relative aspect-[1/1.41] mt-8 rounded"
//       onSelect={(index) => setCurrentPage(+index + 1)}
//     >
//       <div className="w-[340px] h-[34px] absolute right-0 -top-10 z-10 flex items-center justify-end">
//         <DownloadPDFComponent data={resumeData} />
//       </div>

//       <CarouselContent>
//         {Array.from({ length: 1 }).map((_, index) => (
//           <CarouselItem key={index}>
//             <div className="aspect-[1/1.41] bg-white rounded shadow-sm">
//               <PDFWrapper data={resumeData} />
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>

//       <div className="absolute left-0 -top-10 flex items-center gap-2">
//         <CarouselPrevious className="relative left-0 top-0 rounded-sm h-[24px]" />
//         <p className="font-heading px-2 py-0.5 rounded text-[14px] bg-slate-200">
//           Page {currentPage}
//         </p>
//         <CarouselNext className="relative left-0 top-0 rounded-sm h-[24px]" />
//       </div>
//     </Carousel>
//   );
// };

// export default ResumeSlider;

"use client";

import React, { memo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/lib/store/hooks";

const PDFWrapper = dynamic(() => import("./PDFWrapper"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-red-500 animate-pulse" />,
});

const ResumeSlider = memo(() => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const resumeData = useAppSelector((state) => state.resume);

  // const handlePageChange = useCallback((index: number) => {
  //   setCurrentPage(index + 1);
  // }, []);

  const DownloadPDFComponent = dynamic(() => import("./DownloadPDF"), {
    ssr: false,
    loading: () => (
      <button
        disabled
        className="w-auto px-3 py-1 rounded-sm font-heading text-[16px] h-full bg-primary/50 text-white"
      >
        Loading...
      </button>
    ),
  });

  return (
    <Carousel
      className="relative aspect-[1/1.41] mt-8 rounded"
      // onSelect={handlePageChange}
    >
      <div className="w-[340px] h-[34px] absolute right-0 -top-10 z-10 flex items-center justify-end">
        <DownloadPDFComponent data={resumeData} />
      </div>

      <CarouselContent>
        <CarouselItem>
          <div className="aspect-[1/1.41] bg-white rounded shadow-sm">
            <PDFWrapper data={resumeData} />
          </div>
        </CarouselItem>
      </CarouselContent>

      <div className="absolute left-0 -top-10 flex items-center gap-2">
        <CarouselPrevious className="relative left-0 top-0 rounded-sm h-[24px]" />
        <p className="font-heading px-2 py-0.5 rounded text-[14px] bg-slate-200">
          {/* Page {currentPage} */}
        </p>
        <CarouselNext className="relative left-0 top-0 rounded-sm h-[24px]" />
      </div>
    </Carousel>
  );
});

ResumeSlider.displayName = "ResumeSlider";
export default ResumeSlider;
