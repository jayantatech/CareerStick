import Image from "next/image";
import React from "react";
import { ResumeThreeHero } from "../../../../public/img";

const BlogImageBlock = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 rounded dark:bg-blue-900/20">
      <div
        className="relative w-full"
        style={{ maxWidth: "1000px", margin: "0 auto" }}
      >
        <Image
          src={ResumeThreeHero}
          alt={"Resume Guide Hero Image"}
          width={1000}
          height={600}
          className="w-full h-auto rounded-lg shadow-lg "
        />
      </div>
      {
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          An example of a well-structured resume using our ATS-friendly template{" "}
        </p>
      }
    </div>
  );
};

export default BlogImageBlock;
