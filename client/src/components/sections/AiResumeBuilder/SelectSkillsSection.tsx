// "use client";
// import React, { useState } from "react";
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
// import { X, GripVertical } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
// import SectionTitle from "@/components/SectionTitle";

// interface Skill {
//   id: string;
//   name: string;
// }

// const predefinedSkills: Skill[] = [
//   { id: "skill-1", name: "JavaScript" },
//   { id: "skill-2", name: "React" },
//   { id: "skill-3", name: "Node.js" },
//   { id: "skill-4", name: "Python" },
//   { id: "skill-5", name: "Java" },
//   { id: "skill-6", name: "C#" },
//   { id: "skill-7", name: "SQL" },
//   { id: "skill-8", name: "Git" },
//   { id: "skill-9", name: "Docker" },
//   { id: "skill-10", name: "AWS" },
//   // Add more predefined skills as needed
// ];

// const SortableSkill = ({
//   skill,
//   onRemove,
// }: {
//   skill: Skill;
//   onRemove: (id: string) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: skill.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       className="flex min-w-[48%] w-auto items-center justify-between bg-white border rounded p-2 mb-2"
//     >
//       <div className="flex items-center">
//         <GripVertical
//           className="h-5 w-5 text-gray-400 mr-2 cursor-move"
//           {...listeners}
//         />
//         <span className="text-gray-600 font-semibold font-body text-[15px]">
//           {skill.name}
//         </span>
//       </div>
//       <X
//         className="h-4 w-4 text-gray-500 cursor-pointer"
//         onClick={() => onRemove(skill.id)}
//       />
//     </div>
//   );
// };

