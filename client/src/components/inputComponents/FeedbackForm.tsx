// import React, { useState } from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
//   SheetFooter,
//   SheetClose,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Slider } from "@/components/ui/slider";
// import { Checkbox } from "@/components/ui/checkbox";
// import { MessageCircleQuestion } from "lucide-react";

// const FeedbackForm = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     appRating: 5,
//     easeOfUse: "",
//     keyFeatures: [],
//     improvementFeature: "",
//     userGoal: "",
//     recommendationLikelihood: "",
//     additionalComments: "",
//     errorReported: "no",
//     errorDescription: "",
//   });

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     // Here you would typically send the formData to your backend
//     console.log("Feedback Submitted:", formData);
//     alert("Thank you for your feedback!");
//     setIsOpen(false);
//   };

//   const updateFormData = (key: any, value: any) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [key]: value,
//     }));
//   };

//   return (
//     <>
//       {/* Floating Feedback Button */}
//       <Button
//         onClick={() => setIsOpen(true)}
//         variant="outline"
//         size="icon"
//         className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-blue-500 text-white hover:bg-blue-600"
//       >
//         <MessageCircleQuestion className="h-6 w-6" />
//       </Button>

//       <Sheet open={isOpen} onOpenChange={setIsOpen}>
//         <SheetContent className="w-[500px] overflow-y-auto">
//           <SheetHeader>
//             <SheetTitle>AI Resume App Feedback</SheetTitle>
//             <SheetDescription>
//               Help us improve your experience by sharing your thoughts.
//             </SheetDescription>
//           </SheetHeader>

//           <form onSubmit={handleSubmit} className="space-y-6 py-4">
//             {/* App Rating */}
//             <div>
//               <Label>How would you rate this app out of 10?</Label>
//               <Slider
//                 defaultValue={[5]}
//                 max={10}
//                 step={1}
//                 onValueChange={(val) => updateFormData("appRating", val[0])}
//               />
//               <p className="text-sm text-muted-foreground mt-2">
//                 Current Rating: {formData.appRating}/10
//               </p>
//             </div>

//             {/* Ease of Use */}
//             <div>
//               <Label>How easy was it to use the app?</Label>
//               <RadioGroup
//                 onValueChange={(val) => updateFormData("easeOfUse", val)}
//                 className="grid grid-cols-3 gap-2"
//               >
//                 {[
//                   "Very Easy",
//                   "Easy",
//                   "Neutral",
//                   "Difficult",
//                   "Very Difficult",
//                 ].map((option) => (
//                   <div key={option} className="flex items-center space-x-2">
//                     <RadioGroupItem value={option} id={option} />
//                     <Label htmlFor={option}>{option}</Label>
//                   </div>
//                 ))}
//               </RadioGroup>
//             </div>

//             {/* Key Features */}
//             <div>
//               <Label>Which features were most useful to you?</Label>
//               <div className="grid grid-cols-2 gap-2 mt-2">
//                 {[
//                   "Template Design",
//                   "AI Suggestions",
//                   "User Interface",
//                   "Export Options",
//                   "Other",
//                 ].map((feature) => (
//                   <div key={feature} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={feature}
//                       onCheckedChange={(checked) => {
//                         const features = checked
//                           ? [...formData.keyFeatures, feature]
//                           : formData.keyFeatures.filter((f) => f !== feature);
//                         updateFormData("keyFeatures", features);
//                       }}
//                     />
//                     <Label htmlFor={feature}>{feature}</Label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Feature Improvement */}
//             <div>
//               <Label>Which feature needs improvement?</Label>
//               <Select
//                 onValueChange={(val) =>
//                   updateFormData("improvementFeature", val)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a feature" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[
//                     "Template Design",
//                     "AI Suggestions",
//                     "User Interface",
//                     "Export Options",
//                     "None",
//                     "Other",
//                   ].map((feature) => (
//                     <SelectItem key={feature} value={feature}>
//                       {feature}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* User Goals */}
//             <div>
//               <Label>What was your primary goal?</Label>
//               <Select onValueChange={(val) => updateFormData("userGoal", val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select your goal" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[
//                     "Job Application",
//                     "Skill Assessment",
//                     "General Feedback",
//                     "Other",
//                   ].map((goal) => (
//                     <SelectItem key={goal} value={goal}>
//                       {goal}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Recommendation Likelihood */}
//             <div>
//               <Label>Likelihood to recommend this app</Label>
//               <RadioGroup
//                 onValueChange={(val) =>
//                   updateFormData("recommendationLikelihood", val)
//                 }
//                 className="grid grid-cols-3 gap-2"
//               >
//                 {[
//                   "Definitely",
//                   "Maybe",
//                   "Neutral",
//                   "Unlikely",
//                   "Not at all",
//                 ].map((option) => (
//                   <div key={option} className="flex items-center space-x-2">
//                     <RadioGroupItem value={option} id={option} />
//                     <Label htmlFor={option}>{option}</Label>
//                   </div>
//                 ))}
//               </RadioGroup>
//             </div>

