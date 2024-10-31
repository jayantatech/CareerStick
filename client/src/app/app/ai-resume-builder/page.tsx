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
import AppHeader from "@/components/AppHeader";
import { setMobilePreview } from "@/lib/store/slices/activeResumeSectionClice";
import { useAppDispatch } from "@/lib/store/hooks";

const AiResumeBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  // const [selectedSections, setSelectedSections] = useState<SelectedSections>(
  //   () =>
  //     SECTION_CONFIG.reduce(
  //       (acc, section) => ({
  //         ...acc,
  //         [section.id]: section.defaultSelected || false,
  //       }),
  //       {}
  //     )
  // );

  // const resumeData = useAppSelector((state) => state.resume);

  // const handleSaveSections = (sections: SelectedSections): void => {
  //   setSelectedSections(sections);
  //   console.log("Updated sections:", sections);
  // };

  // const handleGenerateResume = () => {
  //   console.log("Complete Resume Data:", resumeData);
  //   // Add your resume generation logic here
  // };

  // const activeSections = useAppSelector((state) => state.resumeActiveSection);

  return (
    <div className="flex flex-col h-screen">
      {/* <AppHeader title="AI Resume Builder" /> */}

      <div className="flex-1 overflow-y-auto">
        <div className="flex max-md:flex-col ">
          {/* Left section */}
          <div className="w-full h-[63px] md:hidden bg-white border-b flex-shrink-0 sticky top-0 left-0 z-20"></div>

          <LeftSection />
          <SmallScreenResumeView />
          {/* <div className="w-full h-full absolute top-0 left-0 z-50 mb-1 bg-[#8b97b1]">
            <div className="w-full h-[72px] bg-black p-4 flex relative items-center justify-center">
              <div className="w-[40px] h-[40px] py-1 absolute top-4 right-2 rounded cursor-pointer  text-white  flex items-center justify-center">
                <IoClose className="text-[26px]" />
              </div>
              <div className="w-auto gap-2 h-auto p-1.5 flex items-center justify-between rounded border bg-white">
                <button className="w-auto min-w-[160px] rounded px-3 font-heading font-semibold h-[40px] bg-primary text-white">
                  Download
                </button>
                <div className="w-[40px] h-[40px] py-1 rounded cursor-pointer bg-primary text-white border flex items-center justify-center">
                  <MdMoreHoriz className="text-[22px]" />
                </div>
              </div>
            </div>
            <div className="w-full h-[560px] bg-fuchsia-400">

            </div>
            <div className="w-full h-[104px] bg-white border-t flex-shrink-0 fixed bottom-0 left-0 p-3 flex items-center justify-between gap-3">
              <div className="w-auto h-auto flex items-center justify-center flex-col  gap-0.5 rounded">
                <div className="w-[44px] h-[44px] bg-white border shadow-sm flex items-center justify-center rounded">
                  <LuLayoutPanelLeft className="text-[28px]" />
                </div>
                <span className="font-heading font-semibold text-[13px]">
                  Template
                </span>
              </div>
              <div className="w-auto h-auto flex items-center justify-center flex-col  gap-0.5 rounded">
                <div className="w-[44px] h-[44px] bg-white border shadow-sm flex items-center justify-center rounded">
                  <MdOutlineDesignServices className="text-[28px]" />
                </div>
                <span className="font-heading font-semibold text-[13px]">
                  Design
                </span>
              </div>
              <div className="w-auto h-auto flex items-center justify-center flex-col  gap-0.5 rounded">
                <div className="w-[44px] h-[44px] bg-white border shadow-sm flex items-center justify-center rounded">
                  <MdOutlineVerified className="text-[28px]" />
                </div>
                <span className="font-heading font-semibold text-[13px]">
                  ATS Fix
                </span>
              </div>
              <div className="w-auto h-auto flex items-center justify-center flex-col gap-0.5 rounded">
                <div className="w-[44px] h-[44px] bg-white border shadow-sm flex items-center justify-center rounded">
                  <BiSelectMultiple className="text-[28px]" />
                </div>
                <span className="font-heading font-semibold text-[13px]">
                  AI Fix
                </span>
              </div>
              <div className="w-auto h-auto flex items-center justify-center flex-col  gap-0.5 rounded">
                <div className="w-[44px] h-[44px] bg-white border shadow-sm flex items-center justify-center rounded">
                  <LuLayoutPanelLeft className="text-[28px]" />
                </div>
                <span className="font-heading font-semibold text-[13px]">
                  Template
                </span>
              </div>
            </div>
          </div> */}

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
                {/* <div className="w-[36px] h-[36px] py-1 rounded cursor-pointer sticky top-6 right-4 bg-fuchsia-400 text-gray-600 border flex items-center justify-center gap-1">
                  <TbWindowMinimize className="text-[20px] -mt-0.5" />
                </div> */}
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

      {/* <AddSectionPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSaveSections}
        parentRef={leftSectionRef}
        initialSelectedSections={selectedSections}
      /> */}
    </div>
  );
};

export default AiResumeBuilder;
