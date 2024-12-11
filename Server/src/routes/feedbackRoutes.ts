import express from "express";

import { submitFeedback } from "../controllers/Feedback.controller";

const router = express.Router();

// Submit new feedback (authenticated users)
router.post("/add", submitFeedback);

export default router;
