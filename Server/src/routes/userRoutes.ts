import { Router } from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logoutUser,
} from "../controllers/user.controller";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.get("/", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Hello World",
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logoutUser);
router.post("/verify-user/:verification_code", verifyUser);
router.post("/forgot-password/", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

router.post("/refresh-token", refreshAccessToken);

export default router;
