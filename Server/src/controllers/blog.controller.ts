// import { Request, Response } from "express";
// import { BlockContent, Blog, Section } from "../models/Blog";
// import mongoose from "mongoose";
// import User from "../models/User";

// export const calculateReadingTime = (sections: Section[]): number => {
//   // Average reading speed (words per minute)
//   const WORDS_PER_MINUTE = 200;

//   // Function to count words in a block of content
//   const countWordsInContent = (content: BlockContent): number => {
//     // Prioritize text content, fall back to HTML if text is not available
//     const textToCount = content.text || content.html || "";

//     // Remove HTML tags and count words
//     const strippedText = textToCount.replace(/<[^>]*>/g, "");
//     const words = strippedText.trim().split(/\s+/);

//     // Filter out empty strings
//     return words.filter((word) => word.length > 0).length;
//   };

//   // Calculate total words across all sections
//   const totalWords = sections.reduce((sectionTotal, section) => {
//     const sectionWords = section.blocks.reduce((blockTotal, block) => {
//       return blockTotal + countWordsInContent(block.content);
//     }, 0);
//     return sectionTotal + sectionWords;
//   }, 0);

//   // Calculate reading time in minutes, rounding up
//   const readingTime = Math.ceil(totalWords / WORDS_PER_MINUTE);

//   return readingTime;
// };
// export const createBlog = async (req: Request, res: Response) => {
//   console.log("Creating blog...");
//   try {
//     const newBlog = new Blog({
//       heroImage: {
//         url: "",
//         alt: "",
//       },
//       title: "",
//       description: {
//         html: "",
//         links: [],
//       },
//       sections: [],
//       author: {
//         name: "",
//         bio: "",
//         avatar: "",
//       },
//       relatedPosts: [],
//       status: "draft",
//       seo: {
//         title: "",
//         description: "",
//         canonicalUrl: "",
//       },
//     });

//     const savedBlog = await newBlog.save();

//     if (!savedBlog) {
//       return res.status(500).json({
//         message: "Failed to create blog post",
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Blog post created successfully",
//       blogId: savedBlog._id,
//     });
//   } catch (error) {
//     console.error("Error creating blog:", error);

//     res.status(500).json({
//       message: "Failed to create blog post",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };
// // Get all blog posts
// export const getAllBlogs = async (req: Request, res: Response) => {
//   try {
//     const blogs = await Blog.find({});

//     if (!blogs) {
//       return res.status(404).json({
//         message: "No blog posts found",
//         success: false,
//       });
//     }

//     const dataToSend = blogs.map((blog) => ({
//       id: blog._id,
//       title: blog.title,
//       url: blog.slug || "",
//       imageUrl: blog.heroImage.url || "",
//       author: blog.author || { name: "", bio: "", avatar: "" },
//       description: blog?.description?.html || "",
//       createdAt: blog.createdAt || "",
//       updatedAt: blog.updatedAt || "",
//       status: blog.status,
//     }));

//     if (!dataToSend) {
//       return res.status(404).json({
//         message: "No blog posts found",
//         success: false,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Blogs retrieved successfully",
//       data: dataToSend,
//     });
//   } catch (error) {
//     console.error("Error retrieving blogs:", error);
//     res.status(500).json({
//       message: "Failed to retrieve blog posts",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };

// // Get a single blog post by ID
// export const getBlogById = async (req: Request, res: Response) => {
//   try {
//     console.log("getBlogById called");
//     const { blogId } = req.params;
//     const blog = await Blog.findById(blogId);

//     if (!blog) {
//       return res.status(404).json({
//         message: "Blog post not found",
//       });
//     }

//     res.status(200).json({
//       message: "Blog post retrieved successfully",
//       success: true,
//       data: blog,
//     });
//   } catch (error) {
//     console.error("Error retrieving blog:", error);
//     res.status(500).json({
//       message: "Failed to retrieve blog post",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };
// export const getBlogBySlug = async (req: Request, res: Response) => {
//   try {
//     const { slug } = req.params;
//     const blog = await Blog.findOne({ slug });

//     if (!blog) {
//       return res.status(404).json({
//         message: "Blog post not found",
//       });
//     }

//     res.status(200).json({
//       message: "Blog post retrieved successfully",
//       data: blog,
//     });
//   } catch (error) {
//     console.error("Error retrieving blog:", error);
//     res.status(500).json({
//       message: "Failed to retrieve blog post",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };

// // Update a blog post

// export const updateBlog = async (req: Request, res: Response) => {
//   try {
//     const { blogId } = req.params;
//     const { blogData, userId } = req.body;

//     // Use findById and then save to ensure full data persistence
//     const existingBlog = await Blog.findById(blogId);

//     if (!existingBlog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog post not found",
//       });
//     }

//     // Merge the new data with existing blog
//     existingBlog.heroImage = blogData.heroImage;
//     existingBlog.title = blogData.title;
//     existingBlog.description = blogData.description;
//     existingBlog.slug = blogData.slug;
//     existingBlog.sections = blogData.sections;
//     existingBlog.author = blogData.author;
//     existingBlog.relatedPosts = blogData.relatedPosts;
//     existingBlog.status = blogData.status;
//     existingBlog.seo = blogData.seo;

//     // Save the updated blog

//     existingBlog.readTime = calculateReadingTime(blogData.sections);
//     const updatedBlog = await existingBlog.save();

