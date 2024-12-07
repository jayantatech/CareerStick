import React from "react";

interface HeadingProps {
  title: string;
  className?: string;
}

export const Heading1 = ({ title }: HeadingProps) => (
  <div>
    <h1 className="scroll-m-20 text-4xl pb-2 font-bold font-heading tracking-tight lg:text-5xl">
      {title}
    </h1>
  </div>
);

export const Heading2 = ({ title, className }: HeadingProps) => (
  <h2
    className={`scroll-m-20  pb-2 text-3xl max-lg:text-2xl font-semibold font-heading tracking-tight transition-colors first:mt-0 ${className}`}
  >
    {title}
  </h2>
);

export const Heading3 = ({ title }: HeadingProps) => (
  <h3 className="scroll-m-20 pb-2 text-2xl max-lg:text-xl font-semibold font-heading tracking-tight">
    {title}
  </h3>
);

export const Heading4 = ({ title }: HeadingProps) => (
  <h4 className="scroll-m-20 pb-2 text-xl font-semibold max-lg:text-lg font-heading tracking-tight">
    {title}
  </h4>
);

export const Heading5 = ({ title }: HeadingProps) => (
  <h5 className="scroll-m-20 pb-2 text-lg font-heading font-semibold tracking-tight">
    {title}
  </h5>
);

export const Heading6 = ({ title }: HeadingProps) => (
  <h6 className="scroll-m-20 pb-2 text-base font-heading font-semibold tracking-tight">
    {title}
  </h6>
);
