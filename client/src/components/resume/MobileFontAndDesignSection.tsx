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
// import { setMobileDesignAndFontBoxState } from "@/lib/store/slices/resumeFeatureState";

// const MobileFontAndDesignSection = () => {
//   const isMobileDesignAndFontBoxState = useAppSelector(
//     (state) => state.resumeFeatureState.mobileDesignAndFontBoxState
//   );
//   const dispatch = useAppDispatch();

//   const handleClose = () => {
//     dispatch(setMobileDesignAndFontBoxState(false));
//   };

//   return (
//     <div
//       className={`w-full h-[310px] bg-white border absolute bottom-[94px] left-0 border-t flex-col rounded z-50  items-center justify-center gap-2 rounded-t-md ${
//         isMobileDesignAndFontBoxState ? "block" : "hidden"
//       }`}
//     >
//       <div className="w-full flex justify-between items-center py-2 px-3 border-b">
//         <span className="font-heading text-[15px]">Design Settings</span>
//         <button
//           onClick={() => handleClose()}
//           className="p-1 rounded hover:bg-gray-100"
//         >
//           <MdOutlineClose className="text-[22px]" />
//         </button>
//       </div>

//       <div className="w-full h-[260px] rounded p-3 overflow-y-auto  custom-scrollbar">
//         <div className="w-full h-auto rounded border flex gap-2 p-1 font-heading">
//           <button className="w-1/2 h-[36px] rounded border bg-white text-[15px]">
//             Reset
//           </button>
//           <button className="w-1/2 h-[36px] rounded bg-primary text-white text-[15px]">
//             Apply
//           </button>
//         </div>
//         {/* Font Size Section */}
//         <div className="w-full mb-3 space-y-1">
//           <span className="font-heading text-[13px]">FONT SIZE</span>
//           <Slider defaultValue={[2]} max={4} step={1} className="w-full" />
//         </div>

//         {/* Font Style Section */}
//         <div className="w-full mb-3">
//           <span className="font-heading text-[13px] block mb-1">
//             FONT STYLE
//           </span>
//           <Select>
//             <SelectTrigger className="w-full h-[40px] text-[14px]">
//               <SelectValue placeholder="Select font" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="arial">Arial</SelectItem>
//               <SelectItem value="roboto">Roboto</SelectItem>
//               <SelectItem value="opensans">Open Sans</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Colors Section */}
//         <div className="w-full mb-3">
//           <span className="font-heading text-[13px] block mb-1">COLORS</span>
//           <div className="grid grid-cols-4 gap-2">
//             {[...Array(8)].map((_, index) => (
//               <div
//                 key={index}
//                 className="aspect-square border rounded-md hover:border-primary cursor-pointer flex items-center justify-center"
//               >
//                 <div className="w-4/5 h-4/5 bg-gray-200 rounded-md border-4 border-black" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Spacing Section */}
//         <div className="w-full mb-3 space-y-3">
//           <div>
//             <span className="font-heading text-[13px] block mb-1">
//               PAGE MARGINS
//             </span>
//             <Slider defaultValue={[2]} max={4} step={1} className="w-full" />
//           </div>
//           <div>
//             <span className="font-heading text-[13px] block mb-1">
//               SECTION SPACING
//             </span>
//             <Slider defaultValue={[2]} max={4} step={1} className="w-full" />
//           </div>
//         </div>
//       </div>

//       {/* Bottom Buttons */}
//     </div>
//   );
// };

// export default MobileFontAndDesignSection;

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
import { setMobileDesignAndFontBoxState } from "@/lib/store/slices/resumeFeatureState";
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
import useAuth from "@/lib/hooks/useAuth";
import { toast } from "sonner";

