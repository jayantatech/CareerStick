import { FC, ReactNode } from "react";

const ContentWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="w-full max-w-[1270px] mx-auto px-4">{children}</div>;
};

export default ContentWrapper;
