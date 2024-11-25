// // "use client";

// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { Menu, X } from "lucide-react";
// // // import ContentWrapper from "./ContentWrapper";

// // import { Button } from "@/components/ui/button";
// // import ContentWrapper from "../ContentWrapper";

// // const Header = () => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false); // This should be replaced with actual auth logic

// //   useEffect(() => {
// //     const handleResize = () => {
// //       if (window.innerWidth > 768) {
// //         setIsMenuOpen(false);
// //       }
// //     };

// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   return (
// //     <header className="bg-blue-600 text-white">
// //       <ContentWrapper>
// //         <div className="flex justify-between items-center py-4">
// //           <Link href="/" className="text-2xl font-bold">
// //             Logo
// //           </Link>
// //           <nav className="hidden md:flex space-x-4">
// //             <Link href="/" className="hover:text-blue-200">
// //               Home
// //             </Link>
// //             <Link href="/about" className="hover:text-blue-200">
// //               About
// //             </Link>
// //             <Link href="/contact" className="hover:text-blue-200">
// //               Contact
// //             </Link>
// //           </nav>
// //           <div className="hidden md:flex space-x-2">
// //             {isLoggedIn ? (
// //               <Button variant="secondary">Dashboard</Button>
// //             ) : (
// //               <>
// //                 <Button variant="secondary">Login</Button>
// //                 <Button variant="outline">Sign Up</Button>
// //               </>
// //             )}
// //           </div>
// //           <button
// //             className="md:hidden"
// //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// //             aria-label="Toggle menu"
// //           >
// //             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
// //           </button>
// //         </div>
// //       </ContentWrapper>
// //       {isMenuOpen && (
// //         <div className="md:hidden fixed inset-x-0 top-0 z-50 bg-blue-600 h-[50vh] overflow-y-auto transition-transform duration-300 ease-in-out transform translate-y-0">
// //           <ContentWrapper>
// //             <div className="flex flex-col items-center py-8 space-y-4">
// //               <Link href="/" className="text-2xl font-bold mb-4">
// //                 Logo
// //               </Link>
// //               <Link href="/" className="hover:text-blue-200">
// //                 Home
// //               </Link>
// //               <Link href="/about" className="hover:text-blue-200">
// //                 About
// //               </Link>
// //               <Link href="/contact" className="hover:text-blue-200">
// //                 Contact
// //               </Link>
// //               {isLoggedIn ? (
// //                 <Button variant="secondary" className="w-full">
// //                   Dashboard
// //                 </Button>
// //               ) : (
// //                 <>
// //                   <Button variant="secondary" className="w-full">
// //                     Login
// //                   </Button>
// //                   <Button variant="outline" className="w-full">
// //                     Sign Up
// //                   </Button>
// //                 </>
// //               )}
// //             </div>
// //           </ContentWrapper>
// //         </div>
// //       )}
// //     </header>
// //   );
// // };

// // export default Header;

// // "use client";

// // import { useState } from "react";
// // import Link from "next/link";
// // import { Menu } from "lucide-react";
// // // import ContentWrapper from "./ContentWrapper";

// // import { Button } from "@/components/ui/button";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import ContentWrapper from "../ContentWrapper";

// // const Header = () => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false); // This should be replaced with actual auth logic

