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

// interface Project {
//   id: string;
//   title: string;
//   technologies: string[];
//   role: string;
//   contributions: string;
//   links: { platform: string; url: string }[];
// }

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

// const socialMediaOptions = [
//   { value: "github", label: "GitHub" },
//   { value: "linkedin", label: "LinkedIn" },
//   { value: "website", label: "Website" },
//   { value: "other", label: "Other" },
// ];

// const SortableProjectItem = ({
//   project,
//   onDelete,
//   onChange,
// }: {
//   project: Project;
//   onDelete: (id: string) => void;
//   onChange: (id: string, field: keyof Project, value: any) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: project.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const [customSkill, setCustomSkill] = useState("");

//   const handleSkillSelect = (skill: Skill) => {
//     if (!project.technologies.includes(skill.name)) {
//       onChange(project.id, "technologies", [
//         ...project.technologies,
//         skill.name,
//       ]);
//     }
//   };

//   const handleSkillRemove = (skillName: string) => {
//     onChange(
//       project.id,
//       "technologies",
//       project.technologies.filter((tech) => tech !== skillName)
//     );
//   };

//   const handleCustomSkillAdd = () => {
//     if (
//       customSkill.trim() !== "" &&
//       !project.technologies.includes(customSkill.trim())
//     ) {
//       onChange(project.id, "technologies", [
//         ...project.technologies,
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
//     const newLinks = [...project.links];
//     newLinks[index] = { ...newLinks[index], [field]: value };
//     onChange(project.id, "links", newLinks);
//   };

//   const addNewLink = () => {
//     onChange(project.id, "links", [
//       ...project.links,
//       { platform: "", url: "" },
//     ]);
//   };

//   const removeLink = (index: number) => {
//     const newLinks = project.links.filter((_, i) => i !== index);
//     onChange(project.id, "links", newLinks);
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       <AccordionItem
//         value={project.id}
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
//                   {project.title || "New Project"}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {project.technologies.join(", ") || "Technologies"}
//                 </div>
//               </div>
//             </div>
//             {/* <Trash2
//               className="h-4 w-4 text-gray-500 cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDelete(project.id);
//               }}
//             /> */}
//             <TrashIconComponent onDelete={() => onDelete(project.id)} />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <FloatingLabelInput
//             label="Project Title"
//             inputType="text"
//             inputClassName="border-gray-300"
//             value={project.title}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               onChange(project.id, "title", e.target.value)
//             }
//           />
//           <div>
//             <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2 ">
//               Technologies Used
//             </h4>
//             <div className="flex flex-wrap gap-2 py-2">
//               {predefinedSkills.map((skill) => (
//                 <Button
//                   key={skill.id}
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleSkillSelect(skill)}
//                   className={`w-auto px-2 h-[30px] rounded text-gray-500 font-heading hover:scale-[.98] transition-all duration-150 font-semibold text-[15px] ${
//                     project.technologies.includes(skill.name)
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
//                   label="Add Custom Technology"
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
//               {project.technologies.map((tech) => (
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
//           <FloatingLabelInput
//             label="Your Role"
//             inputType="text"
//             inputClassName="border-gray-300"
//             value={project.role}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               onChange(project.id, "role", e.target.value)
//             }
//           />
//           <div>
//             {/* <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//               Your Contributions
//             </h4> */}
//             <SubSectionTitle label="Your Contributions" />
//             <TextareaField
//               placeholder="Describe your key contributions and achievements in this project..."
//               value={project.contributions}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                 onChange(project.id, "contributions", e.target.value)
//               }
//             />
//           </div>
//           <div>
//             {/* <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//               Project Links
//             </h4> */}
//             <SubSectionTitle
//               label="Project Links"
//               className={`${project.links.length > 0 ? "mb-[12px]" : ""}`}
//             />
//             {project.links.map((link, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <div className="w-1/2">
//                   <FloatingLabelSelect
//                     label="Platform"
//                     options={socialMediaOptions}
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

// const ProjectsSection = () => {
//   const [projects, setProjects] = useState<Project[]>([
//     {
//       id: "default-project",
//       title: "",
//       technologies: [],
//       role: "",
//       contributions: "",
//       links: [],
//     },
//   ]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const addNewProject = () => {
//     const newProject: Project = {
//       id: `project-${Date.now()}`,
//       title: "",
//       technologies: [],
//       role: "",
//       contributions: "",
//       links: [],
//     };
//     setProjects([...projects, newProject]);
//   };

