// import AppHeader from "@/components/AppHeader";

// const ResumeOptimizer = () => {
//   return (
//     <div className="flex flex-col h-screen">
//       <AppHeader title="Resume Optimizer" />
//       <div className=" h-full flex flex-col items-center justify-center bg-[#F3F5F6] p-4">
//         <div className="bg-white rounded-lg shadow-xl p-4 md:p-12 max-w-2xl w-full">
//           <h1
//             className={`font-heading text-3xl md:text-4xl font-bold text-[#3B41E9] mb-4 text-center`}
//           >
//             Resume-Optimizer
//           </h1>
//           <div
//             className={`font-heading text-xl md:text-2xl font-semibold text-[#3B41E9] mb-6 text-center`}
//           >
//             Coming Soon
//           </div>
//           <p className={`font-body text-[17px] text-gray-600 mb-8 text-center`}>
//             Get ready to transform your resume! Our AI-powered tool is coming
//             soon to help you optimize your existing resume with just one click.
//             Stay tuned!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeOptimizer;

// import React from "react";
// import { Badge, Calendar, CheckCircle, TrendingUp, Upload } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import AppHeader from "@/components/AppHeader";
// import { Progress } from "@/components/ui/progress";

// const ResumeOptimizer = () => {
//   // const dummyResults = [
//   //   { fileName: "Senior_Developer_Resume.pdf", score: 85, date: "2024-01-18" },
//   //   { fileName: "Product_Manager_CV.docx", score: 92, date: "2024-01-17" },
//   //   { fileName: "Marketing_Resume.pdf", score: 78, date: "2024-01-15" },
//   // ];

//   const dummyResults = [
//     {
//       fileName: "Resume_v1.pdf",
//       date: "2023-06-15",
//       score: 85,
//       improvement: 5,
//       matchedJobs: 7,
//     },
//     {
//       fileName: "CV_updated.docx",
//       date: "2023-07-02",
//       score: 92,
//       improvement: 12,
//       matchedJobs: 12,
//     },
//     {
//       fileName: "JobApplication.pdf",
//       date: "2023-07-20",
//       score: 78,
//       improvement: 0,
//       matchedJobs: 4,
//     },
//   ];
//   return (
//     <div className="flex flex-col h-screen">
// <div className="flex-shrink-0 sticky top-0 left-0 z-20">
//   <AppHeader title="Resume Optimizer" />
// </div>

//       <div className="min-h-screen bg-[#F3F5F6] py-12">
//         {/* Hero Upload Section */}
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="bg-white rounded shadow-lg p-6 mb-12">
//             <div className="border-2 border-dashed border-[#3B41E9] rounded p-8 text-center cursor-pointer hover:bg-[#EFF0FD] transition-colors">
//               <Upload className="mx-auto mb-4 text-[#3B41E9]" size={48} />
//               <h2 className="text-2xl font-semibold mb-2 text-gray-800">
//                 Upload Your Resume
//               </h2>
//               <p className="text-gray-600 mb-4">
//                 Drop your resume file or click to browse
//               </p>
//               <p className="text-sm text-gray-500">
//                 Supports PDF, DOC, DOCX (Max 5MB)
//               </p>
//             </div>
//           </div>

