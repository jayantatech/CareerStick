// import React from "react";
// import { Slider } from "@/components/ui/slider";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { MdOutlineClose } from "react-icons/md";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { setDesignAndFontBoxState } from "@/lib/store/slices/resumeFeatureState";
// const FontAndDesignSection = () => {
//   const isActive = useAppSelector(
//     (state) => state.resumeFeatureState.designAndFontBoxState
//   );
//   const dispatch = useAppDispatch();

//   const handleClose = () => {
//     dispatch(setDesignAndFontBoxState(false));
//   };

//   return (
//     <div
//       className={`bg-white border shadow-md fixed max-lg:hidden  right-9 bottom-7 rounded   ${
//         isActive ? "block" : "hidden"
//       }`}
//     >
//       {/* <button
//         className="absolute  -left-16 flex items-center justify-center text-[14px] bg-gray-200 border w-[44px] h-[44px] bottom-1/2   px-1  rounded right-0 z-40 text-black hover:bg-gray-400"
//         onClick={() => handleClose()}
//       >
//         <MdOutlineClose className="text-[28px]" />
//       </button> */}
//       <div className="w-full flex justify-between items-center p-2  border-b select-none">
//         <span className="font-heading text-[15px]">Design Settings</span>
//         <div className="flex gap-2  items-center justify-center">
//           <button
//             onClick={() => handleClose()}
//             className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
//           >
//             <MdOutlineClose className="text-[20px]" />
//           </button>
//         </div>
//       </div>
//       {/* <div className="w-full h-[28px]"></div> */}
//       <div className=" px-2.5 w-[280px] h-[410px] select-none mt-2 custom-scrollbar overflow-y-auto">
//         <div className="w-full h-auto mb-2 p-1.5  rounded border">
//           <span className="font-heading text-[13px]">
//             FONT SIZE: EXTRA LARGE
//           </span>
//           <Slider defaultValue={[2]} max={4} step={1} className="w-full mt-1" />
//           <div className="w-full h-auto mt-1">
//             <span className="font-heading text-[13px]">FONT STYLE</span>
//             <div>
//               <Select>
//                 <SelectTrigger className="w-full h-[33px] rounded-sm font-body text-[14px] bg-white">
//                   <SelectValue
//                     placeholder="Theme"
//                     className="font-heading text-[14px]"
//                   />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem
//                     value="light"
//                     className="font-heading text-[14px]"
//                   >
//                     Light
//                   </SelectItem>
//                   <SelectItem value="dark" className="font-heading text-[14px]">
//                     Dark
//                   </SelectItem>
//                   <SelectItem
//                     value="system"
//                     className="font-heading text-[14px]"
//                   >
//                     System
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>
//         <div className="w-full h-auto p-1.5 rounded border mb-2">
//           <span className="font-heading text-[13px]">COLORS</span>
//           <div className="w-full h-auto items-center justify-center gap-1.5 grid grid-cols-3  ">
//             <div className="col-span-1 h-[44px] bg-white border flex gap-1  hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer">
//               <div className="w-[32px] h-[32px] bg-black rounded-sm"></div>
//               <div className="w-[32px] h-[32px] bg-green-400 rounded-sm"></div>
//             </div>
//             <div className="col-span-1 h-[44px] bg-white border flex gap-1  hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer">
//               <div className="w-[32px] h-[32px] bg-blue-500 rounded-sm"></div>
//               <div className="w-[32px] h-[32px] bg-yellow-400 rounded-sm"></div>
//             </div>
//             <div className="col-span-1 h-[44px] border flex gap-1  hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer">
//               <div className="w-[32px] h-[32px] bg-black rounded-sm"></div>
//               <div className="w-[32px] h-[32px] bg-green-400 rounded-sm"></div>
//             </div>
//             <div className="col-span-1 h-[44px] border flex gap-1  hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer">
//               <div className="w-[32px] h-[32px] bg-black rounded-sm"></div>
//               <div className="w-[32px] h-[32px] bg-green-400 rounded-sm"></div>
//             </div>
//             <div className="col-span-1 h-[44px] border flex gap-1  hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer">
//               <div className="w-[32px] h-[32px] bg-black rounded-sm"></div>
//               <div className="w-[32px] h-[32px] bg-green-400 rounded-sm"></div>
//             </div>
//             <div className="col-span-1 h-[44px] border flex gap-1  hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer">
//               <div className="w-[32px] h-[32px] bg-black rounded-sm"></div>
//               <div className="w-[32px] h-[32px] bg-green-400 rounded-sm"></div>
//             </div>
//           </div>
//         </div>
//         <div className="w-full h-auto p-1.5 mb-2 rounded border">
//           <div className="w-full h-auto pb-1  rounded">
//             <span className="font-heading text-[13px]">PAGE MARGINS: 1</span>
//             <Slider
//               defaultValue={[2]}
//               max={4}
//               step={1}
//               className="w-full mt-1"
//             />
//           </div>
//           <div className="w-full h-auto ">
//             <span className="font-heading text-[13px]">SECTION SPACING: 3</span>
//             <Slider
//               defaultValue={[2]}
//               max={4}
//               step={1}
//               className="w-full mt-1"
//             />
//           </div>
//         </div>

