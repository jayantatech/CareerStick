import React from "react";

interface HeadingProps {
  title: string;
}

export const Heading1 = ({ title }: HeadingProps) => (
  <div>
    <h1 className="scroll-m-20 text-4xl font-bold font-heading tracking-tight lg:text-5xl">
      {title}
    </h1>
  </div>
);

export const Heading2 = ({ title }: HeadingProps) => (
  <div>
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold font-heading tracking-tight transition-colors first:mt-0">
      {title}
    </h2>
  </div>
);

export const Heading3 = ({ title }: HeadingProps) => (
  <div>
    <h3 className="scroll-m-20 text-2xl font-semibold font-heading tracking-tight">
      {title}
    </h3>
  </div>
);

export const Heading4 = ({ title }: HeadingProps) => (
  <div>
    <h4 className="scroll-m-20 text-xl font-semibold font-heading tracking-tight">
      {title}
    </h4>
  </div>
);

export const Heading5 = ({ title }: HeadingProps) => (
  <div>
    <h5 className="scroll-m-20 text-lg font-heading font-semibold tracking-tight">
      {title}
    </h5>
  </div>
);

export const Heading6 = ({ title }: HeadingProps) => (
  <div>
    <h6 className="scroll-m-20 text-base font-heading font-semibold tracking-tight">
      {title}
    </h6>
  </div>
);
