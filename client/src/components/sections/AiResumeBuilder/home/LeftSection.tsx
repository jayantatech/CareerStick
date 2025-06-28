"use client";
import React, { useRef } from "react";
import JobIndustryFields from "../JobIndustryFields";
import PersonalInformationFields from "../PersonalInformationFields";
import ProfessionalSummaryField from "../ProfessionalSummaryField";
import EducationSection from "../EducationSection";
import PortfolioAndSocialLinks from "../PortfolioAndSocialLinks";
import SelectSkillsSection from "../SelectSkillsSection";
import ProjectsSection from "../AddProjectsSection";
import LanguageSection from "../LanguageSection";
import CertificationsSection from "../CertificationsSection";
import AwardsSection from "../AwardsSection";
import OpenSourceSection from "../OpenSourceSection";
import CustomSections from "../CustomSections";
import { useAppSelector } from "@/lib/store/hooks";
import WorkExperienceSection from "../WorkExperienceFields";
import ResumeTitleField from "../ResumeTitleSection";
import AIResumePrompt from "../AIPromptBox";

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

const LeftSection = () => {
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const activeSections = useAppSelector(
    (state) => state.resumeStyle.activeSections
  );

  return (
    <>
      <div
        ref={leftSectionRef}
        className=" max-m-desktop:w-[48%] m-desktop:w-[36%] max-lg:w-full select-none max-md:mb-12 lg:mb-6 "
      >
        <div className="w-full h-[63px] max-md:hidden bg-white border-b flex-shrink-0 sticky top-0 left-0 z-20"></div>

        <div className="p-4 px-6">
          <div className="mb-3">
            <div className="bg-blue-50 border border-blue-100 rounded mb-4 p-3">
              <p className="text-[15px] font-body text-blue-800">
                <span className="font-bold">Note: </span> you are the user of
                careerstick.com so enter your basic info and let our
                StickBotLite AI Model help you to get a professional resume
              </p>
            </div>
          </div>

          <div className="mb-3">
            <JobIndustryFields />
          </div>
          <div className="mb-3">
            <ResumeTitleField />
          </div>

          <div className="mb-4">
            <AIResumePrompt />
          </div>

          <div className="mb-4">
            <PersonalInformationFields />
          </div>
          {activeSections.professionalSummary && (
            <div className="pb-4">
              <ProfessionalSummaryField />
            </div>
          )}

          <div className="pb-4">
            {/* <WorkExperienceFields /> */}
            <WorkExperienceSection />
          </div>
          {activeSections.education && (
            <div className="pb-4">
              <EducationSection />
            </div>
          )}

          {activeSections.socialLinks && (
            <div className="pb-4">
              <PortfolioAndSocialLinks />
            </div>
          )}

          {activeSections.selectedSkills && (
            <div className="pb-4">
              <SelectSkillsSection />
            </div>
          )}
          {activeSections.projects && (
            <div className="pb-4">
              <ProjectsSection />
            </div>
          )}

          {activeSections.languages && (
            <div className="pb-4">
              <LanguageSection />
            </div>
          )}

          {activeSections.certificate && (
            <div className="pb-4">
              <CertificationsSection />
            </div>
          )}

          {activeSections.awards && (
            <div className="pb-4">
              <AwardsSection />
            </div>
          )}
          {activeSections.openSourceContributions && (
            <div className="pb-4">
              <OpenSourceSection />
            </div>
          )}

          {activeSections.customSections && (
            <div className="pb-4">
              <CustomSections />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LeftSection;
