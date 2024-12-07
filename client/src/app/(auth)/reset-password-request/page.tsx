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
                <span className="text-sm ">Reset Your Password</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 leading-tight">
                Check your inbox to reset your password
              </h1>

              <p className="text-sm text-gray-600 font-body">
                {` We've sent you an email with a password reset link. Please check
                your inbox and click the link to create a new password.`}
              </p>

              <div className="flex flex-col items-center space-y-3 mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center bg-primary text-white rounded  px-6 py-2 text-sm font-semibold hover:scale-[.98] transition-all hover:bg-primary/90 focus:outline-none  shadow-sm w-full justify-center"
                >
                  Return to Homepage
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
                <button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="text-primary hover:text-primary/80 focus:outline-none focus:underline text-sm font-medium disabled:opacity-50 transition-colors"
                >
                  {isResending ? "Resending..." : "Resend reset email"}
                </button>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </main>
    </div>
  );
}
