// import ContentWrapper from "@/components/ContentWrapper";
// import { Clock } from "lucide-react";
// import Image from "next/image";
// import React from "react";
// import { StockResume } from "../../../../public/img";

// interface Props {
//   imageUrl: string;
//   imageAlt: string;
//   title: string;
//   readTime: string;
//   date: string;
// }

// const BlogHeroSection = ({
//   imageUrl,
//   imageAlt,
//   title,
//   readTime,
//   date,
// }: Props) => {
//   return (
//     <div className="relative bg-gradient-to-b from-[#dde9f8] to-background pb-14 max-lg:pb-10 pt-16 max-lg:pt-14">
//       <ContentWrapper>
//         <div className="relative ">
//           <div className="w-full lg:h-[630px] h-auto rounded overflow-hidden">
//             <Image
//               src={imageUrl}
//               alt={imageAlt}
//               width={1200}
//               height={630}
//               className=" w-full h-full rounded object-cover"
//             />
//           </div>
//           <div className="absolute bottom-0 rounded-b-md left-0 right-0 bg-gradient-to-t font-heading from-black/80 to-transparent p-8 text-white">
//             <div className="mx-auto max-w-3xl text-center">
//               <div className="mb-2 flex items-center justify-center gap-2 text-sm">
//                 <time>{date}</time>
//                 <span>•</span>
//                 <div className="flex items-center gap-1">
//                   <Clock className="h-4 w-4" />
//                   <span>{readTime}</span>
//                 </div>
//               </div>
//               <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading md:text-5xl lg:text-6xl">
//                 {title}
//               </h1>
//             </div>
//           </div>
//         </div>
//       </ContentWrapper>
//     </div>
//   );
// };

// // export default BlogHeroSection;
// import { Clock, ChevronRight, Home } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// interface Author {
//   name: string;
//   role: string;
//   avatar: string;
// }

// interface Props {
//   imageUrl: string;
//   imageAlt: string;
//   title: string;
//   readTime: string;
//   date: string;
//   description: string;
//   breadcrumbs: { label: string; href: string }[];
//   author: Author;
//   reviewer?: Author;
//   ctaText?: string;
//   ctaHref?: string;
// }

// const BlogHeroSection = ({
//   imageUrl = "/placeholder.svg?height=600&width=600",
//   imageAlt = "Blog post hero image",
//   title = "Default Blog Post Title That Spans Multiple Lines for Better Visual Appeal",
//   readTime = "5 min read",
//   date = "November 28, 2024",
//   description = "This is a default description for the blog post. It should be engaging and provide a brief overview of what readers can expect from the article.",
//   breadcrumbs = [
//     { label: "Blog", href: "/blog" },
//     { label: "Category", href: "/blog/category" },
//     { label: "Post", href: "#" },
//   ],
//   author = {
//     name: "John Doe",
//     role: "Content Writer",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   reviewer,
//   ctaText = "Read Article",
//   ctaHref = "#",
// }: Props) => {
//   return (
//     <div className="relative bg-gradient-to-br from-[#EEF0FF] via-[#F5F6FF] to-background pt-8 pb-16">
//       <div className="container px-4 mx-auto max-w-7xl">
//         {/* Breadcrumbs */}
//         <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
//           <Link
//             href="/"
//             className="flex items-center gap-1 hover:text-primary transition-colors"
//           >
//             <Home className="h-4 w-4" />
//           </Link>
//           {breadcrumbs.map((item, index) => (
//             <div key={index} className="flex items-center gap-2">
//               <ChevronRight className="h-4 w-4" />
//               <Link
//                 href={item.href}
//                 className="hover:text-primary transition-colors"
//               >
//                 {item.label}
//               </Link>
//             </div>
//           ))}
//         </nav>

//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Content */}
//           <div className="space-y-6">
//             <div className="inline-flex items-center rounded-full border bg-background/50 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
//               <span className="flex items-center gap-1">
//                 <Clock className="h-3.5 w-3.5" />
//                 {readTime}
//               </span>
//             </div>

