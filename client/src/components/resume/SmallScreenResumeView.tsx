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
import { useParams, usePathname } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";
import { handleAIResumeGenerate } from "@/lib/features/aiResumeGenerate";
import { toast } from "sonner";
import DownloadPDF from "./DownloadPDF";

const SmallScreenResumeView = () => {
  const resumeFeatureState = useAppSelector(
    (state) => state.resumeFeatureState
  );
  const isMobileResumeViewActive = useAppSelector(
    (state) => state.resumeActiveSection.mobilePreview
  );

  const path = usePathname();
  console.log("active path", path);

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
  // const handleAISuggestionClick = () => {
  //   dispatch(
  //     setMobileAISuggestionBoxState(
  //       !resumeFeatureState.mobileAISuggestionBoxState
  //     )
  //   );
  //   dispatch(setMobileTemplateBoxState(false));
  //   dispatch(setMobileDesignAndFontBoxState(false));
  //   dispatch(setMobileATSOptimizationBoxState(false));
  // };
  const handleResumeViewClose = () => {
    dispatch(setMobileTemplateBoxState(false));
    dispatch(setMobileDesignAndFontBoxState(false));
    dispatch(setMobileATSOptimizationBoxState(false));
    dispatch(setMobileAISuggestionBoxState(false));
    dispatch(setMobilePreview(false));
  };

  // const DownloadPDFComponent = dynamic(() => import("./DownloadPDF"), {
  //   ssr: false,
  //   loading: () => (
  //     <button disabled className=" font-semibold">
  //       Loading...
  //     </button>
  //   ),
  // });
  const params = useParams();

  const userSubmittedInfo = useAppSelector((state) => state.resume);
  const { user, isLoading } = useAuth();
  const handleGenerateResume = async () => {
    if (isLoading) return;
    if (!user?._id) return;
    if (!params.id) return;
    const result = await handleAIResumeGenerate(
      userSubmittedInfo,
      dispatch,
      user?._id,
      params?.id as string
    );
    if (result.success) {
      // console.log(result.message);
      toast.success(result.message as string);
    } else {
      if (result.success === false) {
        console.error(result.message);
        toast.error(result.message as string);
        return;
      }
    }
  };

  return (
    <>
      <div
        className={`w-full lg:hidden  h-full absolute top-0 left-0 z-50 mb-1 bg-[#8b97b1] ${
          isMobileResumeViewActive ? "block" : "hidden"
        }`}
      >
        <div className="w-full h-[72px] z-[999] top-0 left-0 bg-black p-4 flex relative items-center justify-center">
          <div
            className="w-[40px] h-[40px] py-1 absolute top-4 right-2 rounded cursor-pointer  text-white  flex items-center justify-center"
            onClick={() => handleResumeViewClose()}
          >
            <IoClose className="text-[26px]" />
          </div>
          <div className="w-auto gap-2 h-auto  p-1.5 flex items-center justify-between rounded border bg-white">
            <div className="w-auto min-w-[160px] rounded px-3 font-heading font-semibold flex items-center justify-center h-[40px] bg-primary text-white">
              {/* <DownloadPDFComponent data={resumeData} /> */}
              <DownloadPDF />
            </div>
            <div className="w-[40px] h-[40px] py-1 rounded cursor-pointer bg-primary text-white border flex items-center justify-center">
              <MdMoreHoriz className="text-[22px]" />
            </div>
          </div>
        </div>
        <div className="w-full h-auto bg-dred-400 max-md:mt-0 max-lg:mt-28 z-10 flex items-center justify-center">
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
            className={`w-auto h-auto flex items-center justify-center flex-col  gap-0.5 rounded cursor-pointer opacity-50   ${
              resumeFeatureState.mobileAISuggestionBoxState
                ? "text-primary"
                : "text-gray-700"
            }`}
            // onClick={() => handleAISuggestionClick()} // I Will create this component later
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
          <div
            className="w-auto h-auto flex items-center justify-center flex-col  gap-0.5 rounded cursor-pointer"
            onClick={() => handleGenerateResume()}
          >
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
