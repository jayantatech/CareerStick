// routes/blogRoutes.ts

import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
} from "../controllers/blog.controller";

const router = express.Router();

// Blog routes
router.post("/create", createBlog);
router.get("/get/:slug", getBlogBySlug);
// router.put("/:slug/content", updateBlogContent);
// router.patch("/:slug/metadata", updateBlogMetadata);
// router.patch("/:slug/status", updateBlogStatus);
// router.patch("/:slug/author", updateAuthorProfile);

export default router;

// updateAuthorProfile,
// updateBlogContent,
// updateBlogMetadata,
// updateBlogStatus,
