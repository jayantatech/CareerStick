"use client";
import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ContentWrapper from "../ContentWrapper";
import Image from "next/image";
import { Logo } from "../../../public/img";
import useAuth from "@/lib/hooks/useAuth";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full max-lg:bg-white border-b lg:bg-background/95 lg:backdrop-blur lg:supports-[backdrop-filter]:bg-background/60">
      <ContentWrapper>
        <div className="flex h-20 z-50 items-center justify-between max-lg:px-0">
          <Link
            href="/"
            className="flex z-50 max-lg:hidden   items-center space-x-2 shrink-0"
          >
            <Image
              src={Logo}
              alt="Logo"
              className="h-11 max-lg:h-9 max-md:h-8 w-auto"
              priority
              width={260}
              height={60}
            />
          </Link>
          <div className="fixed top-0 left-0 right-0 h-20 bg-white border-b z-[100] l-laptop:hidden">
            <div className="flex items-center justify-between w-full h-full px-4">
              <div className="h-[38px]">
                <Image alt="LOGO" src={Logo} className="h-[38px] w-auto" />
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="w-[38px] h-[38px] flex items-center justify-center"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          <nav
            className={cn(
              "fixed inset-x-0 top-[4rem] z-50 h-[calc(100vh-5rem)] max-lg:h-auto overflow-y-auto lg:bg-background/95 lg:backdrop-blur max-lg:bg-white supports-[backdrop-filter]:bg-background/80",
              "transition-all duration-300 ease-in-out",
              "lg:static lg:h-auto lg:overflow-visible lg:bg-transparent lg:backdrop-blur-none",
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-[-100vh] opacity-0 lg:translate-y-0 lg:opacity-100"
            )}
            ref={dropdownRef}
          >
            <div className="flex flex-col font-heading space-y-4 max-lg:space-y-4 p-6 lg:flex-row lg:items-center lg:justify-end lg:space-x-8 lg:space-y-0 lg:p-0 max-lg:bg-white">
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
                {isAuthenticated ? (
                  <Link href={"/app/resumes"}>
                    <Button
                      size="lg"
                      className="w-full  lg:w-auto rounded h-[37px] border bg-primary text-white hover:bg-primary hover:scale-[.98] transition-all duration-150 font-heading font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href={"/register"}>
                      <Button
                        size="lg"
                        className="w-full lg:w-auto rounded h-[36px] border-none bg-primary text-white hover:bg-primary hover:scale-[.98] transition-all duration-150 font-heading font-semibold"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up
                      </Button>
                    </Link>
                    <Link href={"/login"}>
                      <Button
                        size="lg"
                        className="w-full lg:w-auto rounded h-[36px] border-none bg-primary text-white hover:bg-primary hover:scale-[.98] transition-all duration-150 font-heading font-semibold"
                        onClick={() => setIsOpen(false)}
                      >
                        Log In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>

          {/* <Button
            variant="ghost"
            size="icon"
            className="lg:hidden z-50 "
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button> */}
        </div>
      </ContentWrapper>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[20] l-laptop:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}
