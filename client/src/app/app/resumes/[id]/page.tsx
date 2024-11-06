// "use client";
// export interface Section {
//   id: string;
//   title: string;
//   icon: React.ElementType;
//   defaultSelected?: boolean;
//   required?: boolean;
//   order?: number;
// }

// export interface SelectedSections {
//   [key: string]: boolean;
// }

// import React, { useEffect } from "react";

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

// import { useParams } from "next/navigation";
// import api from "@/lib/api";
// import { useRouter } from "next/navigation";
// import mapMongoDataToReduxFormat from "@/lib/features/mapMongoDataToReduxFormat";
// const AUTO_SAVE_INTERVAL = 10000; // 60 seconds in milliseconds

// const AiResumeBuilder = () => {
//   const dispatch = useAppDispatch();
//   const params = useParams();
//   const router = useRouter();

//   const resumeStateData = useAppSelector((state) => state.resume);

//   useEffect(() => {
//     const fetchResumeData = async () => {
//       if (
//         !params?.id ||
//         (typeof params.id === "string" && params.id.length !== 24)
//       ) {
//         router.push("/app/resumes");
//         return;
//       }

//       try {
//         const response = await api.get(`/resume/get-resume/${params.id}`);
//         const mappedData = mapMongoDataToReduxFormat(response.data.resume);

//         console.log("response.data.resume from server", response.data.resume);

//         // Then dispatch all sections to Redux
//         dispatch(resumeActions.updateJobIndustry(mappedData.jobIndustry));
//         dispatch(resumeActions.updatePersonalInfo(mappedData.personalInfo));
//         dispatch(
//           resumeActions.updateProfessionalSummary(
//             mappedData.professionalSummary
//           )
//         );
//         dispatch(resumeActions.setWorkExperience(mappedData.workExperience));
//         console.log("mappedData on the client ", mappedData);
//         dispatch(resumeActions.setEducation(mappedData.education));
//         dispatch(resumeActions.setSocialLinks(mappedData.socialLinks));

//         dispatch(resumeActions.setSelectedSkills(mappedData.selectedSkills));
//         dispatch(resumeActions.setProjects(mappedData.projects));

//         dispatch(resumeActions.setLanguages(mappedData.languages));

//         // console.log("the resume data is ", response.data.resume.certificate);
//         console.log("mappedData.certificate", mappedData.certificate);
//         dispatch(resumeActions.setCertificate(mappedData.certificate));
//         console.log(
//           "mappedData.selectedSkills on the client ",
//           mappedData.awards
//         );
//         dispatch(resumeActions.setAwards(mappedData.awards));
//         dispatch(
//           resumeActions.setOpenSourceContributions(
//             mappedData.openSourceContributions
//           )
//         );
//         dispatch(resumeActions.setCustomSections(mappedData.customSections));
//       } catch (error: any) {
//         console.error("Error fetching resume data:", error);
//         if (error?.response?.status === 404) {
//           router.push("/app/resumes");
//         }
//       }
//     };

//     fetchResumeData();
//   }, [params?.id, dispatch, router]);

//   // handle resume data save

//   const handleResumeDataSave = async () => {
//     if (
//       params?.id &&
//       typeof params.id === "string" &&
//       params.id.length !== 24
//     ) {
//       router.push("/app/resumes");
//       return null;
//     }
//     try {
//       const response = await api.post("/resume/save-resume", {
//         resumeId: params.id,
//         resumeData: resumeStateData,
//       });
//       // testData();
//       // console.log("resumeData  client", resumeStateData);

//       console.log("response.data from server okkkk", response.data);

//       if (response.data.success === false && response.data.redirect) {
//         router.push(response.data.redirect);
//       }

//       // You might want to add some visual feedback for successful saves
//       console.log("Resume data saved successfully");
//     } catch (error: any) {
//       // Handle errors appropriately
//       console.error("Error saving resume data:", error);

//       // Handle 404 errors specifically
//       if (error?.response?.status === 404) {
//         console.log("Resume not found, redirecting...");
//         router.push("/app/resumes");
//         return;
//       }
//     }
//   };

//   useEffect(() => {
//     if (!params?.id) return;

//     // handleResumeDataSave();

//     const autoSaveInterval = setInterval(() => {
//       handleResumeDataSave();
//     }, AUTO_SAVE_INTERVAL);

//     return () => {
//       clearInterval(autoSaveInterval);
//     };
//   }, [resumeStateData]);

//   // Return null if no ID is present
//   if (!params?.id) {
//     return null;
//   }
//   return (
//     <div className="flex flex-col h-screen">
//       {/* <AppHeader title="AI Resume Builder" /> */}

//       <div className="flex-1 overflow-y-auto">
//         <div className="flex max-md:flex-col ">
//           {/* Left section */}
//           <div className="w-full h-[63px] md:hidden bg-white border-b flex-shrink-0 sticky top-0 left-0 z-20"></div>

//           <LeftSection />
//           <SmallScreenResumeView />

