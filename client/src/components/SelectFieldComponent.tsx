// import * as React from "react";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "./ui/label";

// export function SelectFieldComponent({
//   children,
//   triggerClassName,
//   label,
// }: {
//   children: React.ReactNode;
//   triggerClassName?: string;
//   label: string;
// }) {
//   return (
//     <>
//       <Label>{label}</Label>
//       <Select>
//         <SelectTrigger
//           className={`min-w-[280px] bg-blue-400 font-body font-semibold text-[15px] min-h-[42px] border-slate-200 outline-none ring-0 ${triggerClassName}`}
//         >
//           {children}
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectLabel>North America</SelectLabel>
//             <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
//             <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
//             <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
//             <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//             <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
//             <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
//             <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
//             <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//             <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
//             <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
//             <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
//             <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//             <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
//             <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
//             <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
//             <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//             <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
//             <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
//             <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
//             <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//             <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
//             <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
//             <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
//             <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//             <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
//             <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
//             <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
//             <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//             <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
//             <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
//             <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
//             <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//             <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
//             <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
//             <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
//             <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//             <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
//             <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
//             <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
//             <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//             <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
//             <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
//             <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
//             <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
//             <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
//             <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//     </>
//   );
// }

// {
//   /* <SelectValue placeholder="Select a timezone" /> */
// }

// "use client";
// import React, { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";

// interface FloatingLabelSelectProps {
//   label: string;
//   placeholder?: string;
//   triggerClassName?: string;
//   options: { value: string; label: string }[];
// }

// const FloatingLabelSelect = ({
//   label,
//   placeholder,
//   triggerClassName = "",
//   options,
// }: FloatingLabelSelectProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [value, setValue] = useState("");

//   return (
//     <div className="relative">
//       <Select
//         onValueChange={(newValue) => setValue(newValue)}
//         onOpenChange={(open) => setIsOpen(open)}
//       >
//         <SelectTrigger
//           className={`w-full h-[40px] bg-white rounded px-2 font-body font-semibold pb-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary ${triggerClassName}`}
//         >
//           <SelectValue placeholder={placeholder} />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             {options.map((option) => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//       <Label
//         className={`absolute left-2 transition-all duration-200 px-1 z-0 ${
//           isOpen || value
//             ? "-top-2.5 text-[13px] rounded text-black bg-white px-1"
//             : "top-2 text-[15px] text-gray-400"
//         }`}
//       >
//         {label}
//       </Label>
//     </div>
//   );
// };

// export default FloatingLabelSelect;

"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FloatingLabelSelectProps {
  label: string;
  placeholder?: string;
  triggerClassName?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const FloatingLabelSelect = ({
  label,
  placeholder,
  triggerClassName = "",
  options,
  value,
  onChange,
  disabled = false,
}: FloatingLabelSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Select
        value={value}
        onValueChange={(newValue) => onChange(newValue)}
        onOpenChange={(open) => setIsOpen(open)}
        disabled={disabled}
      >
        <SelectTrigger
          className={`w-full h-[40px] bg-white rounded px-2 font-body font-semibold pb-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary ${triggerClassName}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Label
        className={`absolute left-2 transition-all duration-200 px-1 z-0 ${
          isOpen || value
            ? "-top-2.5 text-[13px] rounded text-black bg-white px-1"
            : "top-2 text-[15px] text-gray-400"
        }`}
      >
        {label}
      </Label>
    </div>
  );
};

export default FloatingLabelSelect;
