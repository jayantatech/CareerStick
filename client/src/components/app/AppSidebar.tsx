// "use client";
// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import { Logo, SmallLogo, UserAvatar } from "../../../public/img";
// import {
//   MdOutlineKeyboardArrowRight,
//   MdKeyboardArrowLeft,
//   MdKeyboardArrowDown,
//   MdLock,
// } from "react-icons/md";
// import { BsFillFileEarmarkPdfFill, BsFillFileTextFill } from "react-icons/bs";
// import { PiReadCvLogoFill } from "react-icons/pi";
// import { SiCodemagic } from "react-icons/si";
// import { FaUserCheck, FaCoins } from "react-icons/fa";
// import { IoMove } from "react-icons/io5";
// import { VscHubot } from "react-icons/vsc";
// import { usePathname, useRouter } from "next/navigation";
// import useAuth from "@/lib/hooks/useAuth";
// import { Skeleton } from "../ui/skeleton";
// import Link from "next/link";

// interface NavItem {
//   icon: React.ElementType;
//   label: string;
//   path: string;
//   matchPattern?: RegExp;
//   locked?: boolean;
// }

// const AppSidebar = () => {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
//   const { user, isLoading } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();

//   // Extract resume ID from pathname if it exists
//   useEffect(() => {
//     const match = pathname.match(/^\/app\/resumes\/([a-zA-Z0-9]+)$/);
//     if (match) {
//       setActiveResumeId(match[1]);
//     }
//   }, [pathname]);

//   const navItems: NavItem[] = [
//     // { icon: RiDashboardFill, label: "Dashboard", path: "/app" },
//     {
//       icon: BsFillFileEarmarkPdfFill,
//       label: "My Resume",
//       path: "/app/resumes",
//     },
//     {
//       icon: PiReadCvLogoFill,
//       label: "AI Resume Builder",
//       path: activeResumeId ? `/app/resumes/${activeResumeId}` : "#",
//       matchPattern: /^\/app\/resumes\/[a-zA-Z0-9]+$/,
//       locked: !activeResumeId,
//     },
//     {
//       icon: SiCodemagic,
//       label: "AI Resume Optimizer",
//       path: "/app/resume-Optimizer",
//     },
//     {
//       icon: FaUserCheck,
//       label: "AI Interview Coach",
//       path: "/app/interview-coach",
//     },
//     { icon: IoMove, label: "Job Tracker", path: "/app/job-tracker" },
//     { icon: BsFillFileTextFill, label: "Templates", path: "/app/templates" },
//     {
//       icon: FaCoins,
//       label: "Ai Salary Analyzer",
//       path: "/app/salary-analyzer",
//     },
//   ];

//   const toggleSidebar = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const handleNavItemClick = (item: NavItem) => {
//     if (item.locked) {
//       return; // Do nothing if the item is locked
//     }
//     router.push(item.path);
//   };

//   const isPathActive = (item: NavItem) => {
//     if (item.matchPattern) {
//       return item.matchPattern.test(pathname);
//     }
//     return pathname === item.path;
//   };

//   return (
//     <div
//       className={`h-full bg-white transition-all relative py-4 duration-300 ease-in-out border-r z-50  ${
//         isExpanded ? "w-[244px]" : "w-[68px]"
//       }`}
//     >
// <div className="flex flex-row items-center gap-3 w-full border-b px-4 pb-2">
//   <div
//     className={`max-w-[164px] w-auto bg-fuchsida-800 h-[38px] flex-shrink-0 transition-all duration-150 whitespace-nowrap overflow-hidden`}
//   >
//     {isExpanded ? (
//       <Image
//         alt="LOGO"
//         src={Logo}
//         className={`transition-all duration-150 h-[38px]`}
//       />
//     ) : (
//       <Image
//         alt="LOGO"
//         src={SmallLogo}
//         className={`transition-all duration-150 h-[38px]`}
//       />
//     )}
//   </div>
//   <div
//     className={`w-[20px] h-[26px] bg- rounded flex items-center justify-center cursor-pointer bg-secondary ${
//       isExpanded ? "" : "-ml-2"
//     }`}
//     onClick={toggleSidebar}
//   >
//     {isExpanded ? (
//       <MdKeyboardArrowLeft className="text-[23px]" />
//     ) : (
//       <MdOutlineKeyboardArrowRight className="text-[23px]" />
//     )}
//   </div>
// </div>

