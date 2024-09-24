import { Request, Response } from "express";
import User from "../models/User";
import connectDB from "../config/connectDB";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { v4 as uuidv4 } from "uuid";

const generateVerificationCode = (): string => {
  const uniqueId: string = uuidv4();

  return uniqueId.slice(0, 20);
};

const generateResetToken = (): string => {
  const uniqueId: string = uuidv4();
  return uniqueId.slice(0, 20);
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    if (firstName.length < 3) {
      return res.status(400).json({
        success: false,
        message: "First name must be at least 3 characters long",
      });
    }

    await connectDB();
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      isSubscribed: false,
      subscribedPlan: "FREE",
      createdAt: new Date(),
      emailVerified: false,
      verification_code: generateVerificationCode(),
      verification_code_ExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      Data: user,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const verifyUser = async (req: Request, res: Response) => {
  try {
    const verification_code = req.params.verification_code;
    if (!verification_code) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    await connectDB();
    const user = await User.findOne({ verification_code });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const currentTime = new Date();
    if (user.verification_code_ExpiresAt < currentTime) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired",
      });
    }
    if (user.verification_code !== verification_code) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }
    const accessToken = generateAccessToken({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      emailVerified: user.emailVerified,
      isSubscribed: user.isSubscribed,
      subscribedPlan: user.subscribedPlan,
    });
    user.emailVerified = true;
    user.verification_code = undefined;
    user.updatedAt = new Date();
    await user.save();

    return res.status(200).cookie("accessToken", accessToken).json({
      success: true,
      message: "User verified successfully",
      Data: user,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Credentials",
      });
    }

    const refreshToken = generateRefreshToken({ _id: user._id });
    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    const accessToken = generateAccessToken({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      emailVerified: user.emailVerified,
      isSubscribed: user.isSubscribed,
      subscribedPlan: user.subscribedPlan,
    });

    const refreshTokenOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    };
    const accessTokenOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 4 * 60 * 60 * 1000, // 4 hours
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, refreshTokenOptions)
      .cookie("accessToken", accessToken, accessTokenOptions)
      .json({
        success: true,
        message: "User logged in successfully",
      });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = generateResetToken();
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hours

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Reset token sent to your email",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const resetToken = req.params.resetToken;
    const { password } = req.body;

    if (!resetToken || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await connectDB();

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpiresAt: { $gt: new Date() },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshTokenData = req.cookies.refreshToken;

    if (!refreshTokenData) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No refresh token provided",
      });
    }

    const decoded = verifyRefreshToken(refreshTokenData);

    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Invalid refresh token",
      });
    }

    const { _id, exp } = decoded as JwtPayload;

    if (!_id || !exp) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error: Invalid decoded token format",
      });
    }

    // Check if the refresh token has expired
    if (Date.now() >= exp * 1000) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: please login again",
      });
    }

    await connectDB();
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const storedRefreshToken = user.refreshToken;

    // Verify that the provided refresh token matches the one stored in the database
    if (refreshTokenData !== storedRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Refresh token is invalid",
      });
    }

    const accessToken = generateAccessToken({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      emailVerified: user.emailVerified,
      isSubscribed: user.isSubscribed,
      subscribedPlan: user.subscribedPlan,
    });

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 4 * 60 * 60 * 1000, // 4 hours
    };

    return res.status(200).cookie("accessToken", accessToken, options).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken,
    });
  } catch (error: any) {
    console.error("Error refreshing access token", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error: Could not refresh access token",
    });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const { _id } = req.user;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    await connectDB();
    const user = await User.findByIdAndUpdate(_id, {
      refreshToken: undefined,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out user", error);
    res.status(500).json({
      success: false,
      message: "Could not log out user",
    });
  }
};

export {
  registerUser,
  loginUser,
  verifyUser,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logoutUser,
};
