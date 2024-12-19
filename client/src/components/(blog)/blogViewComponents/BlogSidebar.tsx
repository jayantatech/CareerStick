// "use client";

// import { FC } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { ResumeThree } from "../../../../public/img";
// import NewsletterCard from "./NewsletterSidebar";
// // import { ResumeThree } from "@/public/img";

// interface SidebarProps {
//   sections: { id: string; title: string }[];
//   activeSection: string;
//   scrollToSection: (id: string) => void;
// }

// const BlogSidebar: FC<SidebarProps> = ({
//   sections,
//   activeSection,
//   scrollToSection,
// }) => {
//   return (
//     <div className="sticky top-24 hidden h-fit w-72 shrink-0 lg:block">
//       {" "}
//       {/*w-64  */}
//       <nav className="flex flex-col gap-2">
//         <p className="text-lg font-medium text-muted-foreground">
//           Table of Contents :{" "}
//         </p>
//         {sections.map(({ id, title }) => (
//           <button
//             key={id}
//             onClick={() => scrollToSection(id)}
//             className={`text-left text-sm hover:text-primary ${
//               activeSection === id
//                 ? "font-medium text-primary"
//                 : "text-muted-foreground"
//             }`}
//           >
//             {title}
//           </button>
//         ))}
//       </nav>
//       {/* CTA Card */}
//       {/* <Card className="mt-8 p-3 rounded">
//         <div className="w-full h-auto p-1.5 bg-[#EFF6FF] rounded">
//           <Image src={ResumeThree} alt="Resume Hero Image" priority={true} />
//         </div>

//         <Button className="mt-4 w-full font-semibold font-heading capitalize text-white rounded hover:scale-[.98] text-[16px]">
//           Build My Resume{" "}
//         </Button>
//       </Card> */}
//       <NewsletterCard />
//     </div>
//   );
// };

// export default BlogSidebar;

// "use client";
// import { FC } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { ResumeThree } from "../../../../public/img";
// import NewsletterCard from "./NewsletterSidebar";

// interface SidebarProps {
//   sections: { id: string; title: string }[];
//   activeSection: string;
//   scrollToSection: (id: string) => void;
// }

// const BlogSidebar: FC<SidebarProps> = ({
//   sections,
//   activeSection,
//   scrollToSection,
// }) => {
//   return (
//     <div className="sticky top-24 hidden h-fit w-72 shrink-0 lg:block">
//       <p className="text-base pb-1 font-medium text-muted-foreground sticky top-0 left-0 bg-white">
//         Table of Contents:{" "}
//       </p>
//       <nav className="flex flex-col gap-2 max-h-[200px] h-auto overflow-y-scroll custom-scrollbar bg-red-d300">
// {[
//   { id: "toc", title: "Table of Contents" },
//   { id: "toc", title: "Table of Contents" },
//   { id: "toc", title: "Table of Contents" },
//   { id: "toc", title: "Table of Contents" },
//   { id: "toc", title: "Table of Contents" },
//   { id: "toc", title: "Table of Contents" },
//   { id: "toc", title: "Table of Contents" },
//   { id: "toc", title: "Table of Contents" },
// ].map(({ id, title }) => (
//           <button
//             key={id}
//             onClick={() => scrollToSection(id)}
//             className={`
//               text-left text-sm border-l-2 pl-2
//               hover:text-primary font-blogText
//               transition-colors duration-200
//               ${
//                 activeSection === id
//                   ? "font-bold text-primary border-l-2 border-primary pl-2"
//                   : "text-muted-foreground hover:pl-2 hover:border-l-2 hover:border-primary/30 border-transparent"
//               }
//             `}
//           >
//             {title}
//           </button>
//         ))}
//       </nav>
//       <NewsletterCard />
//     </div>
//   );
// };

// export default BlogSidebar;

"use client";

import { FC, useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import NewsletterCard from "./NewsletterSidebar";

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
  const [showScrollbar, setShowScrollbar] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScrollHeight = () => {
      if (navRef.current) {
        setShowScrollbar(navRef.current.scrollHeight > 168);
      }
    };

    checkScrollHeight();
    window.addEventListener("resize", checkScrollHeight);

    return () => {
      window.removeEventListener("resize", checkScrollHeight);
    };
  }, [sections]);

  return (
    <div className="sticky top-20 hidden h-fit w-72 shrink-0 lg:block">
      <Card className=" shadow-none rounded border-none">
        <h2 className="text-lg font-semibold text-foreground font-heading blogTitleColor mb-4 sticky top-0 bg-background z-10">
          Table of Contents
        </h2>
        <nav
          ref={navRef}
          className={`flex flex-col gap-2 max-h-[168px] ${
            showScrollbar
              ? "overflow-y-auto custom-scrollbar pr-2"
              : "overflow-y-hidden"
          }`}
        >
          {sections.map(({ id, title }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`
                text-left text-sm py-0.5 px-2 
                hover:bg-primary/10   hover:text-primary
                transition-all duration-200 
                ${
                  activeSection === id
                    ? "font-medium text-primary border-l-2 border-primary"
                    : "text-muted-foreground blogTitleColor border-transparent border-l-2"
                }
              `}
            >
              {title}
            </button>
          ))}
        </nav>
      </Card>
      <div className="mt-6">
        <NewsletterCard />
      </div>
    </div>
  );
};

export default BlogSidebar;