//             <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
//               {title}
//             </h1>

//             <p className="text-lg text-muted-foreground leading-relaxed">
//               {description}
//             </p>

//             <div className="flex flex-wrap items-center gap-6 pt-4">
//               <div className="flex items-center gap-4">
//                 <div className="relative h-12 w-12 ring-2 ring-primary/10 rounded-full">
//                   <Image
//                     src={author.avatar}
//                     alt={author.name}
//                     fill
//                     className="rounded-full object-cover"
//                   />
//                 </div>
//                 <div>
//                   <div className="font-medium">{author.name}</div>
//                   <div className="text-sm text-muted-foreground">
//                     {author.role}
//                   </div>
//                 </div>
//               </div>

//               {reviewer && (
//                 <>
//                   <div className="h-8 w-px bg-border" />
//                   <div className="flex items-center gap-4">
//                     <div className="relative h-12 w-12 ring-2 ring-primary/10 rounded-full">
//                       <Image
//                         src={reviewer.avatar}
//                         alt={reviewer.name}
//                         fill
//                         className="rounded-full object-cover"
//                       />
//                     </div>
//                     <div>
//                       <div className="font-medium">
//                         Reviewed by {reviewer.name}
//                       </div>
//                       <div className="text-sm text-muted-foreground">
//                         {reviewer.role}
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>

//             <div className="flex items-center gap-4 text-sm text-muted-foreground">
//               <time className="rounded-full bg-primary/5 px-3 py-1">
//                 {date}
//               </time>
//             </div>

//             <div>
//               <Link
//                 href={ctaHref}
//                 className="inline-flex h-11 items-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 shadow-lg shadow-primary/20"
//               >
//                 {ctaText}
//               </Link>
//             </div>
//           </div>

//           {/* Image */}
//           <div className="relative lg:h-[600px] h-[400px] w-full rounded-3xl overflow-hidden bg-muted shadow-2xl shadow-primary/20 ring-1 ring-primary/10">
//             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//             <Image
//               src={imageUrl}
//               alt={imageAlt}
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogHeroSection;

// import { Clock, ChevronRight, Home } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// interface Author {
//   name: string;
//   role: string;
//   avatar: string;
// }

// interface Props {
//   imageUrl: string;
//   imageAlt: string;
//   title: string;
//   readTime: string;
//   date: string;
//   description: string;
//   breadcrumbs: { label: string; href: string }[];
//   author: Author;
//   ctaText?: string;
//   ctaHref?: string;
// }

// const BlogHeroSection = ({
//   imageUrl = "/placeholder.svg?height=600&width=600",
//   imageAlt = "Blog post hero image",
//   title = "Default Blog Post Title That Spans Multiple Lines for Better Visual Appeal",
//   readTime = "5 min read",
//   date = "November 28, 2024",
//   description = "This is a default description for the blog post. It should be engaging and provide a brief overview of what readers can expect from the article.",
//   breadcrumbs = [
//     { label: "Blog", href: "/blog" },
//     { label: "Category", href: "/blog/category" },
//     { label: "Post", href: "#" },
//   ],
//   author = {
//     name: "John Doe",
//     role: "Content Writer",
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   ctaText = "Read Article",
//   ctaHref = "#",
// }: Props) => {
//   return (
//     <div className="relative bg-gradient-to-b from-[#EEF0FF] to-background pt-8 pb-16">
//       <div className="container px-4 mx-auto max-w-7xl">
//         {/* Breadcrumbs */}
//         <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
//           <Link
//             href="/"
//             className="flex items-center gap-1 hover:text-foreground transition-colors"
//           >
//             <Home className="h-4 w-4" />
//           </Link>
//           {breadcrumbs.map((item, index) => (
//             <div key={index} className="flex items-center gap-2">
//               <ChevronRight className="h-4 w-4" />
//               <Link
//                 href={item.href}
//                 className="hover:text-foreground transition-colors"
//               >
//                 {item.label}
//               </Link>
//             </div>
//           ))}
//         </nav>

