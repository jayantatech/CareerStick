// // ServerCookie.tsx
// import { cookies } from "next/headers";

// export default async function ServerCookie() {
//   const cookieStore = cookies();
//   const value = cookieStore.get("your_cookie_name");

//   return { value };
// }

import { cookies } from "next/headers";

async function getTokens() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  return { accessToken, refreshToken };
}

export default getTokens;
