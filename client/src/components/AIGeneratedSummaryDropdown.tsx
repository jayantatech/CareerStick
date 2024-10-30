"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsChatRightTextFill } from "react-icons/bs";

export default function AIGeneratedSummaryDropdown({
  onSelect,
  summaries,
  className,
}: {
  onSelect: (text: string) => void;
  summaries: string[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (text: string) => {
    onSelect(text);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 absolute bottom-3 right-2 ${
            className ? className : ""
          }`}
        >
          <BsChatRightTextFill />
          AI Generated Summary
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[480px] ">
        <div className="p-4">
          <h3 className="font-semibold mb-3">
            AI Generated Professional Summary
          </h3>
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {summaries.map((summary, index) => (
              <p
                key={index}
                onClick={() => handleSelect(summary)}
                className="mb-3 p-2 cursor-pointer hover:bg-gray-100 rounded transition-colors"
              >
                {summary}
              </p>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