//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* Content */}
//           <div className="space-y-8">
//             <div className="space-y-6">
//               <h1 className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-5xl text-foreground">
//                 {title}
//               </h1>

//               <p className="text-lg text-muted-foreground leading-relaxed">
//                 {description}
//               </p>
//             </div>

//             <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border">
//               <div className="relative h-14 w-14 shrink-0">
//                 <Image
//                   src={author.avatar}
//                   alt={author.name}
//                   fill
//                   className="rounded-full object-cover"
//                 />
//               </div>
//               <div>
//                 <div className="font-medium text-foreground">{author.name}</div>
//                 <div className="text-sm text-muted-foreground">
//                   {author.role}
//                 </div>
//               </div>
//             </div>

//             <div>
//               <Link
//                 href={ctaHref}
//                 className="inline-flex h-12 items-center rounded-full bg-primary px-8 text-sm font-medium text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
//               >
//                 {ctaText}
//               </Link>
//               <div className="flex items-center gap-4">
//                 <time className="px-4 py-1.5 rounded-full bg-white shadow-sm border text-sm">
//                   {date}
//                 </time>
//                 <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border text-sm">
//                   <Clock className="h-4 w-4 text-primary" />
//                   {readTime}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Image */}
//           <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
//             <Image
//               src={imageUrl}
//               alt={imageAlt}
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogHeroSection;

// import { Button } from "@/components/ui/button";
// import { Clock, ChevronRight, Home, Calendar } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { PiSealCheckBold } from "react-icons/pi";
// import { profile } from "../../../../public/img";
// import { use } from "react";
// import { useParams } from "next/navigation";
// import ContentWrapper from "@/components/ContentWrapper";

// interface Props {
//   imageUrl: string;
//   imageAlt: string;
//   title: string;
//   readTime: string;
//   date: string;
//   description: string;
//   // breadcrumbs: { label: string; href: string }[];
//   ctaText?: string;
//   ctaHref?: string;
// }

// const BlogHeroSection = ({
//   imageUrl,
//   imageAlt = "Blog post hero image",
//   title = "Default Blog Post Title That Spans Multiple Lines for Better Visual Appeal",
//   readTime = "5 min read",
//   date = "November 28, 2024",
//   description = "This is a default description for the blog post. It should be engaging and provide a brief overview of what readers can expect from the article. ",

//   ctaText = "Read Article",
//   ctaHref = "#",
// }: Props) => {
//   const param = useParams();

//   const { slug } = param;
//   const pageName = typeof slug === "string" ? slug.split("-").join(" ") : "";
//   const breadcrumbs = [
//     { label: "Home", href: "/" },
//     { label: "Blog", href: "/blog" },
//     { label: pageName, href: "" },
//   ];
//   console.log(param);
//   return (
//     <div className="relative bg-gradient-to-b border-b from-[#EFF6FF] to-background pt-8 pb-10">
//       <ContentWrapper>
//         <div className="container px-4 mx-auto max-w-7xl bg-red-800">
//           {/* Breadcrumbs */}
//           <nav className="flex items-center font-heading gap-2 text-sm text-muted-foreground mb-5">
//             {/* <Link
//             href="/"
//             className="flex items-center gap-1 hover:text-foreground transition-colors"
//           >
//             <Home className="h-4 w-4" />
//           </Link> */}
//             {breadcrumbs.map((item, index) => (
//               <div key={index} className="flex items-center gap-1">
//                 <ChevronRight className="h-4 w-4 text-black" />
//                 <Link
//                   href={item.href}
//                   className={`hover:text-foreground transition-colors text-[14px] ${
//                     item.label === "Home" || item.label === "Blog"
//                       ? "text-primary"
//                       : ""
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               </div>
//             ))}
//           </nav>

//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Content */}
//             <div className="space-y-6">
//               <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
//                 {title}
//               </h1>

