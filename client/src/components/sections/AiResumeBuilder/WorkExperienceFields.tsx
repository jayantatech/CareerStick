// "use client";
// import React, { useState, useCallback, useEffect } from "react";
// import debounce from "lodash/debounce";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { LuGripVertical } from "react-icons/lu";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   sortableKeyboardCoordinates,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { TextareaField } from "@/components/inputComponents/TextareaField";
// import FloatingLabelSelect from "@/components/SelectFieldComponent";
// import AddButton from "@/components/AddButton";
// import SectionTitle from "@/components/SectionTitle";
// import SubSectionTitle from "@/components/SubSectionTitle";
// import TrashIconComponent from "@/components/TrashIconComponent";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import {
//   updateWorkExperience,
//   addWorkExperience,
//   deleteWorkExperience,
//   reorderWorkExperience,
// } from "@/lib/store/slices/resumeSlice";
// import type { JobExperience, MonthYearDate } from "@/lib/types/resumeInput";

// interface MonthYearPickerProps {
//   labelFirst: string;
//   labelSecond: string;
//   value: MonthYearDate;
//   onChange: (value: MonthYearDate) => void;
//   onLocalChange?: (value: MonthYearDate) => void;
//   disabled?: boolean;
// }

// const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
//   labelFirst,
//   labelSecond,
//   value,
//   onChange,
//   onLocalChange,
//   disabled = false,
// }) => {
//   const months = [
//     { value: "January", label: "January" },
//     { value: "February", label: "February" },
//     { value: "March", label: "March" },
//     { value: "April", label: "April" },
//     { value: "May", label: "May" },
//     { value: "June", label: "June" },
//     { value: "July", label: "July" },
//     { value: "August", label: "August" },
//     { value: "September", label: "September" },
//     { value: "October", label: "October" },
//     { value: "November", label: "November" },
//     { value: "December", label: "December" },
//   ];

//   const years = Array.from({ length: 51 }, (_, i) => {
//     const year = 2024 - i;
//     return { value: year.toString(), label: year.toString() };
//   });

//   const handleMonthChange = (newMonth: string) => {
//     const newValue = { ...value, month: newMonth };
//     onLocalChange?.(newValue);
//     onChange(newValue);
//   };

//   const handleYearChange = (newYear: string) => {
//     const newValue = { ...value, year: newYear };
//     onLocalChange?.(newValue);
//     onChange(newValue);
//   };

//   return (
//     <div className="relative w-full flex items-center justify-center">
//       <div className="flex gap-2 w-full items-center justify-center">
//         <div className="w-1/2">
//           <FloatingLabelSelect
//             label={labelFirst}
//             options={months}
//             value={value.month}
//             onChange={handleMonthChange}
//             disabled={disabled}
//           />
//         </div>
//         <div className="w-1/2">
//           <FloatingLabelSelect
//             label={labelSecond}
//             options={years}
//             value={value.year}
//             onChange={handleYearChange}
//             disabled={disabled}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// interface SortableExperienceItemProps {
//   experience: JobExperience;
//   onDelete: (id: string) => void;
//   onChange: (id: string, field: keyof JobExperience, value: any) => void;
//   onLocalChange: (id: string, field: keyof JobExperience, value: any) => void;
// }

// const SortableExperienceItem: React.FC<SortableExperienceItemProps> = ({
//   experience,
//   onDelete,
//   onChange,
//   onLocalChange,
// }) => {
//   const [localExperience, setLocalExperience] = useState(experience);

//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({
//       id: experience.id,
//     });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   useEffect(() => {
//     setLocalExperience(experience);
//   }, [experience]);

