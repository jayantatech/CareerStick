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
// import TrashIconComponent from "@/components/TrashIconComponent";

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
//         defaultValue={["skills-section"]}
//       >
//         <AccordionItem
//           value="skills-section"
//           className="border rounded overflow-hidden mb-2"
//         >
//           <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 bg-red-d400 rounded">
//             <div className="flex justify-between items-center w-full">
//               <div className="flex items-center">
//                 <GripVertical className="h-5 w-5 text-gray-400 mr-2 cursor-move" />
//                 <div className="text-left">
//                   <div className="font-semibold font-heading text-gray-500">
//                     Skills Management
//                     {selectedSkills.length > 0 &&
//                       ` (${selectedSkills.length} skills selected)`}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {selectedSkills.length > 0
//                       ? selectedSkills
//                           .slice(0, 3)
//                           .map((skill) => skill.name)
//                           .join(", ") +
//                         (selectedSkills.length > 3
//                           ? ` and ${selectedSkills.length - 3} more`
//                           : "")
//                       : "No skills selected yet"}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </AccordionTrigger>
//           <AccordionContent className="px-4 py-2 space-y-4">
//             {/* Predefined Skills Section */}
//             <div className="mb-4">
//               <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//                 Predefined Skills
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {predefinedSkills.map((skill) => (
//                   <Button
//                     key={skill.id}
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleSkillSelect(skill)}
//                     className={`w-auto px-2 h-[30px] rounded text-gray-500 font-heading hover:scale-[.98] transition-all duration-150 font-semibold text-[15px] ${
//                       selectedSkills.some((s) => s.id === skill.id)
//                         ? "border-primary text-primary"
//                         : ""
//                     }`}
//                   >
//                     {skill.name}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             {/* Custom Skill Section */}
//             <div className="mb-4">
//               <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//                 Custom Skill
//               </h4>
//               <div className="flex gap-2">
//                 <div className="flex-grow">
//                   <FloatingLabelInput
//                     label="Add Custom Skill"
//                     value={customSkill}
//                     onChange={(e) => setCustomSkill(e.target.value)}
//                   />
//                 </div>
//                 <Button
//                   onClick={handleCustomSkillAdd}
//                   className="w-[140px] h-[40px] rounded text-white font-heading hover:scale-[.98] transition-all duration-150 text-[15px]"
//                 >
//                   Add
//                 </Button>
//               </div>
//             </div>

//             {/* Selected Skills Section */}
//             <div>
//               <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//                 Selected Skills
//               </h4>
//               <DndContext
//                 sensors={sensors}
//                 collisionDetection={closestCenter}
//                 onDragEnd={handleDragEnd}
//               >
//                 <SortableContext
//                   items={selectedSkills}
//                   strategy={verticalListSortingStrategy}
//                 >
//                   <div className="flex flex-row items-center justify-between flex-wrap w-full h-auto">
//                     {selectedSkills.map((skill) => (
//                       <SortableSkill
//                         key={skill.id}
//                         skill={skill}
//                         onRemove={handleSkillRemove}
//                       />
//                     ))}
//                   </div>
//                 </SortableContext>
//               </DndContext>
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// };

// export default SelectSkillsSection;

"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
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
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  addCustomSkill,
  addSelectedSkill,
  removeSelectedSkill,
  reorderSkills,
  setSelectedSkills,
} from "@/lib/store/slices/resumeSlice";

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

const SortableSkill: React.FC<{
  skill: Skill;
  onRemove: (id: string) => void;
}> = React.memo(({ skill, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: skill.id,
    });

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
});

SortableSkill.displayName = "SortableSkill";

const SelectSkillsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const reduxSelectedSkills = useAppSelector(
    (state) => state.resume.selectedSkills
  );
  const [localSelectedSkills, setLocalSelectedSkills] =
    useState<Skill[]>(reduxSelectedSkills);
  const [customSkill, setCustomSkill] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "skills-section",
  ]);

  const debouncedUpdateRedux = useMemo(
    () =>
      debounce((skills: Skill[]) => {
        dispatch(setSelectedSkills(skills));
      }, 1000),
    [dispatch]
  );

  useEffect(() => {
    setLocalSelectedSkills(reduxSelectedSkills);
  }, [reduxSelectedSkills]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSkillSelect = useCallback(
    (skill: Skill) => {
      if (!localSelectedSkills.some((s) => s.id === skill.id)) {
        const updatedSkills = [...localSelectedSkills, skill];
        setLocalSelectedSkills(updatedSkills);
        debouncedUpdateRedux(updatedSkills);
      }
    },
    [localSelectedSkills, debouncedUpdateRedux]
  );

  const handleSkillRemove = useCallback(
    (id: string) => {
      const updatedSkills = localSelectedSkills.filter(
        (skill) => skill.id !== id
      );
      setLocalSelectedSkills(updatedSkills);
      debouncedUpdateRedux(updatedSkills);
    },
    [localSelectedSkills, debouncedUpdateRedux]
  );

  const handleCustomSkillAdd = useCallback(() => {
    if (customSkill.trim() !== "") {
      const newSkill: Skill = {
        id: `custom-${Date.now()}`,
        name: customSkill.trim(),
      };
      const updatedSkills = [...localSelectedSkills, newSkill];
      setLocalSelectedSkills(updatedSkills);
      debouncedUpdateRedux(updatedSkills);
      dispatch(addCustomSkill(newSkill));
      setCustomSkill("");
    }
  }, [customSkill, localSelectedSkills, debouncedUpdateRedux, dispatch]);

  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        const oldIndex = localSelectedSkills.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = localSelectedSkills.findIndex(
          (item) => item.id === over.id
        );
        const updatedSkills = arrayMove(
          localSelectedSkills,
          oldIndex,
          newIndex
        );
        setLocalSelectedSkills(updatedSkills);
        debouncedUpdateRedux(updatedSkills);
        dispatch(reorderSkills({ oldIndex, newIndex }));
      }
    },
    [localSelectedSkills, debouncedUpdateRedux, dispatch]
  );

  useEffect(() => {
    return () => {
      debouncedUpdateRedux.cancel();
    };
  }, [debouncedUpdateRedux]);

  return (
    <div className="w-full h-auto">
      <SectionTitle label="Select Skills" />

      <Accordion
        type="multiple"
        className="w-full space-y-2"
        value={expandedItems}
        onValueChange={setExpandedItems}
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
                    {localSelectedSkills.length > 0 &&
                      ` (${localSelectedSkills.length} skills selected)`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {localSelectedSkills.length > 0
                      ? localSelectedSkills
                          .slice(0, 3)
                          .map((skill) => skill.name)
                          .join(", ") +
                        (localSelectedSkills.length > 3
                          ? ` and ${localSelectedSkills.length - 3} more`
                          : "")
                      : "No skills selected yet"}
                  </div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2 space-y-4">
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
                      localSelectedSkills.some((s) => s.id === skill.id)
                        ? "border-primary text-primary"
                        : ""
                    }`}
                  >
                    {skill.name}
                  </Button>
                ))}
              </div>
            </div>

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
                  items={localSelectedSkills}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-row items-center justify-between flex-wrap w-full h-auto">
                    {localSelectedSkills.map((skill) => (
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
