// schemas/Blog.ts
import mongoose, { Document, Schema } from "mongoose";

// Base interfaces for different content types
interface Link {
  text: string;
  url: string;
  type: "internal" | "external";
  openInNewTab?: boolean;
}

interface ImageContent {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  linkTo?: string;
}

interface TextContent {
  text: string;
  emphasis?: "none" | "bold" | "italic" | "underline";
  color?: string;
  links?: Link[];
  alignment?: "left" | "center" | "right" | "justify";
}

interface ListItem {
  title?: string;
  content: string;
  icon?: string;
  links?: Link[];
}

interface CodeBlock {
  code: string;
  language: string;
  fileName?: string;
  showLineNumbers?: boolean;
  highlightedLines?: number[];
}

interface CustomComponent {
  type: string;
  props: Record<string, any>;
}

interface TableContent {
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
}

// Schema Definitions
const linkSchema = new Schema(
  {
    text: { type: String, required: true },
    url: { type: String, required: true },
    type: {
      type: String,
      enum: ["internal", "external"],
      required: true,
      default: "internal",
    },
    openInNewTab: { type: Boolean, default: false },
  },
  { _id: false }
);

const imageContentSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, required: true },
    caption: String,
    width: Number,
    height: Number,
    linkTo: String,
  },
  { _id: false }
);

const textContentSchema = new Schema(
  {
    text: { type: String, required: true },
    emphasis: {
      type: String,
      enum: ["none", "bold", "italic", "underline"],
      default: "none",
    },
    color: String,
    links: [linkSchema],
    alignment: {
      type: String,
      enum: ["left", "center", "right", "justify"],
      default: "left",
    },
  },
  { _id: false }
);

const listItemSchema = new Schema(
  {
    title: String,
    content: { type: String, required: true },
    icon: String,
    links: [linkSchema],
  },
  { _id: false }
);

// const codeBlockSchema = new Schema(
//   {
//     code: { type: String, required: true },
//     language: { type: String, required: true },
//     fileName: String,
//     showLineNumbers: { type: Boolean, default: true },
//     highlightedLines: [Number],
//   },
//   { _id: false }
// );

const customComponentSchema = new Schema(
  {
    type: { type: String, required: true },
    props: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false }
);

const tableContentSchema = new Schema(
  {
    headers: [String],
    rows: [[Schema.Types.Mixed]],
    caption: String,
  },
  { _id: false }
);

const sectionSchema = new Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      required: true,
    },
    content: {
      title: String,
      subtitle: String,
      textBlocks: [textContentSchema],
      images: [imageContentSchema],
      lists: [
        {
          type: {
            type: String,
            enum: ["bullet", "numbered", "checklist"],
            required: true,
          },
          items: [listItemSchema],
        },
      ],
      //   codeBlocks: [codeBlockSchema],
      customComponents: [customComponentSchema],
      tables: [tableContentSchema],
      callout: {
        type: {
          type: String,
          enum: ["info", "warning", "tip", "note"],
        },
        title: String,
        content: String,
        icon: String,
        links: [linkSchema],
      },
    },
    order: { type: Number, required: true },
    isVisible: { type: Boolean, default: true },
  },
  { _id: false }
);

