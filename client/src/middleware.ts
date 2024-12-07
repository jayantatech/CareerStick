// import api from "@/lib/api";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Define paths that don't require authentication
// const PUBLIC_PATHS = ["/login", "/register", "/forgot-password"];

// // Function to check if the user has valid tokens
// const hasValidTokens = (request: NextRequest): boolean => {
//   const accessToken = request.cookies.get("accessToken");
//   const refreshToken = request.cookies.get("refreshToken");
//   return !!(accessToken && refreshToken);
// };

// export async function middleware(request: NextRequest) {
//   // Get the pathname of the request
//   const path = request.nextUrl.pathname;

//   // Handle authentication state for login and register pages
//   if (PUBLIC_PATHS.includes(path)) {
//     // If user has valid tokens, redirect them to /app
//     if (hasValidTokens(request)) {
//       return NextResponse.redirect(new URL("/app", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Handle verification URLs
//   if (path.startsWith("/verify/")) {
//     // If user has valid tokens, redirect them to /app
//     if (hasValidTokens(request)) {
//       return NextResponse.redirect(new URL("/app", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Check if path starts with /app
//   if (path.startsWith("/app") || path.startsWith("/")) {
//     const accessToken = request.cookies.get("accessToken");
//     const refreshToken = request.cookies.get("refreshToken");
//     // console.log(`accessToken: ${accessToken}, refreshToken: ${refreshToken}`);

//     // If no tokens exist, redirect to login
//     if (!accessToken && !refreshToken) {
//       const loginUrl = new URL("/login", request.url);
//       return NextResponse.redirect(loginUrl);
//     }

//     // If refresh token exists but no access token, try to refresh
//     if (!accessToken && refreshToken) {
//       const refreshToken = request.cookies.get("refreshToken");
//       // console.log("refreshToken middleware", refreshToken);

//       if (!refreshToken?.value) {
//         return NextResponse.redirect(new URL("/login", request.url));
//       }

//       try {
//         const response = await api.post("/auth/refresh-token", {
//           refreshToken: refreshToken.value,
//         });
//         // console.log("response.data", response.data);

//         // If refresh successful, clone the response and add the new access token
//         if (response.data.success) {
//           const accessToken = response.data.accessToken;

//           // Create response
//           const newResponse = NextResponse.next();

//           // Add the new access token cookie
//           newResponse.cookies.set("accessToken", accessToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 4 * 60 * 60, // 4 hours
//           });

//           return newResponse;
//         } else {
//           // If refresh failed, redirect to login
//           const loginUrl = new URL("/login", request.url);
//           return NextResponse.redirect(loginUrl);
//         }
//       } catch (error) {
//         // If refresh request fails, redirect to login

//         const loginUrl = new URL("/login", request.url);
//         return NextResponse.redirect(loginUrl);
//       }
//     }

//     // If access token exists, allow the request to proceed
//     return NextResponse.next();
//   }

//   // For all other paths, allow the request to proceed
//   return NextResponse.next();
// }

// // Configure the middleware to run on specific paths
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public files (public directory)
//      */
//     "/((?!_next/static|_next/image|favicon.ico|public).*)",
//   ],
// };

// import api from "@/lib/api";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// // import { jwtDecode } from "jwt-decode";
// import useAuth from "./lib/hooks/useAuth";
// const { user, isLoading } = useAuth();

// // Define paths that don't require authentication
// const PUBLIC_PATHS = ["/login", "/register", "/forgot-password"];

// // Function to check if the user has valid tokens
// const hasValidTokens = (request: NextRequest): boolean => {
//   const accessToken = request.cookies.get("accessToken");
//   const refreshToken = request.cookies.get("refreshToken");
//   return !!(accessToken && refreshToken);
// };

// // Function to check if the user is an admin
// const isAdmin = (): boolean => {
//   if (isLoading) return false;
//   if (!user) return false;
//   const isAdminAccess = user?.subscribedPlan === "admin";
//   return isAdminAccess;
// };

// export async function middleware(request: NextRequest) {
//   // Get the pathname of the request
//   const path = request.nextUrl.pathname;

//   // Handle authentication state for login and register pages
//   if (PUBLIC_PATHS.includes(path)) {
//     // If user has valid tokens, redirect them to /app
//     if (hasValidTokens(request)) {
//       return NextResponse.redirect(new URL("/app", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Handle verification URLs
//   if (path.startsWith("/verify/")) {
//     // If user has valid tokens, redirect them to /app
//     if (hasValidTokens(request)) {
//       return NextResponse.redirect(new URL("/app", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Check for admin routes
//   if (path.startsWith("/admin")) {
//     const accessToken = request.cookies.get("accessToken")?.value;

//     if (!accessToken) {
//       const loginUrl = new URL("/login", request.url);
//       return NextResponse.redirect(loginUrl);
//     }

//     // Check if user is admin
//     if (!isAdmin()) {
//       const unauthorizedUrl = new URL("/unauthorized", request.url);
//       return NextResponse.redirect(unauthorizedUrl);
//     }

//     return NextResponse.next();
//   }

//   // Check if path starts with /app and requires token
//   if (path.startsWith("/app")) {
//     const accessToken = request.cookies.get("accessToken");
//     const refreshToken = request.cookies.get("refreshToken");

