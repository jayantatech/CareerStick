import { Router } from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logoutUser,
  googleAuthCallback,
  getTokenInfo,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/verify-user/:verification_code", verifyUser);
router.post("/forgot-password/", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

router.post("/refresh-token", refreshAccessToken);
router.post("/get-token-info", getTokenInfo);

router.post("/google", googleAuthCallback);

export default router;
