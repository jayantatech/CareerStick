// // import React, { useState } from "react";
// // import axios from "axios";
// // import { PlusCircle, Save, Settings, User, Send } from "lucide-react";

import BlogEditor from "@/components/blogComponents/BlogEditor";

// // const BlogDashboard = () => {
// //   const [activeTab, setActiveTab] = useState("create");
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     excerpt: "",
// //     author: {
// //       name: "",
// //       email: "",
// //       avatar: "",
// //       bio: "",
// //       socialLinks: {
// //         twitter: "",
// //         linkedin: "",
// //         youtube: "",
// //       },
// //     },
// //     meta: {
// //       description: "",
// //       keywords: [],
// //       canonicalUrl: "",
// //       ogImage: "",
// //     },
// //     categories: ["Uncategorized"],
// //     tags: [],
// //     settings: {
// //       allowComments: true,
// //       featured: false,
// //       pinned: false,
// //       enableNewsletter: true,
// //       showTableOfContents: true,
// //     },
// //   });

// //   const [slug, setSlug] = useState("");
// //   const [message, setMessage] = useState("");

// //   const handleInputChange = (e: any, section = null) => {
// //     const { name, value, type, checked } = e.target;

// //     if (section) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         [section]: {
// //           ...prev[section],
// //           [name]: type === "checkbox" ? checked : value,
// //         },
// //       }));
// //     } else {
// //       setFormData((prev) => ({
// //         ...prev,
// //         [name]: type === "checkbox" ? checked : value,
// //       }));
// //     }
// //   };

// //   const handleAuthorSocialChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       author: {
// //         ...prev.author,
// //         socialLinks: {
// //           ...prev.author.socialLinks,
// //           [name]: value,
// //         },
// //       },
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setMessage("");

// //     try {
// //       const response = await axios.post("/api/v1/blog/create", formData);
// //       setMessage("Blog created successfully!");
// //       setSlug(response.data.data.slug);
// //     } catch (error) {
// //       setMessage(error.response?.data?.message || "Error creating blog");
// //     }
// //   };

// //   const updateStatus = async (status) => {
// //     if (!slug) {
// //       setMessage("Please create a blog first");
// //       return;
// //     }

// //     try {
// //       await axios.patch(`/api/v1/blog/${slug}/status`, { status });
// //       setMessage(`Blog status updated to ${status}`);
// //     } catch (error) {
// //       setMessage(error.response?.data?.message || "Error updating status");
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6">
// //       <div className="mb-6 flex gap-4">
// //         <button
// //           onClick={() => setActiveTab("create")}
// //           className={`px-4 py-2 rounded ${
// //             activeTab === "create" ? "bg-blue-500 text-white" : "bg-gray-200"
// //           }`}
// //         >
// //           <PlusCircle className="inline-block mr-2 h-4 w-4" />
// //           Create Blog
// //         </button>
// //         <button
// //           onClick={() => setActiveTab("settings")}
// //           className={`px-4 py-2 rounded ${
// //             activeTab === "settings" ? "bg-blue-500 text-white" : "bg-gray-200"
// //           }`}
// //         >
// //           <Settings className="inline-block mr-2 h-4 w-4" />
// //           Settings
// //         </button>
// //         <button
// //           onClick={() => setActiveTab("author")}
// //           className={`px-4 py-2 rounded ${
// //             activeTab === "author" ? "bg-blue-500 text-white" : "bg-gray-200"
// //           }`}
// //         >
// //           <User className="inline-block mr-2 h-4 w-4" />
// //           Author
// //         </button>
// //       </div>

// //       {message && (
// //         <div className="mb-4 p-4 rounded bg-blue-100 text-blue-700">
// //           {message}
// //         </div>
// //       )}

// //       <form onSubmit={handleSubmit} className="space-y-6">
// //         {activeTab === "create" && (
// //           <div className="space-y-4">
// //             <div>
// //               <label className="block mb-2 font-medium">Title</label>
// //               <input
// //                 type="text"
// //                 name="title"
// //                 value={formData.title}
// //                 onChange={handleInputChange}
// //                 className="w-full p-2 border rounded"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-2 font-medium">Excerpt</label>
// //               <textarea
// //                 name="excerpt"
// //                 value={formData.excerpt}
// //                 onChange={handleInputChange}
// //                 className="w-full p-2 border rounded h-24"
// //                 required
// //               />
// //             </div>
// //           </div>
// //         )}

