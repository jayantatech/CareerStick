// // I made lots of comments to stop the AI from generating the description
// "use client";
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import debounce from "lodash/debounce";
// // import AIGeneratedSummaryDropdown from "@/components/AIGeneratedSummaryDropdown";
// import { TextareaField } from "@/components/inputComponents/TextareaField";
// import SectionTitle from "@/components/SectionTitle";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { updateProfessionalSummary } from "@/lib/store/slices/resumeSlice";
// import { Skeleton } from "@/components/ui/skeleton";
// // import api from "@/lib/api";
// // import useAuth from "@/lib/hooks/useAuth";
// // import { User } from "lucide-react";

// const ProfessionalSummaryField: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   // const [generatedSummaries, setGeneratedSummaries] = useState<string[]>([]);
//   // const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
//   // const [isInputValuesValid, setIsInputValuesValid] = useState<boolean>(false);

//   const dispatch = useAppDispatch();
//   const reduxSummary = useAppSelector((state) => state.resume);

//   // Local state for smooth updates
//   const [localSummary, setLocalSummary] = useState(
//     reduxSummary.professionalSummary.summaryText
//   );

//   // Fetch user data
//   // const { user, isLoading: userLoading } = useAuth();

//   // Sync local state with Redux when Redux state changes
//   useEffect(() => {
//     setLocalSummary(reduxSummary.professionalSummary.summaryText);
//   }, [reduxSummary.professionalSummary.summaryText]);

//   // Debounced function to update Redux
//   const debouncedUpdateRedux = useMemo(
//     () =>
//       debounce((value: string) => {
//         dispatch(updateProfessionalSummary({ summaryText: value }));
//       }, 1000),
//     [dispatch]
//   );

//   // Cleanup debounce on unmount
//   useEffect(() => {
//     return () => {
//       debouncedUpdateRedux.cancel();
//     };
//   }, [debouncedUpdateRedux]);

//   // Handle text changes with local state and debounced Redux updates
//   const handleSummaryChange = useCallback(
//     (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//       const newValue = e.target.value;
//       setLocalSummary(newValue);
//       debouncedUpdateRedux(newValue);
//     },
//     [debouncedUpdateRedux]
//   );

//   // Handle AI-generated summary selection
//   // const handleSummarySelect = useCallback(
//   //   (text: string) => {
//   //     setLocalSummary(text);
//   //     dispatch(updateProfessionalSummary({ summaryText: text }));
//   //   },
//   //   [dispatch]
//   // );

//   // Memoize the textarea component
//   const TextArea = useMemo(
//     () => (
//       <TextareaField
//         placeholder="Example: I have over 2 years of experience in software development, specializing in full-stack development with a focus on building scalable web applications, etc."
//         onChange={handleSummaryChange}
//         value={localSummary}
//       />
//     ),
//     [localSummary, handleSummaryChange]
//   );

//   // Generate Summary Function
//   // const generateSummary = async () => {
//   //   // Add more robust checking
//   //   if (generatedSummaries.length > 4) return;

//   //   try {
//   //     // Set loading state
//   //     // setIsSummaryLoading(true);

//   //     // Comprehensive validation
//   //     if (userLoading) {
//   //       console.log("User data is still loading");
//   //       return;
//   //     }

//   //     if (!user) {
//   //       console.error("No user data available");
//   //       return;
//   //     }

//   //     if (!user._id || !user.firstName) {
//   //       console.error("Incomplete user data");
//   //       return;
//   //     }

//   //     // Prepare API payload
//   //     // const payload = {
//   //     //   userId: user._id,
//   //     //   name: user.firstName,
//   //     //   jobTitle: reduxSummary.jobIndustry.targetJob || "",
//   //     //   yearsOfExperience: reduxSummary.jobIndustry.experience || 0,
//   //     //   jobIndustry: reduxSummary.jobIndustry.industry || "",
//   //     // };

//   //     // // Make API call
//   //     // const response = await api.post("/ai/get-job-description", payload);

//   //     // // Validate and set summaries
//   //     // if (response.data && response.data.summaries) {
//   //     //   setGeneratedSummaries(response.data.summaries);
//   //     // }

