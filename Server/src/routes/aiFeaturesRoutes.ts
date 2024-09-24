import { Router } from "express";
import { generateResume } from "../controllers/aiFeatures.controller";

const router = Router();

router.post("/generate-resume", generateResume);
export default router;
