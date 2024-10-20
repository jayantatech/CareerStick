import React from "react";

const SectionTitle = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <h3
      className={`font-heading font-semibold text-[16px] text-black pb-[6px]  ${
        className ? className : ""
      }`}
    >
      {label}
    </h3>
  );
};

export default SectionTitle;
