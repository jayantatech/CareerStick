// "use client";
// import React, { useState } from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { PlusCircle, Trash2, GripVertical, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
// import { TextareaField } from "@/components/inputComponents/TextareaField";
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

// interface CustomSectionItem {
//   id: string;
//   text: string;
//   type: "text" | "bullet";
// }

// interface CustomSection {
//   id: string;
//   title: string;
//   subtitle: string;
//   items: CustomSectionItem[];
//   description: string;
// }

// const SortableCustomSectionItem = ({
//   section,
//   onDelete,
//   onChange,
// }: {
//   section: CustomSection;
//   onDelete: (id: string) => void;
//   onChange: (
//     id: string,
//     field: keyof CustomSection | "items",
//     value: any
//   ) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: section.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const addNewItem = () => {
//     const newItem: CustomSectionItem = {
//       id: `item-${Date.now()}`,
//       text: "",
//       type: "bullet",
//     };
//     onChange(section.id, "items", [...section.items, newItem]);
//   };

//   const updateItem = (itemId: string, text: string) => {
//     const updatedItems = section.items.map((item) =>
//       item.id === itemId ? { ...item, text } : item
//     );
//     onChange(section.id, "items", updatedItems);
//   };

//   const deleteItem = (itemId: string) => {
//     const updatedItems = section.items.filter((item) => item.id !== itemId);
//     onChange(section.id, "items", updatedItems);
//   };

//   const toggleItemType = (itemId: string) => {
//     const updatedItems = section.items.map((item) =>
//       item.id === itemId
//         ? { ...item, type: item.type === "text" ? "bullet" : "text" }
//         : item
//     );
//     onChange(section.id, "items", updatedItems);
//   };

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
//                   {section.title || "New Custom Section"}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {section.subtitle || "Add subtitle"}
//                 </div>
//               </div>
//             </div>
//             <Trash2
//               className="h-4 w-4 text-gray-500 cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDelete(section.id);
//               }}
//             />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <div className="w-full h-auto flex gap-2">
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Section Title"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={section.title}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   onChange(section.id, "title", e.target.value)
//                 }
//               />
//             </div>
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Subtitle (Optional)"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={section.subtitle}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   onChange(section.id, "subtitle", e.target.value)
//                 }
//               />
//             </div>
//           </div>

//           <div className="relative">
//             <h4 className="font-heading font-semibold text-[14px] text-gray-900">
//               Section Description
//             </h4>
//             <p className="font-body font-normal text-[15px] text-gray-500 pb-2">
//               Add a brief description or introduction for this section.
//             </p>
//             <TextareaField
//               placeholder="Enter a description for this section..."
//               value={section.description}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                 onChange(section.id, "description", e.target.value)
//               }
//             />
//           </div>

