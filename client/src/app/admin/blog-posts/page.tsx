// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import ContentWrapper from "@/components/ContentWrapper";
// import { StockResume } from "../../../../public/img";

// type BlogPost = {
//   id: number;
//   title: string;
//   status: "published" | "draft";
//   imageUrl: string;
//   url: string;
// };

// type AdminBlogPageProps = {
//   initialPosts: BlogPost[];
//   initialCount: number;
// };

// export default function AllBlogPosts({
//   initialPosts,
//   initialCount,
// }: AdminBlogPageProps) {
//   const [posts] = useState(initialPosts);
//   const [count] = useState(initialCount);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-4 text-center">Admin Blog Page</h1>
//       <p className="text-xl mb-6 text-center">Total Blog Posts: {count}</p>
//       <ContentWrapper>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[
//             {
//               id: 1,
//               title: "First Blog Post",
//               status: "published",
//               imageUrl: "/placeholder.svg?height=200&width=300",
//               url: "/blog/first-post",
//             },
//             {
//               id: 2,
//               title: "Second Blog Post",
//               status: "draft",
//               imageUrl: "/placeholder.svg?height=200&width=300",
//               url: "/blog/second-post",
//             },
//             {
//               id: 3,
//               title: "Third Blog Post",
//               status: "published",
//               imageUrl: "/placeholder.svg?height=200&width=300",
//               url: "/blog/third-post",
//             },
//             // Add more mock data as needed
//           ].map((post) => (
//             <Card key={post.id} className="overflow-hidden rounded">
//               <CardHeader className="p-0">
//                 <Image
//                   src={StockResume}
//                   alt={post.title}
//                   width={300}
//                   height={200}
//                   className="w-full h-48 object-cover"
//                 />
//               </CardHeader>
//               <CardContent className="p-4">
//                 <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
//                 <Badge
//                   variant={
//                     post.status === "published" ? "default" : "destructive"
//                   }
//                   className="mb-2 text-white"
//                 >
//                   {post.status}
//                 </Badge>
//               </CardContent>
//               <CardFooter className="p-4 pt-0">
//                 <Link href={post.url} className="text-blue-500 hover:underline">
//                   View Post
//                 </Link>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </ContentWrapper>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, LinkIcon } from "lucide-react";
import ContentWrapper from "@/components/ContentWrapper";
import { StockResume } from "../../../../public/img";

type BlogPost = {
  id: number;
  title: string;
  status: "published" | "draft";
  imageUrl: string;
  url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type AdminBlogPageProps = {
  initialPosts: BlogPost[];
  initialCount: number;
};

export default function AllBlogPosts({
  initialPosts,
  initialCount,
}: AdminBlogPageProps) {
  const [posts] = useState(initialPosts);
  const [count] = useState(initialCount);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Admin Blog Page</h1>
      <p className="text-xl mb-8 text-center text-gray-600">
        Total Blog Posts: {count}
      </p>
      {/* <ContentWrapper> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            id: 1,
            title: "First Blog Post",
            status: "published",
            imageUrl: "/placeholder.svg?height=200&width=300",
            url: "/blog/first-post",
            description: "This is a short description of the first blog post.",
            createdAt: "2023-05-01T12:00:00Z",
            updatedAt: "2023-05-02T14:30:00Z",
          },
          {
            id: 2,
            title: "Second Blog Post",
            status: "draft",
            imageUrl: "/placeholder.svg?height=200&width=300",
            url: "/blog/second-post",
            description: "A brief overview of the second blog post content.",
            createdAt: "2023-05-03T09:15:00Z",
            updatedAt: "2023-05-03T09:15:00Z",
          },
          {
            id: 3,
            title: "Third Blog Post",
            status: "published",
            imageUrl: "/placeholder.svg?height=200&width=300",
            url: "/blog/third-post",
            description: "Describing the main points of the third blog post.",
            createdAt: "2023-05-05T16:45:00Z",
            updatedAt: "2023-05-06T11:20:00Z",
          },
        ].map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="p-0">
              <Image
                src={StockResume}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-bold mb-2 line-clamp-2">
                {post.title}
              </CardTitle>
              <Badge className=" top-2 right-2 text-xs font-semibold rounded text-white font-heading ">
                {post.status}
              </Badge>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.description}
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span>
                  Created: {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <ClockIcon className="w-4 h-4 mr-2" />
                <span>
                  Updated: {new Date(post.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-sm text-blue-500">
                <LinkIcon className="w-4 h-4 mr-2" />
                <span className="truncate">{post.url}</span>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-end">
              <Link
                href={post.url}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
              >
                View Post
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* </ContentWrapper> */}
    </div>
  );
}
