// // ServerCookie.tsx
// import { cookies } from "next/headers";

// export default async function ServerCookie() {
//   const cookieStore = cookies();
//   const value = cookieStore.get("your_cookie_name");

//   return { value };
// }

"use server";
import { cookies } from "next/headers";

async function getTokens() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  return { accessToken, refreshToken };
}

async function setTokens(accessTokenValue: string, refreshTokenValue: string) {
  const cookieStore = cookies();
  cookieStore.set("accessToken", accessTokenValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 30, // 30 minutes
  });

  cookieStore.set("refreshToken", refreshTokenValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return null;
}

async function deleteTokens() {
  const cookieStore = cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  return null;
}

export { getTokens, setTokens, deleteTokens };
