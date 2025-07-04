// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import {
//   setAddSectionBoxState,
//   setAISuggestionBoxState,
//   setATSOptimizationBoxState,
//   setDesignAndFontBoxState,
//   setTemplateBoxState,
// } from "@/lib/store/slices/resumeFeatureState";
// import dynamic from "next/dynamic";
// import React from "react";
// import { LuLayoutPanelLeft } from "react-icons/lu";
// import { MdOutlineDesignServices, MdOutlineVerified } from "react-icons/md";
// import { VscHubot } from "react-icons/vsc";
// import { BiSelectMultiple } from "react-icons/bi";
// // import { handleAIResumeGenerate } from "@/lib/features/aiResumeGenerate";

// import { TbLayoutCollage } from "react-icons/tb";
// import { handleAIResumeGenerate } from "@/lib/features/aiResumeGenerate";
// import useAuth from "@/lib/hooks/useAuth";
// import { useParams } from "next/navigation";
// import { toast } from "sonner";

// const ResumeFeatureBox = () => {
//   const resumeData = useAppSelector((state) => state.resume);
//   const resumeFeatureState = useAppSelector(
//     (state) => state.resumeFeatureState
//   );
//   const params = useParams();

//   const dispatch = useAppDispatch();

//   const handleDesignAndFontBoxOpenState = () => {
//     dispatch(setTemplateBoxState(false));
//     dispatch(setATSOptimizationBoxState(false));
//     dispatch(setAISuggestionBoxState(false));
//     dispatch(setAddSectionBoxState(false));
//     dispatch(setDesignAndFontBoxState(true));
//   };
//   const handleTemplateBoxOpenState = () => {
//     dispatch(setDesignAndFontBoxState(false));
//     dispatch(setATSOptimizationBoxState(false));
//     dispatch(setAISuggestionBoxState(false));
//     dispatch(setAddSectionBoxState(false));

//     dispatch(setTemplateBoxState(true));
//   };

//   const handleATSOptimizationBoxOpenState = () => {
//     dispatch(setTemplateBoxState(false));
//     dispatch(setDesignAndFontBoxState(false));
//     dispatch(setAISuggestionBoxState(false));
//     dispatch(setAddSectionBoxState(false));

//     dispatch(setATSOptimizationBoxState(true));
//   };
//   // I am not using this now but I will use it later

//   // const handleAISuggestionBoxOpenState = () => {
//   //   dispatch(setTemplateBoxState(false));
//   //   dispatch(setDesignAndFontBoxState(false));
//   //   dispatch(setATSOptimizationBoxState(false));
//   //   dispatch(setAddSectionBoxState(false));

//   //   dispatch(setAISuggestionBoxState(true));
//   // };
//   const handleAddSectionBoxOpenState = async () => {
//     dispatch(setTemplateBoxState(false));
//     dispatch(setDesignAndFontBoxState(false));
//     dispatch(setATSOptimizationBoxState(false));
//     dispatch(setAISuggestionBoxState(false));
//     dispatch(setAddSectionBoxState(true));
//   };
//   const DownloadPDFComponent = dynamic(() => import("./DownloadPDF"), {
//     ssr: false,
//     loading: () => (
//       <button disabled className=" font-semibold">
//         Loading...
//       </button>
//     ),
//   });
//   const userSubmittedInfo = useAppSelector((state) => state.resume);
//   const { user, isLoading } = useAuth();
//   const handleGenerateResume = async () => {
//     if (isLoading) return;
//     if (!user?._id) return;
//     if (!params.id) return;
//     const result = await handleAIResumeGenerate(
//       userSubmittedInfo,
//       dispatch,
//       user?._id,
//       params?.id as string
//     );
//     if (result.success) {
//       // console.log(result.message);
//       toast.success(result.message as string);
//     } else {
//       if (result.success === false) {
//         console.error(result.message);
//         toast.error(result.message as string);
//         return;
//       }
//     }
//   };

//   // const dispatch = useAppDispatch();

//   // const handleAIResumeGenerate = async () => {
//   //   // console.log("they clicked generate resume");