//           <div className="space-y-2">
//             <div className="flex justify-between items-center">
//               <h4 className="font-heading font-semibold text-[14px] text-gray-900">
//                 Section Content
//               </h4>
//             </div>
//             {section.items.map((item) => (
//               <div key={item.id} className="flex gap-2 items-start">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => toggleItemType(item.id)}
//                   className="mt-2 px-2"
//                 >
//                   {item.type === "bullet" ? "•" : "¶"}
//                 </Button>
//                 <div className="flex-grow">
//                   <TextareaField
//                     placeholder={
//                       item.type === "bullet"
//                         ? "Enter bullet point..."
//                         : "Enter paragraph text..."
//                     }
//                     value={item.text}
//                     onChange={(e) => updateItem(item.id, e.target.value)}
//                   />
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => deleteItem(item.id)}
//                   className="mt-2"
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             ))}
//             <Button
//               onClick={addNewItem}
//               variant="outline"
//               className="mt-2 flex items-center text-primary hover:text-primary-dark"
//             >
//               <PlusCircle className="mr-2" />
//               Add Content Item
//             </Button>
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const CustomSections = () => {
//   const [sections, setSections] = useState<CustomSection[]>([
//     {
//       id: "default-section",
//       title: "",
//       subtitle: "",
//       items: [
//         {
//           id: "default-item",
//           text: "",
//           type: "bullet",
//         },
//       ],
//       description: "",
//     },
//   ]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const addNewSection = () => {
//     const newSection: CustomSection = {
//       id: `section-${Date.now()}`,
//       title: "",
//       subtitle: "",
//       items: [
//         {
//           id: `item-${Date.now()}`,
//           text: "",
//           type: "bullet",
//         },
//       ],
//       description: "",
//     };
//     setSections([...sections, newSection]);
//   };

//   const handleDelete = (id: string) => {
//     setSections(sections.filter((section) => section.id !== id));
//   };

//   const handleChange = (
//     id: string,
//     field: keyof CustomSection | "items",
//     value: any
//   ) => {
//     setSections(
//       sections.map((section) =>
//         section.id === id ? { ...section, [field]: value } : section
//       )
//     );
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setSections((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       <h3 className="font-heading font-semibold text-[16px] text-black pb-[2px]">
//         Custom Sections
//       </h3>
//       <p className="font-body font-normal text-[15px] text-gray-500 mb-4">
//         Add your own custom sections to highlight additional information,
//         skills, or achievements that don't fit into the standard categories.
//       </p>
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={sections.map((section) => section.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             defaultValue={["default-section"]}
//           >
//             {sections.map((section) => (
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
//       <Button
//         onClick={addNewSection}
//         variant="outline"
//         className="mt-4 flex items-center text-primary hover:text-primary-dark"
//       >
//         <PlusCircle className="mr-2" />
//         Add New Section
//       </Button>
//     </div>
//   );
// };

// export default CustomSections;
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
// import { TextareaField } from "@/components/inputComponents/TextareaField";
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
// import AddButton from "@/components/AddButton";
// import SectionTitle from "@/components/SectionTitle";
// import TrashIconComponent from "@/components/TrashIconComponent";

// interface CustomSection {
//   id: string;
//   title: string;
//   subtitle: string;
//   description: string;
// }

// const SortableCustomSectionItem = ({
//   section,
//   onDelete,
//   onChange,
// }: {
//   section: CustomSection;
//   onDelete: (id: string) => void;
//   onChange: (id: string, field: keyof CustomSection, value: any) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: section.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

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
//                   {section.title || "New Custom Section"}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {section.subtitle || "Add subtitle"}
//                 </div>
//               </div>
//             </div>
//             {/* <Trash2
//               className="h-4 w-4 text-gray-500 cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDelete(section.id);
//               }}
//             /> */}
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
//                 value={section.title}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   onChange(section.id, "title", e.target.value)
//                 }
//               />
//             </div>
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Subtitle (Optional)"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={section.subtitle}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   onChange(section.id, "subtitle", e.target.value)
//                 }
//               />
//             </div>
//           </div>

//           <div className="relative">
//             <h4 className="font-heading font-semibold text-[14px] text-gray-900">
//               Section Description
//             </h4>
//             {/* <p className="font-body font-normal text-[15px] text-gray-500 pb-2">
//               Add a brief description or introduction for this section.
//             </p> */}
//             <TextareaField
//               placeholder="Enter a description for this section..."
//               value={section.description}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                 onChange(section.id, "description", e.target.value)
//               }
//             />
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const CustomSections = () => {
//   const [sections, setSections] = useState<CustomSection[]>([
//     {
//       id: "default-section",
//       title: "",
//       subtitle: "",
//       description: "",
//     },
//   ]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const addNewSection = () => {
//     const newSection: CustomSection = {
//       id: `section-${Date.now()}`,
//       title: "",
//       subtitle: "",
//       description: "",
//     };
//     setSections([...sections, newSection]);
//   };

//   const handleDelete = (id: string) => {
//     setSections(sections.filter((section) => section.id !== id));
//   };

//   const handleChange = (id: string, field: keyof CustomSection, value: any) => {
//     setSections(
//       sections.map((section) =>
//         section.id === id ? { ...section, [field]: value } : section
//       )
//     );
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setSections((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       {/* <h3 className="font-heading font-semibold text-[16px] text-black pb-[2px]">
//         Custom Sections
//       </h3> */}
//       <SectionTitle label="Custom Sections" />
//       {/* <p className="font-body font-normal text-[15px] text-gray-500 mb-4">
//         Add your own custom sections to highlight additional information,
//         skills, or achievements that don't fit into the standard categories.
//       </p> */}
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={sections.map((section) => section.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             defaultValue={["default-section"]}
//           >
//             {sections.map((section) => (
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
//       {/* <Button
//         onClick={addNewSection}
//         variant="outline"
//         className="mt-4 flex items-center text-primary hover:text-primary-dark"
//       >
//         <PlusCircle className="mr-2" />
//         Add New Section
//       </Button> */}
//       <AddButton label="Add New Section" onClick={addNewSection} />
//     </div>
//   );
// };

// export default CustomSections;

// "use client";
// import React, { useState, useEffect, useCallback } from "react";
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
// import AddButton from "@/components/AddButton";
// import SectionTitle from "@/components/SectionTitle";
// import TrashIconComponent from "@/components/TrashIconComponent";
// import {
//   setCustomSections,
//   updateCustomSection,
//   addCustomSection,
//   deleteCustomSection,
//   reorderCustomSections,
// } from "@/lib/store/slices/resumeSlice"; // Adjust the import path

// interface CustomSection {
//   id: string;
//   title: string;
//   subtitle: string;
//   description: string;
// }

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

//   // Update local state immediately and trigger debounced onChange
//   const handleChange = (field: keyof CustomSection, value: string) => {
//     setLocalSection((prev) => ({ ...prev, [field]: value }));
//     onChange(section.id, field, value);
//   };

//   // Update local state when props change
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
//                   {localSection.subtitle || "Add subtitle"}
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

//   // Debounced function to update Redux
//   const debouncedUpdateRedux = useCallback(
//     debounce((sections: CustomSection[]) => {
//       dispatch(setCustomSections(sections));
//     }, 1000),
//     []
//   );

//   // Update local state when Redux state changes
//   useEffect(() => {
//     setLocalSections(reduxSections);
//   }, [reduxSections]);

//   const addNewSection = () => {
//     const newSection: CustomSection = {
//       id: `section-${Date.now()}`,
//       title: "",
//       subtitle: "",
//       description: "",
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
//     value: string
//   ) => {
//     const updatedSections = localSections.map((section) =>
//       section.id === id ? { ...section, [field]: value } : section
//     );
//     setLocalSections(updatedSections);
//     debouncedUpdateRedux(updatedSections);
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       const oldIndex = localSections.findIndex((item) => item.id === active.id);
//       const newIndex = localSections.findIndex((item) => item.id === over.id);

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
import React, { useState, useEffect, useCallback } from "react";
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
  updateCustomSection,
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
  onChange: (id: string, field: keyof CustomSection, value: any) => void;
}) => {
  const [localSection, setLocalSection] = useState(section);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (field: keyof CustomSection, value: any) => {
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
    debounce((sections: CustomSection[]) => {
      dispatch(setCustomSections(sections));
    }, 1000),
    []
  );

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

  const handleChange = (id: string, field: keyof CustomSection, value: any) => {
    const updatedSections = localSections.map((section) =>
      section.id === id ? { ...section, [field]: value } : section
    );
    setLocalSections(updatedSections);
    debouncedUpdateRedux(updatedSections);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = localSections.findIndex((item) => item.id === active.id);
      const newIndex = localSections.findIndex((item) => item.id === over.id);

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
