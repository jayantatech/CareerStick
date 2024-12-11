// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// // import { Separator } from "@/components/ui/separator";
// import { CheckCircle, Star } from "lucide-react";

// // Mock user data
// const defaultUserInfo = {
//   firstName: "John",
//   lastName: "Doe",
//   email: "john.doe@example.com",
//   address: "123 Main St",
//   state: "California",
//   country: "United States",
//   phoneNumber: "+1 (555) 123-4567",
//   subscriptionPlan: "Basic",
//   aiResumeCredits: 5,
// };

// export default function ImprovedProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userInfo, setUserInfo] = useState(defaultUserInfo);

//   const handleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUserInfo((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     // Here you would typically send the updated user info to your backend
//     console.log("Saving user info:", userInfo);
//     setIsEditing(false);
//   };

//   return (
//     <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
//       <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
//         <Card className="flex-grow max-w-3xl">
//           <CardHeader className="space-y-1">
//             <div className="flex items-center space-x-4">
//               <Avatar className="w-20 h-20">
//                 <AvatarImage
//                   src="/placeholder.svg?height=80&width=80"
//                   alt="Profile picture"
//                 />
//                 <AvatarFallback>JD</AvatarFallback>
//               </Avatar>
//               <div>
//                 <CardTitle className="text-2xl font-bold">
//                   Profile Settings
//                 </CardTitle>
//                 <CardDescription>
//                   Manage your account settings and preferences.
//                 </CardDescription>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="firstName">First Name</Label>
//                 <Input
//                   id="firstName"
//                   name="firstName"
//                   value={userInfo.firstName}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="bg-white"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="lastName">Last Name</Label>
//                 <Input
//                   id="lastName"
//                   name="lastName"
//                   value={userInfo.lastName}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="bg-white"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={userInfo.email}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="bg-white"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="phoneNumber">Phone Number</Label>
//                 <Input
//                   id="phoneNumber"
//                   name="phoneNumber"
//                   value={userInfo.phoneNumber}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="bg-white"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="address">Address</Label>
//                 <Input
//                   id="address"
//                   name="address"
//                   value={userInfo.address}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="bg-white"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="state">State</Label>
//                 <Input
//                   id="state"
//                   name="state"
//                   value={userInfo.state}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="bg-white"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="country">Country</Label>
//                 <Input
//                   id="country"
//                   name="country"
//                   value={userInfo.country}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="bg-white"
//                 />
//               </div>
//             </div>
//             {/* <Separator /> */}
//             <div className="space-y-2">
//               <h3 className="text-lg font-semibold">
//                 Subscription Information
//               </h3>
//               <p>
//                 Current Plan:{" "}
//                 <Badge variant="secondary">{userInfo.subscriptionPlan}</Badge>
//               </p>
//               <p>AI Resume Credits: {userInfo.aiResumeCredits}</p>
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-end">
//             {isEditing ? (
//               <Button onClick={handleSave} className="w-full sm:w-auto">
//                 Save Changes
//               </Button>
//             ) : (
//               <Button onClick={handleEdit} className="w-full sm:w-auto">
//                 Edit Profile
//               </Button>
//             )}
//           </CardFooter>
//         </Card>

//         <Card className="w-full md:w-72 h-fit">
//           <CardHeader>
//             <CardTitle className="text-xl font-bold">Upgrade to Pro</CardTitle>
//             <CardDescription>
//               Unlock premium features and boost your resume power!
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <ul className="space-y-2">
//               <li className="flex items-center">
//                 <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                 <span>Unlimited AI resume generations</span>
//               </li>
//               <li className="flex items-center">
//                 <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                 <span>Advanced resume templates</span>
//               </li>
//               <li className="flex items-center">
//                 <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                 <span>Priority customer support</span>
//               </li>
//               <li className="flex items-center">
//                 <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
//                 <span>Exclusive job market insights</span>
//               </li>
//             </ul>
//           </CardContent>
//           <CardFooter>
//             <Button className="w-full">
//               <Star className="mr-2 h-4 w-4" /> Upgrade Now
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// // import { Separator } from "@/components/ui/separator";
// import { CheckCircle, Star, CreditCard, Zap } from "lucide-react";