//   const handleLocalChange = (field: keyof JobExperience, value: any) => {
//     const updatedExperience = {
//       ...localExperience,
//       [field]: value,
//     };
//     setLocalExperience(updatedExperience);
//     onLocalChange(experience.id, field, value);
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       <AccordionItem
//         value={experience.id}
//         className="border rounded overflow-hidden mb-2"
//       >
//         <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 rounded">
//           <div className="flex justify-between items-center w-full">
//             <div className="flex items-center">
//               <LuGripVertical
//                 className="text-[20px] text-gray-400 mr-2 cursor-move"
//                 {...listeners}
//               />
//               <div className="text-left">
//                 <div className="font-semibold font-heading text-gray-500">
//                   {localExperience.jobTitle || "New Job Experience"}
//                   {localExperience.company && ` at ${localExperience.company}`}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {localExperience.startDate.month &&
//                   localExperience.startDate.year
//                     ? `${localExperience.startDate.month} ${localExperience.startDate.year}`
//                     : "Start Date"}{" "}
//                   -{" "}
//                   {localExperience.isCurrentJob
//                     ? "Present"
//                     : localExperience.endDate.month &&
//                       localExperience.endDate.year
//                     ? `${localExperience.endDate.month} ${localExperience.endDate.year}`
//                     : "End Date"}
//                 </div>
//               </div>
//             </div>
//             <TrashIconComponent onDelete={() => onDelete(experience.id)} />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <div className="w-full h-auto flex gap-2">
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Job Title"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={localExperience.jobTitle}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                   handleLocalChange("jobTitle", e.target.value);
//                   onChange(experience.id, "jobTitle", e.target.value);
//                 }}
//               />
//             </div>
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Company Name"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={localExperience.company}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                   handleLocalChange("company", e.target.value);
//                   onChange(experience.id, "company", e.target.value);
//                 }}
//               />
//             </div>
//           </div>
//           <div className="flex space-x-4 w-full h-[48px]">
//             <MonthYearPicker
//               labelFirst="Start Month"
//               labelSecond="Start Year"
//               value={localExperience.startDate}
//               onChange={(value) => onChange(experience.id, "startDate", value)}
//               onLocalChange={(value) => handleLocalChange("startDate", value)}
//             />
//             <MonthYearPicker
//               labelFirst="End Month"
//               labelSecond="End Year"
//               value={localExperience.endDate}
//               onChange={(value) => onChange(experience.id, "endDate", value)}
//               onLocalChange={(value) => handleLocalChange("endDate", value)}
//               disabled={localExperience.isCurrentJob}
//             />
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={localExperience.isCurrentJob}
//               onChange={(e) => {
//                 handleLocalChange("isCurrentJob", e.target.checked);
//                 onChange(experience.id, "isCurrentJob", e.target.checked);
//               }}
//               className="mr-2"
//             />
//             <label>Still working here</label>
//           </div>
//           <FloatingLabelInput
//             label="Job Location"
//             inputType="text"
//             inputClassName="border-gray-300"
//             value={localExperience.location}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//               handleLocalChange("location", e.target.value);
//               onChange(experience.id, "location", e.target.value);
//             }}
//           />
//           <div className="relative">
//             <SubSectionTitle label="Job Description" />
//             <TextareaField
//               placeholder="Example: Managed a team of 8, improving project delivery time by 15%"
//               value={localExperience.description}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
//                 handleLocalChange("description", e.target.value);
//                 onChange(experience.id, "description", e.target.value);
//               }}
//             />
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const WorkExperienceSection: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const reduxExperiences = useAppSelector(
//     (state) => state.resume.workExperience
//   );
//   const [localExperiences, setLocalExperiences] =
//     useState<JobExperience[]>(reduxExperiences);

//   useEffect(() => {
//     setLocalExperiences(reduxExperiences);
//   }, [reduxExperiences]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const debouncedDispatch = useCallback(
//     debounce((id: string, field: keyof JobExperience, value: any) => {
//       dispatch(updateWorkExperience({ id, field, value }));
//     }, 1000),
//     [dispatch]
//   );

//   const handleLocalChange = (
//     id: string,
//     field: keyof JobExperience,
//     value: any
//   ) => {
//     setLocalExperiences((prev) =>
//       prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
//     );
//   };

//   const handleInputChange = (
//     id: string,
//     field: keyof JobExperience,
//     value: any
//   ) => {
//     debouncedDispatch(id, field, value);
//   };

//   const addNewExperience = () => {
//     const newExperience: JobExperience = {
//       id: `job-${Date.now()}`,
//       jobTitle: "",
//       company: "",
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isCurrentJob: false,
//       location: "",
//       description: "",
//     };
//     dispatch(addWorkExperience(newExperience));
//   };

//   const deleteExperience = (id: string) => {
//     dispatch(deleteWorkExperience(id));
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       const oldIndex = localExperiences.findIndex(
//         (item) => item.id === active.id
//       );
//       const newIndex = localExperiences.findIndex(
//         (item) => item.id === over.id
//       );

//       const newExperiences = [...localExperiences];
//       const [removed] = newExperiences.splice(oldIndex, 1);
//       newExperiences.splice(newIndex, 0, removed);

//       setLocalExperiences(newExperiences);
//       dispatch(reorderWorkExperience({ oldIndex, newIndex }));
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       <SectionTitle label="Work Experience" />
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={localExperiences.map((exp) => exp.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             defaultValue={localExperiences.map((exp) => exp.id)}
//           >
//             {localExperiences.map((experience) => (
//               <SortableExperienceItem
//                 key={experience.id}
//                 experience={experience}
//                 onDelete={deleteExperience}
//                 onChange={handleInputChange}
//                 onLocalChange={handleLocalChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       <AddButton label="Add New Experience" onClick={addNewExperience} />
//     </div>
//   );
// };

// export default WorkExperienceSection;

"use client";
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
import type { JobExperience, MonthYearDate } from "@/lib/types/resumeInput";

// Memoized month and year options
const months = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

const years = Array.from({ length: 51 }, (_, i) => {
  const year = 2024 - i;
  return { value: year.toString(), label: year.toString() };
});

const MonthYearPicker: React.FC<{
  labelFirst: string;
  labelSecond: string;
  value: MonthYearDate;
  onChange: (value: MonthYearDate) => void;
  disabled?: boolean;
}> = React.memo(
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

const SortableExperienceItem: React.FC<{
  experience: JobExperience;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof JobExperience, value: any) => void;
}> = React.memo(({ experience, onDelete, onChange }) => {
  const [localState, setLocalState] = useState(experience);
  const debouncedUpdate = useMemo(
    () =>
      debounce((field: keyof JobExperience, value: any) => {
        onChange(experience.id, field, value);
      }, 2000),
    [experience.id, onChange]
  );

  useEffect(() => {
    setLocalState(experience);
  }, [experience]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: experience.id,
    });

  const handleChange = useCallback(
    (field: keyof JobExperience, value: any) => {
      setLocalState((prev) => ({ ...prev, [field]: value }));
      debouncedUpdate(field, value);
    },
    [debouncedUpdate]
  );

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

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
                {/* <div className="text-sm text-gray-500">
                  {`${localState.startDate.month} ${localState.startDate.year}`}{" "}
                  -
                  {localState.isCurrentJob
                    ? "Present"
                    : `${localState.endDate.month} ${localState.endDate.year}`}
                </div> */}
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
          <div className="w-full h-auto flex gap-2">
            <div className="w-1/2">
              <FloatingLabelInput
                label="Job Title"
                inputType="text"
                inputClassName="border-gray-300"
                value={localState.jobTitle}
                onChange={(e) => handleChange("jobTitle", e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <FloatingLabelInput
                label="Company Name"
                inputType="text"
                inputClassName="border-gray-300"
                value={localState.company}
                onChange={(e) => handleChange("company", e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-4 w-full h-[48px]">
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
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
});

SortableExperienceItem.displayName = "SortableExperienceItem";

const WorkExperienceSection: React.FC = () => {
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
    (id: string, field: keyof JobExperience, value: any) => {
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
    (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        const oldIndex = experiences.findIndex((item) => item.id === active.id);
        const newIndex = experiences.findIndex((item) => item.id === over.id);
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

  return (
    <div className="w-full h-auto">
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
  );
};

export default WorkExperienceSection;
