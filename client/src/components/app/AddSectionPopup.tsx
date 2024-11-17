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
// import { FaGithub, FaTrophy, FaUser } from "react-icons/fa";
// import { PiCertificateFill, PiProjectorScreenChartFill } from "react-icons/pi";
// import { IoLanguageSharp, IoSchool } from "react-icons/io5";
// import { RiOpenSourceFill } from "react-icons/ri";
// import { MdDashboardCustomize, MdOutlineWork } from "react-icons/md";
// import { VscVscode } from "react-icons/vsc";
// import React, { useState, useRef, useEffect } from "react";
// import { IoCloseSharp } from "react-icons/io5";

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
//   const [isAnimating, setIsAnimating] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       setIsAnimating(true);
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     if (parentRef.current) {
//       const rect = parentRef.current.getBoundingClientRect();
//       setParentPosition({
//         left: rect.left,
//         width: rect.width,
//       });
//     }
//   }, [isOpen, parentRef]);

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

//   if (!isOpen && !isAnimating) return null;

//   return (
//     <div
//       className={`fixed inset-0 z-40 overflow-hidden transition-opacity  ${
//         isOpen ? "opacity-100" : "opacity-0"
//       }`}
//       onClick={handleClickOutside}
//       onTransitionEnd={() => {
//         if (!isOpen) setIsAnimating(false);
//       }}
//     >
//       <div
//         className={`absolute inset-0 bg-black transition-opacity duration-300 ${
//           isOpen ? "bg-opacity-50" : "bg-opacity-0"
//         }`}
//       />
//       <div
//         ref={popupRef}
//         style={{
//           left: parentPosition.left,
//           width: parentPosition.width,
//         }}
//         className={`absolute bg-white rounded-t-lg overflow-hidden transition-all duration-500 ease-out transform
//           ${
//             isOpen
//               ? "translate-y-0 bottom-0"
//               : "translate-y-full bottom-[-100%]"
//           }
//         `}
//       >
//         <div className="p-4">
//           <div className="flex items-center justify-between mb-4">
//             <h4 className="font-heading font-semibold text-[18px]">
//               Add Section
//             </h4>
//             <button
//               onClick={onClose}
//               className="w-[30px] h-[30px] border rounded-sm flex items-center justify-center hover:scale-90 transition-all duration-150"
//             >
//               <IoCloseSharp className="text-[24px]" />
//             </button>
//           </div>

//           <div className="bg-blue-50 border border-blue-100 rounded mb-4 p-3">
//             <p className="text-[15px] font-body text-blue-800">
//               <span className="font-bold">Tips:</span> Add relevant sections for
//               your desired job. Required sections cannot be disabled.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 gap-4 mb-4 max-h-[400px] overflow-y-auto">
//             {SECTION_CONFIG.sort((a, b) => (a.order || 0) - (b.order || 0)).map(
//               (section) => {
//                 const Icon = section.icon;
//                 const isSelected = selectedSections[section.id];
//                 const isRequired = section.required;

//                 return (
//                   <div
//                     key={section.id}
//                     onClick={() => toggleSection(section.id)}
//                     className={`
//                       relative h-[44px] flex items-center justify-start px-4
//                       font-semibold text-[15px] font-heading rounded
//                       transition-all duration-200 transform hover:scale-[0.99]
//                       active:scale-[0.95]
//                       ${
//                         isSelected
//                           ? "bg-blue-50 border-blue-500 border text-blue-800"
//                           : "bg-white border-gray-200 border text-gray-700"
//                       }
//                       ${
//                         isRequired
//                           ? "cursor-not-allowed opacity-75"
//                           : "cursor-pointer hover:border-blue-400"
//                       }
//                     `}
//                   >
//                     <Icon
//                       className={`mr-2 text-[18px] ${
//                         isSelected ? "text-blue-500" : "text-gray-500"
//                       }`}
//                     />
//                     {section.title}
//                     {isRequired && (
//                       <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-gray-500">
//                         Required
//                       </span>
//                     )}
//                   </div>
//                 );
//               }
//             )}
//           </div>

//           <button
//             onClick={handleSave}
//             className="w-full h-[44px] rounded bg-primary text-white font-semibold text-[15px] hover:bg-blue-700 transition-all duration-200 transform hover:scale-[0.99] active:scale-[0.95]"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddSectionPopup;

// import React, { useState } from "react";
// import { MdOutlineClose } from "react-icons/md";
// import { FaGithub, FaTrophy, FaUser } from "react-icons/fa";
// import { PiCertificateFill, PiProjectorScreenChartFill } from "react-icons/pi";
// import { IoLanguageSharp, IoSchool } from "react-icons/io5";
// import { RiOpenSourceFill } from "react-icons/ri";
// import { MdDashboardCustomize, MdOutlineWork } from "react-icons/md";
// import { VscVscode } from "react-icons/vsc";

// interface Section {
//   id: string;
//   title: string;
//   icon: React.ElementType;
//   defaultSelected?: boolean;
//   required?: boolean;
//   order?: number;
// }

// interface SelectedSections {
//   [key: string]: boolean;
// }

// interface AddSectionPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (sections: SelectedSections) => void;
//   initialSelectedSections: SelectedSections;
// }

// const SECTION_CONFIG: Section[] = [
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
//     title: "Open Source",
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

// const AddSectionPopup: React.FC<AddSectionPopupProps> = ({
//   isOpen,
//   onClose,
//   onSave,
//   initialSelectedSections,
// }) => {
//   const [selectedSections, setSelectedSections] = useState<SelectedSections>(
//     initialSelectedSections
//   );

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

//   if (!isOpen) return null;

//   return (
//     <div
//       className={`bg-white border shadow-md fixed max-lg:hidden right-9 bottom-7 rounded ${
//         isOpen ? "block" : "hidden"
//       }`}
//     >
//       <div className="w-full flex justify-between items-center p-2 border-b select-none">
//         <span className="font-heading text-[15px]">Add Sections</span>
//         <button
//           onClick={onClose}
//           className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
//         >
//           <MdOutlineClose className="text-[20px]" />
//         </button>
//       </div>

//       <div className="px-2.5 w-[280px] h-[410px] select-none mt-2 custom-scrollbar overflow-y-auto">
//         <div className="bg-blue-50 border border-blue-100 rounded mb-4 p-3">
//           <p className="text-[15px] font-body text-blue-800">
//             <span className="font-bold">Tips:</span> Add relevant sections for
//             your desired job. Required sections cannot be disabled.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-2 mb-4">
//           {SECTION_CONFIG.sort((a, b) => (a.order || 0) - (b.order || 0)).map(
//             (section) => {
//               const Icon = section.icon;
//               const isSelected = selectedSections[section.id];
//               const isRequired = section.required;

//               return (
//                 <div
//                   key={section.id}
//                   onClick={() => toggleSection(section.id)}
//                   className={`
//                     relative h-[44px] flex items-center justify-start px-4
//                     font-semibold text-[15px] font-heading rounded
//                     transition-all duration-200 transform hover:scale-[0.99]
//                     active:scale-[0.95]
//                     ${
//                       isSelected
//                         ? "bg-blue-50 border-blue-500 border text-blue-800"
//                         : "bg-white border-gray-200 border text-gray-700"
//                     }
//                     ${
//                       isRequired
//                         ? "cursor-not-allowed opacity-75"
//                         : "cursor-pointer hover:border-blue-400"
//                     }
//                   `}
//                 >
//                   <Icon
//                     className={`mr-2 text-[18px] ${
//                       isSelected ? "text-blue-500" : "text-gray-500"
//                     }`}
//                   />
//                   {section.title}
//                   {isRequired && (
//                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-gray-500">
//                       Required
//                     </span>
//                   )}
//                 </div>
//               );
//             }
//           )}
//         </div>
//       </div>

//       <div className="w-full h-auto flex flex-col p-2 border-t gap-1">
//         <button
//           onClick={onClose}
//           className="w-full h-[36px] rounded border bg-white hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleSave}
//           className="w-full h-[36px] rounded border bg-primary text-white font-heading hover:bg-blue-600"
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddSectionPopup;

// import React from "react";
// import { MdOutlineClose } from "react-icons/md";
// import { FaGithub, FaTrophy, FaUser } from "react-icons/fa";
// import { PiCertificateFill, PiProjectorScreenChartFill } from "react-icons/pi";
// import { IoLanguageSharp, IoSchool } from "react-icons/io5";
// import { RiOpenSourceFill } from "react-icons/ri";
// import { MdDashboardCustomize, MdOutlineWork } from "react-icons/md";
// import { VscVscode } from "react-icons/vsc";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import {
//   setSectionBoxState,
//   toggleSection,
// } from "@/lib/store/slices/resumeSectionState";

// interface Section {
//   id: string;
//   title: string;
//   icon: React.ElementType;
//   defaultSelected?: boolean;
//   required?: boolean;
//   order?: number;
// }

// const SECTION_CONFIG: Section[] = [
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
//     title: "Open Source",
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

// const AddSectionPopup: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const isActive = useAppSelector((state) => state.resumeActiveSection);
//   const selectedSections = useAppSelector((state) => state.resumeActiveSection);

//   const handleClose = () => {
//     dispatch(setSectionBoxState(false));
//   };

//   const handleToggleSection = (sectionId: string) => {
//     const section = SECTION_CONFIG.find((s) => s.id === sectionId);
//     if (section?.required) return;
//     dispatch(toggleSection(sectionId));
//   };

//   return (
//     <div
//       className={`bg-white border shadow-md fixed max-lg:hidden right-9 bottom-7 rounded ${
//         true ? "block" : "hidden"
//       }`}
//     >
//       <div className="w-full flex justify-between items-center p-2 border-b select-none">
//         <span className="font-heading text-[15px]">Add Sections</span>
//         <button
//           onClick={handleClose}
//           className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
//         >
//           <MdOutlineClose className="text-[20px]" />
//         </button>
//       </div>

//       <div className="px-2.5 w-[280px] h-[410px] select-none mt-2 custom-scrollbar overflow-y-auto">
//         <div className="bg-blue-50 border border-blue-100 rounded mb-4 p-3">
//           <p className="text-[15px] font-body text-blue-800">
//             <span className="font-bold">Tips:</span> Add relevant sections for
//             your desired job. Required sections cannot be disabled.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-2 mb-4">
//           {SECTION_CONFIG.sort((a, b) => (a.order || 0) - (b.order || 0)).map(
//             (section) => {
//               const Icon = section.icon;
//               const isSelected = selectedSections[section.id];
//               const isRequired = section.required;

//               return (
//                 <div
//                   key={section.id}
//                   onClick={() => handleToggleSection(section.id)}
//                   className={`
//                     relative h-[44px] flex items-center justify-start px-4
//                     font-semibold text-[15px] font-heading rounded
//                     transition-all duration-200 transform hover:scale-[0.99]
//                     active:scale-[0.95]
//                     ${
//                       isSelected
//                         ? "bg-blue-50 border-blue-500 border text-blue-800"
//                         : "bg-white border-gray-200 border text-gray-700"
//                     }
//                     ${
//                       isRequired
//                         ? "cursor-not-allowed opacity-75"
//                         : "cursor-pointer hover:border-blue-400"
//                     }
//                   `}
//                 >
//                   <Icon
//                     className={`mr-2 text-[18px] ${
//                       isSelected ? "text-blue-500" : "text-gray-500"
//                     }`}
//                   />
//                   {section.title}
//                   {isRequired && (
//                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-gray-500">
//                       Required
//                     </span>
//                   )}
//                 </div>
//               );
//             }
//           )}
//         </div>
//       </div>

//       <div className="w-full h-auto flex flex-col p-2 border-t gap-1">
//         <button
//           onClick={handleClose}
//           className="w-full h-[36px] rounded border bg-white hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleClose}
//           className="w-full h-[36px] rounded border bg-primary text-white font-heading hover:bg-blue-600"
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddSectionPopup;

// working before data savein the backend
// import React from "react";
// import { MdOutlineClose } from "react-icons/md";
// import { FaGithub, FaTrophy, FaUser } from "react-icons/fa";
// import { PiCertificateFill, PiProjectorScreenChartFill } from "react-icons/pi";
// import { IoLanguageSharp, IoSchool } from "react-icons/io5";
// import { RiOpenSourceFill } from "react-icons/ri";
// import { MdDashboardCustomize, MdOutlineWork } from "react-icons/md";
// import { VscVscode } from "react-icons/vsc";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import {
//   setPersonalInfo,
//   setWorkExperience,
//   setEducation,
//   setSocialLinks,
//   setSelectedSkills,
//   setProjects,
//   setLanguages,
//   setCertificate,
//   setAwards,
//   setOpenSourceContributions,
//   setCustomSections,
// } from "@/lib/store/slices/activeResumeSectionClice";
// import { setAddSectionBoxState } from "@/lib/store/slices/resumeFeatureState";
// import { setActiveSections } from "@/lib/store/slices/resumeStyle";

// interface Section {
//   id: keyof typeof sectionToActionMap;
//   title: string;
//   icon: React.ElementType;
//   defaultSelected?: boolean;
//   required?: boolean;
//   order?: number;
// }

// const SECTION_CONFIG: Section[] = [
//   {
//     id: "personalInfo",
//     title: "Personal Information",
//     icon: FaUser,
//     defaultSelected: true,
//     required: true,
//     order: 1,
//   },
//   {
//     id: "workExperience",
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
//     id: "socialLinks",
//     title: "Portfolio and Social Links",
//     icon: FaGithub,
//     order: 4,
//   },
//   {
//     id: "selectedSkills",
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
//     id: "certificate",
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
//     id: "openSourceContributions",
//     title: "Open Source",
//     icon: RiOpenSourceFill,
//     order: 10,
//   },
//   {
//     id: "customSections",
//     title: "Custom Sections",
//     icon: MdDashboardCustomize,
//     order: 11,
//   },
// ];

// const sectionToActionMap = {
//   personalInfo: setPersonalInfo,
//   workExperience: setWorkExperience,
//   education: setEducation,
//   socialLinks: setSocialLinks,
//   selectedSkills: setSelectedSkills,
//   projects: setProjects,
//   languages: setLanguages,
//   certificate: setCertificate,
//   awards: setAwards,
//   openSourceContributions: setOpenSourceContributions,
//   customSections: setCustomSections,
// } as const;

// const AddSectionPopup: React.FC = () => {
//   const isOpen = useAppSelector(
//     (state) => state.resumeFeatureState.addSectionBoxState
//   );
//   // onClose
//   const dispatch = useAppDispatch();
//   const activeSections = useAppSelector(
//     (state) => state.resumeStyle.activeSections
//   );

//   const handleToggleSection = (sectionId: keyof typeof sectionToActionMap) => {
//     const section = SECTION_CONFIG.find((s) => s.id === sectionId);
//     if (section?.required) return;

//     const action = sectionToActionMap[sectionId];
//     dispatch(
//       setActiveSections({
//         ...activeSections,
//         [sectionId]: !activeSections[sectionId],
//       })
//     );
//   };

//   const handleClose = () => {
//     dispatch(setAddSectionBoxState(false));
//   };

//   const handleSave = () => {
//     // Any additional save logic can go here
//     // onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="bg-white border shadow-md fixed max-lg:hidden right-9 bottom-7 rounded">
//       <div className="w-full flex justify-between items-center p-2 border-b select-none">
//         <span className="font-heading text-[15px]">Add Sections</span>
//         <button
//           onClick={handleClose}
//           className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
//         >
//           <MdOutlineClose className="text-[20px]" />
//         </button>
//       </div>

//       <div className="px-2.5 w-[304px] h-[410px] select-none mt-2 custom-scrollbar overflow-y-auto">
//         <div className="bg-blue-50 border border-blue-100 rounded mb-4 p-3">
//           <p className="text-[15px] font-body text-blue-800">
//             <span className="font-bold">Tips:</span> Add relevant sections for
//             your desired job. Required sections cannot be disabled.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-2 mb-4">
//           {SECTION_CONFIG.sort((a, b) => (a.order || 0) - (b.order || 0)).map(
//             (section) => {
//               const Icon = section.icon;
//               const isSelected = activeSections[section.id];
//               const isRequired = section.required;

//               return (
//                 <div
//                   key={section.id}
//                   onClick={() => handleToggleSection(section.id)}
//                   className={`
//                     relative h-[44px] flex items-center justify-start px-4
//                     font-semibold text-[15px] font-heading rounded
//                     transition-all duration-200 transform hover:scale-[0.99]
//                     active:scale-[0.95]
//                     ${
//                       isSelected
//                         ? "bg-blue-50 border-blue-500 border text-blue-800"
//                         : "bg-white border-gray-200 border text-gray-700"
//                     }
//                     ${
//                       isRequired
//                         ? "cursor-not-allowed opacity-75"
//                         : "cursor-pointer hover:border-blue-400"
//                     }
//                   `}
//                 >
//                   <Icon
//                     className={`mr-2 text-[18px] ${
//                       isSelected ? "text-blue-500" : "text-gray-500"
//                     }`}
//                   />
//                   {section.title}
//                   {isRequired && (
//                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-gray-500">
//                       Required
//                     </span>
//                   )}
//                 </div>
//               );
//             }
//           )}
//         </div>
//       </div>

//       <div className="w-full h-auto flex flex-col p-2 border-t gap-1">
//         <button
//           // onClick={onClose}
//           className="w-full h-[36px] rounded border bg-white hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleSave}
//           className="w-full h-[36px] rounded border bg-primary text-white font-heading hover:bg-blue-600"
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddSectionPopup;

// fully woring code before optimizing

// import React, { useEffect } from "react";
// import { MdOutlineClose } from "react-icons/md";
// import { FaGithub, FaTrophy, FaUser } from "react-icons/fa";
// import { PiCertificateFill, PiProjectorScreenChartFill } from "react-icons/pi";
// import { IoLanguageSharp, IoSchool } from "react-icons/io5";
// import { RiOpenSourceFill } from "react-icons/ri";
// import { MdDashboardCustomize, MdOutlineWork } from "react-icons/md";
// import { VscVscode } from "react-icons/vsc";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import {
//   setPersonalInfo,
//   setWorkExperience,
//   setEducation,
//   setSocialLinks,
//   setSelectedSkills,
//   setProjects,
//   setLanguages,
//   setCertificate,
//   setAwards,
//   setOpenSourceContributions,
//   setCustomSections,
// } from "@/lib/store/slices/activeResumeSectionClice";
// import { setAddSectionBoxState } from "@/lib/store/slices/resumeFeatureState";
// import { setActiveSections } from "@/lib/store/slices/resumeStyle";
// import api from "@/lib/api";
// import { useParams } from "next/navigation";

// interface Section {
//   id: keyof typeof SECTION_IDS;
//   title: string;
//   icon: React.ElementType;
//   defaultSelected?: boolean;
//   required?: boolean;
//   order?: number;
// }
// const SECTION_IDS = {
//   personalInfo: "personalInfo",
//   workExperience: "workExperience",
//   education: "education",
//   socialLinks: "socialLinks",
//   selectedSkills: "selectedSkills",
//   projects: "projects",
//   languages: "languages",
//   certificate: "certificate",
//   awards: "awards",
//   openSourceContributions: "openSourceContributions",
//   customSections: "customSections",
// } as const;

// const SECTION_CONFIG: Section[] = [
//   {
//     id: "personalInfo",
//     title: "Personal Information",
//     icon: FaUser,
//     defaultSelected: true,
//     required: true,
//     order: 1,
//   },
//   {
//     id: "workExperience",
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
//     id: "socialLinks",
//     title: "Portfolio and Social Links",
//     icon: FaGithub,
//     order: 4,
//   },
//   {
//     id: "selectedSkills",
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
//     id: "certificate",
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
//     id: "openSourceContributions",
//     title: "Open Source",
//     icon: RiOpenSourceFill,
//     order: 10,
//   },
//   {
//     id: "customSections",
//     title: "Custom Sections",
//     icon: MdDashboardCustomize,
//     order: 11,
//   },
// ];

// const sectionToActionMap = {
//   personalInfo: setPersonalInfo,
//   workExperience: setWorkExperience,
//   education: setEducation,
//   socialLinks: setSocialLinks,
//   selectedSkills: setSelectedSkills,
//   projects: setProjects,
//   languages: setLanguages,
//   certificate: setCertificate,
//   awards: setAwards,
//   openSourceContributions: setOpenSourceContributions,
//   customSections: setCustomSections,
// } as const;

// const AddSectionPopup: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const isOpen = useAppSelector(
//     (state) => state.resumeFeatureState.addSectionBoxState
//   );
//   const activeSections = useAppSelector(
//     (state) => state.resumeStyle.activeSections
//   );

//   const params = useParams();

//   const handleToggleSection = async (sectionId: keyof typeof SECTION_IDS) => {
//     const section = SECTION_CONFIG.find((s) => s.id === sectionId);
//     if (section?.required) return;

//     const newActiveSections = {
//       ...activeSections,
//       [sectionId]: !activeSections[sectionId as keyof typeof activeSections],
//     };

//     dispatch(setActiveSections(newActiveSections));
//   };

//   const handleClose = () => {
//     dispatch(setAddSectionBoxState(false));
//   };

//   const handleSave = async () => {
//     try {
//       const res = await api.post(
//         `/resume/settings/active-sections/${params?.id}`,
//         {
//           activeSections,
//         }
//       );
//       console.log("res data is hear", res.data);
//       handleClose();
//     } catch (error) {
//       console.error("Failed to save sections:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchActiveSections = async () => {
//       try {
//         const response = await api.get(
//           `/resume/settings/active-sections/${params?.id}`
//         );
//         console.log("response data is hear for active sections", response.data);
//         dispatch(setActiveSections(response.data.activeSections));
//       } catch (error) {
//         console.error("Failed to fetch active sections:", error);
//       }
//     };
//     fetchActiveSections();
//   }, [params?.id]);

//   if (!isOpen) return null;

//   return (
//     <div className="bg-white border shadow-md fixed max-lg:hidden right-9 bottom-7 rounded">
//       <div className="w-full flex justify-between items-center p-2 border-b select-none">
//         <span className="font-heading text-[15px]">Add Sections</span>
//         <button
//           onClick={handleClose}
//           className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
//         >
//           <MdOutlineClose className="text-[20px]" />
//         </button>
//       </div>

//       <div className="px-2.5 w-[304px] h-[410px] select-none mt-2 custom-scrollbar overflow-y-auto">
//         <div className="bg-blue-50 border border-blue-100 rounded mb-4 p-3">
//           <p className="text-[15px] font-body text-blue-800">
//             <span className="font-bold">Tips:</span> Add relevant sections for
//             your desired job. Required sections cannot be disabled.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-2 mb-4">
//           {SECTION_CONFIG.sort((a, b) => (a.order || 0) - (b.order || 0)).map(
//             (section) => {
//               const Icon = section.icon;
//               const isSelected = activeSections[section.id];
//               const isRequired = section.required;

//               return (
//                 <div
//                   key={section.id}
//                   onClick={() => handleToggleSection(section.id)}
//                   className={`
//                     relative h-[44px] flex items-center justify-start px-4
//                     font-semibold text-[15px] font-heading rounded
//                     transition-all duration-200 transform hover:scale-[0.99]
//                     active:scale-[0.95]
//                     ${
//                       isSelected
//                         ? "bg-blue-50 border-blue-500 border text-blue-800"
//                         : "bg-white border-gray-200 border text-gray-700"
//                     }
//                     ${
//                       isRequired
//                         ? "cursor-not-allowed opacity-75"
//                         : "cursor-pointer hover:border-blue-400"
//                     }
//                   `}
//                 >
//                   <Icon
//                     className={`mr-2 text-[18px] ${
//                       isSelected ? "text-blue-500" : "text-gray-500"
//                     }`}
//                   />
//                   {section.title}
//                   {isRequired && (
//                     <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-gray-500">
//                       Required
//                     </span>
//                   )}
//                 </div>
//               );
//             }
//           )}
//         </div>
//       </div>

//       <div className="w-full h-auto flex flex-col p-2 border-t gap-1">
//         <button
//           // onClick={onClose}
//           className="w-full h-[36px] rounded border bg-white hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleSave}
//           className="w-full h-[36px] rounded border bg-primary text-white font-heading hover:bg-blue-600"
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddSectionPopup;

import React, { useEffect, useState, useCallback } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FaGithub, FaTrophy, FaUser } from "react-icons/fa";
import { PiCertificateFill, PiProjectorScreenChartFill } from "react-icons/pi";
import { IoLanguageSharp, IoSchool } from "react-icons/io5";
import { RiOpenSourceFill } from "react-icons/ri";
import { MdDashboardCustomize, MdOutlineWork } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { debounce } from "lodash";
import { setAddSectionBoxState } from "@/lib/store/slices/resumeFeatureState";
import { setActiveSections } from "@/lib/store/slices/resumeStyle";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import ConfirmationDialog from "../ConfirmationDialog";
import useAuth from "@/lib/hooks/useAuth";
import { Skeleton } from "../ui/skeleton";