// //   return (
// //     <header className="bg-white border-b border-gray-200">
// //       <ContentWrapper>
// //         <div className="flex justify-between items-center py-4">
// //           <Link href="/" className="text-2xl font-bold text-blue-600">
// //             AI Resume Pro
// //           </Link>
// //           <nav className="hidden md:flex space-x-6">
// //             <Link
// //               href="/templates"
// //               className="text-gray-600 hover:text-blue-600 transition-colors"
// //             >
// //               Templates
// //             </Link>
// //             <Link
// //               href="/ai-tools"
// //               className="text-gray-600 hover:text-blue-600 transition-colors"
// //             >
// //               AI Tools
// //             </Link>
// //             <Link
// //               href="/pricing"
// //               className="text-gray-600 hover:text-blue-600 transition-colors"
// //             >
// //               Pricing
// //             </Link>
// //           </nav>
// //           <div className="hidden md:flex items-center space-x-4">
// //             {isLoggedIn ? (
// //               <DropdownMenu>
// //                 <DropdownMenuTrigger asChild>
// //                   <Button
// //                     variant="ghost"
// //                     className="relative h-8 w-8 rounded-full"
// //                   >
// //                     <Avatar className="h-8 w-8">
// //                       <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
// //                       <AvatarFallback>U</AvatarFallback>
// //                     </Avatar>
// //                   </Button>
// //                 </DropdownMenuTrigger>
// //                 <DropdownMenuContent align="end">
// //                   <DropdownMenuItem>
// //                     <Link href="/dashboard">Dashboard</Link>
// //                   </DropdownMenuItem>
// //                   <DropdownMenuItem>
// //                     <Link href="/profile">Profile</Link>
// //                   </DropdownMenuItem>
// //                   <DropdownMenuItem>
// //                     <Link href="/logout">Logout</Link>
// //                   </DropdownMenuItem>
// //                 </DropdownMenuContent>
// //               </DropdownMenu>
// //             ) : (
// //               <>
// //                 <Button variant="ghost">Login</Button>
// //                 <Button>Get Started</Button>
// //               </>
// //             )}
// //           </div>
// //           <DropdownMenu>
// //             <DropdownMenuTrigger asChild className="md:hidden">
// //               <Button variant="ghost" size="icon">
// //                 <Menu className="h-5 w-5" />
// //                 <span className="sr-only">Toggle menu</span>
// //               </Button>
// //             </DropdownMenuTrigger>
// //             <DropdownMenuContent align="end" className="w-[200px]">
// //               <DropdownMenuItem>
// //                 <Link href="/templates" className="w-full">
// //                   Templates
// //                 </Link>
// //               </DropdownMenuItem>
// //               <DropdownMenuItem>
// //                 <Link href="/ai-tools" className="w-full">
// //                   AI Tools
// //                 </Link>
// //               </DropdownMenuItem>
// //               <DropdownMenuItem>
// //                 <Link href="/pricing" className="w-full">
// //                   Pricing
// //                 </Link>
// //               </DropdownMenuItem>
// //               {isLoggedIn ? (
// //                 <>
// //                   <DropdownMenuItem>
// //                     <Link href="/dashboard" className="w-full">
// //                       Dashboard
// //                     </Link>
// //                   </DropdownMenuItem>
// //                   <DropdownMenuItem>
// //                     <Link href="/profile" className="w-full">
// //                       Profile
// //                     </Link>
// //                   </DropdownMenuItem>
// //                   <DropdownMenuItem>
// //                     <Link href="/logout" className="w-full">
// //                       Logout
// //                     </Link>
// //                   </DropdownMenuItem>
// //                 </>
// //               ) : (
// //                 <>
// //                   <DropdownMenuItem>
// //                     <Link href="/login" className="w-full">
// //                       Login
// //                     </Link>
// //                   </DropdownMenuItem>
// //                   <DropdownMenuItem>
// //                     <Link href="/signup" className="w-full">
// //                       Get Started
// //                     </Link>
// //                   </DropdownMenuItem>
// //                 </>
// //               )}
// //             </DropdownMenuContent>
// //           </DropdownMenu>
// //         </div>
// //       </ContentWrapper>
// //     </header>
// //   );
// // };

// // export default Header;

// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { MdMenu, MdClose, MdKeyboardArrowDown } from "react-icons/md";
// import { VscHubot } from "react-icons/vsc";
// // import { Logo, SmallLogo, UserAvatar } from "@/public/img";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Skeleton } from "@/components/ui/skeleton";
// import useAuth from "@/lib/hooks/useAuth";
// import { Logo } from "../../../public/img";
// import { RiDashboardFill } from "react-icons/ri";
// import { BsFillFileEarmarkPdfFill, BsFillFileTextFill } from "react-icons/bs";
// import { PiReadCvLogoFill } from "react-icons/pi";
// import { SiCodemagic } from "react-icons/si";
// import { FaCoins, FaUserCheck } from "react-icons/fa";
// import { IoMove } from "react-icons/io5";

// interface NavItem {
//   icon: React.ElementType;
//   label: string;
//   path: string;
//   matchPattern?: RegExp;
// }

