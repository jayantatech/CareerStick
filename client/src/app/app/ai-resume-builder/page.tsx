// import PersonalInformationFields from "@/components/sections/AiResumeBuilder/PersonalInformationFields";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
// // import { TextInputField } from "@/components/inputComponents/TextInputField";
// // import { SelectFieldComponent } from "@/components/SelectFieldComponent";
// import { SelectValue } from "@/components/ui/select";
// import React from "react";
// import { MdAdd } from "react-icons/md";
// import JobIndustryFields from "@/components/sections/AiResumeBuilder/JobIndustryFields";
// import ProfessionalSummaryField from "@/components/sections/AiResumeBuilder/ProfessionalSummaryField";
// import WorkExperienceFields from "@/components/sections/AiResumeBuilder/WorkExperienceFields";
// import SortableEducationItem from "@/components/sections/AiResumeBuilder/EducationSection";
// import EducationSection from "@/components/sections/AiResumeBuilder/EducationSection";

// const AiResumeBuilder = () => {
//   return (
//     <div>
//       <div className="w-full h-[63px] bg-wdhite border-b">
//         <div className="w-full mx-auto px-4 sm:px-6 lg:px-6">
//           <div className="py-[13px] flex items-center justify-between">
//             <h1 className="font-heading font-semibold text-2xl text-gray-900">
//               AI Resume Builder
//             </h1>
//             <button className="px-4 py-2 rounded font-heading font-semibold text-sm bg-blued-600 hidden text-white hover:bg-blue-700  items-center justify-center transition duration-150 ease-in-out">
//               <MdAdd className="mr-2" /> Create Resume
//             </button>
//           </div>
//         </div>
//       </div>
//       <section className="w-full h-[calc(100vh-63px)] mx-auto px-4 sm:px-6 lg:px-6 bg-reddd-400 py-3 flex items-center justify-center gap-10">
//         <div className="w-[46%] h-full bg-bddlue-600">
//           <div className="w-full h-auto mb-3 bg-grdeen-200">
//             <JobIndustryFields />
//           </div>
//           <div className="w-full h-auto mb-4  bg-purpdle-500">
//             <PersonalInformationFields />
//           </div>
//           <div className="w-full h-auto pb-4 bg-pdink-500">
//             <ProfessionalSummaryField />
//           </div>
//           <div className="w-full h-auto pb-4 bg-pdink-500">
//             <WorkExperienceFields />
//           </div>
//           <div className="w-full h-auto pb-4 bg-pdink-500">
//             <EducationSection />
//           </div>
//         </div>
//         <div className="w-[54%] h-full bg-yellow-200 sticky right-0 top-0"></div>
//       </section>
//     </div>
//   );
// };

// export default AiResumeBuilder;

// import React from "react";
// import { MdAdd } from "react-icons/md";
// import JobIndustryFields from "@/components/sections/AiResumeBuilder/JobIndustryFields";
// import PersonalInformationFields from "@/components/sections/AiResumeBuilder/PersonalInformationFields";
// import ProfessionalSummaryField from "@/components/sections/AiResumeBuilder/ProfessionalSummaryField";
// import WorkExperienceFields from "@/components/sections/AiResumeBuilder/WorkExperienceFields";
// import EducationSection from "@/components/sections/AiResumeBuilder/EducationSection";

// const AiResumeBuilder = () => {
//   return (
//     <div className="flex flex-col h-screen">
//       {/* Fixed header */}
//       <header className="w-full h-[63px] bg-white border-b flex-shrink-0">
//         <div className="w-full mx-auto px-4 sm:px-6 lg:px-6">
//           <div className="py-[13px] flex items-center justify-between">
//             <h1 className="font-heading font-semibold text-2xl text-gray-900">
//               AI Resume Builder
//             </h1>
//             <button className="px-4 py-2 rounded font-heading font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 items-center justify-center transition duration-150 ease-in-out">
//               <MdAdd className="mr-2 inline" /> Create Resume
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main content area */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Scrollable left section */}
//         <div className="w-[46%] overflow-y-auto p-4">
//           <div className="mb-3">
//             <JobIndustryFields />
//           </div>
//           <div className="mb-4">
//             <PersonalInformationFields />
//           </div>
//           <div className="pb-4">
//             <ProfessionalSummaryField />
//           </div>
//           <div className="pb-4">
//             <WorkExperienceFields />
//           </div>
//           <div className="pb-4">
//             <EducationSection />
//           </div>
//         </div>

