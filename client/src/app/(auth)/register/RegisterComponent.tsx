"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { Google } from "../../../../public/icons";
import FloatingLabelInput from "@/components/inputComponents/TextInputField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { setTokens } from "@/lib/ServerCookie";

// Interfaces
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface ApiMessage {
  type: "success" | "error" | "";
  message: string;
}

const RegisterComponent: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  // Error states
  const [errors, setErrors] = useState<FormErrors>({});

  // UI states
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<ApiMessage>({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string): boolean => {
    return name.length >= 2 && name.length <= 50;
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6 && password.length <= 28;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ): void => {
    const { value } = e.target;
    // console.log("name and value", name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // First Name validation
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = "First name must be between 2-50 characters";
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName = "Last name must be between 2-50 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be between 6-28 characters";
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
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
    if (!validateForm()) return;
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.confirmPassword !== formData.password
    )
      return;

    setIsSubmitting(true);
    setApiMessage({ type: "", message: "" });
    // console.log("formData", formData);
    try {
      const response = await api.post("/auth/register", {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      // console.log("response.data for register", response.data);
      const data = response.data;
      if (data.success) {
        setApiMessage({
          type: "success",
          message: data.message || "Registration successful",
        });
        // Reset form on success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/verify-request");
      } else {
        setApiMessage({
          type: "error",
          message: data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      // console.log("error from api", error);
      const axiosError = error as AxiosError<{
        message: string;
        success: boolean;
      }>;

      if (!axiosError.response?.data?.success) {
        setApiMessage({
          type: "error",
          message:
            axiosError.response?.data.message ||
            "Registration failed. Please try again.",
        });
        return;
      }
      // console.log("axiosError.response.data", axiosError.response?.data);
      if (
        axiosError.response?.status === 400 ||
        axiosError.response?.status === 409
      ) {
        setApiMessage({
          type: "error",
          message:
            axiosError.response.data.message ||
            "Registration failed. Please try again.",
        });
        return;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // google register
  const googleRegister = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        setIsGoogleLoading(true);
        const response = await api.post("/auth/google", {
          code: codeResponse.code,
        });

        const data = response.data;

        if (data.success) {
          setApiMessage({
            type: "success",
            message: "Successfully registered with Google!",
          });
          if (data.accessToken && data.refreshToken) {
            await setTokens(data.accessToken, data.refreshToken);
          }
          router.push("/app/resumes");
        }
      } catch (error) {
        console.error("Google registration error:", error);
        setApiMessage({
          type: "error",
          message: "Failed to register with Google. Please try again.",
        });
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      setApiMessage({
        type: "error",
        message: "Google registration failed. Please try again.",
      });
      setIsGoogleLoading(false);
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen pt-[88px] px-4 flex-col">
        <div className="w-full max-w-[430px] bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Create your account
          </h1>

          {/* API Message Alert */}
          {apiMessage.message && (
            <Alert
              className={`mb-4 rounded flex items-center justify-center ${
                apiMessage.type === "success" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <AlertDescription
                className={` text-center rounded font-body text-[16px] font-semibold  ${
                  apiMessage.type === "success"
                    ? "text-green-800"
                    : "text-red-600"
                }`}
              >
                {apiMessage.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Google Sign Up */}
          {/* <button
            type="button"
            className="w-full h-10 flex items-center justify-center gap-2 border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-colors mb-4"
          >
            <Image src={Google} alt="Google icon" width={24} height={24} />
            <span className="font-medium">Sign up with Google</span>
          </button> */}
          <button
            type="button"
            onClick={() => googleRegister()}
            disabled={isGoogleLoading}
            className={`w-full h-10 flex items-center justify-center gap-2 border border-gray-200 rounded shadow-sm hover:bg-gray-50 transition-colors mb-4 ${
              isGoogleLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Image src={Google} alt="Google icon" width={24} height={24} />
            <span className="font-medium">
              {isGoogleLoading ? "Registering..." : "Sign up with Google"}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* First Name Input */}
              <div className="w-full h-auto flex items-center justify-center gap-2 ">
                <div className="w-1/2 h-auto">
                  <FloatingLabelInput
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange(e, "firstName")}
                    labelClassName="cursor-text"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name Input */}
                <div className="w-1/2 h-auto">
                  <FloatingLabelInput
                    label="Last Name"
                    value={formData.lastName}
                    labelClassName="cursor-text"
                    onChange={(e) => handleInputChange(e, "lastName")}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <FloatingLabelInput
                  label="Email Address"
                  inputType="email"
                  value={formData.email}
                  labelClassName="cursor-text"
                  onChange={(e) => handleInputChange(e, "email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="relative">
                  <FloatingLabelInput
                    inputType={showPassword ? "text" : "password"}
                    label="Password"
                    value={formData.password}
                    labelClassName="cursor-text"
                    onChange={(e) => handleInputChange(e, "password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <div className="relative">
                  <FloatingLabelInput
                    inputType={showConfirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    labelClassName="cursor-text"
                    onChange={(e) => handleInputChange(e, "confirmPassword")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
                <p className="mt-1.5 text-sm text-gray-500">
                  Password should be between 6-16 characters.
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
                {isSubmitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              </button>
            </div>
          </form>

          {/* Terms and Sign In */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              By clicking <b> Create Account </b> you agree to our{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-blue-600 hover:underline"
              >
                Privacy Policy
              </Link>
            </p>
            <p className="mt-4 font-semibold text-[16px]">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
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

export default RegisterComponent;