// const navItems: NavItem[] = [
//   { icon: RiDashboardFill, label: "Dashboard", path: "/app" },
//   { icon: BsFillFileEarmarkPdfFill, label: "My Resume", path: "/app/resumes" },
//   {
//     icon: PiReadCvLogoFill,
//     label: "AI Resume Builder",
//     path: "/app/resumes/builder",
//   },
//   {
//     icon: SiCodemagic,
//     label: "AI Resume Optimizer",
//     path: "/app/resume-optimizer",
//   },
//   {
//     icon: FaUserCheck,
//     label: "AI Interview Coach",
//     path: "/app/interview-coach",
//   },
//   { icon: IoMove, label: "Job Tracker", path: "/app/job-tracker" },
//   { icon: BsFillFileTextFill, label: "Templates", path: "/app/templates" },
//   { icon: FaCoins, label: "AI Salary Analyzer", path: "/app/salary-analyzer" },
// ];

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, isLoading, isAuthenticated } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setIsMenuOpen(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const isPathActive = (item: NavItem) => {
//     if (item.matchPattern) {
//       return item.matchPattern.test(pathname);
//     }
//     return pathname === item.path;
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
//       <div className="container mx-auto px-4 h-full flex items-center justify-between">
//         <Link href="/" className="flex items-center">
//           <Image src={Logo} alt="Logo" className="h-10 w-auto" />
//         </Link>

//         <nav className="hidden lg:flex space-x-6">
//           {navItems.map((item, index) => (
//             <Link
//               key={index}
//               href={item.path}
//               className={`flex items-center space-x-2 text-sm font-medium ${
//                 isPathActive(item)
//                   ? "text-blue-600"
//                   : "text-gray-600 hover:text-blue-600"
//               }`}
//             >
//               <item.icon className="w-5 h-5" />
//               <span>{item.label}</span>
//             </Link>
//           ))}
//         </nav>

//         <div className="flex items-center space-x-4">
//           {isLoading ? (
//             <Skeleton className="w-40 h-10" />
//           ) : isAuthenticated ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="flex items-center space-x-2"
//                 >
//                   <Image
//                     src={"UserAvatar"}
//                     alt="User Avatar"
//                     className="w-6 h-6 rounded-full"
//                   />
//                   <span>{user?.firstName}</span>
//                   <MdKeyboardArrowDown className="w-5 h-5" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem onSelect={() => router.push("/app/profile")}>
//                   Profile
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onSelect={() => router.push("/app/settings")}>
//                   Settings
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   onSelect={() => {
//                     /* Implement logout */
//                   }}
//                 >
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <>
//               <Button variant="ghost" onClick={() => router.push("/login")}>
//                 Log In
//               </Button>
//               <Button onClick={() => router.push("/signup")}>Sign Up</Button>
//             </>
//           )}
//           {!user?.isSubscribed && (
//             <Button className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//               <VscHubot className="w-5 h-5" />
//               <span>Upgrade Plan</span>
//             </Button>
//           )}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? (
//               <MdClose className="w-6 h-6" />
//             ) : (
//               <MdMenu className="w-6 h-6" />
//             )}
//           </Button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="lg:hidden fixed inset-0 z-50 bg-white">
//           <div className="flex flex-col h-full">
//             <div className="flex items-center justify-between p-4 border-b">
//               <Image src={"SmallLogo"} alt="Logo" className="h-8 w-auto" />
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <MdClose className="w-6 h-6" />
//               </Button>
//             </div>
//             <nav className="flex-1 overflow-y-auto p-4">
//               {navItems.map((item, index) => (
//                 <Link
//                   key={index}
//                   href={item.path}
//                   className={`flex items-center space-x-4 p-3 rounded-lg ${
//                     isPathActive(item)
//                       ? "bg-blue-50 text-blue-600"
//                       : "text-gray-600"
//                   }`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <item.icon className="w-6 h-6" />
//                   <span className="font-medium">{item.label}</span>
//                 </Link>
//               ))}
//             </nav>
//             {!user?.isSubscribed && (
//               <div className="p-4 border-t">
//                 <Button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                   <VscHubot className="w-5 h-5" />
//                   <span>Upgrade Plan</span>
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { Menu, Search } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// export function SiteHeader() {
//   const [isOpen, setIsOpen] = React.useState(false);

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background">
//       <div className="container flex h-16 items-center">
//         <Sheet open={isOpen} onOpenChange={setIsOpen}>
//           <SheetTrigger asChild>
//             <Button variant="ghost" size="icon" className="md:hidden">
//               <Menu className="h-5 w-5" />
//               <span className="sr-only">Toggle menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left">
//             <nav className="flex flex-col gap-4">
//               <Link
//                 href="#"
//                 className="text-sm font-medium transition-colors hover:text-primary"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Free Tools
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm font-medium transition-colors hover:text-primary"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Coaching
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm font-medium transition-colors hover:text-primary"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Courses
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm font-medium transition-colors hover:text-primary"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Success Stories
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm font-medium transition-colors hover:text-primary"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Free Guides
//               </Link>
//             </nav>
//           </SheetContent>
//         </Sheet>
//         <Link href="/" className="mr-6 flex items-center space-x-2">
//           <span className="font-bold">CULTIVATED CULTURE</span>
//         </Link>
//         <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center md:space-x-6">
//           <Link
//             href="#"
//             className="text-sm font-medium transition-colors hover:text-primary"
//           >
//             Free Tools
//           </Link>
//           <Link
//             href="#"
//             className="text-sm font-medium transition-colors hover:text-primary"
//           >
//             Coaching
//           </Link>
//           <Link
//             href="#"
//             className="text-sm font-medium transition-colors hover:text-primary"
//           >
//             Courses
//           </Link>
//           <Link
//             href="#"
//             className="text-sm font-medium transition-colors hover:text-primary"
//           >
//             Success Stories
//           </Link>
//           <Link
//             href="#"
//             className="text-sm font-medium transition-colors hover:text-primary"
//           >
//             Free Guides
//           </Link>
//         </nav>
//         <div className="flex items-center space-x-2">
//           <Button variant="ghost" size="icon" className="hidden md:flex">
//             <Search className="h-5 w-5" />
//             <span className="sr-only">Search</span>
//           </Button>
//           <Button variant="ghost" size="sm" className="hidden md:flex">
//             Log In
//           </Button>
//           <Button size="sm" className="hidden md:flex">
//             Sign Up
//           </Button>
//           <Button variant="ghost" size="icon" className="md:hidden">
//             <Search className="h-5 w-5" />
//             <span className="sr-only">Search</span>
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// }

// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { Menu, Search } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import ContentWrapper from "../ContentWrapper";
// // import ContentWrapper from "./content-wrapper";

// export function Header() {
//   const [isOpen, setIsOpen] = React.useState(false);

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background">
//       <ContentWrapper>
//         <div className="flex h-16 items-center">
//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="md:hidden">
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left">
//               <nav className="flex flex-col gap-4">
//                 <Link
//                   href="#"
//                   className="text-sm font-medium transition-colors hover:text-primary"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Free Tools
//                 </Link>
//                 <Link
//                   href="#"
//                   className="text-sm font-medium transition-colors hover:text-primary"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Coaching
//                 </Link>
//                 <Link
//                   href="#"
//                   className="text-sm font-medium transition-colors hover:text-primary"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Courses
//                 </Link>
//                 <Link
//                   href="#"
//                   className="text-sm font-medium transition-colors hover:text-primary"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Success Stories
//                 </Link>
//                 <Link
//                   href="#"
//                   className="text-sm font-medium transition-colors hover:text-primary"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Free Guides
//                 </Link>
//               </nav>
//             </SheetContent>
//           </Sheet>
//           <Link href="/" className="mr-6 flex items-center space-x-2">
//             <span className="font-bold">CULTIVATED CULTURE</span>
//           </Link>
//           <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center md:space-x-6">
//             <Link
//               href="#"
//               className="text-sm font-medium transition-colors hover:text-primary"
//             >
//               Free Tools
//             </Link>
//             <Link
//               href="#"
//               className="text-sm font-medium transition-colors hover:text-primary"
//             >
//               Coaching
//             </Link>
//             <Link
//               href="#"
//               className="text-sm font-medium transition-colors hover:text-primary"
//             >
//               Courses
//             </Link>
//             <Link
//               href="#"
//               className="text-sm font-medium transition-colors hover:text-primary"
//             >
//               Success Stories
//             </Link>
//             <Link
//               href="#"
//               className="text-sm font-medium transition-colors hover:text-primary"
//             >
//               Free Guides
//             </Link>
//           </nav>
//           <div className="flex items-center space-x-2">
//             <Button variant="ghost" size="icon" className="hidden md:flex">
//               <Search className="h-5 w-5" />
//               <span className="sr-only">Search</span>
//             </Button>
//             <Button variant="ghost" size="sm" className="hidden md:flex">
//               Log In
//             </Button>
//             <Button size="sm" className="hidden md:flex">
//               Sign Up
//             </Button>
//             <Button variant="ghost" size="icon" className="md:hidden">
//               <Search className="h-5 w-5" />
//               <span className="sr-only">Search</span>
//             </Button>
//           </div>
//         </div>
//       </ContentWrapper>
//     </header>
//   );
// }

// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import ContentWrapper from "../ContentWrapper";
// // import ContentWrapper from "./content-wrapper";

// export function Header() {
//   const [isOpen, setIsOpen] = React.useState(false);

//   // Close menu when window is resized to prevent layout issues
//   React.useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setIsOpen(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Prevent scroll when mobile menu is open
//   React.useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   const navLinks = [
//     { href: "#", label: "Free Tools" },
//     { href: "#", label: "Coaching" },
//     { href: "#", label: "Courses" },
//     { href: "#", label: "Success Stories" },
//     { href: "#", label: "Free Guides" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <ContentWrapper>
//         <div className="flex h-20 items-center justify-between px-4 sm:px-6">
//           <Link href="/" className="flex items-center space-x-2 shrink-0">
//             <span className="font-bold text-xl sm:text-2xl whitespace-nowrap">
//               CULTIVATED CULTURE
//             </span>
//           </Link>

//           <nav
//             className={cn(
//               "fixed inset-x-0 top-[5rem] z-50 h-[calc(100vh-5rem)] overflow-y-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
//               "transition-all duration-300 ease-in-out",
//               "md:static md:h-auto md:overflow-visible md:bg-transparent md:backdrop-blur-none",
//               isOpen
//                 ? "translate-y-0 opacity-100"
//                 : "translate-y-[-100vh] opacity-0 md:translate-y-0 md:opacity-100"
//             )}
//           >
//             <div className="flex flex-col space-y-6 p-8 md:flex-row md:items-center md:justify-end md:space-x-8 md:space-y-0 md:p-0">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.label}
//                   href={link.href}
//                   className="text-lg font-medium text-foreground transition-colors hover:text-primary"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//               <div className="flex flex-col gap-4 md:flex-row md:items-center">
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="w-full md:w-auto"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Log In
//                 </Button>
//                 <Button
//                   size="lg"
//                   className="w-full md:w-auto"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Sign Up
//                 </Button>
//               </div>
//             </div>
//           </nav>

//           <Button
//             variant="ghost"
//             size="icon"
//             className="md:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle menu"
//             aria-expanded={isOpen}
//           >
//             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </Button>
//         </div>
//       </ContentWrapper>
//     </header>
//   );
// // }"use client";
// "use client";
// import * as React from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import ContentWrapper from "../ContentWrapper";
// import Image from "next/image";
// import { Logo } from "../../../public/img";
// // import ContentWrapper from "./content-wrapper";

// export default function Header() {
//   const [isOpen, setIsOpen] = React.useState(false);

//   // Close menu when window is resized to prevent layout issues
//   React.useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setIsOpen(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Prevent scroll when mobile menu is open
//   React.useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen]);

//   const navLinks = [
//     { href: "#", label: "Free Tools" },
//     { href: "#", label: "Coaching" },
//     { href: "#", label: "Courses" },
//     { href: "#", label: "Success Stories" },
//     { href: "#", label: "Free Guides" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 w-full max-md:bg-white border-b md:bg-background/95 md:backdrop-blur md:supports-[backdrop-filter]:bg-background/60">
//       <ContentWrapper>
//         <div className="flex h-20 items-center justify-between max-lg:px-4 ">
//           <Link href="/" className="flex items-center space-x-2 shrink-0">
//             {/* <span className="font-bold text-xl sm:text-2xl whitespace-nowrap">
//               CULTIVATED CULTURE
//             </span> */}
//             <Image src={Logo} alt="Logo" className="h-10 max-md:h-8 w-auto" />
//           </Link>
//           <nav
//             className={cn(
//               "fixed inset-x-0 top-[5rem] z-50 h-[calc(100vh-5rem)] max-md:h-auto overflow-y-auto md:bg-background/95 md:backdrop-blur max-md:bg-white supports-[backdrop-filter]:bg-background/80",
//               "transition-all duration-300 ease-in-out",
//               "md:static md:h-auto md:overflow-visible md:bg-transparent md:backdrop-blur-none",
//               isOpen
//                 ? "translate-y-0 opacity-100"
//                 : "translate-y-[-100vh] opacity-0 md:translate-y-0 md:opacity-100"
//             )}
//           >
//             <div className="flex flex-col  font-heading space-y-6 max-md:space-y-4 p-8 md:flex-row md:items-center md:justify-end md:space-x-8 md:space-y-0 md:p-0 max-md:bg-white">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.label}
//                   href={link.href}
//                   className="text-lg font-medium text-foreground transition-colors hover:text-primary"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//               <div className="flex flex-col gap-4 md:flex-row md:items-center">
//                 <Button
//                   size="lg"
//                   className="w-full md:w-auto rounded h-[37px] border bg-primary text-white hover:bg-primary hover:scale-[.98] transition-all duration-150 font-heading font-semibold"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Sign Up
//                 </Button>
//                 <Button
//                   size="lg"
//                   className="w-full md:w-auto rounded h-[37px] border bg-primary text-white hover:bg-primary hover:scale-[.98] transition-all duration-150 font-heading font-semibold"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Log In
//                 </Button>
//                 <Button
//                   size="lg"
//                   className="w-full hidden md:w-auto rounded h-[37px] border bg-primary text-white hover:bg-primary hover:scale-[.98] transition-all duration-150 font-heading font-semibold"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Dashboard
//                 </Button>
//               </div>
//             </div>
//           </nav>

//           <Button
//             variant="ghost"
//             size="icon"
//             className="md:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle menu"
//             aria-expanded={isOpen}
//           >
//             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </Button>
//         </div>
//       </ContentWrapper>
//     </header>
//   );
// }
// }"use client";
"use client";
import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ContentWrapper from "../ContentWrapper";
import Image from "next/image";
import { Logo } from "../../../public/img";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  // Close menu when window is resized to prevent layout issues
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Changed from 768 to 1024 for lg breakpoint
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/app/resumes", label: "Resume Builder" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full max-lg:bg-white border-b lg:bg-background/95 lg:backdrop-blur lg:supports-[backdrop-filter]:bg-background/60">
      <ContentWrapper>
        <div className="flex h-20 items-center justify-between max-lg:px-0">
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <Image src={Logo} alt="Logo" className="h-10 max-lg:h-8 w-auto" />
          </Link>
          <nav
            className={cn(
              "fixed inset-x-0 top-[5rem] z-50 h-[calc(100vh-5rem)] max-lg:h-auto overflow-y-auto lg:bg-background/95 lg:backdrop-blur max-lg:bg-white supports-[backdrop-filter]:bg-background/80",
              "transition-all duration-300 ease-in-out",
              "lg:static lg:h-auto lg:overflow-visible lg:bg-transparent lg:backdrop-blur-none",
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-[-100vh] opacity-0 lg:translate-y-0 lg:opacity-100"
            )}
          >
            <div className="flex flex-col font-heading space-y-6 max-lg:space-y-4 p-8 lg:flex-row lg:items-center lg:justify-end lg:space-x-8 lg:space-y-0 lg:p-0 max-lg:bg-white">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col max-md:flex-col max-lg:flex-row gap-4 lg:flex-row lg:items-center">
                <Button
                  size="lg"
                  className="w-full lg:w-auto rounded h-[36px] border-none bg-primary text-white hover:bg-primary hover:scale-[.98] transition-all duration-150 font-heading font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Button>
                <Button
                  size="lg"
                  className="w-full lg:w-auto rounded h-[36px] border-none bg-primary text-white hover:bg-primary hover:scale-[.98] transition-all duration-150 font-heading font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Button>
                <Button
                  size="lg"
                  className="w-full hidden lg:w-auto rounded h-[37px] border bg-primary text-white hover:bg-primary hover:scale-[.98] transition-all duration-150 font-heading font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Button>
              </div>
            </div>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </ContentWrapper>
    </header>
  );
}
