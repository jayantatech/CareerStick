// import Image from "next/image";
// import Link from "next/link";
// // import ContentWrapper from "./content-wrapper";
// import { Button } from "@/components/ui/button";
// import ContentWrapper from "@/components/ContentWrapper";

// export default function ResumeAnalyzer() {
//   return (
//     <section className="py-16 bg-white">
//       <ContentWrapper>
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <div className="space-y-6">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//               Scan. Update.
//               <br />
//               Get Interviews.
//             </h2>
//             <p className="text-lg text-gray-600 max-w-md">
//               It's really that easy. You'll get instant resume feedback and
//               instructions to update your resume. Optimize for what ATS systems,
//               recruiters, and hiring managers want to see.
//             </p>
//             <div className="space-y-4">
//               <Link href="/app">
//                 <Button className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-md text-lg">
//                   SCAN YOUR RESUME &gt;
//                 </Button>
//               </Link>
//               <p className="text-sm text-gray-500">
//                 Or{" "}
//                 <Link
//                   href="/sample-scan"
//                   className="text-blue-600 hover:underline"
//                 >
//                   see a sample resume scan &gt;
//                 </Link>
//               </p>
//             </div>
//           </div>
//           <div className="relative">
//             <Image
//               src="/placeholder.svg?height=400&width=500"
//               alt="Resume Match Diagram"
//               width={500}
//               height={400}
//               className="w-full h-auto"
//             />
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-90 rounded-full p-4 shadow-lg">
//               <div className="text-center">
//                 <span className="text-4xl font-bold text-red-500">50%</span>
//                 <span className="block text-sm font-medium">MATCH</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
//           {[
//             { label: "ATS Best Practices", percentage: "88%" },
//             { label: "Hard Skills Match", percentage: "43%" },
//             { label: "Soft Skills Match", percentage: "10%" },
//             { label: "Sales Index", percentage: "25%" },
//           ].map((item, index) => (
//             <div key={index} className="bg-gray-50 p-4 rounded-lg">
//               <span className="block text-2xl font-bold text-blue-600">
//                 {item.percentage}
//               </span>
//               <span className="text-sm text-gray-600">{item.label}</span>
//             </div>
//           ))}
//         </div>
//       </ContentWrapper>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";
// import ContentWrapper from "./content-wrapper";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  CheckCircle,
  FileCheck,
} from "lucide-react";
import ContentWrapper from "@/components/ContentWrapper";
import { ATSRedResume } from "../../../../public/img";

