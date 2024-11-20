// import React from "react";
// import { Calendar, Copy, Download, Edit2, Trash2 } from "lucide-react";
// const ResumeViewBox = ({ resume }: { resume: any }) => {
//   console.log("resume to show by ResumeViewBox", resume);
//   return (
//     <>
//       <div className="w-full h-full bg-transparent absolute top-0 left-0"></div>
//       <div className="w-full  h-[198px] rounded absolute flex items-center justify-center bottom-4 left-0  ">
//         <div className="w-[94%] h-full bg-slate-50 border shadow-md rounded p-3">
//           {/* Header Section */}
//           <div className="w-full h-[36px] flex flex-col justify-between items-center border-b border-gray-200">
//             <h2 className="text-lg font-bold font-heading">
//               {resume.resumeTitle}
//             </h2>
//           </div>

//           {/* Actions Section */}
//           <div className="flex flex-col items-center gap-3 mt-2">
//             <div className="w-full h-auto flex items-center justify-center flex-row gap-2">
//               <button className="flex  w-1/2 h-[34px] items-center justify-center gap-2 py-1 bg-white text-primary hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded ">
//                 <Copy className="w-4 h-4" />
//                 Copy
//               </button>
//               <button className="flex  w-1/2 h-[34px] items-center justify-center gap-2 py-1 bg-white text-primary hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded ">
//                 {" "}
//                 <Edit2 className="w-4 h-4" />
//                 Edit
//               </button>
//             </div>
//             <div className="w-full h-auto flex items-center justify-center flex-row gap-2">
//               <button className="flex  w-1/2 h-[34px] items-center justify-center gap-2 py-1 bg-white text-red-500 hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded ">
//                 {" "}
//                 <Trash2 className="w-4 h-4" />
//                 Delete
//               </button>
//               <button className="flex  w-1/2 h-[34px] items-center justify-center gap-2 py-1  text-white bg-primary hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded ">
//                 {" "}
//                 <Download className="w-4 h-4" />
//                 Download
//               </button>
//             </div>
//           </div>

//           {/* Preview Area */}
//           <div className="mt-2 h-[36px] rounded  border-gray-200 flex items-center justify-between">
//             {/* <span className="text-gray-400">Resume Preview</span> */}
//             <div className="text-sm text-gray-500 flex items-center gap-1">
//               <Calendar className="w-4 h-4" />
//               Created: Nov 15, 2024
//             </div>
//             <div className="text-sm text-gray-500 flex items-center gap-1">
//               <Calendar className="w-4 h-4" />
//               Updated: Nov 15, 2024
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResumeViewBox;

// import React, { useState } from "react";
// import {
//   Calendar,
//   Copy,
//   Download,
//   Edit2,
//   Trash2,
//   X,
//   Check,
//   Pencil,
//   Timer,
// } from "lucide-react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
// import DeleteResumeModal from "./DeleteResumeModal";
// import { format } from "date-fns";
// import api from "@/lib/api";
// import DownloadViewResume from "./ResumeViewerDownload";
// const ResumeViewBox = ({
//   resume,
//   resumeId,
//   userId,
//   onDelete,
//   onDuplicate,
//   onTitleUpdate,
// }: {
//   resume: any;
//   resumeId: string;
//   userId: string;
//   onDelete: () => void;
//   onDuplicate: () => void;
//   onTitleUpdate: () => void;
// }) => {
//   const router = useRouter();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isCopyEditing, setIsCopyEditing] = useState(false);
//   const [title, setTitle] = useState(resume.resumeTitle);
//   const [loading, setLoading] = useState(false);
//   // Handle title update

//   const handleTitleUpdate = async () => {
//     try {
//       if (!userId || userId.length !== 24) return;
//       if (!resumeId || resumeId.length !== 24) return;
//       setIsEditing(false);
//       setLoading(true);
//       const response = await api.post("/resume/update-resume-title", {
//         resumeId: resumeId,
//         resumeTitle: title,
//         userId: userId,
//       });

//       if (response.data.success) {
//         setIsEditing(false);
//         onTitleUpdate();
//         // Optionally refresh the page or update local state
//       }
//     } catch (error) {
//       console.error("Error updating resume title:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle delete resume
//   const handleDelete = async () => {
//     onDelete();
//   };

