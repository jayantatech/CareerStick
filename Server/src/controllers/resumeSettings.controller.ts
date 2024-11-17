// import { Request, Response } from "express";
// import Resume from "../models/Resumes";
// import ResumeSettings from "../models/ResumeSettings";
// // import connectDB from "../config/connectDB";

// const getResumeSettings = async (req: Request, res: Response) => {
//   try {
//     const { resumeId } = req.params;
//     // await connectDB();();

//     const resume = await Resume.findById(resumeId);
//     if (!resume) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume not found",
//       });
//     }

//     const settings = await ResumeSettings.findById(resume.resumeSettingsId);
//     if (!settings) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume settings not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       settings,
//     });
//   } catch (error) {
//     console.error("Error fetching resume settings:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error fetching resume settings",
//     });
//   }
// };

// const updateResumeSettings = async (req: Request, res: Response) => {
//   try {
//     const { updateData, resumeId } = req.body;
//     console.log("updateData from client", updateData, resumeId);
//     // await connectDB();();

//     const resume = await Resume.findById(resumeId);
//     if (!resume) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume not found",
//       });
//     }

//     // Validate the update data structure
//     const validUpdateKeys = [
//       "fontSize",
//       "margins",
//       "fontFamily",
//       "colorScheme",
//       "lineHeight",
//       "sectionSpacing",
//       "activeSections",
//     ];

//     const invalidKeys = Object.keys(updateData).filter(
//       (key) => !validUpdateKeys.includes(key)
//     );

//     if (invalidKeys.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: `Invalid update keys: ${invalidKeys.join(", ")}`,
//       });
//     }

//     const updatedSettings = await ResumeSettings.findByIdAndUpdate(
//       resume.resumeSettingsId,
//       {
//         ...updateData,
//         updatedAt: new Date(),
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedSettings) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume settings not found",
//       });
//     }

//     await updatedSettings.save();

//     return res.status(200).json({
//       success: true,
//       message: "Settings updated successfully",
//       settings: updatedSettings,
//     });
//   } catch (error) {
//     console.error("Error updating resume settings:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error updating resume settings",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };

// const resetResumeSettings = async (req: Request, res: Response) => {
//   try {
//     const { resumeId } = req.params;
//     // // await connectDB();();

//     const resume = await Resume.findById(resumeId);
//     if (!resume) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume not found",
//       });
//     }

//     const defaultSettings = {
//       fontSize: {
//         body: "normal",
//         heading: "normal",
//       },
//       margins: {
//         page: "normal",
//         section: "normal",
//       },
//       fontFamily: "Helvetica",
//       colorScheme: {
//         primary: "#111827",
//         secondary: "#3B82F6",
//         text: "#4B5563",
//       },
//       lineHeight: "normal",
//       sectionSpacing: "normal",
//     };

//     const updatedSettings = await ResumeSettings.findByIdAndUpdate(
//       resume.resumeSettingsId,
//       {
//         ...defaultSettings,
//         updatedAt: new Date(),
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedSettings) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume settings not found",
//       });
//     }

//     await updatedSettings.save();

//     return res.status(200).json({
//       success: true,
//       message: "Settings reset to default",
//       settings: updatedSettings,
//     });
//   } catch (error) {
//     console.error("Error resetting resume settings:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error resetting resume settings",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };

// const updateResumeActiveSections = async (req: Request, res: Response) => {
//   const { resumeId } = req.params;
//   const { activeSections } = req.body;
//   try {
//     if (!activeSections || Object.keys(activeSections).length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Active sections are required",
//       });
//     }
//     if (resumeId && resumeId.length !== 24) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid resume ID",
//       });
//     }
//     console.log("active sections from client", activeSections, resumeId);
//     // // await connectDB();();
//     const resume = await Resume.findById(resumeId);
//     if (!resume) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume not found",
//       });
//     }
//     const updatedSettings = await ResumeSettings.findByIdAndUpdate(
//       resume.resumeSettingsId,
//       {
//         activeSections,
//         updatedAt: new Date(),
//       },
//       { new: true, runValidators: true }
//     );
//     if (!updatedSettings) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume settings not found",
//       });
//     }
//     await updatedSettings.save();

//     return res.status(200).json({
//       success: true,
//       message: "Active sections updated successfully",
//     });
//   } catch (error) {
//     console.error("Error updating resume active sections:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error updating resume active sections",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };

// const getResumeActiveSections = async (req: Request, res: Response) => {
//   const { resumeId } = req.params;
//   try {
//     if (resumeId && resumeId.length !== 24) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid resume ID",
//       });
//     }
//     // await connectDB();();
//     const resume = await Resume.findById(resumeId);
//     if (!resume) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume not found",
//       });
//     }
//     const settings = await ResumeSettings.findById(resume.resumeSettingsId);
//     if (!settings) {
//       return res.status(404).json({
//         success: false,
//         message: "Resume settings not found",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Active sections retrieved successfully",
//       activeSections: settings.activeSections,
//     });
//   } catch (error) {
//     console.error("Error retrieving resume active sections:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error retrieving resume active sections",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };

