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

import React, { useState, useRef } from "react";
import { VscHubot } from "react-icons/vsc";
import JobIndustryFields from "@/components/sections/AiResumeBuilder/JobIndustryFields";
import PersonalInformationFields from "@/components/sections/AiResumeBuilder/PersonalInformationFields";
import ProfessionalSummaryField from "@/components/sections/AiResumeBuilder/ProfessionalSummaryField";
import WorkExperienceFields from "@/components/sections/AiResumeBuilder/WorkExperienceFields";
import EducationSection from "@/components/sections/AiResumeBuilder/EducationSection";
// import AppHeader from "@/components/AppHeader";

import SelectSkillsSection from "@/components/sections/AiResumeBuilder/SelectSkillsSection";
import ProjectsSection from "@/components/sections/AiResumeBuilder/AddProjectsSection";
import LanguageSection from "@/components/sections/AiResumeBuilder/LanguageSection";
import CertificationsSection from "@/components/sections/AiResumeBuilder/CertificationsSection";
import AwardsSection from "@/components/sections/AiResumeBuilder/AwardsSection";
import OpenSourceSection from "@/components/sections/AiResumeBuilder/OpenSourceSection";
import CustomSections from "@/components/sections/AiResumeBuilder/CustomSections";
import AddSectionPopup, {
  SECTION_CONFIG,
} from "@/components/app/AddSectionPopup";
import { useAppSelector } from "@/lib/store/hooks";
import PortfolioAndSocialLinks from "@/components/sections/AiResumeBuilder/PortfolioAndSocialLinks";

import ResumeViewTwo from "@/components/sections/resumes/ResumeViewTwo";

import SelectResumeSlider from "@/components/resume/SelectResumeSlider";
import ResumeFeatureBox from "@/components/resume/ResumeFeatureBox";
import FontAndDesignSection from "@/components/resume/FontAndDesignSection";
import ATSOptimizationBox from "@/components/resume/ATSOptimizationBox";
import AISuggestionsBox from "@/components/resume/AISuggestionsBox";
import LeftSection from "@/components/sections/AiResumeBuilder/home/LeftSection";
import { TbWindowMinimize } from "react-icons/tb";

const AiResumeBuilder: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSections, setSelectedSections] = useState<SelectedSections>(
    () =>
      SECTION_CONFIG.reduce(
        (acc, section) => ({
          ...acc,
          [section.id]: section.defaultSelected || false,
        }),
        {}
      )
  );

  const leftSectionRef = useRef<HTMLDivElement>(null);
  const resumeData = useAppSelector((state) => state.resume);

  const handleSaveSections = (sections: SelectedSections): void => {
    setSelectedSections(sections);
    console.log("Updated sections:", sections);
  };

  const handleGenerateResume = () => {
    console.log("Complete Resume Data:", resumeData);
    // Add your resume generation logic here
  };

  // const activeSections = useAppSelector((state) => state.resumeActiveSection);

  return (
    <div className="flex flex-col h-screen">
      {/* <AppHeader title="AI Resume Builder" /> */}

      <div className="flex-1 overflow-y-auto">
        <div className="flex">
          {/* Left section */}
          {/* <div
            ref={leftSectionRef}
            className=" max-m-desktop:w-[48%] m-desktop:w-[36%] max-lg:w-full select-none "
          >
            <div className="w-full h-[63px] bg-white border-b flex-shrink-0 sticky top-0 left-0 z-20"></div>
            <div className="p-4 px-6">
              <div className="mb-3">
                <div className="bg-blue-50 border border-blue-100 rounded mb-4 p-3">
                  <p className="text-[15px] font-body text-blue-800">
                    <span className="font-bold">Note: </span> you are the user
                    of careerstick.com so enter your basic info and let our
                    StickBotLite AI Model help you to get a professional resume
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <JobIndustryFields />
              </div>

              <div className="mb-4">
                <PersonalInformationFields />
              </div>

              <div className="pb-4">
                <ProfessionalSummaryField />
              </div>

              <div className="pb-4">
                <WorkExperienceFields />
              </div>

              <div className="pb-4">
                <EducationSection />
              </div>

              <div className="pb-4">
                <PortfolioAndSocialLinks />
              </div>

              <div className="pb-4">
                <SelectSkillsSection />
              </div>

              <div className="pb-4">
                <ProjectsSection />
              </div>

              <div className="pb-4">
                <LanguageSection />
              </div>

              <div className="pb-4">
                <CertificationsSection />
              </div>

              <div className="pb-4">
                <AwardsSection />
              </div>

              <div className="pb-4">
                <OpenSourceSection />
              </div>

              <div className="pb-4">
                <CustomSections />
              </div>

              <div className="w-full space-y-2 mb-4">
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="w-full h-[44px] border-[1.5px] hover:scale-[.992] transition-all duration-150 bg-white rounded flex items-center justify-center cursor-pointer"
                >
                  <span className="font-heading font-semibold text-black">
                    Add Section
                  </span>
                </button>
                <button
                  onClick={handleGenerateResume}
                  className="w-full h-[44px] bg-primary rounded flex items-center justify-center cursor-pointer hover:scale-[.992] transition-all duration-150"
                >
                  <VscHubot className="text-[28px] text-white mr-1" />
                  <span className="font-heading font-semibold text-white">
                    Generate Resume
                  </span>
                </button>
              </div>
            </div>
          </div> */}
          <LeftSection />
          <div className="w-full h-[63px] bg-white border-b flex-shrink-0 sticky top-0 left-0 z-20"></div>

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
