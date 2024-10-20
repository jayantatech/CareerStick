// "use client";
// import React, { useState } from "react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { PlusCircle, Trash2, GripVertical } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { format } from "date-fns";
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

// interface JobExperience {
//   id: string;
//   jobTitle: string;
//   company: string;
//   startDate: Date | undefined;
//   endDate: Date | undefined;
//   isCurrentJob: boolean;
//   location: string;
//   description: string;
// }

// const SortableExperienceItem = ({
//   experience,
//   onDelete,
//   onChange,
// }: {
//   experience: JobExperience;
//   onDelete: (id: string) => void;
//   onChange: (
//     id: string,
//     field: keyof JobExperience,
//     value: string | boolean | Date | undefined
//   ) => void;
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: experience.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       <AccordionItem
//         value={experience.id}
//         className="border rounded overflow-hidden mb-2"
//       >
//         <AccordionTrigger className="px-3 py-2  hover:no-underline hover:bg-gray-50 bg-red-d400 rounded ">
//           <div className="flex justify-between items-center w-full">
//             <div className="flex items-center">
//               <GripVertical
//                 className="h-5 w-5 text-gray-400 mr-2 cursor-move"
//                 {...listeners}
//               />
//               <div className="text-left">
//                 <div className="font-semibold font-heading text-gray-500">
//                   {experience.jobTitle || "New Job Experience"}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {experience.company}{" "}
//                   {experience.startDate
//                     ? format(experience.startDate, "MMM yyyy")
//                     : "Start Date"}{" "}
//                   -{" "}
//                   {experience.isCurrentJob
//                     ? "Present"
//                     : experience.endDate
//                     ? format(experience.endDate, "MMM yyyy")
//                     : "End Date"}
//                 </div>
//               </div>
//             </div>
//             <Trash2
//               className="h-4 w-4 text-gray-500 cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDelete(experience.id);
//               }}
//             />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <div className="w-full h-auto flex gap-2">
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Job Title"
//                 // placeholder="Enter your job title"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={experience.jobTitle}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   onChange(experience.id, "jobTitle", e.target.value)
//                 }
//               />
//             </div>
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Company Name"
//                 // placeholder="Enter company name"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={experience.company}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   onChange(experience.id, "company", e.target.value)
//                 }
//               />
//             </div>
//           </div>
//           <div className="flex space-x-4">
//             <Popover>
//               <PopoverTrigger asChild>
//                 <div
//                   //   variant="outline"
//                   className="w-full justify-start text-left font-normal border flex  px-2 rounded items-center"
//                 >
//                   {experience.startDate ? (
//                     format(experience.startDate, "MMM yyyy")
//                   ) : (
//                     <span>Start Date</span>
//                   )}
//                 </div>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   selected={experience.startDate}
//                   onSelect={(date) =>
//                     onChange(experience.id, "startDate", date)
//                   }
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start text-left font-normal"
//                 >
//                   {experience.endDate ? (
//                     format(experience.endDate, "MMM yyyy")
//                   ) : (
//                     <span>End Date</span>
//                   )}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   selected={experience.endDate}
//                   onSelect={(date) => onChange(experience.id, "endDate", date)}
//                   initialFocus
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={experience.isCurrentJob}
//               onChange={(e) =>
//                 onChange(experience.id, "isCurrentJob", e.target.checked)
//               }
//               className="mr-2"
//             />
//             <label>Current Job</label>
//           </div>
//           <FloatingLabelInput
//             label="Job Location"
//             // placeholder="Enter job location"
//             inputType="text"
//             inputClassName="border-gray-300"
//             value={experience.location}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               onChange(experience.id, "location", e.target.value)
//             }
//           />
//           <div className="relative">
//             <h4 className="font-heading font-semibold text-[14px] text-gray-900">
//               Job Description
//             </h4>
//             <p className="font-body font-normal text-[15px] text-gray-500 pb-2">
//               {`Outline your key tasks and responsibilities, showing the impact you've made. We'll refine it into a standout statement.`}
//             </p>
//             <TextareaField placeholder="Example: Managed a team of 8, improving project delivery time by 15%" />
//             {/* <textarea
//               placeholder="Example:Managed a team of 8, improving project delivery time by 15%"
//               value={experience.description}
//               onChange={(e) =>
//                 onChange(experience.id, "description", e.target.value)
//               }
//               className="w-full p-2 border rounded h-32 focus:outline-none focus:ring-1 focus:ring-primary"
//             /> */}
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const WorkExperienceSection = () => {
//   const [experiences, setExperiences] = useState<JobExperience[]>([
//     {
//       id: "default-job",
//       jobTitle: "",
//       company: "",
//       startDate: undefined,
//       endDate: undefined,
//       isCurrentJob: false,
//       location: "",
//       description: "",
//     },
//   ]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const addNewExperience = () => {
//     const newExperience: JobExperience = {
//       id: `job-${Date.now()}`,
//       jobTitle: "",
//       company: "",
//       startDate: undefined,
//       endDate: undefined,
//       isCurrentJob: false,
//       location: "",
//       description: "",
//     };
//     setExperiences([...experiences, newExperience]);
//   };

//   const handleInputChange = (
//     id: string,
//     field: keyof JobExperience,
//     value: string | boolean | Date | undefined
//   ) => {
//     setExperiences(
//       experiences.map((exp) =>
//         exp.id === id ? { ...exp, [field]: value } : exp
//       )
//     );
//   };

//   const deleteExperience = (id: string) => {
//     setExperiences(experiences.filter((exp) => exp.id !== id));
//   };

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setExperiences((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       <h3 className="font-heading font-semibold text-[16px] text-black pb-[2px]">
//         Work Experience
//       </h3>
//       <p className="font-body font-normal text-[15px] text-gray-500 mb-4">
//         Enter your work experience, highlighting your key roles and
//         achievements. Share the impact you've made, and we'll help you refine it
//         into a polished, professional format.
//       </p>
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={experiences.map((exp) => exp.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="single"
//             collapsible
//             className="w-full space-y-2"
//             defaultValue="default-job"
//           >
//             {experiences.map((experience) => (
//               <SortableExperienceItem
//                 key={experience.id}
//                 experience={experience}
//                 onDelete={deleteExperience}
//                 onChange={handleInputChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       <Button
//         onClick={addNewExperience}
//         variant="outline"
//         className="mt-4 flex items-center text-primary hover:text-primary-dark"
//       >
//         <PlusCircle className="mr-2" />
//         Add New Experience
//       </Button>
//     </div>
//   );
// };

// export default WorkExperienceSection;

"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusCircle, Trash2, GripVertical } from "lucide-react";
import { CiSquarePlus } from "react-icons/ci";

import { Button } from "@/components/ui/button";
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
import SubSectionTitle from "@/components/SubSectionTitle";
import { BsTrash3 } from "react-icons/bs";
import { LiaGripVerticalSolid } from "react-icons/lia";
import { LuGripVertical } from "react-icons/lu";
import TrashIconComponent from "@/components/TrashIconComponent";

interface JobExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: { month: string; year: string };
  endDate: { month: string; year: string };
  isCurrentJob: boolean;
  location: string;
  description: string;
}

// const MonthYearPicker = ({
//   labelFirst,
//   labelSecond,
//   value,
//   onChange,
//   disabled = false,
// }: any) => {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const monthsShort = [
//     { value: "January", label: "January" },
//     { value: "February", label: "February" },
//     { value: "March", label: "March" },
//     { value: "April", label: "April" },
//   ];

//   const years = [
//     { value: "2024", label: "2024" },
//     { value: "2023", label: "2023" },
//     { value: "2022", label: "2022" },
//     { value: "2021", label: "2021" },
//     { value: "2020", label: "2020" },
//     { value: "2019", label: "2019" },
//     { value: "2018", label: "2018" },
//     { value: "2017", label: "2017" },
//     { value: "2016", label: "2016" },
//     { value: "2015", label: "2015" },
//     { value: "2014", label: "2014" },
//     { value: "2013", label: "2013" },
//     { value: "2012", label: "2012" },
//     { value: "2011", label: "2011" },
//     { value: "2010", label: "2010" },
//     { value: "2009", label: "2009" },
//     { value: "2008", label: "2008" },
//     { value: "2007", label: "2007" },
//     { value: "2006", label: "2006" },
//     { value: "2005", label: "2005" },
//     { value: "2004", label: "2004" },
//     { value: "2003", label: "2003" },
//     { value: "2002", label: "2002" },
//     { value: "2001", label: "2001" },
//     { value: "2000", label: "2000" },
//     { value: "1999", label: "1999" },
//     { value: "1998", label: "1998" },
//     { value: "1997", label: "1997" },
//     { value: "1996", label: "1996" },
//     { value: "1995", label: "1995" },
//     { value: "1994", label: "1994" },
//     { value: "1993", label: "1993" },
//     { value: "1992", label: "1992" },
//     { value: "1991", label: "1991" },
//     { value: "1990", label: "1990" },
//     { value: "1989", label: "1989" },
//     { value: "1988", label: "1988" },
//     { value: "1987", label: "1987" },
//     { value: "1986", label: "1986" },
//     { value: "1985", label: "1985" },
//     { value: "1984", label: "1984" },
//     { value: "1983", label: "1983" },
//     { value: "1982", label: "1982" },
//     { value: "1981", label: "1981" },
//     { value: "1980", label: "1980" },
//     { value: "1979", label: "1979" },
//     { value: "1978", label: "1978" },
//     { value: "1977", label: "1977" },
//     { value: "1976", label: "1976" },
//     { value: "1975", label: "1975" },
//     { value: "1974", label: "1974" },
//   ];

//   const currentYear = new Date().getFullYear();
//   // const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

//   return (
//     <div className="relative w-full flex items-center justify-center">
//       {/* <label className="absolute left-2 -top-2.5 text-xs bg-white px-1 text-gray-600 transition-all duration-200">
//         {label}
//       </label> */}
//       <div className="flex gap-2 w-full  items-center justify-center ">
//         <div className="w-1/2">
//           <FloatingLabelSelect
//             label={labelFirst}
//             // placeholder="Select Your Target Job"
//             options={monthsShort}
//           />
//         </div>
//         <div className="w-1/2">
//           <FloatingLabelSelect
//             label={labelSecond}
//             // placeholder="Select Your Target Job"
//             options={years}
//           />
//         </div>
//         {/* <select
//           className="w-1/2 border rounded px-2 py-1 text-sm"
//           value={value.month}
//           onChange={(e) => onChange({ ...value, month: e.target.value })}
//           disabled={disabled}
//         >
//           <option value="">Month</option>
//           {months.map((month) => (
//             <option key={month} value={month}>
//               {month}
//             </option>
//           ))}
//         </select> */}
//         {/* <select
//           className="w-1/2 border rounded px-2 py-1 text-sm"
//           value={value.year}
//           onChange={(e) => onChange({ ...value, year: e.target.value })}
//           disabled={disabled}
//         >
//           <option value="">Year</option>
//           {years.map((year) => (
//             <option key={year} value={year.toString()}>
//               {year}
//             </option>
//           ))}
//         </select> */}
//       </div>
//     </div>
//   );
// };

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

const SortableExperienceItem = ({
  experience,
  onDelete,
  onChange,
}: {
  experience: JobExperience;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof JobExperience, value: any) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: experience.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <AccordionItem
        value={experience.id}
        className="border rounded overflow-hidden mb-2"
      >
        <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 bg-red-d400 rounded ">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <LuGripVertical
                className="text-[20px] text-gray-400 mr-2 cursor-move"
                {...listeners}
              />
              <div className="text-left">
                <div className="font-semibold font-heading text-gray-500">
                  {experience.jobTitle || "New Job Experience"}
                  {experience.company ? `At ${experience.company}` : ""}{" "}
                </div>
                <div className="text-sm text-gray-500">
                  {experience.startDate.month && experience.startDate.year
                    ? `${experience.startDate.month} ${experience.startDate.year}`
                    : "Start Date"}{" "}
                  -{" "}
                  {experience.isCurrentJob
                    ? "Present"
                    : experience.endDate.month && experience.endDate.year
                    ? `${experience.endDate.month} ${experience.endDate.year}`
                    : "End Date"}
                </div>
              </div>
            </div>
            {/* <Trash2
              className="h-4 w-4 text-gray-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(experience.id);
              }}
            /> */}
            {/* <div className="w-[30px] h-[30px] shadow-sm rounded-sm border flex items-center justify-center">
              <BsTrash3
                className="text-[16px] text-gray-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(experience.id);
                }}
              />
            </div> */}
            <TrashIconComponent onDelete={() => onDelete(experience.id)} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 space-y-4">
          <div className="w-full h-auto flex gap-2">
            <div className="w-1/2">
              <FloatingLabelInput
                label="Job Title"
                inputType="text"
                inputClassName="border-gray-300"
                value={experience.jobTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(experience.id, "jobTitle", e.target.value)
                }
              />
            </div>
            <div className="w-1/2">
              <FloatingLabelInput
                label="Company Name"
                inputType="text"
                inputClassName="border-gray-300"
                value={experience.company}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(experience.id, "company", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex space-x-4 w-full bg-redd-400 h-[48px]">
            <MonthYearPicker
              labelFirst="Start Month"
              labelSecond="Start Year"
              value={experience.startDate}
              onChange={(value: any) =>
                onChange(experience.id, "startDate", value)
              }
            />
            <MonthYearPicker
              labelFirst="End Month"
              labelSecond="End Year"
              value={experience.endDate}
              onChange={(value: any) =>
                onChange(experience.id, "endDate", value)
              }
              disabled={experience.isCurrentJob}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={experience.isCurrentJob}
              onChange={(e) =>
                onChange(experience.id, "isCurrentJob", e.target.checked)
              }
              className="mr-2"
            />
            <label>Still working here</label>
          </div>
          <FloatingLabelInput
            label="Job Location"
            inputType="text"
            inputClassName="border-gray-300"
            value={experience.location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(experience.id, "location", e.target.value)
            }
          />
          <div className="relative">
            {/* <h4 className="font-heading font-semibold text-[14px] text-gray-900">
              Job Description
            </h4> */}
            <SubSectionTitle label="Job Description" />
            {/* <p className="font-body font-normal text-[15px] text-gray-500 pb-2">
              {`Outline your key tasks and responsibilities, showing the impact you've made. We'll refine it into a standout statement.`}
            </p> */}
            <TextareaField
              placeholder="Example: Managed a team of 8, improving project delivery time by 15%"
              value={experience.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChange(experience.id, "description", e.target.value)
              }
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

const WorkExperienceSection = () => {
  const [experiences, setExperiences] = useState<JobExperience[]>([
    {
      id: "default-job",
      jobTitle: "",
      company: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      isCurrentJob: false,
      location: "",
      description: "",
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addNewExperience = () => {
    const newExperience: JobExperience = {
      id: `job-${Date.now()}`,
      jobTitle: "",
      company: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      isCurrentJob: false,
      location: "",
      description: "",
    };
    setExperiences([...experiences, newExperience]);
  };

  const handleInputChange = (
    id: string,
    field: keyof JobExperience,
    value: any
  ) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              [field]: value,
              ...(field === "isCurrentJob" && value
                ? { endDate: { month: "", year: "" } }
                : {}),
            }
          : exp
      )
    );
  };

  const deleteExperience = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setExperiences((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="w-full h-auto">
      {/* <h3 className="font-heading font-semibold text-[16px] text-black pb-[8px] ">
        Work Experience
      </h3> */}
      <SectionTitle label="Work Experience" />
      {/* <p className="font-body font-normal text-[15px] text-gray-500 mb-4">
        Enter your work experience, highlighting your key roles and
        achievements. Share the impact you've made, and we'll help you refine it
        into a polished, professional format.
      </p> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={experiences.map((exp) => exp.id)}
          strategy={verticalListSortingStrategy}
        >
          <Accordion
            type="multiple"
            className="w-full space-y-2"
            defaultValue={["default-job"]}
          >
            {experiences.map((experience) => (
              <SortableExperienceItem
                key={experience.id}
                experience={experience}
                onDelete={deleteExperience}
                onChange={handleInputChange}
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>
      <AddButton label="Add New Experience" onClick={addNewExperience} />
    </div>
  );
};

export default WorkExperienceSection;
