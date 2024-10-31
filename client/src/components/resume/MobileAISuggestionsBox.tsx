import React from "react";
import {
  MdOutlineAutoFixHigh,
  MdOutlineAutoFixOff,
  MdOutlineClose,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setAISuggestionBoxState,
  setMobileAISuggestionBoxState,
} from "@/lib/store/slices/resumeFeatureState";

const MobileAISuggestionsBox = () => {
  const isAISuggestionBoxOpen = useAppSelector(
    (state) => state.resumeFeatureState.mobileAISuggestionBoxState
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setMobileAISuggestionBoxState(false));
  };

  return (
    <div
      className={`w-full h-[330px] bg-white border absolute bottom-[94px] left-0 border-t flex flex-col z-50 rounded-t-md ${
        isAISuggestionBoxOpen ? "block" : "hidden"
      }`}
    >
      {/* Header */}
      <div className="w-full flex justify-between items-center py-2 px-3 border-b">
        <span className="font-heading text-[15px]">AI Suggestions</span>
        <button
          onClick={handleClose}
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
        >
          <MdOutlineClose className="text-[20px]" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {/* Suggestion Cards */}
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-white border border-blue-100 rounded p-2.5"
          >
            <p className="text-[13px] font-body text-blue-800 pb-2">
              <span className="font-bold">Note: </span>
              You are the user of careerstick.com so enter your basic info and
              let our StickBotLite AI Model help you to get a professional
              resume
            </p>

            <div className="w-full h-auto bg-white rounded-sm p-1.5 flex gap-2 items-center justify-center text-[13px]">
              <button className="flex-1 h-[36px] gap-1 bg-white border rounded flex items-center justify-center font-semibold font-heading hover:bg-gray-50">
                <MdOutlineAutoFixOff className="text-[18px]" />
                NOT NEEDED
              </button>
              <button className="flex-1 h-[36px] gap-1 bg-primary text-white rounded flex items-center justify-center font-semibold font-heading">
                <MdOutlineAutoFixHigh className="text-[18px]" />
                FIX IT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileAISuggestionsBox;
