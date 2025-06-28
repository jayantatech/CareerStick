// import React, { useState, useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";

// // Configure PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

// interface ResumePreviewProps {
//   fileUrl?: string;
//   file?: File;
// }

// const ResumePreview: React.FC<ResumePreviewProps> = ({
//   fileUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
//   file,
// }) => {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [scale, setScale] = useState(1);

//   useEffect(() => {
//     const loadPreview = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         if (file) {
//           const url = URL.createObjectURL(file);
//           setPreviewUrl(url);
//           return;
//         }

//         if (fileUrl) {
//           setPreviewUrl(fileUrl);
//         }
//       } catch (err) {
//         setError("Failed to load resume preview");
//         console.error("Preview error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPreview();

//     return () => {
//       if (previewUrl && file) {
//         URL.revokeObjectURL(previewUrl);
//       }
//     };
//   }, [file, fileUrl]);

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//     setLoading(false);
//   };

//   const onDocumentLoadError = (error: Error) => {
//     console.error("Error loading PDF:", error);
//     setError("Failed to load PDF");
//     setLoading(false);
//   };

//   const goToPreviousPage = () => {
//     setPageNumber((prev) => Math.max(prev - 1, 1));
//   };

//   const goToNextPage = () => {
//     setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
//   };

//   const zoomIn = () => {
//     setScale((prev) => Math.min(prev + 0.2, 2));
//   };

//   const zoomOut = () => {
//     setScale((prev) => Math.max(prev - 0.2, 0.4));
//   };

//   const renderControls = () => (
//     <div className="flex items-center justify-between mb-4 px-4">
//       <div className="flex items-center gap-2">
//         <button
//           onClick={goToPreviousPage}
//           disabled={pageNumber <= 1}
//           className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span className="text-sm">
//           Page {pageNumber} of {numPages}
//         </span>
//         <button
//           onClick={goToNextPage}
//           disabled={pageNumber >= (numPages || 1)}
//           className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//       <div className="flex items-center gap-2">
//         <button onClick={zoomOut} className="px-3 py-1 bg-gray-100 rounded">
//           -
//         </button>
//         <span className="text-sm">{Math.round(scale * 100)}%</span>
//         <button onClick={zoomIn} className="px-3 py-1 bg-gray-100 rounded">
//           +
//         </button>
//       </div>
//     </div>
//   );

//   const renderContent = () => {
//     if (loading) {
//       return (
//         <div className="h-full flex items-center justify-center">
//           <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div className="h-full flex items-center justify-center text-red-500">
//           {error}
//         </div>
//       );
//     }

//     if (!previewUrl) {
//       return (
//         <div className="h-full flex items-center justify-center">
//           <span className="text-gray-500">Upload a resume to preview</span>
//         </div>
//       );
//     }

//     return (
//       <div className="h-full">
//         {renderControls()}
//         <div className="flex justify-center overflow-auto h-[calc(100%-3rem)]">
//           <Document
//             file={previewUrl}
//             onLoadSuccess={onDocumentLoadSuccess}
//             onLoadError={onDocumentLoadError}
//             loading={
//               <div className="flex items-center justify-center h-full">
//                 <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
//               </div>
//             }
//           >
//             <Page
//               pageNumber={pageNumber}
//               scale={scale}
//               renderAnnotationLayer={true}
//               renderTextLayer={true}
//             />
//           </Document>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex-1">
//       <Card className="p-6 h-[774px] w-[540px] max-md:w-full max-md:h-[580px] rounded">
//         <h3 className="text-lg font-semibold mb-4">Resume Preview</h3>
//         <div className="h-[calc(100%-3rem)] bg-white border-2 border-dashed border-gray-200 rounded">
//           {renderContent()}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default ResumePreview;

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configure PDF.js worker with specific version matching your react-pdf version
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ResumePreviewProps {
  fileUrl?: string;
  file?: File;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  fileUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  file,
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const loadPreview = async () => {
      try {
        setLoading(true);
        setError(null);
        setNumPages(null);

        if (file) {
          const url = URL.createObjectURL(file);
          setPreviewUrl(url);
        } else if (fileUrl) {
          // For external URLs, we need to handle CORS
          const response = await fetch(fileUrl, { mode: "cors" });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setPreviewUrl(url);
        } else {
          setError("No file or URL provided");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load PDF");
        console.error("Preview error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPreview();

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [file, fileUrl, previewUrl]); //30 apr add previewUrl

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    setError(
      "Failed to load PDF. Please ensure the file is a valid PDF document."
    );
    setLoading(false);
  };

  const goToPreviousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.4));
  };

  const renderControls = () => (
    <div className="flex items-center justify-between mb-4 px-4">
      <div className="flex items-center gap-2">
        <button
          onClick={goToPreviousPage}
          disabled={pageNumber <= 1}
          className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {pageNumber} of {numPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= (numPages || 1)}
          className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200"
        >
          Next
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={zoomOut}
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          -
        </button>
        <span className="text-sm">{Math.round(scale * 100)}%</span>
        <button
          onClick={zoomIn}
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          +
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="h-full flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-red-500 gap-2">
          <AlertCircle className="w-8 h-8" />
          <p className="text-center">{error}</p>
        </div>
      );
    }

    if (!previewUrl) {
      return (
        <div className="h-full flex items-center justify-center">
          <span className="text-gray-500">Upload a resume to preview</span>
        </div>
      );
    }

    return (
      <div className="h-full">
        {numPages && renderControls()}
        <div className="flex justify-center overflow-auto h-[calc(100%-3rem)]">
          <Document
            file={previewUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderAnnotationLayer={true}
              renderTextLayer={true}
              loading={
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              }
            />
          </Document>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1">
      <Card className="p-6 h-[774px] w-[540px] max-md:w-full max-md:h-[580px] rounded">
        <h3 className="text-lg font-semibold mb-4">Resume Preview</h3>
        <div className="h-[calc(100%-3rem)] bg-white border-2 border-dashed border-gray-200 rounded">
          {renderContent()}
        </div>
      </Card>
    </div>
  );
};

export default ResumePreview;