export default function ResumeAnalyzer() {
  const metrics = [
    {
      icon: <FileCheck className="w-6 h-6 text-white" />,
      label: "ATS Score",
      percentage: 88,
    },
    {
      icon: <Brain className="w-6 h-6 text-white" />,
      label: "Skills Match",
      percentage: 72,
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      label: "Experience",
      percentage: 65,
    },
    {
      icon: <BookOpen className="w-6 h-6 text-white" />,
      label: "Format Score",
      percentage: 95,
    },
  ];
  return (
    <section className="py-20 bg-gradient-to-br  bg-blue-50 border-t">
      {" "}
      {/* from-gray-50 to-[#F9FAFB] */}
      <ContentWrapper>
        <div className="flex lg:flex-row flex-col gap-12 items-center justify-between max-lg:items-center max-lg:justify-center">
          <div className="space-y-8 w-1/2 max-lg:w-full h-auto max-lg:items-center max-lg:justify-center">
            <div className="space-y-4 max-lg:text-center w-full h-full">
              <h2 className="text-4xl font-extrabold font-heading tracking-tight sm:text-5xl md:text-6xl text-gray-900">
                Upload. Enhance. <br />
                <span className="text-blue-600 font-heading">
                  Land Interviews.
                </span>{" "}
              </h2>
              {/* <h2 className="text-4xl font-extrabold font-heading tracking-tight sm:text-5xl md:text-6xl text-gray-900">
                Scan. Optimize. 
                <br />
                <span className="text-blue-600 font-heading">
                  Land Interviews.
                </span>
              </h2> */}
              <p className="text-xl text-gray-600 max-w-md max-lg:mx-auto">
                {/* Our AI-powered resume scanner gives you instant feedback to make
                your resume stand out to ATS systems and hiring managers. */}
                Our AI-powered scanner gives instant feedback and, with one
                click, creates a perfectly optimized ATS-friendly resume ready
                to download!
              </p>
            </div>
            {/* <div className="space-y-4 max-lg:text-center ">
              <Link href="/app">
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                  Scan Your Resume <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <p className="text-sm text-gray-600">
                Not ready?{" "}
                <Link
                  href="/sample-scan"
                  className="text-blue-600 hover:underline font-medium"
                >
                  See a sample resume scan
                </Link>
              </p>
            </div> */}
            <div className="flex flex-col justify-center max-lg:items-center  lg:justify-start gap-4">
              <span className="px-2 py-1 bg-lightprimany w-[140px] rounded text-primary font-heading text-center">
                Coming Soon
              </span>
              <Link href="/app">
                <Button className="w-full sm:w-auto bg-primary hover:bg-blue-700 text-white font-semibold py-5 px-8 rounded text-lg transition-all duration-150  transform hover:scale-[.98]">
                  Scan Your Resume <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-blue-200 hover:bg-white font-bold rounded hover:scale-[.98] transition-all duration-150 font-heading"
              >
                View samples
              </Button> */}
              <p className="text-sm text-gray-600">
                Not ready?{" "}
                <Link
                  href="/sample-scan"
                  className="text-blue-600 hover:underline font-medium"
                >
                  See a sample resume scan
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-2 max-lg:grid-cols-3 max-md:grid-cols-1 gap-4 max-lg:justify-items-center max-lg:justify-center">
              {[
                "ATS-Friendly Format",
                "Keyword Optimization",
                "Skills Gap Analysis",
                "Industry-Specific Tips",
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-auto gap-2 flex flex-row w-1/2 max-lg:items-start max-lg:justify-center max-md:flex-col max-lg:w-full">
            <div className="w-[436px] rounded relative max-md:w-[90%] max-md:mx-auto">
              {" "}
              {/* Added relative here */}
              {/* Background rotated divs */}
              <div className="absolute inset-0 bg-white border rounded transform -rotate-3 transition-transform group-hover:rotate-3 z-10"></div>
              <div className="absolute inset-0 bg-white border rounded transform rotate-2 transition-transform group-hover:rotate-6 z-20"></div>
              {/* Main image container */}
              <div className="relative w-full bg-white p-2 border rounded shadow-xl hover:scale-105 transition-all duration-300 ease-in-out z-30">
                <Image
                  src={ATSRedResume}
                  alt="Resume Match Diagram"
                  width={500}
                  height={400}
                  className="w-[418px] rounded h-[560px]  max-md:h-auto"
                />
              </div>
            </div>
            {/* <div className="w-[144px]  h-[380px] rounded bg-violet-500"></div> */}
            <div className="w-[144px] max-md:w-full h-full gap-3 rounded bg-white ml-2 border p-3 max-md:mt-2 grid grid-cols-1 max-md:grid-cols-2 ">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex flex-col  items-center bg-[#EFF6FF] hover:scale-[.98] cursor-pointer border rounded p-2 backdrop-blur-sm transition-all duration-300 select-none"
                >
                  <div className="bg-primary rounded-full p-2 mb-2">
                    {metric.icon}
                  </div>
                  <span className="text-xl font-bold text-primary">
                    {metric.percentage}%
                  </span>
                  <span className="text-xs text-primary/90 font-heading font-semibold text-center">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

{
  /* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white bg-opacity-90 rounded-full p-6 shadow-lg text-center">
                    <span className="text-5xl font-bold text-blue-600">
                      75%
                    </span>
                    <span className="block text-sm font-medium text-gray-600">
                      MATCH
                    </span>
                  </div>
                </div> */
}
{
  /* <div className=" absolute bottom-0  h-auto mt-8 grid grid-cols-2 gap-4 bg-green-400">
                  {[
                    { label: "ATS Score", percentage: "88%" },
                    { label: "Skills Match", percentage: "72%" },
                    { label: "Experience", percentage: "65%" },
                    { label: "Formatting", percentage: "95%" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg text-center"
                    >
                      <span className="block text-2xl font-bold text-blue-600">
                        {item.percentage}
                      </span>
                      <span className="text-sm text-gray-600">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div> */
}
