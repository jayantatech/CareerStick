// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import debounce from "lodash/debounce";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { GripVertical } from "lucide-react";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
// import { TextareaField } from "@/components/inputComponents/TextareaField";
// import FloatingLabelSelect from "@/components/SelectFieldComponent";
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
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import AddButton from "@/components/AddButton";
// import SectionTitle from "@/components/SectionTitle";
// import TrashIconComponent from "@/components/TrashIconComponent";
// import {
//   setCustomSections,
//   addCustomSection,
//   deleteCustomSection,
//   reorderCustomSections,
// } from "@/lib/store/slices/resumeSlice";

// interface CustomSection {
//   id: string;
//   title: string;
//   subtitle: string;
//   description: string;
//   startDate: { month: string; year: string };
//   endDate: { month: string; year: string };
//   isPresent: boolean;
// }

// interface MonthYearPickerProps {
//   labelFirst: string;
//   labelSecond: string;
//   value: { month: string; year: string };
//   onChange: (value: { month: string; year: string }) => void;
//   disabled?: boolean;
// }

// const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
//   labelFirst,
//   labelSecond,
//   value,
//   onChange,
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
//     const year = 2040 - i;
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

// const SortableCustomSectionItem = ({
//   section,
//   onDelete,
//   onChange,
// }: {
//   section: CustomSection;
//   onDelete: (id: string) => void;
//   onChange: (id: string, field: keyof CustomSection, value: string) => void;
// }) => {
//   const [localSection, setLocalSection] = useState(section);
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: section.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const handleChange = (
//     field: keyof CustomSection,
//     value: string | boolean | { month: string; year: string }
//   ) => {
//     setLocalSection((prev) => ({ ...prev, [field]: value }));
//     onChange(section.id, field, value as string);
//   };

//   useEffect(() => {
//     setLocalSection(section);
//   }, [section]);

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       <AccordionItem
//         value={section.id}
//         className="border rounded overflow-hidden mb-2"
//       >
//         <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 bg-red-d400 rounded">
//           <div className="flex justify-between items-center w-full">
//             <div className="flex items-center">
//               <GripVertical
//                 className="h-5 w-5 text-gray-400 mr-2 cursor-move"
//                 {...listeners}
//               />
//               <div className="text-left">
//                 <div className="font-semibold font-heading text-gray-500">
//                   {localSection.title || "New Custom Section"}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {localSection.subtitle || "Add subtitle"} -{" "}
//                   {localSection.startDate.month && localSection.startDate.year
//                     ? `${localSection.startDate.month} ${localSection.startDate.year}`
//                     : "Start Date"}{" "}
//                   to{" "}
//                   {localSection.isPresent
//                     ? "Present"
//                     : localSection.endDate.month && localSection.endDate.year
//                     ? `${localSection.endDate.month} ${localSection.endDate.year}`
//                     : "End Date"}
//                 </div>
//               </div>
//             </div>
//             <TrashIconComponent onDelete={() => onDelete(section.id)} />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <div className="w-full h-auto flex gap-2">
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Section Title"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={localSection.title}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   handleChange("title", e.target.value)
//                 }
//               />
//             </div>
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Subtitle (Optional)"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={localSection.subtitle}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   handleChange("subtitle", e.target.value)
//                 }
//               />
//             </div>
//           </div>

//           <div className="flex space-x-4 w-full h-[48px]">
//             <MonthYearPicker
//               labelFirst="Start Month"
//               labelSecond="Start Year"
//               value={localSection.startDate}
//               onChange={(value) => handleChange("startDate", value)}
//             />
//             <MonthYearPicker
//               labelFirst="End Month"
//               labelSecond="End Year"
//               value={localSection.endDate}
//               onChange={(value) => handleChange("endDate", value)}
//               disabled={localSection.isPresent}
//             />
//           </div>

//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={localSection.isPresent}
//               onChange={(e) => handleChange("isPresent", e.target.checked)}
//               className="mr-2"
//             />
//             <label>Present</label>
//           </div>

//           <div className="relative">
//             <h4 className="font-heading font-semibold text-[14px] text-gray-900">
//               Section Description
//             </h4>
//             <TextareaField
//               placeholder="Enter a description for this section..."
//               value={localSection.description}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                 handleChange("description", e.target.value)
//               }
//             />
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const CustomSections = () => {
//   const dispatch = useAppDispatch();
//   const reduxSections = useAppSelector((state) => state.resume.customSections);
//   const [localSections, setLocalSections] =
//     useState<CustomSection[]>(reduxSections);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const debouncedUpdateRedux = useCallback(
//     debounce((sections: CustomSection[]) => {
//       dispatch(setCustomSections(sections));
//     }, 1000),
//     [dispatch]
//   );

//   const debouncedUpdate = useMemo(
//     () => debounce(debouncedUpdateRedux, 1000),
//     [debouncedUpdateRedux]
//   );

//   useEffect(() => {
//     return () => {
//       debouncedUpdate.cancel();
//     };
//   }, [debouncedUpdate]);

//   useEffect(() => {
//     setLocalSections(reduxSections);
//   }, [reduxSections]);

//   const addNewSection = () => {
//     const newSection: CustomSection = {
//       id: `section-${Date.now()}`,
//       title: "",
//       subtitle: "",
//       description: "",
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isPresent: false,
//     };
//     setLocalSections([...localSections, newSection]);
//     dispatch(addCustomSection(newSection));
//   };

//   const handleDelete = (id: string) => {
//     setLocalSections(localSections.filter((section) => section.id !== id));
//     dispatch(deleteCustomSection(id));
//   };

//   const handleChange = (
//     id: string,
//     field: keyof CustomSection,
//     value: string | boolean | { month: string; year: string }
//   ) => {
//     const updatedSections = localSections.map((section) =>
//       section.id === id ? { ...section, [field]: value } : section
//     );
//     setLocalSections(updatedSections);
//     debouncedUpdate(updatedSections);
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;

//     if (active.id !== over?.id) {
//       const oldIndex = localSections.findIndex((item) => item.id === active.id);
//       const newIndex = localSections.findIndex((item) => item.id === over?.id);

//       const newOrder = arrayMove(localSections, oldIndex, newIndex);
//       setLocalSections(newOrder);
//       dispatch(reorderCustomSections({ oldIndex, newIndex }));
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       <SectionTitle label="Custom Sections" />
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={localSections.map((section) => section.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             defaultValue={["default-section"]}
//           >
//             {localSections.map((section) => (
//               <SortableCustomSectionItem
//                 key={section.id}
//                 section={section}
//                 onDelete={handleDelete}
//                 onChange={handleChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       <AddButton label="Add New Section" onClick={addNewSection} />
//     </div>
//   );
// };

// export default CustomSections;
"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import debounce from "lodash/debounce";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GripVertical } from "lucide-react";
import FloatingLabelInput from "@/components/inputComponents/TextInputField";
import { TextareaField } from "@/components/inputComponents/TextareaField";
import FloatingLabelSelect from "@/components/SelectFieldComponent";
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddButton from "@/components/AddButton";
import SectionTitle from "@/components/SectionTitle";
import TrashIconComponent from "@/components/TrashIconComponent";
import {
  setCustomSections,
  addCustomSection,
  deleteCustomSection,
  reorderCustomSections,
} from "@/lib/store/slices/resumeSlice";

interface CustomSection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string };
  isPresent: boolean;
}

interface MonthYearPickerProps {
  labelFirst: string;
  labelSecond: string;
  value: { month: string; year: string };
  onChange: (value: { month: string; year: string }) => void;
  disabled?: boolean;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  labelFirst,
  labelSecond,
  value,
  onChange,
  disabled = false,
}) => {
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
    const year = 2040 - i;
    return { value: year.toString(), label: year.toString() };
  });

  const handleMonthChange = (newMonth: string) => {
    onChange({ ...value, month: newMonth });
  };

  const handleYearChange = (newYear: string) => {
    onChange({ ...value, year: newYear });
  };

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
};

