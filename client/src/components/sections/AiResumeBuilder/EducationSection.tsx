// "use client";
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import debounce from "lodash/debounce";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { GripVertical } from "lucide-react";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   sortableKeyboardCoordinates,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
// import { TextareaField } from "@/components/inputComponents/TextareaField";
// import FloatingLabelSelect from "@/components/SelectFieldComponent";
// import AddButton from "@/components/AddButton";
// import SectionTitle from "@/components/SectionTitle";
// import SubSectionTitle from "@/components/SubSectionTitle";
// import TrashIconComponent from "@/components/TrashIconComponent";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// // import { MonthYearDate } from "@/lib/types/resumeInput";

// import {
//   addEducation,
//   deleteEducation,
//   reorderEducation,
//   updateEducation,
// } from "@/lib/store/slices/resumeSlice";
// import { MonthYearDate } from "@/lib/types/generaltypes";

// // Define Education interface
// interface Education {
//   id: string;
//   degree: string;
//   school: string;
//   startDate: MonthYearDate;
//   endDate: MonthYearDate;
//   isCurrentlyStudying: boolean;
//   location: string;
//   description: string;
// }

// interface SelectOption {
//   value: string;
//   label: string;
// }

// // Month and year options
// const months: SelectOption[] = [
//   { value: "January", label: "January" },
//   { value: "February", label: "February" },
//   { value: "March", label: "March" },
//   { value: "April", label: "April" },
//   { value: "May", label: "May" },
//   { value: "June", label: "June" },
//   { value: "July", label: "July" },
//   { value: "August", label: "August" },
//   { value: "September", label: "September" },
//   { value: "October", label: "October" },
//   { value: "November", label: "November" },
//   { value: "December", label: "December" },
// ];

// const years: SelectOption[] = Array.from({ length: 51 }, (_, i) => {
//   const year = 2024 - i;
//   return { value: year.toString(), label: year.toString() };
// });

// interface MonthYearPickerProps {
//   labelFirst: string;
//   labelSecond: string;
//   value: MonthYearDate;
//   onChange: (value: MonthYearDate) => void;
//   disabled?: boolean;
// }

// // MonthYearPicker Component
// const MonthYearPicker: React.FC<MonthYearPickerProps> = React.memo(
//   ({ labelFirst, labelSecond, value, onChange, disabled = false }) => {
//     const handleMonthChange = useCallback(
//       (newMonth: string) => {
//         onChange({ ...value, month: newMonth });
//       },
//       [value, onChange]
//     );

//     const handleYearChange = useCallback(
//       (newYear: string) => {
//         onChange({ ...value, year: newYear });
//       },
//       [value, onChange]
//     );

//     return (
//       <div className="relative w-full flex items-center justify-center">
//         <div className="flex gap-2 w-full items-center justify-center">
//           <div className="w-1/2">
//             <FloatingLabelSelect
//               label={labelFirst}
//               options={months}
//               value={value.month}
//               onChange={handleMonthChange}
//               disabled={disabled}
//             />
//           </div>
//           <div className="w-1/2">
//             <FloatingLabelSelect
//               label={labelSecond}
//               options={years}
//               value={value.year}
//               onChange={handleYearChange}
//               disabled={disabled}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// MonthYearPicker.displayName = "MonthYearPicker";
// type EducationFieldValue = string | boolean | MonthYearDate;

// interface SortableEducationItemProps {
//   education: Education;
//   onDelete: (id: string) => void;
//   onChange: (
//     id: string,
//     field: keyof Education,
//     value: EducationFieldValue
//   ) => void;
// }

// // SortableEducationItem Component
// const SortableEducationItem: React.FC<SortableEducationItemProps> = React.memo(
//   ({ education, onDelete, onChange }) => {
//     const [localState, setLocalState] = useState(education);
//     const debouncedUpdate = useMemo(
//       () =>
//         debounce((field: keyof Education, value: EducationFieldValue) => {
//           onChange(education.id, field, value);
//         }, 1000),
//       [education.id, onChange]
//     );

//     useEffect(() => {
//       setLocalState(education);
//     }, [education]);

//     const { attributes, listeners, setNodeRef, transform, transition } =
//       useSortable({
//         id: education.id,
//       });

