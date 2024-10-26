import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableSectionProps {
  id: string;
  children: React.ReactNode;
}

export const SortableSection = ({ id, children }: SortableSectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? "opacity-50" : ""}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 h-full w-6 flex items-center justify-center cursor-grab opacity-0 hover:opacity-100 transition-opacity"
      >
        <GripVertical className="text-gray-400" size={20} />
      </div>
      <div className="pl-8">{children}</div>
    </div>
  );
};
