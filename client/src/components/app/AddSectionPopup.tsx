// import React from "react";
// import { FaGithub, FaTrophy, FaUser, FaUserCheck } from "react-icons/fa";
// import {
//   PiCertificateFill,
//   PiProjectorScreenChartFill,
//   PiStudentFill,
// } from "react-icons/pi";
// import { IoCloseSharp, IoLanguageSharp, IoSchool } from "react-icons/io5";
// import { RiOpenSourceFill } from "react-icons/ri";
// import { MdDashboardCustomize, MdOutlineWork } from "react-icons/md";
// import { VscVscode } from "react-icons/vsc";

// const AddSectionPopup = () => {
//   return (
//     <div className="w-full h-[524px] bg-dred-300 border p-3 rounded">
//       <div className="w-full h-[34px] bg-emderald-400  flex items-center justify-between">
//         <h4 className="font-heading font-semibold text-[18px]">Add Section</h4>
//         <div className="w-[30px] h-[30px] border rounded-sm cursor-pointer items-center justify-center flex hover:scale-[.90] transition-all duration-150">
//           <IoCloseSharp className="text-[24px]" />
//         </div>
//       </div>
//       <div className="w-full min-h-[76px] bg-lightprimany border rounded mb-3 mt-1 p-2">
//         <p className="text-[15px] font-body">
//           <span className="font-bold">Tips:</span> Add only relevant sections
//           for your desired job. Avoid unnecessary details to keep your resume
//           concise and focused on key qualifications
//         </p>
//       </div>
//       <div className="w-full h-auto min-h-[240px] bg-gdreen-300 flex items-center justify-start flex-col gap-3 mt-2">
//         <div className="w-full h-[44px] flex items-center justify-center gap-4">
//           <div className="w-1/2 h-full bg-dwhite bg-lightprimany border-primary flex items-center justify-start px-4 font-semibold text-[15px] font-heading rounded border cursor-pointer hover:scale-[.990] transition-all duration-150 text-gray-700">
//             <FaUser className="-mt-1 mr-1 text-[18px] text-primary" />
//             Personal Information
//           </div>
//           <div className="w-1/2 h-full bg-white border flex items-center justify-start px-4 font-semibold text-[15px] font-heading rounded cursor-pointer hover:scale-[.990] transition-all duration-150">
//             <MdOutlineWork className="-mt-0 mr-1 text-[18px] text-primary" />
//             Work Experience
//           </div>
//         </div>
//         <div className="w-full h-[44px] flex items-center justify-center gap-4">
//           <div className="w-1/2 h-full bg-white border flex items-center justify-start px-4 font-semibold text-[15px] font-heading rounded cursor-pointer hover:scale-[.990] transition-all duration-150">
//             <IoSchool className=" mr-1 text-[18px] text-primary" />
//             Education
//           </div>
//           <div className="w-1/2 h-full bg-white border flex items-center justify-start px-4 font-semibold text-[15px] font-heading rounded cursor-pointer hover:scale-[.990] transition-all duration-150">
//             <FaGithub className="-mt-1 mr-1 text-[18px] text-primary" />
//             Portfolio and Social Links
//           </div>
//         </div>
//         <div className="w-full h-[44px] flex items-center justify-center gap-4">
//           <div className="w-1/2 h-full bg-white border flex items-center justify-start px-4 font-semibold text-[15px] font-heading rounded cursor-pointer hover:scale-[.990] transition-all duration-150">
//             <VscVscode className=" mr-1 text-[18px] text-primary" />
//             Select Skills
//           </div>
//           <div className="w-1/2 h-full bg-white border flex items-center justify-start px-4 font-semibold text-[15px] font-heading rounded cursor-pointer hover:scale-[.990] transition-all duration-150">
//             <PiProjectorScreenChartFill className=" mr-1 text-[18px] text-primary" />
//             Projects
//           </div>
//         </div>
//         <div className="w-full h-[44px] flex items-center justify-center gap-4">
//           <div className="w-1/2 h-full bg-white border flex items-center justify-start px-4 font-semibold text-[15px] font-heading rounded cursor-pointer hover:scale-[.990] transition-all duration-150">
//             <IoLanguageSharp className="text-[18px] text-primary mr-1" />
//             Languages
//           </div>
//           <div className="w-1/2 h-full bg-white border flex items-center justify-start px-4 font-semibold text-[15px] font-heading rounded cursor-pointer hover:scale-[.990] transition-all duration-150">
//             <PiCertificateFill className="text-[18px] text-primary mr-1" />
//             Certifications
//           </div>
//         </div>
//         <div className="w-full h-[44px] flex items-center justify-center gap-4">
//           <div className="w-1/2 h-full bg-white border flex items-center justify-start px-4 font-semibold text-[15px] font-heading rounded cursor-pointer hover:scale-[.990] transition-all duration-150">
//             <FaTrophy className="text-[18px] text-primary mr-1" />
//             Awards & Honors
//           </div>
//           <div className="w-1/2 h-full bg-white border flex items-center justify-start px-4 font-semibold text-[15px] font-heading rounded cursor-pointer hover:scale-[.990] transition-all duration-150">
//             <RiOpenSourceFill className=" mr-1 text-[18px] text-primary" />
//             Open Source Contributions
//           </div>
//         </div>
//         <div className="w-full h-[44px] flex items-center justify-start gap-4">
//           <div className="w-full h-full bg-white border flex items-center justify-center px-4 font-semibold text-[15px] font-heading rounded cursor-pointer hover:scale-[.990] transition-all duration-150">
//             <MdDashboardCustomize className=" text-[18px] text-primary mr-1" />
//             Custom Sections
//           </div>
//         </div>
//       </div>
//       <button className=" w-full h-[44px] rounded bg-primary mt-2 flex items-center justify-center px-4 font-semibold text-[15px] text-white font-heading cursor-pointer hover:scale-[.994] transition-all duration-150">
//         Save Changes
//       </button>
//     </div>
//   );
// };

