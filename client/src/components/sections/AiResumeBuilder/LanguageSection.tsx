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
// import FloatingLabelSelect from "@/components/SelectFieldComponent";
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

// interface Language {
//   id: string;
//   name: string;
//   proficiency: string;
//   isCustom: boolean;
// }
// const languageOptions = [
//   // Popular Indian Languages
//   { value: "english", label: "English" },
//   { value: "hindi", label: "Hindi" },
//   { value: "bengali", label: "Bengali" },
//   { value: "punjabi", label: "Punjabi" },
//   { value: "telugu", label: "Telugu" },
//   { value: "tamil", label: "Tamil" },
//   { value: "marathi", label: "Marathi" },
//   { value: "gujarati", label: "Gujarati" },
//   { value: "urdu", label: "Urdu" },
//   { value: "malayalam", label: "Malayalam" },
//   { value: "kannada", label: "Kannada" },
//   { value: "odia", label: "Odia" },
//   { value: "assamese", label: "Assamese" },
//   { value: "sanskrit", label: "Sanskrit" },

//   // Most Popular Languages in the U.S.
//   { value: "spanish", label: "Spanish" },
//   { value: "chinese", label: "Chinese" }, // includes Mandarin & Cantonese
//   { value: "tagalog", label: "Tagalog" }, // Filipino
//   { value: "vietnamese", label: "Vietnamese" },
//   { value: "french", label: "French" },
//   { value: "arabic", label: "Arabic" },
//   { value: "korean", label: "Korean" },
//   { value: "german", label: "German" },
//   { value: "russian", label: "Russian" },
//   { value: "portuguese", label: "Portuguese" },
//   { value: "italian", label: "Italian" },
//   { value: "japanese", label: "Japanese" },
//   { value: "polish", label: "Polish" },
//   { value: "persian", label: "Persian" }, // Farsi
// ];

// const proficiencyOptions = [
//   { value: "beginner", label: "Beginner" },
//   { value: "intermediate", label: "Intermediate" },
//   { value: "advanced", label: "Advanced" },
//   { value: "native", label: "Native" },
// ];

