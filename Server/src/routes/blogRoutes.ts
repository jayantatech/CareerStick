// routes/blogRoutes.ts

import express from "express";
import {
  createBlog,
  updateAuthorProfile,
  updateBlogContent,
  updateBlogMetadata,
  updateBlogStatus,
} from "../controllers/blog.controller";

const router = express.Router();

// Blog routes
router.post("/create", createBlog);
router.put("/:slug/content", updateBlogContent);
router.patch("/:slug/metadata", updateBlogMetadata);
router.patch("/:slug/status", updateBlogStatus);
router.patch("/:slug/author", updateAuthorProfile);

export default router;
