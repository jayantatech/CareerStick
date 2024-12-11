// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Badge } from "@/components/ui/badge";
// import { Clock, Edit, Eye, Search, Trash2, X } from "lucide-react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import api from "@/lib/api";
// import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import useAuth from "@/lib/hooks/useAuth";

// type BlogPost = {
//   id: string;
//   title: string;
//   status: "published" | "draft" | "archived";
//   imageUrl: string;
//   url: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type AdminBlogPageProps = {
//   initialPosts: BlogPost[];
//   initialCount: number;
// };

// export default function AllBlogPosts({
//   initialPosts,
//   initialCount,
// }: AdminBlogPageProps) {
//   const router = useRouter();
//   const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialPosts);
//   const [count, setCount] = useState(initialCount);
//   const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   useEffect(() => {
//     const getAllPosts = async () => {
//       try {
//         const response = await api.get("/blog/all-blogs");
//         if (response.data.success) {
//           console.log("response.data for getAllPosts", response.data);
//           setBlogPosts(response.data.data);
//           setCount(response.data.data.length);
//           toast.success("Successfully fetched blog posts");
//         }
//       } catch (error) {
//         toast.error("Failed to fetch blog posts");
//       }
//     };

//     getAllPosts();
//   }, []);

//   const { user, isLoading } = useAuth();

//   const handleDeletePost = async (postId: string) => {
//     try {
//       if (isLoading) return;
//       if (!user?._id) return;
//       // console.log(object);
//       const response = await api.post(`/blog/delete/${postId}`, {
//         userId: user?._id,
//       });
//       console.log("response.data for handleDeletePost", response.data);
//       if (response.data.success) {
//         // Remove the deleted post from the list
//         const updatedPosts = blogPosts.filter((post) => post.id !== postId);
//         setBlogPosts(updatedPosts);
//         setCount(updatedPosts.length);
//         toast.success("Blog post deleted successfully");
//         setPostToDelete(null);
//       } else {
//         toast.error("Failed to delete blog post");
//       }
//     } catch (error) {
//       toast.error("An error occurred while deleting the blog post");
//     }
//   };

//   const viewPostHandler = (post: BlogPost) => {
//     if (post.status === "published") {
//       router.push(`/blog/${post.url}`);
//     } else if (post.status === "draft") {
//       router.push(`/blog/preview/${post.url}`);
//     }
//   };
//   useEffect(() => {
//     handleSearch();
//   }, [statusFilter]);

//   const handleSearch = async () => {
//     try {
//       const params = new URLSearchParams();

//       if (searchQuery) {
//         params.append("query", searchQuery);
//       }

//       if (statusFilter !== "all") {
//         params.append("status", statusFilter);
//       }

//       const response = await api.get(`/blog/search?${params.toString()}`);

//       if (response.data.success) {
//         setBlogPosts(response.data.data);
//         setCount(response.data.count);
//         toast.success(`Found ${response.data.count} blog posts`);
//       }
//     } catch (error) {
//       toast.error("Failed to search blog posts");
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     setStatusFilter("all");
//     // fetchInitialPosts();
//   };
//   return (
//     <div className="container mx-auto px-4 py-12">
//       <motion.h1
//         className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Admin Blog Page
//       </motion.h1>
//       {/*The search bar is hidden  */}
//       <div className="mb-8 flex-col  hidden max-md:flex-row gap-4 justify-between items-center">
//         <div className="flex w-full md:w-1/2 relative ">
//           <Input
//             placeholder="Search by title or URL"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pr-12"
//           />
//           {searchQuery && (
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-2 top-1/2 -translate-y-1/2"
//               onClick={clearSearch}
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           )}
//           <Button
//             variant="outline"
//             size="icon"
//             className="ml-2"
//             onClick={handleSearch}
//           >
//             <Search className="h-4 w-4" />
//           </Button>
//         </div>

//         <Tabs
//           value={statusFilter}
//           onValueChange={setStatusFilter}
//           className="w-full md:w-auto"
//         >
//           <TabsList>
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="published">Published</TabsTrigger>
//             <TabsTrigger value="draft">Draft</TabsTrigger>
//             <TabsTrigger value="archived">Archived</TabsTrigger>
//           </TabsList>
//         </Tabs>
//       </div>

