// "use client";

// import React, { useEffect, useRef, useCallback } from "react";
// import { isEqual } from "lodash";
// import { useParams, useRouter } from "next/navigation";
// import { AxiosError, AxiosResponse } from "axios";

// import ResumeViewTwo from "@/components/sections/resumes/ResumeViewTwo";
// import SelectResumeSlider from "@/components/resume/SelectResumeSlider";
// import ResumeFeatureBox from "@/components/resume/ResumeFeatureBox";
// import FontAndDesignSection from "@/components/resume/FontAndDesignSection";
// import ATSOptimizationBox from "@/components/resume/ATSOptimizationBox";
// import AISuggestionsBox from "@/components/resume/AISuggestionsBox";
// import LeftSection from "@/components/sections/AiResumeBuilder/home/LeftSection";
// import SmallScreenResumeView from "@/components/resume/SmallScreenResumeView";
// import { setMobilePreview } from "@/lib/store/slices/activeResumeSectionClice";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import * as resumeActions from "@/lib/store/slices/resumeSlice";
// import api from "@/lib/api";
// import mapMongoDataToReduxFormat from "@/lib/features/mapMongoDataToReduxFormat";

// import { ResumeState } from "@/lib/types/resumeInput";
// import AddSectionPopup from "@/components/app/AddSectionPopup";
// interface ApiResponse {
//   success: boolean;
//   redirect?: string;
//   resume?: ResumeState;
// }
// const AUTO_SAVE_INTERVAL = 3000; // 3 seconds in milliseconds

// const AiResumeBuilder: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const params = useParams();
//   const router = useRouter();
//   const resumeStateData = useAppSelector((state) => state.resume);

//   const previousStateRef = useRef<ResumeState | null>(null);
//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const isInitialLoadRef = useRef(true);

//   const validateResumeId = (
//     id: string | string[] | undefined
//   ): id is string => {
//     return typeof id === "string" && id.length === 24;
//   };

//   // Fetch resume data on component mount
//   useEffect(() => {
//     const fetchResumeData = async () => {
//       if (!validateResumeId(params?.id)) {
//         router.push("/app/resumes");
//         return;
//       }

//       try {
//         const response: AxiosResponse<{ resume: ResumeState }> = await api.get(
//           `/resume/get-resume/${params.id}`
//         );
//         const mappedData = mapMongoDataToReduxFormat(response.data.resume);

//         // Initialize all sections in Redux
//         dispatch(resumeActions.updateJobIndustry(mappedData.jobIndustry));
//         dispatch(resumeActions.updatePersonalInfo(mappedData.personalInfo));
//         dispatch(
//           resumeActions.updateProfessionalSummary(
//             mappedData.professionalSummary
//           )
//         );
//         dispatch(resumeActions.setWorkExperience(mappedData.workExperience));
//         dispatch(resumeActions.setEducation(mappedData.education));
//         dispatch(resumeActions.setSocialLinks(mappedData.socialLinks));
//         dispatch(resumeActions.setSelectedSkills(mappedData.selectedSkills));
//         dispatch(resumeActions.setProjects(mappedData.projects));
//         console.log("mappedData.languages", mappedData.languages);
//         dispatch(resumeActions.setLanguages(mappedData.languages));
//         dispatch(resumeActions.setCertificate(mappedData.certificate));
//         dispatch(resumeActions.setAwards(mappedData.awards));
//         dispatch(
//           resumeActions.setOpenSourceContributions(
//             mappedData.openSourceContributions
//           )
//         );
//         dispatch(resumeActions.setCustomSections(mappedData.customSections));

//         previousStateRef.current = JSON.parse(JSON.stringify(mappedData));
//         isInitialLoadRef.current = false;
//       } catch (error) {
//         const axiosError = error as AxiosError<{ message: string }>;
//         console.error("Error fetching resume data:", axiosError);
//         if (axiosError.response?.status === 404) {
//           router.push("/app/resumes");
//         }
//       }
//     };

//     fetchResumeData();
//   }, [params?.id, dispatch, router]);

//   const handleResumeDataSave = useCallback(async () => {
//     if (!validateResumeId(params?.id)) {
//       router.push("/app/resumes");
//       return null;
//     }

//     if (
//       isInitialLoadRef.current ||
//       isEqual(previousStateRef.current, resumeStateData)
//     ) {
//       console.log("No changes detected or initial load, skipping save");
//       return;
//     }

//     try {
//       const response: AxiosResponse<ApiResponse> = await api.post(
//         "/resume/save-resume",
//         {
//           resumeId: params.id,
//           resumeData: resumeStateData,
//         }
//       );

//       if (response.data.success === false && response.data.redirect) {
//         router.push(response.data.redirect);
//         return;
//       }

