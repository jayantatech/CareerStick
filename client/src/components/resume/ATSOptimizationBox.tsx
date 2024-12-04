import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import FloatingLabelInput from "../inputComponents/TextInputField";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setATSOptimizationBoxState } from "@/lib/store/slices/resumeFeatureState";
import api from "@/lib/api";
import useAuth from "@/lib/hooks/useAuth";
import { useParams } from "next/navigation";
import {
  setIsAIFeatureRequested,
  setResumeState,
} from "@/lib/store/slices/resumeStateChangeSlice";
import { toast } from "sonner";

const ATSOptimizationBox = () => {
  const isATSOptimizationBoxOpenState = useAppSelector(
    (state) => state.resumeFeatureState.ATSOptimizationBoxState
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
    dispatch(setATSOptimizationBoxState(false));
  };

  const handleOptimize = async () => {
    if (!user?._id || !params.id) {
      alert("User or Resume ID not found.");
      return;
    }
    if (!jobTitle || !jobDescription) {
      // alert("User or Resume ID not found.");
      toast.warning("Please enter job title and description.");
      return;
    }

    // setLoading(true);
    setLoading(false);
    dispatch(setATSOptimizationBoxState(false));
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
        dispatch(setATSOptimizationBoxState(false));
        dispatch(setIsAIFeatureRequested(false));
        toast.success(response.data.message);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Failed to optimize resume:", error);
      alert("Failed to optimize resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-[680px] h-[440px] max-lg:hidden fixed bottom-4 rounded right-9 bg-white border shadow-lg ${
        isATSOptimizationBoxOpenState ? "block" : "hidden"
      }`}
    >
      <div className="w-full flex justify-between items-center px-3 py-2 border-b select-none">
        <span className="font-heading text-[15px]">ATS Optimization</span>
        <button
          onClick={handleClose}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
        >
          <MdOutlineClose className="text-[20px]" />
        </button>
      </div>
      <div className="p-3">
        <div className="bg-blue-50 border border-blue-100 rounded mb-3 p-3">
          <p className="text-[15px] font-body text-blue-800">
            <span className="font-bold">Note: </span>
            Enter your job details to optimize your resume for ATS.
          </p>
        </div>
        <FloatingLabelInput
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          label="Enter your targeted job title"
        />
        <div className="mt-2">
          <textarea
            maxLength={4000}
            className="w-full h-[190px] p-2 font-body font-semibold text-gray-900 rounded border focus:ring-1 focus:ring-primary focus:outline-none resize-none custom-scrollbar"
            placeholder="Copy and paste your targeted job description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <button
          onClick={handleOptimize}
          className={`w-full h-[40px] mt-2 rounded font-heading font-semibold ${
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

export default ATSOptimizationBox;
