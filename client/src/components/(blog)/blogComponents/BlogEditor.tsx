"use client";

import React, { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import SectionBlock from "./SectionBlock";
import HeroImageBlock from "./HeroImageBlock";
import TitleBlock from "./TitleBlock";
import AuthorBlock from "./AuthorBlock";
import RelatedPostsBlock from "./RelatedPostsBlock";
import StatusSelector from "./StatusSelector";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import SEOBlock from "./SEOBlock";
import DescriptionBlock from "./DescriptionBlock";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import useAuth from "@/lib/hooks/useAuth";

interface HeroImage {
  url: string;
  alt: string;
}
interface BlockContent {
  html?: string;
  url?: string;
  alt?: string;
  type?: string;
  items?: string[];
  question?: string;
  answer?: string;
  level?: string;
  text?: string;
  title?: string;
  links?: { text: string; url: string }[];
}
interface Author {
  name: string;
  bio: string;
  avatar: string;
}
type BlockType = "text" | "image" | "list" | "faq" | "callout" | "heading";

interface Block {
  id: string;
  type: BlockType;
  content: BlockContent;
}

interface Section {
  id: string;
  title: string;
  navTitle: string;
  blocks: Block[];
}

interface SEO {
  title: string;
  description: string;
  canonicalUrl: string;
}

interface Link {
  text: string;
  url: string;
  type: "internal" | "external";
  doFollow: boolean;
}

interface Description {
  html: string;
  links: Link[];
}

interface BlogPost {
  heroImage: HeroImage;
  title: string;
  description: Description;
  sections: Section[];
  author: Author;
  relatedPosts: string[];
  status: string;
  slug: string;
  seo: SEO;
}

// interface BlockContent {
//   [key: string]: any;
// }
export default function BlogEditor() {
  const router = useRouter();
  const param = useParams();
  const { user, isLoading } = useAuth();

  // Initial state with type annotation
  const [blogPost, setBlogPost] = useState<BlogPost>({
    heroImage: { url: "", alt: "" },
    title: "",
    description: { html: "", links: [] },
    slug: "",
    sections: [],
    author: { name: "", bio: "", avatar: "" },
    relatedPosts: [],
    status: "draft",
    seo: {
      title: "",
      description: "",
      canonicalUrl: "",
    },
  });

  // Add early routing check
  React.useEffect(() => {
    if (!param.blog_id || param.blog_id.length !== 24) {
      router.push("/admin/blog-posts");
    }
  }, [param.blog_id, router]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setBlogPost((prevBlogPost) => {
        const oldIndex = prevBlogPost.sections.findIndex(
          (section) => section.id === active.id
        );
        const newIndex = prevBlogPost.sections.findIndex(
          (section) => section.id === over.id
        );

        return {
          ...prevBlogPost,
          sections: arrayMove(prevBlogPost.sections, oldIndex, newIndex),
        };
      });
    }
  }, []);

  const addSection = useCallback(() => {
    setBlogPost((prevBlogPost) => ({
      ...prevBlogPost,
      sections: [
        ...prevBlogPost.sections,
        { id: uuidv4(), title: "", navTitle: "", blocks: [] },
      ],
    }));
  }, []);

  const updateSection = useCallback((id: string, content: Section) => {
    setBlogPost((prevBlogPost) => ({
      ...prevBlogPost,
      sections: prevBlogPost.sections.map((section) =>
        section.id === id ? { ...section, ...content } : section
      ),
    }));
  }, []);

  const deleteSection = useCallback((id: string) => {
    setBlogPost((prevBlogPost) => ({
      ...prevBlogPost,
      sections: prevBlogPost.sections.filter((section) => section.id !== id),
    }));
  }, []);

  const saveBlogPost = useCallback(async () => {
    if (!param.blog_id || !user?._id || isLoading) return;

    try {
      const response = await api.post(`/blog/save/${param.blog_id}`, {
        blogData: blogPost,
        userId: user._id,
      });
      toast.success("Blog post saved successfully");
      console.log("Save response:", response.data);
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog");
    }
  }, [blogPost, param.blog_id, user?._id, isLoading]);

  const getBlogPost = useCallback(async () => {
    if (!user?._id || isLoading || !param.blog_id) return;

    try {
      const response = await api.post(`/blog/article/${param.blog_id}`, {
        userId: user._id,
      });

      if (response.data.success) {
        const blogData = response.data.data;
        setBlogPost({
          heroImage: blogData.heroImage || { url: "", alt: "" },
          title: blogData.title || "",
          description: blogData.description || { html: "", links: [] },
          slug: blogData.slug || "",
          sections: blogData.sections || [],
          author: blogData.author || { name: "", bio: "", avatar: "" },
          relatedPosts: blogData.relatedPosts || [],
          status: blogData.status || "draft",
          seo: blogData.seo || {
            title: "",
            description: "",
            canonicalUrl: "",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("Failed to get blog");
    }
  }, [param.blog_id, user?._id, isLoading]);

  useEffect(() => {
    getBlogPost();
  }, [getBlogPost]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <HeroImageBlock
        content={blogPost.heroImage}
        onChange={(heroImage) =>
          setBlogPost((prev) => ({ ...prev, heroImage }))
        }
      />
      <TitleBlock
        content={blogPost.title}
        onChange={(title) => setBlogPost((prev) => ({ ...prev, title }))}
      />

      <DescriptionBlock
        content={blogPost.description}
        onChange={(description) =>
          setBlogPost((prev) => ({ ...prev, description }))
        }
      />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blogPost.sections.map((section) => section.id)}
          strategy={verticalListSortingStrategy}
        >
          {blogPost.sections.map((section) => (
            <SortableItem key={section.id} id={section.id}>
              <SectionBlock
                content={{
                  id: section.id,
                  title: section.title,
                  navTitle: section.navTitle,
                  blocks: section.blocks,
                }}
                onChange={(content) => updateSection(section.id, content)}
                onDelete={() => deleteSection(section.id)}
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      <Button onClick={addSection} variant="outline">
        Add Section
      </Button>
      <AuthorBlock
        author={blogPost.author}
        onChange={(author) => setBlogPost((prev) => ({ ...prev, author }))}
      />
      <RelatedPostsBlock
        relatedPosts={blogPost.relatedPosts}
        onChange={(relatedPosts) =>
          setBlogPost((prev) => ({ ...prev, relatedPosts }))
        }
      />
      <SEOBlock
        seo={blogPost.seo}
        onChange={(seo) =>
          setBlogPost((prev) => ({ ...prev, slug: seo.canonicalUrl, seo }))
        }
      />

      <StatusSelector
        status={blogPost.status}
        onChange={(status) => setBlogPost((prev) => ({ ...prev, status }))}
      />
      <Button onClick={saveBlogPost} className="text-white" variant="default">
        Save Blog Post
      </Button>
    </div>
  );
}
