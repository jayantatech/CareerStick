// import api from "@/lib/api";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// // import { jwtDecode } from "jwt-decode";

// import { decode, JwtPayload } from "jsonwebtoken";

// // Define paths that don't require authentication
// const PUBLIC_PATHS = [
//   "/",
//   "/login",
//   "/register",
//   "/forgot-password",
//   "/verify/*",
//   "/verify",
//   "/resend-verification",
//   "/verify-request",
//   "/robots.txt",
//   "/sitemap.xml",
//   "/privacy-policy",
//   "/terms",
//   "/cookies",
//   "/reset-password",
//   "/reset-password/*",
//   "/reset-password-request",
//   "/blog",
//   "/blog/*",
//   "/pricing",
// ];

// // Function to check if the user has valid tokens
// const hasValidTokens = (request: NextRequest): boolean => {
//   const accessToken = request.cookies.get("accessToken");
//   const refreshToken = request.cookies.get("refreshToken");
//   return !!(accessToken && refreshToken);
// };

// // Function to check if the user is an admin (server-side version)
// const isAdmin = (accessToken: string): boolean => {
//   try {
//     const decoded = decode(accessToken) as JwtPayload;
//     // console.log("decoded jwt by jay", decoded);
//     return decoded.subscribedPlan === "admin";
//   } catch {
//     return false;
//   }
// };

// export async function middleware(request: NextRequest) {
//   // Get the pathname of the request
//   const path = request.nextUrl.pathname;

//   // Handle authentication state for login and register pages
//   if (PUBLIC_PATHS.includes(path)) {
//     // If user has valid tokens, redirect them to /app
//     if (hasValidTokens(request)) {
//       return NextResponse.redirect(new URL("/app/resumes", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Handle verification URLs
//   if (path.startsWith("/verify/")) {
//     // If user has valid tokens, redirect them to /app
//     if (hasValidTokens(request)) {
//       // If the user has valid tokens, redirect them to /app/resumes page
//       return NextResponse.redirect(new URL("/app/resumes", request.url));
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

//     // Check if user is admin using server-side token decoding
//     if (!isAdmin(accessToken)) {
//       const unauthorizedUrl = new URL("/", request.url);
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
//       } catch {
//         // If refresh request fails, redirect to login
//         const loginUrl = new URL("/login", request.url);
//         return NextResponse.redirect(loginUrl);
//       }
//     }

//     // If access token exists, allow the request to proceed
//     return NextResponse.next();
//   }
//   if (path.startsWith("/")) {
//     const accessToken = request.cookies.get("accessToken");
//     const refreshToken = request.cookies.get("refreshToken");

//     // If no tokens exist, redirect to login

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
//       } catch {
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
// import { decode, JwtPayload } from "jsonwebtoken";

// // Define paths that don't require authentication
// const PUBLIC_PATHS = [
//   "/",
//   "/login",
//   "/register",
//   "/forgot-password",
//   "/verify/*",
//   "/verify",
//   "/resend-verification",
//   "/verify-request",
//   "/robots.txt",
//   "/sitemap.xml",
//   "/privacy-policy",
//   "/terms",
//   "/cookies",
//   "/reset-password",
//   "/reset-password/*",
//   "/reset-password-request",
//   "/blog",
//   "/blog/*",
//   "/pricing",
// ];

// // Function to check if the user has valid tokens
// const hasValidTokens = (request: NextRequest): boolean => {
//   const accessToken = request.cookies.get("accessToken");
//   const refreshToken = request.cookies.get("refreshToken");
//   return !!(accessToken && refreshToken);
// };

// // Function to check if the user is an admin
// const isAdmin = (accessToken: string): boolean => {
//   try {
//     const decoded = decode(accessToken) as JwtPayload;
//     return decoded.subscribedPlan === "admin";
//   } catch {
//     return false;
//   }
// };

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   // For public paths, handle redirect to /app if already authenticated
//   if (PUBLIC_PATHS.includes(path)) {
//     if (hasValidTokens(request)) {
//       return NextResponse.redirect(new URL("/app/resumes", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Handle verification URLs
//   if (path.startsWith("/verify/")) {
//     if (hasValidTokens(request)) {
//       return NextResponse.redirect(new URL("/app/resumes", request.url));
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

//     if (!isAdmin(accessToken)) {
//       const unauthorizedUrl = new URL("/", request.url);
//       return NextResponse.redirect(unauthorizedUrl);
//     }

//     return NextResponse.next();
//   }

//   // Check if path starts with /app
//   if (path.startsWith("/app")) {
//     const accessToken = request.cookies.get("accessToken");
//     const refreshToken = request.cookies.get("refreshToken");

//     if (!accessToken && !refreshToken) {
//       const loginUrl = new URL("/login", request.url);
//       return NextResponse.redirect(loginUrl);
//     }

