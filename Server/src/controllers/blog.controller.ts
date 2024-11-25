// import { Request, Response } from "express";
// import { Blog } from "../models/Blog";
// const generateSlug = (title: string): string => {
//   return title
//     .toLowerCase()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-");
// };
// const createBlog = async (req: Request, res: Response) => {
//   const { title, excerpt, author } = req.body;

//   // Generate slug from title
//   const baseSlug = generateSlug(title);
//   let slug = baseSlug;
//   let counter = 1;

//   // Ensure unique slug
//   while (await Blog.exists({ slug })) {
//     slug = `${baseSlug}-${counter}`;
//     counter++;
//   }

//   // Create initial blog structure
//   const initialBlog = {
//     title,
//     slug,
//     status: "draft",
//     author: {
//       name: author.name,
//       email: author.email,
//       avatar: "", // Can be updated later
//       bio: "", // Can be updated later
//       socialLinks: {
//         twitter: "",
//         linkedin: "",
//         youtube: "",
//       },
//     },
//     heroImage: null,
//     excerpt,
//     readTime: 0, // Will be calculated when content is added
//     sections: [], // Empty initially
//     meta: {
//       description: excerpt,
//       keywords: [],
//       canonicalUrl: "",
//       ogImage: "",
//     },
//     categories: ["Uncategorized"],
//     tags: [],
//     stats: {
//       views: 0,
//       likes: 0,
//       shares: 0,
//       readingProgress: [],
//     },
//     settings: {
//       allowComments: true,
//       featured: false,
//       pinned: false,
//       enableNewsletter: true,
//       showTableOfContents: true,
//     },
//     version: 1,
//     history: [
//       {
//         version: 1,
//         updatedAt: new Date(),
//         updatedBy: {
//           name: author.name,
//           email: author.email,
//         },
//         changes: "Initial blog creation",
//       },
//     ],
//   };

//   const blog = new Blog(initialBlog);
//   const savedBlog = await blog.save();

//   res.status(201).json({
//     success: true,
//     data: savedBlog,
//     message: "Blog draft created successfully",
//   });
// };

// controllers/blogController.ts

import { Request, Response } from "express";
// import { Blog } from "../schemas/Blog";

import { z } from "zod";
import { Blog } from "../models/Blog";

// Validation schemas
const LinkSchema = z.object({
  text: z.string(),
  url: z.string().url(),
  type: z.enum(["internal", "external"]),
  openInNewTab: z.boolean().optional(),
});

const ImageSchema = z.object({
  url: z.string().url(),
  alt: z.string(),
  caption: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  linkTo: z.string().optional(),
});

const TextBlockSchema = z.object({
  text: z.string(),
  emphasis: z.enum(["none", "bold", "italic", "underline"]).optional(),
  color: z.string().optional(),
  links: z.array(LinkSchema).optional(),
  alignment: z.enum(["left", "center", "right", "justify"]).optional(),
});

const ListItemSchema = z.object({
  title: z.string().optional(),
  content: z.string(),
  icon: z.string().optional(),
  links: z.array(LinkSchema).optional(),
});

const SectionSchema = z.object({
  id: z.string(),
  type: z.string(),
  content: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    textBlocks: z.array(TextBlockSchema).optional(),
    images: z.array(ImageSchema).optional(),
    lists: z
      .array(
        z.object({
          type: z.enum(["bullet", "numbered", "checklist"]),
          items: z.array(ListItemSchema),
        })
      )
      .optional(),
    callout: z
      .object({
        type: z.enum(["info", "warning", "tip", "note"]),
        title: z.string(),
        content: z.string(),
        icon: z.string().optional(),
        links: z.array(LinkSchema).optional(),
      })
      .optional(),
  }),
  order: z.number(),
  isVisible: z.boolean().optional(),
});

// Helper Functions
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const calculateReadTime = (sections: any[]): number => {
  const WORDS_PER_MINUTE = 200;
  let totalWords = 0;

  sections.forEach((section) => {
    section.content.textBlocks?.forEach((block: { text: string }) => {
      totalWords += block.text.split(/\s+/).length;
    });

    section.content.lists?.forEach((list: { items: any[] }) => {
      list.items.forEach((item) => {
        totalWords += item.content.split(/\s+/).length;
        if (item.title) {
          totalWords += item.title.split(/\s+/).length;
        }
      });
    });

    if (section.content.callout) {
      totalWords += section.content.callout.content.split(/\s+/).length;
      totalWords += section.content.callout.title.split(/\s+/).length;
    }
  });

  return Math.ceil(totalWords / WORDS_PER_MINUTE);
};

