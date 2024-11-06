import { Request, Response } from "express";
import Resume from "../models/Resumes";
import ResumeSettings from "../models/ResumeSettings";
import connectDB from "../config/connectDB";
import { defaultSettings } from "../contents/defaultValues";

const getResumeSettings = async (req: Request, res: Response) => {
  try {
    const { resumeId } = req.body;
    await connectDB();
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const settings = await ResumeSettings.findById(resume.resumeSettingsId);
    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Resume settings not found",
      });
    }

    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Error fetching resume settings:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching resume settings",
    });
  }
};

// Update resume settings
const updateResumeSettings = async (req: Request, res: Response) => {
  try {
    // const { resumeId } = req.params;
    const { updateData, resumeId } = req.body;
    await connectDB();

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const updatedSettings = await ResumeSettings.findByIdAndUpdate(
      resume.resumeSettingsId,
      {
        ...updateData,
        updatedAt: new Date(),
      },
      { new: true }
    );
    updatedSettings?.save();

    if (!updatedSettings) {
      return res.status(404).json({
        success: false,
        message: "Resume settings not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating resume settings:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating resume settings",
    });
  }
};

// Reset resume settings to default
const resetResumeSettings = async (req: Request, res: Response) => {
  try {
    const { resumeId } = req.params;
    await connectDB();
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const updatedSettings = await ResumeSettings.findByIdAndUpdate(
      resume.resumeSettingsId,
      {
        ...defaultSettings,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedSettings) {
      return res.status(404).json({
        success: false,
        message: "Resume settings not found",
      });
    }
    updatedSettings.save();
    return res.status(200).json({
      success: true,
      message: "Settings reset to default",
      settings: updatedSettings,
    });
  } catch (error) {
    console.error("Error resetting resume settings:", error);
    return res.status(500).json({
      success: false,
      message: "Error resetting resume settings",
    });
  }
};

export { getResumeSettings, updateResumeSettings, resetResumeSettings };