//     const handleChange = useCallback(
//       (field: keyof Education, value: EducationFieldValue) => {
//         setLocalState((prev) => ({ ...prev, [field]: value }));
//         debouncedUpdate(field, value);
//       },
//       [debouncedUpdate]
//     );

//     useEffect(() => {
//       return () => {
//         debouncedUpdate.cancel();
//       };
//     }, [debouncedUpdate]);

//     const style = {
//       transform: CSS.Transform.toString(transform),
//       transition,
//     };

//     return (
//       <div ref={setNodeRef} style={style} {...attributes}>
//         <AccordionItem
//           value={education.id}
//           className="border rounded overflow-hidden mb-2"
//         >
//           <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 rounded">
//             <div className="flex justify-between items-center w-full">
//               <div className="flex items-center">
//                 <GripVertical
//                   className="h-5 w-5 text-gray-400 mr-2 cursor-move"
//                   {...listeners}
//                 />
//                 <div className="text-left">
//                   <div className="font-semibold font-heading text-gray-500">
//                     {localState.degree || "New Education"}
//                     {localState.school && ` at ${localState.school}`}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {localState.startDate?.month && localState.startDate?.year
//                       ? `${localState.startDate?.month} ${localState.startDate?.year}`
//                       : "Start Date"}{" "}
//                     -{" "}
//                     {localState.isCurrentlyStudying
//                       ? "Present"
//                       : localState.endDate?.month && localState.endDate?.year
//                       ? `${localState.endDate?.month} ${localState.endDate?.year}`
//                       : "End Date"}
//                   </div>
//                 </div>
//               </div>
//               <TrashIconComponent onDelete={() => onDelete(education.id)} />
//             </div>
//           </AccordionTrigger>
//           <AccordionContent className="px-4 py-2 space-y-4">
//             <div className="w-full h-auto flex gap-2 max-md:gap-3 max-md:flex-col">
//               <div className="w-1/2 max-md:w-full">
//                 <FloatingLabelInput
//                   label="Degree"
//                   inputType="text"
//                   inputClassName="border-gray-300"
//                   value={localState.degree}
//                   onChange={(e) => handleChange("degree", e.target.value)}
//                 />
//               </div>
//               <div className="w-1/2 max-md:w-full">
//                 <FloatingLabelInput
//                   label="School/College Name"
//                   inputType="text"
//                   inputClassName="border-gray-300"
//                   value={localState.school}
//                   onChange={(e) => handleChange("school", e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="flex min-m-desktop:space-x-4 w-full  max-m-desktop:flex-col flex-row  max-m-desktop:h-auto  gap-y-3 xl:gap-2">
//               <MonthYearPicker
//                 labelFirst="Start Month"
//                 labelSecond="Start Year"
//                 value={localState.startDate}
//                 onChange={(value) => handleChange("startDate", value)}
//               />
//               <MonthYearPicker
//                 labelFirst="End Month"
//                 labelSecond="End Year"
//                 value={localState.endDate}
//                 onChange={(value) => handleChange("endDate", value)}
//                 disabled={localState.isCurrentlyStudying}
//               />
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={localState.isCurrentlyStudying}
//                 onChange={(e) =>
//                   handleChange("isCurrentlyStudying", e.target.checked)
//                 }
//                 className="mr-2"
//               />
//               <label>Currently studying here</label>
//             </div>

//             <FloatingLabelInput
//               label="School/College Location"
//               inputType="text"
//               inputClassName="border-gray-300"
//               value={localState.location}
//               onChange={(e) => handleChange("location", e.target.value)}
//             />

//             <div className="relative">
//               <SubSectionTitle label="Education Description" />
//               <TextareaField
//                 placeholder="Example: Majored in Computer Science with a focus on AI and Machine Learning. Participated in hackathons and led the Robotics Club."
//                 value={localState.description}
//                 onChange={(e) => handleChange("description", e.target.value)}
//               />
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </div>
//     );
//   }
// );

// SortableEducationItem.displayName = "SortableEducationItem";

// // Main EducationSection Component
// const EducationSection: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const educations = useAppSelector((state) => state.resume.education);
//   const [expandedItems, setExpandedItems] = useState<string[]>([]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleChange = useCallback(
//     (id: string, field: keyof Education, value: EducationFieldValue) => {
//       dispatch(updateEducation({ id, field, value }));
//     },
//     [dispatch]
//   );