//   // Handle copy resume
//   const handleCopy = async () => {
//     onDuplicate();
//     setIsCopyEditing(true);

//     const timer = setTimeout(() => {
//       setIsCopyEditing(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   };
//   // const formattedDate = format(new Date(resume.createdAt), "yyyy-MM-dd");
//   const formatDate = (date: string) => {
//     const formattedDate = format(new Date(date), "dd-MM-yyyy");
//     return formattedDate;
//   };
//   return (
//     <>
//       {/* <div className="w-full h-full bg-transparent absolute top-0 left-0"></div> */}
//       <div className="w-full h-[198px] rounded absolute flex items-center justify-center bottom-4 left-0 z-50">
//         <div className="w-[94%] h-full bg-slate-50 border shadow-md rounded p-3">
//           {/* Header Section */}
//           {/* <div className="w-full h-[36px] flex flex-col justify-between items-center border-b border-gray-200">
//             {isEditing ? (
//               <div className="flex items-center gap-2 w-full justify-center">
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="text-lg font-bold font-heading border rounded px-2 py-1 w-[60%]"
//                   disabled={loading}
//                 />
//                 <button
//                   onClick={handleTitleUpdate}
//                   disabled={loading}
//                   className="text-green-500 hover:text-green-600"
//                 >
//                   <Check className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => {
//                     setIsEditing(false);
//                     setTitle(resume.resumeTitle);
//                   }}
//                   disabled={loading}
//                   className="text-red-500 hover:text-red-600"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//             ) : (
//               <h2 className="text-lg font-bold font-heading">{title}</h2>
//             )}
//           </div> */}
//           <div className="flex items-center gap-2 w-full justify-between relative">
//             {isEditing ? (
//               <>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="text-lg font-heading border rounded font-bold border-none outline-none"
//                   disabled={loading}
//                   autoFocus
//                 />
//                 <div className="flex gap-2">
//                   <button
//                     onClick={handleTitleUpdate}
//                     disabled={loading}
//                     className="text-green-500 hover:text-green-600 p-1 rounded bg-blue-100 disabled:opacity-50"
//                   >
//                     <Check className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => {
//                       setIsEditing(false);
//                       setTitle(resume.resumeTitle);
//                     }}
//                     disabled={loading}
//                     // className="absolute right-0 text-gray-700 p-1.5 rounded bg-blue-100 text- hover:text-gray-700"
//                     className="text-red-500 hover:text-red-600 p-1 rounded bg-blue-100  disabled:opacity-50"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center justify-between w-full h-auto gap-2">
//                 <h2 className="text-lg font-bold font-heading">{title}</h2>
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="absolute right-0 text-gray-700 p-1.5 rounded bg-blue-100 text- hover:text-gray-700"
//                 >
//                   <Pencil className="w-4 h-4" />
//                 </button>
//               </div>
//             )}
//           </div>
//           {/* Actions Section */}
//           <div className="flex flex-col items-center gap-3 mt-2">
//             <div className="w-full h-auto flex items-center justify-center flex-row gap-2">
//               <button
//                 onClick={handleCopy}
//                 disabled={loading}
//                 className="flex w-1/2 h-[34px] items-center justify-center gap-2 py-1 bg-white text-primary hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded"
//               >
//                 <Copy className="w-4 h-4" />
//                 {isCopyEditing ? "Copying..." : "Copy"}
//               </button>
//               <button
//                 onClick={() => router.push(`/app/resumes/${resumeId}`)}
//                 disabled={loading}
//                 className="flex w-1/2 h-[34px] items-center justify-center gap-2 py-1 bg-white text-primary hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded"
//               >
//                 <Edit2 className="w-4 h-4" />
//                 Edit
//               </button>
//             </div>
//             <div className="w-full h-auto flex items-center justify-center flex-row gap-2">
//               <button
//                 onClick={handleDelete}
//                 disabled={loading}
//                 className="flex w-1/2 h-[34px] items-center justify-center gap-2 py-1 bg-white text-red-500 hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Delete
//               </button>
//               <button className="flex w-1/2 h-[34px] items-center justify-center gap-2 py-1 text-white bg-primary hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded">
//                 <DownloadViewResume resume={resume} resumeId={resumeId} />
//               </button>
//             </div>
//           </div>