// <div className="w-full h-auto min-h-[366px] mt-4 flex transition-all duration-75 ease-in-out flex-col gap-[6px] px-4">
//   {navItems.map((item, index) => (
//     <div
//       key={index}
//       className={`w-full h-[40px] flex items-center text-black justify-start px-2 gap-1 font-body rounded overflow-hidden ${
//         isPathActive(item)
//           ? "bg-secondary text-primary"
//           : "bg-transparent hover:bg-[#F1F1F1]"
//       } ${
//         item.locked
//           ? "opacity-50 cursor-not-allowed hidden"
//           : "cursor-pointer"
//       }`}
//       onClick={() => handleNavItemClick(item)}
//     >
//       <div className="relative">
//         <item.icon className="text-[19px] flex-shrink-0" />
//         {item.locked && (
//           <MdLock className="text-[12px] absolute -top-1 -right-1 text-gray-500" />
//         )}
//       </div>
//       <span
//         className={`font-semibold text-[16px] whitespace-nowrap transition-all duration-300 ease-in-out ${
//           isExpanded ? "opacity-100" : "opacity-0 w-0"
//         }`}
//       >
//         {item.label}
//       </span>
//     </div>
//   ))}
// </div>

// <div className="w-full h-auto py-1 gap-1 absolute bottom-6 px-4">
//   {isLoading ? (
//     <Skeleton className="w-full h-[104px] bg-blue-50" />
//   ) : (
//     <>
//       {user?.firstName && user?.firstName.length > 0 ? (
//         <div
//           className={`w-full h-[58px] border-gray-200 flex items-center justify-between rounded ${
//             isExpanded ? "px-[6px] bg-secondary border" : "px-0"
//           }`}
//         >
//           <div className="flex items-center">
//             <div
//               className={`rounded overflow-hidden flex-shrink-0 transition-all duration-300 ease-in cursor-pointer ${
//                 isExpanded ? "w-[42px] h-[42px]" : "w-[38px] h-[38px]"
//               }`}
//             >
//               <Image
//                 alt="UserAvatar"
//                 src={UserAvatar}
//                 className="object-cover w-full h-full"
//               />
//             </div>
//             <div
//               className={`flex flex-col gap-0 pl-[6px] transition-all duration-300 ease-in-out ${
//                 isExpanded
//                   ? "opacity-100 w-auto"
//                   : "opacity-0 w-0 overflow-hidden"
//               }`}
//             >
//               <span className="font-body font-semibold whitespace-nowrap">
//                 {`Hi, ${user?.firstName ? user?.firstName : ""} ${
//                   user?.lastName ? user?.lastName : ""
//                 }`}
//               </span>
//               <span className="font-body font-medium -mt-[3px] whitespace-nowrap capitalize">
//                 {`Plan: ${
//                   user?.subscribedPlan
//                     ? user?.subscribedPlan.toLowerCase()
//                     : ""
//                 }`}
//                 {/* {`Plan: ${
//                   user?.subscribedPlan ? user?.subscribedPlan : ""
//                 }`} */}
//               </span>
//             </div>
//           </div>
//           {isExpanded && (
//             <div className="w-[28px] h-[24px] bg-primary text-white flex items-center justify-center rounded">
//               <MdKeyboardArrowDown className="text-[22px]" />
//             </div>
//           )}
//         </div>
//       ) : null}
//       {!user?.isSubscribed ? (
//         <Link href={"/pricing"}>
//           <button
//             className={`w-full h-[42px] bg-primary text-white font-heading font-semibold text-[16px] mt-1 rounded transition-all duration-300 ease-in-out flex items-center justify-center gap-1`}
//           >
//             <span>
//               <VscHubot
//                 className={`text-[28px] text-white -mt-1 ${
//                   isExpanded ? "" : "ml-[2px]"
//                 }`}
//               />
//             </span>
//             <span
//               className={`transition-all duration-500 ease-in whitespace-nowrap ${
//                 isExpanded
//                   ? "opacity-100"
//                   : "opacity-0 w-0 overflow-hidden"
//               }`}
//             >
//               Upgrade Your Plan
//             </span>
//           </button>
//         </Link>
//       ) : null}
//     </>
//   )}
// </div>
//     </div>
//   );
// };

// export default AppSidebar;