//   //   if (!userSubmittedInfo) return;
//   //   try {
//   //     const response = await api.post("/ai/generate-resume", {
//   //       prompt: userSubmittedInfo,
//   //       instruction: "Make it easy to read and professional",
//   //       jobIndustry: userSubmittedInfo.jobIndustry,
//   //     });
//   //     console.log("response.data from server", response.data);
//   //     const resumeData = JSON.parse(
//   //       response.data.data.replace("```json\n", "").replace("\n```", "")
//   //     );
//   //     console.log("resumeData new one", resumeData);
//   //     dispatch(updateJobIndustry(resumeData.jobIndustry));
//   //     dispatch(
//   //       updatePersonalInfo({
//   //         firstName: resumeData.personalInfo.name,
//   //         lastName: "",
//   //         email: resumeData.personalInfo.email,
//   //         phone: resumeData.personalInfo.phoneNumber,
//   //         city: "",
//   //         country: "",
//   //         address: "",
//   //         postalCode: "",
//   //       })
//   //     );
//   //     dispatch(
//   //       updateProfessionalSummary({
//   //         summaryText: resumeData.personalInfo.summary,
//   //       })
//   //     );
//   //     console.log("redux data after saving ", userSubmittedInfo);
//   //     return {
//   //       success: true,
//   //       message: "Resume generated successfully",
//   //     };
//   //   } catch (error) {
//   //     return {
//   //       success: false,
//   //       message: "Internal server error",
//   //       error: error,
//   //     };
//   //   }
//   // };

//   return (
//     <div className="min-w-[200px] w-[200px]  select-none  h-[286px] rounded p-2 bg-white top-8  sticky right-2 flex flex-col gap-1">
//       {/* <div className="w-full h-[40px] bg-fuchsia-300"></div> */}
//       <div className="p-1.5 border rounded flex flex-col gap-1.5">
//         <div className="w-full h-auto py-1 rounded cursor-pointer bg-primary text-white flex items-center justify-center gap-1">
//           {/* <MdOutlineCloudDowynload className="text-[20px] -mt-0.5" />
//           <span className="font-heading font-semibold text-[16px]">
//           Download
//           </span> */}
//           <DownloadPDFComponent data={resumeData} />
//         </div>
//         <div
//           className="w-full h-auto py-1 rounded cursor-pointer bg-primary text-white flex items-center justify-center gap-1 "
//           onClick={() => handleGenerateResume()}
//         >
//           <VscHubot className="text-[22px] -mt-0.5" />

//           <span className="font-heading font-semibold text-[16px]">
//             AI Optimizer
//           </span>
//         </div>
//       </div>
//       <div className="w-full h-auto py-1 bg-redd-200 mt-1 p-1.5 border gap-2 rounded">
//         <div
//           className={`w-full h-auto py-[3px] mb-0.5 mt-0.5 rounded cursor-pointer text-gray-700 flex items-center justify-start border   hover:border-primary hover:text-primary  p-1.5 gap-1 ${
//             resumeFeatureState.templateBoxState
//               ? "border-primary text-primary shadow-"
//               : "text-gray-700 border-transparent"
//           }`}
//           onClick={() => handleTemplateBoxOpenState()}
//         >
//           <LuLayoutPanelLeft className="text-[18px]" />

//           <span className="font-heading font-semibold text-[15px]">
//             Templates
//           </span>
//         </div>

//         <div
//           className={`w-full h-auto py-[3px] mb-0.5  rounded cursor-pointer text-gray-700 flex items-center justify-start border   hover:border-primary hover:text-primary  p-1.5 gap-1 ${
//             resumeFeatureState.designAndFontBoxState
//               ? "border-primary text-primary shadow"
//               : "text-gray-700 border-transparent"
//           }`}
//           onClick={() => handleDesignAndFontBoxOpenState()}
//         >
//           <MdOutlineDesignServices className="text-[18px] -mt-0.5" />

//           <span className="font-heading font-semibold text-[15px]">
//             Design & Font
//           </span>
//         </div>
//         <div
//           className={`w-full h-auto py-[3px] mb-0.5  rounded cursor-pointer text-gray-700 flex items-center justify-start border   hover:border-primary hover:text-primary  p-1.5 gap-1 ${
//             resumeFeatureState.addSectionBoxState
//               ? "border-primary text-primary shadow"
//               : "text-gray-700 border-transparent"
//           }`}
//           onClick={() => handleAddSectionBoxOpenState()}
//         >
//           <TbLayoutCollage className="text-[18px] -mt-0.5" />

//           <span className="font-heading font-semibold text-[15px]">
//             Add Sections
//           </span>
//         </div>
//         <div
//           className={`w-full h-auto py-[3px] mb-0.5 rounded  text-gray-700 flex items-center justify-start border   hover:border-primary hover:text-primary  p-1.5 gap-1 cursor-pointer ${
//             resumeFeatureState.ATSOptimizationBoxState
//               ? "border-primary text-primary shadow"
//               : "text-gray-700 border-transparent"
//           }`}
//           // i will enable this later
//           onClick={() => handleATSOptimizationBoxOpenState()}
//         >
//           {/* <div className="w-full h-full absolute top-0 left-0">COMING SOON</div> */}
//           <MdOutlineVerified className="text-[18px] -mt-0.5" />

