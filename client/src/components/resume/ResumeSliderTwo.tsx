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
  // loading: () => <div className="w-full h-full bg-white animate-pulse" />,
});

const ResumeSliderTwo = memo(() => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const resumeData = useAppSelector((state) => state.resume);

  // const handlePageChange = useCallback((index: number) => {
  //   setCurrentPage(index + 1);
  // }, []);

  // const DownloadPDFComponent = dynamic(() => import("./DownloadPDF"), {
  //   ssr: false,
  //   loading: () => (
  //     <button
  //       disabled
  //       className="w-auto px-3 py-1 rounded-sm font-heading text-[16px] h-full bg-primary/50 text-white"
  //     >
  //       Loading...
  //     </button>
  //   ),
  // });

  return (
    <Carousel
      className="relative  w-[800px] h-[1128px] rounded "
      // onSelect={handlePageChange}
    >
      {/* <div className="w-[340px] h-[34px] absolute right-0 -top-10 z-10 flex items-center justify-end">
        <DownloadPDFComponent data={resumeData} />
      </div> */}

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
