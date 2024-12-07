// import ContentWrapper from "@/components/ContentWrapper";
// import { Mail, ArrowRight } from "lucide-react";
// import Image from "next/image";
// // import ContentWrapper from "../components/ContentWrapper";

// import Link from "next/link";
// import { Logo } from "../../../../public/img";

// export default function EmailVerificationPage() {
//   return (
//     <div className="min-h-screen bg-secondary flex items-center justify-center">
//       <header className="fixed top-0 left-0 w-full h-[88px] shadow-md bg-white flex items-center justify-center">
//         <Image src={Logo} alt="LiveCareer logo" width={220} height={50} />
//       </header>
//       <ContentWrapper>
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-auto">
//           <div className="text-center">
//             <div className="bg-primary/10 inline-block p-3 rounded-full">
//               <Mail className="w-8 h-8 text-primary" />
//             </div>
//             <h1 className="mt-4 text-2xl font-bold text-gray-900">
//               Verify Your Email
//             </h1>
//             <p className="mt-2 text-sm text-gray-600">
//               We've sent you an email with a verification link. Please check
//               your inbox and click the link to verify your email address.
//             </p>
//           </div>
//           <div className="mt-8">
//             <Link
//               href="/"
//               className="block w-full bg-primary text-white rounded-md px-4 py-2 text-sm font-medium text-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//             >
//               Return to Homepage
//               <ArrowRight className="inline-block ml-2 w-4 h-4" />
//             </Link>
//           </div>
//           <p className="mt-4 text-xs text-center text-gray-500">
//             Didn't receive the email? Check your spam folder or{" "}
//             <button className="text-primary hover:underline focus:outline-none">
//               resend the verification email
//             </button>
//             .
//           </p>
//         </div>
//       </ContentWrapper>
//     </div>
//   );
// }

// import Image from "next/image";
// import { Mail, ArrowRight } from "lucide-react";
// // import ContentWrapper from "../components/ContentWrapper";

// import Link from "next/link";
// import ContentWrapper from "@/components/ContentWrapper";
// import { Logo, MailVerify } from "../../../../public/img";

// export default function EmailVerificationPage() {
//   return (
//     <div className="min-h-screen bg-secondary flex flex-col">
//       {" "}
//       <header className="fixed top-0 left-0 w-full h-[88px] shadow-md bg-white flex items-center justify-center">
//         <Image src={Logo} alt="LiveCareer logo" width={220} height={50} />{" "}
//       </header>
//       <ContentWrapper>
//         <div className="flex justify-center">
//           <Image
//             src={MailVerify}
//             alt="Email Verification"
//             width={400}
//             height={400}
//             className="max-w-full h-auto"
//           />
//         </div>
//         <div className="max-w-2xl mx-auto text-center  space-y-8">
//           <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 text-primary">
//             <Mail className="w-5 h-5" />
//             <span className="text-sm font-medium">Verify Your Email</span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//             Check your inbox to verify your email
//           </h1>
//           <p className="text-lg text-gray-600">
//             We've sent you an email with a verification link. Please check your
//             inbox and click the link to complete your registration.
//           </p>
//           <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <Link
//               href="/"
//               className="inline-flex items-center bg-primary text-white rounded-md px-6 py-3 text-sm font-medium transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//             >
//               Return to Homepage
//               <ArrowRight className="ml-2 w-4 h-4" />
//             </Link>
//             <button className="text-primary hover:underline focus:outline-none text-sm font-medium">
//               Resend verification email
//             </button>
//           </div>
//         </div>
//       </ContentWrapper>
//     </div>
//   );
// }

// "use client";

// import Image from "next/image";
// import { Mail, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import ContentWrapper from "@/components/ContentWrapper";
// // import { Logo, MailVerify } from "@/public/img";
// // MailVerify;
// import { useState } from "react";
// import { MailVerify, Logo } from "../../../../public/img";

// export default function EmailVerificationPage() {
//   const [isResending, setIsResending] = useState(false);

//   const handleResendEmail = async () => {
//     setIsResending(true);
//     // Implement your resend email logic here
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
//     setIsResending(false);
//   };

//   return (
//     <div className="min-h-screen bg-secondary flex flex-col">
//       <header className="fixed top-0 left-0 w-full h-[88px] shadow-md bg-white z-10">
//         <ContentWrapper>
//           <div className="h-full flex items-center justify-center">
//             <Image
//               src={Logo}
//               alt="LiveCareer logo"
//               width={220}
//               height={50}
//               priority
//             />
//           </div>
//         </ContentWrapper>
//       </header>

//       <main className="flex-grow flex flex-col justify-center pt-4">
//         <ContentWrapper>
//           <div className="max-w-4xl mx-auto text-center space-y-6 py-6">
//             <Image
//               src={MailVerify}
//               alt="Email Verification Illustration"
//               className="mx-auto w-[410px] bg-redd-400"
//             />

