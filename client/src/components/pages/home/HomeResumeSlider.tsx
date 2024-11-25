// "use client";

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import ContentWrapper from "@/components/ContentWrapper";
// import Image from "next/image";
// import { ResumeThreeHero } from "../../../../public/img";

// const resumeData = [
//   {
//     name: "John Doe",
//     title: "Software Engineer",
//     experience: "5+ years in web development",
//     skills: ["React", "Node.js", "TypeScript", "GraphQL"],
//   },
//   {
//     name: "Jane Smith",
//     title: "UX Designer",
//     experience: "4 years creating user-centric designs",
//     skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
//   },
//   {
//     name: "Alex Johnson",
//     title: "Data Scientist",
//     experience: "3 years in machine learning and AI",
//     skills: ["Python", "TensorFlow", "SQL", "Data Visualization"],
//   },
//   {
//     name: "Alex Johnson",
//     title: "Data Scientist",
//     experience: "3 years in machine learning and AI",
//     skills: ["Python", "TensorFlow", "SQL", "Data Visualization"],
//   },
//   {
//     name: "Alex Johnson",
//     title: "Data Scientist",
//     experience: "3 years in machine learning and AI",
//     skills: ["Python", "TensorFlow", "SQL", "Data Visualization"],
//   },
//   {
//     name: "Alex Johnson",
//     title: "Data Scientist",
//     experience: "3 years in machine learning and AI",
//     skills: ["Python", "TensorFlow", "SQL", "Data Visualization"],
//   },
//   {
//     name: "Alex Johnson",
//     title: "Data Scientist",
//     experience: "3 years in machine learning and AI",
//     skills: ["Python", "TensorFlow", "SQL", "Data Visualization"],
//   },
//   {
//     name: "Alex Johnson",
//     title: "Data Scientist",
//     experience: "3 years in machine learning and AI",
//     skills: ["Python", "TensorFlow", "SQL", "Data Visualization"],
//   },
// ];

// export default function ResumeSlider() {
//   return (
//     <div className="w-full h-auto bg-gray-600 flex items-center justify-center p-4">
//       <ContentWrapper>
//         <div className="w-full ">
//           <h1 className="text-3xl font-bold text-center text-white mb-8">
//             Expert-Designed Resume Templates
//           </h1>
//           <Swiper
//             modules={[Pagination, Navigation]}
//             spaceBetween={30}
//             slidesPerView={3}
//             navigation
//             pagination={{ clickable: true }}
//             className="mySwiper"
//           >
//             {resumeData.map((resume, index) => (
//               <SwiperSlide key={index} className="select-none">
//                 <Image src={ResumeThreeHero} alt="" className="w-full h-full" />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </ContentWrapper>
//     </div>
//   );
// }

"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ResumeFourHome,
  ResumeOneHome,
  ResumeThreeHero,
} from "../../../../public/img";
import ContentWrapper from "@/components/ContentWrapper";

const resumeData = [
  {
    Image: ResumeFourHome,
    name: "resume template 3",
  },
  {
    Image: ResumeThreeHero,
    name: "resume template 3",
  },

  {
    Image: ResumeOneHome,
    name: "resume template 3",
  },
];

export default function ResumeSlider() {
  return (
    <section className="w-full bg-gradient-to-br bg-white  border-t  py-16 px-4">
      {" "}
      {/* bg-[#F9FAFB] */}
      <ContentWrapper>
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter font-heading capitalize">
              Pick one and build in minutes
              {/* <span className="block mt-2">your dream job</span> */}
            </h2>
          </div>
          <div className="relative">
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="mySwiper"
            >
              {resumeData.map((resume, index) => (
                <SwiperSlide key={index} className="select-none">
                  <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform duration-300 m-2 border">
                    <Image
                      src={resume.Image as StaticImageData}
                      alt={`${resume.name}'s resume template`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="swiper-button-prev absolute left-0 top-1/2 transform w-[4px] h-[4px] -translate-y-1/2 z-10 bg-white text-indigo-600 border rounded shadow-lg hover:bg-indigo-600 hover:text-white transition-colors duration-300">
              <ChevronLeft size={24} />
              <span className="sr-only">Previous slide</span>
            </button>
            <button className="swiper-button-next absolute right-10 top-1/2 w-[4px] h-[4px] transform -translate-y-1/2 z-10 bg-white text-indigo-600  rounded border shadow-lg hover:bg-indigo-600 hover:text-white transition-colors duration-300">
              <ChevronRight size={24} />
              <span className="sr-only">Next slide</span>
            </button>
            <div className="swiper-pagination bottom-0 !relative mt-8"></div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