//             {/* Additional Comments */}
//             <div>
//               <Label>Additional comments or feedback</Label>
//               <Textarea
//                 placeholder="Share your thoughts..."
//                 value={formData.additionalComments}
//                 onChange={(e) =>
//                   updateFormData("additionalComments", e.target.value)
//                 }
//               />
//             </div>

//             {/* Error Reporting */}
//             <div>
//               <Label>Did you encounter any issues?</Label>
//               <RadioGroup
//                 onValueChange={(val) => updateFormData("errorReported", val)}
//                 className="grid grid-cols-2 gap-2"
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="yes" id="error-yes" />
//                   <Label htmlFor="error-yes">Yes</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="no" id="error-no" />
//                   <Label htmlFor="error-no">No</Label>
//                 </div>
//               </RadioGroup>
//               {formData.errorReported === "yes" && (
//                 <Textarea
//                   className="mt-2"
//                   placeholder="Describe the error you encountered..."
//                   value={formData.errorDescription}
//                   onChange={(e) =>
//                     updateFormData("errorDescription", e.target.value)
//                   }
//                 />
//               )}
//             </div>

//             <SheetFooter>
//               <Button type="submit" className="w-full">
//                 Submit Feedback
//               </Button>
//             </SheetFooter>
//           </form>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// };

// export default FeedbackForm;

// import React, { useState } from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
//   SheetFooter,
//   SheetClose,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Slider } from "@/components/ui/slider";
// import { MessageCircleQuestion, Upload } from "lucide-react";
// import { Input } from "@/components/ui/input";

// const FeedbackForm = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     appRating: 5,
//     easeOfUse: "",
//     keyFeatures: "",
//     improvementFeature: "",
//     userGoal: "",
//     recommendationLikelihood: "",
//     additionalComments: "",
//     errorReported: "no",
//     errorDescription: "",
//     attachedFiles: [],
//   });

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     // Here you would typically send the formData to your backend
//     console.log("Feedback Submitted:", formData);
//     alert("Thank you for your feedback!");
//     setIsOpen(false);
//   };

//   const updateFormData = (key: any, value: any) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [key]: value,
//     }));
//   };

//   const handleFileUpload = (event: any) => {
//     const files = Array.from(event.target.files);
//     const validFiles = files.filter(
//       (file: any) => file.size <= 20 * 1024 * 1024
//     ); // 20MB limit

//     if (validFiles.length !== files.length) {
//       alert("Some files were too large. Only files under 20MB are allowed.");
//     }

//     updateFormData("attachedFiles", validFiles);
//   };

//   return (
//     <>
//       {/* Floating Feedback Button */}
//       <Button
//         onClick={() => setIsOpen(true)}
//         variant="outline"
//         size="icon"
//         className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-blue-500 text-white hover:bg-blue-600"
//       >
//         <MessageCircleQuestion className="h-6 w-6" />
//       </Button>

//       <Sheet open={isOpen} onOpenChange={setIsOpen}>
//         <SheetContent className="w-[600px] overflow-y-auto font-body">
//           <SheetHeader>
//             <SheetTitle className="font-heading">
//               AI Resume App Feedback
//             </SheetTitle>
//             <SheetDescription className="font-blogText">
//               Help us improve your experience by sharing your thoughts.
//             </SheetDescription>
//           </SheetHeader>