//             <div className="space-y-8 bg-fudchsia-500">
//               <div className="inline-flex items-center space-x-2 bg-white rounded px-4 py-2 text-primary">
//                 <Mail className="w-5 h-5" aria-hidden="true" />
//                 <span className="text-sm font-medium">Verify Your Email</span>
//               </div>

//               <h1 className="text-3xl sm:text-4xl font-heading  md:text-5xl font-bold text-gray-900 leading-tight">
//                 Check your inbox to verify your email
//               </h1>

//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 We've sent you an email with a verification link. Please check
//                 your inbox and click the link to complete your registration.
//               </p>

//               <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//                 <Link
//                   href="/"
//                   className="inline-flex items-center bg-primary text-white rounded-md px-6 py-3 text-sm font-medium transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                 >
//                   Return to Homepage
//                   <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
//                 </Link>
//                 <button
//                   onClick={handleResendEmail}
//                   disabled={isResending}
//                   className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium disabled:opacity-50"
//                 >
//                   {isResending ? "Resending..." : "Resend verification email"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </ContentWrapper>
//       </main>
//     </div>
//   );
// }

// "use client";

// import Image from "next/image";
// import { Mail, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import ContentWrapper from "@/components/ContentWrapper";
// import { useState } from "react";
// import { MailVerify, Logo } from "../../../../public/img";
// // import { MailVerify, Logo } from "@/public/img";

// export default function EmailVerificationPage() {
//   const [isResending, setIsResending] = useState(false);

//   const handleResendEmail = async () => {
//     setIsResending(true);
//     // Implement your resend email logic here
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
//     setIsResending(false);
//   };

//   return (
//     <div className="min-h-screen bg-secondary flex flex-col">
//       <header className="fixed top-0 left-0 w-full h-[88px] shadow-md bg-white z-10">
//         <ContentWrapper>
//           <div className="h-full flex items-center justify-center">
//             <Image
//               src={Logo}
//               alt="LiveCareer logo"
//               width={220}
//               height={50}
//               priority
//             />
//           </div>
//         </ContentWrapper>
//       </header>

//       <main className="flex-grow flex items-center justify-center pt-[88px]">
//         <ContentWrapper>
//           <div className="max-w-3xl mx-auto text-center">
//             <div className="mb-12">
//               <Image
//                 src={MailVerify}
//                 alt="Email Verification Illustration"
//                 width={410}
//                 height={410}
//                 className="mx-auto"
//               />
//             </div>

//             <div className="space-y-8">
//               <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 text-primary shadow-md">
//                 <Mail className="w-6 h-6" aria-hidden="true" />
//                 <span className="text-base font-medium">Verify Your Email</span>
//               </div>

//               <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//                 Check your inbox to verify your email
//               </h1>

//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 We've sent you an email with a verification link. Please check
//                 your inbox and click the link to complete your registration.
//               </p>

//               <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
//                 <Link
//                   href="/"
//                   className="inline-flex items-center bg-primary text-white rounded-full px-8 py-4 text-base font-medium transition-all hover:bg-primary/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-md"
//                 >
//                   Return to Homepage
//                   <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
//                 </Link>
//                 <button
//                   onClick={handleResendEmail}
//                   disabled={isResending}
//                   className="text-primary hover:text-primary/80 focus:outline-none focus:underline text-base font-medium disabled:opacity-50 transition-colors"
//                 >
//                   {isResending ? "Resending..." : "Resend verification email"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </ContentWrapper>
//       </main>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import ContentWrapper from "@/components/ContentWrapper";
import { useState } from "react";
import { MailVerify } from "../../../../public/img";

export default function EmailVerificationPage() {
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    // Implement your resend email logic here
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
    setIsResending(false);
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <main className="flex-grow flex items-center justify-center ">
        <ContentWrapper>
          <div className="max-w-md mx-auto text-center ">
            <Image
              src={MailVerify}
              alt="Email Verification Illustration"
              width={340}
              height={340}
              className="mx-auto mb-2 "
            />

            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white rounded font-body font-semibold px-4 py-1 text-primary shadow-sm">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm ">Verify Your Email</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 leading-tight">
                Check your inbox to verify your email
              </h1>

              <p className="text-sm text-gray-600 font-body">
                {` We've sent you an email with a verification link. Please check
                your inbox and click the link to complete your registration.`}
              </p>

              <div className="flex flex-col items-center space-y-3 mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center bg-primary text-white rounded  px-6 py-2 text-sm font-semibold hover:scale-[.98] transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm w-full justify-center"
                >
                  Return to Homepage
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
                <button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="text-primary hover:text-primary/80 focus:outline-none focus:underline text-sm font-medium disabled:opacity-50 transition-colors"
                >
                  {isResending ? "Resending..." : "Resend verification email"}
                </button>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </main>
    </div>
  );
}
