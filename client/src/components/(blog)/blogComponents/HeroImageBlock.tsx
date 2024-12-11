// import { folderNameEnum, uploadToS3 } from "@/lib/utils/s3";
// import React, { useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// // import { uploadToS3 } from "./uploadToS3"; // Ensure you have the correct path to the upload function

// interface HeroImageBlockProps {
//   content: any;
//   // content: { url: string; alt: string };
//   onChange: (content: { url: string; alt: string }) => void;
// }

// export default function HeroImageBlock({
//   content,
//   onChange,
// }: HeroImageBlockProps) {
//   const onDrop = useCallback(
//     async (acceptedFiles: File[]) => {
//       const file = acceptedFiles[0];
//       try {
//         // Upload file to S3 and get the public URL
//         const uploadedUrl = await uploadToS3(file, folderNameEnum.blog);
//         onChange({ ...content, url: uploadedUrl }); // Update the state with the uploaded URL
//       } catch (error) {
//         console.error("Error uploading file:", error);
//         alert("Failed to upload the file. Please try again.");
//       }
//     },
//     [content, onChange]
//   );

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div className="space-y-2">
//       <h2 className="text-xl font-bold">Hero Image</h2>
//       <div
//         {...getRootProps()}
//         className={`border-2 border-dashed p-4 text-center cursor-pointer ${
//           isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
//         }`}
//       >
//         <input {...getInputProps()} />
//         {content.url ? (
//           <img
//             src={content.url}
//             alt={content.alt}
//             className="max-w-full h-auto"
//           />
//         ) : (
//           <p>Drag and drop an image here, or click to select a file</p>
//         )}
//       </div>
//       <input
//         type="text"
//         value={content.alt}
//         onChange={(e) => onChange({ ...content, alt: e.target.value })}
//         className="w-full p-2 border rounded"
//         placeholder="Alt text"
//       />
//     </div>
//   );
// }
import { folderNameEnum, uploadToS3 } from "@/lib/utils/s3";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface HeroImageContent {
  url: string;
  alt: string;
}

interface HeroImageBlockProps {
  content: HeroImageContent;
  onChange: (content: HeroImageContent) => void;
}

export default function HeroImageBlock({
  content,
  onChange,
}: HeroImageBlockProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      try {
        // Upload file to S3 and get the public URL
        const uploadedUrl = await uploadToS3(file, folderNameEnum.blog);
        onChange({ ...content, url: uploadedUrl }); // Update the state with the uploaded URL
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload the file. Please try again.");
      }
    },
    [content, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">Hero Image</h2>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-4 text-center cursor-pointer ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {content.url ? (
          <div className="relative w-full h-[540px]">
            <Image
              src={content.url}
              alt={content.alt || "Hero Image"}
              objectFit="cover"
              className="rounded-lg"
              width={836}
              height={570}
            />
          </div>
        ) : (
          <p>Drag and drop an image here, or click to select a file</p>
        )}
      </div>
      <input
        type="text"
        value={content.alt}
        onChange={(e) => onChange({ ...content, alt: e.target.value })}
        className="w-full p-2 border rounded"
        placeholder="Alt text"
      />
    </div>
  );
}
