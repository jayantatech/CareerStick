// import { Request, Response } from "express";
// import { aiGenerateResume } from "../utils/aiGenerateResume";
// import { getRequiredHeader } from "openai/core";

// const generateResume = async (req: Request, res: Response) => {
//   try {
//     const { prompt, instruction } = req.body;
//     // console.log("prompt", prompt);
//     if (!prompt) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const generatedResume = await aiGenerateResume(prompt, instruction);
//     console.log("generatedResume", generatedResume);
//     return res.status(200).json({
//       success: true,
//       message: "Resume generated successfully",
//       generatedResumeData: generatedResume,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal server error" });
//     console.log("error", error);
//   }
// };

// export { generateResume };

import { Request, Response } from "express";
import { aiGenerateResume } from "../utils/aiGenerateResume"; // Import utility function

// Controller function to handle resume generation
const generateResume = async (req: Request, res: Response) => {
  console.log("they sent the data form client");
  try {
    const { prompt, instruction } = req.body; // Extract prompt and instruction from the request body
    console.log("prompt data from client", prompt, instruction);
    // Validate that both prompt and instruction are present
    if (!prompt || !instruction) {
      return res.status(400).json({
        success: false,
        message: "Both prompt and instruction are required",
      });
    }

    // Call the resume generation function and capture the result
    const generatedResume = await aiGenerateResume(prompt);
    console.log("Generated Resume:", generatedResume);

    // Send a success response with the generated resume
    return res.status(200).json({
      success: true,
      message: "Resume generated successfully",
      data: generatedResume,
    });
  } catch (error: any) {
    // Handle any errors and return a 500 response
    console.error("Error in generateResume controller:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { generateResume };