// const SortableLanguageItem = ({
//   language,
//   onDelete,
//   onChange,
// }: {
//   language: Language;
//   onDelete: (id: string) => void;
//   onChange: (id: string, field: keyof Language, value: string) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: language.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       <AccordionItem
//         value={language.id}
//         className="border rounded overflow-hidden mb-2"
//       >
//         <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 h-[52px] rounded">
//           <div className="flex justify-between items-center w-full">
//             <div className="flex items-center">
//               <GripVertical
//                 className="h-5 w-5 text-gray-400 mr-2 cursor-move"
//                 {...listeners}
//               />
//               <div className="text-left">
//                 <div className="font-semibold font-heading text-gray-500 capitalize">
//                   {language.name || "New Language"}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {language.proficiency}
//                 </div>
//               </div>
//             </div>
//             {/* <Trash2
//               className="h-4 w-4 text-gray-500 cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDelete(language.id);
//               }}
//             /> */}
//             <TrashIconComponent onDelete={() => onDelete(language.id)} />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <div className="w-full h-auto flex gap-2">
//             <div className="w-1/2">
//               {language.isCustom ? (
//                 <FloatingLabelInput
//                   label="Custom Language"
//                   inputType="text"
//                   inputClassName="border-gray-300"
//                   value={language.name}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                     onChange(language.id, "name", e.target.value)
//                   }
//                 />
//               ) : (
//                 <FloatingLabelSelect
//                   label="Language"
//                   options={languageOptions}
//                   value={language.name}
//                   onChange={(value) => {
//                     if (value === "custom") {
//                       onChange(language.id, "isCustom", "true");
//                       onChange(language.id, "name", "");
//                     } else {
//                       onChange(language.id, "name", value);
//                     }
//                   }}
//                 />
//               )}
//             </div>
//             <div className="w-1/2">
//               <FloatingLabelSelect
//                 label="Proficiency"
//                 options={proficiencyOptions}
//                 value={language.proficiency}
//                 onChange={(value) =>
//                   onChange(language.id, "proficiency", value)
//                 }
//               />
//             </div>
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const LanguageSection = () => {
//   const [languages, setLanguages] = useState<Language[]>([
//     {
//       id: "default-language",
//       name: "",
//       proficiency: "",
//       isCustom: false,
//     },
//   ]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const addNewLanguage = () => {
//     const newLanguage: Language = {
//       id: `language-${Date.now()}`,
//       name: "",
//       proficiency: "",
//       isCustom: false,
//     };
//     setLanguages([...languages, newLanguage]);
//   };

//   const handleInputChange = (
//     id: string,
//     field: keyof Language,
//     value: string
//   ) => {
//     setLanguages(
//       languages.map((lang) =>
//         lang.id === id ? { ...lang, [field]: value } : lang
//       )
//     );
//   };

//   const deleteLanguage = (id: string) => {
//     setLanguages(languages.filter((lang) => lang.id !== id));
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setLanguages((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       {/* <h3 className="font-heading font-semibold text-[16px] text-black pb-[2px]">
//         Languages
//       </h3> */}
//       <SectionTitle label="Languages" />
//       {/* <p className="font-body font-normal text-[15px] text-gray-500 mb-4">
//         Add languages you speak and your proficiency level. This helps employers
//         understand your linguistic abilities and communication skills.
//       </p> */}
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={languages.map((lang) => lang.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             defaultValue={["default-language"]}
//           >
//             {languages.map((language) => (
//               <SortableLanguageItem
//                 key={language.id}
//                 language={language}
//                 onDelete={deleteLanguage}
//                 onChange={handleInputChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       {/* <Button
//         onClick={addNewLanguage}
//         variant="outline"
//         className="mt-4 flex items-center text-primary hover:text-primary-dark"
//       >
//         <PlusCircle className="mr-2" />
//         Add New Language
//       </Button> */}
//       <AddButton label="Add New Language" onClick={addNewLanguage} />
//     </div>
//   );
// };

// export default LanguageSection;
// // LanguageSection.tsx
// "use client";
// import React, { useState, useCallback } from "react";
// import { useDispatch } from "react-redux";
// import debounce from "lodash/debounce";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { GripVertical } from "lucide-react";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
// import FloatingLabelSelect from "@/components/SelectFieldComponent";
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
// // import {
// //   addLanguage,
// //   updateLanguage,
// //   deleteLanguage,
// //   reorderLanguages,
// // } from "../../";
// // addLanguage
// // import { RootState } from "../store"; // Adjust the import path according to your store location
// import {
//   addLanguage,
//   updateLanguage,
//   deleteLanguage,
//   reorderLanguages,
// } from "@/lib/store/slices/resumeSlice";
// import { useAppSelector } from "@/lib/store/hooks";

// interface Language {
//   id: string;
//   name: string;
//   proficiency: string;
//   isCustom: boolean;
// }

// const languageOptions = [
//   // Popular Indian Languages
//   { value: "english", label: "English" },
//   { value: "hindi", label: "Hindi" },
//   { value: "bengali", label: "Bengali" },
//   { value: "punjabi", label: "Punjabi" },
//   { value: "telugu", label: "Telugu" },
//   { value: "tamil", label: "Tamil" },
//   { value: "marathi", label: "Marathi" },
//   { value: "gujarati", label: "Gujarati" },
//   { value: "urdu", label: "Urdu" },
//   { value: "malayalam", label: "Malayalam" },
//   { value: "kannada", label: "Kannada" },
//   { value: "odia", label: "Odia" },
//   { value: "assamese", label: "Assamese" },
//   { value: "sanskrit", label: "Sanskrit" },

//   // Most Popular Languages in the U.S.
//   { value: "spanish", label: "Spanish" },
//   { value: "chinese", label: "Chinese" }, // includes Mandarin & Cantonese
//   { value: "tagalog", label: "Tagalog" }, // Filipino
//   { value: "vietnamese", label: "Vietnamese" },
//   { value: "french", label: "French" },
//   { value: "arabic", label: "Arabic" },
//   { value: "korean", label: "Korean" },
//   { value: "german", label: "German" },
//   { value: "russian", label: "Russian" },
//   { value: "portuguese", label: "Portuguese" },
//   { value: "italian", label: "Italian" },
//   { value: "japanese", label: "Japanese" },
//   { value: "polish", label: "Polish" },
//   { value: "persian", label: "Persian" }, // Farsi
// ];

// const proficiencyOptions = [
//   { value: "beginner", label: "Beginner" },
//   { value: "intermediate", label: "Intermediate" },
//   { value: "advanced", label: "Advanced" },
//   { value: "native", label: "Native" },
// ];

// const SortableLanguageItem = ({
//   language,
//   onDelete,
//   onChange,
// }: {
//   language: Language;
//   onDelete: (id: string) => void;
//   onChange: (id: string, field: keyof Language, value: string) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: language.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   // Local state for immediate UI updates
//   const [localLanguage, setLocalLanguage] = useState(language);

//   // Debounced function to update Redux
//   const debouncedOnChange = useCallback(
//     debounce((id: string, field: keyof Language, value: string) => {
//       onChange(id, field, value);
//     }, 1000),
//     []
//   );

//   // Handle local state change and debounced Redux update
//   const handleChange = (field: keyof Language, value: string) => {
//     setLocalLanguage((prev) => ({ ...prev, [field]: value }));
//     debouncedOnChange(language.id, field, value);
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       <AccordionItem
//         value={language.id}
//         className="border rounded overflow-hidden mb-2"
//       >
//         <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 h-[52px] rounded">
//           <div className="flex justify-between items-center w-full">
//             <div className="flex items-center">
//               <GripVertical
//                 className="h-5 w-5 text-gray-400 mr-2 cursor-move"
//                 {...listeners}
//               />
//               <div className="text-left">
//                 <div className="font-semibold font-heading text-gray-500 capitalize">
//                   {localLanguage.name || "New Language"}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {localLanguage.proficiency}
//                 </div>
//               </div>
//             </div>
//             <TrashIconComponent onDelete={() => onDelete(language.id)} />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <div className="w-full h-auto flex gap-2">
//             <div className="w-1/2">
//               {localLanguage.isCustom ? (
//                 <FloatingLabelInput
//                   label="Custom Language"
//                   inputType="text"
//                   inputClassName="border-gray-300"
//                   value={localLanguage.name}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                     handleChange("name", e.target.value)
//                   }
//                 />
//               ) : (
//                 <FloatingLabelSelect
//                   label="Language"
//                   options={languageOptions}
//                   value={localLanguage.name}
//                   onChange={(value) => {
//                     if (value === "custom") {
//                       handleChange("isCustom", "true");
//                       handleChange("name", "");
//                     } else {
//                       handleChange("name", value);
//                     }
//                   }}
//                 />
//               )}
//             </div>
//             <div className="w-1/2">
//               <FloatingLabelSelect
//                 label="Proficiency"
//                 options={proficiencyOptions}
//                 value={localLanguage.proficiency}
//                 onChange={(value) => handleChange("proficiency", value)}
//               />
//             </div>
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const LanguageSection = () => {
//   const dispatch = useDispatch();
//   const languages = useAppSelector((state) => state.resume.languages);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const addNewLanguage = () => {
//     const newLanguage: Language = {
//       id: `language-${Date.now()}`,
//       name: "",
//       proficiency: "",
//       isCustom: false,
//     };
//     dispatch(addLanguage(newLanguage));
//   };

//   const handleInputChange = (
//     id: string,
//     field: keyof Language,
//     value: string
//   ) => {
//     dispatch(updateLanguage({ id, field, value }));
//   };

//   const handleDelete = (id: string) => {
//     dispatch(deleteLanguage(id));
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       const oldIndex = languages.findIndex((item) => item.id === active.id);
//       const newIndex = languages.findIndex((item) => item.id === over.id);

//       dispatch(reorderLanguages({ oldIndex, newIndex }));
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       <SectionTitle label="Languages" />
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={languages.map((lang) => lang.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             defaultValue={["default-language"]}
//           >
//             {languages.map((language) => (
//               <SortableLanguageItem
//                 key={language.id}
//                 language={language}
//                 onDelete={handleDelete}
//                 onChange={handleInputChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       <AddButton label="Add New Language" onClick={addNewLanguage} />
//     </div>
//   );
// };

// export default LanguageSection;
// LanguageSection.tsx
"use client";
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash/debounce";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GripVertical } from "lucide-react";
import FloatingLabelInput from "@/components/inputComponents/TextInputField";
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
  addLanguage,
  updateLanguage,
  deleteLanguage,
  reorderLanguages,
} from "@/lib/store/slices/resumeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

interface Language {
  id: string;
  name: string;
  proficiency: string;
  isCustom: boolean;
}

interface LanguageOption {
  value: string;
  label: string;
}

interface SortableLanguageItemProps {
  language: Language;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof Language, value: string) => void;
}

const languageOptions: LanguageOption[] = [
  // Popular Indian Languages
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "bengali", label: "Bengali" },
  { value: "punjabi", label: "Punjabi" },
  { value: "telugu", label: "Telugu" },
  { value: "tamil", label: "Tamil" },
  { value: "marathi", label: "Marathi" },
  { value: "gujarati", label: "Gujarati" },
  { value: "urdu", label: "Urdu" },
  { value: "malayalam", label: "Malayalam" },
  { value: "kannada", label: "Kannada" },
  { value: "odia", label: "Odia" },
  { value: "assamese", label: "Assamese" },
  { value: "sanskrit", label: "Sanskrit" },

  // Most Popular Languages in the U.S.
  { value: "spanish", label: "Spanish" },
  { value: "chinese", label: "Chinese" }, // includes Mandarin & Cantonese
  { value: "tagalog", label: "Tagalog" }, // Filipino
  { value: "vietnamese", label: "Vietnamese" },
  { value: "french", label: "French" },
  { value: "arabic", label: "Arabic" },
  { value: "korean", label: "Korean" },
  { value: "german", label: "German" },
  { value: "russian", label: "Russian" },
  { value: "portuguese", label: "Portuguese" },
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "polish", label: "Polish" },
  { value: "persian", label: "Persian" }, // Farsi
];

const proficiencyOptions: LanguageOption[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "native", label: "Native" },
];
const SortableLanguageItem: React.FC<SortableLanguageItemProps> = ({
  language,
  onDelete,
  onChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: language.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [localLanguage, setLocalLanguage] = useState<Language>(language);

  // Inline function for useCallback to fix the dependency warning
  const debouncedOnChange = useCallback(
    (id: string, field: keyof Language, value: string) => {
      const debouncedUpdate = debounce(
        (id: string, field: keyof Language, value: string) => {
          onChange(id, field, value);
        },
        1000
      );
      debouncedUpdate(id, field, value);
    },
    [onChange]
  );

  const handleChange = (field: keyof Language, value: string) => {
    setLocalLanguage((prev) => ({ ...prev, [field]: value }));
    debouncedOnChange(language.id, field, value);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <AccordionItem
        value={language.id}
        className="border rounded overflow-hidden mb-2"
      >
        <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 h-[52px] rounded">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <GripVertical
                className="h-5 w-5 text-gray-400 mr-2 cursor-move"
                {...listeners}
              />
              <div className="text-left">
                <div className="font-semibold font-heading text-gray-500 capitalize">
                  {localLanguage.name || "New Language"}
                </div>
                <div className="text-sm text-gray-500">
                  {localLanguage.proficiency}
                </div>
              </div>
            </div>
            <TrashIconComponent onDelete={() => onDelete(language.id)} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 space-y-4">
          <div className="w-full h-auto flex gap-2">
            <div className="w-1/2">
              {localLanguage.isCustom ? (
                <FloatingLabelInput
                  label="Custom Language"
                  inputType="text"
                  inputClassName="border-gray-300"
                  value={localLanguage.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("name", e.target.value)
                  }
                />
              ) : (
                <FloatingLabelSelect
                  label="Language"
                  options={languageOptions}
                  value={localLanguage.name}
                  onChange={(value) => {
                    if (value === "custom") {
                      handleChange("isCustom", "true");
                      handleChange("name", "");
                    } else {
                      handleChange("name", value);
                    }
                  }}
                />
              )}
            </div>
            <div className="w-1/2">
              <FloatingLabelSelect
                label="Proficiency"
                options={proficiencyOptions}
                value={localLanguage.proficiency}
                onChange={(value) => handleChange("proficiency", value)}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

const LanguageSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector((state) => state.resume.languages);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addNewLanguage = () => {
    const newLanguage: Language = {
      id: `language-${Date.now()}`,
      name: "",
      proficiency: "",
      isCustom: false,
    };
    dispatch(addLanguage(newLanguage));
  };

  const handleInputChange = (
    id: string,
    field: keyof Language,
    value: string
  ) => {
    dispatch(updateLanguage({ id, field, value }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteLanguage(id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = languages.findIndex((item) => item.id === active.id);
      const newIndex = languages.findIndex((item) => item.id === over?.id);

      dispatch(reorderLanguages({ oldIndex, newIndex }));
    }
  };

  return (
    <div className="w-full h-auto">
      <SectionTitle label="Languages" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={languages.map((lang) => lang.id)}
          strategy={verticalListSortingStrategy}
        >
          <Accordion
            type="multiple"
            className="w-full space-y-2"
            defaultValue={["default-language"]}
          >
            {languages.map((language) => (
              <SortableLanguageItem
                key={language.id}
                language={language}
                onDelete={handleDelete}
                onChange={handleInputChange}
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>
      <AddButton label="Add New Language" onClick={addNewLanguage} />
    </div>
  );
};

export default LanguageSection;
