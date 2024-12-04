// import React, { useState, useCallback } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { NewsLetterImage } from "../../../../public/img";
// import api from "@/lib/api";
// import { AxiosError } from "axios";

// interface NewsletterCardProps {
//   className?: string;
// }

// const NewsletterCard: React.FC<NewsletterCardProps> = ({ className }) => {
//   const [message, setMessage] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [messageType, setMessageType] = useState<"success" | "error">(
//     "success"
//   );

//   const validateEmail = (email: string) => {
//     const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return re.test(String(email).toLowerCase());
//   };

//   const handleEmailChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const newEmail = e.target.value;

//       // Clear any previous error message when user starts typing
//       if (message) {
//         setMessage("");
//       }

//       setEmail(newEmail);
//     },
//     [message]
//   );

//   const handleSubmit = async () => {
//     // Reset previous messages
//     setMessage("");

//     // Validate email
//     if (!email) {
//       setMessage("Please enter an email address");
//       setMessageType("error");
//       return;
//     }

//     if (!validateEmail(email)) {
//       setMessage("Please enter a valid email address");
//       setMessageType("error");
//       return;
//     }

//     // Start loading
//     setIsLoading(true);

//     try {
//       const response = await api.post("/newsletter/subscribe", {
//         email: email,
//       });

//       // Check response
//       if (response.data.success) {
//         // console.log("response.data.message", response.data.message);
//         setMessage(response.data.message || "Successfully subscribed!");
//         setMessageType("success");
//         // Optional: Clear email input after successful subscription
//         setEmail("");
//       } else {
//         setMessage(response.data.message || "Subscription failed");
//         setMessageType("error");
//       }
//     } catch (error: AxiosError | any) {
//       // Handle different types of errors
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         setMessage(
//           error.response.data.message || "An error occurred while subscribing"
//         );
//       } else if (error.request) {
//         // The request was made but no response was received
//         setMessage("No response from server. Please try again.");
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         setMessage("Error processing your subscription");
//       }
//       setMessageType("error");
//     } finally {
//       // Stop loading
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card
//       className={`overflow-hidden rounded bg-[#EFF6FF] shadow p-4 mt-4 border ${className}`}
//     >
//       <div className="relative w-full h-48 bg-[#EFF6FF]">
//         <Image
//           src={NewsLetterImage}
//           alt="Newsletter illustration"
//           fill
//           className="object-contain p-4 scale-[1.7]"
//           priority
//         />
//       </div>

//       <div className=" space-y-4">
//         <div className="space-y-2">
//           <h3 className="text-lg font-semibold text-gray-900 text-center font-heading">
//             Subscribe to our newsletter
//           </h3>
//           <p className="text-sm text-gray-600 text-center font-blogText">
//             Get weekly resume tips and job search advice delivered straight to
//             your inbox
//           </p>
//         </div>

//         <div className="space-y-3">
//           <div className="relative">
//             <Input
//               type="email"
//               value={email}
//               onChange={handleEmailChange}
//               placeholder="Enter your email address"
//               className="w-full bg-white/80 backdrop-blur-sm rounded font-blogText border-blue-100 focus:border-blue-200 focus:ring-blue-200 placeholder:text-gray-400"
//             />
//           </div>
//           <Button
//             type="submit"
//             disabled={isLoading}
//             onClick={handleSubmit}
//             className="w-full bg-primary font-heading rounded font-semibold hover:bg-blue-700 text-white"
//           >
//             {isLoading ? "Subscribing..." : "Subscribe Now"}
//           </Button>

//           {/* Error/Success Message */}
//           {message && (
//             <div
//               className={`text-center text-sm mt-2 ${
//                 messageType === "success" ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {message}
//             </div>
//           )}
//         </div>

//         <div className="text-xs text-gray-500 text-center space-y-2 font-blogText">
//           <p>
//             {`By clicking "Subscribe Now" you agree to receive marketing
//             communications.`}
//           </p>
//           <p className="space-x-1 ">
//             <Link href="/terms" className="text-blue-600 hover:underline">
//               Terms & Conditions
//             </Link>
//             <span>and</span>
//             <Link href="/privacy" className="text-blue-600 hover:underline">
//               Privacy Policy
//             </Link>
//           </p>
//           <p>You can unsubscribe at any time.</p>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default NewsletterCard;
import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { NewsLetterImage } from "../../../../public/img";
import api from "@/lib/api";
import type { AxiosError } from "axios";

interface NewsletterCardProps {
  className?: string;
}

const NewsletterCard: React.FC<NewsletterCardProps> = ({ className }) => {
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEmail = e.target.value;

      // Clear any previous error message when user starts typing
      if (message) {
        setMessage("");
      }

      setEmail(newEmail);
    },
    [message]
  );

  const handleSubmit = async () => {
    // Reset previous messages
    setMessage("");

    // Validate email
    if (!email) {
      setMessage("Please enter an email address");
      setMessageType("error");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    // Start loading
    setIsLoading(true);

    try {
      const response = await api.post("/newsletter/subscribe", {
        email: email,
      });

      // Check response
      if (response.data.success) {
        setMessage(response.data.message || "Successfully subscribed!");
        setMessageType("success");
        // Optional: Clear email input after successful subscription
        setEmail("");
      } else {
        setMessage(response.data.message || "Subscription failed");
        setMessageType("error");
      }
    } catch (error: unknown) {
      // Handle different types of errors
      if (error instanceof Error) {
        // Check if it's an Axios error with a response
        if ("response" in error) {
          const axiosError = error as AxiosError;
          setMessage(
            (axiosError.response?.data as { message?: string })?.message ||
              "An error occurred while subscribing"
          );
        } else if ("request" in error) {
          // The request was made but no response was received
          setMessage("No response from server. Please try again.");
        } else {
          // Something happened in setting up the request that triggered an Error
          setMessage("Error processing your subscription");
        }
      } else {
        setMessage("An unexpected error occurred");
      }
      setMessageType("error");
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  return (
    <Card
      className={`overflow-hidden rounded bg-[#EFF6FF] shadow p-4 mt-4 border ${className}`}
    >
      <div className="relative w-full h-48 bg-[#EFF6FF]">
        <Image
          src={NewsLetterImage}
          alt="Newsletter illustration"
          fill
          className="object-contain p-4 scale-[1.7]"
          priority
        />
      </div>

      <div className=" space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 text-center font-heading">
            Subscribe to our newsletter
          </h3>
          <p className="text-sm text-gray-600 text-center font-blogText">
            Get weekly resume tips and job search advice delivered straight to
            your inbox
          </p>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              className="w-full bg-white/80 backdrop-blur-sm rounded font-blogText border-blue-100 focus:border-blue-200 focus:ring-blue-200 placeholder:text-gray-400"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full bg-primary font-heading rounded font-semibold hover:bg-blue-700 text-white"
          >
            {isLoading ? "Subscribing..." : "Subscribe Now"}
          </Button>

          {/* Error/Success Message */}
          {message && (
            <div
              className={`text-center text-sm mt-2 ${
                messageType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 text-center space-y-2 font-blogText">
          <p>
            {`By clicking "Subscribe Now" you agree to receive marketing
            communications.`}
          </p>
          <p className="space-x-1 ">
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms & Conditions
            </Link>
            <span>and</span>
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
          <p>You can unsubscribe at any time.</p>
        </div>
      </div>
    </Card>
  );
};

export default NewsletterCard;
