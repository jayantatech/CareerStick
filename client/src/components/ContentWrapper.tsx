// import React from "react";

// const ContentWrapper = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={`px-6 py-2 bg-red-600 ml-4 ${className}`}>{children}</div>
//   );
// };

// export default ContentWrapper;

import { FC, ReactNode } from "react";

const ContentWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="w-full max-w-[1270px] mx-auto px-4">{children}</div>;
};

export default ContentWrapper;