//         <div className="w-full h-auto mb-2 border p-1.5 rounded">
//           <span className="font-heading text-[13px]">BACKGROUNDS</span>
//           <div className="w-full h-auto mt-1 grid grid-cols-3 gap-2">
//             <div className="w-[78px] h-[78px] border cursor-pointer rounded"></div>
//             <div className="w-[78px] h-[78px] border cursor-pointer rounded"></div>
//             <div className="w-[78px] h-[78px] border cursor-pointer rounded"></div>
//             <div className="w-[78px] h-[78px] border cursor-pointer rounded"></div>
//             <div className="w-[78px] h-[78px] border cursor-pointer rounded"></div>
//             <div className="w-[78px] h-[78px] border cursor-pointer rounded"></div>
//           </div>
//         </div>
//       </div>
//       <div className="w-full h-auto flex flex-col p-2 border gap-1 ">
//         <button className="w-full h-[36px] rounded border bg-white">
//           Resume Settings
//         </button>
//         <button className="w-full h-[36px] rounded border bg-primary text-white font-heading">
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FontAndDesignSection;

// everything is working beofore loading and save thign

// import React, { useEffect } from "react";
// import { Slider } from "@/components/ui/slider";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { MdOutlineClose } from "react-icons/md";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { setDesignAndFontBoxState } from "@/lib/store/slices/resumeFeatureState";
// import {
//   setBodyFontSize,
//   setHeadingFontSize,
//   setPageMargins,
//   setSectionMargins,
//   setFontFamily,
//   setColorScheme,
//   setLineHeight,
//   setSectionSpacing,
//   IResumeStyleState,
// } from "@/lib/store/slices/resumeStyle";

// import { useParams } from "next/navigation";
// import api from "@/lib/api";

// const colorSchemes = [
//   {
//     primary: "#111827",
//     secondary: "#3B82F6",
//     text: "#4B5563",
//   },
//   {
//     primary: "#1F2937",
//     secondary: "#10B981",
//     text: "#4B5563",
//   },
//   {
//     primary: "#1E40AF",
//     secondary: "#F59E0B",
//     text: "#4B5563",
//   },
//   {
//     primary: "#7C3AED",
//     secondary: "#EC4899",
//     text: "#4B5563",
//   },
//   {
//     primary: "#047857",
//     secondary: "#6366F1",
//     text: "#4B5563",
//   },
//   {
//     primary: "#BE123C",
//     secondary: "#8B5CF6",
//     text: "#4B5563",
//   },
// ];

// interface getResumeSettings {
//   success: boolean;
//   message: string;
//   settings: IResumeStyleState;
// }

// const validateResumeId = (id: string | string[] | undefined): id is string => {
//   return typeof id === "string" && id.length === 24;
// };
// const FontAndDesignSection = () => {
//   const dispatch = useAppDispatch();
//   const isActive = useAppSelector(
//     (state) => state.resumeFeatureState.designAndFontBoxState
//   );
//   const resumeStyle = useAppSelector((state) => state.resumeStyle);

