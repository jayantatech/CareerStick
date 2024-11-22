"use client";

import React, { memo, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/lib/store/hooks";
import TemplateThreeView from "../sections/resumes/tsxView/TemplateThreeView";
import { FaCircleNotch } from "react-icons/fa";

const PDFWrapper = dynamic(() => import("./PDFWrapper"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full relative">
      <Skeleton className="w-full h-full  bg-blue-50" />,
    </div>
  ),
});

const ResumeSliderTwo = memo(() => {
  const [isResumeLoading, setIsResumeLoading] = useState(true);
  const resumeData = useAppSelector((state) => state.resume);
  const styleConfig = useAppSelector((state) => state.resumeStyle);
  const resumeStateChangeSlice = useAppSelector(
    (state) => state.resumeSateChange.isGetResumeCalled
  );
  const isAIFeatureRequested = useAppSelector(
    (state) => state.resumeSateChange.isAIFeatureRequested
  );

  useEffect(() => {
    setIsResumeLoading(true);
    const timer = setTimeout(() => {
      setIsResumeLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Carousel className="relative  w-full lg:h-[1086px] aspect-[1/1.41] max-xl-desktop:h-[973px] max-m-desktop:h-[818px] max-m-desktop:w-[580px] max-s-desktop:w-[520px] max-s-desktop:h-[733px] rounded max-u-s-desktop:h-[705px] max-u-s-desktop:w-[500px] max-l-tablet:w-[480px] max-l-tablet:h-[677px] max-md:w-[340px] max-md:h-[480px] max-md:bg-red-600">
      {/* <CarouselContent className=""> */}
      {/* <CarouselItem> */}
      <div className=" w-full h-[1086px] aspect-[1/1.41] max-xl-desktop:h-[973px] max-s-desktop:w-[520px] max-s-desktop:h-[733px] max-m-desktop:h-[818px] max-m-desktop:w-[580px] max-u-s-desktop:h-[705px] max-u-s-desktop:w-[500px] bg-white rounded shadow-sm max-l-tablet:w-[480px] max-l-tablet:h-[677px] max-md:w-[340px] max-md:h-[480px] ">
        {isAIFeatureRequested ? (
          <div className="w-full h-full relative">
            <div className="w-full h-full flex rounded flex-col items-center justify-center bg-gradient-to-br bg-blue-50 text-white p-8">
              {/* <FaCircleNotch className="animate-spin w-16 text-primary h-16 mb-4" /> */}
              <h2 className="text-2xl font-bold mb-2 text-primary font-heading">
                Generating Your Resume
              </h2>
              <div className="  mb-3 flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full bg-blue-500 animate-bounce`}
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <p className="text-center mb-2 text-lg text-black font-body">
                This may take 15-30 seconds
              </p>
              {/* <div className="w-64 h-2 bg-blue-200 rounded-full mb-4">
                <div className="w-2/3 h-full bg-primary rounded-full animate-pulse"></div>
              </div> */}

              <p className="text-lg italic text-black font-body">
                Good things take time, Be patient!
              </p>
            </div>{" "}
          </div>
        ) : isResumeLoading ? (
          <div className="w-full h-full relative">
            <Skeleton className="w-full h-full bg-blue-50" />,
          </div>
        ) : (
          <PDFWrapper data={resumeData} />
          // <TemplateThreeView data={resumeData} styleConfig={styleConfig} />
        )}
      </div>
      {/* </CarouselItem> */}
      {/* </CarouselContent> */}
    </Carousel>
  );
});

ResumeSliderTwo.displayName = "ResumeSliderTwo";
export default ResumeSliderTwo;