interface Section {
  id: keyof typeof SECTION_IDS;
  title: string;
  icon: React.ElementType;
  defaultSelected?: boolean;
  required?: boolean;
  order?: number;
}

const SECTION_IDS = {
  personalInfo: "personalInfo",
  workExperience: "workExperience",
  education: "education",
  socialLinks: "socialLinks",
  selectedSkills: "selectedSkills",
  projects: "projects",
  languages: "languages",
  certificate: "certificate",
  awards: "awards",
  openSourceContributions: "openSourceContributions",
  customSections: "customSections",
};

const SECTION_CONFIG: Section[] = [
  {
    id: "personalInfo",
    title: "Personal Information",
    icon: FaUser,
    defaultSelected: true,
    required: true,
    order: 1,
  },
  {
    id: "workExperience",
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
    id: "socialLinks",
    title: "Portfolio and Social Links",
    icon: FaGithub,
    order: 4,
  },
  {
    id: "selectedSkills",
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
    id: "certificate",
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
    id: "openSourceContributions",
    title: "Open Source",
    icon: RiOpenSourceFill,
    order: 10,
  },
  {
    id: "customSections",
    title: "Custom Sections",
    icon: MdDashboardCustomize,
    order: 11,
  },
];
// interface ConfirmationDialogProps {
//   onConfirm: () => void;
//   onCancel: () => void;
// }

