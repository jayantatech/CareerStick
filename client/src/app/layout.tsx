// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import { Providers } from "./providers";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         <link
//           href="https://fonts.googleapis.com/css?family=Lora:regular,500,600,700,italic,500italic,600italic,700italic&display=optional"
//           rel="stylesheet"
//         />
//         <link
//           href="https://fonts.googleapis.com/css?family=Merriweather:300,300italic,regular,italic,700,700italic,900,900italic&display=optional"
//           rel="stylesheet"
//         />
//         <link
//           href="https://fonts.googleapis.com/css?family=Lato:100,100italic,300,300italic,regular,italic,700,700italic,900,900italic&display=optional"
//           rel="stylesheet"
//         />
//         <link
//           href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic&display=optional"
//           rel="stylesheet"
//         />
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <Providers>{children}</Providers>
//         {/* {children} */}
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Lora, Merriweather, Lato, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";

// Local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Google fonts
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "optional",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "optional",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  display: "optional",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "optional",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${lora.variable} 
          ${merriweather.variable} 
          ${lato.variable} 
          ${montserrat.variable} 
          antialiased
        `}
      >
        <Providers>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            {children}
          </GoogleOAuthProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
