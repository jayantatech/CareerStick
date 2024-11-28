"use client";

import { FC } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ResumeThree } from "../../../../public/img";
// import { ResumeThree } from "@/public/img";

interface SidebarProps {
  sections: { id: string; title: string }[];
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const BlogSidebar: FC<SidebarProps> = ({
  sections,
  activeSection,
  scrollToSection,
}) => {
  return (
    <div className="sticky top-24 hidden h-fit w-72 shrink-0 lg:block">
      {" "}
      {/*w-64  */}
      <nav className="flex flex-col gap-2">
        <p className="text-lg font-medium text-muted-foreground">
          Make a Resume{" "}
        </p>
        {sections.map(({ id, title }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`text-left text-sm hover:text-primary ${
              activeSection === id
                ? "font-medium text-primary"
                : "text-muted-foreground"
            }`}
          >
            {title}
          </button>
        ))}
      </nav>
      {/* CTA Card */}
      <Card className="mt-8 p-3 rounded">
        <div className="w-full h-auto p-1.5 bg-[#EFF6FF] rounded">
          <Image src={ResumeThree} alt="Resume Hero Image" priority={true} />
        </div>

        <Button className="mt-4 w-full font-semibold font-heading capitalize text-white rounded hover:scale-[.98] text-[16px]">
          Build My Resume{" "}
        </Button>
      </Card>
    </div>
  );
};

export default BlogSidebar;
