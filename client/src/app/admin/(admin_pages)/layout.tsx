import React from "react";
import AppMobileHeader from "@/components/headers/AppMobileHeader";
import AdminSidebar from "@/components/pages/admin/AdminSidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="sticky top-0 h-screen z-50 max-l-laptop:hidden">
        <AdminSidebar />
      </div>
      <AppMobileHeader />
      <main className="flex-grow overflow-auto">
        <div className=" mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default RootLayout;
