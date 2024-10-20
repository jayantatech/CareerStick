import React from "react";
import { Button } from "./ui/button";
import { CiSquarePlus } from "react-icons/ci";

const AddButton = ({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={`mt-4 rounded flex items-center text-gray-600 font-semibold  hover:text-primary-dark ${
        className ? className : ""
      }`}
    >
      <CiSquarePlus className="mr-1 text-[18px]" />
      {label}
    </Button>
  );
};

export default AddButton;