//   const params = useParams();

//   const handleClose = () => {
//     dispatch(setDesignAndFontBoxState(false));
//   };

//   const handleSave = () => {
//     if (!validateResumeId(params?.id)) return;
//     if (!resumeStyle) return;
//     const saveResumeSettings = async () => {
//       try {
//         const response = await api.post("/resume/settings/update", {
//           resumeId: params.id,
//           updateData: resumeStyle,
//         });
//         console.log("response.data for resume setting", response.data);
//         if (response.data.success) {
//           handleClose();
//         }
//       } catch (error) {
//         console.log("error saving resume settings", error);
//       }
//     };
//     saveResumeSettings();
//   };

//   const handleReset = async () => {
//     try {
//       if (!validateResumeId(params?.id)) return;

//       const response = await api.post(`/resume/settings/reset/${params.id}`, {
//         resumeId: params.id,
//       });

//       if (response.data.success) {
//         dispatch(setBodyFontSize("normal"));
//         dispatch(setHeadingFontSize("normal"));
//         dispatch(setPageMargins("normal"));
//         dispatch(setSectionMargins("normal"));
//         dispatch(setFontFamily("Helvetica"));
//         dispatch(setColorScheme(colorSchemes[0]));
//         dispatch(setLineHeight("normal"));
//         dispatch(setSectionSpacing("normal"));
//       }

//       console.log("response.data for reset", response.data.success);
//     } catch (error) {
//       console.log("error resetting resume settings", error);
//     }
//   };

//   // useEffect(() => {
//   //   if (!validateResumeId(params?.id)) return;
//   //   const fetchResumeData = async () => {
//   //     try {
//   //       const response = await api.get(`/resume/settings/${params.id}`);
//   //       console.log("response.data for fetchResumeData", response.data);
//   //       if (response.data.success && response.data.settings) {
//   //         const settings = response.data.settings;
//   //         // dispatch(setDesignAndFontBoxState(true));
//   //         dispatch(setBodyFontSize(settings.fontSize.body));
//   //         dispatch(setHeadingFontSize(settings.fontSiz.heading));
//   //         dispatch(setPageMargins(settings.margins.page));
//   //         dispatch(setSectionMargins(settings.margins.section));
//   //         dispatch(setFontFamily(response.data.resume.fontFamily));
//   //         dispatch(setColorScheme(response.data.resume.colorScheme));
//   //         dispatch(setLineHeight(response.data.resume.lineHeight));
//   //         dispatch(setSectionSpacing(response.data.resume.sectionSpacing));
//   //       }
//   //     } catch (error) {
//   //       console.log("error fetching resume data", error);
//   //     }
//   //   };
//   //   fetchResumeData();
//   // }, [params?.id]);

//   useEffect(() => {
//     // Assuming `validateResumeId` is a function to check if `params.id` is valid
//     if (!validateResumeId(params?.id)) return;

//     const fetchResumeData = async () => {
//       try {
//         const response = await api.get(`/resume/settings/${params.id}`);
//         console.log("response.data for fetchResumeData", response.data);

//         if (response.data.success && response.data.settings) {
//           const settings = response.data.settings;
//           const resume = response.data.resume;

//           dispatch(setBodyFontSize(settings.fontSize.body));
//           dispatch(setHeadingFontSize(settings.fontSize.heading));
//           dispatch(setPageMargins(settings.margins.page));
//           dispatch(setSectionMargins(settings.margins.section));
//           dispatch(setFontFamily(settings.fontFamily));
//           dispatch(setColorScheme(settings.colorScheme));
//           dispatch(setLineHeight(settings.lineHeight));
//           dispatch(setSectionSpacing(settings.sectionSpacing));
//           // dispatch(setActiveSections(settings.activeSections));
//         }
//       } catch (error) {
//         console.log("error fetching resume data", error);
//       }
//     };

//     fetchResumeData();
//   }, [dispatch, params?.id]);

//   const getFontSizeValue = (size: string) => {
//     switch (size) {
//       case "small":
//         return 1;
//       case "normal":
//         return 2;
//       case "large":
//         return 3;
//       case "extraLarge":
//         return 4;
//       default:
//         return 2;
//     }
//   };

