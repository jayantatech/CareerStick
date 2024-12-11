import { Router } from "express";
import {
  profileSettingsGet,
  profileSettingsSave,
} from "../controllers/settings.controller";

const router = Router();

router.post("/get-profile", profileSettingsGet);
router.post("/save-profile", profileSettingsSave);

export default router;
