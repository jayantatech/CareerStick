// "use client";

// import React, { useEffect, useState } from "react";
// import { useAppDispatch } from "@/lib/store/hooks";
// import { setMobilePreview } from "@/lib/store/slices/activeResumeSectionClice";
// import ResumeViewTwo from "@/components/sections/resumes/ResumeViewTwo";
// import SelectResumeSlider from "@/components/resume/SelectResumeSlider";
// import ResumeFeatureBox from "@/components/resume/ResumeFeatureBox";
// import FontAndDesignSection from "@/components/resume/FontAndDesignSection";
// import ATSOptimizationBox from "@/components/resume/ATSOptimizationBox";
// import AISuggestionsBox from "@/components/resume/AISuggestionsBox";
// import LeftSection from "@/components/sections/AiResumeBuilder/home/LeftSection";
// import SmallScreenResumeView from "@/components/resume/SmallScreenResumeView";
// import AddSectionPopup from "@/components/app/AddSectionPopup";
// import { useResumeData } from "@/lib/hooks/useResumeData";
// import PageLoading from "@/components/loading/PageLoading";

// const AiResumeBuilder: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   // Use sessionStorage to track if the page has been loaded in this session
//   const [hasLoadedInSession, setHasLoadedInSession] = useState(false);

//   const dispatch = useAppDispatch();
//   const { isValidResumeId } = useResumeData();

//   if (!isValidResumeId) {
//     return null;
//   }

//   useEffect(() => {
//     // Check if this is the first load in the current session
//     const hasLoaded = sessionStorage.getItem("hasLoadedResumeBuilder");

//     if (!hasLoaded) {
//       // Set the loading state for 2.5 seconds only on first visit
//       const timer = setTimeout(() => {
//         setIsLoading(false);
//         // Mark as loaded in session storage
//         sessionStorage.setItem("hasLoadedResumeBuilder", "true");
//         setHasLoadedInSession(true);
//       }, 2500);

//       return () => clearTimeout(timer);
//     } else {
//       // If already loaded in this session, don't show loading screen
//       setIsLoading(false);
//       setHasLoadedInSession(true);
//     }
//   }, []);

//   return (
//     <div className="flex flex-col h-screen">
//       {isLoading && !hasLoadedInSession && <PageLoading />}
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
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { setMobilePreview } from "@/lib/store/slices/activeResumeSectionClice";
import SelectResumeSlider from "@/components/resume/SelectResumeSlider";
import ResumeFeatureBox from "@/components/resume/ResumeFeatureBox";
import FontAndDesignSection from "@/components/resume/FontAndDesignSection";
import ATSOptimizationBox from "@/components/resume/ATSOptimizationBox";
import AISuggestionsBox from "@/components/resume/AISuggestionsBox";
import LeftSection from "@/components/sections/AiResumeBuilder/home/LeftSection";
import SmallScreenResumeView from "@/components/resume/SmallScreenResumeView";
import AddSectionPopup from "@/components/app/AddSectionPopup";
import { useResumeData } from "@/lib/hooks/useResumeData";
import PageLoading from "@/components/loading/PageLoading";
import ResumeSliderTwo from "@/components/resume/ResumeSliderTwo";
import AppMobileHeader from "@/components/headers/AppMobileHeader";

const AiResumeBuilder: React.FC = () => {
  const { isValidResumeId } = useResumeData();
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedInSession, setHasLoadedInSession] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Only proceed if resume ID is valid
    if (!isValidResumeId) return;

    // Check if this is the first load in the current session
    const hasLoaded = sessionStorage.getItem("hasLoadedResumeBuilder");

    if (!hasLoaded) {
      // Set the loading state for 2.5 seconds only on first visit
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Mark as loaded in session storage
        sessionStorage.setItem("hasLoadedResumeBuilder", "true");
        setHasLoadedInSession(true);
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      // If already loaded in this session, don't show loading screen
      setIsLoading(false);
      setHasLoadedInSession(true);
    }
  }, [isValidResumeId]);

  // If resume ID is not valid, return null
  if (!isValidResumeId) {
    return null;
  }
  // const linkedInImportBoxState = useAppSelector(
  //   (state) => state.resumeFeatureState.linkedInImportBoxState
  // );
  return (
    <div className="flex flex-col h-screen">
      {isLoading && !hasLoadedInSession && <PageLoading />}
      <div className="flex-1 overflow-y-auto">
        <div className="flex max-md:flex-col">
          {/* Mobile header */}
          <AppMobileHeader />
          {/* <div className="w-full h-[63px] md:hidden bg-white border-b flex-shrink-0 sticky top-0 left-0 z-20"></div> */}

          {/* Main sections */}
          <LeftSection />
          {/* Mobile resume view */}
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
              className="sticky top-0 overflow-y-auto custom-scrollbar lg:pb-16 bg-[#8b97b1]  " //bg-[#8b97b1]
              style={{ maxHeight: "calc(100vh)" }}
            >
              <div className="min-h-screen  w-auto   flex flex-row">
                {" "}
                {/* //max-h-[2040px] */}
                {/* <ResumeViewTwo /> */}
                {/* <div> */}
                <ResumeSliderTwo />
                {/* </div> */}
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