// //         {activeTab === "settings" && (
// //           <div className="space-y-4">
// //             <div>
// //               <label className="block mb-2 font-medium">Settings</label>
// //               <div className="space-y-2">
// //                 <label className="flex items-center">
// //                   <input
// //                     type="checkbox"
// //                     name="allowComments"
// //                     checked={formData.settings.allowComments}
// //                     onChange={(e) => handleInputChange(e, "settings")}
// //                     className="mr-2"
// //                   />
// //                   Allow Comments
// //                 </label>
// //                 <label className="flex items-center">
// //                   <input
// //                     type="checkbox"
// //                     name="featured"
// //                     checked={formData.settings.featured}
// //                     onChange={(e) => handleInputChange(e, "settings")}
// //                     className="mr-2"
// //                   />
// //                   Featured
// //                 </label>
// //                 <label className="flex items-center">
// //                   <input
// //                     type="checkbox"
// //                     name="showTableOfContents"
// //                     checked={formData.settings.showTableOfContents}
// //                     onChange={(e) => handleInputChange(e, "settings")}
// //                     className="mr-2"
// //                   />
// //                   Show Table of Contents
// //                 </label>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {activeTab === "author" && (
// //           <div className="space-y-4">
// //             <div>
// //               <label className="block mb-2 font-medium">Author Name</label>
// //               <input
// //                 type="text"
// //                 name="name"
// //                 value={formData.author.name}
// //                 onChange={(e) => handleInputChange(e, "author")}
// //                 className="w-full p-2 border rounded"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-2 font-medium">Email</label>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 value={formData.author.email}
// //                 onChange={(e) => handleInputChange(e, "author")}
// //                 className="w-full p-2 border rounded"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label className="block mb-2 font-medium">Social Links</label>
// //               <div className="space-y-2">
// //                 <input
// //                   type="url"
// //                   name="twitter"
// //                   placeholder="Twitter URL"
// //                   value={formData.author.socialLinks.twitter}
// //                   onChange={handleAuthorSocialChange}
// //                   className="w-full p-2 border rounded"
// //                 />
// //                 <input
// //                   type="url"
// //                   name="linkedin"
// //                   placeholder="LinkedIn URL"
// //                   value={formData.author.socialLinks.linkedin}
// //                   onChange={handleAuthorSocialChange}
// //                   className="w-full p-2 border rounded"
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         <div className="flex gap-4">
// //           <button
// //             type="submit"
// //             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// //           >
// //             <Save className="inline-block mr-2 h-4 w-4" />
// //             Save Blog
// //           </button>
// //           {slug && (
// //             <button
// //               type="button"
// //               onClick={() => updateStatus("published")}
// //               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
// //             >
// //               <Send className="inline-block mr-2 h-4 w-4" />
// //               Publish
// //             </button>
// //           )}
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default BlogDashboard;

// // types.ts
// "use strict";
// interface SocialLinks {
//   twitter: string;
//   linkedin: string;
//   youtube: string;
// }

// interface Author {
//   name: string;
//   email: string;
//   avatar: string;
//   bio: string;
//   socialLinks: SocialLinks;
// }

// interface Meta {
//   description: string;
//   keywords: string[];
//   canonicalUrl: string;
//   ogImage: string;
// }

// interface BlogSettings {
//   allowComments: boolean;
//   featured: boolean;
//   pinned: boolean;
//   enableNewsletter: boolean;
//   showTableOfContents: boolean;
// }

// interface FormData {
//   title: string;
//   excerpt: string;
//   author: Author;
//   meta: Meta;
//   categories: string[];
//   tags: string[];
//   settings: BlogSettings;
// }

// interface ApiResponse {
//   success: boolean;
//   data: {
//     slug: string;
//     [key: string]: any;
//   };
//   message: string;
// }

// // BlogDashboard.tsx
// import React, { useState, ChangeEvent, FormEvent } from "react";
// import axios, { AxiosError } from "axios";
// import { PlusCircle, Save, Settings, User, Send } from "lucide-react";

// type TabType = "create" | "settings" | "author";

// const BlogDashboard = () => {
//   const [activeTab, setActiveTab] = useState<TabType>("create");
//   const [formData, setFormData] = useState<FormData>({
//     title: "",
//     excerpt: "",
//     author: {
//       name: "",
//       email: "",
//       avatar: "",
//       bio: "",
//       socialLinks: {
//         twitter: "",
//         linkedin: "",
//         youtube: "",
//       },
//     },
//     meta: {
//       description: "",
//       keywords: [],
//       canonicalUrl: "",
//       ogImage: "",
//     },
//     categories: ["Uncategorized"],
//     tags: [],
//     settings: {
//       allowComments: true,
//       featured: false,
//       pinned: false,
//       enableNewsletter: true,
//       showTableOfContents: true,
//     },
//   });

//   const [slug, setSlug] = useState<string>("");
//   const [message, setMessage] = useState<string>("");

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     section?: keyof FormData
//   ): void => {
//     const { name, value, type } = e.target;
//     const isCheckbox = type === "checkbox";
//     const inputValue = isCheckbox
//       ? (e.target as HTMLInputElement).checked
//       : value;

