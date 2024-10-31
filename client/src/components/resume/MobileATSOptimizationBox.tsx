import React from "react";
import { MdOutlineClose } from "react-icons/md";
import FloatingLabelInput from "../inputComponents/TextInputField";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setMobileATSOptimizationBoxState } from "@/lib/store/slices/resumeFeatureState";

const MobileATSOptimizationBox = () => {
  const isATSOptimizationBoxOpenState = useAppSelector(
    (state) => state.resumeFeatureState.mobileATSOptimizationBoxState
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setMobileATSOptimizationBoxState(false));
  };

  return (
    <div
      className={`w-full h-[330px] bg-white border absolute bottom-[94px] left-0 border-t flex flex-col z-50 rounded-t-md ${
        isATSOptimizationBoxOpenState ? "block" : "hidden"
      }`}
    >
      {/* Header */}
      <div className="w-full flex justify-between items-center py-2 px-3 border-b">
        <span className="font-heading text-[15px]">ATS Optimization</span>
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
        >
          <MdOutlineClose className="text-[20px]" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto  custom-scrollbar p-3 space-y-3">
        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-100 rounded p-2.5">
          <p className="text-[13px] font-body text-blue-800">
            <span className="font-bold">Note: </span>
            As a careerstick.com user, enter your basic info and let our
            StickBotLite AI Model help you create a professional resume
          </p>
        </div>

        {/* Job Title Input */}
        <div className="w-full">
          <FloatingLabelInput
            value=""
            onChange={() => {
              ("");
            }}
            label="Enter your targeted job title"
          />
        </div>

        {/* Job Description Textarea */}
        <div className="w-full flex-1">
          <textarea
            maxLength={4000}
            className="w-full h-[120px] p-2.5 font-body text-[14px] text-gray-900 rounded border focus:ring-1 focus:ring-primary focus:outline-none resize-none custom-scrollbar"
            placeholder="Copy and Paste your targeted job description"
          />
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-3 border-t">
        <button className="w-full h-[44px] bg-primary text-white rounded font-heading text-[15px] font-semibold">
          Optimize for ATS
        </button>
      </div>
    </div>
  );
};

export default MobileATSOptimizationBox;
