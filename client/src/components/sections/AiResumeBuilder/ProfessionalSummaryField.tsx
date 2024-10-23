// import AIGeneratedSummaryDropdown from "@/components/AIGeneratedSummaryDropdown";
// import { TextareaField } from "@/components/inputComponents/TextareaField";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
// import SectionTitle from "@/components/SectionTitle";
// import React, { useState } from "react";
// import { BsChatRightTextFill } from "react-icons/bs";

// const ProfessionalSummaryField = () => {
//   const [summaryText, setSummaryText] = useState("");

//   const handleSummarySelect = (text: any) => {
//     setSummaryText(text);
//   };
//   return (
//     <>
//       <SectionTitle label="Professional Summary" />

//       <div className="flex flex-col gap-4 py-1">
//         <div className="flex justify-between items-start gap-4 relative">
//           <TextareaField
//             placeholder="Example: I have over 2 years of experience in software development, specializing in full-stack development with a focus on building scalable web applications, etc."
//             onChange={(e) => setSummaryText(e.target.value)}
//             value={summaryText}
//           />
//           <AIGeneratedSummaryDropdown onSelect={handleSummarySelect} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfessionalSummaryField;
"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import AIGeneratedSummaryDropdown from "@/components/AIGeneratedSummaryDropdown";
import { TextareaField } from "@/components/inputComponents/TextareaField";
import SectionTitle from "@/components/SectionTitle";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateProfessionalSummary } from "@/lib/store/slices/resumeSlice";

const ProfessionalSummaryField: React.FC = () => {
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
    () => <AIGeneratedSummaryDropdown onSelect={handleSummarySelect} />,
    [handleSummarySelect]
  );

  return (
    <div className="w-full">
      <SectionTitle label="Professional Summary" />

      <div className="flex flex-col gap-4 py-1">
        <div className="flex justify-between items-start gap-4 relative">
          {TextArea}
          {AIDropdown}
        </div>
      </div>
    </div>
  );
};

// Memoize the entire component
export default React.memo(ProfessionalSummaryField);

//working code
// import AIGeneratedSummaryDropdown from "@/components/AIGeneratedSummaryDropdown";
// import { TextareaField } from "@/components/inputComponents/TextareaField";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
// import SectionTitle from "@/components/SectionTitle";
// import React from "react";
// import { BsChatRightTextFill } from "react-icons/bs";

// const ProfessionalSummaryField = () => {
//   return (
//     <>
//       {/* <h3 className="font-heading font-semibold text-[16px] text-gray-900">
//   Professional Summary{" "}
// </h3> */}
//       <SectionTitle label="Professional Summary" />
//       {/* <p className="font-body font-normal text-[15px] text-gray-500">
//         Share a brief summary, and our AI will turn it into a polished
//         professional statement. Or, click 'Generate Template' for a quick start.
//       </p> */}
//       <div className="flex flex-col gap-4 py-1">
//         <div className="w-full h-auto relative ">
//           {/* <div className="w-[510px] h-[220px] bg-blue-200 rounded absolute bottom-0 left-0"></div> */}
//           {/* <div className="w-auto h-[36px] cursor-pointer border bg-primary border-white text-white absolute bottom-3 p-2 right-2 rounded flex items-center justify-center gap-1">
//             <BsChatRightTextFill className="mt-1.5" />
//             <p className="text-[14px] font-body font-semibold">
//               AI Generated Summary
//             </p>
//           </div> */}
//           <AIGeneratedSummaryDropdown />
//           <TextareaField placeholder="Example: I have over 2 years of experience in software development, specializing in full-stack development with a focus on building scalable web applications, etc." />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfessionalSummaryField;