//               <p className="text-lg text-muted-foreground leading-relaxed">
//                 {description}
//               </p>
//               {/*
//             <div className="flex items-center gap-4">
//               <Link
//                 href={ctaHref}
//                 className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-white transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
//               >
//                 {ctaText}
//               </Link>
//             </div> */}
//               <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
//                 <Button
//                   size="lg"
//                   className="bg-primary hover:bg-blue-700 text-white font-bold rounded hover:scale-[.98] transition-all duration-150 font-heading"
//                 >
//                   Generate My Resume
//                 </Button>
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-blue-200 hover:bg-white font-bold rounded hover:scale-[.98] transition-all duration-150 font-heading"
//                 >
//                   View samples
//                 </Button>
//               </div>
//               <div className="w-full h-auto flex flex-col max-md:text-start gap-2 max-md:items-start max-md:justify-start  text-gray-500 font-medium text-[17px]">
//                 <div className="w-full h-full flex items-center max-md:items-start justify-start max-lg:justify-center gap-1  font-heading">
//                   <div className="max-md:w-[22px] max-md:h-[22px] ">
//                     <PiSealCheckBold className="text-[20px] text-green-600 max-lg:mt-1" />
//                   </div>
//                   <span>
//                     Generate, optimize, and customize resumes instantly with AI.
//                   </span>
//                 </div>
//                 <div className="w-full h-full flex items-center max-md:items-start max-lg:justify-center max-md:justify-start justify-start gap-1 font-heading">
//                   <div className="max-md:w-[22px] max-md:h-[22px] ">
//                     <PiSealCheckBold className="text-[20px] text-green-600 max-lg:mt-1" />
//                   </div>
//                   <span>Free to use, No credit card required.</span>
//                 </div>
//                 {/* <div className="w-full h-full flex items-center max-md:items-start max-lg:justify-center justify-start gap-1 font-heading">
//                 <PiSealCheckBold className="text-[20px] text-green-600 max-lg:mt-1" />
//                 <span>One-click resume customization for any job role.</span>
//               </div> */}
//               </div>
//               {/* <div className="flex items-center gap-6 pt-4">
//               <div className="flex items-center gap-3 border px-2 py-1 rounded">
//                 <Image
//                   src={profile}
//                   alt={"Author"}
//                   width={40}
//                   height={40}
//                   className="rounded-full"
//                 />
//                 <div>
//                   <p className="text-sm font-medium text-gray-900">
//                     Written by {"jay"}
//                   </p>
//                   <p className="text-sm text-gray-500">{"Author"}</p>
//                 </div>
//               </div>
//             </div> */}
//               {/* <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
//               <time className="flex items-center gap-2 border px-2 py-1 rounded">
//                 {date}
//               </time>
//               <div className="h-1 w-1 rounded-full bg-muted-foreground/25" />
//               <div className="flex items-center gap-2 border rounded bg-background/50 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
//                 <Clock className="h-4 w-4" />
//                 {readTime}
//               </div>
//             </div> */}
//               <div className="flex items-center gap-3 text-sm  text-gray-600">
//                 <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded border">
//                   <Calendar className="h-4 w-4 text-primary" />
//                   <time>{date}</time>
//                   <span className="text-gray-400">•</span>
//                   <span>{readTime} read</span>
//                 </div>
//               </div>
//             </div>

//             {/* Image */}
//             <div className="relative  w-auto">
//               <div className="absolute inset-0  rounded-md overflow-hidden shadow border max-md:w-full max-md:h-full  lg:h-[415px] lg:w-[624px]">
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
//                 <Image
//                   // src={imageUrl}
//                   src={
//                     "https://cdn.enhancv.com/images/1920/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vSG93X3RvX3dyaXRlX2FfcmVzdW1lX2ZlYXR1cmVfaW1nXzdiMDFhYjNmNDEuanBn.jpg"
//                   }
//                   alt={imageAlt}
//                   fill
//                   className="object-cover "
//                   priority
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </ContentWrapper>
//     </div>
//   );
// };

