"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { Logo } from "../../../../public/img";
import FloatingLabelInput from "@/components/inputComponents/TextInputField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

interface ApiMessage {
  type: "success" | "error" | "";
  message: string;
}

const ResendVerification = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  // Error and UI states
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiMessage, setApiMessage] = useState<ApiMessage>({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ): void => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiMessage({ type: "", message: "" });

    try {
      const response = await api.post("/auth/resend-verification", {
        email: formData.email,
      });

      const data = response.data;
      if (data.success) {
        setApiMessage({
          type: "success",
          message: data.message || "Verification email sent successfully",
        });
        setFormData({ email: "" });
      } else {
        setApiMessage({
          type: "error",
          message: data.message || "Failed to send verification email",
        });
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      const axiosError = error as AxiosError<{ message: string }>;

      setApiMessage({
        type: "error",
        message:
          axiosError.response?.data.message ||
          "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-[88px] shadow-md bg-white flex items-center justify-center">
        <Image src={Logo} alt="LiveCareer logo" width={220} height={50} />
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen pt-[88px] px-4 flex-col">
        <div className="w-full max-w-[430px] bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Resend Verification Email
          </h1>

          {/* API Message Alert */}
          {apiMessage.message && (
            <Alert
              className={`mb-4 rounded flex items-center justify-center ${
                apiMessage.type === "success" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <AlertDescription
                className={`text-center rounded font-body text-[16px] font-semibold ${
                  apiMessage.type === "success"
                    ? "text-green-800"
                    : "text-red-600"
                }`}
              >
                {apiMessage.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Resend Verification Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <FloatingLabelInput
                  label="Email Address"
                  value={formData.email}
                  labelClassName="cursor-text"
                  onChange={(e) => handleInputChange(e, "email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
                <p className="mt-1.5 text-sm text-gray-500">
                  Enter the email address associated with your account
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-10 bg-primary text-white font-medium rounded 
                  ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-[.99] transition-all duration-150"
                  }`}
              >
                {isSubmitting ? "SENDING..." : "RESEND VERIFICATION EMAIL"}
              </button>
            </div>
          </form>

          {/* Return to Login */}
          <div className="mt-6 text-center text-sm">
            <p className="font-semibold text-[16px]">
              Don&apos;t have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Return to Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 mt-5 text-center text-sm text-gray-600">
          <nav className="space-x-4">
            <Link href="/terms" className="hover:underline">
              TERMS & CONDITIONS
            </Link>
            <span>|</span>
            <Link href="/privacy" className="hover:underline">
              PRIVACY POLICY
            </Link>
            <span>|</span>
            <Link href="/contact" className="hover:underline">
              CONTACT US
            </Link>
          </nav>
          <p className="mt-2">© 2024, CareerStick.com. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
};

export default ResendVerification;