//           <form onSubmit={handleSubmit} className="space-y-6 py-4">
//             {/* App Rating */}
//             <div>
//               <Label className="font-heading">
//                 How would you rate this app out of 10?
//               </Label>
//               <Slider
//                 defaultValue={[5]}
//                 max={10}
//                 step={1}
//                 onValueChange={(val) => updateFormData("appRating", val[0])}
//               />
//               <p className="text-sm text-muted-foreground mt-2 font-blogText">
//                 Current Rating: {formData.appRating}/10
//               </p>
//             </div>

//             {/* Ease of Use */}
//             <div>
//               <Label className="font-heading">
//                 How easy was it to use the app?
//               </Label>
//               <Select onValueChange={(val) => updateFormData("easeOfUse", val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select ease of use" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[
//                     "Very Easy",
//                     "Easy",
//                     "Neutral",
//                     "Difficult",
//                     "Very Difficult",
//                   ].map((option) => (
//                     <SelectItem key={option} value={option}>
//                       {option}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Key Features */}
//             <div>
//               <Label className="font-heading">
//                 Which features were most useful to you?
//               </Label>
//               <Select
//                 onValueChange={(val) => updateFormData("keyFeatures", val)}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select features" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[
//                     "Template Design",
//                     "AI Suggestions",
//                     "User Interface",
//                     "Export Options",
//                     "Other",
//                   ].map((feature) => (
//                     <SelectItem key={feature} value={feature}>
//                       {feature}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Feature Improvement */}
//             <div>
//               <Label className="font-heading">
//                 Which feature needs improvement?
//               </Label>
//               <Select
//                 onValueChange={(val) =>
//                   updateFormData("improvementFeature", val)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a feature" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[
//                     "Template Design",
//                     "AI Suggestions",
//                     "User Interface",
//                     "Export Options",
//                     "None",
//                     "Other",
//                   ].map((feature) => (
//                     <SelectItem key={feature} value={feature}>
//                       {feature}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* User Goals */}
//             <div>
//               <Label className="font-heading">
//                 What was your primary goal?
//               </Label>
//               <Select onValueChange={(val) => updateFormData("userGoal", val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select your goal" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[
//                     "Job Application",
//                     "Skill Assessment",
//                     "General Feedback",
//                     "Other",
//                   ].map((goal) => (
//                     <SelectItem key={goal} value={goal}>
//                       {goal}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Recommendation Likelihood */}
//             <div>
//               <Label className="font-heading">
//                 Likelihood to recommend this app
//               </Label>
//               <Select
//                 onValueChange={(val) =>
//                   updateFormData("recommendationLikelihood", val)
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select likelihood" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[
//                     "Definitely",
//                     "Maybe",
//                     "Neutral",
//                     "Unlikely",
//                     "Not at all",
//                   ].map((option) => (
//                     <SelectItem key={option} value={option}>
//                       {option}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Additional Comments */}
//             <div>
//               <Label className="font-heading">
//                 Additional comments or feedback
//               </Label>
//               <Textarea
//                 placeholder="Share your thoughts..."
//                 value={formData.additionalComments}
//                 onChange={(e) =>
//                   updateFormData("additionalComments", e.target.value)
//                 }
//                 className="font-blogText"
//               />
//             </div>

//             {/* Error Reporting */}
//             <div>
//               <Label className="font-heading">
//                 Did you encounter any issues?
//               </Label>
//               <Select
//                 onValueChange={(val) => updateFormData("errorReported", val)}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select an option" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="yes">Yes</SelectItem>
//                   <SelectItem value="no">No</SelectItem>
//                 </SelectContent>
//               </Select>

//               {formData.errorReported === "yes" && (
//                 <>
//                   <Textarea
//                     className="mt-2 font-blogText"
//                     placeholder="Describe the error you encountered..."
//                     value={formData.errorDescription}
//                     onChange={(e) =>
//                       updateFormData("errorDescription", e.target.value)
//                     }
//                   />