// Controllers
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, excerpt, author } = req.body;

    // Input validation
    if (!title || !excerpt || !author?.name) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Generate unique slug
    let baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (await Blog.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const initialBlog = {
      title,
      slug,
      status: "draft",
      author: {
        name: author.name,
        email: "",
        avatar: "",
        bio: "",
        socialLinks: {
          twitter: "",
          linkedin: "",
          youtube: "",
        },
      },
      heroImage: null,
      excerpt,
      readTime: 0,
      sections: [],
      meta: {
        description: excerpt,
        keywords: [],
        canonicalUrl: "",
        ogImage: "",
      },
      categories: ["Uncategorized"],
      tags: [],
      stats: {
        views: 0,
        likes: 0,
        shares: 0,
        readingProgress: [],
      },
      settings: {
        allowComments: false,
        featured: false,
        pinned: false,
        enableNewsletter: true,
        showTableOfContents: true,
      },
      version: 1,
      history: [
        {
          version: 1,
          updatedAt: new Date(),
          updatedBy: {
            name: author.name,
            email: author.email,
          },
          changes: "Initial blog creation",
        },
      ],
    };

    const blog = new Blog(initialBlog);
    const savedBlog = await blog.save();

    res.status(201).json({
      success: true,
      data: savedBlog,
      message: "Blog draft created successfully",
    });
  } catch (error: any) {
    console.error("Create Blog Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: error.message,
    });
  }
};

export const updateBlogContent = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { sections, heroImage, meta, categories, tags, settings, status } =
      req.body;

    // Validate sections using Zod
    try {
      z.array(SectionSchema).parse(sections);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid section data",
        error: error,
      });
    }

    const existingBlog = await Blog.findOne({ slug });
    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const readTime = calculateReadTime(sections);

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      {
        $set: {
          sections,
          heroImage,
          meta,
          categories,
          tags,
          settings,
          status,
          readTime,
          version: existingBlog.version + 1,
        },
        $push: {
          history: {
            version: existingBlog.version + 1,
            updatedAt: new Date(),
            updatedBy: {
              name: existingBlog.author.name,
              email: existingBlog.author.email,
            },
            changes: "Content updated from dashboard",
          },
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      data: updatedBlog,
      message: "Blog content updated successfully",
    });
  } catch (error: any) {
    console.error("Update Blog Content Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update blog content",
      error: error.message,
    });
  }
};

export const updateBlogMetadata = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { title, excerpt, meta, categories, tags, settings } = req.body;

    const existingBlog = await Blog.findOne({ slug });
    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    let newSlug = slug;
    if (title && title !== existingBlog.title) {
      newSlug = generateSlug(title);
      let counter = 1;
      while (
        await Blog.exists({ slug: newSlug, _id: { $ne: existingBlog._id } })
      ) {
        newSlug = `${generateSlug(title)}-${counter}`;
        counter++;
      }
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      {
        $set: {
          title: title || existingBlog.title,
          slug: newSlug,
          excerpt: excerpt || existingBlog.excerpt,
          meta: meta || existingBlog.meta,
          categories: categories || existingBlog.categories,
          tags: tags || existingBlog.tags,
          settings: settings || existingBlog.settings,
          version: existingBlog.version + 1,
        },
        $push: {
          history: {
            version: existingBlog.version + 1,
            updatedAt: new Date(),
            updatedBy: {
              name: existingBlog.author.name,
              email: existingBlog.author.email,
            },
            changes: "Metadata updated from dashboard",
          },
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      data: updatedBlog,
      message: "Blog metadata updated successfully",
      slugChanged: newSlug !== slug,
    });
  } catch (error: any) {
    console.error("Update Blog Metadata Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update blog metadata",
      error: error.message,
    });
  }
};

export const updateBlogStatus = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { status } = req.body;

    if (!status || !["draft", "published", "archived"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const existingBlog = await Blog.findOne({ slug });
    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      {
        $set: {
          status,
          version: existingBlog.version + 1,
        },
        $push: {
          history: {
            version: existingBlog.version + 1,
            updatedAt: new Date(),
            updatedBy: {
              name: existingBlog.author.name,
              email: existingBlog.author.email,
            },
            changes: `Status changed to ${status}`,
          },
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      data: updatedBlog,
      message: `Blog status updated to ${status}`,
    });
  } catch (error: any) {
    console.error("Update Blog Status Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update blog status",
      error: error.message,
    });
  }
};

export const updateAuthorProfile = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { avatar, bio, socialLinks } = req.body;

    const existingBlog = await Blog.findOne({ slug });
    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Validate social links
    if (socialLinks) {
      const validSocialPlatforms = ["twitter", "linkedin", "youtube"];
      const invalidPlatforms = Object.keys(socialLinks).filter(
        (platform) => !validSocialPlatforms.includes(platform)
      );

      if (invalidPlatforms.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid social platforms: ${invalidPlatforms.join(", ")}`,
        });
      }
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      {
        $set: {
          "author.avatar": avatar || existingBlog.author.avatar,
          "author.bio": bio || existingBlog.author.bio,
          "author.socialLinks": socialLinks || existingBlog.author.socialLinks,
          version: existingBlog.version + 1,
        },
        $push: {
          history: {
            version: existingBlog.version + 1,
            updatedAt: new Date(),
            updatedBy: {
              name: existingBlog.author.name,
              email: existingBlog.author.email,
            },
            changes: "Author profile updated",
          },
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      data: updatedBlog,
      message: "Author profile updated successfully",
    });
  } catch (error: any) {
    console.error("Update Author Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update author profile",
      error: error.message,
    });
  }
};