//     // If no tokens exist, redirect to login
//     if (!accessToken && !refreshToken) {
//       const loginUrl = new URL("/login", request.url);
//       return NextResponse.redirect(loginUrl);
//     }

//     // If refresh token exists but no access token, try to refresh
//     if (!accessToken && refreshToken) {
//       try {
//         const response = await api.post("/auth/refresh-token", {
//           refreshToken: refreshToken.value,
//         });

//         // If refresh successful, clone the response and add the new access token
//         if (response.data.success) {
//           const accessToken = response.data.accessToken;

//           // Create response
//           const newResponse = NextResponse.next();

//           // Add the new access token cookie
//           newResponse.cookies.set("accessToken", accessToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 4 * 60 * 60, // 4 hours
//           });

//           return newResponse;
//         } else {
//           // If refresh failed, redirect to login
//           const loginUrl = new URL("/login", request.url);
//           return NextResponse.redirect(loginUrl);
//         }
//       } catch (error) {
//         // If refresh request fails, redirect to login
//         const loginUrl = new URL("/login", request.url);
//         return NextResponse.redirect(loginUrl);
//       }
//     }

//     // If access token exists, allow the request to proceed
//     return NextResponse.next();
//   }

//   // For all other paths, allow the request to proceed
//   return NextResponse.next();
// }

// // Configure the middleware to run on specific paths
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public files (public directory)
//      */
//     "/((?!_next/static|_next/image|favicon.ico|public).*)",
//   ],
// };

import api from "@/lib/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { jwtDecode } from "jwt-decode";

import { decode, JwtPayload } from "jsonwebtoken";

// Define paths that don't require authentication
const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify/*",
  "/verify",
  "/resend-verification",
  "/verify-request",
];

// Function to check if the user has valid tokens
const hasValidTokens = (request: NextRequest): boolean => {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");
  return !!(accessToken && refreshToken);
};

// Function to check if the user is an admin (server-side version)
const isAdmin = (accessToken: string): boolean => {
  try {
    const decoded = decode(accessToken) as JwtPayload;
    console.log("decoded jwt by jay", decoded);
    return decoded.subscribedPlan === "admin";
  } catch {
    return false;
  }
};

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Handle authentication state for login and register pages
  if (PUBLIC_PATHS.includes(path)) {
    // If user has valid tokens, redirect them to /app
    if (hasValidTokens(request)) {
      return NextResponse.redirect(new URL("/app/resumes", request.url));
    }
    return NextResponse.next();
  }

  // Handle verification URLs
  if (path.startsWith("/verify/")) {
    // If user has valid tokens, redirect them to /app
    if (hasValidTokens(request)) {
      // If the user has valid tokens, redirect them to /app/resumes page
      return NextResponse.redirect(new URL("/app/resumes", request.url));
    }
    return NextResponse.next();
  }

  // Check for admin routes
  if (path.startsWith("/admin")) {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user is admin using server-side token decoding
    if (!isAdmin(accessToken)) {
      const unauthorizedUrl = new URL("/", request.url);
      return NextResponse.redirect(unauthorizedUrl);
    }

    return NextResponse.next();
  }

  // Check if path starts with /app and requires token
  if (path.startsWith("/app")) {
    const accessToken = request.cookies.get("accessToken");
    const refreshToken = request.cookies.get("refreshToken");

    // If no tokens exist, redirect to login
    if (!accessToken && !refreshToken) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // If refresh token exists but no access token, try to refresh
    if (!accessToken && refreshToken) {
      try {
        const response = await api.post("/auth/refresh-token", {
          refreshToken: refreshToken.value,
        });

        // If refresh successful, clone the response and add the new access token
        if (response.data.success) {
          const accessToken = response.data.accessToken;

          // Create response
          const newResponse = NextResponse.next();

          // Add the new access token cookie
          newResponse.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 4 * 60 * 60, // 4 hours
          });

          return newResponse;
        } else {
          // If refresh failed, redirect to login
          const loginUrl = new URL("/login", request.url);
          return NextResponse.redirect(loginUrl);
        }
      } catch {
        // If refresh request fails, redirect to login
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
    }

    // If access token exists, allow the request to proceed
    return NextResponse.next();
  }
  if (path.startsWith("/")) {
    const accessToken = request.cookies.get("accessToken");
    const refreshToken = request.cookies.get("refreshToken");

    // If no tokens exist, redirect to login

    // If refresh token exists but no access token, try to refresh
    if (!accessToken && refreshToken) {
      try {
        const response = await api.post("/auth/refresh-token", {
          refreshToken: refreshToken.value,
        });

        // If refresh successful, clone the response and add the new access token
        if (response.data.success) {
          const accessToken = response.data.accessToken;

          // Create response
          const newResponse = NextResponse.next();

          // Add the new access token cookie
          newResponse.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 4 * 60 * 60, // 4 hours
          });

          return newResponse;
        } else {
          // If refresh failed, redirect to login
          const loginUrl = new URL("/login", request.url);
          return NextResponse.redirect(loginUrl);
        }
      } catch {
        // If refresh request fails, redirect to login
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
    }

    // If access token exists, allow the request to proceed
    return NextResponse.next();
  }

  // For all other paths, allow the request to proceed
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
