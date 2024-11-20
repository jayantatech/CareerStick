import { Router } from "express";
import { generateAiResume } from "../controllers/aiFeatures.controller";

const router = Router();

router.post("/generate-resume", generateAiResume);
export default router;
