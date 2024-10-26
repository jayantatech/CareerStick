// "use client";
// import React, { useState, useCallback, useEffect } from "react";
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
// import SubSectionTitle from "@/components/SubSectionTitle";
// import TrashIconComponent from "@/components/TrashIconComponent";

// // import { useDispatch, useSelector } from "react-redux";
// import debounce from "lodash/debounce";
// // import {
// // setOpenSourceContributions,
// // updateOpenSourceContribution,
// // addOpenSourceContribution,
// // deleteOpenSourceContribution,
// // reorderOpenSourceContributions,
// // } from "@";

// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import {
//   setOpenSourceContributions,
//   updateOpenSourceContribution,
//   addOpenSourceContribution,
//   deleteOpenSourceContribution,
//   reorderOpenSourceContributions,
// } from "@/lib/store/slices/resumeSlice";

// interface OpenSourceContribution {
//   id: string;
//   projectName: string;
//   role: string;
//   technologies: string[];
//   description: string;
//   contributions: string;
//   links: { platform: string; url: string }[];
//   startDate: { month: string; year: string };
//   endDate: { month: string; year: string };
//   isOngoing: boolean;
// }

// interface Skill {
//   id: string;
//   name: string;
// }

// const predefinedSkills: Skill[] = [
//   { id: "skill-1", name: "Git" },
//   { id: "skill-2", name: "GitHub" },
//   { id: "skill-3", name: "JavaScript" },
//   { id: "skill-4", name: "Python" },
//   { id: "skill-5", name: "Java" },
//   { id: "skill-6", name: "C++" },
//   { id: "skill-7", name: "Ruby" },
//   { id: "skill-8", name: "Documentation" },
//   { id: "skill-9", name: "Testing" },
//   { id: "skill-10", name: "Code Review" },
// ];

// const platformOptions = [
//   { value: "github", label: "GitHub" },
//   { value: "gitlab", label: "GitLab" },
//   { value: "bitbucket", label: "Bitbucket" },
//   { value: "website", label: "Project Website" },
//   { value: "other", label: "Other" },
// ];

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

//   return (
//     <div className="relative w-full flex items-center justify-center">
//       <div className="flex gap-2 w-full items-center justify-center">
//         <div className="w-1/2">
//           <FloatingLabelSelect
//             label={labelFirst}
//             options={months}
//             value={value.month}
//             onChange={(newMonth) => onChange({ ...value, month: newMonth })}
//             disabled={disabled}
//           />
//         </div>
//         <div className="w-1/2">
//           <FloatingLabelSelect
//             label={labelSecond}
//             options={years}
//             value={value.year}
//             onChange={(newYear) => onChange({ ...value, year: newYear })}
//             disabled={disabled}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const SortableOpenSourceItem = ({
//   contribution,
//   onDelete,
//   onChange,
// }: {
//   contribution: OpenSourceContribution;
//   onDelete: (id: string) => void;
//   onChange: (
//     id: string,
//     field: keyof OpenSourceContribution,
//     value: any
//   ) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: contribution.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const [customSkill, setCustomSkill] = useState("");

//   const handleSkillSelect = (skill: Skill) => {
//     if (!contribution.technologies.includes(skill.name)) {
//       onChange(contribution.id, "technologies", [
//         ...contribution.technologies,
//         skill.name,
//       ]);
//     }
//   };

//   const handleSkillRemove = (skillName: string) => {
//     onChange(
//       contribution.id,
//       "technologies",
//       contribution.technologies.filter((tech) => tech !== skillName)
//     );
//   };

//   const handleCustomSkillAdd = () => {
//     if (
//       customSkill.trim() !== "" &&
//       !contribution.technologies.includes(customSkill.trim())
//     ) {
//       onChange(contribution.id, "technologies", [
//         ...contribution.technologies,
//         customSkill.trim(),
//       ]);
//       setCustomSkill("");
//     }
//   };