// const commentSchema = new Schema({
//   author: {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     avatar: String,
//   },
//   content: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date },
//   status: {
//     type: String,
//     enum: ["pending", "approved", "rejected"],
//     default: "pending",
//   },
//   replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
// });

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    author: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      avatar: String,
      bio: String,
      socialLinks: {
        twitter: String,
        linkedin: String,
        youtube: String,
      },
    },
    heroImage: imageContentSchema,
    excerpt: { type: String, required: true, maxlength: 500 },
    readTime: { type: Number, required: true },
    sections: [sectionSchema],
    meta: {
      description: { type: String, required: true },
      keywords: [{ type: String }],
      canonicalUrl: String,
      ogImage: String,
    },
    categories: [
      {
        type: String,
        required: true,
      },
    ],
    tags: [String],
    relatedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    stats: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      readingProgress: [
        {
          userId: Schema.Types.ObjectId,
          progress: Number,
          lastRead: Date,
        },
      ],
    },
    settings: {
      allowComments: { type: Boolean, default: true },
      featured: { type: Boolean, default: false },
      pinned: { type: Boolean, default: false },
      enableNewsletter: { type: Boolean, default: true },
      showTableOfContents: { type: Boolean, default: true },
    },
    // comments: [commentSchema],
    version: { type: Number, default: 1 },
    history: [
      {
        version: Number,
        updatedAt: Date,
        updatedBy: {
          name: String,
          email: String,
        },
        changes: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
blogSchema.index({ slug: 1 });
blogSchema.index({ "author.email": 1 });
blogSchema.index({ categories: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ status: 1 });
blogSchema.index({ createdAt: -1 });
blogSchema.index({ "stats.views": -1 });
blogSchema.index({ "sections.content.links.url": 1 });

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
// Example JSON data with links
// const exampleBlogPost = {
//   title: "How to Make a Resume in 2024 | Beginner's Guide",
//   slug: "how-to-make-resume-2024",
//   status: "published",
//   author: {
//     name: "John Doe",
//     email: "john@example.com",
//     avatar: "https://example.com/avatars/john.jpg",
//     bio: "Career Coach & Resume Expert",
//     socialLinks: {
//       twitter: "https://twitter.com/johndoe",
//       linkedin: "https://linkedin.com/in/johndoe",
//     },
//   },
//   heroImage: {
//     url: "/images/resume-hero-2024.jpg",
//     alt: "Professional resume template example",
//     caption: "Modern resume template for 2024",
//   },
//   excerpt:
//     "Learn how to create a professional, ATS-friendly resume that stands out in 2024. Complete guide with examples and templates.",
//   readTime: 35,
//   sections: [
//     {
//       id: "introduction",
//       type: "introduction",
//       content: {
//         title: "Introduction",
//         subtitle: "Why Your Resume Matters in 2024",
//         textBlocks: [
//           {
//             text: "Creating a modern resume requires understanding ATS systems and employer preferences.",
//             emphasis: "none",
//             links: [
//               {
//                 text: "ATS systems",
//                 url: "/blog/understanding-ats",
//                 type: "internal",
//               },
//             ],
//           },
//           {
//             text: "According to recent studies, over 75% of resumes are rejected by ATS before reaching human recruiters.",
//             emphasis: "none",
//             links: [
//               {
//                 text: "recent studies",
//                 url: "https://example.com/resume-statistics",
//                 type: "external",
//                 openInNewTab: true,
//               },
//             ],
//           },
//         ],
//       },
//       order: 1,
//       isVisible: true,
//     },
//     {
//       id: "resume-steps",
//       type: "steps",
//       content: {
//         title: "Steps to Create Your Resume",
//         lists: [
//           {
//             type: "numbered",
//             items: [
//               {
//                 title: "Choose Your Format",
//                 content: "Select the best format for your experience level",
//                 links: [
//                   {
//                     text: "resume format guide",
//                     url: "/blog/resume-formats",
//                     type: "internal",
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       order: 2,
//     },
//     {
//       id: "comparison-table",
//       type: "table",
//       content: {
//         tables: [
//           {
//             headers: ["Format Type", "Best For", "Pros", "Cons"],
//             rows: [
//               [
//                 "Chronological",
//                 "Experienced Professionals",
//                 "Shows career progression",
//                 "May highlight gaps",
//               ],
//               [
//                 "Functional",
//                 "Career Changers",
//                 "Focuses on skills",
//                 "Less preferred by ATS",
//               ],
//               [
//                 "Combination",
//                 "Varied Experience",
//                 "Versatile format",
//                 "Can be lengthy",
//               ],
//             ],
//             caption: "Compare different resume formats",
//           },
//         ],
//       },
//       order: 3,
//     },
//   ],
//   meta: {
//     description: "Complete guide to creating a professional resume in 2024...",
//     keywords: ["resume", "job search", "career", "2024", "ATS-friendly"],
//     canonicalUrl: "https://example.com/blog/how-to-make-resume-2024",
//     ogImage: "https://example.com/og/resume-guide-2024.jpg",
//   },
//   categories: ["Career Advice", "Job Search"],
//   tags: ["resume", "job hunting", "career development", "ATS"],
//   stats: {
//     views: 1520,
//     likes: 143,
//     shares: 89,
//     readingProgress: [
//       {
//         userId: "12345",
//         progress: 0.75,
//         lastRead: new Date(),
//       },
//     ],
//   },
//   settings: {
//     allowComments: true,
//     featured: true,
//     pinned: false,
//     enableNewsletter: true,
//     showTableOfContents: true,
//   },
//   comments: [
//     {
//       author: {
//         name: "Jane Smith",
//         email: "jane@example.com",
//         avatar: "https://example.com/avatars/jane.jpg",
//       },
//       content:
//         "This guide was incredibly helpful! The ATS tips were especially useful.",
//       status: "approved",
//       createdAt: new Date(),
//     },
//   ],
//   version: 1,
//   history: [
//     {
//       version: 1,
//       updatedAt: new Date(),
//       updatedBy: {
//         name: "John Doe",
//         email: "john@example.com",
//       },
//       changes: "Initial publication",
//     },
//   ],
// };
