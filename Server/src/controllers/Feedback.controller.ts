import { Request, Response } from "express";

import mongoose from "mongoose";
import { Feedback, IFeedback } from "../models/FeedbackSchema";
import User from "../models/User";

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { userFeedback, userId } = req.body;
    console.log("userFeedback", userFeedback, userId);
    // Create feedback document
    if (!mongoose.isValidObjectId(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid user ID", success: false });
    }

    if (!userFeedback) {
      return res
        .status(400)
        .json({ success: false, message: "Feedback is required" });
    }

    const isValidUser = await User.findOne({ _id: userId });

    if (!isValidUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const newFeedback: IFeedback = new Feedback({
      // userId,
      // userEmail: isValidUser.email, // Optional, from auth middleware
      // userFeedback,
      // isResolved: false,

      userId,
      userEmail: isValidUser.email, // Optional, from auth middleware
      appRating: userFeedback.appRating || null,
      easeOfUse: userFeedback.easeOfUse || [],
      keyFeatures: userFeedback.keyFeatures || [],
      improvementFeature: userFeedback.improvementFeature || [],
      userGoals: userFeedback.userGoals || [],
      recommendationLikelihood: userFeedback.recommendationLikelihood || [],
      additionalComments: userFeedback.additionalComments || "",
      errorReported: userFeedback.errorReported || false,
      errorDescription: userFeedback.errorDescription || "",
      attachedFiles: userFeedback.attachedFiles || [],
      isResolved: false,
    });

    // Save feedback
    const savedFeedback = await newFeedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully",
      success: true,
      feedback: savedFeedback,
    });
  } catch (error) {
    console.error("Feedback submission error:", error);
    res.status(500).json({
      message: "Server error occurred while submitting feedback",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