//         {/* Sticky right section */}
//         <div className="w-[54%] bg-yellow-200 sticky top-[63px] h-[calc(100vh-63px)] overflow-y-auto">
//           {/* Content for the right section */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AiResumeBuilder;

// last fully working version

// import React from "react";
// import { MdAdd, MdDashboardCustomize, MdOutlineWork } from "react-icons/md";
// import JobIndustryFields from "@/components/sections/AiResumeBuilder/JobIndustryFields";
// import PersonalInformationFields from "@/components/sections/AiResumeBuilder/PersonalInformationFields";
// import ProfessionalSummaryField from "@/components/sections/AiResumeBuilder/ProfessionalSummaryField";
// import WorkExperienceFields from "@/components/sections/AiResumeBuilder/WorkExperienceFields";
// import EducationSection from "@/components/sections/AiResumeBuilder/EducationSection";
// import AppHeader from "@/components/AppHeader";
// import PortfolioAndSocialLinks from "@/components/sections/PortfolioAndSocialLinks";
// import SelectSkillsSection from "@/components/sections/AiResumeBuilder/SelectSkillsSection";
// import ProjectsSection from "@/components/sections/AiResumeBuilder/AddProjectsSection";
// import LanguageSection from "@/components/sections/AiResumeBuilder/LanguageSection";
// import CertificationsSection from "@/components/sections/AiResumeBuilder/CertificationsSection";
// import AwardsSection from "@/components/sections/AiResumeBuilder/AwardsSection";
// import OpenSourceSection from "@/components/sections/AiResumeBuilder/OpenSourceSection";
// import CustomSections from "@/components/sections/AiResumeBuilder/CustomSections";
// import { VscHubot, VscVscode } from "react-icons/vsc";
// import AddSectionPopup from "@/components/app/AddSectionPopup";
// import { FaGithub, FaTrophy, FaUser, FaUserCheck } from "react-icons/fa";
// import {
//   PiCertificateFill,
//   PiProjectorScreenChartFill,
//   PiStudentFill,
// } from "react-icons/pi";
// import { IoLanguageSharp, IoSchool } from "react-icons/io5";
// import { RiOpenSourceFill } from "react-icons/ri";

// const AiResumeBuilder = () => {
//   return (
//     <div className="flex flex-col h-screen">
//       <AppHeader title="AI Resume Builder" />

//       {/* Scrollable content area */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="flex">
//           {/* Left section */}
//           <div className="w-[46%] p-4 px-6">
//             <div className="mb-3">
//               <div className="w-full min-h-[76px] bg-lightprimany border rounded mb-3 mt-1 p-2">
//                 <p className="text-[15px] font-body">
//                   <span className="font-bold">Note:</span> you are the user of
//                   careerstick.com so enter your basic info and let our
//                   StickBotLite Ai Model help you to get a profasnal resume
//                 </p>
//               </div>{" "}
//             </div>
//             <div className="mb-3">
//               <JobIndustryFields />
//             </div>

//             <div className="mb-4">
//               <PersonalInformationFields />
//             </div>
//             <div className="pb-4">
//               <ProfessionalSummaryField />
//             </div>
//             <div className="pb-4">
//               <WorkExperienceFields />
//             </div>
//             <div className="pb-4">
//               <EducationSection />
//             </div>
//             <div className="pb-4">
//               <PortfolioAndSocialLinks />
//             </div>
//             <div className="pb-4">
//               <SelectSkillsSection />
//             </div>
//             <div className="pb-4">
//               <ProjectsSection />
//             </div>
//             <div className="pb-4">
//               <LanguageSection />
//             </div>
//             <div className="pb-4">
//               <CertificationsSection />
//             </div>
//             <div className="pb-4">
//               <AwardsSection />
//             </div>
//             <div className="pb-4">
//               <OpenSourceSection />
//             </div>
//             <div className="pb-4">
//               <CustomSections />
//             </div>
//             <div className="w-full h-[104px] bg-dred-400 flex items-center flex-col justify-center gap-1">
//               <div className="w-full h-[44px] border-[1.5px] hover:scale-[.992] transition-all duration-150 bg-white rounded flex items-center justify-center cursor-pointer">
//                 <span className="font-heading font-semibold text-black">
//                   Add Section
//                 </span>
//               </div>
//               <div className="w-full h-[44px] bg-primary rounded flex items-center justify-center cursor-pointer hover:scale-[.992] transition-all duration-150">
//                 <VscHubot className={`text-[28px] text-white mr-1`} />
//                 <span className="font-heading font-semibold text-white">
//                   Generate Resume
//                 </span>
//               </div>
//             </div>
//             <AddSectionPopup />
//           </div>

