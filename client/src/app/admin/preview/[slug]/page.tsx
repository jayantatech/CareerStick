import { Metadata } from "next";
import api from "@/lib/api";
import BlogPostPageComponent, {
  BlogPost,
} from "@/components/(blog)/BlogPostClient";
import Header from "@/components/headers/Header";
import Footer from "@/components/Footer";
// import BlogPostClient, { BlogPost } from "./BlogPostClient";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const response = await api.get(`/blog/get/${params.slug}`);

    if (response.data.success) {
      const blogPost = response.data.data as BlogPost;

      return {
        title: blogPost.seo.title || blogPost.title,
        description: blogPost.seo.description || blogPost.title,

        // Canonical URL Configuration
        metadataBase: new URL("https://careerstick.com"),
        alternates: {
          canonical: `/blog/${blogPost.slug}`,
        },

        // Open Graph Metadata
        openGraph: {
          title: blogPost.seo.title || blogPost.title,
          description: blogPost.seo.description || blogPost.title,
          type: "article", // Add article type for blog posts
          publishedTime: blogPost.createdAt, // Consider adding publication date
          authors: [blogPost.author.name], // Add author information
          images: blogPost.heroImage?.url
            ? [
                {
                  url: blogPost.heroImage.url,
                  width: 1200,
                  height: 630,
                  alt: blogPost.heroImage.alt || blogPost.title, // Add alt text for image
                },
              ]
            : [],
        },

        // Twitter Card Metadata
        twitter: {
          card: "summary_large_image",
          title: blogPost.seo.title || blogPost.title,
          description: blogPost.seo.description || blogPost.title,
          images: blogPost.heroImage?.url ? [blogPost.heroImage.url] : [],
        },

        // Robots Configuration
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
      };
    }
  } catch (error) {
    console.error("Metadata generation error:", error);
  }

  return {
    title: "Blog Post",
    description: "Blog post details",
  };
}

export default async function BlogPostPage() {
  return (
    <>
      <Header />
      <BlogPostPageComponent />;
      <Footer />
    </>
  );
}
