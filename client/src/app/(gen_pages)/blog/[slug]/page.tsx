// "use client";
// import { FC, useEffect, useRef, useState } from "react";
// import ContentWrapper from "@/components/ContentWrapper";
// import BlogHeroSection from "@/components/(blog)/blogViewComponents/BlogHeroSection";
// import BlogSidebar from "@/components/(blog)/blogViewComponents/BlogSidebar";
// import {
//   Heading1,
//   Heading2,
//   Heading3,
//   Heading4,
//   Heading5,
//   Heading6,
// } from "@/components/(blog)/blogViewComponents/BlogHeadings";
// import api from "@/lib/api";
// import { useParams } from "next/navigation";
// import BlogImageBlock from "@/components/(blog)/blogViewComponents/BlogImageBlock";
// import NoteBox from "@/components/(blog)/blogViewComponents/NoteInfo";
// import NumberPointsBox from "@/components/(blog)/blogViewComponents/NumberPointsBox";
// import KeyPointsBox from "@/components/(blog)/blogViewComponents/KeyPointsBox";
// import QuickAnswer from "@/components/(blog)/blogViewComponents/QuickAnswer";
// import FAQBox from "@/components/(blog)/blogViewComponents/FAQBox";
// import BlogArticleLoader from "@/components/(blog)/blogViewComponents/BlogArticleLoader";
// import { notFound } from "next/navigation"; // Import notFound
// import { AxiosError } from "axios";

// // Callout Component Mapping
// const CalloutComponents = {
//   tip: NoteBox,
//   note: NoteBox,
//   info: QuickAnswer,
//   warning: NoteBox,
// };

// // List Component Mapping
// const ListComponents = {
//   // bullet: NumberPointsBox,
//   bullet: KeyPointsBox,
//   number: NumberPointsBox,
//   checklist: NumberPointsBox,
// };

// // Block Type Rendering Components
// const BlockRenderer: FC<{ block: any }> = ({ block }) => {
//   switch (block.type) {
//     case "text":
//       return (
//         <div
//           className="prose max-w-full mb-4 leading-relaxed text-lg text-muted-foreground font-blogText"
//           dangerouslySetInnerHTML={{ __html: block.content.html || "" }}
//         />
//       );

//     case "image":
//       return block.content.url ? (
//         <BlogImageBlock
//           imageAlt={block.content.alt}
//           imageUrl={block.content.url}
//         />
//       ) : null;

//     case "list":
//       const ListComponent =
//         ListComponents[block.content.type as keyof typeof ListComponents] ||
//         KeyPointsBox;
//       return <ListComponent items={block.content.items} />;

//     case "heading":
//       const HeadingComponents = {
//         h1: Heading1,
//         h2: Heading2,
//         h3: Heading3,
//         h4: Heading4,
//         h5: Heading5,
//         h6: Heading6,
//       };

//       const HeadingComponent =
//         HeadingComponents[
//           block.content.level as keyof typeof HeadingComponents
//         ] || Heading2;

//       return <HeadingComponent title={block.content.text} />;

//     case "callout":
//       const CalloutComponent =
//         CalloutComponents[
//           block.content.type as keyof typeof CalloutComponents
//         ] || NoteBox;
//       return (
//         <CalloutComponent
//           title={block.content.title}
//           content={block.content.content}
//         />
//       );

//     case "faq":
//       return (
//         <FAQBox
//           questions={block.content.question}
//           answers={block.content.answer}
//         />
//       );
//     default:
//       return null;
//   }
// };

// const SectionRenderer: FC<{
//   sections: any[];
//   scrollToSection: (id: string) => void;
// }> = ({ sections, scrollToSection }) => {
//   return (
//     <div className="space-y-4">
//       {sections.map((section, sectionIndex) => (
//         <section
//           key={section.id || sectionIndex}
//           id={section.id}
//           className="mb-4 "
//         >
//           {section.title && <Heading2 title={section.title} />}
//           {section.blocks?.map((block: any, blockIndex: number) => (
//             <BlockRenderer
//               key={block.id || `${sectionIndex}-${blockIndex}`}
//               block={block}
//             />
//           ))}
//         </section>
//       ))}
//     </div>
//   );
// };