//     // if (section) {
//     //   setFormData((prev) => ({
//     //     ...prev,
//     //     [section]: {
//     //       ...prev[section],
//     //       [name]: inputValue,
//     //     },
//     //   }));
//     // } else {
//     //   setFormData((prev) => ({
//     //     ...prev,
//     //     [name]: inputValue,
//     //   }));
//     // }
//     if (section) {
//       setFormData((prev) => {
//         const sectionValue = prev[section];
//         if (typeof sectionValue === "object" && sectionValue !== null) {
//           return {
//             ...prev,
//             [section]: {
//               ...sectionValue,
//               [name]: inputValue,
//             },
//           };
//         } else {
//           // handle the case where sectionValue is not an object
//           return prev;
//         }
//       });
//     }
//   };

//   const handleAuthorSocialChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       author: {
//         ...prev.author,
//         socialLinks: {
//           ...prev.author.socialLinks,
//           [name]: value,
//         },
//       },
//     }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const response = await axios.post<ApiResponse>(
//         "/api/v1/blog/create",
//         formData
//       );
//       setMessage("Blog created successfully!");
//       setSlug(response.data.data.slug);
//     } catch (error) {
//       const axiosError = error as AxiosError<{ message: string }>;
//       setMessage(axiosError.response?.data?.message || "Error creating blog");
//     }
//   };

//   const updateStatus = async (
//     status: "draft" | "published" | "archived"
//   ): Promise<void> => {
//     if (!slug) {
//       setMessage("Please create a blog first");
//       return;
//     }

//     try {
//       await axios.patch<ApiResponse>(`/api/v1/blog/${slug}/status`, { status });
//       setMessage(`Blog status updated to ${status}`);
//     } catch (error) {
//       const axiosError = error as AxiosError<{ message: string }>;
//       setMessage(axiosError.response?.data?.message || "Error updating status");
//     }
//   };

//   const TabButton: React.FC<{
//     tab: TabType;
//     icon: React.ReactNode;
//     label: string;
//   }> = ({ tab, icon, label }) => (
//     <button
//       onClick={() => setActiveTab(tab)}
//       className={`px-4 py-2 rounded flex items-center ${
//         activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
//       }`}
//       type="button"
//     >
//       {icon}
//       <span className="ml-2">{label}</span>
//     </button>
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="mb-6 flex gap-4">
//         <TabButton
//           tab="create"
//           icon={<PlusCircle className="h-4 w-4" />}
//           label="Create Blog"
//         />
//         <TabButton
//           tab="settings"
//           icon={<Settings className="h-4 w-4" />}
//           label="Settings"
//         />
//         <TabButton
//           tab="author"
//           icon={<User className="h-4 w-4" />}
//           label="Author"
//         />
//       </div>

//       {message && (
//         <div className="mb-4 p-4 rounded bg-blue-100 text-blue-700">
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {activeTab === "create" && (
//           <div className="space-y-4">
//             <div>
//               <label className="block mb-2 font-medium">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2 font-medium">Excerpt</label>
//               <textarea
//                 name="excerpt"
//                 value={formData.excerpt}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded h-24"
//                 required
//               />
//             </div>
//           </div>
//         )}

//         {activeTab === "settings" && (
//           <div className="space-y-4">
//             <div>
//               <label className="block mb-2 font-medium">Settings</label>
//               <div className="space-y-2">
//                 {Object.entries(formData.settings).map(([key, value]) => (
//                   <label key={key} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       name={key}
//                       checked={value}
//                       onChange={(e) => handleInputChange(e, "settings")}
//                       className="mr-2"
//                     />
//                     {key
//                       .replace(/([A-Z])/g, " $1")
//                       .replace(/^./, (str) => str.toUpperCase())}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "author" && (
//           <div className="space-y-4">
//             <div>
//               <label className="block mb-2 font-medium">Author Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.author.name}
//                 onChange={(e) => handleInputChange(e, "author")}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2 font-medium">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.author.email}
//                 onChange={(e) => handleInputChange(e, "author")}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2 font-medium">Social Links</label>
//               <div className="space-y-2">
//                 {Object.keys(formData.author.socialLinks).map((platform) => (
//                   <input
//                     key={platform}
//                     type="url"
//                     name={platform}
//                     placeholder={`${
//                       platform.charAt(0).toUpperCase() + platform.slice(1)
//                     } URL`}
//                     value={
//                       formData.author.socialLinks[platform as keyof SocialLinks]
//                     }
//                     onChange={handleAuthorSocialChange}
//                     className="w-full p-2 border rounded"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="flex gap-4">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
//           >
//             <Save className="h-4 w-4 mr-2" />
//             Save Blog
//           </button>
//           {slug && (
//             <button
//               type="button"
//               onClick={() => updateStatus("published")}
//               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
//             >
//               <Send className="h-4 w-4 mr-2" />
//               Publish
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BlogDashboard;
import React from "react";

const BlogPage = () => {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <BlogEditor />
    </main>
  );
};

export default BlogPage;