//           <span className="font-heading font-semibold text-[15px]">
//             ATS Optimization
//           </span>
//         </div>

//         <div
//           className={`w-full h-auto py-[3px] mb-0.5 opacity-50 cursor-not-allowed rounded text-gray-700 flex items-center justify-start border   hover:border-primary hover:text-primary  p-1.5 gap-1 ${
//             resumeFeatureState.AISuggestionBoxState
//               ? "border-primary text-primary shadow"
//               : "text-gray-700 border-transparent"
//           }`}
//           // i will enable this later
//           // onClick={() => handleAISuggestionBoxOpenState()}
//         >
//           <BiSelectMultiple className="text-[18px] -mt-0.5" />

//           <span className="font-heading font-semibold text-[15px]">
//             AI Suggestions
//           </span>
//         </div>
//       </div>
//       {/* <div className="w-full h-auto py-1 bg-redd-200 mt-1 p-1.5 border gap-1.5 rounded flex flex-col items-center justify-center">
//         <div className="w-full h-auto  cursor-pointer text-gray-700 text-s flex items-center justify-between   gap-1">
//           <div className="w-[26px] h-[26px] flex items-center justify-center border rounded hover:border-primary hover:text-primary">
//             <FaAngleLeft className="text-[22px] " />
//           </div>
//           <div className=" h-[26px] w-[86px] px-2 bg-white border flex items-center justify-center rounded">
//             <span className="font-heading font-semibold text-[15px]">
//               page 1
//             </span>
//           </div>
//           <div className="w-[26px] h-[26px] flex items-center justify-center border rounded hover:border-primary hover:text-primary">
//             <FaAngleRight className="text-[22px] " />
//           </div>
//         </div>
//         <button className="w-full h-[26px] border-primary  rounded font-heading flex items-center justify-center font-[14px] border bg-primary text-white ">
//           Set Main Resume
//         </button>
//       </div> */}
//     </div>
//   );
// };

// export default ResumeFeatureBox;

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setAddSectionBoxState,
  setAISuggestionBoxState,
  setATSOptimizationBoxState,
  setDesignAndFontBoxState,
  setTemplateBoxState,
} from "@/lib/store/slices/resumeFeatureState";
// import dynamic from "next/dynamic";
import React from "react";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { MdOutlineDesignServices, MdOutlineVerified } from "react-icons/md";
import { VscHubot } from "react-icons/vsc";
import { BiSelectMultiple } from "react-icons/bi";
// import { handleAIResumeGenerate } from "@/lib/features/aiResumeGenerate";

import { TbLayoutCollage } from "react-icons/tb";
import { handleAIResumeGenerate } from "@/lib/features/aiResumeGenerate";
import useAuth from "@/lib/hooks/useAuth";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import DownloadPDF from "./DownloadPDF";

