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
import { useParams, usePathname } from "next/navigation";
import BlogImageBlock from "@/components/(blog)/blogViewComponents/BlogImageBlock";
import NoteBox from "@/components/(blog)/blogViewComponents/NoteInfo";
import NumberPointsBox from "@/components/(blog)/blogViewComponents/NumberPointsBox";
import KeyPointsBox from "@/components/(blog)/blogViewComponents/KeyPointsBox";
import QuickAnswer from "@/components/(blog)/blogViewComponents/QuickAnswer";
import FAQBox from "@/components/(blog)/blogViewComponents/FAQBox";
import BlogArticleLoader from "@/components/(blog)/blogViewComponents/BlogArticleLoader";
import { notFound } from "next/navigation";
import { AxiosError } from "axios";
import useAuth from "@/lib/hooks/useAuth";

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

interface Seo {
  title?: string;
  description?: string;
  canonicalUrl?: string;
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
  seo: Seo;
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
  numbered: NumberPointsBox,
  checklist: NumberPointsBox,
};

const BlockRenderer: FC<{ block: Block }> = ({ block }) => {
  switch (block.type) {
    case "text":
      return (
        <div
          className="prose blog-paragraph  max-w-full mb-4 blogTextColor leading-relaxed text-[18px] text-muted-foreground font-blogText"
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
          questions={block.content.question || ""}
          answers={block.content.answer || ""}
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
    <div>
      {sections.map((section, sectionIndex) => (
        <section
          key={section.id || `section-${sectionIndex}`}
          id={section.id}
          className="mb-10"
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

export default function BlogPostPageTwo() {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = useParams();
  const urlPath = usePathname();
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

  console.log("pathname", pathname);

  const { user, isLoading, isAuthenticated } = useAuth();

  // useEffect(() => {
  //   const isAdminPath =
  //     urlPath?.split("/").includes("admin", "app") || urlPath === "admin";

  //   const fetchBlogPost = async () => {
  //     try {
  //       const response = await api.get(`/blog/get/${pathname.slug}`);
  //       if (!response.data.success) {
  //         setError(true);
  //       }
  //       if (response.data.success) {
  //         console.log("blog data from api", response.data.data);
  //         setBlogPost(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching blog post", error);
  //       if (error instanceof AxiosError && error.response?.status === 404) {
  //         setError(true);
  //       }
  //     }
  //   };

  //   if (pathname?.slug) {
  //     fetchBlogPost();
  //   }
  // }, [pathname?.slug]);

  useEffect(() => {
    // const isAdminPath =
    //   urlPath?.split("/").includes("admin") || urlPath === "admin";

    const fetchBlogPost = async () => {
      try {
        // Check if the URL contains 'admin/preview'

        if (urlPath.includes("admin/preview")) {
          if (isLoading) return;
          if (!user?._id) return;

          // API call for admin preview with userId in body
          console.log("admin preview is now running");
          const response = await api.post(
            `/blog/get/admin-preview/${pathname.slug}`,
            {
              userId: user?._id,
            }
          );

          if (!response.data.success) {
            setError(true);
          }

          if (response.data.success) {
            console.log("blog data from admin preview api", response.data.data);
            setBlogPost(response.data.data);
          }
        } else {
          console.log("user blog preview is now running");
          const response = await api.get(`/blog/get/${pathname.slug}`);

          if (!response.data.success) {
            setError(true);
          }

          if (response.data.success) {
            console.log("blog data from api", response.data.data);
            setBlogPost(response.data.data);
          }
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
  }, [pathname?.slug, urlPath, isAuthenticated, user, isLoading]);
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
    <>
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
    </>
  );
}
