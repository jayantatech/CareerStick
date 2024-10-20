import React from "react";

const ContentWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`px-6 py-2 bg-red-600 ml-4 ${className}`}>{children}</div>
  );
};

export default ContentWrapper;
