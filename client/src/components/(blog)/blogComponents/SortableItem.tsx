import React, { forwardRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem = forwardRef<HTMLDivElement, SortableItemProps>(
  ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} className="relative">
        <div
          {...attributes}
          {...listeners}
          className="absolute left-0 top-0 bottom-0 flex items-center px-2 cursor-move"
        >
          <GripVertical className="w-6 h-6 text-gray-400" />
        </div>
        <div className="pl-10">{children}</div>
      </div>
    );
  }
);

SortableItem.displayName = "SortableItem";

export default SortableItem;