//       <motion.p
//         className="text-2xl mb-12 text-center text-gray-600"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         Total Blog Posts:{" "}
//         <span className="font-semibold text-primary">{count}</span>
//       </motion.p>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {blogPosts?.map((post, index) => (
//           <motion.div
//             key={post.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <Card className="overflow-hidden rounded-lg border shadow-lg transition-all duration-300 hover:shadow-xl">
//               <CardContent className="p-0">
//                 <div className="relative h-[300px]">
//                   <Badge
//                     className={`absolute top-4 left-4 z-10 rounded shadow-sm ${
//                       post.status === "published"
//                         ? "bg-green-500"
//                         : "bg-red-500"
//                     } text-white border-0 px-3 py-1 text-sm font-medium rounded transition-transform duration-300`}
//                   >
//                     {post.status}
//                   </Badge>
//                   <Image
//                     src={post.imageUrl || "https://placehold.co/600x400/png"}
//                     alt={post.title}
//                     fill
//                     className="object-cover transition-transform duration-300"
//                   />
//                 </div>
//                 <div className="p-6 border-t">
//                   <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground mb-3">
//                     <div className="flex items-center justify-center gap-2">
//                       <Clock className="h-4 w-4" />
//                       <span className="font-medium">Created:</span>
//                       {new Date(post.createdAt).toLocaleDateString()}
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                       <Clock className="h-4 w-4" />
//                       <span className="font-medium">Updated:</span>
//                       {new Date(post.updatedAt).toLocaleDateString()}
//                     </div>
//                   </div>
//                   <h2 className="text-2xl font-semibold font-heading group-hover:text-primary transition-colors mb-3 line-clamp-2">
//                     {post.title}
//                   </h2>
//                   <div
//                     className="prose max-w-full mb-4 leading-relaxed text-base text-muted-foreground font-blogText line-clamp-3"
//                     dangerouslySetInnerHTML={{
//                       __html: post.description.split("</p>")[0] || "",
//                     }}
//                   />
//                   <div className="flex gap-3 mt-4">
//                     <AlertDialog>
//                       <AlertDialogTrigger asChild>
//                         <Button
//                           variant="outline"
//                           className="w-full text-destructive hover:bg-destructive hover:text-white transition-colors duration-300"
//                           onClick={() => setPostToDelete(post)}
//                         >
//                           <Trash2 className="w-4 h-4 mr-2" />
//                           Delete
//                         </Button>
//                       </AlertDialogTrigger>
//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle>
//                             Are you absolutely sure?
//                           </AlertDialogTitle>
//                           <AlertDialogDescription className="text-base">
//                             This action cannot be undone. This will permanently
//                             delete the blog post "{post.title}".
//                           </AlertDialogDescription>
//                         </AlertDialogHeader>
//                         <AlertDialogFooter>
//                           <AlertDialogCancel>Cancel</AlertDialogCancel>
//                           <AlertDialogAction
//                             onClick={() => handleDeletePost(post.id)}
//                             className="text-white bg-red-500 hover:bg-red-700"
//                           >
//                             Continue
//                           </AlertDialogAction>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>

//                     <Button
//                       variant="outline"
//                       className="w-full text-primary hover:bg-primary hover:text-white transition-colors duration-300"
//                       onClick={() => viewPostHandler(post)}
//                     >
//                       <Eye className="w-4 h-4 mr-2" />
//                       {post.status === "published" ? "View" : "Preview"}
//                     </Button>

//                     <Button
//                       variant="default"
//                       className="w-full text-white"
//                       onClick={() =>
//                         router.push(`/admin/blog-editor/${post.id}`)
//                       }
//                     >
//                       <Edit className="w-4 h-4 mr-2" />
//                       Edit
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState, useCallback } from "react";
// import Image from "next/image";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Badge } from "@/components/ui/badge";
// import { Clock, Edit, Eye, Search, Trash2, X } from "lucide-react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import api from "@/lib/api";
// import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import useAuth from "@/lib/hooks/useAuth";
// import { AxiosError } from "axios";

