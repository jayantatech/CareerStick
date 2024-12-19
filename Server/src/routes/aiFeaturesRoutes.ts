import { Router } from "express";
import {
  aiATSOptimizeResume,
  generateAiResume,
  aiJobDescription,
} from "../controllers/aiFeatures.controller";

const router = Router();

//ai/(routes)

router.post("/generate-resume", generateAiResume);
router.post("/ats-optimized-resume", aiATSOptimizeResume);
router.post("/get-job-description", aiJobDescription);
export default router;
