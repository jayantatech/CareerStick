"use client";

import React, { memo, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/lib/store/hooks";
import PDFWrapper from "./PDFWrapper";

// const PDFWrapper = dynamic(() => import("./PDFWrapper"), {
//   ssr: false,
//   loading: () => (
// <div className="w-[794px] aspect-[1/1.414] h-[1123px] relative">
//   <Skeleton className="w-full h-full bg-blue-50" />
// </div>
//   ),
// });

const ResumeSliderTwo = memo(() => {
  const [isResumeLoading, setIsResumeLoading] = useState(true);
  const resumeData = useAppSelector((state) => state.resume);
  const isAIFeatureRequested = useAppSelector(
    (state) => state.resumeSateChange.isAIFeatureRequested
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsResumeLoading(false);
    }, 2800); // Reduced loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-auto max-md:w-[380px] max-m-desktop:w-[570px] max-md:bg-blue-400 max-md:relative max-md:overflow-x-hidden max-md:h-[580px] pl-2 max-md:pl-0 mt-8 max-md:mt-4 mb-4 flex rounded flex-col items-center max-md:items-center justify-center max-md:justify-start bg-cover bg-center bg-no-repeat">
      {isAIFeatureRequested ? (
        <div className="w-[794px] aspect-[1/1.414] h-[1123px] relative">
          <div className="w-full h-full flex rounded flex-col items-center justify-center bg-gradient-to-br bg-blue-50 text-white p-8">
            <h2 className="text-2xl font-bold mb-2 text-primary font-heading">
              Generating Your Resume
            </h2>
            <div className="mb-3 flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full bg-blue-500 animate-bounce`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <p className="text-center mb-2 text-lg text-black font-body">
              This may take 7-10 seconds
            </p>
            <p className="text-lg italic text-black font-body">
              Good things take time, Be patient!
            </p>
          </div>
        </div>
      ) : isResumeLoading ? (
        <div className="w-[794px] aspect-[1/1.414] h-[1123px] relative">
          <Skeleton className="w-full h-full bg-blue-50" />
        </div>
      ) : (
        <div
          className={`max-md:scale-[0.45] max-md:mt-4 transition-opacity duration-300 max-m-desktop:scale-[0.7] transform-none origin-top ${
            isResumeLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <PDFWrapper data={resumeData} />
        </div>
      )}
    </div>
  );
});

ResumeSliderTwo.displayName = "ResumeSliderTwo";
export default ResumeSliderTwo;
