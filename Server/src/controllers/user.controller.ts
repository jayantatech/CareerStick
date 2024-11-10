import { Request, Response } from "express";
import User from "../models/User";

import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { v4 as uuidv4 } from "uuid";
import { OAuth2Client } from "google-auth-library";

const generateVerificationCode = (): string => {
  const uniqueId: string = uuidv4();

  return uniqueId.slice(0, 20);
};

const generateResetToken = (): string => {
  const uniqueId: string = uuidv4();
  return uniqueId.slice(0, 20);
};

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

const registerUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    console.log("req.body", req.body);
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

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

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
    console.log("verification_code", req.params.verification_code);
    const verification_code = req.params.verification_code;
    if (!verification_code) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ verification_code });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found or verification code is Expired",
      });
    }
    const currentTime = new Date();
    if (
      user.verification_code_ExpiresAt &&
      user.verification_code_ExpiresAt < currentTime
    ) {
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

    user.emailVerified = true;
    user.verification_code = undefined;
    user.updatedAt = new Date();
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

    await user.save();

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

    const userrefreshToken = user.refreshToken;
    console.log(
      "accessToken",
      accessToken,
      "refreshToken",
      refreshToken,
      "user",
      user,
      "userrefreshToken",
      userrefreshToken
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken, accessTokenOptions)
      .cookie("refreshToken", refreshToken, refreshTokenOptions)
      .json({
        success: true,
        message: "User verified successfully",
        Data: accessToken,
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

    // await // await connectDB();();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password!);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Credentials",
      });
    }

    if (!user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email",
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
    // await // await connectDB();();

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
    console.log("refreshTokenData", req.cookies);
    const refreshTokenData = req.body.refreshToken || req.cookies.refreshToken;

    console.log("refreshTokenData", refreshTokenData);

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

    // await // await connectDB();();
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

// const googleAuthCallback = async (req: Request, res: Response) => {
//   const user = req.user;
//   if (!user) {
//     return res.status(400).json({
//       success: false,
//       message: "User not found",
//     });
//   }

//   const refreshToken = generateRefreshToken({ _id: user._id });
//   user.refreshToken = refreshToken;
//   user.lastLogin = new Date();
//   await user.save();

//   const accessToken = generateAccessToken({
//     _id: user._id,
//     email: user.email,
//     firstName: user.firstName,
//     emailVerified: user.emailVerified,
//     isSubscribed: user.isSubscribed,
//     subscribedPlan: user.subscribedPlan,
//   });

//   const refreshTokenOptions = {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict" as const,
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//   };
//   const accessTokenOptions = {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict" as const,
//     maxAge: 4 * 60 * 60 * 1000, // 4 hours
//   };

//   return res
//     .status(200)
//     .cookie("refreshToken", refreshToken, refreshTokenOptions)
//     .cookie("accessToken", accessToken, accessTokenOptions)
//     .json({
//       success: true,
//       message: "User logged in successfully",
//     });

//   // const accessToken = generateAccessToken({
//   //   //   _id: user._id,
//   //   //   email: user.email,
//   //   //   firstName: user.firstName,
//   //   //   emailVerified: user.emailVerified,
//   //   //   isSubscribed: user.isSubscribed,
//   //   //   subscribedPlan: user.subscribedPlan,
//   //   // });
//   //   // const refreshTokenData = refreshToken;
//   //   // res.json({ accessToken, refreshToken });
//   // });
// };
// const googleAuthCallback = async (req: Request, res: Response) => {
//   try {
//     const user = req.user;
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Authentication failed",
//       });
//     }

//     // Generate tokens
//     const refreshToken = generateRefreshToken({ _id: user._id });
//     const accessToken = generateAccessToken({
//       _id: user._id,
//       email: user.email,
//       firstName: user.firstName,
//       emailVerified: user.emailVerified,
//       isSubscribed: user.isSubscribed,
//       subscribedPlan: user.subscribedPlan,
//     });

//     // Update user's refresh token
//     await User.findByIdAndUpdate(user._id, {
//       refreshToken,
//       lastLogin: new Date(),
//     });

//     // Set cookies
//     const cookieOptions = {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax" as const,
//     };

//     res
//       .status(200)
//       .cookie("refreshToken", refreshToken, {
//         ...cookieOptions,
//         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//       })
//       .cookie("accessToken", accessToken, {
//         ...cookieOptions,
//         maxAge: 15 * 60 * 1000, // 15 minutes
//       })
//       .json({
//         success: true,
//         message: "Authentication successful",
//       });
//   } catch (error) {
//     console.error("Google auth callback error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

const googleAuthCallback = async (req: Request, res: Response) => {
  console.log("google auth callback called");
  try {
    const { code } = req.body;
    console.log("req.body for google auth", req.body);

    // Exchange code for tokens
    const { tokens } = await client.getToken(code);

    // Verify ID token
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("No payload in ID token");
    }
    console.log("payload from google", payload);
    // Find or create user
    // await // await connectDB();();
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = new User({
        email: payload.email,
        firstName: payload.given_name || payload.name || null,
        lastName: payload.family_name || "",
        emailVerified: payload.email_verified,
        googleId: payload.sub,
        lastLogin: new Date(),
      });
      await user.save();
    } else {
      user.lastLogin = new Date();
      await user.save();
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      emailVerified: user.emailVerified,
      isSubscribed: user.isSubscribed,
      subscribedPlan: user.subscribedPlan,
    });

    const refreshToken = generateRefreshToken({ _id: user._id });

    // Update user's refresh token
    await User.findByIdAndUpdate(user._id, { refreshToken });

    // Set cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
    };

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .json({
        success: true,
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          emailVerified: user.emailVerified,
          isSubscribed: user.isSubscribed,
        },
      });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

const getTokenInfo = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies.accessToken || req.body.accessToken;
    // console.log("accessToken", accessToken);
    if (!accessToken) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decodedToken = verifyAccessToken(accessToken);

    if (!decodedToken) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const {
      _id,
      email,
      firstName,
      lastName,
      emailVerified,
      isSubscribed,
      subscribedPlan,
    } = decodedToken as JwtPayload;

    return res.status(200).json({
      success: true,
      user: {
        _id,
        email,
        firstName,
        lastName,
        emailVerified,
        isSubscribed,
        subscribedPlan,
      },
    });
  } catch (error) {}
};

export {
  registerUser,
  loginUser,
  verifyUser,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logoutUser,
  googleAuthCallback,
  getTokenInfo,
};
