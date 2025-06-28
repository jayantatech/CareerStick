// import React from "react";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { LinkedinIcon } from "lucide-react";
// import { TextareaField } from "@/components/inputComponents/TextareaField";

// const AIResumePrompt = () => {
//   const handleGenerate = () => {
//     // Handle resume generation
//     console.log("Generating resume...");
//   };

//   const handleLinkedInFetch = () => {
//     // Handle LinkedIn data fetch
//     console.log("Fetching LinkedIn data...");
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-sm">
//       <div className="space-y-2">
//         <h2 className="text-2xl font-bold text-gray-900">
//           AI Resume Generator
//         </h2>
//         <p className="text-sm text-gray-600">
//           Enter your details or import from LinkedIn to generate a professional
//           resume
//         </p>
//       </div>

//       <TextareaField
//         label="Enter your professional details"
//         placeholder="Describe your experience, skills, and career goals..."
//         onChange={(e) => console.log(e.target.value)}
//       />

//       <div className="flex flex-col sm:flex-row gap-4">
//         <Button
//           className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
//           onClick={handleGenerate}
//         >
//           Generate Resume
//         </Button>

//         <Button
//           className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800"
//           onClick={handleLinkedInFetch}
//         >
//           <LinkedinIcon className="w-4 h-4 mr-2" />
//           Import from LinkedIn
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default AIResumePrompt;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "lucide-react";
import { TextareaField } from "@/components/inputComponents/TextareaField";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { setLinkedInImportBoxState } from "@/lib/store/slices/resumeFeatureState";
import LinkedInImport from "@/components/popups/LinkedInImport";
import { VscHubot } from "react-icons/vsc";
import api from "@/lib/api";
import useAuth from "@/lib/hooks/useAuth";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  setIsAIFeatureRequested,
  setResumeState,
} from "@/lib/store/slices/resumeStateChangeSlice";

const AIResumePrompt = () => {
  const [prompt, setPrompt] = useState("");

  const { user, isLoading } = useAuth();

  const resumeId = useParams();

  const resumeData = useAppSelector((state) => state.resume);

  console.log(
    "resumeData",
    resumeData,
    "resumeId, resumeId",
    resumeId,
    "user, user",
    user
  );

  const handleGenerate = async () => {
    console.log("Generating resume...");
    if (!user?._id) {
      return;
    }
    if (isLoading) return;

    if (!resumeId) return;

    try {
      dispatch(setIsAIFeatureRequested(true));
      console.log(
        "prompt",
        prompt,
        "userId",
        user._id,
        "resumeId",
        resumeId.id
      );
      const response = await api.post(`/ai/generate-resume-with-prompt`, {
        prompt,
        userId: user._id,
        resumeId: resumeId.id,
        resumeData: resumeData,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setResumeState(true));
        dispatch(setIsAIFeatureRequested(false));
        setPrompt("");
      }
    } catch {
      toast.error("Something went wrong");
      dispatch(setIsAIFeatureRequested(false));
      setPrompt("");
    }
  };
  const dispatch = useAppDispatch();

  // const handleLinkedInFetch = () => {
  //   console.log("Fetching LinkedIn data...");
  //   dispatch(setLinkedInImportBoxState(true));
  // };

  return (
    <div className="w-full bg-white rounded border border-gray-200">
      <div className="px-4 pt-3 flex items-center gap-1 justify-start">
        <h3 className="font-heading font-semibold pb-1 text-[16px]  text-gray-900">
          Tell me about your experience
        </h3>
      </div>
      <div className="px-4">
        <TextareaField
          placeholder="Enter your name, contact, job history, education, and skills, and let our StickbotAI model build your perfect resume in seconds!"
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="px-4 pb-4 pt-2 flex gap-3 max-md:flex-col-reverse">
        <LinkedInImport>
          <div className="md:flex-1 max-md:-mt-1 flex items-center justify-center border shadow-sm cursor-pointer border-gray-200 hover:bg-gray-50 text-gray-700 rounded text-sm h-9">
            <LinkedinIcon className="w-4 h-4 mr-2" />
            Import from LinkedIn
          </div>
        </LinkedInImport>
        <Button
          className="flex-1 bg-blue-600 flex items-center font-semibold capitalize justify-center gap-1 hover:bg-blue-700 text-white rounded text-sm h-9"
          onClick={() => {
            handleGenerate();
          }}
        >
          <VscHubot className="text-[22px]" />
          Generate Resume
        </Button>
      </div>
    </div>
  );
};

export default AIResumePrompt;
