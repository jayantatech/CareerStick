"use client";
export interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  defaultSelected?: boolean;
  required?: boolean;
  order?: number;
}

export interface SelectedSections {
  [key: string]: boolean;
}

import React, { useEffect } from "react";

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

import { useParams } from "next/navigation";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import mapMongoDataToReduxFormat from "@/lib/features/mapMongoDataToReduxFormat";
const AUTO_SAVE_INTERVAL = 30000; // 60 seconds in milliseconds

const AiResumeBuilder = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const router = useRouter();

  const resumeStateData = useAppSelector((state) => state.resume);

  function testData() {
    console.log("This is the test data for testing ", resumeStateData);
  }

  useEffect(() => {
    const fetchResumeData = async () => {
      if (
        !params?.id ||
        (typeof params.id === "string" && params.id.length !== 24)
      ) {
        router.push("/app/resumes");
        return;
      }

      try {
        const response = await api.get(`/resume/get-resume/${params.id}`);
        console.log("response.data.resume from server", response.data.resume);
        const mappedData = mapMongoDataToReduxFormat(response.data.resume);

        console.log("mappedData from server", mappedData);
        // dispatch(
        //   resumeActions.updateJobIndustry({
        //     experience: mappedData.jobIndustry.experience,
        //     industry: mappedData.jobIndustry.industry,
        //     targetJob: mappedData.jobIndustry.targetJob,
        //   })
        // );
        dispatch(resumeActions.updateJobIndustry(mappedData.jobIndustry));
        dispatch(resumeActions.updatePersonalInfo(mappedData.personalInfo));

        // dispatch(
        //   resumeActions.updatePersonalInfo({
        //     firstName: mappedData.personalInfo.firstName,
        //     lastName: mappedData.personalInfo.lastName,
        //     email: mappedData.personalInfo.email,
        //     phone: mappedData.personalInfo.phone,
        //     city: mappedData.personalInfo.city,
        //     country: mappedData.personalInfo.country,
        //     address: mappedData.personalInfo.address,
        //     postalCode: mappedData.personalInfo.postalCode,
        //   })
        // );
        dispatch(
          resumeActions.updateProfessionalSummary(
            mappedData.professionalSummary
          )
        );
        dispatch(resumeActions.setWorkExperience(mappedData.workExperience));
        // Dispatch all the data to Redux
        // dispatch(resumeActions.setProjects(mappedData.projects));
        // dispatch(resumeActions.setLanguages(mappedData.languages));
        // dispatch(resumeActions.setSelectedSkills(mappedData.selectedSkills));
        // dispatch(resumeActions.setAwards(mappedData.awards));
        // dispatch(
        //   resumeActions.setOpenSourceContributions(
        //     mappedData.openSourceContributions
        //   )
        // );
        // dispatch(resumeActions.setCustomSections(mappedData.customSections));

        // // Handle social links, education, and certificates
        // mappedData.socialLinks.forEach((link) => {
        //   dispatch(resumeActions.addSocialLink(link));
        // });

        // mappedData.education.forEach((edu: any) => {
        //   dispatch(resumeActions.addEducation(edu));
        // });

        // mappedData.certificate.forEach((cert: any) => {
        //   dispatch(resumeActions.addCertificate(cert));
        // });
      } catch (error: any) {
        console.error("Error fetching resume data:", error);
        if (error?.response?.status === 404) {
          router.push("/app/resumes");
        }
      }
    };

    fetchResumeData();
  }, [params?.id, dispatch, router]);

  // handle resume data save

  const handleResumeDataSave = async () => {
    if (
      params?.id &&
      typeof params.id === "string" &&
      params.id.length !== 24
    ) {
      router.push("/app/resumes");
      return null;
    }
    try {
      const response = await api.post("/resume/save-resume", {
        resumeId: params.id,
        resumeData: resumeStateData,
      });
      testData();
      console.log("resumeData  client", resumeStateData);

      console.log("response.data from server okkkk", response.data);

      if (response.data.success === false && response.data.redirect) {
        router.push(response.data.redirect);
      }

      // You might want to add some visual feedback for successful saves
      console.log("Resume data saved successfully");
    } catch (error: any) {
      // Handle errors appropriately
      console.error("Error saving resume data:", error);

      // Handle 404 errors specifically
      if (error?.response?.status === 404) {
        console.log("Resume not found, redirecting...");
        router.push("/app/resumes");
        return;
      }
    }
  };

  useEffect(() => {
    if (!params?.id) return;

    // handleResumeDataSave();

    const autoSaveInterval = setInterval(() => {
      handleResumeDataSave();
    }, AUTO_SAVE_INTERVAL);

    return () => {
      clearInterval(autoSaveInterval);
    };
  }, [resumeStateData]);

  // Return null if no ID is present
  if (!params?.id) {
    return null;
  }
  return (
    <div className="flex flex-col h-screen">
      {/* <AppHeader title="AI Resume Builder" /> */}

      <div className="flex-1 overflow-y-auto">
        <div className="flex max-md:flex-col ">
          {/* Left section */}
          <div className="w-full h-[63px] md:hidden bg-white border-b flex-shrink-0 sticky top-0 left-0 z-20"></div>

          <LeftSection />
          <SmallScreenResumeView />

          <div
            className={`w-full max-lg:flex hidden h-[63px] bg-white shadow-md border flex-shrink-0 fixed bottom-0 left-0 z-20 p-4  items-center justify-center`}
          >
            <button
              onClick={() => dispatch(setMobilePreview(true))}
              className={`w-full h-[40px] rounded bg-primary text-white text-center flex items-center justify-center`}
            >
              Preview & Download
            </button>
          </div>

          <div className="relative w-[60%] m-desktop:w-[64%]  max-lg:hidden ">
            <div
              className="sticky top-0 overflow-y-auto custom-scrollbar bg-[#8b97b1] "
              style={{ maxHeight: "calc(100vh)" }}
            >
              <div className=" min-h-screen max-h-[2040px] flex flex-row ">
                <ResumeViewTwo />
                <ResumeFeatureBox />
              </div>
              <FontAndDesignSection />
              <SelectResumeSlider />
              <ATSOptimizationBox />
              <AISuggestionsBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiResumeBuilder;