//           <div
//             className={`w-full max-lg:flex hidden h-[63px] bg-white shadow-md border flex-shrink-0 fixed bottom-0 left-0 z-20 p-4  items-center justify-center`}
//           >
//             <button
//               onClick={() => dispatch(setMobilePreview(true))}
//               className={`w-full h-[40px] rounded bg-primary text-white text-center flex items-center justify-center`}
//             >
//               Preview & Download
//             </button>
//           </div>

//           <div className="relative w-[60%] m-desktop:w-[64%]  max-lg:hidden ">
//             <div
//               className="sticky top-0 overflow-y-auto custom-scrollbar bg-[#8b97b1] "
//               style={{ maxHeight: "calc(100vh)" }}
//             >
//               <div className=" min-h-screen max-h-[2040px] flex flex-row ">
//                 <ResumeViewTwo />
//                 <ResumeFeatureBox />
//               </div>
//               <FontAndDesignSection />
//               <SelectResumeSlider />
//               <ATSOptimizationBox />
//               <AISuggestionsBox />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AiResumeBuilder;

// fully working code
// // before the build erros
// "use client";

// export interface Section {
//   id: string;
//   title: string;
//   icon: React.ElementType;
//   defaultSelected?: boolean;
//   required?: boolean;
//   order?: number;
// }

// export interface SelectedSections {
//   [key: string]: boolean;
// }

// import React, { useEffect, useRef } from "react";
// import { isEqual } from "lodash";

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

// import { useParams } from "next/navigation";
// import api from "@/lib/api";
// import { useRouter } from "next/navigation";
// import mapMongoDataToReduxFormat from "@/lib/features/mapMongoDataToReduxFormat";
// import { AxiosError } from "axios";

// const AUTO_SAVE_INTERVAL = 10000; // 10 seconds in milliseconds

// const AiResumeBuilder = () => {
//   const dispatch = useAppDispatch();
//   const params = useParams();
//   const router = useRouter();
//   const resumeStateData = useAppSelector((state) => state.resume);

//   // Add refs for state tracking and timeout management
//   const previousStateRef = useRef(resumeStateData);
//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const isInitialLoadRef = useRef(true);

//   // Fetch resume data on component mount
//   useEffect(() => {
//     const fetchResumeData = async () => {
//       if (
//         !params?.id ||
//         (typeof params.id === "string" && params.id.length !== 24)
//       ) {
//         router.push("/app/resumes");
//         return;
//       }

//       try {
//         const response = await api.get(`/resume/get-resume/${params.id}`);
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
//         dispatch(resumeActions.setLanguages(mappedData.languages));
//         dispatch(resumeActions.setCertificate(mappedData.certificate));
//         dispatch(resumeActions.setAwards(mappedData.awards));
//         dispatch(
//           resumeActions.setOpenSourceContributions(
//             mappedData.openSourceContributions
//           )
//         );
//         dispatch(resumeActions.setCustomSections(mappedData.customSections));

//         // Set initial state after data load
//         previousStateRef.current = JSON.parse(JSON.stringify(mappedData));
//         isInitialLoadRef.current = false;
//       } catch (error: any) {
//         console.error("Error fetching resume data:", error);
//         if (error?.response?.status === 404) {
//           router.push("/app/resumes");
//         }
//       }
//     };

//     fetchResumeData();
//   }, [params?.id, dispatch, router]);

//   const handleResumeDataSave = async () => {
//     if (
//       !params?.id ||
//       (typeof params.id === "string" && params.id.length !== 24)
//     ) {
//       router.push("/app/resumes");
//       return null;
//     }

//     // Skip if it's the initial load or no changes detected
//     if (
//       isInitialLoadRef.current ||
//       isEqual(previousStateRef.current, resumeStateData)
//     ) {
//       console.log("No changes detected or initial load, skipping save");
//       return;
//     }

//     try {
//       const response = await api.post("/resume/save-resume", {
//         resumeId: params.id,
//         resumeData: resumeStateData,
//       });

//       if (response.data.success === false && response.data.redirect) {
//         router.push(response.data.redirect);
//         return;
//       }

//       // Update previous state reference after successful save
//       previousStateRef.current = JSON.parse(JSON.stringify(resumeStateData));
//       console.log("Resume data saved successfully");
//     } catch (error: any) {
//       console.error("Error saving resume data:", error);
//       if (error?.response?.status === 404) {
//         router.push("/app/resumes");
//       }
//     }
//   };

//   // Auto-save effect
//   useEffect(() => {
//     if (!params?.id) return;

//     // Clear any existing timeout
//     if (saveTimeoutRef.current) {
//       clearTimeout(saveTimeoutRef.current);
//     }

//     // Set new timeout for auto-save
//     saveTimeoutRef.current = setTimeout(() => {
//       handleResumeDataSave();
//     }, AUTO_SAVE_INTERVAL);

//     // Cleanup function
//     return () => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//     };
//   }, [resumeStateData]); // Runs when resumeStateData changes

