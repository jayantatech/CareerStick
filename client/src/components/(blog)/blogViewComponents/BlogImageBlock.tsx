// import Image from "next/image";
// import React from "react";

// const BlogImageBlock = ({
//   imageUrl,
//   imageAlt,
// }: {
//   imageUrl: string;
//   imageAlt: string;
// }) => {
//   return (
//     <div className="container mx-auto px-4 py-4 mb-3 w-full h-auto bg-blue-50 rounded dark:bg-blue-900/20">
//       <div
//         className="relative w-full h-auto"
//         // style={{ maxWidth: "1000px", margin: "0 auto" }}
//       >
//         <Image
//           src={imageUrl}
//           alt={imageAlt}
//           className="w-full h-auto rounded-lg shadow-lg "
//         />
//       </div>
//       {
//         <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
//           {imageAlt}
//         </p>
//       }
//     </div>
//   );
// };

// // export default BlogImageBlock;
// "use client";
// import Image from "next/image";
// import React, { useState } from "react";

// const BlogImageBlock = ({
//   imageUrl,
//   imageAlt,
// }: {
//   imageUrl: string;
//   imageAlt: string;
// }) => {
//   const [imageDimensions, setImageDimensions] = useState<{
//     width: number;
//     height: number;
//   } | null>(null);

//   const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
//     const { naturalWidth, naturalHeight } = event.currentTarget;
//     setImageDimensions({ width: naturalWidth, height: naturalHeight });
//   };

//   return (
//     <div className="container mx-auto px-4 py-4 mb-3 w-full h-auto bg-blue-50 rounded dark:bg-blue-900/20">
//       <div className="flex justify-center items-center w-full">
//         <div className="relative max-w-full">
//           <Image
//             src={imageUrl}
//             alt={imageAlt}
//             width={imageDimensions?.width || 1000}
//             height={imageDimensions?.height || 600}
//             onLoadingComplete={(event) => handleImageLoad(event)}
//             className="rounded-lg shadow-lg object-contain"
//             style={{
//               maxWidth: "100%",
//               maxHeight: "600px",
//               width: "auto",
//               height: "auto",
//             }}
//           />
//         </div>
//       </div>
//       {imageAlt && (
//         <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
//           {imageAlt}
//         </p>
//       )}
//     </div>
//   );
// };

// export default BlogImageBlock;

"use client";
import Image from "next/image";
import React, { useState } from "react";

const BlogImageBlock = ({
  imageUrl,
  imageAlt,
}: {
  imageUrl: string;
  imageAlt: string;
}) => {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleImageLoad = (image: {
    naturalWidth: number;
    naturalHeight: number;
  }) => {
    setImageDimensions({
      width: image.naturalWidth,
      height: image.naturalHeight,
    });
  };

  return (
    <div className="container mx-auto px-4 py-4 mb-3 w-full h-auto bg-blue-50 rounded dark:bg-blue-900/20">
      <div className="flex justify-center items-center w-full">
        <div className="relative max-w-full">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={imageDimensions?.width || 1000}
            height={imageDimensions?.height || 600}
            onLoadingComplete={handleImageLoad}
            className="rounded shadow-lg object-contain"
            style={{
              maxWidth: "100%",
              maxHeight: "600px",
              width: "auto",
              height: "auto",
            }}
          />
        </div>
      </div>
      {imageAlt && (
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {imageAlt}
        </p>
      )}
    </div>
  );
};

export default BlogImageBlock;
