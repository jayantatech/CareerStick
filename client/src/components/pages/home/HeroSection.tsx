import Image from "next/image";
import { Button } from "@/components/ui/button";
import ContentWrapper from "@/components/ContentWrapper";
import { ResumeThreeHero } from "../../../../public/img";
import { BsSpeedometer2 } from "react-icons/bs";
import { ArrowUp } from "lucide-react";
import { PiSealCheckBold } from "react-icons/pi";

export default function HeroSection() {
  return (
    <section className="w-full min-h-[80vh] bg-blue-50">
      <ContentWrapper>
        <div className="container px-4 md:px-6 h-full">
          <div className="flex flex-row  max-lg:flex-col-reverse gap-6 lg:gap-12 items-center py-8 md:py-12">
            {/* Left Column - Content */}
            <div className="flex flex-col justify-center max-lg:justify-start space-y-4 text-center lg:text-left max-lg:mt-8 max-md:mt-3">
              <div className="space-y-2 ">
                <h1 className="text-3xl font-bold max-lg:justify-start tracking-tighter sm:text-4xl font-heading capitalize md:text-5xl lg:text-6xl/none">
                  The <span className="text-primary">AI-Powered Resume </span>{" "}
                  Builder
                  {/* — Is Yours Ready? The AI-Powered Resume Builder */}
                </h1>
                {/* <h1 className="text-3xl font-bold max-lg:justify-start tracking-tighter sm:text-4xl font-heading capitalize md:text-5xl lg:text-6xl/none">
                  Only <span className="text-primary">2% of Resumes Pass</span>{" "}
                  —Yours Can Too
                </h1> */}
                {/* <h1 className="text-3xl font-bold max-lg:justify-start tracking-tighter sm:text-4xl font-heading capitalize md:text-5xl lg:text-6xl/none">
                  Only <span className="text-primary">2% of resumes</span> make
                  it past the first round
                </h1> */}
                <p className="mx-auto lg:mx-0 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Create professional resumes that pass the first round. Join
                  the top 2% of candidates—easy to use and free to start!
                </p>
              </div>
              <div className="w-full h-auto flex flex-col max-md:text-start gap-2 max-md:items-start max-md:justify-start  text-gray-500 font-medium text-[17px]">
                <div className="w-full h-full flex items-center max-md:items-start justify-start max-lg:justify-center gap-1  font-heading">
                  <PiSealCheckBold className="text-[20px] text-green-600 max-lg:mt-1" />
                  <span>Generate resumes instantly with AI in one click.</span>
                </div>
                <div className="w-full h-full flex items-center max-md:items-start max-lg:justify-center justify-start gap-1 font-heading">
                  <PiSealCheckBold className="text-[20px] text-green-600 max-lg:mt-1" />
                  <span>Optimize your resume for ATS in one click. </span>
                </div>
                <div className="w-full h-full flex items-center max-md:items-start max-lg:justify-center justify-start gap-1 font-heading">
                  <PiSealCheckBold className="text-[20px] text-green-600 max-lg:mt-1" />
                  <span>One-click resume customization for any job role.</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 ">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-blue-700 text-white font-bold rounded hover:scale-[.98] transition-all duration-150 font-heading"
                >
                  Create my resume
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-200 hover:bg-white font-bold rounded hover:scale-[.98] transition-all duration-150 font-heading"
                >
                  View samples
                </Button>
              </div>
              {/* Trusted By Logos */}
              {/* <div className="pt-8 lg:pt-12">
                <p className="text-sm text-gray-500 mb-4">Trusted by:</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 items-center opacity-75">
                  {["Forbes", "Inc.", "Entrepreneur", "Lifehack"].map(
                    (brand) => (
                      <span
                        key={brand}
                        className="text-gray-400 font-semibold text-sm"
                      >
                        {brand}
                      </span>
                    )
                  )}
                </div>
              </div> */}
              {/* <div className="w-full h-auto py-2 bg-red-500 min-h-[120px]">
                <div className="w-[140px] h-[140px] bg-white rounded ">
                  <BsSpeedometer2 />
                </div>
                <div></div>
              </div> */}
              <div className="py-4 w-full h-auto">
                <p className="text-base text-gray-500 pb-2 font-semibold">
                  What Our Tool Can Do for You
                </p>
                <div className="flex flex-row items-center justify-start max-lg:justify-center gap-4 sm:gap-10 ">
                  {/* First Stat */}
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowUp className="text-primary w-5 h-5" />
                      <span className="text-3xl font-bold text-primary">
                        31%
                      </span>
                    </div>
                    <span className="text-primary text-sm capitalize font-semibold font-body">
                      chance of interviews{" "}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className=" w-px h-16 bg-purple-200"></div>

                  {/* Second Stat */}
                  <div className="flex flex-col items-start sm:items-start text-center sm:text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowUp className="text-primary w-5 h-5" />
                      <span className="text-3xl font-bold text-primary">
                        27%
                      </span>
                    </div>
                    <span className="text-primary text-sm capitalize font-semibold font-body">
                      chance of offers{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Resume Preview */}
            <div className=" w-full h-[710px] max-md:h-[380px] max-lg:h-[680px]">
              <div className="w-[80%] max-lg:w-[80%] max-md:w-[90%] relative h-full mx-auto flex items-center justify-center">
                <div className="absolute   w-full inset-0 bg-white rounded shadow-2xl transform rotate-2 transition-transform group-hover:rotate-3 border" />
                <div className="absolute  w-full inset-0 bg-white rounded shadow-xl -rotate-2 transition-transform group-hover:-rotate-3 border" />
                <div className="relative h-full w-full bg-white rounded  hover:scale-105 transition-all duration-300 select-none border">
                  <Image
                    src={ResumeThreeHero}
                    alt="Resume Preview"
                    width={600}
                    height={680}
                    className="rounded shadow-lg object-contain h-full w-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
