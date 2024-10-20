import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextareaFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
}

export function TextareaField({
  placeholder,
  value,
  onChange,
  label,
}: TextareaFieldProps) {
  return (
    <div className="grid w-full gap-1.5">
      {label && (
        <Label
          htmlFor="message"
          className="font-heading font-semibold text-[14px] text-gray-900"
        >
          {label}
        </Label>
      )}
      <Textarea
        placeholder={placeholder}
        id="message"
        value={value}
        onChange={onChange}
        className="w-full min-h-[148px] max-h-[240px] text-[16px] font-body rounded bg-white px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-gray-400"
      />
    </div>
  );
}