//     if (!accessToken && refreshToken) {
//       try {
//         const response = await api.post("/auth/refresh-token", {
//           refreshToken: refreshToken.value,
//         });

//         if (response.data.success) {
//           const accessToken = response.data.accessToken;
//           const newResponse = NextResponse.next();

//           newResponse.cookies.set("accessToken", accessToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 4 * 60 * 60, // 4 hours
//           });

//           return newResponse;
//         } else {
//           const loginUrl = new URL("/login", request.url);
//           return NextResponse.redirect(loginUrl);
//         }
//       } catch {
//         const loginUrl = new URL("/login", request.url);
//         return NextResponse.redirect(loginUrl);
//       }
//     }

//     return NextResponse.next();
//   }

//   // For all other paths, allow the request to proceed without authentication
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
// import { decode, JwtPayload } from "jsonwebtoken";

// // Define paths that don't require authentication
// const PUBLIC_PATHS = [
//   "/",
//   "/login",
//   "/register",
//   "/forgot-password",
//   "/verify/*",
//   "/verify",
//   "/resend-verification",
//   "/verify-request",
//   "/robots.txt",
//   "/sitemap.xml",
//   "/privacy-policy",
//   "/terms",
//   "/cookies",
//   "/reset-password",
//   "/reset-password/*",
//   "/reset-password-request",
//   "/blog",
//   "/pricing",
// ];

// // Function to check if path matches a public path pattern
// const isPublicPath = (path: string): boolean => {
//   // Direct match
//   if (PUBLIC_PATHS.includes(path)) {
//     return true;
//   }

//   // Check for wildcard matches
//   if (
//     path.startsWith("/blog/") ||
//     path.startsWith("/verify/") ||
//     path.startsWith("/reset-password/")
//   ) {
//     return true;
//   }

//   return false;
// };

// // Function to check if the user has valid tokens
// const hasValidTokens = (request: NextRequest): boolean => {
//   const accessToken = request.cookies.get("accessToken");
//   const refreshToken = request.cookies.get("refreshToken");
//   return !!(accessToken && refreshToken);
// };

// // Function to check if the user is an admin
// const isAdmin = (accessToken: string): boolean => {
//   try {
//     const decoded = decode(accessToken) as JwtPayload;
//     return decoded.subscribedPlan === "admin";
//   } catch {
//     return false;
//   }
// };

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   // For public paths, handle redirect to /app if already authenticated
//   if (isPublicPath(path)) {
//     if (hasValidTokens(request)) {
//       return NextResponse.redirect(new URL("/app/resumes", request.url));
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

//     if (!isAdmin(accessToken)) {
//       const unauthorizedUrl = new URL("/", request.url);
//       return NextResponse.redirect(unauthorizedUrl);
//     }

//     return NextResponse.next();
//   }

//   // Check if path starts with /app
//   if (path.startsWith("/app")) {
//     const accessToken = request.cookies.get("accessToken");
//     const refreshToken = request.cookies.get("refreshToken");

//     if (!accessToken && !refreshToken) {
//       const loginUrl = new URL("/login", request.url);
//       return NextResponse.redirect(loginUrl);
//     }

//     if (!accessToken && refreshToken) {
//       try {
//         const response = await api.post("/auth/refresh-token", {
//           refreshToken: refreshToken.value,
//         });

//         if (response.data.success) {
//           const accessToken = response.data.accessToken;
//           const newResponse = NextResponse.next();

//           newResponse.cookies.set("accessToken", accessToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 4 * 60 * 60, // 4 hours
//           });

//           return newResponse;
//         } else {
//           const loginUrl = new URL("/login", request.url);
//           return NextResponse.redirect(loginUrl);
//         }
//       } catch {
//         const loginUrl = new URL("/login", request.url);
//         return NextResponse.redirect(loginUrl);
//       }
//     }

//     return NextResponse.next();
//   }

//   // For all other paths, allow the request to proceed without authentication
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
// import { decode, JwtPayload } from "jsonwebtoken";

// // Define authentication-related paths that should redirect when logged in
// const AUTH_PATHS = [
//   "/login",
//   "/register",
//   "/forgot-password",
//   "/verify",
//   "/verify/*",
//   "/resend-verification",
//   "/verify-request",
//   "/reset-password",
//   "/reset-password/*",
//   "/reset-password-request",
// ];

// // Function to check if path is auth-related
// const isAuthPath = (path: string): boolean => {
//   // Direct match
//   if (AUTH_PATHS.includes(path)) {
//     return true;
//   }

//   // Check for wildcard matches
//   if (path.startsWith("/verify/") || path.startsWith("/reset-password/")) {
//     return true;
//   }

//   return false;
// };

