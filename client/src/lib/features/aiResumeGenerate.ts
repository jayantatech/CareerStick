// import api from "../api";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
// import {
//   updateJobIndustry,
//   updatePersonalInfo,
//   updateProfessionalSummary,
// } from "../store/slices/resumeSlice";

// const handleAIResumeGenerate = async () => {
//   console.log("they clicked generate resume");
//   const userSubmittedInfo = useAppSelector((state) => state.resume);
//   const dispatch = useAppDispatch();
//   if (!userSubmittedInfo) return;
//   try {
//     const response = await api.post("/ai/generate-resume", {
//       prompt: userSubmittedInfo,
//       instruction: "Make it easy to read and professional",
//     });

//     dispatch(updateJobIndustry(response.data.jobIndustry));
//     dispatch(updatePersonalInfo(response.data.updatePersonalInfo));
//     dispatch(
//       updateProfessionalSummary(response.data.updateProfessionalSummary)
//     );
//     console.log("response.data from server", response.data);
//     return {
//       success: true,
//       message: "Resume generated successfully",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: "Internal server error",
//     };
//   }
// };

// export { handleAIResumeGenerate };
