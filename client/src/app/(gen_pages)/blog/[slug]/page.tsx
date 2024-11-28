"use client";

import { FC, useEffect, useState } from "react";
import { LightbulbIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import ContentWrapper from "./content-wrapper";
import {
  ResumeThree,
  ResumeThreeHero,
  StockResume,
} from "../../../../../public/img";

import Image from "next/image";
import ContentWrapper from "@/components/ContentWrapper";
import { IoCheckmarkDone } from "react-icons/io5";
import { PiListChecksBold, PiListNumbersBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
import BlogHeroSection from "@/components/(blog)/blogViewComponents/BlogHeroSection";
import BlogSidebar from "@/components/(blog)/blogViewComponents/BlogSidebar";
import TextWithTitleBlock from "@/components/(blog)/blogViewComponents/TextWithTitleBlock";
import QuickAnswer from "@/components/(blog)/blogViewComponents/QuickAnswer";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "@/components/(blog)/blogViewComponents/BlogHeadings";
import BlogImageBlock from "@/components/(blog)/blogViewComponents/BlogImageBlock";
import NumberPointsBox from "@/components/(blog)/blogViewComponents/NumberPointsBox";
import KeyPointsBox from "@/components/(blog)/blogViewComponents/KeyPointsBox";
import NoteInfo from "@/components/(blog)/blogViewComponents/NoteInfo";
import FAQBox from "@/components/(blog)/blogViewComponents/FAQBox";
import api from "@/lib/api";
import { useParams } from "next/navigation";

interface Section {
  id: string;
  title: string;
}

const sections: Section[] = [
  { id: "introduction", title: "Introduction" },
  { id: "quick-answer", title: "Quick Answer" },
  { id: "key-points", title: "Key Points" },
  { id: "step-by-step", title: "Step-by-Step Guide" },
  { id: "examples", title: "Resume Examples" },
  { id: "tips", title: "Expert Tips & Best Practices" },
  { id: "faq", title: "Frequently Asked Questions" },
];

export default function ArticleLayout() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pathname = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/blog/get/${pathname.slug}`);
      console.log("response data is", response.data);
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <BlogHeroSection />

      {/* Main Content */}
      <ContentWrapper>
        <div className="relative flex gap-8 py-8">
          {/* Left Sidebar - Navigation */}

          <BlogSidebar
            sections={sections}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
          />

          {/* Main Content */}
          <div className="min-w-0 flex-1 space-y-12 lg:pl-8">
            <section id="introduction">
              <TextWithTitleBlock />
            </section>

            {/* Quick Answer Box */}
            <section id="quick-answer">
              <QuickAnswer />
            </section>
            <section>
              <Card className="p-6 space-y-8">
                <div>
                  {/* <h1 className="scroll-m-20 text-4xl font-bold font-heading tracking-tight lg:text-5xl">
                    Heading 1
                  </h1> */}
                  <Heading1 title="Heading 1" />
                  <p className="mt-2 text-xl text-muted-foreground">
                    The main heading of your document. Use this for the title of
                    your page or main sections.
                  </p>
                </div>

                <div>
                  {/* <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold font-heading tracking-tight transition-colors first:mt-0">
                    Heading 2
                  </h2> */}
                  <Heading2 title="Heading 2" />

                  <p className="mt-2 text-lg text-muted-foreground">
                    Used for major sections within your content. It's a step
                    down from the main title.
                  </p>
                </div>

                <div>
                  {/* <h3 className="scroll-m-20 text-2xl font-semibold font-heading tracking-tight">
                    Heading 3
                  </h3> */}
                  <Heading3 title="Heading 3" />

                  <p className="mt-2 text-muted-foreground">
                    Ideal for subsections within your major sections. It
                    provides a clear hierarchy.
                  </p>
                </div>

                <div>
                  {/* <h4 className="scroll-m-20 text-xl font-semibold font-heading tracking-tight">
                    Heading 4
                  </h4> */}
                  <Heading4 title="Heading 4" />

                  <p className="mt-2 text-sm text-muted-foreground">
                    Used for smaller subsections or important points within your
                    content.
                  </p>
                </div>

                <div>
                  {/* <h5 className="scroll-m-20 text-lg font-heading font-semibold tracking-tight">
                    Heading 5
                  </h5> */}
                  <Heading5 title="Heading 5" />

                  <p className="mt-2 text-sm text-muted-foreground">
                    Suitable for minor subsections or to highlight specific
                    details.
                  </p>
                </div>

                <div>
                  <Heading6 title="Heading 6" />

                  <p className="mt-2 text-sm text-muted-foreground">
                    The smallest heading, used sparingly for the finest level of
                    detail in your document structure.
                  </p>
                </div>
              </Card>
            </section>
            {/* Image section */}
            <section>
              <BlogImageBlock />
            </section>

            <section id="numbered-points" className="py-12">
              <NumberPointsBox />
            </section>

            <section id="key-points" className="py-2">
              <KeyPointsBox />
            </section>

            <section>
              <NoteInfo />
            </section>

            {/* FAQ Section */}
            <section id="faq">
              <Heading2 title="Frequently Asked Questions" />

              <FAQBox />
            </section>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

// "use client";

// import { FC, useEffect, useState } from "react";
// import ContentWrapper from "@/components/ContentWrapper";
// import HeroSection from "@/components/(blog)/blogViewComponents/HeroSection";
// import Sidebar from "@/components/(blog)/blogViewComponents/Sidebar";
// import SectionContent from "@/components/(blog)/blogViewComponents/SectionContent";
// import NumberedPoints from "@/components/(blog)/blogViewComponents/NumberedPoints";
// import QuickAnswer from "@/components/(blog)/blogViewComponents/QuickAnswer";
// export const sections = [
//   { id: "introduction", title: "Introduction" },
//   { id: "quick-answer", title: "Quick Answer" },
//   { id: "numbered-points", title: "Steps to Create Your Resume" },
// ];

// const ArticleLayout: FC = () => {
//   const [activeSection, setActiveSection] = useState("");

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveSection(entry.target.id);
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     sections.forEach(({ id }) => {
//       const element = document.getElementById(id);
//       if (element) observer.observe(element);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <HeroSection />

//       {/* Content */}
//       <ContentWrapper>
//         <div className="relative flex gap-8 py-8">
//           {/* Sidebar */}
//           <Sidebar
//             sections={sections}
//             activeSection={activeSection}
//             scrollToSection={scrollToSection}
//           />

//           {/* Main Content */}
//           <div className="min-w-0 flex-1 space-y-12 lg:pl-8">
//             {sections.map((section) => (
//               <SectionContent
//                 key={section.id}
//                 id={section.id}
//                 title={section.title}
//               >
//                 {section.id === "quick-answer" && <QuickAnswer />}
//                 {section.id === "numbered-points" && <NumberedPoints />}
//               </SectionContent>
//             ))}
//           </div>
//         </div>
//       </ContentWrapper>
//     </div>
//   );
// };

// export default ArticleLayout;

// "use client";

// import { FC, useEffect, useState } from "react";
// import {
//   Clock,
//   ChevronRight,
//   CheckCircle2,
//   FileText,
//   LightbulbIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// // import ContentWrapper from "./content-wrapper";
// import {
//   ResumeThree,
//   ResumeThreeHero,
//   StockResume,
// } from "../../../../../public/img";

// import Link from "next/link";
// import Image from "next/image";
// import ContentWrapper from "@/components/ContentWrapper";
// import { MdLibraryAddCheck } from "react-icons/md";
// import { IoCheckmarkDone } from "react-icons/io5";
// import { PiListChecksBold, PiListNumbersBold } from "react-icons/pi";
// import { cn } from "@/lib/utils";
// import BlogHeroSection from "@/components/(blog)/blogViewComponents/BlogHeroSection";

// interface Section {
//   id: string;
//   title: string;
// }

// const sections: Section[] = [
//   { id: "introduction", title: "Introduction" },
//   { id: "quick-answer", title: "Quick Answer" },
//   { id: "key-points", title: "Key Points" },
//   { id: "step-by-step", title: "Step-by-Step Guide" },
//   { id: "examples", title: "Resume Examples" },
//   { id: "tips", title: "Expert Tips & Best Practices" },
//   { id: "faq", title: "Frequently Asked Questions" },
// ];

// export default function ArticleLayout() {
//   const [activeSection, setActiveSection] = useState("");

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveSection(entry.target.id);
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     sections.forEach(({ id }) => {
//       const element = document.getElementById(id);
//       if (element) observer.observe(element);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       {/* <div className="relative bg-gradient-to-b from-[#dde9f8] to-background pb-14 max-lg:pb-10 pt-16 max-lg:pt-14">
//         <ContentWrapper>
//           <div className="relative ">
//             <div className="w-full lg:h-[630px] h-auto rounded overflow-hidden">
//               <Image
//                 src={StockResume}
//                 alt="Resume Guide Hero Image"
//                 //   width={1200}
//                 className=" w-full h-full rounded object-cover"
//                 priority
//               />
//             </div>
//             <div className="absolute bottom-0 rounded-b-md left-0 right-0 bg-gradient-to-t font-heading from-black/80 to-transparent p-8 text-white">
//               <div className="mx-auto max-w-3xl text-center">
//                 <div className="mb-2 flex items-center justify-center gap-2 text-sm">
//                   <time>29 May</time>
//                   <span>•</span>
//                   <div className="flex items-center gap-1">
//                     <Clock className="h-4 w-4" />
//                     <span>35 min read</span>
//                   </div>
//                 </div>
//                 <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading md:text-5xl lg:text-6xl">
//                   How to Make a Resume in 2024 | Beginner's Guide
//                 </h1>
//               </div>
//             </div>
//           </div>
//         </ContentWrapper>
//       </div> */}
//       <BlogHeroSection />

//       {/* Main Content */}
//       <ContentWrapper>
//         <div className="relative flex gap-8 py-8">
//           {/* Left Sidebar - Navigation */}
//           <div className="sticky top-24 hidden h-fit w-72 shrink-0 lg:block">
//             {" "}
//             {/*w-64  */}
//             <nav className="flex flex-col gap-2">
//               <p className="text-lg font-medium text-muted-foreground">
//                 Make a Resume{" "}
//               </p>
//               {sections.map(({ id, title }) => (
//                 <button
//                   key={id}
//                   onClick={() => scrollToSection(id)}
//                   className={`text-left text-sm hover:text-primary ${
//                     activeSection === id
//                       ? "font-medium text-primary"
//                       : "text-muted-foreground"
//                   }`}
//                 >
//                   {title}
//                 </button>
//               ))}
//             </nav>
//             {/* CTA Card */}
//             <Card className="mt-8 p-3 rounded">
//               <div className="w-full h-auto p-1.5 bg-[#EFF6FF] rounded">
//                 <Image
//                   src={ResumeThree}
//                   alt="Resume Hero Image"
//                   priority={true}
//                 />
//               </div>

//               <Button className="mt-4 w-full font-semibold font-heading capitalize text-white rounded hover:scale-[.98] text-[16px]">
//                 Build My Resume{" "}
//               </Button>
//             </Card>
//           </div>

//           {/* Main Content */}
//           <div className="min-w-0 flex-1 space-y-12 lg:pl-8">
//             <section id="introduction">
//               <h2 className="text-3xl font-bold font-blogText">Introduction</h2>
//               <p className="mt-4 text-lg text-muted-foreground font-blogText">
//                 Creating a resume in 2024 requires understanding modern hiring
//                 practices, Applicant Tracking Systems (ATS), and the evolving
//                 job market. This comprehensive guide will walk you through the
//                 process of crafting a standout resume that will impress both AI
//                 systems and human recruiters.
//               </p>
//               <p className="mt-4 text-lg text-muted-foreground font-blogText ">
//                 Creating a resume in 2024 requires understanding modern hiring
//                 practices,
//               </p>
//               <p className="mt-4 text-lg text-muted-foreground font-blogText ">
//                 Creating a resume in 2024 requires understanding modern hiring
//                 practices, Applicant Tracking Systems (ATS), and the evolving
//                 process of crafting a standout resume that will impress both AI
//                 systems and human recruiters.
//               </p>
//               <p className="mt-4 text-lg text-muted-foreground font-blogText ">
//                 Creating a resume in 2024 requires understanding modern hiring
//                 practices, Applicant Tracking Systems (ATS), and the evolving
//                 job market. This comprehensive guide will walk you through the
//                 process of crafting a standout resume that will impress both AI
//                 systems and human recruiters.
//               </p>
//             </section>

//             {/* Quick Answer Box */}
//             <section id="quick-answer">
//               <div className="rounded  border bg-[#EFF6FF] p-6">
//                 <h3 className="text-xl font-semibold font-heading">
//                   Quick Answer
//                 </h3>
//                 <p className="mt-2 text-lg font-blogText">
//                   A modern, effective resume should be ATS-friendly, highlight
//                   relevant skills and experiences, showcase measurable
//                   achievements, and be tailored to the specific job you're
//                   applying for. Use a clean, professional design, focus on your
//                   most recent and relevant experiences, and keep it concise
//                   (typically 1-2 pages).
//                 </p>
//               </div>
//             </section>
//             <section>
//               <Card className="p-6 space-y-8">
//                 <div>
//                   <h1 className="scroll-m-20 text-4xl font-bold font-heading tracking-tight lg:text-5xl">
//                     Heading 1
//                   </h1>
//                   <p className="mt-2 text-xl text-muted-foreground">
//                     The main heading of your document. Use this for the title of
//                     your page or main sections.
//                   </p>
//                 </div>

//                 <div>
//                   <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold font-heading tracking-tight transition-colors first:mt-0">
//                     Heading 2
//                   </h2>
//                   <p className="mt-2 text-lg text-muted-foreground">
//                     Used for major sections within your content. It's a step
//                     down from the main title.
//                   </p>
//                 </div>

//                 <div>
//                   <h3 className="scroll-m-20 text-2xl font-semibold font-heading tracking-tight">
//                     Heading 3
//                   </h3>
//                   <p className="mt-2 text-muted-foreground">
//                     Ideal for subsections within your major sections. It
//                     provides a clear hierarchy.
//                   </p>
//                 </div>

//                 <div>
//                   <h4 className="scroll-m-20 text-xl font-semibold font-heading tracking-tight">
//                     Heading 4
//                   </h4>
//                   <p className="mt-2 text-sm text-muted-foreground">
//                     Used for smaller subsections or important points within your
//                     content.
//                   </p>
//                 </div>

//                 <div>
//                   <h5 className="scroll-m-20 text-lg font-heading font-semibold tracking-tight">
//                     Heading 5
//                   </h5>
//                   <p className="mt-2 text-sm text-muted-foreground">
//                     Suitable for minor subsections or to highlight specific
//                     details.
//                   </p>
//                 </div>

//                 <div>
//                   <h6 className="scroll-m-20 text-base font-heading font-semibold tracking-tight">
//                     Heading 6
//                   </h6>
//                   <p className="mt-2 text-sm text-muted-foreground">
//                     The smallest heading, used sparingly for the finest level of
//                     detail in your document structure.
//                   </p>
//                 </div>
//               </Card>
//             </section>
//             {/* Image section */}
//             <section
//               className={cn("py-8 bg-blue-50 rounded dark:bg-blue-900/20")}
//             >
//               <div className="container mx-auto px-4 ">
//                 <div
//                   className="relative w-full"
//                   style={{ maxWidth: "1000px", margin: "0 auto" }}
//                 >
//                   <Image
//                     src={ResumeThreeHero}
//                     alt={"Resume Guide Hero Image"}
//                     width={1000}
//                     height={600}
//                     className="w-full h-auto rounded-lg shadow-lg "
//                   />
//                 </div>
//                 {
//                   <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
//                     An example of a well-structured resume using our
//                     ATS-friendly template{" "}
//                   </p>
//                 }
//               </div>
//             </section>

//             <section id="numbered-points" className="py-12">
//               <Card className="bg-white shadow-lg rounded border border-gray-200 p-8 max-w-4xl mx-auto">
//                 <div className="flex items-center justify-start w-full gap-4 mb-6">
//                   <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded text-primary">
//                     <PiListNumbersBold className="text-2xl" />
//                   </div>
//                   <h2 className="text-3xl font-bold text-gray-800">
//                     Steps to Create Your Resume
//                   </h2>
//                 </div>
//                 <ol className="space-y-4 list-none pl-0">
//                   {[
//                     "Choose the right resume format based on your experience and the job requirements",
//                     "Start with your contact information, including your full name, phone number, email, and location",
//                     "Craft a compelling summary or objective statement that highlights your key qualifications",
//                     "List your work experience, starting with the most recent position                     List your work experience, starting with the most recent position,",
//                     "Include your educational background, relevant certifications, and academic achievements",
//                     "Highlight your skills, both hard and soft, that are relevant to the position",
//                     "Add optional sections such as volunteer work, projects, or awards if they strengthen your application",
//                     "Proofread your resume carefully and consider having someone else review it as well",
//                   ].map((point, index) => (
//                     <li key={index} className="flex items-start gap-3 group">
//                       <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:scale-110">
//                         {index + 1}
//                       </div>
//                       <span className="text-gray-700 font-blogText leading-relaxed pt-1 group-hover:text-gray-900 transition-colors duration-300">
//                         {point}
//                       </span>
//                     </li>
//                   ))}
//                 </ol>
//               </Card>
//             </section>

//             <section id="key-points" className="py-2">
//               <Card className="bg-white shadow-lg rounded border border-gray-200 p-8 max-w-4xl mx-auto">
//                 <div className="flex items-center justify-start w-full gap-4 mb-6">
//                   <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded text-primary">
//                     <PiListChecksBold className="text-2xl" />
//                   </div>
//                   <h2 className="text-3xl font-bold text-gray-800">
//                     Key Points for a Stellar Resume
//                   </h2>
//                 </div>
//                 <ul className="space-y-4">
//                   {[
//                     {
//                       title: "Choose the Right Format",
//                       content:
//                         "Select a chronological, functional, or combination resume format based on your experience and the job requirements.",
//                     },
//                     {
//                       title: "Start with Your Contact Information",
//                       content:
//                         "Include your full name, phone number, email address, and location (city and state/country).",
//                     },
//                     {
//                       title: "Craft a Compelling Summary or Objective",
//                       content:
//                         "Write a brief, impactful statement that highlights your key qualifications and career goals.",
//                     },
//                     {
//                       title: "List Your Work Experience",
//                       content:
//                         "Detail your relevant work history, starting with your most recent position. Use bullet points to describe your responsibilities and achievements.",
//                     },
//                     {
//                       title: "Highlight Your Education",
//                       content:
//                         "Include your highest level of education, relevant certifications, and any academic achievements.",
//                     },
//                     {
//                       title: "Showcase Your Skills",
//                       content:
//                         "List both hard and soft skills that are relevant to the position you're applying for.",
//                     },
//                     {
//                       title: "Add Optional Sections",
//                       content:
//                         "Consider including sections for volunteer work, projects, publications, or awards if they strengthen your application.",
//                     },
//                     {
//                       title: "Proofread and Refine",
//                       content:
//                         "Carefully review your resume for any errors or inconsistencies. Consider having someone else review it as well.",
//                     },
//                   ].map((point, index) => (
//                     <li key={index} className="flex items-start gap-3 group">
//                       <div className="mt-1.5 transition-all duration-300 group-hover:scale-110">
//                         <IoCheckmarkDone className="h-5 w-5 flex-shrink-0 text-green-600" />
//                       </div>
//                       <span className="text-gray-700 font-blogText leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
//                         {point.content}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </Card>
//             </section>

//             <section>
//               <Card className="relative overflow-hidden bg-gradient-to-br rounded bg-[#EFF6FF] dark:from-blue-900/20 dark:to-blue-800/20 border-blue-100 dark:border-blue-700 p-6 shadow">
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 dark:bg-blue-700/30 rounded -translate-y-16 translate-x-16 blur-3xl opacity-50"></div>
//                 <div className="relative flex items-start space-x-4">
//                   <div className="flex-shrink-0 mt-1">
//                     <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white">
//                       <LightbulbIcon className="w-6 h-6" />
//                     </div>
//                   </div>
//                   <div className="flex-grow">
//                     <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
//                       Note:
//                     </h4>
//                     <div className="text-gray-700 dark:text-gray-300 prose dark:prose-invert">
//                       <p>
//                         Keep in mind that resume keywords won't do much unless
//                         you're using an ATS-friendly resume template. After all,
//                         if the ATS can't even read your resume, it won't be able
//                         to scan for the keywords!
//                       </p>
//                       <p className="mt-4">
//                         Our resume templates are built with ATS in mind. Just
//                         pick one, and you won't have to worry about formatting!
//                       </p>{" "}
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             </section>

//             {/* FAQ Section */}
//             <section id="faq">
//               <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
//               <div className="mt-6 space-y-6">
//                 {[
//                   {
//                     question: "How long should my resume be?",
//                     answer:
//                       "For most professionals, a one-page resume is ideal. If you have extensive relevant experience, two pages may be appropriate.",
//                   },
//                   {
//                     question: "Should I include a photo on my resume?",
//                     answer:
//                       "In most cases, it's best to avoid including a photo on your resume, unless specifically requested by the employer.",
//                   },
//                   {
//                     question: "How far back should my work history go?",
//                     answer:
//                       "Generally, focus on the last 10-15 years of your work history, unless older experience is highly relevant to the position.",
//                   },
//                   {
//                     question: "What file format should I use for my resume?",
//                     answer:
//                       "Unless otherwise specified, a PDF format is usually best as it preserves your formatting across different devices and systems.",
//                   },
//                 ].map((item, index) => (
//                   <div key={index} className="rounded-lg border p-6">
//                     <h3 className="text-xl font-semibold">{item.question}</h3>
//                     <p className="mt-2 text-muted-foreground">{item.answer}</p>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>
//         </div>
//       </ContentWrapper>
//     </div>
//   );
// }
