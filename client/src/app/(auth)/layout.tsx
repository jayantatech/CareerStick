import Image from "next/image";
import React from "react";
import { Logo } from "../../../public/img";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[88px] shadow-md bg-white flex items-center justify-center">
        <Link href={"/"}>
          <Image src={Logo} alt="LiveCareer logo" width={220} height={50} />
        </Link>
      </header>
      {children}
    </>
  );
};

export default AuthLayout;
