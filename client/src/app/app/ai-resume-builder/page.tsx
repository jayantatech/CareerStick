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
import AppHeader from "@/components/AppHeader";
import PortfolioAndSocialLinks from "@/components/sections/PortfolioAndSocialLinks";
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

  return (
    <div className="flex flex-col h-screen">
      <AppHeader title="AI Resume Builder" />

      <div className="flex-1 overflow-y-auto">
        <div className="flex">
          {/* Left section */}
          <div ref={leftSectionRef} className="w-[40%] p-4 px-6">
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

          {/* Right section */}
          <div className="w-[60%] bg-gray-500 sticky top-0 h-[calc(100vh-63px)]">
            <div className="w-full h-[450px]"></div>
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

// components/AddSectionPopup.tsx
// [Previous AddSectionPopup component code remains the same]

// // constants.ts
// [Previous constants code remains the same]

// working code
// "use client";
// // types.ts
// export interface Section {
//   id: string;
//   title: string;
//   icon: React.ElementType;
//   defaultSelected?: boolean;
//   required?: boolean;
//   order?: number;
// }

// export interface SelectedSections {
//   [key: string]: boolean;
// }

// // components/AiResumeBuilder/index.tsx

// import React, { useState, useRef } from "react";
// import { VscHubot } from "react-icons/vsc";
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
// // import AddSectionPopup from "./AddSectionPopup";
// // AddSectionPopup
// // import { SECTION_CONFIG } from "./constants";
// // SECTION_CONFIG
// // import type { SelectedSections } from "./types";
// // SelectedSections
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
//     console.log("Updated sections:", sections);
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <AppHeader title="AI Resume Builder" />

//       <div className="flex-1 overflow-y-auto">
//         <div className="flex">
//           {/* Left section */}
//           <div ref={leftSectionRef} className="w-[46%] p-4 px-6">
//             <div className="mb-3">
//               <div className="w-full min-h-[76px] bg-lightprimany border rounded mb-3 mt-1 p-2">
//                 <p className="text-[15px] font-body">
//                   <span className="font-bold">Note:</span> you are the user of
//                   careerstick.com so enter your basic info and let our
//                   StickBotLite AI Model help you to get a professional resume
//                 </p>
//               </div>
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

//             {/* Bottom buttons */}
//             <div className="w-full space-y-2 mb-4">
//               <button
//                 onClick={() => setIsPopupOpen(true)}
//                 className="w-full h-[44px] border-[1.5px] hover:scale-[.992] transition-all duration-150 bg-white rounded flex items-center justify-center cursor-pointer"
//               >
//                 <span className="font-heading font-semibold text-black">
//                   Add Section
//                 </span>
//               </button>

//               <button className="w-full h-[44px] bg-primary rounded flex items-center justify-center cursor-pointer hover:scale-[.992] transition-all duration-150">
//                 <VscHubot className="text-[28px] text-white mr-1" />
//                 <span className="font-heading font-semibold text-white">
//                   Generate Resume
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* Right section */}
//           <div className="w-[54%] bg-gray-500 sticky top-0 h-[calc(100vh-63px)]">
//             <div className="w-full h-[450px]"></div>
//           </div>
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

// // components/AddSectionPopup.tsx
// // [Previous AddSectionPopup component code remains the same]

// // // constants.ts
// // [Previous constants code remains the same]