//   const handleLinkChange = (
//     index: number,
//     field: "platform" | "url",
//     value: string
//   ) => {
//     const newLinks = [...contribution.links];
//     newLinks[index] = { ...newLinks[index], [field]: value };
//     onChange(contribution.id, "links", newLinks);
//   };

//   const addNewLink = () => {
//     onChange(contribution.id, "links", [
//       ...contribution.links,
//       { platform: "", url: "" },
//     ]);
//   };

//   const removeLink = (index: number) => {
//     const newLinks = contribution.links.filter((_, i) => i !== index);
//     onChange(contribution.id, "links", newLinks);
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       <AccordionItem
//         value={contribution.id}
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
//                   {contribution.projectName || "New Open Source Project"}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {contribution.technologies.join(", ") || "Technologies Used"}
//                 </div>
//               </div>
//             </div>
//             {/* <Trash2
//               className="h-4 w-4 text-gray-500 cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDelete(contribution.id);
//               }}
//             /> */}
//             <TrashIconComponent onDelete={() => onDelete(contribution.id)} />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <FloatingLabelInput
//             label="Project Name"
//             inputType="text"
//             inputClassName="border-gray-300"
//             value={contribution.projectName}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               onChange(contribution.id, "projectName", e.target.value)
//             }
//           />
//           <FloatingLabelInput
//             label="Your Role"
//             inputType="text"
//             inputClassName="border-gray-300"
//             value={contribution.role}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               onChange(contribution.id, "role", e.target.value)
//             }
//           />
//           <div>
//             <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//               Technologies & Skills Used
//             </h4>
//             <div className="flex flex-wrap gap-2 py-2">
//               {predefinedSkills.map((skill) => (
//                 <Button
//                   key={skill.id}
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleSkillSelect(skill)}
//                   className={`w-auto px-2 h-[30px] rounded text-gray-500 font-heading hover:scale-[.98] transition-all duration-150 font-semibold text-[15px] ${
//                     contribution.technologies.includes(skill.name)
//                       ? "border-primary text-primary"
//                       : ""
//                   }`}
//                 >
//                   {skill.name}
//                 </Button>
//               ))}
//             </div>
//             <div className="flex gap-2 mb-2 mt-2">
//               <div className="flex-grow">
//                 <FloatingLabelInput
//                   label="Add Custom Technology/Skill"
//                   value={customSkill}
//                   onChange={(e) => setCustomSkill(e.target.value)}
//                 />
//               </div>
//               <Button
//                 onClick={handleCustomSkillAdd}
//                 className="w-[140px] h-[40px] rounded text-white font-heading hover:scale-[.98] transition-all duration-150 text-[15px]"
//               >
//                 Add
//               </Button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {contribution.technologies.map((tech) => (
//                 <div
//                   key={tech}
//                   className="flex items-center bg-white border rounded p-2"
//                 >
//                   <span className="text-gray-600 font-semibold font-body text-[15px] mr-2">
//                     {tech}
//                   </span>
//                   <X
//                     className="h-4 w-4 text-gray-500 cursor-pointer"
//                     onClick={() => handleSkillRemove(tech)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="flex space-x-4 w-full h-[48px]">
//             <MonthYearPicker
//               labelFirst="Start Month"
//               labelSecond="Start Year"
//               value={contribution.startDate}
//               onChange={(value) =>
//                 onChange(contribution.id, "startDate", value)
//               }
//             />
//             <MonthYearPicker
//               labelFirst="End Month"
//               labelSecond="End Year"
//               value={contribution.endDate}
//               onChange={(value) => onChange(contribution.id, "endDate", value)}
//               disabled={contribution.isOngoing}
//             />
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={contribution.isOngoing}
//               onChange={(e) =>
//                 onChange(contribution.id, "isOngoing", e.target.checked)
//               }
//               className="mr-2"
//             />
//             <label>I am currently contributing to this project</label>
//           </div>
//           <div>
//             {/* <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//               Project Description
//             </h4> */}
//             <SubSectionTitle label="Project Description" />
//             <TextareaField
//               placeholder="Describe the open source project, its goals, and its impact..."
//               value={contribution.description}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                 onChange(contribution.id, "description", e.target.value)
//               }
//             />
//           </div>
//           <div>
//             {/* <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//               Your Contributions
//             </h4> */}
//             <SubSectionTitle label="Your Contributions" />

