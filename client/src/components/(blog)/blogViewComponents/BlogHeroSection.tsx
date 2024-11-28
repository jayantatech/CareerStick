import ContentWrapper from "@/components/ContentWrapper";
import { Clock } from "lucide-react";
import Image from "next/image";
import React from "react";
import { StockResume } from "../../../../public/img";

const BlogHeroSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#dde9f8] to-background pb-14 max-lg:pb-10 pt-16 max-lg:pt-14">
      <ContentWrapper>
        <div className="relative ">
          <div className="w-full lg:h-[630px] h-auto rounded overflow-hidden">
            <Image
              src={StockResume}
              alt="Resume Guide Hero Image"
              //   width={1200}
              className=" w-full h-full rounded object-cover"
              priority
            />
          </div>
          <div className="absolute bottom-0 rounded-b-md left-0 right-0 bg-gradient-to-t font-heading from-black/80 to-transparent p-8 text-white">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-2 flex items-center justify-center gap-2 text-sm">
                <time>29 May</time>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>35 min read</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading md:text-5xl lg:text-6xl">
                How to Make a Resume in 2024 | Beginner's Guide
              </h1>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default BlogHeroSection;