// export default function BlogPostPage() {
//   const [blogPost, setBlogPost] = useState<any>(null);
//   const [error, setError] = useState<boolean>(false);
//   const [activeSection, setActiveSection] = useState("");
//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const pathname = useParams();
//   const sectionRefsArray = useRef<HTMLElement[]>([]);

//   // const sections =
//   //   blogPost?.sections?.map((section: any) => ({
//   //     id: section.id,
//   //     title: section.navTitle || section.title,
//   //   })) || [];
//   const sections =
//     blogPost?.sections?.map((section: any, index: number) => ({
//       id: section.id,
//       title: section.navTitle || section.title,
//       index: index,
//     })) || [];

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//       setActiveSection(id); //added line
//     }
//   };

//   useEffect(() => {
//     const fetchBlogPost = async () => {
//       try {
//         const response = await api.get(`/blog/get/${pathname.slug}`);
//         console.log("response data is", response.data);
//         setBlogPost(response.data.data);
//       } catch (error) {
//         console.error("Error fetching blog post", error);
//         if (error instanceof AxiosError && error.response?.status === 404) {
//           // notFound();
//           setError(true);
//         }
//       }
//     };

//     if (pathname?.slug) {
//       fetchBlogPost();
//     }
//   }, [pathname?.slug]);

//   // useEffect(() => {
//   //   if (!blogPost || !sections.length) return;

//   //   const observer = new IntersectionObserver(
//   //     (entries) => {
//   //       entries.forEach((entry) => {
//   //         if (entry.isIntersecting) {
//   //           setActiveSection(entry.target.id);
//   //         }
//   //       });
//   //     },
//   //     {
//   //       threshold: 0.5,
//   //       rootMargin: "-20% 0px -20% 0px",
//   //     }
//   //   );

//   //   sections.forEach(({ id }: { id: string }) => {
//   //     const element = document.getElementById(id);
//   //     if (element) observer.observe(element);
//   //   });

//   //   return () => observer.disconnect();
//   // }, [blogPost, sections]);
//   // useEffect(() => {
//   //   if (!blogPost || !sections.length) return;

//   //   // Create observer
//   //   observerRef.current = new IntersectionObserver(
//   //     (entries) => {
//   //       entries.forEach((entry) => {
//   //         if (entry.isIntersecting) {
//   //           setActiveSection(entry.target.id);
//   //         }
//   //       });
//   //     },
//   //     {
//   //       threshold: 0.5,
//   //       rootMargin: "-20% 0px -20% 0px",
//   //     }
//   //   );

//   //   // Observe sections
//   //   sections.forEach(({ id }: { id: string }) => {
//   //     const element = document.getElementById(id);
//   //     if (element) {
//   //       sectionRefs.current[id] = element;
//   //       observerRef.current!.observe(element);
//   //     }
//   //   });

//   //   // Cleanup
//   //   return () => {
//   //     if (observerRef.current) {
//   //       observerRef.current.disconnect();
//   //     }
//   //   };
//   // }, [blogPost, sections]);
//   useEffect(() => {
//     if (!blogPost || !sections.length) return;

//     // Collect section references
//     sectionRefsArray.current = sections
//       .map((section: any) => document.getElementById(section.id))
//       .filter(Boolean) as HTMLElement[];

//     // Function to determine active section
//     const determineActiveSection = () => {
//       // Check if scrolled to bottom of page
//       if (
//         window.innerHeight + window.scrollY >=
//         document.body.offsetHeight - 100 // Small buffer
//       ) {
//         // If at bottom, activate last section
//         setActiveSection(sections[sections.length - 1].id);
//         return;
//       }

//       // Reverse the array to prioritize sections from bottom to top
//       const reversedSections = [...sectionRefsArray.current].reverse();

//       for (const section of reversedSections) {
//         const rect = section.getBoundingClientRect();

//         // Check if section is at least partially in view
//         if (
//           rect.top <= window.innerHeight * 0.5 &&
//           rect.bottom >= window.innerHeight * 0.5
//         ) {
//           setActiveSection(section.id);
//           break;
//         }
//       }
//     };

//     // Add scroll event listener
//     window.addEventListener("scroll", determineActiveSection);

