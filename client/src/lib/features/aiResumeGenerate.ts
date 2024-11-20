// import { useAppSelector } from "../store/hooks";

// const handleAIResumeGenerate = async () => {
//   const currentResumeState = useAppSelector((state) => state.resume);
//   console.log("currentResumeState is : ", currentResumeState);
// };

// export { handleAIResumeGenerate };

import api from "../api";
import {
  updateJobIndustry,
  updatePersonalInfo,
  updateProfessionalSummary,
} from "../store/slices/resumeSlice";
import { Dispatch } from "redux";
import { setResumeState } from "../store/slices/resumeStateChangeSlice";

export const handleAIResumeGenerate = async (
  resumeData: any,
  dispatch: Dispatch,
  userId: string,
  resumeId: string
) => {
  try {
    if (!resumeData)
      return {
        success: false,
        message: "No resume data available",
      };
    console.log("resumeData is : ", resumeData);
    const response = await api.post("/ai/generate-resume", {
      resumeData: resumeData,
      resumeId: resumeId,
      userId: userId,
    });

    if (response.data.success) {
      dispatch(setResumeState(true));
      console.log("response.data is : ", response.data);
    }

    // console.log("Generated Resume:", generatedResume);
    // Dispatch actions to update the store
    // dispatch(updateJobIndustry(generatedResume.jobIndustry));
    // dispatch(
    //   updatePersonalInfo({
    //     firstName: generatedResume.personalInfo.name,
    //     lastName: "",
    //     email: generatedResume.personalInfo.email,
    //     phone: generatedResume.personalInfo.phoneNumber,
    //     city: "",
    //     country: "",
    //     address: "",
    //     postalCode: "",
    //   })
    // );
    // dispatch(
    //   updateProfessionalSummary({
    //     summaryText: generatedResume.personalInfo.summary,
    //   })
    // );

    return {
      success: true,
      message: "Resume generated successfully",
    };
  } catch (error) {
    console.error("Error generating resume:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error,
    };
  }
};