const SortableCustomSectionItem = ({
  section,
  onDelete,
  onChange,
}: {
  section: CustomSection;
  onDelete: (id: string) => void;
  onChange: (
    id: string,
    field: keyof CustomSection,
    value: string | boolean | { month: string; year: string }
  ) => void;
}) => {
  const [localSection, setLocalSection] = useState(section);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (
    field: keyof CustomSection,
    value: string | boolean | { month: string; year: string }
  ) => {
    setLocalSection((prev) => ({ ...prev, [field]: value }));
    onChange(section.id, field, value);
  };

  useEffect(() => {
    setLocalSection(section);
  }, [section]);

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <AccordionItem
        value={section.id}
        className="border rounded overflow-hidden mb-2"
      >
        <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 bg-red-d400 rounded">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <GripVertical
                className="h-5 w-5 text-gray-400 mr-2 cursor-move"
                {...listeners}
              />
              <div className="text-left">
                <div className="font-semibold font-heading text-gray-500">
                  {localSection.title || "New Custom Section"}
                </div>
                <div className="text-sm text-gray-500">
                  {localSection.subtitle || "Add subtitle"} -{" "}
                  {localSection.startDate.month && localSection.startDate.year
                    ? `${localSection.startDate.month} ${localSection.startDate.year}`
                    : "Start Date"}{" "}
                  to{" "}
                  {localSection.isPresent
                    ? "Present"
                    : localSection.endDate.month && localSection.endDate.year
                    ? `${localSection.endDate.month} ${localSection.endDate.year}`
                    : "End Date"}
                </div>
              </div>
            </div>
            <TrashIconComponent onDelete={() => onDelete(section.id)} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 space-y-4">
          <div className="w-full h-auto flex gap-2">
            <div className="w-1/2">
              <FloatingLabelInput
                label="Section Title"
                inputType="text"
                inputClassName="border-gray-300"
                value={localSection.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("title", e.target.value)
                }
              />
            </div>
            <div className="w-1/2">
              <FloatingLabelInput
                label="Subtitle (Optional)"
                inputType="text"
                inputClassName="border-gray-300"
                value={localSection.subtitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("subtitle", e.target.value)
                }
              />
            </div>
          </div>

          <div className="flex space-x-4 w-full h-[48px]">
            <MonthYearPicker
              labelFirst="Start Month"
              labelSecond="Start Year"
              value={localSection.startDate}
              onChange={(value) => handleChange("startDate", value)}
            />
            <MonthYearPicker
              labelFirst="End Month"
              labelSecond="End Year"
              value={localSection.endDate}
              onChange={(value) => handleChange("endDate", value)}
              disabled={localSection.isPresent}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={localSection.isPresent}
              onChange={(e) => handleChange("isPresent", e.target.checked)}
              className="mr-2"
            />
            <label>Present</label>
          </div>

          <div className="relative">
            <h4 className="font-heading font-semibold text-[14px] text-gray-900">
              Section Description
            </h4>
            <TextareaField
              placeholder="Enter a description for this section..."
              value={localSection.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChange("description", e.target.value)
              }
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

const CustomSections = () => {
  const dispatch = useAppDispatch();
  const reduxSections = useAppSelector((state) => state.resume.customSections);
  const [localSections, setLocalSections] =
    useState<CustomSection[]>(reduxSections);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const debouncedUpdateRedux = useCallback(
    (sections: CustomSection[]) => {
      dispatch(setCustomSections(sections));
    },
    [dispatch]
  );

  const debouncedUpdate = useMemo(
    () => debounce(debouncedUpdateRedux, 1000),
    [debouncedUpdateRedux]
  );

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  useEffect(() => {
    setLocalSections(reduxSections);
  }, [reduxSections]);

  const addNewSection = () => {
    const newSection: CustomSection = {
      id: `section-${Date.now()}`,
      title: "",
      subtitle: "",
      description: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      isPresent: false,
    };
    setLocalSections([...localSections, newSection]);
    dispatch(addCustomSection(newSection));
  };

  const handleDelete = (id: string) => {
    setLocalSections(localSections.filter((section) => section.id !== id));
    dispatch(deleteCustomSection(id));
  };

  const handleChange = (
    id: string,
    field: keyof CustomSection,
    value: string | boolean | { month: string; year: string }
  ) => {
    const updatedSections = localSections.map((section) =>
      section.id === id ? { ...section, [field]: value } : section
    );
    setLocalSections(updatedSections);
    debouncedUpdate(updatedSections);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = localSections.findIndex((item) => item.id === active.id);
      const newIndex = localSections.findIndex((item) => item.id === over?.id);

      const newOrder = arrayMove(localSections, oldIndex, newIndex);
      setLocalSections(newOrder);
      dispatch(reorderCustomSections({ oldIndex, newIndex }));
    }
  };

  return (
    <div className="w-full h-auto">
      <SectionTitle label="Custom Sections" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localSections.map((section) => section.id)}
          strategy={verticalListSortingStrategy}
        >
          <Accordion
            type="multiple"
            className="w-full space-y-2"
            defaultValue={["default-section"]}
          >
            {localSections.map((section) => (
              <SortableCustomSectionItem
                key={section.id}
                section={section}
                onDelete={handleDelete}
                onChange={handleChange}
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>
      <AddButton label="Add New Section" onClick={addNewSection} />
    </div>
  );
};

export default CustomSections;