//   const getMarginValue = (margin: string) => {
//     switch (margin) {
//       case "compact":
//         return 1;
//       case "normal":
//         return 2;
//       case "spacious":
//         return 3;
//       default:
//         return 2;
//     }
//   };

//   const fontSizeToString = (value: number) => {
//     switch (value) {
//       case 1:
//         return "small";
//       case 2:
//         return "normal";
//       case 3:
//         return "large";
//       case 4:
//         return "extraLarge";
//       default:
//         return "normal";
//     }
//   };

//   const marginToString = (value: number) => {
//     switch (value) {
//       case 1:
//         return "compact";
//       case 2:
//         return "normal";
//       case 3:
//         return "spacious";
//       default:
//         return "normal";
//     }
//   };

//   return (
//     <div
//       className={`bg-white border shadow-md fixed max-lg:hidden right-9 bottom-7 rounded ${
//         isActive ? "block" : "hidden"
//       }`}
//     >
//       <div className="w-full flex justify-between items-center p-2 border-b select-none">
//         <span className="font-heading text-[15px]">Design Settings</span>
//         <div className="flex gap-2 items-center justify-center">
//           <button
//             onClick={handleClose}
//             className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
//           >
//             <MdOutlineClose className="text-[20px]" />
//           </button>
//         </div>
//       </div>

//       <div className="px-2.5 w-[280px] h-[410px] select-none mt-2 custom-scrollbar overflow-y-auto">
//   <div className="w-full h-auto mb-2 p-1.5 rounded border">
//     <span className="font-heading text-[13px]">
//       FONT SIZE: {resumeStyle.fontSize.body.toUpperCase()}
//     </span>
//     <Slider
//       defaultValue={[getFontSizeValue(resumeStyle.fontSize.body)]}
//       value={[getFontSizeValue(resumeStyle.fontSize.body)]}
//       max={4}
//       step={1}
//       className="w-full mt-1"
//       onValueChange={(value) =>
//         dispatch(setBodyFontSize(fontSizeToString(value[0])))
//       }
//     />
//     <div className="w-full h-auto mt-1">
//       <span className="font-heading text-[13px]">FONT STYLE</span>
//       <div>
//         <Select
//           value={resumeStyle.fontFamily}
//           onValueChange={(
//             value: "Helvetica" | "Times-Roman" | "Courier"
//           ) => dispatch(setFontFamily(value))}
//         >
//           <SelectTrigger className="w-full h-[33px] rounded-sm font-body text-[14px] bg-white">
//             <SelectValue placeholder="Select font" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="Helvetica">Helvetica</SelectItem>
//             <SelectItem value="Times-Roman">Times Roman</SelectItem>
//             <SelectItem value="Courier">Courier</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   </div>

//   <div className="w-full h-auto p-1.5 rounded border mb-2">
//     <span className="font-heading text-[13px]">COLORS</span>
//     <div className="w-full h-auto items-center justify-center gap-1.5 grid grid-cols-3">
//       {colorSchemes.map((scheme, index) => (
//         <div
//           key={index}
//           className="col-span-1 h-[44px] bg-white border flex gap-1 hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer"
//           onClick={() => dispatch(setColorScheme(scheme))}
//         >
//           <div
//             className="w-[32px] h-[32px] rounded-sm"
//             style={{ backgroundColor: scheme.primary }}
//           ></div>
//           <div
//             className="w-[32px] h-[32px] rounded-sm"
//             style={{ backgroundColor: scheme.secondary }}
//           ></div>
//         </div>
//       ))}
//     </div>
//   </div>

