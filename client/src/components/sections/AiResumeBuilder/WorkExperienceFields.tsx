"use client";

type JobExperienceFieldValue = string | boolean | MonthYearDate;

import React, { useState, useCallback, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LuGripVertical } from "react-icons/lu";
import FloatingLabelInput from "@/components/inputComponents/TextInputField";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TextareaField } from "@/components/inputComponents/TextareaField";
import FloatingLabelSelect from "@/components/SelectFieldComponent";
import AddButton from "@/components/AddButton";
import SectionTitle from "@/components/SectionTitle";
import SubSectionTitle from "@/components/SubSectionTitle";
import TrashIconComponent from "@/components/TrashIconComponent";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  updateWorkExperience,
  addWorkExperience,
  deleteWorkExperience,
  reorderWorkExperience,
} from "@/lib/store/slices/resumeSlice";
// import AIGeneratedSummaryDropdown from "@/components/AIGeneratedSummaryDropdown";
import { MonthYearDate } from "@/lib/types/generaltypes";
import { JobExperience } from "@/lib/types/resumeInput";
import { months } from "../../../../public/content/generalFieldsData";
import { Skeleton } from "@/components/ui/skeleton";

// const descriptions = [
//   "Led cross-functional team of 8 members, improving project delivery time by 15% through implementation of agile methodologies and streamlined workflows.",
//   "Developed and executed strategic marketing campaigns resulting in 25% increase in customer engagement and $2M in new revenue generation.",
//   "Managed end-to-end software development lifecycle for 5 major projects, reducing bugs by 40% and improving customer satisfaction scores by 30%.",
//   "Streamlined operations processes resulting in 20% cost reduction and 35% improvement in efficiency through implementation of automated workflows.",
//   "Spearheaded digital transformation initiatives, leading to 50% faster processing times and 90% paperless operations within 6 months.",
//   "Built and maintained relationships with key stakeholders, resulting in 95% client retention rate and $3M in renewed contracts.",
// ];

const years = Array.from({ length: 51 }, (_, i) => {
  const year = 2024 - i;
  return { value: year.toString(), label: year.toString() };
});

