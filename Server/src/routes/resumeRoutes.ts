import { Router } from "express";
import {
  createResume,
  getResume,
  saveResume,
  updateResumeTemplate,
  getResumeTemplate,
} from "../controllers/resume.controller";
import {
  getResumeSettings,
  resetResumeSettings,
  updateResumeSettings,
  updateResumeActiveSections,
  getResumeActiveSections,
} from "../controllers/resumeSettings.controller";
const router = Router();

router.post("/create-resume", createResume);
router.post("/save-resume", saveResume);
router.get("/get-resume/:id", getResume);
router.post("/save-resume-template/:resumeId", updateResumeTemplate);
router.post("/get-resume-template/:resumeId", getResumeTemplate);
// router.get("/get-settings:/resumeId", getResumeSettings);
// router.post("/settings/reset/", resetResumeSettings);
// router.post("/settings/update", updateResumeSettings);

router.get("/settings/:resumeId", getResumeSettings);
router.post("/settings/update", updateResumeSettings);
router.post("/settings/reset/:resumeId", resetResumeSettings);
router.post("/settings/active-sections/:resumeId", updateResumeActiveSections);
router.get("/settings/active-sections/:resumeId", getResumeActiveSections);

export default router;
