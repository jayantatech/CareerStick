"use client";

import React, { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/lib/store/hooks";

const PDFWrapper = dynamic(() => import("./PDFWrapper"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full relative">
      <Skeleton className="w-full h-full  bg-slate-100" />,
    </div>
  ),
});

const ResumeSliderTwo = memo(() => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const resumeData = useAppSelector((state) => state.resume);

  return (
    <Carousel className="relative  w-full lg:h-[1086px] aspect-[1/1.41] max-xl-desktop:h-[973px] max-m-desktop:h-[818px] max-m-desktop:w-[580px] max-s-desktop:w-[520px] max-s-desktop:h-[733px] rounded max-u-s-desktop:h-[705px] max-u-s-desktop:w-[500px] max-l-tablet:w-[480px] max-l-tablet:h-[677px] max-md:w-[340px] max-md:h-[480px] max-md:bg-red-600">
      <CarouselContent className="">
        <CarouselItem>
          <div className=" w-full h-[1086px] aspect-[1/1.41] max-xl-desktop:h-[973px] max-s-desktop:w-[520px] max-s-desktop:h-[733px] max-m-desktop:h-[818px] max-m-desktop:w-[580px] max-u-s-desktop:h-[705px] max-u-s-desktop:w-[500px] bg-white rounded shadow-sm max-l-tablet:w-[480px] max-l-tablet:h-[677px] max-md:w-[340px] max-md:h-[480px] ">
            <PDFWrapper data={resumeData} />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
});

ResumeSliderTwo.displayName = "ResumeSliderTwo";
export default ResumeSliderTwo;
