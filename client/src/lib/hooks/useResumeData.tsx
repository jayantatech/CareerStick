// import { useEffect, useRef, useCallback, use } from "react";
// import { isEqual } from "lodash";
// import { useParams, useRouter } from "next/navigation";
// import { AxiosError, AxiosResponse } from "axios";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import * as resumeActions from "@/lib/store/slices/resumeSlice";
// import api from "@/lib/api";
// import mapMongoDataToReduxFormat from "@/lib/features/mapMongoDataToReduxFormat";
// import { ResumeState } from "@/lib/types/resumeInput";
// import { setCurrentTemplate } from "../store/slices/templateChangeSlice";
// import useAuth from "./useAuth";

// interface ApiResponse {
//   success: boolean;
//   redirect?: string;
//   resume?: ResumeState;
// }

// const AUTO_SAVE_INTERVAL = 3000;

// export const useResumeData = () => {
//   const dispatch = useAppDispatch();
//   const params = useParams();
//   const router = useRouter();
//   const resumeStateData = useAppSelector((state) => state.resume);
//   const resumeSettings = useAppSelector((state) => state.resumeStyle);

//   const previousStateRef = useRef<ResumeState | null>(null);
//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const isInitialLoadRef = useRef(true);

//   const validateResumeId = (
//     id: string | string[] | undefined
//   ): id is string => {
//     return typeof id === "string" && id.length === 24;
//   };

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

//   // Fetch resume data on component mount
//   useEffect(() => {
//     const fetchResumeData = async () => {
//       if (!validateResumeId(params?.id)) {
//         router.push("/app/resumes");
//         return;
//       }
//       const { error, isLoading, user, isAuthenticated } = useAuth();
//       console.log("calling fetchResumeData with ", user);
//       try {
//         const response: AxiosResponse<{ resume: ResumeState }> = await api.post(
//           `/resume/get-resume/${params.id}`,
//           {
//             userId: user?._id,
//           }
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

//   useEffect(() => {
//     if (!validateResumeId(params?.id)) return;

//     const fetchResumeTemplateName = async () => {
//       try {
//         const response = await api.post(
//           `/resume/get-resume-template/${params?.id}`
//         );

//         if (response.data.success && response.data.templateName) {
//           dispatch(setCurrentTemplate(response.data.templateName));
//         }
//       } catch (error) {
//         console.log("Error fetching resume template name:", error);
//       }
//     };
//     fetchResumeTemplateName();
//   }, [params?.id]);

//   return {
//     isValidResumeId: validateResumeId(params?.id),
//     resumeStateData,
//   };
// };

import { useEffect, useRef, useCallback } from "react";
import { isEqual } from "lodash";
import { useParams, useRouter } from "next/navigation";
import { AxiosError, AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import * as resumeActions from "@/lib/store/slices/resumeSlice";
import api from "@/lib/api";
import mapMongoDataToReduxFormat from "@/lib/features/mapMongoDataToReduxFormat";
import { ResumeState } from "@/lib/types/resumeInput";
import useAuth from "./useAuth";
import setIsGetResumeCalled from "@/lib/store/slices/templateChangeSlice";
import { setResumeState } from "../store/slices/resumeStateChangeSlice";

interface ApiResponse {
  success: boolean;
  redirect?: string;
  resume?: ResumeState;
}

const AUTO_SAVE_INTERVAL = 3000;

export const useResumeData = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const router = useRouter();
  const resumeStateData = useAppSelector((state) => state.resume);
  const { user, isLoading, error, isAuthenticated } = useAuth(); // Move useAuth to top level
  const isGetResumeCalled = useAppSelector(
    (state) => state.resumeSateChange.isGetResumeCalled
  );
  const previousStateRef = useRef<ResumeState | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialLoadRef = useRef(true);

  const validateResumeId = (
    id: string | string[] | undefined
  ): id is string => {
    return typeof id === "string" && id.length === 24;
  };

  const handleResumeDataSave = useCallback(async () => {
    if (!validateResumeId(params?.id)) {
      router.push("/app/resumes");
      return null;
    }
    if (!user?._id) return null;

    if (
      isInitialLoadRef.current ||
      isEqual(previousStateRef.current, resumeStateData)
    ) {
      // console.log("No changes detected or initial load, skipping save");
      return;
    }
    console.log("Saving resume data");
    try {
      const response: AxiosResponse<ApiResponse> = await api.post(
        "/resume/save-resume",
        {
          resumeId: params.id,
          resumeData: resumeStateData,
          userId: user._id,
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

  // Fetch resume data on component mount
  useEffect(() => {
    const fetchResumeData = async () => {
      if (!validateResumeId(params?.id) || !user?._id) {
        router.push("/app/resumes");
        return;
      }

      try {
        const response: AxiosResponse<{
          success: boolean;
          resume: ResumeState;
        }> = await api.post(`/resume/get-resume/${params.id}`, {
          userId: user._id,
        });
        // console.log("response.data for resume data", response.data);
        if (response.data.success === false) {
          router.push("/app/resumes");
          return;
        }

        console.log("resume data fetched successfully", response.data.resume);
        const mappedData = mapMongoDataToReduxFormat(response.data.resume);
        // console.log("mapMongoDataToReduxFormat", mappedData);
        // Initialize all sections in Redux
        dispatch(
          resumeActions.setResumeTitle(mappedData.resumeTitle as string)
        );
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

        dispatch(setResumeState(false));
      } catch (error) {
        const axiosError = error as AxiosError<{
          message: string;
          success: boolean;
        }>;
        console.error("Error fetching resume data:", axiosError);
        if (
          axiosError.response?.status === 404 ||
          axiosError.response?.data.success === false
        ) {
          router.push("/app/resumes");
        }
      }
    };

    if (!isLoading) {
      fetchResumeData();
    }
  }, [
    params?.id,
    dispatch,
    router,
    user?._id,
    isLoading,
    isGetResumeCalled === true,
  ]);

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

  // useEffect(() => {
  //   if (!validateResumeId(params?.id)) return;
  //   if (!user?._id) return;
  //   console.log("Fetching resume template name....");

  //   const fetchResumeTemplateName = async () => {
  //     try {
  //       const response = await api.post(
  //         `/resume/get-resume-template/${params?.id}`,
  //         {
  //           userId: user._id,
  //         }
  //       );
  //       console.log("response.data for resume template name", response.data);
  //       if (response.data.success && response.data.templateName) {
  //         dispatch(setCurrentTemplate(response.data.templateName));
  //       }
  //     } catch (error) {
  //       console.log("Error fetching resume template name:", error);
  //     }
  //   };
  //   if (!isLoading) {
  //     fetchResumeTemplateName();
  //   }
  // }, [params?.id, !isLoading, router, user?._id]);

  return {
    isValidResumeId: validateResumeId(params?.id),
    resumeStateData,
    isLoading,
    error,
    isAuthenticated,
  };
};
