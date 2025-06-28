import React from "react";
import AppSidebar from "@/components/app/AppSidebar";
// import AppMobileHeader from "@/components/headers/AppMobileHeader";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="sticky top-0 h-screen z-50 max-l-laptop:hidden">
        <AppSidebar />
      </div>
      {/* <AppMobileHeader /> */}
      <main className="flex-grow overflow-auto">
        <div className=" mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default RootLayout;
