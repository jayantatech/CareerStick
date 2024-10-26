import React from "react";
import AppSidebar from "@/components/app/AppSidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="sticky top-0 h-screen z-50 max-md:hidden">
        <AppSidebar />
      </div>
      <main className="flex-grow overflow-auto">
        <div className=" mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default RootLayout;
