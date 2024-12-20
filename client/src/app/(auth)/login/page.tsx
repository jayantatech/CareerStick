// "use client";
// import React, { ChangeEvent, FormEvent, useState } from "react";
// import Image from "next/image";
// import { Eye, EyeOff } from "lucide-react";
// import { Google } from "../../../../public/icons";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import Link from "next/link";
// import api from "@/lib/api";
// import { AxiosError } from "axios";
// import { useRouter } from "next/navigation";

// import { useGoogleLogin } from "@react-oauth/google";
// import { setTokens } from "@/lib/ServerCookie";

// interface FormData {
//   email: string;
//   password: string;
// }

// interface FormErrors {
//   email?: string;
//   password?: string;
// }

// interface ApiMessage {
//   type: "success" | "error" | "";
//   message: string;
// }

// const LoginPageComponent = () => {
//   const router = useRouter();

//   // Form state
//   const [formData, setFormData] = useState<FormData>({
//     email: "",
//     password: "",
//   });

//   // Error and UI states
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [apiMessage, setApiMessage] = useState<ApiMessage>({
//     type: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false);

//   // Google Sign In Handler
//   // const handleGoogleSignIn = async () => {
//   //   try {
//   //     setIsGoogleLoading(true);
//   //     // Redirect to backend Google auth route
//   //     window.location.href = `${BACKEND_URL}/auth/google`;
//   //   } catch (error) {
//   //     console.error("Google sign-in error:", error);
//   //     setApiMessage({
//   //       type: "error",
//   //       message: "Failed to initiate Google sign-in. Please try again.",
//   //     });
//   //   } finally {
//   //     setIsGoogleLoading(false);
//   //   }
//   // };
//   // const handleGoogleSignIn = async () => {
//   //   try {
//   //     setIsGoogleLoading(true);
//   //     // Open Google auth in a new window
//   //     const width = 500;
//   //     const height = 600;
//   //     const left = window.screenX + (window.outerWidth - width) / 2;
//   //     const top = window.screenY + (window.outerHeight - height) / 2;

//   //     const authWindow = window.open(
//   //       `${BACKEND_URL}/api/v1/auth/google`,
//   //       "Google Auth",
//   //       `width=${width},height=${height},left=${left},top=${top}`
//   //     );

//   //     // Listen for messages from the popup
//   //     window.addEventListener("message", async (event) => {
//   //       // Verify origin
//   //       if (event.origin !== BACKEND_URL) return;

//   //       if (event.data.type === "auth_success") {
//   //         authWindow?.close();
//   //         setApiMessage({
//   //           type: "success",
//   //           message: "Successfully logged in with Google!",
//   //         });
//   //         router.push("/dashboard");
//   //       } else if (event.data.type === "auth_error") {
//   //         authWindow?.close();
//   //         setApiMessage({
//   //           type: "error",
//   //           message: event.data.message || "Google sign-in failed",
//   //         });
//   //       }
//   //     });
//   //   } catch (error) {
//   //     console.error("Google sign-in error:", error);
//   //     setApiMessage({
//   //       type: "error",
//   //       message: "Failed to initiate Google sign-in. Please try again.",
//   //     });
//   //   } finally {
//   //     setIsGoogleLoading(false);
//   //   }
//   // };
//   const googleLogin = useGoogleLogin({
//     flow: "auth-code",
//     onSuccess: async (codeResponse) => {
//       try {
//         setIsGoogleLoading(true);
//         const response = await api.post("/auth/google", {
//           code: codeResponse.code,
//         });
//         // console.log("response.data for google login", response.data);
//         const data = response.data;
//         if (data.success) {
//           if (data.accessToken && data.refreshToken) {
//             await setTokens(data.accessToken, data.refreshToken);
//           }
//           setApiMessage({
//             type: "success",
//             message: "Successfully logged in with Google!",
//           });
//           router.push("/app/resumes");
//         }
//       } catch (error) {
//         console.error("Google login error:", error);
//         setApiMessage({
//           type: "error",
//           message: "Failed to login with Google. Please try again.",
//         });
//       } finally {
//         setIsGoogleLoading(false);
//       }
//     },
//     onError: () => {
//       setApiMessage({
//         type: "error",
//         message: "Google login failed. Please try again.",
//       });
//       setIsGoogleLoading(false);
//     },
//   });
//   // Check for authentication callback
//   React.useEffect(() => {
//     // Check if there's an authentication error or success message in URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const authError = urlParams.get("auth_error");
//     const authSuccess = urlParams.get("auth_success");

//     if (authError) {
//       setApiMessage({
//         type: "error",
//         message: decodeURIComponent(authError),
//       });
//     } else if (authSuccess) {
//       setApiMessage({
//         type: "success",
//         message: "Successfully logged in with Google!",
//       });
//       // Redirect to /app after successful login
//       router.push("/app/resumes");
//     }
//   }, [router]);

//   // Validation functions
//   const validateEmail = (email: string): boolean => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePassword = (password: string): boolean => {
//     return password.length >= 6 && password.length <= 28;
//   };

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement>,
//     name: string
//   ): void => {
//     const { value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setErrors((prev) => ({
//       ...prev,
//       [name]: undefined,
//     }));
//   };

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};
//     let isValid = true;

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//       isValid = false;
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = "Please enter a valid email";
//       isValid = false;
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//       isValid = false;
//     } else if (!validatePassword(formData.password)) {
//       newErrors.password = "Password must be between 6-28 characters";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     if (formData.email === "" || formData.password === "") return;

//     setIsSubmitting(true);
//     setApiMessage({ type: "", message: "" });

//     try {
//       // const response = await api.post("/auth/login", {
//       //   email: formData.email,
//       //   password: formData.password,
//       // });
//       const response = await api.post("/auth/login", {
//         email: formData.email,
//         password: formData.password,
//       });
//       // console.log("response.data for login", response.data);
//       const data = response.data;
//       if (data.success) {
//         if (data.accessToken && data.refreshToken) {
//           await setTokens(data.accessToken, data.refreshToken);
//         }
//         router.push("/app/resumes");
//         setApiMessage({
//           type: "success",
//           message: data.message || "Login successful",
//         });

//         setFormData({
//           email: "",
//           password: "",
//         });
//       } else {
//         setApiMessage({
//           type: "error",
//           message: data.message || "Login failed. Please try again.",
//         });
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       const axiosError = error as AxiosError<{ message: string }>;

//       if (axiosError.response?.status === 400) {
//         setApiMessage({
//           type: "error",
//           message:
//             axiosError.response.data.message || "Invalid email or password.",
//         });
//       } else {
//         setApiMessage({
//           type: "error",
//           message: "An error occurred. Please try again later.",
//         });
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}

