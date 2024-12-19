"use client";
import React, { useEffect, useState, useMemo } from "react";
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

// Remove the comment to silence the unused var warning
export const SECTION_IDS = {
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
} as const;

interface Section {
  id: keyof typeof SECTION_IDS;
  title: string;
  icon: React.ElementType;
  defaultSelected?: boolean;
  required?: boolean;
  order?: number;
}

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

  // Memoized debounced function to update Redux state
  // const debouncedUpdateRedux = useMemo(
  //   () =>
  //     debounce((newSections) => {
  //       dispatch(setActiveSections(newSections));
  //     }, 1000),
  //   []
  // );
  const debouncedUpdateRedux = useMemo(
    () =>
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
        const sections = response.data.activeSections;
        setLocalActiveSections(sections);
        dispatch(setActiveSections(sections));
      } catch (error) {
        console.error("Failed to fetch active sections:", error);
      }
    };

    if (params?.id && !isLoading) {
      fetchActiveSections();
    }
  }, [params?.id, isLoading, user?._id, dispatch]);

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
