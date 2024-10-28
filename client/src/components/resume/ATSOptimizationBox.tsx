import React from "react";
import { MdOutlineClose } from "react-icons/md";
import FloatingLabelInput from "../inputComponents/TextInputField";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setATSOptimizationBoxState } from "@/lib/store/slices/resumeFeatureState";

const ATSOptimizationBox = () => {
  const isATSOptimizationBoxOpenState = useAppSelector(
    (state) => state.resumeFeatureState.ATSOptimizationBoxState
  );
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setATSOptimizationBoxState(false));
  };
  return (
    <div
      className={`w-[680px] h-[404px] fixed bottom-4 rounded right-9 bg-white border shadow-lg p-3 ${
        isATSOptimizationBoxOpenState ? "block" : "hidden"
      }`}
    >
      <div
        className="absolute -top-10 bg-gray-200 border right-0 w-[36px] h-[36px] rounded  text-black hover:bg-gray-300 flex items-center justify-center cursor-pointer"
        onClick={handleClose}
      >
        <MdOutlineClose className="text-[23px]" />
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded mb-3 p-3">
        <p className="text-[15px] font-body text-blue-800">
          <span className="font-bold">Note: </span> you are the user of
          careerstick.com so enter your basic info and let our StickBotLite AI
          Model help you to get a professional resume
        </p>
      </div>
      <FloatingLabelInput
        value=""
        onChange={() => {
          ("");
        }}
        label="Enter your targeted job title "
      />
      <div className=" mt-2">
        {/* <SubSectionTitle label="Copy and Paste your targeted job description" /> */}
        <textarea
          maxLength={4000}
          className="w-full h-[190px] p-2 font-body font-semibold pb-2 text-gray-900 rounded border focus:ring-1 focus:ring-primary focus:outline-none resize-none overflow-y-auto custom-scrollbar"
          placeholder="Copy and Paste your targeted job description"
          // value={localState.description}
          // onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>
      <button className="w-full h-[40px] mt-2 bg-primary text-white rounded font-heading font-semibold">
        Optimize for ATS
      </button>
    </div>
  );
};

export default ATSOptimizationBox;
