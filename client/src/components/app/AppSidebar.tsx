"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Logo, SmallLogo, UserAvatar } from "../../../public/img";
import {
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { BsFillFileEarmarkPdfFill, BsFillFileTextFill } from "react-icons/bs";
import { PiReadCvLogoFill } from "react-icons/pi";
import { SiCodemagic } from "react-icons/si";
import { FaUserCheck, FaCoins } from "react-icons/fa";
import { IoMove } from "react-icons/io5";
import { VscHubot } from "react-icons/vsc";
import { useParams, usePathname, useRouter } from "next/navigation";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: RiDashboardFill, label: "Dashboard", path: "/app" },
  {
    icon: BsFillFileEarmarkPdfFill,
    label: "My Resume",
    path: "/app/resumes",
  },
  {
    icon: PiReadCvLogoFill,
    label: "AI Resume Builder",
    path: "/app/resumes/67265e09cb4c21fd26043c06",
  },
  {
    icon: SiCodemagic,
    label: "AI Resume Optimization",
    path: "/app/resume-optimization",
  },
  {
    icon: FaUserCheck,
    label: "AI Interview Prep",
    path: "/app/interview-prep",
  },
  { icon: IoMove, label: "Job Tracker", path: "/app/job-tracker" },
  { icon: BsFillFileTextFill, label: "Templates", path: "/app/templates" },
  { icon: FaCoins, label: "Ai Salary Analyzer", path: "/app/salary-analyzer" },
];
const AppSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  // const [activeItem, setActiveItem] = useState(navItems[0].path);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavItemClick = (path: string) => {
    // setActiveItem(path);
    router.push(path);
  };

  const pathname = usePathname();

  // const isActive = (path: string) => {
  //   return pathname === path;
  // };

  // console.log("pathname", pathname);
  return (
    <div
      className={`h-full bg-white transition-all relative py-4 duration-300 ease-in-out border-r z-50  ${
        isExpanded ? "w-[244px]" : "w-[68px]"
      }`}
    >
      <div className="flex flex-row items-center gap-3 w-full border-b px-4 pb-2">
        <div
          className={` max-w-[164px] w-auto bg-fuchsida-800 h-[38px] flex-shrink-0 transition-all  duration-150  whitespace-nowrap overflow-hidden`}
        >
          {isExpanded ? (
            <Image
              alt="LOGO"
              src={Logo}
              className={`transition-all duration-150 h-[38px]`}
            />
          ) : (
            <Image
              alt="LOGO"
              src={SmallLogo}
              className={`transition-all duration-150 h-[38px]`}
            />
          )}
        </div>
        <div
          className={`w-[20px] h-[26px] bg- rounded flex items-center  justify-center cursor-pointer bg-secondary ${
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

      <div className="w-full h-auto min-h-[366px]  mt-4 flex transition-all duration-75 ease-in-out flex-col  gap-[6px] px-4">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`w-full h-[40px] cursor-pointer flex items-center  text-black justify-start px-2 gap-1 font-body rounded overflow-hidden ${
              pathname === item.path
                ? "bg-secondary text-primary"
                : "bg-transparent hover:bg-[#F1F1F1]"
            } `}
            onClick={() => handleNavItemClick(item.path)}
          >
            <item.icon className="text-[19px] flex-shrink-0" />
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
      {/* <div className="w-full h-auto py-1 bg-blue-400 gap-1 mt-[340px] px-4"> */}
      <div className="w-full h-auto py-1  gap-1 absolute bottom-6 px-4">
        <div
          className={`w-full h-[58px]  border-gray-200 flex items-center justify-between rounded ${
            isExpanded ? "px-[6px] bg-secondary border" : "px-0"
          }`}
        >
          <div className="flex items-center">
            <div
              className={` rounded overflow-hidden flex-shrink-0 transition-all duration-300 ease-in cursor-pointer ${
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
                Jay Biswas
              </span>
              <span className="font-body font-medium -mt-[3px] whitespace-nowrap">
                Plan: Free
              </span>
            </div>
          </div>
          {isExpanded && (
            <div className="w-[28px] h-[24px] bg-primary text-white flex items-center justify-center rounded">
              <MdKeyboardArrowDown className="text-[22px]" />
            </div>
          )}
        </div>
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
            className={`transition-all duration-500 ease-in whitespace-nowrap  ${
              isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Upgrade Your Plan
          </span>
        </button>
      </div>
    </div>
  );
};

export default AppSidebar;