//   //     if (
//   //       !reduxSummary.jobIndustry.targetJob ||
//   //       !reduxSummary.jobIndustry.industry ||
//   //       !reduxSummary.jobIndustry.experience
//   //     ) {
//   //       // setIsInputValuesValid(false);
//   //       return;
//   //     }
//   //     const response = await api.post("/ai/get-job-description", {
//   //       userId: user?._id,
//   //       name: user?.firstName,
//   //       jobTitle: reduxSummary.jobIndustry.targetJob || "not provided",
//   //       yearsOfExperience: reduxSummary.jobIndustry.experience || 0,
//   //       jobIndustry: reduxSummary.jobIndustry.industry || "not provided",
//   //     });
//   //     console.log("the api is caled");

//   //     // Assuming the API returns an array of summaries
//   //     console.log("response.data for generateSummary", response.data);
//   //     if (response.data && response.data.summaries) {
//   //       setGeneratedSummaries(response.data.summaries);
//   //     }
//   //     console.log("generatedSummaries", generatedSummaries);
//   //   } catch (error) {
//   //     console.error("Failed to generate summaries:", error);
//   //     // Optionally handle error state
//   //   }
//   //   // finally {
//   //   //   // Always reset loading state
//   //   //   setIsSummaryLoading(false);
//   //   // }
//   // };

//   // Memoize the AI dropdown component
//   // const AIDropdown = useMemo(
//   //   () => (
//   //     <AIGeneratedSummaryDropdown
//   //       isInputValues={isInputValuesValid}
//   //       onSelect={handleSummarySelect}
//   //       summaries={generatedSummaries}
//   //       onClick={() => generateSummary()}
//   //       isLoading={isSummaryLoading}
//   //     />
//   //   ),
//   //   [
//   //     handleSummarySelect,
//   //     generatedSummaries,
//   //     isSummaryLoading,
//   //     user?._id,
//   //     userLoading,
//   //   ]
//   // );

//   // Initial loading effect
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div>
//       <Skeleton
//         className={`w-full h-[240px] bg-blue-50 ${
//           isLoading ? "block" : "hidden"
//         }`}
//       />
//       <div className={`w-full h-auto ${isLoading ? "hidden" : "block"}`}>
//         <SectionTitle label="Professional Summary" />

//         <div className="flex flex-col gap-4 py-1">
//           <div className="flex justify-between items-start gap-4 relative">
//             {TextArea}
//             {/* {AIDropdown} */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(ProfessionalSummaryField);
// I made lots of comments to stop the AI from generating the description

// "use client";
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import debounce from "lodash/debounce";
// import { TextareaField } from "@/components/inputComponents/TextareaField";
// import SectionTitle from "@/components/SectionTitle";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { updateProfessionalSummary } from "@/lib/store/slices/resumeSlice";
// import { Skeleton } from "@/components/ui/skeleton";

// const ProfessionalSummaryField: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   const dispatch = useAppDispatch();
//   const reduxSummary = useAppSelector((state) => state.resume);

//   // Local state for smooth updates
//   const [localSummary, setLocalSummary] = useState(
//     reduxSummary.professionalSummary.summaryText
//   );

//   useEffect(() => {
//     setLocalSummary(reduxSummary.professionalSummary.summaryText);
//   }, [reduxSummary.professionalSummary.summaryText]);

//   // Debounced function to update Redux
//   const debouncedUpdateRedux = useMemo(
//     () =>
//       debounce((value: string) => {
//         dispatch(updateProfessionalSummary({ summaryText: value }));
//       }, 1000),
//     [dispatch]
//   );

//   // Cleanup debounce on unmount
//   useEffect(() => {
//     return () => {
//       debouncedUpdateRedux.cancel();
//     };
//   }, [debouncedUpdateRedux]);

//   // Handle text changes with local state and debounced Redux updates
//   const handleSummaryChange = useCallback(
//     (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//       const newValue = e.target.value;
//       setLocalSummary(newValue);
//       debouncedUpdateRedux(newValue);
//     },
//     [debouncedUpdateRedux]
//   );