//           {/* Preview Area */}
//           <div className="mt-2 h-[36px] rounded border-gray-200 flex items-center justify-between">
//             <div className="text-sm text-gray-500 flex items-center gap-1">
//               <Calendar className="w-4 h-4" />
//               Created: {formatDate(resume.createdAt)}
//             </div>
//             <div className="text-sm text-gray-500 flex items-center gap-1">
//               <Calendar className="w-4 h-4" />
//               Updated: {formatDate(resume.updatedAt)}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResumeViewBox;

import React, { useState, useCallback } from "react";
import {
  Calendar,
  Copy,
  Download,
  Edit2,
  Trash2,
  X,
  Check,
  Pencil,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import api from "@/lib/api";
import DownloadViewResume from "./ResumeViewerDownload";

const ResumeViewBox = ({
  resume,
  resumeId,
  userId,
  onDelete,
  onDuplicate,
  onTitleUpdate,
}: {
  resume: any;
  resumeId: string;
  userId: string;
  onDelete: () => void;
  onDuplicate: () => Promise<void>;
  onTitleUpdate: () => void;
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [title, setTitle] = useState(resume.resumeTitle);
  const [loading, setLoading] = useState(false);

  const handleTitleUpdate = async () => {
    if (!userId || userId.length !== 24 || !resumeId || resumeId.length !== 24)
      return;

    setLoading(true);
    try {
      const response = await api.post("/resume/update-resume-title", {
        resumeId,
        resumeTitle: title,
        userId,
      });

      if (response.data.success) {
        setIsEditing(false);
        onTitleUpdate();
      }
    } catch (error) {
      console.error("Error updating resume title:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (isCopying) return;

    setIsCopying(true);
    try {
      await onDuplicate();
    } finally {
      setTimeout(() => setIsCopying(false), 1000);
    }
  };

  const handleEdit = () => {
    setIsNavigating(true);
    router.push(`/app/resumes/${resumeId}`);
  };

  const formatDate = useCallback((date: string) => {
    return format(new Date(date), "dd-MM-yyyy");
  }, []);

  return (
    <>
      <div className="w-full h-[198px] rounded absolute flex items-center justify-center bottom-4 left-0 z-50">
        <div className="w-[94%] h-full bg-slate-50   border shadow rounded p-3">
          <div className="flex items-center gap-2 w-full justify-between relative">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg w-full bg-slate-100 font-heading border rounded font-bold border-none outline-none"
                  disabled={loading}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleTitleUpdate}
                    disabled={loading}
                    className="text-green-500 hover:text-green-600 p-1 rounded bg-blue-100 disabled:opacity-50"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setTitle(resume.resumeTitle);
                    }}
                    disabled={loading}
                    className="text-red-500 hover:text-red-600 p-1 rounded bg-blue-100 disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between w-full h-auto gap-2">
                <h2 className="text-lg font-bold font-heading">{title}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute right-0 text-gray-700 p-1.5 rounded bg-blue-100 hover:text-gray-700"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-3 mt-2">
            <div className="w-full h-auto flex items-center justify-center flex-row gap-2">
              <button
                onClick={handleCopy}
                disabled={loading || isCopying}
                className="flex w-1/2 h-[34px] items-center justify-center gap-2 py-1 bg-white text-primary hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded"
              >
                {isCopying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Copying...
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={handleEdit}
                disabled={loading || isNavigating}
                className="flex w-1/2 h-[34px] items-center justify-center gap-2 py-1 bg-white text-primary hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded"
              >
                {isNavigating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Opening...
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </>
                )}
              </button>
            </div>

            <div className="w-full h-auto flex items-center justify-center flex-row gap-2">
              <button
                onClick={onDelete}
                disabled={loading}
                className="flex w-1/2 h-[34px] items-center justify-center gap-2 py-1 bg-white text-red-500 hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button className="flex w-1/2 h-[34px] items-center justify-center gap-2 py-1 text-white bg-primary hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded">
                <DownloadViewResume resume={resume} resumeId={resumeId} />
              </button>
            </div>
          </div>

          <div className="mt-2 h-[36px] rounded border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Created: {formatDate(resume.createdAt)}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Updated: {formatDate(resume.updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeViewBox;