//                   <div className="mt-2">
//                     <Label className="font-heading">
//                       Upload Error Screenshots (Max 20MB)
//                     </Label>
//                     <div className="flex items-center justify-center w-full">
//                       <Label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                           <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
//                           <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                             <span className="font-semibold">
//                               Click to upload
//                             </span>{" "}
//                             or drag and drop
//                           </p>
//                           <p className="text-xs text-gray-500 dark:text-gray-400">
//                             PNG, JPG or PDF (Max 20MB)
//                           </p>
//                         </div>
//                         <Input
//                           id="dropzone-file"
//                           type="file"
//                           className="hidden"
//                           multiple
//                           accept=".png,.jpg,.jpeg,.pdf"
//                           onChange={handleFileUpload}
//                         />
//                       </Label>
//                     </div>
//                     {formData.attachedFiles.length > 0 && (
//                       <div className="mt-2">
//                         <Label className="font-heading">Uploaded Files:</Label>
//                         {formData.attachedFiles.map((file: any, index) => (
//                           <p key={index} className="text-sm font-blogText">
//                             {file.name}
//                           </p>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>

//             <SheetFooter>
//               <Button type="submit" className="w-full font-heading">
//                 Submit Feedback
//               </Button>
//             </SheetFooter>
//           </form>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// };

// export default FeedbackForm;

"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircleQuestion, Upload, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { folderNameEnum, uploadToS3 } from "@/lib/utils/s3";
import api from "@/lib/api";
import useAuth from "@/lib/hooks/useAuth";
import { toast } from "sonner";

// Interfaces for type safety
interface FeedbackData {
  appRating: number;
  easeOfUse: string[];
  keyFeatures: string[];
  improvementFeature: string[];
  userGoals: string[];
  recommendationLikelihood: string[];
  additionalComments: string;
  errorReported: boolean;
  errorDescription: string;
  attachedFiles: { name: string; url: string }[]; // Change from tuple to array
}