//   const handleDelete = useCallback(
//     (id: string) => {
//       dispatch(deleteEducation(id));
//     },
//     [dispatch]
//   );

//   const handleDragEnd = useCallback(
//     (event: DragEndEvent) => {
//       const { active, over } = event;
//       if (over && active.id !== over.id) {
//         const oldIndex = educations.findIndex((item) => item.id === active.id);
//         const newIndex = educations.findIndex((item) => item.id === over.id);
//         dispatch(reorderEducation({ oldIndex, newIndex }));
//       }
//     },
//     [educations, dispatch]
//   );

//   const addNewEducation = useCallback(() => {
//     const newEducation: Education = {
//       id: `education-${Date.now()}`,
//       degree: "",
//       school: "",
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isCurrentlyStudying: false,
//       location: "",
//       description: "",
//     };
//     dispatch(addEducation(newEducation));
//     setExpandedItems((prev) => [...prev, newEducation.id]);
//   }, [dispatch]);

//   return (
//     <div className="w-full h-auto">
//       <SectionTitle label="Education" />
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={educations.map((edu) => edu.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             value={expandedItems}
//             onValueChange={setExpandedItems}
//           >
//             {educations.map((education) => (
//               <SortableEducationItem
//                 key={education.id}
//                 education={education}
//                 onDelete={handleDelete}
//                 onChange={handleChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       <AddButton label="Add New Education" onClick={addNewEducation} />
//     </div>
//   );
// };

// export default EducationSection;
"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GripVertical } from "lucide-react";
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
import FloatingLabelInput from "@/components/inputComponents/TextInputField";
import FloatingLabelSelect from "@/components/SelectFieldComponent";
import AddButton from "@/components/AddButton";
import SectionTitle from "@/components/SectionTitle";
import SubSectionTitle from "@/components/SubSectionTitle";
import TrashIconComponent from "@/components/TrashIconComponent";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { MonthYearDate } from "@/lib/types/resumeInput";

import {
  addEducation,
  deleteEducation,
  reorderEducation,
  updateEducation,
} from "@/lib/store/slices/resumeSlice";
import { MonthYearDate } from "@/lib/types/generaltypes";
import QuillField from "@/components/inputComponents/ResumeCodeDescription";

// Define Education interface
interface Education {
  id: string;
  degree: string;
  school: string;
  startDate: MonthYearDate;
  endDate: MonthYearDate;
  isCurrentlyStudying: boolean;
  location: string;
  description: string;
}

interface SelectOption {
  value: string;
  label: string;
}

// Month and year options
const months: SelectOption[] = [
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

const years: SelectOption[] = Array.from({ length: 51 }, (_, i) => {
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

// MonthYearPicker Component
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
type EducationFieldValue = string | boolean | MonthYearDate;

interface SortableEducationItemProps {
  education: Education;
  onDelete: (id: string) => void;
  onChange: (
    id: string,
    field: keyof Education,
    value: EducationFieldValue
  ) => void;
}

// SortableEducationItem Component
const SortableEducationItem: React.FC<SortableEducationItemProps> = React.memo(
  ({ education, onDelete, onChange }) => {
    const [localState, setLocalState] = useState(education);
    const dispatch = useAppDispatch();

    const debouncedUpdate = useMemo(
      () =>
        debounce((field: keyof Education, value: EducationFieldValue) => {
          onChange(education.id, field, value);
        }, 1000),
      [education.id, onChange]
    );

    useEffect(() => {
      setLocalState(education);
    }, [education]);

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: education.id,
      });

    const handleChange = useCallback(
      (field: keyof Education, value: EducationFieldValue) => {
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
    const handleDescriptionChange = useCallback(
      (content: string) => {
        setLocalState((prev) => ({
          ...prev,
          description: content,
        }));

        dispatch(
          updateEducation({
            id: education.id,
            field: "description",
            value: content,
          })
        );
      },
      [dispatch, education.id]
    );
    return (
      <div ref={setNodeRef} style={style} {...attributes}>
        <AccordionItem
          value={education.id}
          className="border rounded overflow-hidden mb-2"
        >
          <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 rounded">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <GripVertical
                  className="h-5 w-5 text-gray-400 mr-2 cursor-move"
                  {...listeners}
                />
                <div className="text-left">
                  <div className="font-semibold font-heading text-gray-500">
                    {localState.degree || "New Education"}
                    {localState.school && ` at ${localState.school}`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {localState.startDate?.month && localState.startDate?.year
                      ? `${localState.startDate?.month} ${localState.startDate?.year}`
                      : "Start Date"}{" "}
                    -{" "}
                    {localState.isCurrentlyStudying
                      ? "Present"
                      : localState.endDate?.month && localState.endDate?.year
                      ? `${localState.endDate?.month} ${localState.endDate?.year}`
                      : "End Date"}
                  </div>
                </div>
              </div>
              <TrashIconComponent onDelete={() => onDelete(education.id)} />
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2 space-y-4">
            <div className="w-full h-auto flex gap-2 max-md:gap-3 max-md:flex-col">
              <div className="w-1/2 max-md:w-full">
                <FloatingLabelInput
                  label="Degree"
                  inputType="text"
                  inputClassName="border-gray-300"
                  value={localState.degree}
                  onChange={(e) => handleChange("degree", e.target.value)}
                />
              </div>
              <div className="w-1/2 max-md:w-full">
                <FloatingLabelInput
                  label="School/College Name"
                  inputType="text"
                  inputClassName="border-gray-300"
                  value={localState.school}
                  onChange={(e) => handleChange("school", e.target.value)}
                />
              </div>
            </div>

            <div className="flex min-m-desktop:space-x-4 w-full  max-m-desktop:flex-col flex-row  max-m-desktop:h-auto  gap-y-3 xl:gap-2">
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
                disabled={localState.isCurrentlyStudying}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={localState.isCurrentlyStudying}
                onChange={(e) =>
                  handleChange("isCurrentlyStudying", e.target.checked)
                }
                className="mr-2"
              />
              <label>Currently studying here</label>
            </div>

            <FloatingLabelInput
              label="School/College Location"
              inputType="text"
              inputClassName="border-gray-300"
              value={localState.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />

            <div className="relative">
              <SubSectionTitle label="Education Description" />
              {/* <TextareaField
                placeholder="Example: Majored in Computer Science with a focus on AI and Machine Learning. Participated in hackathons and led the Robotics Club."
                value={localState.description}
                onChange={(e) => handleChange("description", e.target.value)}
              /> */}
              <QuillField
                value={localState.description}
                onChange={handleDescriptionChange}
                placeholderText="Example: Majored in Computer Science with a focus on AI and Machine Learning. Participated in hackathons and led the Robotics Club."
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </div>
    );
  }
);

SortableEducationItem.displayName = "SortableEducationItem";

// Main EducationSection Component
const EducationSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const educations = useAppSelector((state) => state.resume.education);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleChange = useCallback(
    (id: string, field: keyof Education, value: EducationFieldValue) => {
      dispatch(updateEducation({ id, field, value }));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteEducation(id));
    },
    [dispatch]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = educations.findIndex((item) => item.id === active.id);
        const newIndex = educations.findIndex((item) => item.id === over.id);
        dispatch(reorderEducation({ oldIndex, newIndex }));
      }
    },
    [educations, dispatch]
  );

  const addNewEducation = useCallback(() => {
    const newEducation: Education = {
      id: `education-${Date.now()}`,
      degree: "",
      school: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      isCurrentlyStudying: false,
      location: "",
      description: "",
    };
    dispatch(addEducation(newEducation));
    setExpandedItems((prev) => [...prev, newEducation.id]);
  }, [dispatch]);

  return (
    <div className="w-full h-auto">
      <SectionTitle label="Education" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={educations.map((edu) => edu.id)}
          strategy={verticalListSortingStrategy}
        >
          <Accordion
            type="multiple"
            className="w-full space-y-2"
            value={expandedItems}
            onValueChange={setExpandedItems}
          >
            {educations.map((education) => (
              <SortableEducationItem
                key={education.id}
                education={education}
                onDelete={handleDelete}
                onChange={handleChange}
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>
      <AddButton label="Add New Education" onClick={addNewEducation} />
    </div>
  );
};

export default EducationSection;