// // Mock user data
// const defaultUserInfo = {
//   firstName: "John",
//   lastName: "Doe",
//   email: "john.doe@example.com",
//   address: "123 Main St",
//   state: "California",
//   country: "United States",
//   phoneNumber: "+1 (555) 123-4567",
//   subscriptionPlan: "Basic",
//   aiResumeCredits: 5,
//   nextBillingDate: "2023-07-01",
//   usageThisMonth: 3,
// };

// export default function EnhancedProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userInfo, setUserInfo] = useState(defaultUserInfo);

//   const handleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUserInfo((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     // Here you would typically send the updated user info to your backend
//     console.log("Saving user info:", userInfo);
//     setIsEditing(false);
//   };

//   return (
//     <div className="flex justify-center items-start min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 sm:p-6 lg:p-8">
//       <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
//         <div className="flex-grow space-y-6">
//           <Card className="overflow-hidden">
//             <div className="bg-gradient-to-r from p-6 text-white">
//               <div className="flex items-center space-x-4">
//                 <Avatar className="w-20 h-20 border-4 border-white">
//                   <AvatarImage
//                     src="/placeholder.svg?height=80&width=80"
//                     alt="Profile picture"
//                   />
//                   <AvatarFallback>JD</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <h1 className="text-3xl font-bold">
//                     {userInfo.firstName} {userInfo.lastName}
//                   </h1>
//                   <p className="text-blue-100">{userInfo.email}</p>
//                 </div>
//               </div>
//             </div>
//             <CardContent className="space-y-6 p-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="firstName">First Name</Label>
//                   <Input
//                     id="firstName"
//                     name="firstName"
//                     value={userInfo.firstName}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="bg-white"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="lastName">Last Name</Label>
//                   <Input
//                     id="lastName"
//                     name="lastName"
//                     value={userInfo.lastName}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="bg-white"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="phoneNumber">Phone Number</Label>
//                   <Input
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     value={userInfo.phoneNumber}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="bg-white"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="address">Address</Label>
//                   <Input
//                     id="address"
//                     name="address"
//                     value={userInfo.address}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="bg-white"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="state">State</Label>
//                   <Input
//                     id="state"
//                     name="state"
//                     value={userInfo.state}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="bg-white"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="country">Country</Label>
//                   <Input
//                     id="country"
//                     name="country"
//                     value={userInfo.country}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="bg-white"
//                   />
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="bg-gray-50 px-6 py-4">
//               {isEditing ? (
//                 <Button onClick={handleSave} className="w-full sm:w-auto">
//                   Save Changes
//                 </Button>
//               ) : (
//                 <Button onClick={handleEdit} className="w-full sm:w-auto">
//                   Edit Profile
//                 </Button>
//               )}
//             </CardFooter>
//           </Card>
//         </div>

//         <div className="w-full md:w-80 space-y-6">
//           <Card>
//             <CardHeader className="pb-4">
//               <CardTitle className="text-xl font-bold">
//                 Subscription Info
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="font-medium">Current Plan:</span>
//                 <Badge variant="secondary" className="text-sm">
//                   {userInfo.subscriptionPlan}
//                 </Badge>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="font-medium">AI Resume Credits:</span>
//                 <span>{userInfo.aiResumeCredits}</span>
//               </div>
//               {/* <Separator /> */}
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center text-sm">
//                   <span>Next Billing Date:</span>
//                   <span>{userInfo.nextBillingDate}</span>
//                 </div>
//                 <div className="flex justify-between items-center text-sm">
//                   <span>Usage This Month:</span>
//                   <span>{userInfo.usageThisMonth} credits</span>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button variant="outline" className="w-full">
//                 <CreditCard className="mr-2 h-4 w-4" /> Manage Subscription
//               </Button>
//             </CardFooter>
//           </Card>

//           <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
//             <CardHeader>
//               <CardTitle className="text-xl font-bold">
//                 Upgrade to Pro
//               </CardTitle>
//               <CardDescription className="text-purple-100">
//                 Boost your resume power!
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <ul className="space-y-2">
//                 <li className="flex items-center">
//                   <CheckCircle className="mr-2 h-4 w-4 text-purple-200" />
//                   <span>Unlimited AI resume generations</span>
//                 </li>
//                 <li className="flex items-center">
//                   <CheckCircle className="mr-2 h-4 w-4 text-purple-200" />
//                   <span>Advanced resume templates</span>
//                 </li>
//                 <li className="flex items-center">
//                   <CheckCircle className="mr-2 h-4 w-4 text-purple-200" />
//                   <span>Priority customer support</span>
//                 </li>
//                 <li className="flex items-center">
//                   <CheckCircle className="mr-2 h-4 w-4 text-purple-200" />
//                   <span>Exclusive job market insights</span>
//                 </li>
//               </ul>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full bg-white text-purple-600 hover:bg-purple-50">
//                 <Zap className="mr-2 h-4 w-4" /> Upgrade Now
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// // import { Separator } from "@/components/ui/separator";
// import { CheckCircle, CreditCard, Zap } from "lucide-react";
// import Image from "next/image";
// import { UserAvatar } from "../../../../public/img";
// import { LuZap } from "react-icons/lu";
// import AppHeader from "@/components/AppHeader";