// const SelectSkillsSection = () => {
//   const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
//   const [customSkill, setCustomSkill] = useState("");

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleSkillSelect = (skill: Skill) => {
//     if (!selectedSkills.some((s) => s.id === skill.id)) {
//       setSelectedSkills([...selectedSkills, skill]);
//     }
//   };

//   const handleSkillRemove = (id: string) => {
//     setSelectedSkills(selectedSkills.filter((skill) => skill.id !== id));
//   };

//   const handleCustomSkillAdd = () => {
//     if (customSkill.trim() !== "") {
//       const newSkill: Skill = {
//         id: `custom-${Date.now()}`,
//         name: customSkill.trim(),
//       };
//       setSelectedSkills([...selectedSkills, newSkill]);
//       setCustomSkill("");
//     }
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setSelectedSkills((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       {/* <h3 className="font-heading font-semibold text-[16px] text-black pb-[2px]">
//         Select Skills
//       </h3> */}
//       <SectionTitle label="Select Skills" />
//       {/* <p className="font-body font-normal text-[15px] text-gray-500 mb-4">
//         Choose from the predefined skills or add your own custom skills. Click
//         to select, and drag to reorder your skills.
//       </p> */}

//       <div className="mb-4">
//         <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//           Predefined Skills
//         </h4>
//         <div className="flex flex-wrap gap-2">
//           {predefinedSkills.map((skill) => (
//             <Button
//               key={skill.id}
//               variant="outline"
//               size="sm"
//               onClick={() => handleSkillSelect(skill)}
//               className={` w-auto px-2 h-[30px] rounded text-gray-500 font-heading hover:scale-[.98] transition-all duration-150 font-semibold text-[15px] ${
//                 selectedSkills.some((s) => s.id === skill.id)
//                   ? "border-primary text-primary "
//                   : ""
//               }`}
//             >
//               {skill.name}
//             </Button>
//           ))}
//         </div>
//       </div>

//       <div className="mb-4">
//         <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//           Custom Skill
//         </h4>
//         <div className="flex gap-2">
//           <div className="flex-grow">
//             <FloatingLabelInput
//               label="Add Custom Skill"
//               value={customSkill}
//               onChange={(e) => setCustomSkill(e.target.value)}
//             />
//           </div>
//           <Button
//             onClick={handleCustomSkillAdd}
//             className="w-[140px] h-[40px] rounded text-white font-heading hover:scale-[.98] transition-all duration-150 text-[15px]"
//           >
//             Add
//           </Button>
//         </div>
//       </div>

//       <div>
//         <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//           Selected Skills
//         </h4>
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <SortableContext
//             items={selectedSkills}
//             strategy={verticalListSortingStrategy}
//           >
//             <div className="flex flex-row items-center justify-between flex-wrap bg-fudchsia-500 w-full h-auto">
//               {selectedSkills.map((skill) => (
//                 <SortableSkill
//                   key={skill.id}
//                   skill={skill}
//                   onRemove={handleSkillRemove}
//                 />
//               ))}
//             </div>
//           </SortableContext>
//         </DndContext>
//       </div>
//     </div>
//   );
// };

// export default SelectSkillsSection;

// "use client";
// import React, { useState } from "react";
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
// import { X, GripVertical } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
// import SectionTitle from "@/components/SectionTitle";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// interface Skill {
//   id: string;
//   name: string;
// }

// const predefinedSkills: Skill[] = [
//   { id: "skill-1", name: "JavaScript" },
//   { id: "skill-2", name: "React" },
//   { id: "skill-3", name: "Node.js" },
//   { id: "skill-4", name: "Python" },
//   { id: "skill-5", name: "Java" },
//   { id: "skill-6", name: "C#" },
//   { id: "skill-7", name: "SQL" },
//   { id: "skill-8", name: "Git" },
//   { id: "skill-9", name: "Docker" },
//   { id: "skill-10", name: "AWS" },
// ];

// const SortableSkill = ({
//   skill,
//   onRemove,
// }: {
//   skill: Skill;
//   onRemove: (id: string) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: skill.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       className="flex min-w-[48%] w-auto items-center justify-between bg-white border rounded p-2 mb-2"
//     >
//       <div className="flex items-center">
//         <GripVertical
//           className="h-5 w-5 text-gray-400 mr-2 cursor-move"
//           {...listeners}
//         />
//         <span className="text-gray-600 font-semibold font-body text-[15px]">
//           {skill.name}
//         </span>
//       </div>
//       <X
//         className="h-4 w-4 text-gray-500 cursor-pointer"
//         onClick={() => onRemove(skill.id)}
//       />
//     </div>
//   );
// };

// const SelectSkillsSection = () => {
//   const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
//   const [customSkill, setCustomSkill] = useState("");

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleSkillSelect = (skill: Skill) => {
//     if (!selectedSkills.some((s) => s.id === skill.id)) {
//       setSelectedSkills([...selectedSkills, skill]);
//     }
//   };

//   const handleSkillRemove = (id: string) => {
//     setSelectedSkills(selectedSkills.filter((skill) => skill.id !== id));
//   };

//   const handleCustomSkillAdd = () => {
//     if (customSkill.trim() !== "") {
//       const newSkill: Skill = {
//         id: `custom-${Date.now()}`,
//         name: customSkill.trim(),
//       };
//       setSelectedSkills([...selectedSkills, newSkill]);
//       setCustomSkill("");
//     }
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setSelectedSkills((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       <SectionTitle label="Select Skills" />

//       <Accordion
//         type="multiple"
//         className="w-full space-y-2"
//         defaultValue={["predefined-skills", "custom-skills", "selected-skills"]}
//       >
//         <AccordionItem
//           value="predefined-skills"
//           className="border rounded overflow-hidden mb-2"
//         >
//           <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50">
//             <div className="flex justify-between items-center w-full">
//               <div className="flex items-center">
//                 <div className="text-left">
//                   <div className="font-semibold font-heading text-gray-500">
//                     Predefined Skills
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </AccordionTrigger>
//           <AccordionContent className="px-4 py-2">
//             <div className="flex flex-wrap gap-2">
//               {predefinedSkills.map((skill) => (
//                 <Button
//                   key={skill.id}
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleSkillSelect(skill)}
//                   className={`w-auto px-2 h-[30px] rounded text-gray-500 font-heading hover:scale-[.98] transition-all duration-150 font-semibold text-[15px] ${
//                     selectedSkills.some((s) => s.id === skill.id)
//                       ? "border-primary text-primary "
//                       : ""
//                   }`}
//                 >
//                   {skill.name}
//                 </Button>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem
//           value="custom-skills"
//           className="border rounded overflow-hidden mb-2"
//         >
//           <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50">
//             <div className="flex justify-between items-center w-full">
//               <div className="flex items-center">
//                 <div className="text-left">
//                   <div className="font-semibold font-heading text-gray-500">
//                     Custom Skill
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </AccordionTrigger>
//           <AccordionContent className="px-4 py-2">
//             <div className="flex gap-2">
//               <div className="flex-grow">
//                 <FloatingLabelInput
//                   label="Add Custom Skill"
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
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem
//           value="selected-skills"
//           className="border rounded overflow-hidden mb-2"
//         >
//           <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50">
//             <div className="flex justify-between items-center w-full">
//               <div className="flex items-center">
//                 <div className="text-left">
//                   <div className="font-semibold font-heading text-gray-500">
//                     Selected Skills
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </AccordionTrigger>
//           <AccordionContent className="px-4 py-2">
//             <DndContext
//               sensors={sensors}
//               collisionDetection={closestCenter}
//               onDragEnd={handleDragEnd}
//             >
//               <SortableContext
//                 items={selectedSkills}
//                 strategy={verticalListSortingStrategy}
//               >
//                 <div className="flex flex-row items-center justify-between flex-wrap w-full h-auto">
//                   {selectedSkills.map((skill) => (
//                     <SortableSkill
//                       key={skill.id}
//                       skill={skill}
//                       onRemove={handleSkillRemove}
//                     />
//                   ))}
//                 </div>
//               </SortableContext>
//             </DndContext>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// };

// export default SelectSkillsSection;

"use client";
import React, { useState } from "react";
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
import { X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingLabelInput from "@/components/inputComponents/TextInputField";
import SectionTitle from "@/components/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TrashIconComponent from "@/components/TrashIconComponent";

interface Skill {
  id: string;
  name: string;
}

const predefinedSkills: Skill[] = [
  { id: "skill-1", name: "JavaScript" },
  { id: "skill-2", name: "React" },
  { id: "skill-3", name: "Node.js" },
  { id: "skill-4", name: "Python" },
  { id: "skill-5", name: "Java" },
  { id: "skill-6", name: "C#" },
  { id: "skill-7", name: "SQL" },
  { id: "skill-8", name: "Git" },
  { id: "skill-9", name: "Docker" },
  { id: "skill-10", name: "AWS" },
];

const SortableSkill = ({
  skill,
  onRemove,
}: {
  skill: Skill;
  onRemove: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex min-w-[48%] w-auto items-center justify-between bg-white border rounded p-2 mb-2"
    >
      <div className="flex items-center">
        <GripVertical
          className="h-5 w-5 text-gray-400 mr-2 cursor-move"
          {...listeners}
        />
        <span className="text-gray-600 font-semibold font-body text-[15px]">
          {skill.name}
        </span>
      </div>
      <X
        className="h-4 w-4 text-gray-500 cursor-pointer"
        onClick={() => onRemove(skill.id)}
      />
    </div>
  );
};

const SelectSkillsSection = () => {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [customSkill, setCustomSkill] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSkillSelect = (skill: Skill) => {
    if (!selectedSkills.some((s) => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSkillRemove = (id: string) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill.id !== id));
  };

  const handleCustomSkillAdd = () => {
    if (customSkill.trim() !== "") {
      const newSkill: Skill = {
        id: `custom-${Date.now()}`,
        name: customSkill.trim(),
      };
      setSelectedSkills([...selectedSkills, newSkill]);
      setCustomSkill("");
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSelectedSkills((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="w-full h-auto">
      <SectionTitle label="Select Skills" />

      <Accordion
        type="multiple"
        className="w-full space-y-2"
        defaultValue={["skills-section"]}
      >
        <AccordionItem
          value="skills-section"
          className="border rounded overflow-hidden mb-2"
        >
          <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 bg-red-d400 rounded">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <GripVertical className="h-5 w-5 text-gray-400 mr-2 cursor-move" />
                <div className="text-left">
                  <div className="font-semibold font-heading text-gray-500">
                    Skills Management
                    {selectedSkills.length > 0 &&
                      ` (${selectedSkills.length} skills selected)`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedSkills.length > 0
                      ? selectedSkills
                          .slice(0, 3)
                          .map((skill) => skill.name)
                          .join(", ") +
                        (selectedSkills.length > 3
                          ? ` and ${selectedSkills.length - 3} more`
                          : "")
                      : "No skills selected yet"}
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2 space-y-4">
            {/* Predefined Skills Section */}
            <div className="mb-4">
              <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
                Predefined Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {predefinedSkills.map((skill) => (
                  <Button
                    key={skill.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSkillSelect(skill)}
                    className={`w-auto px-2 h-[30px] rounded text-gray-500 font-heading hover:scale-[.98] transition-all duration-150 font-semibold text-[15px] ${
                      selectedSkills.some((s) => s.id === skill.id)
                        ? "border-primary text-primary"
                        : ""
                    }`}
                  >
                    {skill.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Skill Section */}
            <div className="mb-4">
              <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
                Custom Skill
              </h4>
              <div className="flex gap-2">
                <div className="flex-grow">
                  <FloatingLabelInput
                    label="Add Custom Skill"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleCustomSkillAdd}
                  className="w-[140px] h-[40px] rounded text-white font-heading hover:scale-[.98] transition-all duration-150 text-[15px]"
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Selected Skills Section */}
            <div>
              <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
                Selected Skills
              </h4>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={selectedSkills}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-row items-center justify-between flex-wrap w-full h-auto">
                    {selectedSkills.map((skill) => (
                      <SortableSkill
                        key={skill.id}
                        skill={skill}
                        onRemove={handleSkillRemove}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SelectSkillsSection;