//           {/* Sticky right section */}
//           <div
//             className="w-[54%] bg-gray-500 sticky top-0 h-[calc(100vh-63px)]
//           "
//           >
//             <div className="w-full h-[450px]"></div>
//             {/* Content for the right section */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AiResumeBuilder;

// "use client";

// import React, { useState, useRef } from "react";
// import { VscHubot } from "react-icons/vsc";
// // import { SECTION_CONFIG } from "./constants";

// // import AddSectionPopup from "./AddSectionPopup";
// // AddSectionPopup
// // import type { SelectedSections } from "./types";
// export interface SelectedSections {
//   [key: string]: boolean;
// }
// import { motion } from "framer-motion";
// import AddSectionPopup, {
//   SECTION_CONFIG,
// } from "@/components/app/AddSectionPopup";

// const AiResumeBuilder: React.FC = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
//   const [selectedSections, setSelectedSections] = useState<SelectedSections>(
//     () =>
//       SECTION_CONFIG.reduce(
//         (acc: any, section: any) => ({
//           ...acc,
//           [section.id]: section.defaultSelected || false,
//         }),
//         {}
//       )
//   );

//   const leftSectionRef = useRef<HTMLDivElement>(null);

//   const handleSaveSections = (sections: SelectedSections): void => {
//     setSelectedSections(sections);
//     // Here you can handle the selected sections data
//     console.log("Updated sections:", sections);
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex">
//         {/* Left section */}
//         <div ref={leftSectionRef} className="w-[46%] p-4 px-6">
//           {/* Your existing content */}

//           <div className="fixed bottom-4 left-[46%] -translate-x-[calc(100%-32px)] w-[calc(46%-48px)] space-y-2">
//             <motion.button
//               whileHover={{ scale: 0.99 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsPopupOpen(true)}
//               className="w-full h-[44px] border-[1.5px] bg-white rounded flex items-center justify-center transition-all duration-150"
//             >
//               <span className="font-heading font-semibold text-black">
//                 Add Section
//               </span>
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 0.99 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full h-[44px] bg-blue-600 rounded flex items-center justify-center text-white transition-all duration-150"
//             >
//               <VscHubot className="text-[28px] mr-2" />
//               <span className="font-heading font-semibold">
//                 Generate Resume
//               </span>
//             </motion.button>
//           </div>
//         </div>

//         {/* Right section */}
//         <div className="w-[54%] bg-gray-100 sticky top-0 h-[calc(100vh-63px)]">
//           {/* Preview content */}
//         </div>
//       </div>

//       <AddSectionPopup
//         isOpen={isPopupOpen}
//         onClose={() => setIsPopupOpen(false)}
//         onSave={handleSaveSections}
//         parentRef={leftSectionRef}
//         initialSelectedSections={selectedSections}
//       />
//     </div>
//   );
// };

// export default AiResumeBuilder;

"use client";
// types.ts
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