// // Mock user data
// const defaultUserInfo = {
//   firstName: "John",
//   lastName: "Doe",
//   email: "john.doe@example.com",
//   city: "San Francisco",
//   country: "United States",
//   phoneNumber: "+1 (555) 123-4567",
//   subscriptionPlan: "Basic",
//   aiResumeCredits: 5,
//   lastLogin: "2023-06-15 14:30",
//   usageThisMonth: 3,
// };

// export default function SimplifiedProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userInfo, setUserInfo] = useState(defaultUserInfo);

//   const handleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUserInfo((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     console.log("Saving user info:", userInfo);
//     setIsEditing(false);
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <AppHeader title="Profile Settings" />
//       <div className="flex justify-center  items-start h-screen bg-secondary p-4 sm:p-6 lg:p-8">
//         <div className="w-full max-w-6xl flex flex-col max-lg:pt-16 md:flex-row gap-6">
//           <div className="flex-grow space-y-6">
//             <Card className="overflow-hidden rounded">
//               <CardHeader className="bg-primary text-white p-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-20 h-20 border-2 rounded border-white">
//                     {/* <AvatarImage
//                     src="/placeholder.svg?height=80&width=80"
//                     alt="Profile picture"
//                     className="object-cover w-full h-full"
//                   /> */}

//                     <Image
//                       src={UserAvatar}
//                       alt="Profile picture"
//                       // layout="fill"
//                       className="object-cover w-full h-full"
//                     />

//                     {/* <AvatarFallback>JD</AvatarFallback> */}
//                   </div>
//                   <div>
//                     <h1 className="text-3xl font-bold font-heading">
//                       {userInfo.firstName} {userInfo.lastName}
//                     </h1>
//                     <p className="text-white/80">{userInfo.email}</p>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-6 p-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label
//                       htmlFor="firstName"
//                       className="font-body text-sm font-bold"
//                     >
//                       First Name
//                     </Label>
//                     <Input
//                       id="firstName"
//                       name="firstName"
//                       value={userInfo.firstName}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="bg-white font-body text-sm font-bold rounded"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="lastName">Last Name</Label>
//                     <Input
//                       id="lastName"
//                       name="lastName"
//                       value={userInfo.lastName}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="bg-white font-body text-sm font-bold rounded"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="phoneNumber">Phone Number</Label>
//                     <Input
//                       id="phoneNumber"
//                       name="phoneNumber"
//                       value={userInfo.phoneNumber}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="bg-white font-body text-sm font-bold rounded"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="city">City</Label>
//                     <Input
//                       id="city"
//                       name="city"
//                       value={userInfo.city}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="bg-white font-body text-sm font-bold rounded"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="country">Country</Label>
//                     <Input
//                       id="country"
//                       name="country"
//                       value={userInfo.country}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       className="bg-white font-body text-sm font-bold rounded"
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="bg-gray-50 px-6 py-4">
//                 {isEditing ? (
//                   <Button
//                     onClick={handleSave}
//                     className="w-full sm:w-auto bg-primary text-white"
//                   >
//                     Save Changes
//                   </Button>
//                 ) : (
//                   <Button
//                     onClick={handleEdit}
//                     className="w-full rounded sm:w-auto bg-primary text-white"
//                   >
//                     Edit Profile
//                   </Button>
//                 )}
//               </CardFooter>
//             </Card>
//           </div>

