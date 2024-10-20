"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusCircle, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingLabelInput from "@/components/inputComponents/TextInputField";
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

interface Language {
  id: string;
  name: string;
  proficiency: string;
  isCustom: boolean;
}
const languageOptions = [
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

const proficiencyOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "native", label: "Native" },
];

const SortableLanguageItem = ({
  language,
  onDelete,
  onChange,
}: {
  language: Language;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof Language, value: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: language.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
                  {language.name || "New Language"}
                </div>
                <div className="text-sm text-gray-500">
                  {language.proficiency}
                </div>
              </div>
            </div>
            {/* <Trash2
              className="h-4 w-4 text-gray-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(language.id);
              }}
            /> */}
            <TrashIconComponent onDelete={() => onDelete(language.id)} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 space-y-4">
          <div className="w-full h-auto flex gap-2">
            <div className="w-1/2">
              {language.isCustom ? (
                <FloatingLabelInput
                  label="Custom Language"
                  inputType="text"
                  inputClassName="border-gray-300"
                  value={language.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(language.id, "name", e.target.value)
                  }
                />
              ) : (
                <FloatingLabelSelect
                  label="Language"
                  options={languageOptions}
                  value={language.name}
                  onChange={(value) => {
                    if (value === "custom") {
                      onChange(language.id, "isCustom", "true");
                      onChange(language.id, "name", "");
                    } else {
                      onChange(language.id, "name", value);
                    }
                  }}
                />
              )}
            </div>
            <div className="w-1/2">
              <FloatingLabelSelect
                label="Proficiency"
                options={proficiencyOptions}
                value={language.proficiency}
                onChange={(value) =>
                  onChange(language.id, "proficiency", value)
                }
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

const LanguageSection = () => {
  const [languages, setLanguages] = useState<Language[]>([
    {
      id: "default-language",
      name: "",
      proficiency: "",
      isCustom: false,
    },
  ]);

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
    setLanguages([...languages, newLanguage]);
  };

  const handleInputChange = (
    id: string,
    field: keyof Language,
    value: string
  ) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  const deleteLanguage = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setLanguages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="w-full h-auto">
      {/* <h3 className="font-heading font-semibold text-[16px] text-black pb-[2px]">
        Languages
      </h3> */}
      <SectionTitle label="Languages" />
      {/* <p className="font-body font-normal text-[15px] text-gray-500 mb-4">
        Add languages you speak and your proficiency level. This helps employers
        understand your linguistic abilities and communication skills.
      </p> */}
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
                onDelete={deleteLanguage}
                onChange={handleInputChange}
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>
      {/* <Button
        onClick={addNewLanguage}
        variant="outline"
        className="mt-4 flex items-center text-primary hover:text-primary-dark"
      >
        <PlusCircle className="mr-2" />
        Add New Language
      </Button> */}
      <AddButton label="Add New Language" onClick={addNewLanguage} />
    </div>
  );
};

export default LanguageSection;
