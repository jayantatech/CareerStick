// routes/blogRoutes.ts

import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
} from "../controllers/blog.controller";

const router = express.Router();

// user
router.get("/get/:slug", getBlogBySlug);

//user and admin
router.get("/all-blogs", getAllBlogs);

// admin
router.post("/create", createBlog);
router.post("/article/:blogId", getBlogById);
router.post("/save/:blogId", updateBlog);
router.post("/delete/:blogId", deleteBlog);

export default router;
