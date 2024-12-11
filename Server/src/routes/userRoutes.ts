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

// google auth
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     prompt: "select_account",
//   })
// );

router.post("/google", googleAuthCallback);

// router.post(
//   "/google/callback",
//   passport.authenticate("google", {
//     session: false,
//     failureRedirect: "/login",
//   }),
//   googleAuthCallback
// );

export default router;
