"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
// import { Logo } from "../../../../public/img";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import api from "@/lib/api";
import Link from "next/link";
import { Logo } from "../../../../../public/img";
import { AxiosError } from "axios";
import { setAccessToken, setRefreshToken } from "@/lib/setTokenInfo";
interface VerificationState {
  status: "loading" | "success" | "error";
  message: string;
}

const Verify = () => {
  const router = useRouter();
  const params = useParams();
  const [verificationState, setVerificationState] = useState<VerificationState>(
    {
      status: "loading",
      message: "Verifying your email...",
    }
  );

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!params.id) {
          setVerificationState({
            status: "error",
            message: "Invalid verification link",
          });
          return;
        }

        // console.log("data send to verify", params.id);

        const response = await api.post(
          `/auth/verify-user/${params.id}`,
          {},
          { withCredentials: true }
        );

        // console.log("Verification response:", response.data);
        const data = response.data;
        if (data.success) {
          // cookie.set("refreshToken", data.refreshToken, {
          //   sameSite: "strict",
          //   secure: true,
          //   expires: 4 * 60 * 60 * 1000,
          //   path: "/",
          // });
          setAccessToken(data.accessToken);
          setRefreshToken(data.refreshToken);

          setVerificationState({
            status: "success",
            message: "Email verified successfully!",
          });
          // Redirect to app after 2 seconds
          // if()

          setTimeout(() => {
            router.push("/app");
          }, 1500);
        } else {
          setVerificationState({
            status: "error",
            message: response.data.message || "Verification failed",
          });
        }
      } catch (error) {
        // console.error("Verification error:", error);
        // setVerificationState({
        //   status: "error",
        //   message:
        //     error.response?.data?.message ||
        //     "An error occurred during verification",
        // });
        if (error instanceof AxiosError) {
          console.error("Verification error:", error);
          setVerificationState({
            status: "error",
            message:
              error.response?.data?.message ||
              "An error occurred during verification",
          });
        } else {
          // Handle any non-Axios errors if necessary
          setVerificationState({
            status: "error",
            message: "An unexpected error occurred",
          });
        }
      }
    };

    verifyEmail();
  }, [params.id, router]);

  const renderContent = () => {
    switch (verificationState.status) {
      case "loading":
        return (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <p className="text-lg font-medium text-gray-700">
              {verificationState.message}
            </p>
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <Alert className="bg-green-50">
              <AlertDescription className="text-center font-body text-[16px] font-semibold text-green-800">
                {verificationState.message}
              </AlertDescription>
            </Alert>
            <p className="text-gray-600">
              Redirecting you to the app in a moment...
            </p>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="w-16 h-16 text-red-500" />
            <Alert className="bg-red-50">
              <AlertDescription className="text-center font-body text-[16px] font-semibold text-red-800">
                {verificationState.message}
              </AlertDescription>
            </Alert>
            <div className="flex flex-col items-center space-y-2">
              <p className="text-gray-600">
                Please try the verification link again or contact support.
              </p>
              <Link
                href="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Return to Login
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-[88px] shadow-md bg-white flex items-center justify-center">
        <Image src={Logo} alt="LiveCareer logo" width={220} height={50} />
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen pt-[88px] px-4">
        <div className="w-full max-w-[530px] bg-white rounded shadow p-8">
          <h1 className="text-2xl font-semibold text-center mb-8">
            Email Verification
          </h1>
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full py-4 text-center text-sm text-gray-600 ">
        <nav className="space-x-4">
          <Link href="#" className="hover:underline">
            TERMS & CONDITIONS
          </Link>
          <span>|</span>
          <Link href="#" className="hover:underline">
            PRIVACY POLICY
          </Link>
          <span>|</span>
          <Link href="#" className="hover:underline">
            CONTACT US
          </Link>
        </nav>
        <p className="mt-2">© 2024, CareerStick.com. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Verify;
