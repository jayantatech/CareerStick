// import React from "react";
// import { MdOutlineClose } from "react-icons/md";
// import FloatingLabelInput from "../inputComponents/TextInputField";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { setMobileATSOptimizationBoxState } from "@/lib/store/slices/resumeFeatureState";

// const MobileATSOptimizationBox = () => {
//   const isATSOptimizationBoxOpenState = useAppSelector(
//     (state) => state.resumeFeatureState.mobileATSOptimizationBoxState
//   );
//   const dispatch = useAppDispatch();

//   const handleClose = () => {
//     dispatch(setMobileATSOptimizationBoxState(false));
//   };

//   return (
//     <div
//       className={`w-full h-[330px] bg-white border absolute bottom-[94px] left-0 border-t flex flex-col z-50 rounded-t-md ${
//         isATSOptimizationBoxOpenState ? "block" : "hidden"
//       }`}
//     >
//       {/* Header */}
//       <div className="w-full flex justify-between items-center py-2 px-3 border-b">
//         <span className="font-heading text-[15px]">ATS Optimization</span>
//         <button
//           onClick={handleClose}
//           className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
//         >
//           <MdOutlineClose className="text-[20px]" />
//         </button>
//       </div>

//       {/* Content Area */}
//       <div className="flex-1 overflow-y-auto  custom-scrollbar p-3 space-y-3">
//         {/* Info Box */}
//         <div className="bg-blue-50 border border-blue-100 rounded p-2.5">
//           <p className="text-[13px] font-body text-blue-800">
//             <span className="font-bold">Note: </span>
//             As a careerstick.com user, enter your basic info and let our
//             StickBotLite AI Model help you create a professional resume
//           </p>
//         </div>

//         {/* Job Title Input */}
//         <div className="w-full">
//           <FloatingLabelInput
//             value=""
//             onChange={() => {
//               ("");
//             }}
//             label="Enter your targeted job title"
//           />
//         </div>

//         {/* Job Description Textarea */}
//         <div className="w-full flex-1">
//           <textarea
//             maxLength={4000}
//             className="w-full h-[120px] p-2.5 font-body text-[14px] text-gray-900 rounded border focus:ring-1 focus:ring-primary focus:outline-none resize-none custom-scrollbar"
//             placeholder="Copy and Paste your targeted job description"
//           />
//         </div>
//       </div>

//       {/* Bottom Button */}
//       <div className="p-3 border-t">
//         <button className="w-full h-[44px] bg-primary text-white rounded font-heading text-[15px] font-semibold">
//           Optimize for ATS
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MobileATSOptimizationBox;

import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import FloatingLabelInput from "../inputComponents/TextInputField";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setMobileATSOptimizationBoxState } from "@/lib/store/slices/resumeFeatureState";
import api from "@/lib/api";
import useAuth from "@/lib/hooks/useAuth";
import { useParams } from "next/navigation";
import {
  setIsAIFeatureRequested,
  setResumeState,
} from "@/lib/store/slices/resumeStateChangeSlice";
import { toast } from "sonner";

const MobileATSOptimizationBox = () => {
  const isATSOptimizationBoxOpenState = useAppSelector(
    (state) => state.resumeFeatureState.mobileATSOptimizationBoxState
  );
  const resumeData = useAppSelector((state) => state.resume);
  const { user, isLoading } = useAuth();
  const params = useParams();
  const dispatch = useAppDispatch();

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (isLoading) return;
    dispatch(setMobileATSOptimizationBoxState(false));
  };

  const handleOptimize = async () => {
    if (!user?._id || !params.id) {
      alert("User or Resume ID not found.");
      return;
    }
    if (!jobTitle || !jobDescription) {
      toast.warning("Please enter job title and description.");
      return;
    }

    setLoading(false);
    dispatch(setMobileATSOptimizationBoxState(false));
    dispatch(setIsAIFeatureRequested(true));

    try {
      const response = await api.post("/ai/ats-optimized-resume", {
        resumeData,
        userId: user._id,
        resumeId: params.id,
        jobTitleAndDescription: { jobTitle, jobDescription },
      });

      if (response.data.success) {
        dispatch(setResumeState(true));
        dispatch(setMobileATSOptimizationBoxState(false));
        dispatch(setIsAIFeatureRequested(false));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Failed to optimize resume:", error);
      alert("Failed to optimize resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full h-[330px] bg-white border absolute bottom-[94px] left-0 border-t flex flex-col z-50 rounded-t-md ${
        isATSOptimizationBoxOpenState ? "block" : "hidden"
      }`}
    >
      <div className="w-full flex justify-between items-center py-2 px-3 border-b">
        <span className="font-heading text-[15px]">ATS Optimization</span>
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
        >
          <MdOutlineClose className="text-[20px]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
        <div className="bg-blue-50 border border-blue-100 rounded p-2.5">
          <p className="text-[13px] font-body text-blue-800">
            <span className="font-bold">Note: </span>
            Enter your job details to optimize your resume for ATS.
          </p>
        </div>

        <div className="w-full">
          <FloatingLabelInput
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            label="Enter your targeted job title"
          />
        </div>

        <div className="w-full flex-1">
          <textarea
            maxLength={4000}
            className="w-full h-[120px] p-2.5 font-body text-[14px] text-gray-900 rounded border focus:ring-1 focus:ring-primary focus:outline-none resize-none custom-scrollbar"
            placeholder="Copy and Paste your targeted job description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="p-3 border-t">
        <button
          onClick={handleOptimize}
          className={`w-full h-[44px] rounded font-heading text-[15px] font-semibold ${
            loading ? "bg-gray-400" : "bg-primary text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Optimizing..." : "Optimize for ATS"}
        </button>
      </div>
    </div>
  );
};

export default MobileATSOptimizationBox;
