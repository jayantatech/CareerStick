"use client";

import { FC, ReactNode } from "react";

interface SectionContentProps {
  id: string;
  title: string;
  children?: ReactNode;
}

const SectionContent: FC<SectionContentProps> = ({ id, title, children }) => {
  return (
    <section id={id}>
      {title && <h2 className="text-3xl font-bold">{title}</h2>}
      <div className="mt-4">{children}</div>
    </section>
  );
};

export default SectionContent;