//   <div className="w-full h-auto p-1.5 mb-2 rounded border">
//     <div className="w-full h-auto pb-1 rounded">
//       <span className="font-heading text-[13px]">
//         PAGE MARGINS: {resumeStyle.margins.page.toUpperCase()}
//       </span>
//       <Slider
//         defaultValue={[getMarginValue(resumeStyle.margins.page)]}
//         value={[getMarginValue(resumeStyle.margins.page)]}
//         max={3}
//         step={1}
//         className="w-full mt-1"
//         onValueChange={(value) =>
//           dispatch(setPageMargins(marginToString(value[0])))
//         }
//       />
//     </div>
//     <div className="w-full h-auto">
//       <span className="font-heading text-[13px]">
//         SECTION SPACING: {resumeStyle.sectionSpacing.toUpperCase()}
//       </span>
//       <Slider
//         defaultValue={[getMarginValue(resumeStyle.sectionSpacing)]}
//         value={[getMarginValue(resumeStyle.sectionSpacing)]}
//         max={3}
//         step={1}
//         className="w-full mt-1"
//         onValueChange={(value) =>
//           dispatch(setSectionSpacing(marginToString(value[0])))
//         }
//       />
//     </div>
//   </div>
// </div>

//       <div className="w-full h-auto flex flex-col p-2 border gap-1">
//         <button
//           className="w-full h-[36px] rounded border bg-white"
//           onClick={handleReset}
//         >
//           Resume Settings
//         </button>
//         <button
//           className="w-full h-[36px] rounded border bg-primary text-white font-heading"
//           onClick={() => handleSave()}
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FontAndDesignSection;

import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdOutlineClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setDesignAndFontBoxState } from "@/lib/store/slices/resumeFeatureState";
import {
  setBodyFontSize,
  setHeadingFontSize,
  setPageMargins,
  setSectionMargins,
  setFontFamily,
  setColorScheme,
  setLineHeight,
  setSectionSpacing,
  IResumeStyleState,
} from "@/lib/store/slices/resumeStyle";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import ConfirmationDialog from "../ConfirmationDialog";

// Confirmation Dialog Component
// interface ConfirmationDialogProps {
//   onConfirm: () => void;
//   onCancel: () => void;
// }

// const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
//   onConfirm,
//   onCancel,
// }) => {
//   return (
//     <div className="absolute inset-0 bg-black/50 flex items-center z-50 justify-center">
//       <div className="bg-white rounded w-[248px] p-4 shadow-lg">
//         <h3 className="text-lg font-heading mb-2">Unsaved Changes</h3>
//         <p className="text-gray-600 text-sm mb-4">
//           You have unsaved changes. Would you like to save them before closing?
//         </p>
//         <div className="flex justify-end w-full h-auto gap-2">
//           <button
//             onClick={onCancel}
//             className="w-1/2 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50"
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

const colorSchemes = [
  {
    primary: "#111827",
    secondary: "#3B82F6",
    text: "#4B5563",
  },
  {
    primary: "#1F2937",
    secondary: "#10B981",
    text: "#4B5563",
  },
  {
    primary: "#1E40AF",
    secondary: "#F59E0B",
    text: "#4B5563",
  },
  {
    primary: "#7C3AED",
    secondary: "#EC4899",
    text: "#4B5563",
  },
  {
    primary: "#047857",
    secondary: "#6366F1",
    text: "#4B5563",
  },
  {
    primary: "#BE123C",
    secondary: "#8B5CF6",
    text: "#4B5563",
  },
];

interface getResumeSettings {
  success: boolean;
  message: string;
  settings: IResumeStyleState;
}

const validateResumeId = (id: string | string[] | undefined): id is string => {
  return typeof id === "string" && id.length === 24;
};