//             <TextareaField
//               placeholder="Detail your specific contributions, PRs, issues resolved, and impact on the project..."
//               value={contribution.contributions}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                 onChange(contribution.id, "contributions", e.target.value)
//               }
//             />
//           </div>
//           <div>
//             {/* <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//               Project Links
//             </h4> */}
//             <SubSectionTitle
//               label="Project Links"
//               className={` ${contribution.links.length > 0 ? "mb-[12px]" : ""}`}
//             />
//             {contribution.links.map((link, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <div className="w-1/2">
//                   <FloatingLabelSelect
//                     label="Platform"
//                     options={platformOptions}
//                     value={link.platform}
//                     onChange={(value) =>
//                       handleLinkChange(index, "platform", value)
//                     }
//                   />
//                 </div>
//                 <div className="w-1/2">
//                   <FloatingLabelInput
//                     label="URL"
//                     inputType="text"
//                     inputClassName="border-gray-300 w-full"
//                     value={link.url}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                       handleLinkChange(index, "url", e.target.value)
//                     }
//                   />
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => removeLink(index)}
//                   className="h-[40px] w-[40px]"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             ))}
//             {/* <Button
//               onClick={addNewLink}
//               variant="outline"
//               className="mt-2 flex items-center text-primary hover:text-primary-dark"
//             >
//               <PlusCircle className="mr-2" />
//               Add New Link
//             </Button> */}
//             <AddButton
//               label="Add New Link"
//               onClick={addNewLink}
//               className="mt-2"
//             />
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const OpenSourceSection = () => {
//   const dispatch = useAppDispatch();
//   const reduxContributions = useAppSelector(
//     (state) => state.resume.openSourceContributions
//   );
//   const [localContributions, setLocalContributions] =
//     useState<OpenSourceContribution[]>(reduxContributions);

//   // Initialize with redux data on mount
//   useEffect(() => {
//     if (reduxContributions.length > 0) {
//       setLocalContributions(reduxContributions);
//     }
//   }, []);

//   // Debounced function to update Redux
//   const debouncedUpdateRedux = useCallback(
//     debounce((newContributions: OpenSourceContribution[]) => {
//       dispatch(setOpenSourceContributions(newContributions));
//     }, 1000),
//     []
//   );

//   // Update both local state and Redux when contributions change
//   const updateContributions = useCallback(
//     (newContributions: OpenSourceContribution[]) => {
//       setLocalContributions(newContributions);
//       debouncedUpdateRedux(newContributions);
//     },
//     [debouncedUpdateRedux]
//   );

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const addNewContribution = () => {
//     const newContribution: OpenSourceContribution = {
//       id: `contribution-${Date.now()}`,
//       projectName: "",
//       role: "",
//       technologies: [],
//       description: "",
//       contributions: "",
//       links: [],
//       startDate: { month: "", year: "" },
//       endDate: { month: "", year: "" },
//       isOngoing: false,
//     };
//     const updatedContributions = [...localContributions, newContribution];
//     updateContributions(updatedContributions);
//   };

//   const handleDelete = (id: string) => {
//     const updatedContributions = localContributions.filter(
//       (contribution) => contribution.id !== id
//     );
//     updateContributions(updatedContributions);
//   };

//   const handleChange = (
//     id: string,
//     field: keyof OpenSourceContribution,
//     value: any
//   ) => {
//     const updatedContributions = localContributions.map((contribution) =>
//       contribution.id === id
//         ? { ...contribution, [field]: value }
//         : contribution
//     );
//     updateContributions(updatedContributions);
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       const oldIndex = localContributions.findIndex(
//         (item) => item.id === active.id
//       );
//       const newIndex = localContributions.findIndex(
//         (item) => item.id === over.id
//       );

//       const reorderedContributions = arrayMove(
//         localContributions,
//         oldIndex,
//         newIndex
//       );
//       updateContributions(reorderedContributions);
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       <SectionTitle label="Open Source Contributions" />

//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={localContributions.map((item) => item.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion type="single" collapsible className="w-full">
//             {localContributions.map((contribution) => (
//               <SortableOpenSourceItem
//                 key={contribution.id}
//                 contribution={contribution}
//                 onDelete={handleDelete}
//                 onChange={handleChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>

//       <AddButton label="Add New Contribution" onClick={addNewContribution} />
//     </div>
//   );
// };

// export default OpenSourceSection;
"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trash2, GripVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import SubSectionTitle from "@/components/SubSectionTitle";
import TrashIconComponent from "@/components/TrashIconComponent";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setOpenSourceContributions } from "@/lib/store/slices/resumeSlice";
import { debounce } from "lodash";

interface OpenSourceContribution {
  id: string;
  projectName: string;
  role: string;
  technologies: string[];
  description: string;
  contributions: string;
  links: { platform: string; url: string }[];
  startDate: { month: string; year: string };
  endDate: { month: string; year: string };
  isOngoing: boolean;
}

interface Skill {
  id: string;
  name: string;
}

type ContributionField = keyof OpenSourceContribution;
type ContributionValue<T extends ContributionField> = OpenSourceContribution[T];

const predefinedSkills: Skill[] = [
  { id: "skill-1", name: "Git" },
  { id: "skill-2", name: "GitHub" },
  { id: "skill-3", name: "JavaScript" },
  { id: "skill-4", name: "Python" },
  { id: "skill-5", name: "Java" },
  { id: "skill-6", name: "C++" },
  { id: "skill-7", name: "Ruby" },
  { id: "skill-8", name: "Documentation" },
  { id: "skill-9", name: "Testing" },
  { id: "skill-10", name: "Code Review" },
];

const platformOptions = [
  { value: "github", label: "GitHub" },
  { value: "gitlab", label: "GitLab" },
  { value: "bitbucket", label: "Bitbucket" },
  { value: "website", label: "Project Website" },
  { value: "other", label: "Other" },
];

interface MonthYearPickerProps {
  labelFirst: string;
  labelSecond: string;
  value: { month: string; year: string };
  onChange: (value: { month: string; year: string }) => void;
  disabled?: boolean;
}

const MonthYearPicker = ({
  labelFirst,
  labelSecond,
  value,
  onChange,
  disabled = false,
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

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="flex gap-2 w-full items-center justify-center">
        <div className="w-1/2">
          <FloatingLabelSelect
            label={labelFirst}
            options={months}
            value={value.month}
            onChange={(newMonth) => onChange({ ...value, month: newMonth })}
            disabled={disabled}
          />
        </div>
        <div className="w-1/2">
          <FloatingLabelSelect
            label={labelSecond}
            options={years}
            value={value.year}
            onChange={(newYear) => onChange({ ...value, year: newYear })}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

const SortableOpenSourceItem = ({
  contribution,
  onDelete,
  onChange,
}: {
  contribution: OpenSourceContribution;
  onDelete: (id: string) => void;
  onChange: <T extends ContributionField>(
    id: string,
    field: T,
    value: ContributionValue<T>
  ) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: contribution.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [customSkill, setCustomSkill] = useState("");

  const handleSkillSelect = (skill: Skill) => {
    if (!contribution.technologies.includes(skill.name)) {
      onChange(contribution.id, "technologies", [
        ...contribution.technologies,
        skill.name,
      ]);
    }
  };

  const handleSkillRemove = (skillName: string) => {
    onChange(
      contribution.id,
      "technologies",
      contribution.technologies.filter((tech) => tech !== skillName)
    );
  };

  const handleCustomSkillAdd = () => {
    if (
      customSkill.trim() !== "" &&
      !contribution.technologies.includes(customSkill.trim())
    ) {
      onChange(contribution.id, "technologies", [
        ...contribution.technologies,
        customSkill.trim(),
      ]);
      setCustomSkill("");
    }
  };

  const handleLinkChange = (
    index: number,
    field: "platform" | "url",
    value: string
  ) => {
    const newLinks = [...contribution.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange(contribution.id, "links", newLinks);
  };

  const addNewLink = () => {
    onChange(contribution.id, "links", [
      ...contribution.links,
      { platform: "", url: "" },
    ]);
  };

  const removeLink = (index: number) => {
    const newLinks = contribution.links.filter((_, i) => i !== index);
    onChange(contribution.id, "links", newLinks);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <AccordionItem
        value={contribution.id}
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
                  {contribution.projectName || "New Open Source Project"}
                </div>
                <div className="text-sm text-gray-500">
                  {contribution.technologies.join(", ") || "Technologies Used"}
                </div>
              </div>
            </div>
            <TrashIconComponent onDelete={() => onDelete(contribution.id)} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 space-y-3">
          <div className="w-full h-auto flex flex-row gap-2 max-md:flex-col max-md:gap-3 ">
            <div className="w-1/2 max-md:w-full">
              <FloatingLabelInput
                label="Project Name"
                inputType="text"
                inputClassName="border-gray-300"
                value={contribution.projectName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(contribution.id, "projectName", e.target.value)
                }
              />
            </div>
            <div className="w-1/2 max-md:w-full">
              <FloatingLabelInput
                label="Your Role"
                inputType="text"
                inputClassName="border-gray-300"
                value={contribution.role}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(contribution.id, "role", e.target.value)
                }
              />
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
              Technologies & Skills Used
            </h4>
            <div className="flex flex-wrap gap-2 py-2">
              {predefinedSkills.map((skill) => (
                <Button
                  key={skill.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSkillSelect(skill)}
                  className={`w-auto px-2 h-[30px] rounded text-gray-500 font-heading hover:scale-[.98] transition-all duration-150 font-semibold text-[15px] ${
                    contribution.technologies.includes(skill.name)
                      ? "border-primary text-primary"
                      : ""
                  }`}
                >
                  {skill.name}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 mb-2 mt-2 max-md:flex-col max-md:h-auto">
              <div className="flex-grow">
                <FloatingLabelInput
                  label="Add Custom Technology/Skill"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                />
              </div>
              <Button
                onClick={handleCustomSkillAdd}
                className="w-[140px] h-[40px] max-md:w-full rounded text-white font-heading hover:scale-[.98] transition-all duration-150 text-[15px]"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {contribution.technologies.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center bg-white border rounded p-2"
                >
                  <span className="text-gray-600 font-semibold font-body text-[15px] mr-2">
                    {tech}
                  </span>
                  <X
                    className="h-4 w-4 text-gray-500 cursor-pointer"
                    onClick={() => handleSkillRemove(tech)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-m-desktop:space-x-4 w-full  max-m-desktop:flex-col flex-row  max-m-desktop:h-auto  gap-y-3 xl:gap-2">
            <MonthYearPicker
              labelFirst="Start Month"
              labelSecond="Start Year"
              value={contribution.startDate}
              onChange={(value) =>
                onChange(contribution.id, "startDate", value)
              }
            />
            <MonthYearPicker
              labelFirst="End Month"
              labelSecond="End Year"
              value={contribution.endDate}
              onChange={(value) => onChange(contribution.id, "endDate", value)}
              disabled={contribution.isOngoing}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={contribution.isOngoing}
              onChange={(e) =>
                onChange(contribution.id, "isOngoing", e.target.checked)
              }
              className="mr-2"
            />
            <label>I am currently contributing to this project</label>
          </div>
          <div>
            <SubSectionTitle label="Project Description" />
            <TextareaField
              placeholder="Describe the open source project, its goals, and its impact..."
              value={contribution.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChange(contribution.id, "description", e.target.value)
              }
            />
          </div>
          <div>
            <SubSectionTitle label="Your Contributions" />
            <TextareaField
              placeholder="Detail your specific contributions, PRs, issues resolved, and impact on the project..."
              value={contribution.contributions}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChange(contribution.id, "contributions", e.target.value)
              }
            />
          </div>
          <div>
            <SubSectionTitle
              label="Project Links"
              className={` ${contribution.links.length > 0 ? "mb-[12px]" : ""}`}
            />
            {contribution.links.map((link, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <div className="w-1/2">
                  <FloatingLabelSelect
                    label="Platform"
                    options={platformOptions}
                    value={link.platform}
                    onChange={(value) =>
                      handleLinkChange(index, "platform", value)
                    }
                  />
                </div>
                <div className="w-1/2">
                  <FloatingLabelInput
                    label="URL"
                    inputType="text"
                    inputClassName="border-gray-300 w-full"
                    value={link.url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleLinkChange(index, "url", e.target.value)
                    }
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeLink(index)}
                  className="h-[40px] w-[40px]"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <AddButton
              label="Add New Link"
              onClick={addNewLink}
              className="mt-2"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

const OpenSourceSection = () => {
  const dispatch = useAppDispatch();
  const reduxContributions = useAppSelector(
    (state) => state.resume.openSourceContributions
  );
  const [localContributions, setLocalContributions] =
    useState<OpenSourceContribution[]>(reduxContributions);

  // Create memoized debounced dispatch function
  const debouncedDispatch = useMemo(
    () =>
      debounce(
        (contributions: OpenSourceContribution[]) => {
          dispatch(setOpenSourceContributions(contributions));
        },
        1000,
        { maxWait: 2000 }
      ),
    [dispatch]
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedDispatch.cancel();
    };
  }, [debouncedDispatch]);

  useEffect(() => {
    if (reduxContributions.length > 0) {
      setLocalContributions(reduxContributions);
    }
  }, [reduxContributions]);

  // Update both local state and Redux when contributions change
  const updateContributions = useCallback(
    (newContributions: OpenSourceContribution[]) => {
      setLocalContributions(newContributions);
      debouncedDispatch(newContributions);
    },
    [debouncedDispatch]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addNewContribution = useCallback(() => {
    const newContribution: OpenSourceContribution = {
      id: `contribution-${Date.now()}`,
      projectName: "",
      role: "",
      technologies: [],
      description: "",
      contributions: "",
      links: [],
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      isOngoing: false,
    };
    updateContributions([...localContributions, newContribution]);
  }, [localContributions, updateContributions]);

  const handleDelete = useCallback(
    (id: string) => {
      const updatedContributions = localContributions.filter(
        (contribution) => contribution.id !== id
      );
      updateContributions(updatedContributions);
    },
    [localContributions, updateContributions]
  );

  const handleChange = useCallback(
    <T extends ContributionField>(
      id: string,
      field: T,
      value: ContributionValue<T>
    ) => {
      const updatedContributions = localContributions.map((contribution) =>
        contribution.id === id
          ? { ...contribution, [field]: value }
          : contribution
      );
      updateContributions(updatedContributions);
    },
    [localContributions, updateContributions]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (active.id !== over?.id) {
        const oldIndex = localContributions.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = localContributions.findIndex(
          (item) => item.id === over?.id
        );

        const reorderedContributions = arrayMove(
          localContributions,
          oldIndex,
          newIndex
        );
        updateContributions(reorderedContributions);
      }
    },
    [localContributions, updateContributions]
  );

  return (
    <div className="w-full h-auto">
      <SectionTitle label="Open Source Contributions" />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localContributions.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <Accordion type="single" collapsible className="w-full">
            {localContributions.map((contribution) => (
              <SortableOpenSourceItem
                key={contribution.id}
                contribution={contribution}
                onDelete={handleDelete}
                onChange={handleChange}
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>

      <AddButton label="Add New Contribution" onClick={addNewContribution} />
    </div>
  );
};

export default OpenSourceSection;