//   const handleInputChange = (id: string, field: keyof Project, value: any) => {
//     setProjects(
//       projects.map((proj) =>
//         proj.id === id
//           ? {
//               ...proj,
//               [field]: value,
//             }
//           : proj
//       )
//     );
//   };

//   const deleteProject = (id: string) => {
//     setProjects(projects.filter((proj) => proj.id !== id));
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setProjects((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       {/* <h3 className="font-heading font-semibold text-[16px] text-black pb-[2px]">
//         Projects
//       </h3> */}
//       <SectionTitle label="Projects" />
//       {/* <p className="font-body font-normal text-[15px] text-gray-500 mb-4">
//         Showcase your key projects, highlighting your role, technologies used,
//         and major contributions. This helps potential employers understand your
//         practical experience and skills.
//       </p> */}
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={projects.map((proj) => proj.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             defaultValue={["default-project"]}
//           >
//             {projects.map((project) => (
//               <SortableProjectItem
//                 key={project.id}
//                 project={project}
//                 onDelete={deleteProject}
//                 onChange={handleInputChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       {/* <Button
//         onClick={addNewProject}
//         variant="outline"
//         className="mt-4 flex items-center text-primary hover:text-primary-dark"
//       >
//         <PlusCircle className="mr-2" />
//         Add New Project
//       </Button> */}
//       <AddButton label="Add New Project" onClick={addNewProject} />
//     </div>
//   );
// };

// export default ProjectsSection;

// ProjectsSection.tsx
// "use client";
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import debounce from "lodash/debounce";
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
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import {
//   setProjects,
//   updateProject,
//   addProject,
//   deleteProject,
//   reorderProjects,
// } from "@/lib/store/slices/resumeSlice";

// interface Project {
//   id: string;
//   title: string;
//   technologies: string[];
//   role: string;
//   contributions: string;
//   links: { platform: string; url: string }[];
// }

// const predefinedSkills = [
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

// const socialMediaOptions = [
//   { value: "github", label: "GitHub" },
//   { value: "linkedin", label: "LinkedIn" },
//   { value: "website", label: "Website" },
//   { value: "other", label: "Other" },
// ];

// const SortableProjectItem = ({
//   project,
//   onDelete,
//   onChange,
// }: {
//   project: Project;
//   onDelete: (id: string) => void;
//   onChange: (id: string, field: keyof Project, value: any) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: project.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const [customSkill, setCustomSkill] = useState("");

//   const handleSkillSelect = (skill: { id: string; name: string }) => {
//     if (!project.technologies.includes(skill.name)) {
//       onChange(project.id, "technologies", [
//         ...project.technologies,
//         skill.name,
//       ]);
//     }
//   };

//   const handleSkillRemove = (skillName: string) => {
//     onChange(
//       project.id,
//       "technologies",
//       project.technologies.filter((tech) => tech !== skillName)
//     );
//   };

//   const handleCustomSkillAdd = () => {
//     if (
//       customSkill.trim() !== "" &&
//       !project.technologies.includes(customSkill.trim())
//     ) {
//       onChange(project.id, "technologies", [
//         ...project.technologies,
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
//     const newLinks = [...project.links];
//     newLinks[index] = { ...newLinks[index], [field]: value };
//     onChange(project.id, "links", newLinks);
//   };

//   const addNewLink = () => {
//     onChange(project.id, "links", [
//       ...project.links,
//       { platform: "", url: "" },
//     ]);
//   };

//   const removeLink = (index: number) => {
//     const newLinks = project.links.filter((_, i) => i !== index);
//     onChange(project.id, "links", newLinks);
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       <AccordionItem
//         value={project.id}
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
//                   {project.title || "New Project"}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {project.technologies.join(", ") || "Technologies"}
//                 </div>
//               </div>
//             </div>
//             <TrashIconComponent onDelete={() => onDelete(project.id)} />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <FloatingLabelInput
//             label="Project Title"
//             inputType="text"
//             inputClassName="border-gray-300"
//             value={project.title}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               onChange(project.id, "title", e.target.value)
//             }
//           />
//           <div>
//             <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//               Technologies Used
//             </h4>
//             <div className="flex flex-wrap gap-2 py-2">
//               {predefinedSkills.map((skill) => (
//                 <Button
//                   key={skill.id}
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleSkillSelect(skill)}
//                   className={`w-auto px-2 h-[30px] rounded text-gray-500 font-heading hover:scale-[.98] transition-all duration-150 font-semibold text-[15px] ${
//                     project.technologies.includes(skill.name)
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
//                   label="Add Custom Technology"
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
//               {project.technologies.map((tech) => (
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
//           <FloatingLabelInput
//             label="Your Role"
//             inputType="text"
//             inputClassName="border-gray-300"
//             value={project.role}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               onChange(project.id, "role", e.target.value)
//             }
//           />
//           <div>
//             <SubSectionTitle label="Your Contributions" />
//             <TextareaField
//               placeholder="Describe your key contributions and achievements in this project..."
//               value={project.contributions}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                 onChange(project.id, "contributions", e.target.value)
//               }
//             />
//           </div>
//           <div>
//             <SubSectionTitle
//               label="Project Links"
//               className={`${project.links.length > 0 ? "mb-[12px]" : ""}`}
//             />
//             {project.links.map((link, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <div className="w-1/2">
//                   <FloatingLabelSelect
//                     label="Platform"
//                     options={socialMediaOptions}
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

// const ProjectsSection = () => {
//   const dispatch = useAppDispatch();
//   const reduxProjects = useAppSelector((state) => state.resume.projects);
//   const [localProjects, setLocalProjects] = useState<Project[]>(reduxProjects);
//   const [expandedItems, setExpandedItems] = useState<string[]>([
//     "default-project",
//   ]);

//   const debouncedUpdateRedux = useMemo(
//     () =>
//       debounce((projects: Project[]) => {
//         dispatch(setProjects(projects));
//       }, 1000),
//     [dispatch]
//   );

//   useEffect(() => {
//     setLocalProjects(reduxProjects);
//   }, [reduxProjects]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const addNewProject = useCallback(() => {
//     const newProject: Project = {
//       id: `project-${Date.now()}`,
//       title: "",
//       technologies: [],
//       role: "",
//       contributions: "",
//       links: [],
//     };
//     const updatedProjects = [...localProjects, newProject];
//     setLocalProjects(updatedProjects);
//     debouncedUpdateRedux(updatedProjects);
//     dispatch(addProject(newProject));
//   }, [localProjects, debouncedUpdateRedux, dispatch]);

//   const handleInputChange = useCallback(
//     (id: string, field: keyof Project, value: any) => {
//       const updatedProjects = localProjects.map((proj) =>
//         proj.id === id ? { ...proj, [field]: value } : proj
//       );
//       setLocalProjects(updatedProjects);
//       debouncedUpdateRedux(updatedProjects);
//       dispatch(updateProject({ id, field, value }));
//     },
//     [localProjects, debouncedUpdateRedux, dispatch]
//   );

//   const deleteProjectHandler = useCallback(
//     (id: string) => {
//       const updatedProjects = localProjects.filter((proj) => proj.id !== id);
//       setLocalProjects(updatedProjects);
//       debouncedUpdateRedux(updatedProjects);
//       dispatch(deleteProject(id));
//     },
//     [localProjects, debouncedUpdateRedux, dispatch]
//   );

//   const handleDragEnd = useCallback(
//     (event: any) => {
//       const { active, over } = event;
//       if (active.id !== over.id) {
//         const oldIndex = localProjects.findIndex(
//           (item) => item.id === active.id
//         );
//         const newIndex = localProjects.findIndex((item) => item.id === over.id);
//         const updatedProjects = arrayMove(localProjects, oldIndex, newIndex);
//         setLocalProjects(updatedProjects);
//         debouncedUpdateRedux(updatedProjects);
//         dispatch(reorderProjects({ oldIndex, newIndex }));
//       }
//     },
//     [localProjects, debouncedUpdateRedux, dispatch]
//   );

//   useEffect(() => {
//     return () => {
//       debouncedUpdateRedux.cancel();
//     };
//   }, [debouncedUpdateRedux]);

//   return (
//     <div className="w-full h-auto">
//       <SectionTitle label="Projects" />
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={localProjects.map((proj) => proj.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             value={expandedItems}
//             onValueChange={setExpandedItems}
//           >
//             {localProjects.map((project) => (
//               <SortableProjectItem
//                 key={project.id}
//                 project={project}
//                 onDelete={deleteProjectHandler}
//                 onChange={handleInputChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       <AddButton label="Add New Project" onClick={addNewProject} />
//     </div>
//   );
// };

// export default ProjectsSection;

// "use client";
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import debounce from "lodash/debounce";
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
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import {
//   setProjects,
//   updateProject,
//   addProject,
//   deleteProject,
//   reorderProjects,
// } from "@/lib/store/slices/resumeSlice";

// interface Project {
//   id: string;
//   title: string;
//   technologies: string[];
//   role: string;
//   contributions: string;
//   links: { platform: string; url: string }[];
// }

// const predefinedSkills = [
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

// const socialMediaOptions = [
//   { value: "github", label: "GitHub" },
//   { value: "linkedin", label: "LinkedIn" },
//   { value: "website", label: "Website" },
//   { value: "other", label: "Other" },
// ];

// const SortableProjectItem = ({
//   project,
//   onDelete,
//   onChange,
// }: {
//   project: Project;
//   onDelete: (id: string) => void;
//   onChange: (id: string, field: keyof Project, value: any) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: project.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const [customSkill, setCustomSkill] = useState("");

//   const handleSkillSelect = (skill: { id: string; name: string }) => {
//     if (!project.technologies.includes(skill.name)) {
//       onChange(project.id, "technologies", [
//         ...project.technologies,
//         skill.name,
//       ]);
//     }
//   };

//   const handleSkillRemove = (skillName: string) => {
//     onChange(
//       project.id,
//       "technologies",
//       project.technologies.filter((tech) => tech !== skillName)
//     );
//   };

//   const handleCustomSkillAdd = () => {
//     if (
//       customSkill.trim() !== "" &&
//       !project.technologies.includes(customSkill.trim())
//     ) {
//       onChange(project.id, "technologies", [
//         ...project.technologies,
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
//     const newLinks = [...project.links];
//     newLinks[index] = { ...newLinks[index], [field]: value };
//     onChange(project.id, "links", newLinks);
//   };

//   const addNewLink = () => {
//     onChange(project.id, "links", [
//       ...project.links,
//       { platform: "", url: "" },
//     ]);
//   };

//   const removeLink = (index: number) => {
//     const newLinks = project.links.filter((_, i) => i !== index);
//     onChange(project.id, "links", newLinks);
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       <AccordionItem
//         value={project.id}
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
//                   {project.title || "New Project"}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {project.technologies.join(", ") || "Technologies"}
//                 </div>
//               </div>
//             </div>
//             <TrashIconComponent onDelete={() => onDelete(project.id)} />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <FloatingLabelInput
//             label="Project Title"
//             inputType="text"
//             inputClassName="border-gray-300"
//             value={project.title}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               onChange(project.id, "title", e.target.value)
//             }
//           />
//           <div>
//             <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
//               Technologies Used
//             </h4>
//             <div className="flex flex-wrap gap-2 py-2">
//               {predefinedSkills.map((skill) => (
//                 <Button
//                   key={skill.id}
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleSkillSelect(skill)}
//                   className={`w-auto px-2 h-[30px] rounded text-gray-500 font-heading hover:scale-[.98] transition-all duration-150 font-semibold text-[15px] ${
//                     project.technologies.includes(skill.name)
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
//                   label="Add Custom Technology"
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
//               {project.technologies.map((tech) => (
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
//           <FloatingLabelInput
//             label="Your Role"
//             inputType="text"
//             inputClassName="border-gray-300"
//             value={project.role}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               onChange(project.id, "role", e.target.value)
//             }
//           />
//           <div>
//             <SubSectionTitle label="Your Contributions" />
//             <TextareaField
//               placeholder="Describe your key contributions and achievements in this project..."
//               value={project.contributions}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                 onChange(project.id, "contributions", e.target.value)
//               }
//             />
//           </div>
//           <div>
//             <SubSectionTitle
//               label="Project Links"
//               className={`${project.links.length > 0 ? "mb-[12px]" : ""}`}
//             />
//             {project.links.map((link, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <div className="w-1/2">
//                   <FloatingLabelSelect
//                     label="Platform"
//                     options={socialMediaOptions}
//                     value={link.platform}
//                     onChange={(value) =>
//                       handleLinkChange(index, "platform", value)
//                     }
//                   />
//                 </div>
//                 <div className="w-1/2">
//                   <FloatingLabelInput
//                     label="URL"
//                     value={link.url}
//                     onChange={(e) =>
//                       handleLinkChange(index, "url", e.target.value)
//                     }
//                   />
//                 </div>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   className="h-[40px] flex items-center"
//                   onClick={() => removeLink(index)}
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             ))}
//             <div className="flex items-center justify-start">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="flex items-center text-gray-500 h-[40px]"
//                 onClick={addNewLink}
//               >
//                 <PlusCircle className="mr-2 h-4 w-4" />
//                 Add New Link
//               </Button>
//             </div>
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const ProjectsForm = () => {
//   const projects = useAppSelector((state) => state.resume.projects);
//   const dispatch = useAppDispatch();

//   const [localProjects, setLocalProjects] = useState(projects);

//   useEffect(() => {
//     setLocalProjects(projects);
//   }, [projects]);

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDelete = (id: string) => {
//     dispatch(deleteProject(id));
//   };

//   const handleChange = (id: string, field: keyof Project, value: any) => {
//     const updatedProjects = localProjects.map((project) =>
//       project.id === id ? { ...project, [field]: value } : project
//     );
//     setLocalProjects(updatedProjects);

//     // Debounce the Redux update
//     debouncedUpdateProjects(updatedProjects);
//   };

//   const handleAdd = () => {
//     dispatch(addProject());
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over?.id) {
//       const oldIndex = localProjects.findIndex(
//         (project) => project.id === active.id
//       );
//       const newIndex = localProjects.findIndex(
//         (project) => project.id === over?.id
//       );

//       const newOrder = arrayMove(localProjects, oldIndex, newIndex);
//       setLocalProjects(newOrder);

//       dispatch(reorderProjects(newOrder));
//     }
//   };

//   const debouncedUpdateProjects = useMemo(
//     () =>
//       debounce((updatedProjects) => {
//         dispatch(setProjects(updatedProjects));
//       }, 300),
//     [dispatch]
//   );

//   return (
//     <div>
//       <SectionTitle title="Projects" />
//       <Accordion type="single" collapsible>
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <SortableContext
//             items={localProjects.map((project) => project.id)}
//             strategy={verticalListSortingStrategy}
//           >
//             {localProjects.map((project) => (
//               <SortableProjectItem
//                 key={project.id}
//                 project={project}
//                 onDelete={handleDelete}
//                 onChange={handleChange}
//               />
//             ))}
//           </SortableContext>
//         </DndContext>
//       </Accordion>
//       <div className="mt-4">
//         <AddButton label="Add Project" onClick={handleAdd} />
//       </div>
//     </div>
//   );
// };

// export default ProjectsForm;

"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusCircle, Trash2, GripVertical, X } from "lucide-react";
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
import {
  setProjects,
  updateProject,
  addProject,
  deleteProject,
  reorderProjects,
} from "@/lib/store/slices/resumeSlice";

interface Project {
  id: string;
  title: string;
  technologies: string[];
  role: string;
  contributions: string;
  links: { platform: string; url: string }[];
}

const predefinedSkills = [
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

const socialMediaOptions = [
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "website", label: "Website" },
  { value: "other", label: "Other" },
];

const SortableProjectItem = ({
  project,
  onDelete,
  onChange,
}: {
  project: Project;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof Project, value: any) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project.id });
  const [localProject, setLocalProject] = useState(project);
  const updateTimeoutRef = useRef<NodeJS.Timeout>();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [customSkill, setCustomSkill] = useState("");

  const handleLocalChange = (field: keyof Project, value: any) => {
    setLocalProject((prev) => ({ ...prev, [field]: value }));
    onChange(project.id, field, value);
  };

  const handleSkillSelect = (skill: { id: string; name: string }) => {
    if (!localProject.technologies.includes(skill.name)) {
      const newTechnologies = [...localProject.technologies, skill.name];
      handleLocalChange("technologies", newTechnologies);
    }
  };

  const handleSkillRemove = (skillName: string) => {
    const newTechnologies = localProject.technologies.filter(
      (tech) => tech !== skillName
    );
    handleLocalChange("technologies", newTechnologies);
  };

  const handleCustomSkillAdd = () => {
    if (
      customSkill.trim() !== "" &&
      !localProject.technologies.includes(customSkill.trim())
    ) {
      const newTechnologies = [
        ...localProject.technologies,
        customSkill.trim(),
      ];
      handleLocalChange("technologies", newTechnologies);
      setCustomSkill("");
    }
  };

  const handleLinkChange = (
    index: number,
    field: "platform" | "url",
    value: string
  ) => {
    const newLinks = [...localProject.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    handleLocalChange("links", newLinks);
  };

  const addNewLink = () => {
    const newLinks = [...localProject.links, { platform: "", url: "" }];
    handleLocalChange("links", newLinks);
  };

  const removeLink = (index: number) => {
    const newLinks = localProject.links.filter((_, i) => i !== index);
    handleLocalChange("links", newLinks);
  };

  useEffect(() => {
    setLocalProject(project);
  }, [project]);

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <AccordionItem
        value={project.id}
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
                  {localProject.title || "New Project"}
                </div>
                <div className="text-sm text-gray-500">
                  {localProject.technologies.join(", ") || "Technologies"}
                </div>
              </div>
            </div>
            <TrashIconComponent onDelete={() => onDelete(project.id)} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 space-y-4">
          <FloatingLabelInput
            label="Project Title"
            inputType="text"
            inputClassName="border-gray-300"
            value={localProject.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleLocalChange("title", e.target.value)
            }
          />
          <div>
            <h4 className="font-heading font-semibold text-[14px] text-gray-900 mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2 py-2">
              {predefinedSkills.map((skill) => (
                <Button
                  key={skill.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSkillSelect(skill)}
                  className={`w-auto px-2 h-[30px] rounded text-gray-500 font-heading hover:scale-[.98] transition-all duration-150 font-semibold text-[15px] ${
                    localProject.technologies.includes(skill.name)
                      ? "border-primary text-primary"
                      : ""
                  }`}
                >
                  {skill.name}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 mb-2 mt-2">
              <div className="flex-grow">
                <FloatingLabelInput
                  label="Add Custom Technology"
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
            <div className="flex flex-wrap gap-2">
              {localProject.technologies.map((tech) => (
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
          <FloatingLabelInput
            label="Your Role"
            inputType="text"
            inputClassName="border-gray-300"
            value={localProject.role}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleLocalChange("role", e.target.value)
            }
          />
          <div>
            <SubSectionTitle label="Your Contributions" />
            <TextareaField
              placeholder="Describe your key contributions and achievements in this project..."
              value={localProject.contributions}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleLocalChange("contributions", e.target.value)
              }
            />
          </div>
          <div>
            <SubSectionTitle
              label="Project Links"
              className={`${localProject.links.length > 0 ? "mb-[12px]" : ""}`}
            />
            {localProject.links.map((link, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <div className="w-1/2">
                  <FloatingLabelSelect
                    label="Platform"
                    options={socialMediaOptions}
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

const ProjectsSection = () => {
  const dispatch = useAppDispatch();
  const reduxProjects = useAppSelector((state) => state.resume.projects);
  const [localProjects, setLocalProjects] = useState<Project[]>(reduxProjects);
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "default-project",
  ]);
  const updateTimeoutRef = useRef<NodeJS.Timeout>();

  const updateReduxWithDelay = useCallback(
    (projects: Project[]) => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      updateTimeoutRef.current = setTimeout(() => {
        dispatch(setProjects(projects));
      }, 500);
    },
    [dispatch]
  );

  const addNewProject = useCallback(() => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: "",
      technologies: [],
      role: "",
      contributions: "",
      links: [],
    };
    setLocalProjects((prev) => [...prev, newProject]);
    updateReduxWithDelay([...localProjects, newProject]);
  }, [localProjects, updateReduxWithDelay]);

  const handleInputChange = useCallback(
    (id: string, field: keyof Project, value: any) => {
      setLocalProjects((prev) =>
        prev.map((proj) =>
          proj.id === id ? { ...proj, [field]: value } : proj
        )
      );
      updateReduxWithDelay(
        localProjects.map((proj) =>
          proj.id === id ? { ...proj, [field]: value } : proj
        )
      );
    },
    [localProjects, updateReduxWithDelay]
  );

  const deleteProjectHandler = useCallback(
    (id: string) => {
      setLocalProjects((prev) => prev.filter((proj) => proj.id !== id));
      updateReduxWithDelay(localProjects.filter((proj) => proj.id !== id));
    },
    [localProjects, updateReduxWithDelay]
  );

  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        const oldIndex = localProjects.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = localProjects.findIndex((item) => item.id === over.id);
        const updatedProjects = arrayMove(localProjects, oldIndex, newIndex);
        setLocalProjects(updatedProjects);
        updateReduxWithDelay(updatedProjects);
      }
    },
    [localProjects, updateReduxWithDelay]
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-auto">
      <SectionTitle label="Projects" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localProjects.map((proj) => proj.id)}
          strategy={verticalListSortingStrategy}
        >
          <Accordion
            type="multiple"
            className="w-full space-y-2"
            value={expandedItems}
            onValueChange={setExpandedItems}
          >
            {localProjects.map((project) => (
              <SortableProjectItem
                key={project.id}
                project={project}
                onDelete={deleteProjectHandler}
                onChange={handleInputChange}
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>
      <AddButton label="Add New Project" onClick={addNewProject} />
    </div>
  );
};

export default ProjectsSection;