//   const TextArea = useMemo(
//     () => (
//       <TextareaField
//         placeholder="Example: I have over 2 years of experience in software development, specializing in full-stack development with a focus on building scalable web applications, etc."
//         onChange={handleSummaryChange}
//         value={localSummary}
//       />
//     ),
//     [localSummary, handleSummaryChange]
//   );

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div>
//       <Skeleton
//         className={`w-full h-[240px] bg-blue-50 ${
//           isLoading ? "block" : "hidden"
//         }`}
//       />
//       <div className={`w-full h-auto ${isLoading ? "hidden" : "block"}`}>
//         <SectionTitle label="Professional Summary" />

//         <div className="flex flex-col gap-4 py-1">
//           <div className="flex justify-between items-start gap-4 relative">
//             {TextArea}
//             {/* {AIDropdown} */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(ProfessionalSummaryField);
// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import dynamic from "next/dynamic";
// import debounce from "lodash/debounce";
// import SectionTitle from "@/components/SectionTitle";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { updateProfessionalSummary } from "@/lib/store/slices/resumeSlice";
// import { Skeleton } from "@/components/ui/skeleton";
// import type { ReactQuillProps } from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic<ReactQuillProps>(
//   async () => {
//     const { default: RQ } = await import("react-quill");
//     return function QuillWrapper({ ...props }: ReactQuillProps) {
//       return <RQ {...props} />;
//     };
//   },
//   { ssr: false, loading: () => <p>Loading editor...</p> }
// );

// interface QuillFieldProps {
//   value: string;
//   onChange: (content: string) => void;
// }

// const QuillField: React.FC<QuillFieldProps> = ({ value, onChange }) => {
//   const modules = {
//     toolbar: [
//       ["bold", "italic", "underline"],
//       [{ list: "ordered" }, { list: "bullet" }],
//     ],
//   };

//   const formats = [
//     // "header",
//     "bold",
//     "italic",
//     "underline",
//     // "strike",
//     "list",
//     "bullet",
//   ];

//   const handleChange: ReactQuillProps["onChange"] = (content) => {
//     onChange(content || "");
//   };

//   return (
//     <div className="w-full">
//       <ReactQuill
//         // theme="snow"
//         value={value}
//         onChange={handleChange}
//         modules={modules}
//         formats={formats}
//         className="bg-white min-h-[148px] max-h-[240px] rounded"
//       />
//     </div>
//   );
// };

// interface ResumeState {
//   professionalSummary: {
//     summaryText: string;
//   };
// }

// const ProfessionalSummaryField: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const dispatch = useAppDispatch();
//   const reduxSummary = useAppSelector(
//     (state: { resume: ResumeState }) => state.resume
//   );

//   const [localSummary, setLocalSummary] = useState(
//     reduxSummary.professionalSummary.summaryText
//   );

//   useEffect(() => {
//     setLocalSummary(reduxSummary.professionalSummary.summaryText);
//   }, [reduxSummary.professionalSummary.summaryText]);

//   const debouncedUpdateRedux = useMemo(
//     () =>
//       debounce((value: string) => {
//         dispatch(updateProfessionalSummary({ summaryText: value }));
//       }, 1000),
//     [dispatch]
//   );

//   useEffect(() => {
//     return () => {
//       debouncedUpdateRedux.cancel();
//     };
//   }, [debouncedUpdateRedux]);

//   const handleSummaryChange = useCallback(
//     (content: string) => {
//       setLocalSummary(content);
//       debouncedUpdateRedux(content);
//     },
//     [debouncedUpdateRedux]
//   );

//   const Editor = useMemo(
//     () => <QuillField value={localSummary} onChange={handleSummaryChange} />,
//     [localSummary, handleSummaryChange]
//   );

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div>
//       <Skeleton
//         className={`w-full h-[240px] bg-blue-50 ${
//           isLoading ? "block" : "hidden"
//         }`}
//       />
//       <div className={`w-full h-auto ${isLoading ? "hidden" : "block"}`}>
//         <SectionTitle label="Professional Summary" />
//         <div className="flex flex-col gap-4 py-1">
//           <div className="flex justify-between items-start gap-4 relative">
//             {Editor}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(ProfessionalSummaryField);