// export {
//   getResumeSettings,
//   updateResumeSettings,
//   resetResumeSettings,
//   updateResumeActiveSections,
//   getResumeActiveSections,
// };

import { Request, Response } from "express";
import Resume from "../models/Resumes";
import ResumeSettings from "../models/ResumeSettings";
import mongoose, { mongo } from "mongoose";

const getResumeSettings = async (req: Request, res: Response) => {
  try {
    // console.log("resumeId in getResumeSettings", req.body);
    const { userId, resumeId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (resumeId && resumeId.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID",
      });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId });
    // console.log("resume from the db", resume);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or unauthorized access",
      });
    }

    const settings = await ResumeSettings.findOne({
      _id: resume.resumeSettingsId,
      userId,
    });
    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Resume settings not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume settings fetched successfully",
      settings: settings,
    });
  } catch (error) {
    console.error("Error fetching resume settings:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching resume settings",
    });
  }
};

const updateResumeSettings = async (req: Request, res: Response) => {
  try {
    const { updateData, resumeId, userId } = req.body;
    // console.log(
    //   "resume body in updateResumeSettings",
    //   updateData,
    //   resumeId,
    //   userId
    // );
    // console.log("updateData from client", updateData, resumeId, userId);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // if (!mongoose.Types.ObjectId.isValid()) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid resume ID format",
    //   });
    // }

    if (resumeId && resumeId.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID by jay",
      });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or unauthorized access",
      });
    }

    // Validate the update data structure
    const validUpdateKeys = [
      "fontSize",
      "margins",
      "fontFamily",
      "colorScheme",
      "lineHeight",
      "sectionSpacing",
      "activeSections",
    ];

    const invalidKeys = Object.keys(updateData).filter(
      (key) => !validUpdateKeys.includes(key)
    );

    if (invalidKeys.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid update keys: ${invalidKeys.join(", ")}`,
      });
    }

    const updatedSettings = await ResumeSettings.findOneAndUpdate(
      { _id: resume.resumeSettingsId, userId },
      {
        ...updateData,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedSettings) {
      return res.status(404).json({
        success: false,
        message: "Resume settings not found",
      });
    }

    await updatedSettings.save();

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
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const resetResumeSettings = async (req: Request, res: Response) => {
  try {
    const { resumeId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or unauthorized access",
      });
    }

    const defaultSettings = {
      fontSize: {
        body: "normal",
        heading: "normal",
      },
      margins: {
        page: "normal",
        section: "normal",
      },
      fontFamily: "Helvetica",
      colorScheme: {
        primary: "#111827",
        secondary: "#3B82F6",
        text: "#4B5563",
      },
      lineHeight: "normal",
      sectionSpacing: "normal",
      userId, // Include userId in default settings
    };

    const updatedSettings = await ResumeSettings.findOneAndUpdate(
      { _id: resume.resumeSettingsId, userId },
      {
        ...defaultSettings,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedSettings) {
      return res.status(404).json({
        success: false,
        message: "Resume settings not found",
      });
    }

    await updatedSettings.save();

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
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updateResumeActiveSections = async (req: Request, res: Response) => {
  const { resumeId } = req.params;
  const { activeSections, userId } = req.body;

  // console.log("activeSections", activeSections);

  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!activeSections || Object.keys(activeSections).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Active sections are required",
      });
    }

    if (resumeId && resumeId.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID",
      });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or unauthorized access",
      });
    }

    const updatedSettings = await ResumeSettings.findOneAndUpdate(
      { _id: resume.resumeSettingsId, userId },
      {
        activeSections,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedSettings) {
      return res.status(404).json({
        success: false,
        message: "Resume settings not found",
      });
    }

    await updatedSettings.save();

    return res.status(200).json({
      success: true,
      message: "Active sections updated successfully",
    });
  } catch (error) {
    console.error("Error updating resume active sections:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating resume active sections",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getResumeActiveSections = async (req: Request, res: Response) => {
  // console.log("resumeId in getResumeActiveSections", req.body);
  const { resumeId } = req.params;
  const { userId } = req.body;
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (resumeId && resumeId.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume ID",
      });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found or unauthorized access",
      });
    }

    const settings = await ResumeSettings.findOne({
      _id: resume.resumeSettingsId,
      userId,
    });
    if (!settings) {
      return res.status(404).json({
        success: false,
        message: "Resume settings not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Active sections retrieved successfully",
      activeSections: settings.activeSections,
    });
  } catch (error) {
    console.error("Error retrieving resume active sections:", error);
    return res.status(500).json({
      success: false,
      message: "Error retrieving resume active sections",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export {
  getResumeSettings,
  updateResumeSettings,
  resetResumeSettings,
  updateResumeActiveSections,
  getResumeActiveSections,
};
