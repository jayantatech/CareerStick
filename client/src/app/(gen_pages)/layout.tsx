import React from "react";
import AppSidebar from "@/components/app/AppSidebar";
import AppMobileHeader from "@/components/headers/AppMobileHeader";
import Header from "@/components/headers/Header";
import Footer from "@/components/Footer";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default RootLayout;
