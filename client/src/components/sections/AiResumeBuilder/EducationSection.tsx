// fully working code 23 oct 1:30pm

// "use client";
// import React, { useState } from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { PlusCircle, Trash2, GripVertical } from "lucide-react";
// import { Button } from "@/components/ui/button";
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
//   arrayMove,
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
// import { BsTrash3 } from "react-icons/bs";
// import TrashIconComponent from "@/components/TrashIconComponent";

// interface Education {
//   id: string;
//   degree: string;
//   school: string;
//   startDate: { month: string; year: string };
//   endDate: { month: string; year: string };
//   isCurrentlyStudying: boolean;
//   location: string;
//   description: string;
// }

// interface MonthYearPickerProps {
//   labelFirst: string;
//   labelSecond: string;
//   value: { month: string; year: string };
//   onChange: (value: { month: string; year: string }) => void;
//   disabled?: boolean;
// }

// const MonthYearPicker = ({
//   labelFirst,
//   labelSecond,
//   value,
//   onChange,
//   disabled = false,
// }: MonthYearPickerProps) => {
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
//     onChange({ ...value, month: newMonth });
//   };

//   const handleYearChange = (newYear: string) => {
//     onChange({ ...value, year: newYear });
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

// const SortableEducationItem = ({
//   education,
//   onDelete,
//   onChange,
// }: {
//   education: Education;
//   onDelete: (id: string) => void;
//   onChange: (id: string, field: keyof Education, value: any) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: education.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       <AccordionItem
//         value={education.id}
//         className="border rounded overflow-hidden mb-2"
//       >
//         <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 bg-red-d400 rounded ">
//           <div className="flex justify-between items-center w-full">
//             <div className="flex items-center">
//               <GripVertical
//                 className="h-5 w-5 text-gray-400 mr-2 cursor-move"
//                 {...listeners}
//               />
//               <div className="text-left">
//                 <div className="font-semibold font-heading text-gray-500">
//                   {education.degree || "New Education"}
//                   {education.school ? ` at ${education.school}` : ""}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {education.startDate.month && education.startDate.year
//                     ? `${education.startDate.month} ${education.startDate.year}`
//                     : "Start Date"}{" "}
//                   -{" "}
//                   {education.isCurrentlyStudying
//                     ? "Present"
//                     : education.endDate.month && education.endDate.year
//                     ? `${education.endDate.month} ${education.endDate.year}`
//                     : "End Date"}
//                 </div>
//               </div>
//             </div>
//             {/* <Trash2
//               className="h-4 w-4 text-gray-500 cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDelete(education.id);
//               }}
//             /> */}
//             {/* <div
//               className="w-[30px] h-[30px] shadow-sm rounded-sm border flex items-center justify-center"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDelete(education.id);
//               }}
//             >
//               <BsTrash3 className="text-[16px] text-gray-500 cursor-pointer" />
//             </div> */}
//             <TrashIconComponent onDelete={() => onDelete(education.id)} />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <div className="w-full h-auto flex gap-2">
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Degree"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={education.degree}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   onChange(education.id, "degree", e.target.value)
//                 }
//               />
//             </div>
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="School/College Name"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={education.school}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   onChange(education.id, "school", e.target.value)
//                 }
//               />
//             </div>
//           </div>
//           <div className="flex space-x-4 w-full bg-redd-400 h-[48px]">
//             <MonthYearPicker
//               labelFirst="Start Month"
//               labelSecond="Start Year"
//               value={education.startDate}
//               onChange={(value: any) =>
//                 onChange(education.id, "startDate", value)
//               }
//             />
//             <MonthYearPicker
//               labelFirst="End Month"
//               labelSecond="End Year"
//               value={education.endDate}
//               onChange={(value: any) =>
//                 onChange(education.id, "endDate", value)
//               }
//               disabled={education.isCurrentlyStudying}
//             />
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={education.isCurrentlyStudying}
//               onChange={(e) =>
//                 onChange(education.id, "isCurrentlyStudying", e.target.checked)
//               }
//               className="mr-2"
//             />
//             <label>Currently studying here</label>
//           </div>
//           <FloatingLabelInput
//             label="School/College Location"
//             inputType="text"
//             inputClassName="border-gray-300"
//             value={education.location}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               onChange(education.id, "location", e.target.value)
//             }
//           />
//           <div className="relative">
//             {/* <h4 className="font-heading font-semibold text-[14px] text-gray-900">
//               Education Description
//             </h4> */}
//             <SubSectionTitle label="Education Description" />
//             {/* <p className="font-body font-normal text-[15px] text-gray-500 pb-2">
//               {`Outline your key achievements, coursework, and extracurricular activities. We'll help refine it into a standout statement.`}
//             </p> */}
//             <TextareaField
//               placeholder="Example: Majored in Computer Science with a focus on AI and Machine Learning. Participated in hackathons and led the Robotics Club."
//               value={education.description}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                 onChange(education.id, "description", e.target.value)
//               }
//             />
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const EducationSection = () => {
//   const [educations, setEducations] = useState<Education[]>([
//     {
//       id: "default-education",
//       degree: "",
//       school: "",
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isCurrentlyStudying: false,
//       location: "",
//       description: "",
//     },
//   ]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const addNewEducation = () => {
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
//     setEducations([...educations, newEducation]);
//   };

//   const handleInputChange = (
//     id: string,
//     field: keyof Education,
//     value: any
//   ) => {
//     setEducations(
//       educations.map((edu) =>
//         edu.id === id
//           ? {
//               ...edu,
//               [field]: value,
//               ...(field === "isCurrentlyStudying" && value
//                 ? { endDate: { month: "", year: "" } }
//                 : {}),
//             }
//           : edu
//       )
//     );
//   };

//   const deleteEducation = (id: string) => {
//     setEducations(educations.filter((edu) => edu.id !== id));
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setEducations((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       {/* <h3 className="font-heading font-semibold text-[16px] text-black pb-[8px]">
//         Education
//       </h3> */}
//       <SectionTitle label="Education" />
//       {/* <p className="font-body font-normal text-[15px] text-gray-500 mb-4">
//         Enter your educational background, highlighting your degrees, schools,
//         and key achievements. Share your academic journey, and we'll help you
//         format it professionally.
//       </p> */}
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
//             defaultValue={["default-education"]}
//           >
//             {educations.map((education) => (
//               <SortableEducationItem
//                 key={education.id}
//                 education={education}
//                 onDelete={deleteEducation}
//                 onChange={handleInputChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       {/* <Button
//         onClick={addNewEducation}
//         variant="outline"
//         className="mt-4 flex items-center text-primary hover:text-primary-dark"
//       >
//         <PlusCircle className="mr-2" />
//         Add New Education
//       </Button> */}
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
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FloatingLabelInput from "@/components/inputComponents/TextInputField";
import { TextareaField } from "@/components/inputComponents/TextareaField";
import FloatingLabelSelect from "@/components/SelectFieldComponent";
import AddButton from "@/components/AddButton";
import SectionTitle from "@/components/SectionTitle";
import SubSectionTitle from "@/components/SubSectionTitle";
import TrashIconComponent from "@/components/TrashIconComponent";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { MonthYearDate } from "@/lib/types/resumeInput";
import {
  addEducation,
  deleteEducation,
  reorderEducation,
  updateEducation,
} from "@/lib/store/slices/resumeSlice";

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

// Month and year options
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

// MonthYearPicker Component
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

// SortableEducationItem Component
const SortableEducationItem: React.FC<{
  education: Education;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof Education, value: any) => void;
}> = React.memo(({ education, onDelete, onChange }) => {
  const [localState, setLocalState] = useState(education);
  const debouncedUpdate = useMemo(
    () =>
      debounce((field: keyof Education, value: any) => {
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
    (field: keyof Education, value: any) => {
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
                  {localState.startDate.month && localState.startDate.year
                    ? `${localState.startDate.month} ${localState.startDate.year}`
                    : "Start Date"}{" "}
                  -{" "}
                  {localState.isCurrentlyStudying
                    ? "Present"
                    : localState.endDate.month && localState.endDate.year
                    ? `${localState.endDate.month} ${localState.endDate.year}`
                    : "End Date"}
                </div>
              </div>
            </div>
            <TrashIconComponent onDelete={() => onDelete(education.id)} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 space-y-4">
          <div className="w-full h-auto flex gap-2">
            <div className="w-1/2">
              <FloatingLabelInput
                label="Degree"
                inputType="text"
                inputClassName="border-gray-300"
                value={localState.degree}
                onChange={(e) => handleChange("degree", e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <FloatingLabelInput
                label="School/College Name"
                inputType="text"
                inputClassName="border-gray-300"
                value={localState.school}
                onChange={(e) => handleChange("school", e.target.value)}
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
            <TextareaField
              placeholder="Example: Majored in Computer Science with a focus on AI and Machine Learning. Participated in hackathons and led the Robotics Club."
              value={localState.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
});

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
    (id: string, field: keyof Education, value: any) => {
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
    (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        const oldIndex = educations.findIndex(
          (item: any) => item.id === active.id
        );
        const newIndex = educations.findIndex(
          (item: any) => item.id === over.id
        );
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
