import React from "react";

const SubSectionTitle = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <h4
      className={`font-heading font-semibold text-[14px] text-gray-900 mb-[6px] ${
        className ? className : ""
      }`}
    >
      {label}
    </h4>
  );
};

export default SubSectionTitle;
