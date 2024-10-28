// import React, { memo, useMemo } from "react";
// import { PDFViewer } from "@react-pdf/renderer";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import dynamic from "next/dynamic";
// import { useAppSelector } from "@/lib/store/hooks";
// import { ResumeState } from "@/lib/store/slices/resumeSlice";
// import ResumePDF from "../sections/resumes/ResumePreview";

// // Memoized PDF Component
// const MemoizedResumePDF = memo(({ data }: { data: ResumeState }) => {
//   // Use useMemo to memoize the actual PDF content
//   const pdfContent = useMemo(() => {
//     return <ResumePDF data={data} />;
//   }, [
//     // Only include the specific fields you want to trigger updates
//     data.personalInfo.firstName,
//     data.personalInfo.email,
//     data.personalInfo.phone,
//     data.personalInfo.city,
//     data.personalInfo.country,
//     data.jobIndustry.targetJob,
//     data.professionalSummary.summaryText,
//     data.workExperience,
//     data.education,
//     data.selectedSkills,
//     data.projects,
//     data.certificate,
//     data.languages,
//     data.socialLinks,
//   ]);

//   return pdfContent;
// });

// MemoizedResumePDF.displayName = "MemoizedResumePDF";
