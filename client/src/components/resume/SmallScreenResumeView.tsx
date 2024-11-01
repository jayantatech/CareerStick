import React from "react";
import { BiSelectMultiple } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { LuLayoutPanelLeft } from "react-icons/lu";
import {
  MdMoreHoriz,
  MdOutlineDesignServices,
  MdOutlineVerified,
} from "react-icons/md";
import MobileTemplateSelector from "./MobileTemplateSelector";
import {
  setMobileAISuggestionBoxState,
  setMobileATSOptimizationBoxState,
  setMobileDesignAndFontBoxState,
  setMobileTemplateBoxState,
} from "@/lib/store/slices/resumeFeatureState";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import MobileFontAndDesignSection from "./MobileFontAndDesignSection";
import MobileATSOptimizationBox from "./MobileATSOptimizationBox";
import MobileAISuggestionsBox from "./MobileAISuggestionsBox";
import { VscHubot } from "react-icons/vsc";
import { setMobilePreview } from "@/lib/store/slices/activeResumeSectionClice";
import ResumeSliderTwo from "./ResumeSliderTwo";
// import ResumeViewTwo from "../sections/resumes/ResumeViewTwo";
import dynamic from "next/dynamic";

const SmallScreenResumeView = () => {
  const resumeFeatureState = useAppSelector(
    (state) => state.resumeFeatureState
  );
  const isMobileResumeViewActive = useAppSelector(
    (state) => state.resumeActiveSection.mobilePreview
  );
  const resumeData = useAppSelector((state) => state.resume);

  const dispatch = useAppDispatch();

  const handleTemplateClick = () => {
    dispatch(
      setMobileTemplateBoxState(!resumeFeatureState.mobileTemplateBoxState)
    );
    dispatch(setMobileDesignAndFontBoxState(false));
    dispatch(setMobileATSOptimizationBoxState(false));
    dispatch(setMobileAISuggestionBoxState(false));
  };

  const handleDesignAndFontClick = () => {
    dispatch(setMobileTemplateBoxState(false));
    dispatch(
      setMobileDesignAndFontBoxState(
        !resumeFeatureState.mobileDesignAndFontBoxState
      )
    );
    dispatch(setMobileATSOptimizationBoxState(false));
    dispatch(setMobileAISuggestionBoxState(false));
  };

  const handleATSOptimizationClick = () => {
    dispatch(
      setMobileATSOptimizationBoxState(
        !resumeFeatureState.mobileATSOptimizationBoxState
      )
    );
    dispatch(setMobileTemplateBoxState(false));
    dispatch(setMobileDesignAndFontBoxState(false));
    dispatch(setMobileAISuggestionBoxState(false));
  };
  const handleAISuggestionClick = () => {
    dispatch(
      setMobileAISuggestionBoxState(
        !resumeFeatureState.mobileAISuggestionBoxState
      )
    );
    dispatch(setMobileTemplateBoxState(false));
    dispatch(setMobileDesignAndFontBoxState(false));
    dispatch(setMobileATSOptimizationBoxState(false));
  };
  const handleResumeViewClose = () => {
    dispatch(setMobileTemplateBoxState(false));
    dispatch(setMobileDesignAndFontBoxState(false));
    dispatch(setMobileATSOptimizationBoxState(false));
    dispatch(setMobileAISuggestionBoxState(false));
    dispatch(setMobilePreview(false));
  };

  const DownloadPDFComponent = dynamic(() => import("./DownloadPDF"), {
    ssr: false,
    loading: () => (
      <button disabled className=" font-semibold">
        Loading...
      </button>
    ),
  });

  return (
    <>
      <div
        className={`w-full lg:hidden  h-full absolute top-0 left-0 z-50 mb-1 bg-[#8b97b1] ${
          isMobileResumeViewActive ? "block" : "hidden"
        }`}
      >
        <div className="w-full h-[72px] bg-black p-4 flex relative items-center justify-center">
          <div
            className="w-[40px] h-[40px] py-1 absolute top-4 right-2 rounded cursor-pointer  text-white  flex items-center justify-center"
            onClick={() => handleResumeViewClose()}
          >
            <IoClose className="text-[26px]" />
          </div>
          <div className="w-auto gap-2 h-auto p-1.5 flex items-center justify-between rounded border bg-white">
            <div className="w-auto min-w-[160px] rounded px-3 font-heading font-semibold flex items-center justify-center h-[40px] bg-primary text-white">
              <DownloadPDFComponent data={resumeData} />
            </div>
            <div className="w-[40px] h-[40px] py-1 rounded cursor-pointer bg-primary text-white border flex items-center justify-center">
              <MdMoreHoriz className="text-[22px]" />
            </div>
          </div>
        </div>
        <div className="w-full h-[520px] max-md:mt-0 max-lg:mt-28 z-10 flex items-center justify-center">
          {/* <div className="w-320px h-[451px] bg-fuchsia-600"> */}
          {/* <ResumeViewTwo /> */}
          <ResumeSliderTwo />
          {/* </div> */}
        </div>
        <MobileTemplateSelector />
        <MobileFontAndDesignSection />
        <MobileATSOptimizationBox />
        <MobileAISuggestionsBox />
        {/* <div className="w-full h-[330px] bg-white border absolute  bottom-[94px] left-0 border-t flex-col z-50 items-center justify-center gap-2 rounded-t-md p-3">
          <div className="w-full h-full mt-1">
          </div>
        </div> */}

        {/* <div className="fixed bottom-0 left-0 w-full h-[94px] bg-white -t flex-col z-50 items-center justify-center gap-2"> */}
        <div className="w-full h-[94px] mt-4 absolute bottom-0 bg-white left-0 select-none bg-red flex-shrink-0 p-3 flex items-center justify-between gap-3">
          <div
            className={`w-auto h-auto flex items-center justify-center flex-col  gap-0.5 rounded cursor-pointer   ${
              resumeFeatureState.mobileTemplateBoxState
                ? "text-primary"
                : "text-gray-700"
            }`}
            onClick={() => handleTemplateClick()}
          >
            <div
              className={`w-[44px] h-[44px] bg-white border  shadow-sm flex items-center justify-center rounded ${
                resumeFeatureState.mobileTemplateBoxState
                  ? "text-primary border-primary"
                  : "text-gray-700"
              }`}
            >
              <LuLayoutPanelLeft className="text-[28px]" />
            </div>
            <span className="font-heading font-semibold text-[13px]">
              Template
            </span>
          </div>
          <div
            className={`w-auto h-auto flex items-center justify-center flex-col  gap-0.5 rounded cursor-pointer   ${
              resumeFeatureState.mobileDesignAndFontBoxState
                ? "text-primary"
                : "text-gray-700"
            }`}
            onClick={() => handleDesignAndFontClick()}
          >
            {" "}
            <div
              className={`w-[44px] h-[44px] bg-white border  shadow-sm flex items-center justify-center rounded ${
                resumeFeatureState.mobileDesignAndFontBoxState
                  ? "text-primary border-primary"
                  : "text-gray-700"
              }`}
            >
              {" "}
              <MdOutlineDesignServices className="text-[28px]" />
            </div>
            <span className="font-heading font-semibold text-[13px]">
              Design
            </span>
          </div>
          <div
            className={`w-auto h-auto flex items-center justify-center flex-col  gap-0.5 rounded cursor-pointer   ${
              resumeFeatureState.mobileATSOptimizationBoxState
                ? "text-primary"
                : "text-gray-700"
            }`}
            onClick={() => handleATSOptimizationClick()}
          >
            <div
              className={`w-[44px] h-[44px] bg-white border  shadow-sm flex items-center justify-center rounded ${
                resumeFeatureState.mobileATSOptimizationBoxState
                  ? "text-primary border-primary"
                  : "text-gray-700"
              }`}
            >
              {" "}
              <MdOutlineVerified className="text-[28px]" />
            </div>
            <span className="font-heading font-semibold text-[13px]">
              ATS Fix
            </span>
          </div>
          <div
            className={`w-auto h-auto flex items-center justify-center flex-col  gap-0.5 rounded cursor-pointer   ${
              resumeFeatureState.mobileAISuggestionBoxState
                ? "text-primary"
                : "text-gray-700"
            }`}
            onClick={() => handleAISuggestionClick()}
          >
            {" "}
            <div
              className={`w-[44px] h-[44px] bg-white border  shadow-sm flex items-center justify-center rounded ${
                resumeFeatureState.mobileAISuggestionBoxState
                  ? "text-primary border-primary"
                  : "text-gray-700"
              }`}
            >
              {" "}
              <BiSelectMultiple className="text-[28px]" />
            </div>
            <span className="font-heading font-semibold text-[13px]">
              AI Fix
            </span>
          </div>
          <div className="w-auto h-auto flex items-center justify-center flex-col  gap-0.5 rounded cursor-pointer">
            <div className="w-[44px] h-[44px] bg-primary text-white border border-white shadow-sm flex items-center justify-center rounded">
              <VscHubot className="text-[30px]" />
            </div>
            <span className="font-heading font-semibold text-[13px]">
              AI Resume
            </span>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default SmallScreenResumeView;
