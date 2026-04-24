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
