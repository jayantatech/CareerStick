// "use server";
// export interface User {
//   _id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   emailVerified: boolean;
//   isSubscribed: boolean;
//   subscribedPlan: string;
// }

// export interface TokenInfoResponse {
//   success: boolean;
//   user: User;
//   message?: string;
// }

// import { cookies } from "next/headers";
// import api from "./api";
// import axios from "axios";

// export const getTokenInfo = async () => {
//   try {
//     const accessToken = cookies().get("accessToken")?.value;
//     console.log("accessToken by jay", accessToken);
//     if (!accessToken) return null;
//     const response = await api.post<TokenInfoResponse>("/auth/get-token-info", {
//       accessToken: accessToken, // Only sent if provided
//     });
//     if (response.data.success) {
//       return response.data.user;
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.response?.status === 401) {
//         throw new Error("Unauthorized");
//       }
//       throw new Error(
//         error.response?.data?.message || "Failed to get token info"
//       );
//     }
//     throw error;
//   }
// };

"use server";

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  isSubscribed: boolean;
  subscribedPlan: string;
}

export interface TokenInfoResponse {
  success: boolean;
  user: User;
  message?: string;
}

import { cookies } from "next/headers";
import api from "./api";
import axios from "axios";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTokenInfo = async (retryCount = 3, initialDelayMs = 1000) => {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retryCount; attempt++) {
    try {
      const accessToken = cookies().get("accessToken")?.value;
      console.log(
        `Attempt ${attempt + 1}: Getting token info with accessToken`,
        accessToken
      );

      if (!accessToken) {
        console.log("No access token found");
        return null;
      }

      const response = await api.post<TokenInfoResponse>(
        "/auth/get-token-info",
        {
          accessToken: accessToken,
        }
      );

      if (response.data.success) {
        console.log("Successfully retrieved token info");
        return response.data.user;
      }

      // If we get here, the request was successful but success was false
      console.log("Request successful but returned success: false");
      throw new Error(response.data.message || "Failed to get token info");
    } catch (error) {
      lastError = error as Error;

      if (axios.isAxiosError(error)) {
        // If it's a 401, we don't want to retry
        if (error.response?.status === 401) {
          console.log("Received 401 Unauthorized - not retrying");
          throw new Error("Unauthorized");
        }

        console.log(
          `Attempt ${attempt + 1} failed:`,
          error.response?.data?.message || error.message
        );
      } else {
        console.log(
          `Attempt ${attempt + 1} failed with non-Axios error:`,
          error
        );
      }

      // If this wasn't the last attempt, wait before retrying
      if (attempt < retryCount - 1) {
        // Exponential backoff: wait longer between each retry
        const delayTime = initialDelayMs * Math.pow(2, attempt);
        console.log(`Waiting ${delayTime}ms before retry...`);
        await delay(delayTime);
      }
    }
  }

  // If we've exhausted all retries, throw the last error
  console.log("All retry attempts exhausted");
  throw (
    lastError || new Error("Failed to get token info after all retry attempts")
  );
};
