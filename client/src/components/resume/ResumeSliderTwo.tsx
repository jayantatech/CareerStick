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
    <Carousel className="relative  w-[800px] h-[1128px] rounded ">
      <CarouselContent className="">
        <CarouselItem>
          <div className=" w-[800px] h-[1128px] bg-white rounded shadow-sm ">
            <PDFWrapper data={resumeData} />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
});

ResumeSliderTwo.displayName = "ResumeSliderTwo";
export default ResumeSliderTwo;
