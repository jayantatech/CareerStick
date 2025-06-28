// import api from "@/lib/api";
// import { MetadataRoute } from "next";

// type blogCardDataType = {
//   id: string;
//   title: string;
//   url: string;
//   readTime: number;
//   imageUrl: string;
//   author: { name: string; bio: string; avatar: string };
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
//   const staticRoutes = [
//     {
//       url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/privacy-policy`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/terms`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/cookies`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/blog`,
//       lastModified: new Date(),
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/pricing`,
//       lastModified: new Date(),
//     },
//   ];

//   try {
//     const response = await api.get("/blog/all-blogs");
//     if (response.data.success) {
//       const blogRoutes = response.data.data.map((blog: blogCardDataType) => ({
//         url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/blog/${blog.url}`,
//         lastModified: blog.updatedAt,
//       }));

//       return [...staticRoutes, ...blogRoutes];
//     }

//     return staticRoutes;
//   } catch (error) {
//     console.error("Error fetching blog data for sitemap:", error);
//     return staticRoutes;
//   }
// }

import api from "@/lib/api";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic"; // <-- ✅ IMPORTANT FIX

type blogCardDataType = {
  id: string;
  title: string;
  url: string;
  readTime: number;
  imageUrl: string;
  author: { name: string; bio: string; avatar: string };
  description: string;
  createdAt: string;
  updatedAt: string;
};

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/cookies`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/pricing`,
      lastModified: new Date(),
    },
  ];

  try {
    const response = await api.get("/blog/all-blogs");
    if (response.data.success) {
      const blogRoutes = response.data.data.map((blog: blogCardDataType) => ({
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/blog/${blog.url}`,
        lastModified: blog.updatedAt,
      }));

      return [...staticRoutes, ...blogRoutes];
    }

    return staticRoutes;
  } catch (error) {
    console.error("Error fetching blog data for sitemap:", error);
    return staticRoutes;
  }
}
