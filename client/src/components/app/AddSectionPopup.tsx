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
  }, [isOpen, parentRef]);

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