// export default AddSectionPopup;

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
import { FaGithub, FaTrophy, FaUser } from "react-icons/fa";
import { PiCertificateFill, PiProjectorScreenChartFill } from "react-icons/pi";
import { IoLanguageSharp, IoSchool } from "react-icons/io5";
import { RiOpenSourceFill } from "react-icons/ri";
import { MdDashboardCustomize, MdOutlineWork } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";
import React, { useState, useRef, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
// import { SECTION_CONFIG } from "./constants";
// import type { SelectedSections } from "./types";
export const SECTION_CONFIG: Section[] = [
  {
    id: "personal-info",
    title: "Personal Information",
    icon: FaUser,
    defaultSelected: true,
    required: true,
    order: 1,
  },
  {
    id: "work-exp",
    title: "Work Experience",
    icon: MdOutlineWork,
    defaultSelected: true,
    required: true,
    order: 2,
  },
  {
    id: "education",
    title: "Education",
    icon: IoSchool,
    defaultSelected: true,
    required: true,
    order: 3,
  },
  {
    id: "portfolio",
    title: "Portfolio and Social Links",
    icon: FaGithub,
    order: 4,
  },
  {
    id: "skills",
    title: "Select Skills",
    icon: VscVscode,
    order: 5,
  },
  {
    id: "projects",
    title: "Projects",
    icon: PiProjectorScreenChartFill,
    order: 6,
  },
  {
    id: "languages",
    title: "Languages",
    icon: IoLanguageSharp,
    order: 7,
  },
  {
    id: "certifications",
    title: "Certifications",
    icon: PiCertificateFill,
    order: 8,
  },
  {
    id: "awards",
    title: "Awards & Honors",
    icon: FaTrophy,
    order: 9,
  },
  {
    id: "opensource",
    title: "Open Source Contributions",
    icon: RiOpenSourceFill,
    order: 10,
  },
  {
    id: "custom",
    title: "Custom Sections",
    icon: MdDashboardCustomize,
    order: 11,
  },
];

interface AddSectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sections: SelectedSections) => void;
  parentRef: React.RefObject<HTMLDivElement>;
  initialSelectedSections: SelectedSections;
}

