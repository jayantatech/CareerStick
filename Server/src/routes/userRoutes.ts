import { Router } from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-user/:verification_code", verifyUser);
router.post("/forgot-password/", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

export default router;