"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Logo, SmallLogo, UserAvatar } from "../../../public/img";
import {
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown,
  MdLock,
  MdLogout,
  MdAccountCircle,
} from "react-icons/md";
import { BsFillFileEarmarkPdfFill, BsFillFileTextFill } from "react-icons/bs";
import { PiReadCvLogoFill } from "react-icons/pi";
import { SiCodemagic } from "react-icons/si";
import { FaUserCheck, FaCoins } from "react-icons/fa";
import { IoMove } from "react-icons/io5";
import { VscHubot } from "react-icons/vsc";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import api from "@/lib/api";
import { toast } from "sonner";
import { LuZap } from "react-icons/lu";
import { deleteTokens } from "@/lib/ServerCookie";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  matchPattern?: RegExp;
  locked?: boolean;
}

const AppSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Extract resume ID from pathname if it exists
  useEffect(() => {
    const match = pathname.match(/^\/app\/resumes\/([a-zA-Z0-9]+)$/);
    if (match) {
      setActiveResumeId(match[1]);
    }
  }, [pathname]);

  const navItems: NavItem[] = [
    {
      icon: BsFillFileEarmarkPdfFill,
      label: "My Resume",
      path: "/app/resumes",
    },
    {
      icon: PiReadCvLogoFill,
      label: "AI Resume Builder",
      path: activeResumeId ? `/app/resumes/${activeResumeId}` : "#",
      matchPattern: /^\/app\/resumes\/[a-zA-Z0-9]+$/,
      locked: !activeResumeId,
    },
    {
      icon: SiCodemagic,
      label: "AI Resume Optimizer",
      path: "/app/resume-Optimizer",
    },
    {
      icon: FaUserCheck,
      label: "AI Interview Coach",
      path: "/app/interview-coach",
    },
    { icon: IoMove, label: "Job Tracker", path: "/app/job-tracker" },
    { icon: BsFillFileTextFill, label: "Templates", path: "/app/templates" },
    {
      icon: FaCoins,
      label: "Ai Salary Analyzer",
      path: "/app/salary-analyzer",
    },
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavItemClick = (item: NavItem) => {
    if (item.locked) {
      return;
    }
    router.push(item.path);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleDropdownItemClick = (path: string) => {
    router.push(path);
    setIsUserDropdownOpen(false);
  };

  // const handleLogout = async () => {
  //   if (!user?._id) return;
  //   if (isLoading) return;
  //   try {
  //     const response = await api.post("/auth/logout", {
  //       userId: user?._id,
  //     });
  //     if (response.data.success) {
  //       // clearTokenInfo();

  //       router.push("/login");
  //     }
  //   } catch (error) {
  //     toast.error("Failed to logout. Please try again.");
  //   }
  //   setIsUserDropdownOpen(false);
  // };
  const handleLogout = async () => {
    if (!user?._id) return;
    if (isLoading) return;
    try {
      const response = await api.post("/auth/logout", {
        userId: user?._id,
      });
      if (response.data.success) {
        // clearTokenInfo();
        await deleteTokens();

        router.push("/login");
      }

      // const response = await axios.post("/api/cookies/remove", {
      //   userId: user?._id,
      // });
      // console.log("response.data for logout", response.data);
      // if (response.data.success) {
      //   router.push("/login");
      // }
    } catch {
      // console.log("Error logging out:", error);
      toast.error("Failed to logout. Please try again.");
    }
    setIsUserDropdownOpen(false);
  };

  const isPathActive = (item: NavItem) => {
    if (item.matchPattern) {
      return item.matchPattern.test(pathname);
    }
    return pathname === item.path;
  };

  const dropdownItems = [
    {
      icon: MdAccountCircle,
      label: "Account",
      onClick: () => handleDropdownItemClick("/app/account"),
    },
    // {
    //   icon: MdPayment,
    //   label: "Billing",
    //   onClick: () => handleDropdownItemClick("/app/billing"),
    // },
    // {
    //   icon: MdNotifications,
    //   label: "Notifications",
    //   onClick: () => handleDropdownItemClick("/app/notifications"),
    // },
    // {
    //   icon: MdSettings,
    //   label: "Settings",
    //   onClick: () => handleDropdownItemClick("/app/settings"),
    // },
  ];

  return (
    <div
      className={`h-full bg-white transition-all relative py-4 duration-300 ease-in-out border-r z-50 ${
        isExpanded ? "w-[244px]" : "w-[68px]"
      }`}
    >
      <div className="flex flex-row items-center gap-3 w-full border-b px-4 pb-2">
        <div
          className={`max-w-[188px] w-auto h-[38px] flex-shrink-0 transition-all duration-300 whitespace-nowrap overflow-hidden`}
        >
          <Link href="/app/resumes">
            {isExpanded ? (
              <Image
                alt="LOGO"
                src={Logo}
                className={`transition-all duration-300 h-8 w-auto mt-1`}
              />
            ) : (
              <Image
                alt="LOGO"
                src={SmallLogo}
                className={`transition-all duration-300 h-8 w-auto mt-1`}
              />
            )}
          </Link>
        </div>
        <div
          className={`w-[20px] h-[26px] bg- rounded flex items-center justify-center cursor-pointer bg-secondary ${
            isExpanded ? "" : "-ml-2"
          }`}
          onClick={toggleSidebar}
        >
          {isExpanded ? (
            <MdKeyboardArrowLeft className="text-[23px]" />
          ) : (
            <MdOutlineKeyboardArrowRight className="text-[23px]" />
          )}
        </div>
      </div>

      <div className="w-full h-auto min-h-[366px] mt-4 flex transition-all duration-75 ease-in-out flex-col gap-[6px] px-4">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`w-full h-[40px] flex items-center text-black justify-start px-2 gap-1 font-body rounded overflow-hidden ${
              isPathActive(item)
                ? "bg-secondary text-primary"
                : "bg-transparent hover:bg-[#F1F1F1]"
            } ${
              item.locked
                ? "opacity-50 cursor-not-allowed hidden"
                : "cursor-pointer"
            }`}
            onClick={() => handleNavItemClick(item)}
          >
            <div className="relative">
              <item.icon className="text-[19px] flex-shrink-0" />
              {item.locked && (
                <MdLock className="text-[12px] absolute -top-1 -right-1 text-gray-500" />
              )}
            </div>
            <span
              className={`font-semibold text-[16px] whitespace-nowrap transition-all duration-300 ease-in-out ${
                isExpanded ? "opacity-100" : "opacity-0 w-0"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full h-auto py-1 gap-1 absolute bottom-6 px-4">
        {isLoading ? (
          <Skeleton className="w-full h-[104px] bg-blue-50" />
        ) : (
          <>
            {user?.firstName && user?.firstName.length > 0 ? (
              <div
                className={`w-full h-[58px] border-gray-200 flex items-center justify-between rounded ${
                  isExpanded ? "px-[6px] bg-secondary border" : "px-0"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`rounded overflow-hidden flex-shrink-0 transition-all duration-300 ease-in cursor-pointer ${
                      isExpanded ? "w-[42px] h-[42px]" : "w-[38px] h-[38px]"
                    }`}
                  >
                    <Image
                      alt="UserAvatar"
                      src={UserAvatar}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div
                    className={`flex flex-col gap-0 pl-[6px] transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "opacity-100 w-auto"
                        : "opacity-0 w-0 overflow-hidden"
                    }`}
                  >
                    <span className="font-body font-semibold whitespace-nowrap">
                      {`Hi, ${user?.firstName ? user?.firstName : ""} ${
                        user?.lastName ? user?.lastName : ""
                      }`}
                    </span>
                    <span className="font-body font-medium -mt-[3px] whitespace-nowrap capitalize">
                      {`Plan: ${
                        user?.subscribedPlan
                          ? user?.subscribedPlan.toLowerCase()
                          : ""
                      }`}
                      {/* {`Plan: ${
                        user?.subscribedPlan ? user?.subscribedPlan : ""
                      }`} */}
                    </span>
                  </div>
                </div>
                {isExpanded && (
                  <div className="w-[28px] h-[24px] bg-primary text-white flex items-center justify-center rounded">
                    <MdKeyboardArrowDown className="text-[22px]" />
                  </div>
                )}
              </div>
            ) : null}
            {!user?.isSubscribed ? (
              <Link href={"/pricing"}>
                <button
                  className={`w-full h-[42px] bg-primary text-white font-heading font-semibold text-[16px] mt-1 rounded transition-all duration-300 ease-in-out flex items-center justify-center gap-1`}
                >
                  <span>
                    <VscHubot
                      className={`text-[28px] text-white -mt-1 ${
                        isExpanded ? "" : "ml-[2px]"
                      }`}
                    />
                  </span>
                  <span
                    className={`transition-all duration-500 ease-in whitespace-nowrap ${
                      isExpanded
                        ? "opacity-100"
                        : "opacity-0 w-0 overflow-hidden"
                    }`}
                  >
                    Upgrade Your Plan
                  </span>
                </button>
              </Link>
            ) : null}
          </>
        )}
      </div>
      {/* ... (previous sidebar code remains the same) ... */}

      <div
        className="w-full h-auto py-1 gap-1 absolute  bottom-6 px-4"
        ref={dropdownRef}
      >
        {isLoading ? (
          <Skeleton className="w-full h-[104px] bg-blue-50" />
        ) : (
          <>
            {user?.firstName && user?.firstName.length > 0 ? (
              <div
                className={`w-full h-[58px] border-gray-200 flex items-center justify-between rounded relative ${
                  isExpanded ? "px-[6px] bg-secondary border" : "px-0"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`rounded overflow-hidden flex-shrink-0 transition-all duration-300 ease-in cursor-pointer ${
                      isExpanded ? "w-[42px] h-[42px]" : "w-[38px] h-[38px]"
                    }`}
                  >
                    <Image
                      alt="UserAvatar"
                      src={UserAvatar}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div
                    className={`flex flex-col gap-0 pl-[6px] transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "opacity-100 w-auto"
                        : "opacity-0 w-0 overflow-hidden"
                    }`}
                  >
                    <span className="font-body font-semibold whitespace-nowrap">
                      {`Hi, ${user?.firstName ? user?.firstName : ""} ${
                        user?.lastName ? user?.lastName : ""
                      }`}
                    </span>
                    <span className="font-body font-medium -mt-[3px] whitespace-nowrap capitalize">
                      {`Plan: ${
                        user?.subscribedPlan
                          ? user?.subscribedPlan.toLowerCase()
                          : ""
                      }`}
                    </span>
                  </div>
                </div>
                {isExpanded && (
                  <div
                    className={`w-[28px] h-[24px] bg-primary text-white flex items-center justify-center rounded cursor-pointer transition-transform duration-300 ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                    onClick={toggleUserDropdown}
                  >
                    <MdKeyboardArrowDown className="text-[22px]" />
                  </div>
                )}

                {/* Dropdown Menu */}
                {isExpanded && isUserDropdownOpen && (
                  <div
                    className="absolute bottom-full left-0 right-0 py-1.5 bg-white shadow-lg rounded border mb-2 z-50 overflow-hidden"
                    style={{ transform: "translateY(-10px)" }}
                  >
                    {dropdownItems.map((item, index) => (
                      <div
                        key={index}
                        className="px-2 mx-2 py-1.5 my-1 rounded  hover:bg-gray-100 flex items-center gap-3 cursor-pointer transition-colors"
                        onClick={item.onClick}
                      >
                        <item.icon className="text-[20px] text-gray-600" />
                        <span className="text-[15px] font-medium text-gray-800">
                          {item.label}
                        </span>
                      </div>
                    ))}
                    <div
                      className="px-2 mx-2 py-1.5 my-1 rounded border hover:bg-gray-100 flex items-center gap-3 cursor-pointer transition-colors"
                      onClick={() => handleLogout()}
                    >
                      <MdLogout className="text-[20px] text-red-500" />
                      <span className="text-[15px] font-medium text-red-600">
                        Logout
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            {!user?.isSubscribed ? (
              <Link href={"/pricing"}>
                <button
                  className={`w-full h-[42px] bg-primary text-white font-heading font-semibold text-[16px] mt-1 rounded transition-all duration-300 ease-in-out flex items-center justify-center gap-1`}
                >
                  <span>
                    {/* <VscHubot
                      className={`text-[28px] text-white -mt-1 ${
                        isExpanded ? "" : "ml-[2px]"
                      }`}
                    /> */}
                    <LuZap
                      className={`text-[24px] text-white -mt-1 ${
                        isExpanded ? "" : "ml-[2px]"
                      }`}
                    />
                  </span>
                  <span
                    className={`transition-all duration-500 ease-in whitespace-nowrap ${
                      isExpanded
                        ? "opacity-100"
                        : "opacity-0 w-0 overflow-hidden"
                    }`}
                  >
                    Upgrade Your Plan
                  </span>
                </button>
              </Link>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default AppSidebar;
