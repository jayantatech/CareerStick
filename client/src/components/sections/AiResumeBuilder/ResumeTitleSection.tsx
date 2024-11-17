import React, {
  useState,
  ChangeEvent,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setResumeTitle } from "@/lib/store/slices/resumeSlice";
import debounce from "lodash/debounce";
import { DebouncedFunc } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import FloatingLabelInput from "../../inputComponents/TextInputField";

interface ResumeTitleInfo {
  title: string;
}

const ResumeTitleField = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const reduxResumeTitle = useAppSelector((state) => state.resume.resumeTitle);

  const [newResumeTitle, setNewResumeTitle] = useState<ResumeTitleInfo>({
    title: reduxResumeTitle || "",
  });

  useEffect(() => {
    setNewResumeTitle({
      title: reduxResumeTitle || "",
    });
  }, [reduxResumeTitle]);

  // Create debouncedUpdateRedux inside the component to properly track dependencies
  const debouncedFnRef = useRef<DebouncedFunc<(value: string) => void>>();

  // Cleanup debounce on unmount
  useEffect(() => {
    debouncedFnRef.current = debounce((value: string) => {
      dispatch(setResumeTitle(value));
    }, 1000);

    return () => {
      debouncedFnRef.current?.cancel();
    };
  }, [dispatch]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewResumeTitle((prev) => ({
      ...prev,
      title: value,
    }));
    debouncedFnRef.current?.(value);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Skeleton
        className={`w-full h-[80px] bg-blue-50 ${
          isLoading ? "block" : "hidden"
        }`}
      />
      <div className={`${isLoading ? "hidden" : "block"}`}>
        {/* <h3 className="font-heading font-semibold text-[16px] text-gray-900">
          Resume Title
        </h3> */}
        <div className="flex flex-col gap-4">
          <div className="w-full h-auto">
            <FloatingLabelInput
              label="Resume Title"
              inputType="text"
              value={newResumeTitle.title}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTitleField;
