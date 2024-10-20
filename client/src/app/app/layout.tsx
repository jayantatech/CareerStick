import React from "react";
import AppSidebar from "@/components/app/AppSidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="sticky top-0 h-screen z-50">
        <AppSidebar />
      </div>
      <main className="flex-grow overflow-auto">
        <div className=" mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default RootLayout;

// import AppSidebar from "@/components/app/AppSidebar";

// const RootLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="w-full h-full bg-red-s300 min-h-screen flex">
//       {/* <div className="max-lg:hidden max-xl:hidden block lg:min-w-[240px]">
//         {" "}
//         <AppSidebar />
//       </div> */}
//       <div className="flex-grow flex flex-row relative">
//         <div className="sticky top-0 left-0">
//           <AppSidebar />
//         </div>
//         <section className="flex-grow ">{children}</section>
//       </div>
//     </div>
//   );
// };

// export default RootLayout;
