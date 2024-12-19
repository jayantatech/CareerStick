// import api from "@/lib/api";
// import { MetadataRoute } from "next";

// export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
//   const fetchBlogData = async () => {
//     try {
//       const response = await api.get("/blog/all-blogs");
//       if (!response.data.success) return;
//       if (response.data.success) {
//         return response.data.data.map((blog: any) => ({
//           url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/blog/${blog.slug}`,
//           lastModified: new Date(blog.updatedAt),
//         }));
//       }
//     } catch (error) {
//       console.error("Error creating blog:", error);
//     }
//   };

//   fetchBlogData();
//   return [
//     {
//       url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/`,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/about`,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/blog`,
//     },
//     {
//       url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/pricing`,
//     },
//   ];
// }

import api from "@/lib/api";
import { MetadataRoute } from "next";

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
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/about`,
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