// export default BlogHeroSection;

import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PiSealCheckBold } from "react-icons/pi";
import { useParams } from "next/navigation";
import ContentWrapper from "@/components/ContentWrapper";
import { format } from "date-fns";
import { LuClock8 } from "react-icons/lu";

interface Props {
  imageUrl: string;
  imageAlt: string;
  title: string;
  readTime: number;
  date: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}

const BlogHeroSection = ({
  imageUrl,
  imageAlt,
  title,
  readTime,
  date,
  description,
}: Props) => {
  const param = useParams();

  const { slug } = param;
  const pageName = typeof slug === "string" ? slug.split("-").join(" ") : "";
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: pageName, href: "" },
  ];

  const heroDate = format(new Date(date), "MMMM dd, yyyy");

  return (
    <section className="relative bg-gradient-to-b border-b from-[#EFF6FF] to-background pt-8 pb-10">
      <ContentWrapper>
        <div className="container mx-auto ">
          {/* Breadcrumbs */}
          <nav className="flex items-center  font-heading gap-2 text-sm text-muted-foreground mb-5">
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                {index > 0 && <ChevronRight className="h-4 w-4 text-black" />}
                <Link
                  href={item.href}
                  className={`hover:text-foreground transition-colors text-[14px] capitalize ${
                    item.label === "Home" || item.label === "Blog"
                      ? "text-primary"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="space-y-6 ">
              <h1 className="text-3xl font-bold blogTitleColor tracking-tight sm:text-4xl lg:text-5xl text-foreground">
                {title}
              </h1>

              {/* <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p> */}
              <div
                className="text-lg leading-relaxed font-blogText blogTextColor text-[18px] text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: description || "" }}
              />

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link href={"/app/resumes"}>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-blue-700 text-white font-bold rounded hover:scale-[.98] transition-all duration-150 font-heading"
                  >
                    Generate My Resume
                  </Button>
                </Link>
                <Link href={"/app/resumes"}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-200 hover:bg-white font-bold rounded hover:scale-[.98] transition-all duration-150 font-heading"
                  >
                    View samples
                  </Button>
                </Link>
              </div>
              <div className="w-full h-auto flex flex-col max-md:text-start gap-2 max-md:items-start max-md:justify-start  text-gray-500 font-medium text-[17px]">
                <div className="w-full h-full flex items-center max-md:items-start justify-start max-lg:justify-center gap-1  font-heading">
                  <div className="max-md:w-[22px] max-md:h-[22px] ">
                    <PiSealCheckBold className="text-[20px] text-green-600 max-lg:mt-1" />
                  </div>
                  <span>
                    Generate, optimize, and customize resumes instantly with AI.
                  </span>
                </div>
                <div className="w-full h-full flex items-center max-md:items-start max-lg:justify-center max-md:justify-start justify-start gap-1 font-heading">
                  <div className="max-md:w-[22px] max-md:h-[22px] ">
                    <PiSealCheckBold className="text-[20px] text-green-600 max-lg:mt-1" />
                  </div>
                  <span>Free to use, No credit card required.</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm  text-gray-600">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded border">
                  <Calendar className="h-4 w-4 text-gray-700" />
                  <time>{heroDate}</time>
                  <span className="text-gray-400">•</span>
                  <LuClock8 className="h-4 w-4 text-gray-700" />
                  <span>{readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Image */}
            {/* <div className="relative w-full h-[415px] lg:h-[415px]">
              <div className="absolute inset-0 rounded-md overflow-hidden shadow border">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />

                <Image
                  src={imageUrl}
                  alt={imageAlt || "Blog Hero Image"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div> */}
            <div className="relative w-full h-[415px] lg:h-[415px]">
              <div className="absolute inset-0 rounded-md overflow-hidden shadow border">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                <Image
                  src={imageUrl}
                  alt={imageAlt || "Blog Hero Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
};

export default BlogHeroSection;
