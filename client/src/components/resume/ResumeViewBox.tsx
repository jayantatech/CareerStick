// import React, { useState, useCallback } from "react";
// import {
//   Calendar,
//   Copy,
//   Edit2,
//   Trash2,
//   X,
//   Check,
//   Pencil,
//   Loader2,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
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
//   onDuplicate: () => Promise<void>;
//   onTitleUpdate: () => void;
// }) => {
//   const router = useRouter();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isCopying, setIsCopying] = useState(false);
//   const [isNavigating, setIsNavigating] = useState(false);
//   const [title, setTitle] = useState(resume.resumeTitle);
//   const [loading, setLoading] = useState(false);

//   const handleTitleUpdate = async () => {
//     if (!userId || userId.length !== 24 || !resumeId || resumeId.length !== 24)
//       return;

//     setLoading(true);
//     try {
//       const response = await api.post("/resume/update-resume-title", {
//         resumeId,
//         resumeTitle: title,
//         userId,
//       });

//       if (response.data.success) {
//         setIsEditing(false);
//         onTitleUpdate();
//       }
//     } catch (error) {
//       console.error("Error updating resume title:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = async () => {
//     if (isCopying) return;

//     setIsCopying(true);
//     try {
//       await onDuplicate();
//     } finally {
//       setTimeout(() => setIsCopying(false), 1000);
//     }
//   };

//   const handleEdit = () => {
//     setIsNavigating(true);
//     router.push(`/app/resumes/${resumeId}`);
//   };

//   const formatDate = useCallback((date: string) => {
//     return format(new Date(date), "dd-MM-yyyy");
//   }, []);

//   return (
//     <>
//       <div className="w-full h-[198px] rounded absolute flex items-center justify-center bottom-4 left-0 z-50">
//         <div className="w-[94%] h-full bg-slate-50   border shadow rounded p-3">
//           <div className="flex items-center gap-2 w-full justify-between relative">
//             {isEditing ? (
//               <>
//                 <input
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="text-lg w-full bg-slate-100 font-heading border rounded font-bold border-none outline-none"
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
//                     className="text-red-500 hover:text-red-600 p-1 rounded bg-blue-100 disabled:opacity-50"
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
//                   className="absolute right-0 text-gray-700 p-1.5 rounded bg-blue-100 hover:text-gray-700"
//                 >
//                   <Pencil className="w-4 h-4" />
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col items-center gap-3 mt-2">
//             <div className="w-full h-auto flex items-center justify-center flex-row gap-2">
//               <button
//                 onClick={handleCopy}
//                 disabled={loading || isCopying}
//                 className="flex w-1/2 h-[34px] items-center justify-center gap-2 py-1 bg-white text-primary hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded"
//               >
//                 {isCopying ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Copying...
//                   </>
//                 ) : (
//                   <>
//                     <Copy className="w-4 h-4" />
//                     Copy
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={handleEdit}
//                 disabled={loading || isNavigating}
//                 className="flex w-1/2 h-[34px] items-center justify-center gap-2 py-1 bg-white text-primary hover:border-primary hover:scale-[.99] transition-all duration-150 border rounded"
//               >
//                 {isNavigating ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Opening...
//                   </>
//                 ) : (
//                   <>
//                     <Edit2 className="w-4 h-4" />
//                     Edit
//                   </>
//                 )}
//               </button>
//             </div>

//             <div className="w-full h-auto flex items-center justify-center flex-row gap-2">
//               <button
//                 onClick={onDelete}
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

//           <div className="mt-2 h-[36px] rounded max-lg:text-[10px] border-gray-200 flex items-center justify-between">
//             <div className="text-sm text-gray-500 flex items-center  gap-1 max-lg:items-start">
//               <Calendar className="w-4 h-4 max-lg:mt-1" />
//               Updated: {formatDate(resume.updatedAt)}
//             </div>
//             <div className="text-sm text-gray-500 flex items-center gap-1 max-lg:items-start">
//               <Calendar className="w-4 h-4  max-lg:mt-1" />
//               Created: {formatDate(resume.createdAt)}
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
import { ResumeState } from "@/lib/types/resumeInput";

const ResumeViewBox = ({
  resume,
  resumeId,
  userId,
  onDelete,
  onDuplicate,
  onTitleUpdate,
}: {
  resume: ResumeState;
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

          <div className="mt-2 h-[36px] rounded max-lg:text-[10px] border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500 flex items-center  gap-1 max-lg:items-start">
              <Calendar className="w-4 h-4 max-lg:mt-1" />
              Updated: {formatDate(resume.updatedAt as string)}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1 max-lg:items-start">
              <Calendar className="w-4 h-4  max-lg:mt-1" />
              Created: {formatDate(resume.createdAt as string)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeViewBox;
