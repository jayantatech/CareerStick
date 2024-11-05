// // AwardsSection.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import debounce from "lodash/debounce";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { GripVertical } from "lucide-react";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
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
// import { TextareaField } from "@/components/inputComponents/TextareaField";
// import FloatingLabelSelect from "@/components/SelectFieldComponent";
// import AddButton from "@/components/AddButton";
// import SectionTitle from "@/components/SectionTitle";
// import TrashIconComponent from "@/components/TrashIconComponent";
// import {
//   setAwards,
//   addAward,
//   deleteAward,
//   reorderAwards,
// } from "@/lib/store/slices/resumeSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

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
//   onChange: (id: string, field: keyof Award, value: string) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: award.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const [localAward, setLocalAward] = useState(award);

//   // Update local state immediately and debounce Redux updates
//   const handleLocalChange = (
//     field: keyof Award,
//     value: string | { month: string; year: string }
//   ) => {
//     setLocalAward((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//     onChange(award.id, field, value as string);
//   };

//   // Update local state when props change
//   useEffect(() => {
//     setLocalAward(award);
//   }, [award]);

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
//                   {localAward.name || "New Award"}
//                   {localAward.issuer ? ` from ${localAward.issuer}` : ""}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {localAward.date.month && localAward.date.year
//                     ? `Received: ${localAward.date.month} ${localAward.date.year}`
//                     : "Award Date"}
//                 </div>
//               </div>
//             </div>
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
//                 value={localAward.name}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   handleLocalChange("name", e.target.value)
//                 }
//               />
//             </div>
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Issuing Organization"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={localAward.issuer}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   handleLocalChange("issuer", e.target.value)
//                 }
//               />
//             </div>
//           </div>
//           <div className="w-full">
//             <MonthYearPicker
//               labelFirst="Month Received"
//               labelSecond="Year Received"
//               value={localAward.date}
//               onChange={(value) => handleLocalChange("date", value)}
//             />
//           </div>
//           <div className="relative">
//             <h4 className="font-heading font-semibold text-[14px] text-gray-900">
//               Award Description
//             </h4>
//             <TextareaField
//               placeholder="Example: Received for exceptional leadership in developing an innovative project that increased team productivity by 40%. Selected from over 100 nominees across the organization."
//               value={localAward.description}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                 handleLocalChange("description", e.target.value)
//               }
//             />
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const AwardsSection = () => {
//   const dispatch = useAppDispatch();
//   // const reduxAwards = useSelector((state) => state.resume.awards);
//   const reduxAwards = useAppSelector((state) => state.resume.awards);

//   const [localAwards, setLocalAwards] = useState<Award[]>(reduxAwards);

//   // Initialize with redux state
//   useEffect(() => {
//     if (reduxAwards.length === 0) {
//       const initialAward = {
//         id: "default-award",
//         name: "",
//         issuer: "",
//         date: { month: "", year: "" },
//         description: "",
//       };
//       setLocalAwards([initialAward]);
//       dispatch(setAwards([initialAward]));
//     } else {
//       setLocalAwards(reduxAwards);
//     }
//   }, [dispatch, reduxAwards]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   // Debounced function to update Redux
//   // const debouncedUpdateRedux = useCallback(
//   //   debounce((awards: Award[]) => {
//   //     dispatch(setAwards(awards));
//   //   }, 1000),
//   //   [dispatch]
//   // );
//   const debouncedUpdateRedux = debounce((dispatch, awards: Award[]) => {
//     dispatch(setAwards(awards));
//   }, 1000);

//   const addNewAward = () => {
//     const newAward: Award = {
//       id: `award-${Date.now()}`,
//       name: "",
//       issuer: "",
//       date: { month: "", year: "" },
//       description: "",
//     };
//     setLocalAwards((prev) => [...prev, newAward]);
//     dispatch(addAward(newAward));
//   };

//   const handleInputChange = (id: string, field: keyof Award, value: string) => {
//     const updatedAwards = localAwards.map((award) =>
//       award.id === id ? { ...award, [field]: value } : award
//     );
//     setLocalAwards(updatedAwards);
//     debouncedUpdateRedux(dispatch, updatedAwards); // Pass dispatch here
//   };

//   const deleteAwardHandler = (id: string) => {
//     setLocalAwards((prev) => prev.filter((award) => award.id !== id));
//     dispatch(deleteAward(id));
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;

//     if (active.id !== over?.id) {
//       const oldIndex = localAwards.findIndex((item) => item.id === active.id);
//       const newIndex = localAwards.findIndex((item) => item.id === over?.id);

//       const newOrder = arrayMove(localAwards, oldIndex, newIndex);
//       setLocalAwards(newOrder);
//       dispatch(reorderAwards({ oldIndex, newIndex }));
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       <SectionTitle label="Awards & Honors" />
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={localAwards.map((award) => award.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             defaultValue={["default-award"]}
//           >
//             {localAwards.map((award) => (
//               <SortableAwardItem
//                 key={award.id}
//                 award={award}
//                 onDelete={deleteAwardHandler}
//                 onChange={handleInputChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       <AddButton label="Add New Award" onClick={addNewAward} />
//     </div>
//   );
// };

// export default AwardsSection;

// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { GripVertical } from "lucide-react";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
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
// import { TextareaField } from "@/components/inputComponents/TextareaField";
// import FloatingLabelSelect from "@/components/SelectFieldComponent";
// import AddButton from "@/components/AddButton";
// import SectionTitle from "@/components/SectionTitle";
// import TrashIconComponent from "@/components/TrashIconComponent";
// import {
//   setAwards,
//   addAward,
//   deleteAward,
//   reorderAwards,
// } from "@/lib/store/slices/resumeSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { months } from "../../../../public/content/generalFieldsData";

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
//   onChange: (
//     id: string,
//     field: keyof Award,
//     value: string | { month: string; year: string }
//   ) => void;
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
//             <TrashIconComponent onDelete={() => onDelete(award.id)} />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <div className="w-full h-auto flex gap-2 max-md:flex-col max-md:gap-3">
//             <div className="w-1/2 max-md:w-full">
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
//             <div className="w-1/2 max-md:w-full">
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
//               onChange={(value) => onChange(award.id, "date", value)}
//             />
//           </div>
//           <div className="relative">
//             <h4 className="font-heading font-semibold text-[14px] text-gray-900">
//               Award Description
//             </h4>
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
//   const dispatch = useAppDispatch();
//   const reduxAwards = useAppSelector((state) => state.resume.awards);
//   const [localAwards, setLocalAwards] = useState<Award[]>([]);

//   // Initialize awards
//   useEffect(() => {
//     if (reduxAwards.length === 0) {
//       const initialAward = {
//         id: "default-award",
//         name: "",
//         issuer: "",
//         date: { month: "", year: "" },
//         description: "",
//       };
//       setLocalAwards([initialAward]);
//       dispatch(setAwards([initialAward]));
//     } else {
//       setLocalAwards(reduxAwards);
//     }
//   }, [reduxAwards, dispatch]);

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
//     const updatedAwards = [...localAwards, newAward];
//     setLocalAwards(updatedAwards);
//     dispatch(addAward(newAward));
//   };

//   const handleInputChange = (
//     id: string,
//     field: keyof Award,
//     value: string | { month: string; year: string }
//   ) => {
//     const updatedAwards = localAwards.map((award) =>
//       award.id === id ? { ...award, [field]: value } : award
//     );
//     setLocalAwards(updatedAwards);
//     dispatch(setAwards(updatedAwards));
//   };

//   const deleteAwardHandler = (id: string) => {
//     const updatedAwards = localAwards.filter((award) => award.id !== id);
//     setLocalAwards(updatedAwards);
//     dispatch(deleteAward(id));
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;

//     if (active.id !== over?.id) {
//       const oldIndex = localAwards.findIndex((item) => item.id === active.id);
//       const newIndex = localAwards.findIndex((item) => item.id === over?.id);

//       const newOrder = arrayMove(localAwards, oldIndex, newIndex);
//       setLocalAwards(newOrder);
//       dispatch(reorderAwards({ oldIndex, newIndex }));
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       <SectionTitle label="Awards & Honors" />
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={localAwards.map((award) => award.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             defaultValue={["default-award"]}
//           >
//             {localAwards.map((award) => (
//               <SortableAwardItem
//                 key={award.id}
//                 award={award}
//                 onDelete={deleteAwardHandler}
//                 onChange={handleInputChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       <AddButton label="Add New Award" onClick={addNewAward} />
//     </div>
//   );
// };

// export default AwardsSection;

// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { debounce } from "lodash";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { GripVertical } from "lucide-react";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
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
// import { TextareaField } from "@/components/inputComponents/TextareaField";
// import FloatingLabelSelect from "@/components/SelectFieldComponent";
// import AddButton from "@/components/AddButton";
// import SectionTitle from "@/components/SectionTitle";
// import TrashIconComponent from "@/components/TrashIconComponent";
// import {
//   setAwards,
//   addAward,
//   deleteAward,
//   reorderAwards,
// } from "@/lib/store/slices/resumeSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { months } from "../../../../public/content/generalFieldsData";

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
//   onChange: (
//     id: string,
//     field: keyof Award,
//     value: string | { month: string; year: string }
//   ) => void;
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
//             <TrashIconComponent onDelete={() => onDelete(award.id)} />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <div className="w-full h-auto flex gap-2 max-md:flex-col max-md:gap-3">
//             <div className="w-1/2 max-md:w-full">
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
//             <div className="w-1/2 max-md:w-full">
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
//               onChange={(value) => onChange(award.id, "date", value)}
//             />
//           </div>
//           <div className="relative">
//             <h4 className="font-heading font-semibold text-[14px] text-gray-900">
//               Award Description
//             </h4>
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
//   const dispatch = useAppDispatch();
//   const reduxAwards = useAppSelector((state) => state.resume.awards);
//   const [localAwards, setLocalAwards] = useState<Award[]>([]);

//   // Create a memoized debounced function for updating Redux
//   const debouncedDispatch = useCallback(
//     debounce((awards: Award[]) => {
//       dispatch(setAwards(awards));
//     }, 1000),
//     [dispatch]
//   );

//   // Initialize awards
//   useEffect(() => {
//     if (reduxAwards.length === 0) {
//       const initialAward = {
//         id: "default-award",
//         name: "",
//         issuer: "",
//         date: { month: "", year: "" },
//         description: "",
//       };
//       setLocalAwards([initialAward]);
//       dispatch(setAwards([initialAward]));
//     } else {
//       setLocalAwards(reduxAwards);
//     }
//   }, [reduxAwards, dispatch]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const addNewAward = useCallback(() => {
//     const newAward: Award = {
//       id: `award-${Date.now()}`,
//       name: "",
//       issuer: "",
//       date: { month: "", year: "" },
//       description: "",
//     };
//     setLocalAwards((prev) => [...prev, newAward]);
//     dispatch(addAward(newAward));
//   }, [dispatch]);

//   const handleInputChange = useCallback(
//     (
//       id: string,
//       field: keyof Award,
//       value: string | { month: string; year: string }
//     ) => {
//       setLocalAwards((prevAwards) => {
//         const updatedAwards = prevAwards.map((award) =>
//           award.id === id ? { ...award, [field]: value } : award
//         );
//         debouncedDispatch(updatedAwards);
//         return updatedAwards;
//       });
//     },
//     [debouncedDispatch]
//   );

//   const deleteAwardHandler = useCallback(
//     (id: string) => {
//       setLocalAwards((prevAwards) => {
//         const updatedAwards = prevAwards.filter((award) => award.id !== id);
//         debouncedDispatch(updatedAwards);
//         return updatedAwards;
//       });
//       dispatch(deleteAward(id));
//     },
//     [dispatch, debouncedDispatch]
//   );

//   const handleDragEnd = useCallback(
//     (event: DragEndEvent) => {
//       const { active, over } = event;

//       if (active.id !== over?.id) {
//         const oldIndex = localAwards.findIndex((item) => item.id === active.id);
//         const newIndex = localAwards.findIndex((item) => item.id === over?.id);

//         setLocalAwards((prevAwards) => {
//           const newOrder = arrayMove(prevAwards, oldIndex, newIndex);
//           debouncedDispatch(newOrder);
//           return newOrder;
//         });
//         dispatch(reorderAwards({ oldIndex, newIndex }));
//       }
//     },
//     [localAwards, dispatch, debouncedDispatch]
//   );

//   // Cleanup debounced function on unmount
//   useEffect(() => {
//     return () => {
//       debouncedDispatch.cancel();
//     };
//   }, [debouncedDispatch]);

//   return (
//     <div className="w-full h-auto">
//       <SectionTitle label="Awards & Honors" />
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={localAwards.map((award) => award.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             defaultValue={["default-award"]}
//           >
//             {localAwards.map((award) => (
//               <SortableAwardItem
//                 key={award.id}
//                 award={award}
//                 onDelete={deleteAwardHandler}
//                 onChange={handleInputChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       <AddButton label="Add New Award" onClick={addNewAward} />
//     </div>
//   );
// };

// export default AwardsSection;

"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { debounce } from "lodash";
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
import { TextareaField } from "@/components/inputComponents/TextareaField";
import FloatingLabelSelect from "@/components/SelectFieldComponent";
import AddButton from "@/components/AddButton";
import SectionTitle from "@/components/SectionTitle";
import TrashIconComponent from "@/components/TrashIconComponent";
import {
  setAwards,
  addAward,
  deleteAward,
  reorderAwards,
} from "@/lib/store/slices/resumeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { months } from "../../../../public/content/generalFieldsData";

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
  onChange: (
    id: string,
    field: keyof Award,
    value: string | { month: string; year: string }
  ) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: award.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
                  {award.name || "New Award"}
                  {award.issuer ? ` from ${award.issuer}` : ""}
                </div>
                <div className="text-sm text-gray-500">
                  {award.date.month && award.date.year
                    ? `Received: ${award.date.month} ${award.date.year}`
                    : "Award Date"}
                </div>
              </div>
            </div>
            <TrashIconComponent onDelete={() => onDelete(award.id)} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 space-y-4">
          <div className="w-full h-auto flex gap-2 max-md:flex-col max-md:gap-3">
            <div className="w-1/2 max-md:w-full">
              <FloatingLabelInput
                label="Award Name"
                inputType="text"
                inputClassName="border-gray-300"
                value={award.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(award.id, "name", e.target.value)
                }
              />
            </div>
            <div className="w-1/2 max-md:w-full">
              <FloatingLabelInput
                label="Issuing Organization"
                inputType="text"
                inputClassName="border-gray-300"
                value={award.issuer}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(award.id, "issuer", e.target.value)
                }
              />
            </div>
          </div>
          <div className="w-full">
            <MonthYearPicker
              labelFirst="Month Received"
              labelSecond="Year Received"
              value={award.date}
              onChange={(value) => onChange(award.id, "date", value)}
            />
          </div>
          <div className="relative">
            <h4 className="font-heading font-semibold text-[14px] text-gray-900">
              Award Description
            </h4>
            <TextareaField
              placeholder="Example: Received for exceptional leadership in developing an innovative project that increased team productivity by 40%. Selected from over 100 nominees across the organization."
              value={award.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChange(award.id, "description", e.target.value)
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
  const reduxAwards = useAppSelector((state) => state.resume.awards);
  const [localAwards, setLocalAwards] = useState<Award[]>([]);

  // const debouncedDispatch = useCallback(
  //   debounce((awards: Award[]) => {
  //     dispatch(setAwards(awards));
  //   }, 1000),
  //   [dispatch]
  // );
  const debouncedDispatch = useMemo(
    () =>
      debounce((awards: Award[]) => {
        dispatch(setAwards(awards));
      }, 1000),
    [dispatch]
  );

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
  }, [reduxAwards, dispatch]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addNewAward = useCallback(() => {
    const newAward: Award = {
      id: `award-${Date.now()}`,
      name: "",
      issuer: "",
      date: { month: "", year: "" },
      description: "",
    };
    setLocalAwards((prev) => [...prev, newAward]);
    dispatch(addAward(newAward));
  }, [dispatch]);

  const handleInputChange = useCallback(
    (
      id: string,
      field: keyof Award,
      value: string | { month: string; year: string }
    ) => {
      setLocalAwards((prevAwards) => {
        const updatedAwards = prevAwards.map((award) =>
          award.id === id ? { ...award, [field]: value } : award
        );
        debouncedDispatch(updatedAwards);
        return updatedAwards;
      });
    },
    [debouncedDispatch]
  );

  const deleteAwardHandler = useCallback(
    (id: string) => {
      setLocalAwards((prevAwards) => {
        const updatedAwards = prevAwards.filter((award) => award.id !== id);
        debouncedDispatch(updatedAwards);
        return updatedAwards;
      });
      dispatch(deleteAward(id));
    },
    [dispatch, debouncedDispatch]
  );

  // Fixed handleDragEnd with proper dependencies
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        setLocalAwards((prevAwards) => {
          const oldIndex = prevAwards.findIndex(
            (item) => item.id === active.id
          );
          const newIndex = prevAwards.findIndex((item) => item.id === over?.id);
          const newOrder = arrayMove(prevAwards, oldIndex, newIndex);

          // Dispatch both actions
          dispatch(reorderAwards({ oldIndex, newIndex }));
          debouncedDispatch(newOrder);

          return newOrder;
        });
      }
    },
    [dispatch, debouncedDispatch] // Added proper dependencies
  );

  useEffect(() => {
    return () => {
      debouncedDispatch.cancel();
    };
  }, [debouncedDispatch]);

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
