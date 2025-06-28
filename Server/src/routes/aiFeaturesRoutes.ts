import { Router } from "express";
import {
  aiATSOptimizeResume,
  generateAiResume,
  aiJobDescription,
  createResumeWithAIPrompt,
} from "../controllers/aiFeatures.controller";

const router = Router();

//ai/(routes)

router.post("/generate-resume", generateAiResume);
router.post("/ats-optimized-resume", aiATSOptimizeResume);
router.post("/get-job-description", aiJobDescription);
router.post("/generate-resume-with-prompt", createResumeWithAIPrompt);
export default router;