//           {/* Previous Results Section */}
//           {/* <div className="space-y-4">
//             <h3 className="text-xl font-semibold text-gray-800 mb-6">
//               Previous ATS Checks
//             </h3>
//             {dummyResults.map((result, index) => (
//               <Card
//                 key={index}
//                 className="bg-white hover:shadow-md transition-shadow"
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div className="flex-1">
//                       <h4 className="font-medium text-gray-800 mb-1">
//                         {result.fileName}
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         Checked on {result.date}
//                       </p>
//                     </div>
//                     <div className="flex items-center">
//                       <div className="bg-[#EFF0FD] text-[#3B41E9] font-semibold px-4 py-2 rounded-full">
//                         Score: {result.score}%
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div> */}
//           <div className="w-full max-w-4xl mx-auto ">
//             <h3 className="text-2xl font-bold text-gray-800 mb-6">
//               Previous ATS Checks
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {dummyResults.map((result, index) => (
//                 <Card
//                   key={index}
//                   className="bg-white rounded shadow cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-[.99] overflow-hidden border-t-4 border-primary"
//                 >
//                   <CardContent className="p-4">
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <h4 className="font-semibold text-lg text-gray-800 truncate mb-1">
//                           {result.fileName}
//                         </h4>
//                         <div className="flex items-center text-sm text-gray-500">
//                           <Calendar className="w-4 h-4 mr-2" />
//                           {result.date}
//                         </div>
//                       </div>
//                       <div
//                         className={`px-3 py-1 rounded text-sm font-medium ${
//                           result.score >= 85
//                             ? "bg-green-100 text-green-800"
//                             : result.score >= 70
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {result.score}%
//                       </div>
//                     </div>
//                     <Progress value={result.score} className="h-2 mb-4" />
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-gray-600 flex items-center">
//                           <TrendingUp className="w-4 h-4 mr-2" />
//                           Improvement
//                         </span>
//                         <span
//                           className={`font-medium ${
//                             result.improvement > 0
//                               ? "text-green-600"
//                               : "text-gray-600"
//                           }`}
//                         >
//                           {result.improvement > 0
//                             ? `+${result.improvement}%`
//                             : "No change"}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-gray-600 flex items-center">
//                           <CheckCircle className="w-4 h-4 mr-2" />
//                           Matched Jobs
//                         </span>
//                         <span className="font-medium text-blue-600">
//                           {result.matchedJobs}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeOptimizer;

// "use client";
// import React, { useState } from "react";
// import {
//   Badge,
//   Calendar,
//   CheckCircle,
//   TrendingUp,
//   Upload,
//   Trash2,
//   X,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import AppHeader from "@/components/AppHeader";
// import { Progress } from "@/components/ui/progress";

// const ResumeOptimizer = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [jobDialogOpen, setJobDialogOpen] = useState(false);
//   const [jobDetails, setJobDetails] = useState(null);
//   const [results, setResults] = useState([
//     {
//       id: 1,
//       fileName: "Resume_v1.pdf",
//       date: "2023-06-15",
//       score: 85,
//       improvement: 5,
//       issuesFound: [
//         "Missing key skills",
//         "No quantifiable achievements",
//         "Weak action verbs",
//       ],
//     },
//     {
//       id: 2,
//       fileName: "CV_updated.docx",
//       date: "2023-07-02",
//       score: 92,
//       improvement: 12,
//       issuesFound: ["Formatting inconsistencies", "Too lengthy"],
//     },
//     {
//       id: 3,
//       fileName: "JobApplication.pdf",
//       date: "2023-07-20",
//       score: 78,
//       improvement: 0,
//       issuesFound: [
//         "Missing keywords",
//         "No clear objectives",
//         "Poor formatting",
//       ],
//     },
//   ]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const allowedTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ];

//       if (!allowedTypes.includes(file.type)) {
//         alert("Please upload only PDF, DOC, or DOCX files");
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         alert("File size should not exceed 5MB");
//         return;
//       }

//       setSelectedFile(file);
//     }
//   };

//   const handleJobSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     setJobDetails({
//       title: formData.get("jobTitle"),
//       description: formData.get("jobDescription"),
//     });
//     setJobDialogOpen(false);
//   };

//   const handleDeleteResult = (id) => {
//     setResults(results.filter((result) => result.id !== id));
//   };

//   const handleCheckScore = () => {
//     if (!selectedFile) {
//       alert("Please upload a resume first");
//       return;
//     }
//     if (!jobDetails) {
//       alert("Please add a target job description");
//       return;
//     }
//     // Here you would typically make an API call to process the resume
//     alert(
//       "Processing resume... This would typically connect to your backend API"
//     );
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
// <div className="flex-shrink-0 sticky top-0 left-0 z-20">
//   <AppHeader title="Resume Optimizer" />
// </div>

//       <div className="min-h-screen bg-[#F3F5F6] py-12">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//             {/* Upload Section */}
//             <div className="md:col-span-2">
//               <div className="bg-white rounded shadow-lg p-6">
//                 <label className="block">
//                   <div className="border-2 border-dashed border-[#3B41E9] rounded p-8 text-center cursor-pointer hover:bg-[#EFF0FD] transition-colors">
//                     <input
//                       type="file"
//                       className="hidden"
//                       accept=".pdf,.doc,.docx"
//                       onChange={handleFileChange}
//                     />
//                     <Upload className="mx-auto mb-4 text-[#3B41E9]" size={48} />
//                     <h2 className="text-2xl font-semibold mb-2 text-gray-800">
//                       Upload Your Resume
//                     </h2>
//                     <p className="text-gray-600 mb-4">
//                       {selectedFile
//                         ? selectedFile.name
//                         : "Drop your resume file or click to browse"}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Supports PDF, DOC, DOCX (Max 5MB)
//                     </p>
//                   </div>
//                 </label>
//               </div>
//             </div>

//             {/* Job Details Section */}
//             <div className="md:col-span-1">
//               <div className="bg-white rounded shadow-lg p-6">
//                 <h3 className="text-lg font-semibold mb-4">
//                   Target Job Details
//                 </h3>
//                 {jobDetails ? (
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-medium text-gray-700">Title</h4>
//                       <p className="text-gray-600">{jobDetails.title}</p>
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-700">Description</h4>
//                       <p className="text-gray-600 line-clamp-4">
//                         {jobDetails.description}
//                       </p>
//                     </div>
//                     <Button
//                       variant="outline"
//                       onClick={() => setJobDialogOpen(true)}
//                       className="w-full"
//                     >
//                       Edit Job Details
//                     </Button>
//                   </div>
//                 ) : (
//                   <Button
//                     variant="outline"
//                     onClick={() => setJobDialogOpen(true)}
//                     className="w-full"
//                   >
//                     + Add Target Job Description
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Check Score Button */}
//           <div className="text-center mb-12">
//             <Button
//               size="lg"
//               onClick={handleCheckScore}
//               className="bg-[#3B41E9] hover:bg-[#2A2FB8] text-white px-8"
//             >
//               Check Score
//             </Button>
//           </div>

//           {/* Previous Results Section */}
//           <div className="w-full">
//             <h3 className="text-2xl font-bold text-gray-800 mb-6">
//               Previous ATS Checks
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {results.map((result) => (
//                 <Card
//                   key={result.id}
//                   className="bg-white rounded shadow overflow-hidden border-t-4 border-primary relative group"
//                 >
//                   <button
//                     onClick={() => handleDeleteResult(result.id)}
//                     className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <Trash2 className="w-4 h-4 text-gray-600" />
//                   </button>
//                   <CardContent className="p-4">
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <h4 className="font-semibold text-lg text-gray-800 truncate mb-1">
//                           {result.fileName}
//                         </h4>
//                         <div className="flex items-center text-sm text-gray-500">
//                           <Calendar className="w-4 h-4 mr-2" />
//                           {result.date}
//                         </div>
//                       </div>
//                       <div
//                         className={`px-3 py-1 rounded text-sm font-medium ${
//                           result.score >= 85
//                             ? "bg-green-100 text-green-800"
//                             : result.score >= 70
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {result.score}%
//                       </div>
//                     </div>
//                     <Progress value={result.score} className="h-2 mb-4" />
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-gray-600 flex items-center">
//                           <TrendingUp className="w-4 h-4 mr-2" />
//                           Improvement
//                         </span>
//                         <span
//                           className={`font-medium ${
//                             result.improvement > 0
//                               ? "text-green-600"
//                               : "text-gray-600"
//                           }`}
//                         >
//                           {result.improvement > 0
//                             ? `+${result.improvement}%`
//                             : "No change"}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-600 text-sm">
//                           Issues Found:
//                         </span>
//                         <ul className="mt-2 space-y-1">
//                           {result.issuesFound.map((issue, index) => (
//                             <li
//                               key={index}
//                               className="text-sm text-red-600 flex items-start"
//                             >
//                               <span className="mr-2">•</span>
//                               {issue}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Job Details Dialog */}
//       <Dialog open={jobDialogOpen} onOpenChange={setJobDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add Target Job Details</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleJobSubmit} className="space-y-4">
//             <div>
//               <label
//                 htmlFor="jobTitle"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Job Title
//               </label>
//               <Input
//                 id="jobTitle"
//                 name="jobTitle"
//                 required
//                 defaultValue={jobDetails?.title}
//                 placeholder="e.g., Senior Software Engineer"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="jobDescription"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Job Description
//               </label>
//               <Textarea
//                 id="jobDescription"
//                 name="jobDescription"
//                 required
//                 defaultValue={jobDetails?.description}
//                 placeholder="Paste the job description here..."
//                 rows={6}
//               />
//             </div>
//             <div className="flex justify-end space-x-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setJobDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit">Save</Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ResumeOptimizer;

// types.ts
// "use client";
// interface JobDetails {
//   title: string;
//   description: string;
// }

// interface ResultType {
//   id: number;
//   fileName: string;
//   date: string;
//   score: number;
//   improvement: number;
//   issuesCount: number;
// }

// // ResumeOptimizer.tsx
// import React, { useState } from "react";
// import { Calendar, TrendingUp, Upload, AlertCircle } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import AppHeader from "@/components/AppHeader";
// import { Progress } from "@/components/ui/progress";

// const ResumeOptimizer: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [jobDialogOpen, setJobDialogOpen] = useState<boolean>(false);
//   const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
//   const [results, setResults] = useState<ResultType[]>([
//     {
//       id: 1,
//       fileName: "Resume_v1.pdf",
//       date: "2023-06-15",
//       score: 85,
//       improvement: 5,
//       issuesCount: 3,
//     },
//     {
//       id: 2,
//       fileName: "CV_updated.docx",
//       date: "2023-07-02",
//       score: 92,
//       improvement: 12,
//       issuesCount: 2,
//     },
//     {
//       id: 3,
//       fileName: "JobApplication.pdf",
//       date: "2023-07-20",
//       score: 78,
//       improvement: 0,
//       issuesCount: 4,
//     },
//   ]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const allowedTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ];

//       if (!allowedTypes.includes(file.type)) {
//         alert("Please upload only PDF, DOC, or DOCX files");
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         alert("File size should not exceed 5MB");
//         return;
//       }

//       setSelectedFile(file);
//     }
//   };

//   const handleJobSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     setJobDetails({
//       title: formData.get("jobTitle") as string,
//       description: formData.get("jobDescription") as string,
//     });
//     setJobDialogOpen(false);
//   };

//   const handleDeleteResult = (id: number) => {
//     setResults(results.filter((result) => result.id !== id));
//   };

//   const handleCheckScore = () => {
//     if (!selectedFile) {
//       alert("Please upload a resume first");
//       return;
//     }
//     if (!jobDetails) {
//       alert("Please add a target job description");
//       return;
//     }
//     // API call would go here
//     alert(
//       "Processing resume... This would typically connect to your backend API"
//     );
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="flex-shrink-0 sticky top-0 left-0 z-20">
//         <AppHeader title="Resume Optimizer" />
//       </div>

//       <div className="min-h-screen bg-[#F3F5F6] py-12">
//         <div className="max-w-5xl mx-auto px-4">
//           {/* Upload Section */}
//           <div className="bg-white rounded shadow-lg p-6 mb-6">
//             <label className="block">
//               <div className="border-2 border-dashed border-[#3B41E9] rounded-lg p-8 text-center cursor-pointer hover:bg-[#EFF0FD] transition-colors">
//                 <input
//                   type="file"
//                   className="hidden"
//                   accept=".pdf,.doc,.docx"
//                   onChange={handleFileChange}
//                 />
//                 <Upload className="mx-auto mb-4 text-[#3B41E9]" size={48} />
//                 <h2 className="text-2xl font-semibold mb-2 text-gray-800">
//                   Upload Your Resume
//                 </h2>
//                 <p className="text-gray-600 mb-4">
//                   {selectedFile
//                     ? selectedFile.name
//                     : "Drop your resume file or click to browse"}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Supports PDF, DOC, DOCX (Max 5MB)
//                 </p>
//               </div>
//             </label>

//             {/* Job Description Trigger */}
//             {!jobDetails && (
//               <div className="mt-4 text-center">
//                 <button
//                   onClick={() => setJobDialogOpen(true)}
//                   className="text-[#3B41E9] hover:text-[#2A2FB8] font-medium inline-flex items-center"
//                 >
//                   + Add job title and description
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Target Job Details - Only shown after adding details */}
//           {jobDetails && (
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//               <h3 className="text-lg font-semibold mb-4">Target Job Details</h3>
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="font-medium text-gray-700">Title</h4>
//                   <p className="text-gray-600">{jobDetails.title}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-gray-700">Description</h4>
//                   <p className="text-gray-600 line-clamp-4">
//                     {jobDetails.description}
//                   </p>
//                 </div>
//                 <Button
//                   variant="outline"
//                   onClick={() => setJobDialogOpen(true)}
//                   className="w-full"
//                 >
//                   Edit Details
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* Check Score Button */}
//           <div className="text-center mb-12">
//             <Button
//               size="lg"
//               onClick={handleCheckScore}
//               className="bg-[#3B41E9] hover:bg-[#2A2FB8] text-white px-12 py-6 w-full text-lg rounded shadow-lg hover:shadow-xl transition-all"
//             >
//               Analyze Resume
//             </Button>
//           </div>

//           {/* Previous Results Section */}
//           <div className="w-full">
//             <h3 className="text-2xl font-bold text-gray-800 mb-6">
//               Previous ATS Checks
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {results.map((result) => (
//                 <Card
//                   key={result.id}
//                   className="bg-white rounded shadow hover:shadow-lg transition-shadow border-t-4 border-primary overflow-hidden"
//                 >
//                   <CardContent className="p-4">
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <h4 className="font-semibold text-lg text-gray-800 truncate mb-1">
//                           {result.fileName}
//                         </h4>
//                         <div className="flex items-center text-sm text-gray-500">
//                           <Calendar className="w-4 h-4 mr-2" />
//                           {result.date}
//                         </div>
//                       </div>
//                       <div
//                         className={`px-3 py-1 rounded text-sm font-medium ${
//                           result.score >= 85
//                             ? "bg-green-100 text-green-800"
//                             : result.score >= 70
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {result.score}%
//                       </div>
//                     </div>
//                     <Progress value={result.score} className="h-2 mb-4" />
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-gray-600 flex items-center">
//                           <TrendingUp className="w-4 h-4 mr-2" />
//                           Improvement
//                         </span>
//                         <span
//                           className={`font-medium ${
//                             result.improvement > 0
//                               ? "text-green-600"
//                               : "text-gray-600"
//                           }`}
//                         >
//                           {result.improvement > 0
//                             ? `+${result.improvement}%`
//                             : "No change"}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-gray-600 flex items-center">
//                           <AlertCircle className="w-4 h-4 mr-2" />
//                           Issues Found
//                         </span>
//                         <span className="font-medium text-red-600">
//                           {result.issuesCount}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex gap-2 mt-6">
//                       <Button
//                         variant="destructive"
//                         className="flex-1 h-8 rounded"
//                         onClick={() => handleDeleteResult(result.id)}
//                       >
//                         Delete
//                       </Button>
//                       <Button
//                         variant="outline"
//                         className="flex-1 h-8 rounded"
//                         onClick={() => {
//                           // Handle view report
//                           alert("Viewing report...");
//                         }}
//                       >
//                         View Report
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Job Details Dialog */}
//       <Dialog open={jobDialogOpen} onOpenChange={setJobDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add Target Job Details</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleJobSubmit} className="space-y-4">
//             <div>
//               <label
//                 htmlFor="jobTitle"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Job Title
//               </label>
//               <Input
//                 id="jobTitle"
//                 name="jobTitle"
//                 required
//                 defaultValue={jobDetails?.title}
//                 placeholder="e.g., Senior Software Engineer"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="jobDescription"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Job Description
//               </label>
//               <Textarea
//                 id="jobDescription"
//                 name="jobDescription"
//                 required
//                 defaultValue={jobDetails?.description}
//                 placeholder="Paste the job description here..."
//                 rows={6}
//               />
//             </div>
//             <div className="flex justify-end space-x-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setJobDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit">Save</Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ResumeOptimizer;

"use client";

interface JobDetails {
  title: string;
  description: string;
}

interface ResultType {
  id: number;
  fileName: string;
  date: string;
  score: number;
  improvement: number;
  issuesCount: number;
}

import React, { useState } from "react";
import {
  Calendar,
  TrendingUp,
  Upload,
  AlertCircle,
  Briefcase,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AppHeader from "@/components/AppHeader";
// import { Progress } from "@/components/ui/progress";
import FloatingLabelInput from "@/components/inputComponents/TextInputField";

const ResumeOptimizer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDialogOpen, setJobDialogOpen] = useState<boolean>(false);
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [results, setResults] = useState<ResultType[]>([
    {
      id: 1,
      fileName: "Resume_v1.pdf",
      date: "2023-06-15",
      score: 85,
      improvement: 5,
      issuesCount: 3,
    },
    {
      id: 2,
      fileName: "CV_updated.docx",
      date: "2023-07-02",
      score: 92,
      improvement: 12,
      issuesCount: 2,
    },
    {
      id: 3,
      fileName: "JobApplication.pdf",
      date: "2023-07-20",
      score: 78,
      improvement: 0,
      issuesCount: 4,
    },
  ]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Please upload only PDF, DOC, or DOCX files");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleJobSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // setJobDetails({
    //   // title: formData.get("jobTitle") as string,
    //   description: formData.get("jobDescription") as string,
    // });
    setJobDialogOpen(false);
  };

  const handleDeleteResult = (id: number) => {
    setResults(results.filter((result) => result.id !== id));
  };

  const handleCheckScore = () => {
    if (!selectedFile) {
      alert("Please upload a resume first");
      return;
    }
    if (!jobDetails) {
      alert("Please add a target job description");
      return;
    }
    alert(
      "Processing resume... This would typically connect to your backend API"
    );
  };
  const handleChange = (field: keyof JobDetails, value: string) => {
    setJobDetails((prev) => {
      if (!prev) {
        return {
          title: field === "title" ? value : "",
          description: field === "description" ? value : "",
        };
      }
      return { ...prev, [field]: value };
    });
    console.log("value for title pop up", jobDetails);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-shrink-0 sticky top-0 left-0 z-20">
        <AppHeader title="Resume Optimizer" />
      </div>

      <div className="min-h-screen bg-[#F3F5F6] py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Upload and Job Details Section */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2  w-full gap-6 mb-8"> */}
          <div className=" flex flex-row max-md:flex-col w-full gap-6 mb-4">
            {/* Upload Section */}
            <div className="bg-white rounded shadow-lg p-6 w-full">
              <label className="block">
                <div className="border-2 border-dashed border-[#3B41E9] rounded p-8 text-center cursor-pointer hover:bg-[#EFF0FD] transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  <Upload className="mx-auto mb-4 text-[#3B41E9]" size={48} />
                  <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                    Upload Your Resume
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {selectedFile ? selectedFile.name : "click to browse"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
              </label>

              {!jobDetails && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setJobDialogOpen(true)}
                    className="text-[#3B41E9] hover:text-[#2A2FB8] font-medium inline-flex items-center"
                  >
                    + Add job title and description
                  </button>
                </div>
              )}
            </div>

            {/* Target Job Details Section */}
            {jobDetails ? (
              <div className="bg-white rounded shadow-lg p-6 lg:w-[35%]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Briefcase className="text-[#3B41E9] mr-3" size={20} />
                    <h3 className="text-sm font-semibold text-gray-800">
                      Target Job Details
                    </h3>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setJobDialogOpen(true)}
                    className="text-[#3B41E9] rounded h-7 border-[#3B41E9] hover:bg-[#EFF0FD]"
                  >
                    Edit
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Job Title
                    </h4>
                    <p className="text-lg font-medium text-gray-800">
                      {jobDetails?.title?.length > 26
                        ? `${jobDetails?.title?.slice(0, 26)}...`
                        : jobDetails?.title}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Job Description
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-gray-700 line-clamp-6">
                        {jobDetails.description.length > 40
                          ? `${jobDetails.description.slice(0, 40)}...`
                          : jobDetails.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Check Score Button */}
          <div className="text-center mb-12 w-full h-auto">
            <Button
              size="lg"
              onClick={handleCheckScore}
              className="bg-[#3B41E9] hover:bg-[#2A2FB8] text-white px-12 py-4 w-full text-lg rounded shadow-lg hover:shadow-xl transition-all"
            >
              Analyze Resume
            </Button>
          </div>

          {/* Previous Results Section */}
          <div className="w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Previous ATS Checks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result) => (
                <Card
                  key={result.id}
                  className="bg-white rounded cursor-pointer  shadow hover:shadow-lg transition-shadow border-t-4 border-[#3B41E9] overflow-hidden"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg text-gray-800 truncate mb-1">
                          {result.fileName}
                        </h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          {result.date}
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          result.score >= 85
                            ? "bg-green-100 text-green-800"
                            : result.score >= 70
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {result.score}%
                      </div>
                    </div>
                    {/* <Progress value={result.score} className="h-2 mb-4" /> */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Improvement
                        </span>
                        <span
                          className={`font-medium ${
                            result.improvement > 0
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          {result.improvement > 0
                            ? `+${result.improvement}%`
                            : "No change"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Issues Found
                        </span>
                        <span className="font-medium text-red-600">
                          {result.issuesCount}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        className="flex-1 h-8 rounded border border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white"
                        onClick={() => handleDeleteResult(result.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 h-8 rounded"
                        onClick={() => {
                          alert("Viewing report...");
                        }}
                      >
                        View Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Job Details Dialog */}
      {/* <Dialog open={jobDialogOpen} onOpenChange={setJobDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-800">
              Add Target Job Details
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Enter the job details to optimize your resume for this specific
              position
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleJobSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="jobTitle" className="text-gray-700">
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  required
                  defaultValue={jobDetails?.title}
                  placeholder="e.g., Senior Software Engineer"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="jobDescription" className="text-gray-700">
                  Job Description
                </Label>
                <Textarea
                  id="jobDescription"
                  name="jobDescription"
                  required
                  defaultValue={jobDetails?.description}
                  placeholder="Paste the complete job description here..."
                  className="mt-1.5"
                  rows={8}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setJobDialogOpen(false)}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-6 bg-[#3B41E9] hover:bg-[#2A2FB8]"
              >
                Save Details
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog> */}
      <Dialog open={jobDialogOpen} onOpenChange={setJobDialogOpen}>
        <DialogContent className="max-w-2xl sm:rounded sm:shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Add Target Job Details
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Provide the job details to fine-tune your resume for the targeted
              position.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleJobSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                {/* <Label
                  htmlFor="jobTitle"
                  className="text-sm font-medium text-gray-800"
                >
                  Job Title
                </Label> */}
                {/* <Input
                  id="jobTitle"
                  name="jobTitle"
                  required
                  defaultValue={jobDetails?.title}
                  placeholder="e.g., Senior Software Engineer"
                  className="mt-1.5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                /> */}

                <FloatingLabelInput
                  label="Job Title"
                  inputType="text"
                  inputClassName="border-gray-300"
                  value={jobDetails?.title as string}
                  onChange={(e) => handleChange("title", e.target.value)}

                  // onChange={(e) => handleChange("title", e.target.value)}
                  // value={localState.location}
                  // onChange={(e) => handleChange("location", e.target.value)}
                />
              </div>
              <div>
                <Label
                  htmlFor="jobDescription"
                  className="text-sm font-medium text-gray-800"
                >
                  Job Description
                </Label>
                <Textarea
                  id="jobDescription"
                  name="jobDescription"
                  required
                  defaultValue={jobDetails?.description}
                  placeholder="Paste the complete job description here..."
                  className="mt-1.5 block w-full rounded max-h-[280px] min-h-[280px] custom-scrollbar  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows={8}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setJobDialogOpen(false)}
                className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Save Details
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeOptimizer;
