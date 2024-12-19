// I made lots of comments to stop the AI from generating the description
"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
// import AIGeneratedSummaryDropdown from "@/components/AIGeneratedSummaryDropdown";
import { TextareaField } from "@/components/inputComponents/TextareaField";
import SectionTitle from "@/components/SectionTitle";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateProfessionalSummary } from "@/lib/store/slices/resumeSlice";
import { Skeleton } from "@/components/ui/skeleton";
// import api from "@/lib/api";
// import useAuth from "@/lib/hooks/useAuth";
// import { User } from "lucide-react";

const ProfessionalSummaryField: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [generatedSummaries, setGeneratedSummaries] = useState<string[]>([]);
  // const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
  // const [isInputValuesValid, setIsInputValuesValid] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const reduxSummary = useAppSelector((state) => state.resume);

  // Local state for smooth updates
  const [localSummary, setLocalSummary] = useState(
    reduxSummary.professionalSummary.summaryText
  );

  // Fetch user data
  // const { user, isLoading: userLoading } = useAuth();

  // Sync local state with Redux when Redux state changes
  useEffect(() => {
    setLocalSummary(reduxSummary.professionalSummary.summaryText);
  }, [reduxSummary.professionalSummary.summaryText]);

  // Debounced function to update Redux
  const debouncedUpdateRedux = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(updateProfessionalSummary({ summaryText: value }));
      }, 1000),
    [dispatch]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedUpdateRedux.cancel();
    };
  }, [debouncedUpdateRedux]);

  // Handle text changes with local state and debounced Redux updates
  const handleSummaryChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setLocalSummary(newValue);
      debouncedUpdateRedux(newValue);
    },
    [debouncedUpdateRedux]
  );

  // Handle AI-generated summary selection
  // const handleSummarySelect = useCallback(
  //   (text: string) => {
  //     setLocalSummary(text);
  //     dispatch(updateProfessionalSummary({ summaryText: text }));
  //   },
  //   [dispatch]
  // );

  // Memoize the textarea component
  const TextArea = useMemo(
    () => (
      <TextareaField
        placeholder="Example: I have over 2 years of experience in software development, specializing in full-stack development with a focus on building scalable web applications, etc."
        onChange={handleSummaryChange}
        value={localSummary}
      />
    ),
    [localSummary, handleSummaryChange]
  );

  // Generate Summary Function
  // const generateSummary = async () => {
  //   // Add more robust checking
  //   if (generatedSummaries.length > 4) return;

  //   try {
  //     // Set loading state
  //     // setIsSummaryLoading(true);

  //     // Comprehensive validation
  //     if (userLoading) {
  //       console.log("User data is still loading");
  //       return;
  //     }

  //     if (!user) {
  //       console.error("No user data available");
  //       return;
  //     }

  //     if (!user._id || !user.firstName) {
  //       console.error("Incomplete user data");
  //       return;
  //     }

  //     // Prepare API payload
  //     // const payload = {
  //     //   userId: user._id,
  //     //   name: user.firstName,
  //     //   jobTitle: reduxSummary.jobIndustry.targetJob || "",
  //     //   yearsOfExperience: reduxSummary.jobIndustry.experience || 0,
  //     //   jobIndustry: reduxSummary.jobIndustry.industry || "",
  //     // };

  //     // // Make API call
  //     // const response = await api.post("/ai/get-job-description", payload);

  //     // // Validate and set summaries
  //     // if (response.data && response.data.summaries) {
  //     //   setGeneratedSummaries(response.data.summaries);
  //     // }

  //     if (
  //       !reduxSummary.jobIndustry.targetJob ||
  //       !reduxSummary.jobIndustry.industry ||
  //       !reduxSummary.jobIndustry.experience
  //     ) {
  //       // setIsInputValuesValid(false);
  //       return;
  //     }
  //     const response = await api.post("/ai/get-job-description", {
  //       userId: user?._id,
  //       name: user?.firstName,
  //       jobTitle: reduxSummary.jobIndustry.targetJob || "not provided",
  //       yearsOfExperience: reduxSummary.jobIndustry.experience || 0,
  //       jobIndustry: reduxSummary.jobIndustry.industry || "not provided",
  //     });
  //     console.log("the api is caled");

  //     // Assuming the API returns an array of summaries
  //     console.log("response.data for generateSummary", response.data);
  //     if (response.data && response.data.summaries) {
  //       setGeneratedSummaries(response.data.summaries);
  //     }
  //     console.log("generatedSummaries", generatedSummaries);
  //   } catch (error) {
  //     console.error("Failed to generate summaries:", error);
  //     // Optionally handle error state
  //   }
  //   // finally {
  //   //   // Always reset loading state
  //   //   setIsSummaryLoading(false);
  //   // }
  // };

  // Memoize the AI dropdown component
  // const AIDropdown = useMemo(
  //   () => (
  //     <AIGeneratedSummaryDropdown
  //       isInputValues={isInputValuesValid}
  //       onSelect={handleSummarySelect}
  //       summaries={generatedSummaries}
  //       onClick={() => generateSummary()}
  //       isLoading={isSummaryLoading}
  //     />
  //   ),
  //   [
  //     handleSummarySelect,
  //     generatedSummaries,
  //     isSummaryLoading,
  //     user?._id,
  //     userLoading,
  //   ]
  // );

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Skeleton
        className={`w-full h-[240px] bg-blue-50 ${
          isLoading ? "block" : "hidden"
        }`}
      />
      <div className={`w-full h-auto ${isLoading ? "hidden" : "block"}`}>
        <SectionTitle label="Professional Summary" />

        <div className="flex flex-col gap-4 py-1">
          <div className="flex justify-between items-start gap-4 relative">
            {TextArea}
            {/* {AIDropdown} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfessionalSummaryField);
