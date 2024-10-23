"use client";
import { useState, useCallback, useEffect } from "react";
import FloatingLabelSelect from "../../SelectFieldComponent";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateJobIndustry } from "@/lib/store/slices/resumeSlice";
import debounce from "lodash/debounce";

interface JobIndustryState {
  industry: string;
  targetJob: string;
  experience: string;
}

const JobIndustryFields = () => {
  const dispatch = useAppDispatch();
  const reduxJobIndustry = useAppSelector((state) => state.resume.jobIndustry);

  // Local state for immediate updates
  const [localJobIndustry, setLocalJobIndustry] = useState<JobIndustryState>({
    industry: reduxJobIndustry.industry || "",
    targetJob: reduxJobIndustry.targetJob || "",
    experience: reduxJobIndustry.experience || "",
  });

  // Debounced function to update Redux store
  const debouncedUpdateRedux = useCallback(
    debounce((field: keyof JobIndustryState, value: string) => {
      dispatch(updateJobIndustry({ [field]: value }));
    }, 300),
    [dispatch]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedUpdateRedux.cancel();
    };
  }, [debouncedUpdateRedux]);

  const handleSelectChange =
    (field: keyof JobIndustryState) => (value: string) => {
      // Update local state immediately
      setLocalJobIndustry((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Debounced update to Redux
      debouncedUpdateRedux(field, value);
    };

  const industryOptions = [
    { value: "tech", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
  ];

  const jobOptions = [
    { value: "developer", label: "Software Developer" },
    { value: "designer", label: "UI/UX Designer" },
    { value: "manager", label: "Project Manager" },
  ];

  const experienceOptions = [
    { value: "fresher", label: "Fresher" },
    { value: "0-2", label: "0-2 years" },
    { value: "2-5", label: "2-5 years" },
    { value: "5-10", label: "5-10 years" },
    { value: "10+", label: "10+ years" },
  ];

  return (
    <>
      <h3 className="font-heading font-semibold text-[16px] text-gray-900">
        Target Job & Industry
      </h3>
      <div className="max-w-full h-auto flex items-center justify-center gap-2 py-3">
        <div className="w-1/3">
          <FloatingLabelSelect
            label="Industry"
            options={industryOptions}
            value={localJobIndustry.industry}
            onChange={(value) => handleSelectChange("industry")(value)}
          />
        </div>
        <div className="w-1/3">
          <FloatingLabelSelect
            label="Target Job"
            options={jobOptions}
            value={localJobIndustry.targetJob}
            onChange={(value) => handleSelectChange("targetJob")(value)}
          />
        </div>
        <div className="w-1/3">
          <FloatingLabelSelect
            label="Experience"
            options={experienceOptions}
            value={localJobIndustry.experience}
            onChange={(value) => handleSelectChange("experience")(value)}
          />
        </div>
      </div>
    </>
  );
};

export default JobIndustryFields;
