"use client";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import FloatingLabelInput from "@/components/inputComponents/TextInputField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

interface ApiMessage {
  type: "success" | "error" | "";
  message: string;
}

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useParams();
  const resetToken = searchParams.resetToken;
  console.log("resetToken", resetToken);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });

  // Error and UI states
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [apiMessage, setApiMessage] = useState<ApiMessage>({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate if reset token exists
  useEffect(() => {
    if (!resetToken) {
      setApiMessage({
        type: "error",
        message:
          "Invalid or expired reset token. Please request a new password reset.",
      });
    }
  }, [resetToken]);

  // Validation functions
  const validatePassword = (password: string): boolean => {
    return password.length >= 6 && password.length <= 28;
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

    // Validate password
    if (!formData.password) {
      newErrors.password = "New password is required";
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be between 6-28 characters";
      isValid = false;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validate reset token
    if (!resetToken) {
      setApiMessage({
        type: "error",
        message: "Invalid reset token. Please request a new password reset.",
      });
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiMessage({ type: "", message: "" });

    try {
      const response = await api.post(`/auth/reset-password/${resetToken}`, {
        password: formData.password,
      });

      const data = response.data;
      if (data.success) {
        setApiMessage({
          type: "success",
          message: data.message || "Password reset successful",
        });

        // Clear form and redirect to login after a short delay
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setApiMessage({
          type: "error",
          message: data.message || "Failed to reset password",
        });
      }
    } catch (error) {
      console.error("Reset password error:", error);
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

  // Toggle password visibility
  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen pt-[88px] px-4 flex-col">
        <div className="w-full max-w-[430px] bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Reset Your Password
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

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* New Password Input */}
              <div className="relative">
                <div className="relative">
                  <FloatingLabelInput
                    inputType={showPassword.password ? "text" : "password"}
                    label="New Password"
                    value={formData.password}
                    labelClassName="cursor-text"
                    onChange={(e) => handleInputChange(e, "password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => togglePasswordVisibility("password")}
                  >
                    {showPassword.password ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
                <p className="mt-1.5 text-sm text-gray-500">
                  Password should be between 6-28 characters
                </p>
              </div>

              {/* Confirm New Password Input */}
              <div className="relative">
                <div className="relative">
                  <FloatingLabelInput
                    inputType={
                      showPassword.confirmPassword ? "text" : "password"
                    }
                    label="Confirm New Password"
                    value={formData.confirmPassword}
                    labelClassName="cursor-text"
                    onChange={(e) => handleInputChange(e, "confirmPassword")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    {showPassword.confirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !resetToken}
                className={`w-full h-10 bg-primary text-white font-medium rounded 
                  ${
                    isSubmitting || !resetToken
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-[.99] transition-all duration-150"
                  }`}
              >
                {isSubmitting ? "RESETTING..." : "RESET PASSWORD"}
              </button>
            </div>
          </form>

          {/* Return to Login */}
          <div className="mt-6 text-center text-sm">
            <p className="font-semibold text-[16px]">
              Remember your password?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Return to Login
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 mt-5 text-center text-sm text-gray-600">
          <p className="mt-2">© 2024, CareerStick.com. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
