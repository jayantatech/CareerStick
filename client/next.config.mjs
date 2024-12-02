// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "ai-resume.s3.us-east-1.amazonaws.com",
//         port: "",
//         pathname: "/profile/**",
//       },
//       // Add other domains if needed
//     ],
//   },
//   experimental: {
//     appDir: true,
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ai-resume.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/{profile,blog}/**", // Correct path pattern
      },
      {
        protocol: "https",
        hostname: "cdn.enhancv.com",
        port: "",
        pathname: "/**", // Correct path pattern
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**", // Correct path pattern
      },
      // Add other domains if needed
    ],
  },
  // Remove the experimental object since `appDir` is no longer needed.
};

export default nextConfig;
