import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import { generateAccessToken } from "../utils/jwt";

export const profileSettingsGet = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile settings fetched successfully",
      user: {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        city: user?.address?.city || "",
        country: user?.address?.country || "",
        photo: user.photo || "",
        email: user.email || "",
        subscriptionPlan: user.subscribedPlan || "",
        lastLogin: user.lastLogin || "",
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const profileSettingsSave = async (req: Request, res: Response) => {
  try {
    const { userId, profileInfo } = req.body;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    if (!profileInfo) {
      return res.status(400).json({
        success: false,
        message: "Profile info is required",
      });
    }

    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.firstName = profileInfo.firstName;
    user.lastName = profileInfo.lastName;
    user.phoneNumber = profileInfo.phoneNumber;
    user.address = {
      city: profileInfo.city,
      country: profileInfo.country,
    };
    user.photo = profileInfo.photo;

    await user.save();

    const accessToken = generateAccessToken({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      emailVerified: user.emailVerified,
      isSubscribed: user.isSubscribed,
      subscribedPlan: user.subscribedPlan,
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      accessToken: accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// export { profileSettingsGet, profileSettingsSave };
