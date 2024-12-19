import { useState, useEffect, useMemo } from "react";
import FloatingLabelSelect from "../../SelectFieldComponent";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateJobIndustry } from "@/lib/store/slices/resumeSlice";
import debounce from "lodash/debounce";
import {
  experienceOptions,
  industryOptions,
  jobOptions,
} from "../../../../public/content/inputFieldsData";

interface JobIndustryState {
  industry: string;
  targetJob: string;
  experience: string;
}

const JobIndustryFields = () => {
  const dispatch = useAppDispatch();
  const reduxJobIndustry = useAppSelector((state) => state.resume.jobIndustry);
  // const isTargetJobAndIndustrySelected = useAppSelector(
  //   (state) => state.resumeSateChange.isTargetJobAndIndustrySelected
  // );

  // Local state for immediate updates
  const [localJobIndustry, setLocalJobIndustry] = useState<JobIndustryState>({
    industry: reduxJobIndustry.industry || "",
    targetJob: reduxJobIndustry.targetJob || "",
    experience: reduxJobIndustry.experience || "",
  });

  useEffect(() => {
    setLocalJobIndustry({
      industry: reduxJobIndustry.industry || "",
      targetJob: reduxJobIndustry.targetJob || "",
      experience: reduxJobIndustry.experience || "",
    });
  }, [reduxJobIndustry]);

  // Debounced function to update Redux store
  const debouncedUpdateRedux = useMemo(
    () =>
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

  return (
    <>
      <div className={`w-full block lg:h-auto pb-1.5 `}>
        <h3 className="font-heading font-semibold pb-0.5 text-[16px] text-gray-900">
          Target Job & Industry
        </h3>
        <div className="max-w-full h-auto flex items-center justify-center gap-2 pt-1">
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
        {/* <div className="w-full h-auto  text-red-600 p-2 rounded border my-2">
          <span className="text-[16px]">
            Please fill out all Target Job & Industry fields to generate your
            resume description
          </span>
        </div> */}
        {/* {isTargetJobAndIndustrySelected && (
          <NotificationBox message="Please fill out all Target Job & Industry fields to generate your resume description" />
        )} */}
      </div>
    </>
  );
};

export default JobIndustryFields;
