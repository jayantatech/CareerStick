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
// import TrashIconComponent from "@/components/TrashIconComponent";

// interface Award {
//   id: string;
//   name: string;
//   issuer: string;
//   date: { month: string; year: string };
//   description: string;
// }

// interface MonthYearPickerProps {
//   labelFirst: string;
//   labelSecond: string;
//   value: { month: string; year: string };
//   onChange: (value: { month: string; year: string }) => void;
// }

// const MonthYearPicker = ({
//   labelFirst,
//   labelSecond,
//   value,
//   onChange,
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
//           />
//         </div>
//         <div className="w-1/2">
//           <FloatingLabelSelect
//             label={labelSecond}
//             options={years}
//             value={value.year}
//             onChange={handleYearChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const SortableAwardItem = ({
//   award,
//   onDelete,
//   onChange,
// }: {
//   award: Award;
//   onDelete: (id: string) => void;
//   onChange: (id: string, field: keyof Award, value: any) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: award.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       <AccordionItem
//         value={award.id}
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
//                   {award.name || "New Award"}
//                   {award.issuer ? ` from ${award.issuer}` : ""}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {award.date.month && award.date.year
//                     ? `Received: ${award.date.month} ${award.date.year}`
//                     : "Award Date"}
//                 </div>
//               </div>
//             </div>
//             {/* <Trash2
//               className="h-4 w-4 text-gray-500 cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDelete(award.id);
//               }}
//             /> */}
//             <TrashIconComponent onDelete={() => onDelete(award.id)} />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <div className="w-full h-auto flex gap-2">
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Award Name"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={award.name}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   onChange(award.id, "name", e.target.value)
//                 }
//               />
//             </div>
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Issuing Organization"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={award.issuer}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   onChange(award.id, "issuer", e.target.value)
//                 }
//               />
//             </div>
//           </div>
//           <div className="w-full">
//             <MonthYearPicker
//               labelFirst="Month Received"
//               labelSecond="Year Received"
//               value={award.date}
//               onChange={(value: any) => onChange(award.id, "date", value)}
//             />
//           </div>
//           <div className="relative">
//             <h4 className="font-heading font-semibold text-[14px] text-gray-900">
//               Award Description
//             </h4>
//             {/* <p className="font-body font-normal text-[15px] text-gray-500 pb-2">
//               Describe the significance of this award and what it recognizes.
//               Include any relevant context about the selection criteria or
//               competition.
//             </p> */}
//             <TextareaField
//               placeholder="Example: Received for exceptional leadership in developing an innovative project that increased team productivity by 40%. Selected from over 100 nominees across the organization."
//               value={award.description}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                 onChange(award.id, "description", e.target.value)
//               }
//             />
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const AwardsSection = () => {
//   const [awards, setAwards] = useState<Award[]>([
//     {
//       id: "default-award",
//       name: "",
//       issuer: "",
//       date: { month: "", year: "" },
//       description: "",
//     },
//   ]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const addNewAward = () => {
//     const newAward: Award = {
//       id: `award-${Date.now()}`,
//       name: "",
//       issuer: "",
//       date: { month: "", year: "" },
//       description: "",
//     };
//     setAwards([...awards, newAward]);
//   };

//   const handleInputChange = (id: string, field: keyof Award, value: any) => {
//     setAwards(
//       awards.map((award) =>
//         award.id === id
//           ? {
//               ...award,
//               [field]: value,
//             }
//           : award
//       )
//     );
//   };

//   const deleteAward = (id: string) => {
//     setAwards(awards.filter((award) => award.id !== id));
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setAwards((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       {/* <h3 className="font-heading font-semibold text-[16px] text-black pb-[2px]">
//         Awards & Honors
//       </h3> */}
//       <SectionTitle label="Awards & Honors" />
//       {/* <p className="font-body font-normal text-[15px] text-gray-500 mb-4">
//         Showcase your professional and academic achievements. Include awards,
//         honors, and recognition that demonstrate your excellence and impact in
//         your field.
//       </p> */}
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={awards.map((award) => award.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             defaultValue={["default-award"]}
//           >
//             {awards.map((award) => (
//               <SortableAwardItem
//                 key={award.id}
//                 award={award}
//                 onDelete={deleteAward}
//                 onChange={handleInputChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       {/* <Button
//         onClick={addNewAward}
//         variant="outline"
//         className="mt-4 flex items-center text-primary hover:text-primary-dark"
//       >
//         <PlusCircle className="mr-2" />
//         Add New Award
//       </Button> */}
//       <AddButton label="Add New Award" onClick={addNewAward} />
//     </div>
//   );
// };

// export default AwardsSection;

// AwardsSection.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GripVertical } from "lucide-react";
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
  arrayMove,
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
import TrashIconComponent from "@/components/TrashIconComponent";
// import { RootState } from "@/store/store"; // Adjust the import path as needed
import {
  setAwards,
  updateAward,
  addAward,
  deleteAward,
  reorderAwards,
} from "@/lib/store/slices/resumeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

interface Award {
  id: string;
  name: string;
  issuer: string;
  date: { month: string; year: string };
  description: string;
}

interface MonthYearPickerProps {
  labelFirst: string;
  labelSecond: string;
  value: { month: string; year: string };
  onChange: (value: { month: string; year: string }) => void;
}

const MonthYearPicker = ({
  labelFirst,
  labelSecond,
  value,
  onChange,
}: MonthYearPickerProps) => {
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
          />
        </div>
        <div className="w-1/2">
          <FloatingLabelSelect
            label={labelSecond}
            options={years}
            value={value.year}
            onChange={handleYearChange}
          />
        </div>
      </div>
    </div>
  );
};
const SortableAwardItem = ({
  award,
  onDelete,
  onChange,
}: {
  award: Award;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof Award, value: any) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: award.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [localAward, setLocalAward] = useState(award);

  // Update local state immediately and debounce Redux updates
  const handleLocalChange = (field: keyof Award, value: any) => {
    setLocalAward((prev) => ({
      ...prev,
      [field]: value,
    }));
    onChange(award.id, field, value);
  };

  // Update local state when props change
  useEffect(() => {
    setLocalAward(award);
  }, [award]);

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <AccordionItem
        value={award.id}
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
                  {localAward.name || "New Award"}
                  {localAward.issuer ? ` from ${localAward.issuer}` : ""}
                </div>
                <div className="text-sm text-gray-500">
                  {localAward.date.month && localAward.date.year
                    ? `Received: ${localAward.date.month} ${localAward.date.year}`
                    : "Award Date"}
                </div>
              </div>
            </div>
            <TrashIconComponent onDelete={() => onDelete(award.id)} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 space-y-4">
          <div className="w-full h-auto flex gap-2">
            <div className="w-1/2">
              <FloatingLabelInput
                label="Award Name"
                inputType="text"
                inputClassName="border-gray-300"
                value={localAward.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleLocalChange("name", e.target.value)
                }
              />
            </div>
            <div className="w-1/2">
              <FloatingLabelInput
                label="Issuing Organization"
                inputType="text"
                inputClassName="border-gray-300"
                value={localAward.issuer}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleLocalChange("issuer", e.target.value)
                }
              />
            </div>
          </div>
          <div className="w-full">
            <MonthYearPicker
              labelFirst="Month Received"
              labelSecond="Year Received"
              value={localAward.date}
              onChange={(value: any) => handleLocalChange("date", value)}
            />
          </div>
          <div className="relative">
            <h4 className="font-heading font-semibold text-[14px] text-gray-900">
              Award Description
            </h4>
            <TextareaField
              placeholder="Example: Received for exceptional leadership in developing an innovative project that increased team productivity by 40%. Selected from over 100 nominees across the organization."
              value={localAward.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleLocalChange("description", e.target.value)
              }
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

const AwardsSection = () => {
  const dispatch = useAppDispatch();
  // const reduxAwards = useSelector((state) => state.resume.awards);
  const reduxAwards = useAppSelector((state) => state.resume.awards);

  const [localAwards, setLocalAwards] = useState<Award[]>(reduxAwards);

  // Initialize with redux state
  useEffect(() => {
    if (reduxAwards.length === 0) {
      const initialAward = {
        id: "default-award",
        name: "",
        issuer: "",
        date: { month: "", year: "" },
        description: "",
      };
      setLocalAwards([initialAward]);
      dispatch(setAwards([initialAward]));
    } else {
      setLocalAwards(reduxAwards);
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Debounced function to update Redux
  const debouncedUpdateRedux = useCallback(
    debounce((awards: Award[]) => {
      dispatch(setAwards(awards));
    }, 1000),
    []
  );

  const addNewAward = () => {
    const newAward: Award = {
      id: `award-${Date.now()}`,
      name: "",
      issuer: "",
      date: { month: "", year: "" },
      description: "",
    };
    setLocalAwards((prev) => [...prev, newAward]);
    dispatch(addAward(newAward));
  };

  const handleInputChange = (id: string, field: keyof Award, value: any) => {
    const updatedAwards = localAwards.map((award) =>
      award.id === id ? { ...award, [field]: value } : award
    );
    setLocalAwards(updatedAwards);
    debouncedUpdateRedux(updatedAwards);
  };

  const deleteAwardHandler = (id: string) => {
    setLocalAwards((prev) => prev.filter((award) => award.id !== id));
    dispatch(deleteAward(id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = localAwards.findIndex((item) => item.id === active.id);
      const newIndex = localAwards.findIndex((item) => item.id === over.id);

      const newOrder = arrayMove(localAwards, oldIndex, newIndex);
      setLocalAwards(newOrder);
      dispatch(reorderAwards({ oldIndex, newIndex }));
    }
  };

  return (
    <div className="w-full h-auto">
      <SectionTitle label="Awards & Honors" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localAwards.map((award) => award.id)}
          strategy={verticalListSortingStrategy}
        >
          <Accordion
            type="multiple"
            className="w-full space-y-2"
            defaultValue={["default-award"]}
          >
            {localAwards.map((award) => (
              <SortableAwardItem
                key={award.id}
                award={award}
                onDelete={deleteAwardHandler}
                onChange={handleInputChange}
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>
      <AddButton label="Add New Award" onClick={addNewAward} />
    </div>
  );
};

export default AwardsSection;