const FontAndDesignSection = () => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(
    (state) => state.resumeFeatureState.designAndFontBoxState
  );
  const resumeStyle = useAppSelector((state) => state.resumeStyle);
  const params = useParams();

  // New state variables
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [initialState, setInitialState] = useState<IResumeStyleState | null>(
    null
  );

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      dispatch(setDesignAndFontBoxState(false));
    }
  };

  const handleSave = async () => {
    if (!validateResumeId(params?.id)) return;
    if (!resumeStyle) return;

    setIsSaving(true);
    try {
      const response = await api.post("/resume/settings/update", {
        resumeId: params.id,
        updateData: resumeStyle,
      });

      if (response.data.success) {
        setHasUnsavedChanges(false);
        setInitialState(resumeStyle);
        dispatch(setDesignAndFontBoxState(false));
      }
    } catch (error) {
      console.log("error saving resume settings", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      if (!validateResumeId(params?.id)) return;

      const response = await api.post(`/resume/settings/reset/${params.id}`, {
        resumeId: params.id,
      });

      if (response.data.success) {
        dispatch(setBodyFontSize("normal"));
        dispatch(setHeadingFontSize("normal"));
        dispatch(setPageMargins("normal"));
        dispatch(setSectionMargins("normal"));
        dispatch(setFontFamily("Helvetica"));
        dispatch(setColorScheme(colorSchemes[0]));
        dispatch(setLineHeight("normal"));
        dispatch(setSectionSpacing("normal"));
        setHasUnsavedChanges(false);
      }
    } catch (error) {
      console.log("error resetting resume settings", error);
    } finally {
      setIsResetting(false);
    }
  };

  // Effect to track changes
  useEffect(() => {
    if (initialState) {
      const initialStateEditFields = {
        bodyFontSize: initialState.fontSize.body,
        headingFontSize: initialState.fontSize.heading,
        pageMargins: initialState.margins.page,
        sectionMargins: initialState.margins.section,
        fontFamily: initialState.fontFamily,
        colorScheme: initialState.colorScheme,
        lineHeight: initialState.lineHeight,
        sectionSpacing: initialState.sectionSpacing,
      };
      const resumeStyleData = {
        bodyFontSize: resumeStyle.fontSize.body,
        headingFontSize: resumeStyle.fontSize.heading,
        pageMargins: resumeStyle.margins.page,
        sectionMargins: resumeStyle.margins.section,
        fontFamily: resumeStyle.fontFamily,
        colorScheme: resumeStyle.colorScheme,
        lineHeight: resumeStyle.lineHeight,
        sectionSpacing: resumeStyle.sectionSpacing,
      };
      const hasChanged =
        JSON.stringify(initialStateEditFields) !==
        JSON.stringify(resumeStyleData);
      setHasUnsavedChanges(hasChanged);
    }
  }, [resumeStyle, initialState]);

  useEffect(() => {
    if (!validateResumeId(params?.id)) return;

    const fetchResumeData = async () => {
      try {
        const response = await api.get(`/resume/settings/${params.id}`);

        if (response.data.success && response.data.settings) {
          const settings = response.data.settings;

          dispatch(setBodyFontSize(settings.fontSize.body));
          dispatch(setHeadingFontSize(settings.fontSize.heading));
          dispatch(setPageMargins(settings.margins.page));
          dispatch(setSectionMargins(settings.margins.section));
          dispatch(setFontFamily(settings.fontFamily));
          dispatch(setColorScheme(settings.colorScheme));
          dispatch(setLineHeight(settings.lineHeight));
          dispatch(setSectionSpacing(settings.sectionSpacing));

          setInitialState(settings);
        }
      } catch (error) {
        console.log("error fetching resume data", error);
      }
    };

    fetchResumeData();
  }, [dispatch, params?.id]);

  const getFontSizeValue = (size: string) => {
    switch (size) {
      case "small":
        return 1;
      case "normal":
        return 2;
      case "large":
        return 3;
      case "extraLarge":
        return 4;
      default:
        return 2;
    }
  };

  const getMarginValue = (margin: string) => {
    switch (margin) {
      case "compact":
        return 1;
      case "normal":
        return 2;
      case "spacious":
        return 3;
      default:
        return 2;
    }
  };

  const fontSizeToString = (value: number) => {
    switch (value) {
      case 1:
        return "small";
      case 2:
        return "normal";
      case 3:
        return "large";
      case 4:
        return "extraLarge";
      default:
        return "normal";
    }
  };

  const marginToString = (value: number) => {
    switch (value) {
      case 1:
        return "compact";
      case 2:
        return "normal";
      case 3:
        return "spacious";
      default:
        return "normal";
    }
  };

  return (
    <div
      className={`bg-white border shadow-md fixed max-lg:hidden right-9 bottom-7 rounded ${
        isActive ? "block" : "hidden"
      }`}
    >
      {showConfirmDialog && (
        <ConfirmationDialog
          onConfirm={() => {
            setShowConfirmDialog(false);
            handleSave();
          }}
          onCancel={() => {
            setShowConfirmDialog(false);
            dispatch(setDesignAndFontBoxState(false));
          }}
        />
      )}

      <div className="w-full flex justify-between items-center p-2 border-b select-none">
        <span className="font-heading text-[15px]">Design Settings</span>
        <div className="flex gap-2 items-center justify-center">
          <button
            onClick={handleClose}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
          >
            <MdOutlineClose className="text-[20px]" />
          </button>
        </div>
      </div>

      <div className="px-2.5 w-[280px] h-[410px] select-none mt-2 custom-scrollbar overflow-y-auto">
        <div className="w-full h-auto mb-2 p-1.5 rounded border">
          <span className="font-heading text-[13px]">
            FONT SIZE: {resumeStyle.fontSize.body.toUpperCase()}
          </span>
          <Slider
            defaultValue={[getFontSizeValue(resumeStyle.fontSize.body)]}
            value={[getFontSizeValue(resumeStyle.fontSize.body)]}
            max={4}
            step={1}
            className="w-full mt-1"
            onValueChange={(value) =>
              dispatch(setBodyFontSize(fontSizeToString(value[0])))
            }
          />
          <div className="w-full h-auto mt-1">
            <span className="font-heading text-[13px]">FONT STYLE</span>
            <div>
              <Select
                value={resumeStyle.fontFamily}
                onValueChange={(
                  value: "Helvetica" | "Times-Roman" | "Courier"
                ) => dispatch(setFontFamily(value))}
              >
                <SelectTrigger className="w-full h-[33px] rounded-sm font-body text-[14px] bg-white">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                  <SelectItem value="Times-Roman">Times Roman</SelectItem>
                  <SelectItem value="Courier">Courier</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="w-full h-auto p-1.5 rounded border mb-2">
          <span className="font-heading text-[13px]">COLORS</span>
          <div className="w-full h-auto items-center justify-center gap-1.5 grid grid-cols-3">
            {colorSchemes.map((scheme, index) => (
              <div
                key={index}
                className="col-span-1 h-[44px] bg-white border flex gap-1 hover:border-primary transition-all duration-150 items-center justify-center rounded-sm cursor-pointer"
                onClick={() => dispatch(setColorScheme(scheme))}
              >
                <div
                  className="w-[32px] h-[32px] rounded-sm"
                  style={{ backgroundColor: scheme.primary }}
                ></div>
                <div
                  className="w-[32px] h-[32px] rounded-sm"
                  style={{ backgroundColor: scheme.secondary }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-auto p-1.5 mb-2 rounded border">
          <div className="w-full h-auto pb-1 rounded">
            <span className="font-heading text-[13px]">
              PAGE MARGINS: {resumeStyle.margins.page.toUpperCase()}
            </span>
            <Slider
              defaultValue={[getMarginValue(resumeStyle.margins.page)]}
              value={[getMarginValue(resumeStyle.margins.page)]}
              max={3}
              step={1}
              className="w-full mt-1"
              onValueChange={(value) =>
                dispatch(setPageMargins(marginToString(value[0])))
              }
            />
          </div>
          <div className="w-full h-auto">
            <span className="font-heading text-[13px]">
              SECTION SPACING: {resumeStyle.sectionSpacing.toUpperCase()}
            </span>
            <Slider
              defaultValue={[getMarginValue(resumeStyle.sectionSpacing)]}
              value={[getMarginValue(resumeStyle.sectionSpacing)]}
              max={3}
              step={1}
              className="w-full mt-1"
              onValueChange={(value) =>
                dispatch(setSectionSpacing(marginToString(value[0])))
              }
            />
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col p-2 border gap-1">
        <button
          className="w-full h-[36px] rounded border bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleReset}
          disabled={isResetting}
        >
          {isResetting ? "Resetting..." : "Reset Settings"}
        </button>
        <button
          className="w-full h-[36px] rounded border bg-primary text-white font-heading disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSave}
          disabled={isSaving || !hasUnsavedChanges}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default FontAndDesignSection;
