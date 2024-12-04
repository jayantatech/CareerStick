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
import useAuth from "@/lib/hooks/useAuth";

const colorSchemes = [
  {
    primary: "#111827",
    secondary: "#3B82F6",
    text: "#4B5563",
  },
  {
    primary: "#0D1117", // A very dark gray, close to black
    secondary: "#374151", // Bright blue to add contrast
    text: "#4B5563", // Soft gray for readability
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

  const { isLoading, user } = useAuth();

  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      dispatch(setDesignAndFontBoxState(false));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    if (!validateResumeId(params?.id)) return;
    if (!resumeStyle) return;
    if (!user?._id) return;
    try {
      // console.log("resumeStyle", resumeStyle, params?.id, user?._id);
      const response = await api.post("/resume/settings/update", {
        resumeId: params?.id,
        updateData: resumeStyle,
        userId: user?._id,
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
    const fetchResumeData = async () => {
      if (!validateResumeId(params?.id)) return;
      if (!user?._id) return;
      try {
        const response = await api.post(`/resume/settings`, {
          userId: user?._id,
          resumeId: params?.id,
        });
        // console.log("response setting for fetchResumeData", response.data);
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
