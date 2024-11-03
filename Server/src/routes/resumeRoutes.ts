import { Router } from "express";
import {
  createResume,
  getResume,
  saveResume,
} from "../controllers/resume.controller";
const router = Router();

router.post("/create-resume", createResume);
router.post("/save-resume", saveResume);
router.get("/get-resume/:id", getResume);

export default router;
