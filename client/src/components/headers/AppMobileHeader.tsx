"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Logo, UserAvatar } from "../../../public/img";
import { MdKeyboardArrowDown, MdLock, MdMenu, MdClose } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { BsFillFileEarmarkPdfFill, BsFillFileTextFill } from "react-icons/bs";
import { PiReadCvLogoFill } from "react-icons/pi";
import { SiCodemagic } from "react-icons/si";
import { FaUserCheck, FaCoins } from "react-icons/fa";
import { IoMove } from "react-icons/io5";
import { VscHubot } from "react-icons/vsc";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";
import { Skeleton } from "../ui/skeleton";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  matchPattern?: RegExp;
  locked?: boolean;
}

const AppMobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const match = pathname.match(/^\/app\/resumes\/([a-zA-Z0-9]+)$/);
    if (match) {
      setActiveResumeId(match[1]);
    }
  }, [pathname]);

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

  const handleNavItemClick = (item: NavItem) => {
    if (item.locked) return;
    router.push(item.path);
    setIsMenuOpen(false);
  };

  const isPathActive = (item: NavItem) => {
    if (item.matchPattern) {
      return item.matchPattern.test(pathname);
    }
    return pathname === item.path;
  };

  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-[100] l-laptop:hidden ">
        <div className="flex items-center justify-between w-full h-full px-4">
          <div className="h-[38px]">
            <Image alt="LOGO" src={Logo} className="h-[38px] w-auto" />
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-[38px] h-[38px] flex items-center justify-center"
          >
            <MdMenu className="text-[26px]" />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[100] l-laptop:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 right-0 bg-white z-[100] l-laptop:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ maxHeight: "80vh" }}
      >
        <div className="flex flex-col h-full ">
          {/* Header */}
          <div className="flex flex-row items-center justify-between gap-3 w-full border-b px-4 py-4">
            <div className="max-w-[164px] w-auto h-[38px]">
              <Image alt="LOGO" src={Logo} className="h-[38px]" />
            </div>
            <button
              className="w-[26px] h-[26px] rounded mr-1 flex items-center justify-center cursor-pointer bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdClose className="text-[23px]" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto">
            <div className="w-full h-auto min-h-[366px] mt-4 flex flex-col gap-[6px] px-4">
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
                  <span className="font-semibold text-[16px] whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User Profile and Upgrade Button */}
          <div className="w-full h-auto py-4 gap-1 px-4 border-t">
            {isLoading ? (
              <Skeleton className="w-full h-[104px] bg-blue-50" />
            ) : (
              <>
                {user?.firstName && user?.firstName.length > 0 ? (
                  <div className="w-full h-[58px] border-gray-200 flex items-center justify-between rounded px-[6px] bg-secondary border">
                    <div className="flex items-center">
                      <div className="w-[42px] h-[42px] rounded overflow-hidden flex-shrink-0">
                        <Image
                          alt="UserAvatar"
                          src={UserAvatar}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col gap-0 pl-[6px]">
                        <span className="font-body font-semibold whitespace-nowrap">
                          {`Hi, ${user?.firstName} ${user?.lastName || ""}`}
                        </span>
                        <span className="font-body font-medium -mt-[3px] whitespace-nowrap capitalize">
                          {`Plan: ${user?.subscribedPlan || ""}`}
                        </span>
                      </div>
                    </div>
                    <div className="w-[28px] h-[24px] bg-primary text-white flex items-center justify-center rounded">
                      <MdKeyboardArrowDown className="text-[22px]" />
                    </div>
                  </div>
                ) : null}
                {!user?.isSubscribed && (
                  <button className="w-full h-[42px] bg-primary text-white font-heading font-semibold text-[16px] mt-1 rounded flex items-center justify-center gap-1">
                    <span>
                      <VscHubot className="text-[28px] text-white -mt-1" />
                    </span>
                    <span>Upgrade Your Plan</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppMobileHeader;
