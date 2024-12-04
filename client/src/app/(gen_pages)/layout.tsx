import React from "react";
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