//           <div className="w-full md:w-80 space-y-6">
//             <Card className="rounded">
//               <CardHeader className="pb-4">
//                 <CardTitle className="text-xl font-bold font-heading">
//                   Subscription Info
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium">Current Plan:</span>
//                   <Badge
//                     variant="secondary"
//                     className="text-sm hover:bg-primary rounded hover:scale-[.98] transition-all duration-150 bg-primary text-white"
//                   >
//                     {userInfo.subscriptionPlan}
//                   </Badge>
//                 </div>
//                 {/* <div className="flex justify-between items-center">
//                   <span className="font-medium">AI Resume Credits:</span>
//                   <span>{userInfo.aiResumeCredits}</span>
//                 </div> */}
//                 {/* <Separator /> */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center text-sm">
//                     <span>Last Login:</span>
//                     <span className="font-semibold text-gray-700">
//                       {userInfo.lastLogin}
//                     </span>
//                   </div>
//                   {/* <div className="flex justify-between items-center text-sm">
//                     <span>Usage This Month:</span>
//                     <span>{userInfo.usageThisMonth} credits</span>
//                   </div> */}
//                 </div>
//               </CardContent>
//               {/* <CardFooter>
//               <Button variant="outline" className="w-full">
//                 <CreditCard className="mr-2 h-4 w-4" /> Manage Subscription
//               </Button>
//             </CardFooter> */}
//             </Card>

//             <Card className="border-primary rounded">
//               <CardHeader>
//                 <CardTitle className="text-xl font-bold font-heading">
//                   Upgrade to Pro
//                 </CardTitle>
//                 <CardDescription className="font-body font-semibold">
//                   Create a resume that stands out.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <ul className="space-y-2 font-body">
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-primary" />
//                     <span>Unlimited AI resume generations</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-primary" />
//                     <span>Advanced resume templates</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-primary" />
//                     <span>Priority customer support</span>
//                   </li>
//                   <li className="flex items-center">
//                     <CheckCircle className="mr-2 h-4 w-4 text-primary" />
//                     <span>Exclusive job market insights</span>
//                   </li>
//                 </ul>
//               </CardContent>
//               <CardFooter>
//                 <Button className="w-full bg-primary font-heading font-bold text-white">
//                   <LuZap className="mr-2 h-4 w-4" /> Upgrade Now
//                 </Button>
//               </CardFooter>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap } from "lucide-react";
import Image from "next/image";
import { UserAvatar } from "../../../../public/img";
import { LuZap } from "react-icons/lu";
import AppHeader from "@/components/AppHeader";
import { uploadToS3 } from "@/lib/utils/s3";
import useAuth from "@/lib/hooks/useAuth";
import api from "@/lib/api";
import { toast } from "sonner";
import { format } from "date-fns";
import { clearAccessToken, setAccessToken } from "@/lib/setTokenInfo";
// import { uploadToS3 } from "@/lib/s3-upload"; // Adjust path as needed

// User Info Interface
interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  phoneNumber: string;
  aiResumeCredits?: number;
  lastLogin: string;
  usageThisMonth?: number;
  profileImageUrl?: string;
  subscriptionPlan: string;
}