import React, { useState, useCallback, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import debounce from "lodash/debounce";
import SectionTitle from "@/components/SectionTitle";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateProfessionalSummary } from "@/lib/store/slices/resumeSlice";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Custom styles for Quill
const customStyles = `
.ql-container {
  font-family: inter, sans-serif !important;
  font-size: 16px !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 2px !important;
}

.ql-editor {
  padding: 16px !important;
  min-height: 148px !important;
  max-height: 240px !important;
  overflow-y: auto !important;
}

.ql-toolbar {
  border: 1px solid #e5e7eb !important;
  border-radius: 2px !important;
  margin-bottom: 8px !important;
  background-color: #f9fafb !important;
  padding: 8px !important;
}

.ql-editor p {
  margin-bottom: 0.5rem !important;
}

.ql-editor ul, .ql-editor ol {
  padding-left: 1.5rem !important;
  margin-bottom: 0.5rem !important;
}

.ql-editor ul > li {
  list-style-type: none !important; /* Changed from disc */
  padding-left: 0.5rem !important;
}

.ql-editor ol > li {
  list-style-type: none !important; /* Changed from decimal */
  padding-left: 0.5rem !important;
}

.ql-snow .ql-toolbar button {
  width: 28px !important;
  height: 28px !important;
  padding: 4px !important;
}

.ql-snow .ql-toolbar button:hover {
  background-color: #f3f4f6 !important;
  border-radius: 2px !important;
}

.ql-active {
  background-color: #e5e7eb !important;
  border-radius: 2px !important;
}
`;

const ReactQuill = dynamic<ReactQuillProps>(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function QuillWrapper({ ...props }: ReactQuillProps) {
      return (
        <>
          <style>{customStyles}</style>
          <RQ {...props} />
        </>
      );
    };
  },
  { ssr: false, loading: () => <p>Loading editor...</p> }
);

interface QuillFieldProps {
  value: string;
  onChange: (content: string) => void;
}

const QuillField: React.FC<QuillFieldProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    },
  };

  const formats = ["bold", "italic", "underline", "list", "bullet"];

  const handleChange: ReactQuillProps["onChange"] = (content) => {
    onChange(content || "");
  };

  return (
    <div className="w-full">
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="Example: I have over 2 years of experience in software development, specializing in full-stack development."
        // placeholder="Write your professional summary..."
        className="bg-white rounded shadow-sm  transition-shadow duration-200"
      />
    </div>
  );
};

interface ResumeState {
  professionalSummary: {
    summaryText: string;
  };
}

const ProfessionalSummaryField: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const reduxSummary = useAppSelector(
    (state: { resume: ResumeState }) => state.resume
  );

  const [localSummary, setLocalSummary] = useState(
    reduxSummary.professionalSummary.summaryText
  );

  useEffect(() => {
    setLocalSummary(reduxSummary.professionalSummary.summaryText);
  }, [reduxSummary.professionalSummary.summaryText]);

  const debouncedUpdateRedux = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(updateProfessionalSummary({ summaryText: value }));
      }, 1000),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      debouncedUpdateRedux.cancel();
    };
  }, [debouncedUpdateRedux]);

  const handleSummaryChange = useCallback(
    (content: string) => {
      setLocalSummary(content);
      debouncedUpdateRedux(content);
    },
    [debouncedUpdateRedux]
  );

  const Editor = useMemo(
    () => <QuillField value={localSummary} onChange={handleSummaryChange} />,
    [localSummary, handleSummaryChange]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      <Skeleton
        className={`w-full h-[240px] bg-blue-50 ${
          isLoading ? "block" : "hidden"
        }`}
      />
      <div className={`w-full h-auto ${isLoading ? "hidden" : "block"}`}>
        <SectionTitle label="Professional Summary" />
        <div className="mt-2">
          <div className="relative">{Editor}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfessionalSummaryField);
