import { Router } from "express";
import {
  createResume,
  getResume,
  saveResume,
} from "../controllers/resume.controller";
import {
  getResumeSettings,
  resetResumeSettings,
  updateResumeSettings,
} from "../controllers/resumeSettings.controller";
const router = Router();

router.post("/create-resume", createResume);
router.post("/save-resume", saveResume);
router.get("/get-resume/:id", getResume);
router.get("/get-settings:/resumeId", getResumeSettings);
router.post("/settings/reset/", resetResumeSettings);
router.post("/settings/update", updateResumeSettings);

export default router;
