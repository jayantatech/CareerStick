// import React, { useState } from "react";
// import {
//   Alert,
//   AlertDescription,
//   AlertTitle,
//   AlertDialog,
//   AlertDialogAction,
// } from "@/components/ui/ ";

// const DeleteResumeModal = ({
//   isOpen,
//   onClose,
//   onDelete,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   onDelete: () => void;
// }) => {
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleDelete = () => {
//     setIsDeleting(true);
//     onDelete();
//     onClose();
//   };

//   return (
//     <AlertDialog open={isOpen} onOpenChange={onClose}>
//       <AlertDialogAction>
//         <Alert>
//           <AlertTitle>Delete Resume</AlertTitle>
//           <AlertDescription>
//             Are you sure you want to delete your resume? This action cannot be
//             undone.
//           </AlertDescription>
//           <div className="flex justify-end gap-4 mt-4">
//             <button
//               type="button"
//               className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               className={`px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 ${
//                 isDeleting ? "cursor-not-allowed opacity-50" : ""
//               }`}
//               onClick={handleDelete}
//               disabled={isDeleting}
//             >
//               {isDeleting ? "Deleting..." : "Delete"}
//             </button>
//           </div>
//         </Alert>
//       </AlertDialogAction>
//     </AlertDialog>
//   );
// };

// export default DeleteResumeModal;

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const DeleteResumeModal = ({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    // setIsDeleting(true);
    onDelete();
    setIsDeleting(true);
    const timer = setTimeout(() => {
      onClose();
      setIsDeleting(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-4">
        <DialogHeader>
          <DialogTitle>Delete Resume</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base font-heading">
          Are you sure you want to delete this resume? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter>
          <button
            onClick={onClose}
            className="px-3 h-[32px] outline-none font-heading hover:scale-[.98] transition-all duration-150 text-base rounded border"
          >
            Cancel
          </button>
          <button
            className="px-3 h-[32px] font-heading hover:scale-[.98] transition-all duration-150 bg-red-500 text-white text-base rounded border"
            onClick={handleDelete}
            // disabled={isDeleting}
          >
            {/* {"Delete"} */}
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteResumeModal;