//     res.status(200).json({
//       success: true,
//       message: "Blog post updated successfully",
//       data: updatedBlog,
//     });
//   } catch (error) {
//     console.error("Error updating blog:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update blog post",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };
// // Delete a blog post
// export const deleteBlog = async (req: Request, res: Response) => {
//   try {
//     const { blogId } = req.params;
//     const { userId } = req.body;
//     console.log("req.body for blog delete", req.body, "blogId", blogId);
//     if (!blogId) {
//       return res.status(400).json({
//         success: false,
//         message: "Blog post ID is required",
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid user ID",
//       });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (user.subscribedPlan !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "not authorized",
//       });
//     }

//     const deletedBlog = await Blog.findByIdAndDelete(blogId);

//     if (!deletedBlog) {
//       return res.status(404).json({
//         message: "Blog post not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Blog post deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting blog:", error);
//     res.status(500).json({
//       message: "Failed to delete blog post",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };
import { Request, Response } from "express";
import { BlockContent, Blog, Section } from "../models/Blog";
import mongoose from "mongoose";
import User from "../models/User";

export const calculateReadingTime = (sections: Section[]): number => {
  // Average reading speed (words per minute)
  const WORDS_PER_MINUTE = 200;

  // Function to count words in a block of content
  const countWordsInContent = (content: BlockContent): number => {
    // Prioritize text content, fall back to HTML if text is not available
    const textToCount = content.text || content.html || "";

    // Remove HTML tags and count words
    const strippedText = textToCount.replace(/<[^>]*>/g, "");
    const words = strippedText.trim().split(/\s+/);

    // Filter out empty strings
    return words.filter((word) => word.length > 0).length;
  };

  // Calculate total words across all sections
  const totalWords = sections.reduce((sectionTotal, section) => {
    const sectionWords = section.blocks.reduce((blockTotal, block) => {
      return blockTotal + countWordsInContent(block.content);
    }, 0);
    return sectionTotal + sectionWords;
  }, 0);

  // Calculate reading time in minutes, rounding up
  const readingTime = Math.ceil(totalWords / WORDS_PER_MINUTE);

  return readingTime;
};
export const createBlog = async (req: Request, res: Response) => {
  console.log("Creating blog...");
  try {
    const { userId } = req.body;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Check user authorization
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Ensure only admin can create blog
    if (user.subscribedPlan !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const newBlog = new Blog({
      heroImage: {
        url: "",
        alt: "",
      },
      title: "",
      description: {
        html: "",
        links: [],
      },
      sections: [],
      author: {
        name: "",
        bio: "",
        avatar: "",
      },
      relatedPosts: [],
      status: "draft",
      seo: {
        title: "",
        description: "",
        canonicalUrl: "",
      },
    });

    const savedBlog = await newBlog.save();

    if (!savedBlog) {
      return res.status(500).json({
        success: false,
        message: "Failed to create blog post",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      blogId: savedBlog._id,
    });
  } catch (error) {
    console.error("Error creating blog:", error);

    res.status(500).json({
      message: "Failed to create blog post",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get all blog posts
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({});

    if (!blogs) {
      return res.status(404).json({
        message: "No blog posts found",
        success: false,
      });
    }

    const dataToSend = blogs.map((blog) => ({
      id: blog._id,
      title: blog.title,
      url: blog.slug || "",
      imageUrl: blog.heroImage.url || "",
      author: blog.author || { name: "", bio: "", avatar: "" },
      description: blog?.description?.html || "",
      createdAt: blog.createdAt || "",
      updatedAt: blog.updatedAt || "",
      status: blog.status,
    }));

    if (!dataToSend) {
      return res.status(404).json({
        message: "No blog posts found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Blogs retrieved successfully",
      data: dataToSend,
    });
  } catch (error) {
    console.error("Error retrieving blogs:", error);
    res.status(500).json({
      message: "Failed to retrieve blog posts",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get a single blog post by ID

export const getBlogById = async (req: Request, res: Response) => {
  try {
    console.log("getBlogById called");
    const { blogId } = req.params;
    const { userId } = req.body;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Check user authorization
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Ensure only admin can access specific blog details
    if (user.subscribedPlan !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        message: "Blog post not found",
      });
    }

    res.status(200).json({
      message: "Blog post retrieved successfully",
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error retrieving blog:", error);
    res.status(500).json({
      message: "Failed to retrieve blog post",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    res.status(200).json({
      message: "Blog post retrieved successfully",
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error retrieving blog:", error);
    res.status(500).json({
      message: "Failed to retrieve blog post",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update a blog post

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const { blogData, userId } = req.body;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Check user authorization
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Ensure only admin can update blog
    if (user.subscribedPlan !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Use findById and then save to ensure full data persistence
    const existingBlog = await Blog.findById(blogId);

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    // Merge the new data with existing blog
    existingBlog.heroImage = blogData.heroImage;
    existingBlog.title = blogData.title;
    existingBlog.description = blogData.description;
    existingBlog.slug = blogData.slug;
    existingBlog.sections = blogData.sections;
    existingBlog.author = blogData.author;
    existingBlog.relatedPosts = blogData.relatedPosts;
    existingBlog.status = blogData.status;
    existingBlog.seo = blogData.seo;

    // Save the updated blog
    existingBlog.readTime = calculateReadingTime(blogData.sections);
    const updatedBlog = await existingBlog.save();

    res.status(200).json({
      success: true,
      message: "Blog post updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update blog post",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
// Delete a blog post
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const { userId } = req.body;
    console.log("req.body for blog delete", req.body, "blogId", blogId);
    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Blog post ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.subscribedPlan !== "admin") {
      return res.status(403).json({
        success: false,
        message: "not authorized",
      });
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({
        message: "Blog post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      message: "Failed to delete blog post",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
