// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json();
//     const { email, password } = data;
//     console.log("email and password", email, password);

//     if (!email || !password) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Missing email or password",
//         },
//         { status: 400 }
//       );
//     }

//     const response = await fetch(
//       `${
//         process.env.NODE_ENV === "production"
//           ? process.env.NEXT_PUBLIC_SERVER_URL
//           : "http://localhost:4000"
//       }/api/v1/auth/login`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       }
//     );

//     const apiData = await response.json(); // Parse the response body to JSON
//     console.log("apiData", apiData);
//     if (!apiData.success) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: apiData.message,
//         },
//         { status: 400 }
//       );
//     }

//     const { accessToken, refreshToken } = apiData;

//     cookies().set("accessToken", accessToken, {
//       httpOnly: false,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       expires: new Date(Date.now() + 30 * 60 * 1000),
//     });

//     cookies().set("refreshToken", refreshToken, {
//       httpOnly: false,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     });

//     return NextResponse.json({
//       success: true,
//       message: apiData.message,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: "login failed",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { accessToken, refreshToken } = data;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        {
          success: false,
          message: "The access token or refresh token is missing",
        },
        { status: 400 }
      );
    }

    // const response = await fetch(
    //   `${
    //     process.env.NODE_ENV === "production"
    //       ? process.env.NEXT_PUBLIC_SERVER_URL
    //       : "http://localhost:4000"
    //   }/api/v1/auth/login`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   }
    // );

    // const apiData = await response.json(); // Parse the response body to JSON
    // console.log("apiData", apiData);
    // if (!apiData.success) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: apiData.message,
    //     },
    //     { status: 400 }
    //   );
    // }

    // const { accessToken, refreshToken } = apiData;

    cookies().set("accessToken", accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 30 * 60 * 1000),
    });

    cookies().set("refreshToken", refreshToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return NextResponse.json({
      success: true,
      message: "Cookies set successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "login failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