//   // Return null if no ID is present
//   if (!params?.id) {
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
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AiResumeBuilder;

"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { isEqual } from "lodash";
import { useParams, useRouter } from "next/navigation";
import { AxiosError, AxiosResponse } from "axios";

import ResumeViewTwo from "@/components/sections/resumes/ResumeViewTwo";
import SelectResumeSlider from "@/components/resume/SelectResumeSlider";
import ResumeFeatureBox from "@/components/resume/ResumeFeatureBox";
import FontAndDesignSection from "@/components/resume/FontAndDesignSection";
import ATSOptimizationBox from "@/components/resume/ATSOptimizationBox";
import AISuggestionsBox from "@/components/resume/AISuggestionsBox";
import LeftSection from "@/components/sections/AiResumeBuilder/home/LeftSection";
import SmallScreenResumeView from "@/components/resume/SmallScreenResumeView";
import { setMobilePreview } from "@/lib/store/slices/activeResumeSectionClice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import * as resumeActions from "@/lib/store/slices/resumeSlice";
import api from "@/lib/api";
import mapMongoDataToReduxFormat from "@/lib/features/mapMongoDataToReduxFormat";

import { ResumeState } from "@/lib/types/resumeInput";
import AddSectionPopup from "@/components/app/AddSectionPopup";
interface ApiResponse {
  success: boolean;
  redirect?: string;
  resume?: ResumeState;
}
const AUTO_SAVE_INTERVAL = 3000; // 3 seconds in milliseconds

const AiResumeBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const router = useRouter();
  const resumeStateData = useAppSelector((state) => state.resume);

  const previousStateRef = useRef<ResumeState | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialLoadRef = useRef(true);

  const validateResumeId = (
    id: string | string[] | undefined
  ): id is string => {
    return typeof id === "string" && id.length === 24;
  };

  // Fetch resume data on component mount
  useEffect(() => {
    const fetchResumeData = async () => {
      if (!validateResumeId(params?.id)) {
        router.push("/app/resumes");
        return;
      }

      try {
        const response: AxiosResponse<{ resume: ResumeState }> = await api.get(
          `/resume/get-resume/${params.id}`
        );
        const mappedData = mapMongoDataToReduxFormat(response.data.resume);

        // Initialize all sections in Redux
        dispatch(resumeActions.updateJobIndustry(mappedData.jobIndustry));
        dispatch(resumeActions.updatePersonalInfo(mappedData.personalInfo));
        dispatch(
          resumeActions.updateProfessionalSummary(
            mappedData.professionalSummary
          )
        );
        dispatch(resumeActions.setWorkExperience(mappedData.workExperience));
        dispatch(resumeActions.setEducation(mappedData.education));
        dispatch(resumeActions.setSocialLinks(mappedData.socialLinks));
        dispatch(resumeActions.setSelectedSkills(mappedData.selectedSkills));
        dispatch(resumeActions.setProjects(mappedData.projects));
        console.log("mappedData.languages", mappedData.languages);
        dispatch(resumeActions.setLanguages(mappedData.languages));
        dispatch(resumeActions.setCertificate(mappedData.certificate));
        dispatch(resumeActions.setAwards(mappedData.awards));
        dispatch(
          resumeActions.setOpenSourceContributions(
            mappedData.openSourceContributions
          )
        );
        dispatch(resumeActions.setCustomSections(mappedData.customSections));

        previousStateRef.current = JSON.parse(JSON.stringify(mappedData));
        isInitialLoadRef.current = false;
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        console.error("Error fetching resume data:", axiosError);
        if (axiosError.response?.status === 404) {
          router.push("/app/resumes");
        }
      }
    };

    fetchResumeData();
  }, [params?.id, dispatch, router]);

  const handleResumeDataSave = useCallback(async () => {
    if (!validateResumeId(params?.id)) {
      router.push("/app/resumes");
      return null;
    }

    if (
      isInitialLoadRef.current ||
      isEqual(previousStateRef.current, resumeStateData)
    ) {
      console.log("No changes detected or initial load, skipping save");
      return;
    }

    try {
      const response: AxiosResponse<ApiResponse> = await api.post(
        "/resume/save-resume",
        {
          resumeId: params.id,
          resumeData: resumeStateData,
        }
      );

      if (response.data.success === false && response.data.redirect) {
        router.push(response.data.redirect);
        return;
      }

      previousStateRef.current = JSON.parse(JSON.stringify(resumeStateData));
      console.log("Resume data saved successfully");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error("Error saving resume data:", axiosError);
      if (axiosError.response?.status === 404) {
        router.push("/app/resumes");
      }
    }
  }, [params?.id, resumeStateData, router]);

  // Auto-save effect
  useEffect(() => {
    if (!validateResumeId(params?.id)) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      handleResumeDataSave();
    }, AUTO_SAVE_INTERVAL);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [params?.id, handleResumeDataSave, resumeStateData]);

  if (!validateResumeId(params?.id)) {
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