const colorSchemes = [
  {
    primary: "#111827",
    secondary: "#3B82F6",
    text: "#4B5563",
  },
  {
    primary: "#0D1117",
    secondary: "#374151",
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

const validateResumeId = (id: string | string[] | undefined): id is string => {
  return typeof id === "string" && id.length === 24;
};

const MobileFontAndDesignSection = () => {
  const dispatch = useAppDispatch();
  const isMobileDesignAndFontBoxState = useAppSelector(
    (state) => state.resumeFeatureState.mobileDesignAndFontBoxState
  );
  const resumeStyle = useAppSelector((state) => state.resumeStyle);
  const params = useParams();

  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [initialState, setInitialState] = useState<IResumeStyleState | null>(
    null
  );

  const { isLoading, user } = useAuth();

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      dispatch(setMobileDesignAndFontBoxState(false));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    if (!validateResumeId(params?.id)) return;
    if (!resumeStyle) return;
    if (!user?._id) return;
    try {
      const response = await api.post("/resume/settings/update", {
        resumeId: params?.id,
        updateData: resumeStyle,
        userId: user?._id,
      });

      if (response.data.success) {
        setHasUnsavedChanges(false);
        setInitialState(resumeStyle);
        dispatch(setMobileDesignAndFontBoxState(false));
      }
    } catch {
      toast.error("Failed to save resume settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      if (!validateResumeId(params?.id)) return;
      if (!user?._id) return;
      const response = await api.post(`/resume/settings/reset/${params.id}`, {
        resumeId: params.id,
        userId: user?._id,
      });

      if (response.data.success) {
        dispatch(setBodyFontSize("normal"));
        dispatch(setHeadingFontSize("normal"));
        dispatch(setPageMargins("normal"));
        dispatch(setSectionMargins("normal"));
        dispatch(setFontFamily("Inter"));
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
    const fetchResumeData = async () => {
      if (!validateResumeId(params?.id)) return;
      if (!user?._id) return;
      try {
        const response = await api.post(`/resume/settings`, {
          userId: user?._id,
          resumeId: params?.id,
        });
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

    if (!isLoading) {
      fetchResumeData();
    }
  }, [dispatch, params?.id, user, isLoading]);

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
      className={`w-full h-[310px] bg-white border absolute bottom-[94px] left-0 border-t flex-col rounded z-50 items-center justify-center gap-2 rounded-t-md ${
        isMobileDesignAndFontBoxState ? "block" : "hidden"
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
            dispatch(setMobileDesignAndFontBoxState(false));
          }}
        />
      )}

      <div className="w-full flex justify-between items-center py-2 px-3 border-b">
        <span className="font-heading text-[15px]">Design Settings</span>
        <button onClick={handleClose} className="p-1 rounded hover:bg-gray-100">
          <MdOutlineClose className="text-[22px]" />
        </button>
      </div>

      <div className="w-full h-[260px] rounded p-3 overflow-y-auto custom-scrollbar">
        <div className="w-full mb-3 space-y-1">
          <span className="font-heading text-[13px]">
            FONT SIZE: {resumeStyle.fontSize.body.toUpperCase()}
          </span>
          <Slider
            defaultValue={[getFontSizeValue(resumeStyle.fontSize.body)]}
            value={[getFontSizeValue(resumeStyle.fontSize.body)]}
            max={4}
            step={1}
            className="w-full"
            onValueChange={(value) =>
              dispatch(setBodyFontSize(fontSizeToString(value[0])))
            }
          />
        </div>

        <div className="w-full mb-3">
          <span className="font-heading text-[13px] block mb-1">
            FONT STYLE
          </span>
          <Select
            value={resumeStyle.fontFamily}
            onValueChange={(
              value:
                | "Helvetica"
                | "Times-Roman"
                | "Courier"
                | "Inter"
                | "Roboto"
                | "Merriweather"
            ) => dispatch(setFontFamily(value))}
          >
            <SelectTrigger className="w-full h-[40px] text-[14px]">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inter">Inter</SelectItem>
              <SelectItem value="Roboto">Roboto</SelectItem>
              <SelectItem value="Merriweather">Merriweather</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full mb-3">
          <span className="font-heading text-[13px] block mb-1">COLORS</span>
          <div className="grid grid-cols-3 gap-2">
            {colorSchemes.map((scheme, index) => (
              <div
                key={index}
                className="aspect-square h-[60px] w-[128px] border gap-4 rounded hover:border-primary cursor-pointer flex items-center justify-center p-2"
                onClick={() => dispatch(setColorScheme(scheme))}
              >
                <div className="w-full h-full flex gap-1.5">
                  <div
                    className="w-1/2 h-full rounded"
                    style={{ backgroundColor: scheme.primary }}
                  />
                  <div
                    className="w-1/2 h-full rounded"
                    style={{ backgroundColor: scheme.secondary }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mb-3 space-y-3">
          <div>
            <span className="font-heading text-[13px] block mb-1">
              PAGE MARGINS: {resumeStyle.margins.page.toUpperCase()}
            </span>
            <Slider
              defaultValue={[getMarginValue(resumeStyle.margins.page)]}
              value={[getMarginValue(resumeStyle.margins.page)]}
              max={3}
              step={1}
              className="w-full"
              onValueChange={(value) =>
                dispatch(setPageMargins(marginToString(value[0])))
              }
            />
          </div>
          <div>
            <span className="font-heading text-[13px] block mb-1">
              SECTION SPACING: {resumeStyle.sectionSpacing.toUpperCase()}
            </span>
            <Slider
              defaultValue={[getMarginValue(resumeStyle.sectionSpacing)]}
              value={[getMarginValue(resumeStyle.sectionSpacing)]}
              max={3}
              step={1}
              className="w-full"
              onValueChange={(value) =>
                dispatch(setSectionSpacing(marginToString(value[0])))
              }
            />
          </div>
        </div>

        <div className="w-full h-auto rounded border flex gap-2 p-1 font-heading">
          <button
            className="w-1/2 h-[36px] rounded border bg-white text-[15px] disabled:opacity-50"
            onClick={handleReset}
            disabled={isResetting}
          >
            {isResetting ? "Resetting..." : "Reset"}
          </button>
          <button
            className="w-1/2 h-[36px] rounded bg-primary text-white text-[15px] disabled:opacity-50"
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFontAndDesignSection;
