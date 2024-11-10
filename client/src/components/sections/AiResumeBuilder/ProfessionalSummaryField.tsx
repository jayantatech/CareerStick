"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import AIGeneratedSummaryDropdown from "@/components/AIGeneratedSummaryDropdown";
import { TextareaField } from "@/components/inputComponents/TextareaField";
import SectionTitle from "@/components/SectionTitle";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateProfessionalSummary } from "@/lib/store/slices/resumeSlice";
import { Skeleton } from "@/components/ui/skeleton";
const summaries = [
  "Experienced software developer with 5+ years in full-stack development, specializing in React and Node.js.",
  "Results-driven marketing professional with proven track record in digital campaign management and brand development.",
  "Creative graphic designer with expertise in Adobe Creative Suite and UI/UX principles.",
  "Detail-oriented project manager with PMP certification and experience leading cross-functional teams.",
  "Dynamic sales executive with consistent record of exceeding targets and building client relationships.",
  "Innovative product manager skilled in agile methodologies and stakeholder management.",
];
const ProfessionalSummaryField: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const reduxSummary = useAppSelector(
    (state) => state.resume.professionalSummary.summaryText
  );

  // Local state for smooth updates
  const [localSummary, setLocalSummary] = useState(reduxSummary);

  // Sync local state with Redux when Redux state changes
  useEffect(() => {
    setLocalSummary(reduxSummary);
  }, [reduxSummary]);

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
  const handleSummarySelect = useCallback(
    (text: string) => {
      setLocalSummary(text);
      dispatch(updateProfessionalSummary({ summaryText: text }));
    },
    [dispatch]
  );

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

  // Memoize the AI dropdown component
  const AIDropdown = useMemo(
    () => (
      <AIGeneratedSummaryDropdown
        onSelect={handleSummarySelect}
        summaries={summaries}
      />
    ),
    [handleSummarySelect]
  );

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
            {AIDropdown}
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoize the entire component
export default React.memo(ProfessionalSummaryField);
