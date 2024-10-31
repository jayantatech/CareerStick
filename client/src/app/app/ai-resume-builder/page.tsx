"use client";
export interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  defaultSelected?: boolean;
  required?: boolean;
  order?: number;
}

export interface SelectedSections {
  [key: string]: boolean;
}

import React from "react";

import ResumeViewTwo from "@/components/sections/resumes/ResumeViewTwo";

import SelectResumeSlider from "@/components/resume/SelectResumeSlider";
import ResumeFeatureBox from "@/components/resume/ResumeFeatureBox";
import FontAndDesignSection from "@/components/resume/FontAndDesignSection";
import ATSOptimizationBox from "@/components/resume/ATSOptimizationBox";
import AISuggestionsBox from "@/components/resume/AISuggestionsBox";
import LeftSection from "@/components/sections/AiResumeBuilder/home/LeftSection";
import SmallScreenResumeView from "@/components/resume/SmallScreenResumeView";
import { setMobilePreview } from "@/lib/store/slices/activeResumeSectionClice";
import { useAppDispatch } from "@/lib/store/hooks";

const AiResumeBuilder: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col h-screen">
      {/* <AppHeader title="AI Resume Builder" /> */}

      <div className="flex-1 overflow-y-auto">
        <div className="flex max-md:flex-col ">
          {/* Left section */}
          <div className="w-full h-[63px] md:hidden bg-white border-b flex-shrink-0 sticky top-0 left-0 z-20"></div>

          <LeftSection />
          <SmallScreenResumeView />

          <div className="w-full md:hidden h-[63px] bg-white shadow-md border flex-shrink-0 fixed bottom-0 left-0 z-20 p-4 flex items-center justify-center">
            <button
              onClick={() => dispatch(setMobilePreview(true))}
              className="w-full h-[40px] rounded bg-primary text-white text-center flex items-center justify-center"
            >
              Preview & Download
            </button>
          </div>

          <div className="relative w-[60%] m-desktop:w-[64%]  max-lg:hidden ">
            <div
              className="sticky top-0 overflow-y-auto custom-scrollbar bg-[#8b97b1] "
              style={{ maxHeight: "calc(100vh)" }}
            >
              <div className=" min-h-screen max-h-[2040px] flex flex-row ">
                <ResumeViewTwo />
                <ResumeFeatureBox />
              </div>
              <FontAndDesignSection />
              <SelectResumeSlider />
              <ATSOptimizationBox />
              <AISuggestionsBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiResumeBuilder;
