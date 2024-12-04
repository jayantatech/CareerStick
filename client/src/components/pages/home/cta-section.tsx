import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import ContentWrapper from "@/components/ContentWrapper";
export default function CTASection() {
  return (
    <section className="py-16  bg-blue-600">
      {" "}
      {/* bg-gradient-to-b from-white to-gray-50 */}
      <ContentWrapper>
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border mb-4">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
            Start Your Career Transformation Today
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-white">
            Turn your experience into a standout story. Our AI-powered platform
            helps you build a professional, job-winning resume in minutes,
            effortlessly and effectively.
          </p>
          <Button
            size="lg"
            className="mt-4 outline-none border text-white font-heading font-semibold text-lg px-8 py-6 rounded hover:scale-[.98] shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Building Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </ContentWrapper>
    </section>
  );
}
// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ContentWrapper from "@/components/ContentWrapper";
// import {
//   ArrowRight,
//   FileCheck,
//   Rocket,
//   Upload,
//   ChevronRight,
// } from "lucide-react";
// import { motion } from "framer-motion";

// export default function CTASection() {
//   const [activeTab, setActiveTab] = useState("create");

//   const tabVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   return (
//     <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
//       <ContentWrapper>
//         <div className="text-center space-y-6 mb-16">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
//           >
//             <Rocket className="w-10 h-10 text-primary" />
//           </motion.div>
//           <motion.h2
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             className="text-5xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
//           >
//             Launch Your Career Journey Today
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             className="text-muted-foreground text-xl max-w-3xl mx-auto"
//           >
//             Transform your professional story into a compelling narrative. Our
//             platform helps you craft the perfect resume in minutes, not hours.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//           >
//             <Button
//               size="lg"
//               className="mt-8 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               Start Building Now
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </Button>
//           </motion.div>
//         </div>

//         <Tabs
//           defaultValue="create"
//           className="max-w-5xl mx-auto"
//           onValueChange={setActiveTab}
//         >
//           <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/60 rounded-full overflow-hidden">
//             {["create", "customize", "export"].map((tab) => (
//               <TabsTrigger
//                 key={tab}
//                 value={tab}
//                 className={`py-4 rounded-full transition-all duration-300 ${
//                   activeTab === tab ? "bg-white shadow-lg" : "hover:bg-white/50"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`w-10 h-10 rounded-full ${
//                       activeTab === tab
//                         ? "bg-primary text-white"
//                         : "bg-primary/10 text-primary"
//                     } flex items-center justify-center transition-all duration-300`}
//                   >
//                     {tab === "create" && <FileCheck className="h-5 w-5" />}
//                     {tab === "customize" && <Rocket className="h-5 w-5" />}
//                     {tab === "export" && <Upload className="h-5 w-5" />}
//                   </div>
//                   <span className="font-semibold">
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                   </span>
//                 </div>
//               </TabsTrigger>
//             ))}
//           </TabsList>
//           <div className="mt-12">
//             {["create", "customize", "export"].map((tab) => (
//               <TabsContent key={tab} value={tab}>
//                 <motion.div
//                   variants={tabVariants}
//                   initial="hidden"
//                   animate={activeTab === tab ? "visible" : "hidden"}
//                 >
//                   <Card className="overflow-hidden shadow-2xl">
//                     <CardContent className="p-0">
//                       <div className="grid md:grid-cols-2 gap-0">
//                         <div className="relative h-[300px] md:h-[400px]">
//                           <Image
//                             src={`/placeholder.svg?height=400&width=600&text=${
//                               tab.charAt(0).toUpperCase() + tab.slice(1)
//                             }`}
//                             alt={`${tab} Illustration`}
//                             fill
//                             className="object-cover"
//                           />
//                         </div>
//                         <div className="p-8 flex flex-col justify-center">
//                           <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
//                             {tab === "create" && "Create Your Profile"}
//                             {tab === "customize" && "Customize Your Resume"}
//                             {tab === "export" && "Export & Share"}
//                           </h3>
//                           <p className="text-muted-foreground text-lg mb-6">
//                             {tab === "create" &&
//                               "Start by filling in your professional details. Our smart forms make it easy to input your experience, skills, and achievements."}
//                             {tab === "customize" &&
//                               "Choose from our professionally designed templates and customize colors, fonts, and layouts. Our AI-powered suggestions help you highlight the right information."}
//                             {tab === "export" &&
//                               "Download your resume in multiple formats (PDF, DOCX) or share directly with recruiters. Your resume is optimized for ATS systems."}
//                           </p>
//                           <Button
//                             variant="outline"
//                             className="self-start group"
//                           >
//                             {tab === "create" && "Begin Profile"}
//                             {tab === "customize" && "Explore Templates"}
//                             {tab === "export" && "See Export Options"}
//                             <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </TabsContent>
//             ))}
//           </div>
//         </Tabs>
//       </ContentWrapper>
//     </section>
//   );
// }