const ResumeFeatureBox = () => {
  const resumeFeatureState = useAppSelector(
    (state) => state.resumeFeatureState
  );
  const params = useParams();

  const dispatch = useAppDispatch();

  const handleDesignAndFontBoxOpenState = () => {
    dispatch(setTemplateBoxState(false));
    dispatch(setATSOptimizationBoxState(false));
    dispatch(setAISuggestionBoxState(false));
    dispatch(setAddSectionBoxState(false));
    dispatch(setDesignAndFontBoxState(true));
  };
  const handleTemplateBoxOpenState = () => {
    dispatch(setDesignAndFontBoxState(false));
    dispatch(setATSOptimizationBoxState(false));
    dispatch(setAISuggestionBoxState(false));
    dispatch(setAddSectionBoxState(false));

    dispatch(setTemplateBoxState(true));
  };

  const handleATSOptimizationBoxOpenState = () => {
    dispatch(setTemplateBoxState(false));
    dispatch(setDesignAndFontBoxState(false));
    dispatch(setAISuggestionBoxState(false));
    dispatch(setAddSectionBoxState(false));

    dispatch(setATSOptimizationBoxState(true));
  };
  // I am not using this now but I will use it later

  // const handleAISuggestionBoxOpenState = () => {
  //   dispatch(setTemplateBoxState(false));
  //   dispatch(setDesignAndFontBoxState(false));
  //   dispatch(setATSOptimizationBoxState(false));
  //   dispatch(setAddSectionBoxState(false));

  //   dispatch(setAISuggestionBoxState(true));
  // };
  const handleAddSectionBoxOpenState = async () => {
    dispatch(setTemplateBoxState(false));
    dispatch(setDesignAndFontBoxState(false));
    dispatch(setATSOptimizationBoxState(false));
    dispatch(setAISuggestionBoxState(false));
    dispatch(setAddSectionBoxState(true));
  };
  // const DownloadPDFComponent = dynamic(() => import("./DownloadPDF"), {
  //   ssr: false,
  //   // loading: () => (
  //   //   <button disabled className=" font-semibold">
  //   //     Loading...
  //   //   </button>
  //   // ),
  // });
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
    <div className="min-w-[200px] w-[200px]  select-none  h-[286px] rounded p-2 bg-white top-8  sticky right-2 flex flex-col gap-1">
      {/* <div className="w-full h-[40px] bg-fuchsia-300"></div> */}
      <div className="p-1.5 border rounded flex flex-col gap-1.5">
        <div className="w-full h-auto py-1 rounded cursor-pointer bg-primary text-white flex items-center justify-center gap-1">
          {/* <MdOutlineCloudDowynload className="text-[20px] -mt-0.5" />
          <span className="font-heading font-semibold text-[16px]">
          Download
          </span> */}
          {/* <DownloadPDFComponent data={resumeData} /> */}
          <DownloadPDF />
        </div>
        <div
          className="w-full h-auto py-1 rounded cursor-pointer bg-primary text-white flex items-center justify-center gap-1 "
          onClick={() => handleGenerateResume()}
        >
          <VscHubot className="text-[22px] -mt-0.5" />

          <span className="font-heading font-semibold text-[16px]">
            AI Optimizer
          </span>
        </div>
      </div>
      <div className="w-full h-auto py-1 bg-redd-200 mt-1 p-1.5 border gap-2 rounded">
        <div
          className={`w-full h-auto py-[3px] mb-0.5 mt-0.5 rounded cursor-pointer text-gray-700 flex items-center justify-start border   hover:border-primary hover:text-primary  p-1.5 gap-1 ${
            resumeFeatureState.templateBoxState
              ? "border-primary text-primary shadow-"
              : "text-gray-700 border-transparent"
          }`}
          onClick={() => handleTemplateBoxOpenState()}
        >
          <LuLayoutPanelLeft className="text-[18px]" />

          <span className="font-heading font-semibold text-[15px]">
            Templates
          </span>
        </div>

        <div
          className={`w-full h-auto py-[3px] mb-0.5  rounded cursor-pointer text-gray-700 flex items-center justify-start border   hover:border-primary hover:text-primary  p-1.5 gap-1 ${
            resumeFeatureState.designAndFontBoxState
              ? "border-primary text-primary shadow"
              : "text-gray-700 border-transparent"
          }`}
          onClick={() => handleDesignAndFontBoxOpenState()}
        >
          <MdOutlineDesignServices className="text-[18px] -mt-0.5" />

          <span className="font-heading font-semibold text-[15px]">
            Design & Font
          </span>
        </div>
        <div
          className={`w-full h-auto py-[3px] mb-0.5  rounded cursor-pointer text-gray-700 flex items-center justify-start border   hover:border-primary hover:text-primary  p-1.5 gap-1 ${
            resumeFeatureState.addSectionBoxState
              ? "border-primary text-primary shadow"
              : "text-gray-700 border-transparent"
          }`}
          onClick={() => handleAddSectionBoxOpenState()}
        >
          <TbLayoutCollage className="text-[18px] -mt-0.5" />

          <span className="font-heading font-semibold text-[15px]">
            Add Sections
          </span>
        </div>
        <div
          className={`w-full h-auto py-[3px] mb-0.5 rounded text-gray-700 flex items-center justify-start border   hover:border-primary hover:text-primary  p-1.5 gap-1 cursor-pointer ${
            resumeFeatureState.ATSOptimizationBoxState
              ? "border-primary text-primary shadow"
              : "text-gray-700 border-transparent"
          }`}
          // i will enable this later
          onClick={() => handleATSOptimizationBoxOpenState()}
        >
          {/* <div className="w-full h-full absolute top-0 left-0">COMING SOON</div> */}
          <MdOutlineVerified className="text-[18px] -mt-0.5" />

          <span className="font-heading font-semibold text-[15px]">
            ATS Optimization
          </span>
        </div>

        <div
          className={`w-full h-auto py-[3px] mb-0.5 opacity-50 cursor-not-allowed rounded text-gray-700 flex items-center justify-start border   hover:border-primary hover:text-primary  p-1.5 gap-1 ${
            resumeFeatureState.AISuggestionBoxState
              ? "border-primary text-primary shadow"
              : "text-gray-700 border-transparent"
          }`}
          // i will enable this later
          // onClick={() => handleAISuggestionBoxOpenState()}
        >
          <BiSelectMultiple className="text-[18px] -mt-0.5" />

          <span className="font-heading font-semibold text-[15px]">
            AI Suggestions
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResumeFeatureBox;
