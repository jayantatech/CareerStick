import React from "react";
import { BsTrash3 } from "react-icons/bs";

interface TrashIconProps {
  className?: string;
  onDelete: () => void;
}

const TrashIconComponent = ({ className, onDelete }: TrashIconProps) => {
  return (
    <div
      className={`w-[30px] h-[30px] shadow-sm rounded-sm border flex items-center justify-center ${
        className ? className : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
    >
      <BsTrash3 className="text-[16px] text-gray-500 cursor-pointer" />
    </div>
  );
};

export default TrashIconComponent;