// type BlogPost = {
//   id: string;
//   title: string;
//   status: "published" | "draft" | "archived";
//   imageUrl: string;
//   url: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// };

// type AdminBlogPageProps = {
//   initialPosts: BlogPost[];
//   initialCount: number;
// };

// export default function AllBlogPosts({
//   initialPosts,
//   initialCount,
// }: AdminBlogPageProps) {
//   const router = useRouter();
//   const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialPosts);
//   const [count, setCount] = useState(initialCount);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");

//   const { user, isLoading } = useAuth();

//   const fetchAllPosts = useCallback(async () => {
//     try {
//       const response = await api.get("/blog/all-blogs");
//       if (response.data.success) {
//         setBlogPosts(response.data.data);
//         setCount(response.data.data.length);
//         toast.success("Successfully fetched blog posts");
//       }
//     } catch (fetchError) {
//       toast.error("Failed to fetch blog posts");
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllPosts();
//   }, [fetchAllPosts]);

//   const handleDeletePost = async (postId: string) => {
//     try {
//       if (isLoading) return;
//       if (!user?._id) return;

//       const response = await api.post(`/blog/delete/${postId}`, {
//         userId: user?._id,
//       });

//       if (response.data.success) {
//         const updatedPosts = blogPosts.filter((post) => post.id !== postId);
//         setBlogPosts(updatedPosts);
//         setCount(updatedPosts.length);
//         toast.success("Blog post deleted successfully");
//         // setPostToDelete(null);
//       } else {
//         toast.error("Failed to delete blog post");
//       }
//     } catch (deleteError) {
//       toast.error("An error occurred while deleting the blog post");
//     }
//   };

//   const viewPostHandler = (post: BlogPost) => {
//     if (post.status === "published") {
//       router.push(`/blog/${post.url}`);
//     } else if (post.status === "draft") {
//       router.push(`/blog/preview/${post.url}`);
//     }
//   };

//   const handleSearch = useCallback(async () => {
//     try {
//       const params = new URLSearchParams();

//       if (searchQuery) {
//         params.append("query", searchQuery);
//       }

//       if (statusFilter !== "all") {
//         params.append("status", statusFilter);
//       }

//       const response = await api.get(`/blog/search?${params.toString()}`);

//       if (response.data.success) {
//         setBlogPosts(response.data.data);
//         setCount(response.data.count);
//         toast.success(`Found ${response.data.count} blog posts`);
//       }
//     } catch (searchError) {
//       toast.error("Failed to search blog posts");
//     }
//   }, [searchQuery, statusFilter]);

//   useEffect(() => {
//     handleSearch();
//   }, [handleSearch]);

//   const clearSearch = () => {
//     setSearchQuery("");
//     setStatusFilter("all");
//   };

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <motion.h1
//         className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Admin Blog Page
//       </motion.h1>

//       <div className="mb-8 flex-col hidden max-md:flex-row gap-4 justify-between items-center">
//         <div className="flex w-full md:w-1/2 relative ">
//           <Input
//             placeholder="Search by title or URL"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pr-12"
//           />
//           {searchQuery && (
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-2 top-1/2 -translate-y-1/2"
//               onClick={clearSearch}
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           )}
//           <Button
//             variant="outline"
//             size="icon"
//             className="ml-2"
//             onClick={handleSearch}
//           >
//             <Search className="h-4 w-4" />
//           </Button>
//         </div>

//         <Tabs
//           value={statusFilter}
//           onValueChange={setStatusFilter}
//           className="w-full md:w-auto"
//         >
//           <TabsList>
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="published">Published</TabsTrigger>
//             <TabsTrigger value="draft">Draft</TabsTrigger>
//             <TabsTrigger value="archived">Archived</TabsTrigger>
//           </TabsList>
//         </Tabs>
//       </div>