export default function SimplifiedProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
    phoneNumber: "",
    aiResumeCredits: 0,
    lastLogin: "",
    usageThisMonth: 0,
    profileImageUrl: "",
    subscriptionPlan: "",
  });
  // const [profileImage, setProfileImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Edit Handler
  const { user, isLoading } = useAuth();
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Input Change Handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Image Upload Handler
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isEditing) {
      try {
        const uploadedImageUrl = await uploadToS3(file);
        setUserInfo((prevState) => ({
          ...prevState,
          profileImageUrl: uploadedImageUrl,
        }));
        // setProfileImage(file);
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  // Trigger File Input
  const triggerFileInput = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  useEffect(() => {
    if (!user?._id) return;
    if (isLoading) return;
    async function getUserInfo() {
      console.log("triggering getUserInfo");
      if (!user?._id) return;
      if (isLoading) return;
      try {
        const response = await api.post(`/settings/get-profile/`, {
          userId: user._id,
        });
        const data = response.data;

        console.log("response.data for getUserInfo", data);
        if (data.success) {
          const userInfo = data.user;
          console.log("userInfo for getUserInfo", userInfo);
          setUserInfo({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            city: userInfo.city,
            country: userInfo.country,
            phoneNumber: userInfo.phoneNumber,
            aiResumeCredits: userInfo.aiResumeCredits,
            lastLogin: userInfo.lastLogin,
            usageThisMonth: userInfo.usageThisMonth,
            profileImageUrl: userInfo.photo,
            subscriptionPlan: userInfo.subscriptionPlan,
          });
        }
      } catch (error) {
        console.log("Error fetching user info:", error);
        toast.error("Failed to fetch user info");
      }
    }
    getUserInfo();
  }, [user?._id, isLoading]);

  // Save Handler
  const handleSave = async () => {
    if (!userInfo) return;
    if (isLoading) return;
    if (!user?._id) return;

    try {
      const response = await api.post("/settings/save-profile", {
        userId: user?._id,
        profileInfo: userInfo,
      });
      const data = response.data;
      console.log("response.data for save click", data);
      if (data.success) {
        console.log("test message", data.message);
        toast.success("Profile updated successfully");
        // if (data.accessToken) {
        //   setAccessToken(data.accessToken);
        // }
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to update profile");
    }

    // Simulate API call or actual implementation
    // await updateUserProfile(userInfo);

    setIsEditing(false);
  };

  // Cancel Edit
  const handleCancel = () => {
    // Reset to original user info
    // setUserInfo(defaultUserInfo);
    setIsEditing(false);
  };

  // const lastLoginDate = format(new Date(userInfo.lastLogin), "MMM d, yyyy");

  return (
    <div className="flex flex-col h-screen">
      <AppHeader title="Profile Settings" />
      <div className="flex justify-center items-start h-screen bg-secondary p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl flex flex-col max-lg:pt-16 md:flex-row gap-6">
          <div className="flex-grow space-y-6">
            <Card className="overflow-hidden rounded">
              <CardHeader className=" text-white p-6 border-b bg-white">
                <div className="flex items-center space-x-4 ">
                  <div
                    className={`w-20 h-20 border rounded overflow-hidden  ${
                      isEditing ? "cursor-pointer" : ""
                    }`}
                    onClick={triggerFileInput}
                  >
                    <Image
                      src={userInfo.profileImageUrl || UserAvatar}
                      alt="Profile picture"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full "
                    />
                    {isEditing && (
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    )}
                  </div>
                  <div>
                    <h1 className="text-3xl max-lg:text-2xl font-bold font-heading text-primary">
                      {userInfo.firstName} {userInfo.lastName}
                    </h1>
                    <p className="text-black/80">{userInfo.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={userInfo.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-gray-50 disabled:bg-white font-body disabled:cursor-default text-sm font-bold rounded text-black disabled:text-gray-600 disabled:opacity-90 "
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={userInfo.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-gray-50 disabled:bg-white font-body disabled:cursor-default text-sm font-bold rounded text-black disabled:text-gray-600 disabled:opacity-90 "
                    />
                  </div>

                  {/* Email */}

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={userInfo.phoneNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-gray-50 disabled:bg-white font-body disabled:cursor-default text-sm font-bold rounded text-black disabled:text-gray-600 disabled:opacity-90 "
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={userInfo.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-gray-50 disabled:bg-white font-body disabled:cursor-default text-sm font-bold rounded text-black disabled:text-gray-600 disabled:opacity-90 "
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={userInfo.country}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-gray-50 disabled:bg-white disabled:cursor-default font-body text-sm font-bold rounded text-black disabled:text-gray-600 disabled:opacity-90 "
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-4">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      className="w-full sm:w-auto bg-primary text-white mr-2"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleEdit}
                    className="w-full rounded sm:w-auto bg-primary text-white"
                  >
                    Edit Profile
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          {/* Subscription Card */}
          <div className="w-full md:w-80 space-y-6">
            <Card className="rounded">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold font-heading">
                  Subscription Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Current Plan:</span>
                  <Badge
                    variant="secondary"
                    className="text-sm hover:bg-primary rounded hover:scale-[.98] transition-all duration-150 bg-primary text-white capitalize"
                  >
                    {userInfo.subscriptionPlan}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Last Login:</span>
                    <span className="font-semibold text-gray-700">
                      {userInfo.lastLogin
                        ? format(new Date(userInfo.lastLogin), "dd/MM/yyyy")
                        : ""}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Card */}
            <Card className="border-primary rounded">
              <CardHeader>
                <CardTitle className="text-xl font-bold font-heading">
                  Upgrade to Pro
                </CardTitle>
                <CardDescription className="font-body font-semibold">
                  Create a resume that stands out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 font-body">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited AI resume generations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced resume templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Priority customer support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Exclusive job market insights</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary font-heading font-bold text-white">
                  <LuZap className="mr-2 h-4 w-4" /> Upgrade Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