// const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
//   onConfirm,
//   onCancel,
// }) => {
//   return (
//     <div className="absolute inset-0 bg-black/50  flex items-center justify-center">
//       <div className="bg-white rounded w-[280px] p-4 shadow-lg">
//         <h3 className="text-lg font-heading mb-2">Unsaved Changes</h3>
//         <p className="text-gray-600 text-sm mb-4">
//           You have unsaved changes. Would you like to save them before closing?
//         </p>
//         <div className="flex justify-end w-full h-auto gap-2">
//           <button
//             onClick={onCancel}
//             className=" w-1/2 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50"
//           >
//             Discard
//           </button>
//           <button
//             onClick={onConfirm}
//             className="w-1/2 py-1.5 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
const AddSectionPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const isOpen = useAppSelector(
    (state) => state.resumeFeatureState.addSectionBoxState
  );
  const reduxActiveSections = useAppSelector(
    (state) => state.resumeStyle.activeSections
  );
  const { isLoading, user } = useAuth();
  const [localActiveSections, setLocalActiveSections] =
    useState(reduxActiveSections);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Debounced function to update Redux state
  const debouncedUpdateRedux = useCallback(
    debounce((newSections) => {
      dispatch(setActiveSections(newSections));
    }, 1000),
    [dispatch]
  );
  const validateResumeId = (
    id: string | string[] | undefined
  ): id is string => {
    return typeof id === "string" && id.length === 24;
  };
  useEffect(() => {
    const fetchActiveSections = async () => {
      if (!validateResumeId(params?.id)) return;
      if (!user?._id) return;
      try {
        const response = await api.post(
          `/resume/settings/get-active-sections/${params?.id}`,
          { userId: user?._id }
        );
        console.log("response.data  get active sections", response.data);
        const sections = response.data.activeSections;
        setLocalActiveSections(sections);
        dispatch(setActiveSections(sections));
      } catch (error) {
        console.error("Failed to fetch active sections:", error);
      }
    };

    if (params?.id && !isLoading) {
      console.log("we are here");
      fetchActiveSections();
    }
  }, [params?.id, isLoading, user?._id]);

  const handleToggleSection = (sectionId: keyof typeof SECTION_IDS) => {
    const section = SECTION_CONFIG.find((s) => s.id === sectionId);
    if (section?.required) return;

    const newActiveSections = {
      ...localActiveSections,
      [sectionId]: !localActiveSections[sectionId],
    };

    setLocalActiveSections(newActiveSections);
    setHasUnsavedChanges(true);
    debouncedUpdateRedux(newActiveSections);
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowConfirmation(true);
    } else {
      dispatch(setAddSectionBoxState(false));
    }
  };

  const handleSave = async () => {
    if (!validateResumeId(params?.id)) return;
    if (!user?._id) return;
    try {
      setIsSaving(true);
      await api.post(`/resume/settings/active-sections/${params?.id}`, {
        activeSections: localActiveSections,
        userId: user?._id,
      });
      dispatch(setActiveSections(localActiveSections));
      setHasUnsavedChanges(false);
      setShowConfirmation(false);
      dispatch(setAddSectionBoxState(false));
    } catch (error) {
      console.error("Failed to save sections:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscardChanges = () => {
    setLocalActiveSections(reduxActiveSections);
    setHasUnsavedChanges(false);
    setShowConfirmation(false);
    dispatch(setAddSectionBoxState(false));
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white border shadow-md fixed max-lg:hidden right-9 bottom-7 rounded">
      <div className="w-full flex justify-between items-center p-2 border-b select-none">
        <span className="font-heading text-[15px]">Add Sections</span>
        <button
          onClick={handleClose}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
        >
          <MdOutlineClose className="text-[20px]" />
        </button>
      </div>

      <div className="px-2.5 w-[304px] h-[410px] select-none mt-2 custom-scrollbar overflow-y-auto">
        <div className="bg-blue-50 border border-blue-100 rounded mb-4 p-3">
          <p className="text-[15px] font-body text-blue-800">
            <span className="font-bold">Tips:</span> Add relevant sections for
            your desired job. Required sections cannot be disabled.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 mb-4">
          {SECTION_CONFIG.sort((a, b) => (a.order || 0) - (b.order || 0)).map(
            (section) => {
              const Icon = section.icon;
              const isSelected = localActiveSections[section.id];
              const isRequired = section.required;

              return (
                <div
                  key={section.id}
                  onClick={() => handleToggleSection(section.id)}
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
      </div>

      <div className="w-full h-auto flex flex-col p-2 border-t gap-1">
        <button
          onClick={handleClose}
          className="w-full h-[36px] rounded border bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        {!isLoading ? (
          <button
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges}
            className={`w-full h-[36px] rounded border bg-primary text-white font-heading 
            ${
              isSaving || !hasUnsavedChanges
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        ) : (
          <Skeleton className="w-full h-[40px] rounded border" />
        )}
      </div>

      {showConfirmation && (
        <ConfirmationDialog
          onConfirm={handleSave}
          onCancel={handleDiscardChanges}
        />
      )}
    </div>
  );
};

export default AddSectionPopup;