// Predefined options with type and multi-select capability
const feedbackOptions = {
  easeOfUse: ["Very Easy", "Easy", "Neutral", "Difficult", "Very Difficult"],
  keyFeatures: [
    "AI Resume Builder",
    "Multiple Templates",
    "Job Tracker",
    "ATS Optimization",
    "Real-time Editing",
    "Industry Insights",
    "Job-Targeted Resume",
    "Other",
  ],
  improvementFeature: [
    "User Interface",
    "Export Options",
    "AI Resume Builder",
    "Multiple Templates",
    "Job Tracker",
    "ATS Optimization",
    "Real-time Editing",
    "Job-Targeted Resume",
    "None",
    "Other",
  ],
  userGoals: [
    "Creating the Resume",
    "Optimizing Resume for Every Job",
    "Tracking Job Applications",
    "Personalizing for Job Roles",
    "Improving ATS Compatibility",
    "Updating Existing Resume",
    "Multiple Templates Support",
    "Simplifying Job Search",
    "Analyzing Job Matches",
    "Maximizing Opportunities",
    "Tracking Job Offers",
    "Other",
  ],
  recommendationLikelihood: [
    "Definitely",
    "Maybe",
    "Neutral",
    "Unlikely",
    "Not at all",
  ],
};

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FeedbackData>({
    appRating: 0,
    easeOfUse: [],
    keyFeatures: [],
    improvementFeature: [],
    userGoals: [],
    recommendationLikelihood: [],
    additionalComments: "",
    errorReported: false,
    errorDescription: "",
    attachedFiles: [],
  });

  const { user, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback Submitted:", formData);
    // alert("Thank you for your feedback!");
    if (!user?._id) return;
    if (isLoading) return;
    try {
      const response = await api.post("/feedback/add", {
        userId: user?._id,
        userFeedback: formData,
      });
      console.log("Response:", response);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          appRating: 0,
          easeOfUse: [],
          keyFeatures: [],
          improvementFeature: [],
          userGoals: [],
          recommendationLikelihood: [],
          additionalComments: "",
          errorReported: false,
          errorDescription: "",
          attachedFiles: [],
        });
      }
    } catch (error) {
      console.log("Error submitting feedback:", error);
      toast.error("Error submitting feedback");
    }

    setIsOpen(false);
  };

  const toggleOption = (
    key: keyof FeedbackData,
    value: string,
    multiSelect: boolean = false
  ) => {
    setFormData((prev) => {
      const currentValues = prev[key] as string[];

      if (multiSelect) {
        // Multi-select logic
        return {
          ...prev,
          [key]: currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value],
        };
      } else {
        // Single select logic
        return {
          ...prev,
          [key]: currentValues.includes(value) ? [] : [value],
        };
      }
    });
  };

  // const handleFileUpload = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const files = event.target.files ? Array.from(event.target.files) : [];
  //   const validFiles = files.filter((file) => file.size <= 20 * 1024 * 1024); // 20MB limit

  //   if (validFiles.length !== files.length) {
  //     alert("Some files were too large. Only files under 20MB are allowed.");
  //   }
  //   console.log(validFiles);

  //   const updatedFormData = await uploadToS3(
  //     validFiles[0],
  //     folderNameEnum.generalFiles
  //   );
  //   console.log(updatedFormData);

  //   setFormData((prev) => ({
  //     ...prev,
  //     attachedFiles: [{ url: updatedFormData, name: validFiles[0].name }], // Add the URL to the attachedFiles array
  //   }));
  // };

  // Reusable option selection component
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const validFiles = files.filter((file) => file.size <= 20 * 1024 * 1024); // 20MB limit

    if (validFiles.length !== files.length) {
      alert("Some files were too large. Only files under 20MB are allowed.");
    }

    // Upload all valid files
    const uploadPromises = validFiles.map(async (file) => {
      const fileUrl = await uploadToS3(file, folderNameEnum.generalFiles);
      return { url: fileUrl, name: file.name };
    });

    // Wait for all uploads to complete
    const uploadedFiles = await Promise.all(uploadPromises);

    setFormData((prev) => ({
      ...prev,
      attachedFiles: [...prev.attachedFiles, ...uploadedFiles],
    }));
  };
  const OptionSelector = ({
    options,
    selectedOptions,
    onSelect,
    title,
  }: {
    options: string[];
    selectedOptions: string[];
    onSelect: (value: string) => void;
    multiSelect?: boolean;
    title: string;
  }) => (
    <div className="space-y-2">
      <Label className="font-heading">{title}</Label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => onSelect(option)}
            className={cn(
              "border p-1.5  rounded cursor-pointer transition-all duration-200 ease-in-out",
              selectedOptions.includes(option)
                ? "bg-blue-50 border-blue-500"
                : "hover:bg-gray-50"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-blogText">{option}</span>
              {selectedOptions.includes(option) && (
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Feedback Button */}
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="fixed w-10 h-10 max-md:w-8 max-md:h-8 max-lg:w-10 max-lg:h-10 bottom-6 right-6 z-[60] rounded-full shadow-lg hover:text-slate-200 bg-blue-500 text-white hover:bg-blue-600"
      >
        <MessageCircleQuestion className="h-7 w-7 max-md:h-6 max-md:w-6 max-lg:w-7 max-lg:h-7" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-[600px] max-md:w-full  xl:min-w-[440px] z-[100] max-lg:mt-16 max-lg:pb-16 overflow-y-auto font-body">
          <SheetHeader>
            <SheetTitle className="font-heading">
              AI Resume App Feedback
            </SheetTitle>
            <SheetDescription className="font-blogText">
              Help us improve your experience by sharing your thoughts.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            {/* App Rating */}
            {/* <div>
              <Label className="font-heading">
                How would you rate this app out of 10?
              </Label>
              <Slider
                defaultValue={[5]}
                max={10}
                step={1}
                onValueChange={(val) =>
                  setFormData((prev) => ({
                    ...prev,
                    appRating: val[0],
                  }))
                }
              />
              <p className="text-sm text-muted-foreground mt-2 font-blogText">
                Current Rating: {formData.appRating}/10
              </p>
            </div> */}
            {/* App Rating */}
            <div>
              <Label className="font-heading">
                How would you rate this app out of 10?
              </Label>
              <div className="grid grid-cols-10 gap-1 mt-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                  <div
                    key={rating}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        appRating: rating,
                      }))
                    }
                    className={cn(
                      "border p-1.5 rounded cursor-pointer transition-all duration-200 ease-in-out text-center",
                      formData.appRating === rating
                        ? "bg-blue-50 border-blue-500"
                        : "hover:bg-gray-50"
                    )}
                  >
                    {rating}
                  </div>
                ))}
              </div>
            </div>

            {/* Ease of Use (Single Select) */}
            <OptionSelector
              title="How easy was it to use the app?"
              options={feedbackOptions.easeOfUse}
              selectedOptions={formData.easeOfUse}
              onSelect={(value) => toggleOption("easeOfUse", value)}
            />

            {/* Key Features (Multi Select) */}
            <OptionSelector
              title="Which features were most useful to you?"
              options={feedbackOptions.keyFeatures}
              selectedOptions={formData.keyFeatures}
              onSelect={(value) => toggleOption("keyFeatures", value, true)}
              multiSelect
            />

            {/* Feature Improvement (Single Select) */}
            <OptionSelector
              title="Which feature needs improvement?"
              options={feedbackOptions.improvementFeature}
              selectedOptions={formData.improvementFeature}
              onSelect={(value) =>
                toggleOption("improvementFeature", value, true)
              }
            />

            {/* User Goals (Multi Select) */}
            <OptionSelector
              title="What was your primary goal?"
              options={feedbackOptions.userGoals}
              selectedOptions={formData.userGoals}
              onSelect={(value) => toggleOption("userGoals", value, true)}
              multiSelect
            />

            {/* Recommendation Likelihood (Single Select) */}
            <OptionSelector
              title="Likelihood to recommend this app"
              options={feedbackOptions.recommendationLikelihood}
              selectedOptions={formData.recommendationLikelihood}
              onSelect={(value) =>
                toggleOption("recommendationLikelihood", value)
              }
            />

            {/* Additional Comments */}
            <div>
              <Label className="font-heading">
                Additional comments or feedback
              </Label>
              <Textarea
                placeholder="Share your thoughts..."
                value={formData.additionalComments}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    additionalComments: e.target.value,
                  }))
                }
                className="font-blogText rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Error Reporting */}
            <div>
              <Label className="font-heading">
                Did you encounter any issues?
              </Label>
              <div className="flex items-center space-x-4">
                {["Yes", "No"].map((option) => (
                  <div
                    key={option}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        errorReported: option === "Yes",
                      }))
                    }
                    className={cn(
                      "border p-1.5 rounded cursor-pointer transition-all duration-200 ease-in-out flex-1 text-center",
                      formData.errorReported === (option === "Yes")
                        ? "bg-blue-50 border-blue-500"
                        : "hover:bg-gray-50"
                    )}
                  >
                    {option}
                  </div>
                ))}
              </div>

              {formData.errorReported && (
                <>
                  <Textarea
                    className="mt-2 font-blogText rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Describe the error you encountered..."
                    value={formData.errorDescription}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        errorDescription: e.target.value,
                      }))
                    }
                  />

                  <div className="mt-2">
                    <Label className="font-heading">
                      Upload Error Screenshots (Max 20MB)
                    </Label>
                    <div className="flex items-center justify-center w-full mt-1">
                      <Label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                          <Upload className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG or PDF (Max 20MB)
                          </p>
                        </div>
                        <Input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          multiple
                          accept=".png,.jpg,.jpeg,.pdf"
                          onChange={handleFileUpload}
                        />
                      </Label>
                    </div>
                    {formData.attachedFiles.length > 0 && (
                      <div className="mt-2">
                        <Label className="font-heading">Uploaded Files:</Label>
                        {formData.attachedFiles.map((file, index) => (
                          <p key={index} className="text-sm font-blogText">
                            {file.name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <SheetFooter>
              <Button
                type="submit"
                className="w-full font-heading text-white font-semibold rounded"
              >
                Submit Feedback
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
