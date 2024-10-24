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
  const selectId = React.useId();

  return (
    <div className="relative">
      <Select
        value={value}
        onValueChange={(newValue) => onChange(newValue)}
        onOpenChange={(open) => setIsOpen(open)}
        disabled={disabled}
      >
        <SelectTrigger
          id={selectId}
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
        htmlFor={selectId}
        onClick={() => {
          const trigger = document.getElementById(selectId);
          trigger?.click();
        }}
        className={`absolute left-2 transition-all duration-200 px-1 z-0 cursor-pointer ${
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
