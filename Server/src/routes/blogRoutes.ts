// routes/blogRoutes.ts

import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllAdminBlogs,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
} from "../controllers/blog.controller";

const router = express.Router();

// user
router.get("/get/:slug", getBlogBySlug);
router.get("/all-blogs", getAllBlogs);

//user and admin
router.post("/all-admin-blogs", getAllAdminBlogs);

// admin
router.post("/create", createBlog);
router.post("/article/:blogId", getBlogById);
router.post("/save/:blogId", updateBlog);
router.post("/delete/:blogId", deleteBlog);

export default router;