//     // Initial determination
//     determineActiveSection();

//     // Cleanup
//     return () => {
//       window.removeEventListener("scroll", determineActiveSection);
//     };
//   }, [blogPost, sections]);

//   if (error) {
//     notFound();
//   }
//   if (!blogPost) return <BlogArticleLoader />;
//   // if (!blogPost) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen bg-background">
//       {blogPost.heroImage?.url && (
//         <BlogHeroSection
//           date={blogPost.createdAt}
//           imageAlt={blogPost.heroImage.alt}
//           imageUrl={blogPost.heroImage.url}
//           title={blogPost.title}
//           readTime={blogPost.readTime}
//           description="This is a default description for the blog post. It should be engaging and provide a brief overview of what readers can expect from the article."
//         />
//       )}

//       <ContentWrapper>
//         <div className="relative flex gap-8 py-8">
//           <BlogSidebar
//             sections={sections}
//             activeSection={activeSection}
//             scrollToSection={scrollToSection}
//           />

//           <div className="min-w-0 flex-1 space-y-12 lg:pl-8">
//             <SectionRenderer
//               sections={blogPost.sections}
//               scrollToSection={scrollToSection}
//             />
//           </div>
//         </div>
//       </ContentWrapper>
//     </div>
//   );
// }
"use client";
import { FC, useEffect, useRef, useState, useMemo } from "react";
import ContentWrapper from "@/components/ContentWrapper";
import BlogHeroSection from "@/components/(blog)/blogViewComponents/BlogHeroSection";
import BlogSidebar from "@/components/(blog)/blogViewComponents/BlogSidebar";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "@/components/(blog)/blogViewComponents/BlogHeadings";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import BlogImageBlock from "@/components/(blog)/blogViewComponents/BlogImageBlock";
import NoteBox from "@/components/(blog)/blogViewComponents/NoteInfo";
import NumberPointsBox from "@/components/(blog)/blogViewComponents/NumberPointsBox";
import KeyPointsBox from "@/components/(blog)/blogViewComponents/KeyPointsBox";
import QuickAnswer from "@/components/(blog)/blogViewComponents/QuickAnswer";
import FAQBox from "@/components/(blog)/blogViewComponents/FAQBox";
import BlogArticleLoader from "@/components/(blog)/blogViewComponents/BlogArticleLoader";
import { notFound } from "next/navigation";
import { AxiosError } from "axios";

// Interfaces matching MongoDB Schema
interface HeroImage {
  url?: string;
  alt?: string;
}

interface Link {
  text: string;
  url: string;
  type: "internal" | "external";
  openInNewTab?: boolean;
  doFollow?: boolean;
}

interface BlockContent {
  html?: string;
  text?: string;
  level?: string;
  type?: "text" | "image" | "list" | "heading" | "callout" | "faq";
  links?: Link[];
  url?: string;
  alt?: string;
  items?: string[];
  question?: string;
  answer?: string;
  title?: string;
  content?: string;
}

interface Block {
  id: string;
  type: string;
  content: BlockContent;
}

interface Section {
  id: string;
  title: string;
  navTitle: string;
  blocks: Block[];
}

interface Author {
  name: string;
  bio: string;
  avatar: string;
}

export interface BlogPost {
  heroImage?: HeroImage;
  title: string;
  slug: string;
  readTime: number;
  description?: {
    html: string;
    links: Link[];
  };
  sections: Section[];
  author: Author;
  createdAt: string;
}

// Callout Component Mapping
const CalloutComponents = {
  tip: NoteBox,
  note: NoteBox,
  info: QuickAnswer,
  warning: NoteBox,
};

// List Component Mapping
const ListComponents = {
  bullet: KeyPointsBox,
  number: NumberPointsBox,
  checklist: NumberPointsBox,
};

