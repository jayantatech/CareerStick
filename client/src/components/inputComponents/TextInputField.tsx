// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export function TextInputField({
//   label,
//   placeholder,
//   inputClassName,
//   inputType,
// }: {
//   label: string;
//   inputType?: "email" | "number" | "text";
//   placeholder: string;
//   inputClassName?: string;
// }) {
//   return (
//     <div className="grid w-full items-center gap-1.5 relative">
//       <Label htmlFor="email">{label}</Label>
//       <Input
//         type={inputType || "text"}
//         id="email"
//         placeholder={placeholder}
//         className={`w-full min-h-[42px] bg-white rounded pl-2 font-body font-semibold text-[16px] border-slate-200 focus:outline-0 ${inputClassName}`}
//       />
//     </div>
//   );
// }import React, { useState } from 'react';

// "use client";
// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// interface FloatingLabelInputProps {
//   label: string;
//   placeholder?: string;
//   inputType?: "email" | "number" | "text";
//   inputClassName?: string;
// }

// const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
//   label,
//   placeholder,
//   inputType = "text",
//   inputClassName = "",
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [inputValue, setInputValue] = useState("");

//   const handleFocus = () => setIsFocused(true);
//   const handleBlur = () => setIsFocused(inputValue.length > 0);
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setInputValue(e.target.value);

//   return (
//     <div className="relative">
//       <Input
//         type={inputType}
//         id={label.toLowerCase().replace(/\s+/g, "-")}
//         className={`peer w-full h-[40px] bg-white rounded px-2 font-body font-semibold pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-primary ${inputClassName}`}
//         placeholder={placeholder}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         onChange={handleChange}
//       />
//       <Label
//         htmlFor={label.toLowerCase().replace(/\s+/g, "-")}
//         className={`absolute left-2 transition-all duration-200 px-1  ${
//           isFocused || inputValue
//             ? "-top-2.5 text-[13px] rounded text-black bg-secondary px-1"
//             : "top-2 text-[15px] text-gray-400"
//         }`}
//       >
//         {label}
//       </Label>
//     </div>
//   );
// };

// export default FloatingLabelInput;

// "use client";
// import React, { useState, useId } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// interface FloatingLabelInputProps {
//   label: string;
//   placeholder?: string;
//   inputType?: "email" | "number" | "text";
//   inputClassName?: string;
//   value: string; // Add this line
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add this line
// }

// const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
//   label,
//   placeholder,
//   inputType = "text",
//   inputClassName = "",
//   onChange,
// }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const id = useId();

//   const handleFocus = () => setIsFocused(true);
//   const handleBlur = () => {
//     setIsFocused(false);
//   };
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setInputValue(e.target.value);

//   return (
//     <div className="relative">
//       <Input
//         type={inputType}
//         id={id}
//         className={`peer w-full h-[40px] text-[16px] bg-white rounded px-2 font-body font-semibold pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-primary ${inputClassName}`}
//         placeholder={placeholder}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         onChange={handleChange}
//         value={inputValue}
//       />
//       <Label
//         htmlFor={id}
//         className={`absolute left-2 transition-all duration-200 px-1 ${
//           isFocused || inputValue
//             ? "-top-2.5 text-[13px] rounded text-black bg-white px-1 py-0"
//             : "top-2 text-[15px] text-gray-400"
//         }`}
//       >
//         {label}
//       </Label>
//     </div>
//   );
// };

// export default FloatingLabelInput;
"use client";
import React, { useState, useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FloatingLabelInputProps {
  label: string;
  placeholder?: string;
  inputType?: "email" | "number" | "text" | "password";
  inputClassName?: string;
  labelClassName?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  placeholder,
  inputType = "text",
  inputClassName = "",
  labelClassName = "",
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(value?.length > 0);

  return (
    <div className="relative">
      <Input
        type={inputType}
        id={id}
        className={`peer w-full h-[40px] text-[16px] bg-white rounded px-2 font-body font-semibold pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1 focus:ring-primary ${inputClassName}`}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
      />
      <Label
        htmlFor={id}
        className={`absolute left-2 transition-all duration-200 px-1 ${labelClassName} ${
          isFocused || value
            ? "-top-2.5 text-[13px] rounded text-black bg-white px-1 py-0"
            : "top-2 text-[15px] text-gray-400"
        }`}
      >
        {label}
      </Label>
    </div>
  );
};

export default FloatingLabelInput;
