import { Router } from "express";
import {
  createResume,
  getResume,
  saveResume,
  updateResumeTemplate,
  getResumeTemplate,
  getAllResumes,
  deleteResume,
  duplicateResume,
  updateResumeTitle,
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
router.post("/get-resume/:id", getResume);
router.post("/save-resume-template/:resumeId", updateResumeTemplate);
router.post("/get-resume-template/:resumeId", getResumeTemplate);
// resume page to show all resumes
router.post("/get-all-resumes", getAllResumes);
router.post("/delete-resume", deleteResume);
router.post("/duplicate-resume", duplicateResume);
router.post("/update-resume-title", updateResumeTitle);

router.post("/settings", getResumeSettings);
router.post("/settings/update", updateResumeSettings);
router.post("/settings/reset/:resumeId", resetResumeSettings);
router.post("/settings/active-sections/:resumeId", updateResumeActiveSections);
router.post("/settings/get-active-sections/:resumeId", getResumeActiveSections);

export default router;