//       previousStateRef.current = JSON.parse(JSON.stringify(resumeStateData));
//       console.log("Resume data saved successfully");
//     } catch (error) {
//       const axiosError = error as AxiosError<{ message: string }>;
//       console.error("Error saving resume data:", axiosError);
//       if (axiosError.response?.status === 404) {
//         router.push("/app/resumes");
//       }
//     }
//   }, [params?.id, resumeStateData, router]);

//   // Auto-save effect
//   useEffect(() => {
//     if (!validateResumeId(params?.id)) return;

//     if (saveTimeoutRef.current) {
//       clearTimeout(saveTimeoutRef.current);
//     }

//     saveTimeoutRef.current = setTimeout(() => {
//       handleResumeDataSave();
//     }, AUTO_SAVE_INTERVAL);

//     return () => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//     };
//   }, [params?.id, handleResumeDataSave, resumeStateData]);

//   if (!validateResumeId(params?.id)) {
//     return null;
//   }

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex-1 overflow-y-auto">
//         <div className="flex max-md:flex-col">
//           {/* Mobile header */}
//           <div className="w-full h-[63px] md:hidden bg-white border-b flex-shrink-0 sticky top-0 left-0 z-20"></div>

//           {/* Main sections */}
//           <LeftSection />
//           <SmallScreenResumeView />

//           {/* Mobile preview button */}
//           <div className="w-full max-lg:flex hidden h-[63px] bg-white shadow-md border flex-shrink-0 fixed bottom-0 left-0 z-20 p-4 items-center justify-center">
//             <button
//               onClick={() => dispatch(setMobilePreview(true))}
//               className="w-full h-[40px] rounded bg-primary text-white text-center flex items-center justify-center"
//             >
//               Preview & Download
//             </button>
//           </div>

//           {/* Desktop resume view */}
//           <div className="relative w-[60%] m-desktop:w-[64%] max-lg:hidden">
//             <div
//               className="sticky top-0 overflow-y-auto custom-scrollbar bg-[#8b97b1]"
//               style={{ maxHeight: "calc(100vh)" }}
//             >
//               <div className="min-h-screen max-h-[2040px] flex flex-row">
//                 <ResumeViewTwo />
//                 <ResumeFeatureBox />
//               </div>
//               <FontAndDesignSection />
//               <SelectResumeSlider />
//               <ATSOptimizationBox />
//               <AISuggestionsBox />
//               <AddSectionPopup />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AiResumeBuilder;

"use client";

import React from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { setMobilePreview } from "@/lib/store/slices/activeResumeSectionClice";
// import { useResumeData } from "@/hooks/useResumeData"; // Adjust the import path as needed

import ResumeViewTwo from "@/components/sections/resumes/ResumeViewTwo";
import SelectResumeSlider from "@/components/resume/SelectResumeSlider";
import ResumeFeatureBox from "@/components/resume/ResumeFeatureBox";
import FontAndDesignSection from "@/components/resume/FontAndDesignSection";
import ATSOptimizationBox from "@/components/resume/ATSOptimizationBox";
import AISuggestionsBox from "@/components/resume/AISuggestionsBox";
import LeftSection from "@/components/sections/AiResumeBuilder/home/LeftSection";
import SmallScreenResumeView from "@/components/resume/SmallScreenResumeView";
import AddSectionPopup from "@/components/app/AddSectionPopup";
import { useResumeData } from "@/lib/hooks/useResumeData";

const AiResumeBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isValidResumeId } = useResumeData();

  if (!isValidResumeId) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <div className="flex max-md:flex-col">
          {/* Mobile header */}
          <div className="w-full h-[63px] md:hidden bg-white border-b flex-shrink-0 sticky top-0 left-0 z-20"></div>

          {/* Main sections */}
          <LeftSection />
          <SmallScreenResumeView />

          {/* Mobile preview button */}
          <div className="w-full max-lg:flex hidden h-[63px] bg-white shadow-md border flex-shrink-0 fixed bottom-0 left-0 z-20 p-4 items-center justify-center">
            <button
              onClick={() => dispatch(setMobilePreview(true))}
              className="w-full h-[40px] rounded bg-primary text-white text-center flex items-center justify-center"
            >
              Preview & Download
            </button>
          </div>

          {/* Desktop resume view */}
          <div className="relative w-[60%] m-desktop:w-[64%] max-lg:hidden">
            <div
              className="sticky top-0 overflow-y-auto custom-scrollbar bg-[#8b97b1]"
              style={{ maxHeight: "calc(100vh)" }}
            >
              <div className="min-h-screen max-h-[2040px] flex flex-row">
                <ResumeViewTwo />
                <ResumeFeatureBox />
              </div>
              <FontAndDesignSection />
              <SelectResumeSlider />
              <ATSOptimizationBox />
              <AISuggestionsBox />
              <AddSectionPopup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiResumeBuilder;
