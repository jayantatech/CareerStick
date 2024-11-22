import { Router } from "express";
import {
  aiATSOptimizeResume,
  generateAiResume,
} from "../controllers/aiFeatures.controller";

const router = Router();

router.post("/generate-resume", generateAiResume);
router.post("/ats-optimized-resume", aiATSOptimizeResume);
export default router;