// components/AiResumeBuilder/index.tsx

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
// import ResumePreview from "@/components/sections/resumes/ResumePreview";
// import ResumeView from "@/components/sections/resumes/ResumeView";
import ResumeViewTwo from "@/components/sections/resumes/ResumeViewTwo";
// import { FaAngleLeft, FaAngleRight, FaCloudDownloadAlt } from "react-icons/fa";
// import {
//   MdCloudDownload,
//   MdOutlineCloudDownload,
//   MdOutlineDesignServices,
//   MdOutlineVerified,
// } from "react-icons/md";
// import Image from "next/image";
// import { AIBot } from "../../../../public/icons";
// import { TbFileTextAi } from "react-icons/tb";
// import { LuLayoutPanelLeft } from "react-icons/lu";
import SelectResumeSlider from "@/components/resume/SelectResumeSlider";
import ResumeFeatureBox from "@/components/resume/ResumeFeatureBox";

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
          <div
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

              {/* Bottom buttons */}
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
          </div>

          {/* Right section */}
          {/* <div className="w-[60%] m-desktop:w-[60%] bg-slate-500 max-lg:hidden left-0 top-0 h-[1840px]"> */}
          {/* <div className="w-full h-[450px]"></div> */}

          {/* <div className="">
              <ResumePreview />
            </div> */}
          {/* <div className="w-full h-full bg-red-200 flex items-center justify-center">
              <div className="w-[550px] h-auto bg-blue-200">
                <div className="w-[550px] h-[774px] bg-red-300"></div>
                <button className="w-full h-[48px] mt-2 bg-yellow-500 rounded font-heading font-semibold">
                  {" "}
                  Generate{" "}
                </button>
              </div>
            </div> */}
          {/* <ResumeView /> */}
          {/* <ResumeViewTwo /> */}
          {/* </div> */}
          {/* </div> */}
          <div className="relative w-[60%] m-desktop:w-[64%]  max-lg:hidden ">
            <div
              className="sticky top-0 overflow-y-auto custom-scrollbar bg-[#8b97b1] "
              style={{ maxHeight: "calc(100vh)" }}
            >
              <div className=" min-h-screen max-h-[2040px] bg-grddeen-500 flex flex-row ">
                <ResumeViewTwo />
                {/* <div className="w-[230px]  h-[330px] rounded p-2 bg-white top-8 sticky right-2 flex flex-col gap-1">
                  <div className="p-1.5 border rounded flex flex-col gap-1.5">
                    <div className="w-full h-auto py-1 rounded cursor-pointer bg-primary text-white flex items-center justify-center gap-1">
                      <MdOutlineCloudDownload className="text-[20px] -mt-0.5" />
                      <span className="font-heading font-semibold text-[16px]">
                        Download
                      </span>
                    </div>
                    <div className="w-full h-auto py-1 rounded cursor-pointer bg-primary text-white flex items-center justify-center gap-1">
                      <VscHubot className="text-[22px] -mt-0.5" />

                      <span className="font-heading font-semibold text-[16px]">
                        AI Generate
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-auto py-1 bg-redd-200 mt-1 p-1.5 border gap-2 rounded">
                    <div className="w-full h-auto py-1 rounded cursor-pointer text-gray-700 text-s flex items-center border border-transparent justify-start hover:border hover:border-primary hover:text-primary p-1.5 gap-1">
                      <LuLayoutPanelLeft className="text-[18px] -mt-0.5" />

                      <span className="font-heading font-semibold text-[15px]">
                        Templates
                      </span>
                    </div>

                    <div className="w-full h-auto py-1 rounded cursor-pointer text-gray-700 text-s flex items-center border border-transparent justify-start hover:border hover:border-primary hover:text-primary p-1.5 gap-1">
                      <MdOutlineDesignServices className="text-[18px] -mt-0.5" />

                      <span className="font-heading font-semibold text-[15px]">
                        Design & Font
                      </span>
                    </div>
                    <div className="w-full h-auto py-1 rounded cursor-pointer text-gray-700 text-s flex items-center border border-transparent justify-start hover:border hover:border-primary hover:text-primary p-1.5 gap-1">
                      <MdOutlineVerified className="text-[18px] -mt-0.5" />

                      <span className="font-heading font-semibold text-[15px]">
                        ATS Optimization
                      </span>
                    </div>
                    <div className="w-full h-auto py-1 rounded cursor-pointer text-gray-700 text-s flex items-center border border-transparent justify-start hover:border hover:border-primary hover:text-primary p-1.5 gap-1">
                      <LuLayoutPanelLeft className="text-[18px] -mt-0.5" />

                      <span className="font-heading font-semibold text-[15px]">
                        AI Generate
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-auto py-1 bg-redd-200 mt-1 p-1.5 border gap-1.5 rounded flex flex-col items-center justify-center">
                    <div className="w-full h-auto  cursor-pointer text-gray-700 text-s flex items-center justify-between hover:border-primary hover:text-primary  gap-1">
                      <div className="w-[26px] h-[26px] flex items-center justify-center border rounded">
                        <FaAngleLeft className="text-[22px] " />
                      </div>
                      <div className=" h-[26px] w-[86px] px-2 bg-white border flex items-center justify-center rounded">
                        <span className="font-heading font-semibold text-[15px]">
                          page 1
                        </span>
                      </div>
                      <div className="w-[26px] h-[26px] flex items-center justify-center border rounded">
                        <FaAngleRight className="text-[22px] " />
                      </div>
                    </div>
                    <button className="w-full h-[26px] border-primary  rounded font-heading flex items-center justify-center font-[14px] border bg-primary text-white ">
                      Set Main Resume
                    </button>
                  </div>
                </div> */}
                <ResumeFeatureBox />
              </div>
              {/* <div className=" w-[calc(100%-4%)] p-2  rounded h-[280px] bg-red-300 sticky bottom-10 left-8 z-50"></div> */}
              <SelectResumeSlider />
            </div>
          </div>
        </div>
      </div>

      <AddSectionPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSaveSections}
        parentRef={leftSectionRef}
        initialSelectedSections={selectedSections}
      />
    </div>
  );
};

export default AiResumeBuilder;