// Block Renderer Component
const BlockRenderer: FC<{ block: Block }> = ({ block }) => {
  switch (block.type) {
    case "text":
      return (
        <div
          className="prose blog-paragraph max-w-full mb-4 leading-relaxed text-[18px] text-muted-foreground font-blogText"
          dangerouslySetInnerHTML={{ __html: block.content.html || "" }}
        />
      );

    case "image":
      return block.content.url ? (
        <BlogImageBlock
          imageAlt={block.content.alt || ""}
          imageUrl={block.content.url}
        />
      ) : null;

    case "list":
      const ListComponent =
        ListComponents[block.content.type as keyof typeof ListComponents] ||
        KeyPointsBox;
      return <ListComponent items={block.content.items || []} />;

    case "heading":
      const HeadingComponents = {
        h1: Heading1,
        h2: Heading2,
        h3: Heading3,
        h4: Heading4,
        h5: Heading5,
        h6: Heading6,
      };

      const HeadingComponent =
        HeadingComponents[
          block.content.level as keyof typeof HeadingComponents
        ] || Heading2;

      return <HeadingComponent title={block.content.text || ""} />;

    case "callout":
      const CalloutComponent =
        CalloutComponents[
          block.content.type as keyof typeof CalloutComponents
        ] || NoteBox;
      return (
        <CalloutComponent
          title={block.content.title || ""}
          content={block.content.content || ""}
        />
      );

    case "faq":
      return (
        <FAQBox
          questions={block.content.title || ""}
          answers={block.content.content || ""}
        />
      );
    default:
      return null;
  }
};

// Section Renderer Component
const SectionRenderer: FC<{
  sections: Section[];
  scrollToSection: (id: string) => void;
}> = ({ sections }) => {
  return (
    <div className="space-y-4">
      {sections.map((section, sectionIndex) => (
        <section
          key={section.id || `section-${sectionIndex}`}
          id={section.id}
          className="mb-12"
        >
          {section.title && <Heading2 title={section.title} />}
          {section.blocks?.map((block, blockIndex) => (
            <BlockRenderer
              key={`${section.id || sectionIndex}-${blockIndex}`}
              block={block}
            />
          ))}
        </section>
      ))}
    </div>
  );
};

export default function BlogPostPage() {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = useParams();
  const sectionRefsArray = useRef<HTMLElement[]>([]);

  const sections = useMemo(
    () =>
      blogPost?.sections?.map((section, index) => ({
        id: section.id,
        title: section.navTitle || section.title,
        index: index,
      })) || [],
    [blogPost]
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await api.get(`/blog/get/${pathname.slug}`);
        if (!response.data.success) {
          setError(true);
        }
        if (response.data.success) {
          setBlogPost(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching blog post", error);
        if (error instanceof AxiosError && error.response?.status === 404) {
          setError(true);
        }
      }
    };

    if (pathname?.slug) {
      fetchBlogPost();
    }
  }, [pathname?.slug]);

  useEffect(() => {
    if (!blogPost || !sections.length) return;

    // Collect section references
    sectionRefsArray.current = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    // Function to determine active section
    const determineActiveSection = () => {
      // Check if scrolled to bottom of page
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100 // Small buffer
      ) {
        // If at bottom, activate last section
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      // Reverse the array to prioritize sections from bottom to top
      const reversedSections = [...sectionRefsArray.current].reverse();

      for (const section of reversedSections) {
        const rect = section.getBoundingClientRect();

        // Check if section is at least partially in view
        if (
          rect.top <= window.innerHeight * 0.5 &&
          rect.bottom >= window.innerHeight * 0.5
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", determineActiveSection);

    // Initial determination
    determineActiveSection();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", determineActiveSection);
    };
  }, [blogPost, sections]);

  if (error) {
    notFound();
  }
  if (!blogPost) return <BlogArticleLoader />;

  return (
    <div className="min-h-screen bg-background ">
      {blogPost.heroImage?.url && (
        <BlogHeroSection
          date={blogPost.createdAt}
          imageAlt={blogPost.heroImage.alt || ""}
          imageUrl={blogPost.heroImage.url}
          title={blogPost.title}
          readTime={blogPost.readTime}
          description={blogPost.description?.html || ""}
        />
      )}

      <ContentWrapper>
        <div className="relative flex gap-8 py-8">
          <BlogSidebar
            sections={sections}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
          />

          <div className="min-w-0 flex-1 space-y-12 lg:pl-8">
            <SectionRenderer
              sections={blogPost.sections}
              scrollToSection={scrollToSection}
            />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}