// // Function to check if the user has valid tokens
// const hasValidTokens = (request: NextRequest): boolean => {
//   const accessToken = request.cookies.get("accessToken");
//   const refreshToken = request.cookies.get("refreshToken");
//   return !!(accessToken && refreshToken);
// };

// // Function to check if the user is an admin
// const isAdmin = (accessToken: string): boolean => {
//   try {
//     const decoded = decode(accessToken) as JwtPayload;
//     return decoded.subscribedPlan === "admin";
//   } catch {
//     return false;
//   }
// };

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   // For auth-related paths, redirect to /app if already authenticated
//   if (isAuthPath(path)) {
//     if (hasValidTokens(request)) {
//       return NextResponse.redirect(new URL("/app/resumes", request.url));
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

//     if (!isAdmin(accessToken)) {
//       const unauthorizedUrl = new URL("/", request.url);
//       return NextResponse.redirect(unauthorizedUrl);
//     }

//     return NextResponse.next();
//   }

//   // Check if path starts with /app
//   if (path.startsWith("/app")) {
//     const accessToken = request.cookies.get("accessToken");
//     const refreshToken = request.cookies.get("refreshToken");

//     if (!accessToken && !refreshToken) {
//       const loginUrl = new URL("/login", request.url);
//       return NextResponse.redirect(loginUrl);
//     }

//     if (!accessToken && refreshToken) {
//       try {
//         const response = await api.post("/auth/refresh-token", {
//           refreshToken: refreshToken.value,
//         });

//         if (response.data.success) {
//           const accessToken = response.data.accessToken;
//           const newResponse = NextResponse.next();

//           newResponse.cookies.set("accessToken", accessToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 4 * 60 * 60, // 4 hours
//           });

//           return newResponse;
//         } else {
//           const loginUrl = new URL("/login", request.url);
//           return NextResponse.redirect(loginUrl);
//         }
//       } catch {
//         const loginUrl = new URL("/login", request.url);
//         return NextResponse.redirect(loginUrl);
//       }
//     }

//     return NextResponse.next();
//   }

//   // For all other paths (including home, blog, pricing, etc.),
//   // allow access regardless of authentication status
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
import { decode, JwtPayload } from "jsonwebtoken";

// Define authentication-related paths that should redirect when logged in
const AUTH_REDIRECT_PATHS = ["/login", "/register", "/verify", "/verify/*"];

// Function to check if path should redirect when authenticated
const isAuthRedirectPath = (path: string): boolean => {
  // Direct match
  if (AUTH_REDIRECT_PATHS.includes(path)) {
    return true;
  }

  // Check for wildcard matches
  if (path.startsWith("/verify/")) {
    return true;
  }

  return false;
};

// Function to check if the user has valid tokens
const hasValidTokens = (request: NextRequest): boolean => {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");
  return !!(accessToken && refreshToken);
};

// Function to handle token refresh
const handleTokenRefresh = async (
  request: NextRequest
): Promise<NextResponse | null> => {
  const refreshToken = request.cookies.get("refreshToken");

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await api.post("/auth/refresh-token", {
      refreshToken: refreshToken.value,
    });

    if (response.data.success) {
      const newResponse = NextResponse.next();

      newResponse.cookies.set("accessToken", response.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60, // 15 minutes
      });

      return newResponse;
    }
    return null;
  } catch {
    return null;
  }
};

// Function to check if the user is an admin
const isAdmin = (accessToken: string): boolean => {
  try {
    const decoded = decode(accessToken) as JwtPayload;
    return decoded.subscribedPlan === "admin";
  } catch {
    return false;
  }
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  // Global token refresh logic for all routes
  if (!accessToken && refreshToken) {
    const refreshResponse = await handleTokenRefresh(request);
    if (refreshResponse) {
      return refreshResponse;
    }
  }

  // If we have access token but no refresh token, clear access token and redirect to login
  if (accessToken && !refreshToken) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    return response;
  }

  // For login/register/verify paths, redirect to /app if already authenticated
  if (isAuthRedirectPath(path)) {
    if (hasValidTokens(request)) {
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

    if (!isAdmin(accessToken)) {
      const unauthorizedUrl = new URL("/", request.url);
      return NextResponse.redirect(unauthorizedUrl);
    }

    return NextResponse.next();
  }

  // Check if path starts with /app
  if (path.startsWith("/app")) {
    if (!accessToken && !refreshToken) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (!accessToken && refreshToken) {
      const refreshResponse = await handleTokenRefresh(request);
      if (refreshResponse) {
        return refreshResponse;
      }

      // If refresh failed, redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("refreshToken");
      return response;
    }

    return NextResponse.next();
  }

  // For all other paths (including home, blog, pricing, password reset pages, etc.),
  // allow access regardless of authentication status but still handle token refresh
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