//       <motion.p
//         className="text-2xl mb-12 text-center text-gray-600"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         Total Blog Posts:{" "}
//         <span className="font-semibold text-primary">{count}</span>
//       </motion.p>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {blogPosts?.map((post, index) => (
//           <motion.div
//             key={post.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <Card className="overflow-hidden rounded-lg border shadow-lg transition-all duration-300 hover:shadow-xl">
//               <CardContent className="p-0">
//                 <div className="relative h-[300px]">
//                   <Badge
//                     className={`absolute top-4 left-4 z-10 rounded shadow-sm ${
//                       post.status === "published"
//                         ? "bg-green-500"
//                         : "bg-red-500"
//                     } text-white border-0 px-3 py-1 text-sm font-medium rounded transition-transform duration-300`}
//                   >
//                     {post.status}
//                   </Badge>
//                   <Image
//                     src={post.imageUrl || "https://placehold.co/600x400/png"}
//                     alt={post.title}
//                     fill
//                     className="object-cover transition-transform duration-300"
//                   />
//                 </div>
//                 <div className="p-6 border-t">
//                   <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground mb-3">
//                     <div className="flex items-center justify-center gap-2">
//                       <Clock className="h-4 w-4" />
//                       <span className="font-medium">Created:</span>
//                       {new Date(post.createdAt).toLocaleDateString()}
//                     </div>
//                     <div className="flex items-center justify-center gap-2">
//                       <Clock className="h-4 w-4" />
//                       <span className="font-medium">Updated:</span>
//                       {new Date(post.updatedAt).toLocaleDateString()}
//                     </div>
//                   </div>
//                   <h2 className="text-2xl font-semibold font-heading group-hover:text-primary transition-colors mb-3 line-clamp-2">
//                     {post.title}
//                   </h2>
//                   <div
//                     className="prose max-w-full mb-4 leading-relaxed text-base text-muted-foreground font-blogText line-clamp-3"
//                     dangerouslySetInnerHTML={{
//                       __html: post.description.split("</p>")[0] || "",
//                     }}
//                   />
//                   <div className="flex gap-3 mt-4">
//                     <AlertDialog>
//                       <AlertDialogTrigger asChild>
//                         <Button
//                           variant="outline"
//                           className="w-full text-destructive hover:bg-destructive hover:text-white transition-colors duration-300"
//                         >
//                           <Trash2 className="w-4 h-4 mr-2" />
//                           Delete
//                         </Button>
//                       </AlertDialogTrigger>
//                       <AlertDialogContent>
//                         <AlertDialogHeader>
//                           <AlertDialogTitle>
//                             Are you absolutely sure?
//                           </AlertDialogTitle>
//                           <AlertDialogDescription className="text-base">
//                             This action cannot be undone. This will permanently
//                             delete the blog post &quot;{post.title}&quot;.
//                           </AlertDialogDescription>
//                         </AlertDialogHeader>
//                         <AlertDialogFooter>
//                           <AlertDialogCancel>Cancel</AlertDialogCancel>
//                           <AlertDialogAction
//                             onClick={() => handleDeletePost(post.id)}
//                             className="text-white bg-red-500 hover:bg-red-700"
//                           >
//                             Continue
//                           </AlertDialogAction>
//                         </AlertDialogFooter>
//                       </AlertDialogContent>
//                     </AlertDialog>

//                     <Button
//                       variant="outline"
//                       className="w-full text-primary hover:bg-primary hover:text-white transition-colors duration-300"
//                       onClick={() => viewPostHandler(post)}
//                     >
//                       <Eye className="w-4 h-4 mr-2" />
//                       {post.status === "published" ? "View" : "Preview"}
//                     </Button>

//                     <Button
//                       variant="default"
//                       className="w-full text-white"
//                       onClick={() =>
//                         router.push(`/admin/blog-editor/${post.id}`)
//                       }
//                     >
//                       <Edit className="w-4 h-4 mr-2" />
//                       Edit
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Edit, Eye, Search, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/lib/hooks/useAuth";