interface MonthYearPickerProps {
  labelFirst: string;
  labelSecond: string;
  value: MonthYearDate;
  onChange: (value: MonthYearDate) => void;
  disabled?: boolean;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = React.memo(
  ({ labelFirst, labelSecond, value, onChange, disabled = false }) => {
    const handleMonthChange = useCallback(
      (newMonth: string) => {
        onChange({ ...value, month: newMonth });
      },
      [value, onChange]
    );

    const handleYearChange = useCallback(
      (newYear: string) => {
        onChange({ ...value, year: newYear });
      },
      [value, onChange]
    );

    return (
      <div className="relative w-full flex items-center justify-center">
        <div className="flex gap-2 w-full items-center justify-center">
          <div className="w-1/2">
            <FloatingLabelSelect
              label={labelFirst}
              options={months}
              value={value.month}
              onChange={handleMonthChange}
              disabled={disabled}
            />
          </div>
          <div className="w-1/2">
            <FloatingLabelSelect
              label={labelSecond}
              options={years}
              value={value.year}
              onChange={handleYearChange}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    );
  }
);

MonthYearPicker.displayName = "MonthYearPicker";

interface SortableExperienceItemProps {
  experience: JobExperience;
  onDelete: (id: string) => void;
  onChange: (
    id: string,
    field: keyof JobExperience,
    value: JobExperienceFieldValue
  ) => void;
}

const SortableExperienceItem: React.FC<SortableExperienceItemProps> =
  React.memo(({ experience, onDelete }) => {
    const [localState, setLocalState] = useState<JobExperience>(experience);
    const dispatch = useAppDispatch();

    // Create a debounced function for Redux updates
    const debouncedDispatch = useMemo(
      () =>
        debounce((updatedExperience: JobExperience) => {
          Object.keys(updatedExperience).forEach((key) => {
            const field = key as keyof JobExperience;
            const value = updatedExperience[field] as JobExperienceFieldValue;
            dispatch(updateWorkExperience({ id: experience.id, field, value }));
          });
        }, 1000),
      [experience.id, dispatch]
    );

    // Update local state immediately and schedule Redux update
    const handleChange = useCallback(
      (field: keyof JobExperience, value: JobExperienceFieldValue) => {
        setLocalState((prev) => {
          const updatedState = { ...prev, [field]: value };
          debouncedDispatch(updatedState);
          return updatedState;
        });
      },
      [debouncedDispatch]
    );

    // const handleDescriptionSelect = useCallback(
    //   (text: string) => {
    //     handleChange("description", text);
    //   },
    //   [handleChange]
    // );

    // Sync local state with props when experience changes
    useEffect(() => {
      setLocalState(experience);
    }, [experience]);

    // Cleanup debounced function
    useEffect(() => {
      return () => {
        debouncedDispatch.cancel();
      };
    }, [debouncedDispatch]);

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: experience.id,
      });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes}>
        <AccordionItem
          value={experience.id}
          className="border rounded overflow-hidden mb-2"
        >
          <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 rounded">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <LuGripVertical
                  className="text-[20px] text-gray-400 mr-2 cursor-move"
                  {...listeners}
                />
                <div className="text-left">
                  <div className="font-semibold font-heading text-gray-500">
                    {localState.jobTitle || "New Job Experience"}
                    {localState.company && ` at ${localState.company}`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {localState.startDate.month && localState.startDate.year
                      ? `${localState.startDate.month} ${localState.startDate.year}`
                      : "Start Date"}{" "}
                    -{" "}
                    {localState.isCurrentJob
                      ? "Present"
                      : localState.endDate.month && localState.endDate.year
                      ? `${localState.endDate.month} ${localState.endDate.year}`
                      : "End Date"}
                  </div>
                </div>
              </div>
              <TrashIconComponent onDelete={() => onDelete(experience.id)} />
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2 space-y-4">
            <div className="w-full h-auto flex gap-2 max-md:flex-col max-md:gap-3 ">
              <div className="w-1/2 max-md:w-full h-auto">
                <FloatingLabelInput
                  label="Job Title"
                  inputType="text"
                  inputClassName="border-gray-300"
                  value={localState.jobTitle}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                />
              </div>
              <div className="w-1/2 max-md:w-full h-auto">
                <FloatingLabelInput
                  label="Company Name"
                  inputType="text"
                  inputClassName="border-gray-300"
                  value={localState.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                />
              </div>
            </div>

            <div className="flex min-m-desktop:space-x-4 w-full  max-m-desktop:flex-col flex-row  max-m-desktop:h-auto  gap-y-3 xl:gap-2">
              {" "}
              {/* added some flex col and gap */}
              <MonthYearPicker
                labelFirst="Start Month"
                labelSecond="Start Year"
                value={localState.startDate}
                onChange={(value) => handleChange("startDate", value)}
              />
              <MonthYearPicker
                labelFirst="End Month"
                labelSecond="End Year"
                value={localState.endDate}
                onChange={(value) => handleChange("endDate", value)}
                disabled={localState.isCurrentJob}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={localState.isCurrentJob}
                onChange={(e) => handleChange("isCurrentJob", e.target.checked)}
                className="mr-2"
              />
              <label>Still working here</label>
            </div>

            <FloatingLabelInput
              label="Job Location"
              inputType="text"
              inputClassName="border-gray-300"
              value={localState.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />

            <div className="relative">
              <SubSectionTitle label="Job Description" />
              <TextareaField
                placeholder="Example: Managed a team of 8, improving project delivery time by 15%"
                value={localState.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
              {/* <AIGeneratedSummaryDropdown
                onSelect={handleDescriptionSelect}
                summaries={descriptions}
              /> */}
            </div>
          </AccordionContent>
        </AccordionItem>
      </div>
    );
  });

SortableExperienceItem.displayName = "SortableExperienceItem";

const WorkExperienceSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const experiences = useAppSelector((state) => state.resume.workExperience);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleChange = useCallback(
    (
      id: string,
      field: keyof JobExperience,
      value: JobExperienceFieldValue
    ) => {
      dispatch(updateWorkExperience({ id, field, value }));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteWorkExperience(id));
    },
    [dispatch]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id !== over?.id) {
        const oldIndex = experiences.findIndex((item) => item.id === active.id);
        const newIndex = experiences.findIndex((item) => item.id === over?.id);
        dispatch(reorderWorkExperience({ oldIndex, newIndex }));
      }
    },
    [experiences, dispatch]
  );

  const addNewExperience = useCallback(() => {
    const newExperience: JobExperience = {
      id: `job-${Date.now()}`,
      jobTitle: "",
      company: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      isCurrentJob: false,
      location: "",
      description: "",
    };
    dispatch(addWorkExperience(newExperience));
    setExpandedItems((prev) => [...prev, newExperience.id]);
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Skeleton
        className={`w-full h-[260px] bg-blue-50 ${
          isLoading ? "block" : "hidden"
        }`}
      />
      <div className={`w-full h-auto ${isLoading ? "hidden" : "block"}`}>
        <SectionTitle label="Work Experience" />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={experiences.map((exp) => exp.id)}
            strategy={verticalListSortingStrategy}
          >
            <Accordion
              type="multiple"
              className="w-full space-y-2"
              value={expandedItems}
              onValueChange={setExpandedItems}
            >
              {experiences.map((experience) => (
                <SortableExperienceItem
                  key={experience.id}
                  experience={experience}
                  onDelete={handleDelete}
                  onChange={handleChange}
                />
              ))}
            </Accordion>
          </SortableContext>
        </DndContext>
        <AddButton label="Add New Experience" onClick={addNewExperience} />
      </div>
    </div>
  );
};

export default WorkExperienceSection;