const AddSectionPopup: React.FC<AddSectionPopupProps> = ({
  isOpen,
  onClose,
  onSave,
  parentRef,
  initialSelectedSections,
}) => {
  const [selectedSections, setSelectedSections] = useState<SelectedSections>(
    initialSelectedSections
  );
  const popupRef = useRef<HTMLDivElement>(null);
  const [parentPosition, setParentPosition] = useState({ left: 0, width: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      setParentPosition({
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedSections(initialSelectedSections);
  }, [initialSelectedSections]);

  const toggleSection = (sectionId: string): void => {
    const section = SECTION_CONFIG.find((s) => s.id === sectionId);
    if (section?.required) return;

    setSelectedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleSave = () => {
    onSave(selectedSections);
    onClose();
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className={`fixed inset-0 z-40 overflow-hidden transition-opacity  ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClickOutside}
      onTransitionEnd={() => {
        if (!isOpen) setIsAnimating(false);
      }}
    >
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "bg-opacity-50" : "bg-opacity-0"
        }`}
      />
      <div
        ref={popupRef}
        style={{
          left: parentPosition.left,
          width: parentPosition.width,
        }}
        className={`absolute bg-white rounded-t-lg overflow-hidden transition-all duration-500 ease-out transform
          ${
            isOpen
              ? "translate-y-0 bottom-0"
              : "translate-y-full bottom-[-100%]"
          }
        `}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading font-semibold text-[18px]">
              Add Section
            </h4>
            <button
              onClick={onClose}
              className="w-[30px] h-[30px] border rounded-sm flex items-center justify-center hover:scale-90 transition-all duration-150"
            >
              <IoCloseSharp className="text-[24px]" />
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded mb-4 p-3">
            <p className="text-[15px] font-body text-blue-800">
              <span className="font-bold">Tips:</span> Add relevant sections for
              your desired job. Required sections cannot be disabled.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 max-h-[400px] overflow-y-auto">
            {SECTION_CONFIG.sort((a, b) => (a.order || 0) - (b.order || 0)).map(
              (section) => {
                const Icon = section.icon;
                const isSelected = selectedSections[section.id];
                const isRequired = section.required;

                return (
                  <div
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className={`
                      relative h-[44px] flex items-center justify-start px-4 
                      font-semibold text-[15px] font-heading rounded 
                      transition-all duration-200 transform hover:scale-[0.99]
                      active:scale-[0.95]
                      ${
                        isSelected
                          ? "bg-blue-50 border-blue-500 border text-blue-800"
                          : "bg-white border-gray-200 border text-gray-700"
                      } 
                      ${
                        isRequired
                          ? "cursor-not-allowed opacity-75"
                          : "cursor-pointer hover:border-blue-400"
                      }
                    `}
                  >
                    <Icon
                      className={`mr-2 text-[18px] ${
                        isSelected ? "text-blue-500" : "text-gray-500"
                      }`}
                    />
                    {section.title}
                    {isRequired && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-gray-500">
                        Required
                      </span>
                    )}
                  </div>
                );
              }
            )}
          </div>

          <button
            onClick={handleSave}
            className="w-full h-[44px] rounded bg-primary text-white font-semibold text-[15px] hover:bg-blue-700 transition-all duration-200 transform hover:scale-[0.99] active:scale-[0.95]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSectionPopup;

// working code
// "use client";
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

// // constants.ts
// import { FaGithub, FaTrophy, FaUser } from "react-icons/fa";
// import { PiCertificateFill, PiProjectorScreenChartFill } from "react-icons/pi";
// import { IoLanguageSharp, IoSchool } from "react-icons/io5";
// import { RiOpenSourceFill } from "react-icons/ri";
// import { MdDashboardCustomize, MdOutlineWork } from "react-icons/md";
// import { VscVscode } from "react-icons/vsc";
// // import type { Section } from "./types";

// export const SECTION_CONFIG: Section[] = [
//   {
//     id: "personal-info",
//     title: "Personal Information",
//     icon: FaUser,
//     defaultSelected: true,
//     required: true,
//     order: 1,
//   },
//   {
//     id: "work-exp",
//     title: "Work Experience",
//     icon: MdOutlineWork,
//     defaultSelected: true,
//     required: true,
//     order: 2,
//   },
//   {
//     id: "education",
//     title: "Education",
//     icon: IoSchool,
//     defaultSelected: true,
//     required: true,
//     order: 3,
//   },
//   {
//     id: "portfolio",
//     title: "Portfolio and Social Links",
//     icon: FaGithub,
//     order: 4,
//   },
//   {
//     id: "skills",
//     title: "Select Skills",
//     icon: VscVscode,
//     order: 5,
//   },
//   {
//     id: "projects",
//     title: "Projects",
//     icon: PiProjectorScreenChartFill,
//     order: 6,
//   },
//   {
//     id: "languages",
//     title: "Languages",
//     icon: IoLanguageSharp,
//     order: 7,
//   },
//   {
//     id: "certifications",
//     title: "Certifications",
//     icon: PiCertificateFill,
//     order: 8,
//   },
//   {
//     id: "awards",
//     title: "Awards & Honors",
//     icon: FaTrophy,
//     order: 9,
//   },
//   {
//     id: "opensource",
//     title: "Open Source Contributions",
//     icon: RiOpenSourceFill,
//     order: 10,
//   },
//   {
//     id: "custom",
//     title: "Custom Sections",
//     icon: MdDashboardCustomize,
//     order: 11,
//   },
// ];

// // components/AddSectionPopup.tsx

// import React, { useState, useRef, useEffect } from "react";
// import { IoCloseSharp } from "react-icons/io5";
// // import { SECTION_CONFIG } from "./constants";
// // import type { SelectedSections } from "./types";
// import { motion, AnimatePresence } from "framer-motion";

// interface AddSectionPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (sections: SelectedSections) => void;
//   parentRef: React.RefObject<HTMLDivElement>;
//   initialSelectedSections: SelectedSections;
// }

// const AddSectionPopup: React.FC<AddSectionPopupProps> = ({
//   isOpen,
//   onClose,
//   onSave,
//   parentRef,
//   initialSelectedSections,
// }) => {
//   const [selectedSections, setSelectedSections] = useState<SelectedSections>(
//     initialSelectedSections
//   );
//   const popupRef = useRef<HTMLDivElement>(null);
//   const [parentPosition, setParentPosition] = useState({ left: 0, width: 0 });

//   useEffect(() => {
//     if (parentRef.current) {
//       const rect = parentRef.current.getBoundingClientRect();
//       setParentPosition({
//         left: rect.left,
//         width: rect.width,
//       });
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     setSelectedSections(initialSelectedSections);
//   }, [initialSelectedSections]);

//   const toggleSection = (sectionId: string): void => {
//     const section = SECTION_CONFIG.find((s) => s.id === sectionId);
//     if (section?.required) return;

//     setSelectedSections((prev) => ({
//       ...prev,
//       [sectionId]: !prev[sectionId],
//     }));
//   };

//   const handleSave = () => {
//     onSave(selectedSections);
//     onClose();
//   };

//   const handleClickOutside = (e: React.MouseEvent) => {
//     if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
//       onClose();
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-40 overflow-hidden"
//           onClick={handleClickOutside}
//         >
//           <div className="absolute inset-0 bg-black bg-opacity-50" />
//           <motion.div
//             ref={popupRef}
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             transition={{ type: "spring", bounce: 0, duration: 0.5 }}
//             style={{
//               left: parentPosition.left,
//               width: parentPosition.width,
//             }}
//             className="absolute bottom-0 bg-white rounded-t-lg overflow-hidden "
//           >
//             <div className="p-4">
//               <div className="flex items-center justify-between mb-4">
//                 <h4 className="font-heading font-semibold text-[18px]">
//                   Add Section
//                 </h4>
//                 <button
//                   onClick={onClose}
//                   className="w-[30px] h-[30px] border rounded-sm flex items-center justify-center hover:scale-90 transition-all duration-150"
//                 >
//                   <IoCloseSharp className="text-[24px]" />
//                 </button>
//               </div>

//               <div className="bg-blue-50 border border-blue-100 rounded mb-4 p-3">
//                 <p className="text-[15px] font-body text-blue-800">
//                   <span className="font-bold">Tips:</span> Add relevant sections
//                   for your desired job. Required sections cannot be disabled.
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-4 mb-4 max-h-[400px] overflow-y-auto">
//                 {SECTION_CONFIG.sort(
//                   (a, b) => (a.order || 0) - (b.order || 0)
//                 ).map((section) => {
//                   const Icon = section.icon;
//                   const isSelected = selectedSections[section.id];
//                   const isRequired = section.required;

//                   return (
//                     <motion.div
//                       key={section.id}
//                       whileHover={!isRequired ? { scale: 0.99 } : undefined}
//                       whileTap={!isRequired ? { scale: 0.95 } : undefined}
//                       onClick={() => toggleSection(section.id)}
//                       className={`
//                           relative h-[44px] flex items-center justify-start px-4
//                           font-semibold text-[15px] font-heading rounded
//                           transition-colors duration-200
//                           ${
//                             isSelected
//                               ? "bg-blue-50 border-blue-500 border text-blue-800"
//                               : "bg-white border-gray-200 border text-gray-700"
//                           }
//                           ${
//                             isRequired
//                               ? "cursor-not-allowed opacity-75"
//                               : "cursor-pointer hover:border-blue-400"
//                           }
//                         `}
//                     >
//                       <Icon
//                         className={`mr-2 text-[18px] ${
//                           isSelected ? "text-blue-500" : "text-gray-500"
//                         }`}
//                       />
//                       {section.title}
//                       {isRequired && (
//                         <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-gray-500">
//                           Required
//                         </span>
//                       )}
//                     </motion.div>
//                   );
//                 })}
//               </div>

//               <motion.button
//                 whileHover={{ scale: 0.99 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleSave}
//                 className="w-full h-[44px] rounded bg-primary text-white font-semibold text-[15px] hover:bg-blue-700 transition-colors duration-200"
//               >
//                 Save Changes
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default AddSectionPopup;