export type BlogPost = {
  id: string;
  title: string;
  status: "published" | "draft" | "archived";
  imageUrl: string;
  url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

// type AdminBlogPageProps = {
//   initialPosts: BlogPost[];
//   initialCount: number;
// };

export default function AllBlogPosts() {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "",
      title: "",
      status: "draft",
      imageUrl: "",
      url: "",
      description: "",
      createdAt: "",
      updatedAt: "",
    },
  ]);
  const [count, setCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { user, isLoading } = useAuth();

  const fetchAllPosts = useCallback(async () => {
    if (!user?._id) return;
    if (isLoading) return;
    try {
      console.log("trying to send  request", user?._id);
      const response = await api.post("/blog/all-admin-blogs", {
        userId: user?._id,
      });
      if (response.data.success) {
        setBlogPosts(response.data.data);
        setCount(response.data.data.length);
        toast.success("Successfully fetched blog posts");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch blog posts" + error);
    }
  }, [user?._id, isLoading]);

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  const handleDeletePost = async (postId: string) => {
    try {
      if (isLoading) return;
      if (!user?._id) return;

      const response = await api.post(`/blog/delete/${postId}`, {
        userId: user?._id,
      });

      if (response.data.success) {
        const updatedPosts = blogPosts.filter((post) => post.id !== postId);
        setBlogPosts(updatedPosts);
        setCount(updatedPosts.length);
        toast.success("Blog post deleted successfully");
      } else {
        toast.error("Failed to delete blog post");
      }
    } catch {
      toast.error("An error occurred while deleting the blog post");
    }
  };

  // const viewPostHandler = (post: BlogPost) => {
  //   if (post.status === "published") {
  //     router.push(`/blog/${post.url}`);
  //   } else if (post.status === "draft") {
  //     router.push(`/blog/preview/${post.url}`);
  //   }
  // };
  const viewPostHandler = (post: BlogPost) => {
    if (post.status === "published") {
      window.open(`/blog/${post.url}`, "_blank");
    } else if (post.status === "draft") {
      window.open(`/blog/preview/${post.url}`, "_blank");
    }
  };

  const handleSearch = useCallback(async () => {
    try {
      const params = new URLSearchParams();

      if (searchQuery) {
        params.append("query", searchQuery);
      }

      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }

      const response = await api.get(`/blog/search?${params.toString()}`);

      if (response.data.success) {
        setBlogPosts(response.data.data);
        setCount(response.data.count);
        toast.success(`Found ${response.data.count} blog posts`);
      }
    } catch {
      toast.error("Failed to search blog posts");
    }
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const clearSearch = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Blog Page
      </motion.h1>

      <div className="mb-8 flex-col hidden max-md:flex-row gap-4 justify-between items-center">
        <div className="flex w-full md:w-1/2 relative ">
          <Input
            placeholder="Search by title or URL"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-12"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="ml-2"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Tabs
          value={statusFilter}
          onValueChange={setStatusFilter}
          className="w-full md:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <motion.p
        className="text-2xl mb-12 text-center text-gray-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Total Blog Posts:{" "}
        <span className="font-semibold text-primary">{count}</span>
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts?.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden rounded-lg border shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-0">
                <div className="relative h-[300px]">
                  <Badge
                    className={`absolute top-4 left-4 z-10 rounded shadow-sm ${
                      post.status === "published"
                        ? "bg-green-500"
                        : "bg-red-500"
                    } text-white border-0 px-3 py-1 text-sm font-medium rounded transition-transform duration-300`}
                  >
                    {post.status}
                  </Badge>
                  <Image
                    src={post.imageUrl || "https://placehold.co/600x400/png"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300"
                  />
                </div>
                <div className="p-6 border-t">
                  <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Created:</span>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Updated:</span>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold font-heading group-hover:text-primary transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <div
                    className="prose max-w-full mb-4 leading-relaxed text-base text-muted-foreground font-blogText line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: post.description.split("</p>")[0] || "",
                    }}
                  />
                  <div className="flex gap-3 mt-4">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full text-destructive hover:bg-destructive hover:text-white transition-colors duration-300"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-base">
                            This action cannot be undone. This will permanently
                            delete the blog post &quot;{post.title}&quot;.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeletePost(post.id)}
                            className="text-white bg-red-500 hover:bg-red-700"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Button
                      variant="outline"
                      className="w-full text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                      onClick={() => viewPostHandler(post)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {post.status === "published" ? "View" : "Preview"}
                    </Button>

                    <Button
                      variant="default"
                      className="w-full text-white"
                      onClick={() =>
                        router.push(`/admin/blog-editor/${post.id}`)
                      }
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
