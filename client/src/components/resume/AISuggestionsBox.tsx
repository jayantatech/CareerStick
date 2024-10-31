import React from "react";
import {
  MdOutlineAutoFixHigh,
  MdOutlineAutoFixOff,
  MdOutlineClose,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setAISuggestionBoxState } from "@/lib/store/slices/resumeFeatureState";

const AISuggestionsBox = () => {
  const isAISuggestionBoxOpen = useAppSelector(
    (state) => state.resumeFeatureState.AISuggestionBoxState
  );

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setAISuggestionBoxState(false));
  };
  return (
    <div
      className={`w-[580px] h-[404px] fixed bottom-4 rounded right-9 bg-white border shadow-lg p-3 ${
        isAISuggestionBoxOpen ? "block" : "hidden"
      } `}
    >
      <div
        className="absolute -top-10 bg-gray-200 border right-0 w-[36px] h-[36px] rounded  text-black hover:bg-gray-300 flex items-center justify-center cursor-pointer"
        onClick={handleClose}
      >
        <MdOutlineClose className="text-[23px]" />
      </div>
      <div className="w-full h-[380px] flex flex-col gap-3 overflow-y-auto custom-scrollbar">
        <div className="bg-white border border-blue-100 rounded  p-3 relative ">
          <p className="text-[15px] font-body text-blue-800 pb-2">
            <span className="font-bold">Note: </span> you are the user of
            careerstick.com so enter your basic info and let our StickBotLite AI
            Model help you to get a professional resume Model help you to get a
            professional resume
          </p>
          <div className="w-full gap-2 h-auto bg-white rounded-sm p-1.5 flex items-center justify-center  text-[14px] border ">
            <button className="w-1/2 h-[30px] gap-1 bg-white  cursor-pointer rounded-sm p-1.5 flex items-center justify-center font-semibold font-heading text-[14px] border shadow absdolute bottom-2 right-3">
              {" "}
              <MdOutlineAutoFixOff className="text-[20px]" />
              NOT NEEDED
            </button>
            <button className="w-1/2 h-[30px] bg-primary gap-1 text-white cursor-pointer rounded-sm p-1.5 flex items-center justify-center font-semibold font-heading text-[14px] border shadow absdolute bottom-2 right-3">
              <MdOutlineAutoFixHigh className="text-[20px]" /> FIX IT
            </button>
          </div>
        </div>
        <div className="bg-white border border-blue-100 rounded  p-3 relative ">
          <p className="text-[15px] font-body text-blue-800 pb-2">
            <span className="font-bold">Note: </span> you are the user of
            careerstick.com so enter your basic info and let our StickBotLite AI
            Model help you to get a professional resume Model help you to get a
            professional resume
          </p>
          <div className="w-full gap-2 h-auto bg-white rounded-sm p-1.5 flex items-center justify-center  text-[14px] border ">
            <button className="w-1/2 h-[30px] gap-1 bg-white  cursor-pointer rounded-sm p-1.5 flex items-center justify-center font-semibold font-heading text-[14px] border shadow absdolute bottom-2 right-3">
              {" "}
              <MdOutlineAutoFixOff className="text-[20px]" />
              NOT NEEDED
            </button>
            <button className="w-1/2 h-[30px] bg-primary gap-1 text-white cursor-pointer rounded-sm p-1.5 flex items-center justify-center font-semibold font-heading text-[14px] border shadow absdolute bottom-2 right-3">
              <MdOutlineAutoFixHigh className="text-[20px]" /> FIX IT
            </button>
          </div>
        </div>
        <div className="bg-white border border-blue-100 rounded  p-3 relative ">
          <p className="text-[15px] font-body text-blue-800 pb-2">
            <span className="font-bold">Note: </span> you are the user of
            careerstick.com so enter your basic info and let our StickBotLite AI
            Model help you to get a professional resume Model help you to get a
            professional resume
          </p>
          <div className="w-full gap-2 h-auto bg-white rounded-sm p-1.5 flex items-center justify-center  text-[14px] border ">
            <button className="w-1/2 h-[30px] gap-1 bg-white  cursor-pointer rounded-sm p-1.5 flex items-center justify-center font-semibold font-heading text-[14px] border shadow absdolute bottom-2 right-3">
              {" "}
              <MdOutlineAutoFixOff className="text-[20px]" />
              NOT NEEDED
            </button>
            <button className="w-1/2 h-[30px] bg-primary gap-1 text-white cursor-pointer rounded-sm p-1.5 flex items-center justify-center font-semibold font-heading text-[14px] border shadow absdolute bottom-2 right-3">
              <MdOutlineAutoFixHigh className="text-[20px]" /> FIX IT
            </button>
          </div>
        </div>
      </div>

      {/* <button className="w-full h-[40px] mt-2 bg-primary text-white rounded font-heading font-semibold">
        Optimize for ATS
      </button> */}
    </div>
  );
};

export default AISuggestionsBox;