//       {/* Main Content */}
//       <main className="flex items-center justify-center min-h-screen pt-[88px] px-4 flex-col">
//         <div className="w-full max-w-[430px] bg-white rounded-lg shadow-lg p-8">
//           <h1 className="text-2xl font-semibold text-center mb-6">
//             Welcome back! Please sign in.
//           </h1>

//           {/* API Message Alert */}
//           {apiMessage.message && (
//             <Alert
//               className={`mb-4 rounded flex items-center justify-center ${
//                 apiMessage.type === "success" ? "bg-green-50" : "bg-red-50"
//               }`}
//             >
//               <AlertDescription
//                 className={`text-center rounded font-body text-[16px] font-semibold ${
//                   apiMessage.type === "success"
//                     ? "text-green-800"
//                     : "text-red-600"
//                 }`}
//               >
//                 {apiMessage.message}
//               </AlertDescription>
//             </Alert>
//           )}

//           {/* Google Sign In Button */}
//           <button
//             onClick={googleLogin}
//             disabled={isGoogleLoading}
//             className={`w-full h-10 flex items-center justify-center gap-2 border
//               border-gray-200 rounded shadow-sm transition-colors mb-4
//               ${
//                 isGoogleLoading
//                   ? "bg-gray-100 cursor-not-allowed"
//                   : "hover:bg-gray-50"
//               }`}
//           >
//             <Image src={Google} alt="Google icon" width={24} height={24} />
//             <span className="font-medium">
//               {isGoogleLoading ? "Connecting..." : "Sign in with Google"}
//             </span>
//           </button>

//           {/* Rest of your existing JSX */}
//           {/* Divider */}
//           <div className="flex items-center gap-4 my-6">
//             <div className="flex-1 h-px bg-gray-300" />
//             <span className="text-gray-500">OR</span>
//             <div className="flex-1 h-px bg-gray-300" />
//           </div>

//           {/* Login Form */}
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               {/* Email Input */}
//               <div>
//                 <FloatingLabelInput
//                   label="Email Address"
//                   value={formData.email}
//                   labelClassName="cursor-text"
//                   onChange={(e) => handleInputChange(e, "email")}
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-500">{errors.email}</p>
//                 )}
//               </div>

//               {/* Password Input */}
//               <div className="relative">
//                 <div className="relative">
//                   <FloatingLabelInput
//                     inputType={showPassword ? "text" : "password"}
//                     label="Password"
//                     value={formData.password}
//                     labelClassName="cursor-text"
//                     onChange={(e) => handleInputChange(e, "password")}
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-5 h-5" />
//                     ) : (
//                       <Eye className="w-5 h-5" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-500">{errors.password}</p>
//                 )}
//                 <p className="mt-1.5 text-sm text-gray-500">
//                   Password should be between 6-28 characters.
//                 </p>
//               </div>

//               {/* Forgot Password Link */}
//               <div className="text-right">
//                 <Link
//                   href="/forgot-password"
//                   className="text-blue-600 hover:underline text-sm"
//                 >
//                   Forgot your password?
//                 </Link>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full h-10 bg-primary text-white font-medium rounded
//                   ${
//                     isSubmitting
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:scale-[.99] transition-all duration-150"
//                   }`}
//               >
//                 {isSubmitting ? "SIGNING IN..." : "SUBMIT"}
//               </button>
//             </div>
//           </form>

//           {/* Terms and Sign Up */}
//           <div className="mt-6 text-center text-sm">
//             <p className="text-gray-600">
//               By clicking <b>Submit</b> you also agree to our{" "}
//               <Link href="/terms" className="text-blue-600 hover:underline">
//                 Terms and Conditions
//               </Link>{" "}
//               and{" "}
//               <Link
//                 href="/privacy-policy"
//                 className="text-blue-600 hover:underline"
//               >
//                 Privacy Policy
//               </Link>
//             </p>
//             <p className="mt-4 font-semibold text-[16px]">
//               Need an account?{" "}
//               <Link href="/register" className="text-blue-600 hover:underline">
//                 Sign up for free
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="py-4 mt-5 text-center text-sm text-gray-600">
//           <p className="mt-2">© 2024, CareerStick.com. All rights reserved.</p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import LoginPageComponent from "./LoginPageComponent";
export const metadata = {
  title: "CareerStick Login - Access Your Free AI-Powered Resume Builder",
  description:
    "Login to CareerStick to start building your Free AI-powered resume. Access your saved resumes, upgrade to premium, and more.",
};

const Login = () => {
  return <LoginPageComponent />;
};

export default Login;
