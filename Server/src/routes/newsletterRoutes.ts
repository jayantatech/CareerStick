import express from "express";
import handleNewsletterSubscribe from "../controllers/newsletter.controller";

const router = express.Router();

router.post("/subscribe", handleNewsletterSubscribe);

export default router;
